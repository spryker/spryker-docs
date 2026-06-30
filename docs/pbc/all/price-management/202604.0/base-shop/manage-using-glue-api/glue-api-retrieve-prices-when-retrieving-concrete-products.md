---
title: "Glue API: Retrieve prices when retrieving concrete products"
description: Learn how to retrieve prices when retrieving concrete products using Spryker GLUE API within your Spryker based project.
last_updated: Aug 22, 2022
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/pbc/all/price-management/202311.0/base-shop/manage-using-glue-api/retrieve-prices-when-retrieving-concrete-products.html
  - /docs/pbc/all/price-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-prices-when-retrieving-concrete-products.html
---

This document describes how to retrieve prices when retrieving concrete products. To retrieve full information about concrete products, see [Retrieve concrete products](/docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html).

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see the docs:
- [Install the Product Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)
- [Install the Prices Glue API](/docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/install-the-product-price-glue-api.html)


## Retrieve a concrete product

To retrieve general information about a concrete product, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get information for. |

### Request

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | concrete-product-prices |


| REQUEST  | USAGE |
| --- | --- |
|`GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-prices` | Get information about the `001_25904006` product with its prices. |
| `GET https://glue.mysprykershop.com/abstract-products/093_24495843?include=abstract-product-prices` | Retrieve information about the abstract product with SKU `093_24495843` with its prices. |

### Response


<details><summary>Response sample: retrieve information about a concrete product with the details on the concrete product prices</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "001_25904006",
        "attributes": {
            "sku": "001_25904006",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": null,
            "reviewCount": 0,
            "name": "Canon IXUS 160",
            "description": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results while framing using Live View Control and enjoy sharing them with friends using the 6.8 cm (2.7") LCD screen. Combine with a Canon Connect Station and you can easily share your photos and movies with the world on social media sites and online albums like irista, plus enjoy watching them with family and friends on an HD TV. Effortlessly enjoy great shots of friends thanks to Face Detection technology. It detects multiple faces in a single frame making sure they remain in focus and with optimum brightness. Face Detection also ensures natural skin tones even in unusual lighting conditions.",
            "attributes": {
                "megapixel": "20 MP",
                "flash_range_tele": "4.2-4.9 ft",
                "memory_slots": "1",
                "usb_version": "2",
                "brand": "Canon",
                "color": "Red"
            },
            "superAttributesDefinition": [
                "color"
            ],
            "metaTitle": "Canon IXUS 160",
            "metaKeywords": "Canon,Entertainment Electronics",
            "metaDescription": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results whi",
            "attributeNames": {
                "megapixel": "Megapixel",
                "flash_range_tele": "Flash range (tele)",
                "memory_slots": "Memory slots",
                "usb_version": "USB version",
                "brand": "Brand",
                "color": "Color"
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-prices"
        },
        "relationships": {
            "concrete-product-prices": {
                "data": [
                    {
                        "type": "concrete-product-prices",
                        "id": "001_25904006"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-product-prices",
            "id": "001_25904006",
            "attributes": {
                "price": 9999,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9999,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 12564,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample: retrieve information about a concrete product with the details on the default and volume prices</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "093_24495843",
        "attributes": {
            "sku": "093_24495843",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": 4.3,
            "reviewCount": 4,
            "productAbstractSku": "093",
            "name": "Sony SmartWatch 3",
            "description": "The way you like it Whatever your lifestyle SmartWatch 3 SWR50 can be made to suit it. You can choose from a range of wrist straps – formal, sophisticated, casual, vibrant colours and fitness style, all made from the finest materials. Designed to perform and impress, this smartphone watch delivers a groundbreaking combination of technology and style. Downloadable apps let you customise your SmartWatch 3 SWR50 and how you use it.         Tell SmartWatch 3 SWR50 smartphone watch what you want and it will do it. Search. Command. Find.",
            "attributes": {
                "internal_ram": "512 MB",
                "flash_memory": "4 GB",
                "weight": "45 g",
                "protection_feature": "Water resistent",
                "brand": "Sony",
                "color": "Silver"
            },
            "superAttributesDefinition": [
                "flash_memory",
                "color"
            ],
            "metaTitle": "Sony SmartWatch 3",
            "metaKeywords": "Sony,Smart Electronics",
            "metaDescription": "The way you like it Whatever your lifestyle SmartWatch 3 SWR50 can be made to suit it. You can choose from a range of wrist straps – formal, sophisticated,",
            "attributeNames": {
                "internal_ram": "Internal RAM",
                "flash_memory": "Flash memory",
                "weight": "Weight",
                "protection_feature": "Protection feature",
                "brand": "Brand",
                "color": "Color"
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/093_24495843?include=concrete-product-prices"
        },
        "relationships": {
            "concrete-product-prices": {
                "data": [
                    {
                        "type": "concrete-product-prices",
                        "id": "093_24495843"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-product-prices",
            "id": "093_24495843",
            "attributes": {
                "price": 24899,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 24899,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": [
                            {
                                "netAmount": 150,
                                "grossAmount": 165,
                                "quantity": 5
                            },
                            {
                                "netAmount": 145,
                                "grossAmount": 158,
                                "quantity": 10
                            },
                            {
                                "netAmount": 140,
                                "grossAmount": 152,
                                "quantity": 20
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/093_24495843/concrete-product-prices"
            }
        }
    ]
}
```

</details>



<a name="concrete-products-response-attributes"></a>

{% include pbc/all/glue-api-guides/latest/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/latest/concrete-product-prices-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/concrete-product-prices-response-attributes.md -->

## Possible errors

| CODE | REASON |
| --- | --- |
| 302 | Concrete product is not found. |
| 312 | Concrete product is not specified.  |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/integrations/spryker-glue-api/storefront-api/api-references/reference-information-storefront-application-errors.html).
