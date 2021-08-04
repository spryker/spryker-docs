---
title: Products
originalLink: https://documentation.spryker.com/2021080/docs/products-import
redirect_from:
  - /2021080/docs/products-import
  - /2021080/docs/en/products-import
---

The **Products** category contains all products-related data you need to manage and sell products in your online store. We have structured this section according to the following .csv files that you will have to use to import the data:

* [product_attribute_key.csv](https://documentation.spryker.com/docs/file-details-product-attribute-keycsv): allows you to define whether specific attributes should be considered super attributes.
* [product_management_attribute.csv](https://documentation.spryker.com/docs/file-details-product-management-attributecsv): allows you to define additional product attributes, including type of attribute (text or number), as well as set custom and multiple values. 
* [product_abstract.csv](https://documentation.spryker.com/docs/file-details-product-abstractcsv): includes the information needed for setting up abstract products and encompasses a wide range of information such as names, categories, attributes, descriptions, keywords, tax rates, etc.
* [product_abstract_store.csv](https://documentation.spryker.com/docs/file-details-product-abstract-storecsv): in the case of multi-store setups, allows you to define in which stores you wish to sell those abstract products.
* [product_concrete.csv](https://documentation.spryker.com/docs/file-details-product-concretecsv): allows you to import concrete product information, including their descriptions, attributes' values, searchability, relations to abstract products, and more information.
* [product_image.csv](https://documentation.spryker.com/docs/file-details-product-imagecsv): allows you to import the images of the concrete products, local ones, as well as the ones via URLs.

The table below provides details on Products data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Product Attribute Key**   | Imports information relative to product attribute super attribute identification. |`data:import:product-attribute-key` |[product_attribute_key.csv](https://documentation.spryker.com/docs/file-details-product-attribute-keycsv) |None |
| **Product Management Attribute**  | Imports information to configure settings of additional product attributes. |`data:import:product-management-attribute` |[product_management_attribute.csv](https://documentation.spryker.com/docs/file-details-product-management-attributecsv) |[product_attribute_key.csv](https://documentation.spryker.com/docs/file-details-product-attribute-keycsv) |
| **Product Abstract**   |Imports information about the abstract products.  |`data:import:product-abstract` |[product_abstract.csv](https://documentation.spryker.com/docs/file-details-product-abstractcsv) | [category.csv](https://documentation.spryker.com/docs/file-details-categorycsv)|
| **Product Abstract Store**   | Imports information that links the abstract products with the available stores of the shop.  |`data:import:product-abstract-store` |[product_abstract_store.csv](https://documentation.spryker.com/docs/file-details-product-abstract-storecsv) |<ul><li>[product_abstract.csv](https://documentation.spryker.com/docs/file-details-product-abstractcsv)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul> |
| **Product Concrete**   |Imports information about the concrete products.<br>Every concrete product is linked to an abstract product.  |`data:import:product-concrete` |[product_concrete.csv](https://documentation.spryker.com/docs/file-details-product-concretecsv) |[product_abstract.csv](https://documentation.spryker.com/docs/file-details-product-abstractcsv) |
| **Product Image**   |Imports information about product images.  |`data:import:product-image` |[product_image.csv](https://documentation.spryker.com/docs/file-details-product-imagecsv) | <ul><li>[product_abstract.csv](https://documentation.spryker.com/docs/file-details-product-abstractcsv)</li><li>[product_concrete.csv](https://documentation.spryker.com/docs/file-details-product-concretecsv)</li></ul>(Each image needs to be assigned to an SKU from either one of these files).|

