---
title: Tax feature overview
originalLink: https://documentation.spryker.com/2021080/docs/tax-feature-overview
redirect_from:
  - /2021080/docs/tax-feature-overview
  - /2021080/docs/en/tax-feature-overview
---

The *Tax* feature allows you to define taxes for the items you sell. The feature is represented by two entities: tax rates and tax sets. 

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

To use Avalara, you need to [set up the AvaTax platform](https://help.avalara.com/Avalara_AvaTax_Update/Set_up_AvaTax_Update) for your application and [integrate Avalara](https://documentation.spryker.com/2021080/docs/avalara-tax-integration) into your project. Once you do that, you can [apply Avalara tax codes](https://help.avalara.com/Avalara_AvaTax_Update/Avalara_tax_codes) to automate tax calculations for your shop.   

You can set the Avalara tax codes for the following entities by importing the codes:

* Abstract product: See [File details: product_abstract.csv](https://documentation.spryker.com/2021080/docs/file-details-product-abstractcsv) for details on import.
* Product option: See [File details: product_option.csv](https://documentation.spryker.com/2021080/docs/file-details-product-optioncsv) for details on import.
* Shipment: [See File details: shipment.csv](https://documentation.spryker.com/2021080/docs/file-details-shipmentcsv) for details on import. 

{% info_block infoBox %}

Since shipment and products fall under different taxability categories, Avalara tax code for shipment is different from that of the abstract product or product option. See [Avalara tax code search](https://taxcode.avatax.avalara.com/) for details on the codes and categories.

{% endinfo_block %}

The Avalara codes are not displayed on the Storefront or in the Back Office. They are processed in the background to define taxes for order items. Avalara calculates taxes during the checkout, and, by default, the taxes are shown at the final checkout step.

When calculating taxes, Avalara takes the items' [warehouse addresses](https://documentation.spryker.com/2021080/docs/inventory-management-feature-overview#defining-a-warehouse-address) into account. Therefore, each order item you calculate a tax for with Avalara, should have a warehouse assigned. See [Warehouse assignment](https://documentation.spryker.com/2021080/docs/inventory-management-feature-overview#warehouse-assignment-to-order-items--with-avalara-integration-only-) to order items to learn how warehouses are assigned to order items by default.

## Tax feature on the Storefront

Product tax set is calculated when buyers add products to cart. Therefore, by default, the tax calculated on the basis of the product tax sets is displayed in the *Tax* section on the *Cart* page. However, the tax value on the *Cart* page is not always final, as it does not take a possible shipment tax set into account since buyers select the shipping method during the checkout. If you have Avalara integrated, it calculates tax during the checkout as well. Therefore, the final tax value is always displayed only upon checkout.

Tax on the *Cart* page:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/tax-in-cart.png){height="" width=""}

Tax in the checkout:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/tax-in-checkout.png){height="" width=""}

## Current constraints

Currently, the feature has the following functional constraints:

* There is no Back Office UI for the Avalara tax codes.
* Many Avalara features are not supported yet. This will be resolved in the future.


