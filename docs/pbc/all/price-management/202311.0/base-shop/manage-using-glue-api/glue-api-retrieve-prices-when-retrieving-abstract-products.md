---
title: "Glue API: Retrieve prices when retrieving abstract products"
description: Learn how to retrieve prices when retrieving abstract products.
last_updated: Aug 2, 2022
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/pbc/all/price-management/202311.0/base-shop/manage-using-glue-api/retrieve-prices-when-retrieving-abstract-products.html
  - /docs/pbc/all/price-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-prices-when-retrieving-abstract-products.html
---

This document describes how to retrieve prices when retrieving abstract products. To retrieve full information about abstract products, see [Retrieve abstract products](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html).

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)
* [Install the Prices Glue API](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/install-the-product-price-glue-api.html)



## Retrieve an abstract product

To retrieve general information about an abstract product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}***

---


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get information for. |

### Request

`GET https://glue.mysprykershop.com/abstract-products/093?include=abstract-product-prices`: Retrieve information about the abstract product with SKU `093` with its prices.


### Response

<details><summary>Response sample: retrieve information about an abstract product with the details about abstract product prices</summary>

```json
{
    "data": {
        "type": "abstract-products",
        "id": "001",
        "attributes": {
            "sku": "001",
            "averageRating": null,
            "reviewCount": 0,
            "name": "Canon IXUS 160",
            "description": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results while framing using Live View Control and enjoy sharing them with friends using the 6.8 cm (2.7”) LCD screen. Combine with a Canon Connect Station and you can easily share your photos and movies with the world on social media sites and online albums like irista, plus enjoy watching them with family and friends on an HD TV. Effortlessly enjoy great shots of friends thanks to Face Detection technology. It detects multiple faces in a single frame making sure they remain in focus and with optimum brightness. Face Detection also ensures natural skin tones even in unusual lighting conditions.",
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
            "superAttributes": {
                "color": [
                    "Red"
                ]
            },
            "attributeMap": {
                "product_concrete_ids": [
                    "001_25904006"
                ],
                "super_attributes": {
                    "color": [
                        "Red"
                    ]
                },
                "attribute_variants": []
            },
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
            },
            "url": "/en/canon-ixus-160-1"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/abstract-products/001?include=abstract-product-prices"
        },
        "relationships": {
            "abstract-product-prices": {
                "data": [
                    {
                        "type": "abstract-product-prices",
                        "id": "001"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "abstract-product-prices",
            "id": "001",
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
                "self": "https://glue.mysprykershop.com/abstract-products/001/abstract-product-prices"
            }
        }
    ]
}
```
</details>

<details><summary>Response sample: retrieve information about an abstract product with the details about the default and volume prices included</summary>

```json
{
    "data": {
        "type": "abstract-products",
        "id": "093",
        "attributes": {
            "sku": "093",
            "merchantReference": "MER000001",
            "averageRating": 4.3,
            "reviewCount": 4,
            "name": "Sony SmartWatch 3",
            "description": "The way you like it Whatever your lifestyle SmartWatch 3 SWR50 can be made to suit it. You can choose from a range of wrist straps – formal, sophisticated, casual, vibrant colours and fitness style, all made from the finest materials. Designed to perform and impress, this smartphone watch delivers a groundbreaking combination of technology and style. Downloadable apps let you customise your SmartWatch 3 SWR50 and how you use it.  Tell SmartWatch 3 SWR50 smartphone watch what you want and it will do it. Search. Command. Find.",
            "attributes": {
                "internal_ram": "512 MB",
                "flash_memory": "4 GB",
                "weight": "45 g",
                "protection_feature": "Water resistent",
                "brand": "Sony",
                "color": "Yellow"
            },
            "superAttributesDefinition": [
                "flash_memory",
                "color"
            ],
            "superAttributes": {
                "color": [
                    "Silver"
                ]
            },
            "attributeMap": {
                "product_concrete_ids": [
                    "093_24495843"
                ],
                "super_attributes": {
                    "color": [
                        "Silver"
                    ]
                },
                "attribute_variants": []
            },
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
            },
            "url": "/en/sony-smartwatch-3-93"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/abstract-products/093?include=abstract-product-prices"
        },
        "relationships": {
            "abstract-product-prices": {
                "data": [
                    {
                        "type": "abstract-product-prices",
                        "id": "093"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "abstract-product-prices",
            "id": "093",
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
                "self": "https://glue.mysprykershop.com/abstract-products/093/abstract-product-prices"
            }
        }
    ]
}
```
</details>





<a name="abstract-products-response-attributes"></a>

{% include pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-products-response-attributes.md -->


For the attributes of abstract product prices, see [Retrieve abstract product prices](/docs/pbc/all/price-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-prices.html).


## Possible errors

| CODE | REASON |
|-|-|
| 301 | Abstract product is not found. |
| 311 | Abstract product SKU is not specified. |
