---
title: Resolving search engine friendly URLs
description: Learn how to resolve search engine friendly URLs via Glue API in the Spryker Marketplace
template: glue-api-storefront-guide-template
redirect_from:
- /docs/scos/dev/glue-api-guides/202404.0/old-glue-infrastructure/marketplace-glue-api-resolve-search-engine-friendly-urls.html
- /docs/dg/dev/glue-api/202410.0/old-glue-infrastructure/marketplace-glue-api-resolve-search-engine-friendly-urls

last_updated: Nov 21, 2023
---

<!-- 2020307.0 is the last version to support this doc. Don't move it to the next versions -->

This endpoint allows resolving Search Engine Friendly (SEF) URLs into a resource URL in Glue API.

For SEO purposes, Spryker automatically generates SEF URLs for products and categories. The URLs are returned as a `url` attribute in responses related to abstract products and product categories. For examples of such responses, see:
- [Retrieve an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html)
- [Retrieve a category tree](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-trees.html)
- [Retrieve a category node](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-nodes.html)
- [Retrieve a CMS page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-cms-pages.html)
- [Retrieve a merchant](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html#retrieve-a-merchant)

In your development, the endpoints can help you to:

- Significantly boost the SEO presence of your product store.
- Increase the search engine ranking of your online store.

To facilitate their usage, Spryker Glue provides an endpoint that allows resolving an SEO-friendly URL, for example, `http://mysprykershop.com/en/canon-powershot-n-35`, into a URL of the relevant product resource in Glue API, for example, `https://glue.mysprykershop.com/abstract-products/035`. This capability is provided by the URLs API.


## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see [Install the Spryker Сore Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html).

## Resolve a SEF URL into a Glue API URL

To resolve a SEF URL into a Glue API URL, send the request:

---
`GET` {% raw %}**/url-resolver?url=*{{SEF URL}}***{% endraw %}

---

| PATH PARAMETER  | DESCRIPTION |
| --------------- | ---------------- |
| {% raw %}***{{SEF URL}}***{% endraw %} | SEF URL you want to resolve. You can get it when:<ul><li>[retrieving abstract products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html)</li><li>[retrieving category nodes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-nodes.html)</li><li>[Retrieve CMS pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-cms-pages.html)</li><li>[retrieving merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html)</li></ul>|

### Request

| HEADER KEY  | HEADER VALUE | REQUIRED | DESCRIPTION    |
| -------------- | ------------ | ------------ | -------------- |
| Accept-Language | de          | &check;      | Specifies the locale. |

| Request sample | Usage |
| --- | --- |
| `GET https://glue.mysprykershop.com/url-resolver?url=/de/acer-aspire-s7-134` | Resolve the following URL of a product: `https://mysprykershop.com/de/acer-aspire-s7-134`. |
| `GET https://glue.mysprykershop.com/url-resolver?url=/en/computer` | Resolve the following URL of a category node: `https://mysprykershop.com/en/computer`. |
| `GET https://glue.mysprykershop.com/url-resolver?url=/de/ruecknahmegarantie` | Resolve the following URL of a CMS page `https://mysprykershop.com/de/ruecknahmegarantie`. |
| `GET https://glue.mysprykershop.com/url-resolver?url=/en/merchant/budget-cameras` | Resolve the following URL of a merchant page: `https://mysprykershop.com/en/merchant/budget-cameras`. |

### Response

<details>
<summary>Response sample: resolve a product URL</summary>

```json
{
    "data": [
        {
            "type": "url-resolver",
            "id": null,
            "attributes": {
                "entityType": "abstract-products",
                "entityId": "134"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/url-resolver?url=/de/acer-aspire-s7-134"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/url-resolver?url=/de/acer-aspire-s7-134"
    }
}
```

</details>

<details>
<summary>Response sample: resolve a URL of a category node</summary>

```json
{
    "data": [
        {
            "type": "url-resolver",
            "id": null,
            "attributes": {
                "entityType": "category-nodes",
                "entityId": "5"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/url-resolver?url=/en/computer"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/url-resolver?url=/en/computer"
    }
}
```

</details>

<details>
<summary>Response sample: resolve a URL of a CMS page</summary>

```json
{
    "data": [
        {
            "type": "url-resolver",
            "id": null,
            "attributes": {
                "entityType": "cms-pages",
                "entityId": "8d378933-22f9-54c7-b45e-db68f2d5d9a3"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/url-resolver?url=/en/return-policy"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/url-resolver?url=/en/return-policy"
    }
}
```

</details>

<details>
<summary>Response sample: resolve a merchant page URL</summary>

```json
{
    "data": [
        {
            "type": "url-resolver",
            "id": null,
            "attributes": {
                "entityType": "merchants",
                "entityId": "MER000005"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/url-resolver?url=/en/merchant/budget-cameras"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/url-resolver?url=/en/merchant/budget-cameras"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| entityType | String | Resource type, like `abstract-products` or `category-nodes`, `cms-pages` or `merchants`. |
| entityId | String | Unique resource identifier. |

Using the information from the response and the Glue server name, you can construct the Glue resource URLs. For example:
- `https://glue.mysprykershop.com/abstract-products/134`
- `https://glue.mysprykershop.com/category-nodes/5`
- `https://glue.mysprykershop.com/cms-pages/8d378933-22f9-54c7-b45e-db68f2d5d9a3`
- `https://glue.mysprykershop.com/merchants/MER000005`

## Possible errors

| STATUS | REASON |
| --- | --- |
| 404 | The provided URL does not exist. |
| 422 | The `url` parameter is missing. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
