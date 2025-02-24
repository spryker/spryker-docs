---
title: Strategy Resolvers
description: This document
last_updated: Feb 6, 2025
template: howto-guide-template
redirect_from:
- /docs/dg/dev/architecture/programming-concepts.html

---

Spryker introduces context-based dependency resolution, such as plugin-stack, using a strategy resolver to handle complex workflows that stretch across multiple modules. This enhancement allows for defining multiple dependencies and selecting the appropriate one dynamically at runtime by the business logic.

Spryker introduces context-based dependency resolution using a strategy resolver to manage complex workflows spanning multiple modules. This enhancement allows defining multiple dependencies and dynamically selecting the appropriate one at runtime based on business logic.


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







# Context-Based Dependency Resolution in Spryker



## Why This Change?
Some workflows require multiple plugin-stack variations that need to be switched in sync.

## What Does It Do?
- Enables defining multiple plugin-stacks and resolving the correct one based on a context identifier.
- Facilitates context-specific behavior while maintaining flexibility.

## Backward Compatibility
- Applied only to selected plugin-stacks requiring this enhancement.
- Customizations may need updates, but the approach remains backward compatible.

## When to Use It
Use the strategy resolver when:
- Handling multiple plugin-stack configurations dynamically.
- A workflow spans multiple modules and requires synchronized behavior.
- Context-specific behavior is necessary while keeping plugin-stack resolution flexible.

Do not use it if:
- A single plugin-stack is sufficient (consider using the regular strategy plugin stack approach instead).
- Context-based, wide-spread synchronization is not needed.

## How It Works (Technical Details & Code Examples)

### Defining Contexts
Each module providing a context must define it as an interface constant with a clear and verbose description.

```php
<?php

namespace Spryker\Shared\CheckoutExtension;

interface CheckoutExtensionContextsInterface
{
    /**
     * Specification:
     * - Defines the Checkout Context for initiating a new order.
     * - Differentiates new order processing from other order-related operations.
     * - Enables context-specific logic execution.
     *
     * @api
     *
     * @var string
     */
    public const CONTEXT_CHECKOUT = 'checkout';
```

### Configuring the Strategy Resolver in the Factory
The factory creates the strategy resolver, mapping contexts to plugin stacks while ensuring type safety.

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

Instead of injecting a single plugin-stack, inject the strategy resolver into the model:

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
The model must explicitly specify the context when requesting a plugin stack.

```php
class CheckoutWorkflow implements CheckoutWorkflowInterface
{
    /**
     * @var \Spryker\Shared\Kernel\StrategyResolverInterface<list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>>
     */
    protected $preConditionPluginStrategyResolver;

    public function __construct( ... StrategyResolverInterface $preConditionPluginStrategyResolver ...) {
        $this->preConditionPluginStrategyResolver = $preConditionPluginStrategyResolver;
    }

    protected function checkPreConditions(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponse)
    {
        $isPassed = true;

        $quoteProcessFlowName = $quoteTransfer->getQuoteProcessFlow()?->getNameOrFail(); // Example resolution
        $preConditionPlugins = $this->preConditionPluginStrategyResolver->get($quoteProcessFlowName);

        foreach ($preConditionPlugins as $preConditionPlugin) {
            $isPassed &= $preConditionPlugin->checkCondition($quoteTransfer, $checkoutResponse);
        }

        return (bool)$isPassed;
    }
}
```

### Enabling Lazy Plugin-Stack Resolution
When multiple plugin-stacks contain a large number of plugins (10+), performance may become an issue. Lazy loading addresses this.

```php
    $this->getProvidedDependency(CheckoutDependencyProvider::CHECKOUT_PRE_CONDITIONS, static::LOADING_LAZY);
```

### Debugging & Logging
- Full compatibility with tools like Xdebug.
- Generic template directive ensures inspection of available plugin stacks.

## Frequently Asked Questions (FAQ)

### What kind of semantic versioning lock needs to be applied on the changes of the Factory when I define a new context?
Minor (as default). When a new context is introduced in a Project, it needs to be wired in the [Factory definition](#Configuring the Strategy Resolver in the Factory); any project change in a Spryker Factory requires a minor semantic versoning lock on that package.

### Should I use this for all plugin-stacks?
No, the strategy design pattern introduces complexity. Use it only when business logic requires it.

### Does this affect performance?
Only when multiple plugin-stacks are resolved simultaneously. Use lazy loading to mitigate this.

### What happens if a context is missing?
By default, it fails. However, a fallback mechanism can be defined.

o
