---
title: Optimize merchant relationship price storage
description: Learn how to reduce the number of merchant relationship price rows and key-value storage keys by storing prices per merchant relationship instead of per company business unit.
last_updated: Oct 21, 2026
template: howto-guide-template
related:
  - title: Merchant Custom Prices feature overview
    link: docs/pbc/all/price-management/latest/base-shop/merchant-custom-prices-feature-overview.html
  - title: Install the Prices per Merchant Relation feature
    link: docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/install-features/install-the-prices-per-merchant-relation-feature.html
  - title: Handle price explosion and ERP-owned pricing in B2B
    link: docs/pbc/all/price-management/latest/base-shop/tutorials-and-howtos/handle-price-explosion-and-erp-owned-pricing-in-b2b.html
  - title: Performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/performance-guidelines.html
---

This document describes how to store [merchant relationship prices](/docs/pbc/all/price-management/latest/base-shop/merchant-custom-prices-feature-overview.html) once per merchant relationship instead of once per company business unit. This reduces the size of the storage tables and the number of keys in the key-value storage (Redis or Valkey).

## The problem

By default, merchant relationship prices are published per store, product, and company business unit. A merchant relationship usually includes many company business units, and all of them get the same prices. As a result, each business unit receives its own copy of the same prices.

For large B2B catalogs, this multiplies the number of rows in the `spy_price_product_abstract_merchant_relationship_storage` and `spy_price_product_concrete_merchant_relationship_storage` tables, and the number of keys in the key-value storage, by the number of business units per merchant relationship. For example, a merchant relationship with 50 business units and 100,000 prices produces 5,000,000 storage rows and keys instead of 100,000.

## When to enable the optimization

- **Enable it** when your merchant relationships include many company business units. The number of storage rows and keys drops by the number of business units per merchant relationship.
- **Skip it** when your project has a one-to-one relation between company business units and merchant relationships, so each merchant relationship includes only one company business unit. In this case, the optimization does not reduce the number of rows and keys, and each price read requires one additional lookup read. You do not need to follow this document.

## How the optimization works

With the optimization enabled, prices are published per store, product, and merchant relationship. An additional lookup key per company business unit maps the business unit to its merchant relationships.

| | Default behavior | Optimized behavior |
|---|---|---|
| One storage row and key per | Store, product, company business unit | Store, product, merchant relationship |
| Storage key example | `price_product_abstract_merchant_relationship:de:205:1` | `price_product_abstract_merchant_relationship:de:205:mr3` |
| Lookup key | None | `mrbu:<idCompanyBusinessUnit>` with the data `{"idmr": [<idMerchantRelationship>, ...]}` |
| Storefront read | One `get()` call per business unit key | One `get()` call for the lookup key, then one `getMulti()` call for the price keys of all merchant relationships of the business unit |

The client reads the prices of all merchant relationships of the business unit and returns one price per merchant relationship, currency, and price type, the same as with the optimization disabled. The price resolver then selects the price to show; by default, it selects the lowest price. The optimization does not change which price a customer sees.

## Prerequisites

Install the [Prices per Merchant Relation feature](/docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/install-features/install-the-prices-per-merchant-relation-feature.html).

## Check the filter plugins

With the optimization enabled, one stored price row serves every business unit of a merchant relationship. Therefore, implementations of `Spryker\Zed\PriceProductMerchantRelationshipStorageExtension\Dependency\Plugin\PriceProductMerchantRelationshipStorageFilterPluginInterface` receive different data:

- `idMerchantRelationship` is set. With the optimization disabled, it is always `null`.
- `idCompanyBusinessUnit` is `null`.

Before you enable the optimization, check the filter plugins registered in `Pyz\Zed\PriceProductMerchantRelationshipStorage\PriceProductMerchantRelationshipStorageDependencyProvider::getPriceProductMerchantRelationshipStorageFilterPlugins()`.

{% info_block warningBox "Filtering by company business unit" %}

A filter plugin that filters prices by company business unit does not work with the optimization enabled, and no error or log message shows it. If the plugin removes a row, all business units of the merchant relationship lose the price. If the plugin keeps the row, all business units get the price.

If your project has such a plugin, do one of the following:

- Keep the optimization disabled.
- Move the filtering rule to the read side, for example, to the client or to a price expander, where the current business unit is known.
- Change the data: remove the business unit from the merchant relationship, or create a separate merchant relationship for the business unit.

{% endinfo_block %}

The core `Spryker\Zed\Merchant\Communication\Plugin\PriceProductMerchantRelationshipStorage\MerchantPriceProductMerchantRelationshipStorageFilterPlugin` plugin is not affected because it filters prices by merchant.

## Install the required packages

```bash
composer update spryker/merchant-relationship-data-import:"^0.2.2" spryker/price-product-merchant-relationship-storage:"^1.23.1" spryker/synchronization:"^1.21.0" spryker/price-product-merchant-relationship-storage-extension:"^1.0.1" spryker/propel:"^3.51.2"
```

## Integrate the optimization

To integrate the optimization, register the lookup resource, enable the optimization, and apply the database changes.

### 1. Register the plugins

To publish and synchronize the `mrbu` lookup resource, register the following plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
|---|---|---|
| MerchantRelationBusinessUnitEventResourceBulkRepositoryPlugin | Allows triggering publish events for the `mrbu` lookup resource. | Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Plugin\Event |
| MerchantRelationBusinessUnitSynchronizationDataBulkPlugin | Allows synchronizing the `mrbu` lookup resource to the key-value storage. | Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/EventBehavior/EventBehaviorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventBehavior;

use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;
use Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Plugin\Event\MerchantRelationBusinessUnitEventResourceBulkRepositoryPlugin;

class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourcePluginInterface>
     */
    protected function getEventTriggerResourcePlugins(): array
    {
        return [
            new MerchantRelationBusinessUnitEventResourceBulkRepositoryPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Plugin\Synchronization\MerchantRelationBusinessUnitSynchronizationDataBulkPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new MerchantRelationBusinessUnitSynchronizationDataBulkPlugin(),
        ];
    }
}
```

### 2. Configure the synchronization pool

If your project uses a synchronization pool, set it for the lookup resource:

**src/Pyz/Zed/PriceProductMerchantRelationshipStorage/PriceProductMerchantRelationshipStorageConfig.php**

```php
<?php

namespace Pyz\Zed\PriceProductMerchantRelationshipStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\PriceProductMerchantRelationshipStorage\PriceProductMerchantRelationshipStorageConfig as SprykerPriceProductMerchantRelationshipStorageConfig;

class PriceProductMerchantRelationshipStorageConfig extends SprykerPriceProductMerchantRelationshipStorageConfig
{
    public function getMerchantRelationBusinessUnitSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

The lookup resource uses the existing `sync.storage.price` queue, and its listener uses the existing merchant relationship event queue. You do not need to configure new queues.

### 3. Enable the optimization

The optimization is controlled by `isMerchantRelationPriceKeyEnabled()`, which returns `false` by default. Both Zed and the client read this value from the shared config, so override it there.

**src/Pyz/Shared/PriceProductMerchantRelationshipStorage/PriceProductMerchantRelationshipStorageConfig.php**

```php
<?php

namespace Pyz\Shared\PriceProductMerchantRelationshipStorage;

use Spryker\Shared\PriceProductMerchantRelationshipStorage\PriceProductMerchantRelationshipStorageConfig as SprykerPriceProductMerchantRelationshipStorageConfig;

class PriceProductMerchantRelationshipStorageConfig extends SprykerPriceProductMerchantRelationshipStorageConfig
{
    public function isMerchantRelationPriceKeyEnabled(): bool
    {
        return true;
    }
}
```

### 4. Apply the database changes

The schema changes are applied only when the optimization is enabled. Apply the database schema changes and generate transfers:

```bash
console transfer:generate
console propel:install
```

These commands make the following changes:

- Add the nullable `fk_merchant_relationship` column and an index to the `spy_price_product_abstract_merchant_relationship_storage` and `spy_price_product_concrete_merchant_relationship_storage` tables.
- Add the `spy_merchant_relation_business_unit_storage` table, which stores one lookup row per company business unit.

For a new project without published merchant relationship prices, this is all you need. For an existing project with published prices, follow [Migrate an existing project](#migrate-an-existing-project).

## Migrate an existing project

After you enable the optimization, the storefront reads only the new keys. Until these keys are published, customers see default prices instead of merchant relationship prices. To avoid this, enable the read fallback during the migration. With the fallback enabled, when the new keys return no prices, the client reads the old business unit key.

{% info_block warningBox "Fallback limitations" %}

Until you complete the cleanup, the fallback can show outdated or incomplete prices:

- For a business unit without published new prices, the client shows the prices from the old key at the moment of the deploy.
- If the prices of some merchant relationships of a business unit are published and others are not, the client shows only the published prices.
- If all merchant relationship prices of a product and business unit are deleted after the deploy, the client shows the old prices until the cleanup.

{% endinfo_block %}

To migrate, follow these steps:

1. Complete the steps in [Integrate the optimization](#integrate-the-optimization).

2. Enable the read fallback:

**src/Pyz/Client/PriceProductMerchantRelationshipStorage/PriceProductMerchantRelationshipStorageConfig.php**

```php
<?php

namespace Pyz\Client\PriceProductMerchantRelationshipStorage;

use Spryker\Client\PriceProductMerchantRelationshipStorage\PriceProductMerchantRelationshipStorageConfig as SprykerPriceProductMerchantRelationshipStorageConfig;

class PriceProductMerchantRelationshipStorageConfig extends SprykerPriceProductMerchantRelationshipStorageConfig
{
    public function isMerchantRelationPriceKeyFallbackEnabled(): bool
    {
        return true;
    }
}
```

3. Deploy the changes and make sure the queue workers are running.

4. Publish the lookup and the prices:

```bash
console publish:trigger-events -r mrbu
console publish:trigger-events -r price_product_abstract_merchant_relationship
console publish:trigger-events -r price_product_concrete_merchant_relationship
```

5. Wait until the publish queues and the `sync.storage.price` queue are empty.

6. Make sure the key-value storage contains the `mrbu:<idCompanyBusinessUnit>` lookup keys and the `...:mr<idMerchantRelationship>` price keys.

7. Remove the old business unit rows and keys as described in [Clean up the old storage data](#clean-up-the-old-storage-data).

8. Remove the `isMerchantRelationPriceKeyFallbackEnabled()` override from the client config and deploy the change. You can do this as part of your next regular deploy.

## Clean up the old storage data

After the migration, the old business unit rows and their keys remain in the database and in the key-value storage. The `price-product-merchant-relationship-storage:cleanup` console command removes the storage rows and keys of the inactive storage format:

- With the optimization enabled, it removes the rows where `fk_merchant_relationship` is `NULL`.
- With the optimization disabled, it removes the rows where `fk_merchant_relationship` is set and all rows of `spy_merchant_relation_business_unit_storage`.

Every deleted row produces one storage delete message. Without direct synchronization, the command sends one message to the `sync.storage.price` queue per deleted row, so millions of deleted rows produce millions of messages. Run the command at low traffic and monitor the queue.

To clean up the old storage data, follow these steps:

1. Register the command temporarily:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Console\PriceProductMerchantRelationshipStorageCleanupConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new PriceProductMerchantRelationshipStorageCleanupConsole(),
        ];
    }
}
```

2. Run the command:

```bash
console price-product-merchant-relationship-storage:cleanup --force
```

| OPTION | DESCRIPTION |
|---|---|
| `--chunk-size=<n>` | Number of rows deleted per commit. Default: `500`. |
| `--force`, `-f` | Skips the confirmation question. Without this option, a non-interactive run deletes nothing and exits with an error code. |

3. Wait until the `sync.storage.price` queue is empty.

4. Remove the command from `ConsoleDependencyProvider`.

## Roll back the optimization

To return to storing prices per company business unit, follow these steps:

1. Remove the `isMerchantRelationPriceKeyEnabled()` override from the shared config, and deploy the change.

2. Republish the prices:

```bash
console publish:trigger-events -r price_product_abstract_merchant_relationship
console publish:trigger-events -r price_product_concrete_merchant_relationship
```

3. Wait until the queues are empty.

4. Run the [cleanup command](#clean-up-the-old-storage-data). With the optimization disabled, it removes the merchant relationship rows and keys and all `mrbu` lookup rows and keys.

## Maintain the lookup

When a company business unit is assigned to or unassigned from a merchant relationship, the lookup is updated automatically. Price changes do not affect the lookup.

A bulk query `delete()` on `spy_merchant_relationship_to_company_business_unit` does not trigger entity events, so the lookup is not updated. Delete assignments one entity at a time, or rebuild the lookup after a bulk delete.

Rebuild the lookup for all business units. To rebuild the lookup of one business unit, add `-i <idCompanyBusinessUnit>`.

```bash
console publish:trigger-events -r mrbu
```

Resend the existing lookup rows to the key-value storage:

```bash
console sync:data mrbu
```
