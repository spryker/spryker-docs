---
title: Configure the AiDev MCP server
description: Set up and configure the Model Context Protocol server for AI assistant integration
last_updated: Dec 9, 2025
keywords: ai, mcp, model context protocol, claude, copilot, ai-dev, configuration
template: howto-guide-template
---

This document describes how to configure and use the AiDev MCP server to connect AI assistants to your Spryker application.

## About Model Context Protocol (MCP)

The Model Context Protocol (MCP) is an open-source standard for connecting AI applications to external systems. 
For Spryker developers, MCP allows AI assistants like Claude or Copilot to understand your project improving the quality of AI-generated code and recommendations.

Learn more about MCP at [modelcontextprotocol.io](https://modelcontextprotocol.io/docs/getting-started/intro).

## Configure the MCP server

The AiDev module provides an MCP server through the `ai-dev:mcp-server` console command. To configure it for use with AI assistants, you need the full path to your project and the Docker SDK command.

```bash
docker/sdk console ai-dev:mcp-server -q
```

The `-q` flag (quiet mode) suppresses unnecessary output, which is important for the MCP stdio transport.

## Integration with AI assistants

### Claude Code

For Claude Code CLI, add the MCP server using the command line.

Navigate to your Spryker project directory and run:

```bash
claude mcp add spryker-project "$(pwd)/docker/sdk console ai-dev:mcp-server -q"
```

This command will:
- Add the MCP server configuration to Claude Code
- Use the current project directory path automatically
- Configure the server to run in quiet mode

Claude Code will now have access to Spryker-specific tools and prompts through the MCP server.
![MCP prompts](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/MCP-prompts.png)
![MCP claude code](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/mcp-tool-claude-code.png)

### Claude Desktop

For Claude Desktop application, configure the MCP server in the application settings.

1. Open Claude Desktop settings
2. Navigate to the **Developer** section
3. Add the following configuration to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "spryker-ai-dev": {
      "command": "/Users/username/projects/spryker-project/docker/sdk",
      "args": [
        "console", 
        "ai-dev:mcp-server", 
        "-q"
      ]
    }
  }
}
```

4. Restart Claude Desktop

### GitHub Copilot in PHPStorm

For GitHub Copilot Chat in PHPStorm with MCP support (requires PHPStorm 2024.3+):

1. Open PHPStorm Settings/Preferences
2. Navigate to **Tools � GitHub Copilot � MCP Servers**
3. Add a new server configuration with the following JSON:

```json
{
  "servers": {
    "spryker-mcp": {
      "type": "stdio",
      "command": "/Users/username/projects/spryker-project/docker/sdk",
      "args": [
        "console",
        "ai-dev:mcp-server",
        "-q"
      ]
    }
  },
  "inputs": []
}
```

4. Restart PHPStorm

{% info_block infoBox "PHPStorm version" %}

MCP support in GitHub Copilot for PHPStorm requires PHPStorm version 2024.3 or later. Check your IDE version and update if necessary.

{% endinfo_block %}

![MCP Copilot](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/mcp+copilot.png)

## Available MCP tools

The AiDev module provides the following built-in tools that AI assistants can use:

| Tool name | Description |
|-----------|-------------|
| `getTransferStructureByName` | Retrieves the structure of a Spryker transfer object by its name. Returns all properties with their types and metadata. |
| `getTransferStructureByNamespace` | Retrieves the structure of a Spryker transfer object by its fully qualified namespace. |
| `getInterfaceMethodsByNamespace` | Retrieves all method signatures, parameters, return types, and PHPDoc for a given interface FQN (Fully Qualified Name). |
| `getOmsTransitionsByState` | Retrieves OMS state machine transitions for a specific state. Returns all transitions that start from the given state, optionally filtered by process name. |
| `getOrderOmsTransitions` | Retrieves OMS state machine transitions for a specified order from the order's current state. Helps identify the current state and possible transitions. |

AI assistants can automatically discover and use these tools when connected to the MCP server.

## MCP prompts

The AiDev module provides contextual prompts to help AI assistants understand Spryker-specific concepts and patterns.

### Default prompts

By default, prompts are automatically downloaded from the [Spryker Prompt Library](https://github.com/spryker-dev/prompt-library) when you run the MCP server for the first time. These prompts include:
- Spryker architecture patterns
- Module structure guidelines
- Development best practices
- Common workflows and conventions

The prompts are generated and stored in: `src/Generated/Shared/Prompts/`

### Custom prompts

You can extend the default prompts by adding custom prompt files to the prompts directory:

```text
PROJECT_ROOT/data/prompts/
```

To add custom prompts:

1. Create the prompts directory if it doesn't exist:
   
```bash
mkdir -p data/prompts
```

2. Add your custom prompt markdown file `data/prompts/custom-prompt.md` to this directory with the following structure:

```md
---
title: prompt name
description: short description
---

prompt content ...
```

3. Regenerate prompts to include your custom ones:

```bash
docker/sdk console ai-dev:generate-prompts
```

Custom prompts should be written in Markdown format and follow the same structure as the default prompts from the Prompt Library. They will be converted into PHP classes and made available to AI assistants through the MCP server.

### Managing prompts

To manually regenerate prompts from the Prompt Library and your custom prompts:

```bash
docker/sdk console ai-dev:generate-prompts
```

This command will:
- Fetch the latest prompts from the configured Prompt Library repository
- Process any custom prompts in `data/prompts/`
- Generate PHP prompt classes in `src/Generated/Shared/Prompts/`
