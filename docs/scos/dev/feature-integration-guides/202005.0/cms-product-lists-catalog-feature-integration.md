---
title: CMS + Product Lists + Catalog feature integration
last_updated: Apr 24, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/cms-page-search-product-lists-catalog-feature-integration
originalArticleId: b42e2c34-0a53-49ba-ac3a-a40c269d80cc
redirect_from:
  - /v5/docs/cms-page-search-product-lists-catalog-feature-integration
  - /v5/docs/en/cms-page-search-product-lists-catalog-feature-integration
---

## Install Feature Core

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Cms | {{page.version}} |
| Product lists | {{page.version}} |
| Catalog | {{page.version}} |
| Customer | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command to install the required modules:
```bash
composer require spryker/customer-catalog:"^1.0.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| Module | Expected Directorz |
| --- | --- |
| CustomerCatalog | vendor/spryker/customer-catalog |

{% endinfo_block %}

## Set up Behavior

#### Configure the Catalog Search Count Query

Add the following plugins to your project:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `ProductListQueryExpanderPlugin` | Extends a search query by filtering down results to match the current customer's product restrictions. | None |  `\Spryker\Client\CustomerCatalog\Plugin\Search\ProductListQueryExpanderPlugin` |

**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**
    
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
         protected function createCatalogSearchCountQueryExpanderPlugins():             array
                    {
                             return [
                                        new ProductListQueryExpanderPlugin(),
                             ];
                 }
}
 ```

{% info_block warningBox "Verification" %}
Make sure that the number of products on the catalog tab item is correct according to the customer's assigned product lists.
{% endinfo_block %}
