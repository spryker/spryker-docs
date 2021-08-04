---
title: Managing discount vouchers in guest carts
originalLink: https://documentation.spryker.com/2021080/docs/managing-discount-vouchers-in-guest-carts
redirect_from:
  - /2021080/docs/managing-discount-vouchers-in-guest-carts
  - /2021080/docs/en/managing-discount-vouchers-in-guest-carts
---

This endpoint allows to manage discount vouchers in guest carts.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [GLUE: Promotions & Discounts feature integration](https://documentation.spryker.com/docs/glue-promotions-discounts-feature-integration).

## Apply a discount voucher to a guest cart

To apply a discount voucher to a guest cart, send the request:

***
`POST`**/guest-carts/*{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*/vouchers**
***

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*** | Unique identifier of the guest cart to apply the discount voucher to. To get it, [Create a guest cart](https://documentation.spryker.com/docs/managing-guest-carts#create-a-guest-cart) or [Retrieve a guest cart](https://documentation.spryker.com/docs/managing-guest-carts#retrieve-a-guest-cart).  |

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | Guest user's unique identifier. The value should correspond to the value used when [creating the guest cart](https://documentation.spryker.com/docs/managing-guest-carts#create-a-guest-cart). |


| Query parameter | Description | Possible values |
| --- | --- | --- |
| Include | Adds resource relationships to the request.	 | vouchers |


<details open>
    <summary>Request sample</summary>
    
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

<details open>
    <summary>Request sample with discount voucher information</summary>
    
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

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | yes | Unique identifier of a discount voucher to apply.  |


### Response

<details open>
    <summary>Response sample</summary>
    
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

<details open>
    <summary>Response sample with discount voucher information</summary>
    
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
    


| Included resource | Attribute | TYPE | DESCRIPTION |
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

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*** | Unique identifier of the guest cart to remove the discount voucher from. To get it, [Retrieve a guest cart](https://documentation.spryker.com/docs/managing-guest-carts#retrieve-a-guest-cart).  |
| ***{% raw %}{{{% endraw %}voucher_id{% raw %}}}{% endraw %}*** | Unique identifier of the voucher to remove. To get it, [Retrieve a guest cart](https://documentation.spryker.com/docs/managing-guest-carts#retrieve-a-guest-cart) with the `vouchers` resource included.  |

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | Guest user's unique identifier. The value should correspond to the value used when [creating the guest cart](https://documentation.spryker.com/docs/managing-guest-carts#create-a-guest-cart). |



Request sample: `DELETE http://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/vouchers/mydiscount-we3ca`

### Response

If the voucher is deleted successfully, the endpoints returns the `204 No Data` status code.


## Possible Errors

| Status | Reason |
| --- | --- |
| 101 | Cart with the specified ID is not found. |
| 109 | `X-Anonymous-Customer-Unique-Id` header is empty. |
| 3301 | Voucher with the specified ID was not found. |
| 3302 | Incorrect voucher code or the voucher could not be applied.| 

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).


