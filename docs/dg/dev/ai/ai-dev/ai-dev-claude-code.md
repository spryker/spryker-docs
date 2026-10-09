---
title: Claude Code
description: Install and use the Spryker AI Dev SDK in Claude Code to get Spryker-aware skills, code review, and project setup directly in your AI coding assistant.
last_updated: Oct 6, 2026
label: early-access
keywords: ai, claude, claude code, plugin, marketplace, skills, spryker, ai-dev, code review, ci
template: howto-guide-template
redirect_from:
  - /docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin
  - /docs/sdk/dev/ai-dev-sdk/claude-code-plugin.html
---

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
- **Workflows you compose yourself.** Each skill covers one stage of work, so you combine them into the long-running workflow your team actually runs. Four ready-made workflows — project setup, customization, bugfix, and upgrade — get you started on day one, and the skills themselves are a template for writing your own. See [Composable by design](/docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html#composable-by-design).

The plugin is distributed through the `spryker-plugins-official` marketplace and installed directly inside Claude Code.

## Install the plugin

The plugin installs from the `spryker-plugins-official` marketplace inside Claude Code, and the `ai-dev-setup` skill then generates your project's rules and context file and registers the MCP server. Both steps, with screenshots and verification, are on one page — see [Installation](/docs/dg/dev/ai/ai-dev/ai-dev-installation.html).

## Capabilities

For a one-page reference of every skill and agent — what each does, when to use it, and the value it adds — see [Workflows, Skills, and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html).

Four skills own a full workflow and delegate each stage to the others. Each has its own page:

- [Project Starter Wizard](/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard.html) — turn a fresh demoshop clone into your project
- [Customization Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html) — build a feature from a product requirement document to a committed branch
- [Bugfix Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-bugfix-workflow.html) — drive a bug to a validated, QA-accepted fix
- [Upgrade Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html) — upgrade a customized project to a newer Spryker release

### Skills and subagents

The plugin bundles Spryker-aware skills, invoked in Claude Code with the `/` prefix, and subagents that the assistant delegates to for focused, single-purpose work. See [Skills](/docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html#skills) and [Agents](/docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html#agents) on the Workflows, Skills, and Agents page for the full list, commands, and READMEs.

### Rules

The `ai-dev-setup` skill writes a set of Spryker-specific coding rules into your project so the AI follows Spryker conventions automatically. See [Rules](/docs/dg/dev/ai/ai-dev/ai-dev-rules.html) for the full list of rule files and what each one enforces.

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
