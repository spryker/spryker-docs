---
title: "Backend API: Retrieve orders"
description: Learn how to retrieve a paginated, filterable, sortable collection of placed sales orders and a single order with its line items using the Spryker Backend API.
last_updated: Sep 15, 2026
template: default
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Create an order
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-create-an-order.html
  - title: Fire an order event
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-fire-an-order-event.html
  - title: Retrieve order comments
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-order-comments.html
---

The `orders` resource of the Backend API lets Back Office integrations read placed sales orders—everything an operator sees on the order screens, without driving the UI. This document describes how to retrieve a paginated order collection and a single order with its line items.

## Installation

The endpoints are provided by the `OrderExperienceManagement` module, which projects existing order data from the `Sales` module rather than reimplementing it. Install it with `composer require spryker-feature/order-experience-management`, then run `console transfer:generate` and `console propel:install` to apply the module's schema extension.

## Retrieve orders

To retrieve a paginated collection of orders, send the request:

---
`GET` **/orders**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| page[limit] | Number of orders per page. Default: `25`, maximum: `100`. A higher value is reduced to the maximum. | `page[limit]=50` |
| page[offset] | Number of orders to skip. Default: `0`. | `page[offset]=50` |
| sort | Sorts the collection by a field. Prefix the field with `-` for descending order. The only supported field is `createdAt`; an unrecognized field is ignored rather than causing an error. | `sort=createdAt`<br>`sort=-createdAt` |
| orderReference | Returns the orders with the specified reference. Comma-separate to look up several orders in one call. | `orderReference=DE--1234`<br>`orderReference=DE--1234,DE--1235` |
| customerReference | Returns every order belonging to the specified customer. Comma-separate for several customers. | `customerReference=DE--6` |
| storeName | Returns only orders placed in the specified store. | `storeName=DE` |
| itemState | Returns orders with at least one item in the specified OMS state. Comma-separate to match any of several states. Items advance independently, so an order reports the set of states in `itemStates` rather than one state of its own. An unknown state name matches nothing. | `itemState=shipped`<br>`itemState=shipped,delivered` |
| createdAtFrom | Returns orders created at or after this timestamp (inclusive). | `createdAtFrom=2026-01-01 00:00:00` |
| createdAtTo | Returns orders created at or before this timestamp (inclusive). | `createdAtTo=2026-12-31 23:59:59` |

All filters are optional and AND-combined.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/orders` | Retrieve the first page of the order collection. |
| `GET https://glue-backend.mysprykershop.com/orders?page[limit]=10&page[offset]=10` | Retrieve the second page of the collection with 10 orders per page. |
| `GET https://glue-backend.mysprykershop.com/orders?sort=-createdAt` | Retrieve orders sorted by creation date, newest first. |
| `GET https://glue-backend.mysprykershop.com/orders?customerReference=DE--6` | Retrieve every order belonging to customer `DE--6`. |
| `GET https://glue-backend.mysprykershop.com/orders?itemState=shipped,delivered` | Retrieve orders that have at least one item in the `shipped` or `delivered` state. |
| `GET https://glue-backend.mysprykershop.com/orders?createdAtFrom=2026-01-01 00:00:00&createdAtTo=2026-01-31 23:59:59` | Retrieve orders placed in January 2026. |

### Response

The pagination summary is returned in the top-level `meta.pagination` object, and the pagination links in the top-level `links` object.

The collection response omits `items` and `comments`—items would add many lines per order, and comments cost a query each. Both are present on [retrieving a single order](#retrieve-an-order). Use `itemsCount` to see how many lines an order has without reading them.

<details>
<summary>Response sample: retrieve orders</summary>

```json
{
    "links": {
        "self": "https://glue-backend.mysprykershop.com/orders?page[limit]=1&page[offset]=0",
        "first": "https://glue-backend.mysprykershop.com/orders?page[limit]=1&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/orders?page[limit]=1&page[offset]=41",
        "next": "https://glue-backend.mysprykershop.com/orders?page[limit]=1&page[offset]=1"
    },
    "meta": {
        "pagination": {
            "numFound": 42,
            "currentPage": 1,
            "maxPage": 42,
            "currentItemsPerPage": 1
        }
    },
    "data": [
        {
            "id": "DE--1234",
            "type": "orders",
            "attributes": {
                "orderReference": "DE--1234",
                "customerReference": "DE--6",
                "store": "DE",
                "currency": "EUR",
                "createdAt": "2026-08-27 11:04:52",
                "priceMode": "GROSS_MODE",
                "itemsCount": 3,
                "itemStates": ["paid", "shipped"],
                "availableEvents": ["ship", "cancel"],
                "customer": {
                    "email": "ada@spryker.com",
                    "salutation": "Ms",
                    "firstName": "Ada",
                    "lastName": "Lovelace"
                },
                "totals": {
                    "subtotal": 43322,
                    "expenseTotal": 490,
                    "discountTotal": 0,
                    "taxTotal": 4980,
                    "taxBreakdown": [],
                    "grandTotal": 31192,
                    "canceledTotal": 0,
                    "refundableTotal": 31192,
                    "remunerationTotal": 0
                },
                "expenses": [
                    {
                        "type": "SHIPMENT_EXPENSE_TYPE",
                        "name": "Standard",
                        "sumPrice": 490,
                        "taxRate": 19,
                        "sumTaxAmount": 78,
                        "sumDiscountAmountAggregation": 0,
                        "sumPriceToPayAggregation": 490,
                        "canceledAmount": 0
                    }
                ],
                "calculatedDiscounts": [],
                "payments": [
                    {
                        "paymentProvider": "DummyPayment",
                        "paymentMethod": "dummyPaymentInvoice",
                        "amount": 31192,
                        "meta": {}
                    }
                ]
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/orders/DE--1234"
            }
        }
    ]
}
```

</details>

{% include /pbc/all/order-experience-management/latest/manage-using-backend-api/orders-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/order-experience-management/latest/manage-using-backend-api/orders-backend-response-attributes.md -->

## Retrieve an order

To retrieve a single order with its line items, send the request:

---
`GET` **/orders/*{% raw %}{{orderReference}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{orderReference}}***{% endraw %} | Reference of the order to retrieve. To get it, [retrieve orders](#retrieve-orders). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: retrieve an order

`GET https://glue-backend.mysprykershop.com/orders/DE--1234`

### Response

The single-order response includes `items` and `comments`, which the collection response omits.

<details>
<summary>Response sample: retrieve an order</summary>

```json
{
    "data": {
        "id": "DE--1234",
        "type": "orders",
        "attributes": {
            "orderReference": "DE--1234",
            "customerReference": "DE--6",
            "store": "DE",
            "currency": "EUR",
            "createdAt": "2026-08-27 11:04:52",
            "priceMode": "GROSS_MODE",
            "itemsCount": 1,
            "itemStates": ["shipped"],
            "availableEvents": ["cancel"],
            "customer": {
                "email": "ada@spryker.com",
                "salutation": "Ms",
                "firstName": "Ada",
                "lastName": "Lovelace"
            },
            "totals": {
                "subtotal": 34500,
                "expenseTotal": 490,
                "discountTotal": 0,
                "taxTotal": 4658,
                "taxBreakdown": [
                    {
                        "taxRate": 19,
                        "taxAmount": 4658
                    }
                ],
                "grandTotal": 29176,
                "canceledTotal": 0,
                "refundableTotal": 29176,
                "remunerationTotal": 0
            },
            "expenses": [
                {
                    "type": "SHIPMENT_EXPENSE_TYPE",
                    "name": "Standard",
                    "sumPrice": 490,
                    "taxRate": 19,
                    "sumTaxAmount": 78,
                    "sumDiscountAmountAggregation": 0,
                    "sumPriceToPayAggregation": 490,
                    "canceledAmount": 0
                }
            ],
            "calculatedDiscounts": [],
            "payments": [
                {
                    "paymentProvider": "DummyPayment",
                    "paymentMethod": "dummyPaymentInvoice",
                    "amount": 29176,
                    "meta": {}
                }
            ],
            "items": [
                {
                    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "sku": "001_25904006",
                    "name": "Canon PowerShot SC620",
                    "quantity": 1,
                    "unitPrice": 34500,
                    "sumPrice": 34500,
                    "taxRate": 19,
                    "sumTaxAmount": 4658,
                    "refundableAmount": 29176,
                    "canceledAmount": 0,
                    "calculatedDiscounts": [],
                    "sumSubtotalAggregation": 34500,
                    "sumDiscountAmountFullAggregation": 0,
                    "sumPriceToPayAggregation": 29176,
                    "state": "shipped",
                    "availableEvents": ["cancel"]
                }
            ],
            "comments": [
                {
                    "message": "Customer asked to hold the shipment until Friday.",
                    "username": "Admin Spryker",
                    "createdAt": "2026-08-27 15:12:03.000000",
                    "updatedAt": "2026-08-27 15:12:03.000000"
                }
            ]
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/orders/DE--1234"
        }
    }
}
```

</details>

{% include /pbc/all/order-experience-management/latest/manage-using-backend-api/orders-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/order-experience-management/latest/manage-using-backend-api/orders-backend-response-attributes.md -->

{% include /pbc/all/order-experience-management/latest/manage-using-backend-api/orders-item-backend-attributes.md %} <!-- To edit, see _includes/pbc/all/order-experience-management/latest/manage-using-backend-api/orders-item-backend-attributes.md -->

## Possible errors

| STATUS | CODE | REASON |
| --- | --- | --- |
| 404 | N/A | The order with the specified `orderReference` doesn't exist. |
| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `orders` resource. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
