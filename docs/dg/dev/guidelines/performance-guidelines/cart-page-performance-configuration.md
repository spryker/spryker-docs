---
title: Cart page performance configuration
description: This guideline explains how to configure cart/basket or checkout for your Spryker based projects.
last_updated: Oct 29, 2025
template: concept-topic-template
related:
  - title: Frontend performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/front-end-performance-guidelines.html   
---

Cart page performance is crucial for providing a smooth and efficient shopping experience for users. This guideline outlines best practices and configurations to optimize the performance of the cart/basket or checkout pages in Spryker-based projects.
## 1. Prerequisites:
Before implementing the performance configurations, ensure that you have the latest packages and modules installed in your Spryker project. This includes:
```php
composer require spryker/cart:"^7.16.0" spryker/merchant-product-offer:"^1.11.0" spryker/money:"^2.15.0" spryker/price-cart-connector:"^6.13.0" spryker/price-product:"^4.49.0" spryker/product-bundle:"^7.27.0" spryker/product-relation-storage:"^2.6.0" spryker-shop/cart-page:"^3.56.0" spryker-shop/merchant-widget:"^1.5.0" spryker-shop/product-alternative-widget:"^1.6.0" spryker-shop/product-detail-page:"^3.27.0" spryker-shop/product-relation-widget:"^1.4.0" spryker-shop/product-replacement-for-widget:"^1.6.0" spryker-shop/shop-application:"^1.16.0" spryker-shop/shop-ui:"^1.100.0" 
```
## 2. Configurations
To enhance the performance of the cart page, consider implementing the following configurations:
### 2.1 Enable Caching:
By default cart page recalculated on every request. To improve performance, enable caching for the cart page. This can be done by configuring the cache settings in the `CartPageConfig` class.

Fully disable cart recalculation on every request:
```php
    public function isQuoteValidationEnabled(): bool
    {
        return false;
    }
```
Fully enable cart recalculation on every ajax request:
```php
    public function isQuoteValidationEnabledForAjaxCartItems(): bool
    {
        return false;
    }
```
*Note*: In both cases above cart would be recalculated only on change (add/remove items). Make sure that your project requirements allow you to disable cart recalculation.

In case you want to enable cart recalculation but still want to improve performance you can set a time limit for recalculation:
```php
    public function getQuoteValidationCacheTtl(): int
    {
        return 300; // Time in seconds
    }
```
In this case cart would be recalculated on change (add/remove items) and when customer will open cart after 5 minutes (300 seconds).

### 2.2 Enable widget caching (for merchant feature only):
If you are using the merchant feature, enable widget caching to reduce the load on the server and improve response times. This can be configured in the `ShopApplicationDependencyProvider` class.
```php
    protected function getWidgetCacheKeyGeneratorStrategyPlugins(): array
    {
        return [
            // other plugins
            new SoldByMerchantWidgetCacheKeyGeneratorStrategyPlugin(),
        ];
    }
```

### 2.3 Configure Product Relations feature:
If your cart page displays [product relations](docs/pbc/all/product-relationship-management/latest/product-relationship-management) (e.g., related products, upsells), ensure that the Product Relations feature is properly configured to optimize performance.

Limit amount of product relations loaded on cart page in the `ProductRelationStorageConfig` class:
```php
    public function getUpsellingProductLimit(): int
    {
        return 25;
    }
```
Update the usage of a carousel rendering for product relations widgets on the cart page to improve loading times and user experience.
ProductAlternativeListWidget:
```php
        {% widget 'ProductAlternativeListWidget' args [data.product] with {
            data: {
                isNewCarouselRenderingEnabled: true
            }
        } only %}
```
ProductReplacementForListWidget:
```php
        {% widget 'ProductReplacementForListWidget' args [data.product.sku] with {
            data: {
                isNewCarouselRenderingEnabled: true,
            }
        } only %}
```
SimilarProductsWidget:
```php 
        {% widget 'SimilarProductsWidget' args [data.product] with {
            data: {
                isNewCarouselRenderingEnabled: true,
            }
        } only %}
```
Check if you have the mentioned widgets in your project template and update them accordingly.
