---
title: Import tax sets for product options
last_updated: Aug 2, 2022
template: data-import-template
---


This document describes how to import taxes for product options via  `product_option.csv`. To import full information for product options, see [File details- product_option.csv](/docs/scos/dev/data-import/{{site.version}}/data-import-categories/special-product-types/product-options/file-details-product-option.csv.html).


## Dependencies

* [product_abstract.csv](/docs/scos/dev/data-import/{{site.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)
* [tax.csv](/docs/pbc/all/tax-management/{{site.version}}/import-and-export-data/import-tax-sets.html)


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
