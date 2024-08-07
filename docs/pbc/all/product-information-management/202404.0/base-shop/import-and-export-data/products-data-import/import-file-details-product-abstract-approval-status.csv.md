---
title: "Import file details: product_abstract_approval_status.csv"
description: This document contains content of the product_approval_status_default.csv file to configure products approval information on your Spryker Demo Shop.
template: data-import-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/products/file-details-product-abstract-approval-status.csv.html
  - /docs/pbc/all/product-information-management/202311.0/import-and-export-data/products-data-import/file-details-product-abstract-approval-status.csv.html
  - /docs/pbc/all/product-information-management/202311.0/base-shop/import-and-export-data/products-data-import/file-details-product-abstract-approval-status.csv.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract-approval-status.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document contains content of the `product_approval_status_default.csv` file to configure products approval information on your Spryker Demo Shop.

## Import file dependencies

This file has the following dependency: [product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html).


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| abstract_sku | &check;  | String | | SKU identifier of the abstract product. |
| approval_status | &check;  | String | | Default product approval status. |



## Import template file and content example


| FILE | DESCRIPTION |
| --- | --- |
| [template_product_approval_status.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202200.0/template_product_approval_status.csv) | Import file template with headers only. |
| [product_approval_status.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202200.0/product_approval_status.csv) | Import file template with headers only. |
/product_approval_status.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
console data:import product-approval-status
```
