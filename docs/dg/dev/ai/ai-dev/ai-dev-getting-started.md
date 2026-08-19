---
title: Getting Started
description: Set up Spryker skills, rules, and agents for your AI assistant at any project stage — fresh clone, installed, or running
last_updated: Aug 19, 2026
label: early-access
keywords: ai, ai-dev, getting started, claude, claude code, mcp, skills, agents
template: howto-guide-template
---

{% info_block warningBox "Experimental module" %}

The AiDev module is experimental and not stable. There is no backward compatibility promise for this module. We welcome your feedback and contributions as we continue to develop and improve this module.

{% endinfo_block %}

## Prerequisites

- [Claude Code](https://code.claude.com/docs/en/overview) is installed and you have a Claude account — a Pro or Max plan, or an API key. Claude Code has the most complete Spryker support; for Cursor, Windsurf, GitHub Copilot, OpenCode, or Codex CLI, see [Set up with another assistant](#set-up-with-another-assistant).
- Your project uses `docker/sdk` version 1.71.0 or later.

## Set up with Claude Code

### Step 1: Install the plugin

In your terminal, go to your project's root directory and run `claude`. On the first launch, Claude Code asks you to log in and to trust the project folder — accept both. You are now at the Claude Code prompt; commands starting with `/` are typed there, one at a time:

```text
/plugin marketplace add spryker-sdk/ai-dev
/plugin install spryker-ai-dev-sdk@spryker-plugins-official
/reload-plugins
```

This step works regardless of your project's state — the plugin installs into Claude Code itself, not into the project.

**Verify:** type `/spryker` — the command list filters to the Spryker skills, such as `/spryker-ai-dev-sdk:ai-dev-setup`. If nothing appears, quit Claude Code and run `claude` again.

All [skills and agents](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html) — packaged, Spryker-aware workflows for building features, fixing bugs, and upgrading — are now available. This already covers work that does not touch a specific project; for work on your codebase and data, complete step 2 first.

### Step 2: Add your project's context

This step generates the Spryker coding rules (`.claude/rules/`) and the project context file (`CLAUDE.md`), and registers the [MCP server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html) — live access to your transfers, module interfaces, and OMS configuration.

Before you run it:

- Your project's Docker environment must be running: `docker/sdk up`, typed in a separate terminal, not at the Claude Code prompt. The skill runs Composer and console commands inside the containers.
- On a fresh, un-booted clone, skip this step and return after the first boot — for example, after the [Project Starter Wizard](/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard.html) has set up and booted the project.

At the Claude Code prompt, run:

```text
/spryker-ai-dev-sdk:ai-dev-setup
```

The skill checks your project's state and handles every case:

- If the `spryker-sdk/ai-dev` module is not in your project yet, it installs it and wires up the console commands. The first run takes a few minutes while Composer runs — and Claude Code asks for permission before each command; approve them to let the skill proceed.
- If the module is already installed, it skips the installation and only refreshes the generated files, asking before it changes any existing file.

It is safe to re-run at any time.

**Verify:** the generated files exist — `ls CLAUDE.md .claude/rules/` in your terminal — and `/context` in Claude Code lists them as loaded.

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

3. Generate the rules, context file, and skills:

   ```bash
   docker/sdk console ai-dev:setup
   ```

   The command detects your assistant, asks you to confirm, and writes into its directories — see the [Setup Command](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html#setup-command) for the output locations per tool. It is safe to re-run.

   **Verify:** your assistant's directories exist — for example, `.cursor/rules/` for Cursor or `.windsurf/rules/` for Windsurf.

4. Configure the MCP server: in your assistant's MCP settings, add a server that runs the following command, with the executable and the arguments as separate fields:

   ```text
   <project-path>/docker/sdk console ai-dev:mcp-server -q
   ```

   The [AI Dev MCP Server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html) page shows configuration examples to adapt for your tool.

## Try it

You do not need to learn commands — describe what you want in your own words, and the assistant picks the matching skill. Some first prompts to try:

- *"Write a product requirement document for a minimum order value per store"* — produces a research-grounded spec before any code
- *"Build this feature: ..."* — walks a requirement through implementation, tests, and review with the [Customization Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html)
- *"Fix this bug: customers can check out with an empty cart"* — drives the [Bugfix Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-bugfix-workflow.html) from reproduction to a validated fix
- *"Review my staged changes against Spryker coding standards"*
- *"Turn this demoshop into our project"* — on a fresh clone, starts the [Project Starter Wizard](/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard.html)

## Where to go next

- [Skills and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html) — everything the SDK ships and what each piece does
- [Claude Code](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code.html) — the plugin in detail, slash commands, and optional enhancements
- [Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html) — the module's console commands, extension points, and MCP debugging
