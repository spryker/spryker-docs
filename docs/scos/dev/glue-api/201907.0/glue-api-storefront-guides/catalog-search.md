---
title: Catalog Search
originalLink: https://documentation.spryker.com/v3/docs/catalog-search
redirect_from:
  - /v3/docs/catalog-search
  - /v3/docs/en/catalog-search
---

The implementation of the search API offers you the same search experience as in the Spryker demo shops. The search engine used is Elasticsearch and search results go beyond the simple listing of products in the results section. The list of search results is paginated according to your configuration and spelling suggestions are offered when needed. In addition, sorting and facets are supported to narrow down the search results.

In your development, this endpoint can help you to:

* Implement catalog search functionality including facets and pagination
* Retrieve a list of products to be displayed anywhere you want.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Catalog Search API Feature Integration](/docs/scos/dev/migration-and-integration/201903.0/feature-integration-guides/glue-api/catalog-search-).

## Searching for Products
To search for products, send GET requests to the following endpoint:
`/catalog-search`
Sample request: `GET http://mysprykershop.com/catalog-search?q=`
The above request is the same as searching with an empty search field in Spryker front-end (no search parameters provided). By executing such a test search request, you can get search settings, such as sorting and pagination options, a default number of items per page etc.

{% info_block warningBox %}
Search settings are defined by the front-end search configuration. In other words, the REST API uses search settings of Spryker Shop Application.
{% endinfo_block %}

## Sorting Parameters
| Field* | Type | Description |
| --- | --- | --- |
| sortParamNames | String | List of possible sorting parameters such as "name_asc" or "price_desc" |
| sortParamLocalizedNames | String | Localized names of the sorting parameters available as well as the sorting parameters themselves |
| currentSortParam | String | The currently applied sorting parameter |
| currentSortOrder | String | The currently applied sorting order |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Pagination**
| Field* | Type | Description |
| --- | --- | --- |
| numFound | String | Number of search results |
| currentPage | String | Current page of search results |
| maxPage | String | Total number of search results pages |
| currentItemsPerPage | String | Number of search results on the current page |
| defaultItemsPerPage | String | Default number of search results on one page |
| validItemsPerPageOptions | String | Another number of search results per page options |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

## Abstract Product Information
| Field* | Type | Description |
| --- | --- | --- |
| externalUrlSmall | String | URLs to the image per image set per image |
| externalUrlLarge | String | URLs to the image per image set per image |
| price | Integer | Price to pay for that product in cents |
| abstractName | String | Name of the abstract product |
| abstractSku | String | SKU of the abstract product |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

## Abstract Product Price Information
| Field* | Type | Description |
| --- | --- | --- |
| code | String | Currency code |
| name | String | Currency name |
| symbol | Integer | Currency symbol |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample empty response (no products found) </summary>

```js
{
		"data": [
			{
				"type": "catalog-search",
				"id": null,
				"attributes": {
					"currency": "EUR",
					"sort": {
						"sortParamNames": [
							"rating",
							"name_asc",
							"name_desc",
							"price_asc",
							"price_desc"
						],
						"sortParamLocalizedNames": {
						"rating": "Sort by product ratings",
						"name_asc": "Sort by name ascending",
						"name_desc": "Sort by name descending",
						"price_asc": "Sort by price ascending",
						"price_desc": "Sort by price descending"
						},
						"currentSortParam": null,
						"currentSortOrder": null
					},
					"pagination": {
						"numFound": 0,
						"currentPage": 0,
						"maxPage": 0,
						"currentItemsPerPage": 12,
						"config": {
							"parameterName": "page",
							"itemsPerPageParameterName": "ipp",
							"defaultItemsPerPage": 12,
							"validItemsPerPageOptions": [
								12,
								24,
								36
							]
						}
					},
					"abstractProducts": {},
					"valueFacets": {},
					"rangeFacets": {},
					"spellingSuggestion": null
				},
				"links": {
					"self": "http://glue.90.spryker-shop-b2c.com/catalog-search"
				}
			}
		],
		"links": {
			"self": "http://glue.90.spryker-shop-b2c.com/catalog-search"
		}
	}
```
<br>
</details>

To search for products, you need to add search filters following the q parameter. Below are examples of the most common filters you can use:
| Request | Description |
| --- | --- |
| /catalog-search?q=**camera** | Search for any **camera** products |
| /catalog-search?q=camera&price%5Bmin%5D=**157**&price%5Bmax%5D=**158** | Search for camera products with price between **157** and **158** |
| /catalog-search?q=camera**&label%5B%5D=SALE+%25** | Search for **camera** products with a **SALE+%25** label |
| /catalog-search?q=camera&**brand=Canon** | Search for **Canon**-branded **camera** products |
| /catalog-search?**color[]=White**&q=camera | Search for **white camera** products |
| /catalog-search?**weight[]=132+g**&q=camera | Search for **camera** products with weight **132 g** |

<details open>
<summary>Sample response for a valid request </summary>

```js
{
  "data": {
    "type": "catalog-search",
    "id": null,
    "attributes": {
      "sort": {
        "sort_param_names": [
          "rating",
          "name_asc",
          "name_desc",
          "price_asc",
          "price_desc"
        ],
        "current_sort_param": "1",
        "current_sort_order": null
      },
      "pagination": {
        "num_found": 3,
        "current_page": 1,
        "max_page": 1,
        "current_items_per_page": 12,
        "config": {
          "parameter_name": "page",
          "items_per_page_parameter_name": "ipp",
          "default_items_per_page": 12,
          "valid_items_per_page_options": [
            12,
            24,
            36
          ]
        }
      },
      "abstractProducts": [
        {
          "images": [
            {
              "externalUrlSmall": "//d2s0ynfc62ej12.cloudfront.net/b2c/26175504-2265.jpg",
              "externalUrlLarge": "//d2s0ynfc62ej12.cloudfront.net/b2c/26175504-2265.jpg"
            }
          ],
          "price": 36742,
          "abstractName": "Acer Liquid Jade",
          "prices": [
            {
              "priceTypeName": "DEFAULT",
              "currency": {
                "code": "EUR",
                "name": "Euro",
                "symbol": "€"
              },
              "grossAmount": 36742,
              "DEFAULT": 36742
            },
            {
              "priceTypeName": "ORIGINAL",
              "currency": {
                "code": "EUR",
                "name": "Euro",
                "symbol": "€"
              },
              "grossAmount": 40000,
              "ORIGINAL": 40000
            }
          ],
          "abstractSku": "059"
        }
      ],
      "valueFacets": [
        {
          "name": "category",
          "localizedName": "Categories",
          "docCount": null,
          "values": [
            {
              "value": 1,
              "doc_count": 24
            },
            {
              "value": 5,
              "doc_count": 12
            },
            {
              "value": 14,
              "doc_count": 8
            },
            {
              "value": 6,
              "doc_count": 7
            },
            {
              "value": 11,
              "doc_count": 7
            },
            {
              "value": 12,
              "doc_count": 7
            },
            {
              "value": 9,
              "doc_count": 5
            },
            {
              "value": 10,
              "doc_count": 5
            },
            {
              "value": 8,
              "doc_count": 3
            },
            {
              "value": 7,
              "doc_count": 2
            }
          ],
          "activeValue": null,
          "config": {
            "parameterName": "category",
            "isMultiValued": false
          }
        },
        {
          "name": "label",
          "localizedName": "Label",
          "docCount": null,
          "values": [
            {
              "value": "SALE %",
              "doc_count": 7
            },
            {
              "value": "Standard Label",
              "doc_count": 3
            },
            {
              "value": "New",
              "doc_count": 1
            }
          ],
          "activeValue": null,
          "config": {
            "parameterName": "label",
            "isMultiValued": true
          }
        },
        {
          "name": "color",
          "localizedName": "Color",
          "docCount": null,
          "values": [
            {
              "value": "Black",
              "doc_count": 9
            },
            {
              "value": "White",
              "doc_count": 8
            },
            {
              "value": "Grey",
              "doc_count": 2
            },
            {
              "value": "Silver",
              "doc_count": 2
            },
            {
              "value": "Blue",
              "doc_count": 1
            },
            {
              "value": "Navy",
              "doc_count": 1
            }
          ],
          "activeValue": null,
          "config": {
            "parameterName": "color",
            "isMultiValued": true
          }
        },
        {
          "name": "storage_capacity",
          "localizedName": "Storage Capacity",
          "docCount": null,
          "values": [],
          "activeValue": null,
          "config": {
            "parameterName": "storage_capacity",
            "isMultiValued": true
          }
        },
        {
          "name": "brand",
          "localizedName": "Brand",
          "docCount": null,
          "values": [
            {
              "value": "Acer",
              "doc_count": 19
            },
            {
              "value": "TomTom",
              "doc_count": 3
            },
            {
              "value": "Asus",
              "doc_count": 2
            }
          ],
          "activeValue": null,
          "config": {
            "parameterName": "brand",
            "isMultiValued": false
          }
        },
        {
          "name": "touchscreen",
          "localizedName": "Touchscreen",
          "docCount": null,
          "values": [
            {
              "value": "yes",
              "doc_count": 1
            }
          ],
          "activeValue": null,
          "config": {
            "parameterName": "touchscreen",
            "isMultiValued": false
          }
        },
        {
          "name": "weight",
          "localizedName": "Weight",
          "docCount": null,
          "values": [
            {
              "value": "46 g",
              "doc_count": 3
            },
            {
              "value": "4.4 oz",
              "doc_count": 2
            },
            {
              "value": "18 g",
              "doc_count": 1
            },
            {
              "value": "20 g",
              "doc_count": 1
            }
          ],
          "activeValue": null,
          "config": {
            "parameterName": "weight",
            "isMultiValued": true
          }
        }
      ],
      "rangeFacets": [
        {
          "name": "price-DEFAULT-EUR-GROSS_MODE",
          "localizedName": "Price",
          "min": 1879,
          "max": 44436,
          "activeMin": 1879,
          "activeMax": 44436,
          "docCount": null,
          "config": {
            "parameterName": "price",
            "isMultiValued": false
          }
        },
        {
          "name": "rating",
          "localizedName": "Ratings",
          "min": 0,
          "max": 0,
          "activeMin": 0,
          "activeMax": 0,
          "docCount": null,
          "config": {
            "parameterName": "rating",
            "isMultiValued": false
          }
        }
      ],
      "spelling_suggestion": "cameras"
    },
    "links": {
      "self": "http://glue.de.shop-suite.local/search"
    }
  }
}
```
<br>
</details>

## Sorting Search Results
You can also define how products are sorted. By default, when you send a search request, in the response you will get information on which sorting options are available. The sorting options are contained in the **data/attributes/sort** section of a search response:

| Field* | Type | Description |
| --- | --- | --- |
| sortParamNames | String | List of possible sorting parameters such as "name_asc" or "price_desc" |
| sortParamLocalizedNames | String | Localized names of the sorting parameters available as well as the sorting parameters themselves |
| currentSortParam | String | Currently applied sorting parameter |
| currentSortOrder | String | Currently applied sorting order |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample response**
```js
{
		"data": {
			"type": "search",
			...
				"sort": {
					"sort_param_names": [
						"rating",
						"name_asc",
						"name_desc",
						"price_asc",
						"price_desc"
					],
					"current_sort_param": "1",
					"current_sort_order": null
				},
```

You can use the sort options to specify how to output search results in a search response:
| Request | Description |
| --- | --- |
| /catalog-search?sort=**rating**&q=cameras | Sort cameras by **product ratings**. |
| /catalog-search?sort=**name_asc**&q=cameras | Sort cameras by **name ascending**. |
| /catalog-search?sort=**name_desc**&q=cameras | Sort cameras by **name descending**. |
| /catalog-search?sort=**price_asc**&q=cameras | Sort cameras by **price ascending**. |
| /catalog-search?sort=**price_desc**&q=cameras | Sort cameras by **price descending**. |

{% info_block warningBox %}
Sort settings are defined by the front-end search configuration. In other words, the REST API uses sort settings of Spryker Shop Application.
{% endinfo_block %}

## Pagination
To optimize network and resource utilization, you can also paginate the search results. Pagination options can also be retrieved from a search response. They are located in **data/attributes/pagination**.

| Field* | Type | Description |
| --- | --- | --- |
| numFound | String | Number of search results |
| currentPage | String | Current page of search results |
| maxPage | String | Total number of search results pages |
| currentItemsPerPage | String | Number of search results on the current page |
| defaultItemsPerPage | String | Default number of search results on one page |
| validItemsPerPageOptions | String | Another number of search results per page options |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample response**
```js
{
		"data": {
			"type": "search",
			...
			"pagination": {
				"numFound": 632,
				"currentPage": 4,
				"maxPage": 53,
				"currentItemsPerPage": 12,
				"config": {
					"parameterName": "page",
					"itemsPerPageParameterName": "ipp",
					"defaultItemsPerPage": 12,
					"validItemsPerPageOptions": [
						12,
						24,
						36
					]
				}
			}
		},
 
		"links": {
			"self": "http://mysprykershop.com/catalog-search?q=canon&include=&page[offset]=12&page[limit]=12",
			"last": "http://mysprykershop.com/catalog-search?q=canon&include=&page[offset]=24&page[limit]=12",
			"first": "http://mysprykershop.com/catalog-search?q=canon&include=&page[offset]=0&page[limit]=12",
			"prev": "http://mysprykershop.com/catalog-search?q=canon&include=&page[offset]=0&page[limit]=12",
			"next": "http://mysprykershop.com/catalog-search?q=canon&include=&page[offset]=24&page[limit]=12"
		}
	}
```

The number of items per page is controlled by the parameter which name is specified in the **itemsPerPageParameterName** attribute (by default, ipp). The default number of items per page and available options for pagination are returned by the **defaultItemsPerPage** and **validItemsPerPageOptions** parameters respectively.

In the following table, you can find some sample requests that use pagination:

| Request | Description |
| --- | --- |
| /catalog-search?q=canon&page[offset]=0&**page[limit]=36** | Show **36** items per page. |
| /catalog-search?q=canon&**page[offset]=12**&page[limit]=12 | Use the default number of products per page and show the **2nd** page. |
| /catalog-search?q=canon&**page[offset]=48**&page[limit]=24 | Show **24** items per page and page number **3**. |

{% info_block warningBox %}
Pagination settings are defined by the front-end search configuration. In other words, the REST API uses pagination settings of Spryker Shop Application.
{% endinfo_block %}
