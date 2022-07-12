---
title: Managing discount vouchers in guest carts
description: Learn how to manage discount vouchers in guest carts via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-discount-vouchers-in-guest-carts
originalArticleId: ba8ecd12-244b-4dc4-bf64-b52977347916
redirect_from:
  - /2021080/docs/managing-discount-vouchers-in-guest-carts
  - /2021080/docs/en/managing-discount-vouchers-in-guest-carts
  - /docs/managing-discount-vouchers-in-guest-carts
  - /docs/en/managing-discount-vouchers-in-guest-carts
related:
  - title: Managing guest cart items
    link: docs/scos/dev/glue-api-guides/page.version/managing-carts/guest-carts/managing-guest-cart-items.html
  - title: Managing discount vouchers in carts of registered users
    link: docs/scos/dev/glue-api-guides/page.version/managing-carts/carts-of-registered-users/managing-discount-vouchers-in-carts-of-registered-users.html
  - title: Managing guest carts
    link: docs/scos/dev/glue-api-guides/page.version/managing-carts/guest-carts/managing-guest-carts.html
---

This endpoint allows to manage discount vouchers in guest carts.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [GLUE: Promotions & Discounts feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-promotions-and-discounts-feature-integration.html).

## Apply a discount voucher to a guest cart

To apply a discount voucher to a guest cart, send the request:

***
`POST`**/guest-carts/*{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*/vouchers**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*** | Unique identifier of the guest cart to apply the discount voucher to. To get it, [Create a guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#create-a-guest-cart) or [Retrieve a guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#retrieve-a-guest-cart).  |

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | Guest user's unique identifier. The value should correspond to the value used when [creating the guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#create-a-guest-cart). |


| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| Include | Adds resource relationships to the request.	 | vouchers |


<details>
<summary markdown='span'>Request sample</summary>

`POST https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/vouchers`

```json
{
    "data": {
        "type": "vouchers",
        "attributes": {
            "code": "sprykerku2f"
        }
    }
}
```

</details>

<details>
<summary markdown='span'>Request sample with discount voucher information</summary>

`POST https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/vouchers?include=vouchers`

```json
{
    "data": {
        "type": "vouchers",
        "attributes": {
            "code": "mydiscount-qa1ma"
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| code | String | yes | Unique identifier of a discount voucher to apply.  |


### Response

<details>
<summary markdown='span'>Response sample</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "c9310692-2ab0-5edc-bb41-fee6aa828d55",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 21831,
                "taxTotal": 19752,
                "subtotal": 145540,
                "grandTotal": 123709,
                "priceToPay": 123709
            },
            "discounts": [
                {
                    "displayName": "5% discount on all white products",
                    "amount": 7277,
                    "code": null
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/c9310692-2ab0-5edc-bb41-fee6aa828d55"
        }
    }
}
```

</details>

<details>
<summary markdown='span'>Response sample with discount voucher information</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "56a0b4e4-21d8-516f-acd5-90581c996676",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Shopping cart",
            "isDefault": true,
            "totals": {...},
            "discounts": [
                {
                    "displayName": "My Discount",
                    "amount": 83133,
                    "code": null
                },
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 33253,
                    "code": null
                }
            ]
        },
        "links": {...},
        "relationships": {
            "vouchers": {
                "data": [
                    {
                        "type": "vouchers",
                        "id": "mydiscount-qa1ma"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "vouchers",
            "id": "mydiscount-qa1ma",
            "attributes": {
                "amount": 83133,
                "code": "mydiscount-qa1ma",
                "discountType": "voucher",
                "displayName": "My Discount",
                "isExclusive": false,
                "expirationDateTime": "2020-02-29 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "http://glue.mysprykershop.com/vouchers/mydiscount-qa1ma?include=vouchers"
            }
        }
    ]
}
```

</details>

| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| vouchers | displayName | String | Discount name displayed on the Storefront. |
| vouchers | amount | Integer | Amount of the provided discount. |
| vouchers | code | String | Discount code. |
| vouchers | discountType | String | Discount type. |
| vouchers | isExclusive | Boolean | Discount exclusivity. |
| vouchers | expirationDateTime | DateTimeUtc | Date and time on which the discount expires. |
| vouchers | discountPromotionAbstractSku | String | SKU of the products to which the discount applies. If the discount can be applied to any product, the value is `null`. |
| vouchers | discountPromotionQuantity | Integer | Specifies the amount of the product required to be able to apply the discount. If the minimum number is `0`, the value is `null`. |


## Remove a discount voucher from a guest cart

To remove a discount voucher, send the request:

***
`DELETE`**/guest-carts/*{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*/vouchers/*{% raw %}{{{% endraw %}voucher_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*** | Unique identifier of the guest cart to remove the discount voucher from. To get it, [Retrieve a guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#retrieve-a-guest-cart).  |
| ***{% raw %}{{{% endraw %}voucher_id{% raw %}}}{% endraw %}*** | Unique identifier of the voucher to remove. To get it, [Retrieve a guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#retrieve-a-guest-cart) with the `vouchers` resource included.  |

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | Guest user's unique identifier. The value should correspond to the value used when [creating the guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#create-a-guest-cart). |


Request sample: `DELETE http://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/vouchers/mydiscount-we3ca`

### Response

If the voucher is deleted successfully, the endpoints returns the `204 No Data` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 101 | Cart with the specified ID is not found. |
| 109 | `X-Anonymous-Customer-Unique-Id` header is empty. |
| 3301 | Voucher with the specified ID is not found. |
| 3302 | Incorrect voucher code or the voucher cannot be applied.|
| 3303| Cart code can't be removed. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
