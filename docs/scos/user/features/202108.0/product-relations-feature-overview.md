---
title: Product Relations feature overview
description: Product Relations is a feature that allows grouping products by attributes for easier navigation and accessibility.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/product-relations-feature-overview
originalArticleId: e3195022-f1fb-492c-9b99-3da32dab77c3
redirect_from:
  - /2021080/docs/product-relations-feature-overview
  - /2021080/docs/en/product-relations-feature-overview
  - /docs/product-relations-feature-overview
  - /docs/en/product-relations-feature-overview
  - /2021080/docs/product-relations
  - /2021080/docs/en/product-relations
  - /docs/product-relations
  - /docs/en/product-relations
---

The _Product Relations_ feature enables product catalog managers to create logical relations between products based on their actual properties. Product relations are displayed on the Storefront to achieve multiple purposes.

For example, you can:
* Promote products in cart.
* Recommend product alternatives.
* Display comparable or additional products to the product a customer is viewing.

Product relations are established only between abstract products. An abstract product can have multiple product relations.

See [Creating a Product Relation](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-relations/creating-product-relations.html) to learn how a Back Office user can create a product relation.

A developer can import<!-- link to new import page --> product relations.

## Product relation types

A product relation type defines how a product relation is displayed on Storefront. The following product relation types are shipped with the feature: Related products and Upselling.

With Related products, [related products](#product-types-in-product-relations) are displayed on the product details page of the [product owing the relation](#product-types-in-product-relations).

![Related products](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/202006.0/related-products.gif)

With Upselling, when the product owing the relation is added to cart, related products are displayed on the *Cart* page.

![Upselling](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/202006.0/Upselling.gif)

A product catalog manager can select a product relation type when [creating](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-relations/creating-product-relations.html) or [editing](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-relations/managing-product-relations.html#editing-product-relations) a product relation in the Back Office.

## Product types in product relations

In product relations, there are two types of products: a product owning a relation and a related product.

There is always only one product that owns a product relation. It is selected manually from the product catalog.

There can be multiple related products in a product relation. Related products are added automatically based on the [related product rules](#related-product-rules).

On the Storefront, the related products are displayed on the product details page of the product owning the relation. Product relations do not work the other way around. In other words, the product owning the relation is not displayed on the product details pages of its related products.

## Related product rules

A related product rule is a condition that should be fulfilled by a product to be automatically added to related products of a product relation. The rules are defined as queries which are built using the Query Builder in the Back Office.

A product relation can have one or more rules. Example:

| PARAMETER | RELATION OPERATOR | VALUE |
| --- | --- | --- |
| Brand | equal | Sony |
| Category | equal | Cameras |

In this example, only the products that belong to the *Cameras* category and *Sony* brand are added to related products.

You can combine the rules using *AND* and *OR* combination operators. When several rules are combined with the AND operator, all of them should be fulfilled for a product to be added to related products. When several rules are combined with the OR operator, at least one of them should be fulfilled for the product to be added to related products.

In the following example, for a product to be added to related products, it should belong to both the *Sony* brand and the *Cameras* category.

![And combination operator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/202006.0/and-combination-operator.png)

In the following example, for a product to be added to related products, it should belong to at least the *Sony* brand or the *Cameras* category.

![Or combination operator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/202006.0/or-combination-operator.png)

{% info_block infoBox "Info" %}

When rules are combined by the OR operator, they do not exclude each other. If a product fulfills both such rules, it is still added to related products. In the previous example, a product should fulfill at least one of the rules to be added to related products. However, fulfilling both of them still adds it to related products.

{% endinfo_block %}

### Rule groups

When you have a big product catalog, you might want to use rule groups to make the selection of related products more precise. A rule group is a separate set of rules with its own combination operator.

![Rule group]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/202006.0/rule-group.png)

With the rule groups, you can build multiple levels of rule hierarchy. When a product is evaluated against the rules, it is evaluated on all the levels of the hierarchy you build. On each level, there can be both rules and rule groups.

![Rule group hierarchy](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/202006.0/rule-group-hierarchy.png)

When a product is evaluated on a level that has a rule and a rule group, the rule group is treated as a single rule. The diagram below shows how a product is evaluated against the rules on the previous screenshot.

<details><summary markdown='span'>Product evaluation diagram</summary>

![product-relation-rule-hierarchy](https://confluence-connect.gliffy.net/embed/image/04eed8c7-8608-472f-8c74-9510d2449487.png?utm_medium=live&utm_source=custom)

</details>

### Related product updates

After you save a product relation, the products that fulfill the defined rules are added to related products. If you want to keep the list of related products up to date with the changes in your product catalog that may happen in the future, you can set the product relation to be updated regularly.

If selected, the product catalog is automatically evaluated against the defined rules on a regular basis. By default, the list of related products is updated every day at 02:30 GMT.  If, at some point, one or more related products no longer fulfill the rules, they are removed from related products. If there are new products fulfilling the rules, they are added to related products.

If you do not select this option, the product catalog is evaluated against the defined rules only at the stage of product relation creation.

A product catalog manager can select this option when [creating](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-relations/creating-product-relations.html) a product relation.

A developer can do the following:

* Manually update the list of related products by running the `console product-relation:update` command.
* Change the default behavior of the cronjob that updates related products in `config/Zed/cronjobs/jenkins.php`.

## Store relation

A product catalog manager can define the [stores](/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-multiple-stores.html) each product relation is displayed in.

If no store relation is defined for a product relation, it is not displayed on Storefront.

Stores are defined when creating or editing a product relation in the Back Office.

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of the Product Relations feature](/docs/scos/user/features/{{page.version}}/product-rating-and-reviews-feature-overview.html)  |   |
| [Create product relations](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-relations/creating-product-relations.html)  |   |
| [Manage product relations](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-relations/managing-product-relations.html)  |   |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Product Relations feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/product-relations-feature-walkthrough/product-relations-feature-walkthrough.html) for developers.

{% endinfo_block %}
