---
title: "Glue API: Manage shopping list items"
description: Learn how to manage Spryker shopping list items via the Glue API in your Spryker Cloud Commerce OS Projects.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-shopping-list-items
originalArticleId: 9800fd79-ab57-4778-a68e-50b23236a3cc
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-shopping-lists/managing-shopping-list-items.html
  - /docs/pbc/all/shopping-list-and-wishlist/202311.0/manage-using-glue-api/manage-shopping-list-items-via-glue-api.html
  - /docs/pbc/all/shopping-list-and-wishlist/202204.0/base-shop/manage-using-glue-api/glue-api-manage-shopping-list-items.html

related:
  - title: Managing shopping lists
    link: docs/pbc/all/shopping-list-and-wishlist/latest/base-shop/manage-using-glue-api/glue-api-manage-shopping-lists.html
  - title: Shopping Lists feature overview
    link: docs/pbc/all/shopping-list-and-wishlist/latest/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html
---

This endpoint lets you manage shopping list items.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see these integration guides:
- [Install the Shopping Lists Glue API](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-shopping-lists-glue-api.html)
- [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)

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
| Authorization | string | &check; | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value. |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | concrete-products |


<details>
<summary>Request sample: add items to a shopping list with the `ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a` unique identifier.</summary>

`POST http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items`

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
<summary>Request sample: add items to a shopping list with the `ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a` unique identifier. Include information about the concrete products in the shopping list in the response.</summary>

`POST http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items?include=concrete-products`

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
<summary>Request sample: add a configurable product to a shopping list.</summary>

`POST https://glue.myspryker.com/shopping-lists/333327a9-3654-5382-b81b-4992458ebae8/shopping-list-items`

```json
{
    "data": {
        "type": "shopping-list-items",
        "attributes": {
            "sku": "093_24495843",
            "quantity": 3,
            "productConfigurationInstance": {
                "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.09.2050\"}",
                "configuration": "{\"time_of_day\": \"4\"}",
                "configuratorKey": "installation_appointment_test",
                "isComplete": true,
                "quantity": 3,
                "availableQuantity": 4,
                 "prices": [
                	  {
                        "priceTypeName": "DEFAULT",
                        "netAmount": 23434,
                        "grossAmount": 42502,
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
            }
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| sku | String | &check; | SKU of the product to add. Only [concrete products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) and [configurable products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html) are allowed. |
| quantity | Integer | &check; | Quantity of the product to add. |
| productConfigurationInstance.displayData  | Array  |&check; | Array of variables that are proposed for a Storefront user to set up in the configurator.  |
| productConfigurationInstance.configuration  | Array  | &check; | Default configurable product configuration.  |
| productConfigurationInstance.configuratorKey  | String  | &check; | Configurator type. |
| productConfigurationInstance.isComplete  | Boolean  | &check; | Shows if the configurable product configuration is complete:<div><ul><li>`true`—configuration complete.</li><li>`false`—configuration incomplete.</li></ul></div>  |
| productConfigurationInstance.quantity  | Integer  | &check; | Quantity of the product that is added to the wishlist.  |
| productConfigurationInstance.availableQuantity  | Integer  | &check; | Product quantity available in the store. |

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/abstract-product-prices-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-product-prices-response-attributes.md -->

### Response

<details>
<summary>Response sample: add items to a shopping list.</summary>

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
            "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08"
        }
    }
}  
```

</details>

<details>
<summary>Response sample: add items to a shopping list with the details on concrete products.</summary>

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
<summary>Response sample: add a configurable product to a shopping list.</summary>

```json
{
    "data": {
        "type": "shopping-list-items",
        "id": "f4ef6ec3-d0c1-55f8-80c9-6ef120d4761f",
        "attributes": {
            "productOfferReference": null,
            "merchantReference": "MER000001",
            "quantity": 3,
            "sku": "093_24495843",
            "productConfigurationInstance": {
                "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.09.2050\"}",
                "configuration": "{\"time_of_day\": \"4\"}",
                "configuratorKey": "installation_appointment_test",
                "isComplete": true,
                "quantity": 3,
                "availableQuantity": 4,
                "prices": [
                    {
                        "netAmount": 23434,
                        "grossAmount": 42502,
                        "priceTypeName": "DEFAULT",
                        "volumeQuantity": null,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": [
                            {
                                "grossAmount": 165,
                                "netAmount": 150,
                                "quantity": 5
                            },
                            {
                                "grossAmount": 158,
                                "netAmount": 145,
                                "quantity": 10
                            },
                            {
                                "grossAmount": 152,
                                "netAmount": 140,
                                "quantity": 20
                            }
                        ]
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue.de.scos.demo-spryker.com/shopping-lists/333327a9-3654-5382-b81b-4992458ebae8/shopping-list-items/f4ef6ec3-d0c1-55f8-80c9-6ef120d4761f"
        }
    }
}
```

</details>

{% include pbc/all/glue-api-guides/{{page.version}}/shopping-list-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/shopping-list-items-response-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/abstract-product-prices-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-product-prices-response-attributes.md -->

## Change item quantity in a shopping list

To change item quantity in a shopping list, send the request:

***
`PATCH` **/shopping-lists/*{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*/shopping-list-items/*{% raw %}{{{% endraw %}shopping_list_item_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list to update item quantity in. |
| ***{% raw %}{{{% endraw %}shopping_list_item_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list item to change the quantity of. To get it, [Retrieve shopping lists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-shopping-lists.html#retrieve-shopping-lists), or [Retrieve a shopping list](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-shopping-lists.html#retrieve-a-shopping-list) with the `shopping-list-items` included. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | concrete-products|


<details>
<summary>Request sample: in the shopping list with the id `ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a`, change quantity of the item with the id `00fed212-3dc9-569f-885f-3ddca41dea08`.</summary>

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
<summary>In the shopping list with the id `ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a`, change quantity of the item with the id `00fed212-3dc9-569f-885f-3ddca41dea08`. Include information about the respective concrete product in the response.</summary>

`PATCH https://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08?include=concrete-products`

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
<summary>Request sample: in the shopping list with the id `333327a9-3654-5382-b81b-4992458ebae8` change quantity of the configurable product item with the id `0323bd43-f9ff-5964-afe3-44a2085ce0c6`.</summary>

`PATCH https://glue.mysprykershop.com/shopping-lists/333327a9-3654-5382-b81b-4992458ebae8/shopping-list-items/0323bd43-f9ff-5964-afe3-44a2085ce0c6`

```json
{
"data": {
        "type": "shopping-list-items",
        "attributes": {
            "quantity": 3,
            "productConfigurationInstance": {
                "displayData": "{\"Preferred time of the day\": \"Morning\", \"Date\": \"9.09.2055\"}",
                "configuration": "{\"time_of_day\": \"4\"}",
                "configuratorKey": "installation_appointment_edit123",
                "isComplete": false,
                "quantity": 3,
                "availableQuantity": 4,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": 23434,
                        "grossAmount": 42502,
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
            }
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| quantity | Integer | &check; | New quantity of the product. |
| productConfigurationInstance.displayData  | Array  |&check; | Array of variables that are proposed for a Storefront user to set up in the configurator.  |
| productConfigurationInstance.configuration  | Array  | &check; | Default configurable product configuration.  |
| productConfigurationInstance.configuratorKey  | String  | &check; | Configurator type. |
| productConfigurationInstance.isComplete  | Boolean  | &check; | Shows if the configurable product configuration is complete:<div><ul><li>`true`—configuration complete.</li><li>`false`—configuration incomplete.</li></ul></div>  |
| productConfigurationInstance.quantity  | Integer  | &check; | Quantity of the product that is added to the wishlist.  |
| productConfigurationInstance.availableQuantity  | Integer  | &check; | Product quantity available in the store. |

### Response

<details>
<summary>Response sample: change item quantity in a shopping list.</summary>

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
            "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08"
        }
    }
}
```

</details>

<details>
<summary>Response sample: change item quantity in a shopping list with the details on concrete products.</summary>

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
                "self": "http://glue.mysprykershop.com/concrete-products/128_27314278"
            }
        }
    ]
}

```

</details>

<details>
<summary>Response sample: in the shopping list with the id `333327a9-3654-5382-b81b-4992458ebae8` change quantity of the configurable product with the id `0323bd43-f9ff-5964-afe3-44a2085ce0c6`.</summary>

```json
{
    "data": {
        "type": "shopping-list-items",
        "id": "0323bd43-f9ff-5964-afe3-44a2085ce0c6",
        "attributes": {
            "productOfferReference": null,
            "merchantReference": "MER000001",
            "quantity": 3,
            "sku": "093_24495843",
            "productConfigurationInstance": {
                "displayData": "{\"Preferred time of the day\": \"Morning\", \"Date\": \"9.09.2055\"}",
                "configuration": "{\"time_of_day\": \"4\"}",
                "configuratorKey": "installation_appointment_edit123",
                "isComplete": false,
                "quantity": 3,
                "availableQuantity": 4,
                "prices": [
                    {
                        "netAmount": 23434,
                        "grossAmount": 42502,
                        "priceTypeName": "DEFAULT",
                        "volumeQuantity": null,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": [
                            {
                                "grossAmount": 165,
                                "netAmount": 150,
                                "quantity": 5
                            },
                            {
                                "grossAmount": 158,
                                "netAmount": 145,
                                "quantity": 10
                            },
                            {
                                "grossAmount": 152,
                                "netAmount": 140,
                                "quantity": 20
                            }
                        ]
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/shopping-lists/333327a9-3654-5382-b81b-4992458ebae8/shopping-list-items/0323bd43-f9ff-5964-afe3-44a2085ce0c6"
        }
    }
}
```

</details>

{% include pbc/all/glue-api-guides/{{page.version}}/shopping-list-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/shopping-list-items-response-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/abstract-product-prices-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-product-prices-response-attributes.md -->

## Remove an item from a shopping list

To remove an item from a shopping list, send the request:

***
`DELETE` **/shopping-lists/*{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*/shopping-list-items/*{% raw %}{{{% endraw %}shopping_list_item_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list to delete an item from. |
| ***{% raw %}{{{% endraw %}shopping_list_item_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list item to remove. To get it, [Retrieve shopping lists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-shopping-lists.html#retrieve-shopping-lists), or [Retrieve a shopping list](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-shopping-lists.html#retrieve-a-shopping-list) with the `shopping-list-items` included. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

Request sample: remove an item from a shopping list

`DELETE http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08`

### Response

If the item is removed successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is incorrect. |
| 002 | Access token is missing. |
| 400 | Provided access token is not an [access token of a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html). |
| 901 | Shop list name or item name is not specified or too long.<br>OR<br> Item quantity is not specified or too large.|
| 1501 | Shopping list ID or item is not specified. |
| 1503 | Specified shopping list is not found. |
| 1504 | Specified shopping list item is not found. |
| 1508 | Concrete product is not found. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
