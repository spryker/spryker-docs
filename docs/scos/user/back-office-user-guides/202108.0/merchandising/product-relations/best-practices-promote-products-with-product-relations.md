---
title: View product relations
description: Learn how to promote products using related products.
template: back-office-user-guide-template
---






The rules and the group of rules are used to specify the specific conditions under which this or that similar product should appear on the *Abstract Product* page or in the cart.

Let's say you have a _Pen_ as an abstract product, and you need another abstract product _Pencil_ to be displayed as a similar product on the _Pen_ product details page.

For this specific case, you will specify **Related products** as a relation type. As a rule, you can select from a wide range of abstract product attributes to specify, like SKU, category, size, and so on. You can also specify if the attribute you select is equal, greater, less (or any other value from the list) than a defined value:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Product+Relations%3A+Reference+Information/product-relations-reference.png)

Or you can set the _Pencil_ abstract product to appear as a similar product for a _Pen_ in the cart (once the _Pen_ is actually added to the cart). For that, you will select Upselling as a Relation type and set the appropriate rule.

However, if you have a specific requirement to display similar products for _Pen_ only if the SKU of a similar product is equal to some value and the brand is equal to a specific value, you will create a Group of rules:
![Group of rules](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Product+Relations%3A+Reference+Information/group-of-rules.png)

So the place where a similar product will appear is defined by the relation type value. Whereas a similar product itself is defined by rules or a group of rules.
