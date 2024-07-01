---
title: Manage items in carts of registered users
description: Retrieve details about the items of the registered users' carts, and learn what else you can do with the resource in the Spryker Marketplace
template: glue-api-storefront-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/marketplace/dev/glue-api-guides/202311.0/carts-of-registered-users/managing-items-in-carts-of-registered-users.html
related:
  - title: Managing carts of registered users
    link: docs/pbc/all/cart-and-checkout/page.version/marketplace/manage-using-glue-api/carts-of-registered-users/manage-carts-of-registered-users.html
---
This endpoint allows managing items in carts of registered users by adding, changing, and deleting them.


## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:
* [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)
* [Install the Measurement Units Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-measurement-units-glue-api.html)
* [Install the Product Options Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-options-glue-api.html)
* [Install the Promotions & Discounts feature Glue API](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html)
* [GLUE API: Merchant Offers feature integration](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-glue-api.html)
* [Install the Marketplace Product Offer Prices Glue API](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html)
* [Install the Marketplace Product Offer Volume Prices Glue API](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html



## Add an item to a registered user's cart

To add items to a cart, send the request:

---
`POST` {% raw %}**carts/*{{cart_uuid}}*/items**{% endraw %}

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{cart_uuid}}***{% endraw %} | Unique identifier of a cart. [Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-carts-of-registered-users.html) or [retrieve a registered user's carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-carts-of-registered-users.html#retrieve-a-registered-users-cart) to get it. |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>items</li><li>product-measurement-units</li><li>sales-units</li><li>cart-rules</li><li>vouchers</li><li>concrete-products</li><li>product-options</li><li>product-offers</li><li>merchants</li></ul>|

{% info_block infoBox "Included resources" %}

To retrieve all the product options of the item in a cart, include `concrete-products` and `product-options`.

{% endinfo_block %}


<details>
<summary markdown='span'>Request sample: add an item to a registered user's cart</summary>

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
<summary markdown='span'>Request sample: add an item to a registered user's cart with product measurement units and sales units</summary>

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
<summary markdown='span'>Request sample: add an item to a registered user's cart with cart rules</summary>

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
<summary markdown='span'>Request sample: add an item to a registered user's cart with vouchers</summary>

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
<summary markdown='span'>Request sample: add a promotional item to a registered user's cart with cart rules</summary>

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
<summary markdown='span'>Request sample: add an item to a registered user's cart with details on concrete products and product options</summary>

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
            		"sku": "OP_3_year_warranty"
            	}
            ]
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Request sample: add a product offer to a registered user's cart</summary>

`POST http://glue.myspsrykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff/items?include=items`

```json
{
  "data": {
    "type": "items",
    "attributes": {
      "sku": "041_25904691",
      "quantity": 5,
      "productOfferReference": "offer48"
    }
  }
}
```
</details>


<details>
<summary markdown='span'>Request sample: add a marketplace product to a registered user's cart</summary>

`POST https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a/items`

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "020_21081478",
            "quantity": "6",
            "merchantReference": "MER000001"
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Request sample: add an item to a registered user's cart with details on merchants</summary>

`POST https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a/items?include=items,merchants`

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "020_21081478",
            "quantity": "6",
            "merchantReference": "MER000001"
        }
    }
}
```
</details>



| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| sku | String | &check; | SKU of the concrete product to add to the cart. |
| quantity | Integer | &check; | Number of items to add to the guest cart. If you add a promotional item, and the number of products exceeds the number of promotions, the exceeding items are added without the promotional benefits. |
| merchantReference | String | Required when adding a merchant product. | Unique identifier of the merchant the product of which to add to the cart. |
| salesUnit | Object |  | List of attributes defining the sales unit to be used for item amount calculation. |
| salesUnit.id | Integer |  | Unique identifier of the sales units to calculate the item amount in. |
| salesUnit.amount | Integer |  | Amount of the product in the defined sales units.  |
| idPromotionalItem | String |  | Unique identifier of a promotional item to add to the cart. |
| productOptions | Array |  | List of attributes defining the product option to add to the cart. |
| productOptions.sku | String |  | Unique identifier of the product option to add to the cart.  |
| productOfferReference | String |Required when adding a product offer. |Unique identifier of the product offer to add to the cart. |

{% info_block infoBox "Conversion" %}

When defining product amount in sales units, make sure that the correlation between amount and quantity corresponds to the conversion of the defined sales unit. See [Measurement Units feature overview](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/measurement-units-feature-overview.html) to learn more.

{% endinfo_block %}

{% info_block infoBox "Product options" %}
It is the responsibility of the API Client to track whether the selected items are compatible. For example, the client should not allow a 2-year and a 4-year warranty service to be applied to the same product. The API endpoints allow any combination of items, no matter whether they are compatible or not.

{% endinfo_block %}

### Response

<details>
<summary markdown='span'>Response sample: add an item to a registered user's cart</summary>

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
            "discounts": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a"
        }
    }
}
```
</details>


<details>
<summary markdown='span'>Response sample: add an item to a registered user's cart with product measurement units and sales units</summary>

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
            ]
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
<summary markdown='span'>Response sample: add an item to a registered user's cart with cart rules</summary>

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
            ]
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
<summary markdown='span'>Response sample: add an item to a registered user's cart with vouchers</summary>

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
            ]
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
<summary markdown='span'>Response sample: add a promotional item to a registered user's cart without cart-rules relationship</summary>

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
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
        }
    }
}
```    
</details>


<details>
<summary markdown='span'>Response sample: add a promotional item to a registered user's cart with cart-rules relationship</summary>

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
            ]
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
<summary markdown='span'>Response sample: add an item to a registered user's cart with details on concrete products and product options</summary>

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
            ]
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
                "description": "Enjoy greater flexibility  ...than ever before with the Galaxy Tab S2. Remarkably slim and ultra-lightweight, use this device to take your e-books, photos, videos and work-related files with you wherever you need to go. The Galaxy Tab S2’s 4:3 ratio display is optimised for magazine reading and web use. Switch to Reading Mode to adjust screen brightness and change wallpaper—create an ideal eBook reading environment designed to reduce the strain on your eyes. Get greater security with convenient and accurate fingerprint functionality. Activate fingerprint lock by pressing the home button. Use fingerprint verification to restrict / allow access to your web browser, screen lock mode and your Samsung account.",
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
<summary markdown='span'>Response sample: add a product offer to a registered user's cart</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "bef3732e-bc7a-5c07-a40c-f38caf1c40ff",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "newcart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 0,
                "taxTotal": 44988,
                "subtotal": 281770,
                "grandTotal": 281770,
                "priceToPay": 281770
            },
            "discounts": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "041_25904691"
                    },
                    {
                        "type": "items",
                        "id": "041_25904691_offer48"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "items",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "quantity": 5,
                "groupKey": "041_25904691",
                "abstractSku": "041",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 1650,
                    "sumPrice": 8250,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 1650,
                    "sumGrossPrice": 8250,
                    "unitTaxAmountFullAggregation": 263,
                    "sumTaxAmountFullAggregation": 1317,
                    "sumSubtotalAggregation": 8250,
                    "unitSubtotalAggregation": 1650,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 1650,
                    "sumPriceToPayAggregation": 8250
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff/items/041_25904691"
            }
        },
        {
            "type": "items",
            "id": "041_25904691_offer48",
            "attributes": {
                "sku": "041_25904691",
                "quantity": 26,
                "groupKey": "041_25904691_offer48",
                "abstractSku": "041",
                "amount": null,
                "productOfferReference": "offer48",
                "merchantReference": "MER000002",
                "calculations": {
                    "unitPrice": 10520,
                    "sumPrice": 273520,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 10520,
                    "sumGrossPrice": 273520,
                    "unitTaxAmountFullAggregation": 1680,
                    "sumTaxAmountFullAggregation": 43671,
                    "sumSubtotalAggregation": 273520,
                    "unitSubtotalAggregation": 10520,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 10520,
                    "sumPriceToPayAggregation": 273520
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff/items/041_25904691_offer48"
            }
        }
    ]
}
```

</details>

<details>
<summary markdown='span'>Response sample: add a marketplace product to a registered user's cart</summary>

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
                "taxTotal": 10135,
                "subtotal": 63480,
                "grandTotal": 63480,
                "priceToPay": 63480
            },
            "discounts": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a"
        }
    }
}
```
</details>


<details>
<summary markdown='span'>Response sample: add an item to a registered user's cart with details on merchants</summary>

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
                "taxTotal": 20271,
                "subtotal": 126960,
                "grandTotal": 126960,
                "priceToPay": 126960
            },
            "discounts": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "020_21081478"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "merchants",
            "id": "MER000001",
            "attributes": {
                "merchantName": "Spryker",
                "merchantUrl": "/en/merchant/spryker",
                "contactPersonRole": "E-Commerce Manager",
                "contactPersonTitle": "Mr",
                "contactPersonFirstName": "Harald",
                "contactPersonLastName": "Schmidt",
                "contactPersonPhone": "+49 30 208498350",
                "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-logo.png",
                "publicEmail": "info@spryker.com",
                "publicPhone": "+49 30 234567891",
                "description": "Spryker is the main merchant at the Demo Marketplace.",
                "bannerUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png",
                "deliveryTime": "1-3 days",
                "faxNumber": "+49 30 234567800",
                "legalInformation": {
                    "terms": "<p><h3>General Terms</h3><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><h3>Using your Information</h3><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to let us deliver the type of content and product offerings in which you are most interested.<br><br><h3>Protecting visitor information</h3><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
                    "imprint": "<p>Spryker Systems GmbH<br><br>Julie-Wolfthorn-Straße 1<br>10115 Berlin<br>DE<br><br>Phone: +49 (30) 2084983 50<br>Email: info@spryker.com<br><br>Represented by<br>Managing Directors: Alexander Graf, Boris Lokschin<br>Register Court: Hamburg<br>Register Number: HRB 134310<br></p>",
                    "dataPrivacy": "Spryker Systems GmbH values the privacy of your personal data."
                },
                "categories": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001"
            }
        },
        {
            "type": "items",
            "id": "020_21081478",
            "attributes": {
                "sku": "020_21081478",
                "quantity": 12,
                "groupKey": "020_21081478",
                "abstractSku": "020",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "calculations": {
                    "unitPrice": 10580,
                    "sumPrice": 126960,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 10580,
                    "sumGrossPrice": 126960,
                    "unitTaxAmountFullAggregation": 1689,
                    "sumTaxAmountFullAggregation": 20271,
                    "sumSubtotalAggregation": 126960,
                    "unitSubtotalAggregation": 10580,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 10580,
                    "sumPriceToPayAggregation": 126960
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a/items/020_21081478"
            },
            "relationships": {
                "merchants": {
                    "data": [
                        {
                            "type": "merchants",
                            "id": "MER000001"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>


<a name="add-an-item-to-a-registered-users-cart-response-attributes"></a>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| sku | String | Product SKU. |
| quantity | Integer | Quantity of the given product in the cart. |
| groupKey | String | Unique item identifier. The value is generated based on product properties. |
| abstractSku | String | Unique identifier of the abstract product owning this concrete product. |
| amount | Integer | Amount of the products in the cart. |
| unitPrice | Integer | Single item price without assuming if it is net or gross. This value should be used everywhere the price is displayed. It allows switching tax mode without side effects. |
| sumPrice | Integer | Sum of all items prices calculated. |
| taxRate | Integer | Current tax rate in percent. |
| unitNetPrice | Integer | Single item net price. |
| sumNetPrice | Integer | Sum of prices of all items. |
| unitGrossPrice | Integer | Single item gross price. |
| sumGrossPrice | Integer | Sum of items gross price. |
| unitTaxAmountFullAggregation | Integer | Total tax amount for a given item with additions. |
| sumTaxAmountFullAggregation | Integer | Total tax amount for a given sum of items with additions. |
| sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| unitSubtotalAggregation | Integer | Subtotal for the given item. |
| unitProductOptionPriceAggregation | Integer | Item total product option price. |
| sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| unitDiscountAmountAggregation | Integer | Item total discount amount. |
| sumDiscountAmountAggregation | Integer | Sum of Item total discount amount. |
| unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions. |
| sumDiscountAmountFullAggregation | Integer | Item total discount amount with additions. |
| unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| sumPriceToPayAggregation | Integer | Sum of the prices to pay (after discounts).|
| salesUnit |Object | List of attributes defining the sales unit to be used for item amount calculation. |
| salesUnit.id | Integer | Numeric value that defines the sales units to calculate the item amount in. |
| salesUnit.amount | Integer | Amount of product in the defined sales units. |
| selectedProductOptions | array | List of attributes describing the product options that were added to cart with the product. |
| selectedProductOptions.optionGroupName | String | Name of the group to which the option belongs. |
| selectedProductOptions.sku | String | SKU of the product option. |
| selectedProductOptions.optionName | String | Product option name. |
| selectedProductOptions.price | Integer | Product option price in cents. |
| selectedProductOptions.currencyIsoCode | String | ISO 4217 code of the currency in which the product option price is specified. |

| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
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

{% include pbc/all/glue-api-guides/{{page.version}}/product-offer-availabilities-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/product-offer-availabilities-response-attributes.md -->

For the attributes of the included resources, see:
* [Retrieving measurement units](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-measurement-units.html)
* [Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-carts-of-registered-users.html)
* [Retrieve a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-concrete-products.html)
* [Retrieving product offers](/docs/pbc/all/offer-management/{{page.version}}/marketplace/glue-api-retrieve-product-offers.html#product-offers-response-attributes)
* [Retrieving product offer prices](/docs/pbc/all/price-management/{{page.version}}/marketplace/glue-api-retrieve-product-offer-prices.html#product-offer-prices-response-attributes)
* [Retrieving merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html#merchants-response-attributes)

## Change item quantity

To change the number of items in a cart, send the request:

***
`PATCH` {% raw %}**/carts/*{{cart_uuid}}*/items/*{{item_group_key}}***{% endraw %}
***


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{cart_uuid}}***{% endraw %} | Unique identifier of a cart. [Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-carts-of-registered-users.html) or [retrieve a registered user's carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-carts-of-registered-users.html#retrieve-a-registered-users-cart) to get it. |
| {% raw %}***{{item_group_key}}***{% endraw %} | Group key of the item. Usually, it is equal to the item’s SKU. |

### Request


| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |


Request sample: change item quantity

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
<summary markdown='span'>Response sample: change item quantity</summary>

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
                "discounts": []
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

For the attributes of the included resources, see [Glue API: Retrieving concrete products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-concrete-products.html).

## Remove items from a registered user's cart

To remove an item from a registered user's cart, send the request:

***
`DELETE` {% raw %}**/carts/*{{cart_uuid}}*/items/*{{item_group_key}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{cart_uuid}}***{% endraw %} | Unique identifier of a cart. [Create a cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-carts-of-registered-users.html) or [retrieve a registered user's carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-carts-of-registered-users.html#retrieve-a-registered-users-cart) to get it. |
| {% raw %}***{{item_group_key}}***{% endraw %}| Group key of the item. Usually, it is equal to the item’s SKU. |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

Request sample: Remove items from a registered user's cart

`DELETE http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054/items/177_25913296`

### Response

If the item is deleted successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 101 | Cart with given uuid not found. |
| 102 | Failed to add an item to a cart. |
| 103 | Item with the given group key not found in the cart. |
| 104 | Cart uuid is missing. |
| 105 | Cart could not be deleted. |
| 106 | Cart item could not be deleted. |
| 107 | Failed to create a cart. |
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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
