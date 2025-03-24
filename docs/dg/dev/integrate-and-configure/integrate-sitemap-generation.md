---
title: Integrate sitemap generation
description: Learn the prerequisites and how to enable and integrate Sitemap module into a Spryker based project.
last_updated: March 4, 2025
template: howto-guide-template
---

{% info_block warningBox "" %}

The Sitemap module is currently in beta, but an official release is coming soon. Feel free to explore the available documentation. We'll continue updating it with details on future releases.

{% endinfo_block %}


The Sitemap module generates sitemaps for your Spryker application, enhancing SEO by helping search engines index your pages efficiently. It offers various configuration options to customize sitemap generation. This document explains how to integrate the Sitemap module into a Spryker project.


## Prerequisites

Install the required features:

| NAME                  | VERSION          | INSTALLATION GUIDE                                                                                                                                               |
|-----------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core          | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)     |


## 1) Install modules

1. Install the required modules using Composer:

```bash
composer require spryker/sitemap:"^0.1.0" spryker/sitemap-extension:"^1.0.0" spryker-shop/shop-ui:"^1.85.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE           | EXPECTED DIRECTORY                 |
|------------------|------------------------------------|
| Sitemap          | vendor/spryker/sitemap             |
| SitemapExtension | vendor/spryker/sitemap-extension   |
| ShopUi           | vendor/spryker-shop/shop-ui        |

{% endinfo_block %}

2. Optional: To enable sitemap functionality to include additional types of data, install the following modules using Composer:

```bash
composer require spryker/category-storage:"^2.10.0" spryker/cms-storage:"^2.8.0" spryker/merchant-storage:"^1.3.0" spryker/product-set-storage:"^1.11.0" spryker/product-storage:"^1.42.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE           | EXPECTED DIRECTORY                 |
|------------------|------------------------------------|
| CategoryStorage  | vendor/spryker/category-storage    | 
| CmsStorage       | vendor/spryker/cms-storage         |
| MerchantStorage  | vendor/spryker/merchant-storage    |
| ProductSetStorage| vendor/spryker/product-set-storage |
| ProductStorage   | vendor/spryker/product-storage     |
| Sitemap          | vendor/spryker/sitemap             |
| SitemapExtension | vendor/spryker/sitemap-extension   |
| ShopUi           | vendor/spryker-shop/shop-ui        |

{% endinfo_block %}

## 2) Adjust configuration 


Adjust the following configuration.

### 2.1) Configure the filesystem service for sitemap

Sitemap requires two filesystem configurations, see [Configure Sitemap caching interval](#configure-sitemap-caching-interval) for more details.

{% info_block warningBox "Storage requirements" %}

Sitemap files can be large, especially for stores with a large product catalog. Make sure your S3 storage has sufficient space and monitor your local cache directory to prevent excessive disk usage.

{% endinfo_block %}

<details>
<summary>config/Shared/config_default.php</summary>

```php
use Spryker\Shared\Sitemap\SitemapConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    SitemapConstants::FILESYSTEM_NAME => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'path' => '/',
        'key' => 'YOUR_AWS_KEY',
        'secret' => 'YOUR_AWS_SECRET',
        'bucket' => 'YOUR_AWS_BUCKET',
        'region' => 'YOUR_AWS_REGION',
    ],
    SitemapConstants::FILESYSTEM_NAME_CACHE => [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => APPLICATION_ROOT_DIR . '/data/sitemaps/cache',
        'path' => '/',
    ],
```
</details>

### 2.2) Configure the base URL and host mappings for sitemap

The following configuration ensures that the application uses the correct hostnames based on the mode it's operating in:

* When Dynamic Store is disabled, use the `STORE_TO_YVES_HOST_MAPPING` configuration to map specific stores to their respective hostnames
* When Dynamic Store is enabled, use the `REGION_TO_YVES_HOST_MAPPING` configuration to map regions to their respective hostnames

**config/Shared/config_default.php**

```php
$config[SitemapConstants::BASE_URL_YVES_PORT] = $yvesPort;

$config[SitemapConstants::STORE_TO_YVES_HOST_MAPPING] = [
    'DE' => getenv('SPRYKER_YVES_HOST_DE'),
    'AT' => getenv('SPRYKER_YVES_HOST_AT'),
    'US' => getenv('SPRYKER_YVES_HOST_US'),
];

$config[SitemapConstants::REGION_TO_YVES_HOST_MAPPING] = [
    'EU' => getenv('SPRYKER_YVES_HOST_EU'),
    'US' => getenv('SPRYKER_YVES_HOST_US'),
];
```



### 2.3) Add a Jenkins job for sitemap generation

1. Add the following configuration:

**config/Zed/cronjobs/jenkins.php**

```php
$jobs[] = [
    'name' => 'generate-sitemap-files',
    'command' => '$PHP_BIN vendor/bin/console sitemap:generate',
    'schedule' => '0 0 * * *',
    'enable' => true,
];
```

2. Apply the updated cron job configuration:

```bash
vendor/bin/console scheduler:setup
```

### 2.4) Configure sitemap caching interval

A caching mechanism in the Sitemap module minimizes the number of requests to the S3 Bucket. When the first request is made, a copy of the sitemap file is stored locally. Subsequent requests use the cached version instead of fetching the file from S3 again. The cached file remains valid if its last updated date is within the interval specified by the `getSitemapFileTimeThreshold()` method, which returns the interval in seconds. By default, this interval is set to 86400 seconds or 24 hours. You can adjust it by extending the `SitemapConfig` class and overriding the `getSitemapFileTimeThreshold()` method.

**src/Pyz/Yves/Sitemap/SitemapConfig.php**

```php
<?php
namespace Pyz\Yves\Sitemap;

use Spryker\Yves\Sitemap\SitemapConfig as SprykerSitemapConfig;

class SitemapConfig extends SprykerSitemapConfig
{
    public function getSitemapFileTimeThreshold(): int
    {
        return 86400;
    }
}
```

### 2.5) Configure Sitemap URL limit


The Sitemap module lets you set a limit on the number of URLs that can be included in a single sitemap file. This ensures that the sitemap file doesn't exceed the maximum allowed size and remains manageable.  

By default, the limit is 50,000 URLs per sitemap file, which is the maximum allowed by the Sitemaps Protocol.  
You can decrease this limit by extending the `SitemapConfig` class and overriding the `getSitemapUrlLimit()` method.


```php
<?php
namespace Pyz\Zed\Sitemap;

use Spryker\Zed\Sitemap\SitemapConfig as SprykerSitemapConfig;

class SitemapConfig extends SprykerSitemapConfig
{
    public function getSitemapUrlLimit(): int
    {
        return 50000;
    }
}
```

### 2.6) Configure Sitemap file path

By default, the sitemap file is stored with a structured path that includes the store name. This ensures sitemaps are organized per store, preventing conflicts in multi-store environments. You can change this behavior to fit your project's requirements.  

The following example overrides the default configuration by redefining `getFilePath()`.


```php
<?php
namespace Pyz\Shared\Sitemap;  

use Spryker\Shared\Sitemap\SitemapConfig as SprykerSitemapConfig;

class SitemapConfig extends SprykerSitemapConfig
{
    public function getFilePath(string $storeName, string $fileName): string
    {
        return sprintf('%s%s%s', $storeName, DIRECTORY_SEPARATOR, $fileName);
    }
}
```

## 3) Set up the transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER           | TYPE  | EVENT   | PATH                                             |
|--------------------|-------|---------|--------------------------------------------------|
| FileSystemStream   | class | created | src/Generated/Shared/Transfer/FileSystemStream   |
| FileSystemContent  | class | created | src/Generated/Shared/Transfer/FileSystemContent  |
| FileSystemDelete   | class | created | src/Generated/Shared/Transfer/FileSystemDelete   |
| FileSystemList     | class | created | src/Generated/Shared/Transfer/FileSystemList     |
| FileSystemResource | class | created | src/Generated/Shared/Transfer/FileSystemResource |
| SitemapUrl         | class | created | src/Generated/Shared/Transfer/SitemapUrlTransfer |
| Store              | class | created | src/Generated/Shared/Transfer/StoreTransfer      |

{% endinfo_block %}

### 4) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN        | SPECIFICATION                                | PREREQUISITES | NAMESPACE                                 |
|---------------|----------------------------------------------|---------------|-------------------------------------------|
| SitemapWidget | Provides functionality to display a sitemap. |               | Spryker\Yves\Sitemap\Widget\SitemapWidget |


src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php

```php
<?php
namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\Sitemap\Widget\SitemapWidget;


class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            SitemapWidget::class,
        ];
    }
}
```


## 5) Set up the behavior

Register the following plugins:

| PLUGIN                                   | SPECIFICATION                             | PREREQUISITES                                                                | NAMESPACE                                                  |
|------------------------------------------|-------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------------------|
| SitemapRouteProviderPlugin               | Provides routing for sitemap generation.  |                                                                              | Spryker\Yves\Sitemap\Plugin\Router                         |
| SitemapGenerateConsole                   | Console command to generate sitemaps.     |                                                                              | Spryker\Zed\Sitemap\Communication\Console                  |
| CategoryNodeSitemapDataProviderPlugin    | Provides sitemap data for category nodes. | Requires the [CategoryStorage](#install-modules) module.   | Spryker\Zed\CategoryStorage\Communication\Plugin\Sitemap   |
| CmsPageSitemapDataProviderPlugin         | Provides sitemap data for CMS pages.      | Requires the [CmsStorage](#install-modules) module.        | Spryker\Zed\CmsStorage\Communication\Plugin\Sitemap        |
| MerchantSitemapDataProviderPlugin        | Provides sitemap data for merchants.      | Requires the [MerchantStorage](#install-modules) module.   | Spryker\Zed\MerchantStorage\Communication\Plugin\Sitemap   |
| ProductAbstractSitemapDataProviderPlugin | Provides sitemap data for products.        | Requires the [ProductStorage](#install-modules) module.    | Spryker\Zed\ProductStorage\Communication\Plugin\Sitemap    |
| ProductSetSitemapDataProviderPlugin      | Provides sitemap data for product sets.   | Requires the [ProductSetStorage](#install-modules) module. | Spryker\Zed\ProductSetStorage\Communication\Plugin\Sitemap |

<details>
<summary>src/Pyz/Yves/Router/RouterDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use Spryker\Yves\Sitemap\Plugin\Router\SitemapRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    protected function getRouterPlugins(): array
    {
        return [
            new SitemapRouteProviderPlugin(),
        ];
    }
}
```

</details>

<details>
<summary>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Sitemap\Communication\Console\SitemapGenerateConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new SitemapGenerateConsole(),
        ];
    }
}
```

</details>

<details>
<summary>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Sitemap;

use Spryker\Zed\CategoryStorage\Communication\Plugin\Sitemap\CategoryNodeSitemapDataProviderPlugin;
use Spryker\Zed\CmsStorage\Communication\Plugin\Sitemap\CmsPageSitemapDataProviderPlugin;
use Spryker\Zed\MerchantStorage\Communication\Plugin\Sitemap\MerchantSitemapDataProviderPlugin;
use Spryker\Zed\ProductSetStorage\Communication\Plugin\Sitemap\ProductSetSitemapDataProviderPlugin;
use Spryker\Zed\ProductStorage\Communication\Plugin\Sitemap\ProductAbstractSitemapDataProviderPlugin;
use Spryker\Zed\Sitemap\SitemapDependencyProvider as SprykerSitemapDependencyProvider;

class SitemapDependencyProvider extends SprykerSitemapDependencyProvider
{
    protected function getSitemapDataProviderPlugins(): array
    {
        return [
            new ProductAbstractSitemapDataProviderPlugin(),
            new CategoryNodeSitemapDataProviderPlugin(),
            new CmsPageSitemapDataProviderPlugin(),
            new ProductSetSitemapDataProviderPlugin(),
            new MerchantSitemapDataProviderPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Generate a sitemap:

```bash
vendor/bin/console sitemap:generate
```

Make sure you can access the sitemap by sending a request to `https://yves.eu.mysprykershop.com/sitemap.xml`.

{% endinfo_block %}
