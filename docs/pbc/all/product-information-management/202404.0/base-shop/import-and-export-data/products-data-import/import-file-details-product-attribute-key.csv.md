---
title: "Import file details: product_attribute_key.csv"
last_updated: Jul 7, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-attribute-keycsv
originalArticleId: 141aa68e-c752-4021-b6cb-df6fa4803d72
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/products/file-details-product-attribute-key.csv.html
  - /docs/pbc/all/product-information-management/202311.0/import-and-export-data/products-data-import/file-details-product-attribute-key.csv.html  
  - /docs/pbc/all/product-information-management/202311.0/base-shop/import-and-export-data/products-data-import/file-details-product-attribute-key.csv.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/products-data-import/import-file-details-product-attribute-key.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_attribute_key.csv` file to configure [Product Attribute](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html) information on your Spryker Demo Shop.


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| attribute_key | &check;  | String | Must be unique. | Product attribute key name. |
| is_super |  | Boolean | If empty it will be imported as *False* (0).<br>False = 0 = It is not a super attribute.<br>True = 1 = It is a super attribute. | Indicates whether it's a super attribute or not.  |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [product_attribute_key.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_attribute_key.csv) | Exemplary import file with headers only. |
| [product_attribute_key.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_attribute_key.csv) | Product Exemplary import file with Demo Shop data. |

## Import command

```bash
data:import:product-attribute-key
```
