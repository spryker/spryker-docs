---
title: AI Dev SDK Skills and Agents
description: Reference of the skills and agents shipped with the AI Dev SDK
last_updated: Aug 11, 2026
label: early-access
keywords: ai, ai-dev, claude, claude code, windsurf, copilot, skills, agents, subagents, spryker
template: concept-topic-template
---

{% info_block warningBox "Experimental module" %}

The AiDev module is experimental and not stable. There is no backward compatibility promise for this module. We welcome your feedback and contributions as we continue to develop and improve this module.

{% endinfo_block %}

## Overview

The AI Dev SDK ships a set of skills and agents that codify common Spryker workflows. They reach your project in two ways:

- **Via the `ai-dev:setup` console command** — copies the skills and agents into your project's AI-tool directories (`.claude/skills/` + `.claude/agents/`, `.windsurf/skills/` + `.windsurf/agents/`, and so on). Works for every AI tool listed on the [AI Dev SDK Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html#setup-command) that supports an agents directory. Codex CLI is the one exception — it has no agents directory, so agents are skipped for that tool.
- **Via the Claude Code plugin** — for Claude Code users, the [Claude Code Plugin](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin.html) installs the same skills and agents through the official marketplace, no console command required.

Both delivery paths read from the same source files — the plugin just packages them for marketplace installation.

**What's the difference between a skill and an agent?**

- **Skills** load into the active chat on demand. Use them when you want the assistant to follow a specific workflow (write a product requirement document, refresh caches, run QA).
- **Agents** are isolated sub-conversations the assistant delegates to. Use them when you want focused, single-purpose work done in its own context window (verify a behavior, diagnose a failure).

You do not need to remember the names — the assistant picks the right skill or agent from your prompt. The tables below explain what each one does so you know what to expect.

## How to invoke

In most cases you do not need to call a skill or agent by name. Describe what you want — *"build this feature"*, *"verify the new fee shows on the cart"*, *"write a product requirement document for..."* — and the assistant matches your wording to the right skill or agent from the set installed in your project.

If you want to invoke one explicitly:

- **Claude Code plugin** — every skill is also available as a slash command. Type `/<skill-name>` (for example `/spryker-customization`) and the skill loads into the current chat. The full list of commands is on the [Claude Code Plugin](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin.html#skills) page.
- **Other AI tools** — invocation follows the tool's own convention for skills and agents. In Cursor, Windsurf, Copilot, OpenCode, and Codex CLI, the skills and agents land in the tool-specific directories (`.cursor/`, `.windsurf/`, etc.) and are picked up automatically by your assistant. The [AI Dev SDK Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html#setup-command) lists the output paths per tool.
- **Agents (subagents)** are not invoked by the user directly — they are spawned by the assistant or by a parent skill when the work calls for an isolated context. You can suggest one by name in your prompt (*"use the spryker-verifier to..."*), but the assistant decides when to spawn.

## Skills

Skills are delivered through `ai-dev:setup` (all supported AI tools) or the Claude Code plugin.

Every skill ships a README in its own directory in the plugin repository, covering its full flow, design decisions, and known limits. The **Reference** column links to it — use it when the summary here is not enough.

### Orchestrator skills

These skills own a full workflow and delegate each stage to the specialist skills and agents below. Each has its own page.

| Skill | Purpose | Benefits | Reference |
|-------|---------|----------|---------|
| [`project-starter-wizard`](/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard.html) | Turn a fresh clone of a demoshop into the customer's project | One developer interview up front, then nine orchestrated steps to a verified running shop; a resumable state file survives interruptions | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/project-starter-wizard/README.md) |
| [`spryker-customization`](/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html) | Walk a product requirement document or set of acceptance criteria through to a committed branch | One workflow drives the full build; quality bar (PoC or MVP) chosen up-front; never auto-commits | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-customization/README.md) |
| [`spryker-bugfix`](/docs/dg/dev/ai/ai-dev/ai-dev-bugfix-workflow.html) | Drive a bug from an optional tracker ticket or a plain description through to a committed, validated, QA-accepted fix | Orchestrates reproduce, root cause, minimal fix, functional test, static validation, review, QA, and final verification; a shared attempt budget loops back on any failed gate; Autonomous mode adds a pushed draft PR with a remote CI watch loop | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-bugfix/README.md) |
| [`spryker-upgrade`](/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html) | Upgrade the project's modules and features to a newer Spryker release | Checks first whether the customizations are covered by tests at all, resolves the constraint blockers that stop a release-group bump, then detects the silent damage a heavily customized project would otherwise ship | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-upgrade/README.md) |

### Project setup skills

The `project-starter-wizard` runs these as its steps, and each also works standalone on an existing project.

| Skill | Purpose | Benefits | Reference |
|-------|---------|----------|---------|
| `project-ci-generator` | Transform an inherited product-style CI setup into a single, lean project CI pipeline | Reads the CI that actually exists rather than applying a template; proposes a keep/drop plan for approval before deleting anything; ports the same jobs to GitLab or Bitbucket | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/project-ci-generator/README.md) |
| `configure-codebase` | Register a custom namespace instead of `Pyz` and wire autoload, frontend build, and Codeception to resolve it | One pass covers every place the namespace must be declared, so the project builds, lints, and tests under its own name | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/configure-codebase/README.md) |
| `brand-project` | Apply or change the project's brand identity — name, development domain, Docker namespace, palette, and logo | Repeatable any time, not only at project start; works pre- or post-boot | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/brand-project/README.md) |
| `configure-services` | Change what infrastructure the project runs on, or build a new environment deploy file | Surgical edits to the keys it owns; neighboring deploy-file blocks stay untouched | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/configure-services/README.md) |
| `define-stores` | Create or redefine a DMS project's stores and region before the first boot | Clears the hardcoded store and locale literals that otherwise abort the boot | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/define-stores/README.md) |
| `project-data` | Populate, reshape, reduce, clean up, or remove the project's import data | One skill for every `data/import` change — adapt the demo shop to your stores, generate a catalog from images, or start with no demo data at all | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/project-data/README.md) |
| `spryker-import-tools` | Read, filter, edit, and validate data import CSV files and manifests | Reliable where shell tools corrupt multi-line quoted fields; static validation catches boot-aborting data in seconds | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-import-tools/README.md) |
| `boot-and-verify` | Take a transformed project from "files written" to "verified running" | Per-store verification of storefront, Back Office, search, and queues; an independent verifier agent gives the verdict | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/boot-and-verify/README.md) |
| `curate-golive-data` | Make the data the project keeps production-safe before go-live | Resolves the go-live warnings the data and boot steps surface — placeholder tax rates, Spryker CDN imagery, demo accounts | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/curate-golive-data/README.md) |
| `translate-content` | Translate storefront content into a project locale | Strictly per-locale and opt-in; covers glossary as well as catalog, CMS, navigation, and labels | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/translate-content/README.md) |

### Development skills

| Skill | Purpose | Benefits | Reference |
|-------|---------|----------|---------|
| `ai-dev-setup` | Generate rules, an agents/context file, and skills for the project and the chosen AI tool | One command sets up consistent AI tooling for the whole team; also refreshes the rules and context file from the latest upstream content | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/ai-dev-setup/README.md) |
| `code-review` | Review staged or PR changes against Spryker coding standards | Catches Spryker-specific issues before they reach a pull request | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/code-review/README.md) |
| `propel-schema` | Create and modify Propel ORM schema files | Follows Spryker schema conventions automatically | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/propel-schema/README.md) |
| `data-import` | Create and modify data import CSV files and importers | Generates importers that fit Spryker's data-import path | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/data-import/README.md) |
| `static-validation` | Run static analysis over only the code that changed against a base branch — PHP and frontend | Validates the diff rather than the whole project; groups PHP by changed file or by whole changed module | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/static-validation/README.md) |
| `payment-template` | Scaffold payment method integration | Follows Spryker payment module patterns end-to-end | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/payment-template/README.md) |
| `yves-atomic-frontend` | Create atomic design components for the Yves storefront | Components match the project's atomic conventions | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/yves-atomic-frontend/README.md) |
| `product-requirement-document` | Turn a feature idea into a research-grounded product requirement document before any code is written | Spec-before-code; assigns a real Spryker actor to every story; cuts ambiguity before implementation | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/product-requirement-document/README.md) |
| `spryker-refresher` | Run the right post-change console and composer commands after edits | Owns the file-to-command mapping (codegen, caches, frontend builds, class-resolver); no missed cache rebuilds | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-refresher/README.md) |
| `spryker-docs-research` | Look up the right answer in official Spryker documentation | Grounds AI work in documented behavior rather than the model's memory; falls back gracefully when MCP tools are unavailable | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-docs-research/README.md) |
| `spryker-runtime` | Drive the running Spryker application — Yves, Back Office, Merchant Portal, console, HTTP | Real authenticated sessions; read-only DB, Redis, and queue inspection; reusable building block for higher-level skills and agents | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-runtime/README.md) |
| `ai-runtime-debugging` | Inspect Spryker runtime state safely from an AI session | `[AI-DEBUG]` tagged-log pattern plus optional XDebug step-debug; built-in cleanup of debug instrumentation before commit | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/ai-runtime-debugging/README.md) |

### Testing and performance skills

| Skill | Purpose | Benefits | Reference |
|-------|---------|----------|---------|
| `codecept-functional` | Generate Codeception functional tests | Tests follow Spryker test patterns out of the box | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/codecept-functional/README.md) |
| `cypress-tests` | Create, run, review, and validate Cypress end-to-end tests | Day-to-day E2E work against your project's own suite — storefront, Back Office, Merchant Portal, and Glue API | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/cypress-tests/README.md) |
| `cypress-migration` | Replace Spryker's demoshop test suites with a project-owned Cypress baseline | One-time migration; vendors in a proven reference implementation, wires up CI, and generates the companion `cypress-tests` skill for the project | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/cypress-migration/README.md) |
| `spryker-qa-coverage` | Turn acceptance criteria into a four-bucket test plan executed against the live app | Coverage goes beyond literal acceptance criteria — happy, negative, authorization, and corner cases; reports pass/fail with real evidence | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-qa-coverage/README.md) |
| [`spryker-profiler`](/docs/dg/dev/ai/ai-dev/ai-dev-profiler-workflow.html) | Read and configure the Spryker WebProfiler — every metric it recorded about a request | Real measurements instead of guesses; finds N+1 duplicates, Redis and search call counts, and the heaviest request; also fixes a profiler that shows no data | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-profiler/README.md) |

## Agents

Agents are delivered through `ai-dev:setup` (every supported AI tool with an agents directory) or the Claude Code plugin.

| Agent | Purpose | Benefits |
|-------|---------|----------|
| `spryker-code-reviewer` | Review code against Spryker's coding standards and architectural rules | Deeper, Spryker-aware review than a generic linter; catches layer-architecture and module-convention issues |
| `spryker-feature-expert` | Answer "how does feature X work in this project / in Spryker" | Pushes back when the user's framing reinvents an existing primitive; surfaces canonical patterns first; never edits code |
| `spryker-verifier` | Verify that a specific behavior holds in the running Spryker environment | Returns PASS / FAIL / BLOCKED per acceptance criterion with raw evidence; never lies green; never tries to fix |
| `spryker-issue-diagnoser` | Investigate why something failed and return a root cause | Reads logs, DB state, queue, search, browser console — returns a suggested direction; never attempts the fix itself |
| `spryker-data-seeder` | Create small additive test data through Spryker's existing import path | Safe and incremental — CSV + `data:import` only; never edits code, never writes directly to the database |
| `spryker-screenshot-collector` | Capture screenshots and GIFs of pages and flows for demos and documentation | Pure capture — never asserts whether something works, never investigates failures, never edits |

## Related

- [AI Dev SDK Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html)
- [AI Dev MCP Server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html)
- [Claude Code Plugin](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin.html)
- [AI Dev SDK Project Starter Wizard](/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard.html)
- [AI Dev SDK Customization Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html)
- [AI Dev SDK Bugfix Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-bugfix-workflow.html)
- [AI Dev SDK Upgrade Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html)
- [AI Dev SDK Profiler Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-profiler-workflow.html)
