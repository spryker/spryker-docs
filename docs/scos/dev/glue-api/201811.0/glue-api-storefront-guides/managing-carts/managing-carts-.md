---
title: Managing Carts of Registered Users
originalLink: https://documentation.spryker.com/v1/docs/managing-carts-of-registered-users
redirect_from:
  - /v1/docs/managing-carts-of-registered-users
  - /v1/docs/en/managing-carts-of-registered-users
---

The **Carts API** provides access to management of customers' shopping carts. The following document covers working with **carts of registered users**.

{% info_block infoBox %}
If you want to know how to process carts of registered users, see [Managing Guest Carts](/docs/scos/dev/glue-api/201811.0/glue-api-storefront-guides/managing-carts/managing-guest-
{% endinfo_block %}.)

## Guest Carts and Carts of Registered Users
Access to carts of registered users is provided by the /carts resource. Before accessing the resource, you need to authenticate a user first. For more details, see [Authentication and Authorization](/docs/scos/dev/glue-api/201811.0/glue-api-storefront-guides/authentication-).

Unlike guest carts, carts of registered users have unlimited lifetime. Registered users can have as many carts as they want.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see Carts API.

## Creating Registered User Cart
To create a guest cart for a registered user, send a POST request to the following endpoint:
`/carts`
Sample request: `POST http://mysprykershop.com/carts`

{% info_block infoBox %}
Apart from creating a new cart, you can also convert a cart of a guest customer to a cart of a registered user when a guest user registers or authenticates. For details, see section **Assigning Guest Cart to Registered Customer** in Managing Guest Carts.
{% endinfo_block %}

{% info_block errorBox %}
To use this endpoint, you need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/201811.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}.)

### Request
**Attributes**

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| priceMode |  Enum| ✓ |  Sets the price mode to be used for the cart. Possible values:<br><ul><li>**GROSS_MODE** - prices after tax;</li><li>**NET_MODE** - prices before tax;</li>For details, see [Net and Gross Prices]().</ul>|
| currency | String | ✓ | Sets the cart currency. |
| store | String | ✓ | Sets the name of the store where to create the cart. |

**Sample Request Body**
```js
{
	"data":{
		"type":"carts",
		"attributes":{
			"priceMode":"GROSS_MODE",
			"currency":"EUR",
			"store":"DE"
		}
	}
}
```

## Response
If a request was successful and a cart was created, the endpoint responds with a **RestCartsResponse** containing information about the new cart. The response contains a unique identifier returned in the id attribute and a self link that can be used to access the card in the future.

**Sample Response**
```js
{
	"data": {
		"type": "carts",
		"id": "4741fc84-2b9b-59da-bb8d-f4afab5be054",
		"attributes": {
			"priceMode": "GROSS_MODE",
			"currency": "EUR",
			"store": "DE",
			"discounts": {},
			"totals": null
		},
		"links": {
			"self": "http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054"
		}
	}
}
```

**Response Attributes**
**General Cart Information**

| Field* | Type | Description |
| --- | --- | --- |
| priceMode |String  | Price mode that was active when the cart was created. |
| currency |String  |Currency that was selected when the cart was created.  |
|  store|String  | Store for which the cart was created.|
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Discount Information**

| Field* | Type | Description |
| --- | --- | --- |
| displayName |String  | Discount name. |
| amount | Integer | Discount amount applied to the cart. |
|  code| String |  Discount code applied to the cart.|
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Totals Information**

| Field* | Type | Description |
| --- | --- | --- |
| expenseTotal | String |Total amount of expenses (including e.g. shipping costs).  |
| discountTotal | Integer |Total amount of discounts applied to the cart.  |
| taxTotal | String |  Total amount of taxes to be paid.|
|  subTotal|Integer  |Subtotal of the cart.  |
| grandTotal |Integer  | Grand total of the cart. |
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Cart Item Information**

| Field* | Type | Description |
| --- | --- | --- |
| sku | String |SKU of the product.  |
| quantity | Integer |Quantity of the given product in the cart.  |
|groupKey  | String | Unique item identifier. The value is generated based on product parameters. |
|  amount| Integer |  Amount of the product in the cart.|
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Cart Item Calculation Information**
| Field* | Type | Description |
| --- | --- | --- |
| unitPrice | Integer | Single item price without assuming is it net or gross. This value should be used everywhere a price is disabled. It allows switching the tax mode without side effects. sumPrice |
| Integer Sum of all items prices calculated. taxRate | Integer | Current tax rate in per cent. |
| unitNetPrice | Integer | Single item net price. |
| sumNetPrice | Integer | Sum all items' net price. |
| unitGrossPrice | Integer | Single item gross price. |
| sumGrossPrice | Integer | Sum of items gross price. |
| unitTaxAmountFullAggregation | Integer | Total tax amount for a given item with additions. |
| sumTaxAmountFullAggregation | Integer | Total tax amount for a given amount of items with additions. |
| sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| unitSubtotalAggregation | Integer | Subtotal for the given item. |
| unitProductOptionPriceAggregation | Integer | Item total product option price. |
| sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| unitDiscountAmountAggregation | Integer | Item total discount amount. |
| sumDiscountAmountAggregation | Integer | Sum Item total discount amount. |
| unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions. |
| sumDiscountAmountFullAggregation | Integer | Item total discount amount with additions. |
| unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| sumPriceToPayAggregation | Integer | Sum of the prices to pay (after discounts). |
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Possible Errors**
| Code | Reason |
| --- | --- |
| 107 | Failed to create a cart. |

## Retrieving Carts of Registered Users
To access all carts that a regular user has, send a GET request to the following endpoint:
`/carts`
Sample request: `GET http://mysprykershop.com/carts`
To get a specific cart by ID, use the following endpoint:
`/carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}`
Sample request: `GET http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054`
where `4741fc84-2b9b-59da-bb8d-f4afab5be054` is the ID of the cart you need.

{% info_block errorBox %}
To use the endpoints, you need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/201811.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}.)

### Response
No matter which of the 2 endpoints you use, they will respond with a RestCartsResponse containing the requested cart(s).
**Sample Response**
```js
{
	"data": [
		{
			"type": "carts",
			"id": "f8cfd611-4611-57d7-bc70-f81cee96a6af",
			"attributes": {
				"priceMode": "GROSS_MODE",
				"currency": "EUR",
				"store": "DE",
				"discounts": {},
				"totals": {
					"expenseTotal": null,
					"discountTotal": null,
					"taxTotal": null,
					"subtotal": null,
					"grandTotal": null
				}
			},
			"links": {
				"self": "http://mysprykershop.com/carts/f8cfd611-4611-57d7-bc70-f81cee96a6af"
			}
		}
	],
	"links": {
		"self": "http://mysprykershop.com/carts"
	}
}
```
Sample response for a user that doesn't have any carts:
```js
{
	"data": [],
	"links": {
		"self": "http://mysprykershop.com/carts"
	}
}
```

**Possible Errors**
| Code | Reason |
| --- | --- |
| 101 | A cart with the specified ID was not found. |
| 104 | Cart ID missing. |

## Adding Items to Carts of Registered Users
To add items to a cart, send a POST request to the following endpoint:
`/carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/items`
Sample request: `POST http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054/items`
where `4741fc84-2b9b-59da-bb8d-f4afab5be054` is the ID of the cart you need.

{% info_block errorBox %}
To use this endpoint, you need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/201811.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}.)

## Request
**Attributes**

| Attribute | Type | Required | Description |
|---|---|---|---|
| sku | String |✓  | Specifies the SKU part number of an item to add to the cart. |
| quantity | String |✓  | Specifies the quantity of items to add. |

**Sample Request Body**
```js
{
	"data": {
		"type": "guest-cart-items",
		"attributes": {
			"sku": "209_12554247",
			"quantity": 10
		}
	}
}
```

### Response
In case of a successful update, the endpoint will also respond with a **RestCartsResponse** containing the new items.
**Possible Errors**
| Code | Reason |
| --- | --- |
| 101 | A cart with the specified ID was not found. |
| 102 | Failed to add an item. |
| 104 | Cart ID missing. |

## Removing Items from Guest Carts
To remove an item from a cart, send a DELETE request to the following endpoint:
`/carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/items/{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}`
Sample request: `DELETE http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054/items/177_25913296`
where `4741fc84-2b9b-59da-bb8d-f4afab5be054` is the ID of the cart you need and `177_25913296` is the SKU of the concrete product you want to remove.

{% info_block errorBox %}
To use this endpoint, you need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/201811.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}.)

### Response
If the item was deleted successfully, the endpoint will respond with a **204 No Content** status code.
**Possible Errors**
| Code | Reason |
| --- | --- |
| 101 | A cart with the specified ID was not found. |
| 103 | Item could not be found in the cart. |
| 104 | Cart ID missing. |
| 106 | Failed to delete an item. |

## Changing Item Quantity in Registered User's Cart
To change the quantity of certain items in a cart, use the following endpoint with the PATCH method:
`/carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/items/{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}`
Sample request: `PATCH http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054/items/177_25913296`
where `4741fc84-2b9b-59da-bb8d-f4afab5be054` is the ID of the cart you need and `177_25913296` is the SKU of the concrete product for which to change the quantity.

{% info_block errorBox %}
To use this endpoint, you need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/201811.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}.)

### Request
**Attributes**
| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| sku | String | ✓ | Specifies the SKU part number of the item to change. |
| quantity | String | ✓ | Specifies the new quantity of items. |

**Sample Request Body**
```js
{
	"data": {
		"type": "guest-cart-items",
		"attributes": {
			"sku": "209_022_21994751",
			"quantity": 10
		}
	}
}
```

### Response
In case of a successful update, the endpoint will also respond with a **RestCartsResponse** with updated quantity.

**Possible Errors**
| Code | Reason |
| --- | --- |
| 101 | A cart with the specified ID was not found. |
| 102 | Failed to update the item. |
| 103 | Item could not be found in the cart. |
| 104 | Cart ID missing. |

## Deleting Registered User's Cart
To delete a cart of a registered user, send a DELETE request to the following endpoint:
`/carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}`
Sample request: `DELETE http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054`
where `4741fc84-2b9b-59da-bb8d-f4afab5be054` is the ID of the cart you want to delete.

### Response
If the cart was deleted successfully, the endpoint will respond with a **204 No Content** status code.
**Possible Errors**
| Code | Reason |
| --- | --- |
| 101 | A cart with the specified ID was not found. |
| 104 | Cart ID missing. |
| 105 | Failed to delete the cart. |
