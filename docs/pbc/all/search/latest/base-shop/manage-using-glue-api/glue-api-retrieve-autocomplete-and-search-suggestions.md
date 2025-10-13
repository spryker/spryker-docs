---
title: "Glue API: Retrieve autocomplete and search suggestions"
description: This article provides information on which endpoints to use to get search and auto-completion suggestions for your products, categories, and CMS fields.
last_updated: Jul 20, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-autocomplete-and-search-suggestions
originalArticleId: 31e2cfd0-e6e5-46ee-96a9-93ae816d6761
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/retrieving-autocomplete-and-search-suggestions.html
  - /docs/pbc/all/search/202311.0/manage-using-glue-api/glue-api-retrieve-autocomplete-and-search-suggestions.html
  - /docs/scos/dev/glue-api-guides/202204.0/retrieving-autocomplete-and-search-suggestions.html
related:
  - title: Searching the product catalog
    link: docs/pbc/all/search/latest/base-shop/manage-using-glue-api/glue-api-search-the-product-catalog.html
---

In addition to [catalog search](/docs/pbc/all/search/latest/base-shop/manage-using-glue-api/glue-api-search-the-product-catalog.html), Glue API allows you to retrieve autocomplete suggestions for products, categories, and CMS pages. The feature allows developers to predict search strings and provide customers with available options.

In your development, this resource can help you to enhance the customer experience by providing the relevant information for search, product filters, shopping cart, checkout, order history, wishlist, and many more.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Catalog Glue API](/docs/pbc/all/search/latest/base-shop/install-and-upgrade/install-features-and-glue-api/install-the-catalog-glue-api.html).

## Retrieve a search suggestion

To retrieve a search suggestion, send the request:

***
`GET` **/catalog-search-suggestions**
***

### Request

| STRING PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| q | Adds a search query to the request | You can enter any search query. |

| Request | Description |
| --- | --- |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions` | Retrieve suggestions for an empty search string. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=` | Retrieve suggestions for an empty search string |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=**c**` | Retrieve suggestions for one letter. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=**co**` | Retrieve suggestions for two letters. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=**com**` | Retrieve suggestions for three letters |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=**computer**` | Retrieve suggestions for the word `computer`. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=**telecom+%26+navigation**` | Retrieve suggestions for the phrase `telecom&navigation`. |

### Response

<details>
<summary>Response sample: retrieve suggestions for a query</summary>

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
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=comp"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=comp"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| completion | Array | Autocomplete suggestions for the search query. <br> Each item in the array is a string. |
| categories | Array | Categories that match the search query. <br> Each item in the array is an object representing a single category. |
| categories.name | String | Category name. |
| categories.url | String | Category URL. |
| cmsPages | Array | CMS pages that match the search query. <br> Each item in the array is an object representing a single page. |
| cmsPages.name | String | Page title. |
| cmsPages.url | String | Page URL. |
| abstractProducts | Array | Abstract products that match the search query. <br> Each item in the array is an object representing a product. |
| abstractProducts.price | Integer | Product price. |
| abstractProducts.abstractName | String | Product name. |
| abstractProducts.abstractSku | String | Product SKU. |
| abstractProducts.url | String | URL of the product's product details page. |
| abstractProducts.images | Object | URLs of the product's images. |
| abstractProducts.images.externalUrlSmall | String | URL of the product's preview image. |
| abstractProducts.images.externalUrlLarg | String | URL of the product's large image. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/integrations/spryker-glue-api/storefront-api/api-references/reference-information-storefront-application-errors.html).
