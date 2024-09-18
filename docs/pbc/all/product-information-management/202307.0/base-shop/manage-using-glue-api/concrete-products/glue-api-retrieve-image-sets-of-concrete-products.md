---
title: "Glue API: Retrieve image sets of concrete products"
description: Retrieve image sets of concrete products.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-image-sets-of-concrete-products
originalArticleId: 77585058-128f-4e20-a4c8-633b62dfabec
redirect_from:
  - /docs/scos/dev/glue-api-guides/202307.0/managing-products/concrete-products/retrieving-image-sets-of-concrete-products.html
  - /docs/pbc/all/product-information-management/202307.0/manage-using-glue-api/concrete-products/glue-api-retrieve-image-sets-of-concrete-products.html
related:
  - title: "Glue API: Retrieve concrete products"
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html
  - title: Retrieve concrete product availability
    link: docs/pbc/all/warehouse-management-system/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-availability.html
  - title: Retrieving concrete product prices
    link: docs/pbc/all/price-management/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-prices.html
  - title: Retrieving sales units
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-sales-units.html
  - title: Product image management
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-feature-overview/product-images-overview.html
---

This endpoint allows retrieving image sets of concrete products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html).


## Retrieve image sets of a concrete product

To retrieve image sets of a concrete product, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/concrete-product-image-sets**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get the image sets of. |

### Request

Request sample: retrieve image sets of a concrete product

`GET http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-image-sets`

### Response

<details>
<summary>Response sample: retrieve image sets of a concrete product</summary>

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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
