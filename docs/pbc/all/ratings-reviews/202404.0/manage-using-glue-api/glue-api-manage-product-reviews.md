---
title: "Glue API: Manage product reviews"
description: Learn how to manage product reviews via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-product-ratings-and-reviews
originalArticleId: e712d25f-b084-4fac-ac5f-cbb46e0947cb
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-products/managing-product-ratings-and-reviews.html  
  - /docs/pbc/all/ratings-reviews/202311.0/manage-using-glue-api/manage-product-reviews-using-glue-api.html
  - /docs/pbc/all/ratings-reviews/202204.0/manage-using-glue-api/glue-api-manage-product-reviews.html
related:
  - title: Product Rating and Reviews feature overview
    link: docs/pbc/all/ratings-reviews/page.version/ratings-and-reviews.html
---

[Ratings and reviews](/docs/pbc/all/ratings-reviews/{{page.version}}/ratings-and-reviews.html) allow customers to share their opinions and experiences about purchases. This enables customers to take meaningful decisions about purchases and increases their trust with the shop.

Products and ratings API helps you to:

* Retrieve average rating of any product.
* Retrieve a list of ratings and reviews of a product.
* Allow customers to review and rate products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Product Rating and Reviews Glue API](/docs/pbc/all/ratings-reviews/{{site.version}}/install-and-upgrade/install-the-product-rating-and-reviews-glue-api.html)

## Retrieve product reviews

To retrieve product reviews, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/product-reviews**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | Unique identifier of a product to retrieve product reviews for. |

### Request

| STRING PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| page[offset] | Offset of the item at which to begin the response.  | From `0` to any. |
| page[limit] | Maximum number of entries to return. | From `1` to any. |

Request sample: retrieve product ratings and reviews: `GET http://glue.mysprykershop.com/abstract-products/035/product-reviews`

### Response

<details>
<summary>Response sample: retrieve product reviews</summary>

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

<a name="product-reviews-response-attributes"></a>

{% include /pbc/all/glue-api-guides/{{page.version}}/product-reviews-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/product-reviews-response-attributes.md -->

## Submit a product review

To submit a product review, send the request:

---
`POST`**/abstract-products/*{% raw %}{{{% endraw %}product_sku{% raw %}}}{% endraw %}*/product-reviews**

---

| PATH PARAMETER | HEADER |
| --- | --- |
| ***{% raw %}{{{% endraw %}product_sku{% raw %}}}{% endraw %}*** | Unique identifier of an abstract product to post a rating and review for. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html#authenticate-as-a-customer) or [authenticating as a company user](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).  |

Request sample: provide a rating and a review of products

`POST http://glue.mysprykershop.com/abstract-products/139/product-reviews`

```json
{
    "data": {
        "type": "product-reviews",
        "attributes": {
            "nickname": "John Doe",
            "rating": 5,
            "summary": "Excellent product",
            "description": "Powerful processor, bright screen, beautiful design and excellent build quality - what else do you need?"
        }
    }
}
```

{% include /pbc/all/glue-api-guides/{{page.version}}/product-reviews-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/product-reviews-response-attributes.md -->

### Response

```json
{
    "data": {
        "type": "product-reviews",
        "id": "42",
        "attributes": {
            "rating": 5,
            "nickname": "John Doe",
            "summary": "Excellent product",
            "description": "Powerful processor, bright screen, beautiful design and excellent build quality - what else do you need?"
        },
        "links": {
            "self": "http://glue.de.suite-nonsplit.local/product-reviews/42"
        }
    }
}
```

{% include /pbc/all/glue-api-guides/{{page.version}}/product-reviews-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/product-reviews-response-attributes.md -->

## Other management options

You can retrieve the average rating of a product as follows:
* [Retrieve an abstract product](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html#retrieve-an-abstract-product)
* [Retrieve a concrete product](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html#retrieve-a-concrete-product)

Also, all the endpoints that accept `abstract-products` and `concrete-products` resources as included resources in requests, return the average product rating.

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 301| Abstract product with the specified ID was not found. |
| 311 | Abstract product ID is not specified. |
| 901 | One or more of the following reasons:<ul><li>The `nickname` attribute is empty or not specified.</li><li>The `rating` attribute is empty or not specified.</li><li>The `summary` attribute is empty or not specified.</li></ul> |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/rest-api/reference-information-glueapplication-errors.html).
