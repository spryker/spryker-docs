---
title: AI Dev SDK
description: Spryker AI Dev SDK
template: concept-topic-template
redirect_from:
  - /docs/dg/dev/ai-dev/ai-dev
---

{% info_block warningBox %}

Before using AI-related tools, consult with your legal department.

{% endinfo_block %}

## Overview

The AI Dev SDK enhances local AI-assisted development by providing a Model Context Protocol (MCP) server, Spryker-aware context tools, and prompt library integration. This enables developers and AI assistants to work with accurate project information and share prompts consistently across teams.

## Key capabilities

The AI Dev SDK provides the following capabilities:

- **Local MCP server**: Run a local MCP server for your Spryker project and extend it with custom tools and prompts.
- **Spryker context awareness**: Give AI assistants access to Spryker contracts and data structures to reduce guesswork and implementation errors.
- **OMS flow exploration**: Support Order Management System (OMS) flow exploration by showing an order's current state and valid transitions, or listing transitions from any given state.
- **Prompt Library integration**: Reuse and generate prompts from the shared Prompt Library via a typed PHP API.
- **Integration-friendly output**: Keep console output integration-friendly with quiet execution mode.

## Install the AI Dev SDK

To install and configure the AI Dev SDK in your Spryker project, follow these steps:

### Prerequisites

Ensure you have a Spryker project with Composer installed.

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

4. Connect the MCP server to your AI agent of choice. For detailed configuration instructions, see [Configure the AiDev MCP server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html).

## Next steps

For more information about using the AI Dev SDK, see the following documents:

- [AI Dev Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html) - Learn more about the AI Dev SDK features and capabilities.
- [Configure the AiDev MCP server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html) - Set up the MCP server for your AI assistant.