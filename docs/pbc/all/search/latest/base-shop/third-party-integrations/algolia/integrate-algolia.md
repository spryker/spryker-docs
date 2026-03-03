---
title: Integrate Algolia
description: Learn how to integrate Algolia Search into your Spryker-based projects.
template: howto-guide-template
last_updated: Feb 20, 2026
redirect_from:
  - /docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/configure-algolia.html
  - /docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/disconnect-algolia.html
---

This document explains how to integrate [Algolia](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/algolia.html) with your Spryker shop.

## Prerequisites

Install the required module:

```bash
composer require -W spryker-eco/algolia
```

## Configure Algolia credentials

In `config/Shared/config_default.php` or, for local development, in `config_local.php`, add the following:

```php
use SprykerEco\Shared\Algolia\AlgoliaConstants;

$config[AlgoliaConstants::IS_ACTIVE] = true;
$config[AlgoliaConstants::APPLICATION_ID] = getenv('ALGOLIA_APPLICATION_ID');
$config[AlgoliaConstants::ADMIN_API_KEY] = getenv('ALGOLIA_WRITE_API_KEY');
$config[AlgoliaConstants::SEARCH_ONLY_API_KEY] = getenv('ALGOLIA_SEARCH_API_KEY');
// Optional: use when sharing one Algolia account across multiple environments. Default is "production".
// $config[AlgoliaConstants::TENANT_IDENTIFIER] = 'john';
```

## Integrate Algolia

### 1. Enable the console command

In `src/Pyz/Zed/Console/ConsoleDependencyProvider.php`, register the export console command:

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use SprykerEco\Zed\Algolia\Communication\Console\AlgoliaEntityExportConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            // ... existing commands
            new AlgoliaEntityExportConsole(),
        ];

        return $commands;
    }
}
```

### 2. Configure entity exporter plugins

In `src/Pyz/Zed/Algolia/AlgoliaDependencyProvider.php`, register the entity exporter plugins:

```php
<?php

namespace Pyz\Zed\Algolia;

use SprykerEco\Zed\Algolia\AlgoliaDependencyProvider as SprykerEcoAlgoliaDependencyProvider;
use SprykerEco\Zed\Algolia\Communication\Plugin\Algolia\CmsPageAlgoliaEntityExporterPlugin;
use SprykerEco\Zed\Algolia\Communication\Plugin\Algolia\ProductAlgoliaEntityExporterPlugin;

class AlgoliaDependencyProvider extends SprykerEcoAlgoliaDependencyProvider
{
    /**
     * @return array<\SprykerEco\Zed\Algolia\Dependency\Plugin\AlgoliaEntityExporterPluginInterface>
     */
    protected function getAlgoliaEntityExporterPlugins(): array
    {
        return [
            new ProductAlgoliaEntityExporterPlugin(),
            new CmsPageAlgoliaEntityExporterPlugin(),
        ];
    }
}
```

### 3. Configure the search adapter plugin

In `src/Pyz/Client/Search/SearchDependencyProvider.php`, register the Algolia search adapter:

```php
<?php

namespace Pyz\Client\Search;

use Spryker\Client\Search\SearchDependencyProvider as SprykerSearchDependencyProvider;
use SprykerEco\Client\Algolia\Plugin\Search\AlgoliaSearchAdapterPlugin;

class SearchDependencyProvider extends SprykerSearchDependencyProvider
{
    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\SearchAdapterPluginInterface>
     */
    protected function getClientAdapterPlugins(): array
    {
        return [
            new AlgoliaSearchAdapterPlugin(),
        ];
    }
}
```

### 4. Configure catalog search query plugins

{% info_block infoBox "" %}

This step requires `\Pyz\Shared\Algolia\AlgoliaConfig::isSearchInFrontendEnabledForProducts()` to return `true`.

The integration also depends on SearchHttp module plugins. Make sure they are enabled in `src/Pyz/Client/Catalog/CatalogDependencyProvider.php`.

{% endinfo_block %}

In `src/Pyz/Client/Catalog/CatalogDependencyProvider.php`, register the Algolia search query plugins:

```php
<?php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use SprykerEco\Client\Algolia\Plugin\Search\AlgoliaProductConcreteSearchQueryPlugin;
use SprykerEco\Client\Algolia\Plugin\Search\AlgoliaSearchQueryPlugin;
use SprykerEco\Client\Algolia\Plugin\Search\AlgoliaSuggestionSearchQueryPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface>
     */
    protected function createCatalogSearchQueryPluginVariants(): array
    {
        return [
            new AlgoliaSearchQueryPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface>
     */
    protected function createSuggestionQueryPluginVariants(): array
    {
        return [
            new AlgoliaSuggestionSearchQueryPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface>
     */
    protected function createProductConcreteCatalogSearchQueryPluginVariants(): array
    {
        return [
            new AlgoliaProductConcreteSearchQueryPlugin(),
        ];
    }
}
```

### 5. Configure the CMS page search query plugin

{% info_block infoBox "" %}

This step is optional. It requires `\Pyz\Shared\Algolia\AlgoliaConfig::isSearchInFrontendEnabledForCmsPages()` to return `true`.

The integration also depends on SearchHttp module plugins. Make sure they are enabled in `src/Pyz/Client/SearchHttp/SearchHttpDependencyProvider.php` and `src/Pyz/Client/CmsPageSearch/CmsPageSearchDependencyProvider.php`.

{% endinfo_block %}

In `src/Pyz/Client/CmsPageSearch/CmsPageSearchDependencyProvider.php`, register the Algolia search query plugin for CMS pages:

```php
<?php

namespace Pyz\Client\CmsPageSearch;

use Generated\Shared\Transfer\SearchContextTransfer;
use Spryker\Client\CmsPageSearch\CmsPageSearchConfig;
use Spryker\Client\CmsPageSearch\CmsPageSearchDependencyProvider as SprykerCmsPageSearchDependencyProvider;
use SprykerEco\Client\Algolia\Plugin\Search\AlgoliaSearchQueryPlugin;

class CmsPageSearchDependencyProvider extends SprykerCmsPageSearchDependencyProvider
{
    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface>
     */
    protected function getCmsPageSearchQueryPlugins(): array
    {
        return [
            new AlgoliaSearchQueryPlugin(
                (new SearchContextTransfer())
                    ->setSourceIdentifier(CmsPageSearchConfig::SOURCE_IDENTIFIER_CMS_PAGE),
            ),
        ];
    }
}
```

### 6. Generate transfers

```bash
vendor/bin/console transfer:generate
```

### 7. Verify the installation

```bash
vendor/bin/console | grep algolia
vendor/bin/console algolia:entity-export
```

### 8. Export data to Algolia

```bash
vendor/bin/console algolia:entity-export --all

# Or export specific entity types:
vendor/bin/console algolia:entity-export product
vendor/bin/console algolia:entity-export cms-page
```

For scheduling and additional options, see [Full indexing](#full-indexing).

### 9. Verify data in the Algolia Dashboard

1. Log in to Algolia.
2. In the **Search** section, check the created indexes and the data inside.
3. Run searches from the Algolia Dashboard.
4. Configure index settings like [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/) and [searchable attributes](https://www.algolia.com/doc/guides/managing-results/must-do/searchable-attributes/) as needed.

### 10. Configure real-time synchronization

In `src/Pyz/Zed/Publisher/PublisherDependencyProvider.php`, register the Algolia publisher plugins:

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\CmsPage\AlgoliaCmsPageDeletePublisherPlugin;
use SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\CmsPage\AlgoliaCmsPagePublisherPlugin;
use SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\CmsPage\AlgoliaCmsPageVersionPublisherPlugin;
use SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\Product\AlgoliaProductAbstractPublisherPlugin;
use SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\Product\AlgoliaProductConcreteDeletePublisherPlugin;
use SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\Product\AlgoliaProductConcretePublisherPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    protected function getPublisherPlugins(): array
    {
        return [
            new AlgoliaProductConcretePublisherPlugin(),
            new AlgoliaProductAbstractPublisherPlugin(),
            new AlgoliaProductConcreteDeletePublisherPlugin(),
            new AlgoliaCmsPagePublisherPlugin(),
            new AlgoliaCmsPageVersionPublisherPlugin(),
            new AlgoliaCmsPageDeletePublisherPlugin(),
        ];
    }
}
```

For details on each plugin and its subscribed events, see [Real-time synchronization](#real-time-synchronization).

### 11. Enable search in the frontend and API

{% info_block warningBox "" %}

Make sure you have data in the Algolia indices before enabling search in the frontend. Otherwise, search returns no results.

{% endinfo_block %}

In `src/Pyz/Client/Algolia/AlgoliaConfig.php`, enable product and CMS page search:

```php
<?php

namespace Pyz\Client\Algolia;

use SprykerEco\Client\Algolia\AlgoliaConfig as SprykerEcoAlgoliaConfig;

class AlgoliaConfig extends SprykerEcoAlgoliaConfig
{
    public function isSearchInFrontendEnabledForProducts(): bool
    {
        return true;
    }

    public function isSearchInFrontendEnabledForCmsPages(): bool
    {
        return true;
    }
}
```

## Real-time synchronization

### Product publisher plugins

Product publisher plugins are located in `SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\Product\`.

#### AlgoliaProductConcretePublisherPlugin

Publishes product concrete (variant) data to Algolia when products are created or updated.

**Subscribed events:**
- Product creation and update events
- Product localized attribute changes
- Product image changes
- Product bundle changes (if `ProductBundleStorage` is installed)
- Product price changes (if `PriceProduct` is installed)
- Product search data changes (if `ProductSearch` is installed)

#### AlgoliaProductAbstractPublisherPlugin

Publishes all concrete products of a product abstract when abstract-level data changes.

**Subscribed events:**
- Product abstract updates
- Category assignments
- Product labels
- Reviews
- Images
- Price changes (if `PriceProduct` is installed and enabled in the configuration)

#### AlgoliaProductConcreteDeletePublisherPlugin

Removes deleted products from Algolia indices.

**Subscribed events:**
- `PRODUCT_CONCRETE_UNPUBLISH`
- `ENTITY_SPY_PRODUCT_DELETE`

### CMS page publisher plugins

CMS page publisher plugins are located in `SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\CmsPage\`.

#### AlgoliaCmsPagePublisherPlugin

Publishes CMS page data to Algolia when pages are created or updated.

**Subscribed events:**
- `ENTITY_SPY_CMS_PAGE_UPDATE`

**Behavior:**
- Fetches full CMS page data including the latest version.
- Checks if the page is active and searchable before publishing.
- Extracts locale-specific CMS content.
- Removes pages from all relevant indices if the page is inactive or not searchable.

#### AlgoliaCmsPageVersionPublisherPlugin

Publishes CMS pages when new versions are created or published.

**Subscribed events:**
- `CMS_VERSION_PUBLISH`
- `ENTITY_SPY_CMS_VERSION_CREATE`

## Full indexing

To export entities to Algolia, run the following commands:

```bash
# Export all products
vendor/bin/console algolia:entity:export product

# Export all CMS pages for a specific store
vendor/bin/console algolia:entity:export cms-page --store=DE

# Export for a specific locale
vendor/bin/console algolia:entity:export product --locale=en_US

# Export with a custom chunk size
vendor/bin/console algolia:entity:export product --chunk-size=200
```

### Schedule automatic exports

For periodic full re-indexing, add cron jobs to `config/Zed/cronjobs/jenkins.php`:

```php
/* Algolia - Weekly full export */
$jobs[] = [
    'name' => 'algolia-export-products',
    'command' => $logger . '$PHP_BIN vendor/bin/console algolia:entity:export product',
    'schedule' => '0 2 * * 0',
    'enable' => true,
];

$jobs[] = [
    'name' => 'algolia-export-cms-pages',
    'command' => $logger . '$PHP_BIN vendor/bin/console algolia:entity:export cms-page',
    'schedule' => '30 2 * * 0',
    'enable' => true,
];
```

- `0 2 * * 0`: runs at 2:00 AM every Sunday.
- `30 2 * * 0`: runs at 2:30 AM every Sunday.

{% info_block infoBox "" %}

Cron jobs complement the real-time publisher plugins. The publisher plugins handle incremental updates, while the cron jobs ensure full data consistency by performing periodic complete exports.

{% endinfo_block %}

## Configuration

### Available configuration methods

**Product events:**
- `getProductConcreteSubscribedEvents()`: product variant events.
- `getProductAbstractSubscribedEvents()`: product abstract events.
- `getProductConcreteUnpublishSubscribedEvents()`: delete events.

**CMS page events:**
- `getCmsPageUpdateSubscribedEvents()`: page update events.
- `getCmsPageVersionPublishSubscribedEvents()`: version publish events.

**Search:**
- `isSearchInFrontendEnabledForProducts()`: enables product search in the frontend.
- `isSearchInFrontendEnabledForCmsPages()`: enables CMS page search in the frontend.

**Insights, analytics, and personalization:**
- `getIsPersonalizationEnabled()`: enables or disables Algolia Personalization. This feature requires a premium Algolia plan.
- `getProjectMappingFacets()`: maps facet names for Algolia Insights event tracking.

### Default event subscriptions

All publisher plugins get their subscribed events from `AlgoliaConfig`. The configuration automatically includes events from optional modules if they are installed:

**Products:**
- All product abstract and product concrete events.
- `ProductBundle`: bundle events (if the module is installed).
- `PriceProduct`: price events (if the module is installed).
- `ProductLabel`: label events (if the module is installed).
- `ProductReview`: review events (if the module is installed).

**CMS pages:**
- CMS: all CMS page and version events.

### Customize event subscriptions

To customize events, extend `AlgoliaConfig` in your project:

```php
<?php

namespace Pyz\Zed\Algolia;

use SprykerEco\Zed\Algolia\AlgoliaConfig as SprykerEcoAlgoliaConfig;

class AlgoliaConfig extends SprykerEcoAlgoliaConfig
{
    public function getProductConcreteSubscribedEvents(): array
    {
        // Override all events
        return [
            'Product.product_concrete.publish',
            'Entity.spy_product.update',
        ];
    }

    public function getCmsPageUpdateSubscribedEvents(): array
    {
        // Extend parent events
        $events = parent::getCmsPageUpdateSubscribedEvents();
        $events[] = 'YourCustom.custom_event';

        return $events;
    }

    public function getDefaultExportChunkSize(): int
    {
        return 500;
    }
}
```

## Custom entity index mapping

The Algolia module supports searching custom entities that are already indexed in Algolia but are not natively supported by the module—like products or CMS pages. This lets you integrate any custom entity search without creating new plugins or modules.

Use entity-to-index mapping when you want to search custom entities—like documents, manufacturers, or locations—that are already indexed in Algolia, without creating custom publisher plugins for read-only search.

See details in the ["Using Algolia search with custom indexes"](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/algolia-search-by-custom-entity-index.html) guide.


## Integrate frontend

To enable CMS page search on the frontend, update `spryker-shop/cms-search-page` to version 1.5 or higher.

If your project is based on an older version than `{{page.release_tag}}`, adjust your Search CMS page templates to the latest changes from Spryker's demo shops:

- [B2C changes](https://github.com/spryker-shop/b2c-demo-shop/pull/793/files)
- [B2C Marketplace changes](https://github.com/spryker-shop/b2c-demo-marketplace/pull/668/files)
- [B2B changes](https://github.com/spryker-shop/b2b-demo-shop/pull/832/files)
- [B2B Marketplace changes](https://github.com/spryker-shop/b2b-demo-marketplace/pull/732/files)

## Verify the integration

{% info_block warningBox "" %}

Verify the following:
- Product and CMS page data are synchronized from your Spryker site to Algolia.
- The frontend displays results from Algolia:
  - On Yves: `/search/suggestion?q=ca` (search box suggestions widget), `/search?q=` (catalog page), `/search/cms?q=` (CMS pages list)
  - Via Glue API: `/catalog-search?q=`, `/catalog-search-suggestions?q=sams`, `/cms-pages?q=`
- In Algolia Dashboard, select the index for product or CMS page for the relevant store and locale. Check the number and order of records for the same search term on your Spryker site.
- In Algolia API logs for the selected index, make sure there is a user-agent header similar to `"Algolia for PHP (3.4.1); PHP (8.3.13); Guzzle (7); Spryker Eco Algolia module"`.

{% endinfo_block %}

## Migrate from the ACP Algolia app

If you are migrating from the MessageBroker-based [Algolia ACP App](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/algolia.html):

{% info_block infoBox "" %}

The data synchronization logic remains the same. To avoid re-synchronizing all data to Algolia, set `TENANT_IDENTIFIER` to match the ACP tenant ID:

```php
$config[AlgoliaConstants::TENANT_IDENTIFIER] = getenv('SPRYKER_TENANT_IDENTIFIER'); // tenant-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx
```

{% endinfo_block %}

### 1. Remove old ACP plugins and configuration

**1a. Update `src/Pyz/Zed/Publisher/PublisherDependencyProvider.php`**

Remove the following imports and their usages:

```php
use Spryker\Zed\Cms\Communication\Plugin\Publisher\CmsPageUpdateMessageBrokerPublisherPlugin;
use Spryker\Zed\Cms\Communication\Plugin\Publisher\CmsPageVersionPublishedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductAbstractUpdatedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductConcreteCreatedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductConcreteDeletedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductConcreteExportedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductConcreteUpdatedMessageBrokerPublisherPlugin;
```

Also remove the methods that register them—such as `getProductMessageBrokerPlugins()` and `getCmsPageMessageBrokerPlugins()`—and their calls from `getPublisherPlugins()`.

{% info_block infoBox "" %}

Keep `ProductCategoryProductUpdatedEventTriggerPlugin` and `ProductLabelProductUpdatedEventTriggerPlugin`. These are not ACP-specific and must remain. Re-register them under the new Algolia plugins method in step 2.

{% endinfo_block %}

**1b. Update `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`**

Remove the following imports and plugin instantiations:

```php
use Spryker\Zed\Cms\Communication\Plugin\MessageBroker\CmsPageMessageHandlerPlugin;
use Spryker\Zed\Product\Communication\Plugin\MessageBroker\ProductExportMessageHandlerPlugin;
use Spryker\Zed\SearchHttp\Communication\Plugin\MessageBroker\SearchEndpointMessageHandlerPlugin;
```

**1c. Update `config/Shared/config_default.php`**

Disable product publishing via MessageBroker:

```php
// Before:
$config[ProductConstants::PUBLISHING_TO_MESSAGE_BROKER_ENABLED] = $config[MessageBrokerConstants::IS_ENABLED];

// After:
$config[ProductConstants::PUBLISHING_TO_MESSAGE_BROKER_ENABLED] = false;
```

At the end of the file, add the Algolia configuration:

```php
use SprykerEco\Shared\Algolia\AlgoliaConstants;

$config[AlgoliaConstants::APPLICATION_ID] = getenv('ALGOLIA_APPLICATION_ID');
$config[AlgoliaConstants::ADMIN_API_KEY] = getenv('ALGOLIA_WRITE_API_KEY');
$config[AlgoliaConstants::SEARCH_ONLY_API_KEY] = getenv('ALGOLIA_SEARCH_API_KEY');
$config[AlgoliaConstants::IS_ACTIVE] = $config[AlgoliaConstants::APPLICATION_ID] && $config[AlgoliaConstants::ADMIN_API_KEY] && $config[AlgoliaConstants::SEARCH_ONLY_API_KEY];
$config[AlgoliaConstants::TENANT_IDENTIFIER] = getenv('SPRYKER_TENANT_IDENTIFIER');
```

**1d. Update `src/Pyz/Client/Search/SearchDependencyProvider.php`**

Replace `SearchHttpSearchAdapterPlugin` with `AlgoliaSearchAdapterPlugin` and remove `SearchHttpSearchContextExpanderPlugin`:

```php
// Remove:
use Spryker\Client\SearchHttp\Plugin\Search\SearchHttpSearchAdapterPlugin;
use Spryker\Client\SearchHttp\Plugin\Search\SearchHttpSearchContextExpanderPlugin;

// Add:
use SprykerEco\Client\Algolia\Plugin\Search\AlgoliaSearchAdapterPlugin;
```

In `getClientAdapterPlugins()`, replace `new SearchHttpSearchAdapterPlugin()` with `new AlgoliaSearchAdapterPlugin()`.

In `getSearchContextExpanderPlugins()`, remove `new SearchHttpSearchContextExpanderPlugin()`.

**1e. Update `src/Pyz/Client/Catalog/CatalogDependencyProvider.php`**

Replace SearchHttp query plugins with Algolia equivalents:

```php
// Remove:
use Spryker\Client\SearchHttp\Plugin\Catalog\Query\ProductConcreteSearchHttpQueryPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\Query\SearchHttpQueryPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\Query\SuggestionSearchHttpQueryPlugin;

// Add:
use SprykerEco\Client\Algolia\Plugin\Search\AlgoliaProductConcreteSearchQueryPlugin;
use SprykerEco\Client\Algolia\Plugin\Search\AlgoliaSearchQueryPlugin;
use SprykerEco\Client\Algolia\Plugin\Search\AlgoliaSuggestionSearchQueryPlugin;
```

Replace plugin instantiations:
- In `createCatalogSearchQueryPluginVariants()`: replace `SearchHttpQueryPlugin` with `AlgoliaSearchQueryPlugin`.
- In `createSuggestionQueryPluginVariants()`: replace `SuggestionSearchHttpQueryPlugin` with `AlgoliaSuggestionSearchQueryPlugin`.
- In `createProductConcreteCatalogSearchQueryPluginVariants()`: replace `ProductConcreteSearchHttpQueryPlugin` with `AlgoliaProductConcreteSearchQueryPlugin`.

**1f. Update `src/Pyz/Client/CmsPageSearch/CmsPageSearchDependencyProvider.php`**

```php
// Remove:
use Spryker\Client\SearchHttp\Plugin\Catalog\Query\SearchHttpQueryPlugin;

// Add:
use SprykerEco\Client\Algolia\Plugin\Search\AlgoliaSearchQueryPlugin;
```

In `getCmsPageSearchQueryPlugins()`, replace `new SearchHttpQueryPlugin(...)` with `new AlgoliaSearchQueryPlugin(...)`.

### 2. Add new Algolia integration

**2a. Register the console export command**

In `src/Pyz/Zed/Console/ConsoleDependencyProvider.php`:

```php
use SprykerEco\Zed\Algolia\Communication\Console\AlgoliaEntityExportConsole;

// In getConsoleCommands():
new AlgoliaEntityExportConsole(),
```

**2b. Create `src/Pyz/Zed/Algolia/AlgoliaDependencyProvider.php`**

```php
<?php

namespace Pyz\Zed\Algolia;

use SprykerEco\Zed\Algolia\AlgoliaDependencyProvider as SprykerEcoAlgoliaDependencyProvider;
use SprykerEco\Zed\Algolia\Communication\Plugin\Algolia\CmsPageAlgoliaEntityExporterPlugin;
use SprykerEco\Zed\Algolia\Communication\Plugin\Algolia\ProductAlgoliaEntityExporterPlugin;

class AlgoliaDependencyProvider extends SprykerEcoAlgoliaDependencyProvider
{
    /**
     * @return array<\SprykerEco\Zed\Algolia\Dependency\Plugin\AlgoliaEntityExporterPluginInterface>
     */
    protected function getAlgoliaEntityExporterPlugins(): array
    {
        return [
            new ProductAlgoliaEntityExporterPlugin(),
            new CmsPageAlgoliaEntityExporterPlugin(),
        ];
    }
}
```

**2c. Register real-time publisher plugins**

In `src/Pyz/Zed/Publisher/PublisherDependencyProvider.php`, add a new `getAlgoliaPlugins()` method and call it from `getPublisherPlugins()`:

```php
use SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\CmsPage\AlgoliaCmsPagePublisherPlugin;
use SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\CmsPage\AlgoliaCmsPageVersionPublisherPlugin;
use SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\Product\AlgoliaProductAbstractPublisherPlugin;
use SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\Product\AlgoliaProductConcreteDeletePublisherPlugin;
use SprykerEco\Zed\Algolia\Communication\Plugin\Publisher\Product\AlgoliaProductConcretePublisherPlugin;

// ...

protected function getAlgoliaPlugins(): array
{
    return [
        new AlgoliaCmsPagePublisherPlugin(),
        new AlgoliaCmsPageVersionPublisherPlugin(),
        new AlgoliaProductAbstractPublisherPlugin(),
        new AlgoliaProductConcretePublisherPlugin(),
        new AlgoliaProductConcreteDeletePublisherPlugin(),
        new ProductCategoryProductUpdatedEventTriggerPlugin(),
        new ProductLabelProductUpdatedEventTriggerPlugin(),
    ];
}
```

**2d. Enable frontend search**

Create `src/Pyz/Client/Algolia/AlgoliaConfig.php`:

```php
<?php

namespace Pyz\Client\Algolia;

use SprykerEco\Client\Algolia\AlgoliaConfig as SprykerEcoAlgoliaConfig;

class AlgoliaConfig extends SprykerEcoAlgoliaConfig
{
    public function isSearchInFrontendEnabledForProducts(): bool
    {
        return true;
    }

    public function isSearchInFrontendEnabledForCmsPages(): bool
    {
        return true;
    }
}
```

**2e. Generate transfers**

```bash
vendor/bin/console transfer:generate
```

### 3. Export data and verify

- No data schema migration is needed—the data structure is the same as the ACP app.
- To reuse existing Algolia indices and avoid re-indexing, set `TENANT_IDENTIFIER` to match the ACP tenant ID.

Use the following command for the full export to re-populate Algolia indices (if needed):

```bash
vendor/bin/console algolia:entity-export --all
```
  
- Test a product update in the Back Office and verify the change appears in Algolia.
- Test a CMS page publish in the Back Office and verify the change appears in Algolia.

## Troubleshooting

### No entity types are available in console algolia:entity-export

**Problem:** `No entity exporters are registered`

**Solution:**
1. Make sure plugins are registered in `AlgoliaDependencyProvider::getAlgoliaEntityExporterPlugins()`.
2. Check that the dependency provider is in the `Pyz` namespace if extended.

### Transfer not found

**Problem:** `Class 'Generated\Shared\Transfer\AlgoliaExportCriteriaTransfer' not found`

**Solution:**

```bash
vendor/bin/console transfer:generate
```

### Events are not triggering

**Problem:** Changes are not appearing in Algolia.

**Solution:**
1. Check that `AlgoliaConfig::getIsActive()` returns `true`.
2. Verify publisher plugins are registered in `PublisherDependencyProvider`.
3. Check that queue workers are running:

   ```bash
   vendor/bin/console queue:task:start publish
   ```

### Search requests are failing

**Problem:** Search queries return errors or no results.

**Solution:**
1. Verify that Algolia credentials in the configuration are correct.
2. Make sure indices exist in the Algolia Dashboard.
3. If you are not using an Algolia premium plan, disable personalization by setting `getIsPersonalizationEnabled()` to return `false`.
