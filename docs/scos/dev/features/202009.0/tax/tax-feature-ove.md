---
title: Tax feature overview
originalLink: https://documentation.spryker.com/v6/docs/tax-feature-overview
redirect_from:
  - /v6/docs/tax-feature-overview
  - /v6/docs/en/tax-feature-overview
---

The Tax feature allows you to define taxes for the items you sell. The feature is represented by two entities: tax rates and tax sets. 

The tax rate is the percentage of the sales price that buyer pays as a tax. In the default Spryker implementation, the tax rate is defined per country where the tax applies. See [Managing tax rates](https://documentation.spryker.com/docs/managing-tax-rates-sets#managing-tax-rates) for details on how to create and manage tax rates for countries in the Back Office.

The tax set is a set of tax rates. You can [define tax sets in the Back office](https://documentation.spryker.com/docs/managing-tax-rates-sets#managing-tax-sets) or[ import tax sets](https://documentation.spryker.com/docs/file-details-taxcsv) into your project.

Tax sets can be applied to abstract product, product option and shipment:


| ENTITY | INSTRUCTIONS ON DEFINING TAX SETS FOR THE ENTITY IN THE BACK OFFICE  | DETAILS ON THE IMPORT FILE TO IMPORT TAX SETS FOR THE ENTITY |
| --- | --- | --- |
| Abstract product | [Defining prices](https://documentation.spryker.com/docs/creating-abstract-products-and-product-bundles#defining-prices) | [File details: product_abstract.csv](https://documentation.spryker.com/docs/file-details-product-abstractcsv#file-details--product_abstract-csv) |
| Product option | [Creating a product option](https://documentation.spryker.com/docs/creating-a-product-option#creating-a-product-option) | [File details: product_option.csv](https://documentation.spryker.com/docs/file-details-product-optioncsv) |
| Shipment | [Creating a delivery method](https://documentation.spryker.com/docs/creating-and-managing-shipment-methods#creating-a-delivery-method) | [File details: shipment.csv](https://documentation.spryker.com/docs/file-details-shipmentcsv) |

## Avalara system for automated tax compliance
You can integrate the third-party system Avalara to automatically apply tax rates that depend on such factors as location, product type, and shipping rules. 

{% info_block warningBox %}

Avalara is mostly meant for the USA.

{% endinfo_block %}

To use Avalara, you need to [set up the AvaTax platform](https://help.avalara.com/Avalara_AvaTax_Update/Set_up_AvaTax_Update) for your application and integrate Avalara into your project. Once you do that, you can apply Avalara tax codes to automate tax calculations for your shop.   

You can set the Avalara tax codes for the following entities by importing the codes:
