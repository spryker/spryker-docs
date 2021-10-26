---
title: CMS Page- Search + Product Lists + Catalog feature integration
description: The CMS Page Search Product Lists feature allows seeing search results for CMS and product pages. The guide describes how to enable the feature in the project.
last_updated: Nov 22, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v2/docs/cms-page-search-product-lists-catalog-feature-integration
originalArticleId: 041bb0f9-59bf-4b2f-8df3-daf6ed5f9783
redirect_from:
  - /v2/docs/cms-page-search-product-lists-catalog-feature-integration
  - /v2/docs/en/cms-page-search-product-lists-catalog-feature-integration
---

## Install Feature Core

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Cms | 201903.0 |
| Product lists | 201903.0 |
| Catalog | 201903.0 |

### 1) Set up Behavior

#### Configure the Catalog Search Count Query

Add the following plugins to your project:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `ProductListQueryExpanderPlugin` | Extends a search query by filtering down results to match the current customer's product restrictions. | None |  `\Spryker\Client\CustomerCatalog\Plugin\Search\ProductListQueryExpanderPlugin` |

<details open>
    <summary markdown='span'> src/Pyz/Client/Catalog/CatalogDependencyProvider.php</summary>
    
 ```php
 <?php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\CustomerCatalog\Plugin\Search\ProductListQueryExpanderPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
 /**
 * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]
 */
 protected function createCatalogSearchCountQueryExpanderPlugins(): array
 {
 return [
 new ProductListQueryExpanderPlugin(),
 ];
 }
}
 ```
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that the number of products on the catalog tab item is correct according to the customer's assigned product lists.
{% endinfo_block %}
