---
title: Managing wishlist items
description: Add and delete items from wishlists via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-wishlist-items
originalArticleId: 2ce23129-3ad7-4053-9e9d-8f5bf697aa87
redirect_from:
  - /2021080/docs/managing-wishlist-items
  - /2021080/docs/en/managing-wishlist-items
  - /docs/managing-wishlist-items
  - /docs/en/managing-wishlist-items
related:
  - title: Managing wishlists
    link: docs/scos/dev/glue-api-guides/page.version/managing-wishlists/managing-wishlists.html
  - title: Authenticating as a customer
    link: docs/scos/dev/glue-api-guides/page.version/managing-customers/authenticating-as-a-customer.html
---

This endpoint allows to add and remove items from wishlists.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Wishlist API Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-wishlist-feature-integration.html).

## Add an item to a wishlist

To add an item to a wishlist, send the request:

---
`POST` **/wishlists/*{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*/wishlist-items**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*** | Unique identifier of the wishlist to add the items to. [Create a wishlist](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-wishlists/managing-wishlists.html#create-a-wishlist) or [retrieve all wishlists](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-wishlists/managing-wishlists.html#retrieve-wishlists) to get it. |

### Request

<details><summary>Request sample</summary>

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

</details>

<details><summary>Request sample: Add a configuratble product to a wishilist</summary>

`POST https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items`

```json
{
    "data": {
        "type": "wishlist-items",
        "attributes": {
            "sku": "{{concrete_id}}",
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

<a name="request-attributes-description"></a>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| sku | String | SKU of a concrete product to add. |
| displayData  | Array  | Array of variables that are proposed for a Storefront user to set up in the configurator.  |
| configuration  | Array  | Default product configuration.  |
| configuratorKey  | String  | Configurator type.  |
| isComplete  | Boolean  | Shows if the configurable product configuration is complete:<div><ul><li>`true`—configuration complete</li><li>`false`—configuration incomplete</li></ul></div>  |
| quantity  | Integer  | Quantity of the product added to the wishlist.  |
| availableQuantity  | Integer  |  product available quantity in the store. |

For attribute descriptions of product prices, see [Retrieving abstract product prives](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/abstract-products/retrieving-abstract-product-prices.html#abstract-product-prices-response-attributes)

### Response

Resonse sample:

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
<details><summary>Respoonse sample: add a configuratble product to a wishilist</summary>

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
            "self": "http://glue.de.spryker.local/wishlists/b70e1073-a740-5a48-bb5e-0449a9e51d53/wishlist-items/093_24495843_98bf36f052d23f10a8a081694ad4f45e"
        }
    }
}
```

<a name="wishlishlist-items-response-attributes"></a>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| sku | String | SKU of a concrete product to add. |
| displayData  | Array  | Array of variables a Storefront user set up in the configurator.  |
| configuration  | Array  | Default product configuration.  |
| configuratorKey  | String  | Configurator type.  |
| isComplete  | Boolean  | Shows if the configurable product configuration is complete:<div><ul><li>`true`—configuration complete</li><li>`false`—configuration incomplete</li></ul></div>  |
| quantity  | Integer  | Quantity of the product added to the wishlist.  |
| availableQuantity  | Integer  |  product available quantity in the store. |

For attribute descriptions of product prices, see [Retrieving abstract product prives](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/abstract-products/retrieving-abstract-product-prices.html#abstract-product-prices-response-attributes)

For attribute desriptions of concrete product availabillity, see [Retrieving concrete product availability](/docs/scos/dev/glue-api-guides/202108.0/managing-products/concrete-products/retrieving-concrete-product-availability.html#concrete-product-availability-response-attributes)



## Delete a wishlist item

To delete wishlist item, send the request:

---
`DELETE` **/wishlists/*{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*/wishlist-items/*{% raw %}{{{% endraw %}item_sku{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*** | Unique identifier of the wishlist to delete an item from. [Create a wishlist](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-wishlists/managing-wishlists.html#create-a-wishlist) or [retrieve all wishlists](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-wishlists/managing-wishlists.html#retrieve-wishlists) to get it. |
| ***{% raw %}{{{% endraw %}item_sku{% raw %}}}{% endraw %}*** | Unique identifier of the product to delete. |

### Request

Request sample: `DELETE https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items/064_18404924`

### Response

If the item is removed successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 201 | Cannot find the wishlist. |
| 206 | Cannot add an item to the wishlist. |
| 207 | Cannot remove the item. |
| 208 | An item with the provided SKU does not exist in the wishlist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
