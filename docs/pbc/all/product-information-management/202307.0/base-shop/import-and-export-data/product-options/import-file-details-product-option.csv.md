---
title: "Import file details: product_option.csv"
last_updated: Jun 23, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-optioncsv
originalArticleId: baab3597-94b0-47b1-825c-65c0d369f529
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/special-product-types/product-options/file-details-product-option.csv.html
  - /docs/scos/dev/data-import/201903.0/data-import-categories/special-product-types/product-options/file-details-product-option.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/special-product-types/product-options/file-details-product-option.csv.html
  - /docs/scos/dev/data-import/202307.0/data-import-categories/special-product-types/product-options/file-details-product-option.csv.html
  - /docs/pbc/all/product-information-management/202307.0/base-shop/import-and-export-data/product-options/file-details-product-option.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_option.csv` file to configure [product option](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-options-feature-overview.html) information in your Spryker Demo Shop.

## Dependencies

[product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| abstract_product_skus |  | String | | List of Abstract Product SKUs separated by comma. |
| option_group_id | &check; | String |If doesn't exist then it will be automatically created.  | Identifier of the Product Option Group. |
| tax_set_name |  | String || Name of the tax set. |
| group_name_translation_key|  | String | |  Translation key of the name of the group in different locales.|
| group_name.{ANY_LOCALE_NAME}<br>Example value: *group_name.en_US* | No | String |Locale data is dynamic in data importers. It means that ANY_LOCALE_NAME postfix can be changed, removed, and any number of columns with different locales can be added to the CSV files. | Name of the group in the specified locale (US for our example). |
| option_name_translation_key |  | String | | Translation key of the name of the option in different locales. |
| option_name.{ANY_LOCALE_NAME}<br>Example value: *option_name.en_US |  | String || Name of the option in the specified locale (US for our example).  |
| sku | | String | | SKU identifier of the product option. |
| avalara_tax_code |  | String | | [Avalara tax code](/docs/pbc/all/tax-management/{{site.version}}/base-shop/tax-feature-overview.html#avalara-system-for-automated-tax-compliance) for automated tax calculation. |

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_product_option.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/202109.0/Template_product_option.csv) | Exemplary import file with headers only. |
| [product_option.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/202109.0/product_option.csv) | Exemplary import file with the Demo Shop data. |


## Import command

```bash
data:import:product-option
```
