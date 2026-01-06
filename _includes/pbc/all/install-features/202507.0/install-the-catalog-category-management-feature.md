

This document describes how to install the Catalog + Category Management feature.

## Install feature core

Follow the steps below to install the Catalog + Category Management feature core.

### Prerequisites

To start feature integration, integrate the required features

| NAME                | VERSION | INSTALLATION GUIDE                                            |
| ------------------- | ------- | ------------------------------------------------------------ |
| Spryker Core        | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Catalog             | 202507.0 |  |
| Category Management | 202507.0 | [Install the Category Management feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html) |

### 1) Set up behavior

Activate the following plugins:

| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE  |
| -------------- | --------------- | ------------- | ---------------- |
| CategoryTreeFilterPageSearchResultFormatterPlugin | Populates the `categoryTreeFilter` aggregation with category nodes which have the `docCount` relevant for the result set. |               | Spryker\Client\CategoryStorage\Plugin\Elasticsearch\ResultFormatter |
| SortedCategoryQueryExpanderPlugin                 | Adds category sorting to the base query.                     |               | Spryker\Client\SearchElasticsearch\Plugin\QueryExpander      |

**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```php
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

```php
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

Make sure the following:
- `CatalogClient::catalogSearch()` returns category nodes under the `categoryTreeFilter` index.
- The search query has a sort parameter.
- You can find categories using the global search on the Storefront.

{% endinfo_block %}

## Install related features

Integrate the following related features:

| FEATURE  | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE     |
| ------------- | ---------------- | -------------------- |
| Catalog             |      &check;     | |
| Category Management |      &check;     | [Install the Category Management feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html) |
