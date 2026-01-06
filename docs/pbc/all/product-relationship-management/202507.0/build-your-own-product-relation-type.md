---
title: Build your own product relation type
description: Learn how to build your own product relation type with the Spryker Product Relationship Management Feature.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-build-product-relation
originalArticleId: f5527274-f1f1-427c-8155-1c7b26b2c098
redirect_from:
  - /2021080/docs/ht-build-product-relation
  - /2021080/docs/en/ht-build-product-relation
  - /docs/ht-build-product-relation
  - /docs/en/ht-build-product-relation
  - /v6/docs/ht-build-product-relation
  - /v6/docs/en/ht-build-product-relation
  - /v5/docs/ht-build-product-relation
  - /v5/docs/en/ht-build-product-relation
  - /v4/docs/ht-build-product-relation
  - /v4/docs/en/ht-build-product-relation
  - /v3/docs/ht-build-product-relation
  - /v3/docs/en/ht-build-product-relation
  - /v2/docs/ht-build-product-relation
  - /v2/docs/en/ht-build-product-relation
  - /v1/docs/ht-build-product-relation
  - /v1/docs/en/ht-build-product-relation
---

This tutorial shows how to build your own product relation type.

{% info_block infoBox "Note" %}

This instruction is related to Yves and Zed, so both applications must be updated accordingly to allow your product relation type.

{% endinfo_block %}

## Modify Zed

1. Create a new relation type in `\Spryker\Shared\ProductRelation\ProductRelationTypes` as a new constant type—for example, `TYPE_RELATION_NEW`.
2. Include this relation type to `getAvailableRelationTypes` returned array.
3. Select a new relation type when building a relation.
For example, for Yves, you need to create a custom data provider:

```php
<?php

class RelationNewDataProvider implements ProductRelationDataProviderInterface
{
    /**
     * @param array $parameters
     *
     * @return array|\Generated\Shared\Transfer\StorageProductAbstractRelationTransfer[]
     */
    public function buildTemplateData(array $parameters)
    {
       //read data from Yves data store, return data for the view to render.
    }      

    /**
    * @return string
    */
   public function getAcceptedType()
   {
     return ProductRelationTypes::TYPE_RELATION_NEW; //this is the type which is mapped when rendering twig function, first argument.
   }  
}
```

## Modify Yves

By default, the demoshop provides a carousel-type JavaScript component which renders related products.
This component can be added with a twig `product_relation` (type, parameters, title, `templatePath`) function.

The type is a string that maps to a specific data provider and provides custom data when used, like a related product or upselling.

It accepts the following arguments:

| ARGUMENT NAME | TRANSCRIPTION |
| --- | --- |
| `type` | <ul><li>Type which is defined in `\Spryker\Shared\ProductRelation\ProductRelationTypes`</li><li>String value (related-products, up-selling).</li></ul> |
| `parameter` | <ul><li>Parameter for the selected relation type</li><li>This value defers depending on the selected relation types</li></ul> |
| `title` | Title that is displayed in the carousel component. |
| `templatePath` | Path to the template for rendering the carousel component.<br>For example, `@ProductRelation/partial/product_relation_carousel.twig`. |

Each type has a data provider. This data provider reads data from the key-value store, Redis or Valkey, and sends it to the template.

{% info_block warningBox %}

You can use `RelatedProductsDataProvider` or `UpSellingDataProvider` as sample implementations.

{% endinfo_block %}
