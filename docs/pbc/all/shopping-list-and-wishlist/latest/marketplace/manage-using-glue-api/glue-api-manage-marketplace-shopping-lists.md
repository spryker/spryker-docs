---
title: "Glue API: Manage marketplace shopping lists"
description: Learn how to manage the Spryker Marketplace Shopping lists with GLUE API for your Spryker Marketplace projects.
last_updated: May 20, 2022
template: glue-api-storefront-guide-template
related:
  - title: Install the Marketplace Shopping Lists feature
    link: docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-shopping-lists-feature.html
  - title: Install the Marketplace Shopping Lists Glue API
    link: docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-shopping-lists-glue-api.html
  - title: Managing shopping list items
    link: docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/manage-using-glue-api/glue-api-manage-marketplace-shopping-list-items.html
---

The Marketplace Shopping Lists API feature lets you manage shopping lists in the Marketplace, as well as managing the items in them.

In your development, the resources can help you to enable the shopping list functionality in your application.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
- [Install the Shopping Lists Glue API](/docs/pbc/all/shopping-list-and-wishlist/latest/base-shop/install-and-upgrade/install-glue-api/install-the-shopping-lists-glue-api.html)
- [Install the Product Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)
- [Install the Marketplace Shopping Lists Glue API](/docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-shopping-lists-glue-api.html)


## Create a shopping list

To create a shopping list for a registered user, send the request:

---
`POST` **/shopping-lists**

---

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

Request sample:

`POST https://glue.mysprykershop.com/shopping-lists`

```json
{
    "data":{
        "type": "shopping-lists",
        "attributes":{
            "name":"My Shopping List"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | string | ✓ | Name of the shopping list to create. |

### Response

Response sample:

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "sdb17f85-953f-565a-a4ce-e5cb02405f83",
        "attributes": {
            "owner": "Anne Boleyn",
            "name": "Laptops",
            "numberOfItems": 0,
            "updatedAt": "2020-02-07 09:26:01.623754",
            "createdAt": "2020-02-07 09:26:01.623754"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/shopping-lists/sdb17f85-953f-565a-a4ce-e5cb02405f83"
        }
    }
}
```

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| owner | String | First and last names of the shopping list owner. |
| name | String |Shopping list name. |
| numberOfItems | Integer | Number of items on the shopping list. |
| updatedAt | String | Date when the shopping list was last updated. |
| createdAt | String | Date when the shopping list was created. |

## Retrieve shopping lists

To retrieve shopping lists, send the request:

***
`GET` **/shopping-lists**
***

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | shopping-list-items, concrete-products|

{% info_block infoBox %}

To retrieve concrete products in a shopping list, include `shopping-list-items` and `concrete-products` resources.

{% endinfo_block %}

| REQUEST SAMPLE | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/shopping-lists` | Retrieve all shopping lists. |
| `GET https://glue.mysprykershop.com/shopping-lists?include=shopping-list-items,concrete-products` | Retrieve all shopping lists with its items and respective concrete products. |

### Response

<details>
<summary>Response sample: retrieve all shopping lists</summary>

```json
  {
    "data": [],
    "links": {
        "self": "https://glue.mysprykershop.com/shopping-lists"
    }
}  
```

</details>

<details>
<summary>Response sample: retrieve own and shared shopping lists</summary>

```json
{
    "data": [
        {
            "type": "shopping-lists",
            "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
            "attributes": {
                "owner": "Spencor Hopkin",
                "name": "My Shopping List",
                "numberOfItems": 19,
                "updatedAt": "2020-02-07 07:59:09.621433",
                "createdAt": "2020-02-07 07:59:09.621433"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a"
            }
        },
        {
            "type": "shopping-lists",
            "id": "184ea79d-a2d3-549a-8ca2-4ea36879ceee",
            "attributes": {
                "owner": "Spencor Hopkin",
                "name": "My Shopping List 2",
                "numberOfItems": 0,
                "updatedAt": "2020-02-07 08:01:11.539074",
                "createdAt": "2020-02-07 08:01:11.539074"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shopping-lists/184ea79d-a2d3-549a-8ca2-4ea36879ceee"
            }
        },
        {
            "type": "shopping-lists",
            "id": "f5ce1365-1429-5d99-97a9-c1b19e4fede6",
            "attributes": {
                "owner": "Niels Barr",
                "name": "Shared Shopping List",
                "numberOfItems": 0,
                "updatedAt": "2020-02-07 09:34:41.438426",
                "createdAt": "2020-02-07 09:34:41.438426"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shopping-lists/f5ce1365-1429-5d99-97a9-c1b19e4fede6"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/shopping-lists"
    }
}
```

</details>

<details>
<summary>Response sample: retrieve all shopping lists with its items and respective concrete products</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "shopping-list-items": {
                "data": [
                    {
                        "type": "shopping-list-items",
                        "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
                    },
                    {
                        "type": "shopping-list-items",
                        "id": "00fed212-3dc9-569f-885f-3ddca41dea08"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "136_24425591",
            "attributes": {
                "sku": "136_24425591",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Acer Chromebook C730-C8T7",
                "description": "Amazing mobility Slip the Acer Chromebook into your bag and work from anywhere, without recharging, because it has enough battery life to last all day long on a single charge. Indulge your e✓ and see everything in vivid detail on the Acer Chromebook's Full HD display. The Acer Chromebook features the latest 802.11ac wireless technology, for a smooth internet experience at connection speeds that are up to three times faster than that of previous-generation wireless technologies. The Acer Chromebook starts within 8 seconds, so you can wait less and do more. At less than an inch thin and extremely light, the Acer Chromebook is the perfect tool for on-the-go computing. Plus, it sports a fanless design for whisper-quiet computing.",
                "attributes": {
                    "product_type": "Chromebook",
                    "form_factor": "clamshell",
                    "processor_threads": "2",
                    "processor_boost_frequency": "2.58 GHz",
                    "brand": "Acer",
                    "color": "Grey"
                },
                "superAttributesDefinition": [
                    "form_factor",
                    "color"
                ],
                "metaTitle": "Acer Chromebook C730-C8T7",
                "metaKeywords": "Acer,Entertainment Electronics",
                "metaDESCRIPTION": "Amazing mobility Slip the Acer Chromebook into your bag and work from anywhere, without recharging, because it has enough battery life to last all day long",
                "attributeNames": {
                    "product_type": "Product type",
                    "form_factor": "Form factor",
                    "processor_threads": "Processor Threads",
                    "processor_boost_frequency": "Processor boost frequency",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/136_24425591"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "136_24425591"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "005_30663301",
            "attributes": {
                "sku": "005_30663301",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Canon IXUS 175",
                "description": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies look like miniature scale models and much more. Capture the stunning detail in everyday subjects using 1 cm Macro to get right up close. Enjoy exceptional quality, detailed images thanks to 20.0 Megapixels and DIGIC 4+ processing. Face Detection technology makes capturing great shots of friends effortless, while Auto Zoom intelligently helps you select the best framing at the touch of a button.",
                "attributes": {
                    "optical_zoom": "8 x",
                    "combined_zoom": "32 x",
                    "display": "LCD",
                    "hdmi": "no",
                    "brand": "Canon",
                    "color": "Blue"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 175",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDESCRIPTION": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies loo",
                "attributeNames": {
                    "optical_zoom": "Optical zoom",
                    "combined_zoom": "Combined zoom",
                    "display": "Display",
                    "hdmi": "HDMI",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/005_30663301"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "00fed212-3dc9-569f-885f-3ddca41dea08",
            "attributes": {...},
            "links": {....},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "005_30663301"
                        }
                    ]
                }
            }
        }
    ]
}
```

</details>

{% include pbc/all/glue-api-guides/latest/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

For the response attributes, see [Create a shopping list](#create-a-shopping-list).

For the attributes of included resources, see:
- [Add items to a shopping list](/docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/manage-using-glue-api/glue-api-manage-marketplace-shopping-list-items.html)

## Retrieve a shopping list

To retrieve a shopping list, send the request:

***
`GET` **/shopping-lists/*{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list to retrieve. |


### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>shopping-list-items</li><li>concrete-products</li><li>merchants</li><li>product-offers</li></ul> |

{% info_block infoBox "Included resources" %}

To retrieve concrete products in a shopping list, include `shopping-list-items` and `concrete-products` resources.

To retrieve merchants in a shopping list, include `shopping-list-items` and `merchants` resources.

To retrieve product offers in a shopping list, include `shopping-list-items` and `product-offers` resources.

{% endinfo_block %}


| REQUEST SAMPLE | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/shopping-lists/sdb17f85-953f-565a-a4ce-e5cb02405f83` | Retrieve the shopping list with the id `sdb17f85-953f-565a-a4ce-e5cb02405f83`. |
| `GET https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a?include=shopping-list-items` | Retrieve the shopping list with the id `ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a` with its items. |
| `GET https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a?include=shopping-list-items,concrete-products` | Retrieve the shopping list with the id `ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a` with its items and respective concrete products. |
| `GET https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce?include=shopping-list-items,merchants` | Retrieve the shopping list with the id `c0bc6296-8a0c-50d9-b25e-5bface7671ce` with its merchants. |
| `GET https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce?include=shopping-list-items,product-offers,product-offer-availabilities`| Retrieve the shopping list with the id `c0bc6296-8a0c-50d9-b25e-5bface7671ce` with its product offers and product offer availabilities. |

### Response

<details>
<summary>Response sample: retrieve a shopping list</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
        "attributes": {
            "owner": "Spencor Hopkin",
            "name": "My Shopping List",
            "numberOfItems": 19,
            "updatedAt": "2020-02-07 07:59:09.621433",
            "createdAt": "2020-02-07 07:59:09.621433"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a"
        }
    }
}
```

</details>

<details>
<summary>Response sample: retrieve a shopping list with its items</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "shopping-list-items": {
                "data": [
                    {
                        "type": "shopping-list-items",
                        "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
                    },
                    {
                        "type": "shopping-list-items",
                        "id": "00fed212-3dc9-569f-885f-3ddca41dea08"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "shopping-list-items",
            "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17",
            "attributes": {
                "quantity": 15,
                "sku": "136_24425591"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "00fed212-3dc9-569f-885f-3ddca41dea08",
            "attributes": {
                "quantity": 4,
                "sku": "005_30663301"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08"
            }
        }
    ]
}
```

</details>

<details>
<summary>Response sample: retrieve a shopping list with its items and concrete products</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "shopping-list-items": {
                "data": [
                    {
                        "type": "shopping-list-items",
                        "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
                    },
                    {
                        "type": "shopping-list-items",
                        "id": "00fed212-3dc9-569f-885f-3ddca41dea08"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "136_24425591",
            "attributes": {
                "sku": "136_24425591",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Acer Chromebook C730-C8T7",
                "description": "Amazing mobility Slip the Acer Chromebook into your bag and work from anywhere, without recharging, because it has enough battery life to last all day long on a single charge. Indulge your e✓ and see everything in vivid detail on the Acer Chromebook's Full HD display. The Acer Chromebook features the latest 802.11ac wireless technology, for a smooth internet experience at connection speeds that are up to three times faster than that of previous-generation wireless technologies. The Acer Chromebook starts within 8 seconds, so you can wait less and do more. At less than an inch thin and extremely light, the Acer Chromebook is the perfect tool for on-the-go computing. Plus, it sports a fanless design for whisper-quiet computing.",
                "attributes": {
                    "product_type": "Chromebook",
                    "form_factor": "clamshell",
                    "processor_threads": "2",
                    "processor_boost_frequency": "2.58 GHz",
                    "brand": "Acer",
                    "color": "Grey"
                },
                "superAttributesDefinition": [
                    "form_factor",
                    "color"
                ],
                "metaTitle": "Acer Chromebook C730-C8T7",
                "metaKeywords": "Acer,Entertainment Electronics",
                "metaDESCRIPTION": "Amazing mobility Slip the Acer Chromebook into your bag and work from anywhere, without recharging, because it has enough battery life to last all day long",
                "attributeNames": {
                    "product_type": "Product type",
                    "form_factor": "Form factor",
                    "processor_threads": "Processor Threads",
                    "processor_boost_frequency": "Processor boost frequency",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/136_24425591"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "136_24425591"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "005_30663301",
            "attributes": {
                "sku": "005_30663301",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Canon IXUS 175",
                "description": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies look like miniature scale models and much more. Capture the stunning detail in everyday subjects using 1 cm Macro to get right up close. Enjoy exceptional quality, detailed images thanks to 20.0 Megapixels and DIGIC 4+ processing. Face Detection technology makes capturing great shots of friends effortless, while Auto Zoom intelligently helps you select the best framing at the touch of a button.",
                "attributes": {
                    "optical_zoom": "8 x",
                    "combined_zoom": "32 x",
                    "display": "LCD",
                    "hdmi": "no",
                    "brand": "Canon",
                    "color": "Blue"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 175",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDESCRIPTION": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies loo",
                "attributeNames": {
                    "optical_zoom": "Optical zoom",
                    "combined_zoom": "Combined zoom",
                    "display": "Display",
                    "hdmi": "HDMI",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/005_30663301"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "00fed212-3dc9-569f-885f-3ddca41dea08",
            "attributes": {...},
            "links": {....},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "005_30663301"
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
<summary>Response sample: retrieve a shopping list with its items and merchants</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "c0bc6296-8a0c-50d9-b25e-5bface7671ce",
        "attributes": {
            "owner": "Andrew Wedner",
            "name": "Test shopping list",
            "numberOfItems": 6,
            "updatedAt": "2022-03-17 09:44:24.000000",
            "createdAt": "2022-03-17 09:44:24.000000"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce?include=shopping-list-items,merchants"
        },
        "relationships": {
            "shopping-list-items": {
                "data": [
                    {
                        "type": "shopping-list-items",
                        "id": "29f1d940-00b6-5492-abf3-d2b5ff15f0b2"
                    },
                    {
                        "type": "shopping-list-items",
                        "id": "946451d1-3c40-559e-95c7-ebda2d12bebf"
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
                "merchantUrl": "/de/merchant/spryker",
                "contactPersonRole": "E-Commerce Manager",
                "contactPersonTitle": "Mr",
                "contactPersonFirstName": "Harald",
                "contactPersonLastName": "Schmidt",
                "contactPersonPhone": "+49 30 208498350",
                "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-logo.png",
                "publicEmail": "info@spryker.com",
                "publicPhone": "+49 30 234567891",
                "description": "Spryker ist der Haupthändler auf dem Demo-Marktplatz.",
                "bannerUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png",
                "deliveryTime": "1-3 Tage",
                "faxNumber": "+49 30 234567800",
                "legalInformation": {
                    "terms": "<p><h3>§ 1 Geltungsbereich &amp; Abwehrklausel</h3><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter") und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><h3>§ 2 Zustandekommen des Vertrages</h3><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-E-Mail. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><h3>§ 3 Eigentumsvorbehalt</h3><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><h3>§ 4 Fälligkeit</h3><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>",
                    "cancellationPolicy": "Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",
                    "imprint": "<p>Spryker Systems GmbH<br><br>Julie-Wolfthorn-Straße 1<br>10115 Berlin<br>DE<br><br>Phone: +49 (30) 2084983 50<br>Email: info@spryker.com<br><br>Vertreten durch<br>Geschäftsführer: Alexander Graf, Boris Lokschin<br>Registergericht: Hamburg<br>Registernummer: HRB 134310<br></p>",
                    "dataPrivacy": "Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Spryker Systems GmbH."
                },
                "categories": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "29f1d940-00b6-5492-abf3-d2b5ff15f0b2",
            "attributes": {
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "quantity": 3,
                "sku": "110_19682159"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce/shopping-list-items/29f1d940-00b6-5492-abf3-d2b5ff15f0b2"
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
        {
            "type": "shopping-list-items",
            "id": "946451d1-3c40-559e-95c7-ebda2d12bebf",
            "attributes": {
                "productOfferReference": "offer3",
                "merchantReference": "MER000001",
                "quantity": 3,
                "sku": "091_25873091"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce/shopping-list-items/946451d1-3c40-559e-95c7-ebda2d12bebf"
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
        }
    ]
}
```

</details>

<details>
<summary>Response sample: retrieve a shopping list with its items, product offers and product offer availabilities</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "c0bc6296-8a0c-50d9-b25e-5bface7671ce",
        "attributes": {
            "owner": "Andrew Wedner",
            "name": "Test shopping list",
            "numberOfItems": 6,
            "updatedAt": "2022-03-17 09:44:24.000000",
            "createdAt": "2022-03-17 09:44:24.000000"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce?include=shopping-list-items,product-offers,product-offer-availabilities"
        },
        "relationships": {
            "shopping-list-items": {
                "data": [
                    {
                        "type": "shopping-list-items",
                        "id": "29f1d940-00b6-5492-abf3-d2b5ff15f0b2"
                    },
                    {
                        "type": "shopping-list-items",
                        "id": "946451d1-3c40-559e-95c7-ebda2d12bebf"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "shopping-list-items",
            "id": "29f1d940-00b6-5492-abf3-d2b5ff15f0b2",
            "attributes": {
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "quantity": 3,
                "sku": "110_19682159"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce/shopping-list-items/29f1d940-00b6-5492-abf3-d2b5ff15f0b2"
            }
        },
        {
            "type": "product-offers",
            "id": "offer3",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000001",
                "isDefault": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer3"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "946451d1-3c40-559e-95c7-ebda2d12bebf",
            "attributes": {
                "productOfferReference": "offer3",
                "merchantReference": "MER000001",
                "quantity": 3,
                "sku": "091_25873091"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce/shopping-list-items/946451d1-3c40-559e-95c7-ebda2d12bebf"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer3"
                        }
                    ]
                }
            }
        }
    ]
}
```

</details>

{% include pbc/all/glue-api-guides/latest/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->


For response attributes, see [Create a shopping list](#create-a-shopping-list).

For the attributes of included resources, see:
- [Add items to a shopping list](/docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/manage-using-glue-api/glue-api-manage-marketplace-shopping-list-items.html)
- [Retrieve merchants](/docs/pbc/all/merchant-management/latest/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html)
- [Retrieve product offers](/docs/pbc/all/offer-management/latest/marketplace/glue-api-retrieve-product-offers.html)

## Edit a shopping list

To edit a shopping list, send the request:

***
`PATCH` **/shopping-lists/*{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list to edit. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | shopping-list-items, concrete-products|

{% info_block infoBox "Included resources" %}

To retrieve concrete products in a shopping list, include `shopping-list-items` and `concrete-products` resources.

{% endinfo_block %}


| REQUEST SAMPLE | USAGE |
| --- | --- |
| `PATCH https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a` | Edit the shopping list with the id `ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a`. |
| `PATCH https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a?include=shopping-list-items,concrete-products` | Edit the shopping list with the id `ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a` and include its items and respective concrete products into the response. |

```json
{
   "data": {
      "type": "shopping-lists",
      "attributes": {
         "name": "New Name"
      }
   }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION|
| --- | --- | --- |--- |
| name | String | ✓ | New name of the shopping list. |

### Response

<details>
<summary>Response sample: edit the shopping list</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
        "attributes": {
            "owner": "Spencor Hopkin",
            "name": "New Name",
            "numberOfItems": 19,
            "updatedAt": "2020-02-08 14:17:38.288982",
            "createdAt": "2020-02-07 07:59:09.621433"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a"
        }
    }
}
```

</details>

<details>
<summary>Response sample: edit the shopping list with its items and respective concrete products</summary>

```json
"data": {
        "type": "shopping-lists",
        "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
        "attributes": {...},
        "links": {...},
        "relationships": {...},
    "included": [
        {
            "type": "concrete-products",
            "id": "090_24495844",
            "attributes": {
                "sku": "090_24495844",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Sony SmartWatch 3",
                "description": "The way you like it Whatever your lifestyle SmartWatch 3 SWR50 can be made to suit it. You can choose from a range of wrist straps—formal, sophisticated, casual, vibrant colours and fitness style, all made from the finest materials. Designed to perform and impress, this smartphone watch delivers a groundbreaking combination of technology and style. Downloadable apps let you customise your SmartWatch 3 SWR50 and how you use it.         Tell SmartWatch 3 SWR50 smartphone watch what you want and it will do it. Search. Command. Find.",
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
                "metaDESCRIPTION": "The way you like it Whatever your lifestyle SmartWatch 3 SWR50 can be made to suit it. You can choose from a range of wrist straps—formal, sophisticated,",
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
                "self": "https://glue.mysprykershop.com/concrete-products/090_24495844"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17",
            "attributes": {
                "quantity": 1,
                "sku": "090_24495844"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "090_24495844"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "128_27314278",
            "attributes": {
                "sku": "128_27314278",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Lenovo ThinkCentre E73",
                "description": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep your business-critical information safe through USB port disablement and the password-protected BIOS and HDD. You can also safeguard your hardware by physically securing your mouse and keyboard, while the Kensington slot enables you to lock down your E73. Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology.",
                "attributes": {
                    "processor_threads": "8",
                    "pci_express_slots_version": "3",
                    "internal_memory": "8 GB",
                    "stepping": "C0",
                    "brand": "Lenovo",
                    "processor_frequency": "3.6 GHz"
                },
                "superAttributesDefinition": [
                    "internal_memory",
                    "processor_frequency"
                ],
                "metaTitle": "Lenovo ThinkCentre E73",
                "metaKeywords": "Lenovo,Tax Exempt",
                "metaDESCRIPTION": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep",
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
                "self": "https://glue.mysprykershop.com/concrete-products/128_27314278"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "00fed212-3dc9-569f-885f-3ddca41dea08",
            "attributes": {
                "quantity": 1,
                "sku": "128_27314278"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "128_27314278"
                        }
                    ]
                }
            }
        }
    ]
}
```

</details>

{% include pbc/all/glue-api-guides/latest/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

For response attributes, see [Create a shopping list](#create-a-shopping-list).

For the attributes of included resources, see:
- [Add items to a shopping list](/docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/manage-using-glue-api/glue-api-manage-marketplace-shopping-list-items.html)

## Delete a shopping list

To delete a shopping list, send the request:

***
`DELETE` **shopping-lists/*{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list to delete. To get it, [Retrieve shopping lists](#retrieve-shopping-lists). |

### Request

Request sample:

`DELETE https://glue.mysprykershop.com/shopping-lists/sdb17f85-953f-565a-a4ce-e5cb02405f83` — Delete the shopping list with the id `sdb17f85-953f-565a-a4ce-e5cb02405f83`.

### Response

If the shopping list is deleted successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is incorrect. |
| 002 | Access token is missing. |
| 400 | Provided access token is not an [access token of a сompany user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html). |
| 901 | Shop list name or item name is not specified or too long.<br>**OR** <br> Item quantity is not specified or too large.|
| 1501 | Shopping list ID is not specified. |
| 1502 | Shopping list item is not specified. |
| 1503 | Specified shopping list is not found. |
| 1504 | Shopping list item is not found. |
| 1505 | Shopping list write permission is required. |
| 1506 | Shopping list with given name already exists. |
| 1507 | Shopping list item quantity is not valid. |
| 1508 | Concrete product not found. |
| 1509 | Shopping list validation failed.  |
| 1510 | Product is discontinued. |
| 1511 | Product is not active. |
| 1512 | Merchant is inactive. |
| 1513 | Merchant is not approved. |
| 1514 | Product offer is not approved. |
| 1515 | Product is not approved. |
| 1516 | Product offer is not active. |
| 1517 | Product offer is not found. |
| 1518 | Product is not equal to the current Store. |
| 1519 | Product offer is not equal to the current Store. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html).
