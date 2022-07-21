---
title: Import tax sets for abstract products
last_updated: July 22, 2022
template: data-import-template
---

This document describes how to import taxes for abstract products via  `product_abstract.csv`. To import full information for abstract products, see [File details - product_abstract.csv](/docs/scos/dev/data-import/{{site.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html).

## Import file dependencies

[tax.csv](/docs/pbc/all/tax-management/import-and-export-data/import-tax-sets.html)

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |

| abstract_sku | &check;  | String | | SKU identifier of the abstract product. |
| name.{ANY_LOCALE_NAME}<br>Example value: *name.en_US* | &check; | String |Locale data is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files. | Name of the product in the specified location (US for our example). |
| tax_set_name |  | String | | Name of the tax set. |

## Import the file

Run the following command:

```bash
data:import:product-abstract
```

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [template_product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/import-and-export-data/import-tax-sets-for-abstract-products.md/template_product_abstract.csv) | Import file template with headers only. |
| [product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/import-and-export-data/import-tax-sets-for-abstract-products.md/product_abstract.csv) | Exemplary import file with the Demo Shop data. |
