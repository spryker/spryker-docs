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

## Overview

Chat history enables you to maintain persistent conversation context across multiple interactions. Instead of sending isolated prompts, you can build conversational experiences where the AI remembers previous messages and maintains state throughout an extended dialogue.

The chat history feature uses Redis-backed storage to automatically persist all messages in a conversation. When you include a conversation ID in your prompt request, all exchanges are stored and automatically included in subsequent requests to maintain context.

## Prerequisites

- AiFoundation module installed and configured. For details, see [AiFoundation module Overview](/docs/dg/dev/ai/ai-foundation/ai-foundation-module.html).
- Redis service configured and running in your Spryker application

## Key concepts

### Conversation ID

A unique identifier for a conversation. All messages in a conversation are stored together under this ID. You can use any string as a conversation ID, such as a customer ID, session ID, or custom identifier.

### Chat history timeout

Messages are automatically removed from Redis after a configurable timeout period. Default is 12 hours (43200 seconds).

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

### Custom timeout example

Override the timeout for specific use cases:

```php
<?php

use Spryker\Shared\AiFoundation\AiFoundationConstants;

// 24-hour timeout for customer support conversations
$config[AiFoundationConstants::CHAT_HISTORY_DEFAULT_TIMEOUT] = 86400;

// Smaller context window for resource-constrained scenarios
$config[AiFoundationConstants::CHAT_HISTORY_CONTEXT_WINDOW] = 10000;
```

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
use Spryker\Client\AiFoundation\AiFoundationClientInterface;

class CustomerSupportAssistant
{
    public function __construct(
        protected AiFoundationClientInterface $aiFoundationClient
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
        $response = $this->aiFoundationClient->prompt($promptRequest);

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

use Spryker\Client\AiFoundation\AiFoundationClientInterface;

class ConversationManager
{
    public function __construct(
        protected AiFoundationClientInterface $aiFoundationClient
    ) {
    }

    public function getConversationMessages(string $conversationId): array
    {
        $historyTransfer = $this->aiFoundationClient->getConversationHistory($conversationId);
        $messages = $historyTransfer->getMessages();

        $formattedMessages = [];
        foreach ($messages as $message) {
            $formattedMessages[] = [
                'role' => $message->getRole(), // 'user', 'assistant', 'tool_call', 'tool_result'
                'content' => $message->getContent(),
            ];
        }

        return $formattedMessages;
    }
    
    public function deleteConversation(string $conversationId): bool
    {
        return $this->aiFoundationClient->clearConversationHistory($conversationId);
    }
}
```

## Multi-turn conversation example

This example demonstrates a complete multi-turn conversation workflow:

```php
<?php

namespace Pyz\Zed\Chat\Business;

use Generated\Shared\Transfer\PromptMessageTransfer;
use Generated\Shared\Transfer\PromptRequestTransfer;
use Spryker\Client\AiFoundation\AiFoundationClientInterface;

class ChatBot
{
    public function __construct(
        protected AiFoundationClientInterface $aiFoundationClient
    ) {
    }

    public function chat(string $conversationId, string $userInput): string
    {
        // First turn: user asks initial question
        $firstResponse = $this->sendMessage($conversationId, 'What are the best outdoor activities in summer?');
        echo "AI: " . $firstResponse . "\n";

        // Second turn: user asks follow-up question
        // The AI has access to the previous exchange
        $secondResponse = $this->sendMessage($conversationId, 'Which of these activities is best for families with young children?');
        echo "AI: " . $secondResponse . "\n";

        // Third turn: another follow-up
        // The AI still remembers the entire conversation
        $thirdResponse = $this->sendMessage($conversationId, 'What safety precautions should we take?');
        echo "AI: " . $thirdResponse . "\n";

        return $thirdResponse;
    }

    private function sendMessage(string $conversationId, string $message): string
    {
        $promptRequest = (new PromptRequestTransfer())
            ->setConversationId($conversationId)
            ->setAiConfigurationName('openai') // or your configured AI provider
            ->setPromptMessage(
                (new PromptMessageTransfer())->setContent($message)
            );

        $response = $this->aiFoundationClient->prompt($promptRequest);

        if ($response->getIsSuccessful() === true) {
            return $response->getMessage()->getContent();
        }

        return 'Error: ' . implode(', ', array_map(fn($e) => $e->getMessage(), $response->getErrors()->getArrayCopy()));
    }
}
```

## API reference

### AiFoundationClient methods

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

#### getConversationHistory()

Retrieves all messages in a conversation from Redis storage.

```php
/**
 * @param string $conversationId
 * @return \Generated\Shared\Transfer\ConversationHistoryTransfer
 */
public function getConversationHistory(string $conversationId): ConversationHistoryTransfer
```

**Returns:** ConversationHistoryTransfer containing:
- `messages` (PromptMessageTransfer[]): Array of all messages in the conversation with roles (user, assistant, tool_call, tool_result)

#### clearConversationHistory()

Deletes a conversation from Redis storage.

```php
/**
 * @param string $conversationId
 * @return bool
 */
public function clearConversationHistory(string $conversationId): bool
```

**Returns:** `true` if conversation was deleted, `false` if it did not exist or deletion failed

## Configuration reference

### AiFoundationConstants

| Constant | Type | Default | Description |
| --- | --- | --- | --- |
| `CHAT_HISTORY_DEFAULT_TIMEOUT` | int | 43200 | Conversation timeout in seconds (12 hours) |
| `CHAT_HISTORY_CONTEXT_WINDOW` | int | 50000 | Maximum tokens stored per conversation |

## Message roles

Messages stored in conversation history have different roles:

- `user` - Message sent by the user
- `assistant` - Response from the AI
- `tool_call` - A tool invocation initiated by the AI
- `tool_result` - Result of a tool execution

Tool-related roles are only present when using [AI tools](/docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html) with chat history.

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

### 2. Clean up expired conversations

Implement a periodic cleanup process to remove stale conversations manually if needed:

```php
// Clean up old conversations
$oldConversationId = $customerId . '_old_session';
$this->aiFoundationClient->clearConversationHistory($oldConversationId);
```

### 3. Handle large conversations

Monitor context window usage. If approaching limits, start a new conversation.

### 4. Secure conversation access

Validate that users can only access their own conversations.

### 5. Configure appropriate timeouts

Adjust timeout based on conversation type:

```php
// Short-lived support conversations: 1 hour
$config[AiFoundationConstants::CHAT_HISTORY_DEFAULT_TIMEOUT] = 3600;

// Customer sessions: 24 hours
$config[AiFoundationConstants::CHAT_HISTORY_DEFAULT_TIMEOUT] = 86400;
```

## Limitations

- Chat history is stored in Redis and requires Redis to be running
- Messages are subject to the configured timeout and are automatically deleted
- Very large conversations may approach the context window limit, requiring new conversation IDs
- Chat history is not encrypted at rest in Redis; use standard Redis security practices
- Tool invocations and results are included in history and count toward context window

## Debugging

![Chat History in Redis Gui](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-foundation/redis-chat-history.png)
