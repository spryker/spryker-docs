---
title: Retrieving image sets of abstract products
description: Retrieve image sets of abstract products.
last_updated: Feb 2, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v6/docs/retrieving-image-sets-of-abstract-products
originalArticleId: 30b6dda2-d7b6-40d2-8936-52c2351d3167
redirect_from:
  - /v6/docs/retrieving-image-sets-of-abstract-products
  - /v6/docs/en/retrieving-image-sets-of-abstract-products
related:
  - title: Product image management
    link: docs/scos/user/features/page.version/product-feature-overview/product-images-overview.html
---

This endpoint allows to retrieve image sets of abstract products.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html.


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
    <summary markdown='span'>Response sample</summary>
    
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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
