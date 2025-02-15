---
title: Strategy Resolvers
description: This document
last_updated: Feb 6, 2025
template: howto-guide-template
redirect_from:
- /docs/dg/dev/architecture/programming-concepts.html

---

Spryker introduces context-based dependency resolution, such as plugin-stack, using a strategy resolver to handle complex workflows that stretch across multiple modules. This enhancement allows for defining multiple dependencies and selecting the appropriate one dynamically at runtime by the business logic.

Why this change? Some workflows require multiple plugin-stack variations that need to be switched in sync.
What does it do? Allows defining multiple plugin-stacks and resolving the correct one based on a context identifier.
Backward compatibility? Only applied to selected plugin-stacks that require this enhancement. Customizations may need updates, but the approach is backward compatible.

## When to Use It

Use the strategy resolver when:
- You need to handle multiple plugin-stack configurations dynamically.
- A workflow spans multiple modules and requires synchronized behavior.
- You want to allow context-specific behavior while keeping plugin-stack resolution flexible.

Do not use it if:
- A single plugin-stack is sufficient for your module (considering using regular strategy plugin stack approach instead).
- You do not need context-based, wide-spread synchronization.

## How It Works (Technical Details & Code Examples)

### Defining Contexts

Each module that provides a context must define it as an interface constant with a clear and verbose description of its purpose.

```php
<?php

namespace Spryker\Shared\CheckoutExtension;

interface CheckoutExtensionContextsInterface
{
    /**
     * Specification:
     * - Defines the Checkout Context, which applies when a customer initiates a new order.
     * - Enables workflows to distinguish new order processing from other order-related operations.
     * - The order is being created for the first time, not modified.
     * - Includes standard checkout steps such as cart review, payment, and confirmation.
     * - Enables plugins to execute context-specific logic related to new order creation.
     *
     * @api
     *
     * @var string
     */
    public const CONTEXT_CHECKOUT = 'checkout';
```

### Configuring Strategy Resolver in the Factory

The factory is responsible for creating the strategy resolver and mapping all supported contexts to plug-in stacks and choose fallbacks if needed.
It is important to well define the generic type of the strategy resolver to ensure type safety.

The below example defines plugin stacks for `Checkout` and `Order Amendment` contexts, while keeps `Checkout` context as fallback for backward compatibility reasons.

```php
    /**
     * @return \Spryker\Shared\Kernel\StrategyResolverInterface<list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>>
     */
    public function createCheckoutPreConditionPluginStrategyResolver(): StrategyResolverInterface
    {
        return new StrategyResolver(
            [
                CheckoutExtensionContextsInterface::CONTEXT_CHECKOUT => $this->getProvidedDependency(CheckoutDependencyProvider::CHECKOUT_PRE_CONDITIONS, static::LOADING_LAZY),
                SalesOrderAmendmentExtensionContextsInterface::CONTEXT_ORDER_AMENDMENT => $this->getProvidedDependency(CheckoutDependencyProvider::CHECKOUT_PRE_CONDITIONS_FOR_ORDER_AMENDMENT, static::LOADING_LAZY),
            ],
            CheckoutExtensionContextsInterface::CONTEXT_CHECKOUT, // fallback context
        );
    }
```

Instead of injecting a single plugin-stack, inject the strategy resolver into the model.

```php
    /**
     * @return \Spryker\Zed\Checkout\Business\Workflow\CheckoutWorkflowInterface
     */
    public function createCheckoutWorkflow()
    {
        return new CheckoutWorkflow(
            $this->getOmsFacade(),
            $this->createCheckoutPreConditionPluginStrategyResolver(),
            $this->createCheckoutSaveOrderPluginStrategyResolver(),
            $this->createCheckoutPostSavePluginStrategyResolver(),
            $this->createCheckoutPreSavePluginStrategyResolver(),
        );
    }
```

### Using Context-Based Resolution in the Model

When the model executes logic, it must explicitly specify the context when requesting a plug-in stack.

```php
class CheckoutWorkflow implements CheckoutWorkflowInterface
{
    /**
     * @var \Spryker\Shared\Kernel\StrategyResolverInterface<list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>>
     */
    protected $preConditionPluginStrategyResolver;

    /**
     * ...
     * @param \Spryker\Shared\Kernel\StrategyResolverInterface<list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>> $preConditionPluginStrategyResolver
     * ...
     */
    public function __construct( ... StrategyResolverInterface $preConditionPluginStrategyResolver ...) {
        ...
        $this->preConditionPluginStrategyResolver = $preConditionPluginStrategyResolver;
        ...
    }

    protected function checkPreConditions(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponse)
    {
        $isPassed = true;

        $quoteProcessFlowName = $quoteTransfer->getQuoteProcessFlow()?->getNameOrFail(); // the context resolution depends on the needed business logic; this is just an example
        $preConditionPlugins = $this->preConditionPluginStrategyResolver->get($quoteProcessFlowName);

        foreach ($preConditionPlugins as $preConditionPlugin) {
            $isPassed &= $preConditionPlugin->checkCondition($quoteTransfer, $checkoutResponse);
        }

        return (bool)$isPassed;
    }
}

```

### Enabling Lazy Plugin-Stack Resolution

When multiple plugin-stacks are present with huge (10+) amount of plugins, performance may be an issue. For this reason,
lazy loading is also introduced to the container system.
The strategy resolver solves lazy loading in the background, ensuring that the correct plugin-stack is resolved only when requested.

Note: The lazy loading can be used on demand even without strategy resolver, however fetching needs to be triggered on-demand.

```php
    $this->getProvidedDependency(CheckoutDependencyProvider::CHECKOUT_PRE_CONDITIONS, static::LOADING_LAZY);
```

### Debugging & Logging

Everything remains typed, ensuring full compatibility with tools like Xdebug.
The strategy resolver uses a generic template directive, allowing developers to inspect available plug-in stacks.

### Frequently Asked Questions (FAQ)

Q: Should I use this for all plugin-stacks?
A: No, strategy design pattern comes with some complexity, so it is recommended to use only when business logic requires it.

Q: Does this affect performance?
A: Only if multiple plugin-stacks are resolved simultaneously. Use lazy loading to mitigate this.

Q: What happens if a context is missing?
A: By default, it fails. However, you can define a fallback mechanism.
