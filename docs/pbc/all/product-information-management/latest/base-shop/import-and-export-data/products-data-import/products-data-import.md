---
title: Products data import
description: Learn how data import works and the different ways to import data related to products within your Spryker Cloud Commerce OS.
last_updated: Jun 16, 2021
template: data-import-template
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/products/products.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/products-data-import/products-data-import.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


To learn how data import works and about different ways of importing data, see [Data import](/docs/dg/dev/data-import/latest/data-import.html). This section describes the data import files that are used to import data related to products:

- [product_attribute_key.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-attribute-key.csv.html): allows you to define whether specific attributes should be considered super attributes.
- [product_management_attribute.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-management-attribute.csv.html): allows you to define additional product attributes, including type of attribute (text or number), as well as set custom and multiple values.
- [product_abstract.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html): includes the information needed for setting up abstract products and encompasses a wide range of information such as names, categories, attributes, descriptions, keywords, tax rates, etc.
- [product_abstract_store.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract-store.csv.html): in the case of multi-store setups, allows you to define in which stores you wish to sell those abstract products.
- [product_concrete.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html): allows you to import concrete product information, including their descriptions, attributes' values, searchability, relations to abstract products, and more information.
- [product_image.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-image.csv.html): allows you to import the images of the concrete products, local ones, as well as the ones via URLs.

The table below provides details on Products data importers, their purpose, CSV files, dependencies, and other details. Each data importer contains links to CSV files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| DATA IMPORTER | PURPOSE | CONSOLE COMMAND | FILES | DEPENDENCIES |
| --- | --- | --- | --- |--- |
| Product Attribute Key   | Imports information relative to product attribute super attribute identification. |`data:import:product-attribute-key` |[product_attribute_key.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-attribute-key.csv.html) |None |
| Product Management Attribute  | Imports information to configure settings of additional product attributes. |`data:import:product-management-attribute` |[product_management_attribute.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-management-attribute.csv.html) |[product_attribute_key.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-attribute-key.csv.html) |
| Product Abstract  |Imports information about the abstract products.  |`data:import:product-abstract` |[product_abstract.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html) | [category.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/categories-data-import/import-file-details-category.csv.html)|
| Product Abstract Store | Imports information that links the abstract products with the available stores of the shop.  |`data:import:product-abstract-store` |[product_abstract_store.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract-store.csv.html) |<ul><li>[product_abstract.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)</li><li>*stores.php* configuration file of demo shop PHP project</li></ul> |
| Product Concrete   |Imports information about the concrete products.<br>Every concrete product is linked to an abstract product.  |`data:import:product-concrete` |[product_concrete.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html) |[product_abstract.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html) |
| Product Image  |Imports information about product images.  |`data:import:product-image` |[product_image.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-image.csv.html) | <ul><li>[product_abstract.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)</li><li>[product_concrete.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)</li></ul>(Each image needs to be assigned to an SKU from either one of these files).|
