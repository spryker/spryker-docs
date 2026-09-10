#!/usr/bin/env python3
"""Check front-matter `related:` blocks.

    _scripts/related_checker/related_checker.py            # files changed vs master
    _scripts/related_checker/related_checker.py --all      # whole docs tree
    _scripts/related_checker/related_checker.py docs/a.md  # named files
    _scripts/related_checker/related_checker.py --selftest # verify the checks still fire

Checks:
  related-sister-or-subpage  target is in the source page's own directory, so the
                             sidebar already shows it. Deeper descendants are kept
  related-not-https          external link is not https:// (the layout prepends
                             '/' to anything else, producing /http://...)
  related-leading-slash      internal link starts with '/'
  related-no-html            internal link lacks the .html suffix
  related-dead-target        no page and no redirect_from serves the link
  body-link-section          a hand-written link section is still in the body

Exit status is 1 when there are findings.
"""

import argparse
import os
import re
import subprocess
import sys

DOCS = "docs"
FRONT_MATTER = re.compile(r"\A---\n(?P<fm>.*?)\n---\n", re.DOTALL)
BODY_LINK_SECTION = re.compile(
    r"^#{2,} (Next steps?|Further reading|Related|See also|Read next|What.s next)[ \t]*$",
    re.MULTILINE | re.IGNORECASE,
)


def is_page(path):
    return path.endswith(".md") and path.startswith(DOCS + os.sep) and os.path.isfile(path)


def all_docs():
    return sorted(
        os.path.join(r, f) for r, _, fs in os.walk(DOCS) for f in fs if f.endswith(".md")
    )


def changed_files():
    out = []
    for args in (["git", "diff", "--name-only", "master...HEAD"], ["git", "diff", "--name-only"]):
        res = subprocess.run(args, capture_output=True, text=True)
        out += res.stdout.split()
    return sorted({f for f in out if is_page(f)})


def parse_related(front_matter):
    """Read the related: block line by line.

    Deliberately not one regex spanning all entries: a repeated group that stops
    one entry short leaves an orphan behind and corrupts the front matter.
    Returns (entries, start_line) with entries as (title, link, line).
    """
    lines = front_matter.splitlines()
    try:
        start = next(i for i, l in enumerate(lines) if l.rstrip() == "related:")
    except StopIteration:
        return [], None
    entries, title, title_line = [], None, None
    for i in range(start + 1, len(lines)):
        line = lines[i]
        if line and not line.startswith((" ", "\t")):
            break
        m = re.match(r"\s+- title:\s*(.*)$", line)
        if m:
            title, title_line = m.group(1).strip(), i + 1
            continue
        m = re.match(r"\s+link:\s*(.*)$", line)
        if m and title is not None:
            entries.append((title, m.group(1).strip(), title_line))
            title = None
    return entries, start + 1


def build_index():
    index = set()
    for path in all_docs():
        index.add("/" + path[: -len(".md")] + ".html")
        fm = FRONT_MATTER.match(open(path, encoding="utf-8", errors="replace").read(8000))
        if fm:
            for line in fm.group("fm").splitlines():
                m = re.match(r"\s*-\s+(/\S+)\s*$", line)
                if m:
                    index.add(m.group(1))
    return index


def check(path, text, index, findings):
    fm = FRONT_MATTER.match(text)
    if not fm:
        return
    body = text[fm.end():]

    m = BODY_LINK_SECTION.search(body)
    if m:
        findings.append((path, 1, "body-link-section",
                         f"move '{m.group(0).strip()}' into related: and delete the section"))

    source_dir = os.path.dirname(path)
    for title, link, line in parse_related(fm.group("fm"))[0]:
        if "://" in link:
            if not link.startswith("https://"):
                findings.append((path, line, "related-not-https",
                                 f"external link must be https://: {link}"))
            continue
        if link.startswith("/"):
            findings.append((path, line, "related-leading-slash", f"drop the leading slash: {link}"))
        if not link.endswith(".html"):
            findings.append((path, line, "related-no-html", f"needs .html: {link}"))
            continue
        target_dir = os.path.dirname(link.lstrip("/")[: -len(".html")] + ".md")
        # Same directory only. A deeper descendant is not listed beside the page
        # in the sidebar, so it stays.
        if target_dir == source_dir:
            findings.append((path, line, "related-sister-or-subpage",
                             f"'{title}' is a sister or subpage; the sidebar already lists it"))
        if "/" + link.lstrip("/") not in index:
            findings.append((path, line, "related-dead-target", f"nothing serves this link: {link}"))


SELFTEST = [
    ({"related-sister-or-subpage"},
     "docs/a/b/page.md",
     "---\nrelated:\n  - title: Sister\n    link: docs/a/b/other.html\n---\n\nBody.\n"),
    (set(),  # a deeper descendant is kept
     "docs/a/b/page.md",
     "---\nrelated:\n  - title: Subpage\n    link: docs/a/b/deeper/child.html\n---\n\nBody.\n"),
    (set(),  # a parent page is not a sister or subpage
     "docs/a/b/page.md",
     "---\nrelated:\n  - title: Parent\n    link: docs/a/parent.html\n---\n\nBody.\n"),
    (set(),  # a cousin in another branch stays
     "docs/a/b/page.md",
     "---\nrelated:\n  - title: Cousin\n    link: docs/a/c/other.html\n---\n\nBody.\n"),
    ({"related-not-https"},
     "docs/a/b/page.md",
     "---\nrelated:\n  - title: Ext\n    link: http://example.com/x\n---\n\nBody.\n"),
    ({"related-leading-slash", "related-sister-or-subpage"},
     "docs/a/b/page.md",
     "---\nrelated:\n  - title: S\n    link: /docs/a/b/other.html\n---\n\nBody.\n"),
    # no .html means the target cannot be resolved, so dead-target stays quiet
    ({"related-no-html"},
     "docs/a/b/page.md",
     "---\nrelated:\n  - title: S\n    link: docs/a/c/other\n---\n\nBody.\n"),
    ({"body-link-section"},
     "docs/a/b/page.md",
     "---\ntitle: T\n---\n\n## Next step\n\n- [x](/docs/a/c/other.html)\n"),
    # every entry is seen: three sisters must yield three findings, not two
    ({"related-sister-or-subpage"},
     "docs/a/b/page.md",
     "---\nrelated:\n  - title: One\n    link: docs/a/b/one.html\n"
     "  - title: Two\n    link: docs/a/b/two.html\n"
     "  - title: Three\n    link: docs/a/b/three.html\n---\n\nBody.\n"),
]


def selftest():
    index = {"/docs/a/c/other.html", "/docs/a/parent.html", "/docs/a/b/other.html",
             "/docs/a/b/deeper/child.html", "/docs/a/b/one.html", "/docs/a/b/two.html",
             "/docs/a/b/three.html"}
    failures = 0
    for expected, path, sample in SELFTEST:
        findings = []
        check(path, sample, index, findings)
        got = {code for _, _, code, _ in findings}
        if got != expected:
            failures += 1
            print(f"FAIL {path}: expected {sorted(expected) or 'nothing'}, got {sorted(got) or 'nothing'}")
    # the last sample must report once per entry, not once per file
    findings = []
    check(SELFTEST[-1][1], SELFTEST[-1][2], set(), findings)
    sisters = [f for f in findings if f[2] == "related-sister-or-subpage"]
    if len(sisters) != 3:
        failures += 1
        print(f"FAIL entry coverage: expected 3 sister findings, got {len(sisters)}")
    print(f"selftest: {len(SELFTEST) + 1 - failures}/{len(SELFTEST) + 1} checks passed")
    return 1 if failures else 0


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("paths", nargs="*")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--selftest", action="store_true")
    args = ap.parse_args()

    if args.selftest:
        return selftest()

    targets = all_docs() if args.all else ([p for p in args.paths if is_page(p)] if args.paths
                                           else changed_files())
    if not targets:
        print("nothing to check")
        return 0

    index = build_index()
    findings = []
    for path in targets:
        check(path, open(path, encoding="utf-8", errors="replace").read(), index, findings)

    for path, line, code, msg in sorted(findings):
        print(f"{path}:{line}: [{code}] {msg}")
    if findings:
        print(f"\nrelated: {len(findings)} finding(s) in {len(targets)} file(s)")
        return 1
    print(f"related: {len(targets)} file(s) checked, no findings")
    return 0


if __name__ == "__main__":
    sys.exit(main())
