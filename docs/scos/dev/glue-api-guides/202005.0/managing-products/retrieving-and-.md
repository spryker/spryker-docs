---
title: Retrieving and Applying Product Options
originalLink: https://documentation.spryker.com/v5/docs/retrieving-and-applying-product-options
redirect_from:
  - /v5/docs/retrieving-and-applying-product-options
  - /v5/docs/en/retrieving-and-applying-product-options
---

The [Product Options](https://documentation.spryker.com/docs/en/product-options-2) Feature enables shop owners to suggest various additions to the main product. Such extras enhance the customer experience and ensure their loyalty to the shop. These typically include gift wrapping, warranty services, insurance, app installation, etc.

Options come with their own prices and tax sets. Also, different options can apply to different products. All product options available in a shop are organized in groups.

Although options are applied to abstract products only, the *Product Options* API enables retrieving available options for both [abstract and concrete](https://documentation.spryker.com/docs/en/abstract-and-concrete-products) products. Also, it enables selecting the necessary options when ordering products and viewing the selected options when an order is complete. For this purpose, product options are retrievable in endpoints related to [products](https://documentation.spryker.com/docs/en/retrieving-product-information) (e.g. `/abstract-products` or `/concrete-products`), [guest carts](https://documentation.spryker.com/docs/en/managing-carts) and [carts of registered users](https://documentation.spryker.com/docs/en/managing-guest-carts) (e.g. `/guest-cart-items` or `/carts/{% raw %}{{{% endraw %}cart_id{% raw %}}}{% endraw %}/items`, etc.), as well as [in order history](https://documentation.spryker.com/docs/en/retrieving-order-history).

With the help of the data provided by the API resources, you will be able to perform the following tasks:

* retrieve product options available for any products;
* enable customers to select the options they want when placing items in a cart;
* display the selected options during checkout and in the order history.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [GLUE: Product Options Feature Integration](https://documentation.spryker.com/docs/en/glue-product-options-feature-integration).

## Retrieving Product Options for Products
To retrieve the product options available for a specific product, send a *GET* request to retrieve the product information and include **product-options** as a relationship.

### Request
Endpoints:

* `/abstract-products`
* `/concrete-products`

Sample request: `GET http://glue.mysprykershop.com/concrete-products/181_31995510?include=product-options`

where **181_31995510** is the SKU of the product you want to retrieve options for.

### Response
The endpoints return information on the requested products. Product options are available in the `product-options` included section.

**Response Attributes:**
Each product option is represented by a related resource with the following attributes:

| Attribute* | Type | Description |
| --- | --- | --- |
| **sku** | String | Specifies the SKU of the product option. |
| **optionName** | String | Specifies the option name. |
| **optionGroupName** | String | Specifies the name of the group to which the option belongs. |
| **price** | Integer | Specifies the option price in cents. |
| **currencyIsoCode** | String | Specifies the ISO 4217 code of the currency in which the product option price is specified. |

* Type and ID are not mentioned.

<details open>
<summary>Sample Response</summary>
    
```json
{
    "data": {
        "type": "concrete-products",
        "id": "181_31995510",
        "attributes": {...},
        "links": {...},
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_1_year_waranty"
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_2_year_waranty"
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_3_year_waranty"
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_insurance"
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_gift_wrapping"
            }
        }
    ]
}
```
    
</br>
</details>

## Retrieving Product Options for Cart Items
To retrieve the product options available for items in a cart, send a *GET* request to retrieve the cart information and include the **items/guest-cart-items**, **concrete-products**, and **product-options** resources as relationships.

{% info_block warningBox "Note" %}

Product option information is also available for *POST* and *PATCH* requests, which means that you can also retrieve product options when sending requests to create carts as well as adding or removing cart items. For example, you can fetch the options to display to the customer once a new product is added to a cart.

{% endinfo_block %}

#### Request
Endpoints for **carts of registered users**:

* `/carts`
* `/carts/{% raw %}{{{% endraw %}cart_id{% raw %}}}{% endraw %}`
* `/carts/{% raw %}{{{% endraw %}cart_id{% raw %}}}{% endraw %}/items`
* `/carts/{% raw %}{{{% endraw %}cart_id{% raw %}}}{% endraw %}/items/{% raw %}{{{% endraw %}item_id{% raw %}}}{% endraw %}`

{% info_block warningBox "Authentication" %}

Carts of registered users cannot be accessed anonymously. For this reason, you always need to pass a user's authentication token when accessing the endpoint. For details on how to authenticate a user and retrieve the token, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).

{% endinfo_block %}

Endpoints for **guest carts:**

* `/guest-cart-items`
* `/guest-carts`
* `/guest-carts/{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}`
* `/guest-carts/{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}/guest-cart-items`
* `/guest-carts/{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}/guest-cart-items/{% raw %}{{{% endraw %}guest_cart_item_id{% raw %}}}{% endraw %}`

{% info_block warningBox "Anonymous User ID" %}

When accessing guest carts, you need to specify the guest user ID. This is done via the `X-Anonymous-Customer-Unique-Id` header. Guest user IDs are managed by the API Client. For details, see [Managing Guest Carts](https://documentation.spryker.com/docs/en/managing-guest-carts).

{% endinfo_block %}

Sample requests: 

`GET http://glue.mysprykershop.com/carts?include=items,concrete-products,product-options`

`GET http://glue.mysprykershop.com/guest-carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/?include=guest-cart-items,concrete-products,product-options`

`POST http://glue.mysprykershop.com/guest-cart-items?include=guest-cart-items,concrete-products,product-option`

`PATCH http://glue.mysprykershop.com/carts/f9a3f045-02c2-5d47-b397-8ac1f5c63e27/items/181_31995510?include=guest-cart-items,concrete-products,product-option`

{% info_block warningBox "Performance" %}

The above requests fetch not only product option information, but also information on the products in the cart. That can adversely affect the overall performance. Use them with caution and apply caching, where possible.

{% endinfo_block %}

### Response
The API returns information on the requested carts, cart items and products. Product options are available in the **product-options** resource relationship.

If any product options have been selected when placing a product in the cart, they are specified in the `selectedProductOptions` attribute of the respective cart item. The attribute is an array.

**Response Attributes:**
Each selected option is specified in the `selectedProductOptions` attribute of the **items** or **guest-cart-items** resource relationship.

| Attribute* | Type | Description |
| --- | --- | --- |
| **selectedProductOptions** | Array of **product-options**. | Specifies the selected product options. |

Each product option available for every product in the cart is represented by a related **product-options** resource with the following attributes:

| Attribute* | Type | Description |
| --- | --- | --- |
| **sku** | String | Specifies the SKU of the product option. |
| **optionName** | String | Specifies the option name. |
| **optionGroupName** | String | Specifies the name of the group to which the option belongs. |
| **price** | Integer | Specifies the option price in cents. |
| **currencyIsoCode** | String | Specifies the ISO 4217 code of the currency in which the product option price is specified. |

* Type and ID are not mentioned.

<details open>
<summary>Sample Response - Guest Cart</summary>
    
```json
{
    "data": {
        "type": "guest-carts",
        "id": "a460ac71-06ee-5018-b6d6-a2191d183f24",
        "attributes": {...},
        "links": {...},
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
            "type": "guest-cart-items",
            "id": "181_31995510-3-5",
            "attributes": {
                "sku": "181_31995510",
                ...
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
                "self": "http://glue.mysprykershop.com/guest-carts/a460ac71-06ee-5018-b6d6-a2191d183f24/guest-cart-items/181_31995510-3-5"
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
            },
        },
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_1_year_waranty"
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_2_year_waranty"
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_3_year_waranty"
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_insurance"
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_gift_wrapping"
            }
        },
        }
    ]
}
```
    
</br>
</details>

<details open>
<summary>Sample Response - Cart of Registered User</summary>
    
```json
{
    "data": [
        {
            "type": "carts",
            "id": "56a0b4e4-21d8-516f-acd5-90581c996676",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "181_31995510"
                        },
                        {
                            "type": "items",
                            "id": "181_31995510-2-4-5"
                        },
                        {
                            "type": "items",
                            "id": "181_31995510"
                        },
                        {
                            "type": "items",
                            "id": "181_31995510-2-4-5"
                        }
                    ]
                }
            }
        }
    ],
    "links": {...},
    "included": [
        {
            "type": "items",
            "id": "181_31995510",
            "attributes": {
                "sku": "181_31995510",
                ...
                "selectedProductOptions": [
                    {
                        "optionGroupName": "Warranty",
                        "sku": "OP_2_year_waranty",
                        "optionName": "Two (2) year limited warranty",
                        "price": 4000
                    },
                    {
                        "optionGroupName": "Insurance",
                        "sku": "OP_insurance",
                        "optionName": "Two (2) year insurance coverage",
                        "price": 40000
                    },
                    {
                        "optionGroupName": "Gift wrapping",
                        "sku": "OP_gift_wrapping",
                        "optionName": "Gift wrapping",
                        "price": 2000
                    }
                ]
            },
            "links": {...},
            "relationships": {...}
        },
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_1_year_waranty"
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_2_year_waranty"
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_3_year_waranty"
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_insurance"
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
                "self": "http://glue.mysprykershop.com/concrete-products/181_31995510/product-options/OP_gift_wrapping"
            }
        },
        ...
    ]
}
```
    
</br>
</details>

### Applying Product Options to Cart Items
In order to apply various products to cart items, you need to specify the necessary options when sending *POST* requests for creating carts and adding items to them.

### Request
Endpoints for **carts of registered users**:

* `/carts/{% raw %}{{{% endraw %}cart_id{% raw %}}}{% endraw %}/items`

Sample Request:
`POST /carts/{% raw %}{{{% endraw %}cart_id{% raw %}}}{% endraw %}/cart-items` - adds an item to a cart.

{% info_block infoBox "Info" %}

For more details on managing carts of registered users, see [Managing Carts of Registered Users](https://documentation.spryker.com/docs/en/managing-carts-of-registered-users).

{% endinfo_block %}

**Request Body**
    
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

{% info_block warningBox "Authentication" %}

Carts of registered users cannot be accessed anonymously. For this reason, you always need to pass a user's authentication token when accessing the endpoint. For details on how to authenticate a user and retrieve the token, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).

{% endinfo_block %}

Endpoints for **guest carts**:

* `/guest-cart-items`
* `/guest-carts/{% raw %}{{{% endraw %}guest_cart_id{% raw %}}}{% endraw %}/guest-cart-items`

Sample Requests:

`POST /guest-cart-items` - creates a guest cart;

`POST /guest-carts/{% raw %}{{{% endraw %}cart_id{% raw %}}}{% endraw %}/cart-items` - adds an item to a guest cart.

{% info_block infoBox "Info" %}

For more details on managing carts of registered users, see [Managing Guest Carts](https://documentation.spryker.com/docs/en/managing-guest-carts).

{% endinfo_block %}

**Request Body**
    
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

{% info_block warningBox "Anonymous User ID" %}

When accessing guest carts, you need to specify the guest user ID. This is done via the `X-Anonymous-Customer-Unique-Id` header. Guest user IDs are managed by the API Client. For details, see [Managing Guest Carts](https://documentation.spryker.com/docs/en/managing-guest-carts).

{% endinfo_block %}

**Request Attributes**
No matter which type of cart is created or modified, the following attributes should be present in the request:

| Attribute* | Type | Required | Description |
| --- | --- | --- | --- |
| **sku** | String | yes | Specifies the SKU of the product to add to the cart or to modify. |
| **quantity** | Integer | yes | Specifies the number of products to be available in the cart. |
| **productOptions** | Array of **product-option** | no | Specifies the product options to apply to the product.</br></br>Each option must be represented by a JSON object containing only 1 attribute: **sku**. It specifies the SKU of the option to apply.</br></br>**Note**: It is the responsibility of the API Client to track whether the selected items are compatible. For example, the client should not allow a **2**-year and a **4**-year warranty service to be applied to the same product. The API endpoints allow any combination of items, no matter whether they are compatible or not. |

You can specify a certain product several times with different options. In this case, the product will be added as multiple cart items.

### Response
The endpoints respond with information on the cart or item that is being created or modified. For detailed information and the possible error codes, see [Managing Carts of Registered Users](https://documentation.spryker.com/docs/en/managing-carts-of-registered-users) and [Managing Guest Carts](https://documentation.spryker.com/docs/en/managing-guest-carts).

## Retrieving Product Options for Orders
To retrieve the product options applied to order items, send a *GET* request to retrieve the order information.

### Request
Endpoint: `/orders/{% raw %}{{{% endraw %}order_id{% raw %}}}{% endraw %}` - retrieves a specific order.

{% info_block warningBox "Authentication" %}

Orders cannot be accessed anonymously. For this reason, you always need to pass a user's authentication token when accessing the endpoint. For details on how to authenticate a user and retrieve the token, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization).

{% endinfo_block %}

Sample request: `GET http://glue.mysprykershop.com/orders/DE--3`

{% info_block warningBox "Tip" %}

You can also receive product option information immediately after checkout id complete by including the necessary information in the checkout call: *POST http://glue.mysprykershop.com/checkout?include=orders*

{% endinfo_block %}

### Response
The endpoints return information on the requested order(s). If any product options have been selected when placing the order, they are specified in the productOptions attribute of the respective order item.

**Response Attributes:**
The options applied to the order are specified in the `productOptions` attribute of each element in the **items** array.

| Attribute* | Type | Description |
| --- | --- | --- |
| **productOptions** | Array of product-option. | Specifies the product options. |

**Sample response**
    
```json
{
    "data": {
        "type": "orders",
        "id": "DE--2",
        "attributes": {
            ...
            "items": [
                {
                    "name": "Acer Chromebook C730-C8T7",
                    "sku": "136_24425591",
                    ...
                    "productOptions": [
                        {
                            "optionGroupName": "Gift wrapping",
                            "sku": "OP_gift_wrapping",
                            "optionName": "Gift wrapping",
                            "price": 500
                        },
                        {
                            "optionGroupName": "Warranty",
                            "sku": "OP_2_year_waranty",
                            "optionName": "Two (2) year limited warranty",
                            "price": 1000
                        }
                    ]
                }
            ],
            ...
        "links": {...}
    }
}
```

For detailed information and the possible error codes, see [Retrieving Customer's Order History](https://documentation.spryker.com/docs/en/retrieving-order-history).
 
