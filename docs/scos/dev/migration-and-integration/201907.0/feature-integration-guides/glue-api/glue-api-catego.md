---
title: Category Management Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/glue-api-category-management-feature-integration
redirect_from:
  - /v3/docs/glue-api-category-management-feature-integration
  - /v3/docs/en/glue-api-category-management-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201907.0	 | 	[Glue Application Feature Integration](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/glue-applicatio) |
| Category Management | 201907.0 |  |

### 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker/categories-rest-api:"^1.1.3" --update-with-dependencies
```

{% info_block warningBox %}
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

{% info_block warningBox %}
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
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
    
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

</br>
</details>

{% info_block warningBox %}
Make sure the following endpoints are available:<ul><li>http://glue.mysprykershop.com/category-trees</li><li>http://glue.mysprykershop.com/category-nodes/{% raw %}{{{% endraw %}category_node_id{% raw %}}}{% endraw %}</li></ul>
{% endinfo_block %}

*Last review date: Aug 05, 2019*
