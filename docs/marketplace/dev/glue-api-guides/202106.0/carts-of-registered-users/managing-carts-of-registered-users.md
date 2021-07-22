---
title: Managing carts of registered users
description: Retrieve details about the carts of the registered users and learn what else you can do with the resource in the Spryker Marketplace
template: glue-api-storefront-guide-template
---

This endpoint allows managing carts by creating, retrieving, and deleting them.

## Multiple carts

Unlike guest carts, carts of registered users have an unlimited lifetime. Also, if the Multiple Carts feature is [integrated into your project](https://documentation.spryker.com/docs/multiple-carts-feature-integration-201903), and Glue is [enabled for multi-cart operations](https://documentation.spryker.com/docs/multiple-carts-feature-integration-201903), registered users can have an unlimited number of carts.


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Cart feature integration](https://documentation.spryker.com/docs/glue-api-cart-feature-integration)
* [Glue API: Product Labels feature integration](https://documentation.spryker.com/docs/glue-api-product-labels-feature-integration)
* [Glue API: Measurement Units feature integration](https://documentation.spryker.com/docs/glue-api-measurement-units-feature-integration)
* [Glue API: Promotions & Discounts feature integration](https://documentation.spryker.com/docs/glue-api-promotions-discounts-feature-integration)
* [Glue API: Product Options feature integration](https://documentation.spryker.com/docs/glue-product-options-feature-integration)
* [Shared Carts feature integration](https://documentation.spryker.com/docs/shared-carts-feature-integration)
* [GLUE API: Merchant Offers feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/glue/marketplace-product-offer-feature-integration.html)
* [Glue API: Marketplace Product Offer Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/glue/marketplace-product-offer-prices-feature-integration.html)
* [Glue API: Marketplace Product Offer Volume Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/glue/glue-api-marketplace-product-offer-volume-prices.html)

## Create a cart

To create a cart, send the request:

---
`POST` **/carts**

---

{% info_block infoBox "Info" %}

Carts created via Glue API are always set as the default carts for the user.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/docs/authenticating-as-a-customer#authenticate-as-a-customer) or [authenticating as a company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user#authenticate-as-a-company-user).  |

Sample request: `POST https://glue.mysprykershop.com/carts`

```json
{
   "data":{
      "type":"carts",
      "attributes":{
         "name":"My Cart",
         "priceMode":"GROSS_MODE",
         "currency":"EUR",
         "store":"DE"
      }
   }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String | &check; | Sets the cart name.</br>This field can be set only if you are using the Multiple Carts feature. If you are operating in a single-cart environment, an attempt to set the value will result in an error with the `422 Unprocessable Entry` status code. |
| priceMode | Enum | &check; | Sets the price mode to be used for the cart. Possible values:<ul><li>GROSS_MODE—prices after tax;</li><li>NET_MODE—prices before tax.</li></ul>For details, see [Net &amp; Gross Prices](https://documentation.spryker.com/docs/net-gross-price). |
| currency | String | &check; | Sets the cart currency. |
| store | String | &check; | Sets the name of the store where to create the cart. |

### Response


<details>
<summary markdown='span'>Response sample</summary>

```json
"data":
        {
            "type": "carts",
            "id": "f23f5cfa-7fde-5706-aefb-ac6c6bbadeab",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "discounts": [],
                "totals": {
                    "expenseTotal": null,
                    "discountTotal": null,
                    "taxTotal": null,
                    "subtotal": null,
                    "grandTotal": null
                },
                "name": "My Cart",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab"
            }
        }
}
```

</details>

**General cart information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected when the cart was created. |
| store | String | Store for which the cart was created. |
| name | String | Specifies a cart name.</br>The field is available in multi-cart environments only. |
| isDefault | Boolean | Specifies whether the cart is the default one for the customer.</br>The field is available in multi-cart environments only.  |

**Discount information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| displayName | String | Discount name. |
| amount | Integer | Discount amount applied to the cart.  |
| code | String | Discount code applied to the cart. |

**Totals**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| expenseTotal | String | Total amount of expenses (including, e.g., shipping costs). |
| discountTotal | Integer | Total amount of discounts applied to the cart.  |
| taxTotal | String | Total amount of taxes to be paid. |
| subTotal | Integer | Subtotal of the cart.  |
| grandTotal | Integer | Grand total of the cart.  |


## Retrieve registered user's carts

To retrieve all carts, send the request:

---
`GET` **/carts**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/docs/authenticating-as-a-customer#authenticate-as-a-customer) or [authenticating as a company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. |<ul><li>items</li><li>cart-permission-groups</li><li>shared-carts</li><li>company-users</li><li>cart-rules</li><li>promotional-items</li><li>vouchers</li><li>gift-cards</li><li>concrete-products</li><li>product-options</li><li>product-labels</li><li>product-offers</li><li>product-offer-availabilities</li><li>product-offer-prices</li></ul> |

{% info_block infoBox "Info" %}

* To retrieve all the product options of the item in a cart, include `items`, `concrete-products`, and `product-options`.
* To retrieve information about the company user a cart is shared with, include `shared-carts` and `company-users`.
* To retrieve product labels of the products in a cart, include `items`, `concrete-products`, and `product-labels`.
* To retrieve product offers, include `items` and `concrete-products`.
* To retrieve product offer availabilities, include `items`, `concrete-products`, and `product-offer-availabilities`.
* To retrieve product offer prices, include `items`, `concrete-products`, and `product-offer-prices`.

{% endinfo_block %}

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/carts` | Retrieve all carts of a user. |
| `GET https://glue.mysprykershop.com/carts?include=items` | Retrieve all carts of a user with the items in them included.  |
| `GET https://glue.mysprykershop.com/carts?include=cart-permission-groups` | Retrieve all carts of a user with cart permission groups included. |
| `GET https://glue.mysprykershop.com/carts?include=shared-carts` | Retrieve all carts of a user with shared carts. |
| `GET https://glue.mysprykershop.com/carts?include=shared-carts,company-users` | Retrieve all carts of a user with information about shared carts, and the company uses they are shared with. |
| `GET https://glue.mysprykershop.com/carts?include=cart-rules` | Retrieve all carts of a user with cart rules. |
| `GET https://glue.mysprykershop.com/carts?include=vouchers` | Retrieve all carts of a user with information about applied vouchers. |
| `GET https://glue.mysprykershop.com/carts?include=promotional-items` | Retrieve information about promotional items for the cart. |
| `GET https://glue.mysprykershop.com/carts?include=gift-cards` | Retrieve all carts of a user with applied gift cards. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-options` | Retrieve all carts of a user with items, respective concrete product, and their product options. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-labels` | Retrieve all carts of a user with information about concrete products and the product labels assigned to the products in the carts. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-offers` | Retrieve all carts of a user with information about product offers. |
| `GET http://glue.mysprykershop.com/carts?include=items,concrete-products,product-offers,product-offer-availabilities,product-offer-prices` | Retrieve all carts of a user with product offer availabilities. |
| `GET http://glue.mysprykershop.com/carts?include=items,concrete-products,product-offers,product-offer-prices` | Retrieve all carts of a user with product offer prices. |


### Response

<details>
<summary markdown='span'>Response sample: no carts</summary>

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
<summary markdown='span'>Response sample: multiple carts</summary>

```json
{
    "data": [
        {
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
                    "discountTotal": 3744,
                    "taxTotal": 5380,
                    "subtotal": 37440,
                    "grandTotal": 33696
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 3744,
                        "code": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a"
            }
        },
        {
            "type": "carts",
            "id": "482bdbd6-137f-5b58-bd1c-37f3fa735a16",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Black Friday Conf Bundle",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 8324,
                    "taxTotal": 1469,
                    "subtotal": 83236,
                    "grandTotal": 74912
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/482bdbd6-137f-5b58-bd1c-37f3fa735a16"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts"
    }
}
```   
</details>




<details>
<summary markdown='span'>Response sample with items</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "ac3da9eb-f4fc-5803-94b9-343d6cd4cda4",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "My Cart",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 4158,
                    "taxTotal": 5974,
                    "subtotal": 41575,
                    "grandTotal": 37417,
                    "priceToPay": 37417
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 4158,
                        "code": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/ac3da9eb-f4fc-5803-94b9-343d6cd4cda4"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "070_133913222"
                        }
                    ]
                }
            }
        },
        {
            "type": "carts",
            "id": "e877356a-5d8f-575e-aacc-c790eeb20a27",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Everyday purchases",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 6165,
                    "taxTotal": 3630,
                    "subtotal": 61647,
                    "grandTotal": 55482,
                    "priceToPay": 55482
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 6165,
                        "code": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/e877356a-5d8f-575e-aacc-c790eeb20a27"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "089_29634947"
                        },
                        {
                            "type": "items",
                            "id": "201_11217755"
                        }
                    ]
                }
            }
        },
        {
            "type": "carts",
            "id": "8ef901fe-fe47-5569-9668-2db890dbee6d",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Shopping cart",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 4200,
                    "taxTotal": 6035,
                    "subtotal": 42000,
                    "grandTotal": 37800,
                    "priceToPay": 37800
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 4200,
                        "code": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "005_30663301"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts?include=items"
    },
    "included": [
        {
            "type": "items",
            "id": "070_133913222",
            "attributes": {
                "sku": "070_133913222",
                "quantity": "1",
                "groupKey": "070_133913222",
                "abstractSku": "070",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "calculations": {
                    "unitPrice": 41575,
                    "sumPrice": 41575,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 41575,
                    "sumGrossPrice": 41575,
                    "unitTaxAmountFullAggregation": 5974,
                    "sumTaxAmountFullAggregation": 5974,
                    "sumSubtotalAggregation": 41575,
                    "unitSubtotalAggregation": 41575,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 4158,
                    "sumDiscountAmountAggregation": 4158,
                    "unitDiscountAmountFullAggregation": 4158,
                    "sumDiscountAmountFullAggregation": 4158,
                    "unitPriceToPayAggregation": 37417,
                    "sumPriceToPayAggregation": 37417
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/ac3da9eb-f4fc-5803-94b9-343d6cd4cda4/items/070_133913222"
            }
        },
        {
            "type": "items",
            "id": "089_29634947",
            "attributes": {
                "sku": "089_29634947",
                "quantity": "1",
                "groupKey": "089_29634947",
                "abstractSku": "089",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "calculations": {
                    "unitPrice": 41393,
                    "sumPrice": 41393,
                    "taxRate": 7,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 41393,
                    "sumGrossPrice": 41393,
                    "unitTaxAmountFullAggregation": 2437,
                    "sumTaxAmountFullAggregation": 2437,
                    "sumSubtotalAggregation": 41393,
                    "unitSubtotalAggregation": 41393,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 4140,
                    "sumDiscountAmountAggregation": 4140,
                    "unitDiscountAmountFullAggregation": 4140,
                    "sumDiscountAmountFullAggregation": 4140,
                    "unitPriceToPayAggregation": 37253,
                    "sumPriceToPayAggregation": 37253
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/e877356a-5d8f-575e-aacc-c790eeb20a27/items/089_29634947"
            }
        },
        {
            "type": "items",
            "id": "201_11217755",
            "attributes": {
                "sku": "201_11217755",
                "quantity": "1",
                "groupKey": "201_11217755",
                "abstractSku": "201",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": "MER000002",
                "calculations": {
                    "unitPrice": 20254,
                    "sumPrice": 20254,
                    "taxRate": 7,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 20254,
                    "sumGrossPrice": 20254,
                    "unitTaxAmountFullAggregation": 1193,
                    "sumTaxAmountFullAggregation": 1193,
                    "sumSubtotalAggregation": 20254,
                    "unitSubtotalAggregation": 20254,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 2025,
                    "sumDiscountAmountAggregation": 2025,
                    "unitDiscountAmountFullAggregation": 2025,
                    "sumDiscountAmountFullAggregation": 2025,
                    "unitPriceToPayAggregation": 18229,
                    "sumPriceToPayAggregation": 18229
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/e877356a-5d8f-575e-aacc-c790eeb20a27/items/201_11217755"
            }
        },
        {
            "type": "items",
            "id": "005_30663301",
            "attributes": {
                "sku": "005_30663301",
                "quantity": 6,
                "groupKey": "005_30663301",
                "abstractSku": "005",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 7000,
                    "sumPrice": 42000,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 7000,
                    "sumGrossPrice": 42000,
                    "unitTaxAmountFullAggregation": 1006,
                    "sumTaxAmountFullAggregation": 6035,
                    "sumSubtotalAggregation": 42000,
                    "unitSubtotalAggregation": 7000,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 700,
                    "sumDiscountAmountAggregation": 4200,
                    "unitDiscountAmountFullAggregation": 700,
                    "sumDiscountAmountFullAggregation": 4200,
                    "unitPriceToPayAggregation": 6300,
                    "sumPriceToPayAggregation": 37800
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d/items/005_30663301"
            }
        }
    ]
}
```    
</details>


<details>
<summary markdown='span'>Response sample with cart permission groups</summary>

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
                "discounts": []
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
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4"
            },
            "relationships": {
                "cart-permission-groups": {
                    "data": [
                        {
                            "type": "cart-permission-groups",
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
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/2b72635a-9363-56f5-9ba7-55631b8ad71e"
            },
            "relationships": {
                "cart-permission-groups": {
                    "data": [
                        {
                            "type": "cart-permission-groups",
                            "id": "2"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts?include=cart-permission-groups"
    },
    "included": [
        {
            "type": "cart-permission-groups",
            "id": "1",
            "attributes": {
                "name": "READ_ONLY",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cart-permission-groups/1"
            }
        },
        {
            "type": "cart-permission-groups",
            "id": "2",
            "attributes": {
                "name": "FULL_ACCESS",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cart-permission-groups/2"
            }
        }
    ]
}
```    
</details>


<details>
<summary markdown='span'>Response sample with shared carts</summary>

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
                "discounts": []
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
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4"
            },
            "relationships": {
                "shared-carts": {
                    "data": [
                        {
                            "type": "shared-carts",
                            "id": "8ceae991-0b8d-5c85-9f40-06c4c04fc7f4"
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
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/2b72635a-9363-56f5-9ba7-55631b8ad71e"
            },
            "relationships": {
                "shared-carts": {
                    "data": [
                        {
                            "type": "shared-carts",
                            "id": "180ab2c2-60be-5ed4-8158-abee52d9d640"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts?include=shared-carts"
    },
    "included": [
        {
            "type": "shared-carts",
            "id": "8ceae991-0b8d-5c85-9f40-06c4c04fc7f4",
            "attributes": {
                "idCompanyUser": "72778771-2020-574f-bbaf-05da5889e79e",
                "idCartPermissionGroup": 1
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shared-carts/8ceae991-0b8d-5c85-9f40-06c4c04fc7f4"
            }
        },
        {
            "type": "shared-carts",
            "id": "180ab2c2-60be-5ed4-8158-abee52d9d640",
            "attributes": {
                "idCompanyUser": "72778771-2020-574f-bbaf-05da5889e79e",
                "idCartPermissionGroup": 2
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shared-carts/180ab2c2-60be-5ed4-8158-abee52d9d640"
            }
        }
    ]
}
```    
</details>

<details>
<summary markdown='span'>Response sample with shared carts and company users they are shared with</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "dc16f734-968d-5a45-92b7-aae5f804f77c",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "My Cart",
                "isDefault": true,
                "totals": {
                    "expenseTotal": null,
                    "discountTotal": null,
                    "taxTotal": null,
                    "subtotal": null,
                    "grandTotal": null,
                    "priceToPay": null
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/dc16f734-968d-5a45-92b7-aae5f804f77c?include=shared-carts,company-users"
            }
        },
        {
            "type": "carts",
            "id": "0c3ec260-694a-5cec-b78c-d37d32f92ee9",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "CHF",
                "store": "DE",
                "name": "Weekly office",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 0,
                    "taxTotal": 1999,
                    "subtotal": 12522,
                    "grandTotal": 12522,
                    "priceToPay": 12522
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9?include=shared-carts,company-users"
            },
            "relationships": {
                "shared-carts": {
                    "data": [
                        {
                            "type": "shared-carts",
                            "id": "79e91e88-b83a-5095-aa64-b3914bdd4863"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts?include=shared-carts,company-users"
    },
    "included": [
        {
            "type": "company-users",
            "id": "2816dcbd-855e-567e-b26f-4d57f3310bb8",
            "attributes": {
                "isActive": true,
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/company-users/2816dcbd-855e-567e-b26f-4d57f3310bb8"
            }
        },
        {
            "type": "shared-carts",
            "id": "79e91e88-b83a-5095-aa64-b3914bdd4863",
            "attributes": {
                "idCompanyUser": "2816dcbd-855e-567e-b26f-4d57f3310bb8",
                "idCartPermissionGroup": 2
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shared-carts/79e91e88-b83a-5095-aa64-b3914bdd4863"
            },
            "relationships": {
                "company-users": {
                    "data": [
                        {
                            "type": "company-users",
                            "id": "2816dcbd-855e-567e-b26f-4d57f3310bb8"
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
<summary markdown='span'>Response sample with cart rules</summary>

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
                "discounts": []
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
                ]
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
                ]
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
<summary markdown='span'>Response sample with vouchers</summary>

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
                ]
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
<summary markdown='span'>Response sample with a promotional item</summary>

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
                ]
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

<details>
<summary markdown='span'>Response sample with gift cards applied</summary>

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
                    "discountTotal": 17145,
                    "taxTotal": 19408,
                    "subtotal": 171447,
                    "grandTotal": 154302,
                    "priceToPay": 54302
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 17145,
                        "code": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/e877356a-5d8f-575e-aacc-c790eeb20a27"
            },
            "relationships": {
                "gift-cards": {
                    "data": [
                        {
                            "type": "gift-cards",
                            "id": "GC-23RLC8H1-20"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts?include=vouchers,gift-cards"
    },
    "included": [
        {
            "type": "gift-cards",
            "id": "GC-23RLC8H1-20",
            "attributes": {
                "code": "GC-23RLC8H1-20",
                "name": "Gift Card 1000",
                "value": 100000,
                "currencyIsoCode": "EUR",
                "actualValue": 100000,
                "isActive": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/e877356a-5d8f-575e-aacc-c790eeb20a27/cart-codes/GC-23RLC8H1-20"
            }
        }
    ]
}
```    
</details>

<details>
<summary markdown='span'>Response sample with items, concrete products, and product options</summary>

```json
{
    "data": [
        {
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
                "self": "https://glue.mysprykershop.com/carts/8fc45eda-cddf-5fec-8291-e2e5f8014398?include=items,concrete-products,product-options"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "181_31995510-3-5"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts?include=items,concrete-products,product-options"
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
<summary markdown='span'>Response sample with product labels</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "0c3ec260-694a-5cec-b78c-d37d32f92ee9",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "CHF",
                "store": "DE",
                "name": "Weekly office",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 0,
                    "taxTotal": 538,
                    "subtotal": 3369,
                    "grandTotal": 3369,
                    "priceToPay": 3369
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9?include=items,concrete-products,product-labels"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "421511"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/carts?include=items,concrete-products,product-labels"
    },
    "included": [
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 3,
                "frontEndReference": "sale"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-labels/5"
            }
        },
        {
            "type": "concrete-products",
            "id": "421511",
            "attributes": {
                "sku": "421511",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": 4.3,
                "reviewCount": 4,
                "name": "Parker ballpoint pen URBAN Premium S0911450 M refill, blue",
                "description": "In transparent color tones with lightly curved body.<p>* Line width: 0.5 mm * type designation of the refill: Slider 774 * refill exchangeable * printing mechanism * waterproof * design of the grip zone: round * tip material: stainless steel",
                "attributes": {
                    "material": "metal",
                    "wischfest": "No",
                    "abwischbar": "No",
                    "wasserfest": "No",
                    "nachfuellbar": "No",
                    "schreibfarbe": "blue",
                    "brand": "Parker"
                },
                "superAttributesDefinition": [
                    "material"
                ],
                "metaTitle": "",
                "metaKeywords": "Schreibgeräte,Schreibgeräte,Kugelschreiber,Kugelschreiber,Kulis,Kulis,Kulischreiber,Kulischreiber",
                "metaDescription": "",
                "attributeNames": {
                    "material": "Material",
                    "wischfest": "Smudge-resistant",
                    "abwischbar": "Wipeable",
                    "wasserfest": "Watertight",
                    "nachfuellbar": "Refillable",
                    "schreibfarbe": "Writing color",
                    "brand": "Brand"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/421511"
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
            "type": "items",
            "id": "421511",
            "attributes": {
                "sku": "421511",
                "quantity": "1",
                "groupKey": "421511",
                "abstractSku": "M21759",
                "amount": null,
                "calculations": {
                    "unitPrice": 3369,
                    "sumPrice": 3369,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 3369,
                    "sumGrossPrice": 3369,
                    "unitTaxAmountFullAggregation": 538,
                    "sumTaxAmountFullAggregation": 538,
                    "sumSubtotalAggregation": 3369,
                    "unitSubtotalAggregation": 3369,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 3369,
                    "sumPriceToPayAggregation": 3369
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9/items/421511"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "421511"
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
<summary markdown='span'>Response sample with product offers</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "29f5d310-e6f3-56ed-b64a-1fd834dbc486",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "SoniaCart1_71221",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 0,
                    "taxTotal": 5416,
                    "subtotal": 33927,
                    "grandTotal": 33927,
                    "priceToPay": 33927
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/29f5d310-e6f3-56ed-b64a-1fd834dbc486"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "021_21081475-2-5"
                        },
                        {
                            "type": "items",
                            "id": "078_24602396_offer171"
                        }
                    ]
                }
            }
        },
        {
            "type": "carts",
            "id": "50ea7615-ccfd-5c16-956c-fe561a5f9b7e",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Guest shopping cart",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 500,
                    "discountTotal": 0,
                    "taxTotal": 13856,
                    "subtotal": 96773,
                    "grandTotal": 97273,
                    "priceToPay": 97273
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/50ea7615-ccfd-5c16-956c-fe561a5f9b7e"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "006_30692993"
                        },
                        {
                            "type": "items",
                            "id": "009_30692991"
                        },
                        {
                            "type": "items",
                            "id": "206_6429825"
                        }
                    ]
                }
            }
        },
        {
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
                    "taxTotal": 4972,
                    "subtotal": 31140,
                    "grandTotal": 31140,
                    "priceToPay": 31140
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
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/items?include=items,concrete-products,product-offers"
    },
    "included": [
        {
            "type": "product-offers",
            "id": "offer95",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000006",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer95"
            }
        },
        {
            "type": "product-offers",
            "id": "offer69",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer69"
            }
        },
        {
            "type": "product-offers",
            "id": "offer28",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer28"
            }
        },
        {
            "type": "concrete-products",
            "id": "021_21081475",
            "attributes": {
                "sku": "021_21081475",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "021",
                "name": "Sony Cyber-shot DSC-W830",
                "description": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing it, and slip in your pocket. Shooting great photos and videos is easy with the W800. Buttons are positioned for ease of use, while a dedicated movie button makes shooting movies simple. The vivid 2.7-type Clear Photo LCD display screen lets you view your stills and play back movies with minimal effort. Whip out the W800 to capture crisp, smooth footage in an instant. At the press of a button, you can record blur-free 720 HD images with digital sound. Breathe new life into a picture by using built-in Picture Effect technology. There’s a range of modes to choose from – you don’t even have to download image-editing software.",
                "attributes": {
                    "hdmi": "no",
                    "sensor_type": "CCD",
                    "display": "TFT",
                    "usb_version": "2",
                    "brand": "Sony",
                    "color": "Purple"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony Cyber-shot DSC-W830",
                "metaKeywords": "Sony,Entertainment Electronics",
                "metaDescription": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing i",
                "attributeNames": {
                    "hdmi": "HDMI",
                    "sensor_type": "Sensor type",
                    "display": "Display",
                    "usb_version": "USB version",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/021_21081475"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer95"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer69"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer28"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "021_21081475-2-5",
            "attributes": {
                "sku": "021_21081475",
                "quantity": "1",
                "groupKey": "021_21081475-2-5",
                "abstractSku": "021",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "calculations": {
                    "unitPrice": 10680,
                    "sumPrice": 10680,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 10680,
                    "sumGrossPrice": 10680,
                    "unitTaxAmountFullAggregation": 1944,
                    "sumTaxAmountFullAggregation": 1944,
                    "sumSubtotalAggregation": 12180,
                    "unitSubtotalAggregation": 12180,
                    "unitProductOptionPriceAggregation": 1500,
                    "sumProductOptionPriceAggregation": 1500,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 12180,
                    "sumPriceToPayAggregation": 12180
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": [
                    {
                        "optionGroupName": "Three (3) year limited warranty",
                        "sku": "OP_2_year_warranty",
                        "optionName": "Two (2) year limited warranty",
                        "price": 1000
                    },
                    {
                        "optionGroupName": "Gift wrapping",
                        "sku": "OP_gift_wrapping",
                        "optionName": "Gift wrapping",
                        "price": 500
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/29f5d310-e6f3-56ed-b64a-1fd834dbc486/items/021_21081475-2-5"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "021_21081475"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offers",
            "id": "offer171",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000006",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer171"
            }
        },
        {
            "type": "concrete-products",
            "id": "078_24602396",
            "attributes": {
                "sku": "078_24602396",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": 4,
                "reviewCount": 3,
                "productAbstractSku": "078",
                "name": "Sony Xperia Z3 Compact",
                "description": "Dive into new experiences Xperia Z3 Compact is the smartphone designed to enhance your life. And life isn’t lived inside. With the highest waterproof rating*, Xperia Z3 Compact lets you answer calls in the rain or take pictures in the pool. And it can handle all the drops into the sink in between. Combined with a slim, compact design that’s easy to use with one hand, Xperia Z3 Compact is the Android smartphone that teams durability with beauty. Some of the best times happen in the lowest light. Years of Sony camera expertise have been brought to Xperia Z3 Compact, to deliver unparalleled low-light capability. Thanks to Cyber-shot and Handycam technologies you can record stunning videos on the move and take crisp shots under water. Want to take your shots to the next level? Get creative with our unique camera apps. It’s our best smartphone camera yet – for memories that deserve more than good.",
                "attributes": {
                    "internal_ram": "2048 MB",
                    "display_type": "TFT",
                    "bluetooth_version": "4.0 LE",
                    "form_factor": "Bar",
                    "brand": "Sony",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "form_factor",
                    "color"
                ],
                "metaTitle": "Sony Xperia Z3 Compact",
                "metaKeywords": "Sony,Communication Electronics",
                "metaDescription": "Dive into new experiences Xperia Z3 Compact is the smartphone designed to enhance your life. And life isn’t lived inside. With the highest waterproof ratin",
                "attributeNames": {
                    "internal_ram": "Internal RAM",
                    "display_type": "Display type",
                    "bluetooth_version": "Blootooth version",
                    "form_factor": "Form factor",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/078_24602396"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer171"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "078_24602396_offer171",
            "attributes": {
                "sku": "078_24602396",
                "quantity": "1",
                "groupKey": "078_24602396_offer171",
                "abstractSku": "078",
                "amount": null,
                "productOfferReference": "offer171",
                "merchantReference": "MER000006",
                "calculations": {
                    "unitPrice": 21747,
                    "sumPrice": 21747,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 21747,
                    "sumGrossPrice": 21747,
                    "unitTaxAmountFullAggregation": 3472,
                    "sumTaxAmountFullAggregation": 3472,
                    "sumSubtotalAggregation": 21747,
                    "unitSubtotalAggregation": 21747,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 21747,
                    "sumPriceToPayAggregation": 21747
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/29f5d310-e6f3-56ed-b64a-1fd834dbc486/items/078_24602396_offer171"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "078_24602396"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offers",
            "id": "offer54",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer54"
            }
        },
        {
            "type": "product-offers",
            "id": "offer13",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer13"
            }
        },
        {
            "type": "concrete-products",
            "id": "006_30692993",
            "attributes": {
                "sku": "006_30692993",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "006",
                "name": "Canon IXUS 175",
                "description": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies look like miniature scale models and much more. Capture the stunning detail in everyday subjects using 1 cm Macro to get right up close. Enjoy exceptional quality, detailed images thanks to 20.0 Megapixels and DIGIC 4+ processing. Face Detection technology makes capturing great shots of friends effortless, while Auto Zoom intelligently helps you select the best framing at the touch of a button.",
                "attributes": {
                    "optical_zoom": "8 x",
                    "combined_zoom": "32 x",
                    "display": "LCD",
                    "hdmi": "no",
                    "brand": "Canon",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 175",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies loo",
                "attributeNames": {
                    "optical_zoom": "Optical zoom",
                    "combined_zoom": "Combined zoom",
                    "display": "Display",
                    "hdmi": "HDMI",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/006_30692993"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer54"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer13"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "006_30692993",
            "attributes": {
                "sku": "006_30692993",
                "quantity": 2,
                "groupKey": "006_30692993",
                "abstractSku": "006",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 34500,
                    "sumPrice": 69000,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 34500,
                    "sumGrossPrice": 69000,
                    "unitTaxAmountFullAggregation": 5508,
                    "sumTaxAmountFullAggregation": 11017,
                    "sumSubtotalAggregation": 69000,
                    "unitSubtotalAggregation": 34500,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 34500,
                    "sumPriceToPayAggregation": 69000
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/50ea7615-ccfd-5c16-956c-fe561a5f9b7e/items/006_30692993"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "006_30692993"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offers",
            "id": "offer57",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer57"
            }
        },
        {
            "type": "product-offers",
            "id": "offer16",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer16"
            }
        },
        {
            "type": "concrete-products",
            "id": "009_30692991",
            "attributes": {
                "sku": "009_30692991",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "009",
                "name": "Canon IXUS 285",
                "description": "Quick connections Connect to your compatible smart device with just one tap using Wi-Fi with Dynamic NFC for easy sharing. Use Image Sync to automatically back-up new images to cloud services and capture great group shots with wireless Remote Shooting from your smart device. The Wi-Fi Button offers a quick and easy shortcut to Wi-Fi functions. This ultra-slim and stylish metal-bodied IXUS is easy to carry with you wherever you go and features a flexible 25mm ultra-wide 12x optical zoom lens with 24x ZoomPlus; so you can easily capture every moment, near or far, in superb quality photos and movies. Auto Zoom helps you select the best framing at the touch of a button.",
                "attributes": {
                    "optical_zoom": "12 x",
                    "usb_version": "2",
                    "self_timer": "2.10 s",
                    "hd_type": "Full HD",
                    "brand": "Canon",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 285",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Quick connections Connect to your compatible smart device with just one tap using Wi-Fi with Dynamic NFC for easy sharing. Use Image Sync to automatically",
                "attributeNames": {
                    "optical_zoom": "Optical zoom",
                    "usb_version": "USB version",
                    "self_timer": "Self-timer",
                    "hd_type": "HD type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/009_30692991"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer57"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer16"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "009_30692991",
            "attributes": {
                "sku": "009_30692991",
                "quantity": "1",
                "groupKey": "009_30692991",
                "abstractSku": "009",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 9999,
                    "sumPrice": 9999,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 9999,
                    "sumGrossPrice": 9999,
                    "unitTaxAmountFullAggregation": 1597,
                    "sumTaxAmountFullAggregation": 1596,
                    "sumSubtotalAggregation": 9999,
                    "unitSubtotalAggregation": 9999,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 9999,
                    "sumPriceToPayAggregation": 9999
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/50ea7615-ccfd-5c16-956c-fe561a5f9b7e/items/009_30692991"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "009_30692991"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "206_6429825",
            "attributes": {
                "sku": "206_6429825",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "206",
                "name": "Toshiba CAMILEO S30",
                "description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
                "attributes": {
                    "total_megapixels": "8 MP",
                    "display": "LCD",
                    "self_timer": "10 s",
                    "weight": "118 g",
                    "brand": "Toshiba",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "total_megapixels",
                    "color"
                ],
                "metaTitle": "Toshiba CAMILEO S30",
                "metaKeywords": "Toshiba,Smart Electronics",
                "metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
                "attributeNames": {
                    "total_megapixels": "Total Megapixels",
                    "display": "Display",
                    "self_timer": "Self-timer",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/206_6429825"
            }
        },
        {
            "type": "items",
            "id": "206_6429825",
            "attributes": {
                "sku": "206_6429825",
                "quantity": "1",
                "groupKey": "206_6429825",
                "abstractSku": "206",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 17774,
                    "sumPrice": 17774,
                    "taxRate": 7,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 17774,
                    "sumGrossPrice": 17774,
                    "unitTaxAmountFullAggregation": 1163,
                    "sumTaxAmountFullAggregation": 1163,
                    "sumSubtotalAggregation": 17774,
                    "unitSubtotalAggregation": 17774,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 17774,
                    "sumPriceToPayAggregation": 17774
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/50ea7615-ccfd-5c16-956c-fe561a5f9b7e/items/206_6429825"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "206_6429825"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offers",
            "id": "offer89",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer89"
            }
        },
        {
            "type": "product-offers",
            "id": "offer48",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer48"
            }
        },
        {
            "type": "concrete-products",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "041",
                "name": "Canon PowerShot SX610",
                "description": "Optical Quality Capture quality images from a distance with a 20.2 MP, 25mm wide, 18x optical zoom lens. Hybrid Auto mode records 4 seconds of video before each shot then compiles them all into a single video. With built in NFC and Wi-Fi its so easy to share your happy snaps to your favourite social media platforms. Expand your creative photography skills through applying a range of artistic presets such as toy camera or fish eye effect.  Capture images remotely and view live images from the camera via your phone and the Camera Connect app. Bring your memories to life as you experience videos on Full HD quality in 30p/MP4 recording.",
                "attributes": {
                    "hd_type": "Full HD",
                    "megapixel": "20.2 MP",
                    "optical_zoom": "18 x",
                    "display": "LCD",
                    "brand": "Canon",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon PowerShot SX610",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Optical Quality Capture quality images from a distance with a 20.2 MP, 25mm wide, 18x optical zoom lens. Hybrid Auto mode records 4 seconds of video before",
                "attributeNames": {
                    "hd_type": "HD type",
                    "megapixel": "Megapixel",
                    "optical_zoom": "Optical zoom",
                    "display": "Display",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/041_25904691"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer89"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer48"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "quantity": "3",
                "groupKey": "041_25904691",
                "abstractSku": "041",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 10380,
                    "sumPrice": 31140,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 10380,
                    "sumGrossPrice": 31140,
                    "unitTaxAmountFullAggregation": 1657,
                    "sumTaxAmountFullAggregation": 4972,
                    "sumSubtotalAggregation": 31140,
                    "unitSubtotalAggregation": 10380,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 10380,
                    "sumPriceToPayAggregation": 31140
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff/items/041_25904691"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "041_25904691"
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
<summary markdown='span'>Response sample with product offer availabilities</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "29f5d310-e6f3-56ed-b64a-1fd834dbc486",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "SoniaCart1_71221",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 0,
                    "taxTotal": 5416,
                    "subtotal": 33927,
                    "grandTotal": 33927,
                    "priceToPay": 33927
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/29f5d310-e6f3-56ed-b64a-1fd834dbc486"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "021_21081475-2-5"
                        },
                        {
                            "type": "items",
                            "id": "078_24602396_offer171"
                        }
                    ]
                }
            }
        },
        {
            "type": "carts",
            "id": "50ea7615-ccfd-5c16-956c-fe561a5f9b7e",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Guest shopping cart",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 500,
                    "discountTotal": 0,
                    "taxTotal": 13856,
                    "subtotal": 96773,
                    "grandTotal": 97273,
                    "priceToPay": 97273
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/50ea7615-ccfd-5c16-956c-fe561a5f9b7e"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "006_30692993"
                        },
                        {
                            "type": "items",
                            "id": "009_30692991"
                        },
                        {
                            "type": "items",
                            "id": "206_6429825"
                        }
                    ]
                }
            }
        },
        {
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
                    "taxTotal": 4972,
                    "subtotal": 31140,
                    "grandTotal": 31140,
                    "priceToPay": 31140
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
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/items?include=items,concrete-products,product-offers,product-offer-availabilities"
    },
    "included": [
        {
            "type": "product-offer-availabilities",
            "id": "offer95",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer95/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer95",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000006",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer95"
            },
            "relationships": {
                "product-offer-availabilities": {
                    "data": [
                        {
                            "type": "product-offer-availabilities",
                            "id": "offer95"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-availabilities",
            "id": "offer69",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer69/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer69",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer69"
            },
            "relationships": {
                "product-offer-availabilities": {
                    "data": [
                        {
                            "type": "product-offer-availabilities",
                            "id": "offer69"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-availabilities",
            "id": "offer28",
            "attributes": {
                "isNeverOutOfStock": false,
                "availability": true,
                "quantity": "10.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer28/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer28",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer28"
            },
            "relationships": {
                "product-offer-availabilities": {
                    "data": [
                        {
                            "type": "product-offer-availabilities",
                            "id": "offer28"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "021_21081475",
            "attributes": {
                "sku": "021_21081475",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "021",
                "name": "Sony Cyber-shot DSC-W830",
                "description": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing it, and slip in your pocket. Shooting great photos and videos is easy with the W800. Buttons are positioned for ease of use, while a dedicated movie button makes shooting movies simple. The vivid 2.7-type Clear Photo LCD display screen lets you view your stills and play back movies with minimal effort. Whip out the W800 to capture crisp, smooth footage in an instant. At the press of a button, you can record blur-free 720 HD images with digital sound. Breathe new life into a picture by using built-in Picture Effect technology. There’s a range of modes to choose from – you don’t even have to download image-editing software.",
                "attributes": {
                    "hdmi": "no",
                    "sensor_type": "CCD",
                    "display": "TFT",
                    "usb_version": "2",
                    "brand": "Sony",
                    "color": "Purple"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony Cyber-shot DSC-W830",
                "metaKeywords": "Sony,Entertainment Electronics",
                "metaDescription": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing i",
                "attributeNames": {
                    "hdmi": "HDMI",
                    "sensor_type": "Sensor type",
                    "display": "Display",
                    "usb_version": "USB version",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/021_21081475"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer95"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer69"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer28"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "021_21081475-2-5",
            "attributes": {
                "sku": "021_21081475",
                "quantity": "1",
                "groupKey": "021_21081475-2-5",
                "abstractSku": "021",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "calculations": {
                    "unitPrice": 10680,
                    "sumPrice": 10680,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 10680,
                    "sumGrossPrice": 10680,
                    "unitTaxAmountFullAggregation": 1944,
                    "sumTaxAmountFullAggregation": 1944,
                    "sumSubtotalAggregation": 12180,
                    "unitSubtotalAggregation": 12180,
                    "unitProductOptionPriceAggregation": 1500,
                    "sumProductOptionPriceAggregation": 1500,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 12180,
                    "sumPriceToPayAggregation": 12180
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": [
                    {
                        "optionGroupName": "Three (3) year limited warranty",
                        "sku": "OP_2_year_warranty",
                        "optionName": "Two (2) year limited warranty",
                        "price": 1000
                    },
                    {
                        "optionGroupName": "Gift wrapping",
                        "sku": "OP_gift_wrapping",
                        "optionName": "Gift wrapping",
                        "price": 500
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/29f5d310-e6f3-56ed-b64a-1fd834dbc486/items/021_21081475-2-5"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "021_21081475"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-availabilities",
            "id": "offer171",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer171/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer171",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000006",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer171"
            },
            "relationships": {
                "product-offer-availabilities": {
                    "data": [
                        {
                            "type": "product-offer-availabilities",
                            "id": "offer171"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "078_24602396",
            "attributes": {
                "sku": "078_24602396",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": 4,
                "reviewCount": 3,
                "productAbstractSku": "078",
                "name": "Sony Xperia Z3 Compact",
                "description": "Dive into new experiences Xperia Z3 Compact is the smartphone designed to enhance your life. And life isn’t lived inside. With the highest waterproof rating*, Xperia Z3 Compact lets you answer calls in the rain or take pictures in the pool. And it can handle all the drops into the sink in between. Combined with a slim, compact design that’s easy to use with one hand, Xperia Z3 Compact is the Android smartphone that teams durability with beauty. Some of the best times happen in the lowest light. Years of Sony camera expertise have been brought to Xperia Z3 Compact, to deliver unparalleled low-light capability. Thanks to Cyber-shot and Handycam technologies you can record stunning videos on the move and take crisp shots under water. Want to take your shots to the next level? Get creative with our unique camera apps. It’s our best smartphone camera yet – for memories that deserve more than good.",
                "attributes": {
                    "internal_ram": "2048 MB",
                    "display_type": "TFT",
                    "bluetooth_version": "4.0 LE",
                    "form_factor": "Bar",
                    "brand": "Sony",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "form_factor",
                    "color"
                ],
                "metaTitle": "Sony Xperia Z3 Compact",
                "metaKeywords": "Sony,Communication Electronics",
                "metaDescription": "Dive into new experiences Xperia Z3 Compact is the smartphone designed to enhance your life. And life isn’t lived inside. With the highest waterproof ratin",
                "attributeNames": {
                    "internal_ram": "Internal RAM",
                    "display_type": "Display type",
                    "bluetooth_version": "Blootooth version",
                    "form_factor": "Form factor",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/078_24602396"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer171"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "078_24602396_offer171",
            "attributes": {
                "sku": "078_24602396",
                "quantity": "1",
                "groupKey": "078_24602396_offer171",
                "abstractSku": "078",
                "amount": null,
                "productOfferReference": "offer171",
                "merchantReference": "MER000006",
                "calculations": {
                    "unitPrice": 21747,
                    "sumPrice": 21747,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 21747,
                    "sumGrossPrice": 21747,
                    "unitTaxAmountFullAggregation": 3472,
                    "sumTaxAmountFullAggregation": 3472,
                    "sumSubtotalAggregation": 21747,
                    "unitSubtotalAggregation": 21747,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 21747,
                    "sumPriceToPayAggregation": 21747
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/29f5d310-e6f3-56ed-b64a-1fd834dbc486/items/078_24602396_offer171"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "078_24602396"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-availabilities",
            "id": "offer54",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer54/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer54",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer54"
            },
            "relationships": {
                "product-offer-availabilities": {
                    "data": [
                        {
                            "type": "product-offer-availabilities",
                            "id": "offer54"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-availabilities",
            "id": "offer13",
            "attributes": {
                "isNeverOutOfStock": false,
                "availability": false,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer13/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer13",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer13"
            },
            "relationships": {
                "product-offer-availabilities": {
                    "data": [
                        {
                            "type": "product-offer-availabilities",
                            "id": "offer13"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "006_30692993",
            "attributes": {
                "sku": "006_30692993",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "006",
                "name": "Canon IXUS 175",
                "description": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies look like miniature scale models and much more. Capture the stunning detail in everyday subjects using 1 cm Macro to get right up close. Enjoy exceptional quality, detailed images thanks to 20.0 Megapixels and DIGIC 4+ processing. Face Detection technology makes capturing great shots of friends effortless, while Auto Zoom intelligently helps you select the best framing at the touch of a button.",
                "attributes": {
                    "optical_zoom": "8 x",
                    "combined_zoom": "32 x",
                    "display": "LCD",
                    "hdmi": "no",
                    "brand": "Canon",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 175",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies loo",
                "attributeNames": {
                    "optical_zoom": "Optical zoom",
                    "combined_zoom": "Combined zoom",
                    "display": "Display",
                    "hdmi": "HDMI",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/006_30692993"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer54"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer13"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "006_30692993",
            "attributes": {
                "sku": "006_30692993",
                "quantity": 2,
                "groupKey": "006_30692993",
                "abstractSku": "006",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 34500,
                    "sumPrice": 69000,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 34500,
                    "sumGrossPrice": 69000,
                    "unitTaxAmountFullAggregation": 5508,
                    "sumTaxAmountFullAggregation": 11017,
                    "sumSubtotalAggregation": 69000,
                    "unitSubtotalAggregation": 34500,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 34500,
                    "sumPriceToPayAggregation": 69000
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/50ea7615-ccfd-5c16-956c-fe561a5f9b7e/items/006_30692993"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "006_30692993"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-availabilities",
            "id": "offer57",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer57/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer57",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer57"
            },
            "relationships": {
                "product-offer-availabilities": {
                    "data": [
                        {
                            "type": "product-offer-availabilities",
                            "id": "offer57"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-availabilities",
            "id": "offer16",
            "attributes": {
                "isNeverOutOfStock": false,
                "availability": false,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer16/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer16",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer16"
            },
            "relationships": {
                "product-offer-availabilities": {
                    "data": [
                        {
                            "type": "product-offer-availabilities",
                            "id": "offer16"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "009_30692991",
            "attributes": {
                "sku": "009_30692991",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "009",
                "name": "Canon IXUS 285",
                "description": "Quick connections Connect to your compatible smart device with just one tap using Wi-Fi with Dynamic NFC for easy sharing. Use Image Sync to automatically back-up new images to cloud services and capture great group shots with wireless Remote Shooting from your smart device. The Wi-Fi Button offers a quick and easy shortcut to Wi-Fi functions. This ultra-slim and stylish metal-bodied IXUS is easy to carry with you wherever you go and features a flexible 25mm ultra-wide 12x optical zoom lens with 24x ZoomPlus; so you can easily capture every moment, near or far, in superb quality photos and movies. Auto Zoom helps you select the best framing at the touch of a button.",
                "attributes": {
                    "optical_zoom": "12 x",
                    "usb_version": "2",
                    "self_timer": "2.10 s",
                    "hd_type": "Full HD",
                    "brand": "Canon",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 285",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Quick connections Connect to your compatible smart device with just one tap using Wi-Fi with Dynamic NFC for easy sharing. Use Image Sync to automatically",
                "attributeNames": {
                    "optical_zoom": "Optical zoom",
                    "usb_version": "USB version",
                    "self_timer": "Self-timer",
                    "hd_type": "HD type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/009_30692991"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer57"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer16"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "009_30692991",
            "attributes": {
                "sku": "009_30692991",
                "quantity": "1",
                "groupKey": "009_30692991",
                "abstractSku": "009",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 9999,
                    "sumPrice": 9999,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 9999,
                    "sumGrossPrice": 9999,
                    "unitTaxAmountFullAggregation": 1597,
                    "sumTaxAmountFullAggregation": 1596,
                    "sumSubtotalAggregation": 9999,
                    "unitSubtotalAggregation": 9999,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 9999,
                    "sumPriceToPayAggregation": 9999
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/50ea7615-ccfd-5c16-956c-fe561a5f9b7e/items/009_30692991"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "009_30692991"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "206_6429825",
            "attributes": {
                "sku": "206_6429825",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "206",
                "name": "Toshiba CAMILEO S30",
                "description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
                "attributes": {
                    "total_megapixels": "8 MP",
                    "display": "LCD",
                    "self_timer": "10 s",
                    "weight": "118 g",
                    "brand": "Toshiba",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "total_megapixels",
                    "color"
                ],
                "metaTitle": "Toshiba CAMILEO S30",
                "metaKeywords": "Toshiba,Smart Electronics",
                "metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
                "attributeNames": {
                    "total_megapixels": "Total Megapixels",
                    "display": "Display",
                    "self_timer": "Self-timer",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/206_6429825"
            }
        },
        {
            "type": "items",
            "id": "206_6429825",
            "attributes": {
                "sku": "206_6429825",
                "quantity": "1",
                "groupKey": "206_6429825",
                "abstractSku": "206",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 17774,
                    "sumPrice": 17774,
                    "taxRate": 7,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 17774,
                    "sumGrossPrice": 17774,
                    "unitTaxAmountFullAggregation": 1163,
                    "sumTaxAmountFullAggregation": 1163,
                    "sumSubtotalAggregation": 17774,
                    "unitSubtotalAggregation": 17774,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 17774,
                    "sumPriceToPayAggregation": 17774
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/50ea7615-ccfd-5c16-956c-fe561a5f9b7e/items/206_6429825"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "206_6429825"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-availabilities",
            "id": "offer89",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer89/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer89",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer89"
            },
            "relationships": {
                "product-offer-availabilities": {
                    "data": [
                        {
                            "type": "product-offer-availabilities",
                            "id": "offer89"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-availabilities",
            "id": "offer48",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "20.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer48/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer48",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer48"
            },
            "relationships": {
                "product-offer-availabilities": {
                    "data": [
                        {
                            "type": "product-offer-availabilities",
                            "id": "offer48"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "041",
                "name": "Canon PowerShot SX610",
                "description": "Optical Quality Capture quality images from a distance with a 20.2 MP, 25mm wide, 18x optical zoom lens. Hybrid Auto mode records 4 seconds of video before each shot then compiles them all into a single video. With built in NFC and Wi-Fi its so easy to share your happy snaps to your favourite social media platforms. Expand your creative photography skills through applying a range of artistic presets such as toy camera or fish eye effect.  Capture images remotely and view live images from the camera via your phone and the Camera Connect app. Bring your memories to life as you experience videos on Full HD quality in 30p/MP4 recording.",
                "attributes": {
                    "hd_type": "Full HD",
                    "megapixel": "20.2 MP",
                    "optical_zoom": "18 x",
                    "display": "LCD",
                    "brand": "Canon",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon PowerShot SX610",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Optical Quality Capture quality images from a distance with a 20.2 MP, 25mm wide, 18x optical zoom lens. Hybrid Auto mode records 4 seconds of video before",
                "attributeNames": {
                    "hd_type": "HD type",
                    "megapixel": "Megapixel",
                    "optical_zoom": "Optical zoom",
                    "display": "Display",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/041_25904691"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer89"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer48"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "quantity": "3",
                "groupKey": "041_25904691",
                "abstractSku": "041",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 10380,
                    "sumPrice": 31140,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 10380,
                    "sumGrossPrice": 31140,
                    "unitTaxAmountFullAggregation": 1657,
                    "sumTaxAmountFullAggregation": 4972,
                    "sumSubtotalAggregation": 31140,
                    "unitSubtotalAggregation": 10380,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 10380,
                    "sumPriceToPayAggregation": 31140
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff/items/041_25904691"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "041_25904691"
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
<summary markdown='span'>Response sample with product offer prices</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "29f5d310-e6f3-56ed-b64a-1fd834dbc486",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "SoniaCart1_71221",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 0,
                    "taxTotal": 5416,
                    "subtotal": 33927,
                    "grandTotal": 33927,
                    "priceToPay": 33927
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/29f5d310-e6f3-56ed-b64a-1fd834dbc486"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "021_21081475-2-5"
                        },
                        {
                            "type": "items",
                            "id": "078_24602396_offer171"
                        }
                    ]
                }
            }
        },
        {
            "type": "carts",
            "id": "50ea7615-ccfd-5c16-956c-fe561a5f9b7e",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Guest shopping cart",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 500,
                    "discountTotal": 0,
                    "taxTotal": 13856,
                    "subtotal": 96773,
                    "grandTotal": 97273,
                    "priceToPay": 97273
                },
                "discounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/50ea7615-ccfd-5c16-956c-fe561a5f9b7e"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "006_30692993"
                        },
                        {
                            "type": "items",
                            "id": "009_30692991"
                        },
                        {
                            "type": "items",
                            "id": "206_6429825"
                        }
                    ]
                }
            }
        },
        {
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
                    "taxTotal": 4972,
                    "subtotal": 31140,
                    "grandTotal": 31140,
                    "priceToPay": 31140
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
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/items?include=items,concrete-products,product-offers,product-offer-prices"
    },
    "included": [
        {
            "type": "product-offer-prices",
            "id": "offer95",
            "attributes": {
                "price": 9078,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9078,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer95/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer95",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000006",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer95"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer95"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-prices",
            "id": "offer69",
            "attributes": {
                "price": 9612,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9612,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer69/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer69",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer69"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer69"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-prices",
            "id": "offer28",
            "attributes": {
                "price": 10146,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 10146,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer28/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer28",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer28"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer28"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "021_21081475",
            "attributes": {
                "sku": "021_21081475",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "021",
                "name": "Sony Cyber-shot DSC-W830",
                "description": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing it, and slip in your pocket. Shooting great photos and videos is easy with the W800. Buttons are positioned for ease of use, while a dedicated movie button makes shooting movies simple. The vivid 2.7-type Clear Photo LCD display screen lets you view your stills and play back movies with minimal effort. Whip out the W800 to capture crisp, smooth footage in an instant. At the press of a button, you can record blur-free 720 HD images with digital sound. Breathe new life into a picture by using built-in Picture Effect technology. There’s a range of modes to choose from – you don’t even have to download image-editing software.",
                "attributes": {
                    "hdmi": "no",
                    "sensor_type": "CCD",
                    "display": "TFT",
                    "usb_version": "2",
                    "brand": "Sony",
                    "color": "Purple"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony Cyber-shot DSC-W830",
                "metaKeywords": "Sony,Entertainment Electronics",
                "metaDescription": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing i",
                "attributeNames": {
                    "hdmi": "HDMI",
                    "sensor_type": "Sensor type",
                    "display": "Display",
                    "usb_version": "USB version",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/021_21081475"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer95"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer69"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer28"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "021_21081475-2-5",
            "attributes": {
                "sku": "021_21081475",
                "quantity": "1",
                "groupKey": "021_21081475-2-5",
                "abstractSku": "021",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "calculations": {
                    "unitPrice": 10680,
                    "sumPrice": 10680,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 10680,
                    "sumGrossPrice": 10680,
                    "unitTaxAmountFullAggregation": 1944,
                    "sumTaxAmountFullAggregation": 1944,
                    "sumSubtotalAggregation": 12180,
                    "unitSubtotalAggregation": 12180,
                    "unitProductOptionPriceAggregation": 1500,
                    "sumProductOptionPriceAggregation": 1500,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 12180,
                    "sumPriceToPayAggregation": 12180
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": [
                    {
                        "optionGroupName": "Three (3) year limited warranty",
                        "sku": "OP_2_year_warranty",
                        "optionName": "Two (2) year limited warranty",
                        "price": 1000
                    },
                    {
                        "optionGroupName": "Gift wrapping",
                        "sku": "OP_gift_wrapping",
                        "optionName": "Gift wrapping",
                        "price": 500
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/29f5d310-e6f3-56ed-b64a-1fd834dbc486/items/021_21081475-2-5"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "021_21081475"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-prices",
            "id": "offer171",
            "attributes": {
                "price": 21747,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 21747,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer171/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer171",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000006",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer171"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer171"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "078_24602396",
            "attributes": {
                "sku": "078_24602396",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": 4,
                "reviewCount": 3,
                "productAbstractSku": "078",
                "name": "Sony Xperia Z3 Compact",
                "description": "Dive into new experiences Xperia Z3 Compact is the smartphone designed to enhance your life. And life isn’t lived inside. With the highest waterproof rating*, Xperia Z3 Compact lets you answer calls in the rain or take pictures in the pool. And it can handle all the drops into the sink in between. Combined with a slim, compact design that’s easy to use with one hand, Xperia Z3 Compact is the Android smartphone that teams durability with beauty. Some of the best times happen in the lowest light. Years of Sony camera expertise have been brought to Xperia Z3 Compact, to deliver unparalleled low-light capability. Thanks to Cyber-shot and Handycam technologies you can record stunning videos on the move and take crisp shots under water. Want to take your shots to the next level? Get creative with our unique camera apps. It’s our best smartphone camera yet – for memories that deserve more than good.",
                "attributes": {
                    "internal_ram": "2048 MB",
                    "display_type": "TFT",
                    "bluetooth_version": "4.0 LE",
                    "form_factor": "Bar",
                    "brand": "Sony",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "form_factor",
                    "color"
                ],
                "metaTitle": "Sony Xperia Z3 Compact",
                "metaKeywords": "Sony,Communication Electronics",
                "metaDescription": "Dive into new experiences Xperia Z3 Compact is the smartphone designed to enhance your life. And life isn’t lived inside. With the highest waterproof ratin",
                "attributeNames": {
                    "internal_ram": "Internal RAM",
                    "display_type": "Display type",
                    "bluetooth_version": "Blootooth version",
                    "form_factor": "Form factor",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/078_24602396"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer171"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "078_24602396_offer171",
            "attributes": {
                "sku": "078_24602396",
                "quantity": "1",
                "groupKey": "078_24602396_offer171",
                "abstractSku": "078",
                "amount": null,
                "productOfferReference": "offer171",
                "merchantReference": "MER000006",
                "calculations": {
                    "unitPrice": 21747,
                    "sumPrice": 21747,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 21747,
                    "sumGrossPrice": 21747,
                    "unitTaxAmountFullAggregation": 3472,
                    "sumTaxAmountFullAggregation": 3472,
                    "sumSubtotalAggregation": 21747,
                    "unitSubtotalAggregation": 21747,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 21747,
                    "sumPriceToPayAggregation": 21747
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/29f5d310-e6f3-56ed-b64a-1fd834dbc486/items/078_24602396_offer171"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "078_24602396"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-prices",
            "id": "offer54",
            "attributes": {
                "price": 31050,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 31050,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 31320,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer54/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer54",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer54"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer54"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-prices",
            "id": "offer13",
            "attributes": {
                "price": 32775,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 32775,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 33060,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer13/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer13",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer13"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer13"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "006_30692993",
            "attributes": {
                "sku": "006_30692993",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "006",
                "name": "Canon IXUS 175",
                "description": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies look like miniature scale models and much more. Capture the stunning detail in everyday subjects using 1 cm Macro to get right up close. Enjoy exceptional quality, detailed images thanks to 20.0 Megapixels and DIGIC 4+ processing. Face Detection technology makes capturing great shots of friends effortless, while Auto Zoom intelligently helps you select the best framing at the touch of a button.",
                "attributes": {
                    "optical_zoom": "8 x",
                    "combined_zoom": "32 x",
                    "display": "LCD",
                    "hdmi": "no",
                    "brand": "Canon",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 175",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies loo",
                "attributeNames": {
                    "optical_zoom": "Optical zoom",
                    "combined_zoom": "Combined zoom",
                    "display": "Display",
                    "hdmi": "HDMI",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/006_30692993"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer54"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer13"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "006_30692993",
            "attributes": {
                "sku": "006_30692993",
                "quantity": 2,
                "groupKey": "006_30692993",
                "abstractSku": "006",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 34500,
                    "sumPrice": 69000,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 34500,
                    "sumGrossPrice": 69000,
                    "unitTaxAmountFullAggregation": 5508,
                    "sumTaxAmountFullAggregation": 11017,
                    "sumSubtotalAggregation": 69000,
                    "unitSubtotalAggregation": 34500,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 34500,
                    "sumPriceToPayAggregation": 69000
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/50ea7615-ccfd-5c16-956c-fe561a5f9b7e/items/006_30692993"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "006_30692993"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-prices",
            "id": "offer57",
            "attributes": {
                "price": 8500,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 8500,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer57/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer57",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer57"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer57"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-prices",
            "id": "offer16",
            "attributes": {
                "price": 8975,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 8975,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer16/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer16",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer16"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer16"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "009_30692991",
            "attributes": {
                "sku": "009_30692991",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "009",
                "name": "Canon IXUS 285",
                "description": "Quick connections Connect to your compatible smart device with just one tap using Wi-Fi with Dynamic NFC for easy sharing. Use Image Sync to automatically back-up new images to cloud services and capture great group shots with wireless Remote Shooting from your smart device. The Wi-Fi Button offers a quick and easy shortcut to Wi-Fi functions. This ultra-slim and stylish metal-bodied IXUS is easy to carry with you wherever you go and features a flexible 25mm ultra-wide 12x optical zoom lens with 24x ZoomPlus; so you can easily capture every moment, near or far, in superb quality photos and movies. Auto Zoom helps you select the best framing at the touch of a button.",
                "attributes": {
                    "optical_zoom": "12 x",
                    "usb_version": "2",
                    "self_timer": "2.10 s",
                    "hd_type": "Full HD",
                    "brand": "Canon",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 285",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Quick connections Connect to your compatible smart device with just one tap using Wi-Fi with Dynamic NFC for easy sharing. Use Image Sync to automatically",
                "attributeNames": {
                    "optical_zoom": "Optical zoom",
                    "usb_version": "USB version",
                    "self_timer": "Self-timer",
                    "hd_type": "HD type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/009_30692991"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer57"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer16"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "009_30692991",
            "attributes": {
                "sku": "009_30692991",
                "quantity": "1",
                "groupKey": "009_30692991",
                "abstractSku": "009",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 9999,
                    "sumPrice": 9999,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 9999,
                    "sumGrossPrice": 9999,
                    "unitTaxAmountFullAggregation": 1597,
                    "sumTaxAmountFullAggregation": 1596,
                    "sumSubtotalAggregation": 9999,
                    "unitSubtotalAggregation": 9999,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 9999,
                    "sumPriceToPayAggregation": 9999
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/50ea7615-ccfd-5c16-956c-fe561a5f9b7e/items/009_30692991"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "009_30692991"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "206_6429825",
            "attributes": {
                "sku": "206_6429825",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "206",
                "name": "Toshiba CAMILEO S30",
                "description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
                "attributes": {
                    "total_megapixels": "8 MP",
                    "display": "LCD",
                    "self_timer": "10 s",
                    "weight": "118 g",
                    "brand": "Toshiba",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "total_megapixels",
                    "color"
                ],
                "metaTitle": "Toshiba CAMILEO S30",
                "metaKeywords": "Toshiba,Smart Electronics",
                "metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
                "attributeNames": {
                    "total_megapixels": "Total Megapixels",
                    "display": "Display",
                    "self_timer": "Self-timer",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/206_6429825"
            }
        },
        {
            "type": "items",
            "id": "206_6429825",
            "attributes": {
                "sku": "206_6429825",
                "quantity": "1",
                "groupKey": "206_6429825",
                "abstractSku": "206",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 17774,
                    "sumPrice": 17774,
                    "taxRate": 7,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 17774,
                    "sumGrossPrice": 17774,
                    "unitTaxAmountFullAggregation": 1163,
                    "sumTaxAmountFullAggregation": 1163,
                    "sumSubtotalAggregation": 17774,
                    "unitSubtotalAggregation": 17774,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 17774,
                    "sumPriceToPayAggregation": 17774
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/50ea7615-ccfd-5c16-956c-fe561a5f9b7e/items/206_6429825"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "206_6429825"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-prices",
            "id": "offer89",
            "attributes": {
                "price": 9342,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9342,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": [
                            {
                                "grossAmount": 10065,
                                "netAmount": 10050,
                                "quantity": 2
                            },
                            {
                                "grossAmount": 10058,
                                "netAmount": 10045,
                                "quantity": 7
                            },
                            {
                                "grossAmount": 10052,
                                "netAmount": 10040,
                                "quantity": 18
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer89/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer89",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer89"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer89"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-prices",
            "id": "offer48",
            "attributes": {
                "price": 9861,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9861,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": [
                            {
                                "grossAmount": 10650,
                                "netAmount": 10500,
                                "quantity": 3
                            },
                            {
                                "grossAmount": 10580,
                                "netAmount": 10450,
                                "quantity": 9
                            },
                            {
                                "grossAmount": 10520,
                                "netAmount": 10400,
                                "quantity": 17
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer48/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer48",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer48"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer48"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "041",
                "name": "Canon PowerShot SX610",
                "description": "Optical Quality Capture quality images from a distance with a 20.2 MP, 25mm wide, 18x optical zoom lens. Hybrid Auto mode records 4 seconds of video before each shot then compiles them all into a single video. With built in NFC and Wi-Fi its so easy to share your happy snaps to your favourite social media platforms. Expand your creative photography skills through applying a range of artistic presets such as toy camera or fish eye effect.  Capture images remotely and view live images from the camera via your phone and the Camera Connect app. Bring your memories to life as you experience videos on Full HD quality in 30p/MP4 recording.",
                "attributes": {
                    "hd_type": "Full HD",
                    "megapixel": "20.2 MP",
                    "optical_zoom": "18 x",
                    "display": "LCD",
                    "brand": "Canon",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon PowerShot SX610",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Optical Quality Capture quality images from a distance with a 20.2 MP, 25mm wide, 18x optical zoom lens. Hybrid Auto mode records 4 seconds of video before",
                "attributeNames": {
                    "hd_type": "HD type",
                    "megapixel": "Megapixel",
                    "optical_zoom": "Optical zoom",
                    "display": "Display",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/041_25904691"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer89"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer48"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "quantity": "3",
                "groupKey": "041_25904691",
                "abstractSku": "041",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 10380,
                    "sumPrice": 31140,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 10380,
                    "sumGrossPrice": 31140,
                    "unitTaxAmountFullAggregation": 1657,
                    "sumTaxAmountFullAggregation": 4972,
                    "sumSubtotalAggregation": 31140,
                    "unitSubtotalAggregation": 10380,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 10380,
                    "sumPriceToPayAggregation": 31140
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff/items/041_25904691"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "041_25904691"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

<a name="retrieve-registered-users-carts-response-attributes"></a>

**General cart information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected when the cart was created. |
| store | String | Store for which the cart was created. |
| name | String | Specifies a cart name.</br>The field is available in multi-cart environments only. |
| isDefault | Boolean | Specifies whether the cart is the default one for the customer.</br>The field is available in multi-cart environments only.  |

**Discount information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| displayName | String | Discount name. |
| amount | Integer | Discount amount applied to the cart.  |
| code | String | Discount code applied to the cart. |

**Totals**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| expenseTotal | String | Total amount of expenses (including, e.g., shipping costs). |
| discountTotal | Integer | Total amount of discounts applied to the cart.  |
| taxTotal | String | Total amount of taxes to be paid. |
| subTotal | Integer | Subtotal of the cart.  |
| grandTotal | Integer | Grand total of the cart.  |
| selectedProductOptions | array | List of attributes describing the product options that were added to cart with the product. |
| priceToPay| Integer | Final price to pay after discounts with additions. |

**Product options**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| selectedProductOptions.optionGroupName | String | Name of the group to which the option belongs. |
| selectedProductOptions.sku | String | SKU of the product option. |
| selectedProductOptions.optionName | String | Product option name. |
| selectedProductOptions.price | Integer | Product option price in cents. |
| selectedProductOptions.currencyIsoCode | String | ISO 4217 code of the currency in which the product option price is specified. |

| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| promotional-items | id | String | Unique identifier of the promotional item. The ID can be used to apply the promotion to the given purchase. |
| promotional-items | sku | String | SKU of the promoted abstract product. |
| promotional-items | quantity | Integer | Specifies how many promotions can be applied to the given purchase. |
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
| shared-carts | idCompanyUser | String | Unique identifier of the [company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user) with whom the cart is shared. |
| shared-carts | idCartPermissionGroup | Integer | Unique identifier of the cart permission group that describes the permissions granted to the user with whom the cart is shared. |
| cart-permission-groups | name | String | Permission group name. |
| cart-permission-groups | isDefault | Boolean | Defines if the permission group is applied to shared carts by default. |
| company-users |  id | String | Unique identifier of the [company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user) with whom the cart is shared. |
| company-users |  isActive | Boolean | Defines if the [company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user) is active. |
| company-users |  isDefault | Boolean | Defines if the [company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user) is default for the [customer](https://documentation.spryker.com/docs/authenticating-as-a-customer). |
| product-offer-availabilities | isNeverOutOfStock| Boolean | A boolean to show if this is an item that is never out of stock. {% info_block warningBox "Note" %}This option is available only in case you have upgraded your shop to the [Marketplace](/docs/marketplace/user/intro-to-spryker/marketplace-concept.html) provided by Spryker.{% endinfo_block %} |
| product-offer-availabilities  | availability | Boolean | A boolean to inform you about availability. |
| product-offer-availabilities | quantity | Integer | Available stock. |
| product-offer-prices | price  | Integer | Price to pay for the item in cents. |
| product-offer-prices  | prices  | Array   | An array of prices for the product offer.|
| product-offer-prices | priceTypeName | String  | Price type. |
| product-offer-prices | netAmount | Integer | Net price in cents. |
| product-offer-prices | grossAmount | Integer | Gross price in cents.  |
| product-offer-prices | currency.code | String  | Currency code. |
| product-offer-prices | currency.name | String  | Currency name. |
| product-offer-prices | currency.symbol | String  | Currency symbol.|
|product-offer-prices     | volumePrices   | Object  |  An array of objects defining the [volume prices](https://documentation.spryker.com/docs/volume-prices-overview) for the product offer.  |
| product-offer-prices | grossAmount | Integer   |  Gross volume price in cents.         |
| product-offer-prices | netAmount | Integer   | Net volume price in cents.          |
| product-offer-prices | quantity  |  Integer         | Quantity of items in offer when the volume price applies.  |
| product-offers | merchantSku | String  | SKU of the merchant the product offer belongs to.{% info_block warningBox "Note" %}This option is available only in case you have upgraded your shop to the [Marketplace](/docs/marketplace/user/intro-to-spryker/marketplace-concept.html) provided by Spryker.{% endinfo_block %}|
| product-offers | merchantReference | String  | Merchant reference assigned to every merchant. |
| product-offers | isDefault  | Boolean | Defines whether the product offer is default or not. |

For the attributes of the included resources, see:
* [Retrieve a concrete product](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/concrete-products/retrieving-concrete-products.html#retrieve-a-concrete-product)
* [Add an item to a registered user's cart](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/carts-of-registered-users/managing-items-in-carts-of-registered-users.html#add-an-item-to-a-registered-users-cart)
* [Managing Gift Cards of Registered Users](https://documentation.spryker.com/docs/gift-cards-of-registered-users)
* [Retrieving product labels](https://documentation.spryker.com/docs/en/retrieving-product-labels#product-labels-response-attributes)

## Retrieve a registered user's cart

To retrieve a particular cart, send the request:

***
`GET` **/carts/{% raw %}*{{cart_uuid}}*{% endraw %}**
***


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{cart_uuid}}***{% endraw %} | Unique identifier of a cart. [Create a cart](#create-a-cart) or [retrieve a registered user's cart](#retrieve-registered-users-carts) to get it. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/docs/authenticating-as-a-customer#authenticate-as-a-customer) or [authenticating as a company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>items</li><li>cart-permission-groups</li><li>shared-carts</li><li>company-users</li><li>cart-rules</li><li>promotional-items</li><li>vouchers</li><li>gift-cards</li><li>concrete-products</li><li>product-options</li><li>product-labels</li><li>product-offers</li><li>product-offer-availabilities</li><li>product-offer-prices</li><li>merchants</li></ul> |

{% info_block infoBox "Info" %}

* To retrieve all the product options of the item in a cart, include `items`, `concrete-products`, and `product-options`.
* To retrieve product labels of the products in a cart, include `items`, `concrete-products`, and `product-labels`.
* To retrieve product offers, include `items`, `concrete-products`, and `product-offers`.
* To retrieve product offer availabilities, include `items`, `concrete-products`, `product-offers`, and `product-offer-availabilities`.
* To retrieve product offer prices, include `items`, `concrete-products`, `product-offers`, and `product-offer-prices`.

{% endinfo_block %}



| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=items` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with its items, related concrete products and cart permission groups included. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=cart-permission-groups` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with its cart permissions included. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=shared-carts` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with details on the shared cart. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=shared-carts,company-users` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with information about shared carts and the company uses they are shared with. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=cart-rules` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with cart rules. |
| `GET https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=promotional-items` | Retrieve the `1ce91011-8d60-59ef-9fe0-4493ef3628b2` cart with its promotional items. |
| `GET https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d?include=gift-cards` | Retrieve the `8ef901fe-fe47-5569-9668-2db890dbee6` cart with detailed information on its gift cards. |
| `GET https://glue.mysprykershop.com/carts/8fc45eda-cddf-5fec-8291-e2e5f8014398?include=items,concrete-products,product-options` | Retrieve the `8fc45eda-cddf-5fec-8291-e2e5f8014398` cart with items, respective concrete product, and their product options. |
| `GET https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830?include=vouchers` | Retrieve the `976af32f-80f6-5f69-878f-4ea549ee0830` cart with detailed information on its vouchers. |
| `GET https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9?include=items,concrete-products,product-labels` | Retrieve the `0c3ec260-694a-5cec-b78c-d37d32f92ee9` cart with information about the product labels assigned to the products in the cart. |
| `GET http://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff?include=items,concrete-products,product-offers` |Retrieve the `bef3732e-bc7a-5c07-a40c-f38caf1c40ff` cart with details on product offers.|
| `GET http://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff?include=items,concrete-products,product-offers,product-offer-availabilities` |Retrieve the `bef3732e-bc7a-5c07-a40c-f38caf1c40ff` cart with details on product offer availabilities.|
| `GET http://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff?include=items,concrete-products,product-offers,product-offer-prices` |Retrieve the `bef3732e-bc7a-5c07-a40c-f38caf1c40ff` cart with details on product offer prices.|
| `GET http://glue.mysprykershop.com/carts/54a8290f-a2f6-58db-ae5d-ad4d04aad6ae?include=items,merchants` | Retrieve the `54a8290f-a2f6-58db-ae5d-ad4d04aad6ae` cart with detailed information on merchant products.{% info_block warningBox "Note" %}This option is available only in case you have upgraded your shop to the [Marketplace](/docs/marketplace/user/intro-to-spryker/marketplace-concept.html) provided by Spryker.{% endinfo_block %} |


### Response

<details>
<summary markdown='span'>Response sample</summary>

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
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4"
        }
    }
}
```    
</details>


<details>
<summary markdown='span'>Response sample with items</summary>

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
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "421479"
                    },
                    {
                        "type": "items",
                        "id": "575260"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "items",
            "id": "421479",
            "attributes": {
                "sku": "421479",
                "quantity": 2,
                "groupKey": "421479",
                "abstractSku": "M21744",
                "amount": null,
                "calculations": {
                    "unitPrice": 442,
                    "sumPrice": 884,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 442,
                    "sumGrossPrice": 884,
                    "unitTaxAmountFullAggregation": 64,
                    "sumTaxAmountFullAggregation": 127,
                    "sumSubtotalAggregation": 884,
                    "unitSubtotalAggregation": 442,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 44,
                    "sumDiscountAmountAggregation": 88,
                    "unitDiscountAmountFullAggregation": 44,
                    "sumDiscountAmountFullAggregation": 88,
                    "unitPriceToPayAggregation": 398,
                    "sumPriceToPayAggregation": 796
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4/items/421479"
            }
        },
        {
            "type": "items",
            "id": "575260",
            "attributes": {
                "sku": "575260",
                "quantity": 1,
                "groupKey": "575260",
                "abstractSku": "M1028062",
                "amount": null,
                "calculations": {
                    "unitPrice": 28767,
                    "sumPrice": 28767,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 28767,
                    "sumGrossPrice": 28767,
                    "unitTaxAmountFullAggregation": 4133,
                    "sumTaxAmountFullAggregation": 4134,
                    "sumSubtotalAggregation": 28767,
                    "unitSubtotalAggregation": 28767,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 2877,
                    "sumDiscountAmountAggregation": 2877,
                    "unitDiscountAmountFullAggregation": 2877,
                    "sumDiscountAmountFullAggregation": 2877,
                    "unitPriceToPayAggregation": 25890,
                    "sumPriceToPayAggregation": 25890
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4/items/575260"
            }
        }
    ]
}
```    
</details>


<details>
<summary markdown='span'>Response sample with cart permission groups</summary>

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
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4"
        },
        "relationships": {
            "cart-permission-groups": {
                "data": [
                    {
                        "type": "cart-permission-groups",
                        "id": "1"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "cart-permission-groups",
            "id": "1",
            "attributes": {
                "name": "READ_ONLY",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cart-permission-groups/1"
            }
        }
    ]
}
```    
</details>



<details>
<summary markdown='span'>Sample response with details on shared carts</summary>

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
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4"
        },
        "relationships": {
            "shared-carts": {
                "data": [
                    {
                        "type": "shared-carts",
                        "id": "8ceae991-0b8d-5c85-9f40-06c4c04fc7f4"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "shared-carts",
            "id": "8ceae991-0b8d-5c85-9f40-06c4c04fc7f4",
            "attributes": {
                "idCompanyUser": "72778771-2020-574f-bbaf-05da5889e79e",
                "idCartPermissionGroup": 1
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shared-carts/8ceae991-0b8d-5c85-9f40-06c4c04fc7f4"
            }
        }
    ]
}
```    
</details>

<details>
<summary markdown='span'>Response sample with shared carts and company users they are shared with</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "0c3ec260-694a-5cec-b78c-d37d32f92ee9",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "CHF",
            "store": "DE",
            "name": "Weekly office",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 0,
                "taxTotal": 1999,
                "subtotal": 12522,
                "grandTotal": 12522,
                "priceToPay": 12522
            },
            "discounts": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9?include=shared-carts,company-users"
        },
        "relationships": {
            "shared-carts": {
                "data": [
                    {
                        "type": "shared-carts",
                        "id": "79e91e88-b83a-5095-aa64-b3914bdd4863"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "company-users",
            "id": "2816dcbd-855e-567e-b26f-4d57f3310bb8",
            "attributes": {
                "isActive": true,
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/company-users/2816dcbd-855e-567e-b26f-4d57f3310bb8"
            }
        },
        {
            "type": "shared-carts",
            "id": "79e91e88-b83a-5095-aa64-b3914bdd4863",
            "attributes": {
                "idCompanyUser": "2816dcbd-855e-567e-b26f-4d57f3310bb8",
                "idCartPermissionGroup": 2
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shared-carts/79e91e88-b83a-5095-aa64-b3914bdd4863"
            },
            "relationships": {
                "company-users": {
                    "data": [
                        {
                            "type": "company-users",
                            "id": "2816dcbd-855e-567e-b26f-4d57f3310bb8"
                        }
                    ]
                }
            }
        }
    ]
}
```

</summary>
</details>

<details>
<summary markdown='span'>Response sample with cart rules</summary>

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
            ]
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
<summary markdown='span'>Response sample with a promotional item</summary>

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
            ]
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
<summary markdown='span'>Response sample with with details on gift cards</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "8ef901fe-fe47-5569-9668-2db890dbee6d",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Shopping cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 4200,
                "taxTotal": 6035,
                "subtotal": 42000,
                "grandTotal": 37800,
                "priceToPay": 17800
            },
            "discounts": [
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 4200,
                    "code": null
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d"
        },
        "relationships": {
            "gift-cards": {
                "data": [
                    {
                        "type": "gift-cards",
                        "id": "GC-I6UB6O56-20"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "gift-cards",
            "id": "GC-I6UB6O56-20",
            "attributes": {
                "code": "GC-I6UB6O56-20",
                "name": "Gift Card 200",
                "value": 20000,
                "currencyIsoCode": "EUR",
                "actualValue": 20000,
                "isActive": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d/cart-codes/GC-I6UB6O56-20"
            }
        }
    ]
}
```    
</details>

<details>
<summary markdown='span'>Response sample with items, respective concrete products, and their product options</summary>

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
            "self": "https://glue.mysprykershop.com/carts/8fc45eda-cddf-5fec-8291-e2e5f8014398?include=items,concrete-products,product-options"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
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
<summary markdown='span'>Response sample with vouchers</summary>

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

<details>
<summary markdown='span'>Response sample with product labels</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "0c3ec260-694a-5cec-b78c-d37d32f92ee9",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "CHF",
            "store": "DE",
            "name": "Weekly office",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 0,
                "taxTotal": 538,
                "subtotal": 3369,
                "grandTotal": 3369,
                "priceToPay": 3369
            },
            "discounts": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9?include=items,concrete-products,product-labels"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "421511"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 3,
                "frontEndReference": "sale"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-labels/5"
            }
        },
        {
            "type": "concrete-products",
            "id": "421511",
            "attributes": {
                "sku": "421511",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": 4.3,
                "reviewCount": 4,
                "name": "Parker ballpoint pen URBAN Premium S0911450 M refill, blue",
                "description": "In transparent color tones with lightly curved body.<p>* Line width: 0.5 mm * type designation of the refill: Slider 774 * refill exchangeable * printing mechanism * waterproof * design of the grip zone: round * tip material: stainless steel",
                "attributes": {
                    "material": "metal",
                    "wischfest": "No",
                    "abwischbar": "No",
                    "wasserfest": "No",
                    "nachfuellbar": "No",
                    "schreibfarbe": "blue",
                    "brand": "Parker"
                },
                "superAttributesDefinition": [
                    "material"
                ],
                "metaTitle": "",
                "metaKeywords": "Schreibgeräte,Schreibgeräte,Kugelschreiber,Kugelschreiber,Kulis,Kulis,Kulischreiber,Kulischreiber",
                "metaDescription": "",
                "attributeNames": {
                    "material": "Material",
                    "wischfest": "Smudge-resistant",
                    "abwischbar": "Wipeable",
                    "wasserfest": "Watertight",
                    "nachfuellbar": "Refillable",
                    "schreibfarbe": "Writing color",
                    "brand": "Brand"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/421511"
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
            "type": "items",
            "id": "421511",
            "attributes": {
                "sku": "421511",
                "quantity": "1",
                "groupKey": "421511",
                "abstractSku": "M21759",
                "amount": null,
                "calculations": {
                    "unitPrice": 3369,
                    "sumPrice": 3369,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 3369,
                    "sumGrossPrice": 3369,
                    "unitTaxAmountFullAggregation": 538,
                    "sumTaxAmountFullAggregation": 538,
                    "sumSubtotalAggregation": 3369,
                    "unitSubtotalAggregation": 3369,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 3369,
                    "sumPriceToPayAggregation": 3369
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9/items/421511"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "421511"
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
<summary markdown='span'>Response sample with details on product offers</summary>

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
                "taxTotal": 4972,
                "subtotal": 31140,
                "grandTotal": 31140,
                "priceToPay": 31140
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
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-offers",
            "id": "offer89",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer89"
            }
        },
        {
            "type": "product-offers",
            "id": "offer48",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer48"
            }
        },
        {
            "type": "concrete-products",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "041",
                "name": "Canon PowerShot SX610",
                "description": "Optical Quality Capture quality images from a distance with a 20.2 MP, 25mm wide, 18x optical zoom lens. Hybrid Auto mode records 4 seconds of video before each shot then compiles them all into a single video. With built in NFC and Wi-Fi its so easy to share your happy snaps to your favourite social media platforms. Expand your creative photography skills through applying a range of artistic presets such as toy camera or fish eye effect.  Capture images remotely and view live images from the camera via your phone and the Camera Connect app. Bring your memories to life as you experience videos on Full HD quality in 30p/MP4 recording.",
                "attributes": {
                    "hd_type": "Full HD",
                    "megapixel": "20.2 MP",
                    "optical_zoom": "18 x",
                    "display": "LCD",
                    "brand": "Canon",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon PowerShot SX610",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Optical Quality Capture quality images from a distance with a 20.2 MP, 25mm wide, 18x optical zoom lens. Hybrid Auto mode records 4 seconds of video before",
                "attributeNames": {
                    "hd_type": "HD type",
                    "megapixel": "Megapixel",
                    "optical_zoom": "Optical zoom",
                    "display": "Display",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/041_25904691"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer89"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer48"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "quantity": "3",
                "groupKey": "041_25904691",
                "abstractSku": "041",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 10380,
                    "sumPrice": 31140,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 10380,
                    "sumGrossPrice": 31140,
                    "unitTaxAmountFullAggregation": 1657,
                    "sumTaxAmountFullAggregation": 4972,
                    "sumSubtotalAggregation": 31140,
                    "unitSubtotalAggregation": 10380,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 10380,
                    "sumPriceToPayAggregation": 31140
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff/items/041_25904691"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "041_25904691"
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
<summary markdown='span'>Response sample with product offer availabilities</summary>

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
                "taxTotal": 4972,
                "subtotal": 31140,
                "grandTotal": 31140,
                "priceToPay": 31140
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
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-offer-availabilities",
            "id": "offer89",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer89/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer89",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer89"
            },
            "relationships": {
                "product-offer-availabilities": {
                    "data": [
                        {
                            "type": "product-offer-availabilities",
                            "id": "offer89"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-availabilities",
            "id": "offer48",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "20.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer48/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer48",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer48"
            },
            "relationships": {
                "product-offer-availabilities": {
                    "data": [
                        {
                            "type": "product-offer-availabilities",
                            "id": "offer48"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "041",
                "name": "Canon PowerShot SX610",
                "description": "Optical Quality Capture quality images from a distance with a 20.2 MP, 25mm wide, 18x optical zoom lens. Hybrid Auto mode records 4 seconds of video before each shot then compiles them all into a single video. With built in NFC and Wi-Fi its so easy to share your happy snaps to your favourite social media platforms. Expand your creative photography skills through applying a range of artistic presets such as toy camera or fish eye effect.  Capture images remotely and view live images from the camera via your phone and the Camera Connect app. Bring your memories to life as you experience videos on Full HD quality in 30p/MP4 recording.",
                "attributes": {
                    "hd_type": "Full HD",
                    "megapixel": "20.2 MP",
                    "optical_zoom": "18 x",
                    "display": "LCD",
                    "brand": "Canon",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon PowerShot SX610",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Optical Quality Capture quality images from a distance with a 20.2 MP, 25mm wide, 18x optical zoom lens. Hybrid Auto mode records 4 seconds of video before",
                "attributeNames": {
                    "hd_type": "HD type",
                    "megapixel": "Megapixel",
                    "optical_zoom": "Optical zoom",
                    "display": "Display",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/041_25904691"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer89"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer48"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "quantity": "3",
                "groupKey": "041_25904691",
                "abstractSku": "041",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 10380,
                    "sumPrice": 31140,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 10380,
                    "sumGrossPrice": 31140,
                    "unitTaxAmountFullAggregation": 1657,
                    "sumTaxAmountFullAggregation": 4972,
                    "sumSubtotalAggregation": 31140,
                    "unitSubtotalAggregation": 10380,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 10380,
                    "sumPriceToPayAggregation": 31140
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff/items/041_25904691"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "041_25904691"
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
<summary markdown='span'>Response sample with product offer prices</summary>

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
                "taxTotal": 4972,
                "subtotal": 31140,
                "grandTotal": 31140,
                "priceToPay": 31140
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
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-offer-prices",
            "id": "offer89",
            "attributes": {
                "price": 9342,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9342,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": [
                            {
                                "grossAmount": 10065,
                                "netAmount": 10050,
                                "quantity": 2
                            },
                            {
                                "grossAmount": 10058,
                                "netAmount": 10045,
                                "quantity": 7
                            },
                            {
                                "grossAmount": 10052,
                                "netAmount": 10040,
                                "quantity": 18
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer89/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer89",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer89"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer89"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-offer-prices",
            "id": "offer48",
            "attributes": {
                "price": 9861,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9861,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": [
                            {
                                "grossAmount": 10650,
                                "netAmount": 10500,
                                "quantity": 3
                            },
                            {
                                "grossAmount": 10580,
                                "netAmount": 10450,
                                "quantity": 9
                            },
                            {
                                "grossAmount": 10520,
                                "netAmount": 10400,
                                "quantity": 17
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer48/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer48",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer48"
            },
            "relationships": {
                "product-offer-prices": {
                    "data": [
                        {
                            "type": "product-offer-prices",
                            "id": "offer48"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "041",
                "name": "Canon PowerShot SX610",
                "description": "Optical Quality Capture quality images from a distance with a 20.2 MP, 25mm wide, 18x optical zoom lens. Hybrid Auto mode records 4 seconds of video before each shot then compiles them all into a single video. With built in NFC and Wi-Fi its so easy to share your happy snaps to your favourite social media platforms. Expand your creative photography skills through applying a range of artistic presets such as toy camera or fish eye effect.  Capture images remotely and view live images from the camera via your phone and the Camera Connect app. Bring your memories to life as you experience videos on Full HD quality in 30p/MP4 recording.",
                "attributes": {
                    "hd_type": "Full HD",
                    "megapixel": "20.2 MP",
                    "optical_zoom": "18 x",
                    "display": "LCD",
                    "brand": "Canon",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon PowerShot SX610",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Optical Quality Capture quality images from a distance with a 20.2 MP, 25mm wide, 18x optical zoom lens. Hybrid Auto mode records 4 seconds of video before",
                "attributeNames": {
                    "hd_type": "HD type",
                    "megapixel": "Megapixel",
                    "optical_zoom": "Optical zoom",
                    "display": "Display",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/041_25904691"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer89"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer48"
                        }
                    ]
                }
            }
        },
        {
            "type": "items",
            "id": "041_25904691",
            "attributes": {
                "sku": "041_25904691",
                "quantity": "3",
                "groupKey": "041_25904691",
                "abstractSku": "041",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 10380,
                    "sumPrice": 31140,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 10380,
                    "sumGrossPrice": 31140,
                    "unitTaxAmountFullAggregation": 1657,
                    "sumTaxAmountFullAggregation": 4972,
                    "sumSubtotalAggregation": 31140,
                    "unitSubtotalAggregation": 10380,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 10380,
                    "sumPriceToPayAggregation": 31140
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff/items/041_25904691"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "041_25904691"
                        }
                    ]
                }
            }
        }
    ]
}

```
details

<details>
<summary markdown='span'>Response sample with merchant products</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "54a8290f-a2f6-58db-ae5d-ad4d04aad6ae",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Test1",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 0,
                "taxTotal": 822,
                "subtotal": 12572,
                "grandTotal": 12572,
                "priceToPay": 12572
            },
            "discounts": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/54a8290f-a2f6-58db-ae5d-ad4d04aad6ae?include=items,merchants"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "109_19416433"
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
                "latitude": "13.384458",
                "longitude": "52.534105",
                "faxNumber": "+49 30 234567800",
                "legalInformation": {
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
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
            "id": "109_19416433",
            "attributes": {
                "sku": "109_19416433",
                "quantity": "1",
                "groupKey": "109_19416433",
                "abstractSku": "109",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "calculations": {
                    "unitPrice": 12572,
                    "sumPrice": 12572,
                    "taxRate": 7,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 12572,
                    "sumGrossPrice": 12572,
                    "unitTaxAmountFullAggregation": 822,
                    "sumTaxAmountFullAggregation": 822,
                    "sumSubtotalAggregation": 12572,
                    "unitSubtotalAggregation": 12572,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 12572,
                    "sumPriceToPayAggregation": 12572
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/54a8290f-a2f6-58db-ae5d-ad4d04aad6ae/items/109_19416433"
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

For the attributes of carts of registered users and included resources, see [Retrieve a registered user's carts](#retrieve-registered-users-carts-response-attributes).

For the attributes of the included resources, see:
* [Add an item to a registered user's cart](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/carts-of-registered-users/managing-items-in-carts-of-registered-users.html#add-an-item-to-a-registered-users-cart)
* [Managing gift cards of registered users](https://documentation.spryker.com/docs/managing-gift-cards-of-registered-users).
* [Cart permission groups](https://documentation.spryker.com/docs/sharing-company-user-carts-201907#retrieving-cart-permission-groups).
* [Managing items in carts of registered users](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/carts-of-registered-users/managing-items-in-carts-of-registered-users.html).
* [Retrieve a concrete product](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/concrete-products/retrieving-concrete-products.html#retrieve-a-concrete-product)
* [Retrieve product labels](https://documentation.spryker.com/docs/en/retrieving-product-labels#product-labels-response-attributes)
* [Retrieve merchant information](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/retrieving-merchant-information.html)
* [Retrieving product offers](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/retrieving-product-offers.html)

## Edit a cart

You can edit the name of the cart, change the currency and price mode. To do that, send the request:

---
`PATCH` **/carts/{% raw %}*{{cart_uuid}}*{% endraw %}**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{cart_uuid}}***{% endraw %} | Unique identifier of a cart. [Create a cart](#create-a-cart) or [retrieve a registered user's carts](#retrieve-registered-users-carts) to get it. |



{% info_block infoBox "Info" %}

* You can change the price mode of an empty cart but not the one that has items in it.
* Currency and store can be changed for an empty cart and for a cart with items anytime.

{% endinfo_block %}


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/docs/authenticating-as-a-customer#authenticate-as-a-customer) or [authenticating as a company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user#authenticate-as-a-company-user).  |
| If-Match | 075d700b908d7e41f751c5d2d4392407 | &check; | Makes the request conditional. It matches the listed conditional ETags from the headers when retrieving the cart. The patch is applied only if the tag value matches. |

Request sample: `https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9`

```json
{
   "data":{
      "type":"carts",
      "attributes":{
         "name":"My Cart with awesome name",
         "priceMode":"GROSS_MODE",
         "currency":"EUR",
         "store":"DE"
      }
   }
}
```


| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String | &check; | Sets the cart name.This field can be set only if you are using the Multiple Carts feature. If you are operating in a single-cart environment, an attempt to set the value will result in an error with the `422 Unprocessable Entry` status code. Cart name should be unique and should not be longer than 30 characters.|
| priceMode | Enum | &check; | Sets the price mode to be used for the cart. Possible values:<ul><li>GROSS_MODE—prices after tax;</li><li>NET_MODE—prices before tax.</li></ul>For details, see [Net & Gross Prices](https://documentation.spryker.com/docs/net-gross-price). |
| currency | String | &check; | Sets the cart currency. |
| store | String | &check; | Sets the name of the store where to create the cart. |

### Response

Response sample:

```json
{
    "data": {
        "type": "carts",
        "id": "0c3ec260-694a-5cec-b78c-d37d32f92ee9",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "My Cart with awesome name",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 63538,
                "taxTotal": 79689,
                "subtotal": 635381,
                "grandTotal": 571843,
                "priceToPay": 571843
            },
            "discounts": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9"
        }
    }
}

```

## Delete a cart
To delete a cart, send the request:

---
`DELETE` **/carts/{% raw %}*{{cart_uuid}}*{% endraw %}**

---

| Path parameter | Description |
| --- | --- |
| {% raw %}***{{cart_uuid}}***{% endraw %}| Unique identifier of a cart. [Create a cart](#create-a-cart) or [retrieve a registered user's carts](#retrieve-registered-users-carts) to get it. |



{% info_block infoBox "Deleting carts" %}

You cannot delete a cart if it is the customer's only cart. If you attempt to delete a customer's last cart, the endpoint responds with the `422 Unprocessable Entry` status code. If you delete the default cart of a customer, another cart will be assigned as default automatically.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/docs/authenticating-as-a-customer#authenticate-as-a-customer) or [authenticating as a company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user#authenticate-as-a-company-user).  |



Request sample: `DELETE https://glue.mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054`

### Response

If the cart is deleted successfully, the endpoint returns the `204 No Content` status code.

## Possible errors


| CODE | REASON |
| --- | --- |
| 101 | Cart with given uuid not found. |
| 102 | Failed to add an item to cart. |
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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).
