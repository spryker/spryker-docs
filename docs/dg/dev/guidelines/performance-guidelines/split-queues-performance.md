---
title: Split publish queues for performance
description: Learn how to split the generic publish queue into dedicated per-module queues to improve throughput, fault isolation, and resource utilization in Spryker.
last_updated: Apr 3, 2026
template: concept-topic-template
---

By default, all publish events are routed through a single generic queue (`PublisherConfig::PUBLISH_QUEUE`). This document explains how to migrate to dedicated per-module queues to improve processing throughput and system stability.

## Benefits

Splitting the publish queue into dedicated per-module queues provides the following benefits:

- **Predictable bulk processing**: Each queue processes a specific type of message, enabling bulk processing instead of random small batches that depend on message arrival order.
- **Fault isolation**: If one queue becomes stuck, only that specific message type is affected — not the entire system.
- **Better resource utilization**: Dedicated queues let you use powerful instances more effectively.
- **Scalability for all project sizes**: Even small projects benefit from faster and more predictable queue processing.

## Potential issues

Splitting queues can spawn a large number of tasks. To prevent resource exhaustion, configure the maximum number of background processes for both the standard worker and the resource-aware worker in `config/Shared/config_default.php`:

```php
$config[QueueConstants::QUEUE_WORKER_MAX_PROCESSES] = 5;
```

Set this value according to the resources available on your infrastructure.

{% info_block warningBox "Worker task limits" %}

Both the standard queue worker and the resource-aware queue worker enforce the `QUEUE_WORKER_MAX_PROCESSES` limit on the number of tasks executed in the background. Tune this value carefully based on available CPU and memory.

{% endinfo_block %}

## Install the optimization

```bash
composer update \
  spryker/rabbit-mq:"^2.23.1" \
  spryker/category-image-storage:"^1.9.0" \
  spryker/cms-page-search:"^2.10.0" \
  spryker/cms-storage:"^2.11.0" \
  spryker/company-user-storage:"^1.7.0" \
  spryker/configurable-bundle-page-search:"^1.6.0" \
  spryker/configurable-bundle-storage:"^2.8.0" \
  spryker/content-storage:"^2.8.0" \
  spryker/customer-access-storage:"^1.13.0" \
  spryker/file-manager-storage:"^2.6.0" \
  spryker/merchant-product-offer-search:"^1.8.0" \
  spryker/navigation-storage:"^1.14.0" \
  spryker/price-product-merchant-relationship-storage:"^1.20.0" \
  spryker/price-product-offer-storage:"^1.7.0" \
  spryker/product-alternative-storage:"^1.14.0" \
  spryker/product-category-filter-storage:"^1.7.0" \
  spryker/product-discontinued-storage:"^1.18.0" \
  spryker/product-group-storage:"^1.8.0" \
  spryker/product-list-search:"^2.10.0" \
  spryker/product-list-storage:"^1.20.0" \
  spryker/product-measurement-unit-storage:"^1.16.0" \
  spryker/product-offer-availability-storage:"^1.5.0" \
  spryker/product-option-storage:"^1.16.0" \
  spryker/product-packaging-unit-storage:"^5.4.0" \
  spryker/product-page-search:"^3.46.0" \
  spryker/product-quantity-storage:"^3.7.0" \
  spryker/product-review-search:"^1.15.0" \
  spryker/product-review-storage:"^1.9.0" \
  spryker/product-search-config-storage:"^1.7.0" \
  spryker/product-set-page-search:"^1.14.0" \
  spryker/product-set-storage:"^1.15.0" \
  spryker/queue:"^1.24.0" \
  spryker/queue-extension:"^1.2.0" \
  spryker/shopping-list-storage:"^1.10.0" \
  spryker/symfony-messenger:"^1.2.0" \
  spryker/tax-product-storage:"^1.7.0" \
  spryker/tax-storage:"^1.7.0" \
  spryker/url-storage:"^1.22.0"
```

Release group [SOL-486](https://api.release.spryker.com/release-group/6388)

For a complete project-level implementation example, see the [B2B Demo Marketplace PR #966](https://github.com/spryker-shop/b2b-demo-marketplace/pull/966).

## Configure the dedicated queues

The migration requires changes in three layers: broker registration, queue processor mapping, and per-module configuration.

### 1. Register queues with the message broker

Register the dedicated queues with your message broker. Depending on your setup, you configure either `RabbitMqConfig` or `SymfonyMessengerConfig` — not both. If you use Symfony Messenger, see [Integrate Symfony Messenger](/docs/dg/dev/integrate-and-configure/integrate-symfony-messenger.html).

**`src/Pyz/Client/RabbitMq/RabbitMqConfig.php`**

Add the following `use` statements and queue constants to `getPublishQueueConfiguration()`:

```php
use Spryker\Shared\CategoryImageStorage\CategoryImageStorageConfig;
use Spryker\Shared\CompanyUserStorage\CompanyUserStorageConfig;
use Spryker\Shared\MerchantProductOfferSearch\MerchantProductOfferSearchConfig;
use Spryker\Shared\PriceProductMerchantRelationshipStorage\PriceProductMerchantRelationshipStorageConfig;
use Spryker\Shared\PriceProductOfferStorage\PriceProductOfferStorageConfig;
use Spryker\Shared\ProductAlternativeStorage\ProductAlternativeStorageConfig;
use Spryker\Shared\ProductCategoryFilterStorage\ProductCategoryFilterStorageConfig;
use Spryker\Shared\ProductDiscontinuedStorage\ProductDiscontinuedStorageConfig;
use Spryker\Shared\ProductGroupStorage\ProductGroupStorageConstants;
use Spryker\Shared\ProductListSearch\ProductListSearchConfig;
use Spryker\Shared\ProductListStorage\ProductListStorageConfig;
use Spryker\Shared\ProductMeasurementUnitStorage\ProductMeasurementUnitStorageConfig;
use Spryker\Shared\ProductOfferAvailabilityStorage\ProductOfferAvailabilityStorageConfig;
use Spryker\Shared\ProductOptionStorage\ProductOptionStorageConfig;
use Spryker\Shared\ProductPackagingUnitStorage\ProductPackagingUnitStorageConfig;
use Spryker\Shared\ProductQuantityStorage\ProductQuantityStorageConfig;
use Spryker\Shared\ProductReviewSearch\ProductReviewSearchConfig;
use Spryker\Shared\ProductReviewStorage\ProductReviewStorageConfig;
use Spryker\Shared\ProductSearchConfigStorage\ProductSearchConfigStorageConfig;
use Spryker\Shared\ProductSetPageSearch\ProductSetPageSearchConfig;
use Spryker\Shared\ProductSetStorage\ProductSetStorageConfig;
use Spryker\Shared\ShoppingListStorage\ShoppingListStorageConfig;
use Spryker\Shared\TaxProductStorage\TaxProductStorageConfig;

    protected function getPublishQueueConfiguration(): array
    {
        return [
            // other queue configs
            CategoryImageStorageConfig::PUBLISH_CATEGORY_IMAGE_QUEUE,
            CompanyUserStorageConfig::PUBLISH_COMPANY_USER_QUEUE,
            MerchantProductOfferSearchConfig::PUBLISH_MERCHANT_PRODUCT_OFFER_QUEUE,
            PriceProductMerchantRelationshipStorageConfig::PUBLISH_PRICE_PRODUCT_MERCHANT_RELATIONSHIP_QUEUE,
            PriceProductMerchantRelationshipStorageConfig::PUBLISH_PRICE_PRODUCT_CONCRETE_MERCHANT_RELATIONSHIP_QUEUE,
            PriceProductMerchantRelationshipStorageConfig::PUBLISH_PRICE_PRODUCT_ABSTRACT_MERCHANT_RELATIONSHIP_QUEUE,
            PriceProductOfferStorageConfig::PUBLISH_PRICE_PRODUCT_OFFER_QUEUE,
            ProductAlternativeStorageConfig::PUBLISH_PRODUCT_ALTERNATIVE_QUEUE,
            ProductCategoryFilterStorageConfig::PUBLISH_PRODUCT_CATEGORY_FILTER_QUEUE,
            ProductDiscontinuedStorageConfig::PUBLISH_PRODUCT_DISCONTINUED_QUEUE,
            ProductGroupStorageConstants::PUBLISH_PRODUCT_GROUP_QUEUE,
            ProductListSearchConfig::PUBLISH_PRODUCT_LIST_SEARCH_QUEUE,
            ProductListStorageConfig::PUBLISH_PRODUCT_LIST_QUEUE,
            ProductListStorageConfig::PUBLISH_PRODUCT_LIST_PRODUCT_ABSTRACT_QUEUE,
            ProductListStorageConfig::PUBLISH_PRODUCT_LIST_PRODUCT_CONCRETE_QUEUE,
            ProductOfferAvailabilityStorageConfig::PUBLISH_PRODUCT_OFFER_AVAILABILITY_QUEUE,
            ProductOptionStorageConfig::PUBLISH_PRODUCT_OPTION_QUEUE,
            ProductQuantityStorageConfig::PUBLISH_PRODUCT_QUANTITY_QUEUE,
            ProductReviewSearchConfig::PUBLISH_PRODUCT_REVIEW_QUEUE,
            ProductReviewStorageConfig::PUBLISH_PRODUCT_REVIEW_STORAGE_QUEUE,
            ProductSearchConfigStorageConfig::PUBLISH_PRODUCT_SEARCH_CONFIG_QUEUE,
            ProductSetPageSearchConfig::PUBLISH_PRODUCT_SET_PAGE_QUEUE,
            ProductSetStorageConfig::PUBLISH_PRODUCT_SET_QUEUE,
            ShoppingListStorageConfig::PUBLISH_SHOPPING_LIST_QUEUE,
            TaxProductStorageConfig::PUBLISH_TAX_PRODUCT_QUEUE,
            ProductMeasurementUnitStorageConfig::PUBLISH_PRODUCT_MEASUREMENT_UNIT_QUEUE,
            ProductPackagingUnitStorageConfig::PUBLISH_PRODUCT_PACKAGING_UNIT_QUEUE,
        ];
    }
```

If you use Symfony Messenger instead of RabbitMQ, apply the same changes to `src/Pyz/Client/SymfonyMessenger/SymfonyMessengerConfig.php`.

### 2. Map queues to processor plugins

Update `QueueDependencyProvider` to map each new queue to its processor plugin.

**`src/Pyz/Zed/Queue/QueueDependencyProvider.php`**

For each dedicated queue, add a mapping to either `SynchronizationStorageQueueMessageProcessorPlugin` (for storage queues) or `SynchronizationSearchQueueMessageProcessorPlugin` (for search queues). For example:

```php
CategoryImageStorageConfig::PUBLISH_CATEGORY_IMAGE_QUEUE => [
    new SynchronizationStorageQueueMessageProcessorPlugin(),
],
ProductReviewSearchConfig::PUBLISH_PRODUCT_REVIEW_QUEUE => [
    new SynchronizationSearchQueueMessageProcessorPlugin(),
],
// ... repeat for all dedicated queues
```

### 3. Update per-module Zed configuration

For each module, override the config class at the project level to return the module-specific queue constant instead of the generic `PublisherConfig::PUBLISH_QUEUE`.

The following table lists the files to update and their corresponding queue constants:

| File | Queue constant |
|---|---|
| `src/Pyz/Zed/CategoryImageStorage/CategoryImageStorageConfig.php` | `CategoryImageStorageConfig::PUBLISH_CATEGORY_IMAGE_QUEUE` |
| `src/Pyz/Zed/CompanyUserStorage/CompanyUserStorageConfig.php` | `CompanyUserStorageConfig::PUBLISH_COMPANY_USER_QUEUE` |
| `src/Pyz/Zed/MerchantProductOfferSearch/MerchantProductOfferSearchConfig.php` | `MerchantProductOfferSearchConfig::PUBLISH_MERCHANT_PRODUCT_OFFER_QUEUE` |
| `src/Pyz/Zed/PriceProductMerchantRelationshipStorage/PriceProductMerchantRelationshipStorageConfig.php` | `PUBLISH_PRICE_PRODUCT_MERCHANT_RELATIONSHIP_QUEUE`, `PUBLISH_PRICE_PRODUCT_CONCRETE_MERCHANT_RELATIONSHIP_QUEUE`, `PUBLISH_PRICE_PRODUCT_ABSTRACT_MERCHANT_RELATIONSHIP_QUEUE` |
| `src/Pyz/Zed/PriceProductOfferStorage/PriceProductOfferStorageConfig.php` | `PriceProductOfferStorageConfig::PUBLISH_PRICE_PRODUCT_OFFER_QUEUE` |
| `src/Pyz/Zed/ProductAlternativeStorage/ProductAlternativeStorageConfig.php` | `ProductAlternativeStorageConfig::PUBLISH_PRODUCT_ALTERNATIVE_QUEUE` |
| `src/Pyz/Zed/ProductCategoryFilterStorage/ProductCategoryFilterStorageConfig.php` | `ProductCategoryFilterStorageConfig::PUBLISH_PRODUCT_CATEGORY_FILTER_QUEUE` |
| `src/Pyz/Zed/ProductDiscontinuedStorage/ProductDiscontinuedStorageConfig.php` | `ProductDiscontinuedStorageConfig::PUBLISH_PRODUCT_DISCONTINUED_QUEUE` |
| `src/Pyz/Zed/ProductGroupStorage/ProductGroupStorageConfig.php` | `ProductGroupStorageConstants::PUBLISH_PRODUCT_GROUP_QUEUE` |
| `src/Pyz/Zed/ProductListSearch/ProductListSearchConfig.php` | `ProductListSearchConfig::PUBLISH_PRODUCT_LIST_SEARCH_QUEUE` |
| `src/Pyz/Zed/ProductListStorage/ProductListStorageConfig.php` | `PUBLISH_PRODUCT_LIST_QUEUE`, `PUBLISH_PRODUCT_LIST_PRODUCT_ABSTRACT_QUEUE`, `PUBLISH_PRODUCT_LIST_PRODUCT_CONCRETE_QUEUE` |
| `src/Pyz/Zed/ProductMeasurementUnitStorage/ProductMeasurementUnitStorageConfig.php` | `ProductMeasurementUnitStorageConfig::PUBLISH_PRODUCT_MEASUREMENT_UNIT_QUEUE` |
| `src/Pyz/Zed/ProductOfferAvailabilityStorage/ProductOfferAvailabilityStorageConfig.php` | `ProductOfferAvailabilityStorageConfig::PUBLISH_PRODUCT_OFFER_AVAILABILITY_QUEUE` |
| `src/Pyz/Zed/ProductOptionStorage/ProductOptionStorageConfig.php` | `ProductOptionStorageConfig::PUBLISH_PRODUCT_OPTION_QUEUE` |
| `src/Pyz/Zed/ProductPackagingUnitStorage/ProductPackagingUnitStorageConfig.php` | `ProductPackagingUnitStorageConfig::PUBLISH_PRODUCT_PACKAGING_UNIT_QUEUE` |
| `src/Pyz/Zed/ProductQuantityStorage/ProductQuantityStorageConfig.php` | `ProductQuantityStorageConfig::PUBLISH_PRODUCT_QUANTITY_QUEUE` |
| `src/Pyz/Zed/ProductReviewSearch/ProductReviewSearchConfig.php` | `ProductReviewSearchConfig::PUBLISH_PRODUCT_REVIEW_QUEUE` |
| `src/Pyz/Zed/ProductReviewStorage/ProductReviewStorageConfig.php` | `ProductReviewStorageConfig::PUBLISH_PRODUCT_REVIEW_STORAGE_QUEUE` |
| `src/Pyz/Zed/ProductSearchConfigStorage/ProductSearchConfigStorageConfig.php` | `ProductSearchConfigStorageConfig::PUBLISH_PRODUCT_SEARCH_CONFIG_QUEUE` |
| `src/Pyz/Zed/ProductSetPageSearch/ProductSetPageSearchConfig.php` | `ProductSetPageSearchConfig::PUBLISH_PRODUCT_SET_PAGE_QUEUE` |
| `src/Pyz/Zed/ProductSetStorage/ProductSetStorageConfig.php` | `ProductSetStorageConfig::PUBLISH_PRODUCT_SET_QUEUE` |
| `src/Pyz/Zed/ShoppingListStorage/ShoppingListStorageConfig.php` | `ShoppingListStorageConfig::PUBLISH_SHOPPING_LIST_QUEUE` |
| `src/Pyz/Zed/TaxProductStorage/TaxProductStorageConfig.php` | `TaxProductStorageConfig::PUBLISH_TAX_PRODUCT_QUEUE` |

Each file follows the same pattern:

```php
// Before:
use Spryker\Shared\Publisher\PublisherConfig;

public function getQueueName(): string
{
    return PublisherConfig::PUBLISH_QUEUE;
}

// After (example for CategoryImageStorage):
use Spryker\Shared\CategoryImageStorage\CategoryImageStorageConfig as SprykerSharedCategoryImageStorageConfig;

public function getQueueName(): string
{
    return SprykerSharedCategoryImageStorageConfig::PUBLISH_CATEGORY_IMAGE_QUEUE;
}
```

### 4. Create the new queues in the broker

After completing all configuration changes, run the following command to create the new queues in your message broker:

```bash
vendor/bin/console queue:setup
```

## Related documentation

- [Configure event queues](/docs/dg/dev/backend-development/data-manipulation/event/configure-event-queues.html)
- [Optimizing Jenkins execution with the resource-aware queue worker](/docs/dg/dev/backend-development/cronjobs/optimizing-jenkins-execution.html)
