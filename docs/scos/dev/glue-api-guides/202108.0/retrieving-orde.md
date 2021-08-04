---
title: Retrieving orders
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-orders
redirect_from:
  - /2021080/docs/retrieving-orders
  - /2021080/docs/en/retrieving-orders
---

This endpoint allows retrieving customer's orders.

In your development, this resource can help you to:

* Make the order history available to customers
* Make order details available to enable reordering functionality

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Shipment feature integration](https://documentation.spryker.com/docs/glue-api-shipment-feature-integration)
* [Glue API: Order Management Feature Integration](https://documentation.spryker.com/docs/glue-api-order-management-feature-integration)
* [Glue API: Measurement Units Feature Integration](https://documentation.spryker.com/docs/glue-api-measurement-units-feature-integration)
* [Glue API: Product options feature integration](https://documentation.spryker.com/docs/glue-product-options-feature-integration)
* [Glue API: Product Bundles feature integration](https://documentation.spryker.com/upcoming-release/docs/glue-api-product-bundles-feature-integration)
* [Glue API: Configurable Bundle feature integration](https://documentation.spryker.com/docs/glue-api-configurable-bundle-feature-integration)
* [Glue API: Configurable Bundle + Cart feature integration](https://documentation.spryker.com/docs/glue-api-configurable-bundle-cart-feature-integration)
* [Glue API: Configurable Bundle + Product feature integration](https://documentation.spryker.com/docs/glue-api-configurable-bundle-product-feature-integration)

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

| PATH PARAMETER     | DESCRIPTON                                                   |
| ------------------ | ------------------------------------------------------------ |
| ***{% raw %}{{{% endraw %}order_id{% raw %}}}{% endraw %}*** | Unique identifier of an order. [Retrieve all orders](#retrieving-all-orders) to get it. |

### Request

| HEADER KEY    | HEADER VALUE | REQUIRED | DESCRIPTION                                                  |
| ------------- | ------------ | -------- | ------------------------------------------------------------ |
| Authorization | string       | ✓        | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/authenticating-as-a-customer). |

| String parameter | Description                                 | Possible values                                       |
| ---------------- | ------------------------------------------- | ----------------------------------------------------- |
| include          | Adds resource relationships to the request. | order-shipments, concrete-products, abstract-products |

| Request                                                      | Usage                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| GET https://glue.mysprykershop.com/orders/DE--1              | Retrieve information about the order with the id `DE--6`.      |
| GET https://glue.mysprykershop.com/orders/DE--6?include=order-shipments | Retrieve information about the order with the id `DE--6` with order shipments included. |

 

### Response

<details open>
    <summary>Response sample</summary>
       
```json
{
    "data": {
        "type": "orders",
        "id": "DE--6",
        "attributes": {
            "merchantReferences": [],
            "itemStates": [
                "payment pending"
            ],
            "createdAt": "2021-01-05 13:43:23.000000",
            "currencyIsoCode": "EUR",
            "priceMode": "GROSS_MODE",
            "totals": {
                "expenseTotal": 1180,
                "discountTotal": 0,
                "taxTotal": 12173,
                "subtotal": 75064,
                "grandTotal": 76244,
                "canceledTotal": 0,
                "remunerationTotal": 0
            },
            "billingAddress": {
                "salutation": "Mr",
                "firstName": "Spencor",
                "middleName": null,
                "lastName": "Hopkin",
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
            "shippingAddress": null,
            "items": [
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Samsung Galaxy S5 mini",
                    "sku": "066_23294028",
                    "sumPrice": 39353,
                    "quantity": 1,
                    "unitGrossPrice": 39353,
                    "sumGrossPrice": 39353,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 39353,
                    "unitTaxAmountFullAggregation": 6283,
                    "sumTaxAmountFullAggregation": 6283,
                    "refundableAmount": 39353,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 39353,
                    "unitSubtotalAggregation": 39353,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 39353,
                    "sumPriceToPayAggregation": 39353,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "3db99597-99a0-58a9-a0ea-696e8da0026e",
                    "isReturnable": false,
                    "idShipment": 11,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": null,
                    "salesOrderConfiguredBundleItem": null,
                    "metadata": {
                        "superAttributes": {
                            "color": "Blue"
                        },
                        "image": "https://images.icecat.biz/img/gallery_mediums/23294028_3275.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Sony Xperia Z3 Compact",
                    "sku": "076_24394207",
                    "sumPrice": 35711,
                    "quantity": 1,
                    "unitGrossPrice": 35711,
                    "sumGrossPrice": 35711,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 35711,
                    "unitTaxAmountFullAggregation": 5702,
                    "sumTaxAmountFullAggregation": 5702,
                    "refundableAmount": 35711,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 35711,
                    "unitSubtotalAggregation": 35711,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 35711,
                    "sumPriceToPayAggregation": 35711,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "40274175-4398-5927-8980-48ead5053e69",
                    "isReturnable": false,
                    "idShipment": 12,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": null,
                    "salesOrderConfiguredBundleItem": null,
                    "metadata": {
                        "superAttributes": {
                            "color": "White"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/24394207-3552.jpg"
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
                    "name": "Express",
                    "sumPrice": 590,
                    "unitGrossPrice": 590,
                    "sumGrossPrice": 590,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "canceledAmount": null,
                    "unitDiscountAmountAggregation": null,
                    "sumDiscountAmountAggregation": null,
                    "unitTaxAmount": 94,
                    "sumTaxAmount": 94,
                    "unitPriceToPayAggregation": 590,
                    "sumPriceToPayAggregation": 590,
                    "taxAmountAfterCancellation": null,
                    "idShipment": 11,
                    "idSalesExpense": 11
                },
                {
                    "type": "SHIPMENT_EXPENSE_TYPE",
                    "name": "Express",
                    "sumPrice": 590,
                    "unitGrossPrice": 590,
                    "sumGrossPrice": 590,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "canceledAmount": null,
                    "unitDiscountAmountAggregation": null,
                    "sumDiscountAmountAggregation": null,
                    "unitTaxAmount": 94,
                    "sumTaxAmount": 94,
                    "unitPriceToPayAggregation": 590,
                    "sumPriceToPayAggregation": 590,
                    "taxAmountAfterCancellation": null,
                    "idShipment": 12,
                    "idSalesExpense": 12
                }
            ],
            "payments": [
                {
                    "amount": 76244,
                    "paymentProvider": "DummyPayment",
                    "paymentMethod": "Invoice"
                }
            ],
            "shipments": [],
            "calculatedDiscounts": [],
            "bundleItems": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/orders/DE--6"
        }
    }
}
```
    
</details>

<details open>
<summary>Response sample with order shipments</summary>

```json
{
    "data": {
        "type": "orders",
        "id": "DE--6",
        "attributes": {
            "merchantReferences": [],
            "itemStates": [
                "payment pending"
            ],
            "createdAt": "2021-01-05 13:43:23.000000",
            "currencyIsoCode": "EUR",
            "priceMode": "GROSS_MODE",
            "totals": {
                "expenseTotal": 1180,
                "discountTotal": 0,
                "taxTotal": 12173,
                "subtotal": 75064,
                "grandTotal": 76244,
                "canceledTotal": 0,
                "remunerationTotal": 0
            },
            "billingAddress": {
                "salutation": "Mr",
                "firstName": "Spencor",
                "middleName": null,
                "lastName": "Hopkin",
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
            "shippingAddress": null,
            "items": [
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Samsung Galaxy S5 mini",
                    "sku": "066_23294028",
                    "sumPrice": 39353,
                    "quantity": 1,
                    "unitGrossPrice": 39353,
                    "sumGrossPrice": 39353,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 39353,
                    "unitTaxAmountFullAggregation": 6283,
                    "sumTaxAmountFullAggregation": 6283,
                    "refundableAmount": 39353,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 39353,
                    "unitSubtotalAggregation": 39353,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 39353,
                    "sumPriceToPayAggregation": 39353,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "3db99597-99a0-58a9-a0ea-696e8da0026e",
                    "isReturnable": false,
                    "idShipment": 11,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": null,
                    "salesOrderConfiguredBundleItem": null,
                    "metadata": {
                        "superAttributes": {
                            "color": "Blue"
                        },
                        "image": "https://images.icecat.biz/img/gallery_mediums/23294028_3275.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Sony Xperia Z3 Compact",
                    "sku": "076_24394207",
                    "sumPrice": 35711,
                    "quantity": 1,
                    "unitGrossPrice": 35711,
                    "sumGrossPrice": 35711,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 35711,
                    "unitTaxAmountFullAggregation": 5702,
                    "sumTaxAmountFullAggregation": 5702,
                    "refundableAmount": 35711,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 35711,
                    "unitSubtotalAggregation": 35711,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 35711,
                    "sumPriceToPayAggregation": 35711,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "40274175-4398-5927-8980-48ead5053e69",
                    "isReturnable": false,
                    "idShipment": 12,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": null,
                    "salesOrderConfiguredBundleItem": null,
                    "metadata": {
                        "superAttributes": {
                            "color": "White"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/24394207-3552.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                }
            ],
            "expenses": [
                {
                    "type": "SHIPMENT_EXPENSE_TYPE",
                    "name": "Express",
                    "sumPrice": 590,
                    "unitGrossPrice": 590,
                    "sumGrossPrice": 590,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "canceledAmount": null,
                    "unitDiscountAmountAggregation": null,
                    "sumDiscountAmountAggregation": null,
                    "unitTaxAmount": 94,
                    "sumTaxAmount": 94,
                    "unitPriceToPayAggregation": 590,
                    "sumPriceToPayAggregation": 590,
                    "taxAmountAfterCancellation": null,
                    "idShipment": 11,
                    "idSalesExpense": 11
                },
                {
                    "type": "SHIPMENT_EXPENSE_TYPE",
                    "name": "Express",
                    "sumPrice": 590,
                    "unitGrossPrice": 590,
                    "sumGrossPrice": 590,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "canceledAmount": null,
                    "unitDiscountAmountAggregation": null,
                    "sumDiscountAmountAggregation": null,
                    "unitTaxAmount": 94,
                    "sumTaxAmount": 94,
                    "unitPriceToPayAggregation": 590,
                    "sumPriceToPayAggregation": 590,
                    "taxAmountAfterCancellation": null,
                    "idShipment": 12,
                    "idSalesExpense": 12
                }
            ],
            "payments": [
                {
                    "amount": 76244,
                    "paymentProvider": "DummyPayment",
                    "paymentMethod": "Invoice"
                }
            ],
            "shipments": [],
            "calculatedDiscounts": [],
            "bundleItems": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/orders/DE--6?include=order-shipments"
        },
        "relationships": {
            "order-shipments": {
                "data": [
                    {
                        "type": "order-shipments",
                        "id": "11"
                    },
                    {
                        "type": "order-shipments",
                        "id": "12"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "order-shipments",
            "id": "11",
            "attributes": {
                "itemUuids": [
                    "3db99597-99a0-58a9-a0ea-696e8da0026e"
                ],
                "methodName": "Express",
                "carrierName": "Spryker Dummy Shipment",
                "requestedDeliveryDate": null,
                "shippingAddress": {
                    "salutation": "Mrs",
                    "firstName": "Sonia",
                    "middleName": null,
                    "lastName": "Wagner",
                    "address1": "Julie-Wolfthorn-Straße",
                    "address2": "25",
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
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/order-shipments/11"
            }
        },
        {
            "type": "order-shipments",
            "id": "12",
            "attributes": {
                "itemUuids": [
                    "40274175-4398-5927-8980-48ead5053e69"
                ],
                "methodName": "Express",
                "carrierName": "Spryker Dummy Shipment",
                "requestedDeliveryDate": "2021-09-29",
                "shippingAddress": {
                    "salutation": "Mr",
                    "firstName": "Spencor",
                    "middleName": null,
                    "lastName": "Hopkin",
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
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/order-shipments/12"
            }
        }
    ]
}
```

</details>

<details open>
<summary>Response sample with a configurable bundle</summary>

```json
{
    "data": {
        "type": "orders",
        "id": "DE--3",
        "attributes": {
            "merchantReferences": [],
            "itemStates": [
                "payment pending"
            ],
            "createdAt": "2021-01-06 11:38:13.249588",
            "currencyIsoCode": "EUR",
            "priceMode": "GROSS_MODE",
            "totals": {
                "expenseTotal": 980,
                "discountTotal": 0,
                "taxTotal": 3812,
                "subtotal": 197788,
                "grandTotal": 198768,
                "canceledTotal": 0,
                "remunerationTotal": 0
            },
            "billingAddress": {
                "salutation": "Mr",
                "firstName": "Spencor",
                "middleName": null,
                "lastName": "Hopkin",
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
            "shippingAddress": null,
            "items": [
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Acer Extensa M2610",
                    "sku": "112_312526171",
                    "sumPrice": 43723,
                    "quantity": 1,
                    "unitGrossPrice": 43723,
                    "sumGrossPrice": 43723,
                    "taxRate": "0.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 43723,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "refundableAmount": 43723,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 43723,
                    "unitSubtotalAggregation": 43723,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 43723,
                    "sumPriceToPayAggregation": 43723,
                    "taxRateAverageAggregation": "0.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "dedc66da-9af9-504f-bdfc-e45b23118786",
                    "isReturnable": false,
                    "idShipment": 3,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": {
                        "idSalesOrderConfiguredBundle": 3,
                        "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit",
                        "quantity": 1
                    },
                    "salesOrderConfiguredBundleItem": {
                        "idSalesOrderConfiguredBundle": 3,
                        "configurableBundleTemplateSlotUuid": "9626de80-6caa-57a9-a683-2846ec5b6914"
                    },
                    "metadata": {
                        "superAttributes": {
                            "color": "Black",
                            "processor_cache": "3 MB"
                        },
                        "image": "https://images.icecat.biz/img/gallery_mediums/31252617_9321.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Acer Extensa M2610",
                    "sku": "112_312526171",
                    "sumPrice": 43723,
                    "quantity": 1,
                    "unitGrossPrice": 43723,
                    "sumGrossPrice": 43723,
                    "taxRate": "0.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 43723,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "refundableAmount": 43723,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 43723,
                    "unitSubtotalAggregation": 43723,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 43723,
                    "sumPriceToPayAggregation": 43723,
                    "taxRateAverageAggregation": "0.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "93b87cb5-fc00-562f-a799-3ec28695ca51",
                    "isReturnable": false,
                    "idShipment": 3,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": {
                        "idSalesOrderConfiguredBundle": 4,
                        "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit",
                        "quantity": 1
                    },
                    "salesOrderConfiguredBundleItem": {
                        "idSalesOrderConfiguredBundle": 4,
                        "configurableBundleTemplateSlotUuid": "9626de80-6caa-57a9-a683-2846ec5b6914"
                    },
                    "metadata": {
                        "superAttributes": {
                            "color": "Black",
                            "processor_cache": "3 MB"
                        },
                        "image": "https://images.icecat.biz/img/gallery_mediums/31252617_9321.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Samsung Galaxy S6",
                    "sku": "047_26408568",
                    "sumPrice": 5724,
                    "quantity": 1,
                    "unitGrossPrice": 5724,
                    "sumGrossPrice": 5724,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 5724,
                    "unitTaxAmountFullAggregation": 914,
                    "sumTaxAmountFullAggregation": 914,
                    "refundableAmount": 5724,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 5724,
                    "unitSubtotalAggregation": 5724,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 5724,
                    "sumPriceToPayAggregation": 5724,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "c319e465-5160-59f1-a5b8-85073d1472b7",
                    "isReturnable": false,
                    "idShipment": 3,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": {
                        "idSalesOrderConfiguredBundle": 3,
                        "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit",
                        "quantity": 1
                    },
                    "salesOrderConfiguredBundleItem": {
                        "idSalesOrderConfiguredBundle": 3,
                        "configurableBundleTemplateSlotUuid": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                    },
                    "metadata": {
                        "superAttributes": {
                            "color": "Gold"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/26408568-7449.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Samsung Galaxy S6",
                    "sku": "047_26408568",
                    "sumPrice": 5724,
                    "quantity": 1,
                    "unitGrossPrice": 5724,
                    "sumGrossPrice": 5724,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 5724,
                    "unitTaxAmountFullAggregation": 914,
                    "sumTaxAmountFullAggregation": 914,
                    "refundableAmount": 5724,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 5724,
                    "unitSubtotalAggregation": 5724,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 5724,
                    "sumPriceToPayAggregation": 5724,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "7ab614ca-d564-5292-8931-60f2c52c140d",
                    "isReturnable": false,
                    "idShipment": 3,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": {
                        "idSalesOrderConfiguredBundle": 4,
                        "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit",
                        "quantity": 1
                    },
                    "salesOrderConfiguredBundleItem": {
                        "idSalesOrderConfiguredBundle": 4,
                        "configurableBundleTemplateSlotUuid": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                    },
                    "metadata": {
                        "superAttributes": {
                            "color": "Gold"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/26408568-7449.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Acer Extensa M2610",
                    "sku": "112_312526171",
                    "sumPrice": 43723,
                    "quantity": 1,
                    "unitGrossPrice": 43723,
                    "sumGrossPrice": 43723,
                    "taxRate": "0.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 43723,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "refundableAmount": 43723,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 43723,
                    "unitSubtotalAggregation": 43723,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 43723,
                    "sumPriceToPayAggregation": 43723,
                    "taxRateAverageAggregation": "0.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "3b0d7d32-c519-5eea-92f1-408c54113c25",
                    "isReturnable": false,
                    "idShipment": 3,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": {
                        "idSalesOrderConfiguredBundle": 5,
                        "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit",
                        "quantity": 1
                    },
                    "salesOrderConfiguredBundleItem": {
                        "idSalesOrderConfiguredBundle": 5,
                        "configurableBundleTemplateSlotUuid": "9626de80-6caa-57a9-a683-2846ec5b6914"
                    },
                    "metadata": {
                        "superAttributes": {
                            "color": "Black",
                            "processor_cache": "3 MB"
                        },
                        "image": "https://images.icecat.biz/img/gallery_mediums/31252617_9321.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Acer Extensa M2610",
                    "sku": "112_312526171",
                    "sumPrice": 43723,
                    "quantity": 1,
                    "unitGrossPrice": 43723,
                    "sumGrossPrice": 43723,
                    "taxRate": "0.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 43723,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "refundableAmount": 43723,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 43723,
                    "unitSubtotalAggregation": 43723,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 43723,
                    "sumPriceToPayAggregation": 43723,
                    "taxRateAverageAggregation": "0.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "b39c7e1c-12ba-53d3-8d81-5c363d5307e9",
                    "isReturnable": false,
                    "idShipment": 3,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": {
                        "idSalesOrderConfiguredBundle": 6,
                        "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit",
                        "quantity": 1
                    },
                    "salesOrderConfiguredBundleItem": {
                        "idSalesOrderConfiguredBundle": 6,
                        "configurableBundleTemplateSlotUuid": "9626de80-6caa-57a9-a683-2846ec5b6914"
                    },
                    "metadata": {
                        "superAttributes": {
                            "color": "Black",
                            "processor_cache": "3 MB"
                        },
                        "image": "https://images.icecat.biz/img/gallery_mediums/31252617_9321.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Samsung Galaxy S6",
                    "sku": "047_26408568",
                    "sumPrice": 5724,
                    "quantity": 1,
                    "unitGrossPrice": 5724,
                    "sumGrossPrice": 5724,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 5724,
                    "unitTaxAmountFullAggregation": 914,
                    "sumTaxAmountFullAggregation": 914,
                    "refundableAmount": 5724,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 5724,
                    "unitSubtotalAggregation": 5724,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 5724,
                    "sumPriceToPayAggregation": 5724,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "b189d4f2-da12-59f3-8e05-dfb4d95b1781",
                    "isReturnable": false,
                    "idShipment": 3,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": {
                        "idSalesOrderConfiguredBundle": 5,
                        "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit",
                        "quantity": 1
                    },
                    "salesOrderConfiguredBundleItem": {
                        "idSalesOrderConfiguredBundle": 5,
                        "configurableBundleTemplateSlotUuid": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                    },
                    "metadata": {
                        "superAttributes": {
                            "color": "Gold"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/26408568-7449.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Samsung Galaxy S6",
                    "sku": "047_26408568",
                    "sumPrice": 5724,
                    "quantity": 1,
                    "unitGrossPrice": 5724,
                    "sumGrossPrice": 5724,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 5724,
                    "unitTaxAmountFullAggregation": 914,
                    "sumTaxAmountFullAggregation": 914,
                    "refundableAmount": 5724,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 5724,
                    "unitSubtotalAggregation": 5724,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 5724,
                    "sumPriceToPayAggregation": 5724,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "349f3ce2-0396-5ed4-a2df-c9e053cb3350",
                    "isReturnable": false,
                    "idShipment": 3,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": {
                        "idSalesOrderConfiguredBundle": 6,
                        "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit",
                        "quantity": 1
                    },
                    "salesOrderConfiguredBundleItem": {
                        "idSalesOrderConfiguredBundle": 6,
                        "configurableBundleTemplateSlotUuid": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                    },
                    "metadata": {
                        "superAttributes": {
                            "color": "Gold"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/26408568-7449.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
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
                    "unitTaxAmount": 78,
                    "sumTaxAmount": 78,
                    "unitPriceToPayAggregation": 490,
                    "sumPriceToPayAggregation": 490,
                    "taxAmountAfterCancellation": null,
                    "idShipment": 3,
                    "idSalesExpense": 3
                }
            ],
            "payments": [
                {
                    "amount": 198768,
                    "paymentProvider": "DummyPayment",
                    "paymentMethod": "Invoice"
                }
            ],
            "shipments": [],
            "calculatedDiscounts": [],
            "bundleItems": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/orders/DE--3"
        }
    }
}

```    
</details>



**General order information**

| ATTRIBUTE       | TYPE   | DESCRIPTION                                                  |
| --------------- | ------ | ------------------------------------------------------------ |
| itemStates      | Array  | Statuses of the order’s items in the [state machine](https://documentation.spryker.com/docs/order-process-modelling-state-machines). |
| createdAt       | String | Date and time when the order was created.                    |
| currencyIsoCode | String | ISO 4217 code of the currency that was selected when placing the order. |
| priceMode       | String | Price mode that was active when placing the order. Possible values:<ul><li>**NET_MODE**—prices before tax.</li><li>**GROSS_MODE**—prices after tax.</li></ul> |



**Totals calculations**
| Attribute                | Type    | Description                                     |
| ------------------------ | ------- | ----------------------------------------------- |
| totals                   | Object  | Totals calculations.                            |
| totals.expenseTotal      | Integer | Total amount of expenses (e.g. shipping costs). |
| totals.discountTotal     | Integer | Total amount of discounts applied.              |
| totals.taxTotal          | Integer | Total amount of taxes paid.                     |
| totals.subtotal          | Integer | Subtotal of the order.                          |
| totals.grandTotal        | Integer | Grand total of the order                        |
| totals.canceledTotal     | Integer | Total canceled amount.                          |
| totals.remunerationTotal | Integer | Total sum of remuneration.                      |

**Billing and shipping addresses**
| Attribute                  | Type   | Description                                                  |
| -------------------------- | ------ | ------------------------------------------------------------ |
| billingAddress             | object | List of attributes describing the billing address of the order. |
| billingAddress.salutation  | String | Salutation to use when addressing the customer.              |
| billingAddress.firstName   | String | Customer's first name.                                       |
| billingAddress.middleName  | String | Customer's middle name.                                      |
| billingAddress.lastName    | String | Customer's last name.                                        |
| billingAddress.address1    | String | 1st line of the customer's address.                          |
| billingAddress.address2    | String | 2nd line of the customer's address.                          |
| billingAddress.address3    | String | 3rd line of the customer's address.                          |
| billingAddress.company     | String | Specifies the customer's company.                            |
| billingAddress.city        | String | Specifies the city.                                          |
| billingAddress.zipCode     | String | ZIP code.                                                    |
| billingAddress.poBox       | String | PO Box to use for communication.                             |
| billingAddress.phone       | String | Specifies the customer's phone number.                       |
| billingAddress.cellPhone   | String | Mobile phone number.                                         |
| billingAddress.description | String | Address description.                                         |
| billingAddress.comment     | String | Address comment.                                             |
| billingAddress.email       | String | Email address to use for communication.                      |
| billingAddress.country     | String | Specifies the country.                                       |
| billingAddress.iso2Code    | String | ISO 2-Letter Country Code to use.                            |
| shippingAddress            | object | Shipment address of the order. This value is returned only if you submit an order without split delivery. See [Checking out purchases in version 202009.0](/docs/scos/dev/glue-api-guides/202009.0/checking-out/checking-out-pu) to learn how to do that. |


**Order item information** 



| Attribute                               | Type    | Description                                                  |
| --------------------------------------- | ------- | ------------------------------------------------------------ |
| items                                   | array   | Items in the order.                                          |
| items.state                             | String  | Defines the state of the order in the state machine.         |
| bundleItems | Array | Array of objects describing the concrete product bundles in the order. |
| bundleItems.bundleItemIdentifier | Integer | Defines the relation between the bundle and its items. The items of the bundle have the same value in the `relatedBundleItemIdentifier` attribute. |
| items.relatedBundleItemIdentifier | Integer | Defines the relation between the item and its bundle. The bundle to which this the item belongs has the same value in the `bundleItemIdentifier` attribute. | 
| items.name                              | String  | Product name.                                                |
| items.sku                               | String  | Product SKU.                                                 |
| items.sumPrice                          | Integer | Sum of all product prices.                                   |
| items.quantity                          | Integer | Product quantity ordered.                                    |
| items.unitGrossPrice                    | Integer | Single item gross price.                                     |
| items.sumGrossPrice                     | Integer | Sum of items gross price.                                    |
| items.taxRate                           | Integer | Current tax rate, in percent.                                |
| items.unitNetPrice                      | Integer | Single item net price.                                       |
| items.sumNetPrice                       | Integer | Sum total of net prices for all items.                       |
| items.unitPrice                         | Integer | Single item price without assuming if it is new or gross. *This price should be displayed everywhere when a product price is displayed. It allows switching tax mode without side effects*. |
| items.unitTaxAmountFullAggregation      | Integer | Total tax amount for a given item, with additions.           |
| items.sumTaxAmountFullAggregation       | Integer | Total tax amount for a given sum of items, with additions.   |
| items.refundableAmount                  | Integer | Available refundable amount for an item (order only).        |
| items.canceledAmount                    | Integer | Total canceled amount for this item (order only).            |
| items.sumSubtotalAggregation            | Integer | Sum of subtotals of the items.                               |
| items.unitSubtotalAggregation           | Integer | Subtotal for the given item.                                 |
| items.unitProductOptionPriceAggregation | Integer | Item total product option price.                             |
| items.sumProductOptionPriceAggregation  | Integer | Item total of product options for the given sum of items.    |
| items.unitExpensePriceAggregation       | Integer | Item expense total for a given item.                         |
| items.sumExpensePriceAggregation        | Integer | Total amount of expenses for the given items.                |
| items.unitDiscountAmountAggregation     | Integer | Item total discount amount.                                  |
| items.sumDiscountAmountAggregation      | Integer | Sum of Item total discount amounts.                          |
| items.unitDiscountAmountFullAggregation | Integer | Sum of item total discount amount.                           |
| items.sumDiscountAmountFullAggregation  | Integer | Item total discount amount, with additions.                  |
| items.unitPriceToPayAggregation         | Integer | Item total price to pay after discounts, with additions.     |
| items.sumPriceToPayAggregation          | Integer | Sum of all prices to pay (after discounts were applied).     |
| items.taxRateAverageAggregation         | Integer | Item tax rate average, with additions. This value is used when recalculating the tax amount after cancellation. |
| items.taxAmountAfterCancellation        | Integer | Tax amount after cancellation, recalculated using tax average. |
| items.uuid                              | String  | Unique identifier of the item in the order.                  |
| items.isReturnable                      | Boolean | Defines if the customer can return the item.                 |
| items.idShipment                        | Integer | Unique identifier of the shipment to which the item belongs. To retrieve all the shipments of the order, include the `order-shipments` resource into the request.|
| items.bundleItemIdentifier                    | Integer | Defines the relation between the bundle and its items. The items of the bundle have the same value in the relatedBundleItemIdentifier attribute. |
| items.relatedBundleItemIdentifier             | Integer | Defines the relation between the item and its bundle. The bundle to which this the item belongs has the same value in the bundleItemIdentifier attribute. |
| items.salesOrderConfiguredBundle | Object | Contains information about the purhased configurable bundle. |
| items.idSalesOrderConfiguredBundle |Integer | Unique identifier of the purchased configured bundle.|
| items.idSalesOrderConfiguredBundle.configurableBundleTemplateUuid|String |Unique identifier of the configurable bundle template in the system. |
| items.idSalesOrderConfiguredBundle.name | String|Name of the configured bundle. |
| items.idSalesOrderConfiguredBundle.quantity | Integer| Quantity of the ordered configurable bundles.|
| items.salesOrderConfiguredBundleItem |Object |Contains information about the items of the configured bundle. |
| items.salesOrderConfiguredBundleItem.configurableBundleTemplateSlotUuid| String| Unique identifier of the configurable bundle slot in the system. |
| items.metadata                          | object  | Metadata of the concrete product.                            |
| items.metadata.superAttributes          | String  | [Attributes](https://documentation.spryker.com/docs/product-attribute-overview) of the order item. |
| items.metadata.image                    | String  | Product image URL.                                           |

**Measurement unit calculations**
| Attribute | Type | Description |
| --- | --- | --- |
| salesUnit | Object | List of attributes defining the sales unit to be used for item amount calculation. |
| conversion | integer | Factor to convert a value from sales to base unit. If it is "null", the information is taken from the global conversions. |
| precision | integer | Ratio between a sales unit and a base unit. |
| measurementUnit | string | Code of the measurement unit. | 
| name | String | Name of the measurement unit. |
| code | String | Code of the measurement unit. |

**Calculated discounts for items**
| ATTRIBUTE                             | TYPE    | DESCRIPTION                                                  |
| :------------------------------------ | :------ | :----------------------------------------------------------- |
| items.calculatedDiscounts             | Array   | List of attributes describing the discount calculated for this item. |
| items.calculatedDiscounts.unitAmount  | Integer | Discount value applied to this order item.                  |
| items.calculatedDiscounts.sumAmount   | Integer | Sum of the discount values applied to this order item.       |
| items.calculatedDiscounts.displayName | String  | Name of the discount applied.                                |
| items.calculatedDiscounts.description | String  | Description of the discount.                                 |
| items.calculatedDiscounts.voucherCode | String  | Voucher code redeemed.                                       |
| items.calculatedDiscounts.quantity    | String  | Number of discounts applied to the product.                  |

**Product options**
| ATTRIBUTE                            | TYPE    | DESCRIPTION                                            |
| :----------------------------------- | :------ | :----------------------------------------------------- |
| items.productOptions                 | Array   | Lst of product options ordered with this item.         |
| items.productOptions.optionGroupName | String  | Name of the group to which the product option belongs. |
| items.productOptions.sku             | String  | SKU of the product option.                             |
| items.productOptions.optionName      | String  | Name of the product option.                            |
| items.productOptions.price           | Integer | Price of the product option.                           |

**Calculated discounts**
| ATTRIBUTE                       | TYPE    | DESCRIPTION                                                  |
| :------------------------------ | :------ | :----------------------------------------------------------- |
| calculatedDiscounts             | Array   | Discounts applied to this order item.                        |
| calculatedDiscounts.unitAmount  | Integer | Amount of the discount provided by the given item for each unit of the product, in cents. |
| calculatedDiscounts.sumAmount   | Integer | Total amount of the discount provided by the given item, in cents. |
| calculatedDiscounts.displayName | String  | Display name of the given discount.                          |
| calculatedDiscounts.description | String  | Description of the given discount.                           |
| calculatedDiscounts.voucherCode | String  | Voucher code applied, if any.                                |
| calculatedDiscounts.quantity    | String  | Number of times the discount was applied.                    |



**Expenses**
| ATTRIBUTE               | TYPE    | DESCRIPTION                       |
| :---------------------- | :------ | :-------------------------------- |
| expenses                | array   | Additional expenses of the order. |
| expenses.type           | String  | Expense type.                     |
| expenses.name           | String  | Expense name.                     |
| expenses.sumPrice       | Integer | Sum of expenses calculated.       |
| expenses.unitGrossPrice | Integer | Single item's gross price.        |
| expenses.sumGrossPrice  | Integer | Sum of items' gross price.        |
| expenses.taxRate        | Integer | Current tax rate in percent.      |
| expenses.unitNetPrice                           | Integer | Single item net price.                                       |
| expenses.sumNetPrice                            | Integer | Sum of items' net price.                                     |
| expenses.canceledAmount                         | Integer | Total canceled amount for this item (order only).            |
| expenses.unitDiscountAmountAggregationexpenses. | Integer | Item total discount amount.                                  |
| expenses.sumDiscountAmountAggregation           | Integer | Sum of items' total discount amount.                         |
| expenses.unitTaxAmount                          | Integer | Tax amount for a single item, after discounts.               |
| expenses.sumTaxAmount                           | Integer | Tax amount for a sum of items (order only).                  |
| expenses.unitPriceToPayAggregation              | Integer | Item total price to pay after discounts with additions.      |
| expenses.sumPriceToPayAggregation               | Integer | Sum of items' total price to pay after discounts with additions. |
| expenses.taxAmountAfterCancellation             | Integer | Tax amount after cancellation, recalculated using tax average. |
| expenses.idShipment                             | Integer | Unique identifier of the shipment to which this expense belongs. To retrieve all the shipments of the order, include the order-shipments resource in the request. |
| expenses.idSalesExpense                         | Integer | Unique identifier of the expense.                            |




**Payments**
| ATTRIBUTE       | TYPE    | DESCRIPTION                                                  |
| :-------------- | :------ | :----------------------------------------------------------- |
| payments        | Array   | A list of payments used in this order.                       |
| amount          | Integer | Amount paid via the corresponding payment provider in cents. |
| paymentProvider | String  | Name of the payment provider.                                |
| paymentMethod   | String  | Name of the payment method.                                  |

**Shipments**
| ATTRIBUTE | TYPE   | DESCRIPTION                                                  |
| :-------- | :----- | :----------------------------------------------------------- |
| shipments | object | Information about the shipments used in this order. This value is returned only if you submit an order without split delivery. To learn how to do that, see [Checking out purchases in version 202009.0](/docs/scos/dev/glue-api-guides/202009.0/checking-out/checking-out-pu). To see all the attributes that are returned when retrieving orders without split delivery, see [Retrieving orders in version 202009.0](https://documentation.spryker.com/docs/retrieving-orders). To retrieve shipment details, include the order-shipments resource in the request. |

| **Included resource** | **Attribute**              | **Type** |
| :-------------------- | :------------------------- | :------- |
| order-shipments       | itemUuids                  | String   |
| order-shipments       | methodName                 | String   |
| order-shipments       | carrierName                | String   |
| order-shipments       | requestedDeliveryDate      | Date     |
| order-shipments       | shippingAddress            | Object   |
| order-shipments       | shippingAddress.salutation | String   |
| order-shipments       | shippingAddress.firstName  | String   |
| order-shipments | shippingAddress.middleName  | String | Customer's middle name.                 |
| order-shipments | shippingAddress.lastName    | String | Customer's last name.                   |
| order-shipments | shippingAddress.address1    | String | The 1st line of the customer's address. |
| order-shipments | shippingAddress.address2    | String | The 2nd line of the customer's address. |
| order-shipments | shippingAddress.address3    | String | The 3rd line of the customer's address. |
| order-shipments | shippingAddress.company     | String | Specifies the customer's company.       |
| order-shipments | shippingAddress.city        | String | Specifies the city.                     |
| order-shipments | shippingAddress.zipCode     | String | ZIP code.                               |
| order-shipments | shippingAddress.poBox       | String | PO Box to use for communication.        |
| order-shipments | shippingAddress.phone       | String | Specifies the customer's phone number.  |
| order-shipments | shippingAddress.cellPhone   | String | Mobile phone number.                    |
| order-shipments | shippingAddress.description | String | Address description.                    |
| order-shipments | shippingAddress.comment     | String | Address comment.                        |
| order-shipments | shippingAddress.email       | String | Email address to use for communication. |
| order-shipments | shippingAddress.country     | String | Specifies the country.                  |
| order-shipments | shippingAddress.iso2Code    | String | ISO 2-Letter Country Code to use.       |

## Possible errors

| Code  | Reason |
| --- | --- |
|001| Access token is invalid. |
|002| Access token is missing.  |
|801| Order with the given order reference is not found.  |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).


