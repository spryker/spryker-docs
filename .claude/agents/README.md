# Claude Code Agents — Spryker Docs

This folder defines the agent team for autonomously developing the Spryker
documentation. All agents treat the repository `CLAUDE.md` as the authoritative
source for documentation standards and the validation workflow.

## The team

| Agent | Role | Edits files? |
| --- | --- | --- |
| `docs-orchestrator` | Plans and coordinates an end-to-end docs change; delegates to the others and gates on validation. Start here for any multi-step task. | No (delegates) |
| `docs-writer` | Authors and edits Markdown/Jekyll content to Spryker standards. | Yes |
| `docs-reviewer` | Read-only standards/style/grammar review; returns a numbered amendment list. | No |
| `docs-validator` | Runs Vale, markdownlint, and the sidebar checker; fixes ERRORS only. | Yes |
| `sidebar-manager` | Keeps `_data/sidebars/*.yml` in sync on add/remove/rename/move. | Yes |
| `docs-architect` | Technical-documentation management expert: information architecture, structure, and content recombination. Returns a restructuring plan. | No (plans) |
| `docs-ux-designer` | Improves page-level UI/UX: scannability, hierarchy, callouts, accessibility. | Yes |
| `docs-speller` | English spelling correctness (American spelling); fixes typos and curates the Vale vocabulary. | Yes |

## Typical flow

```
docs-orchestrator
  ├─ docs-architect    (information architecture & restructuring plan — plan first)
  ├─ docs-writer       (author / edit pages)
  ├─ docs-ux-designer  (page-level UI/UX & accessibility improvements)
  ├─ sidebar-manager   (sync sidebars if files were added/removed/moved)
  ├─ docs-reviewer     (standards & style amendments → back to docs-writer)
  ├─ docs-speller      (English spelling correctness; curates Vale vocabulary)
  └─ docs-validator    (Vale + markdownlint + sidebar checker; ERRORS = 0)
```

## How to invoke

- Let Claude auto-select based on each agent's `description`, or
- Name one explicitly, e.g. "use the docs-orchestrator to add a page about X".

## Extending

Add a new agent as `.claude/agents/<name>.md` with YAML frontmatter (`name`,
`description`, optional `tools`, optional `model`) and a focused system prompt.
Reference it from `docs-orchestrator`'s "sub-agents you coordinate" list and from
the table above so it is discoverable.
