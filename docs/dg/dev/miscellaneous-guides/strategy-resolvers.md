---
title: Strategy resolvers
description: This document
last_updated: Feb 6, 2025
template: howto-guide-template
redirect_from:
- /docs/dg/dev/architecture/programming-concepts.html

---

Context-based dependency resolution using a strategy resolver is used to manage complex workflows spanning multiple modules. This lets you define multiple dependencies and dynamically select a needed dependency at runtime based on business logic.

Strategy resolvers are introduced because some workflows require multiple plugin-stack variations that need to be switched in sync.

The approach is backward compatible. It's applied only to selected plugin-stacks that require this enhancement, and only customizations may need updates.

Use strategy resolvers in the following cases:
- To handle multiple plugin-stack configurations dynamically
- For workflows that spans multiple modules and requires synchronized behavior
- To allow context-specific behavior while keeping plugin-stack resolution flexible

Don't strategy resolvers in the following cases:
- A single plugin-stack is sufficient for your module, so consider using regular strategy plugin stack approach
- Context-based, wide-spread synchronization is not needed

## Context definition

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

The following section defines how to configure a fallback in case context is missing.

## Strategy resolver configuration in the factory

The factory is responsible for the following:
- Creating the strategy resolver
- Mapping all supported contexts to plugin stacks
- Choosing fallbacks

To ensure type safety, the generic type of the strategy resolver must be well-defined.

The following example defines plugin stacks for `Checkout` and `Order Amendment` contexts while keeping `Checkout` context as fallback for backward compatibility.

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


## Semantic versioning lock for factory changes

When defining a new context, a minor version lock must be applied. The context needs to be wired in the Factory definition. Because changes to a  Factory affects project functionality, the package must adhere to minor semantic versioning to ensure compatibility.


## Context-based resolution in models

When a model executes logic, it must explicitly specify the context when requesting a plugin stack.

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

### Lazy plugin-stack resolution and performance

When there're multiple plugin-stacks with a big number (10+) of plugins, performance may be an issue. To solve this, lazy loading is used in the container system.

The strategy resolver solves lazy loading in the background, ensuring that the correct plugin-stack is resolved only when requested.

The lazy loading can be used on demand even without strategy resolver, however fetching needs to be triggered on demand.

```php
    $this->getProvidedDependency(CheckoutDependencyProvider::CHECKOUT_PRE_CONDITIONS, static::LOADING_LAZY);
```

## Debugging and logging

The strategy resolver uses a generic template directive, allowing developers to inspect available plug-in stacks. Everything remains typed, ensuring full compatibility with tools like Xdebug.
