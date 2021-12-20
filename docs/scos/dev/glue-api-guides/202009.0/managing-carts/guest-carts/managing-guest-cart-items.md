---
title: Managing guest cart items
description: Retrieve details about guest cart items and learn what else you can do with the resource.
last_updated: Mar 23, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v6/docs/managing-guest-cart-items
originalArticleId: 7e529057-8ddd-4efb-81eb-62998399b78b
redirect_from:
  - /v6/docs/managing-guest-cart-items
  - /v6/docs/en/managing-guest-cart-items
related:
  - title: Managing guest carts
    link: docs/scos/dev/glue-api-guides/page.version/managing-carts/guest-carts/managing-guest-carts.html
  - title: Managing gift cards of guest users
    link: docs/scos/dev/glue-api-guides/page.version/managing-carts/guest-carts/managing-gift-cards-of-guest-users.html
---

This endpoint allows you to manage guest cart items.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-cart-feature-integration.html)
* [Glue API: Measurement Units feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-measurement-units-feature-integration.html)
* [Glue API: Promotions & Discounts feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-promotions-and-discounts-feature-integration.html)
* [Glue API: Product options feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-options-feature-integration.html)


## Add items to a guest cart

To add items to a guest cart, send the request:

***
`POST` **/guest-cart-items**
***

{% info_block infoBox "**Creating a guest cart**" %}


* If a guest cart does not exist for the current user, and you send a request to add items, the guest cart is created automatically. Otherwise, the items are added to the existing guest cart.
* Guest users have one cart by default. You can optionally specify its ID by using the following endpoint. The information in this section is valid for both endpoints.

`POST` **/guest-carts/*{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*/guest-cart-items**

| Path Parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*** | Unique identifier of the guest cart. To get it, [retrieve a guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#retrieve-a-guest-cart). |

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 |&check; | A guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |

| QUERY PARAMETER | DESCRIPTION | Possible values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>guest-cart-items</li><li>concrete-products</li><li>sales-units</li><li>cart-rules</li><li>vouchers</li><li>product-options</li><li>sales-units</li><li>product-measurement-units</li></ul> |
{% info_block infoBox "Included resources" %}

* To retrieve product options, include `guest-cart-items`, `concrete-products`, and `product-options`.
* To retrieve product measurement units, include `sales-units` and `product-measurement-units`.

{% endinfo_block %}

<details open>
<summary markdown='span'>Request sample</summary>

`POST https://glue.mysprykershop.com/guest-cart-items`

```json
{
    "data": {
        "type": "guest-cart-items",
        "attributes": {
            "sku": "022_21994751",
            "quantity": 1
        }
    }
}
```
</details>

<details open>
<summary markdown='span'>Request sample: adding a promotional item with the cart-rules relationship</summary>
{% info_block infoBox "**Cart rules**" %}


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

<details open>
<summary markdown='span'>Request sample: adding a gift card</summary>

`POST https://glue.mysprykershop.com/guest-cart-items`

```json
{
    "data": {
        "type": "guest-cart-items",
        "attributes": {
            "sku": "666_126",
            "quantity": "1"
        }
    }
}
```
</details>

<details open>
<summary markdown='span'>Request sample with product measurement units and sales units</summary>

`POST https://glue.mysprykershop.com/guest-cart-items?include=sales-units`

```json
{
    "data": {
        "type": "guest-cart-items",
        "attributes": {
            "sku": "cable-vga-1-2",
            "quantity": 3,
            "salesUnit": {
                "id": 33,
                "amount": 4.5
            }
        }
    }
}
```
</details>

<details open>
<summary markdown='span'>Request sample with cart rules</summary>

`POST https://glue.mysprykershop.com/guest-cart-items?include=cart-rules`

```json
{
    "data": {
        "type": "guest-cart-items",
        "attributes": {
            "sku": "077_24584210",
            "quantity": 10
        }
    }
}
```

</details>

<details open>
<summary markdown='span'>Request sample with vouchers</summary>

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




<details open>
<summary markdown='span'>Request sample with concrete products and product options</summary>

`POST https://glue.mysprykershop.com/guest-cart-items?include=guest-cart-items,concrete-products,product-options`

```json
{
    "data": {
        "type": "guest-cart-items",
        "attributes": {
            "sku": "181_31995510",
            "quantity": "4",
            "productOptions": [
            	{
            		"sku": "OP_gift_wrapping"
            	},
            	{
            		"sku": "OP_3_year_waranty"
            	}
            ]
        }
    }
}
```    
</details>

| Attribute | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| sku | String | &check; | Specifies the SKU part number of the item to place on the new guest cart. To use promotions, specify the SKU of one of a product being promoted. Concrete product SKU required. |
| quantity | Integer | &check; | Specifies the number of items to place on the guest cart. If you add a promotional item and the number of products exceeds the number of promotions, the exceeding items will be added without promotional benefits. |
| idPromotionalItem | String |  | Promotional item ID. You need to specify the ID to apply the promotion benefits. |
| salesUnit | Object |  | List of attributes defining the sales unit to be used for item amount calculation. |
| salesUnit.id | Integer |  | Unique identifier of the sales units to calculate the item amount in. |
| salesUnit.amount | Decimal |  | Amount of the product in the defined sales units. |    
| productOptions | Array |  | List of attributes defining the product option to add to the cart. |
| productOptions.sku | String |  | Unique identifier of the product option to add to the cart.  |


{% info_block infoBox "Conversion" %}


When defining product amount in sales units, make sure that the correlation between amount and quantity corresponds to the conversion of the defined sales unit. See [Measurement Units Feature Overview](/docs/scos/user/features/{{page.version}}/measurement-units-feature-overview.html) to learn more.

{% endinfo_block %}

{% info_block infoBox "Product options" %}

It is the responsibility of the API Client to track whether the selected items are compatible. For example, the client should not allow a 2-year and a 4-year warranty service to be applied to the same product. The API endpoints allow any combination of items, no matter whether they are compatible or not.

{% endinfo_block %}

### Response

<details open>
<summary markdown='span'>Response sample</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "380e4a19-6faa-5053-89ff-81a1b5a3dd8a",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Shopping cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 2600,
                "taxTotal": 3736,
                "subtotal": 26000,
                "grandTotal": 23400
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 2600,
                    "code": null
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/380e4a19-6faa-5053-89ff-81a1b5a3dd8a"
        }
    },
    "included": [
        {
            "type": "guest-cart-items",
            "id": "022_21994751",
            "attributes": {
                "sku": "022_21994751",
                "quantity": 1,
                "groupKey": "022_21994751",
                "abstractSku": "022",
                "amount": null,
                "calculations": {
                    "unitPrice": 26000,
                    "sumPrice": 26000,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 26000,
                    "sumGrossPrice": 26000,
                    "unitTaxAmountFullAggregation": 3736,
                    "sumTaxAmountFullAggregation": 3736,
                    "sumSubtotalAggregation": 26000,
                    "unitSubtotalAggregation": 26000,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 2600,
                    "sumDiscountAmountAggregation": 2600,
                    "unitDiscountAmountFullAggregation": 2600,
                    "sumDiscountAmountFullAggregation": 2600,
                    "unitPriceToPayAggregation": 23400,
                    "sumPriceToPayAggregation": 23400
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/380e4a19-6faa-5053-89ff-81a1b5a3dd8a/guest-cart-items/022_21994751"
            }
        }
    ]
}
```
</details>

<details open>
    <summary markdown='span'>Response sample: adding a promotional item without the cart-rules relationship</summary>

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
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
        }
    }
}
```

</details>



<details open>
<summary markdown='span'>Response sample: adding a promotional item with the cart-rules relationship</summary>

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
            ]
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



<details open>
<summary markdown='span'>Response sample: adding a gift cart</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "1bbcf8c0-30dc-5d40-9da1-db5289f216fa",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Shopping cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 5345,
                "taxTotal": 7680,
                "subtotal": 56446,
                "grandTotal": 51101,
                "priceToPay": 51101
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 5345,
                    "code": null
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa"
        }
    },
    "included": [
        {
            "type": "guest-cart-items",
            "id": "666_126",
            "attributes": {
                "sku": "666_126",
                "quantity": "1",
                "groupKey": "666_126",
                "abstractSku": "666",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 3000,
                    "sumPrice": 3000,
                    "taxRate": 0,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 3000,
                    "sumGrossPrice": 3000,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "sumSubtotalAggregation": 3000,
                    "unitSubtotalAggregation": 3000,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 3000,
                    "sumPriceToPayAggregation": 3000
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa/guest-cart-items/666_126"
            }
        },
        {
            "type": "guest-cart-items",
            "id": "023_21758366",
            "attributes": {
                "sku": "023_21758366",
                "quantity": "2",
                "groupKey": "023_21758366",
                "abstractSku": "023",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 26723,
                    "sumPrice": 53446,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 26723,
                    "sumGrossPrice": 53446,
                    "unitTaxAmountFullAggregation": 3840,
                    "sumTaxAmountFullAggregation": 7680,
                    "sumSubtotalAggregation": 53446,
                    "unitSubtotalAggregation": 26723,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 2673,
                    "sumDiscountAmountAggregation": 5345,
                    "unitDiscountAmountFullAggregation": 2673,
                    "sumDiscountAmountFullAggregation": 5345,
                    "unitPriceToPayAggregation": 24050,
                    "sumPriceToPayAggregation": 48101
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa/guest-cart-items/023_21758366"
            }
        }
    ]
}
```
</details>


<details open>
    <summary markdown='span'>Response sample with concrete products and product options</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "7e42298e-9f15-5105-a192-96726a2b9da8",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Shopping cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 13301,
                "taxTotal": 20711,
                "subtotal": 143012,
                "grandTotal": 129711,
                "priceToPay": 129711
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 13301,
                    "code": null
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/7e42298e-9f15-5105-a192-96726a2b9da8"
        },
        "relationships": {
            "guest-cart-items": {
                "data": [
                    {
                        "type": "guest-cart-items",
                        "id": "181_31995510-3-5"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-options",
            "id": "OP_1_year_waranty",
            "attributes": {
                "optionGroupName": "Warranty",
                "sku": "OP_1_year_waranty",
                "optionName": "One (1) year limited warranty",
                "price": 0,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_1_year_waranty"
            }
        },
        {
            "type": "product-options",
            "id": "OP_2_year_waranty",
            "attributes": {
                "optionGroupName": "Warranty",
                "sku": "OP_2_year_waranty",
                "optionName": "Two (2) year limited warranty",
                "price": 1000,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_2_year_waranty"
            }
        },
        {
            "type": "product-options",
            "id": "OP_3_year_waranty",
            "attributes": {
                "optionGroupName": "Warranty",
                "sku": "OP_3_year_waranty",
                "optionName": "Three (3) year limited warranty",
                "price": 2000,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_3_year_waranty"
            }
        },
        {
            "type": "product-options",
            "id": "OP_insurance",
            "attributes": {
                "optionGroupName": "Insurance",
                "sku": "OP_insurance",
                "optionName": "Two (2) year insurance coverage",
                "price": 10000,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_insurance"
            }
        },
        {
            "type": "product-options",
            "id": "OP_gift_wrapping",
            "attributes": {
                "optionGroupName": "Gift wrapping",
                "sku": "OP_gift_wrapping",
                "optionName": "Gift wrapping",
                "price": 500,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_gift_wrapping"
            }
        },
        {
            "type": "concrete-products",
            "id": "181_31995510",
            "attributes": {
                "sku": "181_31995510",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "181",
                "name": "Samsung Galaxy Tab S2 SM-T813",
                "description": "Enjoy greater flexibility  ...than ever before with the Galaxy Tab S2. Remarkably slim and ultra-lightweight, use this device to take your e-books, photos, videos and work-related files with you wherever you need to go. The Galaxy Tab S2’s 4:3 ratio display is optimised for magazine reading and web use. Switch to Reading Mode to adjust screen brightness and change wallpaper - create an ideal eBook reading environment designed to reduce the strain on your eyes. Get greater security with convenient and accurate fingerprint functionality. Activate fingerprint lock by pressing the home button. Use fingerprint verification to restrict / allow access to your web browser, screen lock mode and your Samsung account.",
                "attributes": {
                    "internal_memory": "3 GB",
                    "processor_model": "APQ8076",
                    "digital_zoom": "4 x",
                    "storage_media": "flash",
                    "brand": "Samsung",
                    "color": "Pink"
                },
                "superAttributesDefinition": [
                    "internal_memory",
                    "storage_media",
                    "color"
                ],
                "metaTitle": "Samsung Galaxy Tab S2 SM-T813",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Enjoy greater flexibility  ...than ever before with the Galaxy Tab S2. Remarkably slim and ultra-lightweight, use this device to take your e-books, photos,",
                "attributeNames": {
                    "internal_memory": "Max internal memory",
                    "processor_model": "Processor model",
                    "digital_zoom": "Digital zoom",
                    "storage_media": "Storage media",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/181_31995510"
            },
            "relationships": {
                "product-options": {
                    "data": [
                        {
                            "type": "product-options",
                            "id": "OP_1_year_waranty"
                        },
                        {
                            "type": "product-options",
                            "id": "OP_2_year_waranty"
                        },
                        {
                            "type": "product-options",
                            "id": "OP_3_year_waranty"
                        },
                        {
                            "type": "product-options",
                            "id": "OP_insurance"
                        },
                        {
                            "type": "product-options",
                            "id": "OP_gift_wrapping"
                        }
                    ]
                }
            }
        },
        {
            "type": "guest-cart-items",
            "id": "181_31995510-3-5",
            "attributes": {
                "sku": "181_31995510",
                "quantity": "4",
                "groupKey": "181_31995510-3-5",
                "abstractSku": "181",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 33253,
                    "sumPrice": 133012,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 33253,
                    "sumGrossPrice": 133012,
                    "unitTaxAmountFullAggregation": 5177,
                    "sumTaxAmountFullAggregation": 20711,
                    "sumSubtotalAggregation": 143012,
                    "unitSubtotalAggregation": 35753,
                    "unitProductOptionPriceAggregation": 2500,
                    "sumProductOptionPriceAggregation": 10000,
                    "unitDiscountAmountAggregation": 3325,
                    "sumDiscountAmountAggregation": 13301,
                    "unitDiscountAmountFullAggregation": 3325,
                    "sumDiscountAmountFullAggregation": 13301,
                    "unitPriceToPayAggregation": 32428,
                    "sumPriceToPayAggregation": 129711
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "selectedProductOptions": [
                    {
                        "optionGroupName": "Gift wrapping",
                        "sku": "OP_gift_wrapping",
                        "optionName": "Gift wrapping",
                        "price": 2000
                    },
                    {
                        "optionGroupName": "Warranty",
                        "sku": "OP_3_year_waranty",
                        "optionName": "Three (3) year limited warranty",
                        "price": 8000
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/7e42298e-9f15-5105-a192-96726a2b9da8/guest-cart-items/181_31995510-3-5"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "181_31995510"
                        }
                    ]
                }
            }
        }
    ]
}
```

</details>

<details open>
<summary markdown='span'>Response sample with product measurement units and sales units</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "5b598c79-8024-50ec-b682-c0b219387294",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Shopping cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 0,
                "taxTotal": 1437,
                "subtotal": 9000,
                "grandTotal": 9000
            },
            "discounts": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/5b598c79-8024-50ec-b682-c0b219387294"
        }
    },
    "included": [
        {
            "type": "product-measurement-units",
            "id": "METR",
            "attributes": {
                "name": "Meter",
                "defaultPrecision": 100
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-measurement-units/METR"
            }
        },
        {
            "type": "sales-units",
            "id": "33",
            "attributes": {
                "conversion": 1,
                "precision": 100,
                "isDisplayed": true,
                "isDefault": true,
                "productMeasurementUnitCode": "METR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units/33"
            },
            "relationships": {
                "product-measurement-units": {
                    "data": [
                        {
                            "type": "product-measurement-units",
                            "id": "METR"
                        }
                    ]
                }
            }
        },
        {
            "type": "guest-cart-items",
            "id": "cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33",
            "attributes": {
                "sku": "cable-vga-1-2",
                "quantity": 6,
                "groupKey": "cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33",
                "abstractSku": "cable-vga-1",
                "amount": "9.0",
                "calculations": {
                    "unitPrice": 1500,
                    "sumPrice": 9000,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 1500,
                    "sumGrossPrice": 9000,
                    "unitTaxAmountFullAggregation": 239,
                    "sumTaxAmountFullAggregation": 1437,
                    "sumSubtotalAggregation": 9000,
                    "unitSubtotalAggregation": 1500,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 1500,
                    "sumPriceToPayAggregation": 9000
                },
                "salesUnit": {
                    "id": 33,
                    "amount": "9.0"
                },
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/5b598c79-8024-50ec-b682-c0b219387294/guest-cart-items/cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33"
            },
            "relationships": {
                "sales-units": {
                    "data": [
                        {
                            "type": "sales-units",
                            "id": "33"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

<details open>
    <summary markdown='span'>Response sample with cart rules</summary>

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
            ]
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

<details open>
    <summary markdown='span'>Response sample with vouchers</summary>

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
            ]
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


| Included resource | Attribute | Type | Type |
| --- | --- | --- | --- |
| guest-cart-items | sku | String | SKU of the product. |
| guest-cart-items | quantity | Integer | Quantity of the given product in the cart. |
| guest-cart-items | groupKey | String | Unique item identifier. The value is generated based on product parameters. |
| guest-cart-items | amount | Integer | Amount of the products in the cart. |
| guest-cart-items | unitPrice | Integer | Single item price without assuming is it net or gross. This value should be used everywhere a price is disabled. It allows switching the tax mode without side effects. |
| guest-cart-items | sumPrice | Integer | Sum of all items prices calculated. |
| guest-cart-items | taxRate | Integer | Current tax rate in per cent. |
| guest-cart-items | unitNetPrice | Integer | Single item net price. |
| guest-cart-items | sumNetPrice | Integer | Sum of all items' net price. |
| guest-cart-items | unitGrossPrice | Integer | Single item gross price. |
| guest-cart-items | sumGrossPrice | Integer | Sum of items gross price. |
| guest-cart-items | unitTaxAmountFullAggregation | Integer | Total tax amount for a given item with additions. |
| guest-cart-items | sumTaxAmountFullAggregation | Integer | Total tax amount for a given amount of items with additions. |
| guest-cart-items | sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| guest-cart-items | unitSubtotalAggregation | Integer | Subtotal for the given item. |
| guest-cart-items | unitProductOptionPriceAggregation | Integer | Item total product option price. |
| guest-cart-items | sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| guest-cart-items | unitDiscountAmountAggregation | Integer | Item total discount amount. |
| guest-cart-items | sumDiscountAmountAggregation | Integer | Sum Item total discount amount. |
| guest-cart-items | unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions. |
| guest-cart-items | sumDiscountAmountFullAggregation | Integer | Item total discount amount with additions. |
| guest-cart-items | unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| guest-cart-items | sumPriceToPayAggregation | Integer | Sum of the prices to pay (after discounts). |
| guest-cart-items | salesUnit | Object | List of attributes defining the sales unit to be used for item amount calculation. |
| guest-cart-items | salesUnit.id | Integer | Numeric value that defines the sales units to calculate the item amount in. |
| guest-cart-items | salesUnit.amount | Integer | Amount of product in the defined sales units. |
| guest-cart-items | selectedProductOptions | array | List of attributes describing the product options that were added to the cart with the product. |
| guest-cart-items | selectedProductOptions.optionGroupName | String | Name of the group to which the option belongs. |
| guest-cart-items | selectedProductOptions.sku | String | SKU of the product option. |
| guest-cart-items | selectedProductOptions.optionName | String | Product option name. |
| guest-cart-items | selectedProductOptions.price | Integer | Product option price in cents. |
| guest-cart-items | selectedProductOptions.currencyIsoCode | String | ISO 4217 code of the currency in which the product option price is specified. |
| product-options | optionGroupName | String | Name of the group to which the option belongs. |
| product-options | sku | String | SKU of the product option. |
| product-options | optionName | String | Product option name. |
| product-options | price | Integer | Product option price in cents. |
| product-options | currencyIsoCode | String | ISO 4217 code of the currency in which the product option price is specified. |
| vouchers, cart-rules | displayName | String | Discount name displayed on the Storefront. |
| vouchers, cart-rules | amount | Integer | Amount of the provided discount. |
| vouchers, cart-rules | code | String | Discount code. |
| vouchers, cart-rules | discountType | String | Discount type. |
| vouchers, cart-rules  | isExclusive | Boolean | Discount exclusivity. |
| vouchers, cart-rules | expirationDateTime | DateTimeUtc | Date and time on which the discount expires. |
| vouchers, cart-rules | discountPromotionAbstractSku | String | SKU of the products to which the discount applies. If the discount can be applied to any product, the value is `null`. |
| vouchers, cart-rules | discountPromotionQuantity | Integer | Specifies the amount of the product required to be able to apply the discount. If the minimum number is `0`, the value is `null`. |


For the attributes of the included resources, see:
* [Retrieve a guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#guest-cart-response-attributes)
* [Gift cards of guest users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-gift-cards-of-guest-users.html)
* [Retrieving concrete products](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/concrete-products/retrieving-concrete-products.html#concrete-products-response-attributes)
* [Retrieve an abstract product](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/abstract-products/retrieving-abstract-products.html#abstract-products-response-attributes)

## Change item quantity in a guest cart

To change item quantity, send the request:

***
`PATCH` **/guest-carts/*{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*/guest-cart-items/*{% raw %}{{{% endraw %}groupKey{% raw %}}}{% endraw %}***
***

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*** | Unique identifier of the guest cart in the system. To get it, [retrieve a guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#retrieve-a-guest-cart). |
| ***{% raw %}{{{% endraw %}groupKey{% raw %}}}{% endraw %}*** | Group key of the item. Usually, it is equal to the item’s SKU. To get it, [retrieve the guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#retrieve-a-guest-cart) with the guest cart items included. |

### Request


| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | A guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |


| QUERY PARAMETER | DESCRIPTION | Possible values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | guest-cart-items, concrete-products, product-options, sales-units, product-measurement-units |
{% info_block infoBox "Included resources" %}

* To retrieve product options, include `guest-cart-items`, `concrete-products`, and `product-options`.
* To retrieve product measurement units, include `sales-units` and `product-measurement units`

{% endinfo_block %}


<details open>
<summary markdown='span'>Sample request</summary>

`PATCH https://glue.mysprykershop.com/guest-carts/2506b65c-164b-5708-8530-94ed7082e802/guest-cart-items/177_25913296`    

```json
{
	"data": {
		"type": "guest-cart-items",
		"attributes": {
			"sku": "209_12554247",
			"quantity": 10
		}
	}
}
```
</details>


| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| sku | String |  | SKU of the item to be updated. |
| quantity | String | &check; | Quantity of the item to be set. |


For more request body examples, see [Add items to a guest cart](#add-items-to-a-guest-cart)

### Response

If the update is successful, the endpoint returns `RestCartsResponse` with the updated quantity. See [Add items to a guest cart](#add-items-to-a-guest-cart) for examples.

## Remove an item from a guest cart

To remove an item from a guest cart, send the request:

***
`DELETE` **/guest-carts/*{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}*/guest-cart-items/*{% raw %}{{{% endraw %}groupKey{% raw %}}}{% endraw %}***
***

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*** | Unique identifier of the guest cart in the system. To get it, [retrieve a guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#retrieve-a-guest-cart). |
| ***{% raw %}{{{% endraw %}groupKey{% raw %}}}{% endraw %}*** | Group key of the item. Usually, it is equal to the item’s SKU. To get it, [retrieve the guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#retrieve-a-guest-cart) with the guest cart items included. |

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | A hyphenated alphanumeric value that is the user's unique identifier. It is passed in the X-Anonymous-Customer-Unique-Id header when [creating a guest cart](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html#create-a-guest-cart). |

Request sample: `DELETE https://glue.mysprykershop.com/guest-carts/2506b65c-164b-5708-8530-94ed7082e802/guest-cart-items/177_25913296`

### Response

If the item is deleted successfully, the endpoint returns the "204 No Content" status code.

## Possible errors


| Code | Reason |
| --- | --- |
| 101 | Cart with given uuid not found. |
| 102 | Failed to add an item to cart. |
| 103 | Item with the given group key not found in the cart. |
| 104 | Cart uuid is missing. |
| 105 | Cart could not be deleted. |
| 106 | Cart item could not be deleted. |
| 107 | Failed to create cart. |
| 109 | Anonymous customer unique id is empty. |
| 110 | Customer already has a cart. |
| 111 | Can’t switch price mode when there are items in the cart. |
| 112 | Store data is invalid. |
| 113 | Cart item could not be added. |
| 114 | Cart item could not be updated. |
| 115 | Unauthorized cart action. |
| 116 | Currency is missing. |
| 117 | Currency is incorrect. |
| 118 | Price mode is missing. |
| 119 | Price mode is incorrect. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
