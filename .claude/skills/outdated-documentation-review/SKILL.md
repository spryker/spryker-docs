---
name: outdated-documentation-review
description: Use when auditing docs.spryker.com pages for staleness — reviewing a page flagged as outdated, working
  through a docs audit backlog, checking a page's last_updated date, hunting legacy front matter or versioned links,
  or assigning audit ownership of top-traffic pages to teams.
---

# Outdated Documentation Review

## Overview

A staleness audit is not a proofread. A page can pass Vale and markdownlint with zero errors and still be two years
out of date, point at a retired portal, or route a community contributor into a login wall. The linters catch prose;
this skill catches rot.

Core principle: **verify the page against reality before judging it.** Reality means the file's front matter, the
page body, and the live HTTP status of every link it contains — not the page title and not your prior of what a page
named like that usually holds.

## Rot checklist

Run all of these on every page. Each has bitten a real audit.

### 1. Legacy `original*` front matter

```yaml
originalLink: https://documentation.spryker.com/2021080/docs/code-contribution-guide
originalArticleId: d5ded6f2-5bb9-4288-bc96-3fabf7e32c8f
```

Delete both. They are migration metadata from the retired `documentation.spryker.com` portal, render nothing, and
carry a version ID. Roughly 1,288 files still have them, so their presence is not evidence anyone maintains the page.

### 2. Versioned links

Every link must point at current documentation. A URL carrying a version ID is an error, not a suggestion:
`documentation.spryker.com/2021080/…`, or any path with a version segment.

**Only exception: release notes.** A specific release's notes must stay addressable.

### 3. Dead or redirected links

Check every external link for real. Do not eyeball them.

```bash
for u in <urls>; do
  printf "%s " "$u"
  curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' --max-time 15 "$u"
done
```

Run without `-L` first: a `301`/`307` reveals a renamed repo or a moved page that a `curl -sL` check would hide
behind a final `200`. Then follow redirects to confirm the destination is alive.

This is not theoretical. A `-sL` pass on `code-contribution-guide.md` reported every link `200`; a later `-L`-free
pass on the same file found three `docs.github.com` links `301`ing to restructured paths. **Never accept a `-sL`
`200` as evidence a link is current.**

**A renamed destination usually renames the concept too.** When a redirect lands somewhere with a different noun,
grep the changed files for the old noun in prose — `symfony.com/components` → `symfony.com/packages` also means
"Symfony Components" → "Symfony Packages" in the sentence around it. Fixing the URL and leaving the words is a
half-fix.

### 4. Gated destinations

A link can return `200` and still be wrong for the audience. `https://portal.spryker.com` answers `307` into a
HubSpot member login — fine for a customer, useless on a page whose readers are external community contributors.
Match the destination's access model to the page's audience.

### 5. Dead community link: `commercequest.space`

The CommerceQuest domain no longer resolves — `NXDOMAIN`, not a 404 or a redirect, so a browser shows a DNS error.
Every mention is rephrased to point at the community Slack instead:

```markdown
you can connect with the Spryker community on [Slack]({{ site.community_slack_invite }})
```

Never paste the invite URL into a page. Shared Slack invites expire, so the link lives in `_config.yml` as
`community_slack_invite` and pages reference the variable — one edit when it is regenerated, instead of one edit per
page. A `curl` of a Slack shared invite answers `403` to bots; that is not evidence the invite is broken.

As of this writing the domain still appears in 8 files across `docs/about/`, `docs/integrations/`, and `docs/dg/`.
Fix the ones in your current scope; do not wander outside it.

### 6. `keywords` written as a YAML array

Write `keywords` as a bare comma-separated string, never a bracketed list:

```yaml
keywords: ai, coding-assistants, phpactor, LSP
```

`_includes/head.html` renders it with `<meta name="keywords" content="… {{page.keywords}}">` — a plain
interpolation, not a loop. Liquid prints a YAML array by concatenating its elements with **no separator**, so
`[ai, coding-assistants, phpactor]` reaches the page as `aicoding-assistantsphpactor`. The brackets do not merely
break convention; they corrupt the meta tag.

Check the whole tree, not just the page in hand — this form tends to appear once and spread by copy-paste:

```bash
grep -rlE '^keywords: *\[' docs/
```

### 7. Training platform: `https://spryker.com/training`

The training platform — historically Safari, before that Academy — now lives at `https://spryker.com/training`.
Every older host redirects there through a chain:

```
training.spryker.com  →  academy.spryker.com  →  safari.spryker.com  →  spryker.com/training
```

Link the final URL, never a hop in the chain, and write it without a trailing slash (`spryker.com/training/`
answers `301`). Deep course paths do not survive: `training.spryker.com/courses/developer-bootcamp` lands on the
platform root, not on that course, so a link promising a specific course now misleads the reader.

```bash
grep -rlE 'training\.spryker\.com|academy\.spryker\.com|safari\.spryker\.com' docs/
```

### 8. Old support portal: `support.spryker.com`

`support.spryker.com` is the **old** portal. The current one is `portal.spryker.com`, named **Spryker Portal**.

Both still answer `200`, so a link check will not flag the old host — only this rule will. Repoint links, and use
"Spryker Portal" as the name whenever the link text names the destination rather than an action ("contact us",
"request it here" can stay as they are).

Two traps:

- **Do not bulk-rename "Spryker Support Portal".** That phrase is used for *both* hosts in different files, so a
  blind replace silently merges two destinations. Check the URL beside each occurrence.
- **"Customer Portal" is usually unrelated** — in PBC pages it is a Back Office navigation item
  (`**Customer Portal** > **Assets**`), not a website. Leave those alone. Release notes keep their historical wording.

Deep paths such as `support.spryker.com/s/case-funnel-problem` have no known `portal.spryker.com` equivalent; ask
rather than guessing a replacement path.

### 9. `.git` suffix on clone URLs

Write the repository URL as the redirect target, without `.git`:

```shell
git clone https://github.com/spryker-shop/b2b-demo-marketplace -b {{page.release_tag}} --single-branch ./b2b-demo-marketplace
git clone https://github.com/spryker/docker-sdk --single-branch docker
```

`https://github.com/spryker/docker-sdk.git` answers `301` to the suffix-free URL. Both clone fine, so this is a
cleanliness rule, not a breakage: link to where the redirect lands.

Apply it to every variant of the page at once. Install and quickstart guides duplicate the same clone block across
macOS/Linux, Windows, Demo mode, and Development mode — fixing one leaves the cluster inconsistent.

### 10. Uppercase in internal URLs

Internal URLs are lowercase, always, because Jekyll derives them from the filename. Display text follows the
product's spelling; the URL does not.

```markdown
[Install Docker prerequisites on macOS](/docs/dg/dev/…/install-docker-prerequisites-on-macos.html)
```

`…-on-macOS.html` answers `301` on the live site and lands on the lowercase URL with `.html` stripped, so it looks
harmless in a browser. It is not: `bundle exec rake check_dg` runs `_scripts/internal_link_checker/internal_link_checker.rb`,
which resolves targets through `@valid_files.include?(target_path)` — an exact-match `Set` with no case folding.
An uppercase path is absent from that set and fails the build. The runtime redirect is invisible to the checker.

**Never touch a URL just to add `.html`.** Both forms work — the live site serves each with a `200`, and the link
checker resolves a bare path through its `@valid_files.include?("#{target_path}.html")` branch. A diff whose only
content is an added suffix is noise in review: it costs a reviewer a line to read and changes nothing.

Add the suffix only as a rider on a URL you are already rewriting for a real reason — following a redirect, or
fixing case. Write new links with `.html`, per the repo standard; leave existing ones alone.

Scan changed files before finishing:

```bash
for f in $(git diff --name-only); do
  grep -nE '\]\(/docs/[^)]*[A-Z][^)]*\)|link: docs/[^ ]*[A-Z]' "$f" 2>/dev/null | sed "s|^|$f:|"
done
```

### 11. Wrong entry-point link for the page type

When a page points at the start of the local setup journey, the target depends on what kind of page it is:

| Page type | Entry-point target |
|---|---|
| Generic | `/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html` |
| Technical (quickstart guides included) | `/docs/dg/dev/set-up-spryker-locally/install-spryker/install-spryker.html` |

Use the link text "Install Spryker" for the technical target.

### 12. `last_updated`

Update it to today's date after any edit — required by the repo standard. Before editing, read it as the staleness
signal: it is the single fastest triage input across a backlog.

### 13. Stale prose patterns

| Pattern | Fix | Why |
|---|---|---|
| Contractions (`can't`, `don't`) | `cannot`, `do not` | Style guide bans them |
| `In case you cannot find them` | `If you cannot find them` | Wordy, reads non-native |
| `Spryker endeavors to…` | `We aim to…` | Formal jargon; page already uses "we" |
| `please` anywhere | Delete it | Vale `Spryker.over-politeness`, **error** level, fails CI |
| Unexpanded acronyms (`CSM`) | Expand on first use | External readers have no CSM |
| Two sections giving the same escalation path to different destinations | Pick one | Reader cannot tell which is right |
| `Support Portal`, `Spryker Support Portal`, `Customer Portal` | `Spryker Portal` | Canonical name for `portal.spryker.com`; release notes keep their historical wording |
| `Symfony Components` | `Symfony Packages` | Symfony renamed them; `symfony.com/components` `301`s to `symfony.com/packages` |

## Hand-written link sections belong in `related:`

A trailing link list is a hand-rolled version of what the theme already renders. **Move every entry into
front-matter `related:` and delete the section — all of it, including external links. No body link section survives
the conversion.**

`_layouts/page.html` renders `related:` as a styled "Related articles" aside with icons and `data-toc-skip`, so it
stays out of the on-page TOC. A body list gets none of that and adds a TOC entry. Repo-wide the front-matter form
wins 1200 files to 200.

**Find them with the full heading set, singular included.** Matching only `## Next steps` misses `## Next step`,
which is what `about-spryker-docs.md` and `client.md` used — two files skipped on the first sweep:

```bash
grep -rlE '^##+ (Next steps?|Further reading|Related|See also|Read next|What.s next)[[:space:]]*$' docs/
```

`##+` because the section is sometimes an `###`, and `steps?` because both numbers occur.

**Ordering:** keep the order the body list had, then append the entries that existed only in `related:`.
Deduplicate — an entry in both places appears once.

**Carry the body's description into `title:`, do not fall back to the page name.** A body bullet says *why* the
reader should follow the link, and that reason is the only thing the aside can show. Bullets come in four shapes:

| Body shape | What to do | Example → `title:` |
|---|---|---|
| `To learn about X, see [Page]` | Strip the scaffolding, keep X | `To learn about the layered architecture pattern, see [Multitier architecture]` → `Layered architecture pattern` |
| `To know more about X, see [Page]` | Same — the intro wording varies | `To know more about the building blocks of Spryker, see [Programming Concepts]` → `Building blocks of Spryker` |
| `To <verb> X, see [Page]` | Keep the imperative, drop `see [Page]` | `To implement a client for your project, see [Implementing a client]` → `Implement a client for your project` |
| `[Page]` alone, or `[Page] - description` | Keep the link text | `[Integrate API Platform](…) - Setup and configuration` → `Integrate API Platform` |

The intro phrases to strip, as a regex over the bullet:

```
^- *To (learn|know|read|find out) (more )?about |^- *To |, see \[.*$
```

Capitalize the surviving fragment and drop the trailing period. `the building blocks of Spryker` becomes
`Building blocks of Spryker`.

Replacing a descriptive bullet with the bare page name throws away the sentence's information and leaves a list of
nouns that does not tell the reader why any of them is there. Two exceptions keep page-name titles: entries that
came from `related:` in the first place, with no body text behind them, and bullets whose link text is already the
description.

**A `- description` suffix is a real loss, so say so.** In the `[Page] - description` shape the suffix does not fit a
sidebar label, and folding it in ("Integrate API Platform — Setup and configuration") reads badly in a narrow
column. Dropping it is the right call, but report it rather than letting 15 descriptions disappear silently.

**External links need the layout guard.** The template used to do `{% assign link = relatedPage.link | prepend: '/' %}`
unconditionally, which turns `https://en.wikipedia.org/…` into `/https://en.wikipedia.org/…`. Both `page.html` and
`custom_new.html` now skip the prepend for links that begin with `https://`:

```liquid
{% assign linkProtocol = relatedPage.link | slice: 0, 8 %}
{% if linkProtocol == 'https://' %}
    {% assign link = relatedPage.link %}
{% else %}
    {% assign link = relatedPage.link | prepend: '/' %}
{% endif %}
```

Liquid has no `startswith`, hence `slice: 0, 8` into a variable — a filter cannot be applied inside an `if`.

**Every external `related:` link must be `https://`.** The guard matches that prefix and nothing else, so a
`http://` entry silently falls into the else branch and renders as `/http://…`. Before adding an external link,
confirm the host serves HTTPS and use it:

```bash
grep -rn '^    link: http://' docs/     # must stay empty
```

Internal links stay path-only with `.html` and no leading slash; external links go in as the full `https://` URL.

## Changing a document means changing the links to it

A page is not finished when its own body is correct. Whatever you changed about its identity — filename, title, or
the name of the thing it describes — is repeated in every page that links to it, and those copies do not update
themselves.

After any such change, sweep the whole tree for inbound references:

```bash
grep -rn '<old-filename>' docs/ _data/     # URLs, related: blocks, sidebar entries
grep -rn -B1 '<new-filename>' docs/ | grep 'title:'   # labels that still say the old name
```

Fix all four kinds of reference:

| Reference | Where |
|---|---|
| Body links | `docs/**` — `[label](/docs/…)` |
| `related:` blocks | front matter of other pages |
| Sidebar entry | `_data/sidebars/*.yml` — both `url:` **and** `title:` |
| `redirect_from` | the renamed page itself: add its previous URL so old links keep resolving |

**Labels are references too.** Renaming `using-the-support-portal.md` to `using-the-support-hub.md` left four
labels reading "How to use the Support Portal" — in the sidebar, in two `related:` blocks, and in two body links —
each naming a page that no longer exists under that name. A path-only rename passes every linter and still lies to
the reader.

**Match the label to the destination's own `title:`,** not to what the rule elsewhere prescribes. The canonical
site name is "Spryker Portal", but that page titles itself "Using the Support Hub", so the inbound labels say
Support Hub.

**Verify deep anchors survive.** Inbound links carrying `#fragment` must still find their heading:

```bash
grep -rn '<new-filename>.html#' docs/     # then confirm each heading still exists
```

Two `#emergencies` and `#announce-high-trafficload` links pointed into the renamed page; both headings survived,
but only because they were checked.

## Validation

```bash
vale --minAlertLevel=error path/to/file.md
npx --yes markdownlint-cli2@0.13.0 path/to/file.md
```

Pin markdownlint to `0.13.0` on Node 18. Current `markdownlint-cli2` pulls a `string-width` that uses the regex `v`
flag and dies with `SyntaxError: Invalid regular expression flags`.

**Address errors only.** Warnings and suggestions are out of scope.

Re-run both after edits — including after the requester hand-edits your proposal. A human rewrite of your suggested
sentence can introduce a fresh Vale error (a reintroduced `please` is the common one).

## Presenting findings

Never edit first. Present numbered amendments and let the requester pick:

```
N. **Original:** <current text>
   **New:** <improved text>
   **Summary:** <what changed and why>
```

Show amendments only — never "no change" items. Report verdicts on the requester's stated suspicions explicitly,
including the negative ones ("all four repo links are live, nothing to remove"); a cleared suspicion is a finding.

**A finding needs a reader-visible consequence.** Before proposing a change, name what breaks or misleads if it
stays. "The standard says `.html`" is not a consequence when both forms serve `200`; "the domain does not resolve"
is. Cosmetic diffs cost review attention and bury the changes that matter.

**Change only what was asked.** If the request is to fix the team column, do not also rewrite the rationale column,
even when your change makes the old rationale stale. Flag the inconsistency and let the requester decide.

Items the rules do not require — a commented-out heading, trailing blank lines — are optional considerations, never
recommendations.

## Mapping analytics rows to source files

Audit backlogs arrive as analytics exports. The GA page title is the rendered browser title and often does **not**
match front-matter `title:`.

```bash
# index every docs page by front-matter title
for f in docs/dg/dev/ai/ai-dev/*.md; do printf "%s | " "$f"; grep -m1 '^title:' "$f"; done
```

Observed mismatches: `Claude Code Plugin` → `ai-dev-claude-code.md` (title: "Claude Code");
`AI Dev SDK Skills and Agents` → `ai-dev-workflows-skills-and-agents.md` (title: "Workflows, Skills, and Agents").
The analytics title tends to be the section name plus the page name.

**Two analytics rows can be one page.** `AI Dev SDK Overview` (rank 12) and `AI Dev SDK` (rank 26) both resolve to
`docs/dg/dev/ai/ai-dev/ai-dev.md` — the title changed mid-quarter, so GA split one page into two rows and halved its
apparent traffic. Always resolve to a path and check for duplicate paths before ranking by views.

When a title matches several files, prefer the top-level page over a feature-overview child.

## Assigning audit ownership

Grouping pages by owning team is how a large audit gets delivered. Two rules matter more than the taxonomy:

**Read the page before assigning it.** `Spryker Marketplace` looked like evaluator content by title and metrics
(240 views, 7.9s) and was assigned to a customer-facing team. The file's own description reads "how to start
developing for your Spryker Marketplace project" — it is a 44-line developer hub, and the 7.9s is a link list being
traversed, not a bounce. Metrics plus title is a hypothesis; the file is the evidence.

**Assign by failure mode, not by audience.** Ask what would be wrong on this page in six months:

| Failure mode | Owner |
|---|---|
| A stale index of what ships | The team that decides what ships |
| Wrong operational steps | The team that runs the operation |
| Wrong architectural model | Architecture |
| Outdated positioning or partner data | The commercial owner |

### Traffic signatures

| Signature | Reading |
|---|---|
| High views, engagement under 15s | Hub or link list — audit the routing, not the prose |
| Views per user above 2.5 | Reference consulted mid-task; repeat visits often mean a gap |
| Broad unique users, views per user near 1.0 | First-visit traffic; orientation content |
| High views, very low engagement, high unique users | The page is not answering the question people arrive with |

### Cluster consistency

Related pages must share one owner or they get audited to different standards. The three quickstart variants
(MacOS/Linux, Windows, hub) split across two teams in one draft. Check install, quickstart, AI SDK, and API page
clusters for split ownership before finalizing.

Cap the team list at what the requester asked for. Do not invent a new team value to fit one page.

## Common mistakes

- Trusting a `curl -sL` `200` — it masks the redirect that proves the target moved.
- Judging audience from the page title instead of opening the file.
- Rewriting a rationale column because you changed the column beside it.
- Reporting only the confirmed suspicions and staying silent on the cleared ones.
- Treating a green Vale run as "page is fine" — Vale has no opinion about a page last touched in 2021.
- Renumbering rank columns after deleting rows; ranks are traffic evidence, keep the gaps.