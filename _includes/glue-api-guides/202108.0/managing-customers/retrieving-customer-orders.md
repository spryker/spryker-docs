---
title: Retrieving customer orders
description: This endpoint allows retrieving a customer's orders.
last_updated: Jul 12, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-customer-orders
originalArticleId: 4390b08b-349a-406e-8e41-983014e30ab5
redirect_from:
  - /2021080/docs/retrieving-customer-orders
  - /2021080/docs/en/retrieving-customer-orders
  - /docs/retrieving-customer-orders
  - /docs/en/retrieving-customer-orders
related:
  - title: Retrieving orders
    link: docs/scos/dev/glue-api-guides/page.version/retrieving-orders.html
---

This endpoint allows retrieving a customer’s orders.

## Installation

For details on the modules that provide the API functionality and how to install them, see [Glue API: Order Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-order-management-feature-integration.html).

## Retrieve customer’s orders

To retrieve a customer’s orders, send the request:

***
`GET` **/customers/*{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %}*/orders**
***

{% info_block infoBox "Note" %}

Alternatively, you can retrieve all orders made by a customer through the **/orders** endpoint. For details, see [Retrieving orders](/docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-orders.html#retrieve-all-orders).

{% endinfo_block %}

| PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %}*** | Customer unique identifier to retrieve orders of. To get it, [retrieve a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customers.html#retrieve-customers) or [create a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customers.html#create-a-customer). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html). |

| STRING PARAMETER | DESCRIPTION | POSSIBLE VALUES |
|-|-|-|
| offset | Offset of the order at which to begin the response. Works only together with `page[limit]`. To work correctly, the value should be devisable by the value of `page[limit]`. The default value is `0`. | From `0` to any. |
| limit | Maximum number of entries to return. Works only together with page[offset]. The default value is `10`. | From `1` to any. |

### Response

<details><summary markdown='span'>Response sample with one order</summary>

```json
{
    "data": [
        {
            "type": "orders",
            "id": "DE--1",
            "attributes": {
                "merchantReferences": [],
                "itemStates": [
                    "exported"
                ],
                "createdAt": "2021-04-28 14:29:50.871313",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 490,
                    "discountTotal": 0,
                    "taxTotal": 1116,
                    "subtotal": 6500,
                    "grandTotal": 6990,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--1?offset=20"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/customers/DE--1/orders?offset=20"
    }
}
```
</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|
| merchantReferences | Array | Array of merchant references. A merchant reference assigned to every merchant. |
| itemStates | Array | State of the item in the order. |
| createdAt | String | Date and time when the order was created. |
| currencyIsoCode | String | ISO 4217 code of the currency that was selected when placing the order. |
| priceMode | String | Price mode that was active when placing the order. Possible values: NET_MODE—prices before tax. GROSS_MODE—prices after tax. |
| expenseTotal | Integer | Total amount of expenses (e.g., shipping costs). |
| discountTotal | Integer | Total amount of discounts applied. |
| taxTotal | Integer | Total amount of taxes paid. |
| subtotal | Integer | Subtotal of the order. |
| grandTotal | Integer | Grand total of the order. |
| canceledTotal | Integer | Total canceled amount. |
| remunerationTotal | Integer | Total sum of remuneration. |

## Possible errors

| CODE | REASON |
|-|-|
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 402 | Customer with the specified ID was not found. |
| 802 | Request is unauthorized. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
