---
title: Product Relations Feature Overview
originalLink: https://documentation.spryker.com/v3/docs/product-relations-feature-overview
redirect_from:
  - /v3/docs/product-relations-feature-overview
  - /v3/docs/en/product-relations-feature-overview
---

Product relations help shop owners to promote the related goods as well as to point the customers' attention to the goods that they may also want to see.

Product relations are built on the abstract product and not the concrete products. One abstract product can have from one to many product relations. Once you define a product to which a relation is added, you need to also set a specific set of rules, or even a group, under which the relation is going to be built. Keep in mind that this is a one-way relation, meaning that only the product that you have defined will have the Similar Products section on its PDP (product details page) or in the cart, depending on the relation type. But the related product(s) that you assign to it will not get the same view, unless you perform the same procedure for each individual item [to tie it to any other in the Back Office](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/products/product-relations/creating-a-prod).

![One-way connection](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/One-Way+Connection.gif){height="" width=""}

## Product Relation Types
In Spryker, currently Back Office users can define two types of relations: related products and upselling.

| Related products | Upselling |
| --- | --- |
| With this type of relation, similar products are displayed on the product detail page for the currently selected abstract product. | With this type of relation, similar products are displayed in the cart overview page when a specific abstract product is added to the cart. |

## Database Entity Relation Schema - Product
![Database entityt relation schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Relations/Product+Relations+Feature+Overview/db_relation_schema.png){height="" width=""}

| Database Entity | Description |
| --- | --- |
| spy_product_relation.fk_product_abstract | This is the product for which relation is build. |
| spy_product_relation.is_active | Defines that if relation is not active it will still be exported, but not visible. |
| spy_product_relation_product_abstract.fk_product_abstract | This is the related product. |
| spy_product_relation_product_abstract | This is order in which products should be listen when rendering relations. |

### Legacy Demoshop Only
#### Query Builder - Product Relation

Query builder in Zed allows to select and bulid a dynamic related product query.

The query ships with pre-set rules:

* `sku` - filter by an abstract product sku.
* `name` - filter by an abstract product name. The locale is Zed’s default locale.

{% info_block infoBox %}
If a product matches in that locale it will be related in both locales.
{% endinfo_block %}

* `created_at` - string value date when the abstract product was created.
* `category` - the name of category in the current zed locale.
* `attributes` - the list of attributes as defined in spy_product_attribute_key database table.

{% info_block infoBox %}
These rules can be combined with and or or operators, and it is also possible to nest them to make complex rules.
{% endinfo_block %}

When a product relation form in a saved configured rule is executed, all matching abstract product ids are saved in `spy_product_relation_product_abstract` relation table.

When a query is selected and a relation in saved, the relation needs to be manually updated to reflect latest changes (run again the given query). The console command `product-relation:update` will run all active relations with the `is_rebuild_scheduled` flag selected in the database table `spy_product_relation`.

{% info_block infoBox %}
This command can also be executed by spryker cron jobs and manually triggered via Jenkins.
{% endinfo_block %}

## Yves Datastore Collector - Product Relation
The product relation collector exports relations to the Yves data store.

This collector is located in the ProductRelationCollector module.

1. Include this module in your composer.json file and update.
2. Then add the plugin ProductRelationCollectorPlugin from this module to `\Pyz\Zed\Collector\CollectorDependencyProvider::provideBusinessLayerDependencies`.

```php
<?php
$container[static::STORAGE_PLUGINS] = function (Container $container) {
	return [
		...
		ProductRelationConstants::RESOURCE_TYPE_PRODUCT_RELATION => new ProductRelationCollectorPlugin(),
	];
};
?>
```

{% info_block infoBox %}
The new collector uses product_relation type in the `touch` table.
{% endinfo_block %}

## Current Constraints
{% info_block infoBox %}
Currently, the feature has the following functional constraints which are going to be resolved in the future.
{% endinfo_block %}

* you cannot define a product relation for a single store
* you cannot define more than 1 relation of the same type for a product

<!-- Last review date: Mar 29, 2019-- by Anastasia Datsun -->
