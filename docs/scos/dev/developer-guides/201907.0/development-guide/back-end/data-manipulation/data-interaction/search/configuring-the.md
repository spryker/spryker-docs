---
title: Configuring the Search Features
originalLink: https://documentation.spryker.com/v3/docs/configuring-the-search-features
redirect_from:
  - /v3/docs/configuring-the-search-features
  - /v3/docs/en/configuring-the-search-features
---

In this section you’ll learn how to configure faceted navigation, filters, pagination and sorting, so all the important search features that are provided by the Search module.

This configuration is only relevant if you enable the three query expanders and result formatters mentioned above.

Indirectly, they all require you to provide an instance of `\Spryker\Client\Search\Dependency\Plugin\SearchConfigBuilderInterface` by `\Spryker\Client\Search\SearchDependencyProvider::createSearchConfigPlugin()` method. So first of all you’ll need to implement this interface.

```
<?php

namespace Pyz\Client\Catalog\Plugin\Config;

use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\Search\Dependency\Plugin\SearchConfigBuilderInterface;

/**
 * @method \Spryker\Client\Catalog\CatalogFactory getFactory()
 */
class CatalogSearchConfigBuilder extends AbstractPlugin implements SearchConfigBuilderInterface
{
    // ...
}
```
We’ll implement the first method in this interface is `buildFacetConfig()` where we configure our facet filters.

The goal here is to create `FacetConfigTransfer` instances with some data and push them for the `$facetConfigBuilder`.

Let’s assume that previously in our `PageMapInterface` we mapped an integer facet which we called “price” with some data (note the use of `addIntegerFacet()` in the example above), so now we would like to add a price range filter for that data.
```
<?php

namespace Pyz\Client\Catalog\Plugin\Config;

use Generated\Shared\Transfer\FacetConfigTransfer;
use Spryker\Client\Search\Dependency\Plugin\FacetConfigBuilderInterface;
// ...

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\FacetConfigBuilderInterface $facetConfigBuilder
     *
     * @return void
     */
    public function buildFacetConfig(FacetConfigBuilderInterface $facetConfigBuilder)
    {
        $priceFacet = (new FacetConfigTransfer())
            ->setName('price')
            ->setParameterName('price')
            ->setFieldName(PageIndexMap::INTEGER_FACET)
            ->setType(FacetConfigBuilder::TYPE_PRICE_RANGE);

        $facetConfigBuilder->addFacet($priceFacet);
    }

// ...
```
You could create and add as many `FacetConfigTransfers` as you need. Let’s analyze this transfer’s options below:

* **setName()**: *Required* field, the name of the target data to filter by.
* **setParameterName()**: *Required* field, the name that will be used in the request when the filter is used.
* **setFieldName()**: *Required* field, the name of the field of the page mapping type where the target data is stored.
* **setType()**: *Required* field, the type of the facet. Currently available options: “enumeration”, “bool”, “range”, “price_range”, “category”.
* **setIsMultiValued()**: *Optional* field, if set to true multiple values can be filtered with logical OR comparison.
* **setSize()**: *Optional* field, the maximum number of filter options to be returned (0 means unlimited). Elasticsearch returns 10 options by default.
* **setValueTransformer()**: *Optional* field, to provide a value transformer plugin by defining the Fully Qualified Name of the plugin. This plugin needs to implement `\Spryker\Client\Search\Dependency\Plugin\FacetSearchResultValueTransformerPluginInterface`. It's used to transform each filter value from their stored values (for example IDs) to something readable (representing name) for users.
* The next method we’ll implement is the`buildSortConfig()`, where we configure our sorting options. Let’s assume we’d like to sort by name and price and we’ve already added them when we implemented `PageMapInterface` (note the use of `addStringSort()` and `addIntegerSort(`) in the example above).

<details open>
<summary>Pyz\Client\Catalog\Plugin\Config</summary>
   
```
<?php

namespace Pyz\Client\Catalog\Plugin\Config;

use Generated\Shared\Transfer\SortConfigTransfer;
use Spryker\Client\Search\Dependency\Plugin\FacetConfigBuilderInterface;
// ...

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\SortConfigBuilderInterface $sortConfigBuilder
     *
     * @return void
     */
    public function buildSortConfig(SortConfigBuilderInterface $sortConfigBuilder)
    {
        $this
            ->addAscendingNameSort($sortConfigBuilder)
            ->addDescendingNameSort($sortConfigBuilder)
            ->addAscendingPriceSort($sortConfigBuilder)
            ->addDescendingPriceSort($sortConfigBuilder);
    }

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\SortConfigBuilderInterface $sortConfigBuilder
     *
     * @return $this
     */
    protected function addAscendingNameSort(SortConfigBuilderInterface $sortConfigBuilder)
    {
        $ascendingNameSortConfig = (new SortConfigTransfer())
            ->setName('name')
            ->setParameterName('name_asc')
            ->setFieldName(PageIndexMap::STRING_SORT);

        $sortConfigBuilder->addSort($ascendingNameSortConfig);

        return $this;
    }

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\SortConfigBuilderInterface $sortConfigBuilder
     *
     * @return $this
     */
    protected function addDescendingNameSort(SortConfigBuilderInterface $sortConfigBuilder)
    {
        $ascendingNameSortConfig = (new SortConfigTransfer())
            ->setName('name')
            ->setParameterName('name_desc')
            ->setFieldName(PageIndexMap::STRING_SORT)
            ->setIsDescending(true);

        $sortConfigBuilder->addSort($ascendingNameSortConfig);

        return $this;
    }

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\SortConfigBuilderInterface $sortConfigBuilder
     *
     * @return $this
     */
    protected function addAscendingPriceSort(SortConfigBuilderInterface $sortConfigBuilder)
    {
        $priceSortConfig = (new SortConfigTransfer())
            ->setName('price')
            ->setParameterName('price_asc')
            ->setFieldName(PageIndexMap::INTEGER_SORT);

        $sortConfigBuilder->addSort($priceSortConfig);

        return $this;
    }

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\SortConfigBuilderInterface $sortConfigBuilder
     *
     * @return $this
     */
    protected function addDescendingPriceSort(SortConfigBuilderInterface $sortConfigBuilder)
    {
        $priceSortConfig = (new SortConfigTransfer())
            ->setName('price')
            ->setParameterName('price_desc')
            ->setFieldName(PageIndexMap::INTEGER_SORT)
            ->setIsDescending(true);

        $sortConfigBuilder->addSort($priceSortConfig);

        return $this;
    }

// ...
```
</details>

Similar to facet filters, here you can create and add as many SortConfigTransfers as you need. The transfer’s options are the following:

* **setName()**: *Required* field, the name of the target data to sort by.
* **setParameterName()**: *Required* field, the name that will be used in the request when the sort is used.
* **setFieldName()**: *Required* field, the name of the field of the page mapping type where the target data is stored..
* **setIsDescending()**: *Optional* field, the sort direction is descending when this is set to true otherwise the sort direction is ascending by default.

{% info_block infoBox "Sort by relevance" %}
Note that Elasticsearch is by default sorting by relevance. The cost of each document is calculated based on your search query.
{% endinfo_block %}
The last method we’ll need to implement in the `CatalogSearchConfigBuilder` is the `buildPaginationConfig()` to configure the pagination of the results.
```
<?php

namespace Pyz\Client\Catalog\Plugin\Config;

use Generated\Shared\Transfer\PaginationConfigTransfer;
use Spryker\Client\Search\Dependency\Plugin\FacetConfigBuilderInterface;
// ...

    const DEFAULT_ITEMS_PER_PAGE = 6;
    const VALID_ITEMS_PER_PAGE_OPTIONS = [6, 18, 36];

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\PaginationConfigBuilderInterface $paginationConfigBuilder
     *
     * @return void
     */
    public function buildPaginationConfig(PaginationConfigBuilderInterface $paginationConfigBuilder)
    {
        $paginationConfigTransfer = (new PaginationConfigTransfer())
            ->setParameterName('page')
            ->setItemsPerPageParameterName('ipp')
            ->setDefaultItemsPerPage(static::DEFAULT_ITEMS_PER_PAGE)
            ->setValidItemsPerPageOptions(static::VALID_ITEMS_PER_PAGE_OPTIONS);

        $paginationConfigBuilder->setPagination($paginationConfigTransfer);
    }

// ...
```
This time we need to create only one instance from `PaginationConfigTransfer` and set it in the `$paginationConfigBuilder`. The transfer’s options are the following:

* **setParameterName()**: *Required* field, the name that will be used in the request for the current page.
* **setItemsPerPageParameterName()**: *Optional* field, if defined this name will be used in the request for changing the items per page parameter.
* **setDefaultItemsPerPage()**: *Optional* field, the value of the default items per page.
* **setValidItemsPerPageOptions()**: *Optional* field, an array of valid items per page options.

Having fully implemented the config builder plugin, add it on project level in the SearchDependencyProvider.
```
<?php

namespace Pyz\Client\Search;

use Pyz\Client\Catalog\Plugin\Config\CatalogSearchConfigBuilder;
use Spryker\Client\Kernel\Container;
use Spryker\Client\Search\SearchDependencyProvider as SprykerSearchDependencyProvider;

class SearchDependencyProvider extends SprykerSearchDependencyProvider
{

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Search\Dependency\Plugin\SearchConfigBuilderInterface
     */
    protected function createSearchConfigBuilderPlugin(Container $container)
    {
        return new CatalogSearchConfigBuilder();
    }

}
```
After you provided the instance of your search configuration builder, the *expander* and *result formatter* plugins will start to generate data next time you’ll run a search query. This tutorial doesn’t cover how to display the filters, but you can find examples using them in our Demo Shop.

