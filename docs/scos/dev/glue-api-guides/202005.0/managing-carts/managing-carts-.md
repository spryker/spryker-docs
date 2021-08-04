---
title: Managing Carts of Registered Users
originalLink: https://documentation.spryker.com/v5/docs/managing-carts-of-registered-users
redirect_from:
  - /v5/docs/managing-carts-of-registered-users
  - /v5/docs/en/managing-carts-of-registered-users
---

The **Carts API** provides access to management of customers' shopping carts. Carts come in two different forms: carts for registered customers and carts for guests. In your development, the resources provided by the API can support you in the development of shopping cart functionality.

{% info_block infoBox "Cart types" %}
The following document covers the APIs for carts for **registered customers** only. If you want to know how to access carts of unregistered users, see [Managing Guest Carts](https://documentation.spryker.com/docs/en/managing-guest-carts
{% endinfo_block %}.)

## Multiple Carts

Unlike guest carts, carts of registered users have unlimited lifetime. Also, if the Multiple Carts feature is [integrated into your project](https://documentation.spryker.com/docs/en/multiple-carts-feature-integration-201903){target="_blank"} and Glue is [enabled for multi-cart operations](https://documentation.spryker.com/docs/en/multiple-carts-feature-integration-201903){target="_blank"}, registered users can have unlimited number of carts.

## Owned and Shared Carts
Registered users can [share carts](https://documentation.spryker.com/docs/en/shared-cart) they own. Thus, a registered user can access both their personal carts and carts shared with them by other users. This feature allows company users to collaborate on company purchases as a team.
To be able to share carts, as well as access carts shared with them, customers need to authenticate as **Company User Accounts**. Each such account is a member of a certain Business Unit, and carts can be shared only among members of the same Unit. On the other hand, customers have the ability to impersonate as different Company Accounts depending on the job tasks they want to perform. Such accounts can belong to different Business Units, which means that any specific customer can have access to a different set of shared carts depending on the Company Account they impersonate as.

To use a Company Account, a customer needs to retrieve a bearer token for the account. The token is valid for a specific combination of an authenticated user and Company Account. It provides access to:
*  carts owned by the user
*  carts shared with the Company Account.

{% info_block infoBox "Authentication" %}
For details on how to receive the token, see [Logging In as Company User](https://documentation.spryker.com/docs/en/logging-in-as-company-user-201907
{% endinfo_block %}{target="_blank"}.)

To be able to access shared carts, the API client needs to access the endpoints provided by the Carts API using the token received when impersonating as the Company Account. Doing so provides access to management of both the user's own carts and the carts shared with the current Company Account based on the bearer token presented.

Shared carts can be accessed and manipulated the same as regular carts. The only difference is that the list of actions that a user can perform on a shared cart depends on the permissions granted to them.

By default, there are 2 levels of permissions for shared carts: **read-only** and **full access**. If a user attempts to perform an unauthorized action on a shared cart, the API will respond with the **403 Forbidden** status code.

{% info_block infoBox "Info" %}
For more details, see [Retrieving Cart Permission Groups](https://documentation.spryker.com/docs/en/sharing-company-user-carts-201907#retrieving-cart-permission-groups
{% endinfo_block %})

To distinguish whether a specific cart is owned by a user directly or shared with them, you need to extend the responses of the endpoints with the **cart-permission-groups** resource relationship.. If a cart is shared with the user, it will contain the relationship, while if a cart is owned by the user directly, the relationship will not be present.


{% info_block infoBox "Info" %}
For more details, see section *Retrieving Cart Permission Groups* in [Sharing Company User Carts](https://documentation.spryker.com/docs/en/sharing-company-user-carts-201907
{% endinfo_block %}{target="_blank"}.)


## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Carts API](https://documentation.spryker.com/docs/en/cart-feature-integration)
* [Glue API: Measurement Units Feature Integration](https://documentation.spryker.com/docs/en/glue-api-measurement-units-feature-integration)
* [Promotions & Discounts API](https://documentation.spryker.com/docs/en/glue-promotions-discounts-feature-integration)


## Creating Carts
To create a cart, send the request:

---
`POST` **/carts**

---


{% info_block infoBox %}


* To use this endpoint, customers need to authenticate. For details, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).
* Carts created via Glue API are always set as the default carts for the user.


{% endinfo_block %}

### Request
Sample request: `POST http://glue.mysprykershop.com/carts`
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

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| name | String | v | Sets the cart name.</br>This field can be set only if you are using the multiple carts feature. If you are operating in a single-cart environment, an attempt to set the value will result in an error with the **422 Unprocessable Entry** status code. |
| priceMode | Enum | v | Sets the price mode to be used for the cart. Possible values:<ul><li>GROSS_MODE - prices after tax;</li><li>NET_MODE - prices before tax.</li></ul>For details, see [Net &amp; Gross Prices](https://documentation.spryker.com/docs/en/net-gross-price){target="_blank"}. |
| currency | String | v | Sets the cart currency. |
| store | String | v | Sets the name of the store where to create the cart. |



### Response
Response sample:
```json
{
    "data": [
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
                "self": "http://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab"
            }
        }
    ]
}
```

**General Cart Information**
| Attribute* | Type | Description |
| --- | --- | --- |
| name | String | Specifies a cart name.</br>The field is available in multi-cart environments only. |
| isDefault | Boolean | Specifies whether the cart is the default one for the customer.</br>The field is available in multi-cart environments only.  |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected whenthe cart was created. |
| store | String | Store for which the cart was created. |

**Discount Information**
| Attribute* | Type | Description |
| --- | --- | --- |
| displayName | String | Discount name. |
| amount | Integer | Discount amount applied to the cart.  |
| code | String | Discount code applied to the cart. |

**Totals**
| Attribute* | Type | Description |
| --- | --- | --- |
| expenseTotal | String | Total amount of expenses (including e.g. shipping costs). |
| discountTotal | Integer | Total amount of discounts applied to the cart.  |
| taxTotal | String | Total amount of taxes to be paid. |
| subTotal | Integer | Subtotal of the cart.  |
| grandTotal | Integer | Grand total of the cart.  |

/* Type and ID attributes are not mentioned.


## Retrieving Carts
You can retrieve all available carts or a single cart with a cart ID.

### Retrieve All Carts

To retrieve all available carts, send the request:


---
`GET` **/carts**

---

{% info_block infoBox "Authentication" %}

To use this endpoint, customers need to authenticate. For details, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).

{% endinfo_block %}

#### Request


| Request | Usage |
| --- | --- |
| `GET http://glue.mysprykershop.com/carts` | Retrieve all carts of a user.  |
| `GET http://glue.mysprykershop.com/carts?include=items,concrete-products,cart-permission-groups` | Retrieve all carts of a user with concrete products and cart pemission groups included. |
| `GET http://glue.mysprykershop.com/carts?include=items, sales-units,product-measurement-units` | Retrieve all carts of a user with product measurement units and sales units included. |
| `GET http://glue.mysprykershop.com/carts?include=promotional-items`| Retrieve informaton about promotional items for the cart.|
| `GET http://glue.mysprykershop.com/carts?include=promotional-items,abstract-products,concrete-product`| Retrieve detailed information on the promotional items for the cart.|


| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | items, concrete-products, cart-permission-groups, product-measurement-units, sales-units, promotional-items |

{% info_block infoBox "Included resources" %}

The `product-measurement-units` and `sales-units` resources can be included only together with the `items` resource.

{% endinfo_block %}

{% info_block infoBox "Included resources" %}

To retrieve detailed information on promotional products in the cart, use `promotional-items` with `abstract-products` and `concrete-products`.

{% endinfo_block %}

#### Response 

<details>
    <summary>Response sample</summary>

```json
{
    "data": [],
    "links": {
        "self": "http://glue.mysprykershop.com/carts"
    }
}
```
    
</details>

<details>
    <summary>Response sample - multiple carts</summary>

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
                "self": "http://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a"
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
                "self": "http://glue.mysprykershop.com/carts/482bdbd6-137f-5b58-bd1c-37f3fa735a16"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/carts"
    }
}
```
    
</details>


<details>
    <summary>Response sample with items, concrete products and cart permission groups</summary>

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
                "self": "http://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d"
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
        "self": "http://glue.mysprykershop.com/items?include=items,concrete-products,cart-permission-groups"
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
                "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-2"
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
                "self": "http://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d/items/cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33"
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


<details>
    <summary>Response sample with items, product measurement units and sales units</summary>

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
                "self": "http://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/items?include=sales-units,product-measurement-units"
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
                "self": "http://glue.mysprykershop.com/product-measurement-units/METR"
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
                "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units/33"
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
                "self": "http://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d/items/cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33"
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
    <summary>Response sample with a promotional item</summary>

```json
 "data": [
        {
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
                "self": "http://glue.de.suite.local/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
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
        {
            "type": "carts",
            "id": "1f1662c4-01e1-50d1-877d-95534d1b1833",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "another cart",
                "isDefault": false,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 3291,
                    "taxTotal": 1938,
                    "subtotal": 32909,
                    "grandTotal": 29618
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 3291,
                        "code": null
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/carts/1f1662c4-01e1-50d1-877d-95534d1b1833"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/access-tokens?include=promotional-items"
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
                "self": "glue.mysprykershop.com/promotional-items/bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
            }
        }
    ]
}
```
    
</details>

<details>
    <summary>Response sample with details on a promtotional item</summary>

```json
{
    "data": [
        {
            "type": "carts",
            "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
            "attributes": {...},
            "links": {...},
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
        {
            "type": "carts",
            "id": "1f1662c4-01e1-50d1-877d-95534d1b1833",
            "attributes": {...},
            "links": {...}
        }
    ],
    "links": {...},
    "included": [
        {
            "type": "concrete-products",
            "id": "112_312526171",
            "attributes": {...}
            },
            "links": {...}
        },
        {
            "type": "concrete-products",
            "id": "112_306918001",
            "attributes": {...},
            "links": {...},
        {
            "type": "concrete-products",
            "id": "112_312526191",
            "attributes": {...},
            "links": {...},
        {
            "type": "concrete-products",
            "id": "112_312526172",
            "attributes": {....},
            "links": {...},
        {
            "type": "concrete-products",
            "id": "112_306918002",
            "attributes": {...},
            "links": {...},
        {
            "type": "concrete-products",
            "id": "112_312526192",
            "attributes": {...},
            "links": {...},
        {
            "type": "concrete-products",
            "id": "112_306918003",
            "attributes": {...},
            "links": {...},
        {
            "type": "concrete-products",
            "id": "112_312526193",
            "attributes": {...},
            "links": {...},
        {
            "type": "abstract-products",
            "id": "112",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "112_312526171"
                        },
                        {
                            "type": "concrete-products",
                            "id": "112_306918001"
                        },
                        {
                            "type": "concrete-products",
                            "id": "112_312526191"
                        },
                        {
                            "type": "concrete-products",
                            "id": "112_312526172"
                        },
                        {
                            "type": "concrete-products",
                            "id": "112_306918002"
                        },
                        {
                            "type": "concrete-products",
                            "id": "112_312526192"
                        },
                        {
                            "type": "concrete-products",
                            "id": "112_306918003"
                        },
                        {
                            "type": "concrete-products",
                            "id": "112_312526193"
                        }
                    ]
                }
            }
        },
        {
            "type": "promotional-items",
            "id": "bfc600e1-5bf1-50eb-a9f5-a37deb796f8a",
            "attributes": {
                "sku": "112",
                "quantity": 2
            },
            "links": {
                "self": "http://glue.de.suite.local/promotional-items/bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "112"
                        }
                    ]
                }
            }
        }
    ]
}
```
    
</details>
<a name="all-carts-response-attributes"></a>

**General Cart Information**
| Attribute* | Type | Description |
| --- | --- | --- |
| name | String | Specifies a cart name.</br>The field is available in multi-cart environments only. |
| isDefault | Boolean | Specifies whether the cart is the default one for the customer.</br>The field is available in multi-cart environments only.  |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected whenthe cart was created. |
| store | String | Store for which the cart was created. |
/* Type and ID attributes are not mentioned.

**Discount Information**
| Attribute* | Type | Description |
| --- | --- | --- |
| displayName | String | Discount name. |
| amount | Integer | Discount amount applied to the cart.  |
| code | String | Discount code applied to the cart. |
/* Type and ID attributes are not mentioned.

**Totals**
| Attribute* | Type | Description |
| --- | --- | --- |
| expenseTotal | String | Total amount of expenses (including e.g. shipping costs). |
| discountTotal | Integer | Total amount of discounts applied to the cart.  |
| taxTotal | String | Total amount of taxes to be paid. |
| subTotal | Integer | Subtotal of the cart.  |
| grandTotal | Integer | Grand total of the cart.  |

/* Type and ID attributes are not mentioned.


| Included resource | Attribute* | Type | Description |
| --- | --- | --- | --- |
| items |  sku | String | Product SKU. |
| items |  quantity | Integer | Quantity of the given product in the cart. |
| items |  groupKey | String | Unique item identifier. The value is generated based on product properties. |
| items |  amount | Integer | Amount to be paid for all items of the product in the cart. |
| items |  unitPrice | Integer | Single item price without assuming if it is net or gross. This value should be used everywhere the price is displayed. It allows switching tax mode without side effects. |
| items |  sumPrice | Integer | Sum of all items prices calculated. |
| items |  taxRate | Integer | Current tax rate in per cent. |
| items |  unitNetPrice | Integer | Single item net price. |
| items |  sumNetPrice | Integer | Sum of prices of all items. |
| items |  unitGrossPrice | Integer | Single item gross price. |
| items |  sumGrossPrice | Integer | Sum of items gross price. |
| items |  unitTaxAmountFullAggregation | Integer | Total tax amount for a given item with additions. |
| items |  sumTaxAmountFullAggregation | Integer | Total tax amount for a given sum of items with additions. |
| items |  sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| items |  unitSubtotalAggregation | Integer | Subtotal for the given item. |
| items |  unitProductOptionPriceAggregation | Integer | Item total product option price. |
| items |  sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| items |  unitDiscountAmountAggregation | Integer | Item total discount amount. |
| items | sumDiscountAmountAggregation | Integer | Sum of Item total discount amount. |
| items |  unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions. |
| items |  sumDiscountAmountFullAggregation | Integer | Item total discount amount with additions. |
| items |  unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| concrete-products |  sku | String | SKU of the concrete product. |
| concrete-products |  name | String | Name of the concrete product. |
| concrete-products |  description | String | Description of the concrete product. |
| concrete-products |  superAttributeDefinition | String[] | Attributes flagged as super attributes, that are however not relevant to distinguish between the product variants. |
| concrete-products |  attributeMap | Object | Each super attribute / value combination and the corresponding concrete product IDs are listed here. |
| concrete-products |  attributeMap.super_attributes | Object | Applicable super attribute and its values for the product variants. |
| concrete-products |  attributeMap.attribute_variants | Object | List of super attributes with the list of values. |
| concrete-products |  attributeMap.product_concrete_ids | String[] |Product IDs of the product variants.|
| concrete-products |  metaTitle | String | Meta title of the product. |
| concrete-products |  metaKeywords | String | Meta keywords of the product. |
| concrete-products |  metaDescription | String  | Meta description of the product. |
| concrete-products |  attributeNames | Object | All non-super attribute / value combinations for the concrete product. |
| cart-permission-groups | Permissions granted to the user for shared carts. | name | String | Specifies the Permission Group name, for example, READ_ONLY or FULL_ACCESS. |
| cart-permission-groups | Permissions granted to the user for shared carts | isDefault | Boolean | Indicates whether the Permission Group is applied to shared carts by default. |
| sales-units|conversion|Integer| Factor to convert a value from sales to base unit. If it is "null", the information is taken from the global conversions.|
|sales-units|precision|Integer|Ratio between a sales unit and a base unit.|
|sales-units|is displayed|Boolean|Defines if the sales unit is displayed on the product details page.|
|sales-units|is default|Boolean|Defines if the sales unit is selected by default on the product details page.|
|sales-units|measurementUnitCode|String|Code of the measurement unit. |
|product-measurement-units|name|String|Measurement unit name.|
|product-measurement-units|defaultPrecision|Integer|The default ratio between a sales unit and a base unit. It is used when precision for a related sales unit is not specified.| 
|promotional-items| id | String | Unique identifier of the promotional item. The ID can be used to apply the promotion to the given purchase.|
|promotional-items| sku | String | SKU of the promoted abstract product.|
|promotional-items| quantity | Integer | Specifies how many promotions can be applied to the given purchase.|

/* Type and ID attributes are not mentioned.




### Retrieve a Cart

To retrieve a particular cart, send the request:

---
`GET` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}***

---


| Path parameter | Description |
| --- | --- |
| cart_uuid | A unique identifier of a cart. You can get this in the response when [creating carts](#creating-carts) or [retrieving all carts](#retrieve-all-carts). |


{% info_block infoBox "Authentication" %}

To use this endpoint, customers need to authenticate. For details, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).

{% endinfo_block %}

#### Request

| Request | Usage |
| --- | --- |
| `GET http://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d?include=items,concrete-products,cart-permission-groups` | Retrieve the  `52493031-cccf-5ad2-9cc7-93d0f738303d` cart with its items, related concrete products and cart permission groups included. |
| `GET http://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d?include=items,sales-units,product-measurement-units` | Retrieve the  `52493031-cccf-5ad2-9cc7-93d0f738303d` cart with its item. The information about item amount is defined in sales units and the related product measurement units are included. |
| `GET http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=promotional-items ` | Retrieve the  `1ce91011-8d60-59ef-9fe0-4493ef3628b2` cart with its promotional items. |
| `GET http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=promotional-items ` | Retrieve the  `1ce91011-8d60-59ef-9fe0-4493ef3628b2` cart with details information on its promotional items. |



| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | items, concrete-products, cart-permission-groups, product-measurement-units, sales-units, promotional-items |

{% info_block infoBox "Included resources" %}

The `product-measurement-units` and `sales-units` resources can be included only together with the `items` resource.

{% endinfo_block %}
{% info_block infoBox "Included resources" %}

To retrieve detailed information on promotional products in the cart, use `promotional-items` with `abstract-products` and `concrete-products`.

{% endinfo_block %}
#### Response 

<details>
    <summary>Response sample with items, concrete products and cart permission groups</summary>

```json
{
    "data": {
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
            "self": "http://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d"
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
                "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-2"
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
                "self": "http://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d/items/cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33"
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

<details>
    <summary>Response sample with items, sales units and product measurement units</summary>

```json
{
    "data": {
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
            "self": "http://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d"
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
                "self": "http://glue.mysprykershop.com/product-measurement-units/METR"
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
                "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units/33"
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
                "self": "http://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d/items/cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33"
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
            ]
        },
        "links": {
            "self": "http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
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
                "self": "http://glue.mysprykershop.com/promotional-items/bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
            }
        }
    ]
}
```
    
</details>

<details>
    <summary>Response sample with details on a promotional item</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
        "attributes": {...},
        "links": {...},
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
            "type": "concrete-products",
            "id": "111_12295890",
            "attributes": {...},
            "links": {...}
        },
        {
            "type": "abstract-products",
            "id": "111",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "111_12295890"
                        }
                    ]
                }
            }
        },
        {
            "type": "promotional-items",
            "id": "bfc600e1-5bf1-50eb-a9f5-a37deb796f8a",
            "attributes": {
                "sku": "111",
                "quantity": 2
            },
            "links": {...},
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "111"
                        }
                    ]
                }
            }
        }
    ]
}
```
    
</details>

Find all the related attribute descriptions in [Retrieve All Carts](#all-carts-response-attributes).



## Adding Items
To add items to a cart, send the request:

---
`POST` **carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*/items**

---

| Path parameter | Description |
| --- | --- |
| cart_uuid | A unique identifier of a cart. You can get this in the response when [creating carts](#creating-carts) or [retrieving all carts](#retrieve-all-carts). |


{% info_block infoBox "Authentication" %}

To use this endpoint, customers need to authenticate. For details, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).

{% endinfo_block %} 



### Request

`POST http://glue.mysprykershop.com/carts/61ab15e9-e24a-5dec-a1ef-fc333bd88b0a/items?include=sales-units,product-measurement-units`

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
{% info_block infoBox "Cart rules" %}

To add the promotional product to cart, make sure that the cart fulfills the cart rules for the promotional item.

{% endinfo_block %}

`POST http://glue.myspsrykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items?include=cart-rules`

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

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | product-measurement-units, sales-units |

|  Attribute| Type | Required | Description |
| --- | --- | --- | --- |
| sku | String | ✓ | Specifies the SKU of the concrete product to add to the cart. |
| quantity | String | ✓ | Specifies the number of items to place on the guest cart. If you add a promotional item and the number of products exceeds the number of promotions, the exceeding items will be added without promotional benefits. |
| salesUnit | Object |  | List of attributes defining the sales unit to be used for item amount calculation. |
| id | Integer |  | A unique identifier of the sales units to calculate the item amount in. |
| amount | Integer |  | Amount of the product in the defined sales units.  |
| sku | String |  ✓ | SKU of the product to add. To use promotions, specify the SKU of a promoted concrete product. |
| quantity | Integer | ✓  | Number of products to add. If the number of products exceeds the number of promotions, the exceeding items are added without promotional benefits.  |
| idPromotionalItem | String |  | Promotional item ID. Specify the ID to apply the promotion benefits.  |
| productOptions | Object |  | roduct options to apply. For details, see [Retrieving and Applying Product Options](https://documentation.spryker.com/docs/en/retrieving-and-applying-product-options).  |



### Response
<details>
    <summary>Response sample</summary>

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
            "self": "http://glue.mysprykershop.com/carts/482bdbd6-137f-5b58-bd1c-37f3fa735a16"
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
                "self": "http://glue.mysprykershop.com/carts/482bdbd6-137f-5b58-bd1c-37f3fa735a16/items/035_17360369"
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
                "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units/33"
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
                "self": "http://glue.mysprykershop.com/carts/482bdbd6-137f-5b58-bd1c-37f3fa735a16/items/cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33"
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
            ]
        },
        "links": {
            "self": "http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
        }
    }
}
```
    
</details>

<details>
    <summary>Response sample: adding a promotional item with cart-rules relationshop</summary>

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
            "self": "http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
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
                "self": "http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items/134_29759322"
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
                "self": "http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items/118_29804739"
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
                "self": "http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items/139_24699831"
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
                "self": "http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items/136_24425591"
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
                "self": "http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items/112_306918001-promotion-1"
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
                "self": "http://glue.mysprykershop.com/cart-rules/6"
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
                "self": "http://glue.mysprykershop.com/cart-rules/1"
            }
        }
    ]
}
```
    
</details>

Cart Rules Information
| Attribute* | Type | Description |
| --- | --- | --- |
| amount | Integer | Amount of the discount in cents. |
| code | String | Discount code. |
| discountType | String | Discount type. |
| displayName | String | Discount name. |
| isExclusive | Boolean | Indicates whether the discount is exclusive. |
| expirationDateTime | DateTimeUtc | Discount expiration time in UTC time format. |
| discountPromotionAbstractSku | String | SKU of the product to which the discount applies. If the discount can be applied to o all the products to add, the value of the attribute is **null**. |
| discountPromotionQuantity | String | Quantity of the product required to be able to apply the discount. If the discount can be applied to any number of products, the value of the attribute is **null**. |

Find other related attribute descriptions in [Retrieve All Carts](#all-carts-response-attributes).


## Removing Items
To remove an item from a cart, send a DELETE request to the following endpoint:

---
`DELETE` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*/items/*{% raw %}{{{% endraw %}concreteproductsku{% raw %}}}{% endraw %}***

---


| Path parameter | Description |
| --- | --- |
| cart_uuid | A unique identifier of a cart to remove products from. You can get this in the response when [creating carts](#creating-carts) or [retrieving all carts](#retrieve-all-carts). |
| concreteproductsku | SKU of a concrete product to remove from cart. |

{% info_block infoBox "Authentication" %}

To use this endpoint, customers need to authenticate. For details, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).

{% endinfo_block %}

### Request

Request sample: `DELETE http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054/items/177_25913296`



### Response
If the item is deleted successfully, the endpoint responds with a `204 No Content` status code.



## Changing Item Quantity
To change the quantity of items in a cart, send the request:

---
`PATCH` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}*/items/*{% raw %}{{{% endraw %}concreteproductsku{% raw %}}}{% endraw %}***

---

| Path parameter | Description |
| --- | --- |
| cart_uuid | A unique identifier of a cart to remove products from. You can get this in the response when [creating carts](#creating-carts) or [retrieving all carts](#retrieve-all-carts). |
| concreteproductsku | SKU of a concrete product to remove from cart. |

{% info_block infoBox "Authentication" %}

To use this endpoint, customers need to authenticate. For details, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).

{% endinfo_block %}


### Request

Request sample: `PATCH http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054/items/177_25913296`

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

**Attributes:**

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| quantity | String | v | Specifies the new quantity of the items. |


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
                "discounts": []
            },
            "links": {
                "self": "http://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d"
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
        "self": "http://glue.mysprykershop.com/items?include=items,concrete-products,cart-permission-groups"
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
                "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-2"
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
                "self": "http://glue.mysprykershop.com/carts/52493031-cccf-5ad2-9cc7-93d0f738303d/items/cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33"
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

See [Retrieve All Carts](#all-carts-response-attributes) for response attribute descriptions.

## Deleting Carts
To delete a cart, send the request:

---
`DELETE` **/carts/*{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}***

---

| Path parameter | Description |
| --- | --- |
| cart_uuid | A unique identifier of a cart to remove products from. You can get this in the response when [creating carts](#creating-carts) or [retrieving all carts](#retrieve-all-carts). |


{% info_block infoBox "Deleting carts" %}

You cannot delete a cart if it is the customer's only cart. If you attempt to delete a customer's last cart, the endpoint responds with the **422 Unprocessable Entry** status code.If you delete the default cart of a customer, another cart will be assigned as default automatically.

{% endinfo_block %}

### Request
Request sample: `DELETE http://glue.mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054`

where **4741fc84-2b9b-59da-bb8d-f4afab5be054** is the ID of the cart you want to delete.

{% info_block infoBox "Authentication" %}

To use this endpoint, customers need to authenticate. For details, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).

{% endinfo_block %} 

### Response
If the cart is deleted successfully, the endpoint responds with the **204 No Content** status code.

## Possible Errors
| Status | Reason |
| --- | --- |
| 400 | Cart ID is missing. |
| 401 | The access token is invalid. |
| 403 | The access token is missing or the user is not allowed to perform the operation. |
| 404 | A cart with the specified ID was not found. |
| 422 |Failed to add an item. |



