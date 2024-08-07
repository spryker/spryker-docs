---
title: "Glue API: Retrieve product reviews when retrieving abstract products"
description: Learn how to retrieve product reviews when retrieving abstract products using Glue API.
last_updated: Sep 2, 2022
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/pbc/all/ratings-reviews/202311.0/manage-using-glue-api/retrieve-product-reviews-when-retrieving-abstract-products.html
  - /docs/pbc/all/ratings-reviews/202204.0/manage-using-glue-api/glue-api-retrieve-product-reviews-when-retrieving-abstract-products.html
---

This endpoint allows retrieving general information about abstract products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see the docs:
* [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)
* [Install the Product Rating and Reviews Glue API](/docs/pbc/all/ratings-reviews/{{site.version}}/install-and-upgrade/install-the-product-rating-and-reviews-glue-api.html)



## Retrieve an abstract product

To retrieve general information about an abstract product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}***

---


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get information for. |

### Request

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | product-reviews |


`GET https://glue.mysprykershop.com/abstract-products/035?include=product-reviews`: Retrieve information about the abstract product with SKU `001` with its product reviews.


### Response





<details>
<summary markdown='span'>Response sample: retrieve information about an abstract product with the details about product reviews</summary>

```json
{
    "data": {
        "type": "abstract-products",
        "id": "035",
        "attributes": {
            "sku": "035",
            "averageRating": 4.7,
            "reviewCount": 3,
            "name": "Canon PowerShot N",
            "description": "Creative Shot Originality is effortless with Creative Shot. Simply take a shot and the camera will analyse the scene then automatically generate five creative images plus the original unaltered photo - capturing the same subject in a variety of artistic and surprising ways. The unique symmetrical, metal-bodied design is strikingly different with an ultra-modern minimalist style - small enough to keep in your pocket and stylish enough to take anywhere. HS System excels in low light allowing you to capture the real atmosphere of the moment without flash or a tripod. Advanced DIGIC 5 processing and a high-sensitivity 12.1 Megapixel CMOS sensor give excellent image quality in all situations.",
            "attributes": {
                "focus": "TTL",
                "field_of_view": "100%",
                "display": "LCD",
                "sensor_type": "CMOS",
                "brand": "Canon",
                "color": "Silver"
            },
            "superAttributesDefinition": [
                "color"
            ],
            "superAttributes": {
                "color": [
                    "Silver"
                ]
            },
            "attributeMap": {
                "product_concrete_ids": [
                    "035_17360369"
                ],
                "super_attributes": {
                    "color": [
                        "Silver"
                    ]
                },
                "attribute_variants": []
            },
            "metaTitle": "Canon PowerShot N",
            "metaKeywords": "Canon,Entertainment Electronics",
            "metaDescription": "Creative Shot Originality is effortless with Creative Shot. Simply take a shot and the camera will analyse the scene then automatically generate five creat",
            "attributeNames": {
                "focus": "Focus",
                "field_of_view": "Field of view",
                "display": "Display",
                "sensor_type": "Sensor type",
                "brand": "Brand",
                "color": "Color"
            },
            "url": "/en/canon-powershot-n-35"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/abstract-products/035?include=product-reviews"
        },
        "relationships": {
            "product-reviews": {
                "data": [
                    {
                        "type": "product-reviews",
                        "id": "29"
                    },
                    {
                        "type": "product-reviews",
                        "id": "28"
                    },
                    {
                        "type": "product-reviews",
                        "id": "30"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-reviews",
            "id": "29",
            "attributes": {
                "rating": 5,
                "nickname": "Maria",
                "summary": "Curabitur varius, dui ac vulputate ullamcorper",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel mauris consequat, dictum metus id, facilisis quam. Vestibulum imperdiet aliquam interdum. Pellentesque tempus at neque sed laoreet. Nam elementum vitae nunc fermentum suscipit. Suspendisse finibus risus at sem pretium ullamcorper. Donec rutrum nulla nec massa tristique, porttitor gravida risus feugiat. Ut aliquam turpis nisi."
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-reviews/29"
            }
        },
        {
            "type": "product-reviews",
            "id": "28",
            "attributes": {
                "rating": 5,
                "nickname": "Spencor",
                "summary": "Donec vestibulum lectus ligula",
                "description": "Donec vestibulum lectus ligula, non aliquet neque vulputate vel. Integer neque massa, ornare sit amet felis vitae, pretium feugiat magna. Suspendisse mollis rutrum ante, vitae gravida ipsum commodo quis. Donec eleifend orci sit amet nisi suscipit pulvinar. Nullam ullamcorper dui lorem, nec vehicula justo accumsan id. Sed venenatis magna at posuere maximus. Sed in mauris mauris. Curabitur quam ex, vulputate ac dignissim ac, auctor eget lorem. Cras vestibulum ex quis interdum tristique."
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-reviews/28"
            }
        },
        {
            "type": "product-reviews",
            "id": "30",
            "attributes": {
                "rating": 4,
                "nickname": "Maggie",
                "summary": "Aliquam erat volutpat",
                "description": "Morbi vitae ultricies libero. Aenean id lectus a elit sollicitudin commodo. Donec mattis libero sem, eu convallis nulla rhoncus ac. Nam tincidunt volutpat sem, eu congue augue cursus at. Mauris augue lorem, lobortis eget varius at, iaculis ac velit. Sed vulputate rutrum lorem, ut rhoncus dolor commodo ac. Aenean sed varius massa. Quisque tristique orci nec blandit fermentum. Sed non vestibulum ante, vitae tincidunt odio. Integer quis elit eros. Phasellus tempor dolor lectus, et egestas magna convallis quis. Ut sed odio nulla. Suspendisse quis laoreet nulla. Integer quis justo at velit euismod imperdiet. Ut orci dui, placerat ut ex ac, lobortis ullamcorper dui. Etiam euismod risus hendrerit laoreet auctor."
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-reviews/30"
            }
        }
    ]
}
```
</details>

{% include pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-products-response-attributes.md -->

{% include /pbc/all/glue-api-guides/{{page.version}}/product-reviews-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/product-reviews-response-attributes.md -->

## Possible errors

| CODE | REASON |
|-|-|
| 301 | Abstract product is not found. |
| 311 | Abstract product SKU is not specified. |
