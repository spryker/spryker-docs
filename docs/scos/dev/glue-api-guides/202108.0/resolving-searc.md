---
title: Resolving search engine friendly URLs
originalLink: https://documentation.spryker.com/2021080/docs/resolving-search-engine-friendly-urls
redirect_from:
  - /2021080/docs/resolving-search-engine-friendly-urls
  - /2021080/docs/en/resolving-search-engine-friendly-urls
---

This endpoints allows resolving Search Engine Friendly (SEF) URLs into a resource URL in Glue API.

For SEO purposes, Spryker automatically generates SEF URLs for products and categories. The URLs are returned as a `url` attribute in responses related to abstract products and product categories. For examples of such responses, see: 
* [Retrieve an abstract product](https://documentation.spryker.com/docs/retrieving-abstract-products#retrieve-an-abstract-product)
* [Retrieve a category tree](https://documentation.spryker.com/docs/retrieving-category-trees#retrieve-a-category-tree)
* [Retrieve a category node](https://documentation.spryker.com/docs/retrieving-category-nodes#retrieve-a-category-node)
* [Retrieve a CMS page](https://documentation.spryker.com/2021080/docs/retrieving-cms-pages)

In your development, the endpoints can help you to:

* significantly boost the SEO presence of your product store
* increase search engine ranking of your online store

To facilitate their usage, Spryker Glue provides an endpoint that allows resolving a SEO-friendly URL, for example, `http://mysprykershop.com/en/canon-powershot-n-35`, into a URL of the relevant product resource in Glue API, for example, `http://glue.mysprykershop.com/abstract-products/035`. This capability is provided by the URLs API.


## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Spryker Сore feature integration](https://documentation.spryker.com/docs/glue-api-spryker-core-feature-integration).

## Resolve a SEF URL into a Glue API URL

To resolve a SEF URL into a Glue API URL, send the request:

***
`GET` **/url-resolver?url=*{% raw %}{{{{% endraw %}SEF URL{% raw %}}}{% endraw %}}*****
***

| Path parameter  | Description       |
| --------------- | ---------------- |
| ***{% raw %}{{{{% endraw %}SEF URL{% raw %}}}{% endraw %}}*** | SEF URL you want to resolve. You can get it when:<ul><li>[retrieving abstract products](https://documentation.spryker.com/docs/retrieving-abstract-products)</li><li>[retrieving category nodes](https://documentation.spryker.com/docs/retrieving-category-nodes)</li><li>[retrieving cms pages](https://documentation.spryker.com/2021080/docs/retrieving-cms-pages)</li></ul>|

### Request

| Header key  | Header value | Required | Description    |
| -------------- | ------------ | ------------ | -------------- |
| Accept-Language | de          | ✓      | Specifies the locale. |

| Request sample | Usage |
| --- | --- |
| `GET https://glue.mysprykershop.com/url-resolver?url=/de/acer-aspire-s7-134` | Resolve the following URL of a product: https://mysprykershop.com/de/acer-aspire-s7-134 |
| `GET https://glue.mysprykershop.com/url-resolver?url=/en/computer` | Resolve the following URL of a category node: https://mysprykershop.com/en/computer |
| `GET https://glue.mysprykershop.com/url-resolver?url=/de/ruecknahmegarantie` | Resolve the following URL of a CMS page https://mysprykershop.com/de/ruecknahmegarantie |

### Response

<details open>
<summary>Response sample of a product URL</summary>
    
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

<details open>
<summary>Response sample of a category node URL</summary>
    
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

<details open>
<summary>Response sample of a CMS page URL</summary>

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

| Attribute | Type | Description |
| --- | --- | --- |
| entityType | String | Resource type, like `abstract-products` or `category-nodes`, `cms-pages`. |
| entityId | String | Unique resource identifier. |

Using the information from the response and the Glue server name, you can construct the Glue resource URLs. For example:
* `https://glue.mysprykershop.com/abstract-products/134`
* `https://glue.mysprykershop.com/category-nodes/5`
* `https://glue.mysprykershop.com/cms-pages/8d378933-22f9-54c7-b45e-db68f2d5d9a3`

## Possible errors

| Status | Reason |
| --- | --- |
| 404 | The provided URL does not exist. |
| 422 | The `url` parameter is missing. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).



