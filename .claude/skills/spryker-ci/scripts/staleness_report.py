#!/usr/bin/env python3
"""Report pages whose neighbourhood moved on without them.

    .claude/skills/spryker-ci/scripts/staleness_report.py docs/a/b/page.md   # one page + its neighbourhood
    .claude/skills/spryker-ci/scripts/staleness_report.py --all --top 50     # ranked backlog
    .claude/skills/spryker-ci/scripts/staleness_report.py --selftest         # verify the checks still fire

`last_updated` and the raw commit date are both ignored as staleness signals: a
typo fix, a `related:` addition or a repo-wide link sweep moves the commit date
without anyone reviewing the page. What counts is a *substantive* change --
enough changed body lines to mean someone read the document.

Findings:
  stale-vs-neighbourhood  the page had no substantive change inside the window
                          while at least `--quorum` of its neighbours did
  claim-contradiction     a number the page asserts disagrees with the number a
                          neighbour asserts about the same noun
  list-coverage           a bullet list of internal links omits pages that sit
                          in the directory the list otherwise covers

Exit status is 1 when there are findings.
"""

import argparse
import datetime
import os
import re
import subprocess
import tempfile
import sys

DOCS = "docs"
DAYS_PER_MONTH = 30.44
# Share of a directory a bullet list must already cover before an omission from
# it reads as a gap rather than as a list of unrelated things.
COVERAGE_RATIO = 0.6

FRONT_MATTER = re.compile(r"\A---\n(?P<fm>.*?)\n---\n", re.DOTALL)
BODY_LINK = re.compile(r"\]\((/docs/[^)#\s]+\.html)")
BULLET_LINK = re.compile(r"^\s*[-*] \[[^\]]+\]\((/docs/[^)#\s]+\.html)\)", re.MULTILINE)

# A changed line that only ever appears in front matter. Body prose can start a
# line with a word and a colon, so the shapes here stay narrow: top-level keys
# from the templates, and the indented members of related:/redirect_from lists.
FM_SHAPED = re.compile(
    r"""^(
        (title|description|last_updated|template|originalLink|originalArticleId
         |redirect_from|related|Description|keywords|toc|sidebar|permalink|layout|search)\s*:
        | \s+-\s+(title|link)\s*:
        | \s+link\s*:
        | \s+-\s+/\S*\s*$
        | ---\s*$
    )""",
    re.VERBOSE,
)

NUMBER_WORDS = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
    "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
}
CLAIM = re.compile(
    r"\b(?:over|more than|about|approximately|around|up to)?\s*"
    r"(\d[\d,]*|" + "|".join(NUMBER_WORDS) + r")\s+"
    r"(?:different\s+|available\s+|supported\s+|distinct\s+)?"
    r"([a-z][a-z-]+s)\b",
    re.IGNORECASE,
)
# Nouns whose counts are prose, not facts a sister page can contradict.
CLAIM_STOP = {
    "years", "months", "weeks", "days", "hours", "minutes", "seconds", "times",
    "steps", "ways", "cases", "reasons", "types", "kinds", "others", "values",
    "parameters", "arguments", "options", "columns", "rows", "characters",
}


def run(args):
    return subprocess.run(args, capture_output=True, text=True).stdout


def is_page(path):
    return path.endswith(".md") and path.startswith(DOCS + os.sep) and os.path.isfile(path)


def all_docs():
    return sorted(
        os.path.join(r, f) for r, _, fs in os.walk(DOCS) for f in fs if f.endswith(".md")
    )


def read(path):
    with open(path, encoding="utf-8", errors="replace") as fh:
        return fh.read()


def page_url(path):
    return "/" + path[: -len(".md")] + ".html"


def url_to_path(url):
    return url.lstrip("/")[: -len(".html")] + ".md"


def months_since(date, today):
    return (today - date).days / DAYS_PER_MONTH


def resolve_numstat_path(field):
    """Turn a numstat path into the post-rename path.

    Renames arrive as `old => new` or `dir/{old => new}/page.md`.
    """
    m = re.match(r"^(.*)\{(.*) => (.*)\}(.*)$", field)
    if m:
        return (m.group(1) + m.group(3) + m.group(4)).replace("//", "/")
    if " => " in field:
        return field.split(" => ")[-1]
    return field


def body_lines_changed(patch):
    """Count changed lines in a patch that are not front-matter shaped."""
    count = 0
    for line in patch.splitlines():
        if line.startswith(("+++", "---")):
            continue
        if not line.startswith(("+", "-")):
            continue
        payload = line[1:]
        if not payload.strip():
            continue
        if FM_SHAPED.match(payload):
            continue
        count += 1
    return count


def is_substantive(body_changed, files_in_commit, threshold, sweep_files):
    """A commit is a review of this page when it rewrites enough body lines.

    A commit touching more files than `sweep_files` is a repo-wide sweep. It
    still counts if this page's own body change is large enough to be a real
    edit that happened to ride along -- three times the threshold.
    """
    if body_changed < threshold:
        return False
    if files_in_commit > sweep_files and body_changed < threshold * 3:
        return False
    return True


def parse_log(out):
    """Parse `git log --format=C|sha|date --numstat` into commit blocks.

    Yields (sha, date, {path: changed_lines}).
    """
    sha = date = None
    files = {}
    for line in out.splitlines():
        if line.startswith("C|"):
            if sha:
                yield sha, date, files
            _, sha, raw = line.split("|", 2)
            date = datetime.date.fromisoformat(raw)
            files = {}
            continue
        parts = line.split("\t")
        if len(parts) == 3 and sha:
            added, deleted, field = parts
            if added == "-":  # binary
                continue
            files[resolve_numstat_path(field)] = int(added) + int(deleted)
    if sha:
        yield sha, date, files


def substantive_history(path, threshold, sweep_files, exact):
    """Substantive change dates for `path`, newest first, plus its creation date.

    Writing a page is a review of it, so the creation date is the floor: a page
    added last month inside a 200-file release PR has never been *revised*, but
    it is not stale. Returns (dates, created).
    """
    out = run(["git", "log", "--follow", "--format=C|%H|%ad", "--date=short",
               "--numstat", "--", path])
    dates = []
    created = None
    for sha, date, files in parse_log(out):
        created = date
        if not files:
            continue
        # --follow rewrites history to one path, so the single entry is this file.
        target, changed = next(iter(files.items()))
        if changed < threshold:
            continue
        if exact:
            patch = run(["git", "show", "--format=", "--unified=0", sha, "--", target])
            body_changed = body_lines_changed(patch)
        else:
            body_changed = changed
        files_in_commit = len(run(
            ["git", "show", "--format=", "--name-only", sha]).split()) if exact else 1
        if is_substantive(body_changed, files_in_commit, threshold, sweep_files):
            dates.append(date)
    return dates, created


def tree_history(threshold, sweep_files):
    """One pass over the docs history: {path: [substantive dates]}, {path: created}.

    Approximate by design, in two ways. It reads numstat totals rather than
    fetching a patch per file per commit, so a large front-matter-only edit can
    register as substantive. And it does not follow renames -- `--follow` takes
    one git process per file -- so a moved page reads as created on the day it
    moved. The 2024 `scos` -> `dg` restructure therefore dates a lot of older
    pages to 2024. Both are corrected by a single-page run, which follows
    renames and reads real patches; use this only to pick what to look at.
    """
    out = run(["git", "log", "--format=C|%H|%ad", "--date=short", "--numstat", "--", DOCS])
    history, created = {}, {}
    for _sha, date, files in parse_log(out):
        docs_files = {p: c for p, c in files.items() if p.endswith(".md")}
        for path, changed in docs_files.items():
            created[path] = date  # the log runs newest first, so the last write wins
            if is_substantive(changed, len(docs_files), threshold, sweep_files):
                history.setdefault(path, []).append(date)
    return history, created


def outbound(path, text):
    fm = FRONT_MATTER.match(text)
    body = text[fm.end():] if fm else text
    links = {url_to_path(u) for u in BODY_LINK.findall(body)}
    if fm:
        for line in fm.group("fm").splitlines():
            m = re.match(r"\s+link:\s*(\S+)", line)
            if m and "://" not in m.group(1) and m.group(1).endswith(".html"):
                links.add(url_to_path(m.group(1)))
    return links


def inbound(path):
    url = page_url(path)
    hits = set()
    for needle in (url, url.lstrip("/")):
        out = run(["git", "grep", "-l", "-F", needle, "--", DOCS])
        hits |= {p for p in out.split() if p.endswith(".md")}
    hits.discard(path)
    return hits


def siblings(path):
    directory = os.path.dirname(path)
    if not os.path.isdir(directory):
        return set()
    return {
        os.path.join(directory, f)
        for f in os.listdir(directory)
        if f.endswith(".md") and os.path.join(directory, f) != path
    }


def neighbourhood(path, text):
    groups = {
        "outbound": outbound(path, text),
        "inbound": inbound(path),
        "sibling": siblings(path),
    }
    seen = set()
    ordered = []
    for kind in ("outbound", "inbound", "sibling"):
        for neighbour in sorted(groups[kind]):
            if neighbour in seen or neighbour == path or not is_page(neighbour):
                continue
            seen.add(neighbour)
            ordered.append((neighbour, kind))
    return ordered


def claims(text):
    """Numeric assertions in the body, as {noun: (number, sentence)}."""
    fm = FRONT_MATTER.match(text)
    body = text[fm.end():] if fm else text
    body = re.sub(r"```.*?```", "", body, flags=re.DOTALL)
    found = {}
    for sentence in re.split(r"(?<=[.!?])\s+|\n", body):
        for raw, noun in CLAIM.findall(sentence):
            noun = noun.lower()
            if noun in CLAIM_STOP:
                continue
            key = raw.lower().replace(",", "")
            number = NUMBER_WORDS.get(key)
            if number is None:
                if not key.isdigit():
                    continue
                number = int(key)
            found.setdefault(noun, (number, sentence.strip()))
    return found


def contradictions(page_claims, neighbour_claims):
    """Same noun, different number."""
    out = []
    for noun, (number, sentence) in sorted(page_claims.items()):
        for neighbour, their in neighbour_claims.items():
            if noun not in their:
                continue
            other, other_sentence = their[noun]
            if other != number:
                out.append((noun, number, sentence, neighbour, other, other_sentence))
    return out


def list_coverage(path, text):
    """Bullet lists of internal links that omit pages from the directory they cover."""
    fm = FRONT_MATTER.match(text)
    body = text[fm.end():] if fm else text
    listed = {url_to_path(u) for u in BULLET_LINK.findall(body)}
    if len(listed) < 3:
        return []
    dirs = {}
    for target in listed:
        dirs.setdefault(os.path.dirname(target), set()).add(target)
    out = []
    for directory, targets in sorted(dirs.items()):
        if not os.path.isdir(directory):
            continue
        present = {
            os.path.join(directory, f)
            for f in os.listdir(directory)
            if f.endswith(".md") and os.path.join(directory, f) != path
        }
        missing = sorted(present - listed)
        # Only a list that already enumerates most of a directory is an index
        # whose omission means something. A list of the four Demo Shops is not
        # incomplete because the directory also holds supported-browsers.md --
        # it is a set of four things that happen to live there.
        if len(targets) < 3 or not missing:
            continue
        if len(targets) < COVERAGE_RATIO * len(present):
            continue
        out.append((directory, sorted(targets), missing))
    return out


def report_page(path, args, today):
    text = read(path)
    dates, created = substantive_history(path, args.threshold, args.sweep_files, exact=True)
    own = dates[0] if dates else created
    findings = []

    print(f"\n{path}")
    fm = FRONT_MATTER.match(text)
    declared = "(none)"
    if fm:
        m = re.search(r"^last_updated:\s*(.*)$", fm.group("fm"), re.MULTILINE)
        if m:
            declared = m.group(1).strip()
    if dates:
        own_text = f"{own} ({months_since(own, today):.0f} mo ago)"
    elif created:
        own_text = f"never revised; added {created} ({months_since(created, today):.0f} mo ago)"
    else:
        own_text = "not in git history"
    print(f"  last_updated: {declared}")
    print(f"  last substantive change (>= {args.threshold} body lines): {own_text}")

    neighbours = neighbourhood(path, text)
    print(f"\n  {'kind':<9} {'substantive':<12} {'months':>6}  neighbour")
    fresh = []
    neighbour_claims = {}
    for neighbour, kind in neighbours:
        n_dates, n_created = substantive_history(
            neighbour, args.threshold, args.sweep_files, exact=True)
        n_last = n_dates[0] if n_dates else n_created
        age = months_since(n_last, today) if n_last else None
        if n_last and age <= args.window and (own is None or n_last > own):
            fresh.append((neighbour, n_last, age))
        neighbour_claims[neighbour] = claims(read(neighbour))
        print(f"  {kind:<9} {str(n_last or 'none'):<12} "
              f"{('%.0f' % age) if age is not None else '-':>6}  {neighbour}")

    # A single-page run reports the drift finding only when there is drift, so
    # the tree-wide default of 0 does not turn into "0 neighbours moved".
    if len(fresh) >= max(args.quorum, 1) and (own is None or months_since(own, today) > args.window):
        findings.append(("stale-vs-neighbourhood",
                         f"{len(fresh)} neighbours had a substantive change within "
                         f"{args.window} months, this page had none"))
        for neighbour, n_last, age in sorted(fresh, key=lambda x: x[1], reverse=True):
            findings.append(("", f"  {neighbour} -> {n_last} ({age:.0f} mo ago)"))

    for noun, number, sentence, neighbour, other, other_sentence in contradictions(
            claims(text), neighbour_claims):
        findings.append(("claim-contradiction",
                         f"'{number} {noun}' here, '{other} {noun}' in {neighbour}"))
        findings.append(("", f"  here:      {sentence[:120]}"))
        findings.append(("", f"  neighbour: {other_sentence[:120]}"))

    for directory, listed, missing in list_coverage(path, text):
        findings.append(("list-coverage",
                         f"a list of {len(listed)} links covers {directory}/ but omits: "
                         + ", ".join(os.path.basename(m) for m in missing)))

    if findings:
        print()
        for code, message in findings:
            print(f"  {code + ':' if code else '':<24}{message}" if code else f"  {message}")
    else:
        print("\n  nothing to report")
    return [f for f in findings if f[0]]


def reverse_index(texts):
    """{path: number of pages linking to it}, from one pass over the tree.

    A `git grep` per page costs a process per page; the outbound links of every
    page are already parsed here, so inbound counts are the same data read the
    other way round.
    """
    counts = {path: 0 for path in texts}
    for source, text in texts.items():
        for target in outbound(source, text):
            if target != source and target in counts:
                counts[target] += 1
    return counts


def bucket_of(age, edges):
    """Index of the age bucket, or None when the page is too fresh to review."""
    for i, edge in enumerate(edges):
        if age >= edge:
            return i
    return None


def bucket_label(i, edges):
    if i == 0:
        return f"{edges[0]} months and older"
    return f"{edges[i]}-{edges[i - 1]} months"


def report_all(args, today):
    history, created = tree_history(args.threshold, args.sweep_files)
    texts = {path: read(path) for path in all_docs()}
    inbound_counts = reverse_index(texts)
    edges = args.buckets

    rows = []
    for path, text in texts.items():
        dates = history.get(path, [])
        own = dates[0] if dates else created.get(path)
        # No date at all reads as maximally old: the page predates the history
        # this pass can see.
        age = months_since(own, today) if own else 999.0
        bucket = bucket_of(age, edges)
        if bucket is None:
            continue
        fresh = 0
        for neighbour in outbound(path, text) | siblings(path):
            n_dates = history.get(neighbour, [])
            n_last = n_dates[0] if n_dates else created.get(neighbour)
            if n_last is None:
                continue
            if months_since(n_last, today) <= args.window and (own is None or n_last > own):
                fresh += 1
        if fresh < args.quorum:
            continue
        rows.append((bucket, inbound_counts.get(path, 0), own or datetime.date.min,
                     age, fresh, path, bool(dates)))

    # Age bucket first, then importance, then oldest first inside a tie. A page
    # revised last month is not worth reviewing however important it is, and a
    # page a year stale is worth reviewing even when a single page links to it.
    rows.sort(key=lambda r: (r[0], -r[1], r[2]))

    # --top applies per bucket. A global cap would be filled by the oldest
    # bucket alone -- 2000 pages deep -- and the other buckets would never print.
    current, shown = None, 0
    for bucket, inbound_count, _own, age, fresh, path, revised in rows:
        if bucket != current:
            current, shown = bucket, 0
            print(f"\n== {bucket_label(bucket, edges)}")
            print(f"{'inbound':>7} {'age':>9} {'fresh':>5}  page")
        if shown >= args.top:
            continue
        age_text = f"{age:.0f} mo" if age < 900 else "unknown"
        if not revised:
            age_text += "*"
        print(f"{inbound_count:>7} {age_text:>9} {fresh:>5}  {path}")
        shown += 1

    per_bucket = {}
    for row in rows:
        per_bucket[row[0]] = per_bucket.get(row[0], 0) + 1
    print("\n" + ", ".join(
        f"{per_bucket.get(i, 0)} pages at {bucket_label(i, edges)}"
        for i in range(len(edges))))
    print("\ninbound = pages linking here (importance). fresh = neighbours revised within "
          f"{args.window} months.\n* = never revised since it appeared at this path; this mode "
          "does not follow renames, so\nthe 2024 scos -> dg restructure reads as an addition. "
          "Re-run on a page for its exact\ndate, its inbound list and its claim checks.")
    return rows


SELFTEST_PATCH = """\
--- a/docs/a/page.md
+++ b/docs/a/page.md
-last_updated: Sep 9, 2021
+last_updated: Sep 9, 2026
-  - title: Old
-    link: docs/a/b.html
+A rewritten sentence about the layered architecture.
+A second rewritten sentence.
"""


def selftest():
    today = datetime.date(2026, 9, 9)
    checks = []

    checks.append(("patch counts body lines only, front matter ignored",
                   body_lines_changed(SELFTEST_PATCH) == 2))
    checks.append(("a typo-sized change is not substantive",
                   not is_substantive(2, 1, 8, 40)))
    checks.append(("a real rewrite is substantive",
                   is_substantive(20, 1, 8, 40)))
    checks.append(("a repo-wide sweep is not substantive",
                   not is_substantive(10, 300, 8, 40)))
    checks.append(("a big edit riding along in a sweep still counts",
                   is_substantive(30, 300, 8, 40)))
    checks.append(("rename path resolves to the new name",
                   resolve_numstat_path("docs/{old => new}/page.md") == "docs/new/page.md"))
    checks.append(("plain rename resolves to the new name",
                   resolve_numstat_path("docs/a.md => docs/b.md") == "docs/b.md"))
    checks.append(("numstat log parses into commits",
                   list(parse_log("C|abc|2026-01-02\n5\t3\tdocs/a.md\n"))
                   == [("abc", datetime.date(2026, 1, 2), {"docs/a.md": 8})]))
    checks.append(("months_since counts months",
                   round(months_since(datetime.date(2025, 9, 9), today)) == 12))

    page = claims("Spryker consists of over 750 modules.\nSpryker is split into four layers.\n")
    checks.append(("digit claim is extracted", page.get("modules", (0,))[0] == 750))
    checks.append(("spelled claim is extracted", page.get("layers", (0,))[0] == 4))
    checks.append(("prose counts are ignored",
                   "years" not in claims("Supported for three years.")))
    checks.append(("code blocks are ignored",
                   "modules" not in claims("```\nover 750 modules\n```\n")))
    checks.append(("front matter is ignored",
                   "modules" not in claims("---\ndescription: over 750 modules\n---\n\nBody.\n")))

    others = {"docs/x.md": {"modules": (900, "Spryker consists of over 900 modules.")}}
    found = contradictions(page, others)
    checks.append(("a differing number is a contradiction",
                   len(found) == 1 and found[0][0] == "modules"))
    checks.append(("a matching number is not a contradiction",
                   contradictions(page, {"docs/x.md": {"modules": (750, "same")}}) == []))

    edges = [12, 6, 3]
    checks.append(("a page older than a year lands in the oldest bucket",
                   bucket_of(18.0, edges) == 0 and bucket_of(12.0, edges) == 0))
    checks.append(("a nine-month-old page lands in 6-12", bucket_of(9.0, edges) == 1))
    checks.append(("a four-month-old page lands in 3-6", bucket_of(4.0, edges) == 2))
    checks.append(("a recently revised page is not listed at all",
                   bucket_of(2.0, edges) is None))
    checks.append(("bucket labels name their range",
                   (bucket_label(0, edges), bucket_label(2, edges))
                   == ("12 months and older", "3-6 months")))

    # (bucket, -inbound, own_date) -- bucket beats importance, importance beats age.
    unsorted = [
        (1, -40, datetime.date(2026, 1, 1), "important-but-fresher-bucket"),
        (0, -1, datetime.date(2020, 1, 1), "one-link-but-a-year-stale"),
        (0, -9, datetime.date(2024, 1, 1), "hub-a-year-stale"),
        (0, -9, datetime.date(2022, 1, 1), "equally-important-but-older"),
    ]
    order = [row[3] for row in sorted(unsorted, key=lambda r: (r[0], r[1], r[2]))]
    checks.append(("age bucket outranks importance",
                   order[-1] == "important-but-fresher-bucket"))
    checks.append(("importance orders inside a bucket",
                   order[0] == "equally-important-but-older"
                   and order[2] == "one-link-but-a-year-stale"))
    checks.append(("equal importance puts the oldest first",
                   order.index("equally-important-but-older") < order.index("hub-a-year-stale")))

    linked = {
        "docs/a.md": "---\ntitle: A\n---\n\n[x](/docs/hub.html)\n",
        "docs/b.md": "---\ntitle: B\n---\n\n[x](/docs/hub.html)\n",
        "docs/hub.md": "---\ntitle: H\n---\n\nNo links.\n",
    }
    counts = reverse_index(linked)
    checks.append(("inbound links are counted from one pass",
                   counts["docs/hub.md"] == 2 and counts["docs/a.md"] == 0))

    with tempfile.TemporaryDirectory() as tmp:
        directory = os.path.join(tmp, DOCS, "s")
        os.makedirs(directory)
        names = ["a.md", "b.md", "c.md", "d.md", "e.md", "index.md"]
        for name in names:
            open(os.path.join(directory, name), "w").close()
        cwd = os.getcwd()
        os.chdir(tmp)
        try:
            index = os.path.join(DOCS, "s", "index.md")
            enumerating = "---\ntitle: T\n---\n\n" + "".join(
                f"- [{n}](/{DOCS}/s/{n[:-3]}.html)\n" for n in ["a.md", "b.md", "c.md", "d.md"])
            found = list_coverage(index, enumerating)
            checks.append(("an index list reports the page it omits",
                           len(found) == 1 and [os.path.basename(m) for m in found[0][2]]
                           == ["e.md"]))
            partial = "---\ntitle: T\n---\n\n" + "".join(
                f"- [{n}](/{DOCS}/s/{n[:-3]}.html)\n" for n in ["a.md", "b.md"])
            checks.append(("a short list of unrelated pages is not an index",
                           list_coverage(index, partial) == []))
        finally:
            os.chdir(cwd)

    failed = [name for name, ok in checks if not ok]
    for name in failed:
        print(f"FAIL: {name}")
    print(f"selftest: {len(checks) - len(failed)}/{len(checks)} checks passed")
    return 1 if failed else 0


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("paths", nargs="*", help="pages to report on")
    parser.add_argument("--all", action="store_true", help="rank the whole docs tree")
    parser.add_argument("--selftest", action="store_true")
    parser.add_argument("--threshold", type=int, default=8,
                        help="body lines changed that make a commit a review (default 8)")
    parser.add_argument("--window", type=int, default=12,
                        help="months a neighbour's change counts as recent (default 12)")
    parser.add_argument("--quorum", type=int, default=0,
                        help="fresh neighbours needed to list a page in --all (default 0: age "
                             "decides, drift is only reported)")
    parser.add_argument("--buckets", default="12,6,3",
                        type=lambda v: [int(x) for x in v.split(",")],
                        help="age bucket edges in months, oldest first (default 12,6,3). "
                             "A page younger than the last edge is not listed")
    parser.add_argument("--sweep-files", type=int, default=40,
                        help="files in a commit above which it reads as a sweep (default 40)")
    parser.add_argument("--top", type=int, default=50, help="rows to print for --all")
    args = parser.parse_args()

    if args.selftest:
        return selftest()
    today = datetime.date.today()
    if args.all:
        return 1 if report_all(args, today) else 0
    if not args.paths:
        parser.error("name a page, or pass --all")
    findings = []
    for path in args.paths:
        if not is_page(path):
            print(f"not a docs page: {path}", file=sys.stderr)
            return 2
        findings += report_page(path, args, today)
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main())
