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

## Run the checker first

```bash
_scripts/docs_rot_checker/docs_rot_checker.py            # files changed vs master
_scripts/docs_rot_checker/docs_rot_checker.py --all      # whole tree
_scripts/docs_rot_checker/docs_rot_checker.py --selftest # verify the checks still fire
```

It covers every mechanical rule below: legacy front matter, `keywords` as a YAML array, retired hosts, body link
sections, `related:` link shape and dead targets, uppercase internal URLs, `.git` clone suffixes. Exit 1 on
findings. Do not retype these as greps — hand-typed patterns are how the singular `## Next step` got missed across
52 files.

The checker cannot judge the rest of this document. Those rules need a reader.

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

## Validation

```bash
vale --minAlertLevel=error path/to/file.md
npx --yes markdownlint-cli2@0.13.0 path/to/file.md
```

Pin markdownlint to `0.13.0` on Node 18 — current versions pull a `string-width` using the regex `v` flag and die
with `SyntaxError: Invalid regular expression flags`. Run from the repo root, or the repo config is not picked up
and you get spurious MD013 line-length errors.

**Errors only.** Re-run after the requester hand-edits your proposal — a human rewrite introduces fresh Vale errors
(a reintroduced `please` is the common one).

`{% comment %}` blocks are still parsed by markdownlint. A Mermaid `---` frontmatter inside one reads as a setext
heading and flips the whole file's heading style; use the `%%{init: ...}%%` form instead.

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

## Mapping analytics rows to source files

The GA page title is the rendered browser title and often does **not** match front-matter `title:` — `Claude Code
Plugin` is `ai-dev-claude-code.md` ("Claude Code"); `AI Dev SDK Skills and Agents` is
`ai-dev-workflows-skills-and-agents.md` ("Workflows, Skills, and Agents"). It tends to be section name plus page
name.

**Two rows can be one page.** `AI Dev SDK Overview` (rank 12) and `AI Dev SDK` (rank 26) both resolve to
`ai-dev.md` — the title changed mid-quarter, so GA split one page in two and halved its apparent traffic. Resolve
to paths and check for duplicates before ranking by views.

Ranks are traffic evidence: after deleting rows, keep the gaps rather than renumbering.

## Assigning audit ownership

**Read the page before assigning it.** `Spryker Marketplace` looked like evaluator content by title and metrics
(240 views, 7.9s). Its own description reads "how to start developing for your Spryker Marketplace project" — a
44-line developer hub, where the 7.9s is a link list being traversed, not a bounce.

**Assign by failure mode, not audience.** What would be wrong on this page in six months?

| Failure mode | Owner |
|---|---|
| A stale index of what ships | The team that decides what ships |
| Wrong operational steps | The team that runs the operation |
| Wrong architectural model | Architecture |
| Outdated positioning or partner data | The commercial owner |

| Traffic signature | Reading |
|---|---|
| High views, engagement under 15s | Hub or link list — audit the routing, not the prose |
| Views per user above 2.5 | Reference consulted mid-task; repeat visits often mean a gap |
| Broad unique users, views per user near 1.0 | First-visit orientation traffic |
| High views, very low engagement, high unique users | The page is not answering the question people arrive with |

**Clusters share one owner** or they get audited to different standards — the three quickstart variants split
across two teams in one draft. Cap the team list at what the requester asked for.