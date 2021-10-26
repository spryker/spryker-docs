---
title: File details- product_search_attribute_map.csv
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/file-details-product-search-attribute-mapcsv
originalArticleId: b59cc055-9844-4dcf-8e90-36767b169283
redirect_from:
  - /v5/docs/file-details-product-search-attribute-mapcsv
  - /v5/docs/en/file-details-product-search-attribute-mapcsv
---

This article contains content of the **product_search_attribute_map.csv** file to configure Product Search Attribute Map information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **attribute_key** | Yes | String |N/A* | 	Identifier of an attribute. |
| **target_field** | No | String |	Any constant from the class `src/Generated/Shared/Search/PageIndexMap.php` | Elasticsearch property. |
*N/A: Not applicable.

## Dependencies

This file has the following dependency:
*    [product_attribute_key.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-attribute-key.csv.html)

Recommendations & other information
This file maps the product attributes that are imported in the *product_attribute_key.csv* file with Elasticsearch-specific properties.

## Template File & Content Example
A template and an example of the *product_search_attribute_map.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_search_attribute_map.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_search_attribute_map.csv) | Product Search Attribute Map .csv template file (empty content, contains headers only). |
| [product_search_attribute_map.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_search_attribute_map.csv) | Product Search Attribute Map .csv file containing a Demo Shop data sample. |
