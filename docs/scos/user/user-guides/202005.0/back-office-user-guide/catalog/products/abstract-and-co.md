---
title: Abstract and Concrete Products
originalLink: https://documentation.spryker.com/v5/docs/abstract-and-concrete-products
redirect_from:
  - /v5/docs/abstract-and-concrete-products
  - /v5/docs/en/abstract-and-concrete-products
---

Products can extensively vary, for example, in size or color. In order to provide a nice shopping experience to your customers, the different Variants, or Concrete Products, are grouped under an Abstract Product. 
The topmost hierarchy level, the Abstract Product, does not have its own stock but defines various default properties for the descendant Concrete Products, or Product Variants. The Abstract Product must have at least one Conrete Product (or Variant) in order to be usable in the Shop. The Concrete Product always belongs to one Abstract Product, has a distinctive stock and always differs from another Concrete Product with at least one Super Product Attribute. See articles under the _Attributes_ section to learn more about the super attributes. According to Spryker Commerce OS logic, you create an abstract product first.

See [Products: Reference Information](https://documentation.spryker.com/docs/en/products-reference-information) to know more about abstract products and concrete products.

In most cases, large product catalogs are imported into the system. But Category Managers can create the products manually. When you have a new product in your store with only several variants, it makes sense to create the product manually. 

***
**What's next?**
Let's start learning how the products are created by reviewing a real-life example.

You have a new product in your store. The new product is a Smartphone that goes in three colors: red, green, and orange. Those colors are product variants.

So first you create an abstract product. See [Creating an Abstract Product](https://documentation.spryker.com/docs/en/creating-an-abstract-product).

