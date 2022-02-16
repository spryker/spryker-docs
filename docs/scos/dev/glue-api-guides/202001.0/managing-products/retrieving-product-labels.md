---
title: Accessing Product Labels
description: The article explores how to retrieve a product label by the label ID or product provided in the Product Labels API.
last_updated: Mar 4, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v4/docs/retrieving-product-labels
originalArticleId: f14ed0b0-60bd-4089-bb7f-95150ce88ae4
redirect_from:
  - /v4/docs/retrieving-product-labels
  - /v4/docs/en/retrieving-product-labels
related:
  - title: Product Labels
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/product-labels/product-labels.html
  - title: Glue API - Promotions & Discounts feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/glue-api/glue-api-promotions-and-discounts-feature-integration.html
---

[Product labels](/docs/scos/user/features/{{page.version}}/product-labels-feature-overview.html) are used to draw your customers' attention to some specific products. Each of them has a name, a priority, and a validity period. The Product Labels API provides endpoints for getting labels via the REST HTTP requests.

{% info_block warningBox "Note" %}
Product labels are available only for abstract products.
{% endinfo_block %}

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see Product Labels API. <!-- link to IG -->

## Get Product Label by ID
To retrieve a product label, send the following GET request:

**/product-labels/{% raw %}{{{% endraw %}label-id{% raw %}}}{% endraw %}**

Sample request: *GET http://glue.mysprykershop.com/product-labels/3*

where **3** is the ID of the label you want to retrieve.

{% info_block warningBox "Note" %}
Label IDs can be found in the **Products / Product Labels** section of the Back Office.
{% endinfo_block %}

![Product Labels](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Managing+Products/Accessing+Product+Labels/product_labels_2.png)

### Response
The endpoint responds with information on the requested product label, including the CSS class that can be used to display the label on a storefront.

**Attributes**

| Attribute | Type | Description |
| --- | --- | --- |
| **name** | String | Specifies the label name. |
| **isExclusive** | Boolean | Indicates whether the label is **exclusive**.<br>If the attribute is set to true, the current label takes precedence over other labels the product might have. This means that only the current label should be displayed for the product, and all other possible labels should be hidden. |
| **position** | Integer | Indicates the label priority.<br>Labels should be indicated on the frontend according to their priority, from the highest (**1**) to the lowest, unless a product has a label with the **isExclusive** attribute set.|
| **frontEndReference** | String |Specifies the label custom label type (CSS class).<br>If the attribute is an empty string, the label should be displayed using the default CSS style. |

**Sample**

```json
{
    "data": {
        "type": "product-labels",
        "id": "3",
        "attributes": {
            "name": "Standard Label",
            "isExclusive": false,
            "position": 3,
            "frontEndReference": ""
        },
        "links": {
            "self": "http://glue.mysprykershop.com/product-labels/3"
        }
    }
}
```

### Possible errors
| Code | Reason |
| --- | --- |
| 400 | Product label ID is not specified. |
| 404 | A label with the specified ID does not exist. |

## Get Product Labels by Product
To retrieve all labels for a product, send a GET request to the following endpoints and include **product-labels** as relationship:

* **/abstract-products/{% raw %}{{{% endraw %}product-sku{% raw %}}}{% endraw %}?include=product-labels** - for *abstract* products;
* **/abstract-products/{% raw %}{{{% endraw %}product-sku{% raw %}}}{% endraw %}/related-products?include=product-labels** - for *related* products;
* **/concrete-products/{% raw %}{{{% endraw %}product-sku{% raw %}}}{% endraw %}?include=product-labels** - for *concrete* products;
* **/concrete-products/{% raw %}{{{% endraw %}product-sku{% raw %}}}{% endraw %}/abstract-alternative-products?include=product-labels** - for *abstract alternative* products;
* **/concrete-products/{% raw %}{{{% endraw %}product-sku{% raw %}}}{% endraw %}/concrete-alternative-products?include=product-labels** - for *concrete alternative* products.

Sample request: *GET http://glue.mysprykershop.com/abstract-products/001?include=product-labels*

where **001** is the SKU of the product you need labels for.

**Response**
The endpoint responds with information on the requested product, and the labels are available in the requested relationship. For each assigned label, the attributes are the same as when requesting that specific label.

**Sample**

```json
{
    "data": {
        "type": "abstract-products",
        "id": "001",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "product-labels": {
                "data": [
                    {
                        "type": "product-labels",
                        "id": "3"
                    },
                    {
                        "type": "product-labels",
                        "id": "5"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-labels",
            "id": "3",
            "attributes": {
                "name": "Standard Label",
                "isExclusive": false,
                "position": 3,
                "frontEndReference": ""
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-labels/3"
            }
        },
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 5,
                "frontEndReference": "highlight"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-labels/5"
            }
        }
    ]
}
```

### Possible errors
For information on the possible error responses, see [Retrieving Product Information](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/retrieving-product-information.html).

## Get Product Labels for Cart Items
To retrieve labels for all products in a cart, send a GET request to the following endpoints and include **product-labels** as a relationship:

| Cart Type | Endpoints* | Sample Request | Description | Notes |
| --- | --- | --- | --- | --- |
| **Guest Cart** | */guest-carts/?include=guest-cart-items,concrete-products,product-labels* | `GET /guest-carts?include=guest-cart-items,concrete-products,product-labels` | Gets labels for all products in all guest carts of a guest user. | To fetch carts of a guest user, the user's unique identifier must be passed in the **X-Anonymous-Customer-Unique-Id** header of the request. The header value is managed by the API client. For details, see [Managing Guest Carts](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html). |
| **Guest Cart** | */guest-carts/**{% raw %}{{{% endraw %}cart_ID{% raw %}}}{% endraw %}**?include=guest-cart-items,concrete-products,product-labels* | `GET /guest-carts/f9a3f045-02c2-5d47-b397-8ac1f5c63e27?include=guest-cart-items,concrete-products,product-labels` | Gets labels for all products in a specific guest cart. | To fetch carts of a guest user, the user's unique identifier must be passed in the **X-Anonymous-Customer-Unique-Id** header of the request. The header value is managed by the API client. For details, see [Managing Guest Carts](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html). |
| **Guest Cart** | */guest-carts/**{% raw %}{{{% endraw %}cart_ID{% raw %}}}{% endraw %}/up-selling-products**?include=guest-cart-items,concrete-products,product-labels* | `GET /guest-carts/f9a3f045-02c2-5d47-b397-8ac1f5c63e27/up-selling-products?include=guest-cart-items,concrete-products,product-labels` | Gets product labels for all **up-selling products** of a specific guest cart. | To fetch carts of a guest user, the user's unique identifier must be passed in the **X-Anonymous-Customer-Unique-Id** header of the request. The header value is managed by the API client. For details, see [Managing Guest Carts](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html). |
| **Registered Customer Cart** | */carts/?include=items,concrete-products,product-labels* | `GET /carts?include=items,concrete-products,product-labels` | Gets labels for all products in all carts of a customer. | To fetch carts of registered customers, you need to authenticate the customers and pass the authentication token as part of your request. For details, see [Managing Carts of Registered Users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html). |
| **Registered Customer Cart** | */carts/**{% raw %}{{{% endraw %}cart_ID{% raw %}}}{% endraw %}**?include=items,concrete-products,product-labels* | `GET /carts/369541fa2e-02c2-5d47-b397-8ac1f5c58ff9?include=items,concrete-products,product-labels` | Gets labels for all products in a specific cart. | To fetch carts of registered customers, you need to authenticate the customers and pass the authentication token as part of your request. For details, see [Managing Carts of Registered Users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html). |
| **Registered Customer Cart** | */carts/**{% raw %}{{{% endraw %}cart_ID{% raw %}}}{% endraw %}/up-selling-products**?include=items,concrete-products,product-labels* | `GET /carts/369541fa2e-02c2-5d47-b397-8ac1f5c58ff9/up-selling-products?include=items,concrete-products,product-labels` | Gets product labels for all **up-selling products** of a specific cart. | To fetch carts of registered customers, you need to authenticate the customers and pass the authentication token as part of your request. For details, see [Managing Carts of Registered Users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html). |

* **cart_ID** is the unique cart identifier assigned to it upon creation.

{% info_block warningBox "Performance" %}
The above requests fetch not only label information, but also information on the products in the cart. That can adversely affect the overall performance. Use them with caution and apply caching, where possible.
{% endinfo_block %}

### Response
The endpoint responds with information on the requested cart, including the products in it and the labels assigned to them. For each assigned label, the attributes are the same as when requesting a specific label.

**Sample:**

```json
{
    "data": [
        {
            "type": "guest-carts",
            "id": "f9a3f045-02c2-5d47-b397-8ac1f5c63e27",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "guest-cart-items": {
                    "data": [
                        {
                            "type": "guest-cart-items",
                            "id": "020_21081478"
                        }
                    ]
                }
            }
        }
    ],
    "links": {...},
    "included": [
        {
            "type": "product-labels",
            "id": "3",
            "attributes": {
                "name": "Standard Label",
                "isExclusive": false,
                "position": 3,
                "frontEndReference": ""
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-labels/3"
            }
        },
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 5,
                "frontEndReference": "highlight"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-labels/5"
            }
        },
        {
            "type": "concrete-products",
            "id": "020_21081478",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "product-labels": {
                    "data": [
                        {
                            "type": "product-labels",
                            "id": "3"
                        },
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
            "id": "020_21081478",
            "attributes": {
                "sku": "020_21081478",
                "quantity": "6",
                "groupKey": "020_21081478",
                "abstractSku": "020",
                "amount": null,
                "calculations": {...},
                "selectedProductOptions": []
            },
            "links": {...},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "020_21081478"
                        }
                    ]
                }
            }
        }
    ]
}
```

### Possible Errors
For information on the possible error responses, see [Managing Guest Carts](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html) and [Managing Carts of Registered Users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html).

## Get Product Labels for Wishlist Items
To retrieve labels for all products in a wishlist, send a GET request to the following endpoints and include **product-labels** as a relationship:

* */wishlists?include=wishlist-items,concrete-products,product-labels* - **all** wishlists of a customer;
* */wishlists/**{% raw %}{{{% endraw %}wishlist_ID{% raw %}}}{% endraw %}**?include=wishlist-items,concrete-products,product-labels* - specific wishlist.

Sample request: `GET http://glue.mysprykershop.com/wishlists/19154981-f490-56b5-9537-359703a2ed08?include=wishlist-items,concrete-products,product-labels`

where **19154981-f490-56b5-9537-359703a2ed08** is the ID of the wishlist you need labels for.

{% info_block warningBox "Performance" %}
The above requests fetch not only label information, but also information on the products in the wishlist. That can adversely affect the overall performance. Use them with caution and apply caching, where possible.
{% endinfo_block %}

### Response
The endpoint responds with information on the requested wishlist, including the products in it and the labels assigned to them. For each assigned label, the attributes are the same as when requesting that specific label.

**Sample:**

```json
{
    "data": {
        "type": "wishlists",
        "id": "19154981-f490-56b5-9537-359703a2ed08",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "wishlist-items": {
                "data": [
                    {
                        "type": "wishlist-items",
                        "id": "020_21081478"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-labels",
            "id": "3",
            "attributes": {
                "name": "Standard Label",
                "isExclusive": false,
                "position": 3,
                "frontEndReference": ""
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-labels/3"
            }
        },
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 5,
                "frontEndReference": "highlight"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-labels/5"
            }
        },
        {
            "type": "concrete-products",
            "id": "020_21081478",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "product-labels": {
                    "data": [
                        {
                            "type": "product-labels",
                            "id": "3"
                        },
                        {
                            "type": "product-labels",
                            "id": "5"
                        }
                    ]
                }
            }
        },
        {
            "type": "wishlist-items",
            "id": "020_21081478",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "020_21081478"
                        }
                    ]
                }
            }
        }
    ]
}
```

### Possible Errors
For information on the possible error responses, see [Managing Wishlists](/docs/scos/dev/glue-api-guides/{{page.version}}//managing-wishlists/managing-wishlists.html).
