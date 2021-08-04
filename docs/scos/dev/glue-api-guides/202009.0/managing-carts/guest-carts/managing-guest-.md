---
title: Managing guest carts
originalLink: https://documentation.spryker.com/v6/docs/managing-guest-carts
redirect_from:
  - /v6/docs/managing-guest-carts
  - /v6/docs/en/managing-guest-carts
---

This endpoint allows to manage guest carts.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Cart feature integration](https://documentation.spryker.com/docs/glue-api-cart-feature-integration)
* [Glue API: Promotions & Discounts feature integration](https://documentation.spryker.com/docs/glue-api-promotions-discounts-feature-integration)
* [Glue API: Product options feature integration](https://documentation.spryker.com/docs/glue-product-options-feature-integration)
* [Glue API: Product Labels feature integration](https://documentation.spryker.com/docs/glue-api-product-labels-feature-integration)

## Create a guest cart

To create a guest cart as an unauthenticated user, [add items to a guest cart](https://documentation.spryker.com/docs/en/managing-guest-cart-items#add-items-to-a-guest-cart).

## Retrieve a guest cart

To retrieve a guest cart, send the request:

***
`GET` **/guest-carts**
***

{% info_block infoBox "**Guest cart ID**" %}


Guest users have one guest cart by default. If you already have a guest cart, you can optionally specify its ID when adding items. To do that, use the following endpoint. The information in this section is valid for both of the endpoints.

`GET` **/guest-carts/*{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}***

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}*** | Unique identifier of the guest cart. To get it, [retrieve a guest cart](#retrieve-a-guest-cart). |

{% endinfo_block %}

{% info_block warningBox "Note" %}

When retrieving the cart with `guestCartId`, the response includes a single object, and when retrieving the resource without specifying it, you get an array containing a single object.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE EXAMPLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | &check; | Guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value.|

| PATH PARAMETER | DESCRIPTION | Possible values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>guest-cart-items</li><li>cart-rules</li><li>promotional-items</li><li>gift-cards</li><li>vouchers</li><li>product-options</li><li>sales-units</li><li>product-measurement-units</li><li>product-labels</li></ul>|

{% info_block infoBox "Included resources" %}

* To retrieve product options, include `guest-cart-items`, `concrete-products`, and `product-options`.
* To retrieve product measurement units, include `sales-units` and `product-measurement-units`.
* To retrieve product labels assigned to the products in a cart, include `concrete-products` and `product-labels`.

{% endinfo_block %}

| Request | Usage |
| --- | --- |
| `GET https://glue.mysprykershop.com/guest-carts` | Retrieve a guest cart. |
| `GET https://glue.mysprykershop.com/guest-carts?include=guest-cart-items` | Retrieve information about a guest cart with the concrete products included. |
| `GET https://glue.mysprykershop.com/guest-carts?include=cart-rules` | Retrieve a guest cart with information about the cart rules. |
| `GET https://glue.mysprykershop.com/guest-carts?include=gift-cards,vouchers` | Retrieve a guest cart with information about the gift cards applied. |
| `GET https://glue.mysprykershop.com/guest-carts?include=guest-cart-items,concrete-products,product-options` | Retrieve a guest cart with information about its items, respective concrete products, and product options of the concrete products. |
| `GET https://glue.mysprykershop.com/guest-carts?include=sales-units,product-measurement-units` | Retrieve a guest cart with information about its items, sales units, and product measurement units. |
| `GET https://glue.mysprykershop.com/guest-carts?include=vouchers` | Retrieve a guest cart with information about vouchers. |
| `GET https://glue.mysprykershop.com/guest-carts?include=concrete-products,product-labels` | Retrieve a guest cart with information about concrete products and the product labels assigned to the products in it. |



### Response

<details open>
<summary>Response sample</summary>

```json
{
    "data": [
        {
            "type": "guest-carts",
            "id": "f8782b6c-848d-595e-b3f7-57374f1ff6d7",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Shopping cart",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 10689,
                    "taxTotal": 15360,
                    "subtotal": 106892,
                    "grandTotal": 96203,
                    "priceToPay": 93203
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 10689,
                        "code": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/f8782b6c-848d-595e-b3f7-57374f1ff6d7"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/cart-codes"
    }
}
```
</details>


<details open>
<summary>Response sample with guest cart items</summary>

```json
{
    "data": [
        {
            "type": "guest-carts",
            "id": "f8782b6c-848d-595e-b3f7-57374f1ff6d7",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Shopping cart",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 10689,
                    "taxTotal": 15360,
                    "subtotal": 106892,
                    "grandTotal": 96203,
                    "priceToPay": 96203
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 10689,
                        "code": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/f8782b6c-848d-595e-b3f7-57374f1ff6d7"
            },
            "relationships": {
                "guest-cart-items": {
                    "data": [
                        {
                            "type": "guest-cart-items",
                            "id": "023_21758366"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/cart-codes?include=guest-cart-items"
    },
    "included": [
        {
            "type": "guest-cart-items",
            "id": "023_21758366",
            "attributes": {
                "sku": "023_21758366",
                "quantity": "4",
                "groupKey": "023_21758366",
                "abstractSku": "023",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 26723,
                    "sumPrice": 106892,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 26723,
                    "sumGrossPrice": 106892,
                    "unitTaxAmountFullAggregation": 3840,
                    "sumTaxAmountFullAggregation": 15360,
                    "sumSubtotalAggregation": 106892,
                    "unitSubtotalAggregation": 26723,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 2672,
                    "sumDiscountAmountAggregation": 10689,
                    "unitDiscountAmountFullAggregation": 2672,
                    "sumDiscountAmountFullAggregation": 10689,
                    "unitPriceToPayAggregation": 24051,
                    "sumPriceToPayAggregation": 96203
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/f8782b6c-848d-595e-b3f7-57374f1ff6d7/guest-cart-items/023_21758366"
            }
        }
    ]
}
```
</details>
   
    
<details open>
<summary>Response sample with cart rules</summary>

```json
{
    "data": [
        {
            "type": "guest-carts",
            "id": "f8782b6c-848d-595e-b3f7-57374f1ff6d7",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Shopping cart",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 10689,
                    "taxTotal": 15360,
                    "subtotal": 106892,
                    "grandTotal": 96203,
                    "priceToPay": 96203
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 10689,
                        "code": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/f8782b6c-848d-595e-b3f7-57374f1ff6d7"
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
        "self": "https://glue.mysprykershop.com/cart-codes?include=cart-rules"
    },
    "included": [
        {
            "type": "cart-rules",
            "id": "1",
            "attributes": {
                "amount": 10689,
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
<summary>Response sample with gift cards</summary>

```json
{
    "data": [
        {
            "type": "guest-carts",
            "id": "f8782b6c-848d-595e-b3f7-57374f1ff6d7",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Shopping cart",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 10689,
                    "taxTotal": 15360,
                    "subtotal": 106892,
                    "grandTotal": 96203,
                    "priceToPay": 93203
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 10689,
                        "code": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/f8782b6c-848d-595e-b3f7-57374f1ff6d7"
            },
            "relationships": {
                "gift-cards": {
                    "data": [
                        {
                            "type": "gift-cards",
                            "id": "GC-Z9FYJRK3-20"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/cart-codes?include=gift-cards"
    },
    "included": [
        {
            "type": "gift-cards",
            "id": "GC-Z9FYJRK3-20",
            "attributes": {
                "code": "GC-Z9FYJRK3-20",
                "name": "Gift Card 30",
                "value": 3000,
                "currencyIsoCode": "EUR",
                "actualValue": 3000,
                "isActive": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/f8782b6c-848d-595e-b3f7-57374f1ff6d7/cart-codes/GC-Z9FYJRK3-20"
            }
        }
    ]
}
```
</details>

<details open>
    <summary>Sample response with guest cart items, concrete products, and product options</summary>

```json
{
    "data": [
        {
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
                "self": "https://glue.mysprykershop.com.com/guest-carts/7e42298e-9f15-5105-a192-96726a2b9da8"
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
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com.com/guest-cart-items?include=guest-cart-items,concrete-products,product-options"
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
                "self": "https://glue.mysprykershop.com.com/concrete-products/181_31995510/product-options/OP_1_year_waranty"
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
                "self": "https://glue.mysprykershop.com.com/concrete-products/181_31995510/product-options/OP_2_year_waranty"
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
                "self": "https://glue.mysprykershop.com.com/concrete-products/181_31995510/product-options/OP_3_year_waranty"
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
                "self": "https://glue.mysprykershop.com.com/concrete-products/181_31995510/product-options/OP_insurance"
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
                "self": "https://glue.mysprykershop.com.com/concrete-products/181_31995510/product-options/OP_gift_wrapping"
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
                "self": "https://glue.mysprykershop.com.com/concrete-products/181_31995510"
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
                "self": "https://glue.mysprykershop.com.com/guest-carts/7e42298e-9f15-5105-a192-96726a2b9da8/guest-cart-items/181_31995510-3-5"
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
<summary>Response sample with guest cart items, sales units, and product measurement units</summary>

```json
{
    "data": [
        {
            "type": "guest-carts",
            "id": "5cc8c1ad-a12a-5a93-9c6e-fd4bc546c81c",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Shopping cart",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 0,
                    "taxTotal": 718,
                    "subtotal": 4500,
                    "grandTotal": 4500,
                    "priceToPay": 4500
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/5cc8c1ad-a12a-5a93-9c6e-fd4bc546c81c"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/guest-cart-items?include=sales-units,product-measurement-units"
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
                "quantity": 3,
                "groupKey": "cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33",
                "abstractSku": "cable-vga-1",
                "amount": "4.5",
                "productOfferReference": null,
                "merchantReference": null,
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
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": {
                    "id": 33,
                    "amount": "4.5"
                },
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/5cc8c1ad-a12a-5a93-9c6e-fd4bc546c81c/guest-cart-items/cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33"
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
<summary>Response sample with a cart rule and a discount voucher</summary>
    
```json
{
    "data": {
        "type": "guest-carts",
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

</details>

<details open>
<summary>Response sample with product labels</summary>
    
```json
{
    "data": [
        {
            "type": "guest-carts",
            "id": "4f3e67f7-f18c-55ad-8297-2e09b80cf3ff",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 0,
                    "taxTotal": 6244,
                    "subtotal": 39107,
                    "grandTotal": 39107,
                    "priceToPay": 39107
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/4f3e67f7-f18c-55ad-8297-2e09b80cf3ff"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/guest-cart-items?include=concrete-products,product-labels"
    },
    "included": [
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 3,
                "frontEndReference": "highlight"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-labels/5"
            }
        },
        {
            "type": "concrete-products",
            "id": "179_29658416",
            "attributes": {
                "sku": "179_29658416",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Samsung Galaxy Tab S2 SM-T715",
                "description": "Enjoy greater flexibility  ...than ever before with the Galaxy Tab S2. Remarkably slim and ultra-lightweight, use this device to take your e-books, photos, videos and work-related files with you wherever you need to go. The Galaxy Tab S2’s 4:3 ratio display is optimised for magazine reading and web use. Switch to Reading Mode to adjust screen brightness and change wallpaper - create an ideal eBook reading environment designed to reduce the strain on your eyes. Get greater security with convenient and accurate fingerprint functionality. Activate fingerprint lock by pressing the home button. Use fingerprint verification to restrict / allow access to your web browser, screen lock mode and your Samsung account.",
                "attributes": {
                    "storage_media": "flash",
                    "touch_technology": "Multi-touch",
                    "max_memory_card_size": "128 GB",
                    "internal_storage_capacity": "32 GB",
                    "brand": "Samsung",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "storage_media",
                    "internal_storage_capacity",
                    "color"
                ],
                "metaTitle": "Samsung Galaxy Tab S2 SM-T715",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Enjoy greater flexibility  ...than ever before with the Galaxy Tab S2. Remarkably slim and ultra-lightweight, use this device to take your e-books, photos,",
                "attributeNames": {
                    "storage_media": "Storage media",
                    "touch_technology": "Touch Technology",
                    "max_memory_card_size": "Max memory card size",
                    "internal_storage_capacity": "Internal storage capacity",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/179_29658416"
            },
            "relationships": {
                "product-labels": {
                    "data": [
                        {
                            "type": "product-labels",
                            "id": "5"
                        }
                    ]
                }
            }
        },
        {
            "type": "guest-cart-items",
            "id": "179_29658416",
            "attributes": {
                "sku": "179_29658416",
                "quantity": 1,
                "groupKey": "179_29658416",
                "abstractSku": "179",
                "amount": null,
                "calculations": {
                    "unitPrice": 39107,
                    "sumPrice": 39107,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 39107,
                    "sumGrossPrice": 39107,
                    "unitTaxAmountFullAggregation": 6244,
                    "sumTaxAmountFullAggregation": 6244,
                    "sumSubtotalAggregation": 39107,
                    "unitSubtotalAggregation": 39107,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 39107,
                    "sumPriceToPayAggregation": 39107
                },
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/4f3e67f7-f18c-55ad-8297-2e09b80cf3ff/guest-cart-items/179_29658416"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "179_29658416"
                        }
                    ]
                }
            }
        }
    ]
}
```

</details>

<a name="guest-cart-response-attributes"></a>

**General Cart Information**

| Attribute | TYPE | DESCRIPTION |
| --- | --- | --- |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected when the cart was created. |
| store | String | Store for which the cart was created. |
| name | String | Name of the shopping cart. |
| isDefault | Boolean | Defines whether the cart is default or not. |

**Totals Information**

| Attribute | TYPE | DESCRIPTION |
| --- | --- | --- |
| expenseTotal | String | Total amount of expenses (including e.g. shipping costs). |
| discountTotal | Integer | Total amount of discounts applied to the cart. |
| taxTotal | String | Total amount of taxes to be paid. |
| subTotal | Integer | Subtotal of the cart. |
| grandTotal | Integer | Grand total of the cart. |

**Discount Information**

| Attribute | TYPE | DESCRIPTION |
| --- | --- | --- |
| displayName | String | Discount name. |
| code | String | Discount code applied to the cart. |
| amount | Integer | Discount amount applied to the cart. |


| Included resource | Attribute | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
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


For the attributes of other included resources, see:
* [Managing guest cart items](https://documentation.spryker.com/docs/managing-guest-cart-items)
* [Retrieving measurement units](https://documentation.spryker.com/docs/retrieving-measurement-units)
* [Retrieving concrete products](https://documentation.spryker.com/docs/retrieving-concrete-products#concrete-products-response-attributes)
* [Gift Cards of Guest Users](https://documentation.spryker.com/docs/en/managing-gift-cards-of-guest-users)
* [Retrieve a measurement unit](https://documentation.spryker.com/docs/retrieving-measurement-units#measurement-units-response-attributes)
* [Retrieving product labels](https://documentation.spryker.com/docs/retrieving-product-labels#product-labels-response-attributes)

## Assign a guest cart to a registered customer

Guest carts are anonymous as they are not related to any user. If a user registers or logs in, the guest cart is automatically assigned to their account.

To assign a guest cart to a customer, i.e., merge the carts, include the unique identifier associated with the customer in the *X-Anonymous-Customer-Unique-Id* header of the authentication request if it is an existing customer, or request to create a customer account if it is a new one.

Upon login, the behavior depends on whether your project is a single cart or [multiple cart](https://documentation.spryker.com/docs/multiple-cart-per-user) environment:

* In a **single cart** environment, the products in the guest cart are added to the customers' own cart;
* In a **multiple cart** environment, the guest cart is converted to a regular user cart and added to the list of the customers' own carts.

The workflow is displayed in the diagram below:
![Assign cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Managing+Carts/Managing+Guest+Carts/assigning-guest-cart-to-registered-user.png){height="" width=""}

Below, you can see an exemplary workflow for converting a guest cart into a regular cart:

1. The customer adds items to a guest cart.

Request sample: `POST https://glue.myspsrykershop.com/guest-cart-items`
```json
{
    "data": {
        "type": "guest-cart-items",
        "attributes": {
            "sku": "022_21994751",
            "quantity": 5
        }
    }
}
```


| HEADER KEY | HEADER VALUE | DESCRIPTION |
| --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | guest-user-001 | A guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value.. |

**Response sample**
```json
{
    "data": {
        "type": "guest-carts",
        "id": "9183f604-9b2c-53d9-acbf-cf59b9b2ff9f",
        "attributes": {...},
        "links": {...}
    },
    "included": [...]
}
```
2. The customer logs in.

Request sample: `POST https://glue.myspsrykershop.com/access-tokens`
```json
{
    "data": {
        "type": "access-tokens",
        "attributes": {
            "username": "john.doe@example.com",
            "password": "qwerty"
        }
    }
}
```

| HEADER KEY | HEADER VALUE | DESCRIPTION |
| --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | guest-user-001 | Guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |

**Response sample**

```json
{
    "data": {
        "type": "access-tokens",
        "id": null,
        "attributes": {
            "tokenType": "Bearer",
            "expiresIn": 28800,
            "accessToken": "eyJ0eXAiOiJKV1QiLC...",
            "refreshToken": "def50200ae2d0...",
            "idCompanyUser": "94d58692-c117-5466-8b9f-2ba32dd87c43"
        },
        "links": {...}
    }
}
```
3. The customer requests a list of his own carts.

Request sample: `GET https://glue.myspsrykershop.com/carts`

| Header key | Header value | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | v | Alphanumeric string that authenticates the customer you want to change the password of. Get it by [authenticating as a customer](https://documentation.spryker.com/authenticating-as-a-customer).  |

In the **multi-cart** environment, the guest cart has been converted to a regular cart. You can see it in the list of carts with the id `9183f604-9b2c-53d9-acbf-cf59b9b2ff9f`.

**Response sample**

```json
{
    "data": [
        {
            "type": "carts",
            "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
            "attributes": {...},
            "links": {...}
        },
        {
            "type": "carts",
            "id": "9183f604-9b2c-53d9-acbf-cf59b9b2ff9f",
            "attributes": {...},
            "links": {...}
        }
    ],
    "links": {...}
}
```

In a **single cart** environment, items from the guest cart have been added to the user's own cart.

**Response body**
```json
{
    "data": [
        {
            "type": "carts",
            "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 13000,
                    "taxTotal": 18681,
                    "subtotal": 130000,
                    "grandTotal": 117000
                },
                "discounts": [...]
            },
            "links": {...}
        },
```

## Possible errors


| Code | Reason |
| --- | --- |
| 101 | Cart with given uuid not found. |
| 102 | Failed to add an item to cart. |
| 103 | Item with the given group key not found in the cart. |
| 104 | Cart uuid is missing. |
| 105 | Cart could not be deleted. |
| 106 | Cart item could not be deleted. |
| 107 | Failed to create a cart. |
| 109 | Anonymous customer unique id is empty. |
| 111 | Can’t switch price mode when there are items in the cart. |
| 112 | Store data is invalid. |
| 113 | Cart item could not be added. |
| 114 | Cart item could not be updated. |
| 115 | Unauthorized cart action. |
| 116 | Currency is missing. |
| 117 | Currency is incorrect. |
| 118 | Price mode is missing. |
| 119 | Price mode is incorrect. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).
