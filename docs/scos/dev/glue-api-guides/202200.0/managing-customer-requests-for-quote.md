---
title: Managing cusomer requests for quote
description: This endpoint allows managing customer requests for quote.
last_updated: Jun 22, 2021
template: glue-api-storefront-guide-template
---

This endpoint allows managing customer requests for quote.

## Installation

For details on the modules that provide the API functionality and how to install them, see <!--paste a link to a IG-->

## Create a request for quote

To create a request for quote for a customer, send the following request:

---
`POST` **/quote-requests**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|---|---|---|
| include | Adds resource relationships to the request. | <div><ul><li>customers</li><li>company-users</li><li>company-business-units</li><li>concrete-products</li></ul></div> |

Sample request: `POST https://glue.mysprykershop.com/quote-requests`

```json
{
    "data": {
        "type": "quote-requests",
        "attributes": {
            "cartUuid": "0ba0fb0a-adf6-5fa1-ae13-76626d6cc1a3",
            "meta": {
                "purchase_order_number": "228",
                "delivery_date": "2021-07-31",
                "note": "consider the quotation request"
            }
        }
    }
}
```

| ATTRIBUTE | REQUIRED | TYPE | DESCRIPTION |
|---|---|---|---|
| companyUserUuid | &check; | String | Company user ID |
| purchase_order_number |   | Integer | Purchase order number |
| delivery_date |   | String | Delivary date of the product |
| note |   | String | Notes/commnets left by a customer or Back Office user. |

### Response

<details><summary>Response sample</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-2",
        "attributes": {
            "status": "draft",
            "quoteRequestReference": "DE--21-2",
            "createdAt": null,
            "validUntil": null,
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-2-1",
                "createdAt": null,
                "meta": {
                    "purchase_order_number": "228",
                    "delivery_date": "2021-07-31",
                    "note": "consider the quotation request"
                },
                "cart": {
                    "priceMode": "GROSS_MODE",
                    "store": "DE",
                    "currency": "EUR",
                    "totals": {
                        "expenseTotal": 0,
                        "discountTotal": 0,
                        "taxTotal": 24619,
                        "subtotal": 154194,
                        "grandTotal": 154194,
                        "priceToPay": 154194
                    },
                    "billingAddress": null,
                    "discounts": [],
                    "shipments": [],
                    "items": [
                        {
                            "sku": "023_21758366",
                            "quantity": 5,
                            "groupKey": "023_21758366",
                            "abstractSku": "023",
                            "amount": null,
                            "calculations": {
                                "unitPrice": 26723,
                                "sumPrice": 133615,
                                "taxRate": 19,
                                "unitNetPrice": 0,
                                "sumNetPrice": 0,
                                "unitGrossPrice": 26723,
                                "sumGrossPrice": 133615,
                                "unitTaxAmountFullAggregation": 4267,
                                "sumTaxAmountFullAggregation": 21333,
                                "sumSubtotalAggregation": 133615,
                                "unitSubtotalAggregation": 26723,
                                "unitProductOptionPriceAggregation": 0,
                                "sumProductOptionPriceAggregation": 0,
                                "unitDiscountAmountAggregation": 0,
                                "sumDiscountAmountAggregation": 0,
                                "unitDiscountAmountFullAggregation": 0,
                                "sumDiscountAmountFullAggregation": 0,
                                "unitPriceToPayAggregation": 26723,
                                "sumPriceToPayAggregation": 133615
                            }
                        },
                        {
                            "sku": "020_21081478",
                            "quantity": "1",
                            "groupKey": "020_21081478",
                            "abstractSku": "020",
                            "amount": null,
                            "calculations": {
                                "unitPrice": 10580,
                                "sumPrice": 10580,
                                "taxRate": 19,
                                "unitNetPrice": 0,
                                "sumNetPrice": 0,
                                "unitGrossPrice": 10580,
                                "sumGrossPrice": 10580,
                                "unitTaxAmountFullAggregation": 1689,
                                "sumTaxAmountFullAggregation": 1690,
                                "sumSubtotalAggregation": 10580,
                                "unitSubtotalAggregation": 10580,
                                "unitProductOptionPriceAggregation": 0,
                                "sumProductOptionPriceAggregation": 0,
                                "unitDiscountAmountAggregation": 0,
                                "sumDiscountAmountAggregation": 0,
                                "unitDiscountAmountFullAggregation": 0,
                                "sumDiscountAmountFullAggregation": 0,
                                "unitPriceToPayAggregation": 10580,
                                "sumPriceToPayAggregation": 10580
                            }
                        },
                        {
                            "sku": "009_30692991",
                            "quantity": "1",
                            "groupKey": "009_30692991",
                            "abstractSku": "009",
                            "amount": null,
                            "calculations": {
                                "unitPrice": 9999,
                                "sumPrice": 9999,
                                "taxRate": 19,
                                "unitNetPrice": 0,
                                "sumNetPrice": 0,
                                "unitGrossPrice": 9999,
                                "sumGrossPrice": 9999,
                                "unitTaxAmountFullAggregation": 1596,
                                "sumTaxAmountFullAggregation": 1596,
                                "sumSubtotalAggregation": 9999,
                                "unitSubtotalAggregation": 9999,
                                "unitProductOptionPriceAggregation": 0,
                                "sumProductOptionPriceAggregation": 0,
                                "unitDiscountAmountAggregation": 0,
                                "sumDiscountAmountAggregation": 0,
                                "unitDiscountAmountFullAggregation": 0,
                                "sumDiscountAmountFullAggregation": 0,
                                "unitPriceToPayAggregation": 9999,
                                "sumPriceToPayAggregation": 9999
                            }
                        }
                    ]
                }
            },
            "versions": []
        },
        "links": {
            "self": "https://glue.69.demo-spryker.com/quote-requests/DE--21-2"
        }
    }
}
```

</details>

<details><summary>Response sample with customers</summary>
</details>

<details><summary>Response sample with company-users</summary>
</details>

<details><summary>Response sample with company-business-units</summary>
</details>

<details><summary>Response sample with concrete-products</summary>
</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
|---|---|---|
| quoteRequestReference | String | Reference of the quote request |
| status | String | Status of the quote request |
| isLatestVersionVisible | Boolean |   |
| createdAt | String |   |
| validUntil | String |   |
| versions | Array |   |
| shownVersion | Object |   |
| version | Integer |   |
| versionReference | String |   |
| createdAt | String | Order creation date |
| metadata | Array |   |
| purchase_order_number | Integer | Purchase order number |
| delivery_date | String | Delivery date |
| note | String | Order notes |

For attribute description of a cart, see [Managing carts of registered users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html).

For attribute descriptions of shipments, see [Managing customer addresses](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customer-customer-access-customer-groups/managing-customer-addresses.html).

## Retrieve all requests for quote

To retrieve all requests for quote for a customer, send the following request:

---
`GET` **/quote-requests**

---

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|---|---|---|
| include | Adds resource relationships to the request. | <div><ul><li>customers</li><li>company-users</li><li>company-business-units</li><li>concrete-products</li></ul></div> |

Sample request: `POST https://glue.mysprykershop.com/quote-requests`

<details><summary>Response sample</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-2",
            "attributes": {
                "status": "draft",
                "quoteRequestReference": "DE--21-2",
                "createdAt": "2021-07-26 16:13:14.000000",
                "validUntil": null,
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-2-1",
                    "createdAt": null,
                    "meta": {
                        "purchase_order_number": "228",
                        "delivery_date": "2021-07-31",
                        "note": "consider the quotation request"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 0,
                            "taxTotal": 24619,
                            "subtotal": 154194,
                            "grandTotal": 154194,
                            "priceToPay": 154194
                        },
                        "billingAddress": null,
                        "discounts": [],
                        "shipments": [],
                        "items": [
                            {
                                "sku": "023_21758366",
                                "quantity": 5,
                                "groupKey": "023_21758366",
                                "abstractSku": "023",
                                "amount": null,
                                "calculations": {
                                    "unitPrice": 26723,
                                    "sumPrice": 133615,
                                    "taxRate": 19,
                                    "unitNetPrice": 0,
                                    "sumNetPrice": 0,
                                    "unitGrossPrice": 26723,
                                    "sumGrossPrice": 133615,
                                    "unitTaxAmountFullAggregation": 4267,
                                    "sumTaxAmountFullAggregation": 21333,
                                    "sumSubtotalAggregation": 133615,
                                    "unitSubtotalAggregation": 26723,
                                    "unitProductOptionPriceAggregation": 0,
                                    "sumProductOptionPriceAggregation": 0,
                                    "unitDiscountAmountAggregation": 0,
                                    "sumDiscountAmountAggregation": 0,
                                    "unitDiscountAmountFullAggregation": 0,
                                    "sumDiscountAmountFullAggregation": 0,
                                    "unitPriceToPayAggregation": 26723,
                                    "sumPriceToPayAggregation": 133615
                                }
                            },
                            {
                                "sku": "020_21081478",
                                "quantity": "1",
                                "groupKey": "020_21081478",
                                "abstractSku": "020",
                                "amount": null,
                                "calculations": {
                                    "unitPrice": 10580,
                                    "sumPrice": 10580,
                                    "taxRate": 19,
                                    "unitNetPrice": 0,
                                    "sumNetPrice": 0,
                                    "unitGrossPrice": 10580,
                                    "sumGrossPrice": 10580,
                                    "unitTaxAmountFullAggregation": 1689,
                                    "sumTaxAmountFullAggregation": 1690,
                                    "sumSubtotalAggregation": 10580,
                                    "unitSubtotalAggregation": 10580,
                                    "unitProductOptionPriceAggregation": 0,
                                    "sumProductOptionPriceAggregation": 0,
                                    "unitDiscountAmountAggregation": 0,
                                    "sumDiscountAmountAggregation": 0,
                                    "unitDiscountAmountFullAggregation": 0,
                                    "sumDiscountAmountFullAggregation": 0,
                                    "unitPriceToPayAggregation": 10580,
                                    "sumPriceToPayAggregation": 10580
                                }
                            },
                            {
                                "sku": "009_30692991",
                                "quantity": "1",
                                "groupKey": "009_30692991",
                                "abstractSku": "009",
                                "amount": null,
                                "calculations": {
                                    "unitPrice": 9999,
                                    "sumPrice": 9999,
                                    "taxRate": 19,
                                    "unitNetPrice": 0,
                                    "sumNetPrice": 0,
                                    "unitGrossPrice": 9999,
                                    "sumGrossPrice": 9999,
                                    "unitTaxAmountFullAggregation": 1596,
                                    "sumTaxAmountFullAggregation": 1596,
                                    "sumSubtotalAggregation": 9999,
                                    "unitSubtotalAggregation": 9999,
                                    "unitProductOptionPriceAggregation": 0,
                                    "sumProductOptionPriceAggregation": 0,
                                    "unitDiscountAmountAggregation": 0,
                                    "sumDiscountAmountAggregation": 0,
                                    "unitDiscountAmountFullAggregation": 0,
                                    "sumDiscountAmountFullAggregation": 0,
                                    "unitPriceToPayAggregation": 9999,
                                    "sumPriceToPayAggregation": 9999
                                }
                            }
                        ]
                    }
                },
                "versions": []
            },
            "links": {
                "self": "https://glue.69.demo-spryker.com/quote-requests/DE--21-2"
            }
        },
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "status": "draft",
                "quoteRequestReference": "DE--21-1",
                "createdAt": "2021-07-26 16:12:42.000000",
                "validUntil": null,
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": null,
                    "meta": {
                        "purchase_order_number": "228",
                        "delivery_date": "2021-07-31",
                        "note": "consider the quotation request"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 0,
                            "taxTotal": 24619,
                            "subtotal": 154194,
                            "grandTotal": 154194,
                            "priceToPay": 154194
                        },
                        "billingAddress": null,
                        "discounts": [],
                        "shipments": [],
                        "items": [
                            {
                                "sku": "023_21758366",
                                "quantity": 5,
                                "groupKey": "023_21758366",
                                "abstractSku": "023",
                                "amount": null,
                                "calculations": {
                                    "unitPrice": 26723,
                                    "sumPrice": 133615,
                                    "taxRate": 19,
                                    "unitNetPrice": 0,
                                    "sumNetPrice": 0,
                                    "unitGrossPrice": 26723,
                                    "sumGrossPrice": 133615,
                                    "unitTaxAmountFullAggregation": 4267,
                                    "sumTaxAmountFullAggregation": 21333,
                                    "sumSubtotalAggregation": 133615,
                                    "unitSubtotalAggregation": 26723,
                                    "unitProductOptionPriceAggregation": 0,
                                    "sumProductOptionPriceAggregation": 0,
                                    "unitDiscountAmountAggregation": 0,
                                    "sumDiscountAmountAggregation": 0,
                                    "unitDiscountAmountFullAggregation": 0,
                                    "sumDiscountAmountFullAggregation": 0,
                                    "unitPriceToPayAggregation": 26723,
                                    "sumPriceToPayAggregation": 133615
                                }
                            },
                            {
                                "sku": "020_21081478",
                                "quantity": "1",
                                "groupKey": "020_21081478",
                                "abstractSku": "020",
                                "amount": null,
                                "calculations": {
                                    "unitPrice": 10580,
                                    "sumPrice": 10580,
                                    "taxRate": 19,
                                    "unitNetPrice": 0,
                                    "sumNetPrice": 0,
                                    "unitGrossPrice": 10580,
                                    "sumGrossPrice": 10580,
                                    "unitTaxAmountFullAggregation": 1689,
                                    "sumTaxAmountFullAggregation": 1690,
                                    "sumSubtotalAggregation": 10580,
                                    "unitSubtotalAggregation": 10580,
                                    "unitProductOptionPriceAggregation": 0,
                                    "sumProductOptionPriceAggregation": 0,
                                    "unitDiscountAmountAggregation": 0,
                                    "sumDiscountAmountAggregation": 0,
                                    "unitDiscountAmountFullAggregation": 0,
                                    "sumDiscountAmountFullAggregation": 0,
                                    "unitPriceToPayAggregation": 10580,
                                    "sumPriceToPayAggregation": 10580
                                }
                            },
                            {
                                "sku": "009_30692991",
                                "quantity": "1",
                                "groupKey": "009_30692991",
                                "abstractSku": "009",
                                "amount": null,
                                "calculations": {
                                    "unitPrice": 9999,
                                    "sumPrice": 9999,
                                    "taxRate": 19,
                                    "unitNetPrice": 0,
                                    "sumNetPrice": 0,
                                    "unitGrossPrice": 9999,
                                    "sumGrossPrice": 9999,
                                    "unitTaxAmountFullAggregation": 1596,
                                    "sumTaxAmountFullAggregation": 1596,
                                    "sumSubtotalAggregation": 9999,
                                    "unitSubtotalAggregation": 9999,
                                    "unitProductOptionPriceAggregation": 0,
                                    "sumProductOptionPriceAggregation": 0,
                                    "unitDiscountAmountAggregation": 0,
                                    "sumDiscountAmountAggregation": 0,
                                    "unitDiscountAmountFullAggregation": 0,
                                    "sumDiscountAmountFullAggregation": 0,
                                    "unitPriceToPayAggregation": 9999,
                                    "sumPriceToPayAggregation": 9999
                                }
                            }
                        ]
                    }
                },
                "versions": []
            },
            "links": {
                "self": "https://glue.69.demo-spryker.com/quote-requests/DE--21-1"
            }
        }
    ],
    "links": {
        "self": "https://glue.69.demo-spryker.com/quote-requests"
    }
}
```

</details>
<details><summary>Response sample with customers</summary>

</details>

<details><summary>Response sample with company-users</summary>
</details>

<details><summary>Response sample with company-business-units</summary>
</details>

<details><summary>Response sample with concrete-products</summary>
</details>

## Retrieve a request for quote

To retrieve a request for quote for a customer, send the following request:

`GET` **/quote-requests/{{QuotationRequestID}}**

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|---|---|---|
| include | Adds resource relationships to the request. | <div><ul><li>customers</li><li>company-users</li><li>company-business-units</li><li>concrete-products</li></ul></div> |

Sample request: `GET https://glue.mysprykershop.com/quote-requests/DE--21-1`

Response

<details><summary>Response sample</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-2",
            "attributes": {
                "status": "draft",
                "quoteRequestReference": "DE--21-2",
                "createdAt": "2021-07-26 16:13:14.000000",
                "validUntil": null,
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-2-1",
                    "createdAt": null,
                    "meta": {
                        "purchase_order_number": "228",
                        "delivery_date": "2021-07-31",
                        "note": "consider the quotation request"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 0,
                            "taxTotal": 24619,
                            "subtotal": 154194,
                            "grandTotal": 154194,
                            "priceToPay": 154194
                        },
                        "billingAddress": null,
                        "discounts": [],
                        "shipments": [],
                        "items": [
                            {
                                "sku": "023_21758366",
                                "quantity": 5,
                                "groupKey": "023_21758366",
                                "abstractSku": "023",
                                "amount": null,
                                "calculations": {
                                    "unitPrice": 26723,
                                    "sumPrice": 133615,
                                    "taxRate": 19,
                                    "unitNetPrice": 0,
                                    "sumNetPrice": 0,
                                    "unitGrossPrice": 26723,
                                    "sumGrossPrice": 133615,
                                    "unitTaxAmountFullAggregation": 4267,
                                    "sumTaxAmountFullAggregation": 21333,
                                    "sumSubtotalAggregation": 133615,
                                    "unitSubtotalAggregation": 26723,
                                    "unitProductOptionPriceAggregation": 0,
                                    "sumProductOptionPriceAggregation": 0,
                                    "unitDiscountAmountAggregation": 0,
                                    "sumDiscountAmountAggregation": 0,
                                    "unitDiscountAmountFullAggregation": 0,
                                    "sumDiscountAmountFullAggregation": 0,
                                    "unitPriceToPayAggregation": 26723,
                                    "sumPriceToPayAggregation": 133615
                                }
                            },
                            {
                                "sku": "020_21081478",
                                "quantity": "1",
                                "groupKey": "020_21081478",
                                "abstractSku": "020",
                                "amount": null,
                                "calculations": {
                                    "unitPrice": 10580,
                                    "sumPrice": 10580,
                                    "taxRate": 19,
                                    "unitNetPrice": 0,
                                    "sumNetPrice": 0,
                                    "unitGrossPrice": 10580,
                                    "sumGrossPrice": 10580,
                                    "unitTaxAmountFullAggregation": 1689,
                                    "sumTaxAmountFullAggregation": 1690,
                                    "sumSubtotalAggregation": 10580,
                                    "unitSubtotalAggregation": 10580,
                                    "unitProductOptionPriceAggregation": 0,
                                    "sumProductOptionPriceAggregation": 0,
                                    "unitDiscountAmountAggregation": 0,
                                    "sumDiscountAmountAggregation": 0,
                                    "unitDiscountAmountFullAggregation": 0,
                                    "sumDiscountAmountFullAggregation": 0,
                                    "unitPriceToPayAggregation": 10580,
                                    "sumPriceToPayAggregation": 10580
                                }
                            },
                            {
                                "sku": "009_30692991",
                                "quantity": "1",
                                "groupKey": "009_30692991",
                                "abstractSku": "009",
                                "amount": null,
                                "calculations": {
                                    "unitPrice": 9999,
                                    "sumPrice": 9999,
                                    "taxRate": 19,
                                    "unitNetPrice": 0,
                                    "sumNetPrice": 0,
                                    "unitGrossPrice": 9999,
                                    "sumGrossPrice": 9999,
                                    "unitTaxAmountFullAggregation": 1596,
                                    "sumTaxAmountFullAggregation": 1596,
                                    "sumSubtotalAggregation": 9999,
                                    "unitSubtotalAggregation": 9999,
                                    "unitProductOptionPriceAggregation": 0,
                                    "sumProductOptionPriceAggregation": 0,
                                    "unitDiscountAmountAggregation": 0,
                                    "sumDiscountAmountAggregation": 0,
                                    "unitDiscountAmountFullAggregation": 0,
                                    "sumDiscountAmountFullAggregation": 0,
                                    "unitPriceToPayAggregation": 9999,
                                    "sumPriceToPayAggregation": 9999
                                }
                            }
                        ]
                    }
                },
                "versions": []
            },
            "links": {
                "self": "https://glue.69.demo-spryker.com/quote-requests/DE--21-2"
            }
        },
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "status": "draft",
                "quoteRequestReference": "DE--21-1",
                "createdAt": "2021-07-26 16:12:42.000000",
                "validUntil": null,
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": null,
                    "meta": {
                        "purchase_order_number": "228",
                        "delivery_date": "2021-07-31",
                        "note": "consider the quotation request"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 0,
                            "taxTotal": 24619,
                            "subtotal": 154194,
                            "grandTotal": 154194,
                            "priceToPay": 154194
                        },
                        "billingAddress": null,
                        "discounts": [],
                        "shipments": [],
                        "items": [
                            {
                                "sku": "023_21758366",
                                "quantity": 5,
                                "groupKey": "023_21758366",
                                "abstractSku": "023",
                                "amount": null,
                                "calculations": {
                                    "unitPrice": 26723,
                                    "sumPrice": 133615,
                                    "taxRate": 19,
                                    "unitNetPrice": 0,
                                    "sumNetPrice": 0,
                                    "unitGrossPrice": 26723,
                                    "sumGrossPrice": 133615,
                                    "unitTaxAmountFullAggregation": 4267,
                                    "sumTaxAmountFullAggregation": 21333,
                                    "sumSubtotalAggregation": 133615,
                                    "unitSubtotalAggregation": 26723,
                                    "unitProductOptionPriceAggregation": 0,
                                    "sumProductOptionPriceAggregation": 0,
                                    "unitDiscountAmountAggregation": 0,
                                    "sumDiscountAmountAggregation": 0,
                                    "unitDiscountAmountFullAggregation": 0,
                                    "sumDiscountAmountFullAggregation": 0,
                                    "unitPriceToPayAggregation": 26723,
                                    "sumPriceToPayAggregation": 133615
                                }
                            },
                            {
                                "sku": "020_21081478",
                                "quantity": "1",
                                "groupKey": "020_21081478",
                                "abstractSku": "020",
                                "amount": null,
                                "calculations": {
                                    "unitPrice": 10580,
                                    "sumPrice": 10580,
                                    "taxRate": 19,
                                    "unitNetPrice": 0,
                                    "sumNetPrice": 0,
                                    "unitGrossPrice": 10580,
                                    "sumGrossPrice": 10580,
                                    "unitTaxAmountFullAggregation": 1689,
                                    "sumTaxAmountFullAggregation": 1690,
                                    "sumSubtotalAggregation": 10580,
                                    "unitSubtotalAggregation": 10580,
                                    "unitProductOptionPriceAggregation": 0,
                                    "sumProductOptionPriceAggregation": 0,
                                    "unitDiscountAmountAggregation": 0,
                                    "sumDiscountAmountAggregation": 0,
                                    "unitDiscountAmountFullAggregation": 0,
                                    "sumDiscountAmountFullAggregation": 0,
                                    "unitPriceToPayAggregation": 10580,
                                    "sumPriceToPayAggregation": 10580
                                }
                            },
                            {
                                "sku": "009_30692991",
                                "quantity": "1",
                                "groupKey": "009_30692991",
                                "abstractSku": "009",
                                "amount": null,
                                "calculations": {
                                    "unitPrice": 9999,
                                    "sumPrice": 9999,
                                    "taxRate": 19,
                                    "unitNetPrice": 0,
                                    "sumNetPrice": 0,
                                    "unitGrossPrice": 9999,
                                    "sumGrossPrice": 9999,
                                    "unitTaxAmountFullAggregation": 1596,
                                    "sumTaxAmountFullAggregation": 1596,
                                    "sumSubtotalAggregation": 9999,
                                    "unitSubtotalAggregation": 9999,
                                    "unitProductOptionPriceAggregation": 0,
                                    "sumProductOptionPriceAggregation": 0,
                                    "unitDiscountAmountAggregation": 0,
                                    "sumDiscountAmountAggregation": 0,
                                    "unitDiscountAmountFullAggregation": 0,
                                    "sumDiscountAmountFullAggregation": 0,
                                    "unitPriceToPayAggregation": 9999,
                                    "sumPriceToPayAggregation": 9999
                                }
                            }
                        ]
                    }
                },
                "versions": []
            },
            "links": {
                "self": "https://glue.69.demo-spryker.com/quote-requests/DE--21-1"
            }
        }
    ],
    "links": {
        "self": "https://glue.69.demo-spryker.com/quote-requests"
    }
}
```

</details>

## Possible errors

| CODE | REASON |
|---|---|
| 001 | Access token is invalid |
| 002 | Access token is missing |
| 101 | Cart with the given uuid is not found. |
| 102 | Failed to add an item to cart. |
| 4501 | Quote request is not found. |
| 1401 | Rest user is not a company user (wrong access token) |
| 5403 | Cart is empty |
