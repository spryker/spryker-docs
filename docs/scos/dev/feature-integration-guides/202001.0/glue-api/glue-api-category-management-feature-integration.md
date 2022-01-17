---
title: Glue API - Category Management feature integration
description: This guide will navigate you through the process of installing and configuring the Category API feature in Spryker OS.
last_updated: Aug 13, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/glue-api-category-management-feature-integration
originalArticleId: ada36084-4e6d-411d-b5b1-2dfc211ef115
redirect_from:
  - /v4/docs/glue-api-category-management-feature-integration
  - /v4/docs/en/glue-api-category-management-feature-integration
related:
  - title: Browsing a Category Tree
    link: docs/scos/dev/glue-api-guides/page.version/retrieving-categories/retrieving-category-trees.html
---

## Install Feature API

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version | Integration guide |
| --- | --- | --- |
| Spryker Core | 202001.0	 | 	[Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html) |
| Category Management | 202001.0 |  |

### 1) Install the required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker/categories-rest-api:"^1.1.3" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following module is installed:

| Module | Expected directory |
| --- | --- |
| `CategoriesRestApi` | `vendor/spryker/categories-rest-api` |

{% endinfo_block %}

### 2) Set Up Transfer Objects
Run the following command to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox “Verification” %}

Make sure that the following changes have occurred:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestCategoryTreesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCategoryTreesTransfer` |
| `RestCategoryTreesAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCategoryTreesAttributesTransfer` |
| `RestCategoryNodesAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCategoryNodesAttributesTransfer` |

{% endinfo_block %}

### 3) Set Up Behavior

#### Enable resources and relationships:

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CategoriesResourceRoutePlugin` | Registers the `category-tree` resource. | None | `Spryker\Glue\CategoriesRestApi\Plugin` |
| `CategoryResourceRoutePlugin` | Registers the `category-nodes` resource. | None | `Spryker\Glue\CategoriesRestApi\Plugin` |

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

{% info_block warningBox “Verification” %}

Make sure the following endpoints are available:
- http://glue.mysprykershop.com/category-trees
- http://glue.mysprykershop.com/category-nodes/{% raw %}{{{% endraw %}category_node_id{% raw %}}}{% endraw %}
  
{% endinfo_block %}
