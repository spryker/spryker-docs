---
title: "Glue API: Manage items in carts of registered users"
description: Retrieve details about the items of the registered users' carts, and learn what else you can do with the resource.
last_updated: Jun 29, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-items-in-carts-of-registered-users
originalArticleId: 8dbe18a1-adef-48a8-9ea0-b496f13c5630
redirect_from:
  - /docs/scos/dev/glue-api-guides/202307.0/managing-carts/carts-of-registered-users/managing-items-in-carts-of-registered-users.html
  - /docs/pbc/all/cart-and-checkout/202307.0/base-shop/manage-using-glue-api/manage-carts-of-registered-users/manage-items-in-carts-of-registered-users.html
related:
  - title: Manage carts of registered users
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html
  - title: "Glue API: Manage gift cards of registered users"
    link: docs/pbc/all/gift-cards/page.version/manage-using-glue-api/glue-api-manage-gift-cards-of-registered-users.html
---

This endpoint allows you to manage items in the carts of registered users by adding, changing, and deleting them.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

* [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)
* [Install the Measurement Units Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-measurement-units-glue-api.html)
* [Install the Product Options Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-options-glue-api.html)
* [Install the Promotions & Discounts feature Glue API](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html)
* [Install the Product Bundles Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-bundles-glue-api.html)
* [Install the Product Bundle + Cart Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-bundle-cart-glue-api.html)
* [Install the Configurable Bundle Glue API](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-cart-glue-api.html)
* [Install the Configurable Bundle + Cart Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-cart-glue-api.html)
* [Install the Configurable Bundle + Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-product-glue-api.html)



## Add an item to a registered user's cart

To add items to a cart, send the request:

***
`POST` **carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*/items**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*** | Unique identifier of a cart. [Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html)) or [Retrieve a registered user's carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#retrieve-registered-users-carts) to get it. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | The alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUE |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>items</li><li>product-measurement-units</li><li>sales-units</li><li>cart-rules</li><li>vouchers</li><li>concrete-products</li><li>product-options</li><li>bundle-items</li><li>bundled-items</li><li>abstract-products</li></ul>|
{% info_block infoBox "Included resources" %}

To retrieve all the product options of the item in a cart, include `concrete-products` and `product-options`.

{% endinfo_block %}

<details>
<summary>Request sample</summary>

`POST https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a/items`
```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "066_23294028",
            "quantity": "3"
        }
    }
}
```
</details>


<details>
<summary>Request sample with product measurement units and sales units</summary>

`POST https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a/items?include=sales-units,product-measurement-units`

```json
{
    "data": {
        "type": "items",
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
<summary>Request sample with cart rules</summary>

`POST https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830/items?include=cart-rules`

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "077_24584210",
            "quantity": "10"
        }
    }
}
```
</details>

<details>
<summary>Request sample with vouchers</summary>

`POST https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830/items?include=vouchers`

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "066_23294028",
            "quantity": "1"
        }
    }
}
```
</details>

<details>
<summary>Request sample with a promotional item and cart rules</summary>

{% info_block infoBox "Cart rules" %}

To add the promotional product to the cart, make sure that the cart fulfills the cart rules for the promotional item.

{% endinfo_block %}

`POST https://glue.myspsrykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items?include=cart-rules`

```json
{
    "data": {
        "type": "items",
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
<summary>Request sample with concrete products and product options</summary>

`POST https://glue.mysprykershop.com/carts/8fc45eda-cddf-5fec-8291-e2e5f8014398/items?include=concrete-products,product-options`

```json
{
    "data": {
        "type": "items",
        "attributes": {
        	"sku": "181_31995510",
        	"quantity": 6,
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
<summary>Request sample with bundle items</summary>

`POST https://glue.mysprykershop.com/carts/bd873e3f-4670-523d-b5db-3492d2c0bee3/items?include=bundle-items` - retrieve the cart with the `bd873e3f-4670-523d-b5db-3492d2c0bee3` ID and the product bundles inside it.

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "214_123",
            "quantity": 1
        }
    }
}
```
</details>

<details>
<summary>Request sample with bundle items and bundled items</summary>

`POST https://glue.mysprykershop.com/carts/bd873e3f-4670-523d-b5db-3492d2c0bee3/items?include=bundle-items,bundled-items` - retrieve the cart with the `bd873e3f-4670-523d-b5db-3492d2c0bee3` ID, the product bundles inside it, and the products of the product bundles.

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "214_123",
            "quantity": 1
        }
    }
}
```
</details>

<details>
<summary>Request sample with bundle items, bundled items, concrete products, and abstract products</summary>

`POST https://glue.mysprykershop.com/carts/bd873e3f-4670-523d-b5db-3492d2c0bee3/items?include=bundle-items,bundled-items,concrete-products,abstract-products` - retrieve the cart with the `bd873e3f-4670-523d-b5db-3492d2c0bee3` ID. Retrieve the product bundles inside it, the products of the product bundles, and respective abstract and concrete products.

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "214_123",
            "quantity": 1
        }
    }
}
```
</details>

<details>
<summary>Request sample with the unfulfilled hard and soft minimum thresholds</summary>

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
<summary>Request sample with the unfulfilled hard maximum threshold</summary>

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
| sku | String | &check; | Specifies the SKU of the concrete product to add to the cart. |
| quantity | String | &check; | Specifies the number of items to place on the guest cart. If you add a promotional item and the number of products exceeds the number of promotions, the exceeding items will be added without promotional benefits. |
| salesUnit | Object |  | A list of attributes defining the sales unit to be used for item amount calculation. |
| salesUnit.id | Integer |  | The unique ID of the sales units to calculate the item amount in. |
| salesUnit.amount | Integer |  | The amount of the product in the defined sales units.  |
| idPromotionalItem | String |  | The promotional item ID. Specify the ID to apply the promotion benefits.  |
| productOptions | Array |  | A list of attributes defining the product option to add to the cart. |
| productOptions.sku | String |  | The unique ID of the product option to add to the cart.  |

{% info_block infoBox "Conversion" %}

When defining product amount in sales units, make sure that the correlation between amount and quantity corresponds to the conversion of the defined sales unit. See [Measurement Units feature overview](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/feature-overviews/measurement-units-feature-overview.html) to learn more.

{% endinfo_block %}

{% info_block infoBox "Product options" %}

It is the responsibility of the API Client to track whether the selected items are compatible. For example, the client should not allow a 2-year and a 4-year warranty service to be applied to the same product. The API endpoints allow any combination of items, no matter whether they are compatible or not.

{% endinfo_block %}

### Response

<details>
<summary>Response sample</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "61ab15e9-e24a-5dec-a1ef-fc333bd88b0a",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Christmas presents 1",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 0,
                "taxTotal": 18850,
                "subtotal": 118059,
                "grandTotal": 118059,
                "priceToPay": 118059
            },
            "discounts": [],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a"
        }
    }
}
```
</details>

<details>
<summary>Response sample with items, product measurement units, and sales units</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "482bdbd6-137f-5b58-bd1c-37f3fa735a16",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Black Friday Conf Bundle",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 3425,
                "taxTotal": 4921,
                "subtotal": 34247,
                "grandTotal": 30822
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 3425,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/482bdbd6-137f-5b58-bd1c-37f3fa735a16"
        }
    },
    "included": [
        {
            "type": "items",
            "id": "035_17360369",
            "attributes": {
                "sku": "035_17360369",
                "quantity": "1",
                "groupKey": "035_17360369",
                "abstractSku": "035",
                "amount": null,
                "calculations": {
                    "unitPrice": 29747,
                    "sumPrice": 29747,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 29747,
                    "sumGrossPrice": 29747,
                    "unitTaxAmountFullAggregation": 4275,
                    "sumTaxAmountFullAggregation": 4275,
                    "sumSubtotalAggregation": 29747,
                    "unitSubtotalAggregation": 29747,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 2975,
                    "sumDiscountAmountAggregation": 2975,
                    "unitDiscountAmountFullAggregation": 2975,
                    "sumDiscountAmountFullAggregation": 2975,
                    "unitPriceToPayAggregation": 26772,
                    "sumPriceToPayAggregation": 26772
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/482bdbd6-137f-5b58-bd1c-37f3fa735a16/items/035_17360369"
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
            }
        },
        {
            "type": "items",
            "id": "cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33",
            "attributes": {
                "sku": "cable-vga-1-2",
                "quantity": 3,
                "groupKey": "cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33",
                "abstractSku": "cable-vga-1",
                "amount": "4.5",
                "calculations": {
                    "unitPrice": 1500,
                    "sumPrice": 4500,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 1500,
                    "sumGrossPrice": 4500,
                    "unitTaxAmountFullAggregation": 215,
                    "sumTaxAmountFullAggregation": 646,
                    "sumSubtotalAggregation": 4500,
                    "unitSubtotalAggregation": 1500,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 150,
                    "sumDiscountAmountAggregation": 450,
                    "unitDiscountAmountFullAggregation": 150,
                    "sumDiscountAmountFullAggregation": 450,
                    "unitPriceToPayAggregation": 1350,
                    "sumPriceToPayAggregation": 4050
                },
                "salesUnit": {
                    "id": 33,
                    "amount": "4.5"
                },
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/482bdbd6-137f-5b58-bd1c-37f3fa735a16/items/cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33"
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
<summary>Response sample with cart rules</summary>

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
            "self": "https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830"
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
                "amount": 14554,
                "code": null,
                "discountType": "cart_rule",
                "displayName": "10% Discount for all orders above",
                "isExclusive": false,
                "expirationDateTime": "2021-02-27 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cart-rules/1"
            }
        },
        {
            "type": "items",
            "id": "077_24584210",
            "attributes": {
                "sku": "077_24584210",
                "quantity": "10",
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
                "self": "https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830/items/077_24584210"
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
            "self": "https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830"
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
        },
        {
            "type": "items",
            "id": "077_24584210",
            "attributes": {
                "sku": "077_24584210",
                "quantity": "10",
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
                "self": "https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830/items/077_24584210"
            }
        },
        {
            "type": "items",
            "id": "066_23294028",
            "attributes": {
                "sku": "066_23294028",
                "quantity": "1",
                "groupKey": "066_23294028",
                "abstractSku": "066",
                "amount": null,
                "calculations": {
                    "unitPrice": 39353,
                    "sumPrice": 39353,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 39353,
                    "sumGrossPrice": 39353,
                    "unitTaxAmountFullAggregation": 5655,
                    "sumTaxAmountFullAggregation": 5655,
                    "sumSubtotalAggregation": 39353,
                    "unitSubtotalAggregation": 39353,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 3935,
                    "sumDiscountAmountAggregation": 3935,
                    "unitDiscountAmountFullAggregation": 3935,
                    "sumDiscountAmountFullAggregation": 3935,
                    "unitPriceToPayAggregation": 35418,
                    "sumPriceToPayAggregation": 35418
                },
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830/items/066_23294028"
            }
        }
    ]
}
```
</details>

<details>
<summary>Response sample: adding a promotional item without cart-rules relationship</summary>

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
            "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
        }
    }
}
```    
</details>

<details>
<summary>Response sample: adding a promotional item with cart-rules relationship</summary>

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
            "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
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
            "type": "items",
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
                "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items/134_29759322"
            }
        },
        {
            "type": "items",
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
                "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items/118_29804739"
            }
        },
        {
            "type": "items",
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
                "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items/139_24699831"
            }
        },
        {
            "type": "items",
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
                "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items/136_24425591"
            }
        },
        {
            "type": "items",
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
                "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items/112_306918001-promotion-1"
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
<summary>Response sample with concrete products and product options</summary>

```json
    {
    "data": {
        "type": "carts",
        "id": "8fc45eda-cddf-5fec-8291-e2e5f8014398",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Christmas presents",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 19952,
                "taxTotal": 31065,
                "subtotal": 214518,
                "grandTotal": 194566,
                "priceToPay": 194566
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 19952,
                    "code": null
                }
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/8fc45eda-cddf-5fec-8291-e2e5f8014398"
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
            "type": "items",
            "id": "181_31995510-3-5",
            "attributes": {
                "sku": "181_31995510",
                "quantity": 6,
                "groupKey": "181_31995510-3-5",
                "abstractSku": "181",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 33253,
                    "sumPrice": 199518,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 33253,
                    "sumGrossPrice": 199518,
                    "unitTaxAmountFullAggregation": 5177,
                    "sumTaxAmountFullAggregation": 31065,
                    "sumSubtotalAggregation": 214518,
                    "unitSubtotalAggregation": 35753,
                    "unitProductOptionPriceAggregation": 2500,
                    "sumProductOptionPriceAggregation": 15000,
                    "unitDiscountAmountAggregation": 3325,
                    "sumDiscountAmountAggregation": 19952,
                    "unitDiscountAmountFullAggregation": 3325,
                    "sumDiscountAmountFullAggregation": 19952,
                    "unitPriceToPayAggregation": 32428,
                    "sumPriceToPayAggregation": 194566
                },
                "salesUnit": null,
                "selectedProductOptions": [
                    {
                        "optionGroupName": "Gift wrapping",
                        "sku": "OP_gift_wrapping",
                        "optionName": "Gift wrapping",
                        "price": 3000
                    },
                    {
                        "optionGroupName": "Warranty",
                        "sku": "OP_3_year_waranty",
                        "optionName": "Three (3) year limited warranty",
                        "price": 12000
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/8fc45eda-cddf-5fec-8291-e2e5f8014398/items/181_31995510-3-5"
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
<summary>Response sample with bundle items</summary>

```json
{
    "data": {
        "type": "carts",
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
            "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a"
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
                "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a/items/214_123/"
            }
        }
    ]
}
```
</details>

<details>
<summary>Response sample with bundle items and bundled items</summary>

```json
{
    "data": {
        "type": "carts",
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
            "self": "https://glue.mysprykershop.com/carts/bd873e3f-4670-523d-b5db-3492d2c0bee3"
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
                "self": "https://glue.mysprykershop.com/carts/bd873e3f-4670-523d-b5db-3492d2c0bee3/items/214_123/"
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
<summary>Response sample with bundle items, bundled items, concrete products, and abstract products</summary>

```json
{
    "data": {
        "type": "carts",
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
            "self": "https://glue.mysprykershop.com/carts/bd873e3f-4670-523d-b5db-3492d2c0bee3"
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
                "self": "https://glue.mysprykershop.com/carts/bd873e3f-4670-523d-b5db-3492d2c0bee3/items/214_123/"
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
<summary>Response sample with the unfulfilled hard and soft minimum thresholds</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "308b51f4-2491-5bce-8cf2-436273b44f9b",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "New Year presents",
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
<summary>Response sample with the unfulfilled hard maximum threshold</summary>

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
                    "message": "You need to add items or €50 or less to pass a recommended threshold."
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

<a name="add-an-item-to-a-registered-users-cart-response-attributes"></a>

{% include pbc/all/glue-api-guides/202307.0/add-items-to-a-registered-users-cart-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202307.0/add-items-to-a-registered-users-cart-response-attributes.md -->


{% include pbc/all/glue-api-guides/202307.0/add-items-to-a-cart-of-registered-user-response-attributes-of-included-resources.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202307.0/add-items-to-a-cart-of-registered-user-response-attributes-of-included-resources.md -->

For the attributes of other included resources, see the following:

* [Retrieving Measurement Units](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-measurement-units.html)
* [Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#create-a-cart)
* [Retrieve a concrete product](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html#concrete-products-response-attributes)
* [Retrieve an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html#abstract-products-response-attributes)

## Add a configurable bundle to a registered user’s cart

To add a configurable bundle to a registered user’s cart, send the request:

***
`POST` **/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/configured-bundles**
***


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***cart_uuid*** | The unique ID of a cart. [Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#create-a-cart) or [Retrieve a registered user's carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#retrieve-registered-users-carts) to get it. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string |&check; | An alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

Request sample: `POST https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a/configured-bundles`

```json
{
    "data": {
        "type": "configured-bundles",
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


| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| quantity | Integer | &check; | The number of the configurable bundles to add. |
| templateUuid | String | &check; | The unique ID of the configurable bundle template. To get it, [retrieve all configurable bundle templates](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-configurable-bundle-templates.html#retrieve-all-configurable-bundle-templates). |
| sku | String | &check; | Specifies the SKU of a product to add to the cart. To use promotions, specify the SKU of a product being promoted. Concrete product SKU required. |
| quantity | Integer | &check; | Specifies the number of items to add to the guest cart. If you add a promotional item and the number of products exceeds the number of promotions, the exceeding items will be added without promotional benefits. |
| slotUuid | String | &check; | The unique ID of the slot in the configurable bundle. |

### Response

<details>
<summary>Response sample: add a configurable bundle</summary>

```json
{
    "data": {
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
            "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5fe35ab4d426b4.44302999-112_312526171"
                    },
                    {
                        "type": "items",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5fe35ab4d426b4.44302999-047_26408568"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "items",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5fe35ab4d426b4.44302999-112_312526171",
            "attributes": {
                "sku": "112_312526171",
                "quantity": 2,
                "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5fe35ab4d426b4.44302999-112_312526171",
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
                    "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5fe35ab4d426b4.44302999",
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
                "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a/items/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5fe35ab4d426b4.44302999-112_312526171"
            }
        },
        {
            "type": "items",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5fe35ab4d426b4.44302999-047_26408568",
            "attributes": {
                "sku": "047_26408568",
                "quantity": 2,
                "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5fe35ab4d426b4.44302999-047_26408568",
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
                    "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5fe35ab4d426b4.44302999",
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
                "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a/items/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5fe35ab4d426b4.44302999-047_26408568"
            }
        }
    ]
}
```    
</details>

For the attributes of the response sample, see [Add an item a to a registered user's cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html#add-an-item-to-a-registered-users-cart).


| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| configuredBundle | template | Object | Information about the template used for the configurable bundle. |
| configuredBundleItem | slot | Object | Information about the slot of the configurable bundle. |
| configuredBundle | name | String | The name of the configurable bundle. |
| configuredBundleItem | quantityPerSlot | Integer | The number of items that a slot may contain. |
| configuredBundle | quantity | Integer | Specifies the quantity of the configurable bundles. |
| configuredBundle | groupKey | String | The unique ID of the configurable bundle. The value is generated based on the configurable bundle template and items selected in the slot. |
| configuredBundle | uuid | String | The unique ID of the configurable bundle template in the system. |
| configuredBundleItem | uuid | String | The unique ID of the slot in the configurable bundle. |

## Change item quantity

To change the number of items in a cart, send the request:

***
`PATCH` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*/items/*{% raw %}{{{% endraw %}item_group_key{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***cart_uuid*** | Unique identifier of a cart. [Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#create-a-cart) or [Retrieve a registered user's carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#retrieve-registered-users-carts) to get it. |
| ***{% raw %}{{{% endraw %}itemgroupkey{% raw %}}}{% endraw %}*** | Group key of the item. Usually, it is equal to the item’s SKU. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |


Request sample:

`PATCH http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054/items/177_25913296`

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "quantity": 10
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| quantity | String | &check; | Specifies the new quantity of the items. |

### Response

<details>
<summary>Response sample</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "52493031-cccf-5ad2-9cc7-93d0f738303d",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "\"All in\" Conf Bundle",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 0,
                    "taxTotal": 718,
                    "subtotal": 4500,
                    "grandTotal": 4500
                },
                "discounts": [],
                "thresholds": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/items?include=items,concrete-products,cart-permission-groups"
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "cable-vga-1-2",
            "attributes": {
                "sku": "cable-vga-1-2",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "VGA cable as long as you want",
                "description": "Screw-in VGA cable with 15-pin male input and output.<p>Supports resolutions at 800x600 (SVGA), 1024x768 (XGA), 1600x1200 (UXGA), 1080p (Full HD), 1920x1200 (WUXGA), and up for high resolution LCD and LED monitors.<p>The VGA cord engineered with molded strain relief connectors for durability, grip treads for easy plugging and unplugging, and finger-tightened screws for a secure connection.<p>Gold-plated connectors; 100% bare copper conductors.<p>Links VGA-equipped computer to any display with 15-pin VGA port.",
                "attributes": {
                    "packaging_unit": "As long as you want"
                },
                "superAttributesDefinition": [
                    "packaging_unit"
                ],
                "metaTitle": "",
                "metaKeywords": "",
                "metaDescription": "",
                "attributeNames": {
                    "packaging_unit": "Packaging unit"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/cable-vga-1-2"
            }
        },
        {
            "type": "items",
            "id": "cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33",
            "attributes": {
                "sku": "cable-vga-1-2",
                "quantity": 3,
                "groupKey": "cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33",
                "abstractSku": "cable-vga-1",
                "amount": "4.5",
                "calculations": {
                    "unitPrice": 1500,
                    "sumPrice": 4500,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 1500,
                    "sumGrossPrice": 4500,
                    "unitTaxAmountFullAggregation": 239,
                    "sumTaxAmountFullAggregation": 718,
                    "sumSubtotalAggregation": 4500,
                    "unitSubtotalAggregation": 1500,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 1500,
                    "sumPriceToPayAggregation": 4500
                },
                "salesUnit": {
                    "id": 33,
                    "amount": "4.5"
                },
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d/items/cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "cable-vga-1-2"
                        }
                    ]
                }
            }
        }
    ]
}
```    
</details>

For the attributes of the included resources, see [Retrieving Concrete Products](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html).

## Change quantity of configurable bundles in a registered user’s cart

To change quantity of configurable bundles in a registered user’s cart, send the request:

***
`PATCH` /carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/configured-bundles/{% raw %}{{{% endraw %}bundle_group_key{% raw %}}}{% endraw %}?include=items
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*** | A unique identifier of a cart.[ Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#create-a-cart) or [Retrieve a registered user's carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#retrieve-registered-users-carts) to get it. |
| ***{% raw %}{{{% endraw %}bundlegroupkey{% raw %}}}{% endraw %}*** | Group key of the configurable bundle. The value is generated based on the Configurable Bundle Template and items selected in the slot. You can get it when [adding the configurable bundle to a registered user’s cart](#add-a-configurable-bundle-to-a-registered-users-cart). |

### Request

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | String | &check; | An alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

Request sample:

`PATCH https://mysprykershop.com/carts/e68db76b-1c9b-5fb8-88db-6cbaf8faed76/configured-bundles/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff33dfe3418f6.24909526?include=items`

```json
{
    "data": {
        "type": "configured-bundles",
        "attributes": {
            "quantity": 2
        }
    }
}
```


| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| quantity | String | &check; | Specifies the new quantity of items. |

### Response

<details>
<summary>Response sample</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "e68db76b-1c9b-5fb8-88db-6cbaf8faed76",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Test cart",
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
            "self": "https://glue.mysprykershop.com/carts/e68db76b-1c9b-5fb8-88db-6cbaf8faed76"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff33dfe3418f6.24909526-112_312526171"
                    },
                    {
                        "type": "items",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff33dfe3418f6.24909526-047_26408568"
                    },
                    {
                        "type": "items",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff3410120ce68.46429593-112_312526171"
                    },
                    {
                        "type": "items",
                        "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff3410120ce68.46429593-047_26408568"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "items",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff33dfe3418f6.24909526-112_312526171",
            "attributes": {
                "sku": "112_312526171",
                "quantity": 4,
                "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff33dfe3418f6.24909526-112_312526171",
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
                    "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff33dfe3418f6.24909526",
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
                "self": "https://glue.mysprykershop.com/carts/e68db76b-1c9b-5fb8-88db-6cbaf8faed76/items/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff33dfe3418f6.24909526-112_312526171"
            }
        },
        {
            "type": "items",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff33dfe3418f6.24909526-047_26408568",
            "attributes": {
                "sku": "047_26408568",
                "quantity": 4,
                "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff33dfe3418f6.24909526-047_26408568",
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
                    "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff33dfe3418f6.24909526",
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
                "self": "https://glue.mysprykershop.com/carts/e68db76b-1c9b-5fb8-88db-6cbaf8faed76/items/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff33dfe3418f6.24909526-047_26408568"
            }
        },
        {
            "type": "items",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff3410120ce68.46429593-112_312526171",
            "attributes": {
                "sku": "112_312526171",
                "quantity": 2,
                "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff3410120ce68.46429593-112_312526171",
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
                    "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff3410120ce68.46429593",
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
                "self": "https://glue.mysprykershop.com/carts/e68db76b-1c9b-5fb8-88db-6cbaf8faed76/items/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff3410120ce68.46429593-112_312526171"
            }
        },
        {
            "type": "items",
            "id": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff3410120ce68.46429593-047_26408568",
            "attributes": {
                "sku": "047_26408568",
                "quantity": 2,
                "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff3410120ce68.46429593-047_26408568",
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
                    "groupKey": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff3410120ce68.46429593",
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
                "self": "https://glue.mysprykershop.com/carts/e68db76b-1c9b-5fb8-88db-6cbaf8faed76/items/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff3410120ce68.46429593-047_26408568"
            }
        }
    ]
}
```    
</details>

For the attribute descriptions, see [Add a configurable bundle to a registered user’s cart](#add-a-configurable-bundle-to-a-registered-users-cart)

## Remove items from a registered user's cart

To remove an item from a registered user's cart, send the request:

***
`DELETE` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*/items/*{% raw %}{{{% endraw %}item_group_key{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*** | Unique identifier of a cart. [Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#create-a-cart) or [Retrieve a registered user's carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#retrieve-registered-users-carts) to get it. |
| ***{% raw %}{{{% endraw %}itemgroupkey{% raw %}}}{% endraw %}*** | Group key of the item. Usually, it is equal to the item’s SKU. |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

Request sample: `DELETE http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054/items/177_25913296`

### Response

If the item is deleted successfully, the endpoint returns the `204 No Content` status code.

## Remove a configurable bundle from a registered user’s cart

To remove a configurable bundle from a registered user’s cart, send the request:

***
`DELETE` ***/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/configured-bundles/{% raw %}{{{% endraw %}bundle_group_key{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*** | Unique identifier of a cart. [Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#create-a-cart) or [Retrieve a registered user's carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#retrieve-registered-users-carts) to get it. |
| ***{% raw %}{{{% endraw %}bundle_group_key{% raw %}}}{% endraw %}*** | The group key of the configurable bundle. The value is generated based on the configurable bundle template and items selected in the slot. You can get it when [adding the configurable bundle to a registered user’s cart](#add-a-configurable-bundle-to-a-registered-users-cart). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

Request sample: `DELETE https://mysprykershop.com/carts/e68db76b-1c9b-5fb8-88db-6cbaf8faed76/configured-bundles/c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de-5ff33dfe3418f6.24909526`

### Response

If the item is deleted successfully, the endpoint returns the “204 No Content” status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is incorrect. |
| 002 | Access token is missing. |
| 003 | Failed to log in the user. |
| 101 | Cart with given uuid is not found. |
| 102 | Failed to add an item to a cart. |
| 103 | Item with the given group key is not found in the cart. |
| 104 | Cart uuid is missing. |
| 105 | Cart cannot be deleted. |
| 106 | Cart item cannot be deleted. |
| 107 | Failed to create a cart. |
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
