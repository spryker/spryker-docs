---
title: "Glue API: Manage gift cards of registered users"
description: Retrieve details about gift cards of the guest users, and learn what else you can do with the resource.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-gift-cards-of-guest-users
originalArticleId: 59818732-fa5a-43df-acd9-3d4ea91ee1ac
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/managing-carts/guest-carts/managing-gift-cards-of-guest-users.html
  - /docs/scos/dev/glue-api-guides/201903.0/managing-carts/guest-carts/managing-gift-cards-of-guest-users.html
  - /docs/scos/dev/glue-api-guides/201907.0/managing-carts/guest-carts/managing-gift-cards-of-guest-users.html
  - /docs/scos/dev/glue-api-guides/202005.0/managing-carts/guest-carts/managing-gift-cards-of-guest-users.html
  - /docs/scos/dev/glue-api-guides/202311.0/managing-carts/guest-carts/managing-gift-cards-of-guest-users.html
  - /docs/pbc/all/gift-cards/202311.0/manage-using-glue-api/manage-gift-cards-of-guest-users.html
  - /docs/pbc/all/gift-cards/202204.0/manage-using-glue-api/glue-api-manage-gift-cards-of-guest-users.html
---

[Gift card](/docs/pbc/all/gift-cards/{{site.version}}/gift-cards.html) is an alternative payment method. It is purchased as a regular product in the Spryker Commerce OS and is redeemed as a voucher code during checkout.  When you apply the code of a gift card to a shopping cart, the money value of the gift card is deducted from the total sum of the cart items.

In your development, Gift Cards API provides resources for purchasing and redeeming gift cards.

This endpoint allows managing gift cards of guest users.

To manage the gift cards of the registered users, see [Managing gift cards of registered users](/docs/pbc/all/gift-cards/{{site.version}}/manage-using-glue-api/glue-api-manage-gift-cards-of-registered-users.html).

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Gift Cards API feature integration](/docs/pbc/all/gift-cards/{{site.version}}/install-and-upgrade/install-the-gift-cards-feature.html).

## Purchasing a gift card

You can purchase a gift card as a regular product. To do that:

1. Add a gift card to a guest cart. See [Add an item to a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-cart-items.html#add-items-to-a-guest-cart) for more details.
2. [Submit the checkout data](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-submit-checkout-data.html#submit-checkout-data).
3. [Place the order](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-check-out-purchases.html#place-an-order).

After placing the order, you receive the gift card code to the email address specified in the checkout. You can redeem this code to pay for the products.


## Redeem a gift card in a guest cart

To redeem a gift card, send the request:

***
`POST` **/guest-carts/*{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}*/cart-codes?include=vouchers,gift-cards**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}*** | Unique identifier of the guest cart to redeem the gift card in. To get it, [create](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#create-a-guest-cart) or [retrieve a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart). |

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | ✓ | Guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |



<details>
<summary>Request sample: redeem a gift card in a guest cart</summary>

`https://glue.mysprykershop.com/guest-carts/f8782b6c-848d-595e-b3f7-57374f1ff6d7/cart-codes?include=vouchers,gift-cards`

```json
{
    "data": {
        "type": "cart-codes",
        "attributes": {
            "code": "GC-Z9FYJRK3-20"
        }
    }
}
```    
</details>


| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| code | String | ✓ | Code of the gift card sent to the specified email address after the gift card was purchased. |

### Response

Response sample: redeem a gift card in a guest cart

```json
{
    "data": {
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

For the guest cart attributes, see [Creating Guest Carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#create-a-guest-cart).


| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| gift-cards | code | String | Code of the gift card sent to the specified email address after the gift card was purchased. |
| gift-cards | name | String | Name of the gift card. |
| gift-cards | value | Integer | Amount applied to the card when the gift card code is redeemed. |
| gift-cards | currencyIsoCode | String | Currency to which the code is applied. |
| gift-cards | actualValue | Integer | Actual value of the gift card code. |
| gift-cards | isActive | Boolean | Specifies whether the gift card code is redeemed or not. |

## Remove a gift card code

To remove the gift card code from the cart, send the request:

***
`DELETE` **/guest-carts/_{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}_/cart-codes/_{% raw %}{{{% endraw %}gift_card_code{% raw %}}}{% endraw %}_**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| guest_cart_uuid | Unique identifier of a guest cart to remove products from. You can get this in the response when creating carts or retrieving a cart. |
| gift_card_code | Code that you have received after purchasing the gift card. |

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | ✓ | Guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |

Request sample: remove a gift card code

`DELETE https://glue.mysprykershop.com/guest-carts/f8782b6c-848d-595e-b3f7-57374f1ff6d7/cart-codes/GC-Z9FYJRK3-20`

### Response

If the item is deleted successfully, the endpoint will respond with a `204 No Content` status code.

## Possible errors

| CODE  | REASON |
| --- | --- |
| 101 | Cart with the specified ID is not found. |
| 109 | `X-Anonymous-Customer-Unique-Id` header is empty. |
| 3301| Cart code not found in cart. |
| 3302| Cart code can't be added. |
| 3303| Cart code can't be removed. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
