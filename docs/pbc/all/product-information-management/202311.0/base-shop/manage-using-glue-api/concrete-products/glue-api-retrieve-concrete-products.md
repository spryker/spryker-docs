---
title: "Glue API: Retrieving concrete products"
description: Retrieve general information about concrete products.
last_updated: Jun 21, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-concrete-products
originalArticleId: 4f36b42a-e2a2-46a1-be84-ae9f3b2a1a25
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-products/concrete-products/retrieving-concrete-products.html
  - /docs/pbc/all/product-information-management/202311.0/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html
related:
  - title: Retrieve concrete product availability
    link: docs/pbc/all/warehouse-management-system/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-availability.html
  - title: Retrieving concrete product prices
    link: docs/pbc/all/price-management/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-prices.html
  - title: Retrieving image sets of concrete products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-image-sets-of-concrete-products.html
  - title: Retrieving sales units
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-sales-units.html
  - title: Product Options feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-options-feature-overview.html
---

This endpoint allows retrieving general information about concrete products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see the docs:
* [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)
* [Glue API: Measurement Units Feature Integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-measurement-units-glue-api.html)
* [Install the Product Options Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-options-glue-api.html)
* [Install the Product Labels Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-image-sets-glue-api.html)
* [Install the Product Bundles Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-bundles-glue-api.html)
* [Install the Prices Glue API](/docs/pbc/all/price-management/{{page.version}}/base-shop/install-and-upgrade/install-the-product-price-glue-api.html)
* [Install the Inventory Management Glue API](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-glue-api.html)
* [Install the Product Rating and Reviews Glue API](/docs/pbc/all/ratings-reviews/{{page.version}}/install-and-upgrade/install-the-product-rating-and-reviews-glue-api.html)


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
| include | Adds resource relationships to the request. | <ul><li>concrete-product-image-sets</li><li>concrete-product-availabilities</li><li>product-options</li><li>product-reviews</li><li>product-offers</li><li>concrete-product-prices</li><li>product-measurement-units</li><li>sales-units</li><li>product-labels</li><li>bundled-products</li></ul> |
| fields | 	Filters out the fields to be retrieved.  | name, image, description |

{% info_block warningBox "Performance" %}

* For performance and bandwidth usage optimization, we recommend filtering out only the needed information using the `fields` string parameter.

* If you include more resources, you can still use the `fields` string parameter to return only the needed fields. For example, `GET http://glue.mysprykershop.com/concrete-products/fish-1-1?include=sales-units&fields[concrete-products]=name,description&fields[sales-units]=conversion,precision`.

{% endinfo_block %}   

| REQUEST  | USAGE |
| --- | --- |
| `GET http://glue.mysprykershop.com/concrete-products/001_25904006` | Get information about the `001_25904006` product.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-image-sets` | Get information about the `001_25904006` product with its image sets.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-availabilities` | Get information about the `001_25904006` product with its availability.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-prices` | Get information about the `001_25904006` product with its [default prices](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html#default-and-original-prices-on-the-storefront). |
| `GET https://glue.mysprykershop.com/abstract-products/093_24495843?include=abstract-product-prices` | Retrieve information about the abstract product with SKU `093_24495843` with its prices.) |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=product-options` | Get information about the `001_25904006` product with its product options.  |
| `GET https://glue.mysprykershop.com/concrete-products/035_17360369?include=product-reviews` | Get information about the `001_25904006` product with its product reviews.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=product-offers` | Get information about the `001_25904006` product with its product offers.  |
| `GET http://glue.mysprykershop.com/concrete-products/fish-1-1?include=sales-units,product-measurement-units` | Get information about the `fish-1-1` product with the information on its sales units and product measurement units included. |
| `GET http://glue.mysprykershop.com/concrete-products/001_25904006?include=product-labels` | Retrieve information about the `001_25904006` product with product labels included.  |
| `GET https://glue.mysprykershop.com/concrete-products/214_123?included=bundled-products` | Retrieve the concrete product with SKU `214_123`. If it's a product bundle, retrieve the bundled products. |
| `GET https://glue.mysprykershop.com/concrete-products/214_123?included=bundled-products,concrete-products,abstract-products` | Retrieve the concrete product with SKU `214_123`. If it's a product bundle, retrieve the bundled products. Retrieve all the related concrete products and the abstract products owning them. |

### Response

<details>
<summary>Response sample: retrieve information about a concrete product by SKU</summary>

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
            "self": "http://glue.mysprykershop.com/concrete-products/001_25904006"
        }
    }
}
```
</details>

<details>
<summary>Response sample: retrieve information about a concrete product with the details on the sales units and product measurement units</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "cable-vga-1-1",
        "attributes": {
            "sku": "cable-vga-1-1",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": null,
            "reviewCount": 0,
            "name": "VGA cable (1.5m)",
            "description": "Enjoy clear, crisp, immediate connectivity with the High-Speed HDMI Cable. This quality High-Definition Multimedia Interface (HDMI) cable allows you to connect a wide variety of devices in the realms of home entertainment, computing, gaming, and more to your HDTV, projector, or monitor. Perfect for those that interact with multiple platforms and devices, you can rely on strong performance and playback delivery when it comes to your digital experience.",
            "attributes": {
                "packaging_unit": "Ring"
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
            "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-1?include=sales-units,product-measurement-units"
        },
        "relationships": {
            "product-measurement-units": {
                "data": [
                    {
                        "type": "product-measurement-units",
                        "id": "METR"
                    }
                ]
            },
            "sales-units": {
                "data": [
                    {
                        "type": "sales-units",
                        "id": "32"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-measurement-units",
            "id": "METR",
            "attributes": {
                "name": "Meter",
                "defaultPrecision": 100
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-measurement-units/METR"
            }
        },
        {
            "type": "sales-units",
            "id": "32",
            "attributes": {
                "conversion": 1,
                "precision": 100,
                "isDisplayed": true,
                "isDefault": true,
                "productMeasurementUnitCode": "METR"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/sales-units/32"
            },
            "relationships": {
                "product-measurement-units": {
                    "data": [
                        {
                            "type": "product-measurement-units",
                            "id": "METR"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

<details>
<summary>Response sample: retrieve information about a concrete product with the details on product labels</summary>

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
            "self": "http://glue.mysprykershop.com/concrete-products/001_25904006"
        }
    }
}
```
</details>

<details>
<summary>Response sample: retrieve information about a concrete product with the details on the product image sets</summary>

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
            "self": "https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-image-sets"
        },
        "relationships": {
            "concrete-product-image-sets": {
                "data": [
                    {
                        "type": "concrete-product-image-sets",
                        "id": "001_25904006"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-product-image-sets",
            "id": "001_25904006",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/25904006-8438.jpg",
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/25904006-8438.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-image-sets"
            }
        }
    ]
}
```
</details>

<details>
<summary>Response sample: retrieve information about a concrete product with the details on product availability</summary>

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
            "self": "https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-availabilities"
        },
        "relationships": {
            "concrete-product-availabilities": {
                "data": [
                    {
                        "type": "concrete-product-availabilities",
                        "id": "001_25904006"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-product-availabilities",
            "id": "001_25904006",
            "attributes": {
                "isNeverOutOfStock": false,
                "availability": true,
                "quantity": "10.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities"
            }
        }
    ]
}
```
</details>

<details><summary>Response sample: retrieve information about a concrete product with the details on the default product prices</summary>

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

<details>
<summary>Response sample: retrieve information about a concrete product with the details on the product options</summary>

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
            "self": "https://glue.mysprykershop.com/concrete-products/001_25904006?include=product-options"
        },
        "relationships": {
            "product-options": {
                "data": [
                    {
                        "type": "product-options",
                        "id": "OP_insurance"
                    },
                    {
                        "type": "product-options",
                        "id": "OP_gift_wrapping"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-options",
            "id": "OP_insurance",
            "attributes": {
                "optionGroupName": "Insurance",
                "sku": "OP_insurance",
                "optionName": "Two (2) year insurance coverage",
                "price": 10000,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/product-options/OP_insurance"
            }
        },
        {
            "type": "product-options",
            "id": "OP_gift_wrapping",
            "attributes": {
                "optionGroupName": "Gift wrapping",
                "sku": "OP_gift_wrapping",
                "optionName": "Gift wrapping",
                "price": 500,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/product-options/OP_gift_wrapping"
            }
        }
    ]
}
```
</details>

<details>
<summary>Response sample: retrieve information about a concrete product with the details on product reviews</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "035_17360369",
        "attributes": {
            "sku": "035_17360369",
            "isDiscontinued": false,
            "discontinuedNote": null,
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
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/035_17360369?include=product-reviews"
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

<details>
<summary>Response sample: retrieve information about a concrete product with the details on the bundled products included</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "214_123",
        "attributes": {
            "sku": "214_123",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": null,
            "reviewCount": 0,
            "productAbstractSku": "214",
            "name": "Samsung Bundle",
            "description": "This is a unique product bundle featuring various Samsung products. Items in this bundle are 2 x Samsung Galaxy Tab A SM-T550N 32 GB, 3 x Samsung Galaxy Gear, and 1 x Samsung Galaxy S5 mini",
            "attributes": {
                "brand": "Samsung",
                "bundled_product": "Yes"
            },
            "superAttributesDefinition": [],
            "metaTitle": "Samsung Bundle",
            "metaKeywords": "Samsung,Smart Electronics, Bundle",
            "metaDescription": "Ideal for extreme sports and outdoor enthusiasts Exmor R™ CMOS sensor with enhanced sensitivity always gets the shot: Mountain-biking downhill at breakneck",
            "attributeNames": {
                "brand": "Brand",
                "bundled_product": "Bundled Product"
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/214_123?include=bundled-products"
        },
        "relationships": {
            "bundled-products": {
                "data": [
                    {
                        "type": "bundled-products",
                        "id": "067_24241408"
                    },
                    {
                        "type": "bundled-products",
                        "id": "110_19682159"
                    },
                    {
                        "type": "bundled-products",
                        "id": "175_26935356"
                    }
                ]
            }
        }
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
                "self": "https://glue.mysprykershop.com/concrete-products/067_24241408?include=bundled-products"
            }
        },
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
                "self": "https://glue.mysprykershop.com/concrete-products/110_19682159?include=bundled-products"
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
                "self": "https://glue.mysprykershop.com/concrete-products/175_26935356?include=bundled-products"
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
    ]
}
```
</details>


<details>
<summary>Response sample: retrieve information about a concrete product with the detais on bundled products, concrete products, and abstract products</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "214_123",
        "attributes": {
            "sku": "214_123",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": null,
            "reviewCount": 0,
            "productAbstractSku": "214",
            "name": "Samsung Bundle",
            "description": "This is a unique product bundle featuring various Samsung products. Items in this bundle are 2 x Samsung Galaxy Tab A SM-T550N 32 GB, 3 x Samsung Galaxy Gear, and 1 x Samsung Galaxy S5 mini",
            "attributes": {
                "brand": "Samsung",
                "bundled_product": "Yes"
            },
            "superAttributesDefinition": [],
            "metaTitle": "Samsung Bundle",
            "metaKeywords": "Samsung,Smart Electronics, Bundle",
            "metaDescription": "Ideal for extreme sports and outdoor enthusiasts Exmor R™ CMOS sensor with enhanced sensitivity always gets the shot: Mountain-biking downhill at breakneck",
            "attributeNames": {
                "brand": "Brand",
                "bundled_product": "Bundled Product"
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/214_123?include=bundled-products,concrete-products,abstract-products"
        },
        "relationships": {
            "abstract-products": {
                "data": [
                    {
                        "type": "abstract-products",
                        "id": "214"
                    }
                ]
            },
            "bundled-products": {
                "data": [
                    {
                        "type": "bundled-products",
                        "id": "067_24241408"
                    },
                    {
                        "type": "bundled-products",
                        "id": "110_19682159"
                    },
                    {
                        "type": "bundled-products",
                        "id": "175_26935356"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "abstract-products",
            "id": "214",
            "attributes": {
                "sku": "214",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Samsung Bundle",
                "description": "This is a unique product bundle featuring various Samsung products.",
                "attributes": {
                    "brand": "Samsung",
                    "bundled_product": "Yes"
                },
                "superAttributesDefinition": [],
                "superAttributes": [],
                "attributeMap": {
                    "product_concrete_ids": [
                        "214_123"
                    ],
                    "super_attributes": [],
                    "attribute_variants": []
                },
                "metaTitle": "Samsung Bundle",
                "metaKeywords": "Samsung,Smart Electronics, Bundle",
                "metaDescription": "Ideal for extreme sports and outdoor enthusiasts Exmor R™ CMOS sensor with enhanced sensitivity always gets the shot: Mountain-biking downhill at breakneck",
                "attributeNames": {
                    "brand": "Brand",
                    "bundled_product": "Bundled Product"
                },
                "url": "/en/samsung-bundle-214"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/214"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "214_123"
                        }
                    ]
                }
            }
        },
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
                "self": "https://glue.mysprykershop.com/concrete-products/067_24241408?include=bundled-products,concrete-products,abstract-products"
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
                "self": "https://glue.mysprykershop.com/concrete-products/110_19682159?include=bundled-products,concrete-products,abstract-products"
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
                "self": "https://glue.mysprykershop.com/concrete-products/175_26564922?include=bundled-products,concrete-products,abstract-products"
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
                "self": "https://glue.mysprykershop.com/concrete-products/175_26935356?include=bundled-products,concrete-products,abstract-products"
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
        },
        {
            "type": "concrete-products",
            "id": "214_123",
            "attributes": {
                "sku": "214_123",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "214",
                "name": "Samsung Bundle",
                "description": "This is a unique product bundle featuring various Samsung products. Items in this bundle are 2 x Samsung Galaxy Tab A SM-T550N 32 GB, 3 x Samsung Galaxy Gear, and 1 x Samsung Galaxy S5 mini",
                "attributes": {
                    "brand": "Samsung",
                    "bundled_product": "Yes"
                },
                "superAttributesDefinition": [],
                "metaTitle": "Samsung Bundle",
                "metaKeywords": "Samsung,Smart Electronics, Bundle",
                "metaDescription": "Ideal for extreme sports and outdoor enthusiasts Exmor R™ CMOS sensor with enhanced sensitivity always gets the shot: Mountain-biking downhill at breakneck",
                "attributeNames": {
                    "brand": "Brand",
                    "bundled_product": "Bundled Product"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/214_123?include=bundled-products,concrete-products,abstract-products"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "214"
                        }
                    ]
                },
                "bundled-products": {
                    "data": [
                        {
                            "type": "bundled-products",
                            "id": "067_24241408"
                        },
                        {
                            "type": "bundled-products",
                            "id": "110_19682159"
                        },
                        {
                            "type": "bundled-products",
                            "id": "175_26935356"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>



{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-product-availabilities-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-product-availabilities-response-attributes.md -->

{% include /pbc/all/glue-api-guides/{{page.version}}/product-reviews-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/product-reviews-response-attributes.md -->

| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|-|
| product-options | sku | String | Specifies the SKU of the product option. |
| product-options | optionName | String | Specifies the option name. |
| product-options | optionGroupName | String | Specifies the name of the group to which the option belongs. |
| product-options | price | Integer | Specifies the option price in cents. |
| product-options | currencyIsoCode | String | Specifies the ISO 4217 code of the currency in which the product option price is specified. |

For other attributes of the included resources, see:

* [Retrieve sales units of a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-sales-units.html#sales-units-response-attributes)
* [Retrieve a measurement unit](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-measurement-units.html#measurement-units-response-attributes)
* [Retrieve image sets of a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-image-sets-of-concrete-products.html#concrete-image-sets-response-attributes)

* [Retrieve prices of a concrete product](/docs/pbc/all/price-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-prices.html#response)
* [Retrieve a product label](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-product-labels.html#product-labels-response-attributes)



## Possible errors

| CODE | REASON |
| --- | --- |
| 302 | Concrete product is not found. |
| 312 | Concrete product is not specified.  |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
