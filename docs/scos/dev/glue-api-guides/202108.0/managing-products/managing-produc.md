---
title: Managing product ratings and reviews
originalLink: https://documentation.spryker.com/2021080/docs/managing-product-ratings-and-reviews
redirect_from:
  - /2021080/docs/managing-product-ratings-and-reviews
  - /2021080/docs/en/managing-product-ratings-and-reviews
---

[Ratings and reviews](https://documentation.spryker.com/docs/rating-reviews) allow customers to share their opinions and experiences about purchases. This enables customers to take meaningful decisions about purchases and increases their trust with the shop.

Products and ratings API helps you to:

* Retrieve average rating of any product.
* Retrieve a list of ratings and reviews of a product.
* Allow customers to review and rate products.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Product rating & reviews feature integration](https://documentation.spryker.com/docs/glue-api-product-rating-reviews-feature-integration)

## Retrieve product ratings and reviews

To retrieve ratings and reviews, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/product-reviews**

---


| Path parameter | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | Unique identifier of a product to retrieve product reviews for. |


### Request

| String parameter | DESCRIPTION | Possible values | 
| --- | --- | --- | --- |
| page[offset] | Offset of the item at which to begin the response.  | From `0` to any. | 
| page[limit] | Maximum number of entries to return. | From `1` to any. | 

Request sample: `GET http://glue.mysprykershop.com/abstract-products/035/product-reviews`

### Response



<details open>
    <summary>Response sample</summary>

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

</details>
    
<a name="product-ratings-and-reviews-response-attributes"></a>

| ATTRIBUTE | TYPE | DESCRIPTIONS |
| --- | --- | --- |
| nickname | String | Customer’s nickname. |
| rating | Integer | Rating given to the product by a customer. |
| summary | String | Review summary. |
| description | String | Full review. |




## Provide a rating and a review of a products
To provide a rating and a review of a products, send the request:

***
`POST`**/abstract-products/*{% raw %}{{{% endraw %}product_sku{% raw %}}}{% endraw %}*/product-reviews**
***


| PATH PARAMETER | HEADER |
| --- | --- |
| ***{% raw %}{{{% endraw %}product_sku{% raw %}}}{% endraw %}*** | Unique identifier of an abstract product to post a rating and review for. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/docs/authenticating-as-a-customer#authenticate-as-a-customer) or [authenticating as a company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user#authenticate-as-a-company-user).  |

Sample request: `POST http://glue.mysprykershop.com/abstract-products/139/product-reviews`

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

| ATTRIBUTE | TYPE | Required | DESCRIPTION |
| --- | --- | --- | --- |
| nickname | String | yes | The name under which the review is to be displayed. |
| rating | Integer | yes | Rating given to the product by the customer. |
| summary | String | yes | Review summary. |
| description | String | no | Full review. |




### Response

Response sample:

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

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| id | String | Unique review identifier. |
| nickname | String | The name under which the review is displayed. |
| rating | Integer | Rating given to the product by the customer. |
| summary | String | Review summary. |
| description | String | Full review. |




## Other management options

You can retrieve the average rating of a product by:
* [Retrieving an abstract product](https://documentation.spryker.com/docs/retrieving-abstract-products#retrieve-an-abstract-product)
* [Retrieving a concrete product](https://documentation.spryker.com/docs/retrieving-concrete-products#retrieve-a-concrete-product)

Also, all the endpoints that accept `abstract-products` and `concrete-products` resources as included resources in requests, return the average product rating. 

## Possible errors

| STATUS | REASON |
| --- | --- |
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 301| Abstract product with the specified ID was not found. |
| 311 | Abstract product ID is not specified. |
| 901 | One or more of the following reasons:<ul><li>The `nickname` attribute is empty or not specified.</li><li>The `rating` attribute is empty or not specified.</li><li>The `summary` attribute is empty or not specified.</li></ul> |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).
