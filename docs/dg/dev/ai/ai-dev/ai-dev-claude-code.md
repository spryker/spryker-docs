---
title: Claude Code
description: Install and use the Spryker AI Dev SDK in Claude Code to get Spryker-aware skills, code review, and project setup directly in your AI coding assistant.
last_updated: Aug 14, 2026
label: early-access
keywords: ai, claude, claude code, plugin, marketplace, skills, spryker, ai-dev, code review, ci
template: howto-guide-template
redirect_from:
  - /docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin
---

{% info_block warningBox "Experimental module" %}

The AiDev module is experimental and not stable. There is no backward compatibility promise for this module. We welcome your feedback and contributions as we continue to develop and improve this module.

{% endinfo_block %}

{% info_block warningBox "Project must be running" %}

The MCP server runs inside your Spryker Docker container. Start your project with `docker/sdk run` before using any skills that rely on MCP tools.

{% endinfo_block %}

## Overview

Working with Spryker in an AI coding assistant without project-specific context leads to a predictable pattern: the AI generates plausible-looking code that does not follow Spryker's layer architecture, uses the wrong patterns, or misses module conventions entirely. You end up spending more time correcting mistakes than you saved.

The `spryker-ai-dev-sdk` Claude Code plugin closes this gap. It gives Claude Code deep knowledge of how Spryker projects are structured — layers, namespaces, plugin stacks, transfer objects, OMS flows — so the code it generates fits your project from the start instead of requiring repeated corrections.

**What it does for you:**

- **No more explaining Spryker basics.** Rules covering 20 Spryker architectural patterns are automatically loaded into every session. Claude Code knows about factories, dependency providers, expanders, mappers, and more without you having to explain them.
- **Correct code on the first attempt.** Skills for common Spryker tasks — Propel schema changes, data importers, functional tests, payment integrations, atomic frontend components — follow the exact conventions your project expects.
- **Live project context.** The MCP server runs inside your Docker container and gives Claude Code real-time access to your transfer objects, module interfaces, and OMS configuration. The AI works with your actual project data, not guesses.
- **Consistent code reviews.** The `spryker-code-reviewer` subagent checks your changes against Spryker's coding standards and architectural rules, catching issues before they reach a PR.
- **Team-wide consistency.** Generated rules and context files are committed to your repository, so every developer on the team works with the same AI configuration.
- **Workflows you compose yourself.** Each skill covers one stage of work, so you combine them into the long-running workflow your team actually runs. Four ready-made workflows — project setup, customization, bugfix, and upgrade — get you started on day one, and the skills themselves are a template for writing your own. See [Composable by design](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html#composable-by-design).

The plugin is distributed through the `spryker-plugins-official` marketplace and installed directly inside Claude Code.

## Prerequisites

- [Claude Code](https://claude.ai/code) installed
- Your Spryker project is running: `docker/sdk run`


## Install the plugin from the marketplace

1. Open Claude Code in your terminal.

2. Add the Spryker plugin marketplace:

   ![step 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-1.png)
   ![step 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-2.png)
   ![step 3](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-3.png)

3. Install the plugin:

   ![step 4](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-4.png)
   ![step 5](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-5.png)
   ![step 6](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-6.png)

4. After installation, reload plugins in Claude Code.

![Choose output mode step 7](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-7.png)


## Set up AI tooling for your project

After installing the plugin, run the `ai-dev-setup` skill to configure your project. The skill generates rules, context files, and reusable AI skills tailored to your project and AI tool.

In Claude Code, run the setup skill:

![ai-dev-setup](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-skill-setup.png)

The skill:

- Installs the `spryker-sdk/ai-dev` package in your Spryker project.
- Wires up console commands for `McpServerConsole` and `AiToolSetupConsole`.
- Registers the AI Dev MCP server with Claude Code.
- Adds `.claude/rules/` with Spryker coding conventions and architectural guidelines.
- Adds `CLAUDE.md` with project-specific context loaded into every Claude Code session.

**Check with running `/context` in Claude Code to see:**

![claude-setup-1](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-install-1.png)
![claude-setup-2](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-install-2.png)
![claude-setup-3](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-install-3.png)
![claude-setup-4](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-install-4.png)

## Capabilities

For a one-page reference of every skill and agent — what each does, when to use it, and the value it adds — see [Skills and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html).

Four skills own a full workflow and delegate each stage to the others. Each has its own page:

- [Project Starter Wizard](/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard.html) — turn a fresh demoshop clone into your project
- [Customization Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html) — build a feature from a product requirement document to a committed branch
- [Bugfix Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-bugfix-workflow.html) — drive a bug to a validated, QA-accepted fix
- [Upgrade Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html) — upgrade a customized project to a newer Spryker release

### Skills

The plugin bundles the following Spryker-aware skills. Invoke them in Claude Code with the `/` prefix. The **Reference** column links to each skill's README in the plugin repository, which documents its full flow and limits.

| Skill | Command | Description | Reference |
|-------|---------|-------------|-----------|
| AI Dev Setup | `/spryker-ai-dev-sdk:ai-dev-setup` | Generates rules, a context file, and skills for your project and AI tool | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/ai-dev-setup/README.md) |
| Project Starter Wizard | `/spryker-ai-dev-sdk:project-starter-wizard` | Turns a fresh clone of a Spryker demoshop into your project — one interview, then nine orchestrated setup steps to a verified running shop | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/project-starter-wizard/README.md) |
| Project CI Generator | `/spryker-ai-dev-sdk:project-ci-generator` | Rebuilds an inherited product-style CI setup into a single, lean project CI pipeline, keeping only the jobs and support files the project needs | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/project-ci-generator/README.md) |
| Configure Codebase | `/spryker-ai-dev-sdk:configure-codebase` | Registers a custom namespace instead of `Pyz` and wires autoload, frontend build, and Codeception to resolve it | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/configure-codebase/README.md) |
| Brand Project | `/spryker-ai-dev-sdk:brand-project` | Applies or changes the project's brand identity — name, development domain, Docker namespace, palette, and logo | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/brand-project/README.md) |
| Configure Services | `/spryker-ai-dev-sdk:configure-services` | Changes which engines, development services, and applications a deploy file runs, or builds a new environment deploy file | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/configure-services/README.md) |
| Define Stores | `/spryker-ai-dev-sdk:define-stores` | Creates or redefines a DMS project's stores and region before the first boot | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/define-stores/README.md) |
| Project Data | `/spryker-ai-dev-sdk:project-data` | Populates, reshapes, reduces, cleans up, or removes the project's data import files | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/project-data/README.md) |
| Spryker Import Tools | `/spryker-ai-dev-sdk:spryker-import-tools` | Reads, filters, edits, and validates data import CSV files and manifests | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-import-tools/README.md) |
| Boot and Verify | `/spryker-ai-dev-sdk:boot-and-verify` | Boots the project and verifies storefront, Back Office, search, and queues per store | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/boot-and-verify/README.md) |
| Curate Go-Live Data | `/spryker-ai-dev-sdk:curate-golive-data` | Makes the data the project keeps production-safe before go-live | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/curate-golive-data/README.md) |
| Translate Content | `/spryker-ai-dev-sdk:translate-content` | Translates storefront content — glossary, catalog, CMS, navigation, and labels — into a project locale | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/translate-content/README.md) |
| Code Review | `/spryker-ai-dev-sdk:code-review` | Reviews staged or PR changes against Spryker coding standards | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/code-review/README.md) |
| Propel Schema | `/spryker-ai-dev-sdk:propel-schema` | Helps create and modify Propel ORM schema files following Spryker conventions | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/propel-schema/README.md) |
| Data Import | `/spryker-ai-dev-sdk:data-import` | Assists with creating and modifying data import CSV files and importers | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/data-import/README.md) |
| Codecept Functional | `/spryker-ai-dev-sdk:codecept-functional` | Generates Codeception functional tests following Spryker test patterns | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/codecept-functional/README.md) |
| Cypress Tests | `/spryker-ai-dev-sdk:cypress-tests` | Creates, runs, reviews, and validates Cypress end-to-end tests for the storefront, Back Office, Merchant Portal, and Glue API | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/cypress-tests/README.md) |
| Cypress Migration | `/spryker-ai-dev-sdk:cypress-migration` | Replaces Spryker's demoshop test suites with a project-owned Cypress baseline and wires it into CI | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/cypress-migration/README.md) |
| Static Validation | `/spryker-ai-dev-sdk:static-validation` | Runs PHP and frontend static analysis over only the code that changed against a base branch | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/static-validation/README.md) |
| Payment Template | `/spryker-ai-dev-sdk:payment-template` | Scaffolds payment method integration following Spryker payment module patterns | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/payment-template/README.md) |
| Yves Atomic Frontend | `/spryker-ai-dev-sdk:yves-atomic-frontend` | Helps create atomic design components for the Yves frontend | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/yves-atomic-frontend/README.md) |
| Product Requirement Document | `/spryker-ai-dev-sdk:product-requirement-document` | Drafts a research-grounded product requirement document for a Spryker feature before implementation | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/product-requirement-document/README.md) |
| Spryker Customization | `/spryker-ai-dev-sdk:spryker-customization` | Orchestrates the end-to-end build of a customization from product requirement document to committed branch | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-customization/README.md) |
| Spryker Bugfix | `/spryker-ai-dev-sdk:spryker-bugfix` | Orchestrates the end-to-end bug fix from a ticket or description to a committed, validated, QA-accepted branch (Autonomous mode adds a pushed draft PR with a CI watch loop) | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-bugfix/README.md) |
| Spryker Upgrade | `/spryker-ai-dev-sdk:spryker-upgrade` | Upgrades the project's modules and features to a newer release, resolving constraint blockers and detecting the silent damage a customized project would otherwise ship | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-upgrade/README.md) |
| Spryker Refresher | `/spryker-ai-dev-sdk:spryker-refresher` | Runs the right post-change console and composer commands after edits | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-refresher/README.md) |
| Spryker QA Coverage | `/spryker-ai-dev-sdk:spryker-qa-coverage` | Turns acceptance criteria into a four-bucket test plan and executes it against the running app | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-qa-coverage/README.md) |
| Spryker Profiler | `/spryker-ai-dev-sdk:spryker-profiler` | Reads and configures the Spryker WebProfiler — query counts, N+1 duplicates, Redis and search calls, logs, and exceptions per request | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-profiler/README.md) |
| Spryker Docs Research | `/spryker-ai-dev-sdk:spryker-docs-research` | Looks up grounded answers in the official Spryker documentation | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-docs-research/README.md) |
| Spryker Runtime | `/spryker-ai-dev-sdk:spryker-runtime` | Drives the running Spryker application — storefront, Back Office, console, HTTP | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-runtime/README.md) |
| AI Runtime Debugging | `/spryker-ai-dev-sdk:ai-runtime-debugging` | Adds tagged debug logs (and optional XDebug) for inspecting Spryker runtime state | [README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/ai-runtime-debugging/README.md) |

### Subagents

The plugin includes the following subagents. They are isolated sub-conversations that the assistant delegates to for focused, single-purpose work:

| Subagent | Description |
|----------|-------------|
| `spryker-code-reviewer` | Performs deep code reviews of your changes against Spryker architectural patterns, coding standards, and best practices |
| `spryker-feature-expert` | Answers questions about how a Spryker feature, module, or capability works, grounded in docs and the project's actual code |
| `spryker-verifier` | Verifies a specific behavior in the running Spryker environment and returns PASS, FAIL, or BLOCKED per acceptance criterion with raw evidence |
| `spryker-issue-diagnoser` | Investigates a failure across logs, database, queue, search, and browser state and returns a root cause |
| `spryker-data-seeder` | Creates small additive test data through Spryker's existing data import path |
| `spryker-screenshot-collector` | Captures screenshots and short GIFs of pages and flows for demos and documentation |

### Rules

The `ai-dev-setup` skill writes a set of [Spryker-specific coding rules](https://github.com/spryker-sdk/ai-dev/tree/master/data/rules) into your project. These rules guide the AI to follow Spryker conventions automatically, without requiring you to explain them in every prompt.

| Rule file | What it enforces |
|-----------|-----------------|
| `business-models.md` | Business model structure and responsibilities |
| `client-zed-communication.md` | Client–Zed gateway communication patterns |
| `controller.md` | Controller conventions and responsibilities |
| `dependency-provider.md` | Dependency provider wiring and plugin stacks |
| `enforce-constants-for-control-flow.md` | Use of constants instead of magic strings in control flow |
| `expander-pattern.md` | Expander pattern for extending transfer objects |
| `factory-pattern.md` | Factory class structure and dependency injection |
| `form-data-loading-performance.md` | Performant data loading in Zed forms |
| `layer-communication.md` | Cross-layer call rules (Presentation → Communication → Business → Persistence) |
| `mapper-pattern.md` | Mapper pattern for transfer-to-transfer and entity-to-transfer mappings |
| `module-config.md` | Module configuration class conventions |
| `naming-conventions.md` | Class, method, and variable naming standards |
| `owasp.md` | OWASP security guidelines applied to Spryker code |
| `performance.md` | Performance best practices (query optimization, caching) |
| `persistence.md` | Persistence layer conventions (repositories, entity managers) |
| `php-code-style.md` | PHP code style rules (PSR compliance, formatting) |
| `plugins.md` | Plugin and plugin interface implementation patterns |
| `table.md` | Back Office table and query container conventions |
| `transfer-object.md` | Transfer object usage and immutability rules |
| `upgradability.md` | Backward compatibility and upgradability guidelines |

### Context file

The `ai-dev-setup` skill generates a `CLAUDE.md` context file based on the [AGENTS.example.md](https://github.com/spryker-sdk/ai-dev/blob/master/data/agents/AGENTS.example.md) template. This file is automatically loaded into every Claude Code session and provides:

- Common Docker CLI commands for your Spryker project
- Spryker application layer overview (Zed, Yves, Glue, Client, Service, Shared)
- Namespace and directory structure
- Component rules for controllers, plugins, factories, repositories, and more
- Abstract class references for all layers

{% info_block infoBox "Starting point, not a complete setup" %}

The files generated by `ai-dev-setup` are a baseline derived from Spryker defaults. They cover general Spryker conventions but do not include anything specific to your project — custom modules, third-party integrations, team conventions, or environment details. Treat the generated `CLAUDE.md` and rules as a starting point and extend them with your project-specific requirements.

{% endinfo_block %}

## Optional enhancements

The following integrations are independent of the plugin, but they complement it in Claude Code:

- [Context7 MCP Server](/docs/dg/dev/ai/ai-dev/ai-dev-context7-mcp-server.html) — searches the Spryker public documentation with natural language queries, so Claude Code answers from the latest published docs.
- [Language Server for Claude Code CLI](/docs/dg/dev/ai/ai-dev/ai-dev-lsp-for-claude.html) — adds Phpactor or Intelephense code navigation and error detection, which resolves symbols locally instead of reading files to find them.
