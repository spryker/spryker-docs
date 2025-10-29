---
title: Cart page performance configuration
description: This guideline explains how to configure cart, basket, and checkout pages in Spryker-based projects
last_updated: Oct 29, 2025
template: concept-topic-template
related:
  - title: Frontend performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/front-end-performance-guidelines.html   
---

Cart page performance is crucial for providing a smooth and efficient shopping experience for users. This guideline outlines best practices and configurations to optimize the performance of the cart, basket, and checkout pages in Spryker-based projects.

## 1. Prerequisites

Before implementing performance configurations, ensure that you have the latest packages and modules installed in your Spryker project. These include:
```php
composer require spryker/cart:"^7.16.0" spryker/merchant-product-offer:"^1.11.0" spryker/money:"^2.15.0" spryker/price-cart-connector:"^6.13.0" spryker/price-product:"^4.49.0" spryker/product-bundle:"^7.27.0" spryker/product-relation-storage:"^2.6.0" spryker-shop/cart-page:"^3.56.0" spryker-shop/merchant-widget:"^1.5.0" spryker-shop/product-alternative-widget:"^1.6.0" spryker-shop/product-detail-page:"^3.27.0" spryker-shop/product-relation-widget:"^1.4.0" spryker-shop/product-replacement-for-widget:"^1.6.0" spryker-shop/shop-application:"^1.16.0" spryker-shop/shop-ui:"^1.100.0" 
```

## 2. Configurations

To enhance cart page performance, implement the following configurations:

### 2.1 Enable Caching

By default, the cart page is recalculated on every request. To improve performance, enable caching for the cart page by configuring the cache settings in the `CartPageConfig` class.

To fully disable cart recalculation on cart page request, use the following configuration:
```php
    public function isQuoteValidationEnabled(): bool
    {
        return false;
    }
```
To fully enable cart recalculation on every AJAX request, use the following configuration:
```php
    public function isQuoteValidationEnabledForAjaxCartItems(): bool
    {
        return false;
    }
```
**Note:** In both cases above, the cart is recalculated only when items are added or removed. Ensure that your project requirements allow you to disable cart recalculation.

If you want to enable cart recalculation while improving performance, set a time limit for recalculation:
```php
    public function getQuoteValidationCacheTtl(): int
    {
        return 300; // Time in seconds
    }
```
In this case, the cart is recalculated when items are added or removed and when the customer opens the cart after five minutes (300 seconds).

### 2.2 Enable widget caching (for merchant feature only)

If you use the Merchant feature, enable widget caching to reduce server load and improve response times. Configure this in the `ShopApplicationDependencyProvider` class.
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

If your cart page displays [product relations](docs/pbc/all/product-relationship-management/latest/product-relationship-management) (e.g., related products, upsells), ensure that the Product Relations feature is properly configured to optimize performance.

Limit the number of product relations loaded on the cart page in the `ProductRelationStorageConfig` class:
```php
    public function getUpsellingProductLimit(): int
    {
        return 25;
    }
```
Update product relation widgets on the cart page to use carousel rendering to improve loading times and enhance user experience.
- ProductAlternativeListWidget:
```php
        {% widget 'ProductAlternativeListWidget' args [data.product] with {
            data: {
                isNewCarouselRenderingEnabled: true
            }
        } only %}
```
- ProductReplacementForListWidget:
```php
        {% widget 'ProductReplacementForListWidget' args [data.product.sku] with {
            data: {
                isNewCarouselRenderingEnabled: true,
            }
        } only %}
```
- SimilarProductsWidget:
```php 
        {% widget 'SimilarProductsWidget' args [data.product] with {
            data: {
                isNewCarouselRenderingEnabled: true,
            }
        } only %}
```
Verify that these widgets are present in your project twig templates and update them as needed.
