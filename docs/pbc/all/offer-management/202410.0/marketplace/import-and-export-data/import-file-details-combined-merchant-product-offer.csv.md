---
title: "Import file details: combined_merchant_product_offer.csv"
last_updated: Jun 07, 2021
description: This document describes the combined_merchant_product_offer.csv file to configure product offers in your Spryker shop.
template: import-file-template
redirect_from:
- /docs/pbc/all/offer-management/202311.0/marketplace/import-and-export-data/file-details-combined-merchant-product-offer.csv.html
related:
  - title: Marketplace Product Offer feature walkthrough
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-merchant-portal-product-offer-management-feature-overview.html
  - title: Marketplace Product Offer feature overview
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-product-offer-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `combined_merchant_product_offer.csv` file to configure [Merchant product offer](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html) information in your Spryker shop.

{% info_block infoBox "" %}

To learn more about bulk importing with the help of the configuration file, see [Importing data with a configuration file](/docs/dg/dev/data-import/latest/importing-data-with-a-configuration-file.html).

{% endinfo_block %}


## Import file dependencies

- [merchant.csv](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant.csv.html)
- `stores.php` configuration file of the demo shop PHP project  

## Import file parameters


| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| ---------- | ------------ | ------ | ------------ | ----------------- | ------------- |
| product_offer_reference                      | &check;             | String   |                   | Unique                                                       | Identifier of the [merchant product offer](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html) in the system. |
| merchant_product_offer.concrete_sku          | &check;             | String   |                   | Unique                                                       | SKU of the concrete product the offer is being created for.  |
| merchant_product_offer.merchant_reference    | &check;             | String   |                   | Unique                                                       | Identifier of the merchant owing the product offer in the system. |
| merchant_product_offer.merchant_sku          |               | String   |                   | Unique                                                       | Identifier of the [merchant](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html) in the system. |
| merchant_product_offer.is_active             |               | Integer  |                   | 1—is active<br> 0—is not active                             | Defines whether the offer is active or not.                  |
| merchant_product_offer.approval_status       | &check;             | String   |                   | Can be:<ul><li>waiting_for_approval</li><li>approved</li><li>denied</li></ul>  | Defines the [status of the offer](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html#offer-approval-status) in the system. |
| merchant_product_offer_store.store_name      |               | String   |                   |                                                              | Name of the store where the offer belongs.                   |
| product_offer_stock.stock_name               |               | String   |                   | Stock name is defined as described in the [merchant warehouse](/docs/pbc/all/warehouse-management-system/latest/marketplace/marketplace-inventory-management-feature-overview.html#marketplace-warehouse-management). | Name of the stock.                                           |
| product_offer_stock.quantity                 |               | Integer  |                   |                                                              | Number of product offers that are in stock.                  |
| product_offer_stock.is_never_out_of_stock    |               | Integer  |                   | 1—option is enabled<br> 0—option is disabled.               | Allows the offer to be never out of stock. |
| price_product_offer.price_type               |               | String   |                   | Can be DEFAULT or ORIGINAL.                                  | Price type of the product offer.                             |
| price_product_offer.store                    |               | String   |                   | Value previously defined in the *stores.php* project configuration. | Store where the merchant product offer belongs.              |
| price_product_offer.currency                 |               | String   |                   | Defined in the [ISO code](https://en.wikipedia.org/wiki/ISO_4217). | Currency of the price.                                       |
| price_product_offer.value_net                |               | Integer  |                   | Empty price values will be imported as zeros.                | Net price in cents.                                          |
| price_product_offer.value_gross              |               | Integer  |                   | Empty price values will be imported as zeros.                | Gross price in cents.                                        |
| price_product_offer.price_data.volume_prices |               | Array    |                   |                                                              | Price data which can be used to define alternative prices, that is, volume prices, overwriting the given net or gross price values. |
| product_offer_validity.valid_from            |               | Datetime |                   |                                                              | Date and time from which the offer is active.                |
| product_offer_validity.valid_to              |               | Datetime |                   |                                                              | Date and time  till which the offer is active.               |



## Import template file and content example

| FILE   | DESCRIPTION     |
| ------------------------ | ------------------------- |
| [template_combined_merchant_product_offer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_combined_merchant_product_offer.csv) | Import file template with headers only.         |
| [combined_merchant_product_offer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/combined_merchant_product_offer.csv) | Example of the import file with Demo Shop data. |


## Import command

```bash
data:import --config data/import/common/combined_merchant_product_offer_import_config_{store}.yml
```
