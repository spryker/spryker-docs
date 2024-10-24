---
title: "Glue API: Retrieve abstract products in abstract product lists"
description: This glue API document describes how to retrieve abstract products in abstract product lists.
template: glue-api-storefront-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/marketplace/dev/glue-api-guides/202311.0/content-items/retrieving-abstract-products-in-abstract-product-lists.html
related:
  - title: Retrieving abstract products
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-using-glue-api/glue-api-retrieve-abstract-products.html
---

This endpoint allows retrieving abstract products in [abstract product lists](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/navigation-feature-overview.html).

## Installation

For details about the modules that provide the API functionality and how to install them, see [Content Items API](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-content-items-glue-api.html).

## Retrieve abstract products in an abstract product list


To retrieve abstract products in an abstract product list, send the request:


***
`GET` {% raw %}**/content-product-abstract-lists/*{{content_item_key}}*/abstract-products**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION      |
| ----------------- | -------------------------- |
| {% raw %}***{{content_item_key}}***{% endraw %}   | Unique identifier of an abstract product list to  retrieve the abstract products of. |


{% info_block warningBox "" %}

Alternatively, you can [retrieve an abstract product list](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-list-content-items.html#retrieve-abstract-product-list-content-item) with the `abstract-products` resource included.

{% endinfo_block %}

### Request

Request sample: retrieve abstract products in an abstract product list

`GET http://mysprykershop.com/content-product-abstract-lists/apl-1/abstract-products`


| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Accept-Language | string | &check; | Comma-separated list of locales. If no locale is specified, data from the default locale is returned. |



### Response

<details>
<summary>Response sample: retrieve abstract products in an abstract product list</summary>

```json
{
    "data": [
        {
            "type": "abstract-products",
            "id": "204",
            "attributes": {
                "sku": "204",
                "merchantReference": "MER000002",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Sony PXW-FS5K",
                "description": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second. Add some power to your shots: Add an E-mount lens with a power zoom and smoothly focus in on your subject with up to 11x magnification. Capture it all in HD: Capture all the detail with Full HD 1920 x 1080 video shooting (AVCHD format) at 24mbs for increased detail and clarity. DSLR quality photos: Shoot stills with DSLR-like picture quality and shallow depth of field for professional looking shots.",
                "attributes": {
                    "iso_sensitivity": "3200",
                    "sensor_type": "CMOS",
                    "white_balance": "Auto",
                    "wi_fi": "yes",
                    "brand": "Sony",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Black"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "204_29851280"
                    ],
                    "super_attributes": {
                        "color": [
                            "Black"
                        ]
                    },
                    "attribute_variants": [],
                    "attribute_variant_map": {
                        "286": []
                    }
                },
                "metaTitle": "Sony PXW-FS5K",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDescription": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic vide",
                "attributeNames": {
                    "iso_sensitivity": "ISO sensitivity",
                    "sensor_type": "Sensor type",
                    "white_balance": "White balance",
                    "wi_fi": "Wi-Fi",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/sony-pxw-fs5k-204"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/204"
            }
        },
        {
            "type": "abstract-products",
            "id": "205",
            "attributes": {
                "sku": "205",
                "merchantReference": "MER000002",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Toshiba CAMILEO S30",
                "description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
                "attributes": {
                    "total_megapixels": "8 MP",
                    "display": "LCD",
                    "self_timer": "10 s",
                    "weight": "118 g",
                    "brand": "Toshiba",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "total_megapixels",
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Grey"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "205_6350138"
                    ],
                    "super_attributes": {
                        "color": [
                            "Grey"
                        ]
                    },
                    "attribute_variants": [],
                    "attribute_variant_map": {
                        "287": []
                    }
                },
                "metaTitle": "Toshiba CAMILEO S30",
                "metaKeywords": "Toshiba,Smart Electronics",
                "metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
                "attributeNames": {
                    "total_megapixels": "Total Megapixels",
                    "display": "Display",
                    "self_timer": "Self-timer",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/toshiba-camileo-s30-205"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/205"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/access-tokens"
    }
}
```
</details>

| ATTRIBUTE    | TYPE   | DESCRIPTION   |
| ---------------- | ----- | ----------------------- |
| attributes     | string | The abstract product's attributes.  |
| attributes.sku      | string | Unique identifier of the abstract product.    |
| attributes.merchantReference | string | Unique identifier of the merchant to which this product belongs.|
| attributes.averageRating | String | Average rating of the product based on customer rating. |
| attributes.reviewCount | String | Number of reviews left by customers for the abstract product. |
| attributes.name     | string | Abstract product name.        |
| attributes.description   | string | Abstract product description.  |
| attributes.attributes   | string | All the attributes for the product.     |
| attributes.superAttributesDefinition  | string | Super attributes used to distinguish product variants. |
| attributes.superAttributes    | string | Super attributes of the product variants. |
| attributes.attributeMap   | object | Super attributes the product has and the corresponding concrete product IDs. |
| attributes.attributeMap.attribute_variants   | object | List of super attributes.   |
| attributes.attributeMap.super_attributes   | object | Applicable super attribute of the product variant. |
| attributes.attributeMap.product_concrete_ids | string | IDs of the product variant.   |
| attributes.metaTitle    | string | Meta title of the abstract product.     |
| attributes.metaKeywords   | string | Meta keywords of the abstract product.    |
| metaDescription  | string | Meta description of the abstract product.    |
| attributes.attributeNames     | object | All attributes the abstract product, except the super attributes. |
| attributes.url | String | Unique web address of the abstract product without the domain.|
