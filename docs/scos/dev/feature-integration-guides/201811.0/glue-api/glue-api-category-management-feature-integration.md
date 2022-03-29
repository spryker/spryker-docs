---
title: Glue API - Category Management feature integration
description: This guide will navigate you through the process of installing and configuring the Category API feature in Spryker OS.
last_updated: Apr 22, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v1/docs/category-api-feature-integration
originalArticleId: 9c887081-9dd6-4bd1-8491-83b615c14f1a
redirect_from:
  - /v1/docs/category-api-feature-integration
  - /v1/docs/en/category-api-feature-integration
---

## Install Feature API

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 2018.12.0 |
| Category | 2018.12.0 |

### 1) Install the required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker/categories-rest-api:"^1.1.2" --update-with-dependencies 
```
Make sure that the following modules are installed:
| Module | Expected directory |
| --- | --- |
| `CategoriesRestApi` |`vendor/spryker/categories-rest-api` |

### 2) Set up Transfer objects
Run the following command to generate transfer changes:
```bash
console transfer:generate 
```
 Make sure that the following changes are present in transfer objects: 
 | Transfer | Type  |Event  |Path |
 | --- | --- | --- | --- |
|`RestCategoryTreesTransfer`| class | created |`src/Generated/Shared/Transfer`|
| `RestCategoryTreesAttributesTransfer` |class |created |`src/Generated/Shared/Transfer/RestCategoryTreesAttributesTransfer` |
|`RestCategoryNodesAttributesTransfer`  |class  |created  | `src/Generated/Shared/Transfer/RestCategoryNodesAttributesTransfer`|

### 3) Set up Behavior
  Enable resources and relationships:
   Activate the following plugin:
| Plugin | Specification  | Prerequisites |Namespace |
 | --- | --- | --- | --- |
| `CategoriesResourceRoutePlugin`| Registers a `category-tree` resource. |None  | `Spryker\Glue\CategoriesRestApi\Plugin`|
| `CategoryResourceRoutePlugin`	 |Registers a `category- nodes` resource. | None|`Spryker\Glue\CategoriesRestApi\Plugin` |
<details open>
<summary markdown='span'> src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
```bash 
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
    </details>
    
 Make sure the following endpoints are available:
*  `http://mysprykershop.com/category-trees`
* `http://mysprykershop.com/category-nodes/{% raw %}{{{% endraw %}category_node_id{% raw %}}}{% endraw %}`

_Last review date: Feb 26, 2019_  <!-- by   Tihran Voitov and Dmitry Beirak-->


