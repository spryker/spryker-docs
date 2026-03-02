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
---

This document describes how to use audit logging with the AiFoundation module to track and audit AI interactions in your Spryker application.

The audit logging feature provides comprehensive tracking of all AI interactions, including prompts, responses, token usage, inference time, and metadata. This enables monitoring, compliance, cost tracking, and debugging of AI operations.

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

The audit logging system consists of several key components:

- **AiInteractionAuditLoggerConfigPlugin**: Registers the AI interaction audit logger with the logging infrastructure
- **AuditLogPostPromptPlugin**: Post-prompt plugin that prepares AI interaction data for logging
- **AiInteractionDbHandler**: Log handler that persists interactions to the database
- **AiInteractionLogCreator**: Business logic for creating AI interaction log records
- **AiInteractionLogContextBuilder**: Builds context and metadata for logging

The audit logging integrates with:

1. The AiFoundation module's prompt lifecycle
2. The Spryker logging infrastructure (`spryker/log`)
3. Monolog for structured logging

## Enable audit logging

### 1. Install dependencies

The audit logging feature requires the logging extension:

```bash
composer require spryker/log-extension spryker/monolog
```

### 2. Register the audit logger plugins

In your project's `AiFoundationDependencyProvider` (or create it if it doesn't exist), add the audit logger configuration plugin:

{% info_block infoBox "Project-specific configuration" %}

This configuration should be added to `src/Pyz/Zed/AiFoundation/AiFoundationDependencyProvider.php`. If this file doesn't exist, create it by extending the core `AiFoundationDependencyProvider`.

{% endinfo_block %}

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

### 3. Configure the audit logger in your config

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

### 4. Generate transfers

Generate the transfer objects for audit logging:

```bash
console transfer:generate
```

### 5. Run database migrations

Run the database migrations to create the `spy_ai_interaction_log` table:

```bash
console propel:install
```

## Query AI interaction logs

### Using the AiFoundation facade

The AiFoundation facade provides methods to query AI interaction logs:

```php
<?php

namespace Pyz\Zed\YourModule\Business;

use Generated\Shared\Transfer\AiInteractionLogCriteriaTransfer;
use Generated\Shared\Transfer\AiInteractionLogConditionsTransfer;
use Spryker\Zed\AiFoundation\Business\AiFoundationFacadeInterface;

class AiInteractionQueryExample
{
    public function __construct(
        protected AiFoundationFacadeInterface $aiFoundationFacade
    ) {
    }

    /**
     * Query AI interactions by conversation reference
     */
    public function getConversationInteractions(string $conversationReference): array
    {
        $criteria = (new AiInteractionLogCriteriaTransfer())
            ->setAiInteractionLogConditions(
                (new AiInteractionLogConditionsTransfer())
                    ->addConversationReference($conversationReference)
            );

        $collection = $this->aiFoundationFacade->getAiInteractionLogCollection($criteria);

        return $collection->getAiInteractionLogs();
    }

    /**
     * Query AI interactions by configuration name
     */
    public function getConfigurationInteractions(string $configName): array
    {
        $criteria = (new AiInteractionLogCriteriaTransfer())
            ->setAiInteractionLogConditions(
                (new AiInteractionLogConditionsTransfer())
                    ->addConfigurationName($configName)
            );

        $collection = $this->aiFoundationFacade->getAiInteractionLogCollection($criteria);

        return $collection->getAiInteractionLogs();
    }

    /**
     * Query successful interactions within a time range
     */
    public function getSuccessfulInteractions(string $dateFrom, string $dateTo): array
    {
        $criteria = (new AiInteractionLogCriteriaTransfer())
            ->setAiInteractionLogConditions(
                (new AiInteractionLogConditionsTransfer())
                    ->setIsSuccessful(true)
                    ->setCreatedAtFrom($dateFrom)
                    ->setCreatedAtTo($dateTo)
            );

        $collection = $this->aiFoundationFacade->getAiInteractionLogCollection($criteria);

        return $collection->getAiInteractionLogs();
    }
}
```

### AiInteractionLogCriteria transfer properties

The `AiInteractionLogConditions` transfer supports the following filter properties:

| Property | Type | Description |
|----------|------|-------------|
| `aiInteractionLogIds` | int[] | Filter by specific AI interaction log IDs |
| `conversationReferences` | string[] | Filter by conversation reference identifiers |
| `configurationNames` | string[] | Filter by AI configuration names |
| `isSuccessful` | bool | Filter by success status (true/false) |
| `createdAtFrom` | string | Filter interactions created on or after this date (ISO 8601 format) |
| `createdAtTo` | string | Filter interactions created on or before this date (ISO 8601 format) |

## Understanding AI interaction log data

### AiInteractionLog transfer properties

Each logged AI interaction contains the following information:

| Property | Type | Description |
|----------|------|-------------|
| `idAiInteractionLog` | int | Unique identifier for the log record |
| `configurationName` | string | Name of the AI configuration used |
| `provider` | string | AI provider name (for example, `openai`, `anthropic`, `bedrock`) |
| `model` | string | AI model name (for example, `gpt-4o`, `claude-sonnet-4-20250514`) |
| `prompt` | string | The user prompt sent to the AI |
| `response` | string | The AI's response message |
| `inputTokens` | int | Number of input tokens consumed |
| `outputTokens` | int | Number of output tokens generated |
| `conversationReference` | string | Optional conversation reference for multi-turn conversations |
| `inferenceTimeMs` | int | Total inference time in milliseconds |
| `isSuccessful` | bool | Whether the interaction succeeded |
| `metadata` | string | JSON-encoded metadata containing tool invocations, errors, and structured schema class |
| `createdAt` | string | Timestamp of when the interaction was logged (ISO 8601 format) |

## Cost tracking example

Track AI usage costs by querying and aggregating token usage:

```php
<?php

namespace Pyz\Zed\YourModule\Business;

use Generated\Shared\Transfer\AiInteractionLogCriteriaTransfer;
use Generated\Shared\Transfer\AiInteractionLogConditionsTransfer;
use Spryker\Zed\AiFoundation\Business\AiFoundationFacadeInterface;

class AiCostTracker
{
    protected const OPENAI_COST_INPUT = 0.5 / 1_000_000; // $0.50 per 1M input tokens
    protected const OPENAI_COST_OUTPUT = 1.5 / 1_000_000; // $1.50 per 1M output tokens

    public function __construct(
        protected AiFoundationFacadeInterface $aiFoundationFacade
    ) {
    }

    /**
     * Calculate total cost of AI interactions
     */
    public function calculateCost(string $configName, string $dateFrom, string $dateTo): float
    {
        $criteria = (new AiInteractionLogCriteriaTransfer())
            ->setAiInteractionLogConditions(
                (new AiInteractionLogConditionsTransfer())
                    ->addConfigurationName($configName)
                    ->setCreatedAtFrom($dateFrom)
                    ->setCreatedAtTo($dateTo)
            );

        $collection = $this->aiFoundationFacade->getAiInteractionLogCollection($criteria);

        $totalCost = 0.0;

        foreach ($collection->getAiInteractionLogs() as $log) {
            $inputCost = $log->getInputTokens() * self::OPENAI_COST_INPUT;
            $outputCost = $log->getOutputTokens() * self::OPENAI_COST_OUTPUT;
            $totalCost += $inputCost + $outputCost;
        }

        return $totalCost;
    }
}
```

## Performance monitoring

Monitor AI performance metrics:

```php
<?php

namespace Pyz\Zed\YourModule\Business;

use Generated\Shared\Transfer\AiInteractionLogCriteriaTransfer;
use Generated\Shared\Transfer\AiInteractionLogConditionsTransfer;
use Spryker\Zed\AiFoundation\Business\AiFoundationFacadeInterface;

class AiPerformanceMonitor
{
    public function __construct(
        protected AiFoundationFacadeInterface $aiFoundationFacade
    ) {
    }

    /**
     * Calculate average inference time for a configuration
     */
    public function getAverageInferenceTime(string $configName): float
    {
        $criteria = (new AiInteractionLogCriteriaTransfer())
            ->setAiInteractionLogConditions(
                (new AiInteractionLogConditionsTransfer())
                    ->addConfigurationName($configName)
                    ->setIsSuccessful(true)
            );

        $collection = $this->aiFoundationFacade->getAiInteractionLogCollection($criteria);

        if (empty($collection->getAiInteractionLogs())) {
            return 0.0;
        }

        $totalTime = array_sum(
            array_map(
                fn($log) => $log->getInferenceTimeMs(),
                $collection->getAiInteractionLogs()
            )
        );

        return $totalTime / count($collection->getAiInteractionLogs());
    }

    /**
     * Get success rate for a configuration
     */
    public function getSuccessRate(string $configName): float
    {
        $totalCriteria = (new AiInteractionLogCriteriaTransfer())
            ->setAiInteractionLogConditions(
                (new AiInteractionLogConditionsTransfer())
                    ->addConfigurationName($configName)
            );

        $successCriteria = (new AiInteractionLogCriteriaTransfer())
            ->setAiInteractionLogConditions(
                (new AiInteractionLogConditionsTransfer())
                    ->addConfigurationName($configName)
                    ->setIsSuccessful(true)
            );

        $totalCount = count(
            $this->aiFoundationFacade->getAiInteractionLogCollection($totalCriteria)->getAiInteractionLogs()
        );
        $successCount = count(
            $this->aiFoundationFacade->getAiInteractionLogCollection($successCriteria)->getAiInteractionLogs()
        );

        if ($totalCount === 0) {
            return 0.0;
        }

        return ($successCount / $totalCount) * 100;
    }
}
```

## Audit logging for compliance

The audit logging feature helps meet compliance and regulatory requirements:

- **Complete interaction history**: All AI interactions are logged with full prompts and responses
- **User attribution**: Conversation references link interactions to user sessions
- **Timestamp tracking**: Each interaction includes creation timestamps
- **Error tracking**: Failed interactions are logged with error details
- **Metadata capture**: Tool invocations and structured schema information for debugging

This data can be exported, analyzed, and used to demonstrate compliance with data governance, AI safety, and regulatory requirements.

## Post-prompt plugins

You can extend audit logging behavior by implementing custom post-prompt plugins. These plugins are executed after an AI interaction completes:

```php
<?php

namespace Pyz\Zed\YourModule\Communication\Plugin;

use Generated\Shared\Transfer\PromptResponseTransfer;
use Spryker\Zed\AiFoundation\Dependency\Plugin\PostPromptPluginInterface;

class CustomAuditLogPlugin implements PostPromptPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\PromptResponseTransfer $promptResponseTransfer
     * @param array<string, mixed> $auditLogContext
     *
     * @return array<string, mixed>
     */
    public function execute(PromptResponseTransfer $promptResponseTransfer, array $auditLogContext): array
    {
        // Add custom logic here
        $auditLogContext['custom_field'] = 'custom_value';

        return $auditLogContext;
    }
}
```

Add your custom plugin to the `getPostPromptPlugins()` method in your project's `AiFoundationDependencyProvider`.

## Log processors

You can add custom log processors to the AI interaction logging pipeline:

```php
<?php

namespace Pyz\Zed\YourModule\Communication\Plugin\Log;

use Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface;

class CustomLogProcessor implements LogProcessorPluginInterface
{
    /**
     * @param array<string, mixed> $record
     *
     * @return array<string, mixed>
     */
    public function __invoke(array $record): array
    {
        // Process log records
        if (isset($record['context']['ai_interaction_log'])) {
            // Add custom processing here
        }

        return $record;
    }
}
```

Add your custom processor to the `getAiInteractionLogProcessorPlugins()` method in your project's `AiFoundationDependencyProvider`.

## Constants

The following constants are available in `AiFoundationConstants`:

| Constant | Value | Description |
|----------|-------|-------------|
| `AUDIT_LOGGER_CHANNEL_NAME_AI_INTERACTION` | `ai_foundation:ai_interaction` | The logging channel name for AI interactions |
| `AI_PROVIDER_CONFIG_MODEL` | `model` | The AI provider model configuration key |
| `AUDIT_LOG_CONTEXT_KEY_TRANSFER` | `ai_interaction_log` | The audit log context key for storing the AI interaction log transfer |

## Database schema

AI interaction logs are stored in the `spy_ai_interaction_log` table with the following structure:

- `id_ai_interaction_log`: Primary key
- `configuration_name`: AI configuration used
- `provider`: AI provider name
- `model`: AI model name
- `prompt`: User prompt
- `response`: AI response
- `input_tokens`: Input token count
- `output_tokens`: Output token count
- `conversation_reference`: Conversation tracking reference
- `inference_time_ms`: Inference time in milliseconds
- `is_successful`: Success status
- `metadata`: JSON-encoded metadata
- `created_at`: Timestamp

The table includes indexes on `conversation_reference`, `configuration_name`, and `created_at` for efficient querying.

## Best practices

1. **Regular cleanup**: Implement a periodic cleanup process to archive or delete old audit logs if required by your retention policies
2. **Cost tracking**: Use token counts to monitor and optimize AI usage costs
3. **Performance monitoring**: Track inference times to identify slow interactions
4. **Error analysis**: Review failed interactions to improve prompts and error handling
5. **Conversation linking**: Always use `conversationReference` for multi-turn conversations to maintain audit trail
6. **Metadata inspection**: Store and analyze metadata to understand tool invocations and structured responses

## Troubleshooting

If AI interactions are not being logged:

1. Verify that `AiInteractionAuditLoggerConfigPlugin` is registered in your configuration
2. Ensure the `AuditLogPostPromptPlugin` is added to `getPostPromptPlugins()`
3. Check that the `spy_ai_interaction_log` table exists in your database
4. Verify that the logging infrastructure is properly configured with the log channel
5. Check application logs for any error messages during log persistence
