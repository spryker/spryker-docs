---
title: "Glue API: Manage gift cards of registered users"
description: Retrieve details about gift cards of the registered users, and learn what else you can do with the resource.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-gift-cards-of-registered-users
originalArticleId: 8f557adb-ea3b-498c-872e-b2177d6202ed
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/managing-carts/carts-of-registered-users/managing-gift-cards-of-registered-users.html
  - /docs/scos/dev/glue-api-guides/201903.0/managing-carts/carts-of-registered-users/managing-gift-cards-of-registered-users.html
  - /docs/scos/dev/glue-api-guides/201907.0/managing-carts/carts-of-registered-users/managing-gift-cards-of-registered-users.html
  - /docs/scos/dev/glue-api-guides/202005.0/managing-carts/carts-of-registered-users/managing-gift-cards-of-registered-users.html
  - /docs/scos/dev/glue-api-guides/202311.0/managing-carts/carts-of-registered-users/managing-gift-cards-of-registered-users.html
  - /docs/pbc/all/gift-cards/202311.0/manage-using-glue-api/manage-gift-cards-of-registered-users.html
  - /docs/pbc/all/gift-cards/202204.0/manage-using-glue-api/glue-api-manage-gift-cards-of-registered-users.html
---

[Gift Card](/docs/pbc/all/gift-cards/latest/gift-cards.html) is an alternative payment method. It is purchased as a default product in the Spryker Commerce OS and is redeemed as a voucher code during the checkout. When you have a gift card code, this code can be applied to a shopping cart, and the money value of the applied gift card is deducted from the total sum of the cart items.

In your development, Gift Cards API provides resources for purchasing and redeeming gift cards in Spryker Commerce OS via Glue API.

This article includes a list of endpoints to manage Gift Cards for registered users.

{% info_block infoBox "Info" %}

To manage the gift cards of the unregistered users, see [Managing Gift Cards of Guest Users](/docs/pbc/all/gift-cards/latest/manage-using-glue-api/glue-api-manage-gift-cards-of-guest-users.html).

{% endinfo_block %}

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see Gift Cards API Integration.

## Purchasing a gift card

Gift Card is available in the Spryker shop as an abstract product with its variants (concrete products). To purchase the gift card:

1. Add a Gift Card to a guest shopping cart. See [Adding Items to Carts of Registered Users](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html#add-an-item-to-a-registered-users-cart) for more details.
2. [Submit the checkout data](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/check-out/glue-api-submit-checkout-data.html).
3. [Complete the checkout](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/check-out/glue-api-check-out-purchases.html#place-an-order).

{% info_block warningBox "Note" %}

To prevent fraud, the payment method *invoice* is not accepted if a cart contains a gift card.

{% endinfo_block %}

After placing the order, you will receive the gift card code to the email address specified in the checkout. You can redeem this code to pay for the products.

## Redeem the gift card code

To redeem the gift card code, send the request:

***
`POST` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*/cart-codes?include=vouchers,gift-cards**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| cart_uuid | Unique identifier of a cart to remove products from. You can get this in the response when [creating carts](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#create-a-cart) or [retrieving all carts](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#retrieve-registered-users-carts). |

{% info_block infoBox "Authentication" %}

To use this endpoint, customers need to authenticate. For details, see [Authentication and Authorization](/docs/integrations/spryker-glue-api/authenticating-and-authorization/authenticating-and-authorization.html).

{% endinfo_block %}

### Request

Request sample: redeem the gift card code

`POST https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d/cart-codes?include=vouchers,gift-cards`

```json
{
    "data": {
        "type": "cart-codes",
        "attributes": {
            "code": "GC-I6UB6O56-20"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| code | String | &check; | Code of the gift card sent to the specified email address after the gift card was purchased. |

### Response

Response sample: redeem the gift card code

```json
{
    "data": {
        "type": "carts",
        "id": "8ef901fe-fe47-5569-9668-2db890dbee6d",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Shopping cart",
            "isDefault": false,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 4200,
                "taxTotal": 6035,
                "subtotal": 42000,
                "grandTotal": 37800,
                "priceToPay": 17800
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 4200,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d"
        },
        "relationships": {
            "gift-cards": {
                "data": [
                    {
                        "type": "gift-cards",
                        "id": "GC-I6UB6O56-20"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "gift-cards",
            "id": "GC-I6UB6O56-20",
            "attributes": {
                "code": "GC-I6UB6O56-20",
                "name": "Gift Card 200",
                "value": 20000,
                "currencyIsoCode": "EUR",
                "actualValue": 20000,
                "isActive": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d/cart-codes/GC-I6UB6O56-20"
            }
        }
    ]
}
```

{% include pbc/all/glue-api-guides/latest/carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/carts-response-attributes.md -->

{% include pbc/all/glue-api-guides/latest/gift-cards-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/gift-cards-response-attributes.md -->


## Remove a gift card

To remove the gift card code from the cart, send the request:

***
`DELETE` **/carts/**{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}**/cart-codes/*{% raw %}{{{% endraw %}gift_card_code{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| cart_uuid | Unique identifier of a cart to remove products from. You can get this in the response when [creating carts](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#create-a-cart) or [retrieving all carts](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#retrieve-registered-users-carts). |
| gift_card_code | Code that you have received after purchasing the gift card. |

{% info_block infoBox "Authentication" %}

To use this endpoint, customers need to authenticate. For details, see [Authentication and Authorization](/docs/integrations/spryker-glue-api/authenticating-and-authorization/authenticating-and-authorization.html).

{% endinfo_block %}

### Request

Request sample: remove a gift card

`DELETE https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d/cart-codes/GC-I6UB6O56-20`

### Response

If the item is deleted successfully, the endpoint will respond with a `204 No Content` status code.

## Possible errors

| CODE  | REASON |
| --- | --- |
| 001| Access token is incorrect. |
| 002| Access token is missing. |
| 003 | Failed to log in the user. |
| 003| Cart code is not found in cart. |
| 3301 | Cart or voucher with the specified ID is not found. |
| 3302 | Incorrect voucher code or the voucher cannot be applied. |
| 3303| Cart code can't be removed. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/integrations/spryker-glue-api/storefront-api/api-references/reference-information-storefront-application-errors.html).
