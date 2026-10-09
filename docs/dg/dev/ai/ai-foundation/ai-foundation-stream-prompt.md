---
title: Stream AI responses with the AiFoundation module
description: Use AiFoundationClient::streamPrompt() to send AI responses to the browser chunk by chunk, with tool calls, conversation history, and audit logs.
last_updated: Oct 9, 2026
keywords: foundation, ai, stream, streaming, streamPrompt, sse, server-sent events, chat, tools, conversation history, audit, client
template: howto-guide-template
related:
  - title: AiFoundation module Overview
    link: docs/dg/dev/ai/ai-foundation/ai-foundation-module.html
  - title: Use structured responses with the AiFoundation module
    link: docs/dg/dev/ai/ai-foundation/ai-foundation-transfer-response.html
  - title: Use AI tools with the AiFoundation module
    link: docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html
  - title: Conversation History
    link: docs/dg/dev/ai/ai-foundation/ai-foundation-conversation-history.html
  - title: AI Interaction Audit Logs
    link: docs/dg/dev/ai/ai-foundation/ai-foundation-audit-logs.html
---

`AiFoundationClient::streamPrompt()` sends a prompt to an AI model and returns the response chunk by chunk. The user sees the text while the model writes it, and does not wait for the full response.

`streamPrompt()` is a Client method, so you can stream responses in any application that uses the Client layer, for example, the Storefront (Yves) or Glue.

{% info_block warningBox "Structured responses are not supported" %}

`streamPrompt()` ignores `PromptRequestTransfer.structuredMessage`. To get a structured response, use `prompt()`. For details, see [Use structured responses with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-transfer-response.html).

{% endinfo_block %}

## Prerequisites

- Install and configure the AiFoundation module. For instructions, see [AiFoundation module Overview](/docs/dg/dev/ai/ai-foundation/ai-foundation-module.html).
- Update the AiFoundation module to version [0.9.0](https://github.com/spryker/ai-foundation/releases/tag/0.9.0) or later:

    ```bash
    composer require spryker/ai-foundation:"^0.9.0" --update-with-dependencies
    ```

## How streaming works

`streamPrompt()` runs in the Client layer, calls the AI provider directly, and calls Zed only to do the following:

- Load the AI configuration and the stored conversation.
- Save the conversation.
- Write the audit log, if you enable it.

The text chunks never go through Zed. They go from the AI provider to your stream event plugins, and these plugins write them to the browser.

In the following diagram, `NeuronVendorAiAdapter` is the part of `AiFoundationClient` that runs in your application, for example, Yves. The **Zed gateway** column shows the only calls that go to Zed.

![streamPrompt() lifecycle](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-foundation/streamPrompt.png)

A *turn* is one user message and the full model response to it, including all tool calls. One call of `streamPrompt()` processes one turn. Each turn has four steps:

1. **Start the session.** Zed returns the AI configuration and the conversation history. If this step fails, the turn stops and no plugin runs.
2. **Stream and run tools.** Each chunk goes to the stream event plugins. When the model requests a tool, `AiFoundationClient` runs the tool plugin in your application and sends the result back to the model. The model can request tools in a maximum of 5 rounds. This limit prevents endless tool loops and high token costs. To change it, extend `NeuronVendorAiAdapter`, override the `MAX_TOOL_LOOP_ITERATIONS` constant, and return your adapter from `AiFoundationFactory::createVendorAiAdapter()` in the Client layer.
3. **Save the conversation.** Zed saves the conversation history in the `spy_ai_conversation_history` table. This step runs only when you set `PromptRequestTransfer.conversationReference`. For details, see [Conversation History](/docs/dg/dev/ai/ai-foundation/ai-foundation-conversation-history.html).
4. **Run post-prompt plugins.** They run once at the end of the turn.

## Stream a prompt

To stream a prompt, allow the AI configuration, register a stream event plugin, and call `streamPrompt()` from a controller.

### 1. Allow the AI configuration in the Client

By default, the Client cannot use any AI configuration. This prevents a Storefront or Glue request from using an AI configuration that is only for the Back Office. The examples on this page use a product assistant on the Storefront.

1. Define the AI configuration name as a shared constant, so that Zed and Yves use the same value:

    **src/Pyz/Shared/ProductAssistant/ProductAssistantConstants.php**

    ```php
    <?php

    namespace Pyz\Shared\ProductAssistant;

    interface ProductAssistantConstants
    {
        /**
         * AI configuration name used by the product assistant on the Storefront.
         *
         * @api
         */
        public const string AI_CONFIGURATION_PRODUCT_ASSISTANT = 'PRODUCT_ASSISTANT:AI_CONFIGURATION_PRODUCT_ASSISTANT';
    }
    ```

2. Add the AI configuration:

    **config/Shared/config_ai.php**

    ```php
    use Pyz\Shared\ProductAssistant\ProductAssistantConstants;
    use Spryker\Shared\AiFoundation\AiFoundationConstants;

    $config[AiFoundationConstants::AI_CONFIGURATIONS] = [
        // existing configurations...
        ProductAssistantConstants::AI_CONFIGURATION_PRODUCT_ASSISTANT => [
            'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
            'provider_config' => [
                'key' => getenv('OPENAI_API_KEY'),
                'model' => 'gpt-4o',
            ],
            'system_prompt' => 'You are a product assistant of an online shop. Answer questions about products, prices, and availability. Answer only with data from the tools.',
        ],
    ];
    ```

3. Allow the Client to use the AI configuration:

    **src/Pyz/Zed/AiFoundation/AiFoundationConfig.php**

    ```php
    <?php

    namespace Pyz\Zed\AiFoundation;

    use Pyz\Shared\ProductAssistant\ProductAssistantConstants;
    use Spryker\Zed\AiFoundation\AiFoundationConfig as SprykerAiFoundationConfig;

    class AiFoundationConfig extends SprykerAiFoundationConfig
    {
        /**
         * @return array<string>
         */
        public function getClientResolvableAiConfigurationNames(): array
        {
            return [
                ProductAssistantConstants::AI_CONFIGURATION_PRODUCT_ASSISTANT,
            ];
        }
    }
    ```

If the configuration name is not in this list, `streamPrompt()` returns `isSuccessful=false`.

### 2. Create a stream event plugin

A stream event plugin receives each chunk and writes it to the HTTP response. Implement `Spryker\Client\AiFoundation\Dependency\Plugin\StreamEventPluginInterface`:

```php
<?php

namespace Pyz\Yves\ProductAssistant\Plugin\AiFoundation;

use Generated\Shared\Transfer\PromptRequestTransfer;
use Generated\Shared\Transfer\PromptStreamChunkTransfer;
use Pyz\Shared\ProductAssistant\ProductAssistantConstants;
use Spryker\Client\AiFoundation\Dependency\Plugin\StreamEventPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

class ProductAssistantSseStreamEventPlugin extends AbstractPlugin implements StreamEventPluginInterface
{
    public function onStreamEvent(
        PromptStreamChunkTransfer $promptStreamChunkTransfer,
        PromptRequestTransfer $promptRequestTransfer
    ): void {
        if ($promptRequestTransfer->getAiConfigurationName() !== ProductAssistantConstants::AI_CONFIGURATION_PRODUCT_ASSISTANT) {
            return;
        }

        echo sprintf(
            "event: %s\ndata: %s\n\n",
            $promptStreamChunkTransfer->getType(), // text or reasoning
            json_encode(['content' => $promptStreamChunkTransfer->getContent()]),
        );

        flush();
    }
}
```

Follow these rules when you implement the plugin:

- Check `aiConfigurationName` first. The plugin receives the chunks of every turn of every AI configuration.
- Do not throw exceptions. The Client catches and logs them, but the user does not get the chunk.
- `content` contains only the new text of the chunk, not the full text so far.

### 3. Register the stream event plugin

**src/Pyz/Client/AiFoundation/AiFoundationDependencyProvider.php**

```php
<?php

namespace Pyz\Client\AiFoundation;

use Pyz\Yves\ProductAssistant\Plugin\AiFoundation\ProductAssistantSseStreamEventPlugin;
use Spryker\Client\AiFoundation\AiFoundationDependencyProvider as SprykerAiFoundationDependencyProvider;

class AiFoundationDependencyProvider extends SprykerAiFoundationDependencyProvider
{
    /**
     * @return array<\Spryker\Client\AiFoundation\Dependency\Plugin\StreamEventPluginInterface>
     */
    protected function getStreamEventPlugins(): array
    {
        return [
            new ProductAssistantSseStreamEventPlugin(),
        ];
    }
}
```

### 4. Call streamPrompt() in a controller

Call `streamPrompt()` inside a `StreamedResponse` with server-sent events (SSE) headers. In this example, the conversation reference is bound to the customer session, so each customer continues their own conversation:

**src/Pyz/Yves/ProductAssistant/Controller/PromptController.php**

```php
<?php

namespace Pyz\Yves\ProductAssistant\Controller;

use Generated\Shared\Transfer\PromptMessageTransfer;
use Generated\Shared\Transfer\PromptRequestTransfer;
use Pyz\Shared\ProductAssistant\ProductAssistantConstants;
use Spryker\Yves\Kernel\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * @method \Pyz\Yves\ProductAssistant\ProductAssistantFactory getFactory()
 */
class PromptController extends AbstractController
{
    public function indexAction(Request $request): StreamedResponse
    {
        $promptRequestTransfer = (new PromptRequestTransfer())
            ->setAiConfigurationName(ProductAssistantConstants::AI_CONFIGURATION_PRODUCT_ASSISTANT)
            ->setPromptMessage((new PromptMessageTransfer())->setContent((string)$request->request->get('message')))
            ->setConversationReference('product-assistant-' . $request->getSession()->getId()) // omit it to not save the conversation history in Zed
            ->setToolNames(['search_products', 'get_product_availability']);

        ignore_user_abort(true); // the turn continues and is saved when the browser disconnects
        set_time_limit(120);

        return new StreamedResponse(
            function () use ($promptRequestTransfer): void {
                $promptResponseTransfer = $this->getFactory()->getAiFoundationClient()->streamPrompt($promptRequestTransfer);

                // Send the final status to the browser. The text chunks are already sent.
                echo sprintf("event: done\ndata: %s\n\n", json_encode([
                    'isSuccessful' => $promptResponseTransfer->getIsSuccessful(),
                ]));
                flush();
            },
            200,
            ['Content-Type' => 'text/event-stream', 'Cache-Control' => 'no-cache', 'X-Accel-Buffering' => 'no'],
        );
    }
}
```

`PromptResponseTransfer` contains the following data:

- `isSuccessful` and `errors`: the status of the turn.
- `streamedContent`: all text of the turn. When the stream fails, it contains the text that arrived before the failure.

To override the system prompt of the AI configuration for one turn, set `PromptRequestTransfer.systemPrompt`.

## Use tools

Tools let the model get data or run actions during the turn. For streaming, register tools in the Client, not in Zed.

1. Create a tool plugin that implements `Spryker\Client\AiFoundation\Dependency\Tools\ToolPluginInterface`. For details about tool plugins, see [Use AI tools with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html).
2. Register the tool plugin in `getAiToolPlugins()` of the Client `AiFoundationDependencyProvider`.
3. Add the tool names to the request. The tool name is the value that `ToolPluginInterface::getName()` returns:

    ```php
    $promptRequestTransfer->setToolNames(['search_products', 'get_product_availability']);
    ```

Note the following behavior:

- `streamPrompt()` uses `toolNames` only. It ignores `toolSetNames`.
- If a tool throws an exception, the turn continues. The model gets a message that the tool did not return a result.

## Enable audit logs

The audit log stores each prompt and each tool call of the turn in the `spy_ai_interaction_log` table. The Client collects all entries of the turn and sends them to Zed in one call at the end of the turn.

1. Register both audit plugins in the Client `AiFoundationDependencyProvider`:

    ```php
    use Spryker\Client\AiFoundation\Plugin\AuditLog\AiInteractionAuditLogPostPromptPlugin;
    use Spryker\Client\AiFoundation\Plugin\AuditLog\AiInteractionAuditLogPostToolCallPlugin;

    protected function getPostToolCallPlugins(): array
    {
        return [
            new AiInteractionAuditLogPostToolCallPlugin(),
        ];
    }

    protected function getPostPromptPlugins(): array
    {
        return [
            new AiInteractionAuditLogPostPromptPlugin(),
        ];
    }
    ```

    {% info_block warningBox "Register both plugins" %}

    Always register both plugins. If you register only `AiInteractionAuditLogPostToolCallPlugin`, no entries reach Zed. If you register only `AiInteractionAuditLogPostPromptPlugin`, the tool call entries are missing.

    {% endinfo_block %}

2. In `config/Shared/config_default.php`, add the Client audit logger config plugin for the application that calls `streamPrompt()`:

    ```php
    use Spryker\Client\AiFoundation\Plugin\Log\AiInteractionAuditLoggerConfigPlugin as ClientAiInteractionAuditLoggerConfigPlugin;
    use Spryker\Shared\Log\LogConstants;

    $config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_YVES] = [
        // existing plugins...
        ClientAiInteractionAuditLoggerConfigPlugin::class,
    ];
    ```

For Glue, use `LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE`. Do not use the Zed plugin with the same class name: `Spryker\Zed\AiFoundation\Communication\Plugin\Log\AiInteractionAuditLoggerConfigPlugin` is for `AiFoundationFacade::prompt()`.

To view the logs in the Back Office, see [AI Interaction Audit Logs](/docs/dg/dev/ai/ai-foundation/ai-foundation-audit-logs.html).

## Plugin reference

All plugin stacks are in the Client `AiFoundationDependencyProvider`.

| Method | Plugin interface | When it runs | Exceptions |
|---|---|---|---|
| `getStreamEventPlugins()` | `Spryker\Client\AiFoundation\Dependency\Plugin\StreamEventPluginInterface` | For each chunk of every turn | Caught and logged |
| `getAiToolPlugins()` | `Spryker\Client\AiFoundation\Dependency\Tools\ToolPluginInterface` | When the model requests the tool, and the tool name is in `toolNames` | Caught, the model gets a failure message |
| `getPreToolCallPlugins()` | `Spryker\Client\AiFoundation\Dependency\Plugin\PreToolCallPluginInterface` | Before each tool | Not caught, the turn fails |
| `getPostToolCallPlugins()` | `Spryker\Client\AiFoundation\Dependency\Plugin\PostToolCallPluginInterface` | After each tool | Not caught, the turn fails |
| `getPostPromptPlugins()` | `Spryker\Client\AiFoundation\Dependency\Plugin\PostPromptPluginInterface` | Once, at the end of the turn | Caught and logged |
