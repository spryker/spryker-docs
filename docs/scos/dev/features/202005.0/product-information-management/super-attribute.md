---
title: Super Attributes
originalLink: https://documentation.spryker.com/v5/docs/super-attributes
redirect_from:
  - /v5/docs/super-attributes
  - /v5/docs/en/super-attributes
---

The **super attribute** is the only way to tell a Spryker-based shop that a product contains multiple variants (or [concrete products](/docs/scos/dev/features/202005.0/product-information-management/product-abstrac)) to allow your customer to select the right product.
Spryker supports an unlimited amount of super attributes for a given [abstract product](/docs/scos/dev/features/202005.0/product-information-management/product-abstrac). See below to understand how abstract and concrete products work with super attributes.

## Hierarchy of Products

At Spryker, there are 2 product levels:
* Abstract
* Concrete

An abstract product can contain one or more concrete products. You can only link a concrete product to one abstract product.

### Differences Between the Levels

Abstract product is the level where all the information about the product is located, such as title, description, images, prices, brand.
Concrete product is the level where all divergent information compared to the abstract product is located, such as size, color, images, prices. It is the level where the stock for the product is defined. It is the only level where super attributes must be defined.

### Inheritance Between Levels

Whenever Spryker must display some information about a concrete product, information of the abstract product is merged with the concrete product's information. Information from the concrete product is more important than the information about the abstract product.

## Use Cases
The use cases below will help you understand how abstract products and concrete products with super attributes data are used and processed in a real online store.

### Case 1

If you sell books, most of the time, they do not have variations. So you will structure such products in a Spryker-based shop as one abstract product and one concrete product.
The abstract product will contain all information about the product. The concrete product will only hold the stock information.

### Case 2

You sell a product in two colors, blue and green. You have to structure such a product in a Spryker-based shop as one abstract product and two concrete products. Suppose the green variant is more expensive than the blue one. In this case, you must use a **super attribute** so your customers can select which variant they want to buy.
The abstract product will contain all information about the product.
The concrete products will contain the following  information:
* The blue variant will only hold the stock information and a color super attribute (blue value).
* The green variant will hold the stock information, a color super attribute (green value), and the price, which is different than that of the abstract product.

### Case 3

You sell a product in five colors, four sizes, and three materials. You can have up to 5 x 4 x 3 = 60 variants to support all combinations. In your shop, you can structure such a product as one abstract product and up to 60 concrete products, or you can use the Product Group feature to have five abstract product (one for each color), and each abstract product will contain up to 12 concrete products (combinations for the sizes and the materials).
The abstract product will contain all information about the product. Each variant will only hold the stock information and the super attribute values for color, size, and material.

