---
title: HowTo - Build Your Own Product Relation Type
originalLink: https://documentation.spryker.com/v3/docs/ht-build-product-relation
redirect_from:
  - /v3/docs/ht-build-product-relation
  - /v3/docs/en/ht-build-product-relation
---

{% info_block infoBox %}
This tutorial provides step-by-step instruction for the process of building your own product relation type.
{% endinfo_block %}

These instructions are related to Yves and Zed, so both applications should be updated accordingly in order to allow your product relation type.

## Zed
To modify Zed, do the following:
1. Create new relation type in `\Spryker\Shared\ProductRelation\ProductRelationTypes` as a new constant type.

{% info_block infoBox "For example:" %}
`TYPE_RELATION_NEW`
{% endinfo_block %}

2. Include this relation type to `getAvailableRelationTypes` returned array.
3. After this you can select a new relation type when building relation.
For example for Yves you need to create custom data provider:

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
       //read data from Yves data store, return data for view to render.
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

## Yves
By default, the demoshop provides a carousel type javascript component which renders related products. 
This component can be added with a twig product_relation(type, parameters, title, templatePath) function. 

The type is a string which maps to a specific data provider and provides custom data when used, like related-product, up-selling.

It accepts the following arguments:

| Argument name | Transcription |
| --- | --- |
| `type` | <ul><li>Is the type which is defined in `\Spryker\Shared\ProductRelation\ProductRelationTypes`</li><li>String value (related-products, up-selling).</li></ul> |
| `parameter` | <ul><li>Is the parameter for the selected relation type</li><li>This value defers depending on the selected relation types</li></ul> |
| `title` | Is the title displayed in the carousel component. |
| `templatePath` | Is the path to the template for rendering the carousel component.</br>For example: `@ProductRelation/partial/product_relation_carousel.twig`. |

Each type has a data provider. This data provider reads data from redis and sends it to the template. 

{% info_block warningBox %}
You can use `RelatedProductsDataProvider` or `UpSellingDataProvider` as sample implementations.
{% endinfo_block %}
