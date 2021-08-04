---
title: Getting Suggestions for Auto-Completion and Search
originalLink: https://documentation.spryker.com/v2/docs/getting-suggestions-for-autocompletion-and-search
redirect_from:
  - /v2/docs/getting-suggestions-for-autocompletion-and-search
  - /v2/docs/en/getting-suggestions-for-autocompletion-and-search
---

In addition to the catalog search, Elasticsearch also offers auto-completion terms and suggestions for products, categories and CMS pages that can be retrieved via the search suggestions endpoint. Auto-completion helps to predict the rest of the search string and provides you with all the options.

In your development, this resource can help you to retrieve relevant information for your product listing and detail pages, for search, shopping cart, checkout, order history, wishlist and many more.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Catalog Search API Feature Integration](/docs/scos/dev/migration-and-integration/201903.0/feature-integration-guides/glue-api/catalog-search-).

## Usage
To get search suggestion that you can use for auto-completion, you need to send GET requests to the following endpoint:
`/catalog-search-suggestions `
Sample request: `GET http://mysprykershop.com/catalog-search-suggestions`
To include search queries in your request, use the q parameter. Below you can find the most common queries to use:

| Request | Description |
| --- | --- |
| /catalog-search-suggestions?q= | Suggestions with empty search string |
| /catalog-search-suggestions?q=**c** | Suggestions for **1** letter |
| /catalog-search-suggestions?q=c**o** | Suggestions for **2** letters |
| /catalog-search-suggestions?q=com | Suggestions for **3** letters |
| /catalog-search-suggestions?q=**computer** | Suggestions for word **computers** |
| /catalog-search-suggestions?q=telecom+%26+navigation | Suggestions for "**telekom&navigation**" |

If the catalog contains any suggestions for the query string, the endpoint will respond with a **RestCatalogSearchSuggestionsResponse**.

**Response sample**
```js
{
  "data": [
    {
      "type": "catalog-search-suggestions",
      "id": null,
      "attributes": {
        "completion": [
          "cameras & camcorders",
          "digital cameras"
        ],
        "abstractProducts": [
          {
            "images": [
              {
                "externalUrlSmall": "//d2s0ynfc62ej12.cloudfront.net/b2c/24602396-8292.jpg",
                "externalUrlLarge": "//d2s0ynfc62ej12.cloudfront.net/b2c/24602396-8292.jpg"
              }
            ],
            "abstractSku": "078",
            "abstractName": "Sony Xperia Z3 Compact",
            "price": 25584
          },
          {
            "images": [
              {
                "externalUrlSmall": "//d2s0ynfc62ej12.cloudfront.net/b2c/24584210-216.jpg",
                "externalUrlLarge": "//d2s0ynfc62ej12.cloudfront.net/b2c/24584210-216.jpg"
              }
            ],
            "abstract_sku": "077",
            "abstract_name": "Sony Xperia Z3 Compact",
            "price": 14554
          }
        ],
        "categories": [
          {
            "name": "Cameras & Camcorders"
          },
          {
            "name": "Digital Cameras"
          }
        ],
        "cmsPages": []
      },
      "links": {
        "self": "http://glue.de.suite.local/catalog-search-suggestions"
      }
    }
  ],
  "links": {
    "self": "http://glue.de.suite.local/catalog-search-suggestions?q=cam"
  },
  "included": []
}
```

### General fields
| Field* | Type | Description |
| --- | --- | --- |
| completion | String | Applicable auto completion terms. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

### Product fields
| Field* | Type | Description |
| --- | --- | --- |
| abstract_sku | String | SKU of the abstract product |
| abstract_name | String | Name of the abstract product |
| price | Integer | Price to pay for that product in cents |
| external_url_small | String | URLs to the image per image set per image |
| external_url_large | String | URLs to the image per image set per image |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

### Category fields
| Field* | Type | Description |
| --- | --- | --- |
| categories | String | Names of matching categories. |CMS fields


\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

### CMS fields
| Field* | Type | Description |
| --- | --- | --- |
| cmsPages | String | Names of matching CMS pages. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample response**
```js
{
  "data": [
    {
      "type": "catalog-search-suggestions",
      "id": null,
      "attributes": {
        "completion": [
          "cameras & camcorders",
          "digital cameras"
        ],
        "abstractProducts": [
          {
            "images": [
              {
                "externalUrlSmall": "//d2s0ynfc62ej12.cloudfront.net/b2c/24602396-8292.jpg",
                "externalUrlLarge": "//d2s0ynfc62ej12.cloudfront.net/b2c/24602396-8292.jpg"
              }
            ],
            "abstractSku": "078",
            "abstractName": "Sony Xperia Z3 Compact",
            "price": 25584
          },
          {
            "images": [
              {
                "externalUrlSmall": "//d2s0ynfc62ej12.cloudfront.net/b2c/24584210-216.jpg",
                "externalUrlLarge": "//d2s0ynfc62ej12.cloudfront.net/b2c/24584210-216.jpg"
              }
            ],
            "abstract_sku": "077",
            "abstract_name": "Sony Xperia Z3 Compact",
            "price": 14554
          }
        ],
        "categories": [
          {
            "name": "Cameras & Camcorders"
          },
          {
            "name": "Digital Cameras"
          }
        ],
        "cmsPages": []
      },
      "links": {
        "self": "http://glue.de.suite.local/catalog-search-suggestions"
      }
    }
  ],
  "links": {
    "self": "http://glue.de.suite.local/catalog-search-suggestions?q=cam"
  },
  "included": []
}
```

The response contains **4** types of suggestions:

* **completion** - contains suggestions for auto-completion strings;
* **abstractProducts** - contains suggested products;
* **categories** - contains suggestions for categories;
* **cmsPages** - contains suggested CMS pages.
