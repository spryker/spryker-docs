# Staleness report

This document explains how the staleness report works and how to run it.

The staleness report finds pages whose neighbourhood moved on without them. It answers one question: several pages around this one were revised in the last few months — was this one?

## What it does not use

**`last_updated` is not a staleness signal.** It is a front-matter field that a bot bumps and a bulk edit resets, and it disagrees with git often enough to be useless on its own. `docs/about/all/about-spryker.md` declares `Sep 9, 2021` while git shows body changes in 2025.

**The raw commit date is not one either.** A typo fix, a `related:` addition or a repo-wide link sweep all move it without anyone reviewing the page.

## What counts as a change

A **substantive** change is a commit that rewrites at least `--threshold` body lines of the page (default 8). Front-matter lines do not count, so adding a `related:` block or bumping a date is not a review.

A commit touching more than `--sweep-files` files (default 40) is a repo-wide sweep and does not count — unless the page's own body change is at least three times the threshold, which makes it a real edit that happened to ride along in a big commit.

Writing a page is a review of it, so the creation date is the floor. A page added last month inside a 200-file release PR has never been *revised*, but it is not stale.

## Run it

```bash
.claude/skills/spryker-ci/scripts/staleness_report.py docs/about/all/about-spryker.md   # one page
.claude/skills/spryker-ci/scripts/staleness_report.py --all --top 50                    # ranked backlog
.claude/skills/spryker-ci/scripts/staleness_report.py --selftest                        # verify the checks
```

Exit status is 1 when there are findings.

| Option | Default | Meaning |
|---|---|---|
| `--threshold` | 8 | body lines changed that make a commit a review |
| `--window` | 12 | months within which a neighbour's change counts as recent |
| `--buckets` | `12,6,3` | age bucket edges in months, oldest first; a page younger than the last edge is not listed |
| `--quorum` | 0 | fresh neighbours needed to list a page in `--all`; 0 means age decides and drift is only reported |
| `--sweep-files` | 40 | files in a commit above which it reads as a sweep |
| `--top` | 50 | rows printed **per bucket** by `--all` |

Run `--selftest` after editing the script. A regex that matches nothing reports nothing and reads as a pass.

## How `--all` ranks

Age gates, importance orders:

1. **Age bucket** — 12 months and older, then 6-12, then 3-6. A page revised in the last three months is not listed at all, however important it is.
2. **Importance inside the bucket** — the number of pages linking to it. A page a year stale is worth reviewing even when a single page links to it, so importance never promotes a page out of its bucket.
3. **Oldest first** on equal importance.

`inbound` is the importance column, counted from a reverse-link index built in the same pass that reads the pages. `fresh` — neighbours revised inside the window — is reported but does not gate anything: a stale page with no moving neighbours is still stale. Set `--quorum 1` or higher to list only pages whose neighbourhood actually moved.

`--top` applies per bucket. A global cap would be spent inside the oldest bucket, which holds most of the tree, and the fresher buckets would never print.

## The neighbourhood

For a single page, the neighbourhood is:

| Kind | Source |
|---|---|
| `outbound` | body links to `/docs/*.html`, plus front-matter `related:` links |
| `inbound` | every page that links to this one, in its body or its `related:` block |
| `sibling` | the other pages in the same directory |

`--all` computes inbound counts for every page from a reverse-link index — the same body and `related:` links, read the other way round — and uses outbound links and siblings for the `fresh` count. A single-page run resolves inbound links with `git grep` instead, so it also catches textual references the index does not model, such as the page's URL sitting in another page's `redirect_from` list.

## Findings

**`stale-vs-neighbourhood`** — the page had no substantive change inside the window while at least `--quorum` neighbours did. The report lists which neighbours and when, so you can see whether their changes actually bear on this page.

**`claim-contradiction`** — a number this page asserts disagrees with the number a neighbour asserts about the same noun ("over 750 modules" here, "over 900 modules" there). This is how overview pages rot: the prose stays grammatical while the count goes wrong. Counts of time and procedure (`three years`, `five steps`) are ignored.

**`list-coverage`** — a bullet list of internal links already covers most of a directory but omits pages sitting in it, which is what happens when someone adds a page and forgets the index. A list must cover at least 60% of the directory and hold three or more links before an omission is reported: a list of the four Demo Shops is not incomplete because the directory also holds `supported-browsers.md`.

## Accuracy of the two modes

A single-page run is exact. It follows renames and reads the real patch of every candidate commit.

`--all` is a triage ranking, and approximate in two ways: it reads numstat totals instead of patches, so a large front-matter-only edit can register as substantive; and it does not follow renames, because `--follow` costs one git process per file. A page moved by the 2024 `scos` → `dg` restructure therefore reads as created in 2024 — `upgrade-and-migrate.md` reads as 2024-01-16 there and 2021-08-11 with `--follow`. Rows marked `*` are the ones this affects. Use `--all` to pick what to look at, then re-run on the page.

## What it cannot tell you

The script reports dates and numbers. It cannot tell you whether a neighbour's change means anything for this page — that needs someone to read both. Its output is the shortlist for that reading, not the verdict.
