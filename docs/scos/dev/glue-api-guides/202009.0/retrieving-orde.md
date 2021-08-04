---
title: Retrieving orders
originalLink: https://documentation.spryker.com/v6/docs/retrieving-orders
redirect_from:
  - /v6/docs/retrieving-orders
  - /v6/docs/en/retrieving-orders
---

This endpoint allows retrieving customer's orders.

In your development, this resource can help you to:

* Make the order history available to customers
* Make order details available to enable reordering functionality

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Order Management Feature Integration](https://documentation.spryker.com/docs/glue-api-order-management-feature-integration)
* [Glue API: Measurement Units Feature Integration](https://documentation.spryker.com/docs/glue-api-measurement-units-feature-integration)
* [Glue API: Product options feature integration](https://documentation.spryker.com/docs/glue-product-options-feature-integration)
* [Glue API: Product Bundles feature integration](https://documentation.spryker.com/upcoming-release/docs/glue-api-product-bundles-feature-integration)

## Retrieve all orders
To retrieve a list of all orders made by a registered customer, send the request:

---
`GET` **/orders**

---

### Request

| Header key | Header value | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/authenticating-as-a-customer).  |

| String parameter | Description | Possible values |
| --- | --- | --- |
| offset | Ofset of the order at which to begin the response. </br> Works only together with `page[limit]`. </br> To work correctly, the value should be devisable by the value of `page[limit]`. </br> The default value is `0`.  | From `0` to any. |
| limit | Maximum number of entries to return. </br> Works only together with `page[offset]`. </br> The default value is `10`. | From `1` to any. |


| Request | Usage |
| --- | --- |
| GET https://glue.mysprykershop.com/orders | Retrieve all orders. |
| GET https://glue.mysprykershop.com/orders?page[limit]=10 | Retrieve 10 orders. |
| GET https://glue.mysprykershop.com/orders?page[offset]=10&page[limit]=10 | Retrieve 10 orders starting from the eleventh order. |
| GET https://glue.mysprykershop.com/orders?page[offset]=20 | Retrieve all orders starting from the twenty first order. |




### Response


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
                "self": "https://glue.mysprykershop.com/orders/DE--1"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/orders"
    }
}
```

</details>


| Attribute | Type | Description |
| --- | --- | --- |
| createdAt | String | Date and time when the order was created. |
| currencyIsoCode | String | ISO 4217 code of the currency that was selected when placing the order. |
| priceMode | String | Price mode that was active when placing the order. Possible values: <ul><li>**NET_MODE**—prices before tax.</li><li>**GROSS_MODE**—prices after tax.</li></ul> |
| expenseTotal | Integer | Total amount of expenses (e.g. shipping costs). |
| discountTotal | Integer | Total amount of discounts applied. |
| taxTotal | Integer | Total amount of taxes paid. |
| subtotal | Integer | Subtotal of the order. |
| grandTotal | Integer | Grand total of the order. |
| canceledTotal | Integer | Total canceled amount. |
| remunerationTotal | Integer | Total sum of remuneration. |


## Retrieve an order
To retrieve detailed information on an order, send the request:

---
`GET` **/orders/*{% raw %}{{{% endraw %}order_id{% raw %}}}{% endraw %}***

---

| Path parameter | Description |
| --- | --- |
| order_id | Unique identifier of an order. [Retrieve all orders](#retrieving-all-orders) to get it. |

### Request

| Header key | Header value | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/authenticating-as-a-customer).  |

Request sample:
`GET http://glue.mysprykershop.com/orders/DE--7` — retrieve the order with the `DE--7` order reference. 

### Response

<details open>
    <summary>Response sample with a specific order</summary>
       
```json
{
    "data": {
        "type": "orders",
        "id": "DE--7",
        "attributes": {
            "merchantReferences": [],
            "itemStates": [
                "payment pending"
            ],
            "createdAt": "2020-10-13 09:09:46.696926",
            "currencyIsoCode": "EUR",
            "priceMode": "GROSS_MODE",
            "totals": {
                "expenseTotal": 1000,
                "discountTotal": 13000,
                "taxTotal": 13811,
                "subtotal": 130000,
                "grandTotal": 118000,
                "canceledTotal": 0,
                "remunerationTotal": 0
            },
            "billingAddress": {
                "salutation": "Ms",
                "firstName": "Sonia",
                "middleName": null,
                "lastName": "Wagner",
                "address1": "Kirncher Str.",
                "address2": "7",
                "address3": "",
                "company": "Spryker Systems GmbH",
                "city": "Berlin",
                "zipCode": "10247",
                "poBox": null,
                "phone": "4902890031",
                "cellPhone": null,
                "description": null,
                "comment": "",
                "email": null,
                "country": "Germany",
                "iso2Code": "DE"
            },
            "shippingAddress": {
                "salutation": "Ms",
                "firstName": "Sonia",
                "middleName": null,
                "lastName": "Wagner",
                "address1": "Kirncher Str.",
                "address2": "7",
                "address3": "",
                "company": "Spryker Systems GmbH",
                "city": "Berlin",
                "zipCode": "10247",
                "poBox": null,
                "phone": "4902890031",
                "cellPhone": null,
                "description": null,
                "comment": "",
                "email": null,
                "country": "Germany",
                "iso2Code": "DE"
            },
            "items": [
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Samsung Galaxy Tab A SM-T550N 32 GB",
                    "sku": "175_26935356",
                    "sumPrice": 47500,
                    "quantity": 1,
                    "unitGrossPrice": 47500,
                    "sumGrossPrice": 47500,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 47500,
                    "unitTaxAmountFullAggregation": 6826,
                    "sumTaxAmountFullAggregation": 6826,
                    "refundableAmount": 42750,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 47500,
                    "unitSubtotalAggregation": 47500,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 4750,
                    "sumDiscountAmountAggregation": 4750,
                    "unitDiscountAmountFullAggregation": 4750,
                    "sumDiscountAmountFullAggregation": 4750,
                    "unitPriceToPayAggregation": 42750,
                    "sumPriceToPayAggregation": 42750,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "22ecd8a5-3ab7-5cfc-936b-fc2fadbdf21f",
                    "isReturnable": false,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": "5",
                    "metadata": {
                        "superAttributes": {
                            "internal_storage_capacity": "32 GB"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/26564922-7780.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [
                        {
                            "unitAmount": 4750,
                            "sumAmount": 4750,
                            "displayName": "10% Discount for all orders above",
                            "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                            "voucherCode": null,
                            "quantity": 1
                        }
                    ],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Samsung Galaxy Tab A SM-T550N 32 GB",
                    "sku": "175_26935356",
                    "sumPrice": 47500,
                    "quantity": 1,
                    "unitGrossPrice": 47500,
                    "sumGrossPrice": 47500,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 47500,
                    "unitTaxAmountFullAggregation": 6825,
                    "sumTaxAmountFullAggregation": 6825,
                    "refundableAmount": 42750,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 47500,
                    "unitSubtotalAggregation": 47500,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 4750,
                    "sumDiscountAmountAggregation": 4750,
                    "unitDiscountAmountFullAggregation": 4750,
                    "sumDiscountAmountFullAggregation": 4750,
                    "unitPriceToPayAggregation": 42750,
                    "sumPriceToPayAggregation": 42750,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "78d99855-755a-500a-94ad-ece6e3206242",
                    "isReturnable": false,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": "5",
                    "metadata": {
                        "superAttributes": {
                            "internal_storage_capacity": "32 GB"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/26564922-7780.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [
                        {
                            "unitAmount": 4750,
                            "sumAmount": 4750,
                            "displayName": "10% Discount for all orders above",
                            "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                            "voucherCode": null,
                            "quantity": 1
                        }
                    ],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Lenovo ThinkStation P300",
                    "sku": "130_24725761",
                    "sumPrice": 27137,
                    "quantity": 1,
                    "unitGrossPrice": 27137,
                    "sumGrossPrice": 27137,
                    "taxRate": "0.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 27137,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "refundableAmount": 24423,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 27137,
                    "unitSubtotalAggregation": 27137,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 2714,
                    "sumDiscountAmountAggregation": 2714,
                    "unitDiscountAmountFullAggregation": 2714,
                    "sumDiscountAmountFullAggregation": 2714,
                    "unitPriceToPayAggregation": 24423,
                    "sumPriceToPayAggregation": 24423,
                    "taxRateAverageAggregation": "0.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "1198ddbc-9870-5e46-9d7d-db97761b3a7c",
                    "isReturnable": false,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": "6",
                    "metadata": {
                        "superAttributes": {
                            "processor_frequency": "3.5 GHz"
                        },
                        "image": "https://images.icecat.biz/img/gallery_mediums/29285281_8883.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [
                        {
                            "unitAmount": 2714,
                            "sumAmount": 2714,
                            "displayName": "10% Discount for all orders above",
                            "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                            "voucherCode": null,
                            "quantity": 1
                        }
                    ],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Lenovo ThinkCentre E73",
                    "sku": "128_29955336",
                    "sumPrice": 7863,
                    "quantity": 1,
                    "unitGrossPrice": 7863,
                    "sumGrossPrice": 7863,
                    "taxRate": "0.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 7863,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "refundableAmount": 7077,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 7863,
                    "unitSubtotalAggregation": 7863,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 786,
                    "sumDiscountAmountAggregation": 786,
                    "unitDiscountAmountFullAggregation": 786,
                    "sumDiscountAmountFullAggregation": 786,
                    "unitPriceToPayAggregation": 7077,
                    "sumPriceToPayAggregation": 7077,
                    "taxRateAverageAggregation": "0.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "f9aa3a62-8e7c-5b24-a701-92dabc93b6e4",
                    "isReturnable": false,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": "6",
                    "metadata": {
                        "superAttributes": {
                            "processor_frequency": "3.2 GHz"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/29955336-4681.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [
                        {
                            "unitAmount": 786,
                            "sumAmount": 786,
                            "displayName": "10% Discount for all orders above",
                            "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                            "voucherCode": null,
                            "quantity": 1
                        }
                    ],
                    "productOptions": [],
                    "amount": null
                }
            ],
            "expenses": [
                {
                    "type": "SHIPMENT_EXPENSE_TYPE",
                    "name": "Air Sonic",
                    "sumPrice": 1000,
                    "unitGrossPrice": 1000,
                    "sumGrossPrice": 1000,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "canceledAmount": null,
                    "unitDiscountAmountAggregation": null,
                    "sumDiscountAmountAggregation": null,
                    "unitTaxAmount": 160,
                    "sumTaxAmount": 160,
                    "unitPriceToPayAggregation": 1000,
                    "sumPriceToPayAggregation": 1000,
                    "taxAmountAfterCancellation": null
                }
            ],
            "payments": [
                {
                    "amount": 118000,
                    "paymentProvider": "DummyPayment",
                    "paymentMethod": "invoice"
                }
            ],
            "shipments": [
                {
                    "shipmentMethodName": "Air Sonic",
                    "carrierName": "Spryker Drone Shipment",
                    "deliveryTime": null,
                    "defaultGrossPrice": 1000,
                    "defaultNetPrice": 0,
                    "currencyIsoCode": "EUR"
                }
            ],
            "calculatedDiscounts": {
                "10% Discount for all orders above": {
                    "unitAmount": null,
                    "sumAmount": 13000,
                    "displayName": "10% Discount for all orders above",
                    "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                    "voucherCode": null,
                    "quantity": 4
                }
            },
            "bundleItems": [
                {
                    "merchantReference": null,
                    "state": null,
                    "name": "Lenovo Bundle",
                    "sku": "213_123",
                    "sumPrice": 35000,
                    "quantity": 1,
                    "unitGrossPrice": 35000,
                    "sumGrossPrice": 35000,
                    "taxRate": null,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 35000,
                    "unitTaxAmountFullAggregation": null,
                    "sumTaxAmountFullAggregation": null,
                    "refundableAmount": null,
                    "canceledAmount": null,
                    "sumSubtotalAggregation": 35000,
                    "unitSubtotalAggregation": 35000,
                    "unitProductOptionPriceAggregation": null,
                    "sumProductOptionPriceAggregation": null,
                    "unitExpensePriceAggregation": null,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 3500,
                    "sumDiscountAmountAggregation": 3500,
                    "unitDiscountAmountFullAggregation": 3500,
                    "sumDiscountAmountFullAggregation": 3500,
                    "unitPriceToPayAggregation": 31500,
                    "sumPriceToPayAggregation": 31500,
                    "taxRateAverageAggregation": null,
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": null,
                    "isReturnable": null,
                    "bundleItemIdentifier": "6",
                    "relatedBundleItemIdentifier": null,
                    "metadata": {
                        "superAttributes": [],
                        "image": "https://images.icecat.biz/img/norm/medium/24725761-8168.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": null,
                    "name": "Samsung Bundle",
                    "sku": "214_123",
                    "sumPrice": 95000,
                    "quantity": 1,
                    "unitGrossPrice": 95000,
                    "sumGrossPrice": 95000,
                    "taxRate": null,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 95000,
                    "unitTaxAmountFullAggregation": null,
                    "sumTaxAmountFullAggregation": null,
                    "refundableAmount": null,
                    "canceledAmount": null,
                    "sumSubtotalAggregation": 95000,
                    "unitSubtotalAggregation": 95000,
                    "unitProductOptionPriceAggregation": null,
                    "sumProductOptionPriceAggregation": null,
                    "unitExpensePriceAggregation": null,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 9500,
                    "sumDiscountAmountAggregation": 9500,
                    "unitDiscountAmountFullAggregation": 9500,
                    "sumDiscountAmountFullAggregation": 9500,
                    "unitPriceToPayAggregation": 85500,
                    "sumPriceToPayAggregation": 85500,
                    "taxRateAverageAggregation": null,
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": null,
                    "isReturnable": null,
                    "bundleItemIdentifier": "5",
                    "relatedBundleItemIdentifier": null,
                    "metadata": {
                        "superAttributes": [],
                        "image": "https://images.icecat.biz/img/norm/medium/26935356-6244.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/orders/DE--7"
        }
    }
}
```
    
</details>

**General order information**
| Attribute | Type | Description |
| --- | --- | --- |
| createdAt | String | Date and time when the order was created. |
| currencyIsoCode | String | ISO 4217 code of the currency that was selected when placing the order. |
| priceMode | String | Price mode that was active when placing the order. Possible values:<ul><li>**NET_MODE**—prices before tax.</li><li>**GROSS_MODE**—prices after tax.</li></ul> |

**Totals calculations**
| Attribute | Type | Description |
| --- | --- | --- |
| expenseTotal | Integer | Total amount of expenses (e.g. shipping costs). |
| discountTotal | Integer | Total amount of discounts applied. |
| taxTotal | Integer | Total amount of taxes paid. |
| subtotal | Integer | Subtotal of the order. |
| grandTotal | Integer | Grand total of the order |
| canceledTotal | Integer | Total canceled amount. |
| remunerationTotal | Integer | Total sum of remuneration.|

**Billing and shipping addresses**
| Attribute | Type | Description |
| --- | --- | --- |
| billingAddress | object | List of attributes describing the billing address of the order. |
| shippingAddress | object | List of attributes describing the shipping address of the order. |
| salutation | String | Salutation to use when addressing the customer. |
| firstName | String | Customer's first name. |
| middleName | String | Customer's middle name. |
| lastName | String | Customer's last name. |
| address1 | String | 1st line of the customer's address. |
| address2 | String | 2nd line of the customer's address. |
| address3 | String | 3rd line of the customer's address. |
| company | String | Specifies the customer's company. |
| city | String | Specifies the city. |
| zipCode | String | ZIP code. |
| poBox | String | PO Box to use for communication. |
| phone | String | Specifies the customer's phone number. |
| cellPhone | String | Mobile phone number. |
| description | String | Address description. |
| comment | String | Address comment. |
| email | String | Email address to use for communication. |
| country | String | Specifies the country. |
| iso2Code | String | ISO 2-Letter Country Code to use. |
| isDefaultShipping | String | Specifies whether the address should be used as the default shipping address of the customer:<ul><li> If the parameter is not set, the default value is **true**.</li><li> If the customer does not have a default shipping address, the value is **true**.</li></ul> |
| isDefaultBilling | String | Specifies whether the address should be used as the default billing address of the customer<ul><li> If the parameter is not set, the default value is **true**.</li><li> If the customer does not have a default billing address, the value is **true**.</li></ul> |


**Order item information** 

| Attribute | Type | Description |
| --- | --- | --- |
| items | array | Array of objects describing the concrete products in the order. If there is a product bundle in the order, the concrete products from the bundle are also listed in this array. |
| bundleItems | Array | Array of objects describing the concrete product bundles in the order. |
| bundleItems.bundleItemIdentifier | Integer | Defines the relation between the bundle and its items. The items of the bundle have the same value in the `relatedBundleItemIdentifier` attribute. |
| items.relatedBundleItemIdentifier | Integer | Defines the relation between the item and its bundle. The bundle to which this the item belongs has the same value in the `bundleItemIdentifier` attribute. | 
| state | String | Defines the state of the order in the state machine.  |
| name | String | Product name. |
| sku | String | Product SKU. |
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
| uuid | String | Unique identifier of the item in the order. |
| isReturnable | Boolean | Defines if the customer can return the item. |
| superAttributes | String | *Always empty. Since products purchased are concrete products, and super attributes are available for abstract products, this field is expected to be empty at all times.* |
| metadata | object | Metadata of the concrete product. |
| image | String | Product image URL. |


**Calculated discounts for items**
| Attribute | Type | Description |
| --- | --- | --- |
| unitAmount | Integer | Discount value applied to each order item of the corresponding product. |
| sumAmount | Integer | Sum of the discount values applied to the order items of the corresponding product. |
| displayName | String | Name of the discount applied. |
| description | String | Description of the discount. |
| voucherCode | String | Voucher code redeemed. |
| quantity | String | Number of discounts applied to the corresponding product. |

**Product options**
| Attribute | Type | Description |
| --- | --- | --- |
| productOptions | Array | Lst of product options ordered with this item. |
| optionGroupName | String | Name of the group to which the product option belongs. |
| sku | String | SKU of the product option. |
| optionName | String | Name of the product option. |
| price | Integer | Price for the product option. |

**Calculated discounts**
| Attribute | Type | Description |
| --- | --- | --- |
| unitAmount | Integer | Amount of the discount provided by the given item for each unit of the product, in cents. |
| sumAmount | Integer | Total amount of the discount provided by the given item, in cents. |
| displayName | String | Display name of the given discount. |
| description | String | Description of the given discount. |
| voucherCode | String | Voucher code applied, if any. |
| quantity | String | Number of times the discount was applied. |

**Expenses**
| Attribute | Type | Description |
| --- | --- | --- |
| expenses | array | List of objects describing the expenses of this order. |
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
| Attribute | Type | Description |
| --- | --- | --- |
| salesUnit | Object | List of attributes defining the sales unit to be used for item amount calculation. |
| conversion | integer | Factor to convert a value from sales to base unit. If it is "null", the information is taken from the global conversions. |
| precision | integer | Ratio between a sales unit and a base unit. |
| measurementUnit | string | Code of the measurement unit. | 
| name | String | Name of the measurement unit. |
| code | String | Code of the measurement unit. |


**Payments**
| Attribute | Type | Description |
| --- | --- | --- |
| amount | Integer | Amount paid via the corresponding payment provider in cents. |
| paymentProvider | String | Name of the payment provider. |
| paymentMethod | String | Name of the payment method. |

**Shipments**
| Attribute | Type | Description |
| --- | --- | --- |
| shipments | object | Information about the shipments used in this order. |
| shipmentMethodName | String | Shipment method name. |
| carrierName | String | Shipment method name. |
| deliveryTime | DateTimeUtc | Desired delivery time, if available. |
| defaultGrossPrice | Integer | Default gross price of delivery, in cents. |
| defaultNetPrice | Integer | Default net price of delivery, in cents. |
| currencyIsoCode | String | ISO 4217 code of the currency in which the prices are specified. |

## Possible errors

| Code  | Reason |
| --- | --- |
|001| Access token is invalid. |
|002| Access token is missing.  |
|801| Order with the given order reference is not found.  |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).


