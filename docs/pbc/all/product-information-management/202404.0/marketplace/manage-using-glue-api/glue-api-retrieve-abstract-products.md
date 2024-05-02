---
title: "Glue API: Retrieve abstract products"
description: This glue API document describes how to retrieve general information about abstract products and related resources in the Spryker Marketplace
template: glue-api-storefront-guide-template
last_updated: Dec 14, 2023
redirect_from:
  - /docs/scos/dev/glue-api-guides/202005.0/managing-products/retrieving-product-information.html
  - /docs/pbc/all/product-information-management/202311.0/marketplace/manage-using-glue-api/retrieve-abstract-products.html
related:
  - title: Retrieving abstract products in abstract product lists
    link: docs/marketplace/dev/glue-api-guides/page.version/content-items/retrieving-abstract-products-in-abstract-product-lists.html
---

This endpoint allows retrieving general information about abstract products.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)
* [Glue API: Product Options feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-options-glue-api.html)
* [Glue API: Product Labels feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-labels-glue-api.html)



## Retrieve an abstract product

To retrieve general information about an abstract product, send the request:

---
`GET` {% raw %}**/abstract-products/*{{abstract_product_sku}}***{% endraw %}

---

| PATH | DESCRIPTION |
| --- | --- |
| {% raw %}***{{abstract_product_sku}}***{% endraw %} | SKU of an abstract product to get information for. |

### Request

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | abstract-product-prices, concrete-products, product-labels, abstract-product-image-sets, abstract-product-availabilities, category-nodes, product-tax-sets, product-options, product-reviews, merchants |
| fields | 	Filters out the fields to be retrieved.  | name, image, description |

{% info_block warningBox "Performance" %}

* For performance and bandwidth usage optimization, we recommend filtering out only the needed information using the `fields` string parameter.

* If you include more resources, you can still use the `fields` string parameter to return only the needed fields. For example, `GET https://glue.mysprykershop.com/abstract-products/001?include=concrete-products&fields[abstract-products]=name,description&fields[concrete-products]=name,image`.

{% endinfo_block %}



| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/abstract-products/001` | Retrieve information about the abstract product with SKU `001`. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=abstract-product-image-sets` | Retrieve information about the abstract product with SKU `001` with its image sets. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=abstract-product-availabilities` | Retrieve information about the abstract product with SKU `001` with its availability. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=abstract-product-prices` | Retrieve information about the abstract product with SKU `001` with its [default prices](/docs/pbc/all/price-management/{{page.version}}/base-shop/prices-feature-overview/prices-feature-overview.html). |
| `GET https://glue.mysprykershop.com/abstract-products/093?include=abstract-product-prices` | Retrieve information about the abstract product with SKU `093` with its prices (default and [volume prices](/docs/pbc/all/price-management/{{page.version}}/base-shop/prices-feature-overview/volume-prices-overview.html)). <!-- Incorrect description. Fix in SCOS and MP docs after the migration --> |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=category-nodes` | Retrieve information about the abstract product with SKU `001` with the category nodes it belongs to. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=product-tax-sets` | Retrieve information about the abstract product with SKU `001` with its tax sets. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=product-labels` | Retrieve information about the abstract product with SKU `001` with its assigned product labels. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=concrete-products` | Retrieve information about the abstract product with SKU `001` with its concrete products. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=product-options` | Retrieve information about the abstract product with SKU `001` with its product options. |
| `GET https://glue.mysprykershop.com/abstract-products/035?include=product-reviews` | Retrieve information about the abstract product with SKU `001` with its product reviews. |
| `GET https://glue.mysprykershop.com/abstract-products/109`     | Retrieve the merchant product with SKU `109`.|
| `GET https://glue.mysprykershop.com/abstract-products/109?include=merchants` | Retrieve the marketplace product with SKU `109` including the merchant information. |


### Response

<details>
<summary markdown='span'>Response sample: retrieve information about the abstract product with SKU `001`</summary>

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
            "self": "https://glue.mysprykershop.com/abstract-products/001"
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Response sample: retrieve information about the abstract product with its image sets</summary>

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
            "self": "https://glue.mysprykershop.com/abstract-products/001?include=abstract-product-image-sets"
        },
        "relationships": {
            "abstract-product-image-sets": {
                "data": [
                    {
                        "type": "abstract-product-image-sets",
                        "id": "001"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "abstract-product-image-sets",
            "id": "001",
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
                "self": "https://glue.mysprykershop.com/abstract-products/001/abstract-product-image-sets"
            }
        }
    ]
}
```
</details>


<details>
<summary markdown='span'>Response sample: retrieve information about the abstract product with its availability</summary>

```json
{
    "data": {
        "type": "abstract-products",
        "id": "001",
        "attributes": {
            "sku": "001",
            "averageRating": null,
            "reviewCount": 0,
            "name": "Canon IXUS 160",
            "description": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results while framing using Live View Control and enjoy sharing them with friends using the 6.8 cm (2.7”) LCD screen. Combine with a Canon Connect Station and you can easily share your photos and movies with the world on social media sites and online albums like irista, plus enjoy watching them with family and friends on an HD TV. Effortlessly enjoy great shots of friends thanks to Face Detection technology. It detects multiple faces in a single frame making sure they remain in focus and with optimum brightness. Face Detection also ensures natural skin tones even in unusual lighting conditions.",
            "attributes": {
                "megapixel": "20 MP",
                "flash_range_tele": "4.2-4.9 ft",
                "memory_slots": "1",
                "usb_version": "2",
                "brand": "Canon",
                "color": "Red"
            },
            "superAttributesDefinition": [
                "color"
            ],
            "superAttributes": {
                "color": [
                    "Red"
                ]
            },
            "attributeMap": {
                "product_concrete_ids": [
                    "001_25904006"
                ],
                "super_attributes": {
                    "color": [
                        "Red"
                    ]
                },
                "attribute_variants": []
            },
            "metaTitle": "Canon IXUS 160",
            "metaKeywords": "Canon,Entertainment Electronics",
            "metaDescription": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results whi",
            "attributeNames": {
                "megapixel": "Megapixel",
                "flash_range_tele": "Flash range (tele)",
                "memory_slots": "Memory slots",
                "usb_version": "USB version",
                "brand": "Brand",
                "color": "Color"
            },
            "url": "/en/canon-ixus-160-1"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/abstract-products/001?include=abstract-product-availabilities"
        },
        "relationships": {
            "abstract-product-availabilities": {
                "data": [
                    {
                        "type": "abstract-product-availabilities",
                        "id": "001"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "abstract-product-availabilities",
            "id": "001",
            "attributes": {
                "availability": true,
                "quantity": "10.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/001/abstract-product-availabilities"
            }
        }
    ]
}
```
</details>



<details> <summary markdown='span'>Response sample: retrieve information about the abstract product with its default prices</summary>

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

<details> <summary markdown='span'>Response sample: retrieve information about the abstract product with its default and volume prices</summary>

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
            "description": "The way you like it Whatever your lifestyle SmartWatch 3 SWR50 can be made to suit it. You can choose from a range of wrist straps—formal, sophisticated, casual, vibrant colours and fitness style, all made from the finest materials. Designed to perform and impress, this smartphone watch delivers a groundbreaking combination of technology and style. Downloadable apps let you customise your SmartWatch 3 SWR50 and how you use it.  Tell SmartWatch 3 SWR50 smartphone watch what you want and it will do it. Search. Command. Find.",
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
            "metaDescription": "The way you like it Whatever your lifestyle SmartWatch 3 SWR50 can be made to suit it. You can choose from a range of wrist straps—formal, sophisticated,",
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

<details>
<summary markdown='span'>Response sample: retrieve information about the abstract product with the category nodes it belongs to</summary>

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
            "self": "https://glue.mysprykershop.com/abstract-products/001?include=category-nodes"
        },
        "relationships": {
            "category-nodes": {
                "data": [
                    {
                        "type": "category-nodes",
                        "id": "4"
                    },
                    {
                        "type": "category-nodes",
                        "id": "2"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "category-nodes",
            "id": "4",
            "attributes": {
                "nodeId": 4,
                "name": "Digital Cameras",
                "metaTitle": "Digital Cameras",
                "metaKeywords": "Digital Cameras",
                "metaDescription": "Digital Cameras",
                "isActive": true,
                "order": 100,
                "url": "/en/cameras-&-camcorders/digital-cameras",
                "children": [],
                "parents": [
                    {
                        "nodeId": 2,
                        "name": "Cameras & Camcorders",
                        "metaTitle": "Cameras & Camcorders",
                        "metaKeywords": "Cameras & Camcorders",
                        "metaDescription": "Cameras & Camcorders",
                        "isActive": true,
                        "order": 90,
                        "url": "/en/cameras-&-camcorders",
                        "children": [],
                        "parents": [
                            {
                                "nodeId": 1,
                                "name": "Demoshop",
                                "metaTitle": "Demoshop",
                                "metaKeywords": "English version of Demoshop",
                                "metaDescription": "English version of Demoshop",
                                "isActive": true,
                                "order": null,
                                "url": "/en",
                                "children": [],
                                "parents": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/category-nodes/4"
            }
        },
        {
            "type": "category-nodes",
            "id": "2",
            "attributes": {
                "nodeId": 2,
                "name": "Cameras & Camcorders",
                "metaTitle": "Cameras & Camcorders",
                "metaKeywords": "Cameras & Camcorders",
                "metaDescription": "Cameras & Camcorders",
                "isActive": true,
                "order": 90,
                "url": "/en/cameras-&-camcorders",
                "children": [
                    {
                        "nodeId": 4,
                        "name": "Digital Cameras",
                        "metaTitle": "Digital Cameras",
                        "metaKeywords": "Digital Cameras",
                        "metaDescription": "Digital Cameras",
                        "isActive": true,
                        "order": 100,
                        "url": "/en/cameras-&-camcorders/digital-cameras",
                        "children": [],
                        "parents": []
                    },
                    {
                        "nodeId": 3,
                        "name": "Camcorders",
                        "metaTitle": "Camcorders",
                        "metaKeywords": "Camcorders",
                        "metaDescription": "Camcorders",
                        "isActive": true,
                        "order": 90,
                        "url": "/en/cameras-&-camcorders/camcorders",
                        "children": [],
                        "parents": []
                    }
                ],
                "parents": [
                    {
                        "nodeId": 1,
                        "name": "Demoshop",
                        "metaTitle": "Demoshop",
                        "metaKeywords": "English version of Demoshop",
                        "metaDescription": "English version of Demoshop",
                        "isActive": true,
                        "order": null,
                        "url": "/en",
                        "children": [],
                        "parents": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/category-nodes/2"
            }
        }
    ]
}
```
</details>


<details>
<summary markdown='span'>Response sample: retrieve information about the abstract product with its tax sets</summary>

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
            "self": "https://glue.mysprykershop.com/abstract-products/001?include=product-tax-sets"
        },
        "relationships": {
            "product-tax-sets": {
                "data": [
                    {
                        "type": "product-tax-sets",
                        "id": "0e93b0d4-6d83-5fc1-ac1d-d6ae11690406"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-tax-sets",
            "id": "0e93b0d4-6d83-5fc1-ac1d-d6ae11690406",
            "attributes": {
                "name": "Entertainment Electronics",
                "restTaxRates": [
                    {
                        "name": "Austria Standard",
                        "rate": "20.00",
                        "country": "AT"
                    },
                    {
                        "name": "Belgium Standard",
                        "rate": "21.00",
                        "country": "BE"
                    },
                    {
                        "name": "Bulgaria Standard",
                        "rate": "20.00",
                        "country": "BG"
                    },
                    {
                        "name": "Czech Republic Standard",
                        "rate": "21.00",
                        "country": "CZ"
                    },
                    {
                        "name": "Denmark Standard",
                        "rate": "25.00",
                        "country": "DK"
                    },
                    {
                        "name": "France Standard",
                        "rate": "20.00",
                        "country": "FR"
                    },
                    {
                        "name": "Germany Standard",
                        "rate": "19.00",
                        "country": "DE"
                    },
                    {
                        "name": "Hungary Standard",
                        "rate": "27.00",
                        "country": "HU"
                    },
                    {
                        "name": "Italy Standard",
                        "rate": "22.00",
                        "country": "IT"
                    },
                    {
                        "name": "Luxembourg Standard",
                        "rate": "17.00",
                        "country": "LU"
                    },
                    {
                        "name": "Netherlands Standard",
                        "rate": "21.00",
                        "country": "NL"
                    },
                    {
                        "name": "Poland Standard",
                        "rate": "23.00",
                        "country": "PL"
                    },
                    {
                        "name": "Romania Standard",
                        "rate": "20.00",
                        "country": "RO"
                    },
                    {
                        "name": "Slovakia Standard",
                        "rate": "20.00",
                        "country": "SK"
                    },
                    {
                        "name": "Slovenia Standard",
                        "rate": "22.00",
                        "country": "SI"
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/001/product-tax-sets"
            }
        }
    ]
}
```
</details>


<details>
<summary markdown='span'>Response sample: retrieve information about the abstract product with the assigned product labels</summary>

```json
{
    "data": {
        "type": "abstract-products",
        "id": "001",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "product-labels": {
                "data": [
                    {
                        "type": "product-labels",
                        "id": "3"
                    },
                    {
                        "type": "product-labels",
                        "id": "5"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-labels",
            "id": "3",
            "attributes": {
                "name": "Standard Label",
                "isExclusive": false,
                "position": 3,
                "frontEndReference": ""
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-labels/3"
            }
        },
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 5,
                "frontEndReference": "highlight"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-labels/5"
            }
        }
    ]
}
```
</details>


<details>
<summary markdown='span'>Response sample: retrieve information about the abstract product with its concrete products</summary>

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
            "self": "https://glue.mysprykershop.com/abstract-products/001?include=concrete-products"
        },
        "relationships": {
            "concrete-products": {
                "data": [
                    {
                        "type": "concrete-products",
                        "id": "001_25904006"
                    }
                ]
            }
        }
    },
    "included": [
        {
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
    ]
}
```
</details>


<details>
<summary markdown='span'>Response sample: retrieve information about the abstract product with its product options</summary>

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
            "self": "https://glue.mysprykershop.com/abstract-products/001?include=product-options"
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
                "self": "https://glue.mysprykershop.com/abstract-products/001/product-options/OP_insurance"
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
                "self": "https://glue.mysprykershop.com/abstract-products/001/product-options/OP_gift_wrapping"
            }
        }
    ]
}
```
</details>



<details>
<summary markdown='span'>Response sample: retrieve information about the abstract product with its product reviews</summary>

```json
{
    "data": {
        "type": "abstract-products",
        "id": "035",
        "attributes": {
            "sku": "035",
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
            "superAttributes": {
                "color": [
                    "Silver"
                ]
            },
            "attributeMap": {
                "product_concrete_ids": [
                    "035_17360369"
                ],
                "super_attributes": {
                    "color": [
                        "Silver"
                    ]
                },
                "attribute_variants": []
            },
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
            },
            "url": "/en/canon-powershot-n-35"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/abstract-products/035?include=product-reviews"
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
<summary markdown='span'>Response sample: retrieve the merchant product</summary>

```json
{
    "data": {
        "type": "abstract-products",
        "id": "109",
        "attributes": {
            "sku": "109",
            "merchantReference": "MER000001",
            "averageRating": null,
            "reviewCount": 0,
            "name": "Sony SW2 SmartWatch",
            "description": "Anywhere. Any weather SmartWatch 2 is the wireless accessory that has something for everybody. If you are a busy communicator, you will appreciate being on top of everything. If you like to get out running, you can use SmartWatch as your phone remote. If it rains, you can keep on going. SmartWatch 2 can take the rain. If it is bright and sunny, SmartWatch 2 has an impressive sunlight-readable display. Take it anywhere. When you are using a wireless Bluetooth® headset for music, you can use SmartWatch 2 as a phone remote to make or receive calls. When a call comes in, you can see who’s calling in your SmartWatch display, press once to answer and enjoy hands-free calling at its easiest. You can also browse recent calls in your call log and use SmartWatch to initiate a call.",
            "attributes": {
                "display_type": "LCD",
                "shape": "square",
                "bluetooth_version": "3",
                "battery_life": "168 h",
                "brand": "Sony",
                "color": "Black"
            },
            "superAttributesDefinition": [
                "color"
            ],
            "superAttributes": {
                "color": [
                    "Blue"
                ]
            },
            "attributeMap": {
                "product_concrete_ids": [
                    "109_19416433"
                ],
                "super_attributes": {
                    "color": [
                        "Blue"
                    ]
                },
                "attribute_variants": []
            },
            "metaTitle": "Sony SW2 SmartWatch",
            "metaKeywords": "Sony,Smart Electronics",
            "metaDescription": "Anywhere. Any weather SmartWatch 2 is the wireless accessory that has something for everybody. If you are a busy communicator, you will appreciate being on",
            "attributeNames": {
                "display_type": "Display type",
                "shape": "Shape",
                "bluetooth_version": "Blootooth version",
                "battery_life": "Battery life",
                "brand": "Brand",
                "color": "Color"
            },
            "url": "/en/sony-sw2-smartwatch-109"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/abstract-products/109"
        }
    }
}
```
</details>


<details>
<summary markdown='span'>Response sample: retrieve the marketplace product including the merchant information</summary>

```json
{
    "data": {
        "type": "abstract-products",
        "id": "109",
        "attributes": {
            "sku": "109",
            "merchantReference": "MER000001",
            "averageRating": null,
            "reviewCount": 0,
            "name": "Sony SW2 SmartWatch",
            "description": "Anywhere. Any weather SmartWatch 2 is the wireless accessory that has something for everybody. If you are a busy communicator, you will appreciate being on top of everything. If you like to get out running, you can use SmartWatch as your phone remote. If it rains, you can keep on going. SmartWatch 2 can take the rain. If it is bright and sunny, SmartWatch 2 has an impressive sunlight-readable display. Take it anywhere. When you are using a wireless Bluetooth® headset for music, you can use SmartWatch 2 as a phone remote to make or receive calls. When a call comes in, you can see who’s calling in your SmartWatch display, press once to answer and enjoy hands-free calling at its easiest. You can also browse recent calls in your call log and use SmartWatch to initiate a call.",
            "attributes": {
                "display_type": "LCD",
                "shape": "square",
                "bluetooth_version": "3",
                "battery_life": "168 h",
                "brand": "Sony",
                "color": "Black"
            },
            "superAttributesDefinition": [
                "color"
            ],
            "superAttributes": {
                "color": [
                    "Blue"
                ]
            },
            "attributeMap": {
                "product_concrete_ids": [
                    "109_19416433"
                ],
                "super_attributes": {
                    "color": [
                        "Blue"
                    ]
                },
                "attribute_variants": []
            },
            "metaTitle": "Sony SW2 SmartWatch",
            "metaKeywords": "Sony,Smart Electronics",
            "metaDescription": "Anywhere. Any weather SmartWatch 2 is the wireless accessory that has something for everybody. If you are a busy communicator, you will appreciate being on",
            "attributeNames": {
                "display_type": "Display type",
                "shape": "Shape",
                "bluetooth_version": "Blootooth version",
                "battery_life": "Battery life",
                "brand": "Brand",
                "color": "Color"
            },
            "url": "/en/sony-sw2-smartwatch-109"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/abstract-products/109"
        },
        "relationships": {
            "merchants": {
                "data": [
                    {
                        "type": "merchants",
                        "id": "MER000001"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "merchants",
            "id": "MER000001",
            "attributes": {
                "merchantName": "Spryker",
                "merchantUrl": "/en/merchant/spryker",
                "contactPersonRole": "E-Commerce Manager",
                "contactPersonTitle": "Mr",
                "contactPersonFirstName": "Harald",
                "contactPersonLastName": "Schmidt",
                "contactPersonPhone": "+49 30 208498350",
                "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-logo.png",
                "publicEmail": "info@spryker.com",
                "publicPhone": "+49 30 234567891",
                "description": "Spryker is the main merchant at the Demo Marketplace.",
                "bannerUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png",
                "deliveryTime": "1-3 days",
                "latitude": "13.384458",
                "longitude": "52.534105",
                "faxNumber": "+49 30 234567800",
                "legalInformation": {
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to let us deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
                    "imprint": "<p>Spryker Systems GmbH<br><br>Julie-Wolfthorn-Straße 1<br>10115 Berlin<br>DE<br><br>Phone: +49 (30) 2084983 50<br>Email: info@spryker.com<br><br>Represented by<br>Managing Directors: Alexander Graf, Boris Lokschin<br>Register Court: Hamburg<br>Register Number: HRB 134310<br></p>",
                    "dataPrivacy": "Spryker Systems GmbH values the privacy of your personal data."
                },
                "categories": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001"
            }
        }
    ]
}
```
</details>


{% include pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/product-options-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/product-options-response-attributes.md -->




For the attributes of other included resources, see:

* [Retrieve image sets of an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-image-sets-of-abstract-products.html)
* [Retrieve availability of an abstract product](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-availability.html)
* [Retrieve prices of an abstract product](/docs/pbc/all/price-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-prices.html)
* [Retrieve a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-concrete-products.html)
* [Retrieve a category node](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-nodes.html)
* [Retrieve tax sets](/docs/pbc/all/tax-management/{{page.version}}/base-shop/manage-using-glue-api/retrieve-tax-sets.html)
* [Retrieve a product label](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-product-labels.html)
* [Retrieve product reviews](/docs/pbc/all/ratings-reviews/{{page.version}}/manage-using-glue-api/glue-api-manage-product-reviews.html#retrieve-product-reviews)
*  [Retrieve a measurement unit](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-measurement-units.html)
*  [Retrieve merchant information](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html#merchants-response-attributes)


## Possible errors

| CODE | REASON |
| --- | --- |
| 301 |  Abstract product is not found. |
| 311 | Abstract product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
