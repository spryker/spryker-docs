---
name: spryker-ci
description: Run continuous integration tools and fix issues in the Spryker documentation — Vale, markdownlint, sidebar checker, related-links checker, rake link validation, last_updated gate — and audit pages for staleness (outdated `last_updated`, legacy front matter, retired hosts, dead or redirected links, hand-written link sections).
---

# SprykerCI Fixing Process

Run the CI gates, present each failure, fix it after approval, re-run. A page can also pass every linter and still be two years out of date — for that, see `references/outdated-review.md`.

## Process

1. Run the gates in the Commands section. Stop at the first failing gate; do not batch.
2. Present one issue at a time:
   - **What** failed — the tool output verbatim
   - **Why** it fails — the rule behind it, not just the fix
   - **Fix** — the current snippet and the proposed replacement
3. Wait for approval before applying. The user may know something the output does not show.
4. Re-run that gate to confirm, then continue to the next issue.
5. When all issues are done, run every gate again.

## Guardrails

- **Never apply a fix without approval.** One issue at a time.
- **Changed files only.** The tree carries a large backlog of pre-existing findings — `check_related_links.yml` scopes to changed pages for exactly this reason. A whole-tree run is for reporting, never for editing. Do not fix backlog findings unless asked.
- **`last_updated` on every file you edit** — current date, `Mon D, YYYY` format (`Sep 9, 2026`). CI enforces it.
- **Never edit archived version directories** — `docs/**/202311.0/**`, `docs/**/202404.0/**`. Vale skips them; the other tools do not, so a well-meant fix there is out of scope. Release notes likewise keep their historical wording and versioned links.
- **Link format differs by location:**

  | Location | Form | Example |
  |---|---|---|
  | Body link | leading `/`, `.html` suffix | `/docs/dg/dev/integrate-web-profiler.html` |
  | Front-matter `related:` | same path, no leading slash | `docs/dg/dev/integrate-web-profiler.html` |
  | `related:` external | must be `https://` | the layout prepends `/` to anything else |

  A `related:` link is the body-link path minus the leading `/` — nothing else changes. Leaving the slash on is a `related-leading-slash` finding. See `references/related-links.md`.
- **`--selftest` before trusting the related checker.** A broken pattern reports nothing and reads as a pass. CI runs the selftest as its first step.
- **The sidebar gate is a file, not an exit code.** `sidebar_checker.sh` can exit 0 while recording findings. Always read `_scripts/sidebar_checker/missing-documents.yml` after the run. That file is gitignored — never commit it.
- **Rake link validation needs a built `_site`.** Running the rake tasks against a stale or missing build reports links that do not reflect your edits.

## Commands

Every command below mirrors a job in `.github/workflows/`. Run from the repository root.

Vale — `vale.yml`
```bash
vale $(find docs/ _includes/pbc/ -type f -name "*.md" ! -path "*/202311.0/*" ! -path "*/202404.0/*") --minAlertLevel=error
```

Markdown linter — `mdlint.yml`
```bash
npx markdownlint-cli2 "docs/**/*.md" "_includes/pbc/**/*.md" "#node_modules"
```
CI runs this on Node 22. On Node 18 it dies inside `string-width` with `SyntaxError: Invalid regular expression flags` before linting anything — that is a toolchain failure, not a clean run.

Sidebar checker — `check_sidebar.yml`. The second command is the gate.
```bash
./_scripts/sidebar_checker/sidebar_checker.sh
cat _scripts/sidebar_checker/missing-documents.yml 2>/dev/null || echo "No missing documents found."
```

Related-links checker — `check_related_links.yml`
```bash
_scripts/related_checker/related_checker.py --selftest   # run this first
_scripts/related_checker/related_checker.py              # files changed vs master
_scripts/related_checker/related_checker.py docs/a.md    # named files
_scripts/related_checker/related_checker.py --all        # whole tree: report only, never bulk-edit
```

`last_updated` gate — `check_last_modified.yml`. Arguments are (minimum changed lines, maximum age in days).
```bash
GITHUB_BASE_SHA=$(git merge-base master HEAD) GITHUB_HEAD_SHA=HEAD \
  bash ./_scripts/last_updated_checker.sh 2 30
```
Two escape hatches exist on the PR, both maintainer decisions — mention them, do not assume them: the `ignore-last-updated` label skips the check when old dates are deliberate (restoring dates a bulk edit bumped), and `Allow autofix` lets the bot bump them. Branches matching `*archive*` never run this check.

Build and internal link validation — `ci.yml`. The rake tasks are the only gate that catches a broken internal link.
```bash
bundle exec jekyll build --config=_config.yml,_config_production.yml -t
bundle exec jekyll validate
bundle exec rake check_about check_ca check_pbc check_dg check_integrations
```
This is the one gate that may not run locally. The Gemfile pins Ruby 3.2.2, so a different local Ruby fails with `Bundler::RubyVersionMismatch` before any task starts. Report that the gate could not run and let CI cover it — never record it as passed.

Data-backed pages — see Fix guidelines.
```bash
changed=$(git diff master..HEAD --name-only)
echo "$changed" | grep -q '^js/integrations/tpi_list.json$' &&
  ! echo "$changed" | grep -q '^docs/integrations/integrations-catalog.md$' &&
  echo "tpi_list.json changed but integrations-catalog.md was not updated"
```

### Local tools, not CI gates

Run these when the situation calls for them; nothing in CI does.

```bash
.claude/skills/spryker-ci/scripts/staleness_report.py PAGE                   # is this page behind its neighbourhood?
.claude/skills/spryker-ci/scripts/staleness_report.py --all --top 50         # ranked staleness backlog
node _scripts/heading_level_checker/heading_level_checker.js [PATH]   # shift body headings to h2>h3>h4
ruby _scripts/internal_link_checker/internal_link_checker.rb         # broken links in a built _site
bash _scripts/redirects_generator/redirect_from_generator.sh         # add missing redirect_from; edit folder_path first
```

Most `_scripts/` tools have a `run*.md` beside them; `last_updated_checker.sh` does not. The staleness report belongs to this skill rather than to the repo — nothing in CI calls it — so it lives in `scripts/` here and is documented in `references/staleness-report.md`. Every one of them expects the repository root as the working directory.

## Fix guidelines

### Code block file references

When a code block shows the contents of a file, the file path goes above the block as bold text, with one empty line between them. Not as a comment inside the block, not in backticks, and not glued to the block.

**Wrong:**
````markdown
```php
// config_default.php

$config[OmsConstants::PROCESS_LOCATION] = [
```
````

**Correct:**
````markdown
**config_default.php**

```php
$config[OmsConstants::PROCESS_LOCATION] = [
```
````

The same fix applies to a path in backticks, a path in broken bold (`**`config_default.php**`), and a bold path with no empty line after it.

If the block has no filename anywhere in or before it, report a warning rather than inventing one.

### Data-backed pages

Some pages render their content from a data file instead of from their own Markdown body. The page's Markdown barely changes, so `last_updated` goes stale while the content readers see keeps changing.

**Rule:** when a data file changes, the page that renders it must change in the same commit — at minimum `last_updated` set to the date of the data change. If entries were added, removed, or renamed, check that the page's `description` and any counts in it still hold.

| Page | Data file |
|---|---|
| `docs/integrations/integrations-catalog.md` | `js/integrations/tpi_list.json` |

Add a row whenever a new data-backed page appears — a body of `{% raw %}` markup plus a `<script src="/js/...">` include is the signal.

### Sidebar issues

A finding names the missing page as `fileName.md`. Add the same path to the sidebar with `md` replaced by `html`. Read the named file for its `title`, and present that title for verification before writing it.

## References

- `references/outdated-review.md` — auditing a page for staleness: retired hosts, legacy front matter, link liveness, prose patterns Vale misses, how to present findings
- `references/related-links.md` — `related:` rules, converting a body link section into front matter, propagating a rename
- `references/staleness-report.md` — what `scripts/staleness_report.py` measures, how it ranks, and what it cannot tell you
