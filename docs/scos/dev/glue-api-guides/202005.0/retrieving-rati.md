---
title: Retrieving Ratings and Reviews
originalLink: https://documentation.spryker.com/v5/docs/retrieving-ratings-and-reviews
redirect_from:
  - /v5/docs/retrieving-ratings-and-reviews
  - /v5/docs/en/retrieving-ratings-and-reviews
---

[Ratings and reviews](https://documentation.spryker.com/docs/en/rating-reviews) allow customers to share their opinions and experiences about purchases. This enables customers to take meaningful decisions about purchases and increases their trust with the shop.

Glue REST API allows retrieving a list of ratings and reviews for each product, as well as its average rating. This can help frontend developers in building the product page, extending it with the ratings and reviews relevant to each product. Also, the average rating of each product, as well as the number of times it has been reviewed, will be available in all endpoints where abstract and concrete products can be included as a relationship, such as, for example, [/catalog-search](https://documentation.spryker.com/docs/en/catalog-search), [/related-products](https://documentation.spryker.com/docs/en/retrieving-related-products-201903#getting-related-items-for-an-abstract-product), [/up-selling-products](https://documentation.spryker.com/docs/en/retrieving-related-products-201903#getting-up-selling-products-for-a-registered-user-s-cart), [/abstract-alternative-products](https://documentation.spryker.com/docs/en/retrieving-alternative-products-201903), etc.

Apart from that, the API allows developers to add the possibility for customers to post ratings and reviews.

In this article, you will learn how to perform the following tasks using REST APIs:

* retrieve the average rating of any product;
* retrieve a list of ratings and reviews for a product;
* allow customers to review and rate products.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see GLUE: Ratings and Reviews Feature Integration. <!-- link to GLUE: Product Rating & Reviews Feature Integration 202001 -->

## Retrieving Ratings and Reviews
Using the REST API, developers can retrieve ratings and reviews related to specific abstract or concrete products.

{% info_block infoBox "Info" %}
In case of a concrete product, the ratings and reviews are for the parent abstract product.
{% endinfo_block %}

### Request
**Abstract Products**

To retrieve all ratings and reviews for a specific abstract product, send a *GET* request to the following endpoint:

*/abstract-products/{% raw %}{{{% endraw %}product_sku{% raw %}}}{% endraw %}/product-reviews*

Sample request: `GET http://glue.mysprykershop.com/abstract-products/035/product-reviews`

where **035** is the SKU of the product you want to retrieve ratings and reviews for.

Alternatively, you can retrieve them as a relationship to the abstract product when requesting general product information. This option can be particularly useful to reduce the number of calls and save network traffic when displaying ratings and reviews alongside other product information, for example, on the product page.

To do so, send a request as follows:

*/abstract-products/{% raw %}{{{% endraw %}product_sku{% raw %}}}{% endraw %}?**include=product-reviews***

Sample request: `GET http://glue.mysprykershop.com/abstract-products/035?include=product-reviews`

**Concrete products**
To fetch a list of ratings and reviews for a concrete product (i.e. its parent abstract product), send a request for the concrete product information and include the ratings and reviews as a relationship:

*/concrete-products/{% raw %}{{{% endraw %}product_sku{% raw %}}}{% endraw %}?**include=product-reviews***

Sample request: `GET http://glue.mysprykershop.com/concrete-products/035_17360369?include=product-reviews`

where **035_17360369** is the SKU of the product you want to retrieve ratings and reviews for.

### Response
The API responds with an array of items, each representing a single rating and review object.

**Response Attributes**
Each item in the array exposes the following attributes:

| Attribute* | Type | Description |
| --- | --- | --- |
| **nickname** | String | Specifies the customer’s nickname. |
| **rating** | Integer | Indicates the rating given to the product by a specific customer. |
| **summary** | String | Specifies the review summary. |
| **description** | String | 	
Specifies the full text of a review. |

* The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample Response - Abstract Product Reviews**
    
```json
{
    "data": [
        {
            "type": "product-reviews",
            "id": "40",
            "attributes": {
                "rating": 3,
                "nickname": "Stephen Grumpy",
                "summary": "Not that awesome",
                "description": "The specs are good, but the build quality desires to be better."
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-reviews/40"
            }
        },
        {
           "type": "product-reviews",
           "id": "42",
           "attributes": {
                "rating": 5,
                "nickname": "John Doe",
                "summary": "Excellent product",
                "description": "Powerful processor, bright screen and beatiful design - what else do you need?"
        },
            "links": {
                "self": "http://glue.mysprykershop.com/product-reviews/42"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/abstract-products/139/product-reviews",
        "last": "http://glue.mysprykershop.com/abstract-products/139/product-reviews?page[offset]=10&page[limit]=10",
        "first": "http://glue.mysprykershop.com/abstract-products/139/product-reviews?page[offset]=0&page[limit]=10",
        "next": "http://glue.mysprykershop.com/abstract-products/139/product-reviews?page[offset]=10&page[limit]=10"
    }
}
```
    
**Sample Response - Abstract Product Reviews as Relationship**
    
```json
{
    "data": {
        "type": "abstract-products",
        "id": "035",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "product-reviews": {
                "data": [
                    {
                        "type": "product-reviews",
                        "id": "40"
                    },
                    {
                        "type": "product-reviews",
                        "id": "42"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-reviews",
            "id": "40",
            "attributes": {
                "rating": 3,
                "nickname": "Stephen Grumpy",
                "summary": "Not that awesome",
                "description": "The specs are good, but the build quality desires to be better."
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-reviews/40"
            }
        },
        {
           "type": "product-reviews",
           "id": "42",
           "attributes": {
                "rating": 5,
                "nickname": "John Doe",
                "summary": "Excellent product",
                "description": "Powerful processor, bright screen and beatiful design - what else do you need?"
        },
            "links": {
                "self": "http://glue.mysprykershop.com/product-reviews/42"
            }
        }
    ]
}
```
    
**Sample Response - Concrete Product Reviews**
    
```json
{
    "data": {
        "type": "concrete-products",
        "id": "035_17360369",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "product-reviews": {
                "data": [
                    {
                        "type": "product-reviews",
                        "id": "40"
                    },
                    {
                        "type": "product-reviews",
                        "id": "42"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-reviews",
            "id": "40",
            "attributes": {
                "rating": 3,
                "nickname": "Stephen Grumpy",
                "summary": "Not that awesome",
                "description": "The specs are good, but the build quality desires to be better."
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-reviews/40"
            }
        },
        {
           "type": "product-reviews",
           "id": "42",
           "attributes": {
                "rating": 5,
                "nickname": "John Doe",
                "summary": "Excellent product",
                "description": "Powerful processor, bright screen and beatiful design - what else do you need?"
        },
            "links": {
                "self": "http://glue.mysprykershop.com/product-reviews/42"
            }
        }
    ]
}
```

**Pagination**
You can improve the performance and reduce the amount of network traffic via pagination. Page links can be found in the **links** section of the response. The default option is to retrieve **10** results per page.

{% info_block infoBox "Info" %}
Pagination is available only if ratings and reviews are requested using the `/abstract-products/{% raw %}{{{% endraw %}product_sku{% raw %}}}{% endraw %}/product-reviews endpoint`.
{% endinfo_block %}

**Pagination Parameters**
The following page path parameters are used for pagination:

| Parameter | Description | Example | Explanation |
| --- | --- | --- | --- |
| **offset** | Specifies the number of results to skip. | `?page[offset]=10` | Skip **10** results and display starting from the 11th one. |
| **limit** | Specifies the number of results per single request (page). | `?page[limit]=10` | Return **10** results per page. |
|  | Combining paging parameters | `?page[limit]=10&page[offset]=20` | Display **10** results per page and show the **3rd** page. |

### Possible Errors

| Status | Reason |
| --- | --- |
| 400 | The abstract product ID is not specified. |
| 404 | An abstract product with the specified ID was not found. |

## Getting Average Product Rating
The average rating for any product, abstract or concrete, is returned as a part of the request for product information:

* **abstract** products
Endpoint - */abstract-products/{% raw %}{{{% endraw %}product_sku{% raw %}}}{% endraw %}*
Sample request - `GET http://glue.mysprykershop.com/abstract-products/035`

* **concrete** products
Endpoint - */concrete-products/{% raw %}{{{% endraw %}product_sku{% raw %}}}{% endraw %}*

Sample request - `GET http://glue.mysprykershop.com/concrete-products/035_17360369`

where **035** and **035_17360369** are the SKUs of the products you want to retrieve average ratings for.

### Response
The endpoints return information on the requested products. The average rating is exposed in the `averageRating` attribute, and the number of times a product was reviewed is returned in the `reviewCount` attribute.

{% info_block warningBox "Note" %}
If the product hasn’t been reviewed yet, the `reviewCount` attribute is **null**.
{% endinfo_block %}

**Sample Response**

```json
{
    "data": {
        "type": "abstract-products",
        "id": "035",
        "attributes": {
            "sku": "035",
            "averageRating": 4,
            "reviewCount": 2,
            "name": "Asus Zenbook US303UB",
            "description": "Classic design,stylish new color ASUS ZenBook series represents the essence of ASUS design spirit...",
            "attributes": {...},
            "superAttributesDefinition": [...],
            "superAttributes": [],
            "attributeMap": {...},
            "metaTitle": "Canon PowerShot N",
            "metaKeywords": "Canon,Entertainment Electronics",
            "metaDescription": "Classic design,stylish new color ASUS ZenBook series represents the essence of ASUS design spirit...",
            "attributeNames": {...},
            "url": "/en/asus-zenbook-us303ub-35"
        },
        "links": {...}
    }
}
```

{% info_block infoBox "Info" %}
For detailed information on the endpoints, response attributes, possible errors, etc., see [General Product Information](https://documentation.spryker.com/docs/en/retrieving-product-information#general-product-information
{% endinfo_block %}.)

## Rating and Reviewing Products
To post a rating and review of a product, send a POST request to the following endpoint:

*/abstract-products/{% raw %}{{{% endraw %}product_sku{% raw %}}}{% endraw %}/product-reviews*

{% info_block infoBox "Info" %}
Ratings and reviews can be posted for **abstract** products only.
{% endinfo_block %}

### Request
The request should contain the rating a customer assigned to the product and their respective review. A review consists of a short summary, which is required, and a more detailed description, which is optional.

Sample request: `POST http://glue.mysprykershop.com/abstract-products/139/product-reviews`

where **139** is the SKU of the **abstract** product a customer wants to rate and/or review.

{% info_block warningBox "Authentication" %}
Ratings and reviews cannot be posted anonymously. For this reason, you always need to pass a user's authentication token when accessing the endpoint. For details on how to authenticate a user and retrieve the token, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization
{% endinfo_block %}.)

**Request Attributes:**

| Attribute* | Type | Required | Description |
| --- | --- | --- | --- |
| **nickname** | String | yes | Specifies the customer’s nickname.</br>This nickname should be displayed each time the review is shown. The customer’s actual username used for authentication can therefore be hidden. |
| **rating** | Integer | yes | Specifies the rating given to the product by the customer. |
| **summary** | String | yes | Specifies the review summary. |
| **description** | String | no | Specifies the full text of a review. |

* Type is not mentioned.

**Sample Request**

```json
{
    "data": {
        "type": "product-reviews",
        "attributes": {
            "nickname": "John Doe",
            "rating": 5,
            "summary": "Excellent product",
            "description": "Powerful processor, bright screen, beatiful design and excellent build quality - what else do you need?"
        }
    }
}
```

### Response
If the data is posted successfully, the endpoint responds with the specified rating and review, and also provides a unique identifier in the **id** attribute.

**Response Attributes:**
The response contains the same attributes as the request plus the unique identifier.

| Attribute* | Type | Description |
| --- | --- | --- |
| **id** | String | Specifies a unique review identifier. |
| **nickname** | String | Specifies the customer’s nickname. |
| **rating** | Integer | Specifies the rating given to the product by the customer. |
| **summary** | String | Specifies the review summary. |
| **description** | String | Specifies the full text of the review. |

* Type is not mentioned.

**Sample Response**

```json
{
    "data": {
        "type": "product-reviews",
        "id": "42",
        "attributes": {
            "rating": 5,
            "nickname": "John Doe",
            "summary": "Excellent product",
            "description": "Powerful processor, bright screen, beatiful design and excellent build quality - what else do you need?"
        },
        "links": {
            "self": "http://glue.de.suite-nonsplit.local/product-reviews/42"
        }
    }
}
```

### Possible Errors

| Status | Reason |
| --- | --- |
| 401 | The access token is invalid. |
| 403 | The access token is missing. |
| 400 | The abstract product ID is not specified. |
| 404 | An abstract product with the specified ID was not found. |
| 422 | One or more of the following reasons:<ul><li>The **nickname** attribute is empty or not specified.</li><li>The **rating** attribute is empty or not specified.</li><li>The **summary** attribute is empty or not specified.</li><li>The format of the request is incorrect.</li></ul> |
