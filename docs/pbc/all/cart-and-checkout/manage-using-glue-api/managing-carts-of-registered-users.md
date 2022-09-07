---
title: Managing carts of registered users
description: Retrieve details about the carts of the registered users and learn what else you can do with the resource.
last_updated: Jun 22, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-carts-of-registered-users
originalArticleId: ac357bc6-db9b-43a5-a65a-ef55259cd379
redirect_from:
  - /2021080/docs/managing-carts-of-registered-users
  - /2021080/docs/en/managing-carts-of-registered-users
  - /docs/managing-carts-of-registered-users
  - /docs/en/managing-carts-of-registered-users
  - /docs/scos/dev/glue-api-guides/202204.0/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html
related:
  - title: Managing items in carts of registered users
    link: docs/scos/dev/glue-api-guides/page.version/managing-carts/carts-of-registered-users/managing-items-in-carts-of-registered-users.html
  - title: Managing gift cards of registered users
    link: docs/pbc/all/gift-cards/manage-using-glue-api/manage-gift-cards-of-registered-users.html
  - title: Retrieving customer carts
    link: docs/scos/dev/glue-api-guides/page.version/managing-customers/retrieving-customer-carts.html
---

This endpoint allows managing carts by creating, retrieving, and deleting them.

## Multiple carts

Unlike guest carts, carts of registered users have an unlimited lifetime. Also, if the Multiple Carts feature is [integrated into your project](/docs/scos/dev/feature-integration-guides/{{page.version}}/multiple-carts-feature-integration.html), and Glue is [enabled for multi-cart operations](/docs/scos/dev/feature-integration-guides/{{page.version}}/multiple-carts-feature-integration.html), registered users can have an unlimited number of carts.


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/install-and-upgrade/install-the-cart-glue-api.html)
* [Glue API: Product Labels feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-labels-feature-integration.html)
* [Glue API: Measurement Units feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-measurement-units-feature-integration.html)
* [Glue API: Promotions & Discounts feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-promotions-and-discounts-feature-integration.html)
* [Glue API: Product Options feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-options-feature-integration.html)
* [Install the Shared Carts feature](/docs/pbc/all/cart-and-checkout/install-and-upgrade/install-the-shared-carts-feature.html)

## Create a cart

To create a cart, send the request:

***
`POST` **/carts**
***

{% info_block infoBox %}

Carts created via Glue API are always set as the default carts for the user.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user).  |

Request sample: `POST https://glue.mysprykershop.com/carts`

```json
{
   "data":{
      "type":"carts",
      "attributes":{
         "name":"My Cart",
         "priceMode":"GROSS_MODE",
         "currency":"EUR",
         "store":"DE"
      }
   }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String | &check; | Sets the cart name.<br>This field can be set only if you are using the multiple carts feature. If you are operating in a single-cart environment, an attempt to set the value will result in an error with the "422 Unprocessable Entry" status code. |
| priceMode | Enum | &check; | Sets the price mode to be used for the cart. Possible values:<ul><li>GROSS_MODE—prices after tax;</li><li>NET_MODE—prices before tax.</li></ul>For details, see [Net &amp; Gross Prices](/docs/pbc/all/price-management/extend-and-customize/configuration-of-price-modes-and-types.html). |
| currency | String | &check; | Sets the cart currency. |
| store | String | &check; | Sets the name of the store where to create the cart. |

### Response


<details>
<summary markdown='span'>Response sample</summary>

```json
"data":
        {
            "type": "carts",
            "id": "f23f5cfa-7fde-5706-aefb-ac6c6bbadeab",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "discounts": [],
                "totals": {
                    "expenseTotal": null,
                    "discountTotal": null,
                    "taxTotal": null,
                    "subtotal": null,
                    "grandTotal": null
                },
                "name": "My Cart",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab"
            }
        }
}
```
</details>

**General cart information**

| ATTRIBUTE | TYPE  | DESCRIPTION |
| --- | --- | --- |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected when the cart was created. |
| store | String | Store for which the cart was created. |
| name | String | Specifies a cart name.<br>The field is available in multi-cart environments only. |
| isDefault | Boolean | Specifies whether the cart is the default one for the customer.<br>The field is available in multi-cart environments only.  |

**Discount Information**

| ATTRIBUTE | TYPE  | DESCRIPTION |
| --- | --- | --- |
| displayName | String | Discount name. |
| amount | Integer | Discount amount applied to the cart.  |
| code | String | Discount code applied to the cart. |

**Totals**

| ATTRIBUTE | TYPE  | DESCRIPTION |
| --- | --- | --- |
| expenseTotal | Integer | Total amount of expenses (including e.g. shipping costs). |
| discountTotal | Integer | Total amount of discounts applied to the cart.  |
| taxTotal | Integer | Total amount of taxes to be paid. |
| subTotal | Integer | Subtotal of the cart.  |
| grandTotal | Integer | Grand total of the cart.  |


## Retrieve registered user's carts

To retrieve all carts, send the request:

***
`GET` **/carts**
***

{% info_block infoBox "Note" %}

Alternatively, you can retrieve all carts belonging to a customer through the **/customers/*{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %}*/carts** endpoint. For details, see [Retrieving customer carts](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/retrieving-customer-carts.html).

{% endinfo_block %}

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. |<ul><li>items</li><li>cart-permission-groups</li><li>shared-carts</li><li>company-users</li><li>cart-rules</li><li>promotional-items</li><li>vouchers</li><li>gift-cards</li><li>concrete-products</li><li>product-options</li><li>
