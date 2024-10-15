---
title: "Glue API: Resolve search engine friendly URLs"
description: Learn how to resolve search engine friendly URLs via Glue API.
last_updated: Jun 22, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/resolving-search-engine-friendly-urls
originalArticleId: 41034f7a-96b3-47d8-80ab-6ef8c62b8a4b
redirect_from:
  - /2021080/docs/resolving-search-engine-friendly-urls
  - /2021080/docs/en/resolving-search-engine-friendly-urls
  - /docs/resolving-search-engine-friendly-urls
  - /docs/en/resolving-search-engine-friendly-urls
  - /docs/scos/dev/glue-api-guides/202307.0/resolving-search-engine-friendly-urls.html
  - /docs/scos/dev/glue-api-guides/202307.0/old-glue-infrastructure/resolving-search-engine-friendly-urls.html

related:
  - title: Install the Spryker Core Glue API
    link: docs/pbc/all/miscellaneous/page.version/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html
---

<!-- 2020307.0 is the last version to support this doc. Don't move it to the next versions -->

{% info_block warningBox %}

This is a document related to the Old Glue infrastructure. For the new one, see [Decoupled Glue API](/docs/dg/dev/glue-api/{{page.version}}/decoupled-glue-api.html)

{% endinfo_block %}

This endpoints allows resolving Search Engine Friendly (SEF) URLs into a resource URL in Glue API.

For SEO purposes, Spryker automatically generates SEF URLs for products and categories. The URLs are returned as a `url` attribute in responses related to abstract products and product categories. For examples of such responses, see:
* [Retrieve an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html#retrieve-an-abstract-product)
* [Retrieve a category tree](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-trees.html#retrieve-a-category-tree)
* [Retrieve a category node](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-nodes.html#retrieve-a-category-node)
* [Retrieve a CMS page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-cms-pages.html)

In your development, the endpoints can help you to:
* significantly boost the SEO presence of your product store
* increase search engine ranking of your online store

To facilitate their usage, Spryker Glue provides an endpoint that allows resolving a SEO-friendly URL, for example, `http://mysprykershop.com/en/canon-powershot-n-35`, into a URL of the relevant product resource in Glue API, for example, `https://glue.mysprykershop.com/abstract-products/035`. This capability is provided by the URLs API.


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html).

## Resolve a SEF URL into a Glue API URL

To resolve a SEF URL into a Glue API URL, send the request:

***
`GET` **/url-resolver?url={% raw %}*{{{% endraw %}SEF URL{% raw %}}}*{% endraw %}**
***

| PATH PARAMETER  | DESCRIPTION |
| --------------- | ---------------- |
| ***{% raw %}{{{% endraw %}SEF URL{% raw %}}}{% endraw %}*** | SEF URL you want to resolve. You can get it when:<ul><li>[retrieving abstract products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html)</li><li>[retrieving category nodes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-nodes.html)</li><li>[Retrieve CMS pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-cms-pages.html)</li></ul>|

### Request

| HEADER KEY  | HEADER VALUE | REQUIRED | DESCRIPTION    |
| -------------- | ------------ | ------------ | -------------- |
| Accept-Language | de          | ✓      | Specifies the locale. |

| REQUEST SAMPLE | USAGE |
| --- | --- |
| GET https://glue.mysprykershop.com/url-resolver?url=/de/acer-aspire-s7-134 | Resolve the following URL of a product: `https://mysprykershop.com/de/acer-aspire-s7-134` |
| GET https://glue.mysprykershop.com/url-resolver?url=/en/computer | Resolve the following URL of a category node: `https://mysprykershop.com/en/computer` |
| GET https://glue.mysprykershop.com/url-resolver?url=/de/ruecknahmegarantie | Resolve the following URL of a CMS page `https://mysprykershop.com/de/ruecknahmegarantie` |

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
<summary>Response sample: resolve a category node URL</summary>

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
<summary>Response sample: resolve a CMS page URL</summary>

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

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| entityType | String | Resource type, like `abstract-products` or `category-nodes`, `cms-pages`. |
| entityId | String | Unique resource identifier. |

Using the information from the response and the Glue server name, you can construct the Glue resource URLs. For example:
* `https://glue.mysprykershop.com/abstract-products/134`
* `https://glue.mysprykershop.com/category-nodes/5`
* `https://glue.mysprykershop.com/cms-pages/8d378933-22f9-54c7-b45e-db68f2d5d9a3`

## Possible errors

| CODE | REASON |
| --- | --- |
| 2801 | The `url` parameter is missing. |
| 2802 | The provided URL does not exist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
