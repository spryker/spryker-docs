---
title: "Glue API: Retrieving bundled products"
description: Learn how to retrieve bundled products that are configured with your Spryker Cloud Commerce OS project by using Glue API.
last_updated: Jun 21, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-bundled-products
originalArticleId: f77455d1-e0ca-470c-a6f6-15a060ea2647
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-products/retrieving-bundled-products.html
  - /docs/pbc/all/product-information-management/202311.0/manage-using-glue-api/glue-api-retrieve-bundled-products.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-bundled-products.html
related:
  - title: Product Bundles feature overview
    link: docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-bundles-feature-overview.html
---

This endpoint allows retrieving the products that belong to a bundle.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

- [Install the Product Bundles Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-bundles-glue-api.html)
- [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)
- [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)
- [Install the Product Bundle + Cart Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-bundle-cart-glue-api.html)

## Retrieve bundled products

To retrieve bundled products, send the request:

***
`GET` **/concrete-products/*{% raw %}{{{% endraw %}product_bundle_sku{% raw %}}}{% endraw %}*/bundled-products**
***


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}product_bundle_sku{% raw %}}}{% endraw %}*** | Unique identifier of the product bundle to retrieve bundled products of. |

### Request

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | concrete-products, abstract-products |

{% info_block infoBox "Included resources" %}

To retrieve related abstract products, include both `concrete-products` and `abstract-products`.

{% endinfo_block %}

| REQUEST SAMPLE | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/concrete-products/214_123/bundled-products` | Retrieve bundled products of the product bundle with SKU `214_123`. |
| `GET https://glue.mysprykershop.com/concrete-products/214_123/bundled-products?include=concrete-products` |Retrieve bundled products of the product bundle with SKU `214_123` and detailed information about corresponding concrete products.|
| `GET https://glue.mysprykershop.com/concrete-products/214_123/bundled-products?include=concrete-products,abstract-products` |Retrieve bundled products of the product bundle with SKU `214_123` and detailed information about corresponding concrete and abstract products.|

### Response

<details>
<summary>Response sample: retrieve bundled products of the product bundle</summary>

```json
{
    "data": [
        {
            "type": "bundled-products",
            "id": "067_24241408",
            "attributes": {
                "sku": "067_24241408",
                "quantity": 1
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/214_123/bundled-products"
            }
        },
        {
            "type": "bundled-products",
            "id": "110_19682159",
            "attributes": {
                "sku": "110_19682159",
                "quantity": 3
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/214_123/bundled-products"
            }
        },
        {
            "type": "bundled-products",
            "id": "175_26935356",
            "attributes": {
                "sku": "175_26935356",
                "quantity": 2
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/214_123/bundled-products"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/concrete-products/214_123/bundled-products"
    }
}
```

</details>

<details>
<summary>Response sample: retrieve bundled products of the product bundle with the details on the concrete products</summary>

```json
{
    "data": [
        {
            "type": "bundled-products",
            "id": "067_24241408",
            "attributes": {
                "sku": "067_24241408",
                "quantity": 1
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/214_123/bundled-products"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "067_24241408"
                        }
                    ]
                }
            }
        },
        {
            "type": "bundled-products",
            "id": "110_19682159",
            "attributes": {
                "sku": "110_19682159",
                "quantity": 3
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/214_123/bundled-products"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "110_19682159"
                        }
                    ]
                }
            }
        },
        {
            "type": "bundled-products",
            "id": "175_26935356",
            "attributes": {
                "sku": "175_26935356",
                "quantity": 2
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/214_123/bundled-products"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "175_26935356"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/concrete-products/214_123/bundled-products?include=concrete-products"
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "067_24241408",
            "attributes": {
                "sku": "067_24241408",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "067",
                "name": "Samsung Galaxy S5 mini",
                "description": "Galaxy S5 mini continues Samsung design legacy and flagship experience Outfitted with a 4.5-inch HD Super AMOLED display, the Galaxy S5 mini delivers a wide and vivid viewing experience, and its compact size provides users with additional comfort, allowing for easy operation with only one hand. Like the Galaxy S5, the Galaxy S5 mini features a unique perforated pattern on the back cover creating a modern and sleek look, along with a premium, soft touch grip. The Galaxy S5 mini enables users to enjoy the same flagship experience as the Galaxy S5 with innovative features including IP67 certification, Ultra Power Saving Mode, a heart rate monitor, fingerprint scanner, and connectivity with the latest Samsung wearable devices.The Galaxy S5 mini comes equipped with a powerful Quad Core 1.4 GHz processor and 1.5GM RAM for seamless multi-tasking, faster webpage loading, softer UI transition, and quick power up. The high-resolution 8MP camera delivers crisp and clear photos and videos, while the Galaxy S5 mini's support of LTE Category 4 provides users with ultra-fast downloads of movies and games on-the-go.",
                "attributes": {
                    "display_diagonal": "44.8 in",
                    "themes": "Wallpapers",
                    "os_version": "4.4",
                    "internal_storage_capacity": "32 GB",
                    "brand": "Samsung",
                    "color": "Gold"
                },
                "superAttributesDefinition": [
                    "internal_storage_capacity",
                    "color"
                ],
                "metaTitle": "Samsung Galaxy S5 mini",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Galaxy S5 mini continues Samsung design legacy and flagship experience Outfitted with a 4.5-inch HD Super AMOLED display, the Galaxy S5 mini delivers a wid",
                "attributeNames": {
                    "display_diagonal": "Display diagonal",
                    "themes": "Themes",
                    "os_version": "OS version",
                    "internal_storage_capacity": "Internal storage capacity",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/067_24241408"
            }
        },
        {
            "type": "concrete-products",
            "id": "110_19682159",
            "attributes": {
                "sku": "110_19682159",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "110",
                "name": "Samsung Galaxy Gear",
                "description": "Voice Operation With Samsung's latest groundbreaking innovation, the Galaxy Gear, it's clear that time's up on the traditional watch. It features the smart technology you love and the functionality that you still need, and is the perfect companion to the new Galaxy Note 3.",
                "attributes": {
                    "processor_frequency": "800 MHz",
                    "bluetooth_version": "4",
                    "weight": "25.9 oz",
                    "battery_life": "120 h",
                    "brand": "Samsung",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "color"
                ],
                "metaTitle": "Samsung Galaxy Gear",
                "metaKeywords": "Samsung,Smart Electronics",
                "metaDescription": "Voice Operation With Samsung's latest groundbreaking innovation, the Galaxy Gear, it's clear that time's up on the traditional watch. It features the smart",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "bluetooth_version": "Blootooth version",
                    "weight": "Weight",
                    "battery_life": "Battery life",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/110_19682159"
            }
        },
        {
            "type": "concrete-products",
            "id": "175_26935356",
            "attributes": {
                "sku": "175_26935356",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "175",
                "name": "Samsung Galaxy Tab A SM-T550N 32 GB",
                "description": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through your photos while browsing online. Check social media and your social calendar at the same time. With Multi Window™ on the Galaxy Tab A, you can do more, faster. Kids Mode gives parents peace of mind while providing a colorful, engaging place for kids to play. Easily manage what your kids access and how long they spend using it, all while keeping your own documents private. Available for free from Samsung Galaxy Essentials™, Kids Mode keeps your content—and more importantly, your kids— safe and secure. Connecting your Samsung devices is easier than ever. With Samsung SideSync 3.0 and Quick Connect™, you can share content and work effortlessly between your Samsung tablet, smartphone and personal computer.",
                "attributes": {
                    "digital_zoom": "4 x",
                    "video_recording_modes": "720p",
                    "display_technology": "PLS",
                    "brand": "Samsung",
                    "color": "Black",
                    "internal_storage_capacity": "32 GB"
                },
                "superAttributesDefinition": [
                    "color",
                    "internal_storage_capacity"
                ],
                "metaTitle": "Samsung Galaxy Tab A SM-T550N 16 GB",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through you",
                "attributeNames": {
                    "digital_zoom": "Digital zoom",
                    "video_recording_modes": "Video recording modes",
                    "display_technology": "Display technology",
                    "brand": "Brand",
                    "color": "Color",
                    "internal_storage_capacity": "Internal storage capacity"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/175_26935356"
            }
        }
    ]
}
```

</details>

<details>
<summary>Response sample: retrieve bundled products of the product bundle with the details on the concrete and abstract products</summary>

```json
{
    "data": [
        {
            "type": "bundled-products",
            "id": "067_24241408",
            "attributes": {
                "sku": "067_24241408",
                "quantity": 1
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/214_123/bundled-products"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "067_24241408"
                        }
                    ]
                }
            }
        },
        {
            "type": "bundled-products",
            "id": "110_19682159",
            "attributes": {
                "sku": "110_19682159",
                "quantity": 3
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/214_123/bundled-products"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "110_19682159"
                        }
                    ]
                }
            }
        },
        {
            "type": "bundled-products",
            "id": "175_26935356",
            "attributes": {
                "sku": "175_26935356",
                "quantity": 2
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/214_123/bundled-products"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "175_26935356"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/concrete-products/214_123/bundled-products?include=concrete-products,abstract-products"
    },
    "included": [
        {
            "type": "abstract-products",
            "id": "067",
            "attributes": {
                "sku": "067",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Samsung Galaxy S5 mini",
                "description": "Galaxy S5 mini continues Samsung design legacy and flagship experience Outfitted with a 4.5-inch HD Super AMOLED display, the Galaxy S5 mini delivers a wide and vivid viewing experience, and its compact size provides users with additional comfort, allowing for easy operation with only one hand. Like the Galaxy S5, the Galaxy S5 mini features a unique perforated pattern on the back cover creating a modern and sleek look, along with a premium, soft touch grip. The Galaxy S5 mini enables users to enjoy the same flagship experience as the Galaxy S5 with innovative features including IP67 certification, Ultra Power Saving Mode, a heart rate monitor, fingerprint scanner, and connectivity with the latest Samsung wearable devices.The Galaxy S5 mini comes equipped with a powerful Quad Core 1.4 GHz processor and 1.5GM RAM for seamless multi-tasking, faster webpage loading, softer UI transition, and quick power up. The high-resolution 8MP camera delivers crisp and clear photos and videos, while the Galaxy S5 mini's support of LTE Category 4 provides users with ultra-fast downloads of movies and games on-the-go.    ",
                "attributes": {
                    "display_diagonal": "44.8 in",
                    "themes": "Wallpapers",
                    "os_version": "4.4",
                    "internal_storage_capacity": "32 GB",
                    "brand": "Samsung",
                    "color": "Gold"
                },
                "superAttributesDefinition": [
                    "internal_storage_capacity",
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Gold"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "067_24241408"
                    ],
                    "super_attributes": {
                        "color": [
                            "Gold"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Samsung Galaxy S5 mini",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Galaxy S5 mini continues Samsung design legacy and flagship experience Outfitted with a 4.5-inch HD Super AMOLED display, the Galaxy S5 mini delivers a wid",
                "attributeNames": {
                    "display_diagonal": "Display diagonal",
                    "themes": "Themes",
                    "os_version": "OS version",
                    "internal_storage_capacity": "Internal storage capacity",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/samsung-galaxy-s5-mini-67"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/067"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "067_24241408"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "067_24241408",
            "attributes": {
                "sku": "067_24241408",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "067",
                "name": "Samsung Galaxy S5 mini",
                "description": "Galaxy S5 mini continues Samsung design legacy and flagship experience Outfitted with a 4.5-inch HD Super AMOLED display, the Galaxy S5 mini delivers a wide and vivid viewing experience, and its compact size provides users with additional comfort, allowing for easy operation with only one hand. Like the Galaxy S5, the Galaxy S5 mini features a unique perforated pattern on the back cover creating a modern and sleek look, along with a premium, soft touch grip. The Galaxy S5 mini enables users to enjoy the same flagship experience as the Galaxy S5 with innovative features including IP67 certification, Ultra Power Saving Mode, a heart rate monitor, fingerprint scanner, and connectivity with the latest Samsung wearable devices.The Galaxy S5 mini comes equipped with a powerful Quad Core 1.4 GHz processor and 1.5GM RAM for seamless multi-tasking, faster webpage loading, softer UI transition, and quick power up. The high-resolution 8MP camera delivers crisp and clear photos and videos, while the Galaxy S5 mini's support of LTE Category 4 provides users with ultra-fast downloads of movies and games on-the-go.",
                "attributes": {
                    "display_diagonal": "44.8 in",
                    "themes": "Wallpapers",
                    "os_version": "4.4",
                    "internal_storage_capacity": "32 GB",
                    "brand": "Samsung",
                    "color": "Gold"
                },
                "superAttributesDefinition": [
                    "internal_storage_capacity",
                    "color"
                ],
                "metaTitle": "Samsung Galaxy S5 mini",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Galaxy S5 mini continues Samsung design legacy and flagship experience Outfitted with a 4.5-inch HD Super AMOLED display, the Galaxy S5 mini delivers a wid",
                "attributeNames": {
                    "display_diagonal": "Display diagonal",
                    "themes": "Themes",
                    "os_version": "OS version",
                    "internal_storage_capacity": "Internal storage capacity",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/067_24241408"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "067"
                        }
                    ]
                }
            }
        },
        {
            "type": "abstract-products",
            "id": "110",
            "attributes": {
                "sku": "110",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Samsung Galaxy Gear",
                "description": "Voice Operation With Samsung's latest groundbreaking innovation, the Galaxy Gear, it's clear that time's up on the traditional watch. It features the smart technology you love and the functionality that you still need, and is the perfect companion to the new Galaxy Note 3.",
                "attributes": {
                    "processor_frequency": "800 MHz",
                    "bluetooth_version": "4",
                    "weight": "25.9 oz",
                    "battery_life": "120 h",
                    "brand": "Samsung",
                    "color": "Yellow"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Black"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "110_19682159"
                    ],
                    "super_attributes": {
                        "color": [
                            "Black"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Samsung Galaxy Gear",
                "metaKeywords": "Samsung,Smart Electronics",
                "metaDescription": "Voice Operation With Samsung's latest groundbreaking innovation, the Galaxy Gear, it's clear that time's up on the traditional watch. It features the smart",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "bluetooth_version": "Blootooth version",
                    "weight": "Weight",
                    "battery_life": "Battery life",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/samsung-galaxy-gear-110"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/110"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "110_19682159"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "110_19682159",
            "attributes": {
                "sku": "110_19682159",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "110",
                "name": "Samsung Galaxy Gear",
                "description": "Voice Operation With Samsung's latest groundbreaking innovation, the Galaxy Gear, it's clear that time's up on the traditional watch. It features the smart technology you love and the functionality that you still need, and is the perfect companion to the new Galaxy Note 3.",
                "attributes": {
                    "processor_frequency": "800 MHz",
                    "bluetooth_version": "4",
                    "weight": "25.9 oz",
                    "battery_life": "120 h",
                    "brand": "Samsung",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "color"
                ],
                "metaTitle": "Samsung Galaxy Gear",
                "metaKeywords": "Samsung,Smart Electronics",
                "metaDescription": "Voice Operation With Samsung's latest groundbreaking innovation, the Galaxy Gear, it's clear that time's up on the traditional watch. It features the smart",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "bluetooth_version": "Blootooth version",
                    "weight": "Weight",
                    "battery_life": "Battery life",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/110_19682159"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "110"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "175_26564922",
            "attributes": {
                "sku": "175_26564922",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "175",
                "name": "Samsung Galaxy Tab A SM-T550N 16 GB",
                "description": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through your photos while browsing online. Check social media and your social calendar at the same time. With Multi Window™ on the Galaxy Tab A, you can do more, faster. Kids Mode gives parents peace of mind while providing a colorful, engaging place for kids to play. Easily manage what your kids access and how long they spend using it, all while keeping your own documents private. Available for free from Samsung Galaxy Essentials™, Kids Mode keeps your content—and more importantly, your kids— safe and secure. Connecting your Samsung devices is easier than ever. With Samsung SideSync 3.0 and Quick Connect™, you can share content and work effortlessly between your Samsung tablet, smartphone and personal computer.",
                "attributes": {
                    "digital_zoom": "4 x",
                    "video_recording_modes": "720p",
                    "display_technology": "PLS",
                    "brand": "Samsung",
                    "color": "Black",
                    "internal_storage_capacity": "16 GB"
                },
                "superAttributesDefinition": [
                    "color",
                    "internal_storage_capacity"
                ],
                "metaTitle": "Samsung Galaxy Tab A SM-T550N 16 GB",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through you",
                "attributeNames": {
                    "digital_zoom": "Digital zoom",
                    "video_recording_modes": "Video recording modes",
                    "display_technology": "Display technology",
                    "brand": "Brand",
                    "color": "Color",
                    "internal_storage_capacity": "Internal storage capacity"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/175_26564922"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "175"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "175_26935356",
            "attributes": {
                "sku": "175_26935356",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "175",
                "name": "Samsung Galaxy Tab A SM-T550N 32 GB",
                "description": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through your photos while browsing online. Check social media and your social calendar at the same time. With Multi Window™ on the Galaxy Tab A, you can do more, faster. Kids Mode gives parents peace of mind while providing a colorful, engaging place for kids to play. Easily manage what your kids access and how long they spend using it, all while keeping your own documents private. Available for free from Samsung Galaxy Essentials™, Kids Mode keeps your content—and more importantly, your kids— safe and secure. Connecting your Samsung devices is easier than ever. With Samsung SideSync 3.0 and Quick Connect™, you can share content and work effortlessly between your Samsung tablet, smartphone and personal computer.",
                "attributes": {
                    "digital_zoom": "4 x",
                    "video_recording_modes": "720p",
                    "display_technology": "PLS",
                    "brand": "Samsung",
                    "color": "Black",
                    "internal_storage_capacity": "32 GB"
                },
                "superAttributesDefinition": [
                    "color",
                    "internal_storage_capacity"
                ],
                "metaTitle": "Samsung Galaxy Tab A SM-T550N 16 GB",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through you",
                "attributeNames": {
                    "digital_zoom": "Digital zoom",
                    "video_recording_modes": "Video recording modes",
                    "display_technology": "Display technology",
                    "brand": "Brand",
                    "color": "Color",
                    "internal_storage_capacity": "Internal storage capacity"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/175_26935356"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "175"
                        }
                    ]
                }
            }
        },
        {
            "type": "abstract-products",
            "id": "175",
            "attributes": {
                "sku": "175",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Samsung Galaxy Tab A SM-T550N 16 GB",
                "description": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through your photos while browsing online. Check social media and your social calendar at the same time. With Multi Window™ on the Galaxy Tab A, you can do more, faster. Kids Mode gives parents peace of mind while providing a colorful, engaging place for kids to play. Easily manage what your kids access and how long they spend using it, all while keeping your own documents private. Available for free from Samsung Galaxy Essentials™, Kids Mode keeps your content—and more importantly, your kids— safe and secure. Connecting your Samsung devices is easier than ever. With Samsung SideSync 3.0 and Quick Connect™, you can share content and work effortlessly between your Samsung tablet, smartphone and personal computer.",
                "attributes": {
                    "digital_zoom": "4 x",
                    "video_recording_modes": "720p",
                    "display_technology": "PLS",
                    "brand": "Samsung",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": {
                    "internal_storage_capacity": [
                        "32 GB",
                        "16 GB"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "175_26564922",
                        "175_26935356"
                    ],
                    "super_attributes": {
                        "internal_storage_capacity": [
                            "32 GB",
                            "16 GB"
                        ]
                    },
                    "attribute_variants": {
                        "internal_storage_capacity:32 GB": {
                            "id_product_concrete": "175_26935356"
                        },
                        "internal_storage_capacity:16 GB": {
                            "id_product_concrete": "175_26564922"
                        }
                    }
                },
                "metaTitle": "Samsung Galaxy Tab A SM-T550N 16 GB",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through you",
                "attributeNames": {
                    "digital_zoom": "Digital zoom",
                    "video_recording_modes": "Video recording modes",
                    "display_technology": "Display technology",
                    "brand": "Brand",
                    "color": "Color",
                    "internal_storage_capacity": "Internal storage capacity"
                },
                "url": "/en/samsung-galaxy-tab-a-sm-t550n-16-gb-175"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/175"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "175_26935356"
                        },
                        {
                            "type": "concrete-products",
                            "id": "175_26564922"
                        }
                    ]
                }
            }
        }
    ]
}
```

</details>

{% include pbc/all/glue-api-guides/{{page.version}}/bundled-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/bundled-products-response-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-products-response-attributes.md -->


## Possible errors

| CODE | REASON |
| --- | --- |
| 302 | Concrete product is not found. |
| 312 | Concrete product is ID not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).

## Other management options

You can also manage the `bundled-products` resource as follows:
- [Retrieve bundled products of a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html#retrieve-a-concrete-product)
- [Retrieve bundled products of an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html)
- [Manage bundled products in carts of registered users](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html#add-an-item-to-a-registered-users-cart)
- [Manage bundled products in guest carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-cart-items.html#add-items-to-a-guest-cart)
