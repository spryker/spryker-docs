---
title: Retrieve gift cards in carts of registered users
description: Learn how to retrieve gift cards in carts of registered users using Glue API.
last_updated: Aug 22, 2022
template: glue-api-storefront-guide-template
---

This document describes how to retrieve gift cards in carts of registered users using Glue API. To retrieve full information about carts of registered users, see [Manage carts of registered users](/docs/scos/dev/glue-api-guides/{{site.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html).

## Installation

* [Glue API: Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-cart-feature-integration.html)


## Retrieve registered user's carts

To retrieve all carts, send the request:

***
`GET` **/carts**
***

{% info_block infoBox "Note" %}

Alternatively, you can retrieve all carts belonging to a customer through the **/customers/*{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %}*/carts** endpoint. For details, see [Retrieving customer carts](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/retrieving-customer-carts.html).

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | gift-cards |

`GET https://glue.mysprykershop.com/carts?include=gift-cards`: Retrieve all carts of a user with applied gift cards.

### Response


<details>
<summary markdown='span'>Response sample with gift cards applied</summary>

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

{% include pbc/all/glue-api-guides/retrieve-a-registered-users-carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/retrieve-a-registered-users-carts-response-attributes.md -->

For the included attributes of gift cards, see [Managing Gift Cards of Registered Users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-gift-cards-of-registered-users.html).

## Retrieve a registered user's cart

To retrieve a particular cart, send the request:

***
`GET` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*** | Unique identifier of a cart. [Create a cart](/docs/scos/dev/glue-api-guides/{{site.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html#create-a-cart) or [Retrieve a registered user's carts](#retrieve-registered-users-carts) to get it. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | gift-cards |


| GET https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d?include=gift-cards | Retrieve the `8ef901fe-fe47-5569-9668-2db890dbee6` cart with detailed information on its gift cards. |


### Response



<details>
<summary markdown='span'>Response sample with details on gift cards</summary>

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

For the attributes of carts of registered users and included resources, see [Retrieve a registered user's carts](#retrieve-a-registered-users-carts-response-attributes).

For the attributes of other included resources, see:
* [Add an item to a registered user's cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-items-in-carts-of-registered-users.html#add-an-item-to-a-registered-users-cart-response-attributes).
* [Managing gift cards of registered users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-gift-cards-of-registered-users.html).
* [Cart permission groups](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/sharing-company-user-carts/retrieving-cart-permission-groups.html).
* [Managing items in carts of registered users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-items-in-carts-of-registered-users.html).
* [Retrieve a concrete product](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/concrete-products/retrieving-concrete-products.html#concrete-products-response-attributes).
* [Retrieving product labels](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/retrieving-product-labels.html#product-labels-response-attributes).

## Edit a cart

You can edit the name of the cart, change the currency and price mode. To do that, send the request:

---
`PATCH` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***cart_uuid*** | Unique identifier of a cart. [Create a cart](#create-a-cart) or [Retrieve a registered user's carts](#retrieve-registered-users-carts) to get it. |

{% info_block infoBox "Info" %}

* You can change the price mode of an empty cart but not the one that has items in it.
* Currency and store can be changed for an empty cart and for a cart with items anytime.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user).  |
| If-Match | 075d700b908d7e41f751c5d2d4392407 | &check; | Makes the request conditional. It matches the listed conditional ETags from the headers when retrieving the cart. The patch is applied only if the tag value matches. |

Request sample: `https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9`

```json
{
   "data":{
      "type":"carts",
      "attributes":{
         "name":"My Cart with awesome name",
         "priceMode":"GROSS_MODE",
         "currency":"EUR",
         "store":"DE"
      }
   }
}
```


| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String | &check; | Sets the cart name.This field can be set only if you are using the multiple carts feature. If you are operating in a single-cart environment, an attempt to set the value will result in an error with the `422 Unprocessable Entry` status code. Cart name should be unique and should not be longer than 30 characters.|
| priceMode | Enum | &check | Sets the price mode to be used for the cart. Possible values:<ul><li>GROSS_MODE - prices after tax;</li><li>NET_MODE - prices before tax.</li></ul>For details, see [Net & Gross Prices](/docs/pbc/all/price-management/extend-and-customize/net-and-gross-prices-management.html). |
| currency | String | &check; | Sets the cart currency. |
| store | String | &check; | Sets the name of the store where to create the cart. |

### Response

Response sample:

```json
{
    "data": {
        "type": "carts",
        "id": "0c3ec260-694a-5cec-b78c-d37d32f92ee9",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "My Cart with awesome name",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 63538,
                "taxTotal": 79689,
                "subtotal": 635381,
                "grandTotal": 571843,
                "priceToPay": 571843
            },
            "discounts": [],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9"
        }
    }
}
```

## Delete a cart
To delete a cart, send the request:

---
`DELETE` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***cart_uuid*** | Unique identifier of a cart. [Create a cart](#create-a-cart) or [Retrieve a registered user's carts](#retrieve-registered-users-carts) to get it. |

{% info_block infoBox "Deleting carts" %}

You cannot delete a cart if it is the customer's only cart. If you attempt to delete a customer's last cart, the endpoint responds with the **422 Unprocessable Entry** status code. If you delete the default cart of a customer, another cart will be assigned as default automatically.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user).  |

Request sample: `DELETE https://glue.mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054`

### Response

If the cart is deleted successfully, the endpoint returns the `204 No Content` status code.

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
| 105 | Cart cannot be deleted. |
| 106 | Cart item cannot be deleted. |
| 107 | Failed to create a cart. |
| 110 | Customer already has a cart. |
| 111 | Can't switch price mode when there are items in the cart. |
| 112 | Store data is invalid. |
| 113 | Cart item cannot be added. |
| 114 | Cart item cannot be updated. |
| 115 | Unauthorized cart action. |
| 116 | Currency is missing. |
| 117 | Currency is incorrect. |
| 118 | Price mode is missing. |
| 119 | Price mode is incorrect. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
