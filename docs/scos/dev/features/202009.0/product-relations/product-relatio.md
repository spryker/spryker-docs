---
title: Product Relations feature overview
originalLink: https://documentation.spryker.com/v6/docs/product-relations-feature-overview
redirect_from:
  - /v6/docs/product-relations-feature-overview
  - /v6/docs/en/product-relations-feature-overview
---

The Product Relations feature enables product catalog managers to create logical relations between products based on their actual properties. Product relations are displayed on the Storefront to achieve multiple purposes.

For example, you can:

*     Promote products in cart.
*     Recommend product alternatives.
*     Display comparable or additional products to the product a customer is viewing.


Product relations are established only between abstract products. An abstract product can have multiple product relations. 

See [Creating a Product Relation](https://documentation.spryker.com/docs/creating-a-product-relation) to learn how a product catalog manager can create a product relation.

A developer can import<!-- link to new import page --> product relations.

## Product Relation Types

A product relation type defines how a product relation is displayed on Storefront. The following product relation types are shipped with the feature: Related products and Upselling.

With Related products, [related products](#product-types-in-product-relations) are displayed on the product details page of the [product owing the relation](#product-types-in-product-relations).

![Related products](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/202006.0/related-products.gif){height="" width=""}


With Upselling, when the product owing the relation is added to cart, related products are displayed on the *Cart* page.

![Upselling](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/202006.0/Upselling.gif){height="" width=""}





A product catalog manager can select a product relation type when [creating](https://documentation.spryker.com/docs/creating-a-product-relation) or [editing](https://documentation.spryker.com/docs/managing-product-relations#editing-a-product-relation) a product relation in the Back Office.


## Product Types in Product Relations

In product relations, there are two types of products: a product owning a relation and a related product. 

There is always only one product that owns a product relation. It is selected manually from the product catalog. 

There can be multiple related products in a product relation. Related products are added automatically based on the [related product rules](#related-product-rules).

On the Storefront, the related products are displayed on the product details page of the product owning the relation. Product relations do not work the other way around. In other words, the product owning the relation is not displayed on the product details pages of its related products. 




## Related Product Rules

A related product rule is a condition that should be fulfilled by a product to be automatically added to related products of a product relation. The rules are defined as queries which are built using the Query Builder in the Back Office. 

A product relation can have one or more rules. Example:

| Parameter | Relation operator | Value |
| --- | --- | --- |
| Brand | equal | Sony |
| Category | equal | Cameras |

In this example, only the products that belong to the *Cameras* category and *Sony* brand are added to related products.

You can combine the rules using *AND* and *OR* combination operators. When several rules are combined with the AND operator, all of them should be fulfilled for a product to be added to related products. When several rules are combined with the OR operator, at least one of them should be fulfilled for the product to be added to related products.

In the following example, for a product to be added to related products, it should belong to both the *Sony* brand and the *Cameras* category.

![And combination operator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/202006.0/and-combination-operator.png){height="" width=""}

In the following example, for a product to be added to related products, it should belong to at least the *Sony* brand or the *Cameras* category. 

![Or combination operator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/202006.0/or-combination-operator.png){height="" width=""}


{% info_block infoBox "Info" %}

When rules are combined by the OR operator, they do not exclude each other. If a product fulfills both such rules, it is still added to related products. In the previous example, a product should fulfill at least one of the rules to be added to related products. However, fulfilling both of them still adds it to related products.

{% endinfo_block %}


### Rule Groups

When you have a big product catalog, you might want to use rule groups to make the selection of related products more precise. A rule group is a separate set of rules with its own combination operator. 

![Rule group]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/202006.0/rule-group.png){height="" width=""}

With the rule groups, you can build multiple levels of rule hierarchy. When a product is evaluated against the rules, it is evaluated on all the levels of the hierarchy you build. On each level, there can be both rules and rule groups.

![Rule group hierarchy](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/202006.0/rule-group-hierarchy.png){height="" width=""}

When a product is evaluated on a level that has a rule and a rule group, the rule group is treated as a single rule. The diagram below shows how a product is evaluated against the rules on the previous screenshot.

<details>
    <summary>Product evaluation diagram</summary>

![product-relation-rule-hierarchy](https://confluence-connect.gliffy.net/embed/image/04eed8c7-8608-472f-8c74-9510d2449487.png?utm_medium=live&utm_source=custom){height="" width=""}
    
</details>

### Related Product Updates

After you save a product relation, the products that fulfill the defined rules are added to related products. If you want to keep the list of related products up to date with the changes in your product catalog that may happen in the future, you can set the product relation to be updated regularly. 

If selected, the product catalog is automatically evaluated against the defined rules on a regular basis. By default, the list of related products is updated every day at 02:30 GMT.  If, at some point, one or more related products no longer fulfill the rules, they are removed from related products. If there are new products fulfilling the rules, they are added to related products. 

If you do not select this option, the product catalog is evaluated against the defined rules only at the stage of product relation creation. 

A product catalog manager can select this option when [creating](https://documentation.spryker.com/docs/creating-a-product-relation) a product relation.

A developer can do the following:

*     Manually update the list of related products by running the `console product-relation:update` command.
*     Change the default behavior of the cronjob that updates related products in `config/Zed/cronjobs/jenkins.php`.


## Store Relation

A product catalog manager can define the [stores](https://documentation.spryker.com/docs/multiple-stores) each product relation is displayed in. 

If no store relation is defined for a product relation, it is not displayed on Storefront.

Stores are defined when creating or editing a product relation in the Back Office.






