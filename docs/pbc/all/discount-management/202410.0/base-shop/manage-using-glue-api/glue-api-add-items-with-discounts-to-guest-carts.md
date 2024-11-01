---
title: "Glue API: Add items with discounts to guest carts"
description: Learn how to add items with discounts to guest carts via Glue API.
last_updated: July 29, 2022
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/pbc/all/discount-management/manage-via-glue-api/add-items-with-discounts-to-guest-carts.html
  - /docs/pbc/all/discount-management/202311.0/manage-via-glue-api/add-items-with-discounts-to-guest-carts.html
  - /docs/pbc/all/discount-management/202311.0/base-shop/manage-via-glue-api/add-items-with-discounts-to-guest-carts.html
  - /docs/pbc/all/discount-management/202204.0/base-shop/manage-using-glue-api/glue-api-add-items-with-discounts-to-guest-carts.html
---

This document describes how to add items with discounts to guest carts. For full information on the endpoint, see [Manage guest cart items](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-cart-items.html).

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see the following docs:
* [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)
* [Install the Promotions & Discounts feature Glue API](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html)


## Add items to a guest cart

To add items to a guest cart, send the following request:

***
`POST` **/guest-cart-items**
***

{% info_block infoBox "Creating a guest cart" %}

* If a guest cart does not exist for the current user, and you send a request to add items, a guest cart is created automatically. Otherwise, the items are added to the existing guest cart.
* Guest users have one cart by default. You can optionally specify its ID by using the following endpoint. The information in this section is valid for both endpoints.

`POST` **/guest-carts/*{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*/guest-cart-items**

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*** | The unique ID of the guest cart. To get it, [retrieve a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart). |

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 |&check; | A guest user's unique ID. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>cart-rules</li><li>vouchers</li></ul> |



<details>
<summary>Request sample: add a promotional item with the cart-rules relationship to a guest cart</summary>

{% info_block infoBox "Cart rules" %}

To add the promotional product to cart, make sure that the cart fulfills the cart rules for the promotional item.

{% endinfo_block %}

`POST https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/guest-cart-items?include=cart-rules`

```json
{
    "data": {
        "type": "guest-cart-items",
        "attributes": {
            "sku": "112_306918001",
            "quantity": "1",
            "idPromotionalItem": "bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
        }
    }
}
```
</details>



<details>
<summary>Request sample: add items with vouchers to a guest cart</summary>

`POST https://glue.mysprykershop.com/guest-cart-items?include=cart-rules`

```json
{
    "data": {
        "type": "guest-cart-items",
        "attributes": {
            "sku": "057_32007641",
            "quantity": 1
        }
    }
}
```
</details>


| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| sku | String | &check; | Specifies the SKU part number of the item to place on the new guest cart. To use promotions, specify the SKU of one of a product being promoted. Concrete product SKU required. |
| quantity | Integer | &check; | Specifies the number of items to place on the guest cart. If you add a promotional item and the number of products exceeds the number of promotions, the exceeding items will be added without promotional benefits. |
| idPromotionalItem | String |  | The ID of the Promotional item. You need to specify the ID to apply the promotion benefits. |



### Response



<details>
<summary>Response sample: add a promotional item with the cart-rules relationship to a guest cart</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "My Cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 13192,
                "taxTotal": 15107,
                "subtotal": 113207,
                "grandTotal": 100015
            },
            "discounts": [
                {
                    "displayName": "For every purchase above certain value depending on the currency and net/gross price. you get this promotional product for free",
                    "amount": 2079,
                    "code": null
                },
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 11113,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
        }
    }
}
```
</details>

<details>
<summary>Response sample: add a promotional item with the cart-rules relationship</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "My Cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 13192,
                "taxTotal": 15107,
                "subtotal": 113207,
                "grandTotal": 100015
            },
            "discounts": [
                {
                    "displayName": "For every purchase above certain value depending on the currency and net/gross price. you get this promotional product for free",
                    "amount": 2079,
                    "code": null
                },
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 11113,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
        },
        "relationships": {
            "cart-rules": {
                "data": [
                    {
                        "type": "cart-rules",
                        "id": "6"
                    },
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
            "type": "guest-cart-items",
            "id": "134_29759322",
            "attributes": {
                "sku": "134_29759322",
                "quantity": "1",
                "groupKey": "134_29759322",
                "abstractSku": "134",
                "amount": null,
                "calculations": {
                    "unitPrice": 1879,
                    "sumPrice": 1879,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 1879,
                    "sumGrossPrice": 1879,
                    "unitTaxAmountFullAggregation": 270,
                    "sumTaxAmountFullAggregation": 270,
                    "sumSubtotalAggregation": 1879,
                    "unitSubtotalAggregation": 1879,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 188,
                    "sumDiscountAmountAggregation": 188,
                    "unitDiscountAmountFullAggregation": 188,
                    "sumDiscountAmountFullAggregation": 188,
                    "unitPriceToPayAggregation": 1691,
                    "sumPriceToPayAggregation": 1691
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/guest-cart-items/134_29759322"
            }
        },
        {
            "type": "guest-cart-items",
            "id": "118_29804739",
            "attributes": {
                "sku": "118_29804739",
                "quantity": "1",
                "groupKey": "118_29804739",
                "abstractSku": "118",
                "amount": null,
                "calculations": {
                    "unitPrice": 6000,
                    "sumPrice": 6000,
                    "taxRate": 0,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 6000,
                    "sumGrossPrice": 6000,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "sumSubtotalAggregation": 6000,
                    "unitSubtotalAggregation": 6000,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 600,
                    "sumDiscountAmountAggregation": 600,
                    "unitDiscountAmountFullAggregation": 600,
                    "sumDiscountAmountFullAggregation": 600,
                    "unitPriceToPayAggregation": 5400,
                    "sumPriceToPayAggregation": 5400
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/guest-cart-items/118_29804739"
            }
        },
        {
            "type": "guest-cart-items",
            "id": "139_24699831",
            "attributes": {
                "sku": "139_24699831",
                "quantity": "1",
                "groupKey": "139_24699831",
                "abstractSku": "139",
                "amount": null,
                "calculations": {
                    "unitPrice": 3454,
                    "sumPrice": 3454,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 3454,
                    "sumGrossPrice": 3454,
                    "unitTaxAmountFullAggregation": 496,
                    "sumTaxAmountFullAggregation": 496,
                    "sumSubtotalAggregation": 3454,
                    "unitSubtotalAggregation": 3454,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 345,
                    "sumDiscountAmountAggregation": 345,
                    "unitDiscountAmountFullAggregation": 345,
                    "sumDiscountAmountFullAggregation": 345,
                    "unitPriceToPayAggregation": 3109,
                    "sumPriceToPayAggregation": 3109
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/guest-cart-items/139_24699831"
            }
        },
        {
            "type": "guest-cart-items",
            "id": "136_24425591",
            "attributes": {
                "sku": "136_24425591",
                "quantity": 3,
                "groupKey": "136_24425591",
                "abstractSku": "136",
                "amount": null,
                "calculations": {
                    "unitPrice": 33265,
                    "sumPrice": 99795,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 33265,
                    "sumGrossPrice": 99795,
                    "unitTaxAmountFullAggregation": 4780,
                    "sumTaxAmountFullAggregation": 14341,
                    "sumSubtotalAggregation": 99795,
                    "unitSubtotalAggregation": 33265,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 3327,
                    "sumDiscountAmountAggregation": 9980,
                    "unitDiscountAmountFullAggregation": 3327,
                    "sumDiscountAmountFullAggregation": 9980,
                    "unitPriceToPayAggregation": 29938,
                    "sumPriceToPayAggregation": 89815
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/guest-cart-items/136_24425591"
            }
        },
        {
            "type": "guest-cart-items",
            "id": "112_306918001-promotion-1",
            "attributes": {
                "sku": "112_306918001",
                "quantity": "1",
                "groupKey": "112_306918001-promotion-1",
                "abstractSku": "112",
                "amount": null,
                "calculations": {
                    "unitPrice": 2079,
                    "sumPrice": 2079,
                    "taxRate": 0,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 2079,
                    "sumGrossPrice": 2079,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "sumSubtotalAggregation": 2079,
                    "unitSubtotalAggregation": 2079,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 2079,
                    "sumDiscountAmountAggregation": 2079,
                    "unitDiscountAmountFullAggregation": 2079,
                    "sumDiscountAmountFullAggregation": 2079,
                    "unitPriceToPayAggregation": 0,
                    "sumPriceToPayAggregation": 0
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/guest-cart-items/112_306918001-promotion-1"
            }
        },
        {
            "type": "cart-rules",
            "id": "6",
            "attributes": {
                "amount": 2079,
                "code": null,
                "discountType": "cart_rule",
                "displayName": "For every purchase above certain value depending on the currency and net/gross price. you get this promotional product for free",
                "isExclusive": false,
                "expirationDateTime": "2020-12-31 00:00:00.000000",
                "discountPromotionAbstractSku": "112",
                "discountPromotionQuantity": 2
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cart-rules/6"
            }
        },
        {
            "type": "cart-rules",
            "id": "1",
            "attributes": {
                "amount": 11113,
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
<summary>Response sample: add items with cart rules to a guest cart</summary>

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
                "discountTotal": 14554,
                "taxTotal": 20914,
                "subtotal": 145540,
                "grandTotal": 130986,
                "priceToPay": 130986
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 14554,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/c9310692-2ab0-5edc-bb41-fee6aa828d55"
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
            "type": "guest-cart-items",
            "id": "077_24584210",
            "attributes": {
                "sku": "077_24584210",
                "quantity": 10,
                "groupKey": "077_24584210",
                "abstractSku": "077",
                "amount": null,
                "calculations": {
                    "unitPrice": 14554,
                    "sumPrice": 145540,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 14554,
                    "sumGrossPrice": 145540,
                    "unitTaxAmountFullAggregation": 2091,
                    "sumTaxAmountFullAggregation": 20914,
                    "sumSubtotalAggregation": 145540,
                    "unitSubtotalAggregation": 14554,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 1455,
                    "sumDiscountAmountAggregation": 14554,
                    "unitDiscountAmountFullAggregation": 1455,
                    "sumDiscountAmountFullAggregation": 14554,
                    "unitPriceToPayAggregation": 13099,
                    "sumPriceToPayAggregation": 130986
                },
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/c9310692-2ab0-5edc-bb41-fee6aa828d55/guest-cart-items/077_24584210"
            }
        },
        {
            "type": "cart-rules",
            "id": "1",
            "attributes": {
                "amount": 14554,
                "code": null,
                "discountType": "cart_rule",
                "displayName": "10% Discount for all orders above",
                "isExclusive": false,
                "expirationDateTime": "2022-02-26 00:00:00.000000",
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
<summary>Response sample: add items with vouchers to a guest cart</summary>

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
                "discountTotal": 25965,
                "taxTotal": 25692,
                "subtotal": 186879,
                "grandTotal": 160914,
                "priceToPay": 160914
            },
            "discounts": [
                {
                    "displayName": "5% discount on all white products",
                    "amount": 7277,
                    "code": null
                },
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 18688,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/c9310692-2ab0-5edc-bb41-fee6aa828d55"
        },
        "relationships": {
            "vouchers": {
                "data": [
                    {
                        "type": "vouchers",
                        "id": "sprykerku2f"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "guest-cart-items",
            "id": "077_24584210",
            "attributes": {
                "sku": "077_24584210",
                "quantity": 10,
                "groupKey": "077_24584210",
                "abstractSku": "077",
                "amount": null,
                "calculations": {
                    "unitPrice": 14554,
                    "sumPrice": 145540,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 14554,
                    "sumGrossPrice": 145540,
                    "unitTaxAmountFullAggregation": 1975,
                    "sumTaxAmountFullAggregation": 19752,
                    "sumSubtotalAggregation": 145540,
                    "unitSubtotalAggregation": 14554,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 2183,
                    "sumDiscountAmountAggregation": 21831,
                    "unitDiscountAmountFullAggregation": 2183,
                    "sumDiscountAmountFullAggregation": 21831,
                    "unitPriceToPayAggregation": 12371,
                    "sumPriceToPayAggregation": 123709
                },
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/c9310692-2ab0-5edc-bb41-fee6aa828d55/guest-cart-items/077_24584210"
            }
        },
        {
            "type": "guest-cart-items",
            "id": "057_32007641",
            "attributes": {
                "sku": "057_32007641",
                "quantity": 1,
                "groupKey": "057_32007641",
                "abstractSku": "057",
                "amount": null,
                "calculations": {
                    "unitPrice": 41339,
                    "sumPrice": 41339,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 41339,
                    "sumGrossPrice": 41339,
                    "unitTaxAmountFullAggregation": 5940,
                    "sumTaxAmountFullAggregation": 5940,
                    "sumSubtotalAggregation": 41339,
                    "unitSubtotalAggregation": 41339,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 4134,
                    "sumDiscountAmountAggregation": 4134,
                    "unitDiscountAmountFullAggregation": 4134,
                    "sumDiscountAmountFullAggregation": 4134,
                    "unitPriceToPayAggregation": 37205,
                    "sumPriceToPayAggregation": 37205
                },
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/c9310692-2ab0-5edc-bb41-fee6aa828d55/guest-cart-items/057_32007641"
            }
        },
        {
            "type": "vouchers",
            "id": "sprykerku2f",
            "attributes": {
                "amount": 7277,
                "code": "sprykerku2f",
                "discountType": "voucher",
                "displayName": "5% discount on all white products",
                "isExclusive": false,
                "expirationDateTime": "2022-02-10 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/c9310692-2ab0-5edc-bb41-fee6aa828d55/cart-codes/sprykerku2f"
            }
        }
    ]
}
```
</details>

{% include pbc/all/glue-api-guides/{{page.version}}/guest-carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/guest-carts-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/guest-cart-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/guest-cart-items-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/bundle-items-bundled-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/bundle-items-bundled-items-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/vouchers-cart-rules-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/vouchers-cart-rules-response-attributes.md -->




## Possible errors

| CODE | REASON |
| --- | --- |
| 101 | Cart with given uuid not found. |
| 102 | Failed to add an item to cart. |
| 103 | Item with the given group key not found in the cart. |
| 104 | Cart uuid is missing. |
| 107 | Failed to create cart. |
| 109 | Anonymous customer unique id is empty. |
| 110 | Customer already has a cart. |
| 112 | Store data is invalid. |
| 113 | Cart item cannot be added. |
| 115 | Unauthorized cart action. |
| 116 | Currency is missing. |
| 117 | Currency is incorrect. |
| 118 | Price mode is missing. |
| 119 | Price mode is incorrect. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
