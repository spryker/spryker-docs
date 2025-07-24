---
title: "Glue API: Retrieve discounts in guest carts"
description: Retrieve details about cart rules and vouchers in guest carts
last_updated: July 25, 2022
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/pbc/all/discount-management/202311.0/manage-via-glue-api/retrieve-discounts-in-guest-carts.html
  - /docs/pbc/all/discount-management/202311.0/base-shop/manage-via-glue-api/retrieve-discounts-in-guest-carts.html
  - /docs/pbc/all/discount-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-discounts-in-guest-carts.html
---

This document describes how to retrieve cart rules, vouchers, and promotional items in guest carts. For full information on the endpoint, see [Manage guest carts of registered users](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html).

## Installation

For detailed information on the modules that provide the API's functionality and any related installation instructions, see:

* [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)
* [Install the Promotions & Discounts feature Glue API](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html)

## Retrieve a guest cart

To retrieve a guest cart, send the following request:

***
`GET` **/guest-carts**
***

{% info_block infoBox "Guest cart ID" %}


Guest users have one guest cart by default. If you already have a guest cart, you can optionally specify its ID when adding items. To do that, use the following endpoint. The information in this section is valid for both of the endpoints.

`GET` **/guest-carts/*{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}*** | The unique ID of the guest cart. To get it, [retrieve a guest cart](#retrieve-a-guest-cart). |

{% endinfo_block %}

{% info_block warningBox "Note" %}

When retrieving the cart with `guestCartId`, the response includes a single object, and when retrieving the resource without specifying it, you get an array containing a single object.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | A Guest user's unique ID. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value.|

| PATH PARAMETER | DESCRIPTION | Possible values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>cart-rules</li><li>promotional-items</li><li>vouchers</li></ul> |

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/guest-carts?include=cart-rules` | Retrieve a guest cart with information about the cart rules. |
| `GET https://glue.mysprykershop.com/guest-carts?include=vouchers` | Retrieve a guest cart with information about vouchers. |


### Response


<details>
<summary>Response sample: retrieve a guest cart with cart rules included</summary>

```json
{
    "data": [
        {
            "type": "guest-carts",
            "id": "f8782b6c-848d-595e-b3f7-57374f1ff6d7",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Shopping cart",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 10689,
                    "taxTotal": 15360,
                    "subtotal": 106892,
                    "grandTotal": 96203,
                    "priceToPay": 96203
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 10689,
                        "code": null
                    }
                ],
                "thresholds": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/f8782b6c-848d-595e-b3f7-57374f1ff6d7"
            },
            "relationships": {
                "cart-rules": {
                    "data": [
                        {
                            "type": "cart-rules",
                            "id": "1"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/cart-codes?include=cart-rules"
    },
    "included": [
        {
            "type": "cart-rules",
            "id": "1",
            "attributes": {
                "amount": 10689,
                "code": null,
                "discountType": "cart_rule",
                "displayName": "10% Discount for all orders above",
                "isExclusive": false,
                "expirationDateTime": "2020-12-31 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cart-rules/1"
            }
        }
    ]
}
```
</details>


<details>
<summary>Response sample: retrieve a guest cart with a cart rule and a discount voucher</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "vouchers": {
                "data": [
                    {
                        "type": "vouchers",
                        "id": "mydiscount-yu8je"
                    }
                ]
            },
            "cart-rules": {
                "data": [
                    {
                        "type": "cart-rules",
                        "id": "1"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "vouchers",
            "id": "mydiscount-yu8je",
            "attributes": {
                "amount": 49898,
                "code": "mydiscount-yu8je",
                "discountType": "voucher",
                "displayName": "My Discount",
                "isExclusive": false,
                "expirationDateTime": "2020-02-29 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "http://glue.mysprykershop.com/vouchers/mydiscount-yu8je"
            }
        },
        {
            "type": "cart-rules",
            "id": "1",
            "attributes": {
                "amount": 19959,
                "code": null,
                "discountType": "cart_rule",
                "displayName": "10% Discount for all orders above",
                "isExclusive": false,
                "expirationDateTime": "2020-12-31 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "http://glue.mysprykershop.com/cart-rules/1"
            }
        }
    ]
}
```
</details>

<a name="guest-cart-response-attributes"></a>

{% include pbc/all/glue-api-guides/{{page.version}}/guest-carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/guest-carts-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/vouchers-cart-rules-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/vouchers-cart-rules-response-attributes.md -->


## Possible errors

| CODE | REASON |
| --- | --- |
| 101 | Cart with given uuid not found. |
| 104 | Cart uuid is missing. |
| 109 | Anonymous customer unique ID is empty. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/rest-api/reference-information-glueapplication-errors.html).
