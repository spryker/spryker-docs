---
title: Abstract and Concrete Products
originalLink: https://documentation.spryker.com/v3/docs/abstract-and-concrete-products
redirect_from:
  - /v3/docs/abstract-and-concrete-products
  - /v3/docs/en/abstract-and-concrete-products
---

Products can extensively vary, for example, in size or color. In order to provide a nice shopping experience to your customers, the different Variants, or Concrete Products, are grouped under an Abstract Product. 
The topmost hierarchy level, the Abstract Product, does not have its own stock but defines various default properties for the descendant Concrete Products, or Product Variants. The Concrete Product always belongs to one Abstract Product, has a distinctive stock and always differs from another Concrete Product with at least one Super Product Attribute. See articles under the _Attributes_ section to learn more about the super attributes. According to Spryker Commerce OS logic, you create an abstract product first.

See [Products: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/products/products/references/products-refere) to know more about abstract products and concrete products.

In most cases, large product catalogs are imported into the system. But Category Managers can create the products manually. When you have a new product in your store with only several variants, it makes sense to create the product manually. 

***
**What's next?**
Let's start learning how the products are created by reviewing a real-life example.

You have a new product in your store. The new product is a Smartphone that goes in three colors: red, green, and orange. Those colors are product variants.

So first you create an abstract product. See the [Creating an Abstract Product](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/products/products/abstract-products/creating-an-abs) article.
