---
title: Tax feature overview
originalLink: https://documentation.spryker.com/v6/docs/tax-feature-overview
originalArticleId: e34d6043-b88c-47d5-bbe5-06d3d4c92763
redirect_from:
  - /v6/docs/tax-feature-overview
  - /v6/docs/en/tax-feature-overview
---

The Tax feature allows you to define taxes for the items you sell. The feature is represented by two entities: tax rates and tax sets. 

The tax rate is the percentage of the sales price that buyer pays as a tax. In the default Spryker implementation, the tax rate is defined per country where the tax applies. See [Managing tax rates](https://documentation.spryker.com/v6/docs/managing-tax-rates-sets#managing-tax-rates) for details on how to create and manage tax rates for countries in the Back Office.

The tax set is a set of tax rates. You can [define tax sets in the Back office](https://documentation.spryker.com/v6/docs/managing-tax-rates-sets#managing-tax-sets) or[ import tax sets](/docs/scos/dev/developer-guides/202009.0/development-guide/data-import/data-import-categories/commerce-setup/file-details-tax.csv.html) into your project.

Tax sets can be applied to abstract product, product option and shipment:


| ENTITY | INSTRUCTIONS ON DEFINING TAX SETS FOR THE ENTITY IN THE BACK OFFICE  | DETAILS ON THE IMPORT FILE TO IMPORT TAX SETS FOR THE ENTITY |
| --- | --- | --- |
| Abstract product | [Defining prices](/docs/scos/user/user-guides/202009.0/back-office-user-guide/catalog/products/abstract-products/creating-abstract-products-and-product-bundles.html#defining-prices) | [File details: product_abstract.csv](/docs/scos/dev/developer-guides/202009.0/development-guide/data-import/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html#file-details--product_abstract-csv) |
| Product option | [Creating a product option](/docs/scos/user/user-guides/202009.0/back-office-user-guide/catalog/product-options/creating-a-product-option.html#creating-a-product-option) | [File details: product_option.csv](/docs/scos/dev/developer-guides/202009.0/development-guide/data-import/data-import-categories/special-product-types/product-options/file-details-product-option.csv.html) |
| Shipment | [Creating a delivery method](/docs/scos/user/user-guides/202009.0/back-office-user-guide/administration/delivery-methods/creating-and-managing-delivery-methods.html#creating-a-delivery-method) | [File details: shipment.csv](/docs/scos/dev/developer-guides/202009.0/development-guide/data-import/data-import-categories/commerce-setup/file-details-shipment.csv.html) |

## Avalara system for automated tax compliance
You can integrate the third-party system Avalara to automatically apply tax rates that depend on such factors as location, product type, and shipping rules. 

{% info_block warningBox %}

Avalara is mostly meant for the USA.

{% endinfo_block %}

To use Avalara, you need to [set up the AvaTax platform](https://help.avalara.com/Avalara_AvaTax_Update/Set_up_AvaTax_Update) for your application and integrate Avalara into your project. Once you do that, you can apply Avalara tax codes to automate tax calculations for your shop.   

You can set the Avalara tax codes for the following entities by importing the codes:
