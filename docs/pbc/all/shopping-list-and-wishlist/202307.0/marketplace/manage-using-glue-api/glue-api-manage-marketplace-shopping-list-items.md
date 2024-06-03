---
title: "Glue API: Manage marketplace shopping list items"
description: Learn how to manage shopping list items via Glue API.
last_updated: May 20, 2022
template: glue-api-storefront-guide-template
related:
  - title: Managing shopping lists
    link: docs/pbc/all/shopping-list-and-wishlist/page.version/marketplace/manage-using-glue-api/glue-api-manage-marketplace-shopping-lists.html
---

This endpoint allows managing marketplace shopping list items.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Shopping Lists feature integration](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-shopping-lists-glue-api.html)
* [Glue API: Products feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)
* [Install the Marketplace Shopping Lists Glue API](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-shopping-lists-glue-api.html)

## Add items to a shopping list

To add items to a shopping list, send the request:

***
`POST` **/shopping-lists/*{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*/shopping-list-items**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list to add items to. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |


| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | concrete-products |


<details>
<summary markdown='span'>Request sample: add items to the shopping list</summary>

`POST https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items`

```json
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
</details>


<details>
<summary markdown='span'>Request sample: add items to the shopping list, and include information about the concrete products</summary>

`POST https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items?include=concrete-products`

```json
{
    "data": {
        "type": "shopping-list-items",
        "attributes": {
            "quantity": 4,
            "sku": "128_27314278"
       }
    }
}
```
</details>


<details>
<summary markdown='span'>Request sample: add marketplace products to the shopping list</summary>

`POST https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce/shopping-list-items?include=shopping-list-items`

```json
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
</details>


<details>
<summary markdown='span'>Request sample: add product offers to the shopping list</summary>

`POST https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce/shopping-list-items?include=shopping-list-items`

```json
{
    "data":{
        "type":"shopping-list-items",
        "attributes":{
            "sku":"091_25873091",
            "quantity": 3,
             "productOfferReference":"offer3"
             }
        }
}
```
</details>


| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| quantity | Integer | ✓ | Quantity of the product to add. |
| sku | String | ✓ | SKU of the product to add. Only [concrete products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) are allowed. |
| productOfferReference | String |   | Unique identifier of the product offer. |

### Response

<details>
<summary markdown='span'>Response sample: add items to the shopping list</summary>

```json
  {
    "data": {
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
}  
```
</details>

<details>
<summary markdown='span'>Response sample: add items to the shopping list, and include information about the concrete products</summary>

```json
    {
    "data": {
        "type": "shopping-list-items",
        "id": "6283f155-6b8a-5d8c-96b7-3af4091eea3e",
        "attributes": {
            "quantity": 4,
            "sku": "128_27314278"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/6283f155-6b8a-5d8c-96b7-3af4091eea3e"
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
        }
    ]
}
```
</details>

<details>
<summary markdown='span'>Response sample: add marketplace products to the shopping list</summary>

```json
{
    "data": {
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
    }
}
```
</details>

<details>
<summary markdown='span'>Response sample: add product offers to the shopping list</summary>

```json
{
    "data": {
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
        }
    }
}
```
</details>

<a name="shopping-list-items-response-attributes"></a>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| quantity | Integer | Quantity of the product. |
| sku | String | Product SKU. |
| productOfferReference | String | Unique identifier of the product offer.   |
| merchantReference | String | Unique identifier of the merchant.   |

For the attributes of the included resources, see [Retrieve a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html#concrete-products-response-attributes).

## Change item quantity in a shopping list

To change the item quantity in a shopping list, send the request:

***
`PATCH` **/shopping-lists/*{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*/shopping-list-items/*{% raw %}{{{% endraw %}shopping_list_item_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list to update item quantity in. |
| ***{% raw %}{{{% endraw %}shopping_list_item_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list item to change the quantity of. To get it, [Retrieve shopping lists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/manage-using-glue-api/glue-api-manage-marketplace-shopping-lists.html), or [Retrieve a shopping list](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/manage-using-glue-api/glue-api-manage-marketplace-shopping-lists.html) with the `shopping-list-items` included. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | concrete-products|

<details>
<summary markdown='span'>Request sample: change the quantity of the items in the shopping list</summary>

`PATCH https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08`

```json
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
</details>

<details>
<summary markdown='span'>Request sample: change the quantity of the items in the shopping list, and include concrete products</summary>

`PATCH https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08?include=concrete-products`

```json
{
    "data": {
        "type": "shopping-list-items",
        "attributes": {
            "quantity": 12,
            "sku": "128_27314278"
       }
    }
}
```
</details>

<details>
<summary markdown='span'>Request sample: change the quantity of marketplace products in the shopping list</summary>

`PATCH https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce/shopping-list-items/29f1d940-00b6-5492-abf3-d2b5ff15f0b2`

```json
{
    "data": {
        "type": "shopping-list-items",
        "attributes": {
            "quantity": 15,
            "sku": "110_19682159"
       }
    }
}
```
</details>

<details>
<summary markdown='span'>Request sample: change the quantity of product offers in the shopping list</summary>

`PATCH https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce/shopping-list-items/946451d1-3c40-559e-95c7-ebda2d12bebf`

```json
{
    "data": {
        "type": "shopping-list-items",
        "attributes": {
            "quantity": 10,
            "sku": "091_25873091"
       }
    }
}
```
</details>

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- |--- |
| sku | String | ✓ | SKU of the product you want to change the quantity of. Only [concrete products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) are allowed. |
| quantity | Integer | ✓ | New quantity of the product. |

### Response

<details>
<summary markdown='span'>Response sample: change the quantity of the items in the shopping list</summary>

```json
    {
    "data": {
        "type": "shopping-list-items",
        "id": "00fed212-3dc9-569f-885f-3ddca41dea08",
        "attributes": {
            "quantity": 12,
            "sku": "005_30663301"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08"
        }
    }
}
```
</details>     

<details>
<summary markdown='span'>Response sample: change the quantity of the items in the shopping list, and include concrete products</summary>

```json
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
        }
    ]
}
```
</details>

<details>
<summary markdown='span'>Response sample: change the quantity of marketplace products in the shopping list</summary>

```json
{
    "data": {
        "type": "shopping-list-items",
        "id": "29f1d940-00b6-5492-abf3-d2b5ff15f0b2",
        "attributes": {
            "productOfferReference": null,
            "merchantReference": "MER000001",
            "quantity": 15,
            "sku": "110_19682159"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce/shopping-list-items/29f1d940-00b6-5492-abf3-d2b5ff15f0b2"
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Response sample: change the quantity of product offers in the shopping list</summary>

```json
{
    "data": {
        "type": "shopping-list-items",
        "id": "946451d1-3c40-559e-95c7-ebda2d12bebf",
        "attributes": {
            "productOfferReference": "offer3",
            "merchantReference": "MER000001",
            "quantity": 10,
            "sku": "091_25873091"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/shopping-lists/c0bc6296-8a0c-50d9-b25e-5bface7671ce/shopping-list-items/946451d1-3c40-559e-95c7-ebda2d12bebf"
        }
    }
}
```
</details>

For response attributes, see [Add items to a shopping list](#shopping-list-items-response-attributes).
For the attributes of included resources, see [Retrieve a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html#concrete-products-response-attributes).

## Remove an item from a shopping list

To remove an item from a shopping list, send the request:

***
`DELETE` **/shopping-lists/*{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*/shopping-list-items/*{% raw %}{{{% endraw %}shopping_list_item_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list to delete an item from. |
| ***{% raw %}{{{% endraw %}shopping_list_item_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list item to remove. To get it, [Retrieve shopping lists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/manage-using-glue-api/glue-api-manage-marketplace-shopping-lists.html), or [Retrieve a shopping list](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/manage-using-glue-api/glue-api-manage-marketplace-shopping-lists.html) with the `shopping-list-items` included. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

Request sample:

`DELETE https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08`

### Response

If the item is removed successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is incorrect. |
| 002 | Access token is missing. |
| 400 | Provided access token is not an [access token of a сompany user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html). |
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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
