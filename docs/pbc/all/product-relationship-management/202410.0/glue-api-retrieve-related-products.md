---
title: "Glue API: Retrieve related products"
description: The article demonstrates how to find alternatives for discontinued products with the help of Glue API endpoints.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-related-products
originalArticleId: db6deab2-f115-4802-a989-c594cebc6120
related:
  - title: Retrieving alternative products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-alternative-products.html
  - title: Product Relations feature overview
    link: docs/pbc/all/product-relationship-management/page.version/product-relationship-management.html
redirect_from:
- /docs/scos/dev/glue-api-guides/202204.0/retrieve-related-products.html
---

Using the [Product Relations](/docs/pbc/all/product-relationship-management/{{page.version}}/product-relationship-management.html) feature, sellers can define a list of comparable or additional items for each product. You can display such items, also called related products, in search and in the cart together with the products selected by customers.

Only [abstract](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) products support product relations. For more details, see [Product Relations feature overview](/docs/pbc/all/product-relationship-management/{{page.version}}/product-relationship-management.html).

The Product Relations API provides REST endpoints to retrieve the related products. Using it, you can:
* Retrieve related products of an abstract product.
* Retrieve related products of the items in guest carts and carts of registered users.

In your development, the endpoints can help you to:
* Provide comparable products on the product details pages and in search results to make it easier for customers to compare.
* Provide additional product items in a customer's cart to offer upscale variations, accessories, and other additional items for products in the cart.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Product Relations Glue API](/docs/pbc/all/product-relationship-management/{{page.version}}/install-and-upgrade/install-the-product-relations-glue-api.html).

## Retrieve related items of an abstract product

To get related items of an abstract product, send the request:

***
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/related-products**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to retrieve related products of. |

### Request

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | product-labels |

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/abstract-products/122/related-products` | Retrieve related products of the specified product. |
| `GET https://glue.mysprykershop.com/abstract-products/122/related-products?include=product-labels` | Retrieve related products of the specified product. Product labels assigned to the related products are included. |

### Response

<details>
<summary>Response sample: retrieve related items of an abstract product</summary>

```json
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
        "description": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on—and a direct cooling air baffle directs fresh air into the CPU and memory. ThinkStation P900 delivers new technologies and design to keep your workstation cool and quiet. The innovative Flex Module lets you customize I/O ports, so you add only what you need. Using the 5.25\" bays, you can mix and match components including an ultraslim ODD, 29-in-1 media card reader, Firewire, and eSATA. The Flex Connector is a mezzanine card that fits into the motherboard and allows for expanded storage and I/O, without sacrificing the use of rear PCI. It supports SATA/SAS/PCIe advanced RAID solution. ThinkStation P900 includes two available connectors (enabled with each CPU).",
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
        "metaDescription": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on—an",
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


<details>
<summary>Response sample: retrieve related items of an abstract product with the details on the product labels</summary>

```json
 {
    "data": [
        {
            "type": "abstract-products",
            "id": "128",
            "attributes": {
                "sku": "128",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Lenovo ThinkCentre E73",
                "description": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep your business-critical information safe through USB port disablement and the password-protected BIOS and HDD. You can also safeguard your hardware by physically securing your mouse and keyboard, while the Kensington slot enables you to lock down your E73. Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology.",
                "attributes": {
                    "processor_threads": "8",
                    "pci_express_slots_version": "3",
                    "internal_memory": "8 GB",
                    "stepping": "C0",
                    "brand": "Lenovo"
                },
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
                    "product_concrete_ids": [
                        "128_29955336",
                        "128_27314278"
                    ],
                    "super_attributes": {
                        "processor_frequency": [
                            "3.6 GHz",
                            "3.2 GHz"
                        ]
                    },
                    "attribute_variants": {
                        "processor_frequency:3.6 GHz": {
                            "id_product_concrete": "128_27314278"
                        },
                        "processor_frequency:3.2 GHz": {
                            "id_product_concrete": "128_29955336"
                        }
                    }
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
                },
                "url": "/en/lenovo-thinkcentre-e73-128"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/128"
            },
            "relationships": {
                "product-labels": {
                    "data": [
                        {
                            "type": "product-labels",
                            "id": "5"
                        }
                    ]
                }
            }
        },
        {
            "type": "abstract-products",
            "id": "129",
            "attributes": {
                "sku": "129",
                "averageRating": null,
                "reviewCount": 0,
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
                    "product_concrete_ids": [
                        "129_30706500",
                        "129_27107297",
                        "129_24325712"
                    ],
                    "super_attributes": {
                        "processor_frequency": [
                            "3 GHz",
                            "3.6 GHz",
                            "3.2 GHz"
                        ]
                    },
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
                    }
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
                },
                "url": "/en/lenovo-thinkcenter-e73-129"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/129"
            }
        },
        {
            "type": "abstract-products",
            "id": "130",
            "attributes": {
                "sku": "130",
                "averageRating": null,
                "reviewCount": 0,
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
                    "product_concrete_ids": [
                        "130_29285281",
                        "130_24326086",
                        "130_24725761"
                    ],
                    "super_attributes": {
                        "processor_frequency": [
                            "3.5 GHz",
                            "3.3 GHz",
                            "3.6 GHz"
                        ]
                    },
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
                    }
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
                },
                "url": "/en/lenovo-thinkstation-p300-130"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/130"
            }
        },
        {
            "type": "abstract-products",
            "id": "131",
            "attributes": {
                "sku": "131",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Lenovo ThinkStation P900",
                "description": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans—as opposed to 10 that other workstations typically rely on—and a direct cooling air baffle directs fresh air into the CPU and memory. ThinkStation P900 delivers new technologies and design to keep your workstation cool and quiet. The innovative Flex Module lets you customize I/O ports, so you add only what you need. Using the 5.25\" bays, you can mix and match components including an ultraslim ODD, 29-in-1 media card reader, Firewire, and eSATA. The Flex Connector is a mezzanine card that fits into the motherboard and allows for expanded storage and I/O, without sacrificing the use of rear PCI. It supports SATA/SAS/PCIe advanced RAID solution. ThinkStation P900 includes two available connectors (enabled with each CPU).",
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
                "superAttributes": {
                    "color": [
                        "Silver"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "131_24872891"
                    ],
                    "super_attributes": {
                        "color": [
                            "Silver"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Lenovo ThinkStation P900",
                "metaKeywords": "Lenovo,Tax Exempt",
                "metaDescription": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on—an",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "processor_cores": "Processor cores",
                    "processor_threads": "Processor Threads",
                    "stepping": "Stepping",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/lenovo-thinkstation-p900-131"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/131"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/abstract-products/122/related-products?include=product-labels"
    },
    "included": [
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 3,
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

<a name="related-product-attributes"></a>

{% include /pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md -->


{% include /pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md -->


## Retrieve upselling products of a registered user's cart

To get upselling items for all products in a cart of a registered customer, send the request:

---
`GET` **/carts/*{% raw %}{{{% endraw %}cart_id{% raw %}}}{% endraw %}*/up-selling-products**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}cart_id{% raw %}}}{% endraw %}}*** | ID of a cart to get upselling items of. [Retrieve all carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#retrieve-registered-users-carts) to get it. |

### Request

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | product-labels |

| REQUEST | USAGE |
| --- | --- |
| GET http://mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/up-selling-products | Retrieve upselling products of the specified cart. |
| GET https://glue.mysprykershop.com/carts/f9a3f045-02c2-5d47-b397-8ac1f5c63e27/up-selling-products?include=product-labels | Retrieve upselling products of the specified cart. Product labels assigned to the upselling products are included. |

### Response

<details>
<summary>Response sample: retrieve upselling products of a registered user's cart</summary>

```json
{
    "data": [
        {
            "type": "abstract-products",
            "id": "163",
            "attributes": {
                "sku": "163",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Asus ZenPad Z380C-1B",
                "description": "Bigger while smaller ASUS ZenPad 8.0 is an 8-inch tablet with a 76.5% screen-to-body ratio—an incredible engineering achievement made possible by reducing the bezel width to the bare minimum. ASUS VisualMaster is a suite of exclusive visual enhancement technologies that combine hardware and software to optimize all aspects of the display—including contrast, sharpness, color, clarity, and brightness—resulting in an incredibly realistic viewing experience. With ASUS VisualMaster, it’s just like being there. ASUS Audio Cover is an entertainment accessory that brings cinematic, 5.1-channel surround sound to ASUS ZenPad 8.0. DTS-HD Premium Sound and SonicMaster technology provide further enhancement, ensuring the ultimate audio experience on ASUS ZenPad 8.0. Intelligent contrast enhancement analyzes and optimizes each pixel in an image before it is reproduced, rendering more detail in the highlights and shadows to reveal the true beauty in your pictures.",
                "attributes": {
                    "processor_cores": "4",
                    "storage_media": "flash",
                    "display_technology": "IPS",
                    "internal_memory": "2GB",
                    "brand": "Asus",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "storage_media",
                    "internal_memory",
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Black"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "163_29728850"
                    ],
                    "super_attributes": {
                        "color": [
                            "Black"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Asus ZenPad Z380C-1B",
                "metaKeywords": "Asus,Communication Electronics",
                "metaDescription": "Bigger while smaller ASUS ZenPad 8.0 is an 8-inch tablet with a 76.5% screen-to-body ratio—an incredible engineering achievement made possible by reducin",
                "attributeNames": {
                    "processor_cores": "Processor cores",
                    "storage_media": "Storage media",
                    "display_technology": "Display technology",
                    "internal_memory": "Max internal memory",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/asus-zenpad-z380c-1b-163"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/163"
            }
        },
        {
            "type": "abstract-products",
            "id": "164",
            "attributes": {
                "sku": "164",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Asus ZenPad Z380C-1B",
                "description": "Bigger while smaller ASUS ZenPad 8.0 is an 8-inch tablet with a 76.5% screen-to-body ratio—an incredible engineering achievement made possible by reducing the bezel width to the bare minimum. ASUS VisualMaster is a suite of exclusive visual enhancement technologies that combine hardware and software to optimize all aspects of the display—including contrast, sharpness, color, clarity, and brightness—resulting in an incredibly realistic viewing experience. With ASUS VisualMaster, it’s just like being there. ASUS Audio Cover is an entertainment accessory that brings cinematic, 5.1-channel surround sound to ASUS ZenPad 8.0. DTS-HD Premium Sound and SonicMaster technology provide further enhancement, ensuring the ultimate audio experience on ASUS ZenPad 8.0. Intelligent contrast enhancement analyzes and optimizes each pixel in an image before it is reproduced, rendering more detail in the highlights and shadows to reveal the true beauty in your pictures.",
                "attributes": {
                    "processor_cores": "4",
                    "storage_media": "flash",
                    "display_technology": "IPS",
                    "internal_memory": "2GB",
                    "brand": "Asus",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "storage_media",
                    "internal_memory",
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "White"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "164_29565390"
                    ],
                    "super_attributes": {
                        "color": [
                            "White"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Asus ZenPad Z380C-1B",
                "metaKeywords": "Asus,Communication Electronics",
                "metaDescription": "Bigger while smaller ASUS ZenPad 8.0 is an 8-inch tablet with a 76.5% screen-to-body ratio—an incredible engineering achievement made possible by reducin",
                "attributeNames": {
                    "processor_cores": "Processor cores",
                    "storage_media": "Storage media",
                    "display_technology": "Display technology",
                    "internal_memory": "Max internal memory",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/asus-zenpad-z380c-1b-164"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/164"
            }
        },
        {
            "type": "abstract-products",
            "id": "165",
            "attributes": {
                "sku": "165",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Asus ZenPad Z580CA",
                "description": "Fashion-inspired design The design of ASUS ZenPad S 8.0 carries modern influences and a simple, clean look that gives it a universal and stylish appeal. These elements are inspired by our Zen design philosophy of balancing beauty and strength. ASUS ZenPad S 8.0 is an 8-inch tablet that is only 6.6mm thin, weighs just 298g, and has a 74% screen-to-body ratio—an incredible engineering achievement made possible by reducing the bezel width to the bare minimum. Intelligent contrast enhancement analyzes and optimizes each pixel in an image before it is reproduced, rendering more detail in the highlights and shadows to reveal the true beauty in your pictures. ASUS ZenPad S 8.0 is equipped with ASUS Tru2Life+ technology, which improves video with fast action scenes—such as sports—by increasing the screen refresh rate, resulting in reduced blur and smooth, detailed motion.",
                "attributes": {
                    "processor_cores": "4",
                    "display_technology": "IPS",
                    "touch_technology": "Multi-touch",
                    "brand": "Asus",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": {
                    "internal_storage_capacity": [
                        "32 GB",
                        "64 GB"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "165_29879507",
                        "165_29879528"
                    ],
                    "super_attributes": {
                        "internal_storage_capacity": [
                            "32 GB",
                            "64 GB"
                        ]
                    },
                    "attribute_variants": {
                        "internal_storage_capacity:32 GB": {
                            "id_product_concrete": "165_29879528"
                        },
                        "internal_storage_capacity:64 GB": {
                            "id_product_concrete": "165_29879507"
                        }
                    }
                },
                "metaTitle": "Asus ZenPad Z580CA",
                "metaKeywords": "Asus,Communication Electronics",
                "metaDescription": "Fashion-inspired design The design of ASUS ZenPad S 8.0 carries modern influences and a simple, clean look that gives it a universal and stylish appeal. Th",
                "attributeNames": {
                    "processor_cores": "Processor cores",
                    "display_technology": "Display technology",
                    "touch_technology": "Touch Technology",
                    "brand": "Brand",
                    "color": "Color",
                    "internal_storage_capacity": "Internal storage capacity"
                },
                "url": "/en/asus-zenpad-z580ca-165"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/165"
            }
        },
        {
            "type": "abstract-products",
            "id": "166",
            "attributes": {
                "sku": "166",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Asus ZenPad Z580CA-1B",
                "description": "Fashion-inspired design The design of ASUS ZenPad S 8.0 carries modern influences and a simple, clean look that gives it a universal and stylish appeal. These elements are inspired by our Zen design philosophy of balancing beauty and strength. ASUS VisualMaster is a suite of exclusive visual enhancement technologies that combine hardware and software to optimize all aspects of the display—including contrast, sharpness, color, clarity, and brightness—resulting in an incredibly realistic viewing experience. With ASUS VisualMaster, it’s just like being there. ASUS ZenPad S 8.0 is equipped with ASUS Tru2Life+ technology, which improves video with fast action scenes—such as sports—by increasing the screen refresh rate, resulting in reduced blur and smooth, detailed motion.",
                "attributes": {
                    "internal_memory": "4 GB",
                    "display_technology": "IPS",
                    "processor_cache": "2 MB",
                    "brand": "Asus",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "internal_memory",
                    "processor_cache",
                    "color"
                ],
                "superAttributes": {
                    "internal_storage_capacity": [
                        "32 GB",
                        "64 GB"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "166_30230575",
                        "166_29565389"
                    ],
                    "super_attributes": {
                        "internal_storage_capacity": [
                            "32 GB",
                            "64 GB"
                        ]
                    },
                    "attribute_variants": {
                        "internal_storage_capacity:32 GB": {
                            "id_product_concrete": "166_29565389"
                        },
                        "internal_storage_capacity:64 GB": {
                            "id_product_concrete": "166_30230575"
                        }
                    }
                },
                "metaTitle": "Asus ZenPad Z580CA-1B",
                "metaKeywords": "Asus,Communication Electronics",
                "metaDescription": "Fashion-inspired design The design of ASUS ZenPad S 8.0 carries modern influences and a simple, clean look that gives it a universal and stylish appeal. Th",
                "attributeNames": {
                    "internal_memory": "Max internal memory",
                    "display_technology": "Display technology",
                    "processor_cache": "Processor cache type",
                    "brand": "Brand",
                    "color": "Color",
                    "internal_storage_capacity": "Internal storage capacity"
                },
                "url": "/en/asus-zenpad-z580ca-1b-166"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/166"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a/up-selling-products"
    }
}
```
</details>

<details>
<summary>Response sample: retrieve upselling products of a registered user's cart with product labels</summary>

```json
{
    "data": [
        {
            "type": "abstract-products",
            "id": "100",
            "attributes": {
                "sku": "100",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Acer Liquid Leap",
                "description": "ASUS VivoPulse Technology Built-in heart rate sensor works in real time to help you exercise more efficiently, track calories burned, and measure your sleep quality more precisely. Convenient LED indicator informs you if you are performing aerobic exercise or are overexerting yourself. Learn about your sleep patterns and quality to feel your best. An easy-to-understand rating of overall wellbeing based on your amount of exercise and sleep quality. Stay up-to-date with your loved ones' well-being via app or website. 10 days under normal operation. ASUS VivoWatch can be submerged in up to 1 meter of water for 30 minutes. Regular aerobic exercise provides numerous health benefits. ASUS VivoWatch has a convenient LED indicator that turns green when you are doing aerobic exercise and burning calories. If you push yourself to the limit, the indicator alerts you by turning red.",
                "attributes": {
                    "waterproof_up_to": "3.2 ft",
                    "weight": "20 g",
                    "bluetooth_version": "4",
                    "Shape": "round",
                    "brand": "Acer",
                    "color": "White"
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
                    "super_attributes": {
                        "color": [
                            "Blue"
                        ]
                    },
                    "product_concrete_ids": [
                        "100_24675726"
                    ],
                    "attribute_variants": []
                },
                "metaTitle": "Acer Liquid Leap",
                "metaKeywords": "Acer,Smart Electronics",
                "metaDescription": "ASUS VivoPulse Technology Built-in heart rate sensor works in real time to help you exercise more efficiently, track calories burned, and measure your slee",
                "attributeNames": {
                    "waterproof_up_to": "Waterproof up to",
                    "weight": "Weight",
                    "bluetooth_version": "Blootooth version",
                    "Shape": "Shape",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/acer-liquid-leap-100"
            },
            "links": {
                "self": "https://glue.de.b2c.demo-spryker.com:80/abstract-products/100"
            },
            "relationships": {
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
        "self": "https://glue.de.b2c.demo-spryker.com:80/carts/976af32f-80f6-5f69-878f-4ea549ee0830/up-selling-products?include=product-labels"
    },
    "included": [
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 3,
                "frontEndReference": "highlight"
            },
            "links": {
                "self": "https://glue.de.b2c.demo-spryker.com:80/product-labels/5"
            }
        }
    ]
}
```
</details>

{% include /pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md -->


{% include /pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md -->



## Retrieve upselling products of a guest cart

To retrieve upselling products of a guest cart, send the request:

***
`GET` **/guest-carts/*{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*/up-selling-products**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}}*** | Unique identifier of a guest cart to get upselling items of.  |

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | ✓ | Guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | product-labels |

| REQUEST | USAGE |
| --- | --- |
| GET https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/up-selling-products | Retrieve upselling products of the specified cart. |
| GET https://glue.mysprykershop.com/guest-carts/f9a3f045-02c2-5d47-b397-8ac1f5c63e27/up-selling-products?include=product-labels | Retrieve upselling products of the specified cart. Product labels assigned to the upselling products are included. |

### Response

<details>
<summary>Response sample: retrieve upselling products of a guest cart</summary>

```json
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
</details>

<details>
<summary>Response sample: retrieve upselling products of a guest cart with the details on product labels</summary>

```json
{
    "data": [
        {
            "type": "guest-carts",
            "id": "f9a3f045-02c2-5d47-b397-8ac1f5c63e27",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "guest-cart-items": {
                    "data": [
                        {
                            "type": "guest-cart-items",
                            "id": "020_21081478"
                        }
                    ]
                }
            }
        }
    ],
    "links": {...},
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
        },
        {
            "type": "concrete-products",
            "id": "020_21081478",
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
        {
            "type": "guest-cart-items",
            "id": "020_21081478",
            "attributes": {
                "sku": "020_21081478",
                "quantity": "6",
                "groupKey": "020_21081478",
                "abstractSku": "020",
                "amount": null,
                "calculations": {...},
                "selectedProductOptions": []
            },
            "links": {...},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "020_21081478"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

{% include /pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md -->

{% include /pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md -->


## Possible errors

| CODE | REASON |
| --- | --- |
| 101 | Cart with the specified ID was not found. |
| 104 | Cart ID is missing. |
| 109 | Anonymous customer unique ID is empty. |
| 301 | Abstract product is not found. |
| 311 | Abstract product ID is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
