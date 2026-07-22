---
title: AI Dev SDK Skills and Agents
description: Reference of the skills and agents shipped with the AI Dev SDK
last_updated: Jul 22, 2026
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

| Skill | Purpose | Benefits |
|-------|---------|----------|
| `ai-dev-setup` | Generate rules, an agents/context file, and skills for the project and the chosen AI tool | One command sets up consistent AI tooling for the whole team |
| `code-review` | Review staged or PR changes against Spryker coding standards | Catches Spryker-specific issues before they reach a pull request |
| `propel-schema` | Create and modify Propel ORM schema files | Follows Spryker schema conventions automatically |
| `data-import` | Create and modify data import CSV files and importers | Generates importers that fit Spryker's data-import path |
| `codecept-functional` | Generate Codeception functional tests | Tests follow Spryker test patterns out of the box |
| `static-validation` | Run and interpret static analysis tools (PHPStan, PHP CS Fixer) | Quick diagnosis of style and type issues without context-switching |
| `payment-template` | Scaffold payment method integration | Follows Spryker payment module patterns end-to-end |
| `yves-atomic-frontend` | Create atomic design components for the Yves storefront | Components match the project's atomic conventions |
| `product-requirement-document` | Turn a feature idea into a research-grounded product requirement document before any code is written | Spec-before-code; assigns a real Spryker actor to every story; cuts ambiguity before implementation |
| [`spryker-customization`](/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html) | Walk a product requirement document or set of acceptance criteria through to a committed branch | One workflow drives the full build; quality bar (PoC or MVP) chosen up-front; delegates focused work to the agents below; never auto-commits |
| `spryker-bugfix` | Drive a bug from an optional tracker ticket or a plain description through to a committed, validated, QA-accepted fix | Orchestrates reproduce, root-cause, minimal fix, functional test, static validation, review, QA, and final verification; a shared attempt budget loops back on any failed gate; Autonomous mode adds a pushed Draft PR with a remote-CI watch loop |
| `spryker-refresher` | Run the right post-change console and composer commands after edits | Owns the file-to-command mapping (codegen, caches, frontend builds, class-resolver); no missed cache rebuilds |
| `spryker-qa-coverage` | Turn acceptance criteria into a four-bucket test plan executed against the live app | Coverage goes beyond literal ACs — happy / negative / authorization / corner cases; reports pass/fail with real evidence |
| `spryker-docs-research` | Look up the right answer in official Spryker documentation | Grounds AI work in documented behavior rather than the model's memory; falls back gracefully when MCP tools are unavailable |
| `spryker-runtime` | Drive the running Spryker application — Yves, Back Office, Merchant Portal, console, HTTP | Real authenticated sessions; read-only DB / Redis / queue inspection; reusable building block for higher-level skills and agents |
| `ai-runtime-debugging` | Inspect Spryker runtime state safely from an AI session | `[AI-DEBUG]` tagged-log pattern plus optional XDebug step-debug; built-in cleanup of debug instrumentation before commit |

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
