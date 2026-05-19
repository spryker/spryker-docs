---
title: Language Server for Claude Code CLI
description: Configure LSP server for code navigation and analysis in Claude Code
last_updated: Jan 12, 2026
keywords: [ai, coding-assistants, phpactor, intelephense, LSP, language-server-protocol, language-server]
template: howto-guide-template
---

This document describes how to set up and use the LSP server with Claude Code CLI for efficient code navigation and analysis.

## Overview

**LSP - Language Server Protocol** is a standardized protocol that enables code editors and IDEs to communicate with language servers.
It provides features like code navigation, auto-completion, error detection, and more.
Phpactor and Intelephense are two popular LSP servers for PHP development.
Starting from Claude Code version `2.1.5`, LSP support is built-in and can be extended with plugins.

**Benefits:**
- Saves token usage by using local code analysis.
- Works faster than searching and analyzing files manually.
- Provides intelligent code navigation and error detection.

## Installation

1. Install Language Server (LSP) `Phpactor` following [installation guide](https://phpactor.readthedocs.io/en/master/usage/standalone.html#installation)

```bash
phpactor -v
```

```text
Phpactor 2025.12.21.1
```

2. Ensure Claude Code version is `2.1.5` or higher:

```bash
claude -v
```

```text
2.1.5 (Claude Code)
```

3. Enable the `Piebald-AI/claude-code-lsps` Claude Code plugin:

Follow the [installation guide](https://github.com/Piebald-AI/claude-code-lsps?tab=readme-ov-file#installing-the-plugins).

or:

- Run claude
- /plugin marketplace add Piebald-AI/claude-code-lsps
- Type /plugins
- Tab to Marketplaces and find `Piebald-AI/claude-code-lsps`
- Choose `phpactor` plugin for PHP
- Press "i" to install them
- Restart Claude Code

Check `.claude/settings.local.json`:

```json
{
    "enabledPlugins": {
        "phpactor@claude-code-lsps": true
    }
}
```

### Index the codebase

Run the indexing command in your project root:

```bash
phpactor index:build --reset
```

For more information about Phpactor indexer, see [Phpactor indexer](https://phpactor.readthedocs.io/en/master/reference/indexer.html).

## Supported operations

Phpactor supports the following LSP operations:

- `goToDefinition` - Navigate to where a symbol is defined
- `goToImplementation` - Find all implementations of an interface or abstract class
- `findReferences` - Find all usages of a class, method, or property
- `goToTypeDefinition` - Navigate to the type definition of a symbol
- `hover` - Get documentation and type information for a symbol
- `documentSymbol` - Get all symbols (functions, classes, variables) in a file
- `workspaceSymbol` - Search for symbols across the entire workspace
- `documentHighlight` - Highlight all occurrences of a symbol in a document

The following operations are not supported:
- `prepareCallHierarchy`
- `incomingCalls`
- `outgoingCalls`

![Phpactor find references](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/phpactor-ref.png)

## Error detection and validation

When [configured](https://phpactor.readthedocs.io/en/master/usage/configuration.html) in `.phpactor.json`, Phpactor sends notifications to Claude about:
- Intelligent errors detected by PHPStan
- Code style violations detected by PHP_CodeSniffer
- Formatting issues detected by PHP-CS-Fixer

Example configuration in `.phpactor.json`:

```json
{
    "$schema": "/phpactor.schema.json",
    "language_server_phpstan.enabled": true,
    "php_code_sniffer.enabled": true,
    "language_server_php_cs_fixer.enabled": true
}
```

Trust project configuration in the project root:

```bash
phpactor config:trust
```

![Phpactor validation](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/phpactor-validatio.png)

### Additional `CLAUDE.md` instructions

Additional instructions for using LSP with Claude Code are needed to ensure proper usage since Claude is not aware of LSP capabilities by default. 
It is expected to be fixed in future Claude versions.

Example instructions to include in `CLAUDE.md`:

```markdown
## LSP Server - MANDATORY

**CRITICAL: ALWAYS use LSP Server FIRST for code navigation tasks.**
**CRITICAL: ALWAYS use LSP Server FIRST for code Search.**
**CRITICAL: ALWAYS use LSP Server understand the code dependency.**

- YOU MUST Proactively suggest fixing LSP diagnostic issues as soon as they appear
- YOU MUST Leave code in a working state after every change
- CRITICAL: ALWAYS publish new LSP diagnostic errors as soon as they appear and suggest fixing them
- CRITICAL: ALWAYS display fixed LSP diagnostic errors in the output after every code change
- CRITICAL: LSP diagnostic errors MUST be displayed as LSP diagnostic in the output after every code change

Spryker uses inheritance often and LSP Server helps to understand the code dependency.

Before using Search/Glob/Grep/Read to find implementations, references, or definitions:
1. **FIRST try using LSP Server**
2. Only fall back to Search/Glob/Grep if LSP doesn't provide results

### LSP Operations (phpactor@claude-code-lsps)

Use these LSP operations for code navigation:
- **`goToImplementation`** - Find all implementations or definitions of an interface or abstract class method
- **`findReferences`** - Find all usages of a class, method, property, constant, or interface
- **`goToDefinition`** - Find where a symbol is defined
- **`goToTypeDefinition`** - Find the type definition of a symbol
- **`hover`** - Get documentation and type information for a symbol
- **`documentSymbol`** - Get all symbols (functions, classes, variables) in a file
- **`workspaceSymbol`** - Search for symbols across the entire workspace

### When to Use LSP (ALWAYS for these tasks)

**MANDATORY - Use LSP Server for:**
- Finding interface implementations (e.g., "what plugins implement this interface?")
- Finding class references (e.g., "where is this class used?")
- Finding method/property usages
- Navigating to definitions
- Getting type information and documentation
- Any code navigation task

**Only use Search/Glob/Grep/Read when:**
- LSP doesn't return results
- Searching for string patterns (not code symbols)
- Searching in non-PHP files
```

## Alternative: Intelephense

Intelephense is an official Claude plugin that provides LSP functionality for PHP. It is a paid (freemium) solution and has not been tested with Spryker projects yet. Feedback is appreciated.

### Installation

Install Intelephense globally:

```bash
npm i -g intelephense
```

For more information, see [Intelephense documentation](https://intelephense.com/docs#installation).

### Configuration

Enable the plugin in `.claude/settings.local.json`:

```json
{
    "enabledPlugins": {
        "php-lsp@claude-plugins-official": true
    }
}
```

Or find the `php-lsp` plugin in `/plugins` and enable it.
