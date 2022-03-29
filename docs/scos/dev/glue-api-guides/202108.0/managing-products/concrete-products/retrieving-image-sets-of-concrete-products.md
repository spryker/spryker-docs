---
title: Retrieving image sets of concrete products
description: Retrieve image sets of concrete products.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-image-sets-of-concrete-products
originalArticleId: 77585058-128f-4e20-a4c8-633b62dfabec
redirect_from:
  - /2021080/docs/retrieving-image-sets-of-concrete-products
  - /2021080/docs/en/retrieving-image-sets-of-concrete-products
  - /docs/retrieving-image-sets-of-concrete-products
  - /docs/en/retrieving-image-sets-of-concrete-products
related:
  - title: Product image management
    link: docs/scos/user/features/page.version/product-feature-overview/product-images-overview.html
---

This endpoint allows retrieving image sets of concrete products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html).


## Retrieve image sets of a concrete product

To retrieve image sets of a concrete product, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/concrete-product-image-sets**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get the image sets of. |

### Request
Request sample : `GET http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-image-sets`

### Response

<details>
<summary markdown='span'>Response sample</summary>

```json
{
    "data": [
        {
            "type": "concrete-product-image-sets",
            "id": "177_25913296",
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
                "self": "http://glue.mysprykershop.com/concrete-products/177_25913296/concrete-product-image-sets"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/177_25913296/concrete-product-image-sets"
    }
}
```

</details>

<a name="concrete-image-sets-response-attributes"></a>

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| name | Image set name. |
| externalUrlLarge | URLs to the image per image set per image. |
| externalUrlSmall | URLs to the image per image set per image. |

## Possible errors

| CODE | REASON |
| --- | --- |
| 302 | Concrete product is not found. |
| 304 | Can't find concrete product image sets. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
