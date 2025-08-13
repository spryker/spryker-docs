---
title: Upgrade to multi-currency
description: Learn how to upgrade and migrate your project to multi-currency to a newer version within your Spryker project.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-multi-currency
originalArticleId: 95dd322c-44ae-476b-8587-7773565cafc2
redirect_from:
  - /2021080/docs/mg-multi-currency
  - /2021080/docs/en/mg-multi-currency
  - /docs/mg-multi-currency
  - /docs/en/mg-multi-currency
  - /v1/docs/mg-multi-currency
  - /v1/docs/en/mg-multi-currency
  - /v2/docs/mg-multi-currency
  - /v2/docs/en/mg-multi-currency
  - /v3/docs/mg-multi-currency
  - /v3/docs/en/mg-multi-currency
  - /v4/docs/mg-multi-currency
  - /v4/docs/en/mg-multi-currency
  - /v5/docs/mg-multi-currency
  - /v5/docs/en/mg-multi-currency
  - /v6/docs/mg-multi-currency
  - /v6/docs/en/mg-multi-currency
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-multi-currency.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-multi-currency.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-multi-currency.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-multi-currency.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-multi-currency.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-multi-currency.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-multi-currency.html
  - /docs/scos/dev/module-migration-guides/202311.0/migration-guide-multi-currency.html  
  - /docs/pbc/all/price-management/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-to-multi-currency.html
related:
  - title: Upgrade the Currency
    link: docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-currency-module.html
  - title: Upgrade the Sales
    link: docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-sales-module.html
  - title: Upgrade the Price
    link: docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html
  - title: Upgrade the Discount
    link: docs/pbc/all/discount-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-discount-module.html
  - title: Upgrade the Shipment
    link: docs/pbc/all/carrier-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipment-module.html
---

This article provides a whole overview of what needs to be done to have the multi-currency feature running in your Spryker shop. The multi-currency feature affects many Spryker modules so we split it into smaller parts. Here you will find the information that will help get you started with the multi-currency feature.
There is a chance that you already have the multi-currency enabled in some of the modules. In the list below you will find versions of the modules from when it has first been implemented as well as a link to an appropriate migration guide.

Update your all modules to the latest minor version:

```bash
composer update spryker/*
```

1. Infrastructure for multi-currency:

   - **Store >= 1.2.** — this is a new module, require it in composer and execute `propel install` for the new databases.
   - **Currency >= 3.2.** — see [Upgrade the Currency module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-currency-module.html) for more details.
   - **Money >= 2.3.** — we have added a new form of money collection type, required by ZED money form inputs.
   - **ZedRequest >= 3.2.** — we have added a new extension point for ZED request to add additional meta data to request `\Spryker\Client\Currency\Plugin\ZedRequestMetaDataProviderPlugin`, which sends currency with each ZED request.

2. The Orders now includes currency iso code, which is used when order is displayed to format price. We have changed `OrderSaver` and how prices are formatted for Order in Yves and Zed:

   - **Sales >= 8.** — see [Upgrade the Sales module](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-sales-module.html) for more details.
   - **Quote >= 1.1.** — stores current currency when quote is persisted.

3. **Discount** module has undergone big changes. Specifically, the way fixed discount calculation works has been changed. The way the amount is entered in Zed form has been changed as well (the amount requires currency now). Decision rules that MUST be built with currency/price mode decision rule include:

   - **Discount >= 5.** — see .
   - **Calculation >= 4.2.** — we have changed the way the discount amount is aggregated.
   - **Cart >= 4.2.** — we have added a new facade method to rebuild cart items when currency is changed. Extension point to watch for cart item rebuild.
   - **CartCurrencyConnector** - new module provides plugin for cart rebuilding. <!-- See [Currency configuration](/docs/pbc/all/price-management/{{site.version}}/base-shop/extend-and-customize/multiple-currencies-per-store-configuration.html) for more details.-->
   - **ProductDiscountConnector >= 3.2.** — we have changed the way the net price is assigned.
   - **ProductLabelDiscountConnector >= 1.2.** — we have changed the way the net price is assigned.
   - **ShipmentDiscountConnector >= 1.1.** — we have changed the way the net price is assigned.

4. For Shipment, we have changed the way the default price is assigned (currency-aware). Zed money input form has also been changed to accept multi-currency:

   - **Shipment >= 6.**—see [Upgrade the Shipment module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipment-module.html).
   - **ShipmentCartConnector**—is a new module, which provides plugins for cart to handle cases when currency changed. <!-- add a link See Integration guide for more details.-->

5. In Products, the way the price is entered in Zed has been changed to support multi-currency, price mode as well as price type variants. We have also changed the way the collector collects prices, the way Elasticsearch exports prices, the way the results coming from Elasticsearch are formatted, the way the prices are picked in cart when item is added:

   - **CatalogPriceProductConnector** - we have added new currency aware formatter plugins for formatting prices when reading results from Elasticsearch. See Integration guide for more details.
   - **Price >= 5.***—see [Upgrade the Price module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html).
   - **PriceProduct** - new module handling price product prices. Migration is a part of [Upgrade the Price module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html).
   - **PriceCartConnector >= 4.** — [Upgrade the PriceCartConnector module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-pricecartconnector-module.html) uses the new PriceProduct module.
   - **PriceDataFeed >= 0.2.** — uses the new `PriceProduct` module.
   - **ProductBundle >= 4.** — [Upgrade the ProductBundle module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productbundle-module.html) uses the new `PriceProduct` module, the new plugin to watch cart item reload action.
   - **ProductLabelGui >= 2.** — see [Upgrade the ProductLabelGui module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productlabelgui-module.html).
   - **ProductManagement >= 0.9.** — see [Upgrade the ProductManagement module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productmanagement-module.html). New forms and views have been added.
   - **ProductRelation >= 2.** — see [Upgrade the ProductRelation module](/docs/pbc/all/product-relationship-management/{{page.version}}/install-and-upgrade/upgrade-the-productrelation-module.html).
   - **ProductRelationCollector >= 2.** — see [Upgrade the ProductRelationCollector module](/docs/pbc/all/product-relationship-management/{{page.version}}/install-and-upgrade/upgrade-the-productrelationcollector-module.html).
   - **ProductSetGui >= 2.** — see [Upgrade the ProductSetGui module](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productsetgui-module.html).
   - **Wishlist >= 2.** — see [Upgrade the Wishlist module](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-wishlist-module.html).
   - **Search >= 7.0** - see [Migration Guide - Search](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-search–module.html).

6. Regarding the Product Options, the way the price is entered in Zed Admin UI has been changed to support multi-currency behavior. Now Collector collects prices by store and cart checkout has been amended to support multi-currency product options.

   - **ProductOptionCartConnector >= 5.** — see [Upgrade the ProductOptionCartConnector module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productoptioncartconnector-module.html).
   - **ProductOption >= 6.** — see [Upgrade the ProductOption module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productoption-module.html).

Some new configuration options have been made for the whole multi-currency feature: earlier the default price type was defined in environment configuration like `$config[PriceProductConstants::DEFAULT_PRICE_TYPE] = 'DEFAULT'`, now it's moved to: `\Spryker\Shared\PriceProduct\PriceProductConfig::getPriceTypeDefaultName`. You might get an exception that constant is not found - you can safely remove it, unless you used it in your code. In this case replace `\Spryker\Zed\PriceProduct\Business\PriceProductFacade::getDefaultPriceTypeName` or `\Spryker\Client\PriceProduct\PriceProductClient::getPriceTypeDefaultName` accordingly. Default price mode is defined in `\Spryker\Shared\Price\PriceConfig::getDefaultPriceMode`. Default currency is defined based on `config/Shared/stores.php`, array key `currencyIsoCodes` will be the first item in the list.
