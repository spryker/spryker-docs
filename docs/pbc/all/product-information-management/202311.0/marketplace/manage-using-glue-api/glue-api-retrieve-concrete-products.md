---
title: "Glue API: Retrieve concrete products"
description: Retrieve details about the items of the registered users' carts, and learn what else you can do with the resource in the Spryker Marketplace
template: glue-api-storefront-guide-template
last_updated: Dec 18, 2023
redirect_from:
  - /docs/pbc/all/product-information-management/202311.0/marketplace/manage-using-glue-api/retrieve-concrete-products.html
related:
  - title: Retrieving product offers of concrete products
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-using-glue-api/glue-api-retrieve-product-offers-of-concrete-products.html
---

This endpoint allows retrieving general information about concrete products.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

* [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)
* [Install the Measurement Units Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-measurement-units-glue-api.html)
* [Install the Product Options Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-options-glue-api.html)
* [Install the Product Labels Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-labels-glue-api.html)
* [Install the Marketplace Product Offer Glue API](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-glue-api.html)
* [Install the Marketplace Product Offer Prices Glue API](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html)
* [Install the Marketplace Product Offer Volume Prices Glue API](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html)


## Retrieve a concrete product

To retrieve general information about a concrete product, send the request:

***
`GET` {% raw %}**/concrete-products/*{{concrete_product_sku}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{concrete_product_sku}}***{% endraw %} | SKU of a concrete product to get information for. |

### Request

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>concrete-product-image-sets</li> <li>concrete-product-availabilities</li> <li>product-options</li> <li>product-reviews</li> <li>concrete-product-prices</li> <li>product-measurement-units</li> <li>sales-units</li> <li>product-labels</li> <li>product-offers</li> <li>product-offer-prices</li> <li>merchants</li></ul> |
| fields | 	Filters out the fields to be retrieved.  | name, image, description |

{% info_block infoBox "Included resources" %}

To retrieve product offer prices, include `product-offers` and `product-offer-prices`.

{% endinfo_block %}

{% info_block infoBox "Filtering" %}

* For performance and bandwidth usage optimization, we recommend filtering out only the needed information using the `fields` string parameter.

* If you include more resources, you can still use the `fields` string parameter to return only the needed fields. For example, `GET https://glue.mysprykershop.com/concrete-products/fish-1-1?include=sales-units&fields[concrete-products]=name,description&fields[sales-units]=conversion,precision`.

{% endinfo_block %}



| REQUEST  | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006` | Retrieve information about the `001_25904006` product.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-image-sets` | Retrieve information about the `001_25904006` product with its image sets.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-availabilities` | Retrieve information about the `001_25904006` product with its availability.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-prices` | Retrieve information about the `001_25904006` product with its [default prices](/docs/pbc/all/price-management/{{page.version}}/base-shop/prices-feature-overview/prices-feature-overview.html). |
| `GET https://glue.mysprykershop.com/abstract-products/093_24495843?include=concrete-product-prices` | Retrieve information about the abstract product with SKU `093_24495843` with its prices: default and [volume prices](/docs/pbc/all/price-management/{{page.version}}/base-shop/prices-feature-overview/volume-prices-overview.html) |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=product-options` | Retrieve information about the `001_25904006` product with its product options.  |
| `GET https://glue.mysprykershop.com/concrete-products/035_17360369?include=product-reviews` | Retrieve information about the `001_25904006` product with its product reviews.  |
| `GET https://glue.mysprykershop.com/concrete-products/fish-1-1?include=sales-units,product-measurement-units` | Retrieve information about the `fish-1-1` product with the information on its sales units and product measurement units included. |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=product-labels` | Retrieve information about the `001_25904006` product with product labels included.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=product-offers` | Retrieve information about a concrete product with the SKU `001_25904006` with the product offers for this product included. |
| `GET https://glue.mysprykershop.com/concrete-products/076_24394207?include=product-offers,product-offer-prices` | Retrieve information about a concrete product with the SKU `076_24394207` with product offers and the product offer prices included.
| `GET https://glue.mysprykershop.com/concrete-products/111_12295890?include=abstract-products,merchants` | Retrieve information about the concrete product with SKU `111_12295890` with its abstract product and the merchant who sells it.|

### Response

<details>
<summary>Response sample: retrieve information about a concrete product</summary>

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
            "self": "https://glue.mysprykershop.com/concrete-products/001_25904006"
        }
    }
}
```
</details>

<details>
<summary>Response sample: retrieve information about a concrete product with its image sets</summary>

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
<summary>Response sample: retrieve information about a concrete product with its availability</summary>

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


<details><summary>Response sample: retrieve information about a concrete product with its default prices</summary>

```php
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


<details><summary>Response sample: retrieve information about a concrete product with its default and volume prices</summary>

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
<summary>Response sample: retrieve information about a concrete product with its product options</summary>

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
<summary>Response sample: retrieve information about a concrete product with product reviews</summary>

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
            "description": "Creative Shot Originality is effortless with Creative Shot. Simply take a shot and the camera will analyse the scene then automatically generate five creative images plus the original unaltered photo—capturing the same subject in a variety of artistic and surprising ways. The unique symmetrical, metal-bodied design is strikingly different with an ultra-modern minimalist style—small enough to keep in your pocket and stylish enough to take anywhere. HS System excels in low light letting you capture the real atmosphere of the moment without flash or a tripod. Advanced DIGIC 5 processing and a high-sensitivity 12.1 Megapixel CMOS sensor give excellent image quality in all situations.",
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
<summary>Response sample: retrieve information about a concrete product with the details on its sales units and product measurement units</summary>

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
            "self": "https://glue.mysprykershop.com/concrete-products/cable-vga-1-1?include=sales-units,product-measurement-units"
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
                "self": "https://glue.mysprykershop.com/product-measurement-units/METR"
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
                "self": "https://glue.mysprykershop.com/concrete-products/cable-vga-1-1/sales-units/32"
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
<summary>Response sample: retrieve information about a concrete product with its product labels</summary>

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
            "self": "https://glue.mysprykershop.com/concrete-products/001_25904006"
        }
    }
}
```
</details>

<details>
<summary>Response sample: retrieve information about a concrete product and its product offers included</summary>

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
            "self": "https://glue.mysprykershop.com/concrete-products/001_25904006?include=product-offers"
        },
        "relationships": {
            "product-offers": {
                "data": [
                    {
                        "type": "product-offers",
                        "id": "offer49"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-offers",
            "id": "offer49",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer49"
            }
        }
    ]
}
```
</details>


<details>
<summary>Response sample: retrieve information about a concrete product and its product offers and product offer prices included</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "076_24394207",
        "attributes": {
            "sku": "076_24394207",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": null,
            "reviewCount": 0,
            "productAbstractSku": "076",
            "name": "Sony Xperia Z3 Compact",
            "description": "Dive into new experiences Xperia Z3 Compact is the smartphone designed to enhance your life. And life isn’t lived inside. With the highest waterproof rating*, Xperia Z3 Compact lets you answer calls in the rain or take pictures in the pool. And it can handle all the drops into the sink in between. Combined with a slim, compact design that’s easy to use with one hand, Xperia Z3 Compact is the Android smartphone that teams durability with beauty. Some of the best times happen in the lowest light. Years of Sony camera expertise have been brought to Xperia Z3 Compact, to deliver unparalleled low-light capability. Thanks to Cyber-shot and Handycam technologies you can record stunning videos on the move and take crisp shots under water. Want to take your shots to the next level? Get creative with our unique camera apps. It’s our best smartphone camera yet – for memories that deserve more than good.",
            "attributes": {
                "internal_ram": "2048 MB",
                "display_type": "TFT",
                "bluetooth_version": "4.0 LE",
                "form_factor": "Bar",
                "brand": "Sony",
                "color": "White"
            },
            "superAttributesDefinition": [
                "form_factor",
                "color"
            ],
            "metaTitle": "Sony Xperia Z3 Compact",
            "metaKeywords": "Sony,Communication Electronics",
            "metaDescription": "Dive into new experiences Xperia Z3 Compact is the smartphone designed to enhance your life. And life isn’t lived inside. With the highest waterproof ratin",
            "attributeNames": {
                "internal_ram": "Internal RAM",
                "display_type": "Display type",
                "bluetooth_version": "Blootooth version",
                "form_factor": "Form factor",
                "brand": "Brand",
                "color": "Color"
            },
            "productConfigurationInstance": null
        },
        "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/076_24394207"
        },
        "relationships": {
            "product-offers": {
                "data": [
                    {
                        "type": "product-offers",
                        "id": "offer169"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-offer-prices",
            "id": "offer169",
            "attributes": {
                "price": 30355,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 30355,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": [
                            {
                                "grossAmount": 38400,
                                "netAmount": 39100,
                                "quantity": 3
                            }

                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer169/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer169",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000006",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer169"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer169"
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
<summary>Response sample: retrieve information about a concrete product, an abstract product it belongs to, and the merchant who sells the concrete product</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "111_12295890",
        "attributes": {
            "sku": "111_12295890",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": null,
            "reviewCount": 0,
            "productAbstractSku": "111",
            "name": "Sony SmartWatch",
            "description": "Your world at your fingertips SmartWatch features an easy-to-use, ultra-responsive touch display. Finding your way around SmartWatch is super simple. Your world’s just a tap, swipe or press away. Want to do more with your SmartWatch? Download compatible applications on Google Play™. And customise your SmartWatch to make it exclusively yours. Customise your SmartWatch with a 20mm wristband. Or wear its stylish wristband. You can even use it as a clip. This ultra-thin Android™ remote was designed to impress. An elegant Android watch that’ll keep you discreetly updated and your hands free.",
            "attributes": {
                "shape": "square",
                "bluetooth_version": "3",
                "battery_life": "72 h",
                "display_type": "LCD",
                "brand": "Sony",
                "color": "Silver"
            },
            "superAttributesDefinition": [
                "color"
            ],
            "metaTitle": "Sony SmartWatch",
            "metaKeywords": "Sony,Smart Electronics",
            "metaDescription": "Your world at your fingertips SmartWatch features an easy-to-use, ultra-responsive touch display. Finding your way around SmartWatch is super simple. Your ",
            "attributeNames": {
                "shape": "Shape",
                "bluetooth_version": "Blootooth version",
                "battery_life": "Battery life",
                "display_type": "Display type",
                "brand": "Brand",
                "color": "Color"
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/111_12295890"
        },
        "relationships": {
            "abstract-products": {
                "data": [
                    {
                        "type": "abstract-products",
                        "id": "111"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "abstract-products",
            "id": "111",
            "attributes": {
                "sku": "111",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Sony SmartWatch",
                "description": "Your world at your fingertips SmartWatch features an easy-to-use, ultra-responsive touch display. Finding your way around SmartWatch is super simple. Your world’s just a tap, swipe or press away. Want to do more with your SmartWatch? Download compatible applications on Google Play™. And customise your SmartWatch to make it exclusively yours. Customise your SmartWatch with a 20mm wristband. Or wear its stylish wristband. You can even use it as a clip. This ultra-thin Android™ remote was designed to impress. An elegant Android watch that’ll keep you discreetly updated and your hands free.      ",
                "attributes": {
                    "shape": "square",
                    "bluetooth_version": "3",
                    "battery_life": "72 h",
                    "display_type": "LCD",
                    "brand": "Sony",
                    "color": "Black"
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
                        "111_12295890"
                    ],
                    "super_attributes": {
                        "color": [
                            "Silver"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Sony SmartWatch",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDescription": "Your world at your fingertips SmartWatch features an easy-to-use, ultra-responsive touch display. Finding your way around SmartWatch is super simple. Your ",
                "attributeNames": {
                    "shape": "Shape",
                    "bluetooth_version": "Blootooth version",
                    "battery_life": "Battery life",
                    "display_type": "Display type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/sony-smartwatch-111"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/111"
            }
        }
    ]
}
```
</details>

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/product-options-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/product-options-response-attributes.md -->



For attributes of the other included resources, see the following:

* [Retrieve sales units of a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-sales-units.html)
* [Retrieve a measurement unit](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-measurement-units.html#measurement-units-response-attributes)
* [Retrieve image sets of a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-image-sets-of-concrete-products.html)
* [Retrieve availability of a concrete product](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-availability.html)
* [Retrieve prices of a concrete product](/docs/pbc/all/price-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-prices.html)
* [Retrieve a product label](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-product-labels.html)
* [Retrieve product ratings and reviews](/docs/pbc/all/ratings-reviews/{{page.version}}/manage-using-glue-api/glue-api-manage-product-reviews.html)
* [Retrieving product offers](/docs/pbc/all/offer-management/{{page.version}}/marketplace/glue-api-retrieve-product-offers.html#product-offers-response-attributes)
* [Retrieving product offer prices](/docs/pbc/all/price-management/{{page.version}}/marketplace/glue-api-retrieve-product-offer-prices.html#product-offer-prices-response-attributes)
* [Retrieving abstract products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-abstract-products.html#response)
* [Retrieving merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html#merchants-response-attributes)


## Possible errors

| CODE | REASON |
| --- | --- |
| 302 | Concrete product is not found. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
