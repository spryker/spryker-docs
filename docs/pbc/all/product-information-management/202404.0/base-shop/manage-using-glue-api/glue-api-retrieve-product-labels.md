---
title: "Glue API: Retrieve product labels"
description: Learn how to retrieve product labels via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-product-labels
originalArticleId: 70d36a7a-e701-427d-ae2a-e78ebde56ebe
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-products/retrieving-product-labels.html
  - /docs/pbc/all/product-information-management/202311.0/manage-using-glue-api/glue-api-retrieve-product-labels.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-product-labels.html
related:
  - title: Install the Promotions & Discounts feature Glue API
    link: docs/pbc/all/discount-management/page.version/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-glue-api.html
  - title: Product Labels feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-labels-feature-overview.html
---

[Product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-labels-feature-overview.html) are used to draw your customers' attention to some specific products. Each of them has a name, a priority, and a validity period. The Product Labels API provides endpoints for getting labels via the REST HTTP requests.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Product Labels Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-image-sets-glue-api.html).

## Retrieve a product label

To retrieve a product label, send the request:

---
`GET` **/product-labels/*{% raw %}{{{% endraw %}product_label_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}product_label_id{% raw %}}}{% endraw %}*** | ID of a product label to retrieve. You can check it in the Back Office > **Products** > **Product Labels** |

### Request

Request sample: retrieve a product label

`GET http://glue.mysprykershop.com/product-labels/3`

### Response

<details>
<summary markdown='span'>Response sample: retrieve a product label</summary>

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

</details>


{% include pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md -->

## Other management options

Apart from using this dedicated endpoint, you can retrieve product lables as an included resource as follows:
* [Retrieve an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html#retrieve-an-abstract-product)
* [Retrieve a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html#retrieve-a-concrete-product)
* [Retrieve a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#retrieve-a-guest-cart)
* [Retrieve registered user's carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#retrieve-registered-users-carts)
* [Retrieve a registered user's cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#retrieve-a-registered-users-cart)
* [Retrieve wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html#retrieve-wishlists)
* [Retrieve a wishlist](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html#retrieve-a-wishlist)

## Possible errors

| CODE | REASON |
| --- | --- |
| 1201 | Label with the specified ID does not exist. |
| 1202 | Product label ID is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
