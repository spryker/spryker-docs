---
title: "Glue API: Retrieving image sets of abstract products"
description: Retrieve image sets of abstract products.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-image-sets-of-abstract-products
originalArticleId: 823ef04b-e614-4022-a30f-6e2130d280d8
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-products/abstract-products/retrieving-image-sets-of-abstract-products.html
  - /docs/pbc/all/product-information-management/202311.0/manage-using-glue-api/abstract-products/glue-api-retrieve-image-sets-of-abstract-products.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-image-sets-of-abstract-products.html
related:
  - title: Retrieving abstract products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html
  - title: Retrieve abstract product availability
    link: docs/pbc/all/warehouse-management-system/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-availability.html
  - title: Retrieving abstract product prices
    link: docs/pbc/all/price-management/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-prices.html
  - title: Product image management
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-feature-overview/product-images-overview.html
---

This endpoint allows retrieving image sets of abstract products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html).


## Retrieve image sets of an abstract product

To retrieve image sets of an abstract product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/abstract-product-image-sets**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get the image sets of. |

### Request

Request sample: retrieve image sets of an abstract product

`GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-image-sets`

### Response

<details>
<summary>Response sample: retrieve image sets of an abstract product</summary>

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

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| name | Image set name |
| externalUrlLarge | URLs to the image per image set per image |
| externalUrlSmall | URLs to the image per image set per image |


## Possible errors

| CODE | REASON |
| --- | --- |
| 303 | Can't find abstract product image sets. |
| 311 | Abstract product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
