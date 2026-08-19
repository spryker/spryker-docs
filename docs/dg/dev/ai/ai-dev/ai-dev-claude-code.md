---
title: Claude Code
description: Install and use the Spryker AI Dev SDK in Claude Code to get Spryker-aware skills, code review, and project setup directly in your AI coding assistant.
last_updated: Aug 19, 2026
label: early-access
keywords: ai, claude, claude code, plugin, marketplace, skills, spryker, ai-dev, code review, ci
template: howto-guide-template
redirect_from:
  - /docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin
---

{% info_block warningBox "Experimental module" %}

The AiDev module is experimental and not stable. There is no backward compatibility promise for this module. We welcome your feedback and contributions as we continue to develop and improve this module.

{% endinfo_block %}

{% info_block warningBox "MCP skills need a running project" %}

Installing the plugin needs nothing from your project. However, skills that rely on MCP tools run against your Spryker Docker containers — start the project with `docker/sdk up` before using them.

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

- [Claude Code](https://code.claude.com/docs/en/overview) installed

## Install the plugin from the marketplace

1. Open Claude Code in your terminal.

2. Add the Spryker plugin marketplace and install the plugin:

   ```text
   /plugin marketplace add spryker-sdk/ai-dev
   /plugin install spryker-ai-dev-sdk@spryker-plugins-official
   ```

   ![Installing the spryker-ai-dev-sdk plugin from the marketplace dialog](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-4.png)

3. After installation, reload the plugins:

   ```text
   /reload-plugins
   ```

   The command activates the installed plugin's skills and agents without restarting the session. Alternatively, restart the Claude Code session.


## Set up AI tooling for your project

After installing the plugin, run the `/spryker-ai-dev-sdk:ai-dev-setup` skill. It installs the `spryker-sdk/ai-dev` module in your project — skipping whatever is already in place — registers the AI Dev MCP server with Claude Code, and generates `.claude/rules/` and `CLAUDE.md`. For the step-by-step walkthrough, see [Getting Started](/docs/dg/dev/ai/ai-dev/ai-dev-getting-started.html#step-2-add-your-projects-context).

To check the result, run `/context` in Claude Code — it lists `CLAUDE.md` and the rules as loaded context:

![The /context output listing CLAUDE.md and the Spryker rules](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-install-1.png)

## Capabilities

For a one-page reference of every skill and agent — what each does, when to use it, and the value it adds — see [Skills and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html).

Four skills own a full workflow and delegate each stage to the others. Each has its own page:

- [Project Starter Wizard](/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard.html) — turn a fresh demoshop clone into your project
- [Customization Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html) — build a feature from a product requirement document to a committed branch
- [Bugfix Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-bugfix-workflow.html) — drive a bug to a validated, QA-accepted fix
- [Upgrade Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html) — upgrade a customized project to a newer Spryker release

### Skills

Every skill in the [Skills and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html#skills) catalog is available in Claude Code as a slash command:

```text
/spryker-ai-dev-sdk:<skill-name>
```

For example, `/spryker-ai-dev-sdk:spryker-customization`. The short form `/<skill-name>` also resolves when no other installed skill has the same name. Type `/spryker` in your session to see the full list.

### Subagents

The plugin includes six subagents — isolated sub-conversations the assistant delegates to for focused, single-purpose work: code review, feature questions, behavior verification, failure diagnosis, test-data seeding, and screenshot capture. See the [agents table](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html#agents) for what each one does.

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
