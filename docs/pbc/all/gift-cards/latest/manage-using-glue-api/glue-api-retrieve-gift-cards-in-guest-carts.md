---
title: "Glue API: Retrieve gift cards in guest carts"
description: Learn how you can retrieve gift cards in guest carts by using the Spryker Glue Api.
last_updated: Aug 12, 2022
template: glue-api-storefront-guide-template
redirect_from:
- /docs/pbc/all/gift-cards/202311.0/manage-using-glue-api/retrieve-gift-cards-in-guest-carts.html
---

This document describes how to retrieve gift cards in guest carts using Glue API. To retrieve full information about guest carts, see [Manage guest carts](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html).

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

- [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)

## Retrieve a guest cart

To retrieve a guest cart, send the request:

***
`GET` **/guest-carts**
***

{% info_block infoBox "Guest cart ID" %}


Guest users have one guest cart by default. If you already have a guest cart, you can optionally specify its ID when adding items. To do that, use the following endpoint. The information in this section is valid for both of the endpoints.

`GET` **/guest-carts/*{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}*** | Unique identifier of the guest cart. To get it, [retrieve a guest cart](#retrieve-a-guest-cart). |

{% endinfo_block %}

{% info_block warningBox "Note" %}

When retrieving the cart with `guestCartId`, the response includes a single object, and when retrieving the resource without specifying it, you get an array containing a single object.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | Guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value.|

| PATH PARAMETER | DESCRIPTION | Possible values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>guest-cart-items</li><li>cart-rules</li><li>promotional-items</li><li>gift-cards</li><li>vouchers</li><li>product-options</li><li>sales-units</li><li>product-measurement-units</li><li>product-labels</li></ul>|


`GET https://glue.mysprykershop.com/guest-carts?include=gift-cards,vouchers`: Retrieve a guest cart with information about the gift cards applied.





<details>
<summary>Response sample: add items with gift cards to a guest cart</summary>

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
                    "priceToPay": 93203
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
                "gift-cards": {
                    "data": [
                        {
                            "type": "gift-cards",
                            "id": "GC-Z9FYJRK3-20"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/cart-codes?include=gift-cards"
    },
    "included": [
        {
            "type": "gift-cards",
            "id": "GC-Z9FYJRK3-20",
            "attributes": {
                "code": "GC-Z9FYJRK3-20",
                "name": "Gift Card 30",
                "value": 3000,
                "currencyIsoCode": "EUR",
                "actualValue": 3000,
                "isActive": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/f8782b6c-848d-595e-b3f7-57374f1ff6d7/cart-codes/GC-Z9FYJRK3-20"
            }
        }
    ]
}
```

</details>

<a name="guest-cart-response-attributes"></a>

{% include pbc/all/glue-api-guides/latest/guest-carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/guest-carts-response-attributes.md -->


{% include pbc/all/glue-api-guides/latest/gift-cards-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/gift-cards-response-attributes.md -->




## Possible errors

| CODE | REASON |
| --- | --- |
| 101 | Cart with given uuid not found. |
| 104 | Cart uuid is missing. |
| 109 | Anonymous customer unique id is empty. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html).
