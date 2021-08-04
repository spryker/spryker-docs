---
title: Using Search Engine Friendly URLs
originalLink: https://documentation.spryker.com/v5/docs/using-search-engine-friendly-urls
redirect_from:
  - /v5/docs/using-search-engine-friendly-urls
  - /v5/docs/en/using-search-engine-friendly-urls
---

For SEO purposes, Spryker automatically generates Search Engine Friendly (SEF) URLs for products and categories. Such URLs are included in the URL attribute of responses of all endpoints related to abstract products and product categories, for example:

**/abstract-products endpoint response**
    
```json
{
    "data": {
        "type": "abstract-products",
        "id": "035",
        "attributes": {
            "sku": "035",
            "name": "Canon PowerShot N",
            "description": "...",
            "attributes": {...},
            "superAttributesDefinition": [...],
            "superAttributes": [],
            "attributeMap": {...},
            "metaTitle": "Canon PowerShot N",
            "metaKeywords": "Canon,Entertainment Electronics",
            "metaDescription": "...",
            "attributeNames": {...},
            "url": "/en/canon-powershot-n-35"
        },
        "links": {...}
    }
}
```
    
**/category-trees endpoint response**
    
```json
{
    "data": [
        {
            "type": "category-trees",
            "id": null,
            "attributes": {
                "categoryNodesStorage": [
                    {
                        "nodeId": 5,
                        "order": 100,
                        "name": "Computer",
                        "children": [...],
                        "url": "/en/computer"
                    },
                    {
                        "nodeId": 2,
                        "order": 90,
                        "name": "Cameras & Camcorders",
                        "children": [...],
                        "url": "/en/cameras-&-camcorders"
                    },
                    {
                        "nodeId": 16,
                        "order": 80,
                        "name": "Food",
                        "children": [],
                        "url": "/en/food"
                    },
                    {
                        "nodeId": 15,
                        "order": 80,
                        "name": "Cables",
                        "children": [],
                        "url": "/en/cables"
                    },
                    {
                        "nodeId": 11,
                        "order": 80,
                        "name": "Telecom & Navigation",
                        "children": [...],
                        "url": "/en/telecom-&-navigation"
                    },
                    {
                        "nodeId": 9,
                        "order": 70,
                        "name": "Smart Wearables",
                        "children": [...],
                        "url": "/en/smart-wearables"
                    }
                ]
            },
            "links": {...}
        }
    ],
    "links": {...}
}
```
    
**/category-nodes endpoint response**
    
```json
{
    "data": {
        "type": "category-nodes",
        "id": "9",
        "attributes": {
            "nodeId": 9,
            "name": "Smart Wearables",
            "metaTitle": "Smart Wearables",
            "metaKeywords": "Smart Wearables",
            "metaDescription": "Smart Wearables",
            "isActive": true,
            "children": [...],
            "parents": [...],
            "order": 70,
            "url": "/en/smart-wearables"
        },
        "links": {..}
    }
}
```

SEF URLs can significantly boost the SEO presence of your product store and increase its search engine ranking.

To facilitate their usage, Spryker Glue provides an endpoint that allows resolving a SEO-friendly URL, for example, `http://mysprykershop.com/en/canon-powershot-n-35`, into a URL of the relevant product resource in Glue API, for example, `http://glue.mysprykershop.com/abstract-products/035`. This capability is provided by the **URLs API**.

## Installation
To enable the API functionality, you need to install version **201911** of Spryker Glue API. For detailed information and installation instructions, see [GLUE: Spryker Core Feature Integration](https://documentation.spryker.com/docs/en/glue-spryker-core-feature-integration).

## Usage
To resolve a SEO-friendly link into a Glue URL, send a GET request to the following endpoint:

**/url-resolver**

### Request
Sample request: *GET http://glue.mysprykershop.com/url-resolver?url=**/de/acer-aspire-s7-134***

where **/de/acer-aspire-s7-134** is the SEF URL you want to resolve, without the server name and scheme.

{% info_block errorBox %}
Resolving of complete URLs, e.g. *http://mysprykershop.com/en/canon-powershot-n-35*, is not supported
{% endinfo_block %}

{% info_block warningBox "Note" %}
You can use the **Accept-Language** header to specify the locale.</br>Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}`]</br>where **de**, **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}{target="_blank"}.)

### Response
If the request was successful, the endpoint responds with the type and unique identifier of the Glue resource that represents the requested product or category. Using the information provided, you can construct the URL to request the relevant resource in Glue API.

**Response Attributes**

| Field* | Type | Description |
| --- | --- | --- |
| **entityType** | String | Specifies the resource type, for example, **abstract-products** or **category-nodes**. |
| **entityId** | String | Specifies the resource identifier. |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample Response - Products**
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
                "self": "http://glue.mysprykershop.com/url-resolver?url=/de/acer-aspire-s7-134"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/url-resolver?url=/de/acer-aspire-s7-134"
    }
}
```

**Sample Response - Category Nodes**
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
                "self": "http://glue.mysprykershop.com/url-resolver?url=/en/computer"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/url-resolver?url=/en/computer"
    }
}
```

**Glue Resource Link**

Using the information of the above sample response and the Glue server name, you can construct the Glue resource URL, for example: *http://glue.mysprykershop.com/abstract-products/134*.

### Possible Errors

| Status | Reason |
| --- | --- |
| 404 | The provided URL does not exist. |
| 422 | The url parameter is missing. |


