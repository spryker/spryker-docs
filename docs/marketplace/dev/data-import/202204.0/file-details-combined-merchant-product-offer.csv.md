---
title: "File details: combined_merchant_product_offer.csv"
last_updated: Jun 07, 2021
description: This document describes the combined_merchant_product_offer.csv file to configure product offers in your Spryker shop.
template: import-file-template
---

This document describes the `combined_merchant_product_offer.csv` file to configure [Merchant product offer](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html) information in your Spryker shop.

To import the file, run:

```bash
data:import --config data/import/common/combined_merchant_product_offer_import_config_{store}.yml
```

{% info_block infoBox "Info" %}

To learn more about bulk importing with the help of the configuration file, see [Importing data with a configuration file](/docs/scos/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html).

{% endinfo_block %}

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| ---------- | ------------ | ------ | ------------ | ----------------- | ------------- |
| product_offer_reference                      | &check;             | String   |                   | Unique                                                       | Identifier of the [merchant product offer](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html) in the system. |
| merchant_product_offer.concrete_sku          | &check;             | String   |                   | Unique                                                       | SKU of the concrete product the offer is being created for.  |
| merchant_product_offer.merchant_reference    | &check;             | String   |                   | Unique                                                       | Identifier of the merchant owing the product offer in the system. |
| merchant_product_offer.merchant_sku          |               | String   |                   | Unique                                                       | Identifier of the [merchant](/docs/marketplace/user/features/{{site.version}}/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html) in the system. |
| merchant_product_offer.is_active             |               | Integer  |                   | 1—is active<br> 0—is not active                             | Defines whether the offer is active or not.                  |
| merchant_product_offer.approval_status       | &check;             | String   |                   | Can be:<ul><li>waiting_for_approval</li><li>approved</li><li>denied</li></ul>  | Defines the [status of the offer](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html#offer-approval-status) in the system. |
| merchant_product_offer_store.store_name      |               | String   |                   |                                                              | Name of the store where the offer belongs.                   |
| product_offer_stock.stock_name               |               | String   |                   | Stock name is defined as described in the [merchant warehouse](/docs/marketplace/user/features/{{site.version}}/marketplace-inventory-management-feature-overview.html#marketplace-warehouse-management). | Name of the stock.                                           |
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

## Import file dependencies

The file has the following dependencies:

- [merchant.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant.csv.html)
- `stores.php` configuration file of the demo shop PHP project  

## Import template file and content example

Find the template and an example of the file below:

| FILE   | DESCRIPTION     |
| ------------------------ | ------------------------- |
| [template_combined_merchant_product_offer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_combined_merchant_product_offer.csv) | Import file template with headers only.         |
| [combined_merchant_product_offer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/combined_merchant_product_offer.csv) | Example of the import file with Demo Shop data. |
