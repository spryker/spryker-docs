---
name: preview-docs-locally
description: Build and serve the Spryker documentation site locally with Jekyll in Docker (`docker-compose up`, preview at http://0.0.0.0:4000/), then open a docs page in the browser to check how it renders. Use this skill whenever the user wants to preview, run, compile, build, or visually check the docs site or a changed page, check a sidebar change, see how a page renders, restart or debug the local Jekyll server, or fix "the page does not update" - even if they do not say "Jekyll" or "Docker".
---

# Preview the docs locally

Run the site in Docker to see exactly what docs.spryker.com will render, including the sidebar, `info_block` callouts, tables, and front matter. Linters (Vale, markdownlint) cannot catch rendering problems, so use this before you hand over a page that has complex layout, new sidebar entries, or custom HTML.

The setup is in `docker-compose.yml` and `docker/Dockerfile` at the repository root. The container serves with `jekyll serve --incremental --livereload --force_polling` on port 4000. Port 35729 carries the LiveReload signal.

## Start the server

1. Check whether it already runs, so you do not start a second copy: `docker ps --filter name=jekyll_dev`.
2. If it does not run, start it from the repository root in the background: `docker-compose up` (use `docker compose up` if the hyphenated command is missing). Run it with `run_in_background` so the log stays readable and your shell stays free.
3. Wait for the ready line `Server address: http://0.0.0.0:4000/` in the log. Poll the log with a Monitor until-loop; do not use a foreground `sleep`.
4. The first compilation takes 2-3 minutes because the site has thousands of pages. Tell the user this, and do not treat the wait as a hang. If the log shows no new output for more than 5 minutes, check `docker ps` and `docker logs jekyll_dev --tail 50`.

If the image does not exist, `docker-compose up` builds it first (Ruby gems install). This adds a few more minutes once.

## Map a page file to its URL

The URL mirrors the file path under the repository root. Drop the `.md` extension and prefix `http://0.0.0.0:4000/`:

| File | URL |
|------|-----|
| `docs/dg/dev/ai/ai-commerce/backoffice-assistant/add-custom-backoffice-assistant-agent.md` | `http://0.0.0.0:4000/docs/dg/dev/ai/ai-commerce/backoffice-assistant/add-custom-backoffice-assistant-agent` |

If a page uses a `permalink` in its front matter, the permalink wins. Check the front matter when the computed URL returns 404.

## Open the page in the browser

Use a browser MCP to look at the page instead of asking the user to do it. Load the Chrome tools with ToolSearch (`mcp__claude-in-chrome__*`), call `tabs_context_mcp` first, then open the URL in a new tab with `tabs_create_mcp` and `navigate`. Take a screenshot or read the page text to verify the rendering. If no browser MCP is available, give the user the URL.

Check these on the rendered page:

- The page appears in the sidebar at the expected place.
- Tables, code blocks, and `info_block` callouts render correctly (not as raw `{% ... %}` text).
- Internal links resolve.

## Use the preview for verification

Use this skill as the rendering check at the end of any docs change, together with the validation workflow in `CLAUDE.md` (Vale, markdownlint). After you edit or add pages:

1. Open each changed page and confirm the checks above.
2. Open the page that holds the new sidebar entry if you changed a sidebar.
3. Report which URLs you checked and any rendering problem you found. Do not report a page as verified if you did not open it.

## Pitfalls

- **Edits to `_data/` (sidebars, for example `_data/sidebars/*.yml`) are not picked up by the watcher.** Jekyll reads `_data` at start and the incremental cache hides the change. Stop the server, delete the `_site` folder, and start again:
  1. `docker-compose down`
  2. `rm -rf _site`
  3. `docker-compose up` (expect the full 2-3 minute compile again)
- **Edits to a page `.md` file are rebuilt automatically**, and the browser reloads through LiveReload. Sometimes the reload does not happen. Refresh the tab manually, and wait for a `...done in N seconds` line in the log first.
- **If a page looks stale after several refreshes**, treat it as a cache problem: use the `_site` reset above.
- **Do not edit the build files** (`docker-compose.yml`, `docker/Dockerfile`, `_config.yml`) to fix a single preview problem.
- `_site` is git-ignored, so deleting it never affects the working tree.

## Stop the server

Run `docker-compose down` from the repository root when the user finishes. Leave the server running if the user plans more edits, and tell them it runs.
