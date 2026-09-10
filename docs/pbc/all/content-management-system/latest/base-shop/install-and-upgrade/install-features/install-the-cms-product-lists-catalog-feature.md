---
title: Install the CMS + Product Lists + Catalog feature
description: Learn how to install the CMS + Product lists + Catalog feature in to your Spryker projects.
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/cms-page-search-product-lists-catalog-feature-integration
originalArticleId: c395ad85-27ce-44f2-a18f-69fce0d46ba6
redirect_from:
  - /2021080/docs/cms-page-search-product-lists-catalog-feature-integration
  - /2021080/docs/en/cms-page-search-product-lists-catalog-feature-integration
  - /docs/cms-page-search-product-lists-catalog-feature-integration
  - /docs/en/cms-page-search-product-lists-catalog-feature-integration
  - /docs/scos/dev/feature-integration-guides/201811.0/cms-product-lists-catalog-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202311.0/cms-product-lists-catalog-feature-integration.html
  - /docs/pbc/all/content-management-system/202311.0/install-and-upgrade/install-features/install-the-cms-product-lists-catalog-feature.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/install-and-upgrade/install-features/install-the-cms-product-lists-catalog-feature.html
related:
  - title: CMS pages in search results
    link: docs/pbc/all/content-management-system/latest/base-shop/cms-feature-overview/cms-pages-in-search-results-overview.html
  - title: CMS page
    link: docs/pbc/all/content-management-system/latest/base-shop/cms-feature-overview/cms-pages-overview.html
---

## Prerequisites

Install the following required features:

| NAME | VERSION |
| --- | --- |
| Cms | {{page.release_tag}} |
| Product lists | {{page.release_tag}} |
| Catalog | {{page.release_tag}} |
| Customer | {{page.release_tag}} |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/customer-catalog:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CustomerCatalog | vendor/spryker/customer-catalog |

{% endinfo_block %}

## Set up behavior

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
