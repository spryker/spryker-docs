---
title: Migration Guide - Multi-Currency
originalLink: https://documentation.spryker.com/v6/docs/mg-multi-currency
redirect_from:
  - /v6/docs/mg-multi-currency
  - /v6/docs/en/mg-multi-currency
---

## Migrating System to Multi-Currency
This article provides a whole overview of what needs to be done to have the multi-currency feature running in your Spryker shop. The multi-currency feature affects many Spryker modules so we split it into smaller parts. Here you will find the information that will help get you started with the multi-currency feature.
There is a chance that you already have the multi-currency enabled in some of the modules. In the list below you will find versions of the modules from when it has first been implemented as well as a link to an appropriate migration guide.
First run `composer update spryker/*` to update your all modules to the latest minor version.

1. Infrastructure for multi-currency:
**Store >= 1.2.*** - this is a new module, require it in composer and execute `propel install` for the new databases.
**Currency >= 3.2.*** - see [Migration Guide - Currency](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-currency) for more details.
**Money >= 2.3.*** - we have added a new form of money collection type, required by ZED money form inputs.
**ZedRequest >= 3.2.*** - we have added a new extension point for ZED request to add additional meta data to request `\Spryker\Client\Currency\Plugin\ZedRequestMetaDataProviderPlugin`, which sends currency with each ZED request.

2. The Orders now includes currency iso code, which is used when order is displayed to format price. We have changed `OrderSaver` and how prices are formatted for Order in Yves and Zed:
**Sales >= 8.*** - see [Migration Guide - Sales](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-sales) for more details.
**Quote >= 1.1.*** - stores current currency when quote is persisted.

3. **Discount** module has undergone big changes. Specifically, the way fixed discount calculation works has been changed. The way the amount is entered in Zed form has been changed as well (the amount requires currency now). Decision rules that MUST be built with currency/price mode decision rule include:
**Discount >= 5.*** - see .
**Calculation >= 4.2.*** - we have changed the way the discount amount is aggregated.
**Cart >= 4.2.*** - we have added a new facade method to rebuild cart items when currency is changed. Extension point to watch for cart item rebuild.
**CartCurrencyConnector** - new module provides plugin for cart rebuilding. <!-- See [Currency configuration](https://documentation.spryker.com/v4/docs/currency) for more details.-->
**ProductDiscountConnector >= 3.2.*** - we have changed the way the net price is assigned.
**ProductLabelDiscountConnector >= 1.2.*** - we have changed the way the net price is assigned.
**ShipmentDiscountConnector >= 1.1.*** - we have changed the way the net price is assigned.

4. For Shipment, we have changed the way the default price is assigned (currency-aware). Zed money input form has also been changed to accept multi-currency:
**Shipment >= 6.*** - see [Migration Guide - Shipment](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-shipment).
**ShipmentCartConnector** - is a new module, which provides plugins for cart to handle cases when currency changed. <!-- add a link See Integration guide for more details.-->

5. In Products, the way the price is entered in Zed has been changed to support multi-currency, price mode as well as price type variants. We have also changed the way the collector collects prices, the way Elasticsearch exports prices, the way the results coming from Elasticsearch are formatted, the way the prices are picked in cart when item is added:
 **CatalogPriceProductConnector** - we have added new currency aware formatter plugins for formatting prices when reading results from Elasticsearch. See Integration guide for more details.
**Price >= 5.*** - see [Migration Guide - Price](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-price).
**PriceProduct** - new module handling price product prices. Migration is a part of [Migration Guide - Price](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-price).
**PriceCartConnector >= 4.*** -  [Migration Guide - PriceCartConnector](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-price-cart-c) uses the new PriceProduct module.
**PriceDataFeed >= 0.2.*** - uses the new `PriceProduct` module.
**ProductBundle >= 4.*** - [Migration Guide - ProductBundle](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-product-bund) uses the new `PriceProduct` module, the new plugin to watch cart item reload action.
**ProductLabelGui >= 2.*** - see [Migration Guide - ProductLabelGui](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-product-labe).
**ProductManagement >= 0.9.*** - see [Migration Guide - ProductManagement](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-product-mana). New forms and views have been added.
**ProductRelation >= 2.*** - see [Migration Guide - ProductRelation](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-product-rela).
**ProductRelationCollector >= 2.*** - see [Migration Guide - ProductRelationCollector](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-product-rela).
**ProductSetGui >= 2.*** - see [Migration Guide - ProductSetGui](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-product-set-).
**Wishlist >= 2.*** - see [Migration Guide - Wishlist](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-wishlist).
**Search >= 7.0** - see [Migration Guide - Search](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-search).

6. Regarding the Product Options, the way the price is entered in Zed Admin UI has been changed to support multi-currency behavior. Now Collector collects prices by store and cart checkout has been amended to support multi-currency product options.
**ProductOptionCartConnector >= 5.*** - see [Migration Guide - Product Option Cart Connector](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-product-opti).
**ProductOption >= 6.*** - see [Migration Guide - Product Option](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-product-opti).

Some new configuration options have been made for the whole multi-currency feature: earlier the default price type was defined in environment configuration like `$config[PriceProductConstants::DEFAULT_PRICE_TYPE] = 'DEFAULT'`, now it's moved to: `\Spryker\Shared\PriceProduct\PriceProductConfig::getPriceTypeDefaultName`. Please note that you might get an exception that constant is not found - you can safely remove it, unless you used it in your code. In this case replace `\Spryker\Zed\PriceProduct\Business\PriceProductFacade::getDefaultPriceTypeName` or `\Spryker\Client\PriceProduct\PriceProductClient::getPriceTypeDefaultName` accordingly. Default price mode is defined in `\Spryker\Shared\Price\PriceConfig::getDefaultPriceMode`. Default currency is defined based on `config/Shared/stores.php`, array key `currencyIsoCodes` will be the first item in the list.

