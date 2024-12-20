---
title: "Import file details: product_option.csv"
description: Learn how to import product options information using the product options csv file within you Spryker based project.
last_updated: Aug 2, 2022
template: data-import-template
redirect_from:
  - /docs/pbc/all/tax-management/202311.0/base-shop/import-and-export-data/import-file-details-product-option.csv.html
  - /docs/pbc/all/tax-management/202311.0/base-shop/import-and-export-data/import-file-details-product-option.csv.html
  - /docs/pbc/all/tax-management/202311.0/base-shop/spryker-tax/import-and-export-data/import-file-details-product-option.csv.html
  - /docs/pbc/all/tax-management/202204.0/base-shop/import-and-export-data/import-file-details-product-option.csv.html
---


This document describes how to import taxes for product options via  `product_option.csv`. To import full information for product options, see ["Import file details: product_option.csv"](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/product-options/import-file-details-product-option.csv.html).


## Dependencies

* [product_abstract.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)
* [tax.csv](/docs/pbc/all/tax-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-tax-sets.csv.html)


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| option_group_id | &check; | String |If doesn't exist then it will be automatically created.  | Identifier of the Product Option Group. |
| tax_set_name |  | String || Name of the tax set. |

## Import file command

```bash
data:import:product-option
```

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_product_option.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/202109.0/Template_product_option.csv) | Exemplary import file with headers only. |
| [product_option.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/202109.0/product_option.csv) | Exemplary import file with the Demo Shop data. |
