---
title: "Glue API: Manage guest cart items"
description: Retrieve details about guest cart items and learn what else you can do with the resource.
last_updated: Jun 29, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-guest-cart-items
originalArticleId: 55c07d5d-006b-4f81-99b1-92c6a8124688
redirect_from:
  - /docs/scos/dev/glue-api-guides/202307.0/managing-carts/guest-carts/managing-guest-cart-items.html
  - /docs/pbc/all/cart-and-checkout/202307.0/base-shop/manage-using-glue-api/manage-guest-carts/manage-guest-cart-items.html
related:
  - title: Manage guest carts
    link: docs/pbc/all/cart-and-checkout/page.version/marketplace/manage-using-glue-api/guest-carts/manage-guest-carts.html
  - title: Managing gift cards of guest users
    link: docs/pbc/all/gift-cards/page.version/manage-using-glue-api/glue-api-manage-gift-cards-of-guest-users.html
---

This endpoint allows you to manage guest cart items.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)
* [Install the Measurement Units Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-measurement-units-glue-api.html)
* [Install the Promotions & Discounts feature Glue API](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html)
* [Install the Product Options Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-options-glue-api.html)
* [Glue API: Product Bundles feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-bundles-glue-api.html)
* [Install the Product Bundle + Cart Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-bundle-cart-glue-api.html)
* [Install the Configurable Bundle Glue API](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-cart-glue-api.html)
* [Install the Configurable Bundle + Cart Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-cart-glue-api.html)
* [Install the Configurable Bundle + Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-product-glue-api.html)


## Add items to a guest cart

To add items to a guest cart, send the request:

***
`POST` **/guest-cart-items**
***

{% info_block infoBox "Creating a guest cart" %}

* If a guest cart does not exist for the current user, and you send a request to add items, the guest cart is created automatically. Otherwise, the items are added to the existing guest cart.
* Guest users have one cart by default. You can optionally specify its ID by using the following endpoint. The information in this section is valid for both endpoints.

`POST` **/guest-carts/*{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*/guest-cart-items**

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*** | Unique identifier of the guest cart. To get it, [retrieve a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart). |

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 |&check; | A guest user's unique ID. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>guest-cart-items</li><li>concrete-products</li><li>sales-units</li><li>cart-rules</li><li>vouchers</li><li>product-options</li><li>sales-units</li><li>product-measurement-units</li><li>bundle-items</li><li>bundled-items</li><li>abstract-products</li></ul> |
{% info_block infoBox "Included resources" %}

* To retrieve product options, include `guest-cart-items`, `concrete-products`, and `product-options`.
* To retrieve product measurement units, include `sales-units` and `product-measurement-units`.

{% endinfo_block %}

<details>
<summary markdown='span'>Request sample: add items to a guest cart</summary>

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

<details>
<summary markdown='span'>Request sample: add a promotional item with the cart-rules relationship to a guest cart</summary>

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
<summary markdown='span'>Request sample: add a gift card to a guest cart</summary>

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

<details>
<summary markdown='span'>Request sample: add items with product measurement units and sales units to a guest cart</summary>

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

<details>
<summary markdown='span'>Request sample: add items with cart rules to a guest cart</summary>

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

<details>
<summary markdown='span'>Request sample: add items with vouchers to a guest cart</summary>

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


<details>
<summary markdown='span'>Request sample: add items with product options to a guest cart</summary>

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

<details>
<summary markdown='span'>Request sample: add bundle items to a guest cart</summary>

`POST https://glue.mysprykershop.com/guest-carts/bd873e3f-4670-523d-b5db-3492d2c0bee3/guest-cart-items?include=bundle-items`

```json
{
    "data": {
        "type": "guest-cart-items",
        "attributes": {
            "sku": "214_123",
            "quantity": 1
        }
    }
}
```
</details>


<details>
<summary markdown='span'>Request sample: add bundle items to a guest cart including the information about the items of the product bundle</summary>


`POST https://glue.mysprykershop.com/guest-carts/bd873e3f-4670-523d-b5db-3492d2c0bee3/guest-cart-items?include=bundle-items,bundled-items`

```json
{
    "data": {
        "type": "guest-cart-items",
        "attributes": {
            "sku": "214_123",
            "quantity": 1
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Request sample: add bundle items to a guest cart including the information about the concrete and abstract products of the product bundle</summary>

`POST https://glue.mysprykershop.com/guest-carts/bd873e3f-4670-523d-b5db-3492d2c0bee3/guest-cart-items?include=bundle-items,bundled-items,concrete-products,abstract-products`

```json
{
    "data": {
        "type": "guest-cart-items",
        "attributes": {
            "sku": "214_123",
            "quantity": 1
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Request sample: add items to a guest cart with the unfulfilled hard and soft minimum thresholds</summary>

`POST https://glue.mysprykershop.com/carts/308b51f4-2491-5bce-8cf2-436273b44f9b/items`

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "118_29804739",
            "quantity": 1
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Request sample: add items to a guest cart with the unfulfilled hard maximum threshold</summary>

`POST https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items`


```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "136_24425591",
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
| idPromotionalItem | String |  | The promotional item's ID. You need to specify the ID to apply the promotion's benefits. |
| salesUnit | Object |  | A list of attributes defining the sales unit to be used for item amount calculation. |
| salesUnit.id | Integer |  | The unique ID of the sales units to calculate the item amount in. |
| salesUnit.amount | Decimal |  | The amount of the product in the defined sales units. |    
| productOptions | Array |  | A list of attributes defining the product option to add to the cart. |
| productOptions.sku | String |  | The unique ID of the product option to add to the cart.  |

{% info_block infoBox "Conversion" %}

When defining product amount in sales units, make sure that the correlation between amount and quantity corresponds to the conversion of the defined sales unit. See [Measurement Units Feature Overview](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/feature-overviews/measurement-units-feature-overview.html) to learn more.

{% endinfo_block %}

{% info_block infoBox "Product options" %}

It is the responsibility of the API Client to track whether the selected items are compatible. For example, the client should not allow a 2-year and a 4-year warranty service to be applied to the same product. The API endpoints allow any combination of items, no matter whether they are compatible or not.

{% endinfo_block %}

### Response

<details>
<summary markdown='span'>Response sample: add items to a guest cart</summary>

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
            ],
            "thresholds": []
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

<details>
<summary markdown='span'>Response sample: add a promotional item with the cart-rules relationship to a guest cart</summary>

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
<summary markdown='span'>Response sample: add a promotional item with the cart-rules relationship</summary>

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
<summary markdown='span'>Response sample: add a gift card to a guest cart</summary>

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
            ],
            "thresholds": []
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


<details>
<summary markdown='span'>Response sample: add items with product options to a guest cart</summary>

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
            ],
            "thresholds": []
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

<details>
<summary markdown='span'>Response sample: add items with product measurement units and sales units to a guest cart</summary>

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
            "discounts": [],
            "thresholds": []
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


<details>
<summary markdown='span'>Response sample: add items with cart rules to a guest cart</summary>

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
<summary markdown='span'>Response sample: add items with vouchers to a guest cart</summary>

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


<details>
<summary markdown='span'>Response sample: add bundle items to a guest cart</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "bd873e3f-4670-523d-b5db-3492d2c0bee3",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "My Cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 9500,
                "taxTotal": 8257,
                "subtotal": 95000,
                "grandTotal": 85500,
                "priceToPay": 85500
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 9500,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a"
        },
        "relationships": {
            "bundle-items": {
                "data": [
                    {
                        "type": "bundle-items",
                        "id": "214_123"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "bundle-items",
            "id": "214_123",
            "attributes": {
                "sku": "214_123",
                "quantity": 1,
                "groupKey": "214_123",
                "abstractSku": "214",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 95000,
                    "sumPrice": 95000,
                    "taxRate": null,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 95000,
                    "sumGrossPrice": 95000,
                    "unitTaxAmountFullAggregation": null,
                    "sumTaxAmountFullAggregation": null,
                    "sumSubtotalAggregation": 95000,
                    "unitSubtotalAggregation": 95000,
                    "unitProductOptionPriceAggregation": null,
                    "sumProductOptionPriceAggregation": null,
                    "unitDiscountAmountAggregation": 9500,
                    "sumDiscountAmountAggregation": 9500,
                    "unitDiscountAmountFullAggregation": 9500,
                    "sumDiscountAmountFullAggregation": 9500,
                    "unitPriceToPayAggregation": 85500,
                    "sumPriceToPayAggregation": 85500
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a/guest-cart-items/214_123/"
            }
        }
    ]
}
```
</details>

<details>
<summary markdown='span'>Response sample: add bundle items to a guest cart including the information about the items of the product bundle</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "bd873e3f-4670-523d-b5db-3492d2c0bee3",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Christmas presents",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 9500,
                "taxTotal": 8257,
                "subtotal": 95000,
                "grandTotal": 85500,
                "priceToPay": 85500
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 9500,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/bd873e3f-4670-523d-b5db-3492d2c0bee3"
        },
        "relationships": {
            "bundle-items": {
                "data": [
                    {
                        "type": "bundle-items",
                        "id": "214_123"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "bundled-items",
            "id": "175_26935356_214_123_15f844eeb3eaaf1",
            "attributes": {
                "sku": "175_26935356",
                "quantity": 2,
                "groupKey": "175_26935356_214_123_15f844eeb3eaaf1",
                "abstractSku": "175",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 8900,
                    "sumPrice": 8900,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 8900,
                    "sumGrossPrice": 8900,
                    "unitTaxAmountFullAggregation": 1279,
                    "sumTaxAmountFullAggregation": 1279,
                    "sumSubtotalAggregation": 8900,
                    "unitSubtotalAggregation": 8900,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 890,
                    "sumDiscountAmountAggregation": 890,
                    "unitDiscountAmountFullAggregation": 890,
                    "sumDiscountAmountFullAggregation": 890,
                    "unitPriceToPayAggregation": 8010,
                    "sumPriceToPayAggregation": 8010
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/bundled-items/175_26935356_214_123_15f844eeb3eaaf1"
            }
        },
        {
            "type": "bundled-items",
            "id": "110_19682159_214_123_15f844eeb3eaaf1",
            "attributes": {
                "sku": "110_19682159",
                "quantity": 3,
                "groupKey": "110_19682159_214_123_15f844eeb3eaaf1",
                "abstractSku": "110",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 21200,
                    "sumPrice": 21200,
                    "taxRate": 7,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 21200,
                    "sumGrossPrice": 21200,
                    "unitTaxAmountFullAggregation": 1248,
                    "sumTaxAmountFullAggregation": 1248,
                    "sumSubtotalAggregation": 21200,
                    "unitSubtotalAggregation": 21200,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 2120,
                    "sumDiscountAmountAggregation": 2120,
                    "unitDiscountAmountFullAggregation": 2120,
                    "sumDiscountAmountFullAggregation": 2120,
                    "unitPriceToPayAggregation": 19080,
                    "sumPriceToPayAggregation": 19080
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/bundled-items/110_19682159_214_123_15f844eeb3eaaf1"
            }
        },
        {
            "type": "bundled-items",
            "id": "067_24241408_214_123_15f844eeb3eaaf1",
            "attributes": {
                "sku": "067_24241408",
                "quantity": 1,
                "groupKey": "067_24241408_214_123_15f844eeb3eaaf1",
                "abstractSku": "067",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 13600,
                    "sumPrice": 13600,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 13600,
                    "sumGrossPrice": 13600,
                    "unitTaxAmountFullAggregation": 1955,
                    "sumTaxAmountFullAggregation": 1955,
                    "sumSubtotalAggregation": 13600,
                    "unitSubtotalAggregation": 13600,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 1360,
                    "sumDiscountAmountAggregation": 1360,
                    "unitDiscountAmountFullAggregation": 1360,
                    "sumDiscountAmountFullAggregation": 1360,
                    "unitPriceToPayAggregation": 12240,
                    "sumPriceToPayAggregation": 12240
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/bundled-items/067_24241408_214_123_15f844eeb3eaaf1"
            }
        },
        {
            "type": "bundle-items",
            "id": "214_123",
            "attributes": {
                "sku": "214_123",
                "quantity": 1,
                "groupKey": "214_123",
                "abstractSku": "214",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 95000,
                    "sumPrice": 95000,
                    "taxRate": null,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 95000,
                    "sumGrossPrice": 95000,
                    "unitTaxAmountFullAggregation": null,
                    "sumTaxAmountFullAggregation": null,
                    "sumSubtotalAggregation": 95000,
                    "unitSubtotalAggregation": 95000,
                    "unitProductOptionPriceAggregation": null,
                    "sumProductOptionPriceAggregation": null,
                    "unitDiscountAmountAggregation": 9500,
                    "sumDiscountAmountAggregation": 9500,
                    "unitDiscountAmountFullAggregation": 9500,
                    "sumDiscountAmountFullAggregation": 9500,
                    "unitPriceToPayAggregation": 85500,
                    "sumPriceToPayAggregation": 85500
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/bd873e3f-4670-523d-b5db-3492d2c0bee3/guest-cart-items/214_123/"
            },
            "relationships": {
                "bundled-items": {
                    "data": [
                        {
                            "type": "bundled-items",
                            "id": "175_26935356_214_123_15f844eeb3eaaf1"
                        },
                        {
                            "type": "bundled-items",
                            "id": "110_19682159_214_123_15f844eeb3eaaf1"
                        },
                        {
                            "type": "bundled-items",
                            "id": "067_24241408_214_123_15f844eeb3eaaf1"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

<details>
<summary markdown='span'>Response sample: add bundle items to a guest cart including the information about the concrete and abstract products of the product bundle</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "bd873e3f-4670-523d-b5db-3492d2c0bee3",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Christmas presents",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 9500,
                "taxTotal": 8257,
                "subtotal": 95000,
                "grandTotal": 85500,
                "priceToPay": 85500
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 9500,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/bd873e3f-4670-523d-b5db-3492d2c0bee3"
        },
        "relationships": {
            "bundle-items": {
                "data": [
                    {
                        "type": "bundle-items",
                        "id": "214_123"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "175_26564922",
            "attributes": {
                "sku": "175_26564922",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "175",
                "name": "Samsung Galaxy Tab A SM-T550N 16 GB",
                "description": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through your photos while browsing online. Check social media and your social calendar at the same time. With Multi Window™ on the Galaxy Tab A, you can do more, faster. Kids Mode gives parents peace of mind while providing a colorful, engaging place for kids to play. Easily manage what your kids access and how long they spend using it, all while keeping your own documents private. Available for free from Samsung Galaxy Essentials™, Kids Mode keeps your content—and more importantly, your kids— safe and secure. Connecting your Samsung devices is easier than ever. With Samsung SideSync 3.0 and Quick Connect™, you can share content and work effortlessly between your Samsung tablet, smartphone and personal computer.",
                "attributes": {
                    "digital_zoom": "4 x",
                    "video_recording_modes": "720p",
                    "display_technology": "PLS",
                    "brand": "Samsung",
                    "color": "Black",
                    "internal_storage_capacity": "16 GB"
                },
                "superAttributesDefinition": [
                    "color",
                    "internal_storage_capacity"
                ],
                "metaTitle": "Samsung Galaxy Tab A SM-T550N 16 GB",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through you",
                "attributeNames": {
                    "digital_zoom": "Digital zoom",
                    "video_recording_modes": "Video recording modes",
                    "display_technology": "Display technology",
                    "brand": "Brand",
                    "color": "Color",
                    "internal_storage_capacity": "Internal storage capacity"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/175_26564922"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "175"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "175_26935356",
            "attributes": {
                "sku": "175_26935356",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "175",
                "name": "Samsung Galaxy Tab A SM-T550N 32 GB",
                "description": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through your photos while browsing online. Check social media and your social calendar at the same time. With Multi Window™ on the Galaxy Tab A, you can do more, faster. Kids Mode gives parents peace of mind while providing a colorful, engaging place for kids to play. Easily manage what your kids access and how long they spend using it, all while keeping your own documents private. Available for free from Samsung Galaxy Essentials™, Kids Mode keeps your content—and more importantly, your kids— safe and secure. Connecting your Samsung devices is easier than ever. With Samsung SideSync 3.0 and Quick Connect™, you can share content and work effortlessly between your Samsung tablet, smartphone and personal computer.",
                "attributes": {
                    "digital_zoom": "4 x",
                    "video_recording_modes": "720p",
                    "display_technology": "PLS",
                    "brand": "Samsung",
                    "color": "Black",
                    "internal_storage_capacity": "32 GB"
                },
                "superAttributesDefinition": [
                    "color",
                    "internal_storage_capacity"
                ],
                "metaTitle": "Samsung Galaxy Tab A SM-T550N 16 GB",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through you",
                "attributeNames": {
                    "digital_zoom": "Digital zoom",
                    "video_recording_modes": "Video recording modes",
                    "display_technology": "Display technology",
                    "brand": "Brand",
                    "color": "Color",
                    "internal_storage_capacity": "Internal storage capacity"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/175_26935356"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "175"
                        }
                    ]
                }
            }
        },
        {
            "type": "abstract-products",
            "id": "175",
            "attributes": {
                "sku": "175",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Samsung Galaxy Tab A SM-T550N 16 GB",
                "description": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through your photos while browsing online. Check social media and your social calendar at the same time. With Multi Window™ on the Galaxy Tab A, you can do more, faster. Kids Mode gives parents peace of mind while providing a colorful, engaging place for kids to play. Easily manage what your kids access and how long they spend using it, all while keeping your own documents private. Available for free from Samsung Galaxy Essentials™, Kids Mode keeps your content—and more importantly, your kids— safe and secure. Connecting your Samsung devices is easier than ever. With Samsung SideSync 3.0 and Quick Connect™, you can share content and work effortlessly between your Samsung tablet, smartphone and personal computer.",
                "attributes": {
                    "digital_zoom": "4 x",
                    "video_recording_modes": "720p",
                    "display_technology": "PLS",
                    "brand": "Samsung",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": {
                    "internal_storage_capacity": [
                        "32 GB",
                        "16 GB"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "175_26564922",
                        "175_26935356"
                    ],
                    "super_attributes": {
                        "internal_storage_capacity": [
                            "32 GB",
                            "16 GB"
                        ]
                    },
                    "attribute_variants": {
                        "internal_storage_capacity:32 GB": {
                            "id_product_concrete": "175_26935356"
                        },
                        "internal_storage_capacity:16 GB": {
                            "id_product_concrete": "175_26564922"
                        }
                    }
                },
                "metaTitle": "Samsung Galaxy Tab A SM-T550N 16 GB",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Do Two Things at Once Make the most out of your tablet time with advanced multitasking tools. Easily open two apps side by side so you can flip through you",
                "attributeNames": {
                    "digital_zoom": "Digital zoom",
                    "video_recording_modes": "Video recording modes",
                    "display_technology": "Display technology",
                    "brand": "Brand",
                    "color": "Color",
                    "internal_storage_capacity": "Internal storage capacity"
                },
                "url": "/en/samsung-galaxy-tab-a-sm-t550n-16-gb-175"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/175"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "175_26935356"
                        },
                        {
                            "type": "concrete-products",
                            "id": "175_26564922"
                        }
                    ]
                }
            }
        },
        {
            "type": "bundled-items",
            "id": "175_26935356_214_123_15f84504a21cb51",
            "attributes": {
                "sku": "175_26935356",
                "quantity": 2,
                "groupKey": "175_26935356_214_123_15f84504a21cb51",
                "abstractSku": "175",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 8900,
                    "sumPrice": 8900,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 8900,
                    "sumGrossPrice": 8900,
                    "unitTaxAmountFullAggregation": 1279,
                    "sumTaxAmountFullAggregation": 1279,
                    "sumSubtotalAggregation": 8900,
                    "unitSubtotalAggregation": 8900,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 890,
                    "sumDiscountAmountAggregation": 890,
                    "unitDiscountAmountFullAggregation": 890,
                    "sumDiscountAmountFullAggregation": 890,
                    "unitPriceToPayAggregation": 8010,
                    "sumPriceToPayAggregation": 8010
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/bundled-items/175_26935356_214_123_15f84504a21cb51"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "175_26935356"
                        }
                    ]
                }
            }
        },
        {
            "type": "abstract-products",
            "id": "110",
            "attributes": {
                "sku": "110",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Samsung Galaxy Gear",
                "description": "Voice Operation With Samsung's latest groundbreaking innovation, the Galaxy Gear, it's clear that time's up on the traditional watch. It features the smart technology you love and the functionality that you still need, and is the perfect companion to the new Galaxy Note 3.",
                "attributes": {
                    "processor_frequency": "800 MHz",
                    "bluetooth_version": "4",
                    "weight": "25.9 oz",
                    "battery_life": "120 h",
                    "brand": "Samsung",
                    "color": "Yellow"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Black"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "110_19682159"
                    ],
                    "super_attributes": {
                        "color": [
                            "Black"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Samsung Galaxy Gear",
                "metaKeywords": "Samsung,Smart Electronics",
                "metaDescription": "Voice Operation With Samsung's latest groundbreaking innovation, the Galaxy Gear, it's clear that time's up on the traditional watch. It features the smart",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "bluetooth_version": "Blootooth version",
                    "weight": "Weight",
                    "battery_life": "Battery life",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/samsung-galaxy-gear-110"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/110"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "110_19682159"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "110_19682159",
            "attributes": {
                "sku": "110_19682159",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "110",
                "name": "Samsung Galaxy Gear",
                "description": "Voice Operation With Samsung's latest groundbreaking innovation, the Galaxy Gear, it's clear that time's up on the traditional watch. It features the smart technology you love and the functionality that you still need, and is the perfect companion to the new Galaxy Note 3.",
                "attributes": {
                    "processor_frequency": "800 MHz",
                    "bluetooth_version": "4",
                    "weight": "25.9 oz",
                    "battery_life": "120 h",
                    "brand": "Samsung",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "color"
                ],
                "metaTitle": "Samsung Galaxy Gear",
                "metaKeywords": "Samsung,Smart Electronics",
                "metaDescription": "Voice Operation With Samsung's latest groundbreaking innovation, the Galaxy Gear, it's clear that time's up on the traditional watch. It features the smart",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "bluetooth_version": "Blootooth version",
                    "weight": "Weight",
                    "battery_life": "Battery life",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/110_19682159"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "110"
                        }
                    ]
                }
            }
        },
        {
            "type": "bundled-items",
            "id": "110_19682159_214_123_15f84504a21cb51",
            "attributes": {
                "sku": "110_19682159",
                "quantity": 3,
                "groupKey": "110_19682159_214_123_15f84504a21cb51",
                "abstractSku": "110",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 21200,
                    "sumPrice": 21200,
                    "taxRate": 7,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 21200,
                    "sumGrossPrice": 21200,
                    "unitTaxAmountFullAggregation": 1248,
                    "sumTaxAmountFullAggregation": 1248,
                    "sumSubtotalAggregation": 21200,
                    "unitSubtotalAggregation": 21200,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 2120,
                    "sumDiscountAmountAggregation": 2120,
                    "unitDiscountAmountFullAggregation": 2120,
                    "sumDiscountAmountFullAggregation": 2120,
                    "unitPriceToPayAggregation": 19080,
                    "sumPriceToPayAggregation": 19080
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/bundled-items/110_19682159_214_123_15f84504a21cb51"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "110_19682159"
                        }
                    ]
                }
            }
        },
        {
            "type": "abstract-products",
            "id": "067",
            "attributes": {
                "sku": "067",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Samsung Galaxy S5 mini",
                "description": "Galaxy S5 mini continues Samsung design legacy and flagship experience Outfitted with a 4.5-inch HD Super AMOLED display, the Galaxy S5 mini delivers a wide and vivid viewing experience, and its compact size provides users with additional comfort, allowing for easy operation with only one hand. Like the Galaxy S5, the Galaxy S5 mini features a unique perforated pattern on the back cover creating a modern and sleek look, along with a premium, soft touch grip. The Galaxy S5 mini enables users to enjoy the same flagship experience as the Galaxy S5 with innovative features including IP67 certification, Ultra Power Saving Mode, a heart rate monitor, fingerprint scanner, and connectivity with the latest Samsung wearable devices.The Galaxy S5 mini comes equipped with a powerful Quad Core 1.4 GHz processor and 1.5GM RAM for seamless multi-tasking, faster webpage loading, softer UI transition, and quick power up. The high-resolution 8MP camera delivers crisp and clear photos and videos, while the Galaxy S5 mini’s support of LTE Category 4 provides users with ultra-fast downloads of movies and games on-the-go.    ",
                "attributes": {
                    "display_diagonal": "44.8 in",
                    "themes": "Wallpapers",
                    "os_version": "4.4",
                    "internal_storage_capacity": "32 GB",
                    "brand": "Samsung",
                    "color": "Gold"
                },
                "superAttributesDefinition": [
                    "internal_storage_capacity",
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Gold"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "067_24241408"
                    ],
                    "super_attributes": {
                        "color": [
                            "Gold"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Samsung Galaxy S5 mini",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Galaxy S5 mini continues Samsung design legacy and flagship experience Outfitted with a 4.5-inch HD Super AMOLED display, the Galaxy S5 mini delivers a wid",
                "attributeNames": {
                    "display_diagonal": "Display diagonal",
                    "themes": "Themes",
                    "os_version": "OS version",
                    "internal_storage_capacity": "Internal storage capacity",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/samsung-galaxy-s5-mini-67"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/067"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "067_24241408"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "067_24241408",
            "attributes": {
                "sku": "067_24241408",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "067",
                "name": "Samsung Galaxy S5 mini",
                "description": "Galaxy S5 mini continues Samsung design legacy and flagship experience Outfitted with a 4.5-inch HD Super AMOLED display, the Galaxy S5 mini delivers a wide and vivid viewing experience, and its compact size provides users with additional comfort, allowing for easy operation with only one hand. Like the Galaxy S5, the Galaxy S5 mini features a unique perforated pattern on the back cover creating a modern and sleek look, along with a premium, soft touch grip. The Galaxy S5 mini enables users to enjoy the same flagship experience as the Galaxy S5 with innovative features including IP67 certification, Ultra Power Saving Mode, a heart rate monitor, fingerprint scanner, and connectivity with the latest Samsung wearable devices.The Galaxy S5 mini comes equipped with a powerful Quad Core 1.4 GHz processor and 1.5GM RAM for seamless multi-tasking, faster webpage loading, softer UI transition, and quick power up. The high-resolution 8MP camera delivers crisp and clear photos and videos, while the Galaxy S5 mini’s support of LTE Category 4 provides users with ultra-fast downloads of movies and games on-the-go.",
                "attributes": {
                    "display_diagonal": "44.8 in",
                    "themes": "Wallpapers",
                    "os_version": "4.4",
                    "internal_storage_capacity": "32 GB",
                    "brand": "Samsung",
                    "color": "Gold"
                },
                "superAttributesDefinition": [
                    "internal_storage_capacity",
                    "color"
                ],
                "metaTitle": "Samsung Galaxy S5 mini",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Galaxy S5 mini continues Samsung design legacy and flagship experience Outfitted with a 4.5-inch HD Super AMOLED display, the Galaxy S5 mini delivers a wid",
                "attributeNames": {
                    "display_diagonal": "Display diagonal",
                    "themes": "Themes",
                    "os_version": "OS version",
                    "internal_storage_capacity": "Internal storage capacity",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/067_24241408"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "067"
                        }
                    ]
                }
            }
        },
        {
            "type": "bundled-items",
            "id": "067_24241408_214_123_15f84504a21cb51",
            "attributes": {
                "sku": "067_24241408",
                "quantity": 1,
                "groupKey": "067_24241408_214_123_15f84504a21cb51",
                "abstractSku": "067",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 13600,
                    "sumPrice": 13600,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 13600,
                    "sumGrossPrice": 13600,
                    "unitTaxAmountFullAggregation": 1955,
                    "sumTaxAmountFullAggregation": 1955,
                    "sumSubtotalAggregation": 13600,
                    "unitSubtotalAggregation": 13600,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 1360,
                    "sumDiscountAmountAggregation": 1360,
                    "unitDiscountAmountFullAggregation": 1360,
                    "sumDiscountAmountFullAggregation": 1360,
                    "unitPriceToPayAggregation": 12240,
                    "sumPriceToPayAggregation": 12240
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/bundled-items/067_24241408_214_123_15f84504a21cb51"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "067_24241408"
                        }
                    ]
                }
            }
        },
        {
            "type": "abstract-products",
            "id": "214",
            "attributes": {
                "sku": "214",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Samsung Bundle",
                "description": "This is a unique product bundle featuring various Samsung products.",
                "attributes": {
                    "brand": "Samsung",
                    "bundled_product": "Yes"
                },
                "superAttributesDefinition": [],
                "superAttributes": [],
                "attributeMap": {
                    "product_concrete_ids": [
                        "214_123"
                    ],
                    "super_attributes": [],
                    "attribute_variants": []
                },
                "metaTitle": "Samsung Bundle",
                "metaKeywords": "Samsung,Smart Electronics, Bundle",
                "metaDescription": "Ideal for extreme sports and outdoor enthusiasts Exmor R™ CMOS sensor with enhanced sensitivity always gets the shot: Mountain-biking downhill at breakneck",
                "attributeNames": {
                    "brand": "Brand",
                    "bundled_product": "Bundled Product"
                },
                "url": "/en/samsung-bundle-214"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/214"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "214_123"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "214_123",
            "attributes": {
                "sku": "214_123",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "214",
                "name": "Samsung Bundle",
                "description": "This is a unique product bundle featuring various Samsung products. Items in this bundle are 2 x Samsung Galaxy Tab A SM-T550N 32 GB, 3 x Samsung Galaxy Gear, and 1 x Samsung Galaxy S5 mini",
                "attributes": {
                    "brand": "Samsung",
                    "bundled_product": "Yes"
                },
                "superAttributesDefinition": [],
                "metaTitle": "Samsung Bundle",
                "metaKeywords": "Samsung,Smart Electronics, Bundle",
                "metaDescription": "Ideal for extreme sports and outdoor enthusiasts Exmor R™ CMOS sensor with enhanced sensitivity always gets the shot: Mountain-biking downhill at breakneck",
                "attributeNames": {
                    "brand": "Brand",
                    "bundled_product": "Bundled Product"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/214_123"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "214"
                        }
                    ]
                }
            }
        },
        {
            "type": "bundle-items",
            "id": "214_123",
            "attributes": {
                "sku": "214_123",
                "quantity": 1,
                "groupKey": "214_123",
                "abstractSku": "214",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 95000,
                    "sumPrice": 95000,
                    "taxRate": null,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 95000,
                    "sumGrossPrice": 95000,
                    "unitTaxAmountFullAggregation": null,
                    "sumTaxAmountFullAggregation": null,
                    "sumSubtotalAggregation": 95000,
                    "unitSubtotalAggregation": 95000,
                    "unitProductOptionPriceAggregation": null,
                    "sumProductOptionPriceAggregation": null,
                    "unitDiscountAmountAggregation": 9500,
                    "sumDiscountAmountAggregation": 9500,
                    "unitDiscountAmountFullAggregation": 9500,
                    "sumDiscountAmountFullAggregation": 9500,
                    "unitPriceToPayAggregation": 85500,
                    "sumPriceToPayAggregation": 85500
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/bd873e3f-4670-523d-b5db-3492d2c0bee3/guest-cart-items/214_123/"
            },
            "relationships": {
                "bundled-items": {
                    "data": [
                        {
                            "type": "bundled-items",
                            "id": "175_26935356_214_123_15f84504a21cb51"
                        },
                        {
                            "type": "bundled-items",
                            "id": "110_19682159_214_123_15f84504a21cb51"
                        },
                        {
                            "type": "bundled-items",
                            "id": "067_24241408_214_123_15f84504a21cb51"
                        }
                    ]
                },
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "214_123"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

<details>
<summary markdown='span'>Response sample: add items to a guest cart with the unfulfilled hard and soft minimum thresholds</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "308b51f4-2491-5bce-8cf2-436273b44f9b",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Shopping Cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 5000,
                "discountTotal": 0,
                "taxTotal": 1350,
                "subtotal": 9454,
                "grandTotal": 14454,
                "priceToPay": 14454
            },
            "discounts": [],
            "thresholds": [
                {
                    "type": "hard-minimum-threshold",
                    "threshold": 20000,
                    "fee": null,
                    "deltaWithSubtotal": 10546,
                    "message": "You need to add items for €200.00 to pass a recommended threshold. Otherwise, €50 fee will be added."
                },
                {
                    "type": "soft-minimum-threshold-fixed-fee",
                    "threshold": 100000,
                    "fee": 5000,
                    "deltaWithSubtotal": 90546,
                    "message": "You need to add items for €1,000.00 to pass a recommended threshold. Otherwise, €50.00 fee will be added."
                },
            ]
        },
        "links": {
            "self": "https://glue.de.69-new.demo-spryker.com/carts/308b51f4-2491-5bce-8cf2-436273b44f9b"
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Response sample: add items to a guest cart with the unfulfilled hard maximum threshold</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Shopping Cart",
            "isDefault": false,
            "totals": {
                "expenseTotal": 5000,
                "discountTotal": 0,
                "taxTotal": 11976,
                "subtotal": 70007,
                "grandTotal": 75007,
                "priceToPay": 75007
            },
            "discounts": [],
            "thresholds": [
                {
                    "type": "hard-maximum-threshold",
                    "threshold": 5000,
                    "fee": null,
                    "deltaWithSubtotal": 65007,
                    "message": "You need to add items or €50.00 or less to pass a recommended threshold."
                }
            ]
        },
        "links": {
            "self": "https://glue.de.69-new.demo-spryker.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
        }
    }
}
```
</details>

{% include pbc/all/glue-api-guides/202307.0/add-items-to-a-guest-cart-response-attributes-of-included-resources.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202307.0/add-items-to-a-guest-cart-response-attributes-of-included-resources.md -->


For the attributes of other included resources, see the following:
* [Threshold attributes](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html#threshold-attributes).
* [Retrieve a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#guest-cart-response-attributes)
* [Gift cards of guest users](/docs/pbc/all/gift-cards/{{site.version}}/manage-using-glue-api/glue-api-manage-gift-cards-of-guest-users.html)
* [Glue API: Retrieving concrete products](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html#concrete-products-response-attributes)
* [Retrieve an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html#abstract-products-response-attributes)
*  [Retrieving bundled products](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-bundled-products.html)

## Add a configurable bundle to a guest cart

To add a configurable bundle to a guest cart, send the request:

***
`POST` **/guest-configurable-bundles?include=items**
***
### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | A guest user's unique ID. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |

<details>
<summary markdown='span'>Request sample: add a configurable bundle to a guest cart</summary>

`POST https://glue.mysprykershop.com/guest-configurable-bundles?include=items`    

```json
{
    "data": {
        "type": "guest-configurable-bundles",
        "attributes": {
            "quantity": 2,
            "templateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
            "items": [
                {
                    "sku": "112_312526171",
                    "quantity": 2,
                    "slotUuid": "9626de80-6caa-57a9-a683-2846ec5b6914"
                },
                {
                    "sku": "047_26408568",
                    "quantity": 2,
                    "slotUuid": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                }
            ]
        }
    }
}
```
</details>


| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| quantity | Integer | &check; | Number of the configurable bundles to add. |
| templateUuid | 	
String | &check; | The unique ID of the [Configurable Bundle Template](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-configurable-bundle-templates.html). To get it, retrieve all Configurable Bundle Templates. |
| sku | String | &check; | Specifies the SKU of a product to add to the cart. To use promotions, specify the SKU of a product being promoted. Concrete product SKU required. |
| quantity | Integer | &check; | Specifies the number of items to add to the guest cart. If you add a promotional item and the number of products exceeds the number of promotions, the exceeding items will be added without promotional benefits. |
| slotUuid | String | &check; | The unique ID of the slot in the configurable bundle. |

### Response

<details>
<summary markdown='span'>Response sample: add a configurable bundle to a guest cart</summary>

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
                "discountTotal": 0,
                "taxTotal": 1828,
                "subtotal": 98894,
                "grandTotal": 98894,
                "priceToPay": 98894
            },
            "discounts": [],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-112_312526171"
                    },
                    {
                        "type": "items",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-047_26408568"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "items",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-112_312526171",
            "attributes": {
                "sku": "112_312526171",
                "quantity": 2,
                "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-112_312526171",
                "abstractSku": "112",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 43723,
                    "sumPrice": 87446,
                    "taxRate": 0,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 43723,
                    "sumGrossPrice": 87446,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "sumSubtotalAggregation": 87446,
                    "unitSubtotalAggregation": 43723,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 43723,
                    "sumPriceToPayAggregation": 87446
                },
                "configuredBundle": {
                    "quantity": 2,
                    "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530",
                    "template": {
                        "uuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit"
                    }
                },
                "configuredBundleItem": {
                    "quantityPerSlot": 1,
                    "slot": {
                        "uuid": "9626de80-6caa-57a9-a683-2846ec5b6914"
                    }
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa/items/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-112_312526171"
            }
        },
        {
            "type": "items",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-047_26408568",
            "attributes": {
                "sku": "047_26408568",
                "quantity": 2,
                "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-047_26408568",
                "abstractSku": "047",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 5724,
                    "sumPrice": 11448,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 5724,
                    "sumGrossPrice": 11448,
                    "unitTaxAmountFullAggregation": 914,
                    "sumTaxAmountFullAggregation": 1828,
                    "sumSubtotalAggregation": 11448,
                    "unitSubtotalAggregation": 5724,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 5724,
                    "sumPriceToPayAggregation": 11448
                },
                "configuredBundle": {
                    "quantity": 2,
                    "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530",
                    "template": {
                        "uuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit"
                    }
                },
                "configuredBundleItem": {
                    "quantityPerSlot": 1,
                    "slot": {
                        "uuid": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                    }
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa/items/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-047_26408568"
            }
        }
    ]
}
```
</details>

For the attributes of the response sample, see [Add an item to a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-cart-items.html#add-items-to-a-guest-cart).


| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| configuredBundle | template | Object | Information about the template used for the configurable bundle. |
| configuredBundleItem | slot | Object | Information about the slot of the configurable bundle. |
| configuredBundle | name | String | Name of the configurable bundle. |
| configuredBundleItem | quantityPerSlot | Integer | Number of items that a slot may contain. |
| configuredBundle | quantity | Integer | Specifies the quantity of the configurable bundles. |
| configuredBundle | groupKey | String | Unique identifier of the configurable bundle. The value is generated based on the configurable bundle template and items selected in the slot. |
| configuredBundle | uuid | String | Unique identifier of the configurable bundle template in the system. |
| configuredBundleItem | uuid | String | Unique identifier of the slot in the configurable bundle. |

## Change item quantity in a guest cart

To change item quantity, send the request:

***
`PATCH` **/guest-carts/*{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*/guest-cart-items/*{% raw %}{{{% endraw %}groupKey{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*** | The unique ID of the guest cart in the system. To get it, [retrieve a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart). |
| ***{% raw %}{{{% endraw %}groupKey{% raw %}}}{% endraw %}*** | The group key of the item. Usually, it is equal to the item’s SKU. To get it, [retrieve the guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart) with the guest cart items included. |

### Request


| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | A hyphenated alphanumeric value that is the user's unique ID. It is passed in the X-Anonymous-Customer-Unique-Id header when [creating a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#create-a-guest-cart). |


| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | guest-cart-items, concrete-products, product-options, sales-units, product-measurement-units |
{% info_block infoBox "Included resources" %}

* To retrieve product options, include `guest-cart-items`, `concrete-products`, and `product-options`.
* To retrieve product measurement units, include `sales-units` and `product-measurement units`

{% endinfo_block %}


<details>
<summary markdown='span'>Request sample: change item quantity in a guest cart</summary>

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

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| sku | String |  | The SKU of the item to be updated. |
| quantity | String | &check; | The quantity of the item to be set. |

For more request body examples, see [Add items to a guest cart](#add-items-to-a-guest-cart)

### Response

If the update is successful, the endpoint returns `RestCartsResponse` with the updated quantity. See [Add items to a guest cart](#add-items-to-a-guest-cart) for examples.

## Change quantity of configurable bundles in a guest cart

To change the quantity of the configurable bundles in a guest cart, send the request:

***
`PATCH` **/guest-carts/{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}/guest-configured-bundles/{% raw %}{{{% endraw %}bundle_group_key{% raw %}}}{% endraw %}?include=items**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*** | Unique identifier of the guest cart in the system. To get it, [retrieve a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart). |
| ***{% raw %}{{{% endraw %}bundlegroupkey{% raw %}}}{% endraw %}*** | Group key of the configurable bundle. The value is generated based on the Configurable Bundle Template and items selected in the slot. You can get it when [adding the configurable bundle to a guest cart](#add-a-configurable-bundle-to-a-guest-cart). |

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | A hyphenated alphanumeric value that is the user's unique ID. It is passed in the X-Anonymous-Customer-Unique-Id header when [creating a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#create-a-guest-cart). |

Request sample: change quantity of configurable bundles in a guest cart

`PATCH https://glue.mysprykershop.com/guest-carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa/guest-configured-bundles/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530?include=items`
```json
{
    "data": {
        "type": "guest-configured-bundles",
        "attributes": {
            "quantity": 4
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| quantity | String | &check; | The quantity of the items to add. |

### Response

<details>
<summary markdown='span'>Response sample: change quantity of configurable bundles in a guest cart</summary>

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
                "discountTotal": 0,
                "taxTotal": 5483,
                "subtotal": 296682,
                "grandTotal": 296682,
                "priceToPay": 296682
            },
            "discounts": [],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-112_312526171"
                    },
                    {
                        "type": "items",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-047_26408568"
                    },
                    {
                        "type": "items",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-6011880fabc988.61063130-112_312526171"
                    },
                    {
                        "type": "items",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-6011880fabc988.61063130-047_26408568"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "items",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-112_312526171",
            "attributes": {
                "sku": "112_312526171",
                "quantity": 4,
                "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-112_312526171",
                "abstractSku": "112",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 43723,
                    "sumPrice": 174892,
                    "taxRate": 0,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 43723,
                    "sumGrossPrice": 174892,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "sumSubtotalAggregation": 174892,
                    "unitSubtotalAggregation": 43723,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 43723,
                    "sumPriceToPayAggregation": 174892
                },
                "configuredBundle": {
                    "quantity": 4,
                    "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530",
                    "template": {
                        "uuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit"
                    }
                },
                "configuredBundleItem": {
                    "quantityPerSlot": 1,
                    "slot": {
                        "uuid": "9626de80-6caa-57a9-a683-2846ec5b6914"
                    }
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa/items/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-112_312526171"
            }
        },
        {
            "type": "items",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-047_26408568",
            "attributes": {
                "sku": "047_26408568",
                "quantity": 4,
                "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-047_26408568",
                "abstractSku": "047",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 5724,
                    "sumPrice": 22896,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 5724,
                    "sumGrossPrice": 22896,
                    "unitTaxAmountFullAggregation": 914,
                    "sumTaxAmountFullAggregation": 3656,
                    "sumSubtotalAggregation": 22896,
                    "unitSubtotalAggregation": 5724,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 5724,
                    "sumPriceToPayAggregation": 22896
                },
                "configuredBundle": {
                    "quantity": 4,
                    "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530",
                    "template": {
                        "uuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit"
                    }
                },
                "configuredBundleItem": {
                    "quantityPerSlot": 1,
                    "slot": {
                        "uuid": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                    }
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa/items/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530-047_26408568"
            }
        },
        {
            "type": "items",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-6011880fabc988.61063130-112_312526171",
            "attributes": {
                "sku": "112_312526171",
                "quantity": 2,
                "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-6011880fabc988.61063130-112_312526171",
                "abstractSku": "112",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 43723,
                    "sumPrice": 87446,
                    "taxRate": 0,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 43723,
                    "sumGrossPrice": 87446,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "sumSubtotalAggregation": 87446,
                    "unitSubtotalAggregation": 43723,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 43723,
                    "sumPriceToPayAggregation": 87446
                },
                "configuredBundle": {
                    "quantity": 2,
                    "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-6011880fabc988.61063130",
                    "template": {
                        "uuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit"
                    }
                },
                "configuredBundleItem": {
                    "quantityPerSlot": 1,
                    "slot": {
                        "uuid": "9626de80-6caa-57a9-a683-2846ec5b6914"
                    }
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa/items/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-6011880fabc988.61063130-112_312526171"
            }
        },
        {
            "type": "items",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-6011880fabc988.61063130-047_26408568",
            "attributes": {
                "sku": "047_26408568",
                "quantity": 2,
                "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-6011880fabc988.61063130-047_26408568",
                "abstractSku": "047",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 5724,
                    "sumPrice": 11448,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 5724,
                    "sumGrossPrice": 11448,
                    "unitTaxAmountFullAggregation": 914,
                    "sumTaxAmountFullAggregation": 1827,
                    "sumSubtotalAggregation": 11448,
                    "unitSubtotalAggregation": 5724,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 5724,
                    "sumPriceToPayAggregation": 11448
                },
                "configuredBundle": {
                    "quantity": 2,
                    "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-6011880fabc988.61063130",
                    "template": {
                        "uuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                        "name": "Smartstation Kit"
                    }
                },
                "configuredBundleItem": {
                    "quantityPerSlot": 1,
                    "slot": {
                        "uuid": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                    }
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa/items/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-6011880fabc988.61063130-047_26408568"
            }
        }
    ]
}
```
</details>

For the attribute descriptions, see [Manage guest cart items](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-cart-items.html).

## Remove an item from a guest cart

To remove an item from a guest cart, send the request:

***
`DELETE` **/guest-carts/*{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}*/guest-cart-items/*{% raw %}{{{% endraw %}groupKey{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*** | The unique ID of the guest cart in the system. To get it, [retrieve a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart). |
| ***{% raw %}{{{% endraw %}groupKey{% raw %}}}{% endraw %}*** | The group key of the item. Usually, it is equal to the item’s SKU. To get it, [retrieve the guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart) with the guest cart items included. |

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | A hyphenated alphanumeric value that is the user's unique ID. It is passed in the X-Anonymous-Customer-Unique-Id header when [creating a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#create-a-guest-cart). |

Request sample: remove an item from a guest cart

`DELETE https://glue.mysprykershop.com/guest-carts/2506b65c-164b-5708-8530-94ed7082e802/guest-cart-items/177_25913296`

### Response

If the item is deleted successfully, the endpoint returns the "204 No Content" status code.

## Remove a configurable bundle from a guest cart

To remove a configurable bundle from a guest cart, send the request:

***
`DELETE` **/guest-carts/{% raw %}{{{% endraw %}quest_cart_id{% raw %}}}{% endraw %}/guest-configured-bundles/{% raw %}{{{% endraw %}bundle_group_key{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}*** | The unique ID of the guest cart in the system. To get it, [retrieve a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart). |
| ***{% raw %}{{{% endraw %}bundlegroupkey{% raw %}}}{% endraw %}*** | The group key of the configurable bundle. The value is generated based on the Configurable Bundle Template and the items selected in the slot. You can get it when [adding the configurable bundle to a guest cart](#add-a-configurable-bundle-to-a-guest-cart). |

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | A hyphenated alphanumeric value that is the user's unique ID. It is passed in the X-Anonymous-Customer-Unique-Id header when [creating a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#create-a-guest-cart). |

Request sample: remove a configurable bundle from a guest cart

`DELETE https://glue.mysprykershop.com/guest-carts/1bbcf8c0-30dc-5d40-9da1-db5289f216fa/guest-configured-bundles/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-60118379365c56.34709530?include=items`

### Response

If the item is deleted successfully, the endpoint returns the “204 No Content” status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 101 | Cart with given uuid not found. |
| 102 | Failed to add an item to cart. |
| 103 | Item with the given group key not found in the cart. |
| 104 | Cart uuid is missing. |
| 105 | Cart cannot be deleted. |
| 106 | Cart item cannot be deleted. |
| 107 | Failed to create cart. |
| 109 | Anonymous customer unique id is empty. |
| 110 | Customer already has a cart. |
| 111 | Can’t switch price mode when there are items in the cart. |
| 112 | Store data is invalid. |
| 113 | Cart item cannot be added. |
| 114 | Cart item cannot be updated. |
| 115 | Unauthorized cart action. |
| 116 | Currency is missing. |
| 117 | Currency is incorrect. |
| 118 | Price mode is missing. |
| 119 | Price mode is incorrect. |
| 4001 | There was a problem adding or updating the configured bundle. |
| 4002 | Configurable bundle template is not found. |
| 4003 | The quantity of the configured bundle should be more than zero. |
| 4004 | Configured bundle with provided group key is not found in cart. |
| 4005 | The configured bundle cannot be added. |
| 4006 | The configured bundle cannot be updated. |
| 4007 | The configured bundle cannot be removed. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
