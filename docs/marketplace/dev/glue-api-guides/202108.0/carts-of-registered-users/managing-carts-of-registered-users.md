---
title: Managing carts of registered users
description: Retrieve details about the carts of the registered users and learn what else you can do with the resource in the Spryker Marketplace
template: glue-api-storefront-guide-template
---

This endpoint allows managing carts by creating, retrieving, and deleting them.

## Multiple carts

Unlike guest carts, carts of registered users have an unlimited lifetime. Also, if the [Multiple Carts feature is integrated into your project](/docs/scos/dev/feature-integration-guides/{{page.version}}/multiple-carts-feature-integration.html), and [Glue API is enabled for multi-cart operations](/docs/scos/dev/feature-integration-guides/{{page.version}}/multiple-carts-feature-integration.html), registered users can have an unlimited number of carts.


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-cart-feature-integration.html)
* [Glue API: Product Labels feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-labels-feature-integration.html)
* [Glue API: Measurement Units feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-measurement-units-feature-integration.html)
* [Glue API: Promotions & Discounts feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-promotions-and-discounts-feature-integration.html)
* [Glue API: Product Options feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-options-feature-integration.html)
* [Shared Carts feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/shared-carts-feature-integration.html)
* [Glue API: Merchant Offers feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-feature-integration.html)
* [Glue API: Marketplace Product Offer Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-prices-feature-integration.html)
* [Glue API: Marketplace Product Offer Volume Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-volume-prices.html)

## Create a cart

To create a cart, send the request:

***
`POST` **/carts**
***

{% info_block infoBox "Info" %}

Carts created via Glue API are always set as the default carts for the user.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user).  |

Sample request: `POST https://glue.mysprykershop.com/carts`

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
| name | String | &check; | Sets the cart name.<br>You can pass this field only with the Multiple Carts feature integrated. If you are operating in a single-cart environment, an attempt to set the value returns the `422 Unprocessable Entry` error. |
| priceMode | Enum | &check; | Sets the price mode for the cart. Possible values:<ul><li>GROSS_MODE: prices after tax</li><li>NET_MODE: prices before tax</li></ul>For details, see [Net &amp; gross prices management](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/net-and-gross-prices-management.html). |
| currency | String | &check; | Sets the cart currency. |
| store | String | &check; | Sets the name of the store where to create the cart. |

### Response


<details>
<summary markdown='span'>Response sample</summary>

```json
{
  "data": {
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

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| priceMode | String | Price mode of the cart. |
| currency | String | Currency of the cart. |
| store | String | Store in which the cart is created. |
| name | String | Cart name.<br>The field is available only in multi-cart environments. |
| isDefault | Boolean | Specifies if the cart is the default one for the customer.<br>The field is available only in multi-cart environments.  |

**Discount information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| displayName | String | Discount name. |
| amount | Integer | Discount amount applied to the cart.  |
| code | String | Discount code applied to the cart. |

**Totals**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| totals | Object | Discribes the total calculations. |
| totals.expenseTotal | String | Total amount of expenses (including, for example, shipping costs). |
| totals.discountTotal | Integer | Total amount of discounts applied to the cart.  |
| totals.taxTotal | String | Total amount of taxes to be paid. |
| totals.subTotal | Integer | Subtotal of the cart.  |
| totals.grandTotal | Integer | Grand total of the cart.  |


## Retrieve registered user's carts

To retrieve all carts, send the request:

***
`GET` **/carts**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. |<ul><li>items</li><li>cart-permission-groups</li><li>shared-carts</li><li>company-users</li><li>cart-rules</li><li>promotional-items</li><li>vouchers</li><li>gift-cards</li><li>concrete-products</li><li>product-options</li><li>product-labels</li><li>product-offers</li><li>product-offer-availabilities</li><li>product-offer-prices</li><li>merchants</li></ul> |

{% info_block infoBox "Info" %}

* To retrieve all the product options of the item in a cart, include `items`, `concrete-products`, and `product-options`.
* To retrieve information about the company user a cart is shared with, include `shared-carts` and `company-users`.
* To retrieve product labels of the products in a cart, include `items`, `concrete-products`, and `product-labels`.
* To retrieve product offers, include `items`, `concrete-products`, and `product-offers`.
* To retrieve product offer availabilities, include `items`, `concrete-products`, and `product-offer-availabilities`.
* To retrieve product offer prices, include `items`, `concrete-products`, and `product-offer-prices`.

{% endinfo_block %}

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/carts` | Retrieve all carts. |
| `GET https://glue.mysprykershop.com/carts?include=items` | Retrieve all carts with the items in them included.  |
| `GET https://glue.mysprykershop.com/carts?include=cart-permission-groups` | Retrieve all carts with cart permission groups included. |
| `GET https://glue.mysprykershop.com/carts?include=shared-carts` | Retrieve all carts with shared carts included. |
| `GET https://glue.mysprykershop.com/carts?include=shared-carts,company-users` | Retrieve all carts with included information about shared carts, and the company uses they are shared with. |
| `GET https://glue.mysprykershop.com/carts?include=cart-rules` | Retrieve all carts with cart rules included. |
| `GET https://glue.mysprykershop.com/carts?include=vouchers` | Retrieve all carts with  applied vouchers included. |
| `GET https://glue.mysprykershop.com/carts?include=promotional-items` | Retrieve all carts with promotional items included. |
| `GET https://glue.mysprykershop.com/carts?include=gift-cards` | Retrieve all carts with applied gift cards included. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-options` | Retrieve all carts with items, respective concrete product, and their product options included. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-labels` | Retrieve all carts with the included information: concrete products and the product labels assigned to the products in the carts. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-offers` | Retrieve all carts with product offers included. |
| `GET http://glue.mysprykershop.com/carts?include=items,concrete-products,product-offers,product-offer-availabilities` | Retrieve all carts with product offer availabilities included. |
| `GET http://glue.mysprykershop.com/carts?include=items,concrete-products,product-offers,product-offer-prices` | Retrieve all carts with product offer prices included. |
| `GET http://glue.mysprykershop.com/carts?include=merchants` | Retrieve all carts with merchants included. |


### Response

<details>
<summary markdown='span'>Response sample: no carts</summary>

```json
{
    "data": [],
    "links": {
        "self": "https://glue.mysprykershop.com/carts"
    }
}
```    
</details>

<details>
<summary markdown='span'>Response sample: multiple carts</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "61ab15e9-e24a-5dec-a1ef-fc333bd88b0a",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "My Cart",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 3744,
                    "taxTotal": 5380,
                    "subtotal": 37440,
                    "grandTotal": 33696
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 3744,
                        "code": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a"
            }
        },
        {
            "type": "carts",
            "id": "482bdbd6-137f-5b58-bd1c-37f3fa735a16",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Black Friday Conf Bundle",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 8324,
                    "taxTotal": 1469,
                    "subtotal": 83236,
                    "grandTotal": 74912
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/482bdbd6-137f-5b58-bd1c-37f3fa735a16"
           