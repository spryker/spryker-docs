---
title: Retrieving image sets of abstract products
description: Retrieve image sets of abstract products.
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-image-sets-of-abstract-products
originalArticleId: 823ef04b-e614-4022-a30f-6e2130d280d8
redirect_from:
  - /2021080/docs/retrieving-image-sets-of-abstract-products
  - /2021080/docs/en/retrieving-image-sets-of-abstract-products
  - /docs/retrieving-image-sets-of-abstract-products
  - /docs/en/retrieving-image-sets-of-abstract-products
---

This endpoint allows to retrieve image sets of abstract products.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products Feature Integration](/docs/scos/dev/migration-and-integration/{{ page.version }}/feature-integration-guides/glue-api/glue-api-products-feature-integration.html).


## Retrieve image sets of an abstract product
To retrieve image sets of an abstract product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/abstract-product-image-sets**

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get the image sets of. |

### Request

Request sample: `GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-image-sets`


### Response

<details open>
    <summary>Response sample</summary>
    
```json
{
    "data": [
        {
            "type": "abstract-product-image-sets",
            "id": "177",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/norm/high/24867659-4916.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/norm/medium/24867659-4916.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/abstract-products/177/abstract-product-image-sets"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/abstract-products/177/abstract-product-image-sets"
    }
}
```
    
</details>

<a name="abstract-product-sets-response-attributes"></a>

| Attribute | Description |
| --- | --- |
| name | Image set name |
| externalUrlLarge | URLs to the image per image set per image |
| externalUrlSmall | URLs to the image per image set per image |


## Possible errors

| Code | Meaning |
| --- | --- |
| 303 | Can't find abstract product image sets. |
| 311 | Abstract product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{ page.version }}/reference-information-glueapplication-errors.html).
