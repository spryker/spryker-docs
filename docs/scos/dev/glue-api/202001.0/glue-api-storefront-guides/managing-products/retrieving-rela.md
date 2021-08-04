---
title: Retrieving Related Products
originalLink: https://documentation.spryker.com/v4/docs/retrieving-related-products-201903
redirect_from:
  - /v4/docs/retrieving-related-products-201903
  - /v4/docs/en/retrieving-related-products-201903
---

Using the **Product Relations** feature, sellers can define a list of comparable or additional items for each product. You can display such items, also called Related Products, in search and in the cart together with the products selected by customers. This can help boosting the cross- and up-selling performance of the outlet.

{% info_block infoBox %}
Only [abstract](
{% endinfo_block %} products support Product Relations. For more details, see [Product Relations]().)

The Product Relations API provides REST endpoints to retrieve the related products. Using it, you can:

* Retrieve a list of related items for a specific related product;
* Get a list of related products for all items in a cart (for both guest carts and carts of registered users).

In your development, the endpoints can help you to:

* Provide comparable products on the product details pages and in search results to make it easier for customers to compare;
* Provide additional products items in a customer's cart to offer upscale variations, accessories and other additional items for products in the cart. This will help you in boosting the cart value.

{% info_block infoBox %}
To be able to use **Product Relations API**, first, you need to have the Product Relations feature integrated with your project. For details, see [Product Relation Integration](
{% endinfo_block %}.)

{% info_block infoBox %}
Different types of relations, as well as their logic, are defined on the project level and can vary depending on the project-specific implementation. The API does not define any new relations. Its task is only to present related products via REST requests.
{% endinfo_block %}

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see Product Relations API Feature Integration.

## Getting Related Items for an Abstract Product
To get related items for an abstract product, send a GET request to the following endpoint:
`/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/related-products`
Sample request: `GET http://mysprykershop.com/abstract-products/122/related-products`
where `122` is the SKU of the abstract product you need relations for.

### Response
If the request was successful, the resource responds with an array of **RestAbstractProductsResponse**, where each item specifies a related product.

#### Response Fields

For a detailed list of the fields included in the response for each product, see [General Product Information]().

<details open>
<summary>Sample Response </summary>

```js
    {
  "data": [
    {
      "type": "abstract-products",
      "id": "128",
      "attributes": {
        "sku": "128",
        "name": "Lenovo ThinkCentre E73",
        "description": "",

        "superAttributesDefinition": [
          "internal_memory"
        ],
        "superAttributes": {
          "processor_frequency": [
            "3.6 GHz",
            "3.2 GHz"
          ]
        },
        "attributeMap": {
          "attribute_variants": {
            "processor_frequency:3.6 GHz": {
              "id_product_concrete": "128_27314278"
            },
            "processor_frequency:3.2 GHz": {
              "id_product_concrete": "128_29955336"
            }
          },
          "super_attributes": {
            "processor_frequency": [
              "3.6 GHz",
              "3.2 GHz"
            ]
          },
          "product_concrete_ids": [
            "128_29955336",
            "128_27314278"
          ]
        },
        "metaTitle": "Lenovo ThinkCentre E73",
        "metaKeywords": "Lenovo,Tax Exempt",
        "metaDescription": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep",
        "attributeNames": {
          "processor_threads": "Processor Threads",
          "pci_express_slots_version": "PCI Express slots version",
          "internal_memory": "Max internal memory",
          "stepping": "Stepping",
          "brand": "Brand",
          "processor_frequency": "Processor frequency"
        }
      },
      "links": {
        "self": "http://mysprykershop.com/abstract-products/128"
      }
    },
    {
      "type": "abstract-products",
      "id": "129",
      "attributes": {
        "sku": "129",
        "name": "Lenovo ThinkCenter E73",
        "description": "Eco-friendly and Energy Efficient Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology. With 10% more processing power, 4th generation Intel® Core™ processors deliver the performance to increase business productivity for your business. They can also guard against identity theft and ensure safe access to your network with built-in security features.",
        "attributes": {
          "processor_threads": "8",
          "processor_cores": "4",
          "processor_codename": "Haswell",
          "pci_express_slots_version": "3",
          "brand": "Lenovo"
        },
        "superAttributesDefinition": [],
        "superAttributes": {
          "processor_frequency": [
            "3 GHz",
            "3.6 GHz",
            "3.2 GHz"
          ]
        },
        "attributeMap": {
          "attribute_variants": {
            "processor_frequency:3 GHz": {
              "id_product_concrete": "129_24325712"
            },
            "processor_frequency:3.6 GHz": {
              "id_product_concrete": "129_27107297"
            },
            "processor_frequency:3.2 GHz": {
              "id_product_concrete": "129_30706500"
            }
          },
          "super_attributes": {
            "processor_frequency": [
              "3 GHz",
              "3.6 GHz",
              "3.2 GHz"
            ]
          },
          "product_concrete_ids": [
            "129_30706500",
            "129_27107297",
            "129_24325712"
          ]
        },
        "metaTitle": "Lenovo ThinkCenter E73",
        "metaKeywords": "Lenovo,Tax Exempt",
        "metaDescription": "Eco-friendly and Energy Efficient Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is",
        "attributeNames": {
          "processor_threads": "Processor Threads",
          "processor_cores": "Processor cores",
          "processor_codename": "Processor codename",
          "pci_express_slots_version": "PCI Express slots version",
          "brand": "Brand",
          "processor_frequency": "Processor frequency"
        }
      },
      "links": {
        "self": "http://mysprykershop.com/abstract-products/129"
      }
    },
    {
      "type": "abstract-products",
      "id": "130",
      "attributes": {
        "sku": "130",
        "name": "Lenovo ThinkStation P300",
        "description": "Optional Flex Module The innovative Flex Module lets you customize I/O ports, so you add only what you need. With the 2 available 5.25\" bays on the P300 Tower, you can mix and match components including an ultraslim ODD, 29-in-1 media card reader, Firewire, and eSATA – up to 8 configurations among an ODD, HDD, and Flex Module. We've redesigned our ThinkStations. No more bulky handles, just a clean-looking, functional design. An extended lip on the top lid that includes a red touch point, combined with a ledge on the back-side, make the P300 exceptionally easy to lift and carry. The P300 workstation features a 15-month life cycle with no planned hardware changes that affect the preloaded software image. Image stability for long-term deployments helps to reduce transition, qualification, and testing costs to ensure savings for your business.",
        "attributes": {
          "processor_cores": "4",
          "processor_threads": "8",
          "bus_type": "DMI",
          "stepping": "C0",
          "brand": "Lenovo"
        },
        "superAttributesDefinition": [],
        "superAttributes": {
          "processor_frequency": [
            "3.5 GHz",
            "3.3 GHz",
            "3.6 GHz"
          ]
        },
        "attributeMap": {
          "attribute_variants": {
            "processor_frequency:3.5 GHz": {
              "id_product_concrete": "130_24725761"
            },
            "processor_frequency:3.3 GHz": {
              "id_product_concrete": "130_24326086"
            },
            "processor_frequency:3.6 GHz": {
              "id_product_concrete": "130_29285281"
            }
          },
          "super_attributes": {
            "processor_frequency": [
              "3.5 GHz",
              "3.3 GHz",
              "3.6 GHz"
            ]
          },
          "product_concrete_ids": [
            "130_29285281",
            "130_24326086",
            "130_24725761"
          ]
        },
        "metaTitle": "Lenovo ThinkStation P300",
        "metaKeywords": "Lenovo,Tax Exempt",
        "metaDescription": "Optional Flex Module The innovative Flex Module lets you customize I/O ports, so you add only what you need. With the 2 available 5.25\" bays on the P300 To",
        "attributeNames": {
          "processor_cores": "Processor cores",
          "processor_threads": "Processor Threads",
          "bus_type": "Bus type",
          "stepping": "Stepping",
          "brand": "Brand",
          "processor_frequency": "Processor frequency"
        }
      },
      "links": {
        "self": "http://mysprykershop.com/abstract-products/130"
      }
    },
    {
      "type": "abstract-products",
      "id": "131",
      "attributes": {
        "sku": "131",
        "name": "Lenovo ThinkStation P900",
        "description": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on — and a direct cooling air baffle directs fresh air into the CPU and memory. ThinkStation P900 delivers new technologies and design to keep your workstation cool and quiet. The innovative Flex Module lets you customize I/O ports, so you add only what you need. Using the 5.25\" bays, you can mix and match components including an ultraslim ODD, 29-in-1 media card reader, Firewire, and eSATA. The Flex Connector is a mezzanine card that fits into the motherboard and allows for expanded storage and I/O, without sacrificing the use of rear PCI. It supports SATA/SAS/PCIe advanced RAID solution. ThinkStation P900 includes two available connectors (enabled with each CPU).",
        "attributes": {
          "processor_frequency": "2.4 GHz",
          "processor_cores": "6",
          "processor_threads": "12",
          "stepping": "R2",
          "brand": "Lenovo",
          "color": "Black"
        },
        "superAttributesDefinition": [
          "processor_frequency",
          "color"
        ],
        "superAttributes": [],
        "attributeMap": {
          "attribute_variants": [],
          "super_attributes": [],
          "product_concrete_ids": [
            "131_24872891"
          ]
        },
        "metaTitle": "Lenovo ThinkStation P900",
        "metaKeywords": "Lenovo,Tax Exempt",
        "metaDescription": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on — an",
        "attributeNames": {
          "processor_frequency": "Processor frequency",
          "processor_cores": "Processor cores",
          "processor_threads": "Processor Threads",
          "stepping": "Stepping",
          "brand": "Brand",
          "color": "Color"
        }
      },
      "links": {
        "self": "http://glue.de.suite-split-released.local/abstract-products/131"
      }
    }
  ],
  "links": {
    "self": "http://mysprykershop.com/abstract-products/122/related-products"
  }
}
```
</details>

{% info_block infoBox %}
You can also use the Accept-Language header to specify the locale.<br>Sample header:```[{"key":"Accept-Language","value":"de, en;q=0.9"}]```where de and en are the locales; q=0.9 is the user's preference for a specific locale. For details, see 14.4 Accept-Language.
{% endinfo_block %}

### Possible Errors
| Code | Reason |
| --- | --- |
| 400 | Abstract product ID not specified |
| 404 | Abstract product not found |

## Getting Up-Selling Products for a Registered User's Cart
To get up-selling items for all products in a cart of a registered customer, send a GET request to the following endpoint:
`/carts/{% raw %}{{{% endraw %}cart_id{% raw %}}}{% endraw %}/up-selling-products`
Sample request: `GET http://mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/up-selling-products`
where `1ce91011-8d60-59ef-9fe0-4493ef3628b2` is the ID of the cart you need items for.

{% info_block infoBox %}
For details on peculiarities of managing carts of registered users, see **Managing Carts of Registered Users**.
{% endinfo_block %}

### Response
If the request was successful, the resource responds with an array of **RestAbstractProductsResponse**, where each item specifies a related up-selling item.

#### Response Fields

For a detailed list of the fields included in the response for each product, see **General Product Information**.

<details open>
<summary> Sample Response</summary>

```js
{
    "data": [
        {
            "type": "abstract-products",
            "id": "014",
            "attributes": {
                "sku": "014",
                "name": "Canon IXUS 177",
                "description": "Stunning images with ease  Easily shoot fantastic photos or movies with Smart Auto, which chooses the perfect camera settings for you – whatever the scene. All you have to do is point and shoot. Use the Help Button for quick, easy-to-follow guidance on using your camera and its functions. Effortlessly enjoy great shots of friends thanks to Face Detection technology. It detects multiple faces in a single frame making sure they remain in focus and with optimum brightness. Face Detection also ensures natural skin tones even in unusual lighting conditions. Experiment and have fun with a range of Creative Filters. You can re-create the distortion of a fish-eye lens, make scenes in stills or movies look like miniature scale models and much more.a",
                "attributes": {
                    "megapixel": "20 MP",
                    "display": "LCD",
                    "photo_effects": "Vivid",
                    "field_of_view": "100%",
                    "brand": "Canon",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": [],
                "attributeMap": {
                    "attribute_variants": [],
                    "super_attributes": [],
                    "product_concrete_ids": [
                        "014_25919241"
                    ]
                },
                "metaTitle": "Canon IXUS 177",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Stunning images with ease  Easily shoot fantastic photos or movies with Smart Auto, which chooses the perfect camera settings for you – whatever the scene.",
                "attributeNames": []
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/014"
            },
            "relationships": {
                "abstract-product-image-sets": {
                    "data": [
                        {
                            "type": "abstract-product-image-sets",
                            "id": "014"
                        }
                    ]
                },
                "abstract-product-availabilities": {
                    "data": [
                        {
                            "type": "abstract-product-availabilities",
                            "id": "014"
                        }
                    ]
                },
                "abstract-product-prices": {
                    "data": [
                        {
                            "type": "abstract-product-prices",
                            "id": "014"
                        }
                    ]
                },
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
                },
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
        {
            "type": "abstract-products",
            "id": "015",
            "attributes": {
                "sku": "015",
                "name": "Canon IXUS 177",
                "description": "Stunning images with ease  Easily shoot fantastic photos or movies with Smart Auto, which chooses the perfect camera settings for you – whatever the scene. All you have to do is point and shoot. Use the Help Button for quick, easy-to-follow guidance on using your camera and its functions. Effortlessly enjoy great shots of friends thanks to Face Detection technology. It detects multiple faces in a single frame making sure they remain in focus and with optimum brightness. Face Detection also ensures natural skin tones even in unusual lighting conditions. Experiment and have fun with a range of Creative Filters. You can re-create the distortion of a fish-eye lens, make scenes in stills or movies look like miniature scale models and much more.a",
                "attributes": {
                    "megapixel": "20 MP",
                    "display": "LCD",
                    "photo_effects": "Vivid",
                    "field_of_view": "100%",
                    "brand": "Canon",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": [],
                "attributeMap": {
                    "attribute_variants": [],
                    "super_attributes": [],
                    "product_concrete_ids": [
                        "015_25904009"
                    ]
                },
                "metaTitle": "Canon IXUS 177",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Stunning images with ease  Easily shoot fantastic photos or movies with Smart Auto, which chooses the perfect camera settings for you – whatever the scene.",
                "attributeNames": []
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/015"
            },
            "relationships": {
                "abstract-product-image-sets": {
                    "data": [
                        {
                            "type": "abstract-product-image-sets",
                            "id": "015"
                        }
                    ]
                },
                "abstract-product-availabilities": {
                    "data": [
                        {
                            "type": "abstract-product-availabilities",
                            "id": "015"
                        }
                    ]
                },
                "abstract-product-prices": {
                    "data": [
                        {
                            "type": "abstract-product-prices",
                            "id": "015"
                        }
                    ]
                },
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
                },
                "product-tax-sets": {
                    "data": [
                        {
                            "type": "product-tax-sets",
                            "id": "0e93b0d4-6d83-5fc1-ac1d-d6ae11690406"
                        }
                    ]
                },
                "product-labels": {
                    "data": [
                        {
                            "type": "product-labels",
                            "id": "5"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://mysprykershop.com/guest-carts/0d691c40-2a56-5b80-9ed5-af366a66c6ef/up-selling-products"
    },
    "included": [
        {
            "type": "abstract-product-image-sets",
            "id": "004",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/gallery/30663302_6177.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/gallery_mediums/30663302_6177.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/004/abstract-product-image-sets"
            }
        },
        {
            "type": "abstract-product-availabilities",
            "id": "004",
            "attributes": {
                "availability": true,
                "quantity": 10
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/004/abstract-product-availabilities"
            }
        },
        {
            "type": "abstract-product-prices",
            "id": "004",
            "attributes": {
                "price": 7000,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 7000,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/004/abstract-product-prices"
            }
        },
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
                "children": [],
                "parents": [
                    {
                        "nodeId": 2,
                        "name": "Cameras & Camcorders",
                        "metaTitle": "Cameras & Camcorders",
                        "metaKeywords": "Cameras & Camcorders",
                        "metaDescription": "Cameras & Camcorders",
                        "isActive": true,
                        "children": [],
                        "parents": [
                            {
                                "nodeId": 1,
                                "name": "Demoshop",
                                "metaTitle": "Demoshop",
                                "metaKeywords": "English version of Demoshop",
                                "metaDescription": "English version of Demoshop",
                                "isActive": true,
                                "children": [],
                                "parents": [],
                                "order": null
                            }
                        ],
                        "order": 90
                    }
                ],
                "order": 100
            },
            "links": {
                "self": "http://mysprykershop.com/category-nodes/4"
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
                "children": [
                    {
                        "nodeId": 4,
                        "name": "Digital Cameras",
                        "metaTitle": "Digital Cameras",
                        "metaKeywords": "Digital Cameras",
                        "metaDescription": "Digital Cameras",
                        "isActive": true,
                        "children": [],
                        "parents": [],
                        "order": 100
                    },
                    {
                        "nodeId": 3,
                        "name": "Camcorders",
                        "metaTitle": "Camcorders",
                        "metaKeywords": "Camcorders",
                        "metaDescription": "Camcorders",
                        "isActive": true,
                        "children": [],
                        "parents": [],
                        "order": 90
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
                        "children": [],
                        "parents": [],
                        "order": null
                    }
                ],
                "order": 90
            },
            "links": {
                "self": "http://mysprykershop.com/category-nodes/2"
            }
        },
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
                "self": "http://mysprykershop.com/abstract-products/015/product-tax-sets"
            }
        },
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
                "self": "http://mysprykershop.com/product-labels/3"
            }
        },
        {
            "type": "abstract-product-image-sets",
            "id": "005",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/gallery/30663301_9631.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/gallery_mediums/30663301_9631.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/005/abstract-product-image-sets"
            }
        },
        {
            "type": "abstract-product-availabilities",
            "id": "005",
            "attributes": {
                "availability": true,
                "quantity": 10
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/005/abstract-product-availabilities"
            }
        },
        {
            "type": "abstract-product-prices",
            "id": "005",
            "attributes": {
                "price": 7000,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 7000,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/005/abstract-product-prices"
            }
        },
        {
            "type": "abstract-product-image-sets",
            "id": "006",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/gallery/30692993_5119.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/gallery_mediums/30692993_5119.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/006/abstract-product-image-sets"
            }
        },
        {
            "type": "abstract-product-availabilities",
            "id": "006",
            "attributes": {
                "availability": true,
                "quantity": 10
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/006/abstract-product-availabilities"
            }
        },
        {
            "type": "abstract-product-prices",
            "id": "006",
            "attributes": {
                "price": 34500,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 34500,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 34800,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/006/abstract-product-prices"
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
                "self": "http://mysprykershop.com/product-labels/5"
            }
        },
        {
            "type": "abstract-product-image-sets",
            "id": "007",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/gallery/30691822_1486.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/gallery_mediums/30691822_1486.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/007/abstract-product-image-sets"
            }
        },
        {
            "type": "abstract-product-availabilities",
            "id": "007",
            "attributes": {
                "availability": true,
                "quantity": 10
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/007/abstract-product-availabilities"
            }
        },
        {
            "type": "abstract-product-prices",
            "id": "007",
            "attributes": {
                "price": 34500,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 34500,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/007/abstract-product-prices"
            }
        },
        {
            "type": "abstract-product-image-sets",
            "id": "008",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/gallery/30692992_1205.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/gallery_mediums/30692992_1205.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/008/abstract-product-image-sets"
            }
        },
        {
            "type": "abstract-product-availabilities",
            "id": "008",
            "attributes": {
                "availability": true,
                "quantity": 10
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/008/abstract-product-availabilities"
            }
        },
        {
            "type": "abstract-product-prices",
            "id": "008",
            "attributes": {
                "price": 34500,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 34500,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/008/abstract-product-prices"
            }
        },
        {
            "type": "abstract-product-image-sets",
            "id": "009",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/gallery/30692991_9278.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/gallery_mediums/30692991_9278.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/009/abstract-product-image-sets"
            }
        },
        {
            "type": "abstract-product-availabilities",
            "id": "009",
            "attributes": {
                "availability": true,
                "quantity": 10
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/009/abstract-product-availabilities"
            }
        },
        {
            "type": "abstract-product-prices",
            "id": "009",
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
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/009/abstract-product-prices"
            }
        },
        {
            "type": "abstract-product-image-sets",
            "id": "010",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/gallery/30692994_4933.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/gallery_mediums/30692994_4933.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/010/abstract-product-image-sets"
            }
        },
        {
            "type": "abstract-product-availabilities",
            "id": "010",
            "attributes": {
                "availability": true,
                "quantity": 10
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/010/abstract-product-availabilities"
            }
        },
        {
            "type": "abstract-product-prices",
            "id": "010",
            "attributes": {
                "price": 34600,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 34600,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 35600,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/010/abstract-product-prices"
            }
        },
        {
            "type": "abstract-product-image-sets",
            "id": "011",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/gallery/30775359_2536.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/gallery_mediums/30775359_2536.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/011/abstract-product-image-sets"
            }
        },
        {
            "type": "abstract-product-availabilities",
            "id": "011",
            "attributes": {
                "availability": true,
                "quantity": 10
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/011/abstract-product-availabilities"
            }
        },
        {
            "type": "abstract-product-prices",
            "id": "011",
            "attributes": {
                "price": 36600,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 36600,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/011/abstract-product-prices"
            }
        },
        {
            "type": "abstract-product-image-sets",
            "id": "012",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/gallery/25904598_3791.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/gallery_mediums/25904598_3791.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/012/abstract-product-image-sets"
            }
        },
        {
            "type": "abstract-product-availabilities",
            "id": "012",
            "attributes": {
                "availability": true,
                "quantity": 10
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/012/abstract-product-availabilities"
            }
        },
        {
            "type": "abstract-product-prices",
            "id": "012",
            "attributes": {
                "price": 36600,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 36600,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/012/abstract-product-prices"
            }
        },
        {
            "type": "abstract-product-image-sets",
            "id": "013",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/norm/high/25904584-3409.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/norm/medium/25904584-3409.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/013/abstract-product-image-sets"
            }
        },
        {
            "type": "abstract-product-availabilities",
            "id": "013",
            "attributes": {
                "availability": true,
                "quantity": 10
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/013/abstract-product-availabilities"
            }
        },
        {
            "type": "abstract-product-prices",
            "id": "013",
            "attributes": {
                "price": 5699,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 5699,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/013/abstract-product-prices"
            }
        },
        {
            "type": "abstract-product-image-sets",
            "id": "014",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/gallery/25919241_0663.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/gallery_mediums/25919241_0663.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/014/abstract-product-image-sets"
            }
        },
        {
            "type": "abstract-product-availabilities",
            "id": "014",
            "attributes": {
                "availability": true,
                "quantity": 10
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/014/abstract-product-availabilities"
            }
        },
        {
            "type": "abstract-product-prices",
            "id": "014",
            "attributes": {
                "price": 4579,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 4579,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/014/abstract-product-prices"
            }
        },
        {
            "type": "abstract-product-image-sets",
            "id": "015",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/norm/high/25904009-6055.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/norm/medium/25904009-6055.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/015/abstract-product-image-sets"
            }
        },
        {
            "type": "abstract-product-availabilities",
            "id": "015",
            "attributes": {
                "availability": true,
                "quantity": 10
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/015/abstract-product-availabilities"
            }
        },
        {
            "type": "abstract-product-prices",
            "id": "015",
            "attributes": {
                "price": 6000,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 6000,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 8000,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/015/abstract-product-prices"
            }
        }
    ]
}
```
<br>
</details>

{% info_block infoBox %}
You can also use the **Accept-Language** header to specify the locale.<br>Sample header:<br>`[{"key":"Accept-Language","value":"de, en;q=0.9"}]`<br>where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](
{% endinfo_block %}.)

### Possible Errors
| Code | Reason |
| --- | --- |
| 400 | Cart ID is missing |
| 404 | A cart with the specified ID was not found |

## Getting Up-Selling Products for a Guest Cart
To get up-selling items for products in a guest cart, send a GET request to the following endpoint:
`/guest-carts/{% raw %}{{{% endraw %}cart_id{% raw %}}}{% endraw %}/up-selling-products`
Sample request: `GET http://mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/up-selling-products`
where `1ce91011-8d60-59ef-9fe0-4493ef3628b2` is the ID of the guest cart you need items for.

Your request must specify a unique identifier of the **guest user** in the **X-Anonymous-Customer-Unique-Id** header.

{% info_block infoBox %}
For details on how to retrieve and manage the identifier, see [Managing Guest Carts](
{% endinfo_block %}.)

### Response
If the request was successful, the resource responds with an array of **RestAbstractProductsResponse**, where each item specifies a related up-selling item.

#### Response Fields

For a detailed list of the fields included in the response for each product, see [General Product Information]().

<details open>
<summary>Sample Response </summary>

```js
{
    "data": [
        {
            "type": "abstract-products",
            "id": "138",
            "attributes": {
                "sku": "138",
                "name": "Acer TravelMate P258-M",
                "description": "Tactile textile The P2 series now comes with a fine linen textile pattern embossed on the outer covers. This lends a professional refined look and feel to the line that adds distinction to functionality. There are also practical benefits, as the pattern makes it a bit easier to keep a firm grip on the go, while also resisting scratches. The TravelMate P2 Series is certified to deliver the high audio and visual standards of Skype for Business1. Optimised hardware ensures that every word will be heard clearly with no gap or lag in speech, minimal background noise and zero echo. That means you can call or video chat with superior audio and visual quality. The TravelMate P2 is packed with features that make it easier to do business. Work faster with smoother gestures on the large Precision Touchpad. Quickly share business contacts with a smartphone via Contact Pickup. Log in to the TravelMate P2 faster thanks to Face Login.\t",
                "attributes": {
                    "form_factor": "clamshell",
                    "processor_cache": "3 MB",
                    "stepping": "D1",
                    "brand": "Acer",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "form_factor",
                    "processor_cache",
                    "color"
                ],
                "superAttributes": {
                    "processor_frequency": [
                        "3.1 GHz",
                        "2.8 GHz"
                    ]
                },
                "attributeMap": {
                    "attribute_variants": {
                        "processor_frequency:3.1 GHz": {
                            "id_product_concrete": "138_30657838"
                        },
                        "processor_frequency:2.8 GHz": {
                            "id_product_concrete": "138_30046855"
                        }
                    },
                    "super_attributes": {
                        "processor_frequency": [
                            "3.1 GHz",
                            "2.8 GHz"
                        ]
                    },
                    "product_concrete_ids": [
                        "138_30046855",
                        "138_30657838"
                    ]
                },
                "metaTitle": "Acer TravelMate P258-M",
                "metaKeywords": "Acer,Entertainment Electronics",
                "metaDescription": "Tactile textile The P2 series now comes with a fine linen textile pattern embossed on the outer covers. This lends a professional refined look and feel to",
                "attributeNames": {
                    "form_factor": "Form factor",
                    "processor_cache": "Processor cache type",
                    "stepping": "Stepping",
                    "brand": "Brand",
                    "color": "Color",
                    "processor_frequency": "Processor frequency"
                }
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/138"
            }
        },
        {
            "type": "abstract-products",
            "id": "042",
            "attributes": {
                "sku": "042",
                "name": "Samsung Galaxy S7",
                "description": "Smart Design The beauty of what we've engineered is to give you the slimmest feel in your hand without compromising the big screen size. The elegantly curved front and back fit in your palm just right. It's as beautiful to look at as it is to use. We spent a long time perfecting the curves of the Galaxy S7 edge and S7. Using a proprietary process called 3D Thermoforming, we melted 3D glass to curve with such precision that it meets the curved metal alloy to create an exquisitely seamless and strong unibody. The dual-curve backs on the Galaxy S7 edge and S7 are the reason why they feel so comfortable when you hold them. Everything about the design, from the naturally flowing lines to the thin form factor, come together to deliver a grip that's so satisfying, you won't want to let go.",
                "attributes": {
                    "usb_version": "2",
                    "os_version": "6",
                    "max_memory_card_size": "200 GB",
                    "weight": "152 g",
                    "brand": "Samsung",
                    "color": "Gold"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": [],
                "attributeMap": {
                    "attribute_variants": [],
                    "super_attributes": [],
                    "product_concrete_ids": [
                        "042_31040075"
                    ]
                },
                "metaTitle": "Samsung Galaxy S7",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Smart Design The beauty of what we've engineered is to give you the slimmest feel in your hand without compromising the big screen size. The elegantly curv",
                "attributeNames": {
                    "usb_version": "USB version",
                    "os_version": "OS version",
                    "max_memory_card_size": "Max memory card size",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/042"
            }
        },
        {
            "type": "abstract-products",
            "id": "043",
            "attributes": {
                "sku": "043",
                "name": "Samsung Galaxy S7",
                "description": "Smart Design The beauty of what we've engineered is to give you the slimmest feel in your hand without compromising the big screen size. The elegantly curved front and back fit in your palm just right. It's as beautiful to look at as it is to use. We spent a long time perfecting the curves of the Galaxy S7 edge and S7. Using a proprietary process called 3D Thermoforming, we melted 3D glass to curve with such precision that it meets the curved metal alloy to create an exquisitely seamless and strong unibody. The dual-curve backs on the Galaxy S7 edge and S7 are the reason why they feel so comfortable when you hold them. Everything about the design, from the naturally flowing lines to the thin form factor, come together to deliver a grip that's so satisfying, you won't want to let go.",
                "attributes": {
                    "usb_version": "2",
                    "os_version": "6",
                    "max_memory_card_size": "200 GB",
                    "weight": "152 g",
                    "brand": "Samsung",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": [],
                "attributeMap": {
                    "attribute_variants": [],
                    "super_attributes": [],
                    "product_concrete_ids": [
                        "043_31040074"
                    ]
                },
                "metaTitle": "Samsung Galaxy S7",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Smart Design The beauty of what we've engineered is to give you the slimmest feel in your hand without compromising the big screen size. The elegantly curv",
                "attributeNames": {
                    "usb_version": "USB version",
                    "os_version": "OS version",
                    "max_memory_card_size": "Max memory card size",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/043"
            }
        },
        {
            "type": "abstract-products",
            "id": "044",
            "attributes": {
                "sku": "044",
                "name": "Samsung Galaxy S7",
                "description": "Smart Design The beauty of what we've engineered is to give you the slimmest feel in your hand without compromising the big screen size. The elegantly curved front and back fit in your palm just right. It's as beautiful to look at as it is to use. We spent a long time perfecting the curves of the Galaxy S7 edge and S7. Using a proprietary process called 3D Thermoforming, we melted 3D glass to curve with such precision that it meets the curved metal alloy to create an exquisitely seamless and strong unibody. The dual-curve backs on the Galaxy S7 edge and S7 are the reason why they feel so comfortable when you hold them. Everything about the design, from the naturally flowing lines to the thin form factor, come together to deliver a grip that's so satisfying, you won't want to let go.",
                "attributes": {
                    "usb_version": "2",
                    "os_version": "6",
                    "max_memory_card_size": "200 GB",
                    "weight": "152 g",
                    "brand": "Samsung",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": [],
                "attributeMap": {
                    "attribute_variants": [],
                    "super_attributes": [],
                    "product_concrete_ids": [
                        "044_31040076"
                    ]
                },
                "metaTitle": "Samsung Galaxy S7",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Smart Design The beauty of what we've engineered is to give you the slimmest feel in your hand without compromising the big screen size. The elegantly curv",
                "attributeNames": {
                    "usb_version": "USB version",
                    "os_version": "OS version",
                    "max_memory_card_size": "Max memory card size",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/044"
            }
        }
    ],
    "links": {
        "self": "http://mysprykershop.com/guest-carts/6a721c99-03d1-5c4d-8f1b-2c33ae57762a/up-selling-products"
    }
}
```
<br>
</details>

{% info_block infoBox %}
You can also use the **Accept-Language** header to specify the locale.<br>Sample header:<br>`[{"key":"Accept-Language","value":"de, en;q=0.9"}]`<br>where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](
{% endinfo_block %}.)

### Possible Errors
| Code | Reason |
| --- | --- |
| 400 | Cart ID is missing |
| 404 | A cart with the specified ID was not found |
