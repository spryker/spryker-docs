---
title: "Import file details: product_price_schedule.csv"
description: Learn how to import product price schedule data in to your Spryker project using the product price schedule csv file.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-price-schedulecsv
originalArticleId: 0662559b-6487-4d88-855e-3b605fc326c1
redirect_from:
  - /docs/scos/dev/data-import/201907.0/data-import-categories/catalog-setup/pricing/file-details-product-price-schedule.csv.html
  - /docs/scos/dev/tutorials/201907.0/howtos/feature-howtos/howto-import-scheduled-prices.html
  - /tutorials/howtos/feature_howtos/ht-import-scheduled-prices-201907.htm
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/pricing/file-details-product-price-schedule.csv.html
  - /docs/pbc/all/price-management/202311.0/base-shop/import-and-export-data/file-details-product-price-schedule.csv.html
  - /docs/pbc/all/price-management/202204.0/base-shop/import-and-export-data/import-file-details-product-price-schedule.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This article contains content of the `product_price_schedule.csv` file to configure [Product Price Schedule](/docs/pbc/all/price-management/{{site.version}}/base-shop/scheduled-prices-feature-overview.html) information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:product-price-schedule
```

## Import file parameters



| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| abstract_sku | &check; (if `concrete_sku` is empty) | String | Either this field or `concrete_sku` needs to be filled, as the prices need to be assigned to a product. | SKU of the abstract product to which the price should apply. |
| concrete_sku | &check; (if `abstract_sku` is empty) | String | Either this field or `abstract_sku` needs to be filled, as the prices need to be assigned to a product. | SKU of the concrete product to which the price should apply. |
| price_type | &check; | String |  | Defines the price type. |
| store | &check; | String |  | Store to which this price should apply. |
| currency | &check; | String |  | Defines in which currency the price is. |
| value_net | &check; | Integer |  | Sets the net price. |
| value_gross | &check; | Integer |  | Sets the gross price. |
| from_included | &check; | Date |  | Sets the date from which these price conditions are valid. |
| to_included | &check; | Date |  | Sets the date to which these price conditions are valid. |

## Import file dependencies



- [product_abstract.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)
- [product_concrete.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)
- *stores.php* configuration file of the Demo Shop PHP project

## Import template file and content example



| FILE | DESCRIPTION |
| --- | --- |
| [product_price_schedule.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Pricing/Template+product_price_schedule.csv) | Exemplary import file with headers only. |
| [product_price_schedule.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Pricing/product_price_schedule.csv) | Exemplary import file with Demo Shop data. |
