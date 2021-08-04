---
title: Managing Guest Carts
originalLink: https://documentation.spryker.com/v5/docs/managing-guest-carts
redirect_from:
  - /v5/docs/managing-guest-carts
  - /v5/docs/en/managing-guest-carts
---

The Carts API provides access to management of customers' shopping carts. The following document covers working with guest carts.

Guest carts come with an expiration date, which means that unregistered users can use their carts only for a limited time frame. After the lifetime of a guest cart expires, it is deleted by the system automatically.It is up to you to decide, how long you want them to be saved. Also, with the introduction of the Carts API, comes the possibility to persist guest carts. While carts for registered customers have always been persisted, the introduction of the API brings possibility to persist carts of guest customers.

Only one cart can be created for each guest customer.

{% info_block infoBox %}
See [Managing Carts of Registered Users](https://documentation.spryker.com/docs/en/managing-carts-of-registered-users
{% endinfo_block %} to learn how you can manage carts of registered users via Glue API.)


## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Carts API](https://documentation.spryker.com/docs/en/glue-api-cart-feature-integration)
* [Glue API: Measurement Units Feature Integration](https://documentation.spryker.com/docs/en/glue-api-measurement-units-feature-integration)
* [Promotions & Discounts API](https://documentation.spryker.com/docs/en/glue-promotions-discounts-feature-integration)



## Resources for Accessing Guest Carts
The `/guest-carts` and `/guest-cart-items` resources provide endpoints to manage carts of users who haven't yet registered in the system or authenticated with the Glue REST API. Such carts provide the possibility for users to place items on a cart without the necessity to provide any registration information.

Each guest customer is identified by the value of the **X-Anonymous-Customer-Unique-Id** header. The header needs to be passed with each request related to a guest user. Glue REST API does not assign unique IDs to guest customer users. It is the responsibility of the API client to generate and manage unique IDs for all guest user sessions.

## Creating a Guest Cart
To create a guest cart for an unauthenticated user, place one or more items on a new guest cart. To do this, send the request:

---
`POST`**/guest-cart-items**

---



### Request
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
`POST https://glue.mysprykershop.com/guest-cart-items?include=sales-units,product-measurement-units`

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
{% info_block infoBox "Cart rules" %}

To add the promotional product to cart, make sure that the cart fulfills the cart rules for the promotional item.

{% endinfo_block %}
`POST https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items?include=cart-rules`

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

| Header key | Header value example | Required | Description | 
|---|---|---|---|
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | v | A hyphenated alphanumeric value that is the user's unique identifier. | 
    


| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | sales-units, product-measurement-units |
<a name="creating-guest-carts-request-attributes"></a>

|  Attribute| Type | Required | Description |
| --- | --- | --- | --- |
| sku | String | v | Specifies the SKU part number of the item to place on the new guest cart. To use promotions, specify the SKU of one of a product being promoted. **Concrete** product SKU required.|
| quantity | String | v | Specifies the number of items to place on the guest cart. If you add a promotional item and the number of products exceeds the number of promotions, the exceeding items will be added without promotional benefits. |
| salesUnit | Object |  | List of attributes defining the sales unit to be used for item amount calculation. |
| id | Integer |  | A unique identifier of the sales units to calculate the item amount in. |
| amount | Integer |  | Amount of the product in the defined sales units.  |
| idPromotionalItem | String |   |Promotional item ID. You need to specify the ID to apply the promotion benefits. |

{% info_block infoBox "Conversion" %}

When defining product amount in sales units, make sure that the correlation between `amount` and `quantity` corresponds to the conversion of the defined sales unit. See [Measurement Units Feature Overview](https://documentation.spryker.com/docs/en/measurement-units-feature-overview) to learn more.

{% endinfo_block %}


### Response

<details>
    <summary>Response sample</summary>
    
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
    
    
<details>
    <summary>Response sample with product measurement units and sales units</summary>
    
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
    
    
    
<a name="creating-guest-carts-response-attributes"></a>    
    

**General Cart Information**

| Attribute* | Type | Description |
| --- | --- | --- |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected when the cart was created. |
| store | String | Store for which the cart was created. |
\*Type and ID attributes are not mentioned.

**Discount information**

| Attribute* | Type | Description |
| --- | --- | --- |
|displayName  |String  |Discount name.  |
| code |  String| Discount code applied to the cart. |
| amount | Integer | Discount amount applied to the cart. |
\*Type and ID attributes are not mentioned.

**Totals Information**

| Attribute* | Type | Description |
| --- | --- | --- |
|expenseTotal  | String |Total amount of expenses (including e.g. shipping costs).  |
| discountTotal | Integer | Total amount of discounts applied to the cart. |
|  taxTotal| String | Total amount of taxes to be paid. |
|subTotal  | Integer | Subtotal of the cart. |
| grandTotal | Integer | Grand total of the cart. |
\*Type and ID attributes are not mentioned.

**Cart Item Information**

| Included resource | Attribute* | Type | Description |
| --- | --- | --- | --- |
| guest-cart-items| sku |String  | SKU of the product. |
| guest-cart-items| quantity |Integer  |Quantity of the given product in the cart.  |
| guest-cart-items| groupKey |String  | Unique item identifier. The value is generated based on product parameters. |
| guest-cart-items| amount | Integer |  Amount of the products in the cart.|
| guest-cart-items| unitPrice | Integer | Single item price without assuming is it net or gross. This value should be used everywhere a price is disabled. It allows switching the tax mode without side effects. |
| guest-cart-items|sumPrice  | Integer |Sum of all items prices calculated.  |
| guest-cart-items|  taxRate| Integer |Current tax rate in per cent.  |
| guest-cart-items| unitNetPrice | Integer | Single item net price. |
| guest-cart-items|sumNetPrice  | Integer |Sum of all items' net price.  |
| guest-cart-items| unitGrossPrice | Integer |Single item gross price.  |
| guest-cart-items| sumGrossPrice | Integer | Sum of items gross price. |
| guest-cart-items| unitTaxAmountFullAggregation | Integer | 	Total tax amount for a given item with additions. |
| guest-cart-items| sumTaxAmountFullAggregation | Integer | Total tax amount for a given amount of items with additions. |
| guest-cart-items| sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| guest-cart-items| unitSubtotalAggregation | Integer | Subtotal for the given item. |
| guest-cart-items| unitProductOptionPriceAggregation | Integer |Item total product option price.  |
| guest-cart-items| sumProductOptionPriceAggregation | Integer |Item total of product options for the given sum of items.  |
| guest-cart-items|  unitDiscountAmountAggregation| Integer |Item total discount amount.  |
| guest-cart-items|sumDiscountAmountAggregation  | Integer | Sum Item total discount amount. |
| guest-cart-items| unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions.|
| guest-cart-items|  sumDiscountAmountFullAggregation| Integer | Item total discount amount with additions. |
| guest-cart-items| unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| guest-cart-items|sumPriceToPayAggregation  | Integer |Sum of the prices to pay (after discounts).  |
| guest-cart-items| salesUnit| Object|List of attributes defining the sales unit to be used for item amount calculation.|
|guest-cart-items|salesUnit.id|Integer|Numeric value the defines the sales units to calculate the item amount in.|
|guest-cart-items|salesUnit.amount| Integer|Amount of product in the defined sales units. |
| sales-units|conversion|Integer| Factor to convert a value from sales to base unit. If it is "null", the information is taken from the global conversions.|
|sales-units|precision|Integer|Ratio between a sales unit and a base unit.|
|sales-units|is displayed|Boolean|Defines if the sales unit is displayed on the product details page.|
|sales-units|is default|Boolean|Defines if the sales unit is selected by default on the product details page.|
|sales-units|measurementUnitCode|String|Code of the measurement unit. |
|product-measurement-units|name|String|Measurement unit name.|
|product-measurement-units|defaultPrecision|Integer|The default ratio between a sales unit and a base unit. It is used when precision for a related sales unit is not specified.|
\*Type and ID attributes are not mentioned.
    
    




## Retrieving a Guest Cart

To retrieve a guest cart with a guest user ID, send the request:

---
`GET` **/guest-carts**
    
---
    
{% info_block infoBox "Guest cart ID" %}



Even though guest users have one cart by default, you can optionally specify its ID when retrieving it. To do that, use the following endpoint. The information in this section is valid for both of the endpoints.

`GET` **/guest-carts/*{% raw %}{{{% endraw %}guestcartuuid{% raw %}}}{% endraw %}***

{% endinfo_block %}
    
    
    
#### Request


| Request | Usage |
| --- | --- |
| `GET https://glue.mysprykershop.com/guest-carts?include=concrete-products` | Retrieve information about a guest cart with the concrete products included. |
| `GET https://glue.mysprykershop.com/guest-carts?include=sales-units,product-measurement-units` | Retrieve information about a guest cart with the amount of items defined in sales units and related product measurement units included. |
| `GET https://glue.mysprykershop.com/guest-carts?include=promotional-items` | Retrieve information about promotional items for the guest cart. |
| `GET https://glue.mysprykershop.com/guest-carts?include=promotional-items,abstract-products,concrete-product` | Retrieve detailed information on the promotional items for the guest cart. |
| `GET https://glue.mysprykershop.com/guest-carts?include=concrete-products,product-labels` | Retrieve  information about a guest cart with concrete products and product labels. |


| Header key | Header value example | Required | Description | 
|---|---|---|---|
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | v | A hyphenated alphanumeric value that is the user's unique identifier. It is passed in the X-Anonymous-Customer-Unique-Id header when [creating a guest cart](#creating-a-guest-cart).  | 

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | concrete-products, product-measurement-units, sales-units, promotional-items, product labels |

{% info_block infoBox "Included resources" %}

* To retrieve information on promotional products in the cart, include `promotional-items` with `abstract-products` and `concrete-products`.
* To retrieve information on product labels in the cart, include `concrete-products` with `product-labels` and `concrete-products`.

{% endinfo_block %}


    
    
#### Response

<details>
    <summary>Response sample with concrete products</summary>
    
```json
{
    "data": [
        {
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
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/guest-cart-items?include=concrete-products"
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
    <summary>Response sample with product measurement units and sales units</summary>
    
```json
{
    "data": [
        {
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
            },
            "relationships": {
                "guest-cart-items": {
                    "data": [
                        {
                            "type": "guest-cart-items",
                            "id": "cable-vga-1-2_quantity_sales_unit_id_33_amount_1.5_sales_unit_id_33"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/guest-cart-items?include=guest-cart-items,sales-units,product-measurement-units"
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
<summary>Response sample with a promotional item</summary>
   
```json
{
    "data": {
        "type": "guest-carts",
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
            "type": "promotional-items",
            "id": "bfc600e1-5bf1-50eb-a9f5-a37deb796f8a",
            "attributes": {
                "sku": "112",
                "quantity": 2
            },
            "links": {
                "self": "https://glue.myspsrykershop.com/promotional-items/bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
            }
        }
    ]
}
```
 <br>
</details>

<details open>
<summary>Response sample with details on a promotional item</summary>
   
```json
{
    "data": [
        {
            "type": "guest-carts",
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
                "self": "https://glue.mysprykershop.com/promotional-items/bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
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
 <br>
</details>

<details>
    <summary>Response sample with concrete products and product labels</summary>
    
```json
{
    "data": [
        {
            "type": "guest-carts",
            "id": "c52f815e-ac61-5fc6-8cb7-0e5de5a077e5",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Shopping cart",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 2975,
                    "taxTotal": 4275,
                    "subtotal": 29747,
                    "grandTotal": 26772,
                    "priceToPay": 26772
                },
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 2975,
                        "code": null
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/guest-carts/c52f815e-ac61-5fc6-8cb7-0e5de5a077e5"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/guest-cart-items?include=concrete-products,product-labels"
    },
    "included": [
        {
            "type": "product-labels",
            "id": "3",
            "attributes": {
                "name": "New product",
                "isExclusive": false,
                "position": 1,
                "frontEndReference": null
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-labels/3"
            }
        },
        {
            "type": "concrete-products",
            "id": "035_17360369",
            "attributes": {
                "sku": "035_17360369",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": 4.7,
                "reviewCount": 3,
                "name": "Canon PowerShot N",
                "description": "Creative Shot Originality is effortless with Creative Shot. Simply take a shot and the camera will analyse the scene then automatically generate five creative images plus the original unaltered photo - capturing the same subject in a variety of artistic and surprising ways. The unique symmetrical, metal-bodied design is strikingly different with an ultra-modern minimalist style - small enough to keep in your pocket and stylish enough to take anywhere. HS System excels in low light allowing you to capture the real atmosphere of the moment without flash or a tripod. Advanced DIGIC 5 processing and a high-sensitivity 12.1 Megapixel CMOS sensor give excellent image quality in all situations.",
                "attributes": {
                    "focus": "TTL",
                    "field_of_view": "100%",
                    "display": "LCD",
                    "sensor_type": "CMOS",
                    "brand": "Canon",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon PowerShot N",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Creative Shot Originality is effortless with Creative Shot. Simply take a shot and the camera will analyse the scene then automatically generate five creat",
                "attributeNames": {
                    "focus": "Focus",
                    "field_of_view": "Field of view",
                    "display": "Display",
                    "sensor_type": "Sensor type",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/035_17360369"
            },
            "relationships": {
                "product-labels": {
                    "data": [
                        {
                            "type": "product-labels",
                            "id": "3"
                        }
                    ]
                }
            }
        },
        {
            "type": "guest-cart-items",
            "id": "035_17360369",
            "attributes": {
                "sku": "035_17360369",
                "quantity": 1,
                "groupKey": "035_17360369",
                "abstractSku": "035",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
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
                "self": "http://glue.mysprykershop.com/guest-carts/c52f815e-ac61-5fc6-8cb7-0e5de5a077e5/guest-cart-items/035_17360369"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "035_17360369"
                        }
                    ]
                }
            }
        }
    ]
}
```

</details>
    

| Included resource | Attribute | Type | Description |
| --- | --- | --- | --- |
| promotional-items | id | String | Unique identifier of the promotional item. The ID can be used to apply the promotion to the given purchase. |
| promotional-items | quantity | Integer | Specifies how many promotions can be applied to the given purchase. |
| promotional-items | sku | String | SKU of the promoted **abstract** product. |
| product-labels | name | String | Specifies the label name. |
| product-labels | isExclusive | Boolean | Indicates whether the label is `exclusive`.</br>If the attribute is set to true, the current label takes precedence over other labels the product might have. This means that only the current label should be displayed for the product, and all other possible labels should be hidden. |
| product-labels | position | Integer | Indicates the label priority.</br>Labels should be indicated on the frontend according to their priority, from the highest (**1**) to the lowest, unless a product has a label with the `isExclusive` attribute set.|
| product-labels | frontEndReference | String |Specifies the label custom label type (CSS class).</br>If the attribute is an empty string, the label should be displayed using the default CSS style. |

Find all other related attribute descriptions in [Creating a Guest Cart](#creating-guest-carts-response-attributes).    


## Adding Items to Guest Carts
To add items to a guest cart, send the request:

---
`POST` **/guest-cart-items**

---

{% info_block infoBox "Guest cart ID" %}



Even though guest users have one cart by default, you can optionally specify its ID when adding items. To do that, use the following endpoint. The information in this section is valid for both of the endpoints.

`POST` **/guest-carts/*{% raw %}{{{% endraw %}guestcartuuid{% raw %}}}{% endraw %}*/guest-cart-items**

{% endinfo_block %}


### Request


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

`POST https://glue.mysprykershop.com/guest-cart-items?include=sales-units,product-measurement-units`

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

{% info_block infoBox "Cart rules" %}

To add the promotional product to cart, make sure that the cart fulfills the cart rules for the promotional item.

{% endinfo_block %}

`POST https://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items?include=cart-rules`

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
Find all the related request attribute descriptions in [Creating a Guest Cart](#creating-guest-carts-request-attributes).

| Header key | Header value example | Required | Description | 
|---|---|---|---|
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | v | A hyphenated alphanumeric value that is the user's unique identifier. It is passed in the X-Anonymous-Customer-Unique-Id header when [creating a guest cart](#creating-a-guest-cart).  | 

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | guest-cart-items, concrete-products, sales-units, cart-rules |
{% info_block infoBox "Included resources" %}

The `cart-rules` parameter allows you to retrieve detailed information on promotional items in the cart.

{% endinfo_block %}

### Response

<details>
    <summary>Response sample</summary>
    
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

<details>
    <summary>Response sample with product measurment units and sales units</summary>
    
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
<summary>Response sample: adding a promotional item without the cart-rules relationship</summary>
   
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
            "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
        }
    }
}
```
 <br>
</details>

<details open>
<summary>Response sample: adding a promotional item with the cart-rules relationship</summary>
   
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
 <br>
</details>


**Cart Rules Information**

| Attribute* | Type | Description |
| --- | --- | --- |
| amount | Integer | Amount of the discount in cents. |
| code | String | Discount code. |
| discountType | String | Discount type. |
| displayName | String | Discount name. |
| isExclusive | Boolean | Indicates whether the discount is exclusive. |
| expirationDateTime | DateTimeUtc | Discount expiration time in UTC time format. |
| discountPromotionAbstractSku | String | SKU of the product to which the discount applies. If the discount can be applied to any product, the value of the attribute is **null**. |
| discountPromotionQuantity | String | Quantity of the product required to be able to apply the discount. If the discount can be applied to any number of products, the value of the attribute is **null**. |
\*Type and ID attributes are not mentioned.
Find all other related attribute descriptions  in [Creating a Guest Cart](#creating-guest-carts-response-attributes)



## Removing Items from Guest Carts
To remove an item send the request 

---
`DELETE` **/guest-carts/guest-cart-items/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}***

---


| Path parameter | Description |
| --- | --- |
| {% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %} | SKU of a concrete product to add. |

{% info_block infoBox "Guest cart ID" %}


Even though guest users have one cart by default, you can optionally specify its ID when removing items. To do that, use the following endpoint. The information in this section is valid for both of the endpoints.

`DELETE` **/guest-carts/*{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}*/guest-cart-items/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}***

{% endinfo_block %}


### Request

Sample request: `DELETE https://glue.mysprykershop.com/guest-carts/2506b65c-164b-5708-8530-94ed7082e802/guest-cart-items/177_25913296`



| Header key | Header value example | Required | Description | 
|---|---|---|---|
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | v | A hyphenated alphanumeric value that is the user's unique identifier. It is passed in the X-Anonymous-Customer-Unique-Id header when [creating a guest cart](#creating-a-guest-cart).  | 


### Response
If the item is deleted successfully, the endpoint responds with the **204 No Content** status code.



## Changing Item Quantity in a Guest Cart
To change item quantity, send the request:

---
`PATCH` **/guest-carts/guest-cart-items/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}***

---

{% info_block infoBox "Guest cart ID" %}


Even though guest users have one cart by default, you can optionally specify its ID when chaging item quantity. To do that, use the following endpoint. The information in this section is valid for both of the endpoints.

`PATCH` **/guest-carts/*{% raw %}{{{% endraw %}guestCartId{% raw %}}}{% endraw %}*/guest-cart-items/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}***

{% endinfo_block %}


### Request

Sample request: `PATCH https://glue.mysprykershop.com/guest-carts/2506b65c-164b-5708-8530-94ed7082e802/guest-cart-items/177_25913296`
```js
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

| Header key | Header value example | Required | Description | 
|---|---|---|---|
| X-Anonymous-Customer-Unique-Id | 164b-5708-8530 | v | A hyphenated alphanumeric value that is the user's unique identifier. It is passed in the X-Anonymous-Customer-Unique-Id header when [creating a guest cart](#creating-a-guest-cart).  | 



|Attribute  |Type  | Required | Description |
| --- | --- | --- | --- |
| sku | String | v | SKU of the item to be updated. |
|  quantity	| String | v |  Quantity of the item to be set.  |




### Response
In case of a successful update, the endpoint responds with a **RestCartsResponse** withthe updated quantity.


## Assigning a Guest Cart to a Registered Customer

Guest carts are anonymous as they are not related to any user. If a user registers or logs in, the guest cart is automatically assigned to their account.

To assign a guest cart to a customer, i.e. merge the carts, include the unique identifier associated with the customer in the *X-Anonymous-Customer-Unique-Id* header of the authentication request if it is an existing customer, or request to create a customer account if it is a new one.

Upon login, the behavior depends on whether your project is a single cart or [multiple cart](https://documentation.spryker.com/docs/en/multiple-cart-per-user) environment:

* In a **single cart** environment, the products in the guest cart are added to the customers' own cart;
* In a **multiple cart** environment, the guest cart is converted to a regular user cart and added to the list of the customers' own carts.

The workflow is displayed in the diagram below:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Managing+Carts/Managing+Guest+Carts/assigning-guest-cart-to-registered-user.png){height="" width=""}

Below, you can see an examplary workflow for converting a guest cart into a regular cart:

1. The customer adds items to a guest cart.

Request sample: `POST https://glue.myspsrykershop.com/guest-cart-items`
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

| Header key | Header value | Description | 
|---|---|---|---|
| X-Anonymous-Customer-Unique-Id | guest-user-001 | A hyphenated alphanumeric value that is the user's unique identifier. |



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

Request sample: `POST https://glue.myspsrykershop.com/access-tokens`
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

| Header key | Header value | Description | 
|---|---|---|---|
| X-Anonymous-Customer-Unique-Id | guest-user-001 | A hyphenated alphanumeric value that is the user's unique identifier. |

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

Request sample: `GET https://glue.myspsrykershop.com/carts`


| Header key | Header value | Description | 
|---|---|---|---|
| Authorization | Bearer eyJ0eXAiOiJKV1QiLC... | Authorization token. See [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization) for more details about authorization. |


In the **multi-cart** environment, the guest cart has been converted to a regular  cart. You can see it in the list of carts with the id `9183f604-9b2c-53d9-acbf-cf59b9b2ff9f`.

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

In a **single cart** environment, items from the guest cart have been added to the user's own cart.

**Response Body**
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
    
    
## Possible Errors
    
| Code | Reason |
| --- | --- |
| 101 |A cart with the specified ID was not found.  |
| 102 | Failed to add an item to cart. |
|  103| 	Item could not be found in the cart. |
| 104 | Cart ID is missing. |
|106  |Failed to delete an item.  |
| 107 | Failed to create a cart. |
| 109 | Anonymous customer ID is missing. |


    
