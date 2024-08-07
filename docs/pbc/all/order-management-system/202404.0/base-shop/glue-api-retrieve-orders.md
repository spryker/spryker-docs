---
title: "Glue API: Retrieve orders"
description: Retrieve all orders of a customer or a particular order via Glue API.
last_updated: Jul 13, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-orders
originalArticleId: 5774ec3a-945c-46f1-a51c-475e6e1d9df9
redirect_from:
  - /docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-orders.html
  - /docs/scos/dev/glue-api-guides/202204.0/retrieving-orders.html
related:
  - title: Retrieving customer orders
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/customers/glue-api-retrieve-customer-orders.html
  - title: Order Management feature overview
    link: docs/pbc/all/order-management-system/page.version/base-shop/order-management-feature-overview/order-management-feature-overview.html
---

This endpoint allows retrieving customer's orders.

In your development, this resource can help you to:

* Make the order history available to customers
* Make order details available to enable reordering functionality

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

* [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)
* [Install the Order Management Glue API](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-order-management-glue-api.html)
* [Glue API: Measurement Units Feature Integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-measurement-units-glue-api.html)
* [Install the Product Options Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-options-glue-api.html)
* [Install the Product Bundles Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-bundles-glue-api.html)
* [Install the Configurable Bundle Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-configurable-bundle-feature.html)
* [Install the Configurable Bundle + Cart Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-cart-glue-api.html)
* [Install the Configurable Bundle + Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-product-glue-api.html)

## Retrieve all orders

To retrieve a list of all orders made by a registered customer, send the request:

---
`GET` **/orders**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

| STRING PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| offset | Offset of the order at which to begin the response. <br> Works only together with `page[limit]`. <br> To work correctly, the value should be devisable by the value of `page[limit]`. <br> The default value is `0`.  | From `0` to any. |
| limit | Maximum number of entries to return. <br> Works only together with `page[offset]`. <br> The default value is `10`. | From `1` to any. |

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/orders` | Retrieve all orders. |
| `GET https://glue.mysprykershop.com/orders?page[limit]=10` | Retrieve 10 orders. |
| `GET https://glue.mysprykershop.com/orders?page[offset]=10&page[limit]=10` | Retrieve 10 orders starting from the eleventh order. |
| `GET https://glue.mysprykershop.com/orders?page[offset]=20` | Retrieve all orders starting from the twenty first order. |

### Response

<details>
<summary markdown='span'>Response sample: retrieve a single order</summary>

```json
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

{% include pbc/all/glue-api-guides/{{page.version}}/orders-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/orders-response-attributes.md -->


## Retrieve an order

To retrieve detailed information on an order, send the request:

---
`GET` **/orders/*{% raw %}{{{% endraw %}order_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER     | DESCRIPTON                                                   |
| ------------------ | -------------------- |
| ***{% raw %}{{{% endraw %}order_id{% raw %}}}{% endraw %}*** | Unique identifier of an order. [Retrieve all orders](#retrieve-all-orders) to get it. |

### Request

| HEADER KEY    | HEADER VALUE | REQUIRED | DESCRIPTION                                                  |
| ------------- | ------------ | -------- | ------------------------------------------------------------ |
| Authorization | string       | ✓        | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

| STRING PARAMETER | DESCRIPTION  | POSSIBLE VALUES    |
| ---------------- | ---------------- | --------------- |
| include          | Adds resource relationships to the request. | order-shipments, concrete-products, abstract-products |

| REQUEST  | USAGE  |
| ------------------ | --------------------- |
| `GET https://glue.mysprykershop.com/orders/DE--1`              | Retrieve information about the order with the id `DE--6`.      |
| `GET https://glue.mysprykershop.com/orders/DE--6?include=order-shipments` | Retrieve information about the order with the id `DE--6` with order shipments included. |

### Response

<details>
<summary markdown='span'>Response sample: retrieve an order</summary>

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

<details>
<summary markdown='span'>Response sample: retrieve an order with order shipments included</summary>

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

<details>
<summary markdown='span'>Response sample: retrieve an order with the details on a configurable bundle</summary>

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

{% include pbc/all/glue-api-guides/{{page.version}}/orders-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/orders-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/order-shipments-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/order-shipments-response-attributes.md -->

## Possible errors

| CODE  | REASON |
| --- | --- |
|001| Access token is invalid. |
|002| Access token is missing.  |
|801| Order with the given order reference is not found.  |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
