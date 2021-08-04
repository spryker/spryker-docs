---
title: Getting Suggestions for Auto-Completion and Search
originalLink: https://documentation.spryker.com/v4/docs/retrieving-suggestions-for-auto-completion-and-search
redirect_from:
  - /v4/docs/retrieving-suggestions-for-auto-completion-and-search
  - /v4/docs/en/retrieving-suggestions-for-auto-completion-and-search
---

In addition to [catalog search](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/catalog-search), Spryker search engine also provides auto-completion terms and suggestions for products, categories, and CMS pages. The feature allows developers to predict search strings and provide customers with available options.

In your development, this resource can help you to enhance the customer experience by providing the relevant information for search, product filters, shopping cart, checkout, order history, wishlist, and many more.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [GLUE: Catalog Feature Integration](https://documentation.spryker.com/v4/docs/catalog-api-feature-integration-201907).

## Usage

### Request

To get a search suggestion, you need to send a _GET_ request to the following endpoint:  
`/catalog-search-suggestions`

Sample request: `GET http://glue.mysprykershop.com/catalog-search-suggestions?q=comp`

To include search queries in your request, use the **q** URL parameter. Below you can find the most common queries to use:

| Request | Description |
| --- | --- |
| /catalog-search-suggestions?q= | Suggestions with an empty search string |
| /catalog-search-suggestions?q=**c** | Suggestions for **1** letter |
| /catalog-search-suggestions?q=**co** | Suggestions for **2** letters |
| /catalog-search-suggestions?q=**com** | Suggestions for **3** letters |
| /catalog-search-suggestions?q=**computer** | Suggestions for the word **computer** |
| /catalog-search-suggestions?q=**telecom+%26+navigation** | Suggestions for the phrase "**telecom&navigation**" |

### Response

If the catalog contains any suggestions for the query string, the endpoint will respond with the relevant suggestions. The attributes of the endpoint are split into **4** main sections that provide different types of suggestions.

**Response Attributes**

| Field\* | Type | Description |
| --- | --- | --- |
| **completion** | Array | Provides a list of **autocompletion suggestions** for the query string.<br/>Each item in the array is a _String_. |
| **categories** | Array | Contains an array of **categories** matching the search query.<br/>Each item in the array is an _Object_ representing a single category. |
| **cmsPages** | Array | Contains an array of **CMS pages** matching the search query.<br/>Each item in the array is an _Object_ representing a single page. |
| **abstractProducts** | Array | Contains an array of **abstract products** matching the search query.<br/>Each item in the array is an _Object_ representing a product. |

\* The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Category Attributes**

Each category exposes the following attributes:

| Field | Type | Description |
| --- | --- | --- |
| **name** | String | Specifies the category name. |
| **url** | String | Specifies the category URL. |

**CMS Page Attributes**

Each CMS page exposes the following attributes:

| Field | Type | Description |
| --- | --- | --- |
| **name** | String | Specifies the page title. |
| **url** | String | Specifies the page URL. |

**Abstract Product Attributes**

The following attributes are provided for each product in the response:

| Field | Type | Description |
| --- | --- | --- |
| **abstractName** | String | Specifies the name of the product. |
| **abstractSku** | String | Specifies the SKU of the product. |
| **url** | String | Specifies the product details page. |
| **price** | Integer | Specifies the product price. |
| **images** | Object | Provides URLs of the product images.<br/>The object consists of **2** items:<ul><li>**externalUrlSmall** - specifies the URL of the product preview image;</li><li> **externalUrlLarge** - specifies the URL of the large product image.</li></ul> |

The `url` attribute of categories and abstract products exposes a Search Engine Friendly (SEF) URL of the resource that represents the respective category or product. For information on how to resolve such a URL and retrieve the corresponding resource, see [Using Search Engine Friendly URLs](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/using-search-en).

{% info_block warningBox %}

Although CMS pages also expose the `url` parameter, resolving of CMS page SEF URLs is not supported at the moment.

{% endinfo_block %}

<details open>
    <summary>Response Sample</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [
                    "sony xperia z3 compact",
                    "computer"
                ],
                "categories": [
                    {
                        "name": "Computer",
                        "url": "/en/computer"
                    }
                ],
                "cmsPages": [
                    {
                        "name": "GTC",
                        "url": "/en/gtc"
                    },
                    {
                        "name": "Imprint",
                        "url": "/en/imprint"
                    },
                    {
                        "name": "Data Privacy",
                        "url": "/en/privacy"
                    }
                ],
                "abstractProducts": [
                    {
                        "price": 25584,
                        "abstractName": "Sony Xperia Z3 Compact",
                        "abstractSku": "078",
                        "url": "/en/sony-xperia-z3-compact-78",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24602396-8292.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24602396-8292.jpg"
                            }
                        ]
                    },
                    {
                        "price": 35711,
                        "abstractName": "Sony Xperia Z3 Compact",
                        "abstractSku": "076",
                        "url": "/en/sony-xperia-z3-compact-76",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24394207-3552.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24394207-3552.jpg"
                            }
                        ]
                    },
                    {
                        "price": 14554,
                        "abstractName": "Sony Xperia Z3 Compact",
                        "abstractSku": "077",
                        "url": "/en/sony-xperia-z3-compact-77",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24584210-216.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24584210-216.jpg"
                            }
                        ]
                    },
                    {
                        "price": 15999,
                        "abstractName": "HP Z 440",
                        "abstractSku": "126",
                        "url": "/en/hp-z-440-126",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/32770169_3402944008.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_mediums/32770169_3402944008.jpg"
                            }
                        ]
                    },
                    {
                        "price": 9080,
                        "abstractName": "HP Z 620",
                        "abstractSku": "127",
                        "url": "/en/hp-z-620-127",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_22828284_medium_1483352627_419_25017.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/22828284-8540.jpg"
                            }
                        ]
                    },
                    {
                        "price": 10680,
                        "abstractName": "HP 200 280 G1",
                        "abstractSku": "121",
                        "url": "/en/hp-200-280-g1-121",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_29406823_medium_1480596185_822_26035.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29406823_8847.png"
                            }
                        ]
                    },
                    {
                        "price": 9999,
                        "abstractName": "Fujitsu CELSIUS M740",
                        "abstractSku": "116",
                        "url": "/en/fujitsu-celsius-m740-116",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_29743424_medium_1484036296_797_10191.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/29743424-7678.jpg"
                            }
                        ]
                    },
                    {
                        "price": 5448,
                        "abstractName": "Samsung Galaxy S4 Mini",
                        "abstractSku": "064",
                        "url": "/en/samsung-galaxy-s4-mini-64",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/23294027-3072.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/23294027-3072.jpg"
                            }
                        ]
                    },
                    {
                        "price": 19700,
                        "abstractName": "Samsung Galaxy S4 Mini",
                        "abstractSku": "063",
                        "url": "/en/samsung-galaxy-s4-mini-63",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/29231675_7943.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/29231675_7943.jpg"
                            }
                        ]
                    },
                    {
                        "price": 19137,
                        "abstractName": "Acer Chromebook CB5-311",
                        "abstractSku": "135",
                        "url": "/en/acer-chromebook-cb5-311-135",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_29836399_medium_1480606969_3257_31346.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/29836399_4420.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/catalog-search-suggestions?q=comp"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/catalog-search-suggestions?q=comp"
    }
}
```

</details>

