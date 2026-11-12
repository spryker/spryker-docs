#!/usr/bin/env python3
"""Check that a page's `redirect_from:` never points back to the page itself.

    _scripts/self_redirect_checker/self_redirect_checker.py            # files changed vs master
    _scripts/self_redirect_checker/self_redirect_checker.py --all      # whole docs tree
    _scripts/self_redirect_checker/self_redirect_checker.py docs/a.md  # named files
    _scripts/self_redirect_checker/self_redirect_checker.py --selftest # verify the checks still fire

A self-redirect is a `redirect_from:` entry whose URL resolves to the page that
declares it. jekyll-redirect-from then generates a stub at that URL that redirects
to the same page, so the URL serves a redirect loop instead of the content.

Comparison ignores the trailing `.md`, `.html`, or `.htm` suffix (so all three
spellings and the extensionless form are treated as the same URL), a leading
slash, a trailing slash, and letter case.

Checks:
  self-redirect              a redirect_from entry resolves to this page itself

Exit status is 1 when there are findings.
"""

import argparse
import os
import re
import subprocess
import sys

DOCS = "docs"
FRONT_MATTER = re.compile(r"\A---\n(?P<fm>.*?)\n---\n", re.DOTALL)


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


def norm(url):
    """Reduce a URL or file path to a comparable key.

    Drops anchors/queries, a leading and trailing slash, the trailing
    .md/.html/.htm suffix, surrounding quotes, and letter case.
    """
    url = url.strip().strip("\"'").split("#")[0].split("?")[0].strip()
    url = url.strip("/")
    url = re.sub(r"\.(html?|md)$", "", url, flags=re.IGNORECASE)
    url = url.strip("/")
    return url.lower()


def check(path, text, findings):
    """Record a self-redirect for every redirect_from entry that resolves to `path`."""
    fm = FRONT_MATTER.match(text)
    if not fm:
        return
    own = norm(path)
    lines = fm.group("fm").splitlines()
    first_fm_line = 2  # file line 1 is the opening '---'; fm line 0 is file line 2
    in_block = False
    for idx, line in enumerate(lines):
        absline = first_fm_line + idx
        header = re.match(r"^redirect_from\s*:(.*)$", line)
        if header:
            in_block = True
            inline = header.group(1).strip()
            if inline and inline not in ("|", ">"):
                if norm(inline) == own:
                    findings.append((path, absline, "self-redirect",
                                     f"redirect_from points to the page itself: {inline}"))
            continue
        if in_block:
            m = re.match(r"^\s*-\s*(.+?)\s*$", line)
            if m:
                entry = m.group(1).strip()
                if norm(entry) == own:
                    findings.append((path, absline, "self-redirect",
                                     f"redirect_from points to the page itself: {entry}"))
            elif re.match(r"^\S", line):
                in_block = False


SELFTEST = [
    ({"self-redirect"},  # same page, .html suffix
     "docs/a/b/page.md",
     "---\nredirect_from:\n  - /docs/a/b/page.html\n---\n\nBody.\n"),
    ({"self-redirect"},  # same page, no suffix
     "docs/a/b/page.md",
     "---\nredirect_from:\n  - /docs/a/b/page\n---\n\nBody.\n"),
    ({"self-redirect"},  # same page, .md suffix
     "docs/a/b/page.md",
     "---\nredirect_from:\n  - /docs/a/b/page.md\n---\n\nBody.\n"),
    ({"self-redirect"},  # same page, different case
     "docs/a/b/page.md",
     "---\nredirect_from:\n  - /docs/A/B/Page.html\n---\n\nBody.\n"),
    ({"self-redirect"},  # same page, trailing slash
     "docs/a/b/page.md",
     "---\nredirect_from:\n  - /docs/a/b/page/\n---\n\nBody.\n"),
    (set(),  # a different page is a legitimate redirect
     "docs/a/b/page.md",
     "---\nredirect_from:\n  - /docs/a/b/other.html\n---\n\nBody.\n"),
    (set(),  # no redirect_from block at all
     "docs/a/b/page.md",
     "---\ntitle: T\n---\n\nBody.\n"),
    (set(),  # a key after the block must not be read as an entry
     "docs/a/b/page.md",
     "---\nredirect_from:\n  - /docs/a/b/other.html\nlast_updated: Jan 1, 2026\n---\n\nBody.\n"),
    ({"self-redirect"},  # self mixed among valid entries is still caught
     "docs/a/b/page.md",
     "---\nredirect_from:\n  - /docs/a/b/other.html\n  - /docs/a/b/page.html\n"
     "  - /docs/a/b/third.html\n---\n\nBody.\n"),
]


def selftest():
    failures = 0
    for expected, path, sample in SELFTEST:
        findings = []
        check(path, sample, findings)
        got = {code for _, _, code, _ in findings}
        if got != expected:
            failures += 1
            print(f"FAIL {path}: expected {sorted(expected) or 'nothing'}, got {sorted(got) or 'nothing'}")
    # the mixed sample must report exactly once: only the self entry, not its neighbors
    findings = []
    check(SELFTEST[-1][1], SELFTEST[-1][2], findings)
    if len(findings) != 1:
        failures += 1
        print(f"FAIL entry coverage: expected 1 self-redirect finding, got {len(findings)}")
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

    findings = []
    for path in targets:
        check(path, open(path, encoding="utf-8", errors="replace").read(), findings)

    for path, line, code, msg in sorted(findings):
        print(f"{path}:{line}: [{code}] {msg}")
    if findings:
        print(f"\nself-redirect: {len(findings)} finding(s) in {len(targets)} file(s)")
        return 1
    print(f"self-redirect: {len(targets)} file(s) checked, no findings")
    return 0


if __name__ == "__main__":
    sys.exit(main())
