---
title: Install the Category Management Glue API
description: This guide will navigate you through the process of installing and configuring the Category API feature in Spryker OS.
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-category-management-feature-integration
originalArticleId: 47dff867-f90a-455e-aba8-1f4914e1f25d
redirect_from:
  - /2021080/docs/glue-api-category-management-feature-integration
  - /2021080/docs/en/glue-api-category-management-feature-integration
  - /docs/glue-api-category-management-feature-integration
  - /docs/en/glue-api-category-management-feature-integration
  - /docs/scos/dev/feature-integration-guides/202200.0/glue-api/glue-api-category-management-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202311.0/glue-api/glue-api-category-management-feature-integration.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/install-and-upgrade/install-glue-api/install-the-category-management-glue-api.html
related:
  - title: Install the Category Management feature
    link: docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html
  - title: Retrieving category trees
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-trees.html
  - title: Retrieving category nodes
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-nodes.html
---
This document describes how to install the Category Management Glue API feature.

## Prerequisites

Install the required features:

|FEATURE  |VERSION |REQUIRED SUB-FEATURE |
|---  |--- |--- |
| Spryker Core | {{page.release_tag}} |[Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Category Management | {{page.release_tag}} | |


## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/categories-rest-api:"^1.1.3" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE |EXPECTED DIRECTORY |
| --- | --- |
|CategoriesRestApi |vendor/spryker/categories-rest-api|

{% endinfo_block %}

## 2) Set up configuration

Set up the following configuration

**src/Pyz/Glue/NavigationsRestApi/NavigationsRestApiConfig.php**

```php
<?php

namespace Pyz\\Glue\\NavigationsRestApi;

use Spryker\\Glue\\NavigationsRestApi\\NavigationsRestApiConfig as SprykerNavigationsRestApiConfig;

class NavigationsRestApiConfig extends SprykerNavigationsRestApiConfig
{
    /\*\*
     \* {@inheritDoc}
     \*
     \* @return string\[\]
     \*/
    public function getNavigationTypeToUrlResourceIdFieldMapping(): array
    {
        return \[
            'category' => 'fkResourceCategorynode',
            'cms\_page' => 'fkResourcePage',
        \];
    }
}
```


## 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred:

|TRANSFER |TYPE |EVENT |PATH |
|--- |--- |--- |--- |
|RestCategoryTreesTransfer |class |created |src/Generated/Shared/Transfer/RestCategoryTreesTransfer |
|RestCategoryTreesAttributesTransfer |class |created |src/Generated/Shared/Transfer/RestCategoryTreesAttributesTransfer |
|RestCategoryNodesAttributesTransfer |class |created |src/Generated/Shared/Transfer/RestCategoryNodesAttributesTransfer|

{% endinfo_block %}

## 4) Enable resources and relationships

Activate the following plugins:

|PLUGIN| SPECIFICATION| PREREQUISITES| NAMESPACE|
|--- |--- |--- |--- |
|CategoriesResourceRoutePlugin| Registers the `category-tree` resource.| | Spryker\Glue\CategoriesRestApi\Plugin|
|CategoryResourceRoutePlugin| Registers the `category-nodes` resource.| | Spryker\Glue\CategoriesRestApi\Plugin |
|CategoryNodeRestUrlResolverAttributesTransferProviderPlugin| Maps the data for `RestUrlResolverAttributesTransfer` from `UrlStorageTransfer`.| | Spryker\Glue\CategoriesRestApi\Plugin\UrlsRestApi|


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CategoriesRestApi\Plugin\CategoriesResourceRoutePlugin;
use Spryker\Glue\CategoriesRestApi\Plugin\CategoryResourceRoutePlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new CategoriesResourceRoutePlugin(),
            new CategoryResourceRoutePlugin(),
        ];
    }
}
```


**src/Pyz/Glue/UrlsRestApi/UrlsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\UrlsRestApi;

use Spryker\Glue\CategoriesRestApi\Plugin\UrlsRestApi\CategoryNodeRestUrlResolverAttributesTransferProviderPlugin;
use Spryker\Glue\UrlsRestApi\UrlsRestApiDependencyProvider as SprykerUrlsRestApiDependencyProvider;

class UrlsRestApiDependencyProvider extends SprykerUrlsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\UrlsRestApiExtension\Dependency\Plugin\RestUrlResolverAttributesTransferProviderPluginInterface[]
     */
    protected function getRestUrlResolverAttributesTransferProviderPlugins(): array
    {
        return [
            new CategoryNodeRestUrlResolverAttributesTransferProviderPlugin(),
        ];
    }
}
```


{% info_block warningBox "Verification" %}

Make sure that the following endpoints are available:

- `https://glue.mysprykershop.com/category-trees`
- `https://glue.mysprykershop.com/category-nodes/{% raw %}{{{% endraw %}category_node_id{% raw %}}}{% endraw %}`

{% endinfo_block %}
