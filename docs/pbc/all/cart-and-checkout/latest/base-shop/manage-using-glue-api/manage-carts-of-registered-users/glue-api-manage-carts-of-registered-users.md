---
title: "Glue API: Manage carts of registered users"
description: Retrieve details about the carts of the registered users and learn what else you can do with the resource.
last_updated: Jun 22, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-carts-of-registered-users
originalArticleId: ac357bc6-db9b-43a5-a65a-ef55259cd379
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html
  - /docs/scos/dev/glue-api-guides/202204.0/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/manage-using-glue-api/manage-carts-of-registered-users/manage-carts-of-registered-users.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html
related:
  - title: Managing items in carts of registered users
    link: docs/pbc/all/cart-and-checkout/page.version/marketplace/manage-using-glue-api/carts-of-registered-users/manage-items-in-carts-of-registered-users.html
  - title: Managing gift cards of registered users
    link: docs/pbc/all/gift-cards/page.version/manage-using-glue-api/glue-api-manage-gift-cards-of-registered-users.html
  - title: Retrieving customer carts
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/customers/glue-api-retrieve-customer-orders.html
---

This endpoint allows managing carts by creating, retrieving, and deleting them.

## Multiple carts

Unlike guest carts, carts of registered users have an unlimited lifetime. If the Multiple Carts feature is [integrated into your project](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-feature.html), and Glue is [enabled for multi-cart operations](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-feature.html), registered users can also have an unlimited number of carts.


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
- [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)
- [Install the Product Labels Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-labels-glue-api.html)
- [Install the Measurement Units Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-measurement-units-glue-api.html)
- [Install the Promotions & Discounts feature Glue API](/docs/pbc/all/discount-management/latest/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html)
- [Install the Product Options Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-options-glue-api.html)
- [Shared Carts feature integration](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-shared-carts-feature.html)

## Create a cart

To create a cart, send the request:

---
`POST` **/carts**

---

{% info_block infoBox %}

Carts created via Glue API are always set as the default carts for the user.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |

Request sample: `POST https://glue.mysprykershop.com/carts`

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
| name | String | &check; | Sets the cart name.<br>This field can be set only if you are using the multiple carts feature. If you are operating in a single-cart environment, an attempt to set the value will result in an error with the "422 Unprocessable Entry" status code. |
| priceMode | Enum | &check; | Sets the price mode to be used for the cart. Possible values:<ul><li>GROSS_MODE—prices after tax;</li><li>NET_MODE—prices before tax.</li></ul>For details, see [Net &amp; Gross Prices](/docs/pbc/all/price-management/latest/base-shop/extend-and-customize/configuration-of-price-modes-and-types.html). |
| currency | String | &check; | Sets the cart currency. |
| store | String | &check; | Sets the name of the store where to create the cart. |

### Response


<details>
<summary>Response sample</summary>

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

{% include pbc/all/glue-api-guides/latest/carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/carts-response-attributes.md -->



## Retrieve registered user's carts

To retrieve all carts, send the request:

---
`GET` **/carts**

---

{% info_block infoBox "Note" %}

Alternatively, you can retrieve all carts belonging to a customer through the **/customers/*{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %}*/carts** endpoint. For details, see [Retrieving customer carts](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/glue-api-retrieve-customer-orders.html).

{% endinfo_block %}

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. |<ul><li>items</li><li>cart-permission-groups</li><li>shared-carts</li><li>company-users</li><li>cart-rules</li><li>promotional-items</li><li>vouchers</li><li>gift-cards</li><li>concrete-products</li><li>product-options</li><li>product-labels</li></ul> |

{% info_block infoBox "Included resources" %}

- To retrieve all the product options of the item in a cart, include `items`, `concrete-products`, and `product-options`.
- To retrieve information about the company user a cart is shared with, include `shared-carts` and `company-users`.
- To retrieve product labels of the products in a cart, include `items`, `concrete-products`, and `product-labels`.

{% endinfo_block %}

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/carts` | Retrieve all carts of a user. |
| `GET https://glue.mysprykershop.com/carts?include=items` | Retrieve all carts of a user with the items in them included.  |
| `GET https://glue.mysprykershop.com/carts?include=cart-permission-groups` | Retrieve all carts of a user with cart permission groups included. |
| `GET https://glue.mysprykershop.com/carts?include=shared-carts` | Retrieve all carts of a user with shared carts. |
| `GET https://glue.mysprykershop.com/carts?include=shared-carts,company-users` | Retrieve all carts of a user with information about shared carts and the company uses they are shared with. |
| `GET https://glue.mysprykershop.com/carts?include=cart-rules` | Retrieve all carts of a user with cart rules. |
| `GET https://glue.mysprykershop.com/carts?include=vouchers` | Retrieve all carts of a user with information about applied vouchers. |
| `GET https://glue.mysprykershop.com/carts?include=promotional-items` | Retrieve information about promotional items for the cart. |
| `GET https://glue.mysprykershop.com/carts?include=gift-cards` | Retrieve all carts of a user with applied gift cards. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-options` | Retrieve all carts of a user with items, respective concrete product, and their product options. |
| `GET https://glue.mysprykershop.com/carts?include=items,concrete-products,product-labels` | Retrieve all carts of a user with information about concrete products and the product labels assigned to the products in the carts. |

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
<summary>Response sample: multiple carts</summary>

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
                ],
                "thresholds": []
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
                "discounts": [],
                "thresholds": []
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
<summary>Response sample with items</summary>

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
                ],
                "thresholds": []
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
                ],
                "thresholds": []
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
                ],
                "thresholds": []
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
<summary>Response sample with cart permission groups</summary>

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
                ],
                "thresholds": []
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
<summary>Response sample with shared carts</summary>

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
                ],
                "thresholds": []
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
<summary>Response sample with shared carts and company users they are shared with</summary>

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
                "discounts": [],
                "thresholds": []
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
                "discounts": [],
                "thresholds": []
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

<details>
<summary>Response sample with gift cards applied</summary>

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
                ],
                "thresholds": []
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
<summary>Response sample with items, concrete products, and product options</summary>

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
                ],
                "thresholds": []
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
<summary>Response sample with product labels</summary>

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
                "discounts": [],
                "thresholds": []
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


{% include pbc/all/glue-api-guides/latest/carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/carts-response-attributes.md -->

{% include pbc/all/glue-api-guides/latest/items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/items-response-attributes.md -->

{% include pbc/all/glue-api-guides/latest/product-options-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/product-options-response-attributes.md -->

{% include pbc/all/glue-api-guides/latest/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/latest/vouchers-cart-rules-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/vouchers-cart-rules-response-attributes.md -->

{% include /pbc/all/glue-api-guides/latest/product-labels-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/product-labels-response-attributes.md -->

{% include /pbc/all/glue-api-guides/latest/cart-permission-groups-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/cart-permission-groups-response-attributes.md -->

{% include /pbc/all/glue-api-guides/latest/gift-cards-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/gift-cards-response-attributes.md -->


|INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| promotional-items | id | String | The unique ID of the promotional item. The ID can be used to apply the promotion to the given purchase. |
| promotional-items | sku | String | The SKU of the promoted abstract product. |
| promotional-items | quantity | Integer | Specifies how many promotions can be applied to the given purchase. |
| shared-carts | idCompanyUser | String | The unique ID of the [company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html) with whom the cart is shared. |
| shared-carts | idCartPermissionGroup | Integer | The unique ID of the cart permission group that describes the permissions granted to the user with whom the cart is shared. |
| company-users |  id | String | The unique ID of the [company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html) with whom the cart is shared. |
| company-users |  isActive | Boolean | If true, the [company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html) is active. |
| company-users |  isDefault | Boolean | If true, the [company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html) is default for the [customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |


## Retrieve a registered user's cart

To retrieve a particular cart, send the request:

---
`GET` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*** | The unique ID of a cart. [Create a cart](#create-a-cart) or [Retrieve a registered user's carts](#retrieve-registered-users-carts) to get it. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | The alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>items</li><li>cart-permission-groups</li><li>shared-carts</li><li>company-users</li><li>cart-rules</li><li>promotional-items</li><li>vouchers</li><li>gift-cards</li><li>concrete-products</li><li>product-options</li><li>product-labels</li></ul> |

{% info_block infoBox "Included resources" %}

- To retrieve all the product options of the item in a cart, include `items`, `concrete-products`, and `product-options`.
- To retrieve product labels of the products in a cart, include `items`, `concrete-products`, and `product-labels`.

{% endinfo_block %}

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=items` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with its items, related concrete products and cart permission groups included. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=cart-permission-groups` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with its cart permissions included. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=shared-carts` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with details on the shared cart. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=shared-carts,company-users` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with information about shared carts and the company uses they are shared with. |
| `GET https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4?include=cart-rules` | Retrieve the `2fd32609-b6b0-5993-9254-8d2f271941e4` cart with cart rules. |
| `GET https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=promotional-items` | Retrieve the `1ce91011-8d60-59ef-9fe0-4493ef3628b2` cart with its promotional items. |
| `GET https://glue.mysprykershop.com/carts/8ef901fe-fe47-5569-9668-2db890dbee6d?include=gift-cards` | Retrieve the `8ef901fe-fe47-5569-9668-2db890dbee6` cart with detailed information on its gift cards. |
| `GET https://glue.mysprykershop.com/carts/8fc45eda-cddf-5fec-8291-e2e5f8014398?include=items,concrete-products,product-options` | Retrieve the `8fc45eda-cddf-5fec-8291-e2e5f8014398` cart with items, respective concrete product, and their product options. |
| `GET https://glue.mysprykershop.com/carts/976af32f-80f6-5f69-878f-4ea549ee0830?include=vouchers` | Retrieve the `976af32f-80f6-5f69-878f-4ea549ee0830` cart with detailed information on its vouchers. |
| `GET https://glue.mysprykershop.com/carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9?include=items,concrete-products,product-labels` | Retrieve the `0c3ec260-694a-5cec-b78c-d37d32f92ee9` cart with information about the product labels assigned to the products in the cart. |
| `GET https://glue.mysprykershop.com/carts/308b51f4-2491-5bce-8cf2-436273b44f9b` | Retrieve the `308b51f4-2491-5bce-8cf2-436273b44f9b` cart with the unfulfilled hard and soft minimum thresholds. |
| `GET https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2` | Retrieve the `1ce91011-8d60-59ef-9fe0-4493ef3628b2` cart with the unfulfilled hard maximum threshold. |


### Response

<details>
<summary>Response sample</summary>

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
            ],
            "thresholds": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/2fd32609-b6b0-5993-9254-8d2f271941e4"
        }
    }
}
```

</details>


<details>
<summary>Response sample with items</summary>

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
<summary>Response sample with cart permission groups</summary>

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
<summary>Sample response with details on shared carts</summary>

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
<summary>Response sample with shared carts and company users they are shared with</summary>

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
            "discounts": [],
            "thresholds": []
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
<summary>Response sample with details on gift cards</summary>

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
<summary>Response sample with items, respective concrete products, and their product options</summary>

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

<details>
<summary>Response sample with product labels</summary>

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
            "discounts": [],
            "thresholds": []
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
                    "message": "You need to add items for €50 or less to pass a recommended threshold."
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

{% include pbc/all/glue-api-guides/latest/carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/carts-response-attributes.md -->

{% include pbc/all/glue-api-guides/latest/items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/items-response-attributes.md -->

{% include pbc/all/glue-api-guides/latest/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include /pbc/all/glue-api-guides/latest/product-labels-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/product-labels-response-attributes.md -->

{% include /pbc/all/glue-api-guides/latest/gift-cards-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/gift-cards-response-attributes.md -->

{% include /pbc/all/glue-api-guides/latest/cart-permission-groups-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/cart-permission-groups-response-attributes.md -->



## Edit a cart

You can edit the name of the cart, change the currency and price mode. To do that, send the request:

---
`PATCH` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***cart_uuid*** | Unique identifier of a cart. [Create a cart](#create-a-cart) or [Retrieve a registered user's carts](#retrieve-registered-users-carts) to get it. |

{% info_block infoBox "Info" %}

- You can change the price mode of an empty cart but not the one that has items in it.
- Currency and store can be changed for an empty cart and for a cart with items anytime.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | The alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |
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
| name | String | &check; | Sets the cart name. This field can be set only if you are using the multiple carts feature. If you are operating in a single-cart environment, an attempt to set the value will result in an error with the `422 Unprocessable Entry` status code. Cart name should be unique and should not be longer than 30 characters.|
| priceMode | Enum | &check | Sets the price mode to be used for the cart. Possible values:<ul><li>GROSS_MODE - prices after tax;</li><li>NET_MODE - prices before tax.</li></ul>For details, see [Net & Gross Prices](/docs/pbc/all/price-management/latest/base-shop/extend-and-customize/configuration-of-price-modes-and-types.html). |
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
            "discounts": [],
            "thresholds": []
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
`DELETE` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***cart_uuid*** | The unique ID of a cart. [Create a cart](#create-a-cart) or [Retrieve a registered user's carts](#retrieve-registered-users-carts) to get it. |

{% info_block infoBox "Deleting carts" %}

You cannot delete a cart if it's the customer's only cart. If you attempt to delete a customer's last cart, the endpoint responds with the **422 Unprocessable Entry** status code. If you delete the default cart of a customer, another cart will be assigned as default automatically.

{% endinfo_block %}

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |

Request sample: `DELETE https://glue.mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054`

### Response

If the cart is deleted successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is incorrect. |
| 002 | Access token is missing. |
| 003 | Failed to log in the user. |
| 101 | Cart with given uuid not found. |
| 102 | Failed to add an item to cart. |
| 103 | Item with the given group key not found in the cart. |
| 104 | Cart uuid is missing. |
| 105 | Cart cannot be deleted. |
| 106 | Cart item cannot be deleted. |
| 107 | Failed to create a cart. |
| 110 | Customer already has a cart. |
| 111 | Can't switch price mode when there are items in the cart. |
| 112 | Store data is invalid. |
| 113 | Cart item cannot be added. |
| 114 | Cart item cannot be updated. |
| 115 | Unauthorized cart action. |
| 116 | Currency is missing. |
| 117 | Currency is incorrect. |
| 118 | Price mode is missing. |
| 119 | Price mode is incorrect. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html).
