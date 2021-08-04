---
title: PriceProduct module details- reference information
originalLink: https://documentation.spryker.com/2021080/docs/priceproduct-module-details-reference-information
redirect_from:
  - /2021080/docs/priceproduct-module-details-reference-information
  - /2021080/docs/en/priceproduct-module-details-reference-information
---

This article describes technical details of the [PriceProduct](https://github.com/spryker/price-product) module that are valid since [version 2](https://documentation.spryker.com/docs/mg-priceproduct#upgrading-from-version-1---to-version-2--) of the module. 

## Price dimension
Starting from vesion 2.0.0 of the PriceProduct module, to save BC, we have implemented *Default Price Dimension* inside the  PriceProduct, so all prices imported by new PriceProductDataImport would be in the Default Price Dimension. See [Prices per Merchant Relation](https://documentation.spryker.com/docs/price-per-merchant-relation-feature-overview) to learn more about the price dimension.

## PriceProductService
Starting from version 2.0.0 of the PriceProduct module, we have added the Service layer with `PriceProductService`. Its purpose is to choose only one price from the list of prices available for the current customer, taking into account the provided filter, which could contain selected Store, Currency, Price mode (gross or net), and Quote (with customer information inside).
The prices list can come from Yves (Storage) and Zed (DB).

* In case with Yves,  `PriceProductFilterTransfer` object should be created for filtering which contains named values (store name, currency code, named price mode, named price type).
* In case with Zed,`PriceProductCriteriaTransfer` object should be created for filtering, which contains IDs as values (store ID, currency ID, price type id, etc.).

If you need to add additional fields to one of these objects, add it to another one (if you added QTY to filter, criteria must be updated etc.). So that `PriceProductFilterTransfer` could always be converted to `PriceProductCriteriaTransfer`.

`PriceProductService` has plugins with `\Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductFilterPluginInterface` which allows to filter price for price dimension. 

This filter can be really simple and filter price only by price dimension name, but it can also bear some logic, for example finding the minimum price from this price dimension.

After that, the list of prices passed to service will be decreased to the list of filtered prices, which fits the Filter object only and filters plugins logic. 

Then `\Spryker\Service\PriceProduct\FilterStrategy\SinglePriceProductFilterStrategyInterface` is applied for filtered prices to find only ONE price (at the moment, there is only one built-in strategy `SinglePriceProductFilterMinStrategy` which finds MIN price).

There is Quote in a `filter/criteria` without items since this is additional information about the environment from where prices are requested.

That `filter/criteria` is a flat object, so we filter only by its properties, however, plugins can use additional information (e.g., Quote) for filtering.

## Using the price dimensions
The `PriceProduct` module has a set of plugins necessary for work with the price dimensions. All new plugin interfaces are now in the new module `PriceProductExtension`. They are as follows:

### Zed

- `PriceDimensionAbstractSaverPluginInterface` - saves price for abstract product in the DB for the selected price dimension (based on `PriceProductTransfer->getPriceDimension())`
- `PriceDimensionConcreteSaverPluginInterface` - saves price for concrete product in the DB for the selected price dimension (based on `PriceProductTransfer->getPriceDimension())`
- `PriceDimensionQueryCriteriaPluginInterface` - is used for expanding `PriceProductStoreQuery` using the new transfer object `QueryCriteriaTransfer`. 

Basing on `PriceProductCriteria`, you can build your own `QueryCriteria` to get prices using joins - all prices can be selected from needed price dimensions using only one SQL query. See the DB scheme:
![Database scheme](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Module+Migration+Guides/Migration+Guide+-+PriceProduct/priece-dimensions-diagram.png)

{% info_block errorBox "Important" %}

According to the DB scheme, `spy_price_product_store` table is the common storage for prices from different dimensions. If some price is the same for several dimensions, it will be stored as ONE record. So when a price is changed in one dimension, and there is no identical price in `spy_price_product_store`, the price will be stored as a new record in this table. This is done to avoid overriding prices in other dimensions. After some time, this table will have the so-called "orphaned records" (any price dimension does not have a reference to these prices). To automatically remove them, you can use `src/Pyz/Zed/PriceProduct/PriceProductConfig.php`:

```php
namespace Pyz\Zed\PriceProduct;

use Spryker\Zed\PriceProduct\PriceProductConfig as SprykerPriceProductConfig;
class PriceProductConfig extends SprykerPriceProductConfig
{
    /**
     * Perform orphan prices removing automatically.
     */
    protected const IS_DELETE_ORPHAN_STORE_PRICES_ON_SAVE_ENABLED = true;
}
```
or run `console price-product-store:optimize` from time to time when needed.

{% endinfo_block %}

### Service
- `PriceProductFilterPluginInterface` - filters array of prices based on `PriceProductFilterTransfer`

- `PriceProductDimensionExpanderStrategyPluginInterface` - expands `PriceProductDimension` transfer basing on some properties of this transfer (like `idPriceProductDefault`).

Reading prices from Storage is implemented in `PriceProductStorage` module, plugins for reading prices reside in `PriceProductStorageExtension` module (`\Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductStoragePriceDimensionPluginInterface`) which has two methods for reading prices from Storage: 
- `findProductConcretePrices($id)`, and
- `findProductAbstractPrices($id)`. 

Prices for price dimension inside Storage are supposed to be stored as a separate key-value for each product abstract and concrete. For example, can check `kv:price_product_abstract:X` (X = ID of product).

All plugins can be added on the project level in :
- `PriceProductDependencyProvider` for the Zed and Service layers; 
- `PriceProductStorageDependencyProvider` for the Client layer.

