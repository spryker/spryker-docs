---
title: Product feature overview
description: Product Management system allows gathering product characteristics and exported them to Spryker. Products can be managed in the Back Office and displayed in Yves
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/product
originalArticleId: 8f9a65ed-47b6-4b7c-a3e4-c9b7b8bad94a
redirect_from:
  - /v2/docs/product
  - /v2/docs/en/product
  - /v2/docs/product-abstraction
  - /v2/docs/en/product-abstraction
  - /v2/docs/product-management
  - /v2/docs/en/product-management
  - /v2/docs/product-review-filter-and-sort
  - /v2/docs/en/product-review-filter-and-sort
---

Product data is central data for shops. It contains characteristics that describe the product as well as characteristics that control behavior of the shop. For example the color of a product is an important information that the customer might need, whereas the weight of the product can be used to calculate the delivery costs.

Typically, product data is maintained and enriched in an external Product Information Management (PIM) system. As soon as all characteristics are gathered, they can be exported to Spryker. An import interface will transform the incoming product data into the Spryker specific data structure and persist it. After persisting the product, the data is exported to Redis and Elasticsearch. This way, Yves can access the relevant product data very fast. A basic UI allows to access the product data from Zed back-end.

![Product information management](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product/product_information_management.png)

With the Spryker Commerce OS you can easily build a product hierarchy structure with Abstract and Concrete Products.

Products can come with multiple Variants, such as size or color. In order to provide a better shopping experience to your customers, the different Variants, or Concrete Products, are grouped under an Abstract Product.

The topmost hierarchy level, the Abstract Product, does not have its own stock, but defines various default properties for the descendant Concrete Products, or Variants. The Concrete Product, or Variant, always belongs to one Abstract Product, has a distinctive stock and always differs from another Concrete Product with at least one Super Product Attribute.

With the Spryker Commerce OS you can easily build a product hierarchy structure.

Products can come with multiple Variants, such as size or color. In order to provide a nice shopping experience to your customers, the different Variants, or Concrete Products, are grouped under an Abstract Product. The topmost hierarchy level, the Abstract Product, does not have its own stock, but defines various default properties for the descendant Concrete Products, or Product Variants. The Concrete Product, or Variant, always belongs to one Abstract Product, has a distinctive stock and always differs from another Concrete Product with at least one Super Product Attribute. Super Attributes in the Spryker Commerce OS are used to distinguish between the different Product Variants of an abstract product. Super Attributes define each Concrete Product and can consist of whichever distinguishing feature you wish to highlight, such as size or color. This information can either be manually managed or imported and processed automatically. Consider the example of a T-shirt, the Abstract Product, that is available in the sizes small, medium, and large, three different Product Variants. The Abstract Product ""T-shirt"" appears as a search result. On the product detail page the customer can select between the product variants small, medium, large and put it into the cart. You can clearly define time frames for the availability of products, without having to manually manage the inventory. This is especially useful for promotions or seasonal items.

## Abstract and Concrete Products (Variants)
Spryker Commerce OS’s data structure for products allows to design a product hierarchy, which Yves relies on to display products in the correct way. Every product consists of an abstract product and one or more concrete products, also called variants. Your customers cannot buy an abstract product. The item that can be put into cart is always the concrete product.

You can clearly define time frames for the availability of products, without having to manually manage the inventory. This is especially useful for promotions or seasonal items.

### Example
Imagine your product is a **shoe**. This shoe comes in three different sizes:

- 40
- 41
- 42

Now technically you could have 3 different standalone products with three product detail pages.

- From a customer perspective this is unnecessary overhead, especially considering that a product catalog should not display three times a product that will most likely look identical.
- From a product management perspective, the same product would have to be created three times with the only difference being the size.
![Product variants](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Abstraction/product_variants.png)

## Differentiate Between Abstract and Concrete Products
In Spryker Commerce OS, both abstract and concrete products have:

* SKU
* name
* description
* price
* product attributes
* media assets

This information, besides the SKU, is inherited from the abstract to the concrete products when they are created. However, only the concrete product has stock and may have one or more additional attributes that we call super attributes (In the example above the super attribute is the size). This structure allows to create multiple variants of a product, which eventually are the products that your customers buy.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Abstraction/producterd.png)

## Product Hierarchy in the Spryker Commerce OS Demoshop 
In the catalog of the shop frontend, the abstract products are listed (e.g. shoe model X blue). Once the customer has selected one of these abstract products and proceeded to the product detail page, the abstract products information is displayed first. Only after having selected the distinctive characteristic of a variant (e.g. size 41 for the shoe in the example above) the concrete product information is displayed (e.g. shoe model X color = blue size = 41). Note that the structure of the products is a business decisions and that both, abstract and concrete products, share the same URL in the Spryker Commerce OS demoshop.