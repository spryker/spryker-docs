---
title: Context7 MCP Server
description: Use Context7 MCP server with Claude for intelligent context search in Spryker public documentation
template: concept-topic-template
---

This document describes how to use the Context7 MCP server with Claude to enable intelligent context search across Spryker public documentation.

Context7 provides an MCP (Model Context Protocol) server that integrates with Claude to give you direct access to up-to-date Spryker documentation. This lets you ask questions and get accurate answers based on the latest Spryker documentation without manually searching through docs.

## What is Context7

Context7 is a documentation search service that provides intelligent context-aware search capabilities through the MCP protocol. The Spryker documentation is available through Context7 at [https://context7.com/spryker/spryker-docs](https://context7.com/spryker/spryker-docs).

When integrated with Claude, Context7 enables you to:
- Search Spryker documentation using natural language queries
- Get accurate, context-aware answers from the latest documentation
- Quickly find relevant code examples and implementation guides
- Access documentation without leaving your development environment

## Prerequisites

- Compatible MCP client installed on your system (Claude Desktop, Claude Code, Windsurf, Cursor or other MCP clients)
- A Context7 account (free registration available)

## Install Context7 MCP server

To use Context7, follow these steps:

1. Register for a free account at [https://context7.com/spryker/spryker-docs](https://context7.com/spryker/spryker-docs).
2. Follow the installation guide provided in the Context7 public documentation to set up the MCP server.

## Configure documentation sources

When working on Spryker projects, you can configure Context7 to use only Spryker documentation as the source. This ensures that all responses are based exclusively on official Spryker documentation, improving accuracy and relevance for Spryker-specific questions.

![Context7 documentation source configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/context7-source.png)

## Documentation refresh

The Spryker public documentation in Context7 is NOT automatically re-indexed.

### Request a manual refresh

Do not hesitate to request a manual reindex when you need the latest documentation updates. To request a manual refresh:

1. Log in to your Context7 account.
2. Navigate to the documentation library page.
3. Click the **Create GitHub Issue** button.
4. A pre-filled issue opens on GitHub with all the necessary details.
5. Submit the issue.

![Context7 manual reindex request](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-coding-assistants.md/context7-reindex.png)

The Context7 team processes manual refresh requests within 1-2 business days.

## Benefits

Using Context7 with Claude for Spryker development provides several benefits:

- **Context-aware**: Get answers that understand the full context of your questions
- **Time-saving**: Find information faster than traditional documentation browsing
- **Integrated workflow**: Access documentation without leaving your development environment
- **Accurate responses**: All answers are based on official Spryker documentation