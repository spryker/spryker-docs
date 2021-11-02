---
title: Retrieving abstract products
description: Retrieve general information about abstract products and related resources.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v6/docs/retrieving-abstract-products
originalArticleId: 0c7b28da-e935-4c00-a7c4-bd403ce8b5a7
redirect_from:
  - /v6/docs/retrieving-abstract-products
  - /v6/docs/en/retrieving-abstract-products
related:
  - title: Product overview
    link: docs/scos/user/features/page.version/product-feature-overview/product-feature-overview.html
---

This endpoint allows to retrieve general information about abstract products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html)
* [Glue API: Product Options Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-options-feature-integration.html)
* [Glue API: Product Labels feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-labels-feature-integration.html)



## Retrieve an abstract product

To retrieve general information about an abstract product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}***

---


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get information for. |

### Request

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | abstract-product-prices, concrete-products, product-labels, abstract-product-image-sets, abstract-product-availabilities, category-nodes, product-tax-sets, product-options, product-reviews |
| fields | 	Filters out the fields to be retrieved.  | name, image, description |
{% info_block warningBox "Performance" %}

* For performance and bandwidth usage optimization, we recommend filtering out only the needed information using the `fields` string parameter.

* If you include more resources, you can still use the `fields` string parameter to return only the needed fields. For example, `GET http://glue.mysprykershop.com/abstract-products/001?include=concrete-products&fields[abstract-products]=name,description&fields[concrete-products]=name,image`.


{% endinfo_block %}


| Request | Usage |
| --- | --- |
| `GET http://glue.mysprykershop.com/abstract-products/001` | Retrieve information about the abstract product with SKU `001`. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=abstract-product-image-sets` | Retrieve information about the abstract product with SKU `001` with its image sets. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=abstract-product-availabilities` | Retrieve information about the abstract product with SKU `001` with its availability. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=abstract-product-prices` | Retrieve information about the abstract product with SKU `001` with its prices. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=category-nodes` | Retrieve information about the abstract product with SKU `001` with the category nodes it belongs to. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=product-tax-sets` | Retrieve information about the abstract product with SKU `001` with its tax sets. |
| `GET http://glue.mysprykershop.com/abstract-products/001?include=product-labels` | Retrieve information about the abstract product with SKU `001` with its assigned product lables. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=concrete-products` | Retrieve information about the abstract product with SKU `001` with its concrete products. |
| `GET https://glue.mysprykershop.com/abstract-products/001?include=product-options` | Retrieve information about the abstract product with SKU `001` with its product options. |
| `GET https://glue.mysprykershop.com/abstract-products/035?include=product-reviews` | Retrieve information about the abstract product with SKU `001` with its product reviews. |





### Response

<details open>
    <summary markdown='span'>Response sample</summary>
    
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
            "self": "http://glue.mysprykershop.com/abstract-products/001"
        }
    }
}
```

 </details>
 
 <details open>
    <summary markdown='span'>Response sample with image sets</summary>
    
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
 
 
 <details open>
    <summary markdown='span'>Response sample with product availability</summary>
    
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

<details open>
    <summary markdown='span'>Response sample with product prices</summary>
    
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

<details open>
    <summary markdown='span'>Response sample with category nodes</summary>
    
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


<details open>
    <summary markdown='span'>Response sample with tax rates</summary>
    
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


<details open>
    <summary markdown='span'>Response sample with product labels</summary>
    
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
                "self": "http://glue.mysprykershop.com/product-labels/3"
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
                "self": "http://glue.mysprykershop.com/product-labels/5"
            }
        }
    ]
}
```

 </details>


<details open>
    <summary markdown='span'>Response sample with concrete products</summary>
    
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


<details open>
    <summary markdown='span'>Response sample with product options</summary>
    
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

 

<details open>
    <summary markdown='span'>Response sample with product reviews</summary>
    
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








<a name="abstract-products-response-attributes"></a>

| Attribute | Type | Description |
| --- | --- | --- |
| sku | String | SKU of the abstract product |
| averageRating | String | Average rating of the product based on customer rating. |
| reviewCount | Integer | Number of reviews left by customer for this abstract product. |
| name | String | Name of the abstract product |
| description | String | Description of the abstract product |
| attributes | Object | List of attributes and their values |
| superAttributeDefinition | String[] | Attributes flagged as super attributes, that are however not relevant to distinguish between the product variants |
| attributeMap|Object|Each super attribute / value combination and the corresponding concrete product IDs are listed here|
|attributeMap.super_attributes|Object|Applicable super attribute and its values for the product variants|
|attributeMap.attribute_variants|Object|List of super attributes with the list of values|
|attributeMap.product_concrete_ids|String[]|Product IDs of the product variants|
|metaTitle|String|Meta title of the product|
|metaKeywords|String|Meta keywords of the product.|
|metaDescription|String|Meta description of the product.|
|attributeNames | Object | All non-super attribute / value combinations for the abstract product. |


| Included resource | Attribute | Type | Description |
| --- | --- | --- | --- |
| product-options | sku | String | Specifies the SKU of the product option. |
| product-options | optionName | String | Specifies the option name. |
| product-options | optionGroupName | String | Specifies the name of the group to which the option belongs. |
| product-options | price | Integer | Specifies the option price in cents. |
| product-options | currencyIsoCode | String | Specifies the ISO 4217 code of the currency in which the product option price is specified. |

For the attributes of other included resources, see:

* [Retrieve image sets of an abstract product](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/abstract-products/retrieving-image-sets-of-abstract-products.html#abstract-product-sets-response-attributes)
* [Retrieve availability of an abstract product](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/abstract-products/retrieving-abstract-product-availability.html#abstract-product-availability-response-attributes)

* [Retrieve prices of an abstract product](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/abstract-products/retrieving-abstract-product-prices.html)
* [Retrieve a concrete product](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/concrete-products/retrieving-concrete-products.html#concrete-products-response-attributes)
* [Retrieve a category node](/docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-categories/retrieving-category-nodes.html#category-nodes-response-attributes)
* [Retrieve tax sets](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/abstract-products/retrieving-tax-sets.html#tax-sets-response-attributes)
* [Retrieve a product label](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/retrieving-product-labels.html#product-labels-response-attributes)
* [Retrieve product reviews](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/managing-product-ratings-and-reviews.html#product-ratings-and-reviews-response-attributes)
*  [Retrieve a measurement unit](/docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-measurement-units.html)


## Possible errors

| Code | Meaning |
| --- | --- |
| 301 |  Abstract product is not found. |
| 311 | Abstract product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
