---
title: Managing gift cards of registered users
originalLink: https://documentation.spryker.com/2021080/docs/managing-gift-cards-of-registered-users
redirect_from:
  - /2021080/docs/managing-gift-cards-of-registered-users
  - /2021080/docs/en/managing-gift-cards-of-registered-users
---

[Gift Card](https://documentation.spryker.com/docs/gift-cards-purchase-redeeming-201907) is an alternative payment method. It is purchased as a default product in the Spryker Commerce OS and is redeemed as a voucher code during the checkout. When you have a gift card code, this code can be applied to a shopping cart, and the money value of the applied gift card is deducted from the total sum of the cart items.

In your development, Gift Cards API provides resources for purchasing and redeeming gift cards in Spryker Commerce OS via Glue API.

This article includes a list of endpoints to manage Gift Cards for registered users.

{% info_block infoBox "Info" %}

To manage the gift cards of the unregistered users, see [Managing Gift Cards of Guest Users](https://documentation.spryker.com/docs/en/managing-gift-cards-of-guest-users).

{% endinfo_block %}

## Installation 
For detailed information on the modules that provide the API functionality and related installation instructions, see Gift Cards API Integration.

## Purchasing a gift card
Gift Card is available in the Spryker shop as an abstract product with its variants (concrete products). To purchase the gift card:

1. Add a Gift Card to a guest shopping cart. See [Adding Items to Carts of Registered Users](https://documentation.spryker.com/docs/en/managing-items-in-carts-of-registered-users#adding-items-to-a-registered-cart) for more details.
2. [Submit the checkout data](https://documentation.spryker.com/docs/checking-out-purchases-and-getting-checkout-data-201907#submitting-checkout-data).
3. [Complete the checkout](https://documentation.spryker.com/docs/checking-out-purchases-and-getting-checkout-data-201907#placing-orders).

{% info_block warningBox "Note" %}

To prevent fraud, the payment method _invoice_ is not accepted if a cart contains a gift card.

{% endinfo_block %}
After placing the order, you will receive the gift card code to the email address specified in the checkout. You can redeem this code to pay for the products.

## Redeem the gift card code
To redeem the gift card code, send the request:
***
`POST` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*/cart-codes?include=vouchers,gift-cards**
***

| Path parameter | DESCRIPTION |
| --- | --- |
| cart_uuid | Unique identifier of a cart to remove products from. You can get this in the response when [creating carts](https://documentation.spryker.com/docs/en/managing-carts-of-registered-users#creating-carts) or [retrieving all carts](https://documentation.spryker.com/docs/en/managing-carts-of-registered-users#retrieving-all-carts). |

{% info_block infoBox "Authentication" %}

To use this endpoint, customers need to authenticate. For details, see [Authentication and Authorization](https://documentation.spryker.com/docs/authentication-and-authorization).

{% endinfo_block %}

### Request

Response sample: `POST https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d/cart-codes?include=vouchers,gift-cards`

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

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | ✓ | Code of the gift card sent to the specified email address after the gift card was purchased. |
### Response
Response sample:

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
            ]
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
For the attributes of the registered user's carts, see [Creating carts of registered users](https://documentation.spryker.com/docs/en/carts-of-registered-users#creating-carts).

| Included resource | Attribute | Type | Description |
| --- | --- | --- | --- |
| gift-cards | code | String | Code of the gift card sent to the specified email address after the gift card was purchased. |
| gift-cards | name | String | Name of the gift card. |
| gift-cards | value | Integer | Amount applied to the card when the gift card code is redeemed. |
| gift-cards | currencyIsoCode | String | Currency to which the code is applied. |
| gift-cards | actualValue | Integer | Actual value of the gift card code. |
| gift-cards | isActive | Boolean | Specifies whether the gift card code is redeemed or not. |

## Removing gift cards
To remove the gift card code from the cart, send the request:
***
`DELETE` **/carts/**{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}**/cart-codes/_{% raw %}{{{% endraw %}gift_card_code{% raw %}}}{% endraw %}_**
***

| Path parameter | DESCRIPTION |
| --- | --- |
| cart_uuid | Unique identifier of a cart to remove products from. You can get this in the response when [creating carts](https://documentation.spryker.com/docs/en/managing-carts-of-registered-users#creating-carts) or [retrieving all carts](https://documentation.spryker.com/docs/en/managing-carts-of-registered-users#retrieving-all-carts). |
| gift_card_code | Code that you have received after purchasing the gift card. | 

{% info_block infoBox "Authentication" %}

To use this endpoint, customers need to authenticate. For details, see [Authentication and Authorization](https://documentation.spryker.com/docs/authentication-and-authorization).

{% endinfo_block %}

### Request
Sample request: `DELETE https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d/cart-codes/GC-I6UB6O56-20`


### Response
If the item is deleted successfully, the endpoint will respond with a `204 No Content` status code.

## Possible errors

| Code  | Reason |
| --- | --- |
| 001| Access token is incorrect. |
| 003| Access token is missing. |
| 003| Cart code not found in cart. |
| 3301| Cart code not found in cart. |
| 3302| Cart code can't be added. |
| 3303| Cart code can't be removed. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).


