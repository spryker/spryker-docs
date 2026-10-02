# Outdated documentation review

Use this when auditing pages for staleness — a page flagged as outdated, a docs audit backlog, a `last_updated` check, or a hunt for legacy front matter and versioned links.

A page can pass Vale and markdownlint with zero errors and still be two years out of date, point at a retired portal, or route a community contributor into a login wall. The linters catch prose; this catches rot.

**Verify the page against reality before judging it** — its front matter, its body, and the live HTTP status of its links. Not the page title, and not your prior about what a page named like that usually holds.

## What gets checked

| Check | Catches |
|---|---|
| `related_checker.py` | Sister and subpage `related:` entries, non-`https` external links, leading slashes, missing `.html`, dead targets, leftover body link sections |
| Retired hosts and legacy front matter | `support.spryker.com`, `commercequest.space`, `documentation.spryker.com`, and the `originalLink` / `originalArticleId` they left behind |
| Link liveness, `curl` without `-L` | Redirects hidden behind a final `200`, and a `200` that lands somewhere useless — a member login wall, a restructured path |
| Hand-written body link sections | Trailing link lists that duplicate what the theme renders from front-matter `related:` |
| Inbound references | Body links, other pages' `related:` blocks, sidebar `url:` **and** `title:`, `redirect_from`, and `#fragment` targets after a page changes identity |
| Prose patterns Vale misses | Stiff phrasing, unexpanded acronyms, and contradictory escalation paths that no rule fires on |

The checkers are automatable; everything else here needs a reader.

## Cross-referencing a page against its neighbourhood

When the suspicion is "this page was not touched while everything around it was", start with the staleness report:

```bash
.claude/skills/spryker-ci/scripts/staleness_report.py docs/about/all/about-spryker.md   # one page
.claude/skills/spryker-ci/scripts/staleness_report.py --all --top 50                    # ranked backlog
.claude/skills/spryker-ci/scripts/staleness_report.py --selftest
```

It measures **substantive** change — commits rewriting at least 8 body lines, front matter excluded, repo-wide sweeps excluded — because a typo fix or a `related:` addition moves the commit date without anyone reviewing the page. `last_updated` and the raw commit date are both ignored for the same reason; on `about-spryker.md` the field says 2021 while git shows body changes in 2025.

It reports three things: `stale-vs-neighbourhood` (neighbours revised inside the window while this page was not), `claim-contradiction` (a number here disagreeing with a neighbour's number for the same noun), and `list-coverage` (an index list that omits pages from the directory it covers). Full behaviour and the tuning options are in `references/staleness-report.md`.

`--all` ranks the backlog by age bucket first — 12 months and older, then 6-12, then 3-6 — and inside each bucket by how many pages link to it, oldest first on a tie. Pages revised within three months are not listed. **Work a bucket top-down and do not reorder across buckets:** a page revised last month is not worth reviewing however important it is, and a year-stale page is worth reviewing even when only one page links to it.

**The report is a shortlist, not a verdict.** It cannot tell whether a neighbour's change bears on this page. Read the flagged neighbours' diffs, then judge:

- A neighbour that gained a section this page summarizes — the summary is now short.
- A neighbour that renamed the thing this page names — check the term, not just the link.
- A neighbour whose numbers moved — module counts, layer counts, supported versions.
- A neighbour that changed a procedure this page links to as a next step.

**A fresh neighbour is not proof of rot.** Say so when the neighbours' changes turn out not to touch this page's claims; that is a cleared suspicion and worth reporting as one.

## Current state of the things pages point at

| Thing | Current state |
|---|---|
| Training platform | `https://spryker.com/training`, no trailing slash. `training.` → `academy.` → `safari.spryker.com` all redirect there, and deep course paths land on the root |
| Support portal | `portal.spryker.com`, called **Spryker Portal**. `support.spryker.com` is the old one |
| Community | Slack, via `{{ site.community_slack_invite }}` in `_config.yml`. `commercequest.space` is `NXDOMAIN` |
| Legacy portal | `documentation.spryker.com` is retired; `originalLink` / `originalArticleId` are its leftovers |

Traps in those:

- **Do not bulk-rename "Spryker Support Portal"** — different files use that phrase for *both* hosts. Check the URL beside each occurrence.
- **"Customer Portal" in PBC pages** is a Back Office menu item, not a website.
- **Release notes keep historical wording and versioned links.** They are the one exception to the no-version-IDs rule.
- **Deep paths rarely survive a host move.** `support.spryker.com/s/case-funnel-problem` has no known equivalent — ask rather than inventing one.
- **A `curl` of a Slack invite returns 403 to bots.** Not evidence the invite is broken.

## Links

**Check redirects without `-L`.** A `-sL` pass reports the post-redirect `200` and hides the move:

```bash
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' --max-time 15 "$u"
```

A `-sL` pass on `code-contribution-guide.md` called every link current; the `-L`-free pass found three `docs.github.com` links `301`ing to restructured paths.

**A renamed destination usually renames the concept.** `symfony.com/components` → `symfony.com/packages` also means "Symfony Components" → "Symfony Packages" in the sentence around the link. Fixing the URL alone is a half-fix.

**A `200` can still be the wrong destination.** `portal.spryker.com` answers `307` into a member login — right for a customer, useless on a page written for external contributors.

**Never touch a URL just to add `.html`.** Both forms serve `200` and the link checker resolves either. Add the suffix only while rewriting a URL for a real reason; write new links with it.

**Entry point depends on page type:** generic pages link `set-up-spryker-locally.html`, technical pages (quickstarts included) link `install-spryker.html` with the text "Install Spryker".

## Prose patterns Vale misses

| Pattern | Fix |
|---|---|
| `In case you cannot find them` | `If you cannot find them` |
| `Spryker endeavors to…` | `We aim to…` |
| Unexpanded acronyms (`CSM`) | expand on first use — external readers have none |
| Two sections giving the same escalation path to different destinations | pick one |

`please` is a Vale **error** (`Spryker.over-politeness`), so CI catches that one.

## Presenting findings

**Report cleared suspicions, not just confirmed ones.** "All four repo links are live, nothing to remove" is a finding.

**A finding needs a reader-visible consequence.** Name what breaks or misleads if it stays. "The standard says `.html`" is not a consequence when both forms serve `200`; "the domain does not resolve" is. Cosmetic diffs bury the changes that matter.

**Change only what was asked.** If the request is the team column, do not also rewrite the rationale beside it — flag the inconsistency and let the requester decide.
