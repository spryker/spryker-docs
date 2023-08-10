---
title: Spryker Tax
description: With the Spryker Tax Management capability you can define taxes for the items you sell.
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
  - /docs/scos/user/features/202212.0/tax-feature-overview.html
  - /docs/pbc/all/tax-management/tax-management.html
  - /docs/pbc/all/tax-management/202212.0/base-shop/tax-feature-overview.html
---

The *Tax* feature lets you define taxes for the items you sell. The feature is represented by two entities: tax rates and tax sets.

The tax rate is the percentage of the sales price that buyer pays as a tax. In the default Spryker implementation, the tax rate is defined per country where the tax applies. For details about how to create tax rates for countries in the Back Office, see [Create tax rates](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/spryker-tax/configure-spryker-tax/create-tax-rates.html).

A tax set is a set of tax rates. You can [define tax sets in the Back office](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/spryker-tax/configure-spryker-tax/create-tax-sets.html) or [import tax sets](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/import-and-export-data/import-file-details-tax-sets.csv.html) into your project.

Tax sets can be applied to an abstract product, product option, and shipment:


| ENTITY | DEFINE TAX SETS IN THE BACK OFFICE  | IMPORT TAX SETS |
| --- | --- | --- |
| Abstract product | [Define prices](/docs/pbc/all/product-information-management/{{page.version}}/spryker-tax/configure-spryker-tax/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html#define-prices) | [File details: product_abstract.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/products-data-import/file-details-product-abstract.csv.html) |
| Product option | [Creating a product option](/docs/pbc/all/product-information-management/{{site.version}}/spryker-tax/configure-spryker-tax/product-options/create-product-options.html) | [File details: product_option.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/product-options/file-details-product-option.csv.html) |
| Shipment | [Add delivery methods](/docs/pbc/all/carrier-management/{{site.version}}/spryker-tax/configure-spryker-tax/add-delivery-methods.html) | [File details: shipment.csv](/docs/scos/dev/data-import/{{site.version}}/data-import-categories/commerce-setup/file-details-shipment.csv.html) |

## International tax rates and sets

Align your business with international tax standards by defining tax rates and sets. Determine country-based tax rates for products, options, and shipments, that will automatically be applied to the respective shops.

In a tax system, the tax rate is the ratio (usually expressed as a percentage) at which a business, person, item is taxed.

A *tax set* is a set of tax rates that can be applied to a specific product.

![Tax rate](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/International+Tax+Rates+&+Sets/tax-rate.gif)

Once the rate is defined, you can attach it to a tax set(s). A tax set can contain from one to many tax rates.
![Tax set](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/International+Tax+Rates+&+Sets/tax-set.gif)

The described values are defined in the **Back Office&nbsp;<span aria-label="and then">></span> Taxes** section.

![Tax section](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/International+Tax+Rates+&+Sets/taxes-section.gif)

## Tax Management capability on the Storefront

A *product tax set* is calculated when buyers add products to the cart. Therefore, by default, the tax calculated on the basis of the product tax sets is displayed in the **Tax** section on the **Cart** page. However, the tax value on the **Cart** page is not always final because it does not take a possible shipment tax set into account since buyers select the shipping method during the checkout. If you have Avalara integrated, it calculates tax during the checkout as well. Therefore, the final tax value is always displayed only upon checkout.

Tax on the **Cart** page:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/tax-in-cart.png)

Tax in the checkout:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/tax-in-checkout.png)

## Current constraints

The capability has the following functional constraints:

* There is no Back Office UI for the Avalara tax codes.
* Many Avalara features are not supported yet. This will be resolved in the future.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create tax rates](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/manage-in-the-back-office/create-tax-rates.html) |
| [Edit tax rates](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/manage-in-the-back-office/edit-tax-rates.html) |
| [Create tax sets](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/manage-in-the-back-office/create-tax-sets.html) |
| [Edit tax sets](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/manage-in-the-back-office/edit-tax-sets.html) |

## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES | GLUE API GUIDES | DATA IMPORT |
|---|---|---|---|
| [Integrate the Tax Glue API](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/install-and-upgrade/install-the-tax-glue-api.html) | [Upgrade the Tax module](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/install-and-upgrade/upgrade-the-tax-module.html) | [Retrieve tax sets](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/manage-using-glue-api/retrieve-tax-sets.html)  | [Import tax sets](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/import-and-export-data/import-file-details-tax-sets.csv.html) |
| [Integrate the Product Tax Sets Glue API](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/install-and-upgrade/install-the-product-tax-sets-glue-api.html) | [Upgrade the ProductTaxSetsRestApi module](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/install-and-upgrade/upgrade-the-producttaxsetsrestapi-module.html) | [Retrieve tax sets of abstract products](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/manage-using-glue-api/retrieve-tax-sets-when-retrieving-abstract-products.html) | [Import tax sets for abstract products](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/import-and-export-data/import-file-details-product-abstract.csv.html) |
| | | | [Import tax sets for shipment methods](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/import-and-export-data/import-file-details-shipment.csv.html) |
| | | | [Import tax sets for product options](/docs/pbc/all/tax-management/{{site.version}}/spryker-tax/base-shop/import-and-export-data/import-file-details-product-option.csv.html) |
