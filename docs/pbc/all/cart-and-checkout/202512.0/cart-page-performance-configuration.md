---
title: Cart performance configuration
description: This guideline explains how to configure the cart, basket, and checkout pages in Spryker-based projects.
last_updated: Dec 12, 2025
template: concept-topic-template
related:
  - title: Frontend performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/front-end-performance-guidelines.html
---

## Cart page performance configuration

Cart page performance is crucial for providing a smooth and efficient shopping experience for your customers. This guideline outlines best practices and configurations to help you optimize the performance of the cart, basket, and checkout pages in Spryker-based projects.

## 1. Prerequisites

Before implementing performance configurations, ensure that you have installed the latest packages and modules in your Spryker project. These include:

```php
composer require spryker/cart:"^7.16.0" \
    spryker/merchant-product-offer:"^1.11.0" \
    spryker/money:"^2.15.0" \
    spryker/price-cart-connector:"^6.13.0" \
    spryker/price-product:"^4.49.0" \
    spryker/product-bundle:"^7.27.0" \
    spryker/product-relation-storage:"^2.6.0" \
    spryker-shop/cart-page:"^3.56.0" \
    spryker-shop/merchant-widget:"^1.5.0" \
    spryker-shop/product-alternative-widget:"^1.6.0" \
    spryker-shop/product-detail-page:"^3.27.0" \
    spryker-shop/product-relation-widget:"^1.4.0" \
    spryker-shop/product-replacement-for-widget:"^1.6.0" \
    spryker-shop/shop-application:"^1.16.0" \
    spryker-shop/shop-ui:"^1.100.0
```

## 2. Configurations

To enhance cart page performance, implement the following configurations:

### 2.1 Enable Caching

By default, the cart page recalculates on every request. To improve performance, enable caching for the cart page by configuring the cache settings in the `CartPageConfig` class.

To disable cart recalculation on a cart page request, use the following configuration:

```php
    public function isQuoteValidationEnabled(): bool
    {
        return false;
    }
```

To disable cart recalculation on every AJAX request, use the following configuration:

```php
    public function isQuoteValidationEnabledForAjaxCartItems(): bool
    {
        return false;
    }
```

**Note:** In both cases, the cart recalculates only when items are added or removed. Ensure that your project requirements permit disabling cart recalculation.

To enable cart recalculation while improving performance, set a time limit for recalculation:

```php
    public function getQuoteValidationCacheTtl(): int
    {
        return 300; // Time in seconds
    }
```

In this case, the cart recalculates when items are added or removed and when the customer opens the cart after five minutes (300 seconds).

### 2.2 Enable widget caching (for the Merchant feature only)

If you use the Merchant feature, enable widget caching to reduce server load and improve response times. Configure this setting in the `ShopApplicationDependencyProvider` class.

```php
    protected function getWidgetCacheKeyGeneratorStrategyPlugins(): array
    {
        return [
            // other plugins
            new SoldByMerchantWidgetCacheKeyGeneratorStrategyPlugin(),
        ];
    }
```

### 2.3 Configure Product Relations feature

If your cart page displays [product relations](/docs/pbc/all/product-relationship-management/{{page.version}}/product-relationship-management.html) (for example, related products or upsells), ensure that the Product Relations feature is properly configured to optimize performance.

Limit the number of product relations loaded on the cart page in the `ProductRelationStorageConfig` class:

```php
    public function getUpsellingProductLimit(): int
    {
        return 25;
    }
```

Update product relation widgets on the cart page to use carousel rendering to improve loading times and enhance user experience.
- ProductAlternativeListWidget:
{% raw %}

```twig
        {% widget 'ProductAlternativeListWidget' args [data.product] with {
            data: {
                isNewCarouselRenderingEnabled: true
            }
        } only %}
```

- ProductReplacementForListWidget:

```twig
        {% widget 'ProductReplacementForListWidget' args [data.product.sku] with {
            data: {
                isNewCarouselRenderingEnabled: true,
            }
        } only %}
```

- SimilarProductsWidget:

```twig
        {% widget 'SimilarProductsWidget' args [data.product] with {
            data: {
                isNewCarouselRenderingEnabled: true,
            }
        } only %}
```

{% endraw %}
Verify that these widgets are present in your project Twig templates, and update them as needed.

## Cart operations performance configuration

To optimize the performance of cart operations such as adding, removing, or updating items in the cart, consider the following configurations:

## 1. Prerequisites

Ensure that you have the latest versions of the following packages installed in your Spryker project:

```php
composer require spryker/merchant:"^3.19.0" spryker/persistent-cart:"^3.14.0"
```

## 2. Configurations

You can divide cart operations into two categories:

- **Inside-cart operations** (add to cart, remove from cart, change item quantity, and similar actions)
- **General cart operations** (create cart, delete cart, share cart, and similar actions)

After each operation, the system executes expander plugins. Previously, the same plugin stack was used for both inside-cart and general cart operations.

With the updated spryker/persistent-cart, these plugin stacks are now separated.

### 2.1. Enable configuration on the project level

```php
namespace Pyz\Shared\PersistentCart;

use Spryker\Shared\PersistentCart\PersistentCartConfig as SprykerPersistentCartConfig;

class PersistentCartConfig extends SprykerPersistentCartConfig
{
    protected const bool IS_QUOTE_UPDATE_PLUGINS_INSIDE_CART_ENABLED = true;
}
```

### 2.2. Review plugin stacks in ZED

By default, the following plugin stack is defined in
`\Pyz\Zed\PersistentCart\PersistentCartDependencyProvider::getQuoteResponseExpanderPlugins`.
It is currently used for all operations. After the fix, it is used only for general cart operations.

```php
/**
 * @return array<\Spryker\Zed\PersistentCartExtension\Dependency\Plugin\QuoteResponseExpanderPluginInterface>
*/
protected function getQuoteResponseExpanderPlugins(): array
{
    return [
        new CustomerCartQuoteResponseExpanderPlugin(), // MultiCartFeature
        new SharedCartQuoteResponseExpanderPlugin(),   // SharedCartFeature
    ];
}

```

A new plugin stack is introduced specifically for inside-cart operations. It is empty by default. If your project uses custom plugins for inside-cart updates, you must enable them in this method:

```php
/**
 * @return array<\Spryker\Zed\PersistentCartExtension\Dependency\Plugin\QuoteResponseExpanderPluginInterface>
 */
protected function getQuoteResponseExpanderPluginsForInsideCartOperations(): array
{
    return [];
}
```

Both methods expect plugins that implement the same interface, so you can easily divide the plugins between the two stacks.

### 2.3. Review plugin stacks in Client

By default, the following plugin stack is defined in
`\Pyz\Client\PersistentCart\PersistentCartDependencyProvider::getQuoteUpdatePlugins`.
It is currently used for all operations. After the fix, it is used only for general cart operations.

```php
/**
 * @return array<\Spryker\Client\PersistentCartExtension\Dependency\Plugin\QuoteUpdatePluginInterface>
 */
protected function getQuoteUpdatePlugins(): array
{
    return [
        new SaveCustomerQuotesQuoteUpdatePlugin(),      // MultiCartFeature
        new SharedCartsUpdateQuoteUpdatePlugin(),       // SharedCartFeature
        new DefaultQuoteUpdatePlugin(),                 // MultiCartFeature
        new PermissionUpdateQuoteUpdatePlugin(),        // SharedCartFeature
    ];
}
```

A new plugin stack is introduced specifically for inside-cart operations. It is empty by default. If your project requires inside-cart-specific plugins, enable them here:

```php
/**
 * @return array<\Spryker\Client\PersistentCartExtension\Dependency\Plugin\QuoteUpdatePluginInterface>
 */
protected function getQuoteUpdatePluginsForInsideCartOperations(): array
{
    return [];
}

```

Both methods expect plugins that implement the same interface, which allows you to separate them without additional adjustments.
