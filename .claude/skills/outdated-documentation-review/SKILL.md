---
name: outdated-documentation-review
description: Use when auditing docs.spryker.com pages for staleness — reviewing a page flagged as outdated, working
  through a docs audit backlog, checking a page's last_updated date, hunting legacy front matter or versioned links,
  or assigning audit ownership of top-traffic pages to teams.
---

# Outdated Documentation Review

A page can pass Vale and markdownlint with zero errors and still be two years out of date, point at a retired
portal, or route a community contributor into a login wall. The linters catch prose; this skill catches rot.

**Verify the page against reality before judging it** — its front matter, its body, and the live HTTP status of its
links. Not the page title, and not your prior about what a page named like that usually holds.

## What gets checked

| Check | Catches |
|---|---|
| `related_checker.py` | Sister and subpage `related:` entries, non-`https` external links, leading slashes, missing `.html`, dead targets, leftover body link sections |
| Retired hosts and legacy front matter | `support.spryker.com`, `commercequest.space`, `documentation.spryker.com`, and the `originalLink` / `originalArticleId` they left behind |
| Link liveness, `curl` without `-L` | Redirects hidden behind a final `200`, and a `200` that lands somewhere useless — a member login wall, a restructured path |
| Hand-written body link sections | Trailing link lists that duplicate what the theme renders from front-matter `related:` |
| Inbound references | Body links, other pages' `related:` blocks, sidebar `url:` **and** `title:`, `redirect_from`, and `#fragment` targets after a page changes identity |
| Prose patterns Vale misses | Stiff phrasing, unexpanded acronyms, and contradictory escalation paths that no rule fires on |

## Run the `related:` checker first

```bash
_scripts/related_checker/related_checker.py            # files changed vs master
_scripts/related_checker/related_checker.py --all      # whole tree
_scripts/related_checker/related_checker.py --selftest # verify the checks still fire
```

It reports sisters and subpages, non-`https` external links, leading slashes, missing `.html`, dead targets, and
leftover body link sections. Exit 1 on findings. Run `--selftest` after editing it: a broken pattern reports
nothing and looks like a pass, which is how the singular `## Next step` slipped past a hand-typed grep across 52
files.

Everything else in this document needs a reader.

## Facts the checker encodes

| Thing | Current state |
|---|---|
| Training platform | `https://spryker.com/training`, no trailing slash. `training.` → `academy.` → `safari.spryker.com` all redirect there, and deep course paths land on the root |
| Support portal | `portal.spryker.com`, called **Spryker Portal**. `support.spryker.com` is the old one |
| Community | Slack, via `{{ site.community_slack_invite }}` in `_config.yml`. `commercequest.space` is `NXDOMAIN` |
| Legacy portal | `documentation.spryker.com` is retired; `originalLink` / `originalArticleId` are its leftovers |

Traps in those:

- **Do not bulk-rename "Spryker Support Portal"** — different files use that phrase for *both* hosts. Check the URL
  beside each occurrence.
- **"Customer Portal" in PBC pages** is a Back Office menu item, not a website.
- **Release notes keep historical wording and versioned links.** They are the one exception to the no-version-IDs
  rule.
- **Deep paths rarely survive a host move.** `support.spryker.com/s/case-funnel-problem` has no known equivalent —
  ask rather than inventing one.
- **A `curl` of a Slack invite returns 403 to bots.** Not evidence the invite is broken.

## Links

**Check redirects without `-L`.** A `-sL` pass reports the post-redirect `200` and hides the move:

```bash
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' --max-time 15 "$u"
```

A `-sL` pass on `code-contribution-guide.md` called every link current; the `-L`-free pass found three
`docs.github.com` links `301`ing to restructured paths.

**A renamed destination usually renames the concept.** `symfony.com/components` → `symfony.com/packages` also means
"Symfony Components" → "Symfony Packages" in the sentence around the link. Fixing the URL alone is a half-fix.

**A `200` can still be the wrong destination.** `portal.spryker.com` answers `307` into a member login — right for a
customer, useless on a page written for external contributors.

**Never touch a URL just to add `.html`.** Both forms serve `200` and the link checker resolves either. Add the
suffix only while rewriting a URL for a real reason; write new links with it.

**Entry point depends on page type:** generic pages link `set-up-spryker-locally.html`, technical pages (quickstarts
included) link `install-spryker.html` with the text "Install Spryker".

## Hand-written link sections belong in `related:`

A trailing link list is a hand-rolled version of what the theme renders. **Move every entry into front-matter
`related:` and delete the section — all of it, including external links. No body link section survives.** The aside
gets icons and `data-toc-skip`; a body list instead pollutes the TOC. Repo-wide it is 1200 files to 200.

Internal links are path-only with `.html` and no leading slash. **External links must be `https://`** — the layout
prepends `/` to anything else.

**Drop sisters and direct subpages.** The sidebar already lists the pages beside the current one, so a `related:`
entry pointing there is duplicate navigation. The test is one directory comparison: drop the entry when the target
is in the source page's own directory. Anything further away stays — deeper descendants, parents, cousins in a
neighbouring branch, and pages in another section.

```text
docs/a/b/page.md  →  docs/a/b/other.html          drop (sister)
                  →  docs/a/b/deeper/child.html   keep (subpage)
                  →  docs/a/parent.html           keep (parent)
                  →  docs/a/c/other.html          keep (cousin)
```

Do not judge this from the sidebar YAML. Its nesting is not reliably parseable across sidebar files — an indexer
reported `api-platform.html`'s parent as `architecture.html`, which would have deleted a legitimate cross-section
link.

**Removing the last entry removes the key.** An empty `related:` is not valid front matter; delete the whole key.
Whole blocks do go: 11 of 13 files in one sweep lost `related:` entirely, because a page's related links were all
its own children.

**Ordering:** the body list's order first, then entries that existed only in `related:`. Deduplicate.

**Carry the body's description into `title:`; the page name alone throws the sentence's information away.**

| Body shape | `title:` |
|---|---|
| `To learn about X, see [Page]` | X, capitalized — `Layered architecture pattern` |
| `To know more about X, see [Page]` | same; the intro wording varies |
| `To <verb> X, see [Page]` | the imperative — `Implement a client for your project` |
| `[Page]`, or `[Page] - description` | the link text |

Strip with `^- *To (learn|know|read|find out) (more )?about |^- *To |, see \[.*$`, then capitalize and drop the
period. Entries that only ever lived in `related:` keep their page-name titles.

**Report dropped `- description` suffixes.** They do not fit a sidebar label, so dropping them is right — but say
so rather than losing 15 of them quietly.

## Changing a document means changing the links to it

Whatever you changed about a page's identity — filename, title, or the name of the thing it describes — is repeated
in every page that links to it.

| Reference | Where |
|---|---|
| Body links | `docs/**` |
| `related:` blocks | front matter of other pages |
| Sidebar entry | `_data/sidebars/*.yml` — `url:` **and** `title:` |
| `redirect_from` | the renamed page: add its previous URL |

**Labels are references too.** Renaming `using-the-support-portal.md` to `using-the-support-hub.md` left four labels
reading "How to use the Support Portal" — sidebar, two `related:` blocks, two body links — each naming a page that
no longer existed. A path-only rename passes every linter and still lies to the reader.

**Match an inbound label to the destination's own `title:`.** The canonical site name is "Spryker Portal", but that
page titles itself "Using the Support Hub", so the labels say Support Hub. (This is the opposite of the conversion
rule above: a rename copies the destination's name, a conversion keeps the source sentence's description.)

**Check `#fragment` links still find their heading.**

## Prose patterns Vale misses

| Pattern | Fix |
|---|---|
| `In case you cannot find them` | `If you cannot find them` |
| `Spryker endeavors to…` | `We aim to…` |
| Unexpanded acronyms (`CSM`) | expand on first use — external readers have none |
| Two sections giving the same escalation path to different destinations | pick one |
| `Symfony Components` | `Symfony Packages` |

`please` is a Vale **error** (`Spryker.over-politeness`), so CI catches that one.

## Presenting findings

**Report cleared suspicions, not just confirmed ones.** "All four repo links are live, nothing to remove" is a
finding.

**A finding needs a reader-visible consequence.** Name what breaks or misleads if it stays. "The standard says
`.html`" is not a consequence when both forms serve `200`; "the domain does not resolve" is. Cosmetic diffs bury
the changes that matter.

**Change only what was asked.** If the request is the team column, do not also rewrite the rationale beside it —
flag the inconsistency and let the requester decide.
