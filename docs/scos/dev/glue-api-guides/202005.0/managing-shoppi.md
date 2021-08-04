---
title: Managing Shopping Lists
originalLink: https://documentation.spryker.com/v5/docs/managing-shopping-lists
redirect_from:
  - /v5/docs/managing-shopping-lists
  - /v5/docs/en/managing-shopping-lists
---

With the help of the [Shopping Lists](https://documentation.spryker.com/v5/docs/en/shopping-list) feature, company users can manage shopping lists for their company to plan purchasing activities beforehand. Unlike [Wishlists](https://documentation.spryker.com/v5/docs/en/wishlist), Shopping Lists contain not only a list of items to be purchased but also the quantity of each item.

The endpoints provided by the **Shopping List API** provide full *Shopping List management* functionality via REST requests.
{% info_block infoBox %}


Shopping lists are available in B2B scenarios only. This means that access to them is provided upon proper authentication as a **Company User**. For more details, see [Logging In as Company User](/docs/scos/dev/glue-api-guides/202005.0/b2b-account-management/logging-in-as-c).

{% endinfo_block %}
In your development, the resources can help you to enable the shopping list functionality in your application.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Shopping Lists Feature Integration](https://documentation.spryker.com/v5/docs/en/glue-api-shopping-lists-feature-integration).

## Creating a Shopping List
To create a shopping list for a registered user, send the request:

---
`POST` **/shopping-lists**

---
### Request
Request sample: 
`POST http://glue.mysprykershop.com/shopping-lists`

```
{
    "data":{
        "type": "shopping-lists",
        "attributes":{
            "name":"My Shopping List"
        }
    }
}
```

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| name | string | yes | Sets a name for the new shopping list. |

### Response
<details open>
<summary>Response sample</summary>
   
```
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
            "self": "http://glue.mysprykershop.com/shopping-lists/sdb17f85-953f-565a-a4ce-e5cb02405f83"
        }
    }
}
```
 <br>
</details>


| Attribute* | Type | Description |
| --- | --- | --- |
| owner | String | First and last names of the shopping list owner. |
| name | String |Shopping list name. |
| numberOfItems | Integer | Number of items on the shopping list. |
| updatedAt | String | Date when the shopping list was last updated. |
| createdAt | String | Date when the shopping list was created. |

*Type and ID attributes are not mentioned.

## Adding Items to a Shopping List
To add an item to a shopping list, send the request:

---
`POST` **/shopping-lists/{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}/shopping-list-items**

---

### Request
Request sample:
`POST http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items`

`POST http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items?include=concrete-products`

```
{
    "data": {
        "type": "shopping-list-items",
        "attributes": {
            "quantity": 4,
            "sku": "005_30663301"
       }
    }
}
```

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| quantity | Ingeger | yes | Quantity of the product to add. |
| sku | String | yes | SKU of the product to add. Only [concrete products](https://documentation.spryker.com/v5/docs/en/product-abstraction) are allowed. |

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | shopping-list-items, concrete-products|

{% info_block infoBox %}

The `concrete-products` resource can be included only together with the `shopping-list-items` resource.

{% endinfo_block %}

### Response
<details open>
<summary>Response sample</summary>
   
```
  {
    "data": {
        "type": "shopping-list-items",
        "id": "00fed212-3dc9-569f-885f-3ddca41dea08",
        "attributes": {
            "quantity": 4,
            "sku": "005_30663301"
        },
        "links": {
            "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08"
        }
    }
}  
```
<br>
</details>

<details open>
<summary>Response sample with shopping list items and information on concrete products</summary>
    ```
    {
    "data": {
        "type": "shopping-list-items",
        "id": "6283f155-6b8a-5d8c-96b7-3af4091eea3e",
        "attributes": {
            "quantity": 4,
            "sku": "128_27314278"
        },
        "links": {
            "self": "http://glue.de.suite.local/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/6283f155-6b8a-5d8c-96b7-3af4091eea3e"
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
    },
    "included": [
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
                "self": "http://glue.de.suite.local/concrete-products/128_27314278"
            }
        }
    ]
}
    ```
 <br>
</details>

Find all the related attribute descriptions in [Accessing All Shopping Lists of a Company User](#accessing-all-shopping-lists-of-a-company-user).

## Accessing All Shopping Lists of a Company User
To access all shopping lists of the currently logged in Company User, send the request:

---
`GET` **/shopping-lists**

---
{% info_block infoBox %}

The endpoint returns not only the shopping lists created by users but also the lists shared with them.

{% endinfo_block %}
### Request
Request sample: 
`GET http://glue.mysprykershop.com/shopping-lists`

`GET http://glue.mysprykershop.com/shopping-lists?include=shopping-list-items,concrete-products`

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | shopping-list-items, concrete-products|

{% info_block infoBox %}

The `concrete-products` resource can be included only together with the `shopping-list-items` resource.

{% endinfo_block %}

### Response
<details open>
<summary>Response sample with no shopping lists</summary>
   
```
  {
    "data": [],
    "links": {
        "self": "http://glue.mysprykershop.com/shopping-lists"
    }
}  
```
 <br>
</details>    

<details open>
<summary>Response sample with own and shared shopping lists</summary>
   
```
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
                "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a"
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
                "self": "http://glue.mysprykershop.com/shopping-lists/184ea79d-a2d3-549a-8ca2-4ea36879ceee"
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
                "self": "http://glue.mysprykershop.com/shopping-lists/f5ce1365-1429-5d99-97a9-c1b19e4fede6"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/shopping-lists"
    }
}
```
 <br>
</details>

<details open>
<summary>Response sample with shopping list items and information on concrete products</summary>
   
```
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
                "description": "Amazing mobility Slip the Acer Chromebook into your bag and work from anywhere, without recharging, because it has enough battery life to last all day long on a single charge. Indulge your eyes and see everything in vivid detail on the Acer Chromebook's Full HD display. The Acer Chromebook features the latest 802.11ac wireless technology, for a smooth internet experience at connection speeds that are up to three times faster than that of previous-generation wireless technologies. The Acer Chromebook starts within 8 seconds, so you can wait less and do more. At less than an inch thin and extremely light, the Acer Chromebook is the perfect tool for on-the-go computing. Plus, it sports a fanless design for whisper-quiet computing.",
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
                "metaDescription": "Amazing mobility Slip the Acer Chromebook into your bag and work from anywhere, without recharging, because it has enough battery life to last all day long",
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
                "self": "http://glue.mysprykershop.com/concrete-products/136_24425591"
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
                "metaDescription": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies loo",
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
                "self": "http://glue.mysprykershop.com/concrete-products/005_30663301"
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
<br>
</details>

| Attribute* | Type | Description |
| --- | --- | --- |
| owner | String | First and last names of the shopping list owner. |
| name | String | Shopping list name. |
| numberOfItems | Integer | Number of items on the shopping list. |
| updatedAt | String | Date when the shopping list was last updated. |
| createdAt | String | Date when the shopping list was last created. |
*Type and ID attributes are not mentioned.

| Included resource | Attribute* | Type | Description |
| --- | --- | --- | --- |
| shopping-list-items | quantity | Integer | Quantity of the product. |
| shopping-list-items | sku | String | Product SKU. |
| concrete-products | sku | String |  	SKU of the concrete product. |
| concrete-products | isDiscontinued | Boolean |  	Specifies whether a product is discontinued:<ul><li>**true** - the product is discontinued and requires a replacement item;</li><li>**false** - the product is not discontinued. </li></ul>|
| concrete-products | discontinuedNote | String |  	SContains an optional note that was specified when marking a product as discontinued. |
| concrete-products | averageRating | Integer |  	Average ratting of the concrete product. |
| concrete-products | reviewCount | Integer |  	Number of times a product was reviewed. |
| concrete-products | name | String |  	Name of the concrete product. |
| concrete-products | description | String |  	Description of the concrete product. |
| concrete-products | attributes | Object |  	List of attribute keys and their values for the product. |
| concrete-products | superAttributesDefinition | String |  	List of attributes that are flagged as super attributes. |
| concrete-products | metaTitle | String |  	SMeta title of the product. |
| concrete-products |metaKeywords | String |  	SMeta keywords of the product. |
| concrete-products | metaDescription | String |  	Meta description of the product. |
| concrete-products | attributeNames | String |  	List of attribute keys and their translations. |


## Accessing Specific Shopping Lists
To access information on a specific shopping list send the request:

---
`GET` **/shopping-lists/{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}**

---

{% info_block infoBox %}

The requested list must be either owned by or shared with the currently logged in user.

{% endinfo_block %}


### Request
Request sample: 
`GET http://glue.mysprykershop.com/shopping-lists/sdb17f85-953f-565a-a4ce-e5cb02405f83`

`GET http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a?include=shopping-list-items`

`GET http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a?include=shopping-list-items,concrete-products`

| Path parameter | Description |
| --- | --- |
| shopping_list_id | ID of the shopping list you want to retrieve. |

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | shopping-list-items, concrete-products|

The `concrete-products` resource can be included only together with the `shopping-list-items` resource.

### Response
<details open>
<summary>Response sample</summary>
   
```
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
            "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a"
        }
    }
}
```
 <br>
</details>   


<details open>
<summary>Response sample with shopping list items</summary>
   
```
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
                "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
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
                "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08"
            }
        }
    ]
}
```
 <br>
</details>

<details open>
<summary>Response sample with shopping list items and information on concrete products</summary>
   
```
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
                "description": "Amazing mobility Slip the Acer Chromebook into your bag and work from anywhere, without recharging, because it has enough battery life to last all day long on a single charge. Indulge your eyes and see everything in vivid detail on the Acer Chromebook's Full HD display. The Acer Chromebook features the latest 802.11ac wireless technology, for a smooth internet experience at connection speeds that are up to three times faster than that of previous-generation wireless technologies. The Acer Chromebook starts within 8 seconds, so you can wait less and do more. At less than an inch thin and extremely light, the Acer Chromebook is the perfect tool for on-the-go computing. Plus, it sports a fanless design for whisper-quiet computing.",
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
                "metaDescription": "Amazing mobility Slip the Acer Chromebook into your bag and work from anywhere, without recharging, because it has enough battery life to last all day long",
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
                "self": "http://glue.mysprykershop.com/concrete-products/136_24425591"
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
                "metaDescription": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies loo",
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
                "self": "http://glue.mysprykershop.com/concrete-products/005_30663301"
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
<br>
</details>    


Find all the related attribute descriptions in [Accessing All Shopping Lists of a Company User](#accessing-all-shopping-lists-of-a-company-user).


## Modifying Shopping Lists
To modify a shopping list, send the request:

---
`PATCH` **/shopping-lists/{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}**

---

### Request
Request samples: 
`PATCH http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a`

`PATCH http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a?include=shopping-list-items,concrete-products`

| Path parameter | Description |
| --- | --- |
| shopping_list_id | ID of the shopping list you want to retrieve. |

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | shopping-list-items, concrete-products|

{% info_block infoBox %}

The `concrete-products` resource can be included only together with the `shopping-list-items` resource.

{% endinfo_block %}

```
{
   "data":{
      "type":"shopping-lists",
      "attributes":{
         "name":"New Name"
      }
   }
}
```

| Attribute | Type | Required | Description|
| --- | --- | --- |--- |
| name | String | yes |New name of the shopping list. |

### Response
<details open>
<summary>Response sample</summary>
   
```
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
            "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a"
        }
    }
}
```
 <br>
</details> 

<details open>
<summary>Response sample with shopping list items and information on concrete products</summary>
   
```
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
                "self": "http://glue.mysprykershop.com/concrete-products/090_24495844"
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
                "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
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
                "self": "http://glue.mysprykershop.com/concrete-products/128_27314278"
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
                "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08"
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
 <br>
</details> 

Find all the related attribute descriptions in [Accessing All Shopping Lists of a Company User](#accessing-all-shopping-lists-of-a-company-user).


## Updating Quantity of Items in a Shopping List
To update the quantity of products in a shopping list item, send the request:

---
`PATCH` **/shopping-lists/{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}/shopping-list-items/{% raw %}{{{% endraw %}shopping_list_item_id{% raw %}}}{% endraw %}**

---

### Request
Request samples: 
`PATCH http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08`

`PATCH http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08?include=concrete-products`

| Path parameter | Description |
| --- | --- |--- |
| shopping_list_id | ID of the shopping list for which you want to change the item quantity. |
| shopping_list_item_id | ID of the shopping list item for which you want to change quantity. |

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | shopping-list-items, concrete-products|

{% info_block infoBox %}

The `concrete-products` resource can be included only together with the `shopping-list-items` resource.

{% endinfo_block %}

```
{
    "data": {
        "type": "shopping-list-items",
        "attributes": {
            "quantity": 12,
            "sku": "005_30663301"
       }
    }
}
```
| Attribute | Type | Required | Description|
| --- | --- | --- |--- |
| sku | String | yes |SKU of the product the quantity of which you want to change. Only [concrete products](https://documentation.spryker.com/v5/docs/en/product-abstraction) are allowed. |
| quantity | Integer | yes |New quantity of the product. |

### Response
<details open>
<summary>Response sample</summary>
    ```
    {
    "data": {
        "type": "shopping-list-items",
        "id": "00fed212-3dc9-569f-885f-3ddca41dea08",
        "attributes": {
            "quantity": 12,
            "sku": "005_30663301"
        },
        "links": {
            "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08"
        }
    }
}
    ```
 <br>
</details>     

<details open>
<summary>Response sample with shopping list items and information on concrete products</summary>
 ```
 {
    "data": {
        "type": "shopping-list-items",
        "id": "6283f155-6b8a-5d8c-96b7-3af4091eea3e",
        "attributes": {...},
        "links": {... },
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
    },
    "included": [
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
                "self": "http://glue.mysprykershop.com/concrete-products/128_27314278"
            }
        }
    ]
}   
  ```
    <br>
</details>   

## Deleting Items from a Shopping List
To delete an item from a shopping list, send the request: 

---
`DELETE` **/shopping-lists/{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}/shopping-list-items/{% raw %}{{{% endraw %}shopping_list_item_id{% raw %}}}{% endraw %}**

---
### Request
Request sample: 
`DELETE http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08`

### Response
If the item was removed successfully, the endpoint responds with a **204 No Content** status code.

## Deleting Shopping Lists
   To delete a shopping list, send the request:

---
`DELETE` **shopping-lists/{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}**

---

### Request
Request sample: 
`DELETE http://glue.mysprykershop.com/shopping-lists/sdb17f85-953f-565a-a4ce-e5cb02405f83`

### Response
If the shopping list was deleted successfully, the endpoint responds with a **204 No Content** status code.

## Possible Errors

| Status code | Reason |
| --- | --- |
| 400 | The provided access token is not an [access token of a Company User](/docs/scos/dev/glue-api-guides/202005.0/b2b-account-management/logging-in-as-c). </br>**OR** </br> The shopping list ID is not specified. |
| 401 | The access token is incorrect. |
| 403 | The access token is missing. |
| 422 | Could not create/update a shopping list.</br>**OR** </br>Could not add/update an item. |
| 404 | The specified shopping list or shopping list item could not be found. |
