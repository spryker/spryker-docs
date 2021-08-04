---
title: Retrieving Customer's Order History
originalLink: https://documentation.spryker.com/v5/docs/retrieving-customers-order-history
redirect_from:
  - /v5/docs/retrieving-customers-order-history
  - /v5/docs/en/retrieving-customers-order-history
---

For every registered customer, there is an order history retrievable. The list of orders, as well as detailed order information including every step of the calculation and addresses used in the orders, is available for retrieval.

In your development, this resource can help you to:

* Make the order history available to customers
* Make order details available to enable reordering functionality

The **Order History API** allows you to retrieve all orders made by a registered customer.

{% info_block warningBox "Authentication" %}
Since order history is available for registered users only, the endpoints provided by the API cannot be accessed anonymously. For this reason, you always need to pass a user's authentication token in your REST requests. For details on how to authenticate a user and retrieve the token, see [Authentication and Authorization](https://documentation.spryker.com/v5/docs/en/authentication-and-authorization
{% endinfo_block %}.)

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Order Management Feature Integration](https://documentation.spryker.com/v5/docs/en/glue-api-order-management-feature-integration)
* [Glue API: Measurement Units Feature Integration](https://documentation.spryker.com/v5/docs/en/glue-api-measurement-units-feature-integration)

## Retrieving all Orders
To retrieve a list of all orders made by a registered customer, send the request:

---
`GET` **/orders**

---

### Request
Request sample: 
`GET http://glue.mysprykershop.com/orders`

### Response
The endpoint responds with an array of orders placed by the authenticated customer. In the response, each order will have a unique identifier. It is specified in the **id** attribute. You can use the ID to retrieve detailed order information. Also, **self** links will be provided to access an order. individually using the REST API.

<details open>
<summary>Response sample with one order</summary>
   
```
{
    "data": [
        {
            "type": "orders",
            "id": "DE--1",
            "attributes": {
                "createdAt": "2019-11-01 09:21:14.307061",
                "totals": {
                    "expenseTotal": 1000,
                    "discountTotal": 23286,
                    "taxTotal": 34179,
                    "subtotal": 236355,
                    "grandTotal": 214069,
                    "canceledTotal": 0
                },
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/orders/DE--1"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/orders"
    }
}
```
 <br>
</details>

| Attribute* | Type | Description |
| --- | --- | --- |
| createdAt | String | Date and time when the order was created. |
| expenseTotal | Integer | Total amount of expenses (e.g. shipping costs). |
| discountTotal | Integer | Total amount of discounts applied. |
| taxTotal | Integer | Total amount of taxes paid. |
| subtotal | Integer | Subtotal of the order. |
| grandTotal | Integer | Grand total of the order. |
| canceledTotal | Integer | Total canceled amount. |
| currencyIsoCode | String | ISO 4217 code of the currency that was selected when placing the order.|
| priceMode | String | Price mode that was active when placing the order. Possible values: <ul><li>**NET_MODE** - prices before tax;</li><li>**GROSS_MODE** - prices after tax.</li></ul> |

*Type and ID attributes are not mentioned.
 

## Paging Through Orders
By default, the above request will return all orders placed by a customer. However, you can also enable paging and receive results in pages of a limited size. For this purpose, use the **limit** and **offset** parameters in your request:
| URL | Description |
| --- | --- |
| /orders | Returns all orders made by a customer. |
| /orders?limit=10 | Returns maximum **10** orders. |
| /orders?offset=10&limit=10 | Returns orders **11** through **20**. |
| /orders?offset=20 | Returns all orders starting from the **21st** to the end. |

When paging is enabled, the **links** section of the JSON response will contain links for the first, previous, next and last pages.

<details open>
<summary>View example</summary>
   
```
{
    "data": [
        {
            "type": "orders",
            "id": "DE--1",
            "attributes": {
                "createdAt": "2018-11-01 17:57:14.354849",
                "totals": {
                    "expenseTotal": 490,
                    "discountTotal": 30237,
                    "taxTotal": 42746,
                    "subtotal": 297470,
                    "grandTotal": 267723,
                    "canceledTotal": 0
                },
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/orders/DE--1"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/orders?page[offset]=2&amp;page[limit]=2",
        "last": "http://glue.mysprykershop.com/orders?page[offset]=2&amp;page[limit]=2",
        "first": "http://glue.mysprykershop.com/orders?page[offset]=0&amp;page[limit]=2",
        "prev": "http://glue.mysprykershop.com/orders?page[offset]=0&amp;page[limit]=2"
    }
}
```
 <br>
</details>


## Retrieving an Order
To retrieve detailed information on an order, send the request:

---
`GET` **/orders/*{% raw %}{{{% endraw %}order_id{% raw %}}}{% endraw %}***

---

| Path parameter | Description |
| --- | --- |
| order_id | A unique identifier of an order. [Retrieve all orders](#retrieving-all-orders) to get it. |

### Request
Request sample: `GET http://glue.mysprykershop.com/orders/DE--1`

### Response

<details open>
<summary>Response sample</summary>

```json
{
    "data": {
        "type": "orders",
        "id": "DE--4",
        "attributes": {
            "createdAt": "2020-03-24 16:38:24.237860",
            "currencyIsoCode": "EUR",
            "priceMode": "GROSS_MODE",
            "totals": {
                "expenseTotal": 490,
                "discountTotal": 2490,
                "taxTotal": 6067,
                "subtotal": 39998,
                "grandTotal": 37998,
                "canceledTotal": 0,
                "remunerationTotal": 0
            },
            "billingAddress": {
                "salutation": "Mr",
                "firstName": "Test",
                "middleName": null,
                "lastName": "User",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "1",
                "address3": "new address",
                "company": "spryker",
                "city": "Berlin",
                "zipCode": "10115",
                "poBox": null,
                "phone": "+49 (30) 2084 98350",
                "cellPhone": null,
                "description": null,
                "comment": null,
                "email": null,
                "country": "Germany",
                "iso2Code": "DE"
            },
            "shippingAddress": {
                "salutation": "Ms",
                "firstName": "Test",
                "middleName": null,
                "lastName": "User",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "1",
                "address3": "new one",
                "company": "spryker",
                "city": "Berlin",
                "zipCode": "10115",
                "poBox": null,
                "phone": "+49 (30) 2084 98350",
                "cellPhone": null,
                "description": null,
                "comment": null,
                "email": null,
                "country": "Germany",
                "iso2Code": "DE"
            },
            "items": [
                {
                    "name": "Canon IXUS 160",
                    "sku": "002_25904004",
                    "sumPrice": 9999,
                    "quantity": 1,
                    "unitGrossPrice": 9999,
                    "sumGrossPrice": 9999,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 9999,
                    "unitTaxAmountFullAggregation": 3033,
                    "sumTaxAmountFullAggregation": 3033,
                    "refundableAmount": 18999,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 19999,
                    "unitSubtotalAggregation": 19999,
                    "unitProductOptionPriceAggregation": 10000,
                    "sumProductOptionPriceAggregation": 10000,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 1000,
                    "sumDiscountAmountAggregation": 1000,
                    "unitDiscountAmountFullAggregation": 1000,
                    "sumDiscountAmountFullAggregation": 1000,
                    "unitPriceToPayAggregation": 18999,
                    "sumPriceToPayAggregation": 18999,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "d5e948d9-f470-5b9a-b1c7-c1321761312a",
                    "isReturnable": true,
                    "metadata": {
                        "superAttributes": [],
                        "image": "https://images.icecat.biz/img/norm/medium/25904004-9055.jpg"
                    },
                    "calculatedDiscounts": [
                        {
                            "unitAmount": 1000,
                            "sumAmount": 1000,
                            "displayName": "10% Discount for all orders above",
                            "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                            "voucherCode": null,
                            "quantity": 1
                        }
                    ],
                    "productOptions": [
                        {
                            "optionGroupName": "Insurance",
                            "sku": "OP_insurance",
                            "optionName": "Two (2) year insurance coverage",
                            "price": 10000
                        }
                    ]
                },
                {
                    "name": "Canon IXUS 160",
                    "sku": "002_25904004",
                    "sumPrice": 9999,
                    "quantity": 1,
                    "unitGrossPrice": 9999,
                    "sumGrossPrice": 9999,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 9999,
                    "unitTaxAmountFullAggregation": 3034,
                    "sumTaxAmountFullAggregation": 3034,
                    "refundableAmount": 18999,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 19999,
                    "unitSubtotalAggregation": 19999,
                    "unitProductOptionPriceAggregation": 10000,
                    "sumProductOptionPriceAggregation": 10000,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 1000,
                    "sumDiscountAmountAggregation": 1000,
                    "unitDiscountAmountFullAggregation": 1000,
                    "sumDiscountAmountFullAggregation": 1000,
                    "unitPriceToPayAggregation": 18999,
                    "sumPriceToPayAggregation": 18999,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "dedc66da-9af9-504f-bdfc-e45b23118786",
                    "isReturnable": true,
                    "metadata": {
                        "superAttributes": [],
                        "image": "https://images.icecat.biz/img/norm/medium/25904004-9055.jpg"
                    },
                    "calculatedDiscounts": [
                        {
                            "unitAmount": 1000,
                            "sumAmount": 1000,
                            "displayName": "10% Discount for all orders above",
                            "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                            "voucherCode": null,
                            "quantity": 1
                        }
                    ],
                    "productOptions": [
                        {
                            "optionGroupName": "Insurance",
                            "sku": "OP_insurance",
                            "optionName": "Two (2) year insurance coverage",
                            "price": 10000
                        }
                    ]
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
            "payments": [
                {
                    "amount": 37998,
                    "paymentProvider": "DummyPayment",
                    "paymentMethod": "invoice"
                }
            ],
            "calculatedDiscounts": [
                {
                    "unitAmount": null,
                    "sumAmount": 490,
                    "displayName": "Free standard delivery",
                    "description": "Free standard delivery for all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                    "voucherCode": null,
                    "quantity": 1
                },
                {
                    "unitAmount": null,
                    "sumAmount": 2000,
                    "displayName": "10% Discount for all orders above",
                    "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                    "voucherCode": null,
                    "quantity": 2
                }
            ]
        },
        "links": {
            "self": "http://glue.de.suite.local/orders/DE--4"
        }
    }
}
``` 
</details>

**General Order Information**
| Attribute* | Type | Description |
| --- | --- | --- |
| createdAt | String | Date and time when the order was created. |
| currencyIsoCode | String | ISO 4217 code of the currency that was selected when placing the order. |
| priceMode | String | Price mode that was active when placing the order. Possible values:<ul><li>**NET_MODE** - prices before tax;</li><li>**GROSS_MODE** - prices after tax.</li></ul> |

**Totals Calculations**
| Attribute | Type | Description |
| --- | --- | --- |
| expenseTotal | Integer | Total amount of expenses (e.g. shipping costs). |
| discountTotal | Integer | Total amount of discounts applied. |
| taxTotal | Integer | Total amount of taxes paid. |
| subtotal | Integer | Subtotal of the order. |
| grandTotal | Integer | Grand total of the order |
| canceledTotal | Integer | Total canceled amount. |
| remunerationTotal | Integer ||

**Billing and Shipping Addresses**
| Attribute* | Type | Description |
| --- | --- | --- |
| salutation | String | Salutation to use when addressing the customer. |
| firstName | String | Customer's first name. |
| lastName | String | Customer's last name. |
| address1 | String | The 1st line of the customer's address. |
| address2 | String | The 2nd line of the customer's address. |
| address3 | String | The 3rd line of the customer's address. |
| zipCode | String | ZIP code. |
| city | String | Specifies the city. |
| country | String | Specifies the country. |
| poBox | String | PO Box to use for communication. |
| company | String | Specifies the customer's company. |
| phone | String | Specifies the customer's phone number. |
| cellPhone | String | Mobile phone number. |
| email | String | Email address to use for communication. |
| isDefaultShipping | String | Specifies whether the address should be used as the default shipping address of the customer:<ul><li> If the parameter is not set, the default value is **true**.</li><li> If the customer does not have a default shipping address, the value is **true**.</li></ul> |
| isDefaultBilling | String | Specifies whether the address should be used as the default billing address of the customer<ul><li> If the parameter is not set, the default value is **true**.</li><li> If the customer does not have a default billing address, the value is **true**.</li></ul>. |
| iso2Code | String | ISO 2-Letter Country Code to use. |
| description | String | Address description. |
| comment | String | Address comment. |

**Order Item Information**
| Attribute* | Type | Description |
| --- | --- | --- |
| name | String | Name of the product. |
| sku | String | SKU of the product. |
| sumPrice | Integer | Sum of the prices. |
| sumPriceToPayAggregation | Integer | Sum of the prices to pay (after discounts). |
| quantity | Integer | Quantity of the product ordered. |
| superAttributes | String | Since the bought product is a concrete product, and super attributes are saved with the abstract product, this field is expected to stay empty. |
| image | String | URL to an image of the product. |

**Order Item Information** (for each item)

| Attribute* | Type | Description |
| --- | --- | --- |
| name | String | Product name. |
| SKU | String | Product SKU. |
| sumPrice | Integer | Sum of all product prices. |
| quantity | Integer | Product quantity ordered. |
| unitGrossPrice | Integer | Single item gross price. |
| sumGrossPrice | Integer | Sum of items gross price. |
| taxRate | Integer | Current tax rate, in percent. |
| unitNetPrice | Integer | Single item net price. |
| sumNetPrice | Integer | Sum total of net prices for all items. |
| unitPrice | Integer | Single item price without assuming if it is new or gross. *This price should be displayed everywhere when a product price is displayed. It allows switching tax mode without side effects*. |
| unitTaxAmountFullAggregation | Integer | Total tax amount for a given item, with additions. |
| sumTaxAmountFullAggregation | Integer | Total tax amount for a given sum of items, with additions. |
| refundableAmount | Integer | Available refundable amount for an item (order only). |
| canceledAmount | Integer | Total canceled amount for this item (order only). |
| sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| unitSubtotalAggregation | Integer | Subtotal for the given item. |
| unitProductOptionPriceAggregation | Integer | Item total product option price. |
| sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| unitExpensePriceAggregation | Integer | Item expense total for a given item. |
| sumExpensePriceAggregation | Integer | Total amount of expenses for the given items. |
| unitDiscountAmountAggregation | Integer | Item total discount amount. |
| sumDiscountAmountAggregation | Integer | Sum of Item total discount amounts. |
| unitDiscountAmountFullAggregation | Integer | Sum of Item total discount amount. |
| sumDiscountAmountFullAggregation | Integer | Item total discount amount, with additions. |
| unitPriceToPayAggregation | Integer | Item total price to pay after discounts, with additions. |
| sumPriceToPayAggregation |Integer | Sum of all prices to pay (after discounts were applied). |
| taxRateAverageAggregation | Integer | Item tax rate average, with additions. This value is used when recalculating the tax amount after cancellation. |
| taxAmountAfterCancellation | Integer | Tax amount after cancellation, recalculated using tax average. |
| uuid | String | Unique identifier of the order. |
| isReturnable | Boolean | Specifies whether the sales order item is returnable or not. |
| superAttributes | String | *Always empty. Since products purchased are concrete products, and super attributes are available for abstract products, this field is expected to be empty at all times.* |
| image | String | Product image URL. |

**Calculated Discounts for Items**
| Attribute* | Type | Description |
| --- | --- | --- |
| unitAmount | Integer | Discount value applied to each order item of the corresponding product. |
| sumAmount | Integer | Sum of the discount values applied to the order items of the corresponding product. |
| displayName | String | Name of the discount applied. |
| description | String | Description of the discount. |
| voucherCode | String | Voucher code redeemed. |
| quantity | String | Number of discounts applied to the corresponding product. |

**Product Options**
| Attribute* | Type | Description |
| --- | --- | --- |
| sku | String | SKU of the product option. |
| optionName | String | Name of the product option. |
| price | Integer | Price for the product option. |

**Calculated Discounts**
| Attribute* | Type | Description |
| --- | --- | --- |
| unitAmount | Integer | Amount of the discount provided by the given item for each unit of the product, in cents. |
| sumAmount | Integer | Total amount of the discount provided by the given item, in cents. |
| displayName | String | Display name of the given discount. |
| description | String | Description of the given discount. |
| voucherCode | String | Voucher code applied, if any. |
| quantity | String | Number of times the discount was applied. |

**Expenses**
| Attribute* | Type | Description |
| --- | --- | --- |
| type | String | Expense type. |
| name | String | Expense name. |
| sumPrice | Integer | Sum of expenses calculated. |
| unitGrossPrice | Integer | Single item's gross price. |
| sumGrossPrice | Integer | Sum of items' gross price. |
| taxRate | Integer | Current tax rate in percent. |
| unitNetPrice | Integer | Single item net price. |
| sumNetPrice | Integer | Sum of items' net price. |
| canceledAmount | Integer | Total canceled amount for this item (order only). |
| unitDiscountAmountAggregation | Integer | Item total discount amount. |
| sumDiscountAmountAggregation | Integer | Sum of items' total discount amount. |
| unitTaxAmount | Integer | Tax amount for a single item, after discounts. |
| sumTaxAmount | Integer | Tax amount for a sum of items (order only). |
| unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| sumPriceToPayAggregation | Integer | Sum of items' total price to pay after discounts with additions. |
| taxAmountAfterCancellation | Integer | Tax amount after cancellation, recalculated using tax average. |

**Measurement unit calculations**
| Attribute* | Type | Description |
| --- | --- | --- |
| salesUnit | Object | List of attributes defining the sales unit to be used for item amount calculation. |
| conversion | integer | Factor to convert a value from sales to base unit. If it is "null", the information is taken from the global conversions. |
| precision | integer | Ratio between a sales unit and a base unit. |
| measurementUnit | string | Code of the measurement unit. | 
| name | String | Name of the measurement unit. |
| code | String | Code of the measurement unit. |


**Payments**
| Attribute* | Type | Description |
| --- | --- | --- |
| amount | Integer | Amount paid via the corresponding payment provider in cents. |
| paymentProvider | String | Name of the payment provider. |
| paymentMethod | String | Name of the payment method. |

**Shipments**
| Attribute* | Type | Description |
| --- | --- | --- |
| shipmentMethodName | String | Shipment method name. |
| carrierName | String | Shipment method name. |
| deliveryTime | DateTimeUtc | Desired delivery time, if available. |
| defaultGrossPrice | Integer | Default gross price of delivery, in cents. |
| defaultNetPrice | Integer | Default net price of delivery, in cents. |
| currencyIsoCode | String | ISO 4217 code of the currency in which the prices are specified. |

*Type and ID attributes are not mentioned.
