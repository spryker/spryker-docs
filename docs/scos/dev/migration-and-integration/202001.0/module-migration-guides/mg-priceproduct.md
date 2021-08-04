---
title: Migration Guide - PriceProduct
originalLink: https://documentation.spryker.com/v4/docs/mg-priceproduct
redirect_from:
  - /v4/docs/mg-priceproduct
  - /v4/docs/en/mg-priceproduct
---

## Upgrading from Version 2.* to Version 4.0.0
{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions.)

## Upgrading from Version 1.* to Version 2.*
There are new functionalities and changes that were added in this new module release. First of all, the changes imply implementation of the Price Dimension concept as well as adding of Service layer with PriceProductService. Read on to learn more about the changes and migration to the new version.

### Price Dimension Concept
In the previous version of the `PriceProduct` module, a product had only one price per store (and multi-currency) with gross and net amounts.
By adding this concept to the new release, you can set specific prices for each customer separately. Having logged in, user with these specific prices will see another prices in Catalog and will be able to buy products for own price.

To save BC, we have implemented Default Price Dimension inside the new `PriceProduct` module, so all prices imported by new `PriceProductDataImport` will be in the Default Price Dimension. See [Prices per Merchant Relation](/docs/scos/dev/features/202001.0/price/prices-per-merchant-relation/price-per-merch) to learn more about the price dimension.
Prices from price dimensions could be stored not only in DB, but also in Storage, therefore the update of the `PriceProductStorage` module was necessary. The new version 2.0.0 of the `PriceProduct` module already supports price dimensions and has Default Price Dimension implemented.

To migrate the changes to the module, do the following:

1. Upgrade your Database structure

- Run 

```bash
console propel:install
```

2. Enable the new `PriceProductDataImport` module

To enable the new price importer you need to
- remove project level `PriceProductDataImport` (`Pyz\Zed\DataImport\Business\Model\ProductPrice\ProductPriceWriterStep`) from `\Pyz\Zed\DataImport\Business\DataImportBusinessFactory`;
- install the new importer module:

```bash
composer install spryker/price-product-data-import
```

- enable the new module by adding
`\Spryker\Zed\PriceProductDataImport\Communication\Plugin\PriceProductDataImportPlugin` to `\Pyz\Zed\DataImport\DataImportDependencyProvider::getDataImporterPlugins()`

If you have customized `PriceProductDataImport` on project level, you are still able to continue use it. The only change needed is:
- add `$this->savePriceProductDefault($priceProductStoreEntity->getPrimaryKey());` at the end of your `PriceProductWriterStep`

```php
/**
 * @param string $idPriceProductStore
 *
 * @return void
 */
protected function savePriceProductDefault(string $idPriceProductStore): void
{
    $priceProductDefaultEntity = SpyPriceProductDefaultQuery::create()
        ->filterByFkPriceProductStore($idPriceProductStore)
        ->findOneOrCreate();
    if ($priceProductDefaultEntity->isNew()) {
        $priceProductDefaultEntity->save();
    }
}
```

3. Update PriceProductStorage

- Run

```bash
composer require spryker/price-product-storage:"^2.0.0"
```

Now that the module supports plugins for reading prices from different price dimensions, you can put your own plugins here: 
- `\Pyz\Client\PriceProductStorage\PriceProductStorageDependencyProvider::getPriceDimensionStorageReaderPlugins()`

### PriceProductService
In this new version of `PriceProduct` module we have added Service layer with `PriceProductService`. Its purpose is to choose only one price from the list of prices available for the current customer, taking into account the provided filter, which could contain selected Store, Currency, Price mode (gross or net) and Quote (with customer information inside).
The prices list can come from Yves (Storage) and Zed (DB).

* In case with Yves, we have to create `PriceProductFilterTransfer` object for filtering which contains named values (store name, currency code, named price mode, named price type).
* In case with Zed, we have to create `PriceProductCriteriaTransfer` object for filtering which contains IDs as values (store ID, currency ID, price type id, etc.).

If you need to add additional fields to one of these objects, add it to another one (if you added QTY to filter, criteria must be updated etc). So that `PriceProductFilterTransfer` could always be converted to `PriceProductCriteriaTransfer`.

`PriceProductService` has plugins with `\Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductFilterPluginInterface` which allows to filter price for price dimension. 

This filter can be really simple and filter price only by price dimension name, but it can also bear some logic, for example finding minimum price from this price dimension.

After that the list of prices passed to service will be decreased to the list of filtered prices which fits the Filter object only and filters plugins logic. 

Then `\Spryker\Service\PriceProduct\FilterStrategy\SinglePriceProductFilterStrategyInterface` is applied for filtered prices to find only ONE price (at the moment, there is only one built-in strategy `SinglePriceProductFilterMinStrategy` which finds MIN price).

There is Quote in a `filter/criteria` without items since this is additional information about the environment from where prices are requested.

That `filter/criteria` is a flat object, so we filter only by its properties, however plugins can use additional information (e.g. Quote) for filtering.

### Using the Price Dimensions
In new `PriceProduct` module we have added a set of plugins necessary fo work with price dimensions. All new plugin interfaces are now in the new module `PriceProductExtension`. They are as follows:

#### Zed

- `PriceDimensionAbstractSaverPluginInterface` - saves price for abstract product in the DB for the selected price dimension (based on `PriceProductTransfer->getPriceDimension())`
- `PriceDimensionConcreteSaverPluginInterface` - saves price for concrete product in the DB for the selected price dimension (based on `PriceProductTransfer->getPriceDimension())`
- `PriceDimensionQueryCriteriaPluginInterface` is used for expanding `PriceProductStoreQuery` using new transfer object `QueryCriteriaTransfer`. 

Basing on `PriceProductCriteria`, you can build your own `QueryCriteria` to get prices using joins - all prices can be selected from needed price dimensions using only one SQL query. See the DB scheme:
![Database scheme](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Module+Migration+Guides/Migration+Guide+-+PriceProduct/priece-dimensions-diagram.png){height="" width=""}

#### Service
- `PriceProductFilterPluginInterface` - filters array of prices based on `PriceProductFilterTransfer`

- `PriceProductDimensionExpanderStrategyPluginInterface` - expands `PriceProductDimension` transfer basing on some properties of this transfer (like `idPriceProductDefault`).

As mentioned above, reading prices from Storage is implemented in `PriceProductStorage` module, plugins for reading prices reside in `PriceProductStorageExtension` module (`\Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductStoragePriceDimensionPluginInterface`) which has two methods for reading prices from Storage: 
- `findProductConcretePrices($id)`, and;
- `findProductAbstractPrices($id)`. 

Prices for price dimension inside Storage are supposed to be stored as a separate key-value for each product abstract and concrete. (as example you can check `kv:price_product_abstract:X` (X = ID of product)

All plugins can be added on project level in :
- `PriceProductDependencyProvider` for Zed and Service layers; 
- `PriceProductStorageDependencyProvider` for Client layer.

### Changes Inside the Modules
**PriceProduct:**

* Added dependency to `PriceProductExtension` and `QuoteClient`.
* `PriceProductService` service injected to `PriceProductFacade` and `PriceProductClient` (in new method `resolvePriceTransfer(PriceProductTransfer[] $pPriceProductTransfers)`.
* Now if customer has multiple prices (e.g. from Store (default prices) and from Merchants) minimum price is resolved.
* `ProductPriceClient::resolveProductPrice()` is deprecated and now works only with default prices (prices from Store).
* Added new `ProductPriceClient:resolveProductPriceTransfer()` method which can work with multi dimension prices.
* Added `PriceProductDimensionTransfer` and added  transfer objects to `PriceProduct`, `PriceProductFilter`, `PriceProductCriteria`.
* Changes in Client models:
    * `ProductPriceResolver` constructor now requires `QuoteClient`, `PriceProductService`

* Changes in Zed models:
    * `PriceProductAbstractReader` constructor now requires `PriceProductRepository` (new), `PriceProductService`, `PriceProductExpander` (new)
    * `PriceProductAbstractReader` interface changed for `findProductAbstractPricesBySkuForCurrentStore(string $sku, PriceProductDimensionTransfer $priceProductDimensionTransfer)` and `findPriceForProductAbstract(string $sku, PriceProductCriteriaTransfer $priceProductCriteriaTransfer): ?PriceProductTransfer` (before array was returned)
    * `PriceProductAbstractWriter` constructor now requires `PriceProductDefaultWriter` (new)
    * `PriceProductService`, `PriceProductExpander` (new), `PriceDimensionAbstractSaverPlugin[]`, `PriceProductEntityManager` (new), `PriceProductConfig
    * `PriceProductConcreteReader` constructor now requires `PriceProductRepository` (new), `PriceProductService`, `PriceProductExpander` (new)
    * `PriceProductConcreteReader` interface changed for `findProductAbstractPricesBySkuForCurrentStore(string $sku, PriceProductDimensionTransfer $priceProductDimensionTransfer)` and `findPriceForProductConcrete(string $sku, PriceProductCriteriaTransfer $priceProductCriteriaTransfer): ?PriceProductTransfer; (before array was returned)`
    * `PriceProductConcreteWriter` constructor now requires `PriceProductDefaultWriter` (new), `PriceProductService`, `PriceProductExpander` (new), `PriceDimensionConcreteSaverPluginInterface[]`, `PriceProductEntityManager` (new), `PriceProductConfig`
    * `PriceProductMapper` constructor requires `PriceProductConfig`, `mapPriceProductTransferCollection()` removed and added new one `mapPriceProductStoreEntitiesToPriceProductTransfers()`
    * `PriceProductStoreWriter::persistPriceProductStore()` now returns `PriceProductTransfer`
    * `PriceGrouper` constructor requires `PriceProductConfig`
    * `Reader` constructor requires `PriceProductConfig`
    * `Writer` constructor requires `PriceProductDefaultWriter` (new), `PriceDimensionAbstractSaverPlugin[]`, `PriceDimensionConcreteSaverPlugin[]`

**PriceProductStorage:**

* Added dependency to `PriceProductStorageExtension`
* `PriceAbstractStorageReader` constructor requires `PriceProductMapper` (new), `PriceProductStoragePriceDimensionPlugin[]`

