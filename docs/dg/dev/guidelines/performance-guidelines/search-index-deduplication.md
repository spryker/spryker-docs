---
title: Search index deduplication
description: Learn how to reduce search index size and improve Publish and Sync performance by removing product concrete documents from OpenSearch or Elasticsearch.
last_updated: Jun 1, 2026
template: concept-topic-template
related:
  - title: Search performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/search-performance-guidelines.html
  - title: General performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html
---

## Overview

By default, Spryker indexes both `product_abstract` and `product_concrete` documents into the search index. The index is partitioned by store and locale, which causes a multiplicative increase in the number of indexed documents. Not all projects use the full capabilities of the product concrete search, which means this indexing can result in unnecessary index growth without benefits.

This guide describes how to remove `product_concrete` documents from OpenSearch or Elasticsearch to reduce the search index size and improve Publish and Sync (P&S) performance.

## Full migration

Full migration is the safest option and restores equivalent behavior using key-value storage instead of the search index. All steps preserve the previous behavior while the transition is in progress — no downtime is required.

If you do not use all product concrete search features, you can skip steps that do not apply to your setup. See [Specific use cases](#specific-use-cases) to identify which steps are required for your project.

### Step 1: Install the required packages

```bash
composer update spryker/catalog:"^5.13.0" spryker/catalog-extension:"^1.2.0" spryker/product-page-search:"^3.48.0" spryker/product-storage:"^1.52.0" spryker-shop/configurable-bundle-page:"^1.4.0"
```

### Step 2: Enable product concrete search in storage

Add the following configuration to `config/Shared/config_default.php`:

```php
$config[ProductPageSearchConstants::PRODUCT_CONCRETE_SEARCH_IN_STORAGE_ENABLED] = true;
```

### Step 3: Update the catalog query expander plugins

In `src/Pyz/Client/Catalog/CatalogDependencyProvider.php`, add `ProductListSearchProductListQueryExpanderPlugin` to the `createCatalogSearchQueryExpanderPlugins()` method:

```php
protected function createCatalogSearchQueryExpanderPlugins(): array
{
    return [
        // existing plugins
        new ProductListSearchProductListQueryExpanderPlugin(),
    ];
}
```

### Step 4: Add the product concrete suggestion enricher plugins

In `src/Pyz/Client/Catalog/CatalogDependencyProvider.php`, add the following method:

```php
/**
 * @return array<\Spryker\Client\CatalogExtension\Dependency\Plugin\ProductConcreteSuggestionEnricherPluginInterface>
 */
protected function getProductConcreteSuggestionEnricherPlugins(): array
{
    return [
        new ProductConcreteSuggestionEnricherPlugin(),
    ];
}
```

### Step 5: Add the product concrete storage search plugins

In `src/Pyz/Client/Catalog/CatalogDependencyProvider.php`, add the following method:

```php
/**
 * @return array<\Spryker\Client\CatalogExtension\Dependency\Plugin\ProductConcreteStorageSearchPluginInterface>
 */
protected function getProductConcreteStorageSearchPlugins(): array
{
    return [
        new ProductConcreteStorageSearchPlugin(),
    ];
}
```

### Step 6: Enable the cleanup console command (optional)

This command is needed if your project already has some data in the product concrete search index, and you want to clean it up.

In `src/Pyz/Zed/Console/ConsoleDependencyProvider.php`, add `ProductConcretePageSearchCleanupConsole` to the `getConsoleCommands()` method:

```php
protected function getConsoleCommands(Container $container): array
{
    $commands = [
        // existing commands
        new ProductConcretePageSearchCleanupConsole(),
    ];

    return $commands;
}
```

At this point, the project is fully compatible with the previous behavior. Data still exists in the search index. After verifying that the behavior is correct, clean up the search index data.

### Step 7: Clean up search index data (optional)

```bash
vendor/bin/console product-concrete-page-search:cleanup [options]
```

| Option | Required | Default | Description |
|---|---|---|---|
| `--limit` | No | (all) | Maximum number of concrete products to process. Omit to process everything. |
| `--offset` | No | 0 | Starting position — skip this many products from the beginning. Useful for resuming an interrupted run. |

{% info_block infoBox "Info" %}

- The command displays a progress bar with time and memory estimates during execution.
- On completion, it prints a summary of the number of processed items and peak memory usage.
- The command is safe to re-run. Unpublishing an already-absent index entry is a no-op.

{% endinfo_block %}

## Specific use cases

The full migration is the safest option, but you can skip steps that are not relevant to your setup. In all cases, complete steps 1, 2, 6, and 7. The following sections describe which additional steps to apply for each feature.

### Quick order and quick add to cart

If your project uses the [Quick Add to Cart](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/quick-add-to-cart-feature-overview.html) feature, complete step 5.

### Catalog search suggestions via the Glue API

If you use the Glue API endpoint `{domain}/catalog-search-suggestions?q={sku}` and expect product concrete SKUs in the completion response, complete step 4.

Expected response after migration:

```json
{
    "data": [
        {
            "id": null,
            "type": "catalog-search-suggestions",
            "attributes": {
                "catalogSearchSuggestionId": "catalog-search-suggestions",
                "completion": [
                    "{product_concrete_sku}"
                ]
            }
        }
    ]
}
```

### Configurable Bundle with Product Lists

If you use the [Configurable Bundle](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/configurable-bundle-feature-overview.html) feature together with [Product Lists](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-lists-feature-overview.html) — for example, when using the `/en/configurable-bundle/configurator/template-selection` page — complete steps 3 and 4.

## Expected benefits

### Faster Publish and Sync and less index churn

Removing `product_concrete` documents from the search index produces the following results:

- Faster P&S execution
- Fewer entities to export, transform, and bulk-index
- Less refresh and merge pressure on OpenSearch or Elasticsearch
- Less nested-document overhead, since each root document can spawn multiple Lucene nested documents

### Smaller OpenSearch footprint

Reducing the number of indexed documents can lower the following:

- Required EBS storage
- IOPS and throughput needs for writes and merges
- Heap pressure from segments and caches
- Operational risk during reindexing windows

## Related guides

- [Search performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/search-performance-guidelines.html)
- [Performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines.html)
