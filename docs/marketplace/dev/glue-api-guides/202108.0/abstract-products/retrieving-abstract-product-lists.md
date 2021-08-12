---
title: Retrieving abstract product lists
description: This glue API document describes how to retrieve product abstract lists by the content abstract product list content item in Spryker.
template: glue-api-storefront-guide-template
---

This endpoint allows retrieving product abstract lists by the content abstract product list content item.

## Installation

For details on the modules that provide the API functionality and how to install them, see [Content Items API](https://documentation.spryker.com/docs/content-items-api-feature-integration).

## Retrieve abstract product list with its abstract products

To retrieve an abstract product list by the content abstract product list content item, you can retrieve abstract product list data and include *abstract-products* as the resource relation. Alternatively, you can run this request:

------

*`{GET}` **/content-product-abstract-lists/{content_item_key}/abstract-products***

------

| PATH PARAMETER | DESCRIPTION      |
| ----------------- | -------------------------- |
| content_item_key   | Key of the Abstract Product List content item. |

### Request

Request sample: `GET http://mysprykershop.com/content-product-abstract-lists/apl-1/abstract-products`

{% info_block warningBox "Note" %}

The locale must be specified in the **header** of the GET request. If no locale is specified, data from the **default** locale will be returned.

{% endinfo_block %}



### Response

<details>
<summary markdown='span'>Response sample</summary>

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
| attributes     | string | List of the abstract product's attributes and their values.  |
| sku      | string | SKU of the abstract product.    |
| merchantReference | string | Unique identifier of the merchant in the system.|
| averageRating | String | Average rating of the product based on customer rating. |
| reviewCount | String | Number of reviews left by customer for this abstract product. |
| name     | string | Name of the abstract product.        |
| description   | string | Description of the abstract product.  |
| attributes   | string | List of all available attributes for the product.     |
| superAttributesDefinition  | string | Attributes used to distinguish between different variants of the abstract product. |
| superAttributes    | string | List of super attributes and their values for the product variants. |
| attributeMap   | object | Combination of super attribute/value the product has and the corresponding concrete product IDs. |
| attributeMap.attribute_variants   | object | List of super attributes with the list of values.   |
| attributeMap.super_attributes   | object | Applicable super attribute and its values for the product variant. |
| attributeMap.product_concrete_ids | string | IDs of the product variant.   |
| metaTitle    | string | Meta title of the abstract product.     |
| metaKeywords   | string | Meta keywords of the abstract product.    |
| metaDescription  | string | Meta description of the abstract product.    |
| attributeNames     | object | All attributes (except for the super attributes) and value combinations for the abstract product. |
| url | String | Unique address using which the abstract product is found in the shop.

For the abstract product response attributes, see [Retrieving abstract products](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/abstract-products/retrieving-abstract-products.html).
