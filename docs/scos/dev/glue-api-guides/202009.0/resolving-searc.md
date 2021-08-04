---
title: Resolving search engine friendly URLs
originalLink: https://documentation.spryker.com/v6/docs/resolving-search-engine-friendly-urls
redirect_from:
  - /v6/docs/resolving-search-engine-friendly-urls
  - /v6/docs/en/resolving-search-engine-friendly-urls
---

This endpoints allows resolving Search Engine Friendly (SEF) URLs into a resource URL in Glue API.

For SEO purposes, Spryker automatically generates SEF URLs for products and categories. The URLs are returned as a `url` attribute in responses related to abstract products and product categories. For examples of such responses, see: 
* [Retrieve an abstract product](https://documentation.spryker.com/docs/retrieving-abstract-products#retrieve-an-abstract-product)
* [Retrieve a category tree](https://documentation.spryker.com/docs/retrieving-category-trees#retrieve-a-category-tree)
* [Retrieve a category node](https://documentation.spryker.com/docs/retrieving-category-nodes#retrieve-a-category-node)


## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Spryker Сore feature integration](https://documentation.spryker.com/docs/glue-api-spryker-core-feature-integration).

## Resolve a SEF URL into a Glue API URL

To resolve a SEF URL into a Glue API URL, send the request:

***
`GET` **/url-resolver**
***

### Request



| Request sample | Usage |
| --- | --- |
| GET https://glue.mysprykershop.com/url-resolver?url=/de/acer-aspire-s7-134 | Resolve the following URL of a product: https://mysprykershop.com/de/acer-aspire-s7-134 |
| GET https://glue.mysprykershop.com/url-resolver?url=/en/computer | Resolve the following URL of a category node: https://mysprykershop.com/en/computer |

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


| Attribute | Type | Description |
| --- | --- | --- |
| entityType | String | Resource type, like `abstract-products` or `category-nodes`. |
| entityId | String | Unique resource identifier. |



Using the information from the response and the Glue server name, you can construct the Glue resource URL. For example, `https://glue.mysprykershop.com/abstract-products/134`.

## Possible errors

| Status | Reason |
| --- | --- |
| 404 | The provided URL does not exist. |
| 422 | The `url` parameter is missing. |


