---
title: Retrieving configurable bundle templates
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-configurable-bundle-templates
redirect_from:
  - /2021080/docs/retrieving-configurable-bundle-templates
  - /2021080/docs/en/retrieving-configurable-bundle-templates
---

This endpoint allows retrieving information about the configurable bundle templates and their slots. 

A configurable bundle doesn’t have any SKU but contains an identifier to distinguish from other elements in the system.

In your development, this resource can help you to let the customers set up the product the way they want and increase the diversity of the products sold.

## Installation 
For detailed information on the modules that provide the API functionality and related installation instructions, see:

* [Glue API: Configurable Bundle feature integration](https://documentation.spryker.com/docs/glue-api-configurable-bundle-feature-integration)
* [Glue API: Configurable Bundle + Cart feature integration](https://documentation.spryker.com/docs/glue-api-configurable-bundle-cart-feature-integration)
* [Glue API: Configurable Bundle + Product feature integration](https://documentation.spryker.com/docs/glue-api-configurable-bundle-product-feature-integration)

## Retrieve all configurable bundle templates
To retrieve all configurable bundle templates, send the request:

***

`GET` **/configurable-bundle-templates**

***

### Request
Request sample: `GET https://glue.mysprykershop.com/configurable-bundle-templates`

### Response
Response sample:

```json
{
    "data": [
        {
            "type": "configurable-bundle-templates",
            "id": "8d8510d8-59fe-5289-8a65-19f0c35a0089",
            "attributes": {
                "name": "Configurable Bundle \"All in\""
            },
            "links": {
                "self": "https://glue.mysprykershop.com/configurable-bundle-templates/8d8510d8-59fe-5289-8a65-19f0c35a0089"
            }
        },
        {
            "type": "configurable-bundle-templates",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
            "attributes": {
                "name": "Smartstation Kit"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/configurable-bundle-templates/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/configurable-bundle-templates"
    }
}
```


| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| id | String | Unique identifier of the configurable bundle template. |
| name | String | Configurable bundle template name. |

## Retrieve a configurable bundle template
To retrieve information about a specific Configurable Bundle template, send the request:

***

`GET` **/configurable-bundle-templates/*{% raw %}{{{% endraw %}template_uuid{% raw %}}}{% endraw %}***

***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}template_uuid{% raw %}}}{% endraw %}*** | Unique identifier of the Configurable Bundle template. To get it, [retrieve all configurable bundle templates](#retrieve-all-configurable-bundle-templates). |

### Request

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>configurable-bundle-template-slots</li><li>configurable-bundle-template-image-sets</li><li>concrete-products</li><li>concrete-product-prices</li><li>concrete-product-image-sets</li></ul> |


| REQUEST | USAGE |
| --- | --- |
| `https://glue.mysprykershop.com/configurable-bundle-templates/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de` | Retrieve information about the Configurable Bundle template `c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de`. |
| `https://glue.mysprykershop.com/configurable-bundle-templates/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de?include=configurable-bundle-template-slot` | Retrieve information about the Configurable Bundle template `c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de` with its slots. |
| `https://glue.mysprykershop.com/configurable-bundle-templates/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de?include=configurable-bundle-template-slots,concrete-products,concrete-product-prices,concrete-product-image-sets` | Retrieve information about the Configurable Bundle template `c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de` with its slots, concrete products defined per slot, concrete product prices and concrete product image sets. |
| `https://glue.mysprykershop.com/configurable-bundle-templates/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de?include=configurable-bundle-template-image-sets` | Retrieve information about the Configurable Bundle template `c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de with image sets`. |

<details open>
<summary>Response sample: retrieve information about a specific configurable bundle</summary>

```json
{
    "data": {
        "type": "configurable-bundle-templates",
        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
        "attributes": {
            "name": "Smartstation Kit"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/configurable-bundle-templates/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de"
        }
    }
}
```
</details>

<details open>
<summary>Response sample: retrieve informatio abjout a specific configurable bundle including configurable bundle template slots, concrete products per slot, cocrete product prices, and image sets</summary>

```json
{
    "data": {
        "type": "configurable-bundle-templates",
        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
        "attributes": {
            "name": "Smartstation Kit"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/configurable-bundle-templates/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de"
        },
        "relationships": {
            "configurable-bundle-template-slots": {
                "data": [
                    {
                        "type": "configurable-bundle-template-slots",
                        "id": "9626de80-6caa-57a9-a683-2846ec5b6914"
                    },
                    {
                        "type": "configurable-bundle-template-slots",
                        "id": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-product-image-sets",
            "id": "129_30706500",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/29554217_7377.jpg",
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/29554217_7377.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/129_30706500/concrete-product-image-sets"
            }
        },
        {
            "type": "concrete-product-prices",
            "id": "129_30706500",
            "attributes": {
                "price": 12428,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 12428,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/129_30706500/concrete-product-prices"
            }
        },
        {
            "type": "concrete-products",
            "id": "129_30706500",
            "attributes": {
                "sku": "129_30706500",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "129",
                "name": "Lenovo ThinkCenter E73",
                "description": "Eco-friendly and Energy Efficient Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology. With 10% more processing power, 4th generation Intel® Core™ processors deliver the performance to increase business productivity for your business. They can also guard against identity theft and ensure safe access to your network with built-in security features.",
                "attributes": {
                    "processor_threads": "8",
                    "processor_cores": "4",
                    "processor_codename": "Haswell",
                    "pci_express_slots_version": "3",
                    "brand": "Lenovo",
                    "processor_frequency": "3.2 GHz"
                },
                "superAttributesDefinition": [
                    "processor_frequency"
                ],
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
                "self": "https://glue.mysprykershop.com/concrete-products/129_30706500"
            },
            "relationships": {
                "concrete-product-image-sets": {
                    "data": [
                        {
                            "type": "concrete-product-image-sets",
                            "id": "129_30706500"
                        }
                    ]
                },
                "concrete-product-prices": {
                    "data": [
                        {
                            "type": "concrete-product-prices",
                            "id": "129_30706500"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-product-image-sets",
            "id": "130_29285281",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/29285281_8883.jpg",
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/29285281_8883.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.69.demo-spryker.com:80/concrete-products/130_29285281/concrete-product-image-sets"
            }
        },
        {
            "type": "concrete-product-prices",
            "id": "130_29285281",
            "attributes": {
                "price": 9002,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9002,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/130_29285281/concrete-product-prices"
            }
        },

        ...

{
            "type": "concrete-product-image-sets",
            "id": "129_24325712",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/29554217_7377.jpg",
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/29554217_7377.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/129_24325712/concrete-product-image-sets"
            }
        },
        {
            "type": "concrete-product-prices",
            "id": "129_24325712",
            "attributes": {
                "price": 33505,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 33505,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/129_24325712/concrete-product-prices"
            }
        },
    {
            "type": "concrete-products",
            "id": "129_24325712",
            "attributes": {
                "sku": "129_24325712",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "129",
                "name": "Lenovo ThinkCenter E73",
                "description": "Eco-friendly and Energy Efficient Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology. With 10% more processing power, 4th generation Intel® Core™ processors deliver the performance to increase business productivity for your business. They can also guard against identity theft and ensure safe access to your network with built-in security features.",
                "attributes": {
                    "processor_threads": "8",
                    "processor_cores": "4",
                    "processor_codename": "Haswell",
                    "pci_express_slots_version": "3",
                    "brand": "Lenovo",
                    "processor_frequency": "3 GHz"
                },
                "superAttributesDefinition": [
                    "processor_frequency"
                ],
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
                "self": "https://glue.mysprykershop.com/concrete-products/129_24325712"
            },
            "relationships": {
                "concrete-product-image-sets": {
                    "data": [
                        {
                            "type": "concrete-product-image-sets",
                            "id": "129_24325712"
                        }
                    ]
                },
                "concrete-product-prices": {
                    "data": [
                        {
                            "type": "concrete-product-prices",
                            "id": "129_24325712"
                        }
                    ]
                }
            }
        },
        {
            "type": "configurable-bundle-template-slots",
            "id": "9626de80-6caa-57a9-a683-2846ec5b6914",
            "attributes": {
                "name": "Slot 5"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/configurable-bundle-templates/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de?include=configurable-bundle-template-slots"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "129_30706500"
                        },
                        
                        ...

                        {
                            "type": "concrete-products",
                            "id": "129_24325712"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-product-image-sets",
            "id": "096_30856274",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/30856274_5420.jpg",
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/30856274_5420.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/096_30856274/concrete-product-image-sets"
            }
        },
        {
            "type": "concrete-product-prices",
            "id": "096_30856274",
            "attributes": {
                "price": 28861,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 28861,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/096_30856274/concrete-product-prices"
            }
        },
        {
            "type": "concrete-products",
            "id": "096_30856274",
            "attributes": {
                "sku": "096_30856274",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "096",
                "name": "TomTom Golf",
                "description": "One-Button Control Navigate easily through menus. Precise yardages to front, center and back of green. View unique green and hazard graphics before your shot.",
                "attributes": {
                    "protection_feature": "Water resistent",
                    "battery_type": "Built-in",
                    "touchscreen": "No",
                    "gps_satellite": "yes",
                    "brand": "TomTom",
                    "color": "Yellow"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "TomTom Golf",
                "metaKeywords": "TomTom,Smart Electronics",
                "metaDescription": "One-Button Control Navigate easily through menus. Precise yardages to front, center and back of green. View unique green and hazard graphics before your sh",
                "attributeNames": {
                    "protection_feature": "Protection feature",
                    "battery_type": "Battery type",
                    "touchscreen": "Touchscreen",
                    "gps_satellite": "GPS (satellite)",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/096_30856274"
            },
            "relationships": {
                "concrete-product-image-sets": {
                    "data": [
                        {
                            "type": "concrete-product-image-sets",
                            "id": "096_30856274"
                        }
                    ]
                },
                "concrete-product-prices": {
                    "data": [
                        {
                            "type": "concrete-product-prices",
                            "id": "096_30856274"
                        }
                    ]
                }
            }
        },
        
        ...
        
        {
            "type": "concrete-product-image-sets",
            "id": "111_12295890",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/15743_12295890-6463.jpg",
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_12295890_medium_1481715683_8105_13110.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/111_12295890/concrete-product-image-sets"
            }
        },
        {
            "type": "concrete-product-prices",
            "id": "111_12295890",
            "attributes": {
                "price": 19568,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 19568,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/111_12295890/concrete-product-prices"
            }
        },
        {
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
                "concrete-product-image-sets": {
                    "data": [
                        {
                            "type": "concrete-product-image-sets",
                            "id": "111_12295890"
                        }
                    ]
                },
                "concrete-product-prices": {
                    "data": [
                        {
                            "type": "concrete-product-prices",
                            "id": "111_12295890"
                        }
                    ]
                }
            }
        },
        {
            "type": "configurable-bundle-template-slots",
            "id": "2a5e55b1-993a-5510-864c-a4a18558aa75",
            "attributes": {
                "name": "Slot 6"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/configurable-bundle-templates/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de?include=configurable-bundle-template-slots"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "096_30856274"
                        },
                        
                        ...

                        {
                            "type": "concrete-products",
                            "id": "111_12295890"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

<details open>
<summary>Response sample: retrieve information about a specific cofigurable bundle including configurable bundle image sets</summary>

```json
{
    "data": {
        "type": "configurable-bundle-templates",
        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
        "attributes": {
            "name": "Smartstation Kit"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/configurable-bundle-templates/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de"
        },
        "relationships": {
            "configurable-bundle-template-image-sets": {
                "data": [
                    {
                        "type": "configurable-bundle-template-image-sets",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "configurable-bundle-template-image-sets",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
            "attributes": {
                "name": "default",
                "images": [
                    {
                        "externalUrlLarge": "https://d2s0ynfc62ej12.cloudfront.net/b2c/bundle_smartstation_kit.png",
                        "externalUrlSmall": "https://d2s0ynfc62ej12.cloudfront.net/b2c/bundle_smartstation_kit.png"
                    },
                    {
                        "externalUrlLarge": "https://d2s0ynfc62ej12.cloudfront.net/b2c/bundle_smartstation_kit.png",
                        "externalUrlSmall": "https://d2s0ynfc62ej12.cloudfront.net/b2c/bundle_smartstation_kit.png"
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/configurable-bundle-templates/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de?include=configurable-bundle-template-image-sets"
            }
        }
    ]
}
```
</details>


| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| id | String | Unique identifier of the configurable bundle template. |
| name | String | Configurable bundle template name. |


| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| configurable-bundle-template-slots | id | String | Unique identifier of the configurable bundle template slot. |
| configurable-bundle-template-slots | name | String | Name of the slot. |
| configurable-bundle-template-image-sets | id | String | Unique identifier of the configurable bundle template image set. |
| configurable-bundle-template-image-sets | name | String | Name of the image set. |
| configurable-bundle-template-image-sets | images | Array | 	
A list of images assigned to a configurable bundle template.  |
| configurable-bundle-template-image-sets | externalUrlLarge | String | URLs to the image per image set. |
| configurable-bundle-template-image-sets | externalUrlSmall | String | URLs to the image per image set. |

For the attributes of other included resources, see:

* [Retrieving concrete products](https://documentation.spryker.com/docs/retrieving-product-information#retrieve-concrete-products)
* [Retrieving concrete product prices](https://documentation.spryker.com/docs/retrieving-concrete-product-prices)
* [Retrieving concrete product image sets](https://documentation.spryker.com/docs/retrieving-image-sets-of-concrete-products)

## Other management options

You can use the configurable bundle resource in the following way:

* [Add a configurable bundle to a guest cart](https://documentation.spryker.com/docs/managing-guest-cart-items#add-a-configurable-bundle-to-a-guest-cart)
* [Change the quantity of the configurable bundles in a guest cart](https://documentation.spryker.com/docs/managing-guest-cart-items#change-quantity-of-configurable-bundles-in-a-guest-cart)
* [Remove a configurable bundle from a guest cart](https://documentation.spryker.com/docs/managing-guest-cart-items#remove-a-configurable-bundle-from-a-guest-cart)
* [Add a configurable bundle to a registered user’s cart](https://documentation.spryker.com/docs/managing-items-in-carts-of-registered-users#add-a-configurable-bundle-to-a-registered-user%E2%80%99s-cart)
* [Change the quantity of the configurable bundles in a registered user’s cart](https://documentation.spryker.com/docs/managing-items-in-carts-of-registered-users#change-quantity-of-configurable-bundles-in-a-registered-user%E2%80%99s-cart)
* [Remove a configurable bundle from a registered user’s cart](https://documentation.spryker.com/docs/managing-items-in-carts-of-registered-users#remove-a-configurable-bundle-from-a-registered-user%E2%80%99s-cart)
* [Checking our purchases with configurable bundles](https://documentation.spryker.com/docs/checking-out-purchases)
* [Retrieving orders with configurable bundles](https://documentation.spryker.com/docs/retrieving-orders)


