---
title: Managing carts of registered users
description: Retrieve details about the carts of the registered users and learn what else you can do with the resource in the Spryker Marketplace
template: glue-api-storefront-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/marketplace/dev/glue-api-guides/202311.0/carts-of-registered-users/managing-carts-of-registered-users.html
related:
  - title: Managing items in carts of registered users
    link: docs/pbc/all/cart-and-checkout/page.version/marketplace/manage-using-glue-api/carts-of-registered-users/manage-items-in-carts-of-registered-users.html

---

This endpoint allows managing carts by creating, retrieving, and deleting them.

## Multiple carts

Unlike guest carts, carts of registered users have an unlimited lifetime. Also, if the [Multiple Carts feature is integrated into your project](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-feature.html), and [Glue API is enabled for multi-cart operations](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-feature.html), registered users can have an unlimited number of carts.


## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:
* [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)
* [Install the Product Labels Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-labels-glue-api.html)
* [Install the Measurement Units Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-measurement-units-glue-api.html)
* [Install the Promotions & Discounts feature Glue API](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html)
* [Install the Product Options Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-options-glue-api.html)
* [Install the Shared Carts feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shared-carts-feature.html)
* [Install the Merchant Offers Glue API](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-glue-api.html)
* [Install the Marketplace Product Offer Prices Glue API](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html)
* [Install the Marketplace Product Offer Volume Prices Glue API](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-volume-prices-glue-api.html)

## Create a cart

To create a cart, send the request:

***
`POST` **/carts**
***

{% info_block infoBox "Info" %}

Carts created via Glue API are always set as the default carts for the user.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |

Request sample: create a cart

`POST https://glue.mysprykershop.com/carts`

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
| name | String | &check; | Sets the cart name.<br>You can pass this field only with the Multiple Carts feature integrated. If you are operating in a single-cart environment, an attempt to set the value returns the `422 Unprocessable Entry` error. |
| priceMode | Enum | &check; | Sets the price mode for the cart. Possible values:<ul><li>GROSS_MODE: prices after tax</li><li>NET_MODE: prices before tax</li></ul>For details, see [Net &amp; gross prices management](/docs/pbc/all/price-management/{{page.version}}/base-shop/extend-and-customize/configuration-of-price-modes-and-types.html). |
| currency | String | &check; | Sets the cart currency. |
| store | String | &check; | Sets the name of the store where to create the cart. |

### Response

Response sample: create a cart

```json
{
  "data": {
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

**General cart information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| priceMode | String | Price mode of the cart. |
| currency | String | Currency of the cart. |
| store | String | Store in which the cart is created. |
| name | String | Cart name.<br>The field is available only in multi-cart environments. |
| isDefault | Boolean | Specifies if the cart is the default one for the customer.<br>The field is available only in multi-cart environments.  |

**Discount information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| displayName | String | Discount name. |
| amount | Integer | Discount amount applied to the cart.  |
| code | String | Discount code applied to the cart. |

**Totals**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| totals | Object | Describes the total calculations. |
| totals.expenseTotal | String | Total amount of expenses (including, for example, shipping costs). |
| totals.discountTotal | Integer | Total amount of discounts applied to the cart.  |
| totals.taxTotal | String | Total amount of taxes to be paid. |
| totals.subTotal | Integer | Subtotal of the cart.  |
| totals.grandTotal | Integer | Grand total of the cart.  |


## Retrieve registered user's carts

To retrieve all carts, send the request:

***
`GET` **/carts**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. |<ul><li>items</li><li>cart-permission-groups</li><li>shared-carts</li><li>company-users</li><li>cart-rules</li><li>promotional-items</li><li>vouchers</li><li>gift-cards</li><li>concrete-products</li><li>product-options</li><li>product-labels</li><li>product-offers</li><li>product-offer-availabilities</li><li>product-offer-prices</li><li>merchants</li></ul> |

{% info_block infoBox "Info" %}

* To retrieve all the product options of the item in a cart, include `items`, `concrete-products`, and `product-options`.
* To retrieve information about the company user a cart is shared with, include `shared-carts` and `company-users`.
* To retrieve product labels of the products in a cart, include `items`, `concrete-products`, and `product-labels`.
* To retrieve product offers, include `items`, `concrete-products`, and `product-offers`.
* To retrieve product offer availabilities, include `items`, `concrete-products`, and `product-offer-availabilities`.
* To retrieve product offer prices, include `items`, `concrete-products`, and `product-offer-prices`.

{% endinfo_block %}

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/carts` | Retrieve all carts. |
| `GET https://glue.mysprykershop.com/carts?include=items` | Retrieve all carts with the items in them included.  |
| `GET https://glue.mysprykershop.com/carts?include=cart-permission-groups` | Retrieve all carts with cart permission groups included. |
| `GET https://glue.mysprykershop.com/carts?include=shared-carts` | Retrieve all carts with shared carts included. |
| `GET https://glue.mysprykershop.com/carts?include=shared-carts,company-users` | Retrieve all carts with included information about shared carts, and the company uses they are shared with. |
| `GET https://glue.mysprykershop.com/carts?include=cart-rules` | Retrieve all carts with cart rules included. |
| `GET https://glue.mysprykershop.com/carts?include=vouchers` | Retrieve all carts with the applied vouchers included. |
| `GET https://glue.mysprykershop.com/carts?include=promotional-items` | Retrieve all carts with promotional items included. |
| `GET https://glue.mysprykershop.com/carts?include=gift-cards` | Retrieve all carts with the applied gift cards included. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-options` | Retrieve all carts with items, respective concrete products, and their product options included. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-labels` | Retrieve all carts with the included information: concrete products and the product labels assigned to the products in the carts. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-offers` | Retrieve all carts with product offers included. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-offers,product-offer-availabilities` | Retrieve all carts with product offers and product offer availabilities included. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-offers,product-offer-prices` | Retrieve all carts with product offers and product offer prices included. |
| `GET https://glue.mysprykershop.com/carts?include=merchants` | Retrieve all carts with merchants included. |


### Response

<details>
<summary>Response sample: no carts are retrieved</summary>

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
<summary>Response sample: retrieve all carts</summary>

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
<summary>Response sample: retrieve all carts with the items included</summary>

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
<summary>Response sample: retrieve all carts with cart permission groups included</summary>

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
<summary>Response sample: retrieve all carts with shared carts included</summary>

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
<summary>Response sample: retrieve all carts with included information about shared carts, and the company users they are shared with</summary>

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
<summary>Response sample: retrieve all carts with cart rules included</summary>

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
<summary>Response sample: retrieve all carts with the applied vouchers included</summary>

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
<summary>Response sample: retrieve all carts with promotional items included</summary>

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
<summary>Response sample: retrieve all carts with the applied gift cards</summary>

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
<summary>Response sample: retrieve all carts with items, respective concrete products, and their product options included</summary>

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
                "description": "Enjoy greater flexibility  ...than ever before with the Galaxy Tab S2. Remarkably slim and ultra-lightweight, use this device to take your e-books, photos, videos and work-related files with you wherever you need to go. The Galaxy Tab S2's 4:3 ratio display is optimised for magazine reading and web use. Switch to Reading Mode to adjust screen brightness and change wallpaper—create an ideal eBook reading environment designed to reduce the strain on your eyes. Get greater security with convenient and accurate fingerprint functionality. Activate fingerprint lock by pressing the home button. Use fingerprint verification to restrict / allow access to your web browser, screen lock mode and your Samsung account.",
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
<summary>Response sample: retrieve all carts with their concrete products and the product labels assigned to the products in the carts</summary>

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
<summary>Response sample: retrieve all carts with product offers included</summary>

```json
{
    "data": [
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
<summary>Response sample: retrieve all carts with product offers and product offer availabilities included</summary>

```json
{
    "data": [
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
<summary>Response sample: retrieve all carts with product offers and product offer prices included</summary>

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
    "links": {
        "self": "https://glue.mysprykershop.com/items?include=items,concrete-products,product-offers,product-offer-prices"
    },
    "included": [
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

<details>
<summary>Response sample: retrieve all carts with merchants included</summary>

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
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/items?include=merchants"
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
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
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

<a name="retrieve-registered-users-carts-response-attributes"></a>

**General cart information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected when the cart was created. |
| store | String | Store for which the cart was created. |
| name | String | Specifies a cart name.<br>The field is available in multi-cart environments only. |
| isDefault | Boolean | Specifies whether the cart is the default one for the customer.<br>The field is available in multi-cart environments only.  |

**Discount information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| displayName | String | Discount name. |
| amount | Integer | Discount amount applied to the cart.  |
| code | String | Discount code applied to the cart. |

**Totals**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| expenseTotal | String | Total amount of expenses (including, for example, shipping costs). |
| discountTotal | Integer | Total amount of discounts applied to the cart.  |
| taxTotal | Integer | Total amount of taxes to be paid. |
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

**Included resource attributes**

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
| shared-carts | idCompanyUser | String | Unique identifier of the [company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html) with whom the cart is shared. |
| shared-carts | idCartPermissionGroup | Integer | Unique identifier of the cart permission group that describes the permissions granted to the user with whom the cart is shared. |
| cart-permission-groups | name | String | Permission group name. |
| cart-permission-groups | isDefault | Boolean | Defines if the permission group is applied to shared carts by default. |
| company-users |  id | String | Unique identifier of the [company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html) with whom the cart is shared. |
| company-users |  isActive | Boolean | Defines if the [company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html) is active. |
| company-users |  isDefault | Boolean | Defines if the [company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html) is default for the [customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

{% include pbc/all/glue-api-guides/{{page.version}}/product-offer-availabilities-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/product-offer-availabilities-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md -->

For the attributes of the included resources, see:

* [Add an item to a registered user's cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-items-in-carts-of-registered-users.html#add-an-item-to-a-registered-users-cart)
* [Managing gift cards of registered users](/docs/pbc/all/gift-cards/{{page.version}}/manage-using-glue-api/glue-api-manage-gift-cards-of-registered-users.html)
* [Retrieving product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-product-labels.html)
* [Retrieving product offers](/docs/pbc/all/offer-management/{{page.version}}/marketplace/glue-api-retrieve-product-offers.html#product-offers-response-attributes)
* [Retrieving product offer prices](/docs/pbc/all/price-management/{{page.version}}/marketplace/glue-api-retrieve-product-offer-prices.html#product-offer-prices-response-attributes)
* [Retrieving merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html#merchants-response-attributes)

## Retrieve a registered user's cart

To retrieve a registered user's cart, send the request:

***
`GET` {% raw %}**/carts/*{{cart_uuid}}***{% endraw %}
***


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{cart_uuid}}***{% endraw %} | Unique identifier of a cart. [Create a cart](#create-a-cart) or [retrieve a registered user's cart](#retrieve-registered-users-carts) to get it. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |

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
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=items` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with its items included. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=cart-permission-groups` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with its cart permissions included. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=shared-carts` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with details on the shared carts. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=shared-carts,company-users` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with information about the shared carts and the company uses they are shared with. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=cart-rules` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with the cart rules. |
| `GET https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=promotional-items` | Retrieve the `1ce91011-8d60-59ef-9fe0-4493ef3628b2` cart with its promotional items. |
| `GET https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d?include=gift-cards` | Retrieve the `8ef901fe-fe47-5569-9668-2db890dbee6` cart with detailed information on its gift cards. |
| `GET https://glue.mysprykershop.com/carts/8fc45eda-cddf-5fec-8291-e2e5f8014398?include=items,concrete-products,product-options` | Retrieve the `8fc45eda-cddf-5fec-8291-e2e5f8014398` cart with items, concrete products, and their product options. |
| `GET https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830?include=vouchers` | Retrieve the `976af32f-80f6-5f69-878f-4ea549ee0830` cart with detailed information on its vouchers. |
| `GET https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9?include=items,concrete-products,product-labels` | Retrieve the `0c3ec260-694a-5cec-b78c-d37d32f92ee9` cart with information about the product labels assigned to the products in the cart. |
| `GET https://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff?include=items,concrete-products,product-offers` | Retrieve the `bef3732e-bc7a-5c07-a40c-f38caf1c40ff` cart with details on product offers.|
| `GET https://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff?include=items,concrete-products,product-offers,product-offer-availabilities` | Retrieve the `bef3732e-bc7a-5c07-a40c-f38caf1c40ff` cart with details on product offers and product offer availabilities.|
| `GET https://glue.mysprykershop.com/carts/bef3732e-bc7a-5c07-a40c-f38caf1c40ff?include=items,concrete-products,product-offers,product-offer-prices` | Retrieve the `bef3732e-bc7a-5c07-a40c-f38caf1c40ff` cart with details on product offers and product offer prices.|
| `GET https://glue.mysprykershop.com/carts/54a8290f-a2f6-58db-ae5d-ad4d04aad6ae?include=items,merchants` | Retrieve the `54a8290f-a2f6-58db-ae5d-ad4d04aad6ae` cart with detailed information on merchants. |


### Response

<details>
<summary>Response sample: retrieve a cart</summary>

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
<summary>Response sample: retrieve a cart with its items included</summary>

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
<summary>Response sample: retrieve a cart with its cart permissions included</summary>

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
<summary>Response sample: retrieve a cart with the details on the shared carts</summary>

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
<summary>Response sample: retrieve a cart with the information about the shared carts and the company users they are shared with</summary>

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
</details>

<details>
<summary>Response sample: retrieve a cart with the cart rules included</summary>

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
<summary>Response sample: retrieve a cart with its promotional items</summary>

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
<summary>Response sample: retrieve a cart with the detailed information on its gift cards</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "8ef901fe-fe47-5569-9668-2db890dbee6d",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Shopping cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 4200,
                "taxTotal": 6035,
                "subtotal": 42000,
                "grandTotal": 37800,
                "priceToPay": 17800
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
            "gift-cards": {
                "data": [
                    {
                        "type": "gift-cards",
                        "id": "GC-I6UB6O56-20"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "gift-cards",
            "id": "GC-I6UB6O56-20",
            "attributes": {
                "code": "GC-I6UB6O56-20",
                "name": "Gift Card 200",
                "value": 20000,
                "currencyIsoCode": "EUR",
                "actualValue": 20000,
                "isActive": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d/cart-codes/GC-I6UB6O56-20"
            }
        }
    ]
}
```    
</details>

<details>
<summary>Response sample: retrieve a cart with items, concrete products, and their product options</summary>

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
                "description": "Enjoy greater flexibility  ...than ever before with the Galaxy Tab S2. Remarkably slim and ultra-lightweight, use this device to take your e-books, photos, videos and work-related files with you wherever you need to go. The Galaxy Tab S2's 4:3 ratio display is optimised for magazine reading and web use. Switch to Reading Mode to adjust screen brightness and change wallpaper—create an ideal eBook reading environment designed to reduce the strain on your eyes. Get greater security with convenient and accurate fingerprint functionality. Activate fingerprint lock by pressing the home button. Use fingerprint verification to restrict / allow access to your web browser, screen lock mode and your Samsung account.",
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
<summary>Response sample: retrieve a cart with the detailed information on its vouchers</summary>

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
<summary>Response sample: retrieve a cart with information about the product labels assigned to the products in the cart</summary>

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
<summary>Response sample: retrieve a cart with details on product offers</summary>

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
<summary>Response sample: retrieve a cart with details on product offers and product offer availabilities</summary>

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
<summary>Response sample: retrieve a cart with details on product offers and product offer prices</summary>

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

</details>

<details>
<summary>Response sample: retrieve a cart with detailed information on merchants</summary>

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
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to let us deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
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

{% include pbc/all/glue-api-guides/{{page.version}}/product-offer-availabilities-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/product-offer-availabilities-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md -->

For the attributes of the included resources, see:
* [Add an item to a registered user's cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-items-in-carts-of-registered-users.html#add-an-item-to-a-registered-users-cart)
* [Managing gift cards of registered users](/docs/pbc/all/gift-cards/{{page.version}}/manage-using-glue-api/glue-api-manage-gift-cards-of-registered-users.html).
* [Cart permission groups](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-retrieve-cart-permission-groups.html).
* [Managing items in carts of registered users](/docs/pbc/all/cart-and-checkout/{{page.version}}/marketplace/manage-using-glue-api/carts-of-registered-users/manage-items-in-carts-of-registered-users.html).
* [Retrieve product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-product-labels.html)
* [Retrieving merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html#merchants-response-attributes)
* [Retrieving product offers](/docs/pbc/all/offer-management/{{page.version}}/marketplace/glue-api-retrieve-product-offers.html#product-offers-response-attributes)
* [Retrieving product offers](/docs/pbc/all/price-management/{{page.version}}/marketplace/glue-api-retrieve-product-offer-prices.html#product-offer-prices-response-attributes)

## Edit a cart

You can edit the name of the cart, change the currency and price mode. To do that, send the request:

---
`PATCH` {% raw %}**/carts/*{{cart_uuid}}***{% endraw %}

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{cart_uuid}}***{% endraw %} | Unique identifier of a cart. [Create a cart](#create-a-cart) or [retrieve a registered user's carts](#retrieve-registered-users-carts) to get it. |



{% info_block infoBox "Info" %}

* You can change the price mode only of an empty cart.

{% endinfo_block %}


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |
| If-Match | 075d700b908d7e41f751c5d2d4392407 | &check; | Makes the request conditional. It matches the listed conditional ETags from the headers when retrieving the cart. The patch is applied only if the tag value matches. |

Request sample: edit a cart

`https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9`

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
| name | String | &check; | Sets the cart name.This field can be set only if you are using the Multiple Carts feature. If you are operating in a single-cart environment, an attempt to set the value will result in an error with the `422 Unprocessable Entry` status code. Cart name should be unique and should not be longer than 30 characters.|
| priceMode | Enum | &check; | Sets the price mode to be used for the cart. Possible values:<ul><li>GROSS_MODE—prices after tax;</li><li>NET_MODE—prices before tax.</li></ul>For details, see [Net & Gross Prices](/docs/pbc/all/price-management/{{page.version}}/base-shop/extend-and-customize/configuration-of-price-modes-and-types.html). |
| currency | String | &check; | Sets the cart currency. |
| store | String | &check; | Sets the name of the store where to create the cart. |

### Response

Response sample: edit a cart

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
`DELETE` {% raw %}**/carts/*{{cart_uuid}}***{% endraw %}

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{cart_uuid}}***{% endraw %}| Unique identifier of a cart. [Create a cart](#create-a-cart) or [retrieve a registered user's carts](#retrieve-registered-users-carts) to get it. |



{% info_block infoBox "Deleting carts" %}

You can delete a cart only if a customer has at least one more cart. Deleting a customer's last cart returns the `422 Unprocessable Entry` status code. If you delete the default cart of a customer, another cart is assigned as default automatically.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |


Request sample: delete a cart

`DELETE https://glue.mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054`

### Response

If the cart is deleted successfully, the endpoint returns the `204 No Content` status code.

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
| 111 | Can't switch price mode when there are items in the cart. |
| 112 | Store data is invalid. |
| 113 | Cart item could not be added. |
| 114 | Cart item could not be updated. |
| 115 | Unauthorized cart action. |
| 116 | Currency is missing. |
| 117 | Currency is incorrect. |
| 118 | Price mode is missing. |
| 119 | Price mode is incorrect. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
