---
title: Import tax sets for abstract products
last_updated: July 22, 2022
template: data-import-template
---

This document describes how to import taxes for abstract products via  `product_abstract.csv`. To import full information for abstract products, see [File details - product_abstract.csv](/docs/scos/dev/data-import/{{site.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html).

## Import file dependencies

[tax.csv](/docs/pbc/all/tax-management/{{site.version}}/import-and-export-data/import-tax-sets.html)

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |

| abstract_sku | &check;  | String | | SKU identifier of the abstract product. |
| tax_set_name |  | String | | Name of the tax set. |

## Import the file

Run the following command:

```bash
data:import:product-abstract
```

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/import-and-export-data/import-tax-sets-for-abstract-products.md/template_product_abstract.csv) | Import file template with headers only. |
| [product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/import-and-export-data/import-tax-sets-for-abstract-products.md/product_abstract.csv) | Exemplary import file with the Demo Shop data. |
