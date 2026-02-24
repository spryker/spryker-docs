---
title: Conversation History
description: Persist and manage multi-turn conversations with conversation history using database storage
last_updated: Feb 19, 2026
keywords: foundation, ai, conversation history, conversation, context, database, multi-turn, dialogue
template: howto-guide-template
related:
  - title: AiFoundation module Overview
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-module.html
  - title: Use structured responses with the AiFoundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-transfer-response.html
  - title: Use AI tools with the AiFoundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html
  - title: AI workflow orchestration with state machines
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-workflow-state-machine.html
---

This document describes how to use conversation history with the AiFoundation module to maintain conversation context across multiple interactions, enabling multi-turn conversations where the AI can reference previous messages and provide contextually relevant responses.

Conversation history is persisted in the database using the `spy_ai_conversation_history` table, ensuring conversations are stored durably and can be retrieved at any time.

## Overview

Conversation history enables you to maintain persistent conversation context across multiple interactions. Instead of sending isolated prompts, you can build conversational experiences where the AI remembers previous messages and maintains state throughout an extended dialogue.

The conversation history feature automatically persists all messages in a conversation to the database. When you include a conversation reference in your prompt request, all exchanges are stored in the `spy_ai_conversation_history` table and automatically included in subsequent requests to maintain context.

## Prerequisites

- AiFoundation module installed and configured. For details, see [AiFoundation module Overview](/docs/dg/dev/ai/ai-foundation/ai-foundation-module.html).
- Database configured and migrated to include the `spy_ai_conversation_history` table

## Key concepts

### Conversation Reference

A unique identifier for a conversation. All messages in a conversation are stored together under this reference. You can use any string as a conversation reference, such as a customer ID, session ID, or custom identifier.

### Context window

The maximum number of tokens that can be stored in a conversation. Default is 50000 tokens. When a conversation exceeds this limit, the oldest messages are automatically pruned to maintain the window size.

## Configure conversation history

Configure the context window for conversation history in your AI configuration.

### Default configuration

Update your `config/Shared/config_ai.php`:

```php
<?php

use Spryker\Shared\AiFoundation\AiFoundationConstants;

$config[AiFoundationConstants::CONVERSATION_HISTORY_CONTEXT_WINDOW] = 50000; // tokens
```

### Per-AI-configuration settings

Configure the context window for specific AI configurations by adding `conversation_history` settings within `AI_CONFIGURATIONS`:

```php
<?php

use Spryker\Shared\AiFoundation\AiFoundationConstants;

$config[AiFoundationConstants::AI_CONFIGURATIONS] = [
    'customer_support' => [
        'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
        'provider_config' => [
            'api_key' => getenv('OPENAI_API_KEY'),
            'model' => 'gpt-4',
        ],
        'system_prompt' => 'You are a helpful customer support assistant.',
        'conversation_history' => [
            'context_window' => 100000, // Larger context for complex support cases
        ],
    ],
];
```

Per-configuration settings take precedence over global defaults. If `conversation_history` is not specified for an AI configuration, it falls back to the global `CONVERSATION_HISTORY_CONTEXT_WINDOW` value.

{% info_block infoBox "Best practice" %}

Adjust context window based on expected conversation length and token limits of your AI provider. Large context windows provide better conversation history but require more tokens for each AI request.

{% endinfo_block %}

## Use conversation history in conversations

### Basic multi-turn conversation

To enable conversation history, include a `conversationReference` in your `PromptRequestTransfer`. All messages are automatically persisted and included in future requests:

```php
<?php

namespace Pyz\Zed\YourModule\Business;

use Generated\Shared\Transfer\PromptMessageTransfer;
use Generated\Shared\Transfer\PromptRequestTransfer;
use Spryker\Zed\AiFoundation\Business\AiFoundationFacadeInterface;

class CustomerSupportAssistant
{
    public function __construct(
        protected AiFoundationFacadeInterface $aiFoundationFacade
    ) {
    }

    public function respondToCustomer(string $conversationReference, string $userMessage): string
    {
        // Create a new prompt request with conversation reference
        $promptRequest = (new PromptRequestTransfer())
            ->setConversationReference($conversationReference) // Enable conversation history
            ->setPromptMessage(
                (new PromptMessageTransfer())->setContent($userMessage)
            );

        // The AI automatically has access to conversation history
        $response = $this->aiFoundationFacade->prompt($promptRequest);

        if ($response->getIsSuccessful() === true) {
            return $response->getMessage()->getContent();
        }

        return 'An error occurred processing your request.';
    }
}
```

### Manage conversation history

Access the complete conversation history at any time:

```php
<?php

namespace Pyz\Zed\YourModule\Business;

use Generated\Shared\Transfer\ConversationHistoryCriteriaTransfer;
use Generated\Shared\Transfer\ConversationHistoryConditionsTransfer;
use Spryker\Zed\AiFoundation\Business\AiFoundationFacadeInterface;

class ConversationManager
{
    public function __construct(
        protected AiFoundationFacadeInterface $aiFoundationFacade
    ) {
    }

    public function getConversationMessages(string $conversationReference): array
    {
        $conversationHistoryCriteriaTransfer = (new ConversationHistoryCriteriaTransfer())
            ->setConversationHistoryConditions(
                (new ConversationHistoryConditionsTransfer())
                    ->setConversationReferences([$conversationReference])
            );

        $conversationHistoryCollectionTransfer = $this->aiFoundationFacade->getConversationHistoryCollection($conversationHistoryCriteriaTransfer);
        $conversationHistories = $conversationHistoryCollectionTransfer->getConversationHistories();

        if ($conversationHistories->count() === 0) {
            return [];
        }

        $conversationHistoryTransfer = $conversationHistories->offsetGet(0);
        $messages = $conversationHistoryTransfer->getMessages();

        $formattedMessages = [];
        foreach ($messages as $message) {
            $formattedMessages[] = [
                'type' => $message->getType(), // 'user', 'assistant', 'tool_call', 'tool_result'
                'content' => $message->getContent(),
            ];
        }

        return $formattedMessages;
    }

    public function getMultipleConversations(array $conversationReferences): array
    {
        $conversationHistoryCriteriaTransfer = (new ConversationHistoryCriteriaTransfer())
            ->setConversationHistoryConditions(
                (new ConversationHistoryConditionsTransfer())
                    ->setConversationReferences($conversationReferences)
            );

        $conversationHistoryCollectionTransfer = $this->aiFoundationFacade->getConversationHistoryCollection($conversationHistoryCriteriaTransfer);
        $conversationHistories = $conversationHistoryCollectionTransfer->getConversationHistories();

        $result = [];
        foreach ($conversationHistories as $conversationHistory) {
            $result[$conversationHistory->getConversationReference()] = [
                'conversation_reference' => $conversationHistory->getConversationReference(),
                'message_count' => $conversationHistory->getMessages()->count(),
                'messages' => array_map(function ($message) {
                    return [
                        'type' => $message->getType(),
                        'content' => $message->getContent(),
                    ];
                }, $conversationHistory->getMessages()->getArrayCopy()),
            ];
        }

        return $result;
    }
}
```

## API reference

### AiFoundationFacade

#### prompt()

Sends a message in a conversation. If `conversationReference` is provided, the message is stored in conversation history and previous messages are automatically included in the AI's context.

```php
/**
 * @param \Generated\Shared\Transfer\PromptRequestTransfer $promptRequest
 * @return \Generated\Shared\Transfer\PromptResponseTransfer
 */
public function prompt(PromptRequestTransfer $promptRequest): PromptResponseTransfer
```

**PromptRequestTransfer properties for conversation history:**
- `conversationReference` (string, optional): Enable conversation history by providing a unique conversation identifier
- `aiConfigurationName` (string, optional): Configuration name to use, defaults to `AI_CONFIGURATION_DEFAULT`
- `promptMessage` (PromptMessageTransfer, required): The message to send
- `maxRetries` (int, optional): Number of retry attempts on failure

#### getConversationHistoryCollection()

Retrieves conversation history collection based on criteria. Allows filtering conversations by conversation IDs.

```php
/**
 * @param \Generated\Shared\Transfer\ConversationHistoryCriteriaTransfer $conversationHistoryCriteriaTransfer
 * @return \Generated\Shared\Transfer\ConversationHistoryCollectionTransfer
 */
public function getConversationHistoryCollection(
    ConversationHistoryCriteriaTransfer $conversationHistoryCriteriaTransfer
): ConversationHistoryCollectionTransfer
```

**ConversationHistoryCriteriaTransfer properties:**
- `conversationHistoryConditions` (ConversationHistoryConditionsTransfer): Filter conditions for the query
  - `conversationReferences` (string[]): List of conversation references to retrieve (IN operation). If empty, returns empty collection.

**Returns:** ConversationHistoryCollectionTransfer containing:
- `conversationHistories` (ConversationHistoryTransfer[]): Array of conversation histories matching the criteria
  - Each ConversationHistoryTransfer contains:
    - `conversationReference` (string): The conversation reference
    - `messages` (PromptMessageTransfer[]): Array of all messages in the conversation with types (user, assistant, tool_call, tool_result), content, and attachments

## Message types

Messages stored in conversation history have different types:

- `user` - Message sent by the user
- `assistant` - Response from the AI
- `tool_call` - A tool invocation initiated by the AI
- `tool_result` - Result of a tool execution

Tool-related types are only present when using [AI tools](/docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html) with conversation history.

## Best practices

### 1. Use meaningful conversation references

Choose conversation references that align with your business logic:

```php
// Good: Clear relationship to entity
$conversationReference = "customer_conversation_{$customerId}_{$timestamp}";
$conversationReference = "support_ticket_{$ticketId}";

// Avoid: Generic IDs that are hard to track
$conversationReference = "conv_123";
```

### 2. Manage conversation cleanup

Implement your own cleanup strategy for old conversations if needed. Unlike Redis-backed storage with automatic expiration, database-persisted conversations remain indefinitely. Consider creating a scheduled task to delete conversations older than a certain date if storage management is important.

### 3. Handle large conversations

Monitor context window usage. If approaching limits, start a new conversation.

### 4. Secure conversation access

Validate that users can only access their own conversations by filtering conversation references based on user permissions:

```php
$conversationHistoryCriteriaTransfer = (new ConversationHistoryCriteriaTransfer())
    ->setConversationHistoryConditions(
        (new ConversationHistoryConditionsTransfer())
            ->setConversationReferences($userAuthorizedConversationReferences) // Only user's conversations
    );

$conversationHistoryCollectionTransfer = $this->aiFoundationFacade->getConversationHistoryCollection($conversationHistoryCriteriaTransfer);
```

## Limitations

- Conversation history is stored in the database and requires the `spy_ai_conversation_history` table to be present
- Conversations persist indefinitely in the database; implement your own cleanup strategy if needed
- Very large conversations may approach the context window limit, requiring new conversation references
- Tool invocations and results are included in history and count toward context window

## Debugging

Conversation history messages are persisted in the `spy_ai_conversation_history` database table. You can query the database directly to inspect stored conversations and messages for debugging purposes.
