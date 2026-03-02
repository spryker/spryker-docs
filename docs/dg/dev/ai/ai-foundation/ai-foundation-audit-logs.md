---
title: AI Foundation Audit Logs
description: Track and audit AI interactions with the AiFoundation module audit logging feature
last_updated: Mar 2, 2026
keywords: audit, logging, ai, foundation, tracking, compliance, ai interactions, monitoring
template: howto-guide-template
label: early-access
related:
  - title: AiFoundation module Overview
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-module.html
  - title: Use AI tools with the AiFoundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html
  - title: Manage conversation history with the AiFoundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-conversation-history.html
  - title: AI workflow orchestration with state machines
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-workflow-state-machine.html
---

This document describes how to use audit logging with the AiFoundation module to track and audit AI interactions in your Spryker application.

The audit logging feature provides comprehensive tracking of all AI interactions, including prompts, responses, token usage, inference time, and metadata. This enables monitoring, compliance, cost tracking, and debugging of AI operations.

{% info_block infoBox "Coming Soon" %}

A dashboard for viewing and analyzing audit logs and log rotation for automatic retention management will be added in following releases.

{% endinfo_block %}

## Overview

The AiFoundation audit logging system automatically captures detailed information about each AI interaction:

- **Configuration and Provider Information**: The AI configuration name, provider, and model used
- **Prompt and Response Data**: The user prompt and AI response messages
- **Token Usage**: Input and output token counts for cost tracking
- **Performance Metrics**: Inference time in milliseconds
- **Metadata**: Tool invocations, errors, and structured schema information
- **Conversation Tracking**: Links to conversation references for multi-turn conversations
- **Status**: Success or failure status of each interaction
- **Timestamps**: Creation timestamps for each logged interaction

All AI interactions are persisted to the `spy_ai_interaction_log` database table and can be queried, analyzed, and audited.

## Architecture

The audit logging system uses post-prompt plugins to capture AI interaction data and integrates with the Spryker logging infrastructure. For detailed architecture information, see [AiFoundation module Overview](/docs/dg/dev/ai/ai-foundation/ai-foundation-module.html).

## Enable audit logging

### 1. Register the audit logger plugins

```php
<?php

namespace Pyz\Zed\AiFoundation;

use Spryker\Zed\AiFoundation\AiFoundationDependencyProvider as SprykerAiFoundationDependencyProvider;
use Spryker\Zed\AiFoundation\Communication\Plugin\AuditLogPostPromptPlugin;
use Spryker\Zed\AiFoundation\Communication\Plugin\Log\AiInteractionHandlerPlugin;

class AiFoundationDependencyProvider extends SprykerAiFoundationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AiFoundation\Dependency\Plugin\PostPromptPluginInterface>
     */
    protected function getPostPromptPlugins(): array
    {
        return [
            new AuditLogPostPromptPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Shared\Log\Dependency\Plugin\LogHandlerPluginInterface>
     */
    protected function getAiInteractionLogHandlerPlugins(): array
    {
        return [
            new AiInteractionHandlerPlugin(),
        ];
    }
}
```

### 2. Configure the audit logger in your config

In your configuration file (for example, `config/Shared/config_default.php`), add the `AiInteractionAuditLoggerConfigPlugin` to the audit logger plugins:

```php
<?php

use Spryker\Shared\Log\LogConstants;
use Spryker\Zed\AiFoundation\Communication\Plugin\Log\AiInteractionAuditLoggerConfigPlugin;

$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_ZED] = [
    // existing plugins...
    AiInteractionAuditLoggerConfigPlugin::class,
];

$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_MERCHANT_PORTAL] = [
    // existing plugins...
    AiInteractionAuditLoggerConfigPlugin::class,
];
```

### 3. Generate transfers

Generate the transfer objects for audit logging:

```bash
console transfer:generate
```

### 4. Run database migrations

Run the database migrations to create the `spy_ai_interaction_log` table:

```bash
console propel:install
```

## Understanding AI interaction log data

### AiInteractionLog transfer properties

Each logged AI interaction contains the following information:

| Property | Type | Description |
|----------|------|-------------|
| `idAiInteractionLog` | int | Unique identifier for the log record |
| `configurationName` | string | AI configuration name |
| `provider` | string | AI provider name |
| `model` | string | AI model name |
| `prompt` | string | User prompt sent to the AI |
| `response` | string | AI response message |
| `inputTokens` | int | Input token count |
| `outputTokens` | int | Output token count |
| `conversationReference` | string | Conversation reference for multi-turn conversations |
| `inferenceTimeMs` | int | Inference time in milliseconds |
| `isSuccessful` | bool | Interaction success status |
| `metadata` | string | JSON-encoded metadata |
| `createdAt` | string | Timestamp (ISO 8601 format) |

## Best practices

1. **Regular cleanup**: Implement a periodic cleanup process to archive or delete old audit logs if required by your retention policies
2. **Cost tracking**: Use token counts to monitor and optimize AI usage costs
3. **Performance monitoring**: Track inference times to identify slow interactions
4. **Error analysis**: Review failed interactions to improve prompts and error handling
5. **Metadata inspection**: Store and analyze metadata to understand tool invocations and structured responses
