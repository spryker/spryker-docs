---
title: Managing discount vouchers in carts of registered users
originalLink: https://documentation.spryker.com/v6/docs/managing-discount-vouchers-in-carts-of-registered-users
redirect_from:
  - /v6/docs/managing-discount-vouchers-in-carts-of-registered-users
  - /v6/docs/en/managing-discount-vouchers-in-carts-of-registered-users
---

This endpoint allows to manage discount vouchers in carts of registered users.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [GLUE: Promotions & Discounts feature integration](https://documentation.spryker.com/docs/glue-promotions-discounts-feature-integration).

## Apply a discount voucher to a cart of a registered user
To apply a discount voucher to a cart of a registered user, send the request:

***
`POST`**/carts/*{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*/vouchers**
***


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*** | Unique identifier of the cart to apply the discount voucher to. To get it, [Create a cart](https://documentation.spryker.com/docs/en/managing-carts-of-registered-users#create-a-cart) or [Retrieve a registered user's carts](https://documentation.spryker.com/docs/en/managing-carts-of-registered-users#retrieve-a-registered-users-carts).  |

### Request

| HEADER KEY | HEADER TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | String | &check; | An alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/authenticating-as-a-customer).  |

| Query parameter | Description | Possible values |
| --- | --- | --- |
| Include | Adds resource relationships to the request.	 | vouchers |

<details open>
    <summary>Request sample</summary>
    
`POST https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/vouchers`

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
    
`POST https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/vouchers?include=vouchers`

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
        "type": "carts",
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
            "self": "https://glue.mysprykershop.com/carts/c9310692-2ab0-5edc-bb41-fee6aa828d55"
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


## Remove a discount voucher from a registered user's cart

To remove a discount voucher, send the request:

***
`DELETE`**/carts/*{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*/vouchers/*{% raw %}{{{% endraw %}voucher_id{% raw %}}}{% endraw %}***
***

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}*** | Unique identifier of the registered user's cart to remove the discount voucher from. To get it, [Retrieve a registered user's cart](https://documentation.spryker.com/docs/managing-carts-of-registered-users#retrieve-a-registered-users-carts).  |
| ***{% raw %}{{{% endraw %}voucher_id{% raw %}}}{% endraw %}*** | Unique identifier of the voucher to remove. To get it, [Retrieve a registered user's cart](https://documentation.spryker.com/docs/managing-carts-of-registered-users#retrieve-a-registered-users-cart) or [Retrieve a registered user's carts](https://documentation.spryker.com/docs/managing-carts-of-registered-users#retrieve-a-registered-users-carts) with the `vouchers` resource included.  |

### Request

| HEADER KEY | HEADER TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | String | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/authenticating-as-a-customer).  |



Request sample: `DELETE https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/vouchers/mydiscount-we3ca`


### Response

If the voucher is deleted successfully, the endpoints returns the `204 No Data` status code.



## Possible Errors

| Status | Reason |
| --- | --- |
| 001 | Access token is incorrect. |
| 002 | Access token is missing. |
| 3301 | Cart and/or voucher with the specified ID was not found. |
| 3302 | Incorrect voucher code or the voucher could not be applied. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).

