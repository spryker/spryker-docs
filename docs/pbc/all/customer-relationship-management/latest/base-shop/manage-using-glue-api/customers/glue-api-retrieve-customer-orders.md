---
title: "Glue API: Retrieve customer orders"
description: Learn how by using the Spryker Glue API you can retrieve customer orders within your Spryker Project.
last_updated: Jul 12, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-customer-orders
originalArticleId: 4390b08b-349a-406e-8e41-983014e30ab5
redirect_from:
  - /docs/scos/dev/glue-api-guides/202005.0/managing-customers/retrieving-customer-orders.html
  - /docs/scos/dev/glue-api-guides/202200.0/managing-customers/retrieving-customer-orders.html
  - /docs/scos/dev/glue-api-guides/202311.0/managing-customers/retrieving-customer-orders.html
  - /docs/scos/dev/glue-api-guides/202204.0/managing-customers/retrieving-customer-orders.html
related:
  - title: Retrieving orders
    link: docs/pbc/all/order-management-system/latest/base-shop/glue-api-retrieve-orders.html
  - title: Authentication and authorization
    link: docs/dg/dev/glue-api/latest/rest-api/glue-api-authentication-and-authorization.html
  - title: Searching by company users
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-search-by-company-users.html
  - title: Confirming customer registration
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-confirm-customer-registration.html
  - title: Authenticating as a customer
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html
  - title: Managing customer authentication tokens
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-manage-customer-authentication-tokens.html
  - title: Managing customer authentication tokens via OAuth 2.0
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-manage-customer-authentication-tokens-via-oauth-2.0.html
  - title: Managing customers
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/glue-api-manage-customers.html
  - title: Managing customer passwords
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-manage-customer-passwords.html
  - title: Managing customer addresses
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/glue-api-manage-customer-addresses.html
  - title: Retrieve customer carts
    link: docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/glue-api-retrieve-customer-carts.html
---

This endpoint allows retrieving a customer's orders.

## Installation

For details on the modules that provide the API functionality and how to install them, see [Install the Order Management Glue API](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-glue-api/install-the-order-management-glue-api.html).

## Retrieve customer's orders

To retrieve a customer's orders, send the request:

***
`GET` **/customers/*{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %}*/orders**
***

{% info_block infoBox "Note" %}

Alternatively, you can retrieve all orders made by a customer through the **/orders** endpoint. For details, see [Retrieving orders](/docs/pbc/all/order-management-system/latest/base-shop/glue-api-retrieve-orders.html#retrieve-all-orders).

{% endinfo_block %}

| PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %}*** | Customer unique identifier to retrieve orders of. To get it, [retrieve a customer](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/glue-api-manage-customers.html#retrieve-customers) or [create a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-create-customers.html#create-a-customer). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

| STRING PARAMETER | DESCRIPTION | POSSIBLE VALUES |
|-|-|-|
| offset | Offset of the order at which to begin the response. Works only together with `page[limit]`. To work correctly, the value should be devisable by the value of `page[limit]`. The default value is `0`. | From `0` to any. |
| limit | Maximum number of entries to return. Works only together with page[offset]. The default value is `10`. | From `1` to any. |

### Response

<details><summary>Response sample: Retrieve a customer's order</summary>

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

{% include /pbc/all/glue-api-guides/latest/orders-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/orders-response-attributes.md -->


## Possible errors

| CODE | REASON |
|-|-|
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 402 | Customer with the specified ID was not found. |
| 802 | Request is unauthorized. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/integrations/spryker-glue-api/storefront-api/api-references/reference-information-storefront-application-errors.html).
