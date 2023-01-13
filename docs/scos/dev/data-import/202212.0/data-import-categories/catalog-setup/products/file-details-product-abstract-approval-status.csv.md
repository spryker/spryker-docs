---
title: "File details: product_abstract_approval_status.csv"
description: This document contains content of the product_approval_status_default.csv file to configure products approval information on your Spryker Demo Shop.
template: data-import-template
---

This document contains content of the `product_approval_status_default.csv` file to configure products approval information on your Spryker Demo Shop.

To import the file, run

```bash
console data:import product-approval-status
```

## Import file parameters

The file must have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| abstract_sku | &check;  | String | | SKU identifier of the abstract product. |
| approval_status | &check;  | String | | Default product approval status. |

## Dependencies

This file has the following dependency: [product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html).

## Import template file and content example

In the following table, you can find the template and example of the file:

| FILE | DESCRIPTION |
| --- | --- |
| [template_product_approval_status.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202200.0/template_product_approval_status.csv) | Import file template with headers only. |
| [product_approval_status.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202200.0/product_approval_status.csv) | Import file template with headers only. |
/product_approval_status.csv) | Exemplary import file with the Demo Shop data. |
