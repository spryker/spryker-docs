


This document describes how to integrate the CMS + Product Lists + Catalog feature into a Spryker project.

## Install feature core

Follow the steps below to install the CMS + Product Lists + Catalog feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- |  --- |
| Cms | {{page.version}} | [Install the CMS feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cms-feature.html) | 
| Product Lists | {{page.version}} | [Product Lists feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-lists-feature-integration.html) | 
| Catalog | {{page.version}} | | 
| Customer | {{page.version}} | | 

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/customer-catalog:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CustomerCatalog | vendor/spryker/customer-catalog |

{% endinfo_block %}

### Configure the catalog search count query

Add the following plugins to your project:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductListQueryExpanderPlugin | Extends a search query by filtering down results to match the current customer's product restrictions. | None |  \Spryker\Client\CustomerCatalog\Plugin\Search\ProductListQueryExpanderPlugin |

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
