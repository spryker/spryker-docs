---
title: AI Dev SDK
description: Make your AI coding assistant Spryker-aware with skills, agents, rules, and an MCP server
last_updated: Aug 19, 2026
label: early-access
template: concept-topic-template
redirect_from:
  - /docs/dg/dev/ai-dev/ai-dev
  - /docs/dg/dev/ai/ai-dev/ai-dev-overview
---

{% info_block warningBox "Experimental module" %}

The AiDev module is experimental and not stable. There is no backward compatibility promise for this module. We welcome your feedback and contributions as we continue to develop and improve this module.

{% endinfo_block %}

{% info_block warningBox "Warning" %}

Before you use AI-related tools, consult your legal department.

{% endinfo_block %}

## Overview

When you use AI tools to write code, they rely on general patterns, which leads to mistakes and requires you to repeatedly explain your project structure.

The AI Dev SDK makes your AI assistant Spryker-aware. It ships:

- **Skills and agents** — packaged workflows for Spryker work: project setup, feature customization, bugfixing, upgrades, testing, and code review. See [Workflows, Skills, and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html).
- **Rules and a project context file** — Spryker's coding conventions and your project's specifics, loaded into every session.
- **An MCP server** (MCP — Model Context Protocol, a standard that lets AI tools query external systems) — live access to your running application: transfer objects, module interfaces, order management system (OMS) state machines, and read-only database queries. See [AI Dev MCP Server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html).

The SDK is delivered by the `spryker-sdk/ai-dev` module and, for Claude Code, by the `spryker-ai-dev-sdk` plugin. To set either of them up, see [Installation](/docs/dg/dev/ai/ai-dev/ai-dev-installation.html).

## How it works

The skills, agents, and rules are files installed into your AI tool's directories — through the Claude Code plugin (for Claude Code) or the `ai-dev:setup` console command (for other assistants). The assistant loads the rules and the context file into every session, and when you describe a task, it picks the matching skill and follows a tested Spryker workflow instead of improvising.

The MCP server covers what static files cannot: facts about your running application. It runs as a console command inside your project's Docker container; when the assistant needs a transfer structure, an OMS transition, or a data check, it queries the server and works with your actual project state instead of assumptions.

The result: the generated code fits your project from the start, and you spend less time correcting mistakes and explaining Spryker concepts.

## Key capabilities

### Ready-made workflows

Four orchestrated workflows drive multi-step work end to end, and the profiler workflow turns the WebProfiler into hard numbers. They are all documented under [Workflows, Skills, and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html):

- [Project Starter Wizard](/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard.html) — turn a fresh demoshop clone into your project
- [Customization Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html) — build a feature from a product requirement document to a committed branch
- [Bugfix Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-bugfix-workflow.html) — drive a bug to a validated, QA-accepted fix
- [Upgrade Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html) — upgrade a customized project to a newer Spryker release
- [Profiler Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-profiler-workflow.html) — read the Spryker WebProfiler as hard performance numbers

### Spryker-aware code review

The `spryker-code-reviewer` agent checks changes against Spryker's coding standards and layer architecture before they reach a pull request.

### Faster Spryker-specific answers

AI can search Spryker documentation instead of requiring you to explain basic concepts or guessing how features work.

### Smarter code generation

AI can look up your actual transfer objects, module dependencies, and interface methods so that the generated code matches your project structure instead of relying on assumptions.

### OMS debugging made easy

AI can analyze your OMS flows to find possible next states, transitions, conditions, and timeouts for any order or state. This capability is especially helpful when you work with complex OMS schemas. You no longer need to manually follow arrows in large diagrams.

### Working with complex data imports

AI can analyze, modify, and transform multi-column CSV files correctly. This task normally requires significant manual effort.

### Database queries

AI can execute read-only database queries to inspect data when debugging issues.

### Extensible for your project

You can extend the MCP server with custom plugins to add new tools — see [Extension points](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html#extension-points). The shipped skills are plain Markdown files, so you can also use them as a template for your team's own workflows.

## Next steps

- [Installation](/docs/dg/dev/ai/ai-dev/ai-dev-installation.html) — set everything up, from installing your AI assistant to your first prompt
- [Workflows, Skills, and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html) — everything the SDK ships and what each piece does
- [Claude Code](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code.html) — the plugin in detail, slash commands, and optional enhancements
- [AI Dev MCP Server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html) — the available MCP tools, extension points, and debugging
