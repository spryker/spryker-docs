---
title: Chat History
description: Persist and manage multi-turn conversations with chat history using Redis storage
last_updated: Jan 20, 2026
keywords: foundation, ai, chat history, conversation, context, redis, multi-turn, dialogue
template: howto-guide-template
related:
  - title: AiFoundation module Overview
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-module.html
  - title: Use structured responses with the AiFoundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-transfer-response.html
  - title: Use AI tools with the AiFoundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html
---

This document describes how to use chat history with the AiFoundation module to maintain conversation context across multiple interactions, enabling multi-turn conversations where the AI can reference previous messages and provide contextually relevant responses.

Chat history is persisted in the database using the `spy_ai_chat_history` table, ensuring conversations are stored durably and can be retrieved at any time.

## Overview

Chat history enables you to maintain persistent conversation context across multiple interactions. Instead of sending isolated prompts, you can build conversational experiences where the AI remembers previous messages and maintains state throughout an extended dialogue.

The chat history feature automatically persists all messages in a conversation to the database. When you include a conversation ID in your prompt request, all exchanges are stored in the `spy_ai_chat_history` table and automatically included in subsequent requests to maintain context.

## Prerequisites

- AiFoundation module installed and configured. For details, see [AiFoundation module Overview](/docs/dg/dev/ai/ai-foundation/ai-foundation-module.html).
- Database configured and migrated to include the `spy_ai_chat_history` table

## Key concepts

### Conversation ID

A unique identifier for a conversation. All messages in a conversation are stored together under this ID. You can use any string as a conversation ID, such as a customer ID, session ID, or custom identifier.

### Chat history timeout

Messages expire after a configurable timeout period. Default is 12 hours (43200 seconds). Expired conversations are automatically pruned from the database.

### Context window

The maximum number of tokens that can be stored in a conversation. Default is 50000 tokens.

## Configure chat history

Configure chat history timeout and context window in your AI configuration.

### Default configuration

Update your `config/Shared/config_ai.php`:

```php
<?php

use Spryker\Shared\AiFoundation\AiFoundationConstants;

$config[AiFoundationConstants::CHAT_HISTORY_DEFAULT_TIMEOUT] = 43200; // 12 hours
$config[AiFoundationConstants::CHAT_HISTORY_CONTEXT_WINDOW] = 50000; // tokens
```

### Per-AI-configuration settings

Configure chat history timeout and context window for specific AI configurations by adding `conversation_history` settings within `AI_CONFIGURATIONS`:

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
            'timeout' => 86400,        // 24 hours for customer support
            'context_window' => 100000, // Larger context for complex support cases
        ],
    ],
];
```

Per-configuration settings take precedence over global defaults. If `conversation_history` is not specified for an AI configuration, it falls back to the global `CHAT_HISTORY_DEFAULT_TIMEOUT` and `CHAT_HISTORY_CONTEXT_WINDOW` values.

{% info_block infoBox "Best practice" %}

Set shorter timeouts for temporary conversations and longer ones for persistent customer sessions. Adjust context window based on expected conversation length and token limits of your AI provider.

{% endinfo_block %}

## Use chat history in conversations

### Basic multi-turn conversation

To enable chat history, include a `conversationId` in your `PromptRequestTransfer`. All messages are automatically persisted and included in future requests:

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

    public function respondToCustomer(string $conversationId, string $userMessage): string
    {
        // Create a new prompt request with conversation ID
        $promptRequest = (new PromptRequestTransfer())
            ->setConversationId($conversationId) // Enable chat history
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

    public function getConversationMessages(string $conversationId): array
    {
        $conversationHistoryCriteriaTransfer = (new ConversationHistoryCriteriaTransfer())
            ->setConversationHistoryConditions(
                (new ConversationHistoryConditionsTransfer())
                    ->setConversationIds([$conversationId])
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

    public function getMultipleConversations(array $conversationIds): array
    {
        $conversationHistoryCriteriaTransfer = (new ConversationHistoryCriteriaTransfer())
            ->setConversationHistoryConditions(
                (new ConversationHistoryConditionsTransfer())
                    ->setConversationIds($conversationIds)
            );

        $conversationHistoryCollectionTransfer = $this->aiFoundationFacade->getConversationHistoryCollection($conversationHistoryCriteriaTransfer);
        $conversationHistories = $conversationHistoryCollectionTransfer->getConversationHistories();

        $result = [];
        foreach ($conversationHistories as $conversationHistory) {
            $result[$conversationHistory->getConversationId()] = [
                'conversation_id' => $conversationHistory->getConversationId(),
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

Sends a message in a conversation. If `conversationId` is provided, the message is stored in chat history and previous messages are automatically included in the AI's context.

```php
/**
 * @param \Generated\Shared\Transfer\PromptRequestTransfer $promptRequest
 * @return \Generated\Shared\Transfer\PromptResponseTransfer
 */
public function prompt(PromptRequestTransfer $promptRequest): PromptResponseTransfer
```

**PromptRequestTransfer properties for chat history:**
- `conversationId` (string, optional): Enable chat history by providing a unique conversation identifier
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
  - `conversationIds` (string[]): List of conversation IDs to retrieve (IN operation). If empty, returns empty collection.

**Returns:** ConversationHistoryCollectionTransfer containing:
- `conversationHistories` (ConversationHistoryTransfer[]): Array of conversation histories matching the criteria
  - Each ConversationHistoryTransfer contains:
    - `conversationId` (string): The conversation identifier
    - `messages` (PromptMessageTransfer[]): Array of all messages in the conversation with types (user, assistant, tool_call, tool_result), content, and attachments

## Message types

Messages stored in conversation history have different types:

- `user` - Message sent by the user
- `assistant` - Response from the AI
- `tool_call` - A tool invocation initiated by the AI
- `tool_result` - Result of a tool execution

Tool-related types are only present when using [AI tools](/docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html) with chat history.

## Best practices

### 1. Use meaningful conversation IDs

Choose conversation IDs that align with your business logic:

```php
// Good: Clear relationship to entity
$conversationId = "customer_chat_{$customerId}_{$timestamp}";
$conversationId = "support_ticket_{$ticketId}";

// Avoid: Generic IDs that are hard to track
$conversationId = "conv_123";
```

### 2. Configure appropriate conversation timeouts

Conversation history automatically expires based on the configured timeout.
Expired conversations are automatically removed from Storage without manual intervention.

### 3. Handle large conversations

Monitor context window usage. If approaching limits, start a new conversation.

### 4. Secure conversation access

Validate that users can only access their own conversations by filtering conversation IDs based on user permissions:

```php
$conversationHistoryCriteriaTransfer = (new ConversationHistoryCriteriaTransfer())
    ->setConversationHistoryConditions(
        (new ConversationHistoryConditionsTransfer())
            ->setConversationIds($userAuthorizedConversationIds) // Only user's conversations
    );

$conversationHistoryCollectionTransfer = $this->aiFoundationFacade->getConversationHistoryCollection($conversationHistoryCriteriaTransfer);
```

## Limitations

- Chat history is stored in the database and requires the `spy_ai_chat_history` table to be present
- Messages are subject to the configured timeout and are automatically pruned from the database
- Very large conversations may approach the context window limit, requiring new conversation IDs
- Tool invocations and results are included in history and count toward context window

## Debugging

Chat history messages are persisted in the `spy_ai_chat_history` database table. You can query the database directly to inspect stored conversations and messages for debugging purposes.
