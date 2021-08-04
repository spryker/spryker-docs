---
title: Product Merchandising
originalLink: https://documentation.spryker.com/v5/docs/product-merchandising
redirect_from:
  - /v5/docs/product-merchandising
  - /v5/docs/en/product-merchandising
---

The **Product Merchandising** category contains all data you need to manage merchandising information in your online store. We have structured this section according to the following .csv files that you will have to use to import the data:

* [product_group.csv](https://documentation.spryker.com/docs/en/file-details-product-groupcsv): allows you to create product groups.
* [product_label.csv](https://documentation.spryker.com/docs/en/file-details-product-labelcsv): allows you to create labels to assign to products. You can use the "New" or  "Special sales", etc. labels to promote the products.
* product_relation.csv: allows you to define which products are related to each other.
* [product_review.csv](https://documentation.spryker.com/docs/en/file-details-product-reviewcsv): allows you to load information about product reviews.
* [product_search_attribute.csv](https://documentation.spryker.com/docs/en/file-details-product-search-attributecsv): sets additional search attributes for products.
* [product_search_attribute_map.csv](https://documentation.spryker.com/docs/en/file-details-product-search-attribute-mapcsv): maps the product attributes that are imported in the *product_attribute_key.csv* file with Elasticsearch-specific properties.
* [product_set.csv](https://documentation.spryker.com/docs/en/file-details-product-setcsv): allows you to define product sets.
* p[roduct_discontinued.csv](https://documentation.spryker.com/docs/en/file-details-product-discontinuedcsv): allows you to define discontinued products.
* [product_alternative.csv](https://documentation.spryker.com/docs/en/file-details-product-alternativecsv): allows you to define alternative products.
* [product_quantity.csv](https://documentation.spryker.com/docs/en/file-details-product-quantitycsv): allows you to set product quantity restrictions.

The table below provides details on Product Merchandising data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Product Group**   | Imports information used to create product groups. |`data:import:product-group`|  [product_group.csv](https://documentation.spryker.com/docs/en/file-details-product-groupcsv) |[product_abstract.csv](https://documentation.spryker.com/docs/en/file-details-product-abstractcsv) |
| **Product Label**   |  Imports information used to define the labels that can be assigned to the products, such as special sales labels.|`data:import:product-label`| [product_label.csv](https://documentation.spryker.com/docs/en/file-details-product-labelcsv) |[product_abstract.csv](https://documentation.spryker.com/docs/en/file-details-product-abstractcsv) |
| **Product Relation**   | Imports information used to define which products are related to each other. |`data:import:product-relation`| [product_relation.csv](https://documentation.spryker.com/docs/en/file-details-product-relationcsv) |[product_abstract.csv](https://documentation.spryker.com/docs/en/file-details-product-abstractcsv) |
| **Product Review**   | Imports information about product reviews. |`data:import:product-review `| [product_review.cs]([product_review.csv](https://documentation.spryker.com/docs/en/file-details-product-reviewcsv))v |<ul><li>[product_abstract.csv](https://documentation.spryker.com/docs/en/file-details-product-abstractcsv)</li><li>[customer.csv](https://documentation.spryker.com/docs/en/file-details-customercsv)</li></ul> |
| **Product Search Attribute**   | Imports information used to set additional search attributes. |`data:import:product-search-attribute `| [product_search_attribute.csv](https://documentation.spryker.com/docs/en/file-details-product-search-attributecsv) |[product_attribute_key.csv](https://documentation.spryker.com/docs/en/file-details-product-attribute-keycsv) |
| **Product Search Attribute Map**   | Imports information to map the product attributes that are imported in the *product_attribute_key.csv* file with Elasticsearch-specific properties. |`data:import:product-search-attribute-map `| [product_search_attribute_map.csv](https://documentation.spryker.com/docs/en/file-details-product-search-attribute-mapcsv) |[product_attribute_key.csv](https://documentation.spryker.com/docs/en/file-details-product-attribute-keycsv) |
| **Product Set **   | Imports relevant information about the product sets. |`data:import:product-set`| [product_set.csv](https://documentation.spryker.com/docs/en/file-details-product-setcsv) |[product_abstract.csv](https://documentation.spryker.com/docs/en/file-details-product-abstractcsv) |
| **Product Discontinued**   | Imports information identifying products that have been discontinued. |`data:import:product-discontinued`| [product_discontinued.csv ](https://documentation.spryker.com/docs/en/file-details-product-discontinuedcsv)|[product_concrete.csv](https://documentation.spryker.com/docs/en/file-details-product-concretecsv) |
| **Product Alternative**   | Imports information identifying alternative products to ones that have been discontinued. |`data:import:product-alternative`| [product_alternative.csv](https://documentation.spryker.com/docs/en/file-details-product-alternativecsv) |<ul><li>[product_concrete.csv](https://documentation.spryker.com/docs/en/file-details-product-concretecsv)</li><li>[product_abstract.csv](https://documentation.spryker.com/docs/en/file-details-product-abstractcsv)</li> |
| **Product Quantity**   | Contains information about product quantity restrictions (e.g. a customer cannot buy less than 100 units of an item). |`data:import:product-quantity `| [product_quantity.csv](https://documentation.spryker.com/docs/en/file-details-product-quantitycsv) |[product_concrete.csv](https://documentation.spryker.com/docs/en/file-details-product-concretecsv) |
