---
title: AiFoundation module Overview
description: Integrate AI foundation providers into the Spryker application
last_updated: Jan 20, 2026
keywords: foundation, ai, neuron, prompt, aiconfiguration, openai, anthropic, bedrock, aws, ollama, gemini, deepseek, huggingface, mistral, grok, azure-openai, agent, chat history, conversation
template: howto-guide-template
label: early-access
related:
  - title: Use AI tools with the AiFoundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html
  - title: Use structured responses with the AiFoundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-transfer-response.html
  - title: Manage conversation history with the AiFoundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-chat-history.html
---

This document describes how to integrate and use the AiFoundation module to interact with various AI providers in your Spryker application. The AiFoundation module provides a unified interface for working with multiple AI providers, such as OpenAI, Anthropic Claude, AWS Bedrock, and others.

The AiFoundation module uses a Zed-backed architecture where the client provides a simple interface that delegates all processing to the Zed facade. This design enables centralized management of AI configurations, chat history persistence, and tool execution.

## Architecture

The AiFoundation module uses a two-layer architecture:

- **Client Layer**: Provides a simple `AiFoundationClientInterface` that serves as the entry point for AI interactions
- **Zed Layer**: Contains the `AiFoundationFacade` that handles all business logic including:
  - AI configuration resolution
  - Vendor adapter plugin delegation
  - Chat history persistence and retrieval
  - Tool execution and invocation tracking
  - Structured response validation and mapping

The client delegates all processing to the Zed facade through a request stub, ensuring centralized management of AI operations and database persistence.

## Install the AiFoundation module

1. Require the package:

   ```bash
   composer require spryker/ai-foundation
   ```

2. Generate transfers:

   ```bash
   console transfer:generate
   ```

## Configure AI providers

Configure AI providers in a dedicated configuration file. The module uses the `AI_CONFIGURATIONS` constant to define one or more AI configurations.

{% info_block infoBox "Best practice" %}

Create a separate configuration file for AI settings to keep your configuration organized and maintainable.

{% endinfo_block %}

{% info_block warningBox "Security" %}

Store API keys as environment variables, not in configuration files. For Spryker Cloud, use the parameter store to manage sensitive credentials. For details, see [Add variables in the parameter store](/docs/ca/dev/add-variables-in-the-parameter-store.html).

{% endinfo_block %}

1. Create a new configuration file `config/Shared/config_ai.php`:

   ```php
   <?php

   use Spryker\Shared\AiFoundation\AiFoundationConstants;

   // AI provider configurations
   $config[AiFoundationConstants::AI_CONFIGURATIONS] = [
       // Your AI configurations will be defined here
   ];
   ```

2. Include the AI configuration file in your main configuration file (for example, `config/Shared/config_default.php`):

   ```php
   <?php

   require 'config_ai.php';
   ```

Alternatively, you can define AI configurations directly in `config/Shared/config_default.php` if you prefer a single configuration file approach.

### Configuration structure

Each AI configuration requires:
- `provider_name`: The AI provider identifier (required)
- `provider_config`: Provider-specific configuration (required)
- `system_prompt`: Default system prompt for the AI provider

### Default configuration

The module automatically uses the configuration named `AI_CONFIGURATION_DEFAULT` when you do not specify a configuration in the `PromptRequest`. Define at least one default configuration:

```php
<?php

use Spryker\Shared\AiFoundation\AiFoundationConstants;

$config[AiFoundationConstants::AI_CONFIGURATIONS] = [
    AiFoundationConstants::AI_CONFIGURATION_DEFAULT => [
        'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
        'provider_config' => [
            'key' => getenv('OPENAI_API_KEY'),
            'model' => 'gpt-4o',
        ],
        'system_prompt' => 'You are a helpful assistant.',
    ],
];
```

## Provider configuration examples

### OpenAI

```php
'openai-config' => [
    'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
    'provider_config' => [
        'key' => getenv('OPENAI_API_KEY'), // required
        'model' => 'gpt-4o', // required
        'parameters' => [], // optional
        'httpOptions' => [ // optional
            'timeout' => 60,
            'connectTimeout' => 5,
            'headers' => [],
        ],
    ],
    'system_prompt' => 'You are a helpful assistant.', // optional
],
```

### Anthropic Claude

```php
'anthropic-config' => [
    'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
    'provider_config' => [
        'key' => getenv('ANTHROPIC_API_KEY'), // required
        'model' => 'claude-sonnet-4-20250514', // required
        'version' => '2023-06-01', // optional
        'max_tokens' => 8192, // optional
        'parameters' => [], // optional
        'httpOptions' => [ // optional
            'timeout' => 60,
        ],
    ],
],
```

### AWS Bedrock

AWS Bedrock requires a `system_prompt` configuration. AWS credentials are automatically loaded from environment variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_SESSION_TOKEN`.

```php
'bedrock-config' => [
    'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
    'provider_config' => [
        'model' => 'eu.anthropic.claude-sonnet-4-20250514-v1:0', // required
        'bedrockRuntimeClient' => [ // required
            'region' => 'eu-west-1', // required
            'version' => 'latest', // optional
        ],
    ],
    'system_prompt' => 'You are a helpful assistant.', // required for Bedrock
],
```

### Ollama (local/self-hosted)

If Ollama runs outside the Docker SDK on macOS, use `http://host.docker.internal:11434/api` as the URL to access the host machine from within Docker containers.

```php
'ollama-config' => [
    'provider_name' => AiFoundationConstants::PROVIDER_OLLAMA,
    'provider_config' => [
        'url' => 'http://host.docker.internal:11434/api', // required - use host.docker.internal for Mac when Ollama runs outside Docker
        'model' => 'llama3.2', // required
        'parameters' => [], // optional
        'httpOptions' => [ // optional
            'timeout' => 60,
            'connectTimeout' => 5,
        ],
    ],
],
```

#### Run Ollama with Docker SDK

To run Ollama as a service within the Spryker Docker SDK:

1. Create an `ollama.yml` file in your project root:

   ```yaml
   version: '3.8'

   services:
       ollama:
           image: ollama/ollama:latest
           environment:
               OLLAMA_HOST: "0.0.0.0:11435"
           volumes:
               - ./data/tmp/ollama_data:/root/.ollama
           networks:
               - private
               - public
   ```

2. Reference the Ollama compose file in your `deploy.dev.yml`:

   ```yaml
   compose:
       yamls: ['./ollama.yml']
   ```

3. Update your AI configuration to use the Ollama service URL:

   ```php
   'ollama-config' => [
       'provider_name' => AiFoundationConstants::PROVIDER_OLLAMA,
       'provider_config' => [
           'url' => 'http://ollama:11435/api', // use service name when running inside Docker SDK
           'model' => 'llama3.2',
       ],
   ],
   ```

4. Deploy the changes:

   ```bash
   docker/sdk boot deploy.dev.yml
   docker/sdk up
   ```

5. Pull the required Ollama model:

   ```bash
   docker/sdk cli exec -c ollama ollama pull llama3.2
   ```

The Ollama data is stored in the `./data/tmp/ollama_data` directory, which you should exclude from version control (.gitignore or .dockerignore).

### Google Gemini

```php
'gemini-config' => [
    'provider_name' => AiFoundationConstants::PROVIDER_GEMINI,
    'provider_config' => [
        'key' => getenv('GEMINI_API_KEY'), // required
        'model' => 'gemini-2.0-flash', // required
        'parameters' => [], // optional
    ],
],
```

### Deepseek

```php
'deepseek-config' => [
    'provider_name' => AiFoundationConstants::PROVIDER_DEEPSEEK,
    'provider_config' => [
        'key' => getenv('DEEPSEEK_API_KEY'), // required
        'model' => 'deepseek-chat', // required
        'parameters' => [], // optional
    ],
],
```

### HuggingFace

```php
'huggingface-config' => [
    'provider_name' => AiFoundationConstants::PROVIDER_HUGGINGFACE,
    'provider_config' => [
        'key' => getenv('HUGGINGFACE_API_KEY'), // required
        'model' => 'meta-llama/Llama-3.3-70B-Instruct', // required
        'parameters' => [], // optional
    ],
],
```

### Mistral AI

```php
'mistral-config' => [
    'provider_name' => AiFoundationConstants::PROVIDER_MISTRAL,
    'provider_config' => [
        'key' => getenv('MISTRAL_API_KEY'), // required
        'model' => 'mistral-large-latest', // required
        'parameters' => [], // optional
    ],
],
```

### xAI Grok

```php
'grok-config' => [
    'provider_name' => AiFoundationConstants::PROVIDER_GROK,
    'provider_config' => [
        'key' => getenv('XAI_API_KEY'), // required
        'model' => 'grok-2-latest', // required
        'parameters' => [], // optional
    ],
],
```

### Azure OpenAI

```php
'azure-openai-config' => [
    'provider_name' => AiFoundationConstants::PROVIDER_AZURE_OPEN_AI,
    'provider_config' => [
        'key' => getenv('AZURE_OPENAI_API_KEY'), // required
        'endpoint' => 'https://your-resource.openai.azure.com', // required
        'model' => 'your-deployment-name', // required
        'version' => '2024-02-01', // optional
        'parameters' => [], // optional
    ],
],
```

## Use the AiFoundation facade

### Basic usage

```php
<?php

namespace Pyz\Zed\YourModule\Business;

use Generated\Shared\Transfer\PromptMessageTransfer;
use Generated\Shared\Transfer\PromptRequestTransfer;
use Spryker\Zed\AiFoundation\Business\AiFoundationFacadeInterface;

class YourBusinessModel
{
    public function __construct(
        protected AiFoundationFacadeInterface $aiFoundationFacade
    ) {
    }

    public function generateContent(string $userMessage): string
    {
        $promptRequest = (new PromptRequestTransfer())
            ->setPromptMessage(
                (new PromptMessageTransfer())->setContent($userMessage)
            );

        $response = $this->aiFoundationFacade->prompt($promptRequest);

        return $response->getMessage()->getContent();
    }
}
```

### Using a specific configuration

Specify a configuration name to use a configuration other than the default:

```php
$promptRequest = (new PromptRequestTransfer())
    ->setAiConfigurationName('anthropic-config')
    ->setPromptMessage(
        (new PromptMessageTransfer())->setContent('Explain Spryker modules')
    );

$response = $this->aiFoundationFacade->prompt($promptRequest);
```

### Multiple configurations example

Configure multiple AI providers for different use cases in your application:

```php
<?php

use Spryker\Shared\AiFoundation\AiFoundationConstants;

$config[AiFoundationConstants::AI_CONFIGURATIONS] = [
    AiFoundationConstants::AI_CONFIGURATION_DEFAULT => [
        'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
        'provider_config' => [
            'key' => getenv('OPENAI_API_KEY'),
            'model' => 'gpt-4o',
        ],
    ],
    'fast-responses' => [
        'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
        'provider_config' => [
            'key' => getenv('OPENAI_API_KEY'),
            'model' => 'gpt-4o-mini',
        ],
        'system_prompt' => 'Provide concise, brief responses.',
    ],
];
```

## Available provider constants

The module provides the following provider constants in `AiFoundationConstants`:

- `PROVIDER_OPENAI` - OpenAI (ChatGPT)
- `PROVIDER_ANTHROPIC` - Anthropic Claude
- `PROVIDER_BEDROCK` - AWS Bedrock Runtime
- `PROVIDER_GEMINI` - Google Gemini
- `PROVIDER_DEEPSEEK` - Deepseek AI
- `PROVIDER_HUGGINGFACE` - HuggingFace
- `PROVIDER_MISTRAL` - Mistral AI
- `PROVIDER_OLLAMA` - Ollama (local/self-hosted)
- `PROVIDER_GROK` - xAI Grok
- `PROVIDER_AZURE_OPEN_AI` - Azure OpenAI

## Transfer objects

### PromptRequest

This transfer contains the request data for AI interaction:

- `promptMessage` (PromptMessage, required): The message to send to the AI
- `aiConfigurationName` (string, optional): The configuration name to use. If not provided, uses `AI_CONFIGURATION_DEFAULT`
- `structuredMessage` (object, optional): A Transfer object that defines the expected response structure for structured responses
- `toolSetName` (string[], optional): Array of tool set names to make available to the AI. For details, see [Use AI tools with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html)
- `conversationId` (string, optional): Unique identifier for multi-turn conversations. When provided, the message is persisted in chat history and previous messages are automatically included in the request context. For details, see [Manage conversation history with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-chat-history.html)
- `maxRetries` (int, optional): Maximum number of retry attempts for failed requests. Default is 0

### PromptMessage

This transfer represents a message in the conversation:

- `content` (string): The text content of the message
- `contentData` (array, optional): Additional structured data
- `attachments` (Attachment[], optional): File or image attachments

### PromptResponse

This transfer contains the AI response:

- `message` (PromptMessage): The AI's response message
- `isSuccessful` (bool): Whether the request was successful
- `errors` (array, optional): Array of error messages if the request failed
- `toolInvocations` (ToolInvocation[], optional): Array of tool invocations made by the AI during response generation

### Attachment

This transfer represents a file or image attachment:

- `type` (string): Type of attachment (use `AiFoundationConstants::ATTACHMENT_TYPE_IMAGE` or `ATTACHMENT_TYPE_DOCUMENT`)
- `content` (string): The content (URL or Base64-encoded data)
- `contentType` (string): Content type format (use `AiFoundationConstants::ATTACHMENT_CONTENT_TYPE_URL` or `ATTACHMENT_CONTENT_TYPE_BASE64`)
- `mediaType` (string): MIME type (for example, `image/png`, `application/pdf`)

### ToolInvocation

This transfer contains information about a tool invocation made by the AI:

- `name` (string): The name of the tool that was invoked
- `arguments` (array): The arguments passed to the tool
- `result` (string): The result returned by the tool execution

### StructuredMessage

Define the expected structure (`structuredMessage` property) of the AI response for structured responses. This is a Spryker Transfer object that you can customize based on your requirements.

### Chat History

Chat history is created by `conversationId` and persisted in the database using the `spy_ai_chat_history` table. When you provide a `conversationId` in a prompt request, all messages are automatically stored and previous messages are retrieved to maintain conversation context. For complete details, see [Manage conversation history with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-chat-history.html). 

## About NeuronAI framework

The AiFoundation module uses the [NeuronAI PHP agentic framework](https://docs.neuron-ai.dev/) under the hood. NeuronAI provides the foundational infrastructure for AI provider integrations.

The Spryker AiFoundation client is designed for simple use cases where you need to send prompts to AI providers and receive responses. This covers most common AI integration scenarios in e-commerce applications.

For advanced agentic solutions that require complex workflows, multi-agent systems, or custom AI behaviors, you can use the [NeuronAI framework](https://docs.neuron-ai.dev/) directly in your project code. However, note that Spryker does not officially support direct usage of NeuronAI APIs outside of the AiFoundation module. If you choose to use NeuronAI directly, you are responsible for maintenance and compatibility with future versions.
