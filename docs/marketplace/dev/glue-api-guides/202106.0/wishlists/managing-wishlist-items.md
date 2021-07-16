---
title: Managing wishlist items
description: Retrieve details about wishlist items and learn what else you can do with the resource in the Spryker Marketplace.
template: glue-api-storefront-guide-template
---

This endpoint allows you to add and remove items from wishlists.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see Marketplace Wishlist API Feature Integration. <!---LINK-->

## Add an item to a wishlist

To add an item to a wishlist, send the request:

------

`POST` **/wishlists/*{{wishlist_id}}*/wishlist-items**

------

| PATH PARAMETER   | DESCRIPTION     |
| --------------- | ---------------- |
| ***{{wishlist_id}}*** | Unique identifier of the wishlist to add the items to. [Create a wishlist](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/wishlists/managing-wishlists.html#create-a-wishlist) or [retrieve all wishlists](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/wishlists/managing-wishlists.html#retrieve-wishlists) to get it. |

### Request

<details>
<summary markdown='span'>Request sample: adding a concrete product to wishlist</summary>

 `POST https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items`

```JSON
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

<details>
<summary markdown='span'>Request sample - adding a  product offer</summary>

 `POST https://glue.mysprykershop.com/wishlists/57c96d55-8a37-5998-927f-7bb663b69094/wishlist-items`

```json
{
    "data": {
        "type": "wishlist-items",
        "attributes": {
            "sku": "092_24495842",
            "productOfferReference": "offer5"
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Request sample: adding a merchant product to wishlist</summary>

 `POST https://glue.mysprykershop.com/wishlists/57c96d55-8a37-5998-927f-7bb663b69094/wishlist-items`

```json
{
    "data": {
        "type": "wishlist-items",
        "attributes": {
            "sku": "109_19416433"
        }
    }
}
```
</details>

| ATTRIBUTE  | TYPE   | DESCRIPTION   |
| ------------ | ----- | ---------------- |
| sku                   | String | SKU of a concrete product to add.                    |
| productOfferReference | String | Unique identifier of the product offer in the system.|

### Response

<details>
<summary markdown='span'>Response sample - adding a concrete product</summary>

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
</details>

<details>
<summary markdown='span'>Response sample - adding a  product offer</summary>

```json
{
    "data": {
        "type": "wishlist-items",
        "id": "092_24495842_offer5",
        "attributes": {
            "productOfferReference": "offer5",
            "merchantReference": "MER000001",
            "id": "092_24495842_offer5",
            "sku": "092_24495842",
            "availability": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "10.0000000000"
            },
            "prices": [
                {
                    "priceTypeName": "ORIGINAL",
                    "grossAmount": 17459,
                    "netAmount": 15713,
                    "currency": {
                        "code": "EUR",
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                {
                    "priceTypeName": "DEFAULT",
                    "grossAmount": 7459,
                    "netAmount": 5713,
                    "currency": {
                        "code": "EUR",
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                {
                    "priceTypeName": "DEFAULT",
                    "grossAmount": 10000,
                    "netAmount": 8070,
                    "currency": {
                        "code": "CHF",
                        "name": "Swiss Franc",
                        "symbol": "CHF"
                    }
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/57c96d55-8a37-5998-927f-7bb663b69094/wishlist-items/092_24495842_offer5"
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Response sample -  - adding a merchant product</summary>

```json
{
    "data": {
        "type": "wishlist-items",
        "id": "109_19416433",
        "attributes": {
            "productOfferReference": null,
            "merchantReference": "MER000001",
            "id": "109_19416433",
            "sku": "109_19416433",
            "availability": {
                "isNeverOutOfStock": false,
                "availability": true,
                "quantity": "10.0000000000"
            },
            "prices": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/bb7dbe75-d892-582f-b438-d7f6cbfd3fc4/wishlist-items/109_19416433"
        }
    }
}
```
</details>



| ATTRIBUTE  | TYPE    | DESCRIPTION  |
| ----------- | ------ | --------------- |
| sku       | String  | SKU of the concrete product in the wishlist.     |
| productOfferReference | String  | Unique identifier of the product offer in the system.|
| merchantReference | String  | Merchant reference assigned to every merchant.  |
| id     | String  | Unique identifier of the product offer in the wishlist. It's created based on the SKU and offer reference. |
| availability    | Object  | Contains information on the product's availability. |
| isNeverOutOfStock | Boolean | A boolean to show if this is a product that is never out of stock. |
| availability  | Boolean | Boolean to inform about the availability.  |
| quantity  | Integer | Available stock (all warehouses aggregated).   |
| prices  | Array   | Contains information on prices.    |
| priceTypeName  | String  | Price type. |
| grossAmount  | Integer | Gross price in cents.  |
| netAmount | Integer | Net price in cents.   |
| currency.code  | String  | Currency code. |
| currency.name   | String  | Currency name. |
| currency.symbol       | String  | Currency symbol.   |

## Delete a wishlist item

To delete wishlist item, send the request:

------

`DELETE` **/wishlists/\*{{wishlist_id}}\*/wishlist-items/\*{{item_sku}}\***

------

| PATH PARAMETER | DESCRIPTION   |
| -------------- | -------------- |
| ***{{wishlist_id}}*** | Unique identifier of the wishlist to delete an item from. [Create a wishlist](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/wishlists/managing-wishlists.html#create-a-wishlis) or [retrieve all wishlists](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/wishlists/managing-wishlists.html#retrieve-wishlists) to get it. |
| ***{{item_sku}}***    | Unique identifier of the product to delete.                  |

### Request

Request sample: `DELETE https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items/064_18404924`

### Response

If the item is removed successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON  |
| ------ | --------------- |
| 201  | Cannot find the wishlist.                                    |
| 206  | Cannot add an item to the wishlist.                          |
| 207  | Cannot remove the item.                                      |
| 208  | An item with the provided SKU does not exist in the wishlist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).
