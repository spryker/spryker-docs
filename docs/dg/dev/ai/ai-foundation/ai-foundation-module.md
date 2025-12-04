---
title: Use the AiFoundation module
description: Integrate AI providers into your Spryker application
last_updated: Dec 4, 2025
keywords: foundation, ai, neuron, prompt, aiconfiguration, openai, anthropic, bedrock, aws, ollama, gemini, deepseek, huggingface, mistral, grok, azure-openai, agent
template: howto-guide-template
---

This document describes how to integrate and use the AiFoundation module to interact with various AI providers in your Spryker application. The AiFoundation module provides a unified interface for working with multiple AI providers, such as OpenAI, Anthropic Claude, AWS Bedrock, and others.

## About NeuronAI framework

The AiFoundation module uses the [NeuronAI PHP agentic framework](https://docs.neuron-ai.dev/) under the hood. NeuronAI provides the foundational infrastructure for AI provider integrations.

The Spryker AiFoundation client is designed for simple use cases where you need to send prompts to AI providers and receive responses. This covers most common AI integration scenarios in e-commerce applications.

For advanced agentic solutions that require complex workflows, multi-agent systems, or custom AI behaviors, you can use the [NeuronAI framework](https://docs.neuron-ai.dev/) directly in your project code. However, note that Spryker does not officially support direct usage of NeuronAI APIs outside of the AiFoundation module. If you choose to use NeuronAI directly, you are responsible for maintenance and compatibility with future versions.

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

Configure AI providers in your configuration file (for example, `config/Shared/config_default.php`). The module uses the `AI_CONFIGURATIONS` constant to define one or more AI configurations.

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
        'version' => '2023-06-01', // required
        'max_tokens' => 8192, // required
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
        'version' => '2024-02-01', // required
        'parameters' => [], // optional
    ],
],
```

## Use the AiFoundation client

### Basic usage

```php
<?php

namespace Pyz\Zed\YourModule\Business;

use Generated\Shared\Transfer\PromptMessageTransfer;
use Generated\Shared\Transfer\PromptRequestTransfer;
use Spryker\Client\AiFoundation\AiFoundationClientInterface;

class YourBusinessModel
{
    public function __construct(
        protected AiFoundationClientInterface $aiFoundationClient
    ) {
    }

    public function generateContent(string $userMessage): string
    {
        $promptRequest = (new PromptRequestTransfer())
            ->setPromptMessage(
                (new PromptMessageTransfer())->setContent($userMessage)
            );

        $response = $this->aiFoundationClient->prompt($promptRequest);

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

$response = $this->aiFoundationClient->prompt($promptRequest);
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

### PromptMessage

This transfer represents a message in the conversation:

- `content` (string): The text content of the message
- `contentData` (array, optional): Additional structured data
- `attachments` (Attachment[], optional): File or image attachments

### PromptResponse

This transfer contains the AI response:

- `message` (PromptMessage): The AI's response message

### Attachment

This transfer represents a file or image attachment:

- `type` (string): Type of attachment (use `AiFoundationConstants::ATTACHMENT_TYPE_IMAGE` or `ATTACHMENT_TYPE_DOCUMENT`)
- `content` (string): The content (URL or Base64-encoded data)
- `contentType` (string): Content type format (use `AiFoundationConstants::ATTACHMENT_CONTENT_TYPE_URL` or `ATTACHMENT_CONTENT_TYPE_BASE64`)
- `mediaType` (string): MIME type (for example, `image/png`, `application/pdf`)