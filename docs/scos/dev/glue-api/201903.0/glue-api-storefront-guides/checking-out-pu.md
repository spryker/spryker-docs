---
title: Checking Out Purchases and Getting Checkout Data
originalLink: https://documentation.spryker.com/v2/docs/checking-out-purchases-and-getting-checkout-data
redirect_from:
  - /v2/docs/checking-out-purchases-and-getting-checkout-data
  - /v2/docs/en/checking-out-purchases-and-getting-checkout-data
---

The **Checkout API** allows you to place orders and retrieve checkout information.

In order to create a checkout experience, we offer an endpoint that provides you with all checkout data. The data is based on customers themselves and their shopping carts. For registered customers, the endpoint also provides their registered addresses as well as the applicable payment and shipment methods. If necessary, the endpoint may be called each time additional customer data is provided. For example, for the purposes of fraud protection, specific payment methods can be disallowed for certain delivery addresses. In this case, a second call may be needed for verification of payment method restrictions.

Apart from that, the API also provides an endpoint that allows placing an order.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Checkout API](https://documentation.spryker.com/v2/docs/checkout-feature-integration-201907).

## Place Order
To place an order, send a POST request to the following endpoint:
`/checkout`
Sample request: `POST http://mysprykershop.com/checkout`

### Request
A request should contain:

* Valid customer information (e.g. first name, last name, salutation etc).
* Payment and shipment methods. They should exist in the system.
* Valid shipping and billing addresses.
* Also, the customer's cart should not be empty.

**Attributes**
| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| customer | RestCustomersRegisterRequestData | ✓ | Information about the customer<br>For details, see [Managing Customers](/docs/scos/dev/glue-api/201903.0/glue-api-storefront-guides/managing-custom). |
| idCart | RestAddressesRequestData | ✓ | ID of the customer's cart<br>For details, see [Managing Carts of Registered Users](https://documentation.spryker.com/v2/docs/managing-carts-of-registered-users-201907). |
| billingAddress | RestAddressesRequestData |  ✓| Customer's billing address<br>For details, see [Managing Customers](/docs/scos/dev/glue-api/201903.0/glue-api-storefront-guides/managing-custom). |
| shippingAddress | RestAddressesRequestData |  ✓| Customer's shipping address<br>For details, see [Managing Customers](/docs/scos/dev/glue-api/201903.0/glue-api-storefront-guides/managing-custom). |
| payments | RestPayment | ✓| Payment options, such as the payment system, method of payment, etc<br>For details, see [Payment Step](https://documentation.spryker.com/v2/docs/checkout-steps-201903#payment-step). |

**Sample Request Body**
```js
{
    "data": {
        "type": "checkout-data",
        "attributes": {
            "cart": {
                "customer": {
                    "salutation": "Mr",
                    "email": "spencor.hopkin@spryker.com",
                    "firstName": "spencor",
                    "lastName": "hopkin"
                },
                "idCart": "4741fc84-2b9b-59da-bb8d-f4afab5be054",
                "billingAddress": {
                    "salutation": "Mr",
                    "email": "spencor.hopkin@spryker.com",
                    "firstName": "spencor",
                    "lastName": "hopkin",
                    "address1": "West road",
                    "address2": "212",
                    "address3": "",
                    "zipCode": "61000",
                    "city": "Berlin",
                    "iso2Code": "DE",
                    "company": "Spryker",
                    "phone": "+380669455897",
                    "isDefaultShipping": true,
                    "isDefaultBilling": true
                },
                "shippingAddress": {
                    "salutation": "Mr",
                    "email": "spencor.hopkin@spryker.com",
                    "firstName": "spencor",
                    "lastName": "hopkin",
                    "address1": "West road",
                    "address2": "212",
                    "address3": "",
                    "zipCode": "61000",
                    "city": "Berlin",
                    "iso2Code": "DE",
                    "company": "Spryker",
                    "phone": "+380669455897",
                    "isDefaultShipping": false,
                    "isDefaultBilling": false
                },
                "payments": [
                    {
                        "paymentMethod": "invoice",
                        "paymentProvider": "dummyPayment"
                    }
                ],
                "shipment": {
                    "idShipmentMethod": 1
                }
            }
        }
    }
}
```

### Response
The basic response will provide you with an **order reference** that can be used to access checkout data. Moreover, the relevant order resource will be included as well. The response type is **RestCheckoutResponse**.

<details open>
<summary>Sample Response </summary>

```js
{
	"data": {
		"type": "checkout",
		"id": null,
		"attributes": {
			"orderReference": "DE--3"
		},
		"links": {
			"self": "http://mysprykershop.com/checkout"
		},
		"relationships": {
			"orders": {
				"data": [
						{
							"type": "orders",
							"id": "DE--3"
						}
				]
			}
		}
	},
	"included": [
		{
			"type": "orders",
			"id": "DE--3",
			"attributes": {
				"createdAt": "2018-12-13 08:55:54.701521",
				"totals": {
					"expenseTotal": 490,
					"discountTotal": 7810,
					"taxTotal": 10519,
					"subtotal": 73200,
					"grandTotal": 65880,
					"canceledTotal": 0
				},
				"currencyIsoCode": "EUR",
				"items": [
					{
						"name": "Canon IXUS 165",
						"sku": "012_25904598",
						"sumPrice": 36600,
						"sumPriceToPayAggregation": 32940,
						"quantity": 1,
						"metadata": {
							"superAttributes": [],
							"image": "//d2s0ynfc62ej12.cloudfront.net/b2c/25904598_3791.jpg"
						},
						"calculatedDiscounts": [
							{
								"unitAmount": 3660,
								"sumAmount": 3660,
								"displayName": "10% Discount for all orders above",
								"description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
								"voucherCode": null,
								"quantity": 1
							}
					],
						"unitGrossPrice": 36600,
						"sumGrossPrice": 36600,
						"taxRate": "19.00",
						"unitNetPrice": 0,
						"sumNetPrice": 0,
						"unitPrice": 36600,
						"unitTaxAmountFullAggregation": 5259,
						"sumTaxAmountFullAggregation": 5259,
						"refundableAmount": 32940,
						"canceledAmount": 0,
						"sumSubtotalAggregation": 36600,
						"unitSubtotalAggregation": 36600,
						"unitProductOptionPriceAggregation": 0,
						"sumProductOptionPriceAggregation": 0,
						"unitExpensePriceAggregation": 0,
						"sumExpensePriceAggregation": null,
						"unitDiscountAmountAggregation": 3660,
						"sumDiscountAmountAggregation": 3660,
						"unitDiscountAmountFullAggregation": 3660,
						"sumDiscountAmountFullAggregation": 3660,
						"unitPriceToPayAggregation": 32940,
						"taxRateAverageAggregation": "19.00",
						"taxAmountAfterCancellation": null
					},
					{
						"name": "Canon IXUS 165",
						"sku": "012_25904598",
						"sumPrice": 36600,
						"sumPriceToPayAggregation": 32940,
						"quantity": 1,
						"metadata": {
							"superAttributes": [],
							"image": "//d2s0ynfc62ej12.cloudfront.net/b2c/25904598_3791.jpg"
						},
						"calculatedDiscounts": [
							{
								"unitAmount": 3660,
								"sumAmount": 3660,
								"displayName": "10% Discount for all orders above",
								"description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
								"voucherCode": null,
								"quantity": 1
							}
						],
						"unitGrossPrice": 36600,
						"sumGrossPrice": 36600,
						"taxRate": "19.00",
						"unitNetPrice": 0,
						"sumNetPrice": 0,
						"unitPrice": 36600,
						"unitTaxAmountFullAggregation": 5260,
						"sumTaxAmountFullAggregation": 5260,
						"refundableAmount": 32940,
						"canceledAmount": 0,
						"sumSubtotalAggregation": 36600,
						"unitSubtotalAggregation": 36600,
						"unitProductOptionPriceAggregation": 0,
						"sumProductOptionPriceAggregation": 0,
						"unitExpensePriceAggregation": 0,
						"sumExpensePriceAggregation": null,
						"unitDiscountAmountAggregation": 3660,
						"sumDiscountAmountAggregation": 3660,
						"unitDiscountAmountFullAggregation": 3660,
						"sumDiscountAmountFullAggregation": 3660,
						"unitPriceToPayAggregation": 32940,
						"taxRateAverageAggregation": "19.00",
						"taxAmountAfterCancellation": null
					}
				],
				"expenses": [
					{
						"type": "SHIPMENT_EXPENSE_TYPE",
						"name": "Standard",
						"sumPrice": 490,
						"unitGrossPrice": 490,
						"sumGrossPrice": 490,
						"taxRate": "19.00",
						"unitNetPrice": 0,
						"sumNetPrice": 0,
						"canceledAmount": null,
						"unitDiscountAmountAggregation": null,
						"sumDiscountAmountAggregation": null,
						"unitTaxAmount": 0,
						"sumTaxAmount": 0,
						"unitPriceToPayAggregation": 0,
						"sumPriceToPayAggregation": 0,
						"taxAmountAfterCancellation": null
					}
				],
				"billingAddress": {
					"salutation": "Mr",
					"firstName": "spencor",
					"middleName": null,
					"lastName": "hopkin",
					"address1": "West road",
					"address2": "212",
					"address3": "",
					"company": "Spryker",
					"city": "Berlin",
					"zipCode": "61000",
					"poBox": null,
					"phone": "+380669455897",
					"cellPhone": null,
					"description": null,
					"comment": null,
					"email": null,
					"country": "Germany",
					"iso2Code": "DE"
				},
				"shippingAddress": {
					"salutation": "Mr",
					"firstName": "spencor",
					"middleName": null,
					"lastName": "hopkin",
					"address1": "West road",
					"address2": "212",
					"address3": "",
					"company": "Spryker",
					"city": "Berlin",
					"zipCode": "61000",
					"poBox": null,
					"phone": "+380669455897",
					"cellPhone": null,
					"description": null,
					"comment": null,
					"email": null,
					"country": "Germany",
					"iso2Code": "DE"
				},
				"priceMode": "GROSS_MODE",
				"payments": [
					{
						"amount": 65880,
						"paymentProvider": "DummyPayment",
						"paymentMethod": "invoice"
					}
				],
				"calculatedDiscounts": [
					{
						"unitAmount": 490,
						"sumAmount": 490,
						"displayName": "Free standard delivery",
						"description": "Free standard delivery for all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
						"voucherCode": null,
						"quantity": 1
					},
					{
						"unitAmount": 3660,
						"sumAmount": 3660,
						"displayName": "10% Discount for all orders above",
						"description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
						"voucherCode": null,
						"quantity": 1
					}
				]
			},
				"links": {
					"self": "http://mysprykershop.com/orders/DE--3"
			}
		}
	]
}
```
<br>
</details>

The **included** section of the response contains additional order details.
**General Order Information**
| Field* | Type | Description |
| --- | --- | --- |
| name | String | Date and time when the order was created. |
| expenseTotal | Integer | Total amount of expenses (including all costs, e.g. shipping costs). |
| discountTotal | Integer | Total amount of discounts applied to the order. |
| taxTotal | Integer | Total amount of taxes paid. |
| subtotal | Integer | Subtotal of the order. |
| grandTotal | Integer | Grand total of the order |
| canceledTotal | Integer | Total canceled amount. |
| currencyIsoCode | String | Currency that was selected when placing the order. |
| priceMode | String | Price mode that was active when placing the order. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Order Item Information**
| Field* | Type | Description |
| --- | --- | --- |
| name | String | Product name. |
| sku | String | Product SKU. |
| sumPrice | Integer | Sum of all the prices. |
| sumPriceToPayAggregation | Integer | Sum of the prices to pay (after discounts). |
| quantity | Integer | Quantity of product ordered. |
| superAttributes | String | Since the product purchased is a concrete product, and super attributes are saved with an abstract product, this field is expected to be always empty.|
| image | String|>A URL to the product image. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Calculated Discounts for Items**
| Field* | Type | Description |
| --- | --- | --- |
| unitAIntedermount | Integer | Discount value appliled to each order item of the<br>corresponding product.<br>sumAmount | Integer | Sum of all the discount values applied to the order items of the<br>corresponding products.<br>displayName | String | Name of the discount applied |
| description | String | Discount description. |
| voucherCode | String | Voucher code redeemed. |
| quantity | Integer | Number of discounts applied to the corresponding product. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Included Item Calculation**
| Field* | Type | Description |
| --- | --- | --- |
| unitGrossPrice | Integer | Single item gross price. |
| sumGrossPrice |  | Integer | Gross price of all items summarized. |
| taxRate | Integer | Current tax rate in per cent. |
| unitNetPrice | Integer | Single item net price. |
| sumNetPrice | Integer | Sum all items' net price. |
| unitPrice | Integer | Single item price without assuming is it net or gross. This value should be used everywhere a price is disabled. It allows switching the tax mode without side effects. |
| unitTaxAmountFullAggregation | Integer | Total tax amount for a given item with additions. |
| sumTaxAmountFullAggregation | Integer | Total tax amount for a given amount of items with additions. |
| refundableAmount | Integer | Item available refundable amount (order only). |
| canceledAmount | Integer | Total canceled amount of this item (order only). |
| sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| refundableAmount | Integer | Item available refundable amount (order only). |
| canceledAmount | Integer | Total canceled amount for this item (order only). |
| sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| unitSubtotalAggregation | Integer | Subtotal for the given item. |
| unitProductOptionPriceAggregation | Integer | Item total product option price. |
| sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| unitExpensePriceAggregation | Integer | Item expense total for a given item. |
| sumExpensePriceAggregation | Integer | Sum of item expense totals for the items. |
| unitDiscountAmountAggregation | Integer | Item total discount amount. |
| sumDiscountAmountAggregation | Integer | Sum Item total discount amount. |
| unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions. |
| sumDiscountAmountFullAggregation | Integer | Item total discount amount with additions. |
| unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| taxRateAverageAggregation | Integer | Item tax rate average, with additions used when recalculating tax amount after cancellation. |
| taxAmountAfterCancellation | Integer | Tax amount after cancellation, recalculated using tax average. |

\* The fields mentioned are all attributes in the response. Type and ID are not mentioned.
**Expenses**

| Field* | Type | Description |
| --- | --- | --- |
| sumPrice | Integer | Sum of item price calculated. |
| unitGrossPrice | Integer | Single item gross price. |
| sumGrossPrice | Integer | Sum of items gross price. |
| taxRate | Integer | Current tax rate in per cent. |
| unitNetPrice | Integer | Single item net price. |
| sumNetPrice | Integer | Sum of items net price. |
| canceledAmount | Integer | Total canceled amount for the given item (order only). |
| unitDiscountAmountAggregation | Integer | Item total discount amount. |
| sumDiscountAmountAggregation | Integer | Sum Item total discount amount. |
| unitTaxAmount | Integer | Tax amount for a single item after discounts. |
| sumTaxAmount | Integer | Tax amount for a sum of items (order only). |
| unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| sumPriceToPayAggregation | Integer | Sum Item total price to pay after discounts with additions. |
| taxAmountAfterCancellation | Integer | Tax amount after cancellation, recalculated using tax average. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.
**Billing and Shipping Addresses**

| Field* | Type | Description |
| --- | --- | --- |
| salutation | String | Salutation to use when addressing to the customer. |
| firstName | String | Customer's first name. |
| lastName | String | Customer's last name. |
| address1 | String | 1st line of the customer's address. |
| address2 | String | 2nd line of the customer's address. |
| address3 | String | 3rd line of the customer's address. |
| zipCode | String | ZIP code. |
| city | String | City |
| country | String | Country |
| company | String | Company |
| phone | String | Phone number. |
| isDefaultShipping | String | Specifies whether the address should be used as the default shipping address of the customer. If the parameter is not set, the default value is true. This is also the case for the first address to be saved. |
| isDefaultBilling | String | Specifies whether the address should be used as the default billing address of the customer. If the parameter is not set, the default value is true. This is also the case for the first address to be saved. |
| iso2Code | String | ISO 2 Country Code to use. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.
**Payments**

| Field* | Type | Description |
| --- | --- | --- |
| amount | Integer | The amount paid via the corresponding payment provider in cents. |
| paymentProvider | String | Name of the payment provider. |
| paymentMethod | String | Name of the payment method. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

## Retrieve Checkout Data
To get information on a particular order, send the following POST request:
`/checkout-data`
Sample request: `POST http://mysprykershop.com/checkout-data`
{% info_block errorBox "Authentication" %}
To use this endpoint:<ul><li>**Registered** customers need to authenticate first. For details, see [Authentication and Authorization](
{% endinfo_block %}.</li><li>For **anonymous** users, you need to add their _X-Anonymous-Customer-Unique-Id_ in the request header. For details, see Managing Guest Carts.</li></ul>)

### Request
To request order details, the POST body must contain the order reference received during checkout.

_Minimum required data_
```js
{
    "data": {
        "type": "checkout-data",
        "attributes": {
            "idCart": "{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}"
        }
    }
}
```

Alternatively, you can pass the whole of the checkout request body, the same as during checkout.
**Full request**
```js
{
    "data": {
        "type": "checkout-data",
        "attributes": {
            "cart": {
                "customer": {
                    "salutation": "Mr",
                    "email": "spencor.hopkin@spryker.com",
                    "firstName": "spencor",
                    "lastName": "hopkin"
                },
                "idCart": "4741fc84-2b9b-59da-bb8d-f4afab5be054",
                "billingAddress": {
                    "salutation": "Mr",
                    "email": "spencor.hopkin@spryker.com",
                    "firstName": "spencor",
                    "lastName": "hopkin",
                    "address1": "West road",
                    "address2": "212",
                    "address3": "",
                    "zipCode": "61000",
                    "city": "Berlin",
                    "iso2Code": "DE",
                    "company": "Spryker",
                    "phone": "+380669455897",
                    "isDefaultShipping": true,
                    "isDefaultBilling": true
                },
                "shippingAddress": {
                    "salutation": "Mr",
                    "email": "spencor.hopkin@spryker.com",
                    "firstName": "spencor",
                    "lastName": "hopkin",
                    "address1": "West road",
                    "address2": "212",
                    "address3": "",
                    "zipCode": "61000",
                    "city": "Berlin",
                    "iso2Code": "DE",
                    "company": "Spryker",
                    "phone": "+380669455897",
                    "isDefaultShipping": false,
                    "isDefaultBilling": false
                },
                "payments": [
                    {
                        "paymentMethod": "invoice",
                        "paymentProvider": "dummyPayment"
                    }
                ],
                "shipment": {
                    "idShipmentMethod": 1
                }
            }
        }
    }
}
```

### Response
The endpoint responds with a **RestCheckoutDataResponse** containing the checkout data.
**Sample Response**
```js
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [
                {
                    "salutation": "Mr",
                    "firstName": "Spencor",
                    "lastName": "Hopkin",
                    "address1": "Julie-Wolfthorn-Straße",
                    "address2": "1",
                    "address3": null,
                    "zipCode": "10115",
                    "city": "Berlin",
                    "country": {
                        "id_country": 60,
                        "iso2_code": "DE",
                        "iso3_code": "DEU",
                        "name": "Germany",
                        "postal_code_mandatory": true,
                        "postal_code_regex": "\\d{5}",
                        "regions": {}
                    },
                    "iso2Code": "DE",
                    "company": "spryker",
                    "phone": "+49 (30) 2084 98350",
                    "isDefaultShipping": null,
                    "isDefaultBilling": null
                }
            ],
            "paymentMethods": [
                {
                    "methodName": "dummyPaymentInvoice",
                    "requiredRequestData": [
                        "paymentMethod",
                        "paymentProvider",
                        "paymentSelection",
                        "dummyPaymentInvoice.dateOfBirth"
                    ]
                },
                {
                    "methodName": "dummyPaymentCreditCard",
                    "requiredRequestData": [
                        "paymentMethod",
                        "paymentProvider",
                        "paymentSelection",
                        "dummyPaymentCreditCard.cardType",
                        "dummyPaymentCreditCard.cardNumber",
                        "dummyPaymentCreditCard.nameOnCard",
                        "dummyPaymentCreditCard.cardExpiresMonth",
                        "dummyPaymentCreditCard.cardExpiresYear",
                        "dummyPaymentCreditCard.cardSecurityCode"
                    ]
                }
            ],
            "shipmentMethods": [
                {
                    "carrierName": "Spryker Dummy Shipment",
                    "idShipmentMethod": 1,
                    "name": "Standard",
                    "price": 490,
                    "taxRate": null,
                    "shipmentDeliveryTime": null
                },
                {
                    "carrierName": "Spryker Dummy Shipment",
                    "idShipmentMethod": 2,
                    "name": "Express",
                    "price": 590,
                    "taxRate": null,
                    "shipmentDeliveryTime": null
                },
                {
                    "carrierName": "Spryker Drone Shipment",
                    "idShipmentMethod": 3,
                    "name": "Air Standard",
                    "price": 500,
                    "taxRate": null,
                    "shipmentDeliveryTime": null
                },
                {
                    "carrierName": "Spryker Drone Shipment",
                    "idShipmentMethod": 4,
                    "name": "Air Sonic",
                    "price": 1000,
                    "taxRate": null,
                    "shipmentDeliveryTime": null
                },
                {
                    "carrierName": "Spryker Drone Shipment",
                    "idShipmentMethod": 5,
                    "name": "Air Light",
                    "price": 1500,
                    "taxRate": null,
                    "shipmentDeliveryTime": null
                }
            ]
        },
        "links": {
            "self": "http://mysprykershop.com/checkout-data"
        }
    }
}
```

**Sample Response:**
The following checkout data is included in the response:

**Addresses**
| Field* | Type | Description |
| --- | --- | --- |
| id | String | Address ID. |
| salutation | String | Salutation to use when addressing to the customer. |
| firstName | String | Customer's first name |
| lastName | String | Customer's last name |
| address1 | String | 1st line of the customer's address |
| address2 | String | 2nd line of the customer's address |
| address3 | String | 3rd line of the customer's address |
| zipCode | String | ZIP code |
| city | String | City |
| country | String | Country |
| company | String | Company |
| phone | String | Phone number |
| iso2Code | String | ISO 2 Country Code |
| isDefaultShipping | Boolean | Specifies whether the address should be used as the default shipping address of the customer. If the parameter is not set, the default value is **true**. |
| isDefaultBilling | Boolean | Specifies whether the address should be used as the default billing address of the customer. If the parameter is not set, the default value is **true**. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.
**Payment Provider and Payment Method**

| Field* | Type | Description |
| --- | --- | --- |
| paymentProviderName | String | Payment provider name. |
| paymentMethodName | String | Payment method name. |
| requiredRequestData | Array |  List of fields that needs to be provided to use this payment method when placing the order. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.
**Shipment carrier and shipment method Data**

| Field* | Type | Description |
| --- | --- | --- |
| carrierName | String | Shipment carrier name |
| id | String | Shipment carrier ID |
| name | String | Shipment method name |
| price | Integer | Shipment method price |
| taxRate | Integer | The associated tax rate |
| deliveryTime | String | Estimated delivery time information |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.
