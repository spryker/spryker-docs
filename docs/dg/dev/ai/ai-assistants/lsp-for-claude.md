---
title: Language Server for Claude Code
description: Configure LSP server for code navigation and analysis in Claude Code
last_updated: Jan 12, 2026
keywords: [ai, coding-assistants, phpactor, intelephense, LSP, language-server-protocol, language-server]
template: howto-guide-template
---

This document describes how to set up and use the LSP server with Claude Code for efficient code navigation and analysis.

## Overview

Phpactor is a Claude plugin that provides Language Server Protocol (LSP) functionality for PHP development. It is currently the most tested LSP solution for Spryker projects.

**Benefits:**
- Saves token usage by using local code analysis
- Works faster than searching and analyzing files manually
- Provides intelligent code navigation and error detection

## Installation

Install Phpactor using Homebrew:

```bash
brew install phpactor/tap/phpactor
phpactor -v
```

## Configuration

### Enable the plugin

Follow the [installation guide](https://github.com/Piebald-AI/claude-code-lsps?tab=readme-ov-file#installing-the-plugins).

Enable Phpactor plugin in settings `.claude/settings.local.json`:

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

For more information Phpactor, see [Phpactor documentation](https://phpactor.readthedocs.io/en/master/).

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
    "language_server_php_cs_fixer.enabled": true,
    "indexer.exclude_patterns": [
        "/vendor/**/Tests/**/*",
        "/vendor/**/tests/**/*",
        "/vendor/composer/**/*",
        "/docker/**/*",
        "/data/**/*"
    ]
}
```

Trust project configuration in the project root:
```bash
phpactor config:trust
```

![Phpactor validation](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/phpactor-validatio.png)

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

Find the `php-lsp` plugin in `/plugins` and enable it.
