---
title: Managing Guest Carts
originalLink: https://documentation.spryker.com/v2/docs/managing-guest-carts
redirect_from:
  - /v2/docs/managing-guest-carts
  - /v2/docs/en/managing-guest-carts
---

The Carts API provides access to management of customers' shopping carts. The following document covers working with guest carts.

Guest carts come with an expiration date, which means that unregistered users can use their carts only for a limited time frame. After the lifetime of a guest cart expires, it is deleted by the system automatically.It is up to you to decide, how long you want them to be saved. Also, with the introduction of the Carts API, comes the possibility to persist guest carts. While carts for registered customers have always been persisted, the introduction of the API brings possibility to persist carts of guest customers.

Only one cart can be created for each guest customer.

{% info_block infoBox %}
If you want to know how to process carts of registered users, see [Managing Carts of Registered Users](https://documentation.spryker.com/v2/docs/managing-carts-of-registered-users-201907
{% endinfo_block %}.)


## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Carts API](https://documentation.spryker.com/v2/docs/cart-feature-integration).

## Resources for Accessing Guest Carts
The `/guest-carts` and `/guest-cart-items` resources provide endpoints to manage carts of users who haven't yet registered in the system or authenticated with the Glue REST API. Such carts provide the possibility for users to place items on a cart without the necessity to provide any registration information.

Each guest customer is identified by the value of the **X-Anonymous-Customer-Unique-Id** header. The header needs to be passed with each request related to a guest user. Glue REST API does not assign unique IDs to guest customer users. It is the responsibility of the API client to generate and manage unique IDs for all guest user sessions.

## Creating a Guest Cart
To create a guest cart for an unauthenticated user, you simply need to place an item or several items on a new guest card. To do this, send a POST request to the following endpoint:

`/guest-cart-items`

Sample request: `POST http://mysprykershop.com/guest-cart-items`

### Request
#### Headers:

`X-Anonymous-Customer-Unique-Id` - specifies a unique guest user ID for the new cart. If the specified user already has a cart, the item or items will be added on their existing cart instead of creating a new one.

#### Attributes:

|  Attribute| Type | Required | Description |
| --- | --- | --- | --- |
| sku | String | ✓ | Specifies the SKU part number of the item to place on the new guest cart. |
| quantity | String | ✓ | Specifies the number of items to place on the guest cart. |

**Sample Request Body**
```js
{
	"data": {
		"type": "guest-cart-items",
		"attributes": {
			"sku": "022_21994751",
			"quantity": 1
		}
	}
}
```

### Response
If a request was successful and a cart was created, the endpoint responds with a RestCartsResponse containing information about the new cart.
**Sample Response**
```js
{
	"data": {
		"type": "carts",
		"id": "2506b65c-164b-5708-8530-94ed7082e802",
		"attributes": {
			"priceMode": "GROSS_MODE",
			"currency": "EUR",
			"store": "DE",
			"discounts": [
				{
					"displayName": "10% Discount for all orders above",
					"amount": 9114,
					"code": null
				}
			],
			"totals": {
				"expenseTotal": 0,
				"discountTotal": 9114,
				"taxTotal": 9777,
				"subtotal": 91136,
				"grandTotal": 82022
			}
		},
		"links": {
			"self": "http://mysprykershop.com/carts/2506b65c-164b-5708-8530-94ed7082e802"
		},
			"relationships": {
				"items": {
					"data": [
						{
							"type": "items",
							"id": "022_21994751"
						}
					]
				}
			}
		},
		"included": [
			{
				"type": "concrete-product-image-sets",
				"id": "022_21994751",
				"attributes": {
					"imageSets": [
						{
							"name": "default",
							"images": [
								{
									"externalUrlLarge": "//images.icecat.biz/img/norm/high/21994751-Sony.jpg",
									"externalUrlSmall": "//images.icecat.biz/img/norm/medium/21994751-Sony.jpg"
								}
							]
						},
						{
							"name": "default",
							"images": [
								{
									"externalUrlLarge": "//images.icecat.biz/img/norm/high/21994751-Sony.jpg",
									"externalUrlSmall": "//images.icecat.biz/img/norm/medium/21994751-Sony.jpg"
								}
							]
						}
					]
				},
					"links": {
						"self": "http://mysprykershop.com/concrete-products/022_21994751/concrete-product-image-sets"
				}
			},
			{
				"type": "concrete-product-availabilities",
				"id": "022_21994751",
				"attributes": {
					"availability": true,
					"quantity": 10,
					"isNeverOutOfStock": true
				},
				"links": {
					"self": "http://mysprykershop.com/concrete-products/022_21994751/concrete-product-availabilities"
				}
			},
			{
				"type": "concrete-product-prices",
				"id": "022_21994751",
				"attributes": {
					"price": 26000,
					"prices": [
						{
							"priceTypeName": "DEFAULT",
							"netAmount": null,
							"grossAmount": 26000
						}
					]
				},
				"links": {
					"self": "http://mysprykershop.com/concrete-products/022_21994751/concrete-product-prices"
				}
			},
			{
				"type": "concrete-products",
				"id": "022_21994751",
				"attributes": {
					"sku": "022_21994751",
					"name": "Sony Cyber-shot DSC-WX220",
					"description": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing it, and slip in your pocket. Shooting great photos and videos is easy with the W800. Buttons are positioned for ease of use, while a dedicated movie button makes shooting movies simple. The vivid 2.7-type Clear Photo LCD display screen lets you view your stills and play back movies with minimal effort. Whip out the W800 to capture crisp, smooth footage in an instant. At the press of a button, you can record blur-free 720 HD images with digital sound. Breathe new life into a picture by using built-in Picture Effect technology. There’s a range of modes to choose from – you don’t even have to download image-editing software.",
					"attributes": {
						"megapixel": "18.2 MP",
						"display": "LCD",
						"digital_zoom": "20 x",
						"sensor_type": "CMOS",
						"brand": "Sony",
						"color": "Gold"
					},
					"superAttributesDefinition": [
						"color"
					],
					"metaTitle": "Sony Cyber-shot DSC-WX220",
					"metaKeywords": "Sony,Entertainment Electronics",
					"metaDescription": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing i"
				},
				"links": {
					"self": "http://mysprykershop.com/concrete-products/022_21994751"
				},
				"relationships": {
					"concrete-product-image-sets": {
						"data": [
							{
								"type": "concrete-product-image-sets",
								"id": "022_21994751"
							}
						]
					},
					"concrete-product-availabilities": {
						"data": [
							{
								"type": "concrete-product-availabilities",
								"id": "022_21994751"
							}
						]
					},
					"concrete-product-prices": {
						"data": [
							{
								"type": "concrete-product-prices",
								"id": "022_21994751"
							}
						]
					}
				}
			},
			{
				"type": "items",
				"id": "022_21994751",
				"attributes": {
					"sku": "022_21994751",
					"quantity": 1,
					"groupKey": "022_21994751",
					"amount": null,
					"calculations": {
						"unitPrice": 26000,
						"sumPrice": 52000,
						"taxRate": 19,
						"unitNetPrice": 0,
						"sumNetPrice": 0,
						"unitGrossPrice": 26000,
						"sumGrossPrice": 52000,
						"unitTaxAmountFullAggregation": 3736,
						"sumTaxAmountFullAggregation": 7472,
						"sumSubtotalAggregation": 52000,
						"unitSubtotalAggregation": 26000,
						"unitProductOptionPriceAggregation": 0,
						"sumProductOptionPriceAggregation": 0,
						"unitDiscountAmountAggregation": 2600,
						"sumDiscountAmountAggregation": 5200,
						"unitDiscountAmountFullAggregation": 2600,
						"sumDiscountAmountFullAggregation": 5200,
						"unitPriceToPayAggregation": 23400,
						"sumPriceToPayAggregation": 46800
				}
			},
			"links": {
				"self": "http://mysprykershop.com/carts/2506b65c-164b-5708-8530-94ed7082e802/items/022_21994751"
			},
			"relationships": {
				"concrete-products": {
					"data": [
						{
							"type": "concrete-products",
							"id": "022_21994751"
						}
					]
				}
			}
		}
	]
}
```

**Response Attributes**
**General Cart Information**

| Field* | Type | Description |
| --- | --- | --- |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected when the cart was created. |
| store | String | Store for which the cart was created. |
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Discount information**

| Field* | Type | Description |
| --- | --- | --- |
|displayName  |String  |Discount name.  |
| code |  String| Discount code applied to the cart. |
| amount | Integer | Discount amount applied to the cart. |
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Totals Information**

| Field* | Type | Description |
| --- | --- | --- |
|expenseTotal  | String |Total amount of expenses (including e.g. shipping costs).  |
| discountTotal | Integer | Total amount of discounts applied to the cart. |
|  taxTotal| String | Total amount of taxes to be paid. |
|subTotal  | Integer | Subtotal of the cart. |
| grandTotal | Integer | Grand total of the cart. |
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Cart Item Information**

| Field* | Type | Description |
| --- | --- | --- |
| sku |String  | SKU of the product. |
| quantity |Integer  |Quantity of the given product in the cart.  |
| groupKey |String  | Unique item identifier. The value is generated based on product parameters. |
| amount | Integer |  Amount of the products in the cart.|
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Cart Item Calculation Information**

| Field* | Type | Description |
| --- | --- | --- |
| unitPrice | Integer | Single item price without assuming is it net or gross. This value should be used everywhere a price is disabled. It allows switching the tax mode without side effects. |
|sumPrice  | Integer |Sum of all items prices calculated.  |
|  taxRate| Integer |Current tax rate in per cent.  |
| unitNetPrice | Integer | Single item net price. |
|sumNetPrice  | Integer |Sum of all items' net price.  |
| unitGrossPrice | Integer |Single item gross price.  |
| sumGrossPrice | Integer | Sum of items gross price. |
| unitTaxAmountFullAggregation | Integer | 	Total tax amount for a given item with additions. |
| sumTaxAmountFullAggregation | Integer | Total tax amount for a given amount of items with additions. |
| sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| unitSubtotalAggregation | Integer | Subtotal for the given item. |
| unitProductOptionPriceAggregation | Integer |Item total product option price.  |
| sumProductOptionPriceAggregation | Integer |Item total of product options for the given sum of items.  |
|  unitDiscountAmountAggregation| Integer |Item total discount amount.  |
|sumDiscountAmountAggregation  | Integer | Sum Item total discount amount. |
| unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions.|
|  sumDiscountAmountFullAggregation| Integer | Item total discount amount with additions. |
| unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
|sumPriceToPayAggregation  | Integer |Sum of the prices to pay (after discounts).  |
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.
The response contains a unique identifier returned in the id attribute and a self link that can be used to access the card in the future.

**Possible Errors**

| Code | Reason |
| --- | --- |
| 102 | Failed to add an item to the new cart. |
| 107 | Failed to create a cart. |
| 109 | Anonymous customer ID is missing. |

## Retrieving Carts of Guest Users
There are 2 possible ways how you can access a cart of a guest user

* By the unique identifier of the guest user
{% info_block infoBox %}
The user's unique identifier is passed in the **X-Anonymous-Customer-Unique-Id** header when creating a cart. It is managed by the API client.
{% endinfo_block %}
`/guest-carts`
Sample request: `GET http://mysprykershop.com/guest-carts`
**Headers:**
**X-Anonymous-Customer-Unique-Id** - specifies the unique guest user ID.

* By the unique identifier of the cart
{% info_block infoBox %}
The unique identifier of the cart is passed by the Glue API in the id attribute of a **RestCartsResponse** when a new guest cart is created.
{% endinfo_block %}
`/guest-carts/{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}`
Sample request: `GET http://mysprykershop.com/guest-carts/2506b65c-164b-5708-8530-94ed7082e802`
where `2506b65c-164b-5708-8530-94ed7082e802` is the ID of the cart you need.

### Response
No matter which of the 2 endpoints you use, it will respond with a **RestCartsResponse**.
**Sample Response**
```js
{
	"data": [
		{
			"type": "carts",
			"id": "c481acf2-a4de-5d09-9d0d-c3fc5b1645ba",
			"attributes": {
				"priceMode": "GROSS_MODE",
				"currency": "EUR",
				"store": "DE",
				"discounts": [
					{
						"displayName": "10% Discount for all orders above",
						"amount": 4250,
						"code": null
					}
				],
					"totals": {
						"expenseTotal": 0,
						"discountTotal": 4250,
						"taxTotal": 6107,
						"subtotal": 42502,
						"grandTotal": 38252
					}
				},
					"links": {
						"self": "http://mysprykershop/carts/c481acf2-a4de-5d09-9d0d-c3fc5b1645ba"
				},
					"relationships": {
						"items": {
							"data": [
							{
								"type": "items",
								"id": "177_25913296"
							}
						]
					}
				}
			}
		],
		"links": {
			self": "http://mysprykershop/guest-carts"
		},
		"included": [
			{
				"type": "concrete-product-image-sets",
				"id": "177_25913296",
				"attributes": {
					"imageSets": [
						{
							"name": "default",
							"images": [
								{
									"externalUrlLarge": "//images.icecat.biz/img/norm/high/24867659-4916.jpg",
									"externalUrlSmall": "//images.icecat.biz/img/norm/medium/24867659-4916.jpg"
								}
							]
						},
						{
						"name": "default",
						"images": [
							{
								"externalUrlLarge": "//images.icecat.biz/img/norm/high/24867659-4916.jpg",
								"externalUrlSmall": "//images.icecat.biz/img/norm/medium/24867659-4916.jpg"
							}
						]
					}
				]
			},
			"links": {
				"self": "http://mysprykershop/concrete-products/177_25913296/concrete-product-image-sets"
			}
		},
		{
			"type": "concrete-product-availabilities",
			"id": "177_25913296",
			"attributes": {
				"availability": true,
				"quantity": 20,
				"isNeverOutOfStock": false
			},
			"links": {
				"self": "http://mysprykershop/concrete-products/177_25913296/concrete-product-availabilities"
			}
		},
		{
			"type": "concrete-product-prices",
				"id": "177_25913296",
				"attributes": {
					"price": 42502,
					"prices": [
						{
							"priceTypeName": "DEFAULT",
							"netAmount": null,
							"grossAmount": 42502
						}
					]
				},
				"links": {
					"self": "http://mysprykershop/concrete-products/177_25913296/concrete-product-prices"
				}
			},
			{
				"type": "concrete-products",
				"id": "177_25913296",
				"attributes": {
					"sku": "177_25913296",
					"name": "Samsung Galaxy Tab Active 8.0 32 GB",
					"description": "Water and Dust Resistance (IP67) Keep working continuously in virtually any environment with IP67 environmental sealing that protects against damage from water and dust. Gain toughness and stability without sacrificing a premium design with 9.75-mm thickness(without cover) and a 393-gram light weight with rugged reinforcement. Don’t worry about drops or impacts in active business environments. With its included cover, Samsung Galaxy Tab Active is designed to handle drops of up to 1.2 meters with protective cover (3.9 feet). Save time on communications and work process management with easy NFC device pairing and tag reading. A 3.1-megapixel (MP) Auto Focus (AF) camera with a Flash feature enables easy, efficient barcode scanning to facilitate communication and workflow.",
					"attributes": {
						"storage_media": "flash",
						"processor_frequency": "1.2 GHz",
						"display_diagonal": "20.3 cm",
						"aspect_ratio": "16:09",
						"brand": "Samsung",
						"internal_storage_capacity": "32 GB"
					},
					"superAttributesDefinition": [
						"storage_media",
						"processor_frequency",
						"internal_storage_capacity"
					],
					"metaTitle": "Samsung Galaxy Tab Active 8.0 8 GB",
					"metaKeywords": "Samsung,Communication Electronics",
					"metaDescription": "Water and Dust Resistance (IP67) Keep working continuously in virtually any environment with IP67 environmental sealing that protects against damage from w"
				},
				"links": {
					"self": "http://mysprykershop/concrete-products/177_25913296"
				},
				relationships": {
					"concrete-product-image-sets": {
						"data": [
							{
								"type": "concrete-product-image-sets",
								"id": "177_25913296"
							}
						]
					},
					"concrete-product-availabilities": {
						"data": [
							{
								"type": "concrete-product-availabilities",
								"id": "177_25913296"
							}
						]
					},
					"concrete-product-prices": {
						"data": [
							{
								"type": "concrete-product-prices",
								"id": "177_25913296"
							}
						]
					}
				}
			},
			{
			"type": "items",
			"id": "177_25913296",
			"attributes": {
				"sku": "177_25913296",
				"quantity": "1",
				"groupKey": "177_25913296",
				"amount": null,
				"calculations": {
					"unitPrice": 42502,
					"sumPrice": 42502,
					"taxRate": 19,
					"unitNetPrice": 0,
					"sumNetPrice": 0,
					"unitGrossPrice": 42502,
					"sumGrossPrice": 42502,
					"unitTaxAmountFullAggregation": 6107,
					"sumTaxAmountFullAggregation": 6107,
					"sumSubtotalAggregation": 42502,
					"unitSubtotalAggregation": 42502,
					"unitProductOptionPriceAggregation": 0,
					"sumProductOptionPriceAggregation": 0,
					"unitDiscountAmountAggregation": 4250,
					"sumDiscountAmountAggregation": 4250,
					"unitDiscountAmountFullAggregation": 4250,
					"sumDiscountAmountFullAggregation": 4250,
					"unitPriceToPayAggregation": 38252,
					"sumPriceToPayAggregation": 38252
				}
			},
			"links": {
				"self": "http://mysprykershop/carts/c481acf2-a4de-5d09-9d0d-c3fc5b1645ba/items/177_25913296"
			},
			"relationships": {
				"concrete-products": {
					"data": [
						{
							"type": "concrete-products",
							"id": "177_25913296"
						}
					]
				}
			}
		}
	]
}
```

**Response Attributes**
**General Cart Information**

| Field* | Type |Description  |
| --- | --- | --- |
|priceMode  | String | Price mode that was active when the cart was created. |
| currency | String |	Currency that was selected when the cart was created.  |
|store  | String |  Store for which the cart was created.|
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Discount Information**

| Field* | Type |Description  |
| --- | --- | --- |
|displayName  | String | Discount name. |
|amount  | Integer | Discount amount applied to the cart. |
|code  |String  | Discount code applied to the cart. |
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Totals Information**

| Field* | Type | Description |
| --- | --- | --- |
| expenseTotal | String |Total amount of expenses (including e.g. shipping costs)  |
|discountTotal  | Integer |Total amount of discounts applied to the cart.  |
|taxTotal  |String  |  Total amount of taxes to be paid.|
|  subTotal| Integer | Subtotal of the cart. |
| grandTotal | Integer | rand total of the cart. |
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Cart Item Information**

| Field* | Type | Description |
| --- | --- | --- |
|  sku| String |	SKU of the product.  |
| quantity | Integer |Quantity of the given product in the cart.  |
|  groupKey| String | Unique item identifier. The value is generated based on product parameters. |
|amount  | Integer | 	Amount of the product in the cart. 
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Cart item calculation information**

| Field* | Type | Description |
| --- | --- | --- |
| unitPrice | Integer | Single item price without assuming is it net or gross. This value should be used everywhere a price is disabled. It allows switching the tax mode without side effects. |
| sumPrice | Integer | Sum of all items prices calculated. |
| taxRate | Integer |  Current tax rate in per cent.|
| unitNetPrice | Integer | Single item net price. |
| sumNetPrice | Integer |Sum of all items' net price.  |
|  unitGrossPrice| Integer | Single item gross price. |
|sumGrossPrice  | Integer | Sum of items gross price. |
|  unitTaxAmountFullAggregation| Integer | Total tax amount for a given item with additions. |
| sumTaxAmountFullAggregation | Integer | 	Total tax amount for a given amount of items with additions. |
|  sumSubtotalAggregation| Integer | Sum of subtotals of the items. |
| unitSubtotalAggregation | Integer | Subtotal for the given item. |
| unitProductOptionPriceAggregation | Integer |Item total product option price.  |
| sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| unitDiscountAmountAggregation | Integer | Item total discount amount. |
|sumDiscountAmountAggregation| Integer | Sum Item total discount amount. |
| unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions. |
|sumDiscountAmountFullAggregation| Integer |	Item total discount amount with additions.  |
| unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| sumPriceToPayAggregation | Integer |Sum of the prices to pay (after discounts).|
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Possible Errors**

|Code  | Reason |
| --- | --- |
| 101 |A cart with the specified ID was not found.  |
| 104 | Cart ID missing. |
|109  | Anonymous customer ID is missing. |

## Adding Items to Guest Carts
To add items to guest carts, send a `POST` request to one of the following endpoints:

* reference guest cart by **guest user ID**
{% info_block infoBox %}
The user's unique identifier is passed in the **X-Anonymous-Customer-Unique-Id** header when creating a cart. It is managed by the API client.
{% endinfo_block %}
`/guest-cart-items`
Sample request: `GET http://mysprykershop.com/guest-cart-items`
**Headers:**
**X-Anonymous-Customer-Unique-Id** - specifies the unique guest user ID.

* by the unique identifier of the cart
{% info_block infoBox %}
The unique identifier of the cart is passed by the Glue API in the id attribute of a **RestCartsResponse** when a new guest cart is created.
{% endinfo_block %}
`/guest-carts/{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}`
Sample request: `POST http://mysprykershop.com/guest-carts/2506b65c-164b-5708-8530-94ed7082e802/guest-cart-items`
where `2506b65c-164b-5708-8530-94ed7082e802` is the ID of the cart you need.

### Request
**Attributes:**

| Attribute |  Type| Required | Description |
| --- | --- | --- | --- |
| sku | String | ✓ | Specifies the SKU part number of an item to add to the cart. |
| quantity | String | ✓ | Specifies the quantity of items to add. |

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

## Response
In case of a successful update, the endpoint will also respond with a **RestCartsResponse** containing the new items.

**Possible Errors**

| Code |Reason  |
| --- | --- |
| 101 |A cart with the specified ID was not found.  |
| 102 |Failed to add an item.  |
| 104 | Cart ID missing. |
| 109 |Anonymous customer ID is empty.  |

## Removing Items from Guest Carts
To remove an item from a guest cart, send a `DELETE` request to one of the following endpoints:

`/guest-carts/{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}/guest-cart-items/{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}`

Sample request: `DELETE http://mysprykershop.com/guest-carts/2506b65c-164b-5708-8530-94ed7082e802/guest-cart-items/177_25913296`

where `2506b65c-164b-5708-8530-94ed7082e802` is the ID of the cart you need and `177_25913296` is the SKU of the concrete product you want to remove.

**Headers:**
**X-Anonymous-Customer-Unique-Id** - specifies the unique guest user ID.

{% info_block infoBox %}
The unique identifier of the cart is passed by the Glue API in the id attribute of a **RestCartsResponse** when a new guest cart is created.
{% endinfo_block %}

{% info_block infoBox %}
The user's unique identifier is passed in the **X-Anonymous-Customer-Unique-Id** header when creating a cart. It is managed by the API client.
{% endinfo_block %}


### Response
If the item was deleted successfully, the endpoint will respond with a **204 No Content** status code.

**Possible Errors**

|Code  |Reason  |
| --- | --- |
|101  | A cart with the specified ID was not found. |
|  103| 	Item could not be found in the cart. |
| 104 | 	Cart ID missing. |
|106  |Failed to delete an item.  |
|  109|Anonymous customer ID is empty.  |

## Changing Item Quantity in a Guest Cart
To change the quantity of certain items in a guest cart, use the following endpoints with the `PATCH` method:

`/guest-carts/{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}/guest-cart-items/{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}`
Sample request: `PATCH http://mysprykershop.com/guest-carts/2506b65c-164b-5708-8530-94ed7082e802/guest-cart-items/177_25913296`
where `2506b65c-164b-5708-8530-94ed7082e802` is the ID of the cart you need and `177_25913296` is the SKU the concrete product for which to change the quantity.

**Headers:**
**X-Anonymous-Customer-Unique-Id** - specifies the unique guest user ID.

{% info_block infoBox %}
The unique identifier of the cart is passed by the Glue API in the id attribute of a **RestCartsResponse** when a new guest cart is created.
{% endinfo_block %}
{% info_block infoBox %}
The user's unique identifier is passed in the **X-Anonymous-Customer-Unique-Id** header when creating a cart. It is managed by the API client.
{% endinfo_block %}

### Request
**Attributes:**

|Attribute  |Type  | Required | Description |
| --- | --- | --- | --- |
| sku | String | ✓ | Specifies the SKU part number of an item to add to the cart. |
|  quantity	| String | ✓ |Specifies the quantity of items to add.  |

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
In case of a successful update, the endpoint will also respond with a **RestCartsResponse** with updated quantity.

**Possible Errors**

| Code | Reason |
| --- | --- |
|  101| 	A cart with the specified ID was not found. |
| 102 |Failed to update the item.  |
|103  | Item could not be found in the cart. |
|104  |	Cart ID missing.  |
|  109| Anonymous customer ID is empty. |

## Assigning Guest Cart to a Registered Customer
Initially, guest carts are anonymous. In other words, they are not related to any particular user. However, if an anonymous customer authenticates or registers in the system, you can link their guest cart with their user account, so that they don't lose the list of products they want to purchase. For this purpose, you need to transform a guest cart into a registered user cart.

To assign a guest cart to a new customer, send a request to create a customer and pass the **X-Anonymous-Customer-Unique-Id** header as a part of your request. To assign a cart to an already registered customer who wants to log in, include the **X-Anonymous-Customer-Unique-Id** header in the authentication request.

{% info_block infoBox %}
The user's unique identifier is passed in the **X-Anonymous-Customer-Unique-Id** header when creating a cart. It is managed by the API client.
{% endinfo_block %}

