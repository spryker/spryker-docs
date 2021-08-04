---
title: Retrieving Alternative Products
originalLink: https://documentation.spryker.com/v5/docs/retrieving-alternative-products-201903
redirect_from:
  - /v5/docs/retrieving-alternative-products-201903
  - /v5/docs/en/retrieving-alternative-products-201903
---

The _Alternative Products_ feature allows customers to quickly find a substitute product in case if their preferred item runs out of stock or is no longer available for other reasons. The feature is particularly useful when a certain product becomes discontinued. In this case, customers usually look for a more up-to-date generation of the same product, and suggesting possible alternatives is especially crucial.

For more details, see [Alternative Products](https://documentation.spryker.com/docs/en/alternative-products) and [Discontinued Products](https://documentation.spryker.com/docs/en/discontinued-products).

The Product Alternatives API provides access to alternative products via REST API requests. In particular, you can:

* Find out whether a concrete product is discontinued.
* Retrieve a list of alternative products of a product.

Only concrete products can be marked as discontinued and, therefore, alternatives can be specified for concrete products only.

In your development, the endpoints can help you to:

* Provide alternatives to a customer if a desired product runs out or unavailable, for example, due to local restrictions.
* Provide alternatives in case a certain product is discontinued.
* Make alternative products available to customers in their shopping list or suggestions area in order to make searching for and comparing similar products easier. This can significantly enhance the shopping experience in your shop.

{% info_block errorBox %}
It is the responsibility of the client to identify whether a product is unavailable and when to provide alternatives. The API only provides information on availability, discontinued status and possible alternatives.
{% endinfo_block %}

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Alternative Products Feature Integration](https://documentation.spryker.com/docs/en/glue-api-alternative-products-feature-integration).

{% info_block infoBox %}
To be able to use **Product Alternatives API**, first, you need to have the _Alternative Products_ feature integrated with your project.<br>To be able to handle discontinued products, first, integrate the _Discontinued Products_ feature.
{% endinfo_block %}

## Managing Products
Retrieving Alternative Products
The Alternative Products feature allows customers to quickly find a substitute product in case if their preferred item runs out of stock or is no longer available for other reasons. The feature is particularly useful when a certain product becomes discontinued. In this case, customers usually seek for a more up-to-date generation of the same product, and suggesting possible alternatives is especially crucial.

For more details, see Alternative Products and Discontinued Products.

The Product Alternatives API provides access to alternative products via REST API requests. In particular, you can:

Find out whether a specific concrete product is discontinued;
Retrieve a list of alternative products for a specific product.
Only concrete products can be marked as discontinued and, therefore, alternatives can be specified for concrete products only.

In your development, the endpoints can help you to:

Provide alternatives to a customer in the case when a desired product runs out of stock or is otherwise unavailable, for example, due to local restrictions;
Provide replacements in case a certain product is discontinued;
Make alternative products available to customers in their shopping list or suggestions area in order to make searching for and comparing similar products easier. This can significantly enhance the shopping experience in your shop.
It is the responsibility of the client to identify whether a product is unavailable and when to provide alternatives. The API only provides information on availability, discontinued status and possible alternatives.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see Alternative Products.

{% info_block infoBox %}
To be able to use Product Alternatives API, first, you need to have the Alternative Products feature integrated with your project.<br>To be able to handle discontinued products, first, integrate the Discontinued Products feature.
{% endinfo_block %}

## Checking Whether Product is Discontinued
Before suggesting an alternative product, first, check if a product is still available, i.e. not discontinued. To check if a product is discountinued, see [Retrieve Concrete Products](https://documentation.spryker.com/docs/en/retrieving-product-information#retrieve-concrete-products).



## Retrieving Abstract Alternative Products
To retrieve abstract alternative products, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/abstract-alternative-products**

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get abstract alternative products of. |


### Request

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | product-labels |


| Request | Usage |
| --- | --- |
| `GET http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/abstract-alternative-products` | Retrieve abstract product alternatives of the product with SKU `145_29885470`. |
| `GET http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/abstract-alternative-products?include=product-labels` | Retrieve general information about the abstract product with its assigned product lables included. |

### Response 

<details>
    <summary>Response sample</summary>

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
    <summary>Response sample with product labels</summary>

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


## Retrieving Concrete Alternative Products
To retrieve concrete alternative products, send the request:

---
`GET`**/concrete-products/{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}/concrete-alternative-products**

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get concrete alternative products of. |

### Request

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | product-labels |


| Request | Usage |
| --- | --- |
| `GET http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/concrete-alternative-products` | Retrieve abstract product alternatives of the product with SKU `145_29885470`. |
| `GET http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/concrete-alternative-products?include=product-labels` | Retrieve general information about the abstract product with its assigned product lables included. |

### Response 

<details>
    <summary>Response sample</summary>

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
    <summary>Response sample with product labels</summary>

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




### Possible Errors
| Code | Reason |
| --- | --- |
| 400 | Concrete product ID not specified |
| 404 | Concrete product not found |
