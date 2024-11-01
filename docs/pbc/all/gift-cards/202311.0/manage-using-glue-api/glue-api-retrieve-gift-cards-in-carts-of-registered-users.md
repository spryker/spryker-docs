---
title: "Glue API: Retrieve gift cards in carts of registered users"
description: Learn how to retrieve gift cards in carts of registered users using Glue API.
last_updated: Aug 22, 2022
template: glue-api-storefront-guide-template
redirect_from:
- /docs/pbc/all/gift-cards/202311.0/manage-using-glue-api/retrieve-gift-cards-in-carts-of-registered-users.html
- /docs/pbc/all/gift-cards/202204.0/manage-using-glue-api/glue-api-retrieve-gift-cards-in-guest-carts.html
---

This document describes how to retrieve gift cards in carts of registered users using Glue API. To retrieve full information about carts of registered users, see [Manage carts of registered users](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html).

## Installation

* [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)


## Retrieve registered user's carts

To retrieve all carts, send the request:

***
`GET` **/carts**
***

{% info_block infoBox "Note" %}

Alternatively, you can retrieve all carts belonging to a customer through the **/customers/*{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %}*/carts** endpoint. For details, see [Retrieve customer carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-customer-carts.html).

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | gift-cards |

`GET https://glue.mysprykershop.com/carts?include=gift-cards`: Retrieve all carts of a user with applied gift cards.

### Response


<details>
<summary>Response sample with gift cards applied</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "e877356a-5d8f-575e-aacc-c790eeb20a27",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Everyday purchases",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 17145,
                    "taxTotal": 19408,
                    "subtotal": 171447,
                    "grandTotal": 154302,
                    "priceToPay": 54302
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 17145,
                        "code": null
                    }
                ],
                "thresholds": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/e877356a-5d8f-575e-aacc-c790eeb20a27"
            },
            "relationships": {
                "gift-cards": {
                    "data": [
                        {
                            "type": "gift-cards",
                            "id": "GC-23RLC8H1-20"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts?include=vouchers,gift-cards"
    },
    "included": [
        {
            "type": "gift-cards",
            "id": "GC-23RLC8H1-20",
            "attributes": {
                "code": "GC-23RLC8H1-20",
                "name": "Gift Card 1000",
                "value": 100000,
                "currencyIsoCode": "EUR",
                "actualValue": 100000,
                "isActive": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/e877356a-5d8f-575e-aacc-c790eeb20a27/cart-codes/GC-23RLC8H1-20"
            }
        }
    ]
}
```    
</details>



<a name="retrieve-a-registered-users-carts-response-attributes"></a>

{% include pbc/all/glue-api-guides/{{page.version}}/carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/carts-response-attributes.md -->

For the included attributes of gift cards, see [Managing Gift Cards of Registered Users](/docs/pbc/all/gift-cards/{{site.version}}/manage-using-glue-api/glue-api-manage-gift-cards-of-registered-users.html).

## Retrieve a registered user's cart

To retrieve a particular cart, send the request:

***
`GET` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*** | Unique identifier of a cart. [Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#create-a-cart) or [Retrieve a registered user's carts](#retrieve-registered-users-carts) to get it. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | gift-cards |


| GET https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d?include=gift-cards | Retrieve the `8ef901fe-fe47-5569-9668-2db890dbee6` cart with detailed information on its gift cards. |


### Response



<details>
<summary>Response sample with details on gift cards</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "8ef901fe-fe47-5569-9668-2db890dbee6d",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Shopping cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 4200,
                "taxTotal": 6035,
                "subtotal": 42000,
                "grandTotal": 37800,
                "priceToPay": 17800
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 4200,
                    "code": null
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d"
        },
        "relationships": {
            "gift-cards": {
                "data": [
                    {
                        "type": "gift-cards",
                        "id": "GC-I6UB6O56-20"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "gift-cards",
            "id": "GC-I6UB6O56-20",
            "attributes": {
                "code": "GC-I6UB6O56-20",
                "name": "Gift Card 200",
                "value": 20000,
                "currencyIsoCode": "EUR",
                "actualValue": 20000,
                "isActive": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d/cart-codes/GC-I6UB6O56-20"
            }
        }
    ]
}
```    
</details>

{% include pbc/all/glue-api-guides/{{page.version}}/carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/carts-response-attributes.md -->

For the attributes of the gift cards included resource, see [Manage gift cards of registered users](/docs/pbc/all/gift-cards/{{site.version}}/manage-using-glue-api/glue-api-manage-gift-cards-of-registered-users.html).



## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is incorrect. |
| 002 | Access token is missing. |
| 003 | Failed to log in the user. |
| 101 | Cart with given uuid not found. |
| 102 | Failed to add an item to cart. |
| 103 | Item with the given group key not found in the cart. |
| 104 | Cart uuid is missing. |
| 115 | Unauthorized cart action. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
