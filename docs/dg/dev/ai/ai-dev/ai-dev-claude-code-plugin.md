---
title: Claude Code Plugin
description: Install and use the Spryker AI Dev SDK plugin for Claude Code to get Spryker-aware skills, code review, and project setup directly in your AI coding assistant.
last_updated: May 21, 2026
label: early-access
keywords: ai, claude, claude code, plugin, marketplace, skills, spryker, ai-dev, code review
template: howto-guide-template
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

### Skills

The plugin bundles the following Spryker-aware skills. Invoke them in Claude Code with the `/` prefix.

| Skill | Command | Description |
|-------|---------|-------------|
| AI Dev Setup | `/spryker-ai-dev-sdk:ai-dev-setup` | Generates rules, a context file, and skills for your project and AI tool |
| Code Review | `/spryker-ai-dev-sdk:code-review` | Reviews staged or PR changes against Spryker coding standards |
| Propel Schema | `/spryker-ai-dev-sdk:propel-schema` | Helps create and modify Propel ORM schema files following Spryker conventions |
| Data Import | `/spryker-ai-dev-sdk:data-import` | Assists with creating and modifying data import CSV files and importers |
| Codecept Functional | `/spryker-ai-dev-sdk:codecept-functional` | Generates Codeception functional tests following Spryker test patterns |
| Static Validation | `/spryker-ai-dev-sdk:static-validation` | Runs and interprets static analysis tools (PHPStan, PHP CS Fixer) |
| Payment Template | `/spryker-ai-dev-sdk:payment-template` | Scaffolds payment method integration following Spryker payment module patterns |
| Yves Atomic Frontend | `/spryker-ai-dev-sdk:yves-atomic-frontend` | Helps create atomic design components for the Yves frontend |

### Subagent

The plugin includes the `spryker-code-reviewer` subagent. The subagent performs deep code reviews of your changes against Spryker architectural patterns, coding standards, and best practices.

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
