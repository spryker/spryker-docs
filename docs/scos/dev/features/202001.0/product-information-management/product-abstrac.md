---
title: Product Abstraction
originalLink: https://documentation.spryker.com/v4/docs/product-abstraction
redirect_from:
  - /v4/docs/product-abstraction
  - /v4/docs/en/product-abstraction
---

One and the same product can have multiple variants, such as size or color. In the context of the Spryker Commerce OS, such product variations are called **Product Variants**, or **Concrete Products**. To distinguish between different product versions, to keep track of their stock and to provide a better shopping experience to customers, the Product Variants are grouped under an **Abstract Product**. 

For example, if a laptop comes in black and blue colors, the laptop itself will be the Abstract Product with two Concrete Products (Variants) that customers can buy: black laptops and blue laptops:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Abstraction/abstract-concrete-products.png){height="" width=""}

## Product Data that Differ Abstracts from Concretes
So the topmost hierarchical level of a product is the Abstract Product. The Abstract Product does not have its own stock, but defines various default properties for the descendant Product Variants. The Product Variant always belongs to one Abstract Product, has a distinctive stock, and always differs from another Product Varian with at least one Super Product Attribute <!---LINK-->.
The following table summarizes differences between the Abstract Products and the Product Variants:

| Product data | Abstract Product | Product Variant |
| --- | --- | --- |
| SKU | v | v |
| Name | v | v |
| Description | v | v |
| Product attributes | v | v |
| Super attributes |  | v |
| Media assets | v | v |
| Stock |  | v |

## Products Behavior on the Storefront
On the Storefront, only Abstract Products appear in the Product Catalog and can be searched for. The  Product Variants are always a part of an Abstract Product. Therefore, Abstract Product and all its Product Variants share the same URL.

Le't consider an example illustrating the relation between Abstract and Concrete Products and their behavior on the Storefront:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Abstraction/product-abstraction.png){height="" width=""}

In this example, a T-shirt, the Abstract Product, is available in sizes S, M, and L, which are three different Product Variants, each holding its own stock. When you search *T-shirt* on the Storefront, it's the Abstract Product that appears as the search result. Your customers can not buy the Abstract Product. On the product detail page, they have to select between the Product Variants S, M, L to put the *T-shirt* product to cart. 

{% info_block infoBox "Note" %}

Grouping the Product Variants under an Abstract Product allows you to build a clear product hierarchy to provide great customer experience and to manage your products effectively. However, keep in mind that creating a product structure is a solid business decision that affects both the visual representation and behavior of your online store.

{% endinfo_block %}






