---
title: Product Relations
description: This section can be used to define and manage product relations, set types of relations and assign related products in the Back Office.
last_updated: May 19, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v1/docs/product-relations-management
originalArticleId: 13e5b35f-b9ad-4c9d-8083-5ec6c035a032
redirect_from:
  - /v1/docs/product-relations-management
  - /v1/docs/en/product-relations-management
related:
  - title: Product Relations Feature Overview
    link: docs/scos/user/features/page.version/product-relations-feature-overview.html
---

Product relations help shop owners to promote the related goods as well as to point the customers' attention to the goods that they may also want to see.
Product relations are built on the abstract product and not the concrete products. One abstract product can have from one to many product relations. Once you define a product to which a relation is added, you need to also set a specific set of rules, or even a group, under which the relation is going to be built. Keep in mind that this is a one-way relation, meaning that only the product that you have defined will have the Similar Products section on its PDP (product details page) or in the cart, depending on the relation type. But the related product(s) that you assign to it will not get the same view unless you perform the same procedure for each individual item. 
{% info_block infoBox "Info" %}
You can choose to either use Spryker's condition rule builder to manually define relations or import the information from an external source.
{% endinfo_block %}

Product relations are built on a base of abstract products, not concrete products.
To summarize, you can:
* Type: **Upselling** - Display one to many similar products in the cart.
* Type: **Related products** - Display one to many similar products on the Product Details Page.
***
**What's next?**

* To know how you create the product relation, see [Creating a Product Relation](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-relations/creating-product-relations.html).
* To know the product relations are managed, see [Managing Product Relations](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-relations/managing-product-relations.html).
* To know more about the attributes that you select and enter while creating or managing a product relation and see some examples of how the product relations look in the online store, see [Product Relations: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-relations/references/product-relations-reference-information.html).
