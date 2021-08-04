---
title: Catalog + Category Management feature integration
originalLink: https://documentation.spryker.com/2021080/docs/catalog-category-management-feature-integration
redirect_from:
  - /2021080/docs/catalog-category-management-feature-integration
  - /2021080/docs/en/catalog-category-management-feature-integration
---

This document describes how to integrate the Catalog + Category Management into a Spryker project. 

## Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME                | VERSION | INTEGRATION GUIDE                                            |
| ------------------- | ------- | ------------------------------------------------------------ |
| Spryker Core        | master  | [Spryker Сore feature integration](https://documentation.spryker.com/2021080/docs/spryker-core-feature-integration) |
| Catalog             | master  |  |
| Category Management | master  | [Category Management feature integration](https://documentation.spryker.com/2021080/docs/category-management-feature-integration) |

## 1) Set up behavior

Activate the following plugins:

| PLUGIN                                            | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                                    |
| ------------------------------------------------- | ------------------------------------------------------------ | ------------- | ------------------------------------------------------------ |
| CategoryTreeFilterPageSearchResultFormatterPlugin | Populates the `categoryTreeFilter` aggregation with category nodes which have the `docCount` relevant for the result set. |               | Spryker\Client\CategoryStorage\Plugin\Elasticsearch\ResultFormatter |
| SortedCategoryQueryExpanderPlugin                 | Adds category sorting to the base query.                     |               | Spryker\Client\SearchElasticsearch\Plugin\QueryExpander      |

**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```
<?php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\CategoryStorage\Plugin\Elasticsearch\ResultFormatter\CategoryTreeFilterPageSearchResultFormatterPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
        /**
     * @return \Spryker\Client\Search\Dependency\Plugin\ResultFormatterPluginInterface[]|\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function createCatalogSearchResultFormatterPlugins(): array
    {
        return [
            new CategoryTreeFilterPageSearchResultFormatterPlugin(),
        ];
    }
}
```



**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```
<?php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\Catalog\Plugin\ConfigTransferBuilder\CategoryFacetConfigTransferBuilderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SortedCategoryQueryExpanderPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]|\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function createCatalogSearchQueryExpanderPlugins()
    {
        return [
            new SortedCategoryQueryExpanderPlugin(CategoryFacetConfigTransferBuilderPlugin::PARAMETER_NAME),
        ];
    }
}
```
{% info_block warningBox "Verification" %}

- Make sure that `CatalogClient::catalogSearch()` returns category nodes under the `categoryTreeFilter` index.
- Make sure that the search query has a sort parameter.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that you can find categories using the global search on the Storefront. 

{% endinfo_block %}

## Related features

Integrate the following related features:
 

| FEATURE             | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE                                            |
| ------------------- | -------------------------------- | ------------------------------------------------------------ |
| Catalog             |                 ✓                 | |
| Category Management |                    ✓              | [Category Management feature integration](https://documentation.spryker.com/2021080/docs/category-management-feature-integration) |

