---
title: Configure search for multi-currency
description: This document describes how to configure search for multi-currency.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/search-multi-currency
originalArticleId: bd8aa34b-bd53-4d64-8292-cfa026880e00
redirect_from:
  - /2021080/docs/search-multi-currency
  - /2021080/docs/en/search-multi-currency
  - /docs/search-multi-currency
  - /docs/en/search-multi-currency
  - /v6/docs/search-multi-currency
  - /v6/docs/en/search-multi-currency
  - /v5/docs/search-multi-currency
  - /v5/docs/en/search-multi-currency
  - /v4/docs/search-multi-currency
  - /v4/docs/en/search-multi-currency
  - /v3/docs/search-multi-currency
  - /v3/docs/en/search-multi-currency
  - /v2/docs/search-multi-currency
  - /v2/docs/en/search-multi-currency
  - /v1/docs/search-multi-currency
  - /v1/docs/en/search-multi-currency
  - /v6/docs/multicurrency-search
  - /v6/docs/en/multicurrency-search
  - /v5/docs/multicurrency-search
  - /v5/docs/en/multicurrency-search
  - /v4/docs/multicurrency-search
  - /v4/docs/en/multicurrency-search
  - /v3/docs/multicurrency-search
  - /v3/docs/en/multicurrency-search
  - /v2/docs/multicurrency-search
  - /v2/docs/en/multicurrency-search
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/search/configuring-search-for-multi-currency.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/search/configure-search-for-multi-currency.html
  - /docs/pbc/all/search/202307.0/tutorials-and-howtos/configure-search-for-multi-currency.html
related:
  - title: Upgrade the Multi-Currency module
    link: docs/pbc/all/price-management/page.version/base-shop/install-and-upgrade/upgrade-modules/upgrade-to-multi-currency.html
  - title: Upgrade the Price module
    link: docs/pbc/all/price-management/page.version/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html
  - title: Configure Elasticsearch
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-elasticsearch.html
  - title: Configure search features
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-search-features.html
  - title: Configure a search query
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-a-search-query.html
  - title: Expand search data
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/expand-search-data.html
  - title: Facet filter overview and configuration
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/facet-filter-overview-and-configuration.html
---

If you don't have the multi-currency feature in your project and want to migrate, you have to follow certain steps to migrate your system. First, [migrate Price](/docs/pbc/all/price-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html) and [modules related to multi-currency](/docs/pbc/all/search/{{page.version}}/base-shop/tutorials-and-howtos/configure-search-for-multi-currency.html) before proceeding with the search for multi-currency.

In the multi-currency feature we store prices grouped by price mode and currency, so prices are as follows:
```php
{
 EUR : {
     GROSS_MODE : {
         DEFAULT : 100,
         ORIGINAL: 150
      },
      NET_MODE : {
          DEFAULT : 100,
          ORIGINAL: 150
      }
   }
}
```
The `price` field has the same structure, but the value has a different meaning. This value now stores a *default price*. Default price is the price having the default price type, currency, and price mode, which is defined in the price configuration. The price is stored grouped in elastic search, but before returning it for the view, we format it and return prices based on the currently selected currency, price mode, and price type. So the resulting structure or schema you get from the earch client is the same as before the multi-currency change:

```php
 prices : {
     DEFAULT : 100,
     ORIGINAL: 150
 }
   ```

The value is adjusted according to the customer state (currency, price mode, and price type). Because of this, you have to decorate `RawCatalogSearchResultFormatterPlugin` with `\Spryker\Client\CatalogPriceProductConnector\Plugin\CurrencyAwareCatalogSearchResultFormatterPlugin` in modules using it. For `\Pyz\Client\Catalog\CatalogDependencyProvider`:   

<details><summary>Pyz\Client\Catalog</summary>

```php
class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
    * @return \Spryker\Client\Search\Dependency\Plugin\ResultFormatterPluginInterface[]
    */
   protected function createCatalogSearchResultFormatterPlugins()
   {
       return [
           new FacetResultFormatterPlugin(),
           new SortedResultFormatterPlugin(),
           new PaginatedResultFormatterPlugin(),
           new CurrencyAwareCatalogSearchResultFormatterPlugin( //raw result decoration with multi currency logic
               new RawCatalogSearchResultFormatterPlugin()
           ),
           new SpellingSuggestionResultFormatterPlugin(),
       ];
   }

    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function createSuggestionResultFormatterPlugins()
    {
        return [
            new CompletionResultFormatterPlugin(),
            new CurrencyAwareSuggestionByTypeResultFormatter(  //suggestion result decoration with multi currency logic
                new SuggestionByTypeResultFormatterPlugin()
            ),
        ];
    }

    /**
    * @param \Spryker\Client\Kernel\Container $container
    *
    * @return \Spryker\Client\Kernel\Container
    */
   protected function provideFeatureProductsResultFormatterPlugins(Container$container)
   {
       $container[self::FEATURED_PRODUCTS_RESULT_FORMATTER_PLUGINS] = function () {
           return [
               new CurrencyAwareCatalogSearchResultFormatterPlugin( //raw result decoration with multi currency logic
                   new RawCatalogSearchResultFormatterPlugin()
               ),
           ];
       };

       return $container;
   }
}
```
</details>

For `\Pyz\Client\ProductNew\ProductNewDependencyProvider`:

**Pyz\Client\ProductNew**

```php
<?php

namespace Pyz\Client\ProductNew;

class ProductNewDependencyProvider extends AbstractDependencyProvider
{
    /**
   * @param \Spryker\Client\Kernel\Container $container
   *
   * @return \Spryker\Client\Kernel\Container
   */
  protected function addNewProductsResultFormatterPlugins(Container$container)
  {
      $container[self::NEW_PRODUCTS_RESULT_FORMATTER_PLUGINS] = function () {
          return [
              new FacetResultFormatterPlugin(),
              new SortedResultFormatterPlugin(),
              new PaginatedResultFormatterPlugin(),
              new CurrencyAwareCatalogSearchResultFormatterPlugin( /raw result decoration with multi currency logic
                  new RawCatalogSearchResultFormatterPlugin()
              ),
          ];
      };

      return $container;
  }
}
```

For `\Pyz\Client\ProductSale\ProductSaleDependencyProvider`:

**Pyz\Client\ProductSale**

```php
<?php

namespace Pyz\Client\ProductSale;

class ProductSaleDependencyProvider extends AbstractDependencyProvider
{
    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addSaleSearchResultFormatterPlugins(Container$container)
    {
        $container[self::SALE_SEARCH_RESULT_FORMATTER_PLUGINS] = function () {
            return [
                new FacetResultFormatterPlugin(),
                new SortedResultFormatterPlugin(),
                new PaginatedResultFormatterPlugin(),
                new CurrencyAwareCatalogSearchResultFormatterPlugin( /raw result decoration with multi currency logic
                    new RawCatalogSearchResultFormatterPlugin()
                ),
            ];
        };

        return $container;
    }
}

```

You also have to update the price expander to export grouped prices. To do this, change `\Pyz\Zed\ProductSearch\Business\Map\Expander\PriceExpander` class:

<details><summary>Pyz\Zed\ProductSearch\Business\Map\Expander</summary>

```php
<?php

namespace Pyz\Zed\ProductSearch\Business\Map\Expander;

use Spryker\Client\CatalogPriceProductConnector\CatalogPriceProductConnectorClientInterface;

class PriceExpander implements ProductPageMapExpanderInterface
{
    /**
 * @var string
 */
protected static $netPriceModeIdentifier;

/**
 * @var string
 */
protected static $grossPriceModeIdentifier;

/**
 * @var \Spryker\Zed\PriceProduct\Business\PriceProductFacadeInterface
 */
protected $priceProductFacade;

/**
 * @var \Spryker\Client\CatalogPriceProductConnector\CatalogPriceProductConnectorClientInterface
 */
protected $catalogPriceProductConnectorClient;

/**
* @param \Spryker\Zed\PriceProduct\Business\PriceProductFacadeInterface $priceProductFacade
* @param \Spryker\Client\CatalogPriceProductConnector\CatalogPriceProductConnectorClientInterface $catalogPriceProductConnectorClient
*/
public function __construct(PriceProductFacadeInterface $priceProductFacade,  CatalogPriceProductConnectorClientInterface $catalogPriceProductConnectorClient)
{
   $this->priceProductFacade = $priceProductFacade;
   $this->catalogPriceProductConnectorClient = $catalogPriceProductConnectorClient;
}

/**
* @param \Generated\Shared\Transfer\PageMapTransfer $pageMapTransfer
* @param \Spryker\Zed\Search\Business\Model\Elasticsearch\DataMapper\PageMapBuilderInterface $pageMapBuilder
* @param array $productData
* @param \Generated\Shared\Transfer\LocaleTransfer $localeTransfer
*
* @return \Generated\Shared\Transfer\PageMapTransfer
*/
public function expandProductPageMap(
   PageMapTransfer $pageMapTransfer,
   PageMapBuilderInterface $pageMapBuilder,
   array $productData,
   LocaleTransfer $localeTransfer
) {

   $price = $this->priceProductFacade->getPriceBySku($productData['abstract_sku']);

   $pageMapBuilder
       ->addSearchResultData($pageMapTransfer, 'price', $price)
       ->addIntegerSort($pageMapTransfer, 'price', $price)
       ->addIntegerFacet($pageMapTransfer, 'price', $price);

   $this->setPricesByType($pageMapBuilder, $pageMapTransfer, $productData);

   return $pageMapTransfer;
}

   /**
    * @param \Spryker\Zed\Search\Business\Model\Elasticsearch\DataMapper\PageMapBuilderInterface $pageMapBuilder
    * @param \Generated\Shared\Transfer\PageMapTransfer $pageMapTransfer
    * @param array $productData
    *
    * @return void
    */
   protected function setPricesByType(
       PageMapBuilderInterface $pageMapBuilder,
       PageMapTransfer $pageMapTransfer,
       array $productData
   ) {

       $pricesGrouped = $this->priceProductFacade->findPricesBySkuGrouped($productData['abstract_sku']);

       foreach ($pricesGrouped as $currencyIsoCode => $pricesByPriceMode) {
           foreach ($pricesByPriceMode as $priceMode => $pricesByType) {
               foreach ($pricesByType as $priceType => $price) {
                   $facetName = $this->catalogPriceProductConnectorClient->buildPricedIdentifierFor($priceType, $currencyIsoCode, $priceMode);
                   $pageMapBuilder->addIntegerFacet($pageMapTransfer, $facetName, $price);
                   $pageMapBuilder->addIntegerSort($pageMapTransfer, $facetName, $price);
               }
           }
       }

       $pageMapBuilder->addSearchResultData($pageMapTransfer, 'prices', $pricesGrouped);
   }
}

```
</details>

Inject a new dependency:

**Pyz\Zed\ProductSearch**

```php
<?php

namespace Pyz\Zed\ProductSearch;

class ProductSearchDependencyProvider extends SprykerProductSearchDependencyProvider
{
   const CLIENT_PRICE_PRODUCT_CONNECTOR_CLIENT = 'client price product connector client';

   /**
    * @param \Spryker\Zed\Kernel\Container $container
    *
    * @return \Spryker\Zed\Kernel\Container
    */
    public function provideBusinessLayerDependencies(Container $container)
    {
       $this->provideCatalogPriceProductConnectorClient($container);
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function provideCatalogPriceProductConnectorClient(Container $container)
    {
        $container[static::CLIENT_PRICE_PRODUCT_CONNECTOR_CLIENT] = function (Container $container) {
            return $container->getLocator()->catalogPriceProductConnector()->client();
        };

        return $container;
    }
}

```

**Pyz\Zed\ProductSearch\Business**

```php
<?php

namespace Pyz\Zed\ProductSearch\Business;

use Pyz\Zed\ProductSearch\Business\Map\Expander\PriceExpander;

class ProductSearchBusinessFactory extends SprykerProductSearchBusinessFactory
{
  /**
   *  @return \Pyz\Zed\ProductSearch\Business\Map\Expander\ProductPageMapExpanderInterface
   */
  protected function createPriceExpander()
  {
      return new PriceExpander($this->getPriceProductFacade(), $this->getCatalogPriceProductConnectorClient());
  }

  /**
   * @return \Spryker\Client\CatalogPriceProductConnector\CatalogPriceProductConnectorClientInterface
   */
  protected function getCatalogPriceProductConnectorClient()
  {
      return $this->getProvidedDependency(ProductSearchDependencyProvider::CLIENT_PRICE_PRODUCT_CONNECTOR_CLIENT);
  }
}

```

It is also needed to configure prices for catalog search in `\Pyz\Client\Catalog\Plugin\Config\CatalogSearchConfigBuilder`:

<details><summary>Pyz\Client\Catalog\Plugin\Config</summary>

```php
<?php

namespace Pyz\Client\Catalog\Plugin\Config;

class CatalogSearchConfigBuilder extends AbstractPlugin implements SearchConfigBuilderInterface
{
    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\FacetConfigBuilderInterface $facetConfigBuilder
     *
     * @return $this
     */
    protected function addPriceFacet(FacetConfigBuilderInterface $facetConfigBuilder)
    {
        $priceIdentifier = $this->getFactory()
           ->getCatalogPriceProductConnectorClient()
           ->buildPriceIdentifierForCurrentCurrency(); //new way of exporting prices to elasticsearch

       $priceFacet = (new FacetConfigTransfer())
           ->setName($priceIdentifier)
           ->setParameterName('price')
           ->setFieldName(PageIndexMap::INTEGER_FACET)
           ->setType(SearchConfig::FACET_TYPE_PRICE_RANGE);

       $facetConfigBuilder->addFacet($priceFacet);

        return $this;
    }

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\SortConfigBuilderInterface $sortConfigBuilder
     *
     * @return $this
     */
    protected function addAscendingPriceSort(SortConfigBuilderInterface $sortConfigBuilder)
    {
        $priceIdentifier = $this->getFactory()
            ->getCatalogPriceProductConnectorClient()
            ->buildPriceIdentifierForCurrentCurrency();

        $priceSortConfig = (new SortConfigTransfer())
            ->setName($priceIdentifier)
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
        $priceIdentifier = $this->getFactory()
            ->getCatalogPriceProductConnectorClient()
            ->buildPriceIdentifierForCurrentCurrency();

        $priceSortConfig = (new SortConfigTransfer())
            ->setName($priceIdentifier)
            ->setParameterName('price_desc')
            ->setFieldName(PageIndexMap::INTEGER_SORT)
            ->setIsDescending(true);

        $sortConfigBuilder->addSort($priceSortConfig);

        return $this;
    }
}

```
</details>

Inject a new dependency:

**Pyz\Client\Catalog**

```php
<?php

namespace Pyz\Client\Catalog;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    const CLIENT_PRICE_PRODUCT_CONNECTOR_CLIENT = 'client price product connector client';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container)
    {
        $container = $this->addCatalogPriceProductConnectorClient($container);
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addCatalogPriceProductConnectorClient(Container $container)
    {
        $container[static::CLIENT_PRICE_PRODUCT_CONNECTOR_CLIENT] = function (Container $container) {
            return $container->getLocator()->catalogPriceProductConnector()->client();
        };

        return $container;
    }
}

```

Create a factory method for the new dependency:

**Pyz\Client\Catalog**

```php
<?php

namespace Pyz\Client\Catalog;

class CatalogFactory extends SprykerCatalogFactory
{
      /**
       * @return \Spryker\Client\CatalogPriceProductConnector\CatalogPriceProductConnectorClientInterface
       */
      public function getCatalogPriceProductConnectorClient()
      {
          return $this->getProvidedDependency(CatalogDependencyProvider::CLIENT_PRICE_PRODUCT_CONNECTOR_CLIENT);
      }
}

```

After these changes, you can see prices based on the selected price mode and currency.
