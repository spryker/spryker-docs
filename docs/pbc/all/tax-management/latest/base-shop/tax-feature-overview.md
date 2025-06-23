---
title: Tax feature overview
description: With the Tax Management capability you can define taxes for the items you sell.
last_updated: Jun 25, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/tax-feature-overview
originalArticleId: 2ca980d2-d08b-4511-b26c-4cafa8624283
redirect_from:
  - /2021080/docs/tax-feature-overview
  - /2021080/docs/en/tax-feature-overview
  - /docs/tax-feature-overview
  - /docs/en/tax-feature-overview
  - /2021080/docs/tax
  - /2021080/docs/en/tax
  - /docs/tax
  - /docs/en/tax
  - /2021080/docs/international-tax-rates-sets-1
  - /2021080/docs/en/international-tax-rates-sets-1
  - /docs/international-tax-rates-sets-1
  - /docs/en/international-tax-rates-sets-1
  - /docs/scos/user/features/202200.0/tax-feature-overview.html
  - /docs/scos/user/features/202311.0/tax-feature-overview.html
  - /docs/pbc/all/tax-management/tax-management.html
  - /docs/pbc/all/tax-management/202311.0/base-shop/spryker-tax/tax-feature-overview.html
---

The *Tax* feature lets you define taxes for the items you sell. The feature is represented by two entities: tax rates and tax sets.

The tax rate is the percentage of the sales price that buyer pays as a tax. In the default Spryker implementation, the tax rate is defined per country where the tax applies. For details about how to create tax rates for countries in the Back Office, see [Create tax rates](/docs/pbc/all/tax-management/latest/base-shop/manage-in-the-back-office/create-tax-rates.html).

A tax set is a set of tax rates. You can [define tax sets in the Back office](/docs/pbc/all/tax-management/latest/base-shop/manage-in-the-back-office/create-tax-sets.html) or [import tax sets](/docs/pbc/all/tax-management/latest/base-shop/import-and-export-data/import-file-details-tax-sets.csv.html) into your project.

Tax sets can be applied to an abstract product, product option, and shipment:


| ENTITY | DEFINE TAX SETS IN THE BACK OFFICE  | IMPORT TAX SETS |
| --- | --- | --- |
| Abstract product | [Define prices](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html#define-prices) | [File details: product_abstract.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html) |
| Product option | [Creating a product option](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/product-options/create-product-options.html) | [File details: product_option.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/product-options/import-file-details-product-option.csv.html) |
| Shipment | [Add delivery methods](/docs/pbc/all/carrier-management/latest/base-shop/manage-in-the-back-office/add-delivery-methods.html) | [File details: shipment.csv](/docs/pbc/all/tax-management/latest/base-shop/import-and-export-data/import-file-details-shipment.csv.html) |

## International tax rates and sets

Align your business with international tax standards by defining tax rates and sets. Determine country-based tax rates for products, options, and shipments, that will automatically be applied to the respective shops.

In a tax system, the tax rate is the ratio (usually expressed as a percentage) at which a business, person, item is taxed.

A *tax set* is a set of tax rates that can be applied to a specific product.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/base-shop/tax-feature-overview.md/tax-rate.mp4" type="video/mp4">
  </video>
</figure>


Once the rate is defined, you can attach it to one or more tax sets. A tax set can contain from one to many tax rates.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/base-shop/tax-feature-overview.md/tax-set.mp4" type="video/mp4">
  </video>
</figure>

The described values are defined in the **Back Office&nbsp;<span aria-label="and then">></span> Taxes** section.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/base-shop/tax-feature-overview.md/taxes-section.mp4" type="video/mp4">
  </video>
</figure>

## Avalara system for automated tax compliance

You can integrate the third-party system Avalara to automatically apply tax rates that depend on such factors as location, product type, and shipping rules.

{% info_block warningBox %}

Avalara is mostly meant for the USA.

{% endinfo_block %}

To use Avalara, [set up the AvaTax platform](https://help.avalara.com/Avalara_AvaTax_Update/Set_up_AvaTax_Update) for your application and [integrate Avalara](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/avalara/install-avalara.html) into your project. Once you do that, you can [apply Avalara tax codes](https://help.avalara.com/Avalara_AvaTax_Update/Avalara_tax_codes) to automate tax calculations for your shop.

You can set the Avalara tax codes for the following entities by importing the codes:

- Abstract product: For details about import, see [File details: product_abstract.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html).
- Product option: For details about import, see [File details: product_option.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/product-options/import-file-details-product-option.csv.html).
- Shipment: For details about import, see [File details: shipment.csv](/docs/pbc/all/tax-management/latest/base-shop/import-and-export-data/import-file-details-shipment.csv.html).

{% info_block infoBox %}

Since shipment and products fall under different taxability categories, Avalara tax code for shipment is different from that of the abstract product or product option. For details about the codes and categories, see [Avalara tax code search](https://taxcode.avatax.avalara.com/).

{% endinfo_block %}

The Avalara codes are not displayed on the Storefront or in the Back Office. They are processed in the background to define taxes for order items. Avalara calculates taxes during the checkout, and, by default, the taxes are shown at the final checkout step.

When calculating taxes, Avalara takes the items' [warehouse addresses](/docs/pbc/all/warehouse-management-system/latest/base-shop/inventory-management-feature-overview.html#defining-a-warehouse-address) into account. Therefore, each order item you calculate a tax for with Avalara, must have a warehouse assigned. To learn how warehouses are assigned to order items by default, see [Warehouse assignment to order items (with Avalara integration only)](/docs/pbc/all/warehouse-management-system/latest/base-shop/inventory-management-feature-overview.html#avalara-warehouse-assignment-to-order-items).

## Tax Management capability on the Storefront

A *product tax set* is calculated when buyers add products to the cart. Therefore, by default, the tax calculated on the basis of the product tax sets is displayed in the **Tax** section on the **Cart** page. However, the tax value on the **Cart** page is not always final because it does not take a possible shipment tax set into account since buyers select the shipping method during the checkout. If you have Avalara integrated, it calculates tax during the checkout as well. Therefore, the final tax value is always displayed only upon checkout.

Tax on the **Cart** page:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/tax-in-cart.png)

Tax in the checkout:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/tax-in-checkout.png)

## Current constraints

The capability has the following functional constraints:

- There is no Back Office UI for the Avalara tax codes.
- Many Avalara features are not supported yet. This will be resolved in the future.


## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create tax rates](/docs/pbc/all/tax-management/latest/base-shop/manage-in-the-back-office/create-tax-rates.html) |
| [Edit tax rates](/docs/pbc/all/tax-management/latest/base-shop/manage-in-the-back-office/edit-tax-rates.html) |
| [Create tax sets](/docs/pbc/all/tax-management/latest/base-shop/manage-in-the-back-office/create-tax-sets.html) |
| [Edit tax sets](/docs/pbc/all/tax-management/latest/base-shop/manage-in-the-back-office/edit-tax-sets.html) |

## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES | GLUE API GUIDES | DATA IMPORT |
|---|---|---|---|
| [Integrate the Tax Glue API](/docs/pbc/all/tax-management/latest/base-shop/install-and-upgrade/install-the-tax-glue-api.html) | [Upgrade the Tax module](/docs/pbc/all/tax-management/latest/base-shop/install-and-upgrade/upgrade-the-tax-module.html) | [Retrieve tax sets](/docs/pbc/all/tax-management/latest/base-shop/manage-using-glue-api/retrieve-tax-sets.html)  | [Import tax sets](/docs/pbc/all/tax-management/latest/base-shop/import-and-export-data/import-file-details-tax-sets.csv.html) |
| [Integrate the Product Tax Sets Glue API](/docs/pbc/all/tax-management/latest/base-shop/install-and-upgrade/install-the-product-tax-sets-glue-api.html) | [Upgrade the ProductTaxSetsRestApi module](/docs/pbc/all/tax-management/latest/base-shop/install-and-upgrade/upgrade-the-producttaxsetsrestapi-module.html) | [Retrieve tax sets of abstract products](/docs/pbc/all/tax-management/latest/base-shop/manage-using-glue-api/retrieve-tax-sets-when-retrieving-abstract-products.html) | [Import tax sets for abstract products](/docs/pbc/all/tax-management/latest/base-shop/import-and-export-data/import-file-details-product-abstract.csv.html) |
| | | | [Import tax sets for shipment methods](/docs/pbc/all/tax-management/latest/base-shop/import-and-export-data/import-file-details-shipment.csv.html) |
| | | | [Import tax sets for product options](/docs/pbc/all/tax-management/latest/base-shop/import-and-export-data/import-file-details-product-option.csv.html) |
