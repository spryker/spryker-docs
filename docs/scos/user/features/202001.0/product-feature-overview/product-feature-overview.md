---
title: Product feature overview
description: Product Management system allows gathering product characteristics and exported them to Spryker. Products can be managed in the Back Office and displayed in Yves.
last_updated: Aug 13, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v4/docs/product
originalArticleId: 89dd1580-60de-4ed8-a80e-c9105d25a214
redirect_from:
  - /v4/docs/product
  - /v4/docs/en/product
  - /v4/docs/product-abstraction
  - /v4/docs/en/product-abstraction
---

Product is the central entity of a shop. Establishing the product data allows you to build and maintain a catalog representing your commercial offerings. The products are created and managed in the [ Back Office](/docs/scos/user/back-office-user-guides/{{page.version}}/general-back-office-overview.html). 
The product information you specify in the Back office, serves various purposes:

* Contains characteristics that describe the product.
* Affects the shop behavior. For example, filtering and search in your shop depend on the product attributes you set. 
* Used for internal calculations, such as, for example, delivery costs based on the product weight.

One and the same product can have multiple variants, such as size or color. In the context of the Spryker Commerce OS, such product variations are called **Product Variants**, or **Concrete Products**. To distinguish between different product versions, to keep track of their stock and to provide a better shopping experience to customers, the Product Variants are grouped under an **Abstract Product**. 

For example, if a laptop comes in black and blue colors, the laptop itself will be the Abstract Product with two Concrete Products (Variants) that customers can buy: black laptops and blue laptops:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Abstraction/abstract-concrete-products.png)

## Product Data that Differ Abstracts from Concretes
So the topmost hierarchical level of a product is the Abstract Product. The Abstract Product does not have its own stock, but defines various default properties for the descendant Product Variants. The Product Variant always belongs to one Abstract Product, has a distinctive stock, and always differs from another Product Varian with at least one Super Product Attribute <!---LINK-->.
The following table summarizes differences between the Abstract Products and the Product Variants:

| Product data | Abstract Product | Product Variant |
| --- | --- | --- |
| SKU | ✓ | ✓ |
| Name | ✓ | ✓ |
| Description | ✓ | ✓ |
| Product attributes | ✓ | ✓ |
| Super attributes |  | ✓ |
| Media assets | ✓ | ✓ |
| Stock |  | ✓ |

## Products Behavior on the Storefront
On the Storefront, only Abstract Products appear in the Product Catalog and can be searched for. The  Product Variants are always a part of an Abstract Product. Therefore, Abstract Product and all its Product Variants share the same URL.

Le't consider an example illustrating the relation between Abstract and Concrete Products and their behavior on the Storefront:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Abstraction/product-abstraction.png)

In this example, a T-shirt, the Abstract Product, is available in sizes S, M, and L, which are three different Product Variants, each holding its own stock. When you search *T-shirt* on the Storefront, it's the Abstract Product that appears as the search result. Your customers can not buy the Abstract Product. On the product detail page, they have to select between the Product Variants S, M, L to put the *T-shirt* product to cart. 

{% info_block infoBox "Note" %}

Grouping the Product Variants under an Abstract Product allows you to build a clear product hierarchy to provide great customer experience and to manage your products effectively. However, keep in mind that creating a product structure is a solid business decision that affects both the visual representation and behavior of your online store.

{% endinfo_block %}

Besides the Spryker Back Office, product information can be maintained in an external **Product Information Management (PIM)** system. The data from the PIM systems can be exported to Spryker. An import interface transforms the incoming product data into the Spryker specific data structure and persists it. After that, the data is exported to Redis and Elasticsearch. This way, the Storefront (Yves) can access the relevant product data very fast. After the import has been finished, you can access the products in the Spryker Back Office (Zed).

![Product information management](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product/product_information_management.png)

The Spryker Commerce OS supports integration of the following PIM systems:

* [Akeneo](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/spryker-os-module-customisation/extending-the-core.html)
* [Censhare PIM](/docs/scos/user/technology-partners/{{page.version}}/product-information-pimerp/censhare-pim.html)


