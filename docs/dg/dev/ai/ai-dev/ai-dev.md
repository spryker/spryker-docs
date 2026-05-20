---
title: AI Dev SDK
description: Spryker AI Dev SDK
last_updated: May 20, 2026
template: concept-topic-template
redirect_from:
  - /docs/dg/dev/ai-dev/ai-dev
---

{% info_block warningBox "Warning" %}

Before you use AI-related tools, consult your legal department.

{% endinfo_block %}

## Overview

When you use AI tools to write code, they rely on general patterns, which leads to mistakes and requires you to repeatedly explain your project structure.

The AI Dev SDK provides an MCP server, which is a console command that your AI tool runs in your project's Docker container and helps it to increase Spryker-context awareness. MCP (Model Context Protocol) is a standard protocol that lets AI tools request specific information from external sources, similar to how a browser requests data from an API.

## How it works

After you install the SDK, [add a simple configuration](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html) to your AI tool. When your Spryker project is running, your AI tool can access Spryker-specific information and prompts through the MCP server.

## Result

AI generates better code faster and with fewer errors. You spend less time correcting mistakes and explaining Spryker concepts.

## Key capabilities

### Faster Spryker-specific answers

AI can search Spryker documentation instead of requiring you to explain basic concepts or guessing how features work.

### Smarter code generation

AI can look up your actual transfer objects, module dependencies, and interface methods so that the generated code matches your project structure instead of relying on assumptions.

### OMS debugging made easy

AI can analyze your OMS flows to find possible next states, transitions, conditions, and timeouts for any order or state. This capability is especially helpful when you work with complex OMS schemas. You no longer need to manually follow arrows in large diagrams.

### Working with complex data imports

AI can analyze, modify, and transform multi-column CSV files correctly. This task normally requires significant manual effort.

### Sharing prompts across your team

The SDK includes access to the Spryker prompt library, and you can add your own project-specific prompts. This means your team can reuse effective prompts instead of everyone writing their own.

### Database queries

AI can execute read-only database queries to inspect data when debugging issues.

### Extensible for your project

You can extend the MCP server by creating custom plugins (to add new tools) and custom prompts.

## Install the AI Dev SDK

### Prerequisites

Ensure that you have a Spryker project with Composer installed.

### Installation steps

1. Require the package as a development dependency:

   ```bash
   composer require spryker-sdk/ai-dev --dev
   ```

2. Generate the transfer objects:

   ```bash
   console transfer:generate
   ```

3. Register the console commands in your `ConsoleDependencyProvider`. The `class_exists()` guards keep the project bootable on environments where the dev dependency is absent (for example, production):

   ```php
   use SprykerSdk\Zed\AiDev\Communication\Console\AiToolSetupConsole;
   use SprykerSdk\Zed\AiDev\Communication\Console\McpServerConsole;

   protected function getConsoleCommands(Container $container): array
   {
       ...
       if (class_exists(McpServerConsole::class)) {
           $commands[] = new McpServerConsole();
       }

       if (class_exists(AiToolSetupConsole::class)) {
           $commands[] = new AiToolSetupConsole();
       }
       ...
   }
   ```

4. Connect the AI Dev SDK to your AI agent. For detailed configuration instructions, see [Configure the AiDev MCP server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html).

## Claude Code plugin

The AI Dev SDK ships a Claude Code plugin — `spryker-ai-dev-sdk` — that bundles Spryker-aware skills and the `spryker-code-reviewer` agent. The plugin is distributed through the `spryker-plugins-official` marketplace hosted in this repository.

Bundled skills: `ai-dev-setup`, `code-review`, `propel-schema`, `data-import`, `codecept-functional`, `static-validation`, `yves-atomic-frontend`.

### Install from the marketplace

Inside Claude Code, run:

```text
/plugin marketplace add spryker-sdk/ai-dev
/plugin install spryker-ai-dev-sdk@spryker-plugins-official
```

After installation, restart the Claude Code session for the new skills and agents to appear.

### Test the plugin locally

To use the plugin directly from your local checkout without publishing it first:

1. Launch Claude Code with the plugin loaded from your local checkout:

   ```bash
   claude --plugin-dir /absolute/path/to/vendor/spryker-sdk/ai-dev/plugins/spryker-ai-dev-sdk
   ```

   The path must point at the plugin directory — the one containing `.claude-plugin/plugin.json` — not the repository root.

2. After editing a `SKILL.md` or an agent definition, restart the session — skill frontmatter is parsed at load time and is not hot-reloaded.

## Next steps

- [Configure the AiDev MCP server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html) — Set up the connection to your AI tool
- [AI Dev SDK Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html) — Learn more about the AI Dev SDK features and capabilities
