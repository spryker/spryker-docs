---
title: "Import file details: product_abstract.csv"
last_updated: Oct 4, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-abstractcsv
originalArticleId: cf197796-3c85-4b51-a55a-dfe6b07efce9
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html
  - /docs/scos/dev/data-import/201903.0/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html
  - /docs/pbc/all/product-information-management/202311.0/import-and-export-data/products-data-import/file-details-product-abstract.csv.html  
  - /docs/pbc/all/product-information-management/202311.0/base-shop/import-and-export-data/products-data-import/file-details-product-abstract.csv.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_abstract.csv` file to configure [Abstract Product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) information in your Spryker Demo Shop.

## Import file dependencies

* [category.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/import-file-details-category.csv.html)
* [glossary.csv](/docs/pbc/all/miscellaneous/{{page.version}}/import-and-export-data/import-file-details-glossary.csv.html)
* [tax.csv](/docs/pbc/all/tax-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-tax-sets.csv.html)



## Import file parameters

<div class="width-100">

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| category_key | &check; | String | | Identifier of category key name. |
| category_product_order |  | Integer | | Order of the product presentation inside a category. |
| abstract_sku | &check;  | String | | SKU identifier of the abstract product. |
| name.{ANY_LOCALE_NAME}<br>Example value: *name.en_US* | &check; | String |Locale data is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files. | Name of the product in the specified location (US for our example). |
| url.{ANY_LOCALE_NAME}<br>Example value: *value_1.en_US* | &check; | String | | URL page of the product image in the specified location (US for our example). |
| attribute_key_{NUMBER}<br>Example value: *attribute_key_1*<br> | &check; (if this attribute is defined) | String | | Product attribute key for the attribute. |
| value_{NUMBER}<br>Example value: *value_1*<br>|&check; (if this attribute is defined) | String | | Product value for the attribute. |
| attribute_key_{NUMBER}.{ANY_LOCALE_NAME}<br>Example value: *attribute_key_1.en_US*<br> |  | String | | Product attribute key, for the first attribute, translated in the specified locale (US for our example). |
| value_{NUMBER}.{ANY_LOCALE_NAME}<br>Example value: *value_1.en_US*<br>| | String | | Product value for the attribute, translated in the specified locale (US for our example). |
| color_code |  | String | | Product color code. |
| description.{ANY_LOCALE_NAME}<br>Example value: *description.en_US*  |  | String | | Product description, translated in the specified locale (US for our example). |
| tax_set_name |  | String | | Name of the tax set. |
| meta_title.{ANY_LOCALE_NAME}<br>Example value: *meta_title.en_US* |  | String | | Meta title of the product in the specified locale (US for our example). |
| meta_keywords.{ANY_LOCALE_NAME}<br>Example value: *meta_keywords.en_US* |  | String | | Meta keywords of the product in the specified locale (US for our example). |
| meta_description.{ANY_LOCALE_NAME}<br>Example value: *meta_description.en_US* || String | | Meta description of the product in the specified locale (US for our example). |
| new_from |  | Date | | To be considered a new product from this presented date. |
| new_to |  | String | | To be considered a new product until this presented date. |
| avalara_tax_code |  | String | | [Avalara tax code](/docs/pbc/all/tax-management/{{site.version}}/base-shop/tax-feature-overview.html#avalara-system-for-automated-tax-compliance) for automated tax calculation. Add this field if Avalara is used for tax management. |
<!-- |is_featured |  | String |If it's empty, will be “False”. <br>False = 0<br>True = 1 | Indicates if it's a featured product. |
| icecat_pdp_url |  | String | | Icecat product catalogue URL service. |
| icecat_license |  | String | | Icecat product catalogue license code. |
-->


</div>  


## Additional information

For each attribute, where N is a number starting in 1, it's mandatory to have both fields:

* `attribute_key_N`
* `value_N`

The amount of attributes is not limited.

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/import-file-details-product-abstract.csv.md/Template_product_abstract.csv) | Import file template with headers only. |
| [product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/import-file-details-product-abstract.csv.md/product_abstract.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
data:import:product-abstract
```
