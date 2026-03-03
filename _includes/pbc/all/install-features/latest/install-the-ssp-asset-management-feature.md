This document describes how to install the Self-Service Portal (SSP) Asset Management feature.

{% info_block warningBox "Install all SSP features" %}

For the Self-Service Portal to work correctly, you must install all SSP features. Each feature depends on the others for proper functionality.

{% endinfo_block %}

## Features SSP Asset Management depends on

- [Install the SSP Dashboard Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-dashboard-management-feature.html)
- [Install the SSP File Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-file-management-feature.html)
- [Install the SSP Inquiry Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-inquiry-management-feature.html)
- [Install the SSP Model Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-model-management-feature.html)
- [Install the SSP Service Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-service-management-feature.html)
- [Install the Asset-Based Catalog feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-asset-based-catalog-feature.html)

## Prerequisites

| FEATURE         | VERSION  | INSTALLATION GUIDE  |
|--------------|----------| ------------------ |
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                        |
| Self-Service Portal | {{page.release_tag}} | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)          |

## Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/self-service-portal:"^{{page.release_tag}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following packages are now listed in `composer.lock`:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Set up configuration

| CONFIGURATION                                              | SPECIFICATION                                                                                                                                                                                                                                                  | NAMESPACE                               |
|------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| FileSystemConstants::FILESYSTEM_SERVICE                    | Defines the Flysystem service configuration for handling asset file storage. This configuration specifies the adapter, such as local or S3, and the root path for storing asset files, ensuring they're managed securely and efficiently.                      | Spryker\Shared\FileSystem               |
| SelfServicePortalConstants::BASE_URL_YVES                  | Specifies the base URL for the Yves frontend. This URL is used to generate absolute links to asset-related pages on the Storefront, ensuring correct navigation and resource loading.                                                                          | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConstants::ASSET_STORAGE_NAME             | Defines the unique identifier for the Flysystem storage instance used for SSP assets. This name links the asset management feature to the specific filesystem configuration defined in `FileSystemConstants::FILESYSTEM_SERVICE`.                              | SprykerFeature\Zed\SelfServicePortal    |
| SelfServicePortalConstants::DEFAULT_FILE_MAX_SIZE          | Defines the default file max size per file upload during ssp asset creation and update.                                                                                                                                                                        | SprykerFeature\Zed\SelfServicePortal    |
| KernelConstants::CORE_NAMESPACES                           | Defines the core namespaces.                                                                                                                                                                                                                                   | Spryker\Shared\Kerne                    |
| SelfServicePortalConfig::getAssetStatusClassMap()          | Defines a map that associates asset status values, such as `pending` or `approved`, with their corresponding CSS class names. This is used in the Back Office and Storefront to visually represent the status of each asset, for example, with colored labels. | SprykerFeature\Zed\SelfServicePortal    |
| SelfServicePortalConfig::QUEUE_NAME_SYNC_STORAGE_SSP_ASSET | Defines queue name as used for processing SSP asset storage messages.                                                                                                                                                                                          | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConfig::QUEUE_NAME_SYNC_SEARCH_SSP_ASSET  | Defines queue name as used for processing ssp asset search synchronization.                                                                                                                                                                                    | SprykerFeature\Shared\SelfServicePortal |

**config/Shared/config_default.php**

```php
use Spryker\Shared\FileSystem\FileSystemConstants;
use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConstants;
use Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\Aws3v3FilesystemBuilderPlugin;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'ssp-asset-image' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'key' => getenv('SPRYKER_S3_SSP_ASSETS_KEY') ?: '',
        'secret' => getenv('SPRYKER_S3_SSP_ASSETS_SECRET') ?: '',
        'bucket' => getenv('SPRYKER_S3_SSP_ASSETS_BUCKET') ?: '',
        'region' => getenv('AWS_REGION') ?: '',
        'version' => 'latest',
        'root' => '/ssp-asset-image',
        'path' => '',
    ],
];

$config[SelfServicePortalConstants::BASE_URL_YVES] = 'https://your-yves-url';
$config[SelfServicePortalConstants::ASSET_STORAGE_NAME] = 'ssp-asset-image';
$config[SelfServicePortalConstants::DEFAULT_FILE_MAX_SIZE] = getenv('SPRYKER_SSP_DEFAULT_FILE_MAX_SIZE') ?: '10M';

$config[KernelConstants::CORE_NAMESPACES] = [
    ...
    'SprykerFeature',
];
```

{% info_block infoBox "Cloud environment variables" %}

In cloud environments, set the following environment variables:

- `SPRYKER_S3_SSP_ASSETS_KEY` - AWS S3 access key for SSP assets storage
- `SPRYKER_S3_SSP_ASSETS_SECRET` - AWS S3 secret key for SSP assets storage
- `SPRYKER_S3_SSP_ASSETS_BUCKET` - AWS S3 bucket name for SSP assets storage
- `AWS_REGION` - AWS region
- `SPRYKER_SSP_DEFAULT_FILE_MAX_SIZE` - Maximum file size for SSP asset uploads (defaults to `10M` if not set)

{% endinfo_block %}

**src/Pyz/Zed/SelfServicePortal/SelfServicePortalConfig.php**

```php
<?php

namespace Pyz\Zed\SelfServicePortal;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalConfig as SprykerSelfServicePortalConfig;

class SelfServicePortalConfig extends SprykerSelfServicePortalConfig
{
    /**
     * @return array<string>
     */
    public function getAssetStatusClassMap(): array
    {
        return [
            'pending' => 'label-warning',
            'in_review' => 'label-primary',
            'approved' => 'label-success',
            'deactivated' => 'label-danger',
        ];
    }


    /**
     * @return string|null
     */
    public function getSspAssetSearchSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

## Configure synchronization queues

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConfig;
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            SelfServicePortalConfig::QUEUE_NAME_SYNC_STORAGE_SSP_ASSET,
            SelfServicePortalConfig::QUEUE_NAME_SYNC_SEARCH_SSP_ASSET,
        ];
    }
}
```


**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;
use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConfig;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array 
    {
        return [  
            SelfServicePortalConfig::QUEUE_NAME_SYNC_STORAGE_SSP_ASSET => new SynchronizationStorageQueueMessageProcessorPlugin(),
            SelfServicePortalConfig::QUEUE_NAME_SYNC_SEARCH_SSP_ASSET => new SynchronizationSearchQueueMessageProcessorPlugin(),
        ];
    }
}
```

Set up the queue infrastructure:

```bash
vendor/bin/console queue:setup
```

{% info_block warningBox "Verification" %}
Make sure that, in the RabbitMQ management interface, the following queues are available:
- `sync.search.ssp_asset`
- `sync.search.ssp_asset.error`
- `sync.storage.ssp_asset`
- `sync.storage.ssp_asset.error`
{% endinfo_block %}

## Configure ElasticSearch supported source indexes

**src/Pyz/Shared/SearchElasticsearch/SearchElasticsearchConfig.php**

```php
<?php

namespace Pyz\Shared\SearchElasticsearch;

use Spryker\Shared\SearchElasticsearch\SearchElasticsearchConfig as SprykerSearchElasticsearchConfig;

class SearchElasticsearchConfig extends SprykerSearchElasticsearchConfig
{
    /**
     * @var array<string>
     */
    protected const SUPPORTED_SOURCE_IDENTIFIERS = [
        'ssp_asset',
    ];
}
```

**src/Pyz/Zed/SearchElasticsearch/SearchElasticsearchConfig.php**

```php
<?php

namespace Pyz\Zed\SearchElasticsearch;

use Spryker\Zed\SearchElasticsearch\SearchElasticsearchConfig as SprykerSearchElasticsearchConfig;


class SearchElasticsearchConfig extends SprykerSearchElasticsearchConfig
{
    /**
     * @return array<string>
     */
    public function getJsonSchemaDefinitionDirectories(): array
    {
        $directories = parent::getJsonSchemaDefinitionDirectories();

        $directory = sprintf('%s/vendor/spryker-feature/*/src/*/Shared/*/Schema/', APPLICATION_ROOT_DIR);
        if (glob($directory, GLOB_NOSORT | GLOB_ONLYDIR)) {
            $directories[] = $directory;
        }

        $directories[] = sprintf('%s/src/Pyz/Shared/*/Schema/', APPLICATION_ROOT_DIR);

        return $directories;
    }
}
```

**src/Pyz/Client/SelfServicePortal/SelfServicePortalDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SelfServicePortal;

use SprykerFeature\Client\SelfServicePortal\Plugin\Elasticsearch\Query\SspAssetSearchQueryExpanderPlugin;
use SprykerFeature\Client\SelfServicePortal\Plugin\Elasticsearch\ResultFormatter\SspAssetSearchResultFormatterPlugin;
use SprykerFeature\Client\SelfServicePortal\SelfServicePortalDependencyProvider as SprykerSelfServicePortalDependencyProvider;

class SelfServicePortalDependencyProvider extends SprykerSelfServicePortalDependencyProvider
{
    /**
     * @return list<\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface>
     */
    protected function getSspAssetSearchResultFormatterPlugins(): array
    {
        return [
            new SspAssetSearchResultFormatterPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function getSspAssetSearchQueryExpanderPlugins(): array
    {
        return [
            new SspAssetSearchQueryExpanderPlugin(),
        ];
    }
}

```

## Configure the event triggering for the Asset entity

**src/Pyz/Zed/SelfServicePortal/Persistence/Propel/Schema/spy_ssp_asset.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\SelfServicePortal\Persistence" package="src.Orm.Zed.SelfServicePortal.Persistence">

    <table name="spy_ssp_asset">
        <behavior name="event">
            <parameter name="spy_ssp_asset_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_ssp_asset_to_company_business_unit">
        <behavior name="event">
            <parameter name="spy_ssp_asset_to_company_business_unit_all" column="*"/>
        </behavior>
    </table>

</database>
```

## Set up database schema

Apply schema updates:

```bash
console propel:install
```

{% info_block warningBox "Verification" %}
Make sure the following tables have been created in the database:

- `spy_ssp_asset`
- `spy_ssp_asset_file`
- `spy_ssp_asset_to_company_business_unit`
- `spy_sales_order_item_ssp_asset`
- `spy_ssp_asset_storage`
- `spy_ssp_asset_search`

{% endinfo_block %}

## Set up transfer objects

Generate transfer classes:

```bash
console transfer:generate
```

## Configure navigation

Add the `Assets` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
   <ssp>
      <label>Customer Portal</label>
      <title>Customer Portal</title>
      <icon>fa-id-badge</icon>
      <pages>
         <self-service-portal-asset>
            <label>Assets</label>
            <title>Assets</title>
            <bundle>self-service-portal</bundle>
            <controller>list-asset</controller>
            <action>index</action>
         </self-service-portal-asset>
      </pages>
   </ssp>
</config>
```

Generate routers and navigation cache:

```bash
console router:cache:warm-up:backoffice
console navigation:build-cache 
```

{% info_block warningBox "Verification" %}

Make sure that, in the Back Office, the **Customer portal** > **Assets** section is available.

{% endinfo_block %}

## Set up behavior

| PLUGIN                                                      | SPECIFICATION                                                                                           | PREREQUISITES | NAMESPACE                                                                                 |
|-------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------|
| ViewCompanySspAssetPermissionPlugin                         | Grants permission to view assets of an entire company.                                                  |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                                 |
| ViewBusinessUnitSspAssetPermissionPlugin                    | Grants permission to view assets within the user's business unit.                                       |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                                 |
| CreateSspAssetPermissionPlugin                              | Grants permission to create assets.                                                                     |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                                 |
| UpdateSspAssetPermissionPlugin                              | Grants permission to update assets.                                                                     |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                                 |
| UnassignSspAssetPermissionPlugin                            | Grants permission to unassign assets from business units.                                               |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                                 |
| SelfServicePortalPageRouteProviderPlugin                    | Provides routes for the SSP asset management pages on the Storefront.                                   |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Router                                       |
| FileSizeFormatterTwigPlugin                                 | Adds a Twig filter to format file sizes into a human-readable format.                                   |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Twig                                         |
| SspAssetPreAddToCartPlugin                                  | When a product is added to cart, maps the asset reference from the request to the item transfer object. |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                                     |
| SspAssetItemExpanderPlugin                                  | Expands cart items with asset data.                                                                     |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart                            |
| SspAssetOrderExpanderPlugin                                 | Expands an order with asset data for all its items.                                                     |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                           |
| SspAssetOrderItemsPostSavePlugin                            | After an order is placed, saves the relations between order items and assets.                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                           |
| SspAssetOrderItemExpanderPlugin                             | Expands individual order items with asset data.                                                         |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                           |
| SspAssetPublisherTriggerPlugin                              | Retrieves SSP assets by offset and limit.                                                               |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher                       |
| SspAssetQueryExpanderPlugin                                 | Expands search query with asset-specific product filtering based on SSP asset reference.                |               | SprykerFeature\Client\SelfServicePortal\Plugin\Catalog                                    |
| SspAssetWritePublisherPlugin                                | Publishes SSP asset data by `SpySspAsset` entity events to the storage.                                 |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search       |
| SspAssetToCompanyBusinessUnitWritePublisherPlugin           | Publishes SSP asset data by `SpySspAssetToCompanyBusinessUnit` entity events to the storage.            |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search       |
| SspAssetWritePublisherPlugin                                | Publishes SSP asset data by `SpySspAsset` entity events to the search engine.                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage      |
| SearchSspAssetToCompanyBusinessUnitWritePublisherPlugin     | Publishes SSP asset data by `SpySspAssetToCompanyBusinessUnit` entity events to the search engine.      |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage      |
| SspAssetListSynchronizationDataBulkRepositoryPlugin         | Retrieves SSP assets by offset and limit for synchronization to a storage.                              |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Synchronization\Storage         |
| SearchSspAssetListSynchronizationDataBulkRepositoryPlugin   | Retrieves SSP assets by offset and limit for synchronization to a search engine.                        |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Synchronization\SspAsset\Search |

**src/Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\CreateSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\UnassignSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\UpdateSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewBusinessUnitSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanySspAssetPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            new ViewCompanySspAssetPermissionPlugin(),
            new ViewBusinessUnitSspAssetPermissionPlugin(),
            new UpdateSspAssetPermissionPlugin(),
            new UnassignSspAssetPermissionPlugin(),
            new CreateSspAssetPermissionPlugin(),
        ];
    }
}
```

**src/Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Permission;

use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\CreateSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\UnassignSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\UpdateSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewBusinessUnitSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanySspAssetPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            new ViewCompanySspAssetPermissionPlugin(),
            new ViewBusinessUnitSspAssetPermissionPlugin(),
            new UpdateSspAssetPermissionPlugin(),
            new UnassignSspAssetPermissionPlugin(),
            new CreateSspAssetPermissionPlugin(),
        ];
    }
}
```

Enable new permission plugins 

```bash
console setup:init-db
```

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Router\SelfServicePortalPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new SelfServicePortalPageRouteProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Twig;

use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Twig\FileSizeFormatterTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new FileSizeFormatterTwigPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/CartPage/CartPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage\SspAssetPreAddToCartPlugin;

class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CartPageExtension\Dependency\Plugin\PreAddToCartPluginInterface>
     */
    protected function getPreAddToCartPlugins(): array
    {
        return [
           new SspAssetPreAddToCartPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart\SspAssetItemExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface>
     */
    protected function getExpanderPlugins(Container $container): array
    {
        return [
            new SspAssetItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\SspAssetOrderExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\SspAssetOrderItemsPostSavePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\SspAssetOrderItemExpanderPlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface>
     */
    protected function getOrderHydrationPlugins(): array
    {
        return [
            new SspAssetOrderExpanderPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsPostSavePluginInterface>
     */
    protected function getOrderItemsPostSavePlugins(): array
    {
        return [
            new SspAssetOrderItemsPostSavePlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface>
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new SspAssetOrderItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search\SspAssetToCompanyBusinessUnitWritePublisherPlugin as SearchSspAssetToCompanyBusinessUnitWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search\SspAssetWritePublisherPlugin as SearchSspAssetWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage\SspAssetToCompanyBusinessUnitWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage\SspAssetWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAssetPublisherTriggerPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>|array<string, array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>>
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getSspAssetStoragePlugins(),
            $this->getSspAssetSearchPlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new SspAssetPublisherTriggerPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getSspAssetStoragePlugins(): array
    {
        return [
            new SspAssetWritePublisherPlugin(),
            new SspAssetToCompanyBusinessUnitWritePublisherPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getSspAssetSearchPlugins(): array
    {
        return [
            new SearchSspAssetWritePublisherPlugin(),
            new SearchSspAssetToCompanyBusinessUnitWritePublisherPlugin(),
        ];
    }
}
```


**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use SprykerFeature\Client\SelfServicePortal\Plugin\Catalog\SspAssetQueryExpanderPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>|array<\Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function createCatalogSearchQueryExpanderPlugins(): array
    {
        return [
            new SspAssetQueryExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Synchronization\SspAsset\Search\SspAssetListSynchronizationDataBulkRepositoryPlugin as SearchSspAssetListSynchronizationDataBulkRepositoryPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Synchronization\Storage\SspAssetListSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new SspAssetListSynchronizationDataBulkRepositoryPlugin(),
            new SearchSspAssetListSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

Setup search updates

```bash
console search:setup
```

### Set up widgets

| PLUGIN                     | SPECIFICATION                                                                           | PREREQUISITES | NAMESPACE                                    |
|----------------------------|-----------------------------------------------------------------------------------------|---------------|----------------------------------------------|
| SspAssetListWidget         | Renders a list of assets on the **My Assets** page in the Customer Account.             |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspAssetMenuItemWidget     | Renders the **My Assets** menu item in the Customer Account side menu.                  |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspItemAssetSelectorWidget | On the product details page, renders an autocomplete form field for selecting an asset. |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspListMenuItemWidget      | Renders the menu item in the Customer Account side menu.                                |               | SprykerFeature\Yves\SelfServicePortal\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetListWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetMenuItemWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspListMenuItemWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            SspAssetListWidget::class,
            SspAssetMenuItemWidget::class,
            SspListMenuItemWidget::class,
        ];
    }
}
```

### Add translations

[Here you can find how to import translations for Self-Service Portal feature](/docs/pbc/all/self-service-portal/latest/install/ssp-glossary-data-import.html)

Import translations:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Customers** > **Company Roles**.
2. Click **Add Company User Role**.
3. Select a company.
4. Enter a name for the role.
5. In **Unassigned Permissions**, enable the following permissions:
   - **View company assets**
   - **View business unit assets**
   - **Update assets**
   - **Unassign business unit ssp assets**
   - **Create assets**
6. Click **Submit**.
7. Go to **Customers** > **Company Users**.
8. Click **Edit** next to a user.
9. Assign the role you've just created to the user.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

1. On the Storefront, log in with the company user you've assigned the role to.
   Make sure the **Assets** menu item is displayed.
2. Go to **Customer Account** > **Assets**.
3. Click **Create Asset**.
4. Upload an image and fill in the required fields.
5. Click **Save**.
   Make sure the asset gets saved and this opens the asset details page.
6. Go to **Customer Account** > **Assets**.
   Make sure the the asset you've created is displayed in the list.
7. Go to **Customer Account** > **Dashboard**.
   Make sure the **Assets** widget displays the asset you've created.
8. Log out and log in with a company user without the role you've created.
   Make sure the **Assets** menu item is not displayed, and you can't access the **Assets** page.

{% endinfo_block %}

## Enable the Backend API endpoints

| PLUGIN                              | SPECIFICATION                                               | PREREQUISITES | NAMESPACE                                                                    |
|-------------------------------------|-------------------------------------------------------------|---------------|------------------------------------------------------------------------------|
| SspAssetsBackendResourcePlugin      | Provides the GET, POST and PATCH endpoints for SSP assets.  |               | SprykerFeature\Glue\SelfServicePortal\Plugin\GlueBackendApiApplication       |
| SspAssetSearchResultFormatterPlugin | Formats search ssp asset search result.                     |               | SprykerFeature\Client\SelfServicePortal\Plugin\Elasticsearch\ResultFormatter |
| SspAssetSearchQueryExpanderPlugin   | Expands SSP asset search query with permissions, sorting and search criterias.                          |               | SprykerFeature\Client\SelfServicePortal\Plugin\Elasticsearch\Query                       |

**src/Pyz/Client/SelfServicePortal/SelfServicePortalDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SelfServicePortal;

use SprykerFeature\Client\SelfServicePortal\Plugin\Elasticsearch\Query\SspAssetSearchQueryExpanderPlugin;
use SprykerFeature\Client\SelfServicePortal\Plugin\Elasticsearch\ResultFormatter\SspAssetSearchResultFormatterPlugin;
use SprykerFeature\Client\SelfServicePortal\SelfServicePortalDependencyProvider as SprykerSelfServicePortalDependencyProvider;

class SelfServicePortalDependencyProvider extends SprykerSelfServicePortalDependencyProvider
{
    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface>
     */
    protected function getSspAssetSearchResultFormatterPlugins(): array
    {
        return [
            new SspAssetSearchResultFormatterPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function getSspAssetSearchQueryExpanderPlugins(): array
    {
        return [
            new SspAssetSearchQueryExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use SprykerFeature\Glue\SelfServicePortal\Plugin\GlueBackendApiApplication\SspAssetsBackendResourcePlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new SspAssetsBackendResourcePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can manage `ssp-assets` resources as a Back Office user:


1. Get the access token by sending a `POST` request to the token endpoint with back office user credentials:

`POST https://glue-backend.mysprykershop.com/token`

```http
POST https://glue-backend.mysprykershop.com/token HTTP/2.0
Host: glue-backend.mysprykershop.com
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Content-Length: 1051

grant_type=password&username={username}&password={password}
```

2. Use the access token to access the `ssp-assets` backend endpoint:

<details>
  <summary>GET https://glue-backend.mysprykershop.com/ssp-assets</summary>

```json
{
    "data": [
        {
            "id": "AST--1",
            "type": "ssp-assets",
            "attributes": {
                "reference": "AST--1",
                "name": "DemoBrand Print Pro 2100",
                "serialNumber": "PRNT000014",
                "status": "pending",
                "note": "The DemoBrand Print Pro 2100 is a compact, high-speed monochrome LaserJet printer designed for home offices and small workgroups. It delivers crisp text and sharp graphics with a print speed of up to 24 pages per minute. Featuring wireless connectivity, auto-duplex printing, and a user-friendly control panel, the BlazeJet 2100 ensures professional output with minimal maintenance. Compatible with Windows, macOS, and mobile devices via Wi-Fi.",
                "createdDate": "2025-09-23 10:37:21",
                "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Printer.jpeg",
                "companyBusinessUnitOwnerUuid": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            },
            "links": {
                "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--1"
            }
        },
        {
            "id": "AST--2",
            "type": "ssp-assets",
            "attributes": {
                "reference": "AST--2",
                "name": "DemoHaul Titan X9",
                "serialNumber": "TRK1200027",
                "status": "pending",
                "note": "The DemoHaul Titan X9 is a high-performance heavy-duty truck engineered for demanding transport operations. Built with a reinforced steel chassis and a turbocharged diesel engine, the Titan X9 delivers exceptional hauling power, fuel efficiency, and long-distance reliability. Its ergonomic cabin features advanced driver-assist technology, real-time load monitoring, and a fully digital dashboard for enhanced control. With a payload capacity of up to 18 tons and rugged off-road capability, the Titan X9 is the ultimate solution for logistics professionals and fleet operators.",
                "createdDate": "2025-09-23 10:37:21",
                "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Truck.png",
                "companyBusinessUnitOwnerUuid": "5860fdd0-21fc-5389-87c9-5f1507d1ef3e"
            },
            "links": {
                "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--2"
            }
        },
        {
            "id": "AST--3",
            "type": "ssp-assets",
            "attributes": {
                "reference": "AST--3",
                "name": "OfficeJet Pro 9025e All-in-One Printer",
                "serialNumber": "CN1234ABCD",
                "status": "pending",
                "note": "The OfficeJet Pro 9025e is a high-performance multifunctional printer designed for modern office environments. It offers fast printing, scanning, copying, and faxing capabilities with automatic duplex printing. With built-in Wi-Fi and mobile printing options, this all-in-one device enhances workplace efficiency.",
                "createdDate": "2025-09-23 10:37:21",
                "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_125577546.jpeg",
                "companyBusinessUnitOwnerUuid": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            },
            "links": {
                "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--3"
            }
        },
        {
            "id": "AST--4",
            "type": "ssp-assets",
            "attributes": {
                "reference": "AST--4",
                "name": "Logistic Casa F-08",
                "serialNumber": "",
                "status": "pending",
                "note": "1FUJGLDR5KL123456",
                "createdDate": "2025-09-23 10:37:21",
                "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_223498915.jpeg",
                "companyBusinessUnitOwnerUuid": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            },
            "links": {
                "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--4"
            }
        },
        {
            "id": "AST--5",
            "type": "ssp-assets",
            "attributes": {
                "reference": "AST--5",
                "name": "AssetName1",
                "serialNumber": "serialNumberAsset1API",
                "status": "pending",
                "note": "noteAsset",
                "createdDate": "2025-09-23 12:50:06",
                "externalImageUrl": "http://emaple.com",
                "companyBusinessUnitOwnerUuid": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            },
            "links": {
                "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--5"
            }
        }
    ],
    "links": {
        "self": "http://glue-backend.eu.spryker.local/ssp-assets"
    }
}
```

</details>

3. To get the particular asset, use the access token to send a `GET` request to the `ssp-assets` endpoint with the asset ID:

`GET https://glue-backend.mysprykershop.com/ssp-assets/AST--1`

```json
{
  "data": {
    "id": "AST--1",
    "type": "ssp-assets",
    "attributes": {
      "reference": "AST--1",
      "name": "DemoBrand Print Pro 2100",
      "serialNumber": "PRNT000014",
      "status": "pending",
      "note": "The DemoBrand Print Pro 2100 is a compact, high-speed monochrome LaserJet printer designed for home offices and small workgroups. It delivers crisp text and sharp graphics with a print speed of up to 24 pages per minute. Featuring wireless connectivity, auto-duplex printing, and a user-friendly control panel, the BlazeJet 2100 ensures professional output with minimal maintenance. Compatible with Windows, macOS, and mobile devices via Wi-Fi.",
      "createdDate": "2025-09-23 10:37:21",
      "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Printer.jpeg",
      "companyBusinessUnitOwnerUuid": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
    },
    "links": {
      "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--1"
    }
  }
}
```

4. Use the access token to create the `ssp-assets` resource:
`POST https://glue-backend.mysprykershop.com/ssp-assets`

```json
{
  "data": {
    "type": "ssp-assets",
    "attributes":
    {
      "name": {% raw %}{{{% endraw %}Asset name{% raw %}}}{% endraw %},
      "serialNumber": {% raw %}{{{% endraw %}Serial number{% raw %}}}{% endraw %}",
      "status": {% raw %}{{{% endraw %}One of the following statuses: pending, in_review, approved and deactivated{% raw %}}}{% endraw %},
      "note":{% raw %}{{{% endraw %}Note{% raw %}}}{% endraw %},
      "externalImageUrl": {% raw %}{{{% endraw %}URL to an image{% raw %}}}{% endraw %},
      "companyBusinessUnitOwnerUuid": {% raw %}{{{% endraw %}The UUID of the company business unit{% raw %}}}{% endraw %}
    }
  }
}
```

Example of a successful response:

```json
{
  "data": {
    "id": "AST--6",
    "type": "ssp-assets",
    "attributes": {
      "reference": "AST--6",
      "name": "Test Asset for CRUD TEST",
      "serialNumber": "CRUD-TEST-YYYYY",
      "status": "pending",
      "note": "This asset will be used for testing all CRUD operations!!!!!",
      "createdDate": "2025-09-23 13:59:35",
      "externalImageUrl": "https://example.com/asset-image_1.jpg",
      "companyBusinessUnitOwnerUuid": "5860fdd0-21fc-5389-87c9-5f1507d1ef3e"
    },
    "links": {
      "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--6"
    }
  }
}
```

5. For updating the particular asset, use the access token to send a `PATCH` request to the `ssp-assets` endpoint with the asset ID:

`PATCH https://glue-backend.mysprykershop.com/ssp-assets/AST--6`

```json
{
  "data": {
    "type": "ssp-assets",
    "attributes":
    {
      "name": {% raw %}{{{% endraw %}Asset name{% raw %}}}{% endraw %},
      "serialNumber": {% raw %}{{{% endraw %}Serial number{% raw %}}}{% endraw %}",
      "status": {% raw %}{{{% endraw %}One of the following statuses: pending, in_review, approved and deactivated{% raw %}}}{% endraw %},
      "note":{% raw %}{{{% endraw %}Note{% raw %}}}{% endraw %},
      "externalImageUrl": {% raw %}{{{% endraw %}URL to an image{% raw %}}}{% endraw %},
      "companyBusinessUnitOwnerUuid": {% raw %}{{{% endraw %}The UUID of the company business unit{% raw %}}}{% endraw %},
    }
  }
}
```

Example of a successful response:

```json
{
  "data": {
    "id": "AST--6",
    "type": "ssp-assets",
    "attributes": {
      "reference": "AST--6",
      "name": "Test Asset for CRUD TEST",
      "serialNumber": "CRUD-TEST-XXXX",
      "status": "pending",
      "note": "This asset will be used for testing all CRUD operations!!!!!",
      "createdDate": "2025-09-23 13:59:35",
      "externalImageUrl": "https://example.com/asset-image_1.jpg",
      "companyBusinessUnitOwnerUuid": "5860fdd0-21fc-5389-87c9-5f1507d1ef3e"
    },
    "links": {
      "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--6"
    }
  }
}
```

{% endinfo_block %}

## Enable Storefront API endpoints

| PLUGIN                       | SPECIFICATION                                           | PREREQUISITES | NAMESPACE                                                    |
|------------------------------|---------------------------------------------------------|---------------|--------------------------------------------------------------|
| SspAssetsResourceRoutePlugin | Provides the GET and POST endpoints for the SSP assets. |               | SprykerFeature\Glue\SelfServicePortal\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use SprykerFeature\Glue\SelfServicePortal\Plugin\GlueApplication\SspAssetsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
   /**
     * {@inheritDoc}
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {    
        return [
            new SspAssetsResourceRoutePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can manage `ssp-assets` resources for the company user:

0. Prerequisites:
- You have a company user
- You have company user credentials: username and password
- Assets are assigned to the business unit of the company user
- You have imported assets as described in data import section

1. Get the access token by sending a `POST` request to the token endpoint with the company user credentials.
   `POST https://glue.mysprykershop.com/access-tokens`

```json
{
    "data": {
        "type": "access-tokens",
        "attributes": {
            "username": {username},
            "password": {password}
        }
    }
}
```

2. Use the access token to access the `ssp-assets` endpoint:


<details>
  <summary>GET https://glue.mysprykershop.com/ssp-assets</summary>

```json
{
  "data": [
    {
      "type": "ssp-assets",
      "id": "AST--1",
      "attributes": {
        "reference": "AST--1",
        "name": "DemoBrand Print Pro 2100",
        "serialNumber": "PRNT000014",
        "note": "The DemoBrand Print Pro 2100 is a compact, high-speed monochrome LaserJet printer designed for home offices and small workgroups. It delivers crisp text and sharp graphics with a print speed of up to 24 pages per minute. Featuring wireless connectivity, auto-duplex printing, and a user-friendly control panel, the BlazeJet 2100 ensures professional output with minimal maintenance. Compatible with Windows, macOS, and mobile devices via Wi-Fi.",
        "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Printer.jpeg"
      },
      "links": {
        "self": "http://glue.eu.spryker.local/ssp-assets/AST--1"
      }
    },
    {
      "type": "ssp-assets",
      "id": "AST--2",
      "attributes": {
        "reference": "AST--2",
        "name": "DemoHaul Titan X9",
        "serialNumber": "TRK1200027",
        "note": "The DemoHaul Titan X9 is a high-performance heavy-duty truck engineered for demanding transport operations. Built with a reinforced steel chassis and a turbocharged diesel engine, the Titan X9 delivers exceptional hauling power, fuel efficiency, and long-distance reliability. Its ergonomic cabin features advanced driver-assist technology, real-time load monitoring, and a fully digital dashboard for enhanced control. With a payload capacity of up to 18 tons and rugged off-road capability, the Titan X9 is the ultimate solution for logistics professionals and fleet operators.",
        "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Truck.png"
      },
      "links": {
        "self": "http://glue.eu.spryker.local/ssp-assets/AST--2"
      }
    },
    {
      "type": "ssp-assets",
      "id": "AST--3",
      "attributes": {
        "reference": "AST--3",
        "name": "OfficeJet Pro 9025e All-in-One Printer",
        "serialNumber": "CN1234ABCD",
        "note": "The OfficeJet Pro 9025e is a high-performance multifunctional printer designed for modern office environments. It offers fast printing, scanning, copying, and faxing capabilities with automatic duplex printing. With built-in Wi-Fi and mobile printing options, this all-in-one device enhances workplace efficiency.",
        "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_125577546.jpeg"
      },
      "links": {
        "self": "http://glue.eu.spryker.local/ssp-assets/AST--3"
      }
    },
    {
      "type": "ssp-assets",
      "id": "AST--4",
      "attributes": {
        "reference": "AST--4",
        "name": "Logistic Casa F-08",
        "serialNumber": "",
        "note": "1FUJGLDR5KL123456",
        "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_223498915.jpeg"
      },
      "links": {
        "self": "http://glue.eu.spryker.local/ssp-assets/AST--4"
      }
    }
  ],
  "links": {
    "self": "http://glue.eu.spryker.local/ssp-assets"
  }
}
```

</details>

3. To get the particular asset, use the access token to send a `GET` request to the `ssp-assets` endpoint with the asset ID:

`GET https://glue.mysprykershop.com/ssp-assets/AST--1`

```json
{
    "data": {
        "type": "ssp-assets",
        "id": "AST--1",
        "attributes": {
            "reference": "AST--1",
            "name": "DemoBrand Print Pro 2100",
            "serialNumber": "PRNT000014",
            "note": "The DemoBrand Print Pro 2100 is a compact, high-speed monochrome LaserJet printer designed for home offices and small workgroups. It delivers crisp text and sharp graphics with a print speed of up to 24 pages per minute. Featuring wireless connectivity, auto-duplex printing, and a user-friendly control panel, the BlazeJet 2100 ensures professional output with minimal maintenance. Compatible with Windows, macOS, and mobile devices via Wi-Fi.",
            "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Printer.jpeg"
        },
        "links": {
            "self": "http://glue.eu.spryker.local/ssp-assets/AST--1"
        }
    }
}
```

4. Use the access token to create the `ssp-assets` resource:

`POST https://glue.mysprykershop.com/ssp-assets`

```json
{
  "data": {
    "type": "ssp-assets",
    "attributes": {
      "name": {Asset name},
      "serialNumber": {Serial number},
      "note": {Note},
      "externalImageUrl": {URL}
    }
  }
}
```

Example of a successful response:

```json
{
  "data": {
    "type": "ssp-assets",
    "id": "AST--5",
    "attributes": {
      "reference": "AST--5",
      "name": "AssetName1",
      "serialNumber": "serialNumberAsset1API",
      "note": "noteAsset",
      "externalImageUrl": "http://emaple.com"
    },
    "links": {
      "self": "http://glue.eu.spryker.local/ssp-assets/AST--5"
    }
  }
}
```

{% endinfo_block %}


## Demo data for EU region / DE store

### Add asset demo data

Prepare your data according to your requirements using our demo data:

**data/import/common/common/ssp_asset.csv**

```csv
reference,name,serial_number,note,external_image_url,business_unit_key,assigned_business_unit_keys
AST--1,DemoBrand Print Pro 2100,PRNT000014,"The DemoBrand Print Pro 2100 is a compact, high-speed monochrome LaserJet printer designed for home offices and small workgroups. It delivers crisp text and sharp graphics with a print speed of up to 24 pages per minute. Featuring wireless connectivity, auto-duplex printing, and a user-friendly control panel, the BlazeJet 2100 ensures professional output with minimal maintenance. Compatible with Windows, macOS, and mobile devices via Wi-Fi.",https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Printer.jpeg,spryker_systems_HR,"spryker_systems_HR"
AST--2,DemoHaul Titan X9,TRK1200027,"The DemoHaul Titan X9 is a high-performance heavy-duty truck engineered for demanding transport operations. Built with a reinforced steel chassis and a turbocharged diesel engine, the Titan X9 delivers exceptional hauling power, fuel efficiency, and long-distance reliability. Its ergonomic cabin features advanced driver-assist technology, real-time load monitoring, and a fully digital dashboard for enhanced control. With a payload capacity of up to 18 tons and rugged off-road capability, the Titan X9 is the ultimate solution for logistics professionals and fleet operators.",https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Truck.png,spryker_systems_Zurich,spryker_systems_Zurich
AST--3,OfficeJet Pro 9025e All-in-One Printer,CN1234ABCD,"The OfficeJet Pro 9025e is a high-performance multifunctional printer designed for modern office environments. It offers fast printing, scanning, copying, and faxing capabilities with automatic duplex printing. With built-in Wi-Fi and mobile printing options, this all-in-one device enhances workplace efficiency.",https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_125577546.jpeg,spryker_systems_HR,spryker_systems_HR
AST--4,Logistic Casa F-08,,1FUJGLDR5KL123456,https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_223498915.jpeg,spryker_systems_HR,spryker_systems_HR
```

| COLUMN                      | REQUIRED | DATA TYPE | DATA EXAMPLE                                                    | DATA EXPLANATION                                                          |
|-----------------------------|----------|-----------|----------------------------------------------------------------|---------------------------------------------------------------------------|
| reference                   | ✓        | string    | AST--1                                                         | Unique identifier for the asset used as a reference in the system.        |
| name                        | ✓        | string    | DemoBrand Print Pro 2100                                       | The display name of the asset.                                            |
| serial_number               | x        | string    | PRNT000014                                                     | The serial number of the asset for identification purposes.               |
| note                        | x        | string    | The DemoBrand Print Pro 2100...                                | Detailed description or notes about the asset.                            |
| external_image_url          | x        | string    | `https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Printer.jpeg` | URL to an external image of the asset.                                    |
| business_unit_key           | x        | string    | spryker_systems_HR                                             | The key of the business unit that owns the asset.                         |
| assigned_business_unit_keys | x        | string    | spryker_systems_HR                                             | Comma-separated list of business unit keys that have access to the asset. |

#### Extend the data import configuration

**/data/import/local/full_EU.yml**

```yaml
# ...

# SelfServicePortal
- data_entity: ssp-asset
  source: data/import/common/common/ssp_asset.csv
```

### Register the following data import plugins

| PLUGIN                   | SPECIFICATION                         | PREREQUISITES | NAMESPACE                                                            |
|--------------------------|---------------------------------------|---------------|----------------------------------------------------------------------|
| SspAssetDataImportPlugin | Imports a ssp asset into persistence. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\SspAssetDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new SspAssetDataImportPlugin(),
        ];
    }
}
```

Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SelfServicePortalConfig::IMPORT_TYPE_SSP_ASSET),
        ];

        return $commands;
    }
}
```


### Import the data

```bash
console data:import:ssp-asset
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the following database tables:

- `spy_asset`
- `spy_ssp_asset_to_company_business_unit`
- `spy_ssp_asset_storage`
- `spy_ssp_asset_search`
  {% endinfo_block %}

## Set up frontend templates

For information about setting up frontend templates, see [Set up SSP frontend templates](/docs/pbc/all/self-service-portal/latest/install/ssp-frontend-templates.html).
