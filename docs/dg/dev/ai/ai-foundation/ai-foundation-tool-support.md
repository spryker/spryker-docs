---
title: Use AI tools with the AiFoundation module
description: Extend AI capabilities by providing custom tools that AI models can invoke during conversations
last_updated: Jan 02, 2026
keywords: foundation, ai, tools, function calling, tool sets, plugins, openai, anthropic, prompt, agent
template: howto-guide-template
related:
  - title: AiFoundation module Overview
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-module.html
  - title: Use structured responses with the AiFoundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-transfer-response.html
---

This document describes how to create and use AI tools with the AiFoundation module to extend AI capabilities by providing custom functions that AI models can invoke during conversations.

## Overview

AI tool support enables large language models to call custom functions during conversations. Instead of only generating text, AI models can invoke your application's functionality, retrieve data, perform calculations, or trigger business logic. This creates more powerful and interactive AI-powered features.

The AI model decides when to call tools based on the conversation context. The Zed facade executes tools with appropriate arguments, receives the results, and incorporates them into the response. The AiFoundation module handles the complete tool execution flow automatically.

## Prerequisites

- AiFoundation module installed and configured. For details, see [AiFoundation module Overview](/docs/dg/dev/ai/ai-foundation/ai-foundation-module.html).
- Configured AI provider that supports tool calling (OpenAI, Anthropic Claude)

{% info_block warningBox "Provider compatibility" %}

Not all AI providers support tool calling. Ensure your configured provider supports this feature. OpenAI and Anthropic Claude have native support for function calling.

{% endinfo_block %}

## Use cases

AI tools are ideal for scenarios where AI needs to interact with your application:

### Data retrieval

Enable AI to fetch data from your system:

```php
use Spryker\Zed\AiFoundation\Dependency\Tools\ToolPluginInterface;
use Spryker\Zed\AiFoundation\Dependency\Tools\ToolParameter;

// AI can call this tool to get product information
class GetProductInfoTool implements ToolPluginInterface
{
    public const NAME = 'get_product_info';

    public function getName(): string
    {
        return static::NAME;
    }

    public function getDescription(): string
    {
        return 'Retrieves product information by SKU';
    }

    public function getParameters(): array
    {
        return [
            new ToolParameter(
                name: 'sku',
                type: 'string',
                description: 'The product SKU to retrieve information for',
                isRequired: true
            ),
        ];
    }

    public function execute(...$arguments): mixed
    {
        $sku = $arguments['sku'] ?? null;
        $product = $this->getProductClient()
            ->getProductBySku($sku);

        return json_encode([
            'name' => $product->getName(),
            'price' => $product->getPrice(),
            'availability' => $product->getAvailability(),
        ]);
    }
}
```

### Calculations and processing

Provide specialized calculations:

```php
use Spryker\Zed\AiFoundation\Dependency\Tools\ToolPluginInterface;
use Spryker\Zed\AiFoundation\Dependency\Tools\ToolParameter;

// AI can call this tool to calculate shipping costs
class CalculateShippingTool implements ToolPluginInterface
{
    public const NAME = 'calculate_shipping';

    public function __construct(
        private ShippingCalculatorInterface $shippingCalculator
    ) {
    }

    public function getName(): string
    {
        return static::NAME;
    }

    public function getDescription(): string
    {
        return 'Calculates shipping cost based on weight, destination, and shipping method';
    }

    public function getParameters(): array
    {
        return [
            new ToolParameter(
                name: 'weight',
                type: 'number',
                description: 'Package weight in kilograms',
                isRequired: true
            ),
            new ToolParameter(
                name: 'destination',
                type: 'string',
                description: 'Destination country code (e.g., US, DE, FR)',
                isRequired: true
            ),
            new ToolParameter(
                name: 'method',
                type: 'string',
                description: 'Shipping method: standard, express, or overnight',
                isRequired: false
            ),
        ];
    }

    public function execute(...$arguments): mixed
    {
        $weight = $arguments['weight'] ?? 0;
        $destination = $arguments['destination'] ?? '';
        $method = $arguments['method'] ?? 'standard';

        $cost = $this->shippingCalculator
            ->calculate($weight, $destination, $method);

        return (string) $cost;
    }
}
```

### Business logic execution

Allow AI to trigger business operations:

```php
use Spryker\Zed\AiFoundation\Dependency\Tools\ToolPluginInterface;
use Spryker\Zed\AiFoundation\Dependency\Tools\ToolParameter;

// AI can call this tool to create support tickets
class CreateSupportTicketTool implements ToolPluginInterface
{
    public const NAME = 'create_support_ticket';

    public function __construct(
        private SupportFacadeInterface $supportFacade
    ) {
    }

    public function getName(): string
    {
        return static::NAME;
    }

    public function getDescription(): string
    {
        return 'Creates a support ticket with title, description, and priority';
    }

    public function getParameters(): array
    {
        return [
            new ToolParameter(
                name: 'title',
                type: 'string',
                description: 'Brief title summarizing the issue',
                isRequired: true
            ),
            new ToolParameter(
                name: 'description',
                type: 'string',
                description: 'Detailed description of the issue or request',
                isRequired: true
            ),
            new ToolParameter(
                name: 'priority',
                type: 'string',
                description: 'Priority level: high, medium, or low',
                isRequired: false
            ),
        ];
    }

    public function execute(...$arguments): mixed
    {
        $title = $arguments['title'] ?? '';
        $description = $arguments['description'] ?? '';
        $priority = $arguments['priority'] ?? 'medium';

        $ticketId = $this->supportFacade
            ->createTicket($title, $description, $priority);

        return sprintf('Ticket created with ID: %s', $ticketId);
    }
}
```

## Create tool sets

Tool sets group related tools together. Create a tool set class that implements `ToolSetPluginInterface`. Tool sets are Zed-layer plugins registered in the Zed `AiFoundationDependencyProvider`.

```php
<?php

namespace Pyz\Zed\YourModule\Communication\Plugin\AiFoundation;

use Spryker\Zed\AiFoundation\Dependency\Tools\ToolSetPluginInterface;

class CustomerServiceToolSet implements ToolSetPluginInterface
{
    public const NAME = 'customer_service_tools';

    public function getName(): string
    {
        return static::NAME;
    }

    public function getTools(): array
    {
        return [
            new GetOrderStatusTool(),
            new CreateRefundTool(),
            new UpdateCustomerAddressTool(),
            new SendNotificationTool(),
        ];
    }
}
```

### Organizing tools into sets

Group tools by functional domain:

```php
// Product-related tools
class ProductToolSet implements ToolSetPluginInterface
{
    public const NAME = 'product_tools';

    public function getName(): string
    {
        return static::NAME;
    }

    public function getTools(): array
    {
        return [
            new SearchProductsTool(),
            new GetProductDetailsTool(),
            new CheckStockTool(),
        ];
    }
}

// Order-related tools
class OrderToolSet implements ToolSetPluginInterface
{
    public const NAME = 'order_tools';

    public function getName(): string
    {
        return static::NAME;
    }

    public function getTools(): array
    {
        return [
            new CreateOrderTool(),
            new GetOrderHistoryTool(),
            new CancelOrderTool(),
        ];
    }
}
```

## Register tool sets

Register tool sets in your Zed `AiFoundationDependencyProvider`:

```php
<?php

namespace Pyz\Zed\AiFoundation;

use Pyz\Zed\YourModule\Plugin\AiFoundation\CustomerServiceToolSet;
use Pyz\Zed\YourModule\Plugin\AiFoundation\ProductToolSet;
use Pyz\Zed\YourModule\Plugin\AiFoundation\OrderToolSet;
use Spryker\Zed\AiFoundation\AiFoundationDependencyProvider as SprykerAiFoundationDependencyProvider;

class AiFoundationDependencyProvider extends SprykerAiFoundationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AiFoundation\Dependency\Tools\ToolSetPluginInterface>
     */
    protected function getAiToolSetPlugins(): array
    {
        return [
            new CustomerServiceToolSet(),
            new ProductToolSet(),
            new OrderToolSet(),
        ];
    }
}
```

## Use tools in AI requests

Specify which tool sets to make available to the AI by adding tool set names to your prompt request:

```php
<?php

namespace Pyz\Zed\YourModule\Business\Assistant;

use Generated\Shared\Transfer\PromptMessageTransfer;
use Generated\Shared\Transfer\PromptRequestTransfer;
use Pyz\Zed\YourModule\Plugin\AiFoundation\CustomerServiceToolSet;
use Pyz\Zed\YourModule\Plugin\AiFoundation\OrderToolSet;
use Spryker\Zed\AiFoundation\Business\AiFoundationFacadeInterface;

class CustomerAssistant
{
    public function __construct(
        protected AiFoundationFacadeInterface $aiFoundationFacade
    ) {
    }

    public function handleCustomerInquiry(string $customerMessage): string
    {
        $promptRequest = (new PromptRequestTransfer())
            ->setAiConfigurationName('openai')
            ->setPromptMessage(
                (new PromptMessageTransfer())->setContent($customerMessage)
            )
            ->addToolSetName(CustomerServiceToolSet::NAME)
            ->addToolSetName(OrderToolSet::NAME)
            ->setMaxRetries(2);

        $promptResponse = $this->aiFoundationFacade->prompt($promptRequest);

        if ($promptResponse->getIsSuccessful() !== true) {
            return 'I apologize, but I encountered an error processing your request.';
        }

        return $promptResponse->getMessage()->getContent();
    }
}
```

The AI model has access to all tools from all specified tool sets.

### Example: Support ticket creation via AI

Here is a complete example showing how the AI can automatically create support tickets using the CreateSupportTicketTool:

```php
<?php

namespace Pyz\Zed\YourModule\Business;

use Generated\Shared\Transfer\PromptMessageTransfer;
use Generated\Shared\Transfer\PromptRequestTransfer;
use Pyz\Zed\YourModule\Plugin\AiFoundation\CustomerServiceToolSet;
use Spryker\Zed\AiFoundation\Business\AiFoundationFacadeInterface;

class SupportTicketAssistant
{
    public function __construct(
        protected AiFoundationFacadeInterface $aiFoundationFacade
    ) {
    }

    public function processCustomerMessage(string $customerMessage): void
    {
        // Request AI to process the message with access to support tools
        $promptRequest = (new PromptRequestTransfer())
            ->setPromptMessage(
                (new PromptMessageTransfer())->setContent($customerMessage)
            )
            ->addToolSetName(CustomerServiceToolSet::NAME) // Includes CreateSupportTicketTool
            ->setMaxRetries(2);

        $promptResponse = $this->aiFoundationFacade->prompt($promptRequest);

        if ($promptResponse->getIsSuccessful() !== true) {
            throw new Exception('Failed to process customer message');
        }

        // Check if the AI invoked the create support ticket tool
        foreach ($promptResponse->getToolInvocations() as $toolInvocation) {
            if ($toolInvocation->getName() === 'create_support_ticket') {
                $ticketId = $toolInvocation->getResult();
                echo sprintf('Support ticket created: %s', $ticketId);
            }
        }

        // Send the AI response to the customer
        $response = $promptResponse->getMessage()->getContent();
        echo $response;
    }
}
```

In this example, when the customer sends a message like "I need to report a critical bug", the AI can:
1. Understand the customer's intent
2. Extract the ticket title, description, and priority
3. Invoke the `create_support_ticket` tool through the facade
4. Receive the ticket ID from the tool result
5. Incorporate the ticket information into its response to the customer

## Handle tool call results

Tool calls are automatically executed and their results are included in the response:

```php
$promptResponse = $this->aiFoundationFacade->prompt($promptRequest);

if ($promptResponse->getIsSuccessful() === true) {
    // Get the final AI response
    $finalMessage = $promptResponse->getMessage()->getContent();

    // Access tool invocation information
    foreach ($promptResponse->getToolInvocations() as $toolInvocation) {
        $toolName = $toolInvocation->getName();
        $toolArguments = $toolInvocation->getArguments();
        $toolResult = $toolInvocation->getResult();

        // Log or process tool invocations
        $this->logger->info(sprintf(
            'AI invoked tool "%s" with arguments: %s. Result: %s',
            $toolName,
            json_encode($toolArguments),
            $toolResult
        ));
    }
}
```

### Tool call flow

The complete flow when tools are used:

1. AI receives the prompt and available tools
2. AI decides to call one or more tools
3. AiFoundation automatically executes the tools with provided arguments
4. Tool results are sent back to the AI
5. AI incorporates results and may call additional tools
6. Process continues until AI provides final response
7. Final response and all tool invocations are returned in `ToolInvocationTransfer` objects

## Best practices

### Provide clear tool descriptions

Write descriptions that help the AI understand when and how to use tools:

```php
// Good: Clear, specific description
public function getDescription(): string
{
    return 'Searches for products by name, category, or SKU. Returns product name, price, and availability status.';
}

// Avoid: Vague description
public function getDescription(): string
{
    return 'Product search';
}
```

### Design focused tools

Create tools with single, well-defined purposes:

```php
// Good: Focused tool
class GetOrderStatusTool implements ToolPluginInterface
{
    public const NAME = 'get_order_status';

    public function getName(): string
    {
        return static::NAME;
    }
}

// Avoid: Tool that does too much
class ManageOrdersTool implements ToolPluginInterface
{
    public function execute(...$arguments): mixed
    {
        $action = $arguments['action']; // create, update, cancel, status...
        // Too many responsibilities
    }
}
```

### Return structured data

Return JSON-encoded data for complex results:

```php
public function execute(...$arguments): mixed
{
    $order = $this->getOrderDetails($arguments['order_id']);

    return json_encode([
        'order_id' => $order->getOrderId(),
        'status' => $order->getStatus(),
        'total' => $order->getTotal(),
        'items' => $order->getItems(),
        'created_at' => $order->getCreatedAt(),
    ]);
}
```

### Validate tool arguments

Always validate arguments before execution:

```php
public function execute(...$arguments): mixed
{
    $orderId = $arguments['order_id'] ?? null;

    if ($orderId === null || !is_string($orderId)) {
        return json_encode([
            'error' => 'Invalid order_id parameter',
        ]);
    }

    // Proceed with execution
}
```

### Handle errors gracefully

Return error information in a consistent format:

```php
public function execute(...$arguments): mixed
{
    try {
        $result = $this->performOperation($arguments);

        return json_encode([
            'success' => true,
            'data' => $result,
        ]);
    } catch (\Exception $e) {
        return json_encode([
            'success' => false,
            'error' => $e->getMessage(),
            'error_code' => $e->getCode(),
        ]);
    }
}
```

## Security considerations

- Validate permissions. Always check user permissions before executing sensitive operations;
- Sanitize inputs. Sanitize all inputs before using them in queries or operations;

## Limitations

### Provider-specific constraints

Different AI providers have varying limitations:

- Maximum number of tools per request
- Maximum tool description length
- Supported parameter types
- Tool execution timeout limits

### Performance considerations

Tool execution adds latency to AI requests:

- Each tool call requires additional round-trip to the AI provider
- Complex tools may take time to execute
- Multiple sequential tool calls increase total response time

Consider these factors when designing time-sensitive features.

### Token usage

Tool definitions and results consume tokens from your AI provider quota.
Monitor token consumption when using tools extensively.

## Related documentation

- [AiFoundation module Overview](/docs/dg/dev/ai/ai-foundation/ai-foundation-module.html)
- [Use structured responses with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-transfer-response.html)