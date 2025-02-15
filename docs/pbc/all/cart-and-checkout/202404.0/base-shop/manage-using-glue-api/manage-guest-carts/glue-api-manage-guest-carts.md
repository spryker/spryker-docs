---
title: "Glue API: Manage guest carts"
description: Retrieve details about guest carts and learn what else you can do with the resource.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-guest-carts
originalArticleId: 70f8ca95-9dc9-4083-8056-4acd342e0054
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-carts/guest-carts/managing-guest-carts.html
  - /docs/pbc/all/cart-and-checkout/manage-using-glue-api/manage-guest-carts/manage-guest-carts.html
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/manage-using-glue-api/manage-guest-carts/manage-guest-carts.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html
related:
  - title: Manage guest cart items
    link: docs/pbc/all/cart-and-checkout/page.version/marketplace/manage-using-glue-api/guest-carts/manage-guest-cart-items.html
  - title: Managing gift cards of guest users
    link: docs/pbc/all/gift-cards/page.version/manage-using-glue-api/glue-api-manage-gift-cards-of-guest-users.html
---

This endpoint lets you manage guest carts.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

* [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)
* [Install the Promotions & Discounts feature Glue API](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html)
* [Install the Product Options Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-options-glue-api.html)
* [Install the Product Labels Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-image-sets-glue-api.html)

## Create a guest cart

To create a guest cart as an unauthenticated user, [add items to a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-cart-items.html#add-items-to-a-guest-cart).

## Retrieve a guest cart

To retrieve a guest cart, send the request:

***
`GET` **/guest-carts**
***

{% info_block infoBox "Guest cart ID" %}


Guest users have one guest cart by default. If you already have a guest cart, you can optionally specify its ID when adding items. To do that, use the following endpoint. The information in this section is valid for both of the endpoints.

`GET` **/guest-carts/*{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}***

| PATH PARAMETER | DESCRIPTION |
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

| REQUEST | USAGE |
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

<details>
<summary>Response sample: retrieve a guest cart</summary>

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
                ],
                "thresholds": []
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


<details>
<summary>Response sample: retrieve a guest cart with the items included</summary>

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
                ],
                "thresholds": []
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


<details>
<summary>Response sample: retrieve a guest cart with cart rules included</summary>

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
                ],
                "thresholds": []
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



<details>
<summary>Response sample: add items with gift cards to a guest cart</summary>

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
                ],
                "thresholds": []
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


<details>
<summary>Response sample: retrieve a guest cart with items, respective concrete products, and their product options included</summary>

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
                ],
                "thresholds": []
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
                "description": "Enjoy greater flexibility  ...than ever before with the Galaxy Tab S2. Remarkably slim and ultra-lightweight, use this device to take your e-books, photos, videos and work-related files with you wherever you need to go. The Galaxy Tab S2's 4:3 ratio display is optimised for magazine reading and web use. Switch to Reading Mode to adjust screen brightness and change wallpaper - create an ideal eBook reading environment designed to reduce the strain on your eyes. Get greater security with convenient and accurate fingerprint functionality. Activate fingerprint lock by pressing the home button. Use fingerprint verification to restrict / allow access to your web browser, screen lock mode and your Samsung account.",
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

<details>
<summary>Response sample: retrieve a guest cart with its items, sales units, and product measurement units</summary>

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
                "discounts": [],
                "thresholds": []
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


<details>
<summary>Response sample: retrieve a guest cart with a cart rule and a discount voucher</summary>

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

<details>
<summary>Response sample: retrieve a guest cart with product labels included</summary>

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
                "discounts": [],
                "thresholds": []
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
                "description": "Enjoy greater flexibility  ...than ever before with the Galaxy Tab S2. Remarkably slim and ultra-lightweight, use this device to take your e-books, photos, videos and work-related files with you wherever you need to go. The Galaxy Tab S2's 4:3 ratio display is optimised for magazine reading and web use. Switch to Reading Mode to adjust screen brightness and change wallpaper - create an ideal eBook reading environment designed to reduce the strain on your eyes. Get greater security with convenient and accurate fingerprint functionality. Activate fingerprint lock by pressing the home button. Use fingerprint verification to restrict / allow access to your web browser, screen lock mode and your Samsung account.",
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

{% include pbc/all/glue-api-guides/{{page.version}}/guest-carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/guest-carts-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/guest-cart-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/guest-cart-items-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/product-options-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/product-options-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/vouchers-cart-rules-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/vouchers-cart-rules-response-attributes.md -->

{% include /pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/product-measurement-units-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/product-measurement-units-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/gift-cards-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/gift-cards-response-attributes.md -->


## Assign a guest cart to a registered customer

Guest carts are anonymous as they are not related to any user. If a user registers or logs in, the guest cart can be automatically assigned to their account.

To assign a guest cart to a customer, for example, merge the carts, include the unique identifier associated with the customer in the `X-Anonymous-Customer-Unique-Id` header of the authentication request if it's an existing customer, or request to create a customer account if it's a new one. Adjust the configuration constant to create a cart for the newly authenticated customer while merging the guest cart with the customer cart:

**src/Pyz/Zed/CartsRestApi/CartsRestApiConfig.php**

```php
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiConfig as SprykerCartsRestApiConfig;

class CartsRestApiConfig extends SprykerCartsRestApiConfig
{
    protected const IS_QUOTE_CREATION_WHILE_QUOTE_MERGING_ENABLED = true;
}
```

Upon login, the behavior depends on whether your project is a single cart or [multiple cart](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/multiple-carts-feature-overview.html) environment:

* In a **single cart** environment, the products in the guest cart are added to the customers' own cart;
* In a **multiple cart** environment, the guest cart is converted to a regular user cart and added to the list of the customers' own carts.

The workflow is displayed in the following diagram:
<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-01T11:03:23.652Z\&quot; agent=\&quot;5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;QnmmQ9E2tNcSC_Frfojm\&quot; version=\&quot;20.2.2\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;C5RBs43oDa-KdzZeNtuy\&quot; name=\&quot;Page-1\&quot;&gt;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&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

The following is an exemplary workflow of converting a guest cart into a regular cart:

1. The customer adds items to a guest cart.

Request sample:

`POST https://glue.myspsrykershop.com/guest-cart-items`

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

Request sample:

`POST https://glue.myspsrykershop.com/access-tokens`

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

Request sample:

`GET https://glue.myspsrykershop.com/carts`

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | v | Alphanumeric string that authenticates the customer you want to change the password of. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

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

In a *single cart* environment, items from the guest cart have been added to the user's own cart.

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
                "discounts": [...],
                "thresholds": []
            },
            "links": {.}
        },
```

## Possible errors

| CODE | REASON |
| --- | --- |
| 101 | Cart with given uuid not found. |
| 102 | Failed to add an item to cart. |
| 103 | Item with the given group key not found in the cart. |
| 104 | Cart uuid is missing. |
| 105 | Cart cannot be deleted. |
| 106 | Cart item cannot be deleted. |
| 107 | Failed to create a cart. |
| 109 | Anonymous customer unique id is empty. |
| 111 | Can't switch price mode when there are items in the cart. |
| 112 | Store data is invalid. |
| 113 | Cart item cannot be added. |
| 114 | Cart item cannot be updated. |
| 115 | Unauthorized cart action. |
| 116 | Currency is missing. |
| 117 | Currency is incorrect. |
| 118 | Price mode is missing. |
| 119 | Price mode is incorrect. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
