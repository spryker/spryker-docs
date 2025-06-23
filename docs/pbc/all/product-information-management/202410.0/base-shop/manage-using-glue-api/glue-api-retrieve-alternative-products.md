---
title: "Glue API: Retrieve alternative products"
description: Learn how to find alternatives for discontinued products with Spryker Cloud Commerce OS Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-alternative-products
originalArticleId: b910a3a3-e499-4047-bb32-b96e00b94bcb
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/retrieving-alternative-products.html
  - /docs/pbc/all/product-information-management/202311.0/manage-using-glue-api/glue-api-retrieve-alternative-products.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-alternative-products.html
related:
  - title: Retrieving related products
    link: docs/pbc/all/product-relationship-management/page.version/glue-api-retrieve-related-products.html
  - title: Alternative Products feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/alternative-products-feature-overview.html
---

The *Alternative Products* feature allows customers to find a substitute for a product that runs out of stock or is no longer available for other reasons. The feature is particularly useful when a certain product becomes discontinued. In this case, customers usually look for an up-to-date generation of the same product, and suggesting possible alternatives is crucial. For more details, see [Alternative Products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/alternative-products-feature-overview.html) and [Discontinued Products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/discontinued-products-overview.html).

The Product Alternatives API provides access to alternative products via REST API requests. In particular, you can:

- Find out whether a concrete product is discontinued.
- Retrieve a list of alternative products of a product.

In your development, the endpoints help to:

- Provide alternatives for a product that runs out or unavailable, for example, because of local restrictions.
- Provide alternatives if a product is discontinued.
- Make alternative products available to customers in their shopping list or suggestions area to make searching and comparing similar products easier.


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Alternative Products Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-alternative-products-glue-api.html).


## Check if a product is discontinued

Before suggesting an alternative product, check if a product is discontinued by [retrieving a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html#retrieve-a-concrete-product).

{% info_block infoBox %}

It is the responsibility of the client to identify if a product is unavailable and when to provide alternatives. The API only provides information on availability, discontinued status and possible alternatives.

{% endinfo_block %}

## Retrieve abstract alternative products

To retrieve abstract alternative products, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/abstract-alternative-products**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get abstract alternative products of. |


### Request

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | product-labels |


| REQUEST | USAGE |
| --- | --- |
| `GET http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/abstract-alternative-products` | Retrieve abstract product alternatives of the product with SKU `145_29885470`. |
| `GET http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/abstract-alternative-products?include=product-labels` | Retrieve general information about the abstract product with its assigned product labels included. |

### Response

<details>
<summary>Response sample: retrieve abstract product alternatives of the product</summary>

```json
{
    "data": [
        {
            "type": "abstract-products",
            "id": "cable-hdmi-1",
            "attributes": {
                "sku": "cable-hdmi-1",
                "averageRating": null,
                "reviewCount": 0,
                "name": "HDMI cable",
                "description": "Enjoy clear, crisp, immediate connectivity with the High-Speed HDMI Cable. This quality High-Definition Multimedia Interface (HDMI) cable allows you to connect a wide variety of devices in the realms of home entertainment, computing, gaming, and more to your HDTV, projector, or monitor. Perfect for those that interact with multiple platforms and devices, you can rely on strong performance and playback delivery when it comes to your digital experience.",
                "attributes": [],
                "superAttributesDefinition": [],
                "superAttributes": {
                    "packaging_unit": [
                        "As long as you want",
                        "Ring"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "cable-hdmi-1-1",
                        "cable-hdmi-1-2"
                    ],
                    "super_attributes": {
                        "packaging_unit": [
                            "As long as you want",
                            "Ring"
                        ]
                    },
                    "attribute_variants": {
                        "packaging_unit:As long as you want": {
                            "id_product_concrete": "cable-hdmi-1-2"
                        },
                        "packaging_unit:Ring": {
                            "id_product_concrete": "cable-hdmi-1-1"
                        }
                    }
                },
                "metaTitle": "",
                "metaKeywords": "",
                "metaDescription": "",
                "attributeNames": {
                    "packaging_unit": "Packaging unit"
                },
                "url": "/en/hdmi-cable-1"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/abstract-products/cable-hdmi-1"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/abstract-alternative-products"
    }
}
```

</details>


<details>
<summary>Response sample: retrieve abstract product alternatives of the product with the details on the product labels</summary>

```json
{
    "data": [
        {
            "type": "abstract-products",
            "id": "cable-hdmi-1",
            "attributes": {
                "sku": "cable-hdmi-1",
                "averageRating": null,
                "reviewCount": 0,
                "name": "HDMI cable",
                "description": "Enjoy clear, crisp, immediate connectivity with the High-Speed HDMI Cable. This quality High-Definition Multimedia Interface (HDMI) cable allows you to connect a wide variety of devices in the realms of home entertainment, computing, gaming, and more to your HDTV, projector, or monitor. Perfect for those that interact with multiple platforms and devices, you can rely on strong performance and playback delivery when it comes to your digital experience.",
                "attributes": [],
                "superAttributesDefinition": [],
                "superAttributes": {
                    "packaging_unit": [
                        "As long as you want",
                        "Ring"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "cable-hdmi-1-1",
                        "cable-hdmi-1-2"
                    ],
                    "super_attributes": {
                        "packaging_unit": [
                            "As long as you want",
                            "Ring"
                        ]
                    },
                    "attribute_variants": {
                        "packaging_unit:As long as you want": {
                            "id_product_concrete": "cable-hdmi-1-2"
                        },
                        "packaging_unit:Ring": {
                            "id_product_concrete": "cable-hdmi-1-1"
                        }
                    }
                },
                "metaTitle": "",
                "metaKeywords": "",
                "metaDescription": "",
                "attributeNames": {
                    "packaging_unit": "Packaging unit"
                },
                "url": "/en/hdmi-cable-1"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/abstract-products/cable-hdmi-1"
            },
            "relationships": {
                "product-labels": {
                    "data": [
                        {
                            "type": "product-labels",
                            "id": "3"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/abstract-alternative-products?include=product-labels"
    },
    "included": [
        {
            "type": "product-labels",
            "id": "3",
            "attributes": {
                "name": "New product",
                "isExclusive": false,
                "position": 1,
                "frontEndReference": null
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-labels/3"
            }
        }
    ]
}
```

</details>


## Retrieve concrete alternative products

To retrieve concrete alternative products, send the request:

---
`GET`**/concrete-products/{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}/concrete-alternative-products**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get concrete alternative products of. |

### Request

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | product-labels |


| REQUEST | USAGE |
| --- | --- |
| `GET http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/concrete-alternative-products` | Retrieve concrete product alternatives of the product with SKU `145_29885470`. |
| `GET http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/concrete-alternative-products?include=product-labels` | Retrieve concrete product alternatives with the assigned product labels included. |

### Response

<details>
<summary>Response sample: retrieve concrete product alternatives of the product</summary>

```json
{
    "data": [
        {
            "type": "concrete-products",
            "id": "cable-hdmi-1-2",
            "attributes": {
                "sku": "cable-hdmi-1-2",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "HDMI cable as long as you want",
                "description": "Enjoy clear, crisp, immediate connectivity with the High-Speed HDMI Cable. This quality High-Definition Multimedia Interface (HDMI) cable allows you to connect a wide variety of devices in the realms of home entertainment, computing, gaming, and more to your HDTV, projector, or monitor. Perfect for those that interact with multiple platforms and devices, you can rely on strong performance and playback delivery when it comes to your digital experience.",
                "attributes": {
                    "packaging_unit": "As long as you want"
                },
                "superAttributesDefinition": [
                    "packaging_unit"
                ],
                "metaTitle": "",
                "metaKeywords": "",
                "metaDescription": "",
                "attributeNames": {
                    "packaging_unit": "Packaging unit"
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/cable-hdmi-1-2"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/concrete-alternative-products"
    }
}
```

</details>


<details>
<summary>Response sample: retrieve concrete product alternatives of the product with the details on the product labels</summary>

```json
{
    "data": [
        {
            "type": "concrete-products",
            "id": "cable-hdmi-1-2",
            "attributes": {
                "sku": "cable-hdmi-1-2",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "HDMI cable as long as you want",
                "description": "Enjoy clear, crisp, immediate connectivity with the High-Speed HDMI Cable. This quality High-Definition Multimedia Interface (HDMI) cable allows you to connect a wide variety of devices in the realms of home entertainment, computing, gaming, and more to your HDTV, projector, or monitor. Perfect for those that interact with multiple platforms and devices, you can rely on strong performance and playback delivery when it comes to your digital experience.",
                "attributes": {
                    "packaging_unit": "As long as you want"
                },
                "superAttributesDefinition": [
                    "packaging_unit"
                ],
                "metaTitle": "",
                "metaKeywords": "",
                "metaDescription": "",
                "attributeNames": {
                    "packaging_unit": "Packaging unit"
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/cable-hdmi-1-2"
            },
            "relationships": {
                "product-labels": {
                    "data": [
                        {
                            "type": "product-labels",
                            "id": "3"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/concrete-alternative-products?include=product-labels"
    },
    "included": [
        {
            "type": "product-labels",
            "id": "3",
            "attributes": {
                "name": "New product",
                "isExclusive": false,
                "position": 1,
                "frontEndReference": null
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-labels/3"
            }
        }
    ]
}
```

</details>

{% include pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-products-response-attributes.md -->

{% include /pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->


## Possible errors

| CODE | REASON |
| --- | --- |
| 302 | Concrete product is not found. |
| 312 | Concrete product is ID not specified. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
