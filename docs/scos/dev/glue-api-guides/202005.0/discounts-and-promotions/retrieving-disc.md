---
title: Retrieving Discounts
originalLink: https://documentation.spryker.com/v5/docs/retrieving-discounts
redirect_from:
  - /v5/docs/retrieving-discounts
  - /v5/docs/en/retrieving-discounts
---

The Discount API enables shop owners to add free value to their customers by discounting a percentage or a fixed sum of an order's subtotal or an item's price. Discounts can be applied to a purchase in **2** ways:

1. Discounts applied to carts based on certain conditions, called [cart rules](https://documentation.spryker.com/docs/en/creating-a-cart-rule-discount);
2. Price reductions provided when redeeming a [discount voucher](https://documentation.spryker.com/docs/en/creating-a-discount-voucher).

Discounts provided based on *cart rules* are calculated and taken into account automatically. *Vouchers*, on the other hand, need to be applied by customers explicitly. For this purpose, the *Discounts API* allows:

* applying a voucher to a certain purchase contained in a specific cart;
* retrieving the discounted amount of the purchase;
* checking which vouchers and cart rules are applied to a certain purchase;
* removing a voucher from a cart.

In your development, the API will help you to enable customers to apply voucher discounts to their purchases and check the correct order amount, discount included.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [GLUE: Promotions & Discounts Feature Integration](https://documentation.spryker.com/docs/en/glue-promotions-discounts-feature-integration).

## Applying Discount Vouchers
To apply a discount voucher, first, a customer needs to have a cart with some products in it.

{% info_block infoBox "Info" %}

For details on how to manage carts, see [Managing Carts](https://documentation.spryker.com/docs/en/managing-carts).

{% endinfo_block %}

### Request
To apply a discount voucher to a cart, you need to send it via a *POST* request to the following endpoints:

* **/carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}/vouchers** - for carts of registered users;

{% info_block warningBox "Authentication" %}

Carts of registered users cannot be accessed anonymously. For this reason, you always need to pass a user's authentication token when accessing the endpoint. For details on how to authenticate a user and retrieve the token, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).

{% endinfo_block %}

* **/guest-carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}/vouchers** - for guest carts.

{% info_block warningBox "Anonymous User ID" %}

When accessing guest carts, you need to specify the guest user ID. This is done via the `X-Anonymous-Customer-Unique-Id` header. Guest user IDs are managed by the API Client. For details, see [Managing Guest Carts](https://documentation.spryker.com/docs/en/managing-guest-carts).

{% endinfo_block %}

Sample request: `POST http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/vouchers`

where **1ce91011-8d60-59ef-9fe0-4493ef3628b2** is the UUID of the customer’s cart.

{% info_block warningBox "Verification" %}

You can also include the vouchers resource relationship to obtain detailed information on the discount provided by the voucher in the response data. Example: `POST http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/vouchers?include=vouchers`

{% endinfo_block %}

**Request Attributes**

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| **code** | String | yes | Specifies the voucher code to apply.  |

**Request Sample**

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

### Response
The endpoints respond with information on the cart to which the discount is applied. Brief voucher information is available in the **discounts** section.

{% info_block warningBox "Verification" %}

If you included the `vouchers` resource relationship in your request URL, the response will also contain detailed voucher information, including the amount of discount applied, price reduction calculation, etc.

{% endinfo_block %}

<details open>
<summary>Sample Response<summary>
    
```json
{
    "data": {
        "type": "carts",
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
</br>
</details>
    
### Possible Errors

| Status | Reason |
| --- | --- |
| 400 | The `X-Anonymous-Customer-Unique-Id` header is empty (for guest carts only) |
| 401 | The access token is incorrect (for carts of registered users only). |
| 403 | The access token is missing (for carts of registered users only). |
| 404 | A cart with the specified **ID** was not found. |
| 422 | Incorrect voucher code or the voucher could not be applied. |
    
### Viewing Discounts Applied to a Purchase

#### Request
To view discounts applied to a purchase, send a GET request to the corresponding carts resource and include the discounts you want to retrieve as relationships.
    
{% info_block infoBox "your title goes here" %}

if you want to retrieve discounts provided by **vouchers**, include the *vouchers* resource relationship;
- OR -
if you want to retrieve discounts provided by **cart rules**, include the *cart-rules* resource relationship.

{% endinfo_block %}
    
**Request Samples:**

* **/carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}?include=vouchers** - *vouchers* applied to a registered user’s cart;

* **/carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}?include=cart-rules** - *cart rules* applied to a registered user’s cart.
    
{% info_block warningBox "Authentication" %}

Carts of registered users cannot be accessed anonymously. For this reason, you always need to pass a user's authentication token when accessing the endpoint. For details on how to authenticate a user and retrieve the token, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).

{% endinfo_block %}
    
* **/guest-carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}?include=vouchers** - *vouchers* applied to a guest cart.

* **/guest-carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}?include=cart-rules** - *cart rules* applied to a guest cart.
    
{% info_block warningBox "Anonymous User ID" %}

When accessing guest carts, you need to specify the guest user ID. This is done via the `X-Anonymous-Customer-Unique-Id` header. Guest user IDs are managed by the API Client. For details, see [Managing Guest Carts](https://documentation.spryker.com/docs/en/managing-guest-carts).

{% endinfo_block %}
    
**Sample requests:**

`GET http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=vouchers`

`GET http://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=cart-rules`

`GET http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=vouchers,cart-rules`

where **1ce91011-8d60-59ef-9fe0-4493ef3628b2** is the cart ID.
    
### Response
The endpoints respond with the cart information. The voucher data and the applied cart rules are available in the **included** section.

{% info_block warningBox "Verification" %}

The section also includes the voucher **ID** that can be used in the future to unapply the voucher.

{% endinfo_block %}
    
**Voucher Attributes**

| Attribute | Type | Description |
| --- | --- | --- |
| **displayName** | String | Specifies the voucher display name. |
| **amount** | Integer | Specifies the amount of the discount provided by the voucher. |
| **code** | String | Specifies the voucher code. |
| **discountType** | String | Specifies the discount type.</br>The value of the field is always **voucher**. |
| **isExclusive** | Boolean | Specifies whether the voucher is exclusive. |
| **expirationDateTime** | DateTimeUtc | Specifies the date and time on which the voucher expires. |
| **discountPromotionAbstractSku** | String | Specifies the SKU of the product(s) to which the voucher applies. If the voucher can be applied to any product, the value of the attribute is **null**. |
| **discountPromotionQuantity** | Integer | Specifies the amount of the product required to be able to apply the voucher. If the voucher can be applied to any number of products, the value of the attribute is **null**. |

* The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Cart Rules Attributes**

| Attribute | Type | Description |
| --- | --- | --- |
| **displayName** | String | Specifies the display name of the role. |
| **discountType** | String | Specifies the discount type. |
| **amount** | Integer | Specifies the amount of the discount in cents. |
| **code** | String | Specifies the discount code. |
| **isExclusive** | Boolean | Indicates whether the discount is exclusive. |
| **expirationDateTime** | DateTimeUtc | Specifies the discount expiration time in UTC time format. |
| **discountPromotionAbstractSku** | String | Specifies the SKU of the product to which the discount applies. If the discount can be applied to any product, the value of the attribute is **null**. |
| **discountPromotionQuantity** | Integer | Specifies the amount of the product a customer needs to purchase in order to get the discount. If the discount can be applied to any number of products, the value of the attribute is **null**. |

<details open>
<summary>Sample Response</summary>
    
```json
{
    "data": {
        "type": "carts",
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
    
</br>
</details>

### Possible Errors

| Status | Reason |
| --- | --- |
| 400 | The `X-Anonymous-Customer-Unique-Id` header is empty (for guest carts only) |
| 401 | The access token is incorrect (for carts of registered users only). |
| 403 | The access token is missing (for carts of registered users only). |
| 404 | A cart with the specified **ID** was not found. |

### Removing Vouchers

**Request**
To unapply a discount voucher, send a DELETE request to the following endpoints:

* **/carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}/vouchers/{% raw %}{{{% endraw %}voucher_id{% raw %}}}{% endraw %}** - for carts of registered users;

{% info_block warningBox "Authentication" %}

Carts of registered users cannot be accessed anonymously. For this reason, you always need to pass a user's authentication token when accessing the endpoint. For details on how to authenticate a user and retrieve the token, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).

{% endinfo_block %}

* **/guest-carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}/vouchers/{% raw %}{{{% endraw %}voucher_id{% raw %}}}{% endraw %}** - for guest carts.

{% info_block warningBox "Anonymous User ID" %}

When accessing guest carts, you need to specify the guest user ID. This is done via the `X-Anonymous-Customer-Unique-Id` header. Guest user IDs are managed by the API Client. For details, see [Managing Guest Carts](https://documentation.spryker.com/docs/en/managing-guest-carts).

{% endinfo_block %}

Sample request: `DELETE http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/vouchers/mydiscount-we3ca`

where:

* `1ce91011-8d60-59ef-9fe0-4493ef3628b2` - is the UUID of the customer’s cart;
* `mydiscount-we3ca` - is the voucher ID.

{% info_block warningBox "Note" %}

The **voucher ID** can be retrieved when viewing voucher information. Typically, it is the same as the *voucher code*.

### Response
If the voucher is deleted successfully, the endpoints respond with the **204 No Data** status code.

### Possible Errors

{% endinfo_block %}

| Status | Reason |
| --- | --- |
| 400 | The `X-Anonymous-Customer-Unique-Id` header is empty (for guest carts only) |
| 401 | The access token is incorrect (for carts of registered users only). |
| 403 | The access token is missing (for carts of registered users only). |
| 404 | A cart and/or voucher with the specified **ID** was not found. |
