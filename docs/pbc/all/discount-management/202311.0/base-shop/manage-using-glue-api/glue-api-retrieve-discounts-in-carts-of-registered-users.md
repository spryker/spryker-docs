---
title: "Glue API: Retrieve discounts in carts of registered users"
description: Learn how to retrieve cart rules, vouchers, and promotional items in carts of registered users
last_updated: July 28, 2022
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/pbc/all/discount-management/202311.0/manage-via-glue-api/retrieve-discounts-in-carts-of-registered-users.html
  - /docs/pbc/all/discount-management/202311.0/base-shop/manage-via-glue-api/retrieve-discounts-in-carts-of-registered-users.html
  - /docs/pbc/all/discount-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-discounts-in-carts-of-registered-users.html
---

This document describes how to retrieve cart rules, vouchers, and promotional items in carts of registered users. For full information on the endpoint, see [Managing carts of registered users](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html).

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see the following docs:

* [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)

* [Install the Promotions & Discounts feature Glue API](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html)


## Retrieve registered user's carts

To retrieve all carts, send the request:

***
`GET` **/carts**
***

{% info_block infoBox "Note" %}

Alternatively, you can retrieve all carts belonging to a customer through the **/customers/*{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %}*/carts** endpoint. For details, see [Retrieve customer carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-customer-carts.html).

{% endinfo_block %}

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | An alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. |<ul><li>cart-rules</li><li>promotional-items</li><li>vouchers</li></ul> |



| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/carts?include=cart-rules` | Retrieve all carts of a user with cart rules. |
| `GET https://glue.mysprykershop.com/carts?include=vouchers` | Retrieve all carts of a user with information about applied vouchers. |
| `GET https://glue.mysprykershop.com/carts?include=promotional-items` | Retrieve information about promotional items for the cart. |


### Response

<details>
<summary>Response sample: no carts</summary>

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
<summary>Response sample with cart rules</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "59743e37-0182-5153-9935-77106741a9d2",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Purchases",
                "isDefault": true,
                "totals": {
                    "expenseTotal": null,
                    "discountTotal": null,
                    "taxTotal": null,
                    "subtotal": null,
                    "grandTotal": null
                },
                "discounts": [],
                "thresholds": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/59743e37-0182-5153-9935-77106741a9d2"
            }
        },
        {
            "type": "carts",
            "id": "2fd32609-b6b0-5993-9254-8d2f271941e4",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "My Cart",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 2965,
                    "taxTotal": 4261,
                    "subtotal": 29651,
                    "grandTotal": 26686
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 2965,
                        "code": null
                    }
                ],
                "thresholds": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4"
            },
            "relationships": {
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
        {
            "type": "carts",
            "id": "2b72635a-9363-56f5-9ba7-55631b8ad71e",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "New",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 10206,
                    "taxTotal": 14666,
                    "subtotal": 102063,
                    "grandTotal": 91857
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 10206,
                        "code": null
                    }
                ],
                "thresholds": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/2b72635a-9363-56f5-9ba7-55631b8ad71e"
            },
            "relationships": {
                "cart-rules": {
                    "data": [
                        {
                            "type": "cart-rules",
                            "id": "1"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts?include=cart-rules"
    },
    "included": [
        {
            "type": "cart-rules",
            "id": "1",
            "attributes": {
                "amount": 10206,
                "code": null,
                "discountType": "cart_rule",
                "displayName": "10% Discount for all orders above",
                "isExclusive": false,
                "expirationDateTime": "2020-12-31 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cart-rules/1"
            }
        }
    ]
}
```    
</details>

<details>
<summary>Response sample with vouchers</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "976af32f-80f6-5f69-878f-4ea549ee0830",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 1663,
                    "taxTotal": 5046,
                    "subtotal": 33265,
                    "grandTotal": 31602,
                    "priceToPay": 31602
                },
                "discounts": [
                    {
                        "displayName": "5% discount on all white products",
                        "amount": 1663,
                        "code": null
                    }
                ],
                "thresholds": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830?include=vouchers"
            },
            "relationships": {
                "vouchers": {
                    "data": [
                        {
                            "type": "vouchers",
                            "id": "sprykerya1y"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts?include=vouchers"
    },
    "included": [
        {
            "type": "vouchers",
            "id": "sprykerya1y",
            "attributes": {
                "amount": 1663,
                "code": "sprykerya1y",
                "discountType": "voucher",
                "displayName": "5% discount on all white products",
                "isExclusive": false,
                "expirationDateTime": "2021-02-28 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830/cart-codes/sprykerya1y"
            }
        }
    ]
}
```

</details>

<details>
<summary>Response sample with a promotional item</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "e877356a-5d8f-575e-aacc-c790eeb20a27",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Everyday purchases",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 17352,
                    "taxTotal": 19408,
                    "subtotal": 173517,
                    "grandTotal": 156165,
                    "priceToPay": 56165
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 17352,
                        "code": null
                    }
                ],
                "thresholds": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/e877356a-5d8f-575e-aacc-c790eeb20a27"
            },
            "relationships": {
                "promotional-items": {
                    "data": [
                        {
                            "type": "promotional-items",
                            "id": "bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts?include=promotional-items"
    },
    "included": [
        {
            "type": "promotional-items",
            "id": "bfc600e1-5bf1-50eb-a9f5-a37deb796f8a",
            "attributes": {
                "sku": "112",
                "quantity": 2
            },
            "links": {
                "self": "https://glue.mysprykershop.com/promotional-items/bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
            }
        }
    ]
}
```    
</details>


<a name="retrieve-a-registered-users-carts-response-attributes"></a>

{% include pbc/all/glue-api-guides/{{page.version}}/carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/carts-response-attributes.md -->

|INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| vouchers, cart-rules | displayName | String | The discount name displayed on the Storefront. |
| vouchers, cart-rules | amount | Integer | The amount of the provided discount. |
| vouchers, cart-rules | code | String | The discount code. |
| vouchers, cart-rules | discountType | String | The discount type. |
| vouchers, cart-rules  | isExclusive | Boolean | If true, the discount is exclusive. |
| vouchers, cart-rules | expirationDateTime | DateTimeUtc | The date and time on which the discount expires. |
| vouchers, cart-rules | discountPromotionAbstractSku | String | The SKU of the products to which the discount applies. If the discount can be applied to any product, the value is `null`. |
| vouchers, cart-rules | discountPromotionQuantity | Integer | Specifies the amount of the product required to be able to apply the discount. If the minimum number is `0`, the value is `null`. |



## Retrieve a registered user's cart

To retrieve a particular cart, send the request:

***
`GET` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*** | The unique ID of a cart. [Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#create-a-cart) or [Retrieve a registered user's carts](#retrieve-registered-users-carts) to get it. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | An alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>cart-rules</li><li>promotional-items</li><li>vouchers</li></ul> |


| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=cart-rules` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with cart rules. |
| `GET https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=promotional-items` | Retrieve the `1ce91011-8d60-59ef-9fe0-4493ef3628b2` cart with its promotional items. |
| `GET https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830?include=vouchers` | Retrieve the `976af32f-80f6-5f69-878f-4ea549ee0830` cart with detailed information on its vouchers. |


### Response

<details>
<summary>Response sample with cart rules</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "2fd32609-b6b0-5993-9254-8d2f271941e4",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "My Cart",
            "isDefault": false,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 2965,
                "taxTotal": 4261,
                "subtotal": 29651,
                "grandTotal": 26686
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 2965,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4"
        },
        "relationships": {
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
            "type": "cart-rules",
            "id": "1",
            "attributes": {
                "amount": 2965,
                "code": null,
                "discountType": "cart_rule",
                "displayName": "10% Discount for all orders above",
                "isExclusive": false,
                "expirationDateTime": "2020-12-31 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cart-rules/1"
            }
        }
    ]
}
```    
</details>



<details>
<summary>Response sample with a promotional item</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "My Cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 11113,
                "taxTotal": 15107,
                "subtotal": 111128,
                "grandTotal": 100015
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 11113,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
        },
        "relationships": {
            "promotional-items": {
                "data": [
                    {
                        "type": "promotional-items",
                        "id": "bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "promotional-items",
            "id": "bfc600e1-5bf1-50eb-a9f5-a37deb796f8a",
            "attributes": {
                "sku": "112",
                "quantity": 2
            },
            "links": {
                "self": "https://glue.mysprykershop.com/promotional-items/bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
            }
        }
    ]
}
```    
</details>

<details>
<summary>Response sample with vouchers</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "976af32f-80f6-5f69-878f-4ea549ee0830",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 25766,
                "taxTotal": 25407,
                "subtotal": 184893,
                "grandTotal": 159127,
                "priceToPay": 159127
            },
            "discounts": [
                {
                    "displayName": "5% discount on all white products",
                    "amount": 7277,
                    "code": null
                },
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 18489,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830?include=vouchers"
        },
        "relationships": {
            "vouchers": {
                "data": [
                    {
                        "type": "vouchers",
                        "id": "sprykercu2d"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "vouchers",
            "id": "sprykercu2d",
            "attributes": {
                "amount": 7277,
                "code": "sprykercu2d",
                "discountType": "voucher",
                "displayName": "5% discount on all white products",
                "isExclusive": false,
                "expirationDateTime": "2021-02-27 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830/cart-codes/sprykercu2d"
            }
        }
    ]
}
```
</details>



For the attributes of carts of registered users and included resources, see [Retrieve a registered user's carts](#retrieve-a-registered-users-carts-response-attributes).

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is incorrect. |
| 002 | Access token is missing. |
| 003 | Failed to log in the user. |
| 101 | Cart with given uuid not found. |
| 103 | Item with the given group key not found in the cart. |
| 104 | Cart uuid is missing. |
| 115 | Unauthorized cart action. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
