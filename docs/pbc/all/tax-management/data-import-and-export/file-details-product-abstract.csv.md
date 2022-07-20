---
title: Import taxes for abstract products
last_updated: July 22, 2022
template: data-import-template
---

This document describes the `product_abstract.csv` file to configure only tax sets for abstract products. To configure all the information for abstract products, see [File details - product_abstract.csv](/docs/scos/dev/data-import/{{site.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html#import-file-parameters).

## Import file dependencies

[tax.csv](/docs/pbc/all/tax-management/data-import-and-export/file-details-tax.csv.html)

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
| [template_product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202109.0/Template_product_abstract.csv) | Import file template with headers only. |
| [product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202109.0/product_abstract.csv) | Exemplary import file with the Demo Shop data. |
