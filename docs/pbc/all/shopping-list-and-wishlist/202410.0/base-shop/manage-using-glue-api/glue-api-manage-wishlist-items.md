---
title: "Glue API: Manage wishlist items"
description: Managing wishlist items via Glue API.
last_updated: Nov 29, 2021
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-wishlists/managing-wishlist-items.html
  - /docs/pbc/all/shopping-list-and-wishlist/202311.0/manage-using-glue-api/manage-wishlist-items-via-glue-api.html
  - /docs/pbc/all/shopping-list-and-wishlist/202204.0/base-shop/manage-using-glue-api/glue-api-manage-wishlist-items.html
related:
  - title: Managing wishlists
    link: docs/pbc/all/shopping-list-and-wishlist/page.version/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html
  - title: Authenticating as a customer
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-authenticate-as-a-customer.html
  - title: Wishlist feature overview
    link: docs/pbc/all/shopping-list-and-wishlist/page.version/base-shop/wishlist-feature-overview.html
---

This endpoint allows you to add and remove items from wishlists.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Wishlist API Feature Integration](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-wishlist-glue-api.html)
* [Install the Product Configuration Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-configuration-glue-api.html)

## Add an item to a wishlist

To add an item to a wishlist, send the request:

---
`POST` **/wishlists/*{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*/wishlist-items**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*** | Unique identifier of the wishlist to add the items to. [Create a wishlist](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html#create-a-wishlist) or [retrieve all wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html#retrieve-wishlists) to get it. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

Request sample: add an item to a wishlist

`POST https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items`

```json
{
		"data": {
			"type": "wishlist-items",
			"attributes": {
				"sku": "064_18404924"
			}
		}
	}
```

<details><summary>Request sample: add a configurable product to a wishlist</summary>

`POST https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items`

```json
{
    "data": {
        "type": "wishlist-items",
        "attributes": {
            "sku": "093_24495843",
            "productConfigurationInstance": {
                "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.12.2021\"}",
                "configuration": "{\"time_of_day\": \"2\"}",
                "configuratorKey": "DATE_TIME_CONFIGURATOR",
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

{% include pbc/all/glue-api-guides/{{page.version}}/wishlist-items-request-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/wishlist-items-request-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/abstract-product-prices-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-product-prices-response-attributes.md -->

### Response

Response sample: add an item to a wishlist

```json
{
		"data": {
			"type": "wishlist-items",
			"id": "064_18404924",
			"attributes": {
				"sku": "064_18404924"
			},
			"links": {
				"self": "https://glue.mysprykershop.com/wishlists/c917e65b-e8c3-5c8b-bec6-892529c64b30/wishlist-items/064_18404924"
			}
		}
	}
```

<details><summary>Response sample: add a configurable product to a wishlist</summary>

```json
{
    "data": {
        "type": "wishlist-items",
        "id": "093_24495843_98bf36f052d23f10a8a081694ad4f45e",
        "attributes": {
            "productOfferReference": null,
            "merchantReference": "MER000001",
            "id": "093_24495843_98bf36f052d23f10a8a081694ad4f45e",
            "sku": "093_24495843",
            "availability": {
                "isNeverOutOfStock": false,
                "availability": false,
                "quantity": "0.0000000000"
            },
            "productConfigurationInstance": {
                "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.12.2021\"}",
                "configuration": "{\"time_of_day\": \"2\"}",
                "configuratorKey": "DATE_TIME_CONFIGURATOR",
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
            },
            "prices": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/b70e1073-a740-5a48-bb5e-0449a9e51d53/wishlist-items/093_24495843_98bf36f052d23f10a8a081694ad4f45e"
        }
    }
}
```

</details>

{% include pbc/all/glue-api-guides/{{page.version}}/wishlist-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/wishlist-items-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/abstract-product-prices-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-product-prices-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-product-availabilities-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-product-availabilities-response-attributes.md -->

## Update a wishlist item

{% info_block warningBox "Warning" %}

Only configurable products can be updated.

{% endinfo_block %}


To update a wishlist item, send the request:

---
`PATCH` **/wishlists/*{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*/wishlist-items/*{% raw %}{{{% endraw %}wishlist_item_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*** | Unique identifier of the wishlist to delete an item from. [Create a wishlist](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html#create-a-wishlist) or [retrieve all wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html#retrieve-wishlists) to get it. |
| ***{% raw %}{{{% endraw %}wishlist_item_id{% raw %}}}{% endraw %}*** | Unique identifier of a configurable product to update. To get this identifier, [retrieve a wishlist with items included](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html#retrieve-wishlists) or [add a configurable product to a wishlist](#add-an-item-to-a-wishlist). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

<details><summary>Request sample: update a configurable product in a wishlist</summary>

`PATCH https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items/093_24495843_98bf36f052d23f10a8a081694ad4f45e`

```json
{
    "data": {
        "type": "wishlist-items",
        "attributes": {
            "sku": "093_24495843",
            "productConfigurationInstance": {
                "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.10.2021\"}",
                "configuration": "{\"time_of_day\": \"2\"}",
                "configuratorKey": "DATE_TIME_CONFIGURATOR",
                "isComplete": false,
                "quantity": 4,
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

{% include pbc/all/glue-api-guides/{{page.version}}/wishlist-items-request-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/wishlist-items-request-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/abstract-product-prices-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-product-prices-response-attributes.md -->

### Response

<details><summary>Response sample: update a configurable product in a wishlist</summary>

```json
{
    "data": {
        "type": "wishlist-items",
        "id": "093_24495843_98bf36f052d23f10a8a081694ad4f45e",
        "attributes": {
            "productOfferReference": null,
            "merchantReference": "MER000001",
            "id": "093_24495843_98bf36f052d23f10a8a081694ad4f45e",
            "sku": "093_24495843",
            "availability": {
                "isNeverOutOfStock": false,
                "availability": false,
                "quantity": "0.0000000000"
            },
            "productConfigurationInstance": {
                "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.10.2021\"}",
                "configuration": "{\"time_of_day\": \"2\"}",
                "configuratorKey": "DATE_TIME_CONFIGURATOR",
                "isComplete": false,
                "quantity": 4,
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
            },
            "prices": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/b70e1073-a740-5a48-bb5e-0449a9e51d53/wishlist-items/093_24495843_94a23d655bf161d6ab0088457f4ea2fc"
        }
    }
}
```

</details>

{% include pbc/all/glue-api-guides/{{page.version}}/wishlist-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/wishlist-items-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/abstract-product-prices-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-product-prices-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-product-availabilities-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-product-availabilities-response-attributes.md -->


## Delete a wishlist item

To delete wishlist item, send the request:

---
`DELETE` **/wishlists/*{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*/wishlist-items/*{% raw %}{{{% endraw %}wishlist_item_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*** | Unique identifier of the wishlist to delete an item from. [Create a wishlist](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html#create-a-wishlist) or [retrieve all wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html#retrieve-wishlists) to get it. |
| ***{% raw %}{{{% endraw %}wishlist_item_id{% raw %}}}{% endraw %}*** | Unique identifier of a concrete or configurable product to delete. To get this identifier, [retrieve a wishlist with items included](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html#retrieve-wishlists) or [add an item to a wishlist](#add-an-item-to-a-wishlist). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

Request sample: delete a wishlist item

`DELETE https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items/064_18404924`

### Response

If the item is removed successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 201 | Cannot find the wishlist. |
| 206 | Cannot add an item to the wishlist. |
| 207 | Cannot remove the item. |
| 208 | An item with the provided SKU does not exist in the wishlist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
