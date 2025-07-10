---
title: "Glue API: Retrieve abstract product list content items"
description: Abstract Product List API provides resources to retrieve data on abstract products included in the Abstract Product List content item for all or specific locale
last_updated: Jun 22, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retireving-abstract-product-list-content-items
originalArticleId: 2fcfc554-7617-455e-bb22-ead08bb774b9
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/retrieving-content-items/retrieving-abstract-product-list-content-items.html
  - /docs/scos/dev/glue-api-guides/202311.0/retrieving-content-items/retrieving-abstract-product-list-content-items.html
  - /docs/pbc/all/content-management-system/202311.0/manage-using-glue-api/retrieve-abstract-product-list-content-items.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/manage-using-glue-api/retrieve-abstract-product-list-content-items.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-list-content-items.html
related:
  - title: Content Items feature overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/content-items-feature-overview.html
---

This endpoint allows retrieving information about abstract product list content items.

## Installation

For details on the modules that provide the API functionality and how to install them, see [Content Items API](/docs/pbc/all/content-management-system/latest/base-shop/install-and-upgrade/install-glue-api/install-the-content-items-glue-api.html).

<a name="product-list"></a>

## Retrieve Abstract Product List content item

To retrieve information about an abstract product list content item, send the request:

***
`GET` **/content-product-abstract-lists/*{% raw %}{{{% endraw %}content_item_key{% raw %}}}{% endraw %}***

***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}content_item_key{% raw %}}}{% endraw %}*** | Unique identifier of the content item to retrieve. |

### Request

| HEADER KEY | REQUIRED | DESCRIPTION |
| --- | --- | --- |
| locale |  | Defines the locale to retrieve the content item information for. If not specified, the endpoint returns the information for the *default* locale.  |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | abstract-products |

| SAMPLE REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/content-product-abstract-lists/apl-1` | Retrieve information about the abstract product list with ID `apl-1`. |
| `GET https://glue.mysprykershop.com/content-product-abstract-lists/apl-1?include=abstract-products` | Retrieve information about the abstract product list with id `apl-1`. Include information about its abstract products. |


<details>
<summary>Response sample: retrieve Abstract Product List content item</summary>

```json
{
    "data": {
        "type": "content-product-abstract-lists",
        "id": "apl-1",
        "links": {
            "self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1"
        }
    }
}
```

</details>

<details>
<summary>Response sample: retrieve Abstract Product List content item with the details on its abstract products</summary>

```json
{
    "data": {
        "type": "content-product-abstract-lists",
        "id": "apl-1",
        "links": {
            "self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1?include=abstract-products"
        },
        "relationships": {
            "abstract-products": {
                "data": [
                    {
                        "type": "abstract-products",
                        "id": "204"
                    },
                    {
                        "type": "abstract-products",
                        "id": "205"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "abstract-products",
            "id": "204",
            "attributes": {
                "sku": "204",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Sony PXW-FS5K",
                "description": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second. Add some power to your shots: Add an E-mount lens with a power zoom and smoothly focus in on your subject with up to 11x magnification. Capture it all in HD: Capture all the detail with Full HD 1920 x 1080 video shooting (AVCHD format) at 24mbs for increased detail and clarity. DSLR quality photos: Shoot stills with DSLR-like picture quality and shallow depth of field for professional looking shots.",
                "attributes": {
                    "iso_sensitivity": "3200",
                    "sensor_type": "CMOS",
                    "white_balance": "Auto",
                    "wi_fi": "yes",
                    "brand": "Sony",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Black"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "204_29851280"
                    ],
                    "super_attributes": {
                        "color": [
                            "Black"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Sony PXW-FS5K",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDescription": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic vide",
                "attributeNames": {
                    "iso_sensitivity": "ISO sensitivity",
                    "sensor_type": "Sensor type",
                    "white_balance": "White balance",
                    "wi_fi": "Wi-Fi",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/sony-pxw-fs5k-204"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/204"
            }
        },
        {
            "type": "abstract-products",
            "id": "205",
            "attributes": {
                "sku": "205",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Toshiba CAMILEO S30",
                "description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
                "attributes": {
                    "total_megapixels": "8 MP",
                    "display": "LCD",
                    "self_timer": "10 s",
                    "weight": "118 g",
                    "brand": "Toshiba",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "total_megapixels",
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Grey"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "205_6350138"
                    ],
                    "super_attributes": {
                        "color": [
                            "Grey"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Toshiba CAMILEO S30",
                "metaKeywords": "Toshiba,Smart Electronics",
                "metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
                "attributeNames": {
                    "total_megapixels": "Total Megapixels",
                    "display": "Display",
                    "self_timer": "Self-timer",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/toshiba-camileo-s30-205"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/205"
            }
        }
    ]
}
```

</details>

{% include pbc/all/glue-api-guides/latest/abstract-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-products-response-attributes.md -->


## Retrieve Abstract Product List with its abstract products

To retrieve an Abstract Product List content item with its abstract products, you can retrieve [Abstract Product List data](#product-list) and include `abstract-products` as the resource relation. Alternatively, you can run this request:

***
`GET` **/content-product-abstract-lists/*{% raw %}{{{% endraw %}content_item_key{% raw %}}}{% endraw %}*/abstract-products**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}content_item_key{% raw %}}}{% endraw %}*** | Unique identifier of the content item to retrieve. |

### Request

| HEADER KEY | REQUIRED | DESCRIPTION |
| --- | --- | --- |
| locale |  | Defines the locale to retrieve the content item information for. If not specified, the endpoint returns the information for the *default* locale.  |

Request sample: retrieve Abstract Product List with its abstract products

`GET https://mysprykershop.com/content-product-abstract-lists/apl-1/abstract-products`

### Response

<details>
<summary>Response sample: retrieve Abstract Product List content item with the details on its abstract products</summary>

```json
{
    "data": [
        {
            "type": "abstract-products",
            "id": "204",
            "attributes": {
                "sku": "204",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Sony PXW-FS5K",
                "description": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second. Add some power to your shots: Add an E-mount lens with a power zoom and smoothly focus in on your subject with up to 11x magnification. Capture it all in HD: Capture all the detail with Full HD 1920 x 1080 video shooting (AVCHD format) at 24mbs for increased detail and clarity. DSLR quality photos: Shoot stills with DSLR-like picture quality and shallow depth of field for professional looking shots.",
                "attributes": {
                    "iso_sensitivity": "3200",
                    "sensor_type": "CMOS",
                    "white_balance": "Auto",
                    "wi_fi": "yes",
                    "brand": "Sony",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Black"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "204_29851280"
                    ],
                    "super_attributes": {
                        "color": [
                            "Black"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Sony PXW-FS5K",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDescription": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic vide",
                "attributeNames": {
                    "iso_sensitivity": "ISO sensitivity",
                    "sensor_type": "Sensor type",
                    "white_balance": "White balance",
                    "wi_fi": "Wi-Fi",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/sony-pxw-fs5k-204"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/204"
            }
        },
        {
            "type": "abstract-products",
            "id": "205",
            "attributes": {
                "sku": "205",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Toshiba CAMILEO S30",
                "description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
                "attributes": {
                    "total_megapixels": "8 MP",
                    "display": "LCD",
                    "self_timer": "10 s",
                    "weight": "118 g",
                    "brand": "Toshiba",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "total_megapixels",
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Grey"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "205_6350138"
                    ],
                    "super_attributes": {
                        "color": [
                            "Grey"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Toshiba CAMILEO S30",
                "metaKeywords": "Toshiba,Smart Electronics",
                "metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
                "attributeNames": {
                    "total_megapixels": "Total Megapixels",
                    "display": "Display",
                    "self_timer": "Self-timer",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/toshiba-camileo-s30-205"
            },
            "links": {
                "self": "glue.mysprykershop.com/abstract-products/205"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/abstract-products"
    }
}
```

</details>

{% include pbc/all/glue-api-guides/latest/abstract-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-products-response-attributes.md -->

## Possible errors

| CODE | REASON |
| --- | --- |
| 2201 | Content item is not found. |
| 2202 | Content key is missing. |
| 2203 | Content type is invalid. |

For generic Glue Application errors that can also occur, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html).
