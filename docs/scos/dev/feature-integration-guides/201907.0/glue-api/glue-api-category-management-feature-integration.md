---
title: Glue API - Category Management feature integration
description: This guide will navigate you through the process of installing and configuring the Category API feature in Spryker OS.
last_updated: Dec 27, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/glue-api-category-management-feature-integration
originalArticleId: 995b8468-f118-41bb-93a4-4319f4f12984
redirect_from:
  - /v3/docs/glue-api-category-management-feature-integration
  - /v3/docs/en/glue-api-category-management-feature-integration
related:
  - title: Browsing a Category Tree
    link: docs/scos/dev/glue-api-guides/page.version/retrieving-categories/retrieving-category-trees.html
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Integration guide |
| --- | --- | --- |
| Spryker Core | 201907.0	 | 	[Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html) |
| Category Management | 201907.0 |  |

### 1) Install the required modules using Composer
Run the following command to install the required modules:

```bash
composer require spryker/categories-rest-api:"^1.1.3" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following module is installed:
{% endinfo_block %}

| Module | Expected directory |
| --- | --- |
| `CategoriesRestApi` | `vendor/spryker/categories-rest-api` |

### 2) Set Up Transfer Objects
Run the following command to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox “Verification” %}

Make sure that the following changes have occurred:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestCategoryTreesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCategoryTreesTransfer` |
| `RestCategoryTreesAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCategoryTreesAttributesTransfer` |
| `RestCategoryNodesAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCategoryNodesAttributesTransfer` |

### 3) Set Up Behavior
#### Enable resources and relationships:
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CategoriesResourceRoutePlugin` | Registers the `category-tree` resource. | None | `Spryker\Glue\CategoriesRestApi\Plugin` |
| `CategoryResourceRoutePlugin` | Registers the `category-nodes` resource. | None | `Spryker\Glue\CategoriesRestApi\Plugin` |

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
    
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

<br>
</details>

{% info_block warningBox “Verification” %}

Make sure the following endpoints are available:<ul><li>http://glue.mysprykershop.com/category-trees</li><li>http://glue.mysprykershop.com/category-nodes/{% raw %}{{{% endraw %}category_node_id{% raw %}}}{% endraw %}</li></ul>
{% endinfo_block %}

*Last review date: Aug 05, 2019*
