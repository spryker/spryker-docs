---
title: "Glue API: Manage discount vouchers in guest carts"
description: Learn how to manage discount vouchers in guest carts via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-discount-vouchers-in-guest-carts
originalArticleId: ba8ecd12-244b-4dc4-bf64-b52977347916
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/managing-carts/guest-carts/managing-discount-vouchers-in-guest-carts.html
  - /docs/scos/dev/glue-api-guides/201903.0/managing-carts/guest-carts/managing-discount-vouchers-in-guest-carts.html
  - /docs/scos/dev/glue-api-guides/201907.0/managing-carts/guest-carts/managing-discount-vouchers-in-guest-carts.html
  - /docs/scos/dev/glue-api-guides/202005.0/managing-carts/guest-carts/managing-discount-vouchers-in-guest-carts.html
  - /docs/scos/dev/glue-api-guides/202311.0/managing-carts/guest-carts/managing-discount-vouchers-in-guest-carts.html
  - /docs/pbc/all/discount-management/202311.0/manage-via-glue-api/manage-discount-vouchers-in-guest-carts.html
  - /docs/pbc/all/discount-management/202311.0/base-shop/manage-via-glue-api/manage-discount-vouchers-in-guest-carts.html
  - /docs/pbc/all/discount-management/202204.0/base-shop/manage-using-glue-api/glue-api-manage-discount-vouchers-in-guest-carts.html
related:
  - title: Manage guest cart items
    link: docs/pbc/all/cart-and-checkout/page.version/marketplace/manage-using-glue-api/guest-carts/manage-guest-cart-items.html
  - title: Managing gift cards of guest users
    link: docs/pbc/all/gift-cards/page.version/manage-using-glue-api/glue-api-manage-gift-cards-of-guest-users.html
---

This endpoint allows managing discount vouchers in guest carts.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Promotions & Discounts feature Glue API](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html).

## Apply a discount voucher to a guest cart

To apply a discount voucher to a guest cart, send the request:

***
`POST`**/guest-carts/*{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*/vouchers**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*** | The unique ID of the guest cart to apply the discount voucher to. To get it, [Create a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#create-a-guest-cart) or [Retrieve a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart).  |

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | The guest user's unique ID. The value should correspond to the value used when [creating the guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#create-a-guest-cart). |


| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| Include | Adds resource relationships to the request.	 | vouchers |


<details>
<summary>Request sample: apply a discount voucher to a guest cart</summary>

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
<summary>Request sample: apply a discount voucher to a guest cart with discount voucher information included</summary>

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
| code | String | yes | The unique ID of a discount voucher to apply.  |


### Response

<details>
<summary>Response sample: apply a discount voucher to a guest cart</summary>

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
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/c9310692-2ab0-5edc-bb41-fee6aa828d55"
        }
    }
}
```
</details>



<details>
<summary>Response sample: apply a discount voucher to a guest cart with discount voucher information included</summary>

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
            ],
            "thresholds": []
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


{% include pbc/all/glue-api-guides/{{page.version}}/vouchers-cart-rules-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/vouchers-cart-rules-response-attributes.md -->



## Remove a discount voucher from a guest cart

To remove a discount voucher, send the request:

***
`DELETE`**/guest-carts/*{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*/vouchers/*{% raw %}{{{% endraw %}voucher_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*** | The unique ID of the guest cart to remove the discount voucher from. To get it, [Retrieve a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart).  |
| ***{% raw %}{{{% endraw %}voucher_id{% raw %}}}{% endraw %}*** | The unique ID of the voucher to remove. To get it, [Retrieve a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart) with the `vouchers` resource included.  |

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | The guest user's unique ID. The value should correspond to the value used when [creating the guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#create-a-guest-cart). |


Request sample: remove a discount voucher from a guest cart

`DELETE http://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/vouchers/mydiscount-we3ca`

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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
