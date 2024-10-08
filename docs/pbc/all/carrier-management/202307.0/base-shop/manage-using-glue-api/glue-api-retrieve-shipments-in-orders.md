---
title: "Glue API: Retrieve shipments in orders"
description: Retrieve all orders of a customer or a particular order via Glue API.
last_updated: Jul 28, 2022
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/pbc/all/carrier-management/202307.0/base-shop/manage-via-glue-api/retrieve-shipments-in-orders.html
---

This document describes how to retrieve shipments in orders. For full information about the endpoint, see [Retrieve orders](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/glue-api-retrieve-orders.html)

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

* [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-the-shipment-glue-api.html)
* [Install the Order Management Glue API](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-order-management-glue-api.html)

## Retrieve an order

To retrieve detailed information about an order, send the following request:

---
`GET` **/orders/*{% raw %}{{{% endraw %}order_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER     | DESCRIPTON                                                   |
| ------------------ | -------------------- |
| ***{% raw %}{{{% endraw %}order_id{% raw %}}}{% endraw %}*** | The unique identifier of an order. [Retrieve all orders](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/glue-api-retrieve-orders.html#retrieve-all-orders) to get it. |

### Request

| HEADER KEY    | HEADER VALUE | REQUIRED | DESCRIPTION                                                  |
| ------------- | ------------ | -------- | ------------------------------------------------------------ |
| Authorization | string       | ✓        | An alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

| STRING PARAMETER | DESCRIPTION  | POSSIBLE VALUES    |
| ---------------- | ---------------- | --------------- |
| include          | Adds resource relationships to the request. | order-shipments |

| REQUEST  | USAGE  |
| ------------------ | --------------------- |
| `GET https://glue.mysprykershop.com/orders/DE--6?include=order-shipments` | Retrieves information about the order with the id `DE--6`, with order shipments included. |

### Response

<details>
<summary>Response sample: retrieve an order with order shipments included</summary>

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
                "address1": "Julie-Wolfthorn-Strasse",
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
                    "address1": "Julie-Wolfthorn-Strasse",
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
                    "address1": "Julie-Wolfthorn-Strasse",
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


{% include pbc/all/glue-api-guides/202307.0/retrieve-an-order-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202307.0/retrieve-an-order-response-attributes.md -->

{% include pbc/all/glue-api-guides/202307.0/retrieve-an-order-response-attributes-of-included-resources.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202307.0/retrieve-an-order-response-attributes-of-included-resources.md -->


## Possible errors

| CODE  | REASON |
| --- | --- |
|001| Access token is invalid. |
|002| Access token is missing.  |
|801| Order with the given order reference is not found.  |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
