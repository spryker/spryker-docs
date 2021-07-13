This endpoint allows to add and remove items from wishlists.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see Marketplace Wishlist API Feature Integration.

## Add an item to a wishlist

To add an item to a wishlist, send the request:

------

`POST` **/wishlists/\*{{wishlist_id}}\*/wishlist-items**

------

| PATH PARAMETER        | DESCRIPTION                                                  |
| :-------------------- | :----------------------------------------------------------- |
| ***{{wishlist_id}}*** | Unique identifier of the wishlist to add the items to. [Create a wishlist](https://documentation.spryker.com/docs/managing-wishlists#create-a-wishlist) or [retrieve all wishlists](https://documentation.spryker.com/v6/docs/managing-wishlists#retrieve-wishlists) to get it. |

### Request

Request sample - adding a concrete product `POST https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items`

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

Request sample - adding a  product offer `POST https://glue.mysprykershop.com/wishlists/57c96d55-8a37-5998-927f-7bb663b69094/wishlist-items`

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

Request sample - adding a merchant product `POST https://glue.mysprykershop.com/wishlists/57c96d55-8a37-5998-927f-7bb663b69094/wishlist-items`

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

| ATTRIBUTE             | TYPE   | DESCRIPTION                                          |
| -------------------- | ----- | ---------------------------------------------------- |
| sku                   | String | SKU of a concrete product to add.                    |
| productOfferReference | String | Unique identifier of the product offer in the system.|

### Response

Response sample - adding a concrete product

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

Response sample - adding a  product offer

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

Response sample -  - adding a merchant product

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
            "self": "https://glue.de.marketplace.demo-spryker.com:80/wishlists/bb7dbe75-d892-582f-b438-d7f6cbfd3fc4/wishlist-items/109_19416433"
        }
    }
}
```



| ATTRIBUTE  | TYPE    | DESCRIPTION      |
| -------------------- | ------ | --------------------------------- |
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