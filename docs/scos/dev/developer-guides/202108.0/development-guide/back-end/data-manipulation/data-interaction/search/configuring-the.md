---
title: Configuring the search features
originalLink: https://documentation.spryker.com/2021080/docs/configuring-the-search-features
redirect_from:
  - /2021080/docs/configuring-the-search-features
  - /2021080/docs/en/configuring-the-search-features
---

This article explains how to configure faceted navigation, filters, pagination, and sorting, so all the important search features that are provided by the Search module.

This configuration is only relevant if you enable the three query expanders and the result formatters. See [Configuring the search query](https://documentation.spryker.com/docs/configuring-search-query) for details.

To build configuration for the search features, provide implementation for `\Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigBuilderPluginInterface`:

<details open>
<summary>SearchElasticsearch</summary>

```php
<?php

namespace Pyz\Client\Catalog\Plugin\SearchElasticsearch;

use Generated\Shared\Transfer\SearchConfigurationTransfer;
use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigBuilderPluginInterface;

/**
 * @method \Spryker\Client\Catalog\CatalogFactory getFactory()
 */
class CatalogSearchConfigBuilderPlugin extends AbstractPlugin implements SearchConfigBuilderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\SearchConfigurationTransfer $searchConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\SearchConfigurationTransfer
     */
    public function buildConfig(SearchConfigurationTransfer $searchConfigurationTransfer): SearchConfigurationTransfer
    {
        // Build configuration and extend $searchConfigurationTransfer
        
        return $searchConfigurationTransfer;
    }

}
```
</details>

First, add the code that configures your facet filters.

The goal is to create `FacetConfigTransfer` instances with some data, and set it as a property of `$searchConfigurationTransfer`.

Let’s assume that previously in your `PageMapInterface`you mapped an integer facet called “price” with some data (note the use of `addIntegerFacet()` in the example above). So now you want to add a price range filter for that data.

<details open>
<summary>Plugin\SearchElasticsearch</summary>

```php
<?php

namespace Pyz\Client\Catalog\Plugin\SearchElasticsearch;

use Generated\Shared\Transfer\FacetConfigTransfer;
use Generated\Shared\Transfer\SearchConfigurationTransfer;
// ...

    /**
     * @param \Generated\Shared\Transfer\SearchConfigurationTransfer $searchConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\SearchConfigurationTransfer
     */
    public function buildConfig(SearchConfigurationTransfer $searchConfigurationTransfer): SearchConfigurationTransfer
    {
        $searchConfigurationTransfer = $this->buildFacetConfig($searchConfigurationTransfer);

        return $searchConfigurationTransfer;
    }
    
    /**
     * @param \Generated\Shared\Transfer\SearchConfigurationTransfer $searchConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\SearchConfigurationTransfer
     */
    protected function buildFacetConfig(SearchConfigurationTransfer $searchConfigurationTransfer): SearchConfigurationTransfer
    {
        $priceFacetConfigTransfer = (new FacetConfigTransfer())
            ->setName('price')
            ->setParameterName('price')
            ->setFieldName(PageIndexMap::INTEGER_FACET)
            ->setType(FacetConfigBuilder::TYPE_PRICE_RANGE);

        $searchConfigurationTransfer->addFacetConfigItem($priceFacetConfigTransfer);

        return $searchConfigurationTransfer;
    }

// ...
```
</details>

You can create and add as many `FacetConfigTransfers` as you need. Let’s analyze this transfer’s options below:

* `setName()`: *Required* field; the name of the target data to filter by.
* `setParameterName()`: *Required* field; the name that is used in the request when the filter is used.
* `setFieldName()`: *Required* field; the name of the field of the page mapping type where the target data is stored.
* **setType()**: *Required* field; the type of the facet. Currently available options: “enumeration”, “bool”, “range”, “price_range”, “category”.
* `setIsMultiValued()`: *Optional* field; if set to *true*, multiple values can be filtered with logical OR comparison.
* `setSize()`: *Optional* field; the maximum number of filter options to be returned (`0` means unlimited). Elasticsearch returns 10 options by default.
* `setValueTransformer()`: *Optional* field; to provide a value transformer plugin by defining the Fully Qualified Name of the plugin. This plugin should implement `\Spryker\Client\SearchExtension\Dependency\Plugin\FacetSearchResultValueTransformerPluginInterface`. It's used to transform each filter value from their stored values (for example IDs) to something readable (representing name) for users.
* The next method you implement is the`buildSortConfig()`, where you configure your sorting options. Let’s assume you want to sort by name and price, and you’ve already added them when implementing `PageMapInterface` (check the use of `addStringSort()` and `addIntegerSort()` in the example above).

<details open>
<summary>Pyz\Client\Catalog\Plugin\Config</summary>
   
```php
<?php

namespace Pyz\Client\Catalog\Plugin\Config;

use Generated\Shared\Transfer\SortConfigTransfer;
// ...

    /**
     * @param \Generated\Shared\Transfer\SearchConfigurationTransfer $searchConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\SearchConfigurationTransfer
     */
    public function buildConfig(SearchConfigurationTransfer $searchConfigurationTransfer): SearchConfigurationTransfer
    {
        // ...
        $searchConfigurationTransfer = $this->buildSortConfig($searchConfigurationTransfer);

        return $searchConfigurationTransfer;
    }

/**
     * @param \Generated\Shared\Transfer\SearchConfigurationTransfer $searchConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\SearchConfigurationTransfer
     */
    protected function buildFacetConfig(SearchConfigurationTransfer $searchConfigurationTransfer): SearchConfigurationTransfer
    {
        foreach ($this->getFactory()->getFacetConfigTransferBuilderPlugins() as $facetConfigBuilderPlugin) {
            $searchConfigurationTransfer->addFacetConfigItem($facetConfigBuilderPlugin->build());
        }

        return $searchConfigurationTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\SearchConfigurationTransfer $searchConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\SearchConfigurationTransfer
     */
    public function buildSortConfig(SearchConfigurationTransfer $searchConfigurationTransfer)
    {
        $searchConfigurationTransfer = $this->addAscendingNameSort($searchConfigurationTransfer);
        $searchConfigurationTransfer = $this->addDescendingNameSort($searchConfigurationTransfer);
        $searchConfigurationTransfer = $this->addAscendingPriceSort($searchConfigurationTransfer);
        $searchConfigurationTransfer = $this->addDescendingPriceSort($searchConfigurationTransfer);

        return $searchConfigurationTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\SearchConfigurationTransfer $searchConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\SearchConfigurationTransfer
     */
    protected function addAscendingNameSort(SearchConfigurationTransfer $searchConfigurationTransfer)
    {
        $ascendingNameSortConfig = (new SortConfigTransfer())
            ->setName('name')
            ->setParameterName('name_asc')
            ->setFieldName(PageIndexMap::STRING_SORT);

        $searchConfigurationTransfer->addSortConfigItem($ascendingNameSortConfig);

        return $searchConfigurationTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\SearchConfigurationTransfer $searchConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\SearchConfigurationTransfer
     */
    protected function addDescendingNameSort(SearchConfigurationTransfer $searchConfigurationTransfer)
    {
        $ascendingNameSortConfig = (new SortConfigTransfer())
            ->setName('name')
            ->setParameterName('name_desc')
            ->setFieldName(PageIndexMap::STRING_SORT)
            ->setIsDescending(true);

        $searchConfigurationTransfer->addSortConfigItem($ascendingNameSortConfig);

        return $searchConfigurationTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\SearchConfigurationTransfer $searchConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\SearchConfigurationTransfer
     */
    protected function addAscendingPriceSort(SearchConfigurationTransfer $searchConfigurationTransfer)
    {
        $priceSortConfig = (new SortConfigTransfer())
            ->setName('price')
            ->setParameterName('price_asc')
            ->setFieldName(PageIndexMap::INTEGER_SORT);

        $searchConfigurationTransfer->addSortConfigItem($priceSortConfig);

        return $searchConfigurationTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\SearchConfigurationTransfer $searchConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\SearchConfigurationTransfer
     */
    protected function addDescendingPriceSort(SearchConfigurationTransfer $searchConfigurationTransfer)
    {
        $priceSortConfig = (new SortConfigTransfer())
            ->setName('price')
            ->setParameterName('price_desc')
            ->setFieldName(PageIndexMap::INTEGER_SORT)
            ->setIsDescending(true);

        $searchConfigurationTransfer->addSortConfigItem($priceSortConfig);

        return $searchConfigurationTransfer;
    }

// ...
```
</details>

Similar to facet filters, you can create and add as many `SortConfigTransfers` as you need. The transfer’s options are the following:

* `setName()`: *Required* field; the name of the target data to sort by.
* `setParameterName()`: *Required* field; the name that is used in the request when sorting is used.
* `setFieldName()`: *Required* field; the name of the field of the page mapping type where the target data is stored.
* `setIsDescending()`: *Optional* field; the sort direction is descending when this is set to true. Otherwise, the sort direction is ascending by default.

{% info_block infoBox "Sort by relevance" %}
Note that, by default, Elasticsearch is sorting by relevance. The cost of each document is calculated based on your search query.
{% endinfo_block %}
To add the code that configures the pagination of the results.
<details open>
<summary>Pyz\Client\Catalog\Plugin\Config</summary>

```php
<?php

namespace Pyz\Client\Catalog\Plugin\Config;

use Generated\Shared\Transfer\PaginationConfigTransfer;
// ...

    const DEFAULT_ITEMS_PER_PAGE = 6;
    const VALID_ITEMS_PER_PAGE_OPTIONS = [6, 18, 36];
    
    /**
     * @param \Generated\Shared\Transfer\SearchConfigurationTransfer $searchConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\SearchConfigurationTransfer
     */
    public function buildConfig(SearchConfigurationTransfer $searchConfigurationTransfer): SearchConfigurationTransfer
    {
        // ...
        $searchConfigurationTransfer = $this->buildPaginationConfig($searchConfigurationTransfer);

        return $searchConfigurationTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\SearchConfigurationTransfer $searchConfigurationTransfer
     * 
     * @return \Generated\Shared\Transfer\SearchConfigurationTransfer
     */
    public function buildPaginationConfig(SearchConfigurationTransfer $searchConfigurationTransfer)
    {
        $paginationConfigTransfer = (new PaginationConfigTransfer())
            ->setParameterName('page')
            ->setItemsPerPageParameterName('ipp')
            ->setDefaultItemsPerPage(static::DEFAULT_ITEMS_PER_PAGE)
            ->setValidItemsPerPageOptions(static::VALID_ITEMS_PER_PAGE_OPTIONS);
        
        $searchConfigurationTransfer->setPaginationConfig($paginationConfigTransfer);

        return $searchConfigurationTransfer;
    }

// ...
```
</details>

Here, create only one instance from `PaginationConfigTransfer` and pass it to the `$searchConfigurationTransfer->setPaginationConfig()`. The transfer’s options are the following:

* `setParameterName()`: *Required* field; the name that is used in the request for the current page.
* `setItemsPerPageParameterName()`: *Optional* field; if defined this name is used in the request for changing the items per page parameter.
* `setDefaultItemsPerPage()`: *Optional* field; the value of the default items per page.
* `setValidItemsPerPageOptions()`: *Optional* field; an array of valid items per page options.

Having implemented the config builder plugin, add it on the project level in `SearchElasticsearchDependencyProvider`:

```php
<?php

namespace Pyz\Client\SearchElasticsearch;

use Pyz\Client\Catalog\Plugin\SearchElasticsearch\CatalogSearchConfigBuilder;
use Spryker\Client\Kernel\Container;
use Spryker\Client\SearchElasticsearch\SearchElasticsearchDependencyProvider as SprykerSearchElasticsearchDependencyProvider;

class SearchDependencyProvider extends SprykerSearchElasticsearchDependencyProvider
{

   /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigBuilderPluginInterface[]
     */
    protected function getSearchConfigBuilderPlugins(Container $container): array
    {
        return [
            new CatalogSearchConfigBuilder()
        ];
    }

}
```
After providing the instance of your search configuration builder, the *expander* and *result formatter* plugins start to generate data next time when you run a search query. This tutorial doesn’t cover how to display the filters, but you can find examples using them in our Demo Shops.

