---
title: AI Dev SDK
description: Spryker AI Dev SDK
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

3. Register the console commands in your `ConsoleDependencyProvider`:

   ```php
   use SprykerSdk\Zed\AiDev\Communication\Console\GeneratePromptsConsole;
   use SprykerSdk\Zed\AiDev\Communication\Console\McpServerConsole;

   protected function getConsoleCommands(Container $container): array
   {
       ...
       if (class_exists(GeneratePromptsConsole::class)) {
           $commands[] = new GeneratePromptsConsole();
       }

       if (class_exists(McpServerConsole::class)) {
           $commands[] = new McpServerConsole();
       }
       ...
   }
   ```

4. Connect the AI Dev SDK to your AI agent. For detailed configuration instructions, see [Configure the AiDev MCP server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html).

## Next steps

- [Configure the AiDev MCP server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html) - Set up the connection to your AI tool
- [AI Dev SDK Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html) - Learn more about the AI Dev SDK features and capabilities
