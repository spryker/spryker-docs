---
title: Installation
description: Install the Spryker AI Dev SDK — skills, agents, rules, and the MCP server — in Claude Code or in another AI assistant
last_updated: Aug 19, 2026
label: early-access
keywords: ai, ai-dev, installation, install, setup, claude, claude code, cursor, windsurf, copilot, mcp, skills, agents
template: howto-guide-template
---

{% info_block warningBox "Experimental module" %}

The AiDev module is experimental and not stable. There is no backward compatibility promise for this module. We welcome your feedback and contributions as we continue to develop and improve this module.

{% endinfo_block %}

{% info_block warningBox "Warning" %}

Before you use AI-related tools, consult your legal department.

{% endinfo_block %}

This page is the single installation reference for the AI Dev SDK. It covers every AI tool and every project state — a fresh clone, an installed project, or a running one. All other AI Dev SDK pages link here instead of repeating installation steps.

## Prerequisites

- [Claude Code](https://code.claude.com/docs/en/overview) is installed and you have a Claude account — a Pro or Max plan, or an API key. Claude Code has the most complete Spryker support; for Cursor, Windsurf, GitHub Copilot, OpenCode, or Codex CLI, see [Set up with another assistant](#set-up-with-another-assistant).
- Your project uses `docker/sdk` version 1.71.0 or later. Make sure your development environment is up to date before you install the AiDev module.

## Set up with Claude Code

### Step 1: Install the plugin

In your terminal, go to your project's root directory and run `claude`. On the first launch, Claude Code asks you to log in and to trust the project folder — accept both. You are now at the Claude Code prompt; commands starting with `/` are typed there, one at a time:

```text
/plugin marketplace add spryker-sdk/ai-dev
/plugin install spryker-ai-dev-sdk@spryker-plugins-official
/reload-plugins
```

The `/reload-plugins` command activates the plugin's skills and agents without restarting the session. Alternatively, restart the Claude Code session.

This step works regardless of your project's state — the plugin installs into Claude Code itself, not into the project.

If you prefer the interactive `/plugin` menu, the same two steps look as follows:

![Add the Spryker marketplace in the plugin menu](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-1.png)
![Confirm the marketplace source](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-2.png)
![The Spryker marketplace added to Claude Code](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-3.png)
![Select the spryker-ai-dev-sdk plugin](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-4.png)
![Confirm the plugin installation](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-5.png)
![The plugin installed and enabled](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-6.png)

{% info_block infoBox "Verify" %}

Type `/spryker` — the command list filters to the Spryker skills, such as `/spryker-ai-dev-sdk:ai-dev-setup`. If nothing appears, quit Claude Code and run `claude` again.

{% endinfo_block %}

All [skills and agents](/docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html) — packaged, Spryker-aware workflows for building features, fixing bugs, and upgrading — are now available. This already covers work that does not touch a specific project; for work on your codebase and data, complete step 2 first.

### Step 2: Add your project's context

This step generates the Spryker coding rules (`.claude/rules/`) and the project context file (`CLAUDE.md`), and registers the [MCP server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html) — live access to your transfers, module interfaces, and OMS configuration.

Before you run it:

- Your project's Docker environment must be running: `docker/sdk up`, typed in a separate terminal, not at the Claude Code prompt. The skill runs Composer and console commands inside the containers.
- On a fresh, un-booted clone, skip this step and return after the first boot — for example, after the [Project Starter Wizard](/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard.html) has set up and booted the project.

At the Claude Code prompt, run:

```text
/spryker-ai-dev-sdk:ai-dev-setup
```

![Run the ai-dev-setup skill](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-skill-setup.png)

The skill checks your project's state and handles every case:

- If the `spryker-sdk/ai-dev` module is not in your project yet, it installs it, wires up the console commands, registers the MCP server with Claude Code, and generates `.claude/rules/` and `CLAUDE.md`. The first run takes a few minutes while Composer runs — and Claude Code asks for permission before each command; approve them to let the skill proceed.
- If the module is already installed, it skips the installation and only refreshes the generated files, asking before it changes any existing file.

It is safe to re-run at any time.

{% info_block infoBox "Verify" %}

Run `ls CLAUDE.md .claude/rules/` in your terminal to confirm the generated files exist, then run `/context` in Claude Code to confirm it loads them.

{% endinfo_block %}

The `/context` output looks as follows:

![Rules and context file loaded into the session](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-install-1.png)
![Skills available in the session](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-install-2.png)
![MCP server connected](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-install-3.png)
![Spryker MCP tools available](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-install-4.png)

## Set up with another assistant

This path requires an installed project with the Docker environment running (`docker/sdk up`).

1. If `spryker-sdk/ai-dev` is not in your project's `composer.json` yet, install it:

   ```bash
   docker/sdk cli
   composer require spryker-sdk/ai-dev --dev
   console transfer:generate
   exit
   ```

   If it is already there, update it to the latest version instead:

   ```bash
   docker/sdk cli
   composer update spryker-sdk/ai-dev
   console transfer:generate
   exit
   ```

2. Register the console commands in `src/Pyz/Zed/Console/ConsoleDependencyProvider.php`. Skip this step if the file already registers `McpServerConsole`. The `class_exists()` guards keep the project bootable on environments where the dev dependency is absent, such as production:

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

3. Generate the rules, context file, and skills with the `ai-dev:setup` console command:

   ```bash
   docker/sdk console ai-dev:setup
   ```

   The command detects your assistant, asks you to confirm or select a different one, and writes into that tool's directories — see [Generated files per AI tool](#generated-files-per-ai-tool). It is safe to re-run: it refreshes previously generated files from the latest upstream content.

   **Verify:** your assistant's directories exist — for example, `.cursor/rules/` for Cursor or `.windsurf/rules/` for Windsurf.

4. Register the MCP server in your assistant — see [Register the MCP server](#register-the-mcp-server).

### Generated files per AI tool

For the selected tool, `ai-dev:setup` generates the following:

- **Rules**: Spryker's coding conventions and architectural guidelines.
- **Agents/context file**: project-specific context for AI agents.
- **Skills**: reusable, task-specific AI skill files.

The command supports two output modes:

- **Ready to use**: files are generated directly in the tool-specific directories listed below.
- **Example**: files are generated in example directories — for example, `.claude/rules-example/` instead of `.claude/rules/`. Rename the directories when you are ready to use them.

![Choosing the output mode during setup](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/claude-plugin-step-7.png)

| AI tool | Rules directory | Agents/context file | Skills directory |
|---------|----------------|---------------------|-----------------|
| Claude Code | `.claude/rules/` | `CLAUDE.md` | `.claude/skills/` |
| Windsurf | `.windsurf/rules/` | `.windsurfrules` | `.windsurf/skills/` |
| GitHub Copilot | `.github/instructions/` | `.github/copilot-instructions.md` | `.github/skills/` |
| Cursor | `.cursor/rules/` | `AGENTS.md` | `.cursor/skills/` |
| OpenCode | `.opencode/rules/` | `AGENTS.md` | `.agents/skills/` |
| Codex CLI | Not supported — see below | `AGENTS.md` | `.agents/skills/` |

Codex CLI does not have a native rules format. When you select it, the command offers to generate rules in another tool's format instead and places them in that tool's rules directory.

{% info_block infoBox "GitHub Copilot and Docker sync" %}

If you use Docker sync, the `/.git*` entry in `.dockersyncignore` also excludes the `.github` folder, which prevents Copilot-generated files from being available inside the container. To fix this, add the following line to `.dockersyncignore` after the `/.git*` entry:

```text
!/.github
```

{% endinfo_block %}

## Register the MCP server

The MCP server runs inside your project's Docker container through the `ai-dev:mcp-server` console command:

```bash
docker/sdk console ai-dev:mcp-server -q
```

The `-q` flag (quiet mode) suppresses unnecessary output, which is important for the MCP stdio transport. For the tools the server exposes, see [AI Dev MCP Server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html).

Register that command in your assistant, with the executable and the arguments as separate fields. The following sections show the most common assistants; adapt one of them for your tool.

### Claude Code

If you set up your project with the `ai-dev-setup` skill, the MCP server is already registered — skip this section.

Otherwise, go to your Spryker project directory and run:

```bash
claude mcp add spryker-project "$(pwd)/docker/sdk" -- console ai-dev:mcp-server -q
```

This command:

- Adds the MCP server configuration to Claude Code
- Uses the current project directory path automatically
- Configures the server to run in quiet mode

Quote only the executable and keep the arguments after the `--` separator. Passing everything as one quoted string stores the whole string as the executable path, and the server fails to start with `Failed to connect — ENOENT: no such file or directory`. If you registered it that way, remove the entry with `claude mcp remove spryker-project` and add it again as shown.

Claude Code now has access to Spryker-specific tools through the MCP server.

![Spryker MCP tools in Claude Code](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/mcp-tool-claude-code.png)

### Claude Desktop

1. Open Claude Desktop settings.
2. Go to the **Developer** section.
3. Add the following configuration to `claude_desktop_config.json`:

   ```json
   {
     "mcpServers": {
       "spryker-project": {
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

4. Restart Claude Desktop.

### GitHub Copilot in PHPStorm

1. Open PHPStorm settings.
2. Go to **Tools > GitHub Copilot > MCP Servers**.
3. Add a new server configuration with the following JSON:

   ```json
   {
     "servers": {
       "spryker-project": {
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

4. Restart PHPStorm.

{% info_block infoBox "PHPStorm version" %}

MCP support in GitHub Copilot for PHPStorm requires PHPStorm version 2024.3 or later. Check your IDE version and update if necessary.

{% endinfo_block %}

![Spryker MCP tools in GitHub Copilot](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/mcp+copilot.png)

## Try it

You do not need to learn commands — describe what you want in your own words, and the assistant picks the matching skill. Some first prompts to try:

- *"Write a product requirement document for a minimum order value per store"* — produces a research-grounded spec before any code
- *"Build this feature: ..."* — walks a requirement through implementation, tests, and review with the [Customization Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html)
- *"Fix this bug: customers can check out with an empty cart"* — drives the [Bugfix Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-bugfix-workflow.html) from reproduction to a validated fix
- *"Review my staged changes against Spryker coding standards"*
- *"Turn this demoshop into our project"* — on a fresh clone, starts the [Project Starter Wizard](/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard.html)

## Where to go next

- [Workflows, Skills, and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html) — everything the SDK ships and what each piece does
- [Claude Code](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code.html) — the plugin in detail, slash commands, and optional enhancements
- [AI Dev MCP Server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html) — the available MCP tools, extension points, and debugging
