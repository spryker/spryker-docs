---
title: "Glue API: Search the product catalog"
description: This article provides a bunch of sample requests to be used to achieve the implementation of search options and gives explanations of request values.
last_updated: Dec 19, 2023
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/searching-the-product-catalog
originalArticleId: d8d530bf-7cb2-473f-a7cb-0db96957700e
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/searching-the-product-catalog.html
  - /docs/pbc/all/search/202311.0/manage-using-glue-api/glue-api-search-the-product-catalog.html
related:
  - title: Retrieving autocomplete and search suggestions
    link: docs/pbc/all/search/page.version/base-shop/manage-using-glue-api/glue-api-search-the-product-catalog.html
  - title: Install the Catalog Glue API
    link: docs/pbc/all/search/page.version/base-shop/install-and-upgrade/install-features-and-glue-api/install-the-catalog-glue-api.html
  - title: Catalog feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/catalog-feature-overview.html
---

The implementation of the search API offers you the same search experience as in the Spryker Demo Shops. The search engine used is Elasticsearch, and search results go beyond the simple listing of products in the results section. The list of search results is paginated according to your configuration, and spelling suggestions are offered when needed. In addition, sorting and facets are supported to narrow down the search results.

In your development, this endpoint can help you to:

* Implement catalog search functionality, including the category tree, facets, and pagination.
* Retrieve a list of products to be displayed anywhere you want.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Catalog Glue API](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/install-features-and-glue-api/install-the-catalog-glue-api.html).

## Search by products

To search by products, send the request:

***
`GET` **/catalog-search**
***

### Request

| QUERY PARAMETER    | DESCRIPTION                                                                                                                                          | POSSIBLE VALUES                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| include            | Adds resource relationships to the request                                                                                                           | abstract-products                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| q                  | Restricts the returned items to the values of the provided parameters                                                                                | <ul><li>{% raw %}{{{% endraw %}null{% raw %}}}{% endraw %} (empty)</li><li>{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}</li><li>{% raw %}{{{% endraw %}abstract_product_name{% raw %}}}{% endraw %}</li><li>{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}</li><li>{% raw %}{{{% endraw %}product_attribute{% raw %}}}{% endraw %} (for example, brand, color, etc.)—to provide multiple product attributes, use `+`</li></ul> |
| price[min]         | Restricts the returned items to products with prices matching or above the provided value. `price[min]=10` equals to 1000 cents or 10 monetary units | {% raw %}{{{% endraw %}minimum_price{% raw %}}}{% endraw %}                                                                                                                                                                                                                                                                                                                                                                                                              |
| price[max]         | Restricts the returned items to products with prices matching or below the provided value. `price[max]=10` equals to 1000 cents or 10 monetary units | {% raw %}{{{% endraw %}maximum_price{% raw %}}}{% endraw %}                                                                                                                                                                                                                                                                                                                                                                                                              |
| priceMode          | Returns the prices defined for the price mode value provided. Useful if your store is configured with multiple price modes.                          | {% raw %}{{{% endraw %}price_mode_name{% raw %}}}{% endraw %}<br>Spryker provides two price modes by default: `GROSS_MODE` and `NET_MODE`. For more information, see [Configuration of price modes and types](/docs/pbc/all/price-management/{{page.version}}/base-shop/extend-and-customize/configuration-of-price-modes-and-types.html).                                                                                                                               |
| brand              | Specifies the product brand                                                                                                                          | {% raw %}{{{% endraw %}brand_name{% raw %}}}{% endraw %}                                                                                                                                                                                                                                                                                                                                                                                                                 |
| label              | Specifies the product label                                                                                                                          | {% raw %}{{{% endraw %}label{% raw %}}}{% endraw %}                                                                                                                                                                                                                                                                                                                                                                                                                      |
| weight             | Specifies the product weight                                                                                                                         | {% raw %}{{{% endraw %}weight{% raw %}}}{% endraw %}                                                                                                                                                                                                                                                                                                                                                                                                                     |
| color              | Specifies the product color                                                                                                                          | {% raw %}{{{% endraw %}color{% raw %}}}{% endraw %}                                                                                                                                                                                                                                                                                                                                                                                                                      |
| storage_capacity[] | Specifies the storage capacity of a product                                                                                                          | {% raw %}{{{% endraw %}storage_capacity{% raw %}}}{% endraw %}                                                                                                                                                                                                                                                                                                                                                                                                           |
| rating[min]        | Specifies the minimum rating of a product                                                                                                            | {% raw %}{{{% endraw %}rating{% raw %}}}{% endraw %}                                                                                                                                                                                                                                                                                                                                                                                                                     |
| category           | Specifies the category to search the products in                                                                                                     | {% raw %}{{{% endraw %}category_node_id{% raw %}}}{% endraw %}<br>For the category node IDs, [retrieve the category tree](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-trees.html).                                                                                                                                                                                               |
| currency           | Sets a currency                                                                                                                                      | {% raw %}{{{% endraw %}currency{% raw %}}}{% endraw %}                                                                                                                                                                                                                                                                                                                                                                                                                   |
| sort               | Sorts the search results                                                                                                                             | For the list of possible values, run the catalog search request and find the list in the `sortParamNames` array.<br>For the default Spryker Demo Shop sorting parameters, see [Sorting parameters](#sorting).                                                                                                                                                                                                                                                            |
| page               | Sets the number of the search results page from which the results are retrieved                                                                      | {% raw %}{{{% endraw %}page_number{% raw %}}}{% endraw %}                                                                                                                                                                                                                                                                                                                                                                                                                |
| ipp                | Sets the number of products per page                                                                                                                 | {% raw %}{{{% endraw %}number_of_products{% raw %}}}{% endraw %}                                                                                                                                                                                                                                                                                                                                                                                                         |

| REQUEST                                                                                            | USAGE                                                                                                                                                   |
|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GET https://glue.mysprykershop.com/catalog-search`                                                | Search for all available products.                                                                                                                      |
| `GET https://glue.mysprykershop.com/catalog-search?q=`                                             | Search for all available products.                                                                                                                      |
| `GET https://glue.mysprykershop.com/catalog-search?q=058`                                          | Search for an abstract product by SKU *058*.                                                                                                            |
| `GET https://glue.mysprykershop.com/catalog-search?q=058&include=abstract-products`                | Search for an abstract product by SKU *058* with the included product details.                                                                          |
| `GET https://glue.mysprykershop.com/catalog-search?q=Acer Liquid Jade`                             | Search for an abstract product by *Acer Liquid Jade* name.                                                                                              |
| `GET https://glue.mysprykershop.com/catalog-search?q=058_261755504`                                | Search for a concrete product by SKU *058_261755504*.                                                                                                   |
| `GET https://glue.mysprykershop.com/catalog-search?q=sony+red`                                     | Search for products by multiple attributes (brand *Sony* and *red* color).                                                                              |
| `GET https://glue.mysprykershop.com/catalog-search?q=sony&price%5Bmin%5D=99.99&price%5Bmax%5D=150` | Search for products within a minimum (*99.99*) and maximum (*150*) price range.                                                                         |
| `GET https://glue.mysprykershop.com/catalog-search?q=sony`                                         | Search for products of the *Sony* brand.                                                                                                                |
| `GET https://glue.mysprykershop.com/catalog-search?priceMode=NET_MODE`                             | Specify that you want returned only prices defined in `NET_MODE`.                                                                                       |
| `GET https://glue.mysprykershop.com/catalog-search?label[]=NEW&label[]=SALE %`                     | Search for products with the *NEW* and *SALE*  labels.                                                                                                  |
| `GET https://glue.mysprykershop.com/catalog-search?weight[]=45 g`                                  | Search for products by the *45 g* weight.                                                                                                               |
| `GET https://glue.mysprykershop.com/catalog-search?color[]=Blue`                                   | Search for products by the *Blue* color.                                                                                                                |
| `GET https://glue.mysprykershop.com/catalog-search?storage_capacity[]=32 GB`                       | Search for products by the *32 GB* storage capacity.                                                                                                    |
| `GET https://glue.mysprykershop.com/catalog-search?rating[min]=4`                                  | Search for products by the rating *4*.                                                                                                                  |
| `GET https://glue.mysprykershop.com/catalog-search?category=6`                                     | Search for products by the category node ID *6*.                                                                                                        |
| `GET https://glue.mysprykershop.com/catalog-search?currency=CHF`                                   | Define the *CHF* currency for the search result products.                                                                                               |
| `GET https://glue.mysprykershop.com/catalog-search?q=Sony&sort=name_asc`                           | Set sorting order ascending.                                                                                                                            |
| `GET https://glue.mysprykershop.com/catalog-search?q=Sony&sort=name_desc`                          | Set sorting order descending.                                                                                                                           |
| `GET https://glue.mysprykershop.com/catalog-search?q=Sony&sort=rating`                             | Sort found products by rating.                                                                                                                          |
| `GET https://glue.mysprykershop.com/catalog-search?q=Sony&sort=price_asc`                          | Sort found products by price ascending.                                                                                                                 |
| `GET https://glue.mysprykershop.com/catalog-search?q=Sony&sort=popularity`                         | Sort found products by popularity. <br> Available only in the [Master Suite](/docs/about/all/master-suite.html) for now.   |
| `GET https://glue.mysprykershop.com/catalog-search?q=Sony&page=3`                                  | Set a page to retrieve the search results from.                                                                                                         |
| `GET https://glue.mysprykershop.com/catalog-search?q=Sony&ipp=24`                                  | Set number of products per page.                                                                                                                        |
| `GET https://glue.mysprykershop.com/catalog-search?merchant_name=Spryker`                          | Filter the results by Merchant name. <br> Available only with the Marketplace.** |

### Response

<details>
<summary>Response sample: empty search criteria</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 224,
                    "currentPage": 1,
                    "maxPage": 23,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "073",
                        "price": 43458,
                        "abstractName": "Samsung Galaxy Note 3",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 43458,
                                "DEFAULT": 43458
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21927455-7956.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21927455-7956.jpg"
                            }
                        ]
                    },
                   ...
                    {
                        "abstractSku": "154",
                        "price": 22240,
                        "abstractName": "Lenovo Yoga 500 14",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 22240,
                                "DEFAULT": 22240
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_lows/31980499_9888.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/31980499_9888.jpg"
                            }
                        ]
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
                                "doc_count": 224
                            },
                            {
                                "value": 5,
                                "doc_count": 72
                            },
                            {
                                "value": 18,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [
                            {
                                "value": "SALE %",
                                "doc_count": 66
                            },
                            {
                                "value": "New",
                                "doc_count": 5
                            },
                            {
                                "value": "Discontinued",
                                "doc_count": 2
                            },
                            {
                                "value": "Alternatives available",
                                "doc_count": 1
                            }
                            ...
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
                                "doc_count": 82
                            },
                            {
                                "value": "White",
                                "doc_count": 38
                            },
                            ...
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
                        "values": [
                            {
                                "value": "32 GB",
                                "doc_count": 5
                            },
                            {
                                "value": "128 GB",
                                "doc_count": 3
                            },
                            ...
                        ],
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
                                "value": "Samsung",
                                "doc_count": 46
                            },
                            {
                                "value": "Sony",
                                "doc_count": 43
                            },
                         ...
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
                                "value": "Yes",
                                "doc_count": 5
                            },
                            {
                                "value": "No",
                                "doc_count": 3
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
                                "value": "132 g",
                                "doc_count": 7
                            },
                            {
                                "value": "118 g",
                                "doc_count": 4
                            },
                           ...
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "weight",
                            "isMultiValued": true
                        }
                    },
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 111
                            },
                           ...
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 0,
                        "max": 345699,
                        "activeMin": 0,
                        "activeMax": 345699,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 5,
                        "activeMin": 4,
                        "activeMax": 5,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 72,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 24,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 20,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 28,
                                "children": []
                            }
                        ]
                    },
                    {
                        "nodeId": 2,
                        "name": "Cameras & Camcorders",
                        "docCount": 67,
                        "children": [
                            {
                                "nodeId": 4,
                                "name": "Digital Cameras",
                                "docCount": 41,
                                "children": []
                            },
                            {
                                "nodeId": 3,
                                "name": "Camcorders",
                                "docCount": 26,
                                "children": []
                            }
                        ]
                    },
                    ...
           "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q="
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?q=",
        "last": "https://glue.mysprykershop.com/catalog-search?q=&page[offset]=216&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?q=&page[offset]=0&page[limit]=12",
        "next": "https://glue.mysprykershop.com/catalog-search?q=&page[offset]=12&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: search for an abstract product</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
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
                    "numFound": 1,
                    "currentPage": 1,
                    "maxPage": 1,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "058",
                        "price": 26432,
                        "abstractName": "Acer Liquid Jade",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 26432,
                                "DEFAULT": 26432
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24245592_medium_1483521161_4318_9985.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24245592-2688.jpg"
                            }
                        ]
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
                                "doc_count": 1
                            },
                            {
                                "value": 11,
                                "doc_count": 1
                            },
                            {
                                "value": 12,
                                "doc_count": 1
                            },
                            {
                                "value": 14,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [],
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
                                "value": "White",
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
                                "doc_count": 1
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
                        "values": [],
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
                        "values": [],
                        "activeValue": null,
                        "config": {
                            "parameterName": "weight",
                            "isMultiValued": true
                        }
                    },
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 1
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 26432,
                        "max": 26432,
                        "activeMin": 26432,
                        "activeMax": 26432,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
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
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    },
                   ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q=058"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?q=058",
        "last": "https://glue.mysprykershop.com/catalog-search?q=058&page[offset]=0&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?q=058&page[offset]=0&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: search for an abstract product with the included abstract product details</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 1,
                    "currentPage": 1,
                    "maxPage": 1,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "058",
                        "price": 26432,
                        "abstractName": "Acer Liquid Jade",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 26432,
                                "DEFAULT": 26432
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24245592_medium_1483521161_4318_9985.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24245592-2688.jpg"
                            }
                        ]
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
                                "doc_count": 1
                            },
                            {
                                "value": 11,
                                "doc_count": 1
                            },
                            {
                                "value": 12,
                                "doc_count": 1
                            },
                            {
                                "value": 14,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [],
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
                                "value": "White",
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
                                "doc_count": 1
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
                        "values": [],
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
                        "values": [],
                        "activeValue": null,
                        "config": {
                            "parameterName": "weight",
                            "isMultiValued": true
                        }
                    },
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 1
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 26432,
                        "max": 26432,
                        "activeMin": 26432,
                        "activeMax": 26432,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
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
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    },
                    {
                        "nodeId": 2,
                        "name": "Cameras & Camcorders",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 4,
                                "name": "Digital Cameras",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 3,
                                "name": "Camcorders",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    },
                    {
                        "nodeId": 15,
                        "name": "Cables",
                        "docCount": 0,
                        "children": []
                    },
                    {
                        "nodeId": 11,
                        "name": "Telecom & Navigation",
                        "docCount": 1,
                        "children": [
                            {
                                "nodeId": 12,
                                "name": "Smartphones",
                                "docCount": 1,
                                "children": []
                            }
                        ]
                    },
                    {
                        "nodeId": 9,
                        "name": "Smart Wearables",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 10,
                                "name": "Smartwatches",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    },
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q=058&include=abstract-products"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "058"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?q=058&include=abstract-products",
        "last": "https://glue.mysprykershop.com/catalog-search?q=058&include=abstract-products&page[offset]=0&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?q=058&include=abstract-products&page[offset]=0&page[limit]=12"
    },
    "included": [
        {
            "type": "abstract-products",
            "id": "058",
            "attributes": {
                "sku": "058",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Acer Liquid Jade",
                "description": "Edge Handle Assign a colour and place on People Edge to five of your favourite contacts. Reach out to them at any time by simply swiping inwards from the Edge Handle. When words aren't enough, send a poke or an emoticon to your People Edge contacts. OnCircle lets you communicate in ways that really count. When it comes to your favourite tracks, sound quality matters. Enjoy rich, balanced audio with Bluetooth audio accessories that support UHQ Audio. Celebrations are always better when you are sharing. Livestream the fun straight from your Galaxy S6 edge+ using the camera's Live Broadcast function. 4GB RAM and LTE Cat.9 support ensure uninterrupted streaming. No more shaky handheld videos. Video Digital Imaging Stabilisation meets Optical Image Stabilisation to ensure you get clear and steady footage every time.",
                "attributes": {
                    "form_factor": "Bar",
                    "sim_card_type": "NanoSIM",
                    "display_type": "IPS",
                    "internal_ram": "2048 MB",
                    "brand": "Acer",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "form_factor",
                    "color"
                ],
                "superAttributes": {
                    "series": [
                        "Jade Plus",
                        "Jade Z"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "058_24245592",
                        "058_26175504"
                    ],
                    "super_attributes": {
                        "series": [
                            "Jade Plus",
                            "Jade Z"
                        ]
                    },
                    "attribute_variants": {
                        "series:Jade Plus": {
                            "id_product_concrete": "058_24245592"
                        },
                        "series:Jade Z": {
                            "id_product_concrete": "058_26175504"
                        }
                    }
                },
                "metaTitle": "Acer Liquid Jade",
                "metaKeywords": "Acer,Communication Electronics",
                "metaDescription": "Edge Handle Assign a colour and place on People Edge to five of your favourite contacts. Reach out to them at any time by simply swiping inwards from the E",
                "attributeNames": {
                    "form_factor": "Form factor",
                    "sim_card_type": "SIM card type",
                    "display_type": "Display type",
                    "internal_ram": "Internal RAM",
                    "brand": "Brand",
                    "color": "Color",
                    "series": "Series"
                },
                "url": "/en/acer-liquid-jade-58"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/058"
            }
        }
    ]
}
```
</details>


<details>
<summary>Response sample: search for a concrete product</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 1,
                    "currentPage": 1,
                    "maxPage": 1,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "058",
                        "price": 26432,
                        "abstractName": "Acer Liquid Jade",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 26432,
                                "DEFAULT": 26432
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24245592_medium_1483521161_4318_9985.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24245592-2688.jpg"
                            }
                        ]
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
                                "doc_count": 1
                            },
                            {
                                "value": 11,
                                "doc_count": 1
                            },
                            {
                                "value": 12,
                                "doc_count": 1
                            },
                            {
                                "value": 14,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [],
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
                                "value": "White",
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
                                "doc_count": 1
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
                        "values": [],
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
                        "values": [],
                        "activeValue": null,
                        "config": {
                            "parameterName": "weight",
                            "isMultiValued": true
                        }
                    },
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 1
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 26432,
                        "max": 26432,
                        "activeMin": 26432,
                        "activeMax": 26432,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
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
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    },
                    ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q=058_26175504"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?q=058_26175504",
        "last": "https://glue.mysprykershop.com/catalog-search?q=058_26175504&page[offset]=0&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?q=058_26175504&page[offset]=0&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: search for n item using multiple product attributes in search request</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 70,
                    "currentPage": 1,
                    "maxPage": 7,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "108",
                        "price": 17774,
                        "abstractName": "Sony SW2 SmartWatch",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 17774,
                                "DEFAULT": 17774
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_21047360_medium_1482828045_101_30852.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21047360-4814.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "027",
                        "price": 4900,
                        "abstractName": "Sony Cyber-shot DSC-WX500",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 4900,
                                "DEFAULT": 4900
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 5200,
                                "ORIGINAL": 5200
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/low/7822599-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/medium/7822599-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "001",
                        "price": 9999,
                        "abstractName": "Canon IXUS 160",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 9999,
                                "DEFAULT": 9999
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 12564,
                                "ORIGINAL": 12564
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/25904006-8438.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/25904006-8438.jpg"
                            }
                        ]
                    },
               ...
                    {
                        "abstractSku": "196",
                        "price": 24940,
                        "abstractName": "Sony HDR-AS20",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 24940,
                                "DEFAULT": 24940
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/23120327-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/23120327-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "197",
                        "price": 23010,
                        "abstractName": "Sony HDR-AS20",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 23010,
                                "DEFAULT": 23010
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21421718-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21421718-Sony.jpg"
                            }
                        ]
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
                                "doc_count": 70
                            },
                            {
                                "value": 2,
                                "doc_count": 32
                            },
                            {
                                "value": 4,
                                "doc_count": 20
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [
                            {
                                "value": "SALE %",
                                "doc_count": 21
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
                                "doc_count": 26
                            },
                            {
                                "value": "White",
                                "doc_count": 15
                            },
                            {
                                "value": "Red",
                                "doc_count": 8
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
                        "values": [
                            {
                                "value": "8 GB",
                                "doc_count": 1
                            }
                        ],
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
                                "value": "Sony",
                                "doc_count": 43
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
                                "value": "Yes",
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
                                "value": "45 g",
                                "doc_count": 4
                            },
                            {
                                "value": "58 g",
                                "doc_count": 2
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "weight",
                            "isMultiValued": true
                        }
                    },
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 38
                            },
                            {
                                "value": "Video King",
                                "doc_count": 35
                            },
                            {
                                "value": "Sony Experts",
                                "doc_count": 29
                            },
                            {
                                "value": "Budget Cameras",
                                "doc_count": 20
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 1250,
                        "max": 345699,
                        "activeMin": 1250,
                        "activeMax": 345699,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 4,
                        "activeMin": 4,
                        "activeMax": 4,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 19,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                    ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q=Sony Red"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?q=Sony Red",
        "last": "https://glue.mysprykershop.com/catalog-search?q=Sony Red&page[offset]=60&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?q=Sony Red&page[offset]=0&page[limit]=12",
        "next": "https://glue.mysprykershop.com/catalog-search?q=Sony Red&page[offset]=12&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: search for an item with minimum and maximum price range</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 7,
                    "currentPage": 1,
                    "maxPage": 1,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "200",
                        "price": 13865,
                        "abstractName": "Sony HXR-MC50E",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 13865,
                                "DEFAULT": 13865
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/5787536_8636.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/5787536_8636.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "077",
                        "price": 14554,
                        "abstractName": "Sony Xperia Z3 Compact",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 14554,
                                "DEFAULT": 14554
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 15000,
                                "ORIGINAL": 15000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24584210-216.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24584210-216.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "016",
                        "price": 9999,
                        "abstractName": "Sony Cyber-shot DSC-W800",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 9999,
                                "DEFAULT": 9999
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21748907-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21748907-Sony.jpg"
                            }
                        ]
                     }
                     ...
                ],
                "valueFacets": [
                    {
                        "name": "category",
                        "localizedName": "Categories",
                        "docCount": null,
                        "values": [
                            {
                                "value": 1,
                                "doc_count": 7
                            },
                           ...
                            {
                                "value": 12,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [
                            {
                                "value": "SALE %",
                                "doc_count": 2
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
                                "doc_count": 3
                            },
                            {
                                "value": "Blue",
                                "doc_count": 1
                            },
                            {
                                "value": "Purple",
                                "doc_count": 1
                            },
                            {
                                "value": "Silver",
                                "doc_count": 1
                            },
                            {
                                "value": "White",
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
                                "value": "Sony",
                                "doc_count": 7
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
                        "values": [],
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
                        "values": [],
                        "activeValue": null,
                        "config": {
                            "parameterName": "weight",
                            "isMultiValued": true
                        }
                    },
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 6
                            },
                            {
                                "value": "Sony Experts",
                                "doc_count": 5
                            },
                            {
                                "value": "Video King",
                                "doc_count": 5
                            },
                            {
                                "value": "Budget Cameras",
                                "doc_count": 4
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 3000,
                        "max": 345699,
                        "activeMin": 9999,
                        "activeMax": 15000,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
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
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    },
                    {
                        "nodeId": 2,
                        "name": "Cameras & Camcorders",
                        "docCount": 5,
                        "children": [
                            {
                                "nodeId": 4,
                                "name": "Digital Cameras",
                                "docCount": 4,
                                "children": []
                            },
                    ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&price[min]=99.99&price[max]=150"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&price[min]=99.99&price[max]=150",
        "last": "https://glue.mysprykershop.com/catalog-search?q=Sony&price[min]=99.99&price[max]=150&page[offset]=0&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?q=Sony&price[min]=99.99&price[max]=150&page[offset]=0&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: search for an item by brand</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 43,
                    "currentPage": 1,
                    "maxPage": 5,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "210",
                        "price": 100000,
                        "abstractName": "Sony Bundle",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 100000,
                                "DEFAULT": 100000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/23120327-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/23120327-Sony.jpg"
                            }
                        ]
                    },
                  ...
                    {
                        "abstractSku": "093",
                        "price": 24899,
                        "abstractName": "Sony SmartWatch 3",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 24899,
                                "DEFAULT": 24899
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24495843-7844.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24495843-7844.jpg"
                            }
                        ]
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
                                "doc_count": 43
                            },
                           ...
                            {
                                "value": 14,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [
                            {
                                "value": "SALE %",
                                "doc_count": 10
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
                                "doc_count": 14
                            },
                       ...
                            {
                                "value": "Purple",
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
                        "values": [
                            {
                                "value": "8 GB",
                                "doc_count": 1
                            }
                        ],
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
                                "value": "Samsung",
                                "doc_count": 46
                            },
                           ...
                            {
                                "value": "Toshiba",
                                "doc_count": 5
                            }
                        ],
                        "activeValue": "Sony",
                        "config": {
                            "parameterName": "brand",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "touchscreen",
                        "localizedName": "Touchscreen",
                        "docCount": null,
                        "values": [],
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
                                "value": "45 g",
                                "doc_count": 4
                            },
                            {
                                "value": "58 g",
                                "doc_count": 2
                            },
                            {
                                "value": "63.5 g",
                                "doc_count": 2
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "weight",
                            "isMultiValued": true
                        }
                    },
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 30
                            },
                        ...
                            {
                                "value": "Budget Cameras",
                                "doc_count": 14
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 3000,
                        "max": 345699,
                        "activeMin": 3000,
                        "activeMax": 345699,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 4,
                        "activeMin": 4,
                        "activeMax": 4,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 1,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                          ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "glue.mysprykershop.com/catalog-search?brand=Sony"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?brand=Sony",
        "last": "https://glue.mysprykershop.com/catalog-search?brand=Sony&page[offset]=36&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?brand=Sony&page[offset]=0&page[limit]=12",
        "next": "https://glue.mysprykershop.com/catalog-search?brand=Sony&page[offset]=12&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: search for an item by labels</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 66,
                    "currentPage": 1,
                    "maxPage": 7,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "060",
                        "price": 41837,
                        "abstractName": "Acer Liquid Jade",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 41837,
                                "DEFAULT": 41837
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/26027598-6953.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/26027598-6953.jpg"
                            }
                        ]
                    },
                   ...
                    {
                        "abstractSku": "031",
                        "price": 40024,
                        "abstractName": "Canon PowerShot G9 X",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 40024,
                                "DEFAULT": 40024
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 41000,
                                "ORIGINAL": 41000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/30021637_4678.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/30021637_4678.jpg"
                            }
                        ]
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
                                "doc_count": 66
                            },
                          ...
                            {
                                "value": 15,
                                "doc_count": 3
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [
                            {
                                "value": "SALE %",
                                "doc_count": 66
                            },
                           ...
                            {
                                "value": "Alternatives available",
                                "doc_count": 1
                            }
                        ],
                        "activeValue": [
                            "NEW",
                            "SALE %"
                        ],
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
                                "doc_count": 20
                            },
                           ...
                            {
                                "value": "Gold",
                                "doc_count": 1
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "color",
                            "isMultiValued": true
                        }
                    },
                  ...
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 33
                            },
                            {
                                "value": "Video King",
                                "doc_count": 18
                            },
                            {
                                "value": "Budget Cameras",
                                "doc_count": 12
                            },
                            {
                                "value": "Sony Experts",
                                "doc_count": 9
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 162,
                        "max": 95000,
                        "activeMin": 162,
                        "activeMax": 95000,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
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
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 20,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 4,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 8,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 8,
                                "children": []
                            }
                        ]
                    },
                   ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?label[0]=NEW&label[1]=SALE %"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?label[0]=NEW&label[1]=SALE %",
        "last": "https://glue.mysprykershop.com/catalog-search?label[0]=NEW&label[1]=SALE %&page[offset]=60&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?label[0]=NEW&label[1]=SALE %&page[offset]=0&page[limit]=12",
        "next": "https://glue.mysprykershop.com/catalog-search?label[0]=NEW&label[1]=SALE %&page[offset]=12&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: search for an item by weight</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 4,
                    "currentPage": 1,
                    "maxPage": 1,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "090",
                        "price": 20160,
                        "abstractName": "Sony SmartWatch 3",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 20160,
                                "DEFAULT": 20160
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery/26219658_3401.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_mediums/img_26219658_medium_1483953936_4642_16454.jpg"
                            }
                        ]
                    },
                  ...
                    {
                        "abstractSku": "093",
                        "price": 24899,
                        "abstractName": "Sony SmartWatch 3",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 24899,
                                "DEFAULT": 24899
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24495843-7844.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24495843-7844.jpg"
                            }
                        ]
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
                                "doc_count": 4
                            },
                            {
                                "value": 9,
                                "doc_count": 4
                            },
                            {
                                "value": 10,
                                "doc_count": 4
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [],
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
                                "value": "Silver",
                                "doc_count": 2
                            },
                            {
                                "value": "Black",
                                "doc_count": 1
                            },
                            {
                                "value": "White",
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
                                "value": "Sony",
                                "doc_count": 4
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
                        "values": [],
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
                                "value": "132 g",
                                "doc_count": 7
                            },
                            ...
                            {
                                "value": "22.39 oz",
                                "doc_count": 2
                            }
                        ],
                        "activeValue": [
                            "45 g"
                        ],
                        "config": {
                            "parameterName": "weight",
                            "isMultiValued": true
                        }
                    },
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 4
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 17459,
                        "max": 24899,
                        "activeMin": 17459,
                        "activeMax": 24899,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 4,
                        "activeMin": 4,
                        "activeMax": 4,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    },
                   ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?weight[0]=45 g"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?weight[0]=45 g",
        "last": "https://glue.mysprykershop.com/catalog-search?weight[0]=45 g&page[offset]=0&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?weight[0]=45 g&page[offset]=0&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: search for an item by color</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 10,
                    "currentPage": 1,
                    "maxPage": 1,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "068",
                        "price": 8005,
                        "abstractName": "Samsung Galaxy S5",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 8005,
                                "DEFAULT": 8005
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 9000,
                                "ORIGINAL": 9000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21927453-1632.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21927453-1632.jpg"
                            }
                        ]
                    },
                  ...
                    {
                        "abstractSku": "005",
                        "price": 7000,
                        "abstractName": "Canon IXUS 175",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 7000,
                                "DEFAULT": 7000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/30663301_9631.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/30663301_9631.jpg"
                            }
                        ]
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
                                "doc_count": 10
                            },
                           ...
                            {
                                "value": 14,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [
                            {
                                "value": "SALE %",
                                "doc_count": 2
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
                                "doc_count": 82
                            },
                            {
                                "value": "White",
                                "doc_count": 38
                            },
                            {
                                "value": "Silver",
                                "doc_count": 20
                            },
                            {
                                "value": "Blue",
                                "doc_count": 10
                            },
                         ...
                        ],
                        "activeValue": [
                            "Blue"
                        ],
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
                                "value": "Samsung",
                                "doc_count": 3
                            },
                          ...
                            {
                                "value": "TomTom",
                                "doc_count": 1
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
                                "value": "Yes",
                                "doc_count": 2
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
                                "value": "18 g",
                                "doc_count": 2
                            },
                            {
                                "value": "132 g",
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
                    },
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 9
                            },
                            {
                                "value": "Budget Cameras",
                                "doc_count": 2
                            },
                            {
                                "value": "Video King",
                                "doc_count": 2
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 6277,
                        "max": 39353,
                        "activeMin": 6277,
                        "activeMax": 39353,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 4,
                        "activeMin": 4,
                        "activeMax": 4,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 1,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 1,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    },
                  ...
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?color[0]=Blue"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?color[0]=Blue",
        "last": "https://glue.mysprykershop.com/catalog-search?color[0]=Blue&page[offset]=0&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?color[0]=Blue&page[offset]=0&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response: search for an item by storage capacity</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 5,
                    "currentPage": 1,
                    "maxPage": 1,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "051",
                        "price": 12428,
                        "abstractName": "Samsung Galaxy S6 edge",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 12428,
                                "DEFAULT": 12428
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 13000,
                                "ORIGINAL": 13000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/29567823_6321.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/29567823_6321.jpg"
                            }
                        ]
                    },
                   ...
                    {
                        "abstractSku": "053",
                        "price": 40651,
                        "abstractName": "Samsung Galaxy S6 edge",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 40651,
                                "DEFAULT": 40651
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/30614390_2538.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/30614390_2538.jpg"
                            }
                        ]
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
                                "doc_count": 5
                            },
                            {
                                "value": 11,
                                "doc_count": 5
                            },
                            {
                                "value": 14,
                                "doc_count": 5
                            },
                            {
                                "value": 12,
                                "doc_count": 4
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "category",
                            "isMultiValued": false
                        }
                    },
                   ...
                    {
                        "name": "storage_capacity",
                        "localizedName": "Storage Capacity",
                        "docCount": null,
                        "values": [
                            {
                                "value": "32 GB",
                                "doc_count": 5
                            },
                            {
                                "value": "128 GB",
                                "doc_count": 3
                            },
                            {
                                "value": "64 GB",
                                "doc_count": 3
                            },
                            {
                                "value": "16 GB",
                                "doc_count": 2
                            },
                            {
                                "value": "8 GB",
                                "doc_count": 1
                            }
                        ],
                        "activeValue": [
                            "32 GB"
                        ],
                        "config": {
                            "parameterName": "storage_capacity",
                            "isMultiValued": true
                        }
                    },
                   ...
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 4
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 9002,
                        "max": 43458,
                        "activeMin": 9002,
                        "activeMax": 43458,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
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
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    },
                   ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?storage_capacity[0]=32 GB"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?storage_capacity[0]=32 GB",
        "last": "https://glue.mysprykershop.com/catalog-search?storage_capacity[0]=32 GB&page[offset]=0&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?storage_capacity[0]=32 GB&page[offset]=0&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: search for an item by rating</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 5,
                    "currentPage": 1,
                    "maxPage": 1,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "139",
                        "price": 3454,
                        "abstractName": "Asus Transformer Book T200TA",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 3454,
                                "DEFAULT": 3454
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24699831-1991.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24699831-1991.jpg"
                            }
                        ]
                    },
...
                    {
                        "abstractSku": "093",
                        "price": 24899,
                        "abstractName": "Sony SmartWatch 3",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 24899,
                                "DEFAULT": 24899
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24495843-7844.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24495843-7844.jpg"
                            }
                        ]
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
                                "doc_count": 5
                            },
                           ...
                            {
                                "value": 10,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [],
                        "activeValue": null,
                        "config": {
                            "parameterName": "label",
                            "isMultiValued": true
                        }
                    },
                   ...
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 4
                            },
                            {
                                "value": "Budget Cameras",
                                "doc_count": 1
                            },
                            {
                                "value": "Sony Experts",
                                "doc_count": 1
                            },
                            {
                                "value": "Video King",
                                "doc_count": 1
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 3454,
                        "max": 39353,
                        "activeMin": 3454,
                        "activeMax": 39353,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 5,
                        "activeMin": 4,
                        "activeMax": 5,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 1,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 1,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    },
                   ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?rating[min]=4"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?rating[min]=4",
        "last": "https://glue.mysprykershop.com/catalog-search?rating[min]=4&page[offset]=0&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?rating[min]=4&page[offset]=0&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: search for an item by category</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 24,
                    "currentPage": 1,
                    "maxPage": 3,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "134",
                        "price": 1879,
                        "abstractName": "Acer Aspire S7",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 1879,
                                "DEFAULT": 1879
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 2000,
                                "ORIGINAL": 2000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/29759322_2351.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29759322_2351.png"
                            }
                        ]
                    },
                   ...
                    {
                        "abstractSku": "142",
                        "price": 21192,
                        "abstractName": "Asus Zenbook US303UB",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 21192,
                                "DEFAULT": 21192
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_lows/30943081_4685.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/30943081_4685.jpg"
                            }
                        ]
                    }
                ],
                "valueFacets": [
                    {
                        "name": "category",
                        "localizedName": "Categories",
                        "docCount": null,
                        "values": [
                            ...
                            {
                                "value": 6,
                                "doc_count": 24
                            },
                           ...
                            {
                                "value": 18,
                                "doc_count": 1
                            }
                        ],
                        "activeValue": "6",
                        "config": {
                            "parameterName": "category",
                            "isMultiValued": false
                        }
                    },
                   ...
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 1879,
                        "max": 44182,
                        "activeMin": 1879,
                        "activeMax": 44182,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 4,
                        "activeMin": 4,
                        "activeMax": 4,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 24,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 24,
                                "children": []
                            },
                           ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?category=6"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?category=6",
        "last": "https://glue.mysprykershop.com/catalog-search?category=6&page[offset]=12&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?category=6&page[offset]=0&page[limit]=12",
        "next": "https://glue.mysprykershop.com/catalog-search?category=6&page[offset]=12&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: set the search results currency</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
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
                    "numFound": 220,
                    "currentPage": 1,
                    "maxPage": 22,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "060",
                        "price": 48113,
                        "abstractName": "Acer Liquid Jade",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "CHF",
                                    "symbol": "CHF",
                                    "name": "Swiss Franc"
                                },
                                "grossAmount": 48113,
                                "DEFAULT": 48113
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/26027598-6953.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/26027598-6953.jpg"
                            }
                        ]
                    },
                  ...
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "CHF",
                                    "symbol": "CHF",
                                    "name": "Swiss Franc"
                                },
                                "grossAmount": 47150,
                                "ORIGINAL": 47150
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/30021637_4678.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/30021637_4678.jpg"
                            }
                        ]
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
                                "doc_count": 220
                            },
                           ...
                            {
                                "value": 17,
                                "doc_count": 1
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "category",
                            "isMultiValued": false
                        }
                    },
                   ...
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 110
                            },
                            {
                                "value": "Video King",
                                "doc_count": 66
                            },
                            {
                                "value": "Budget Cameras",
                                "doc_count": 37
                            },
                            {
                                "value": "Sony Experts",
                                "doc_count": 26
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-CHF-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 0,
                        "max": 397554,
                        "activeMin": 0,
                        "activeMax": 397554,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 5,
                        "activeMin": 4,
                        "activeMax": 5,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 72,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 24,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 20,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 28,
                                "children": []
                            }
                        ]
                    },
                    ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?currency=CHF"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?currency=CHF",
        "last": "https://glue.mysprykershop.com/catalog-search?currency=CHF&page[offset]=216&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?currency=CHF&page[offset]=0&page[limit]=12",
        "next": "https://glue.mysprykershop.com/catalog-search?currency=CHF&page[offset]=12&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: sort the results in ascending order</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": "name_asc",
                    "currentSortOrder": "asc"
                },
                "pagination": {
                    "numFound": 43,
                    "currentPage": 1,
                    "maxPage": 5,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "210",
                        "price": 100000,
                        "abstractName": "Sony Bundle",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 100000,
                                "DEFAULT": 100000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/23120327-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/23120327-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "016",
                        "price": 9999,
                        "abstractName": "Sony Cyber-shot DSC-W800",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 9999,
                                "DEFAULT": 9999
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21748907-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21748907-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "017",
                        "price": 345699,
                        "abstractName": "Sony Cyber-shot DSC-W800",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 345699,
                                "DEFAULT": 345699
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21748906-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21748906-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "020",
                        "price": 10580,
                        "abstractName": "Sony Cyber-shot DSC-W830",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 10580,
                                "DEFAULT": 10580
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 10599,
                                "ORIGINAL": 10599
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21081478-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21081478-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "019",
                        "price": 9999,
                        "abstractName": "Sony Cyber-shot DSC-W830",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 9999,
                                "DEFAULT": 9999
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21081473-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21081473-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "021",
                        "price": 10680,
                        "abstractName": "Sony Cyber-shot DSC-W830",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 10680,
                                "DEFAULT": 10680
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21081475-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21081475-Sony.jpg"
                            }
                        ]
                    },
                    ...
                    {
                        "abstractSku": "024",
                        "price": 44500,
                        "abstractName": "Sony Cyber-shot DSC-WX350",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 44500,
                                "DEFAULT": 44500
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 45500,
                                "ORIGINAL": 45500
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21987578-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21987578-Sony.jpg"
                            }
                        ]
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
                                "doc_count": 43
                            },
                           ...
                            {
                                "value": 14,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [
                            {
                                "value": "SALE %",
                                "doc_count": 10
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
                                "doc_count": 14
                            },
                           ...
                            {
                                "value": "Purple",
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
                        "values": [
                            {
                                "value": "8 GB",
                                "doc_count": 1
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "storage_capacity",
                            "isMultiValued": true
                        }
                    },
                    ...
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 29
                            },
                            {
                                "value": "Sony Experts",
                                "doc_count": 26
                            },
                            {
                                "value": "Video King",
                                "doc_count": 26
                            },
                            {
                                "value": "Budget Cameras",
                                "doc_count": 14
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 3000,
                        "max": 345699,
                        "activeMin": 3000,
                        "activeMax": 345699,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 4,
                        "activeMin": 4,
                        "activeMax": 4,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 1,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 1,
                                "children": []
                            }
                        ]
                    },
                    ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=name_asc"
            }
        }
    ],
    "links": {
        "self": "glue.mysprykershop.com/catalog-search?q=Sony&sort=name_asc",
        "last": "glue.mysprykershop.comc/atalog-search?q=Sony&sort=name_asc&page[offset]=36&page[limit]=12",
        "first": "glue.mysprykershop.com/catalog-search?q=Sony&sort=name_asc&page[offset]=0&page[limit]=12",
        "next": "glue.mysprykershop.comc/atalog-search?q=Sony&sort=name_asc&page[offset]=12&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: sort the results in descending order</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": "name_desc",
                    "currentSortOrder": "desc"
                },
                "pagination": {
                    "numFound": 43,
                    "currentPage": 1,
                    "maxPage": 5,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "077",
                        "price": 14554,
                        "abstractName": "Sony Xperia Z3 Compact",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 14554,
                                "DEFAULT": 14554
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 15000,
                                "ORIGINAL": 15000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24584210-216.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24584210-216.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "076",
                        "price": 35711,
                        "abstractName": "Sony Xperia Z3 Compact",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 35711,
                                "DEFAULT": 35711
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24394207-3552.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24394207-3552.jpg"
                            }
                        ]
                    },
                   ...
                    {
                        "abstractSku": "080",
                        "price": 25214,
                        "abstractName": "Sony Xperia Z3",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 25214,
                                "DEFAULT": 25214
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 26000,
                                "ORIGINAL": 26000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24394206-8583.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24394206-8583.jpg"
                            }
                        ]
                    },
                   ...
                    {
                        "abstractSku": "090",
                        "price": 20160,
                        "abstractName": "Sony SmartWatch 3",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 20160,
                                "DEFAULT": 20160
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery/26219658_3401.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_mediums/img_26219658_medium_1483953936_4642_16454.jpg"
                            }
                        ]
                    },
                    ...
                ],
                "valueFacets": [
                    {
                        "name": "category",
                        "localizedName": "Categories",
                        "docCount": null,
                        "values": [
                            {
                                "value": 1,
                                "doc_count": 43
                            },
                            ююю
                            {
                                "value": 14,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [
                            {
                                "value": "SALE %",
                                "doc_count": 10
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "label",
                            "isMultiValued": true
                        }
                    },
                   ...
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 29
                            },
                            {
                                "value": "Sony Experts",
                                "doc_count": 26
                            },
                            {
                                "value": "Video King",
                                "doc_count": 26
                            },
                            {
                                "value": "Budget Cameras",
                                "doc_count": 14
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 3000,
                        "max": 345699,
                        "activeMin": 3000,
                        "activeMax": 345699,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 4,
                        "activeMin": 4,
                        "activeMax": 4,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 1,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 1,
                                "children": []
                            }
                        ]
                    },
                  ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=name_desc"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=name_desc",
        "last": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=name_desc&page[offset]=36&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=name_desc&page[offset]=0&page[limit]=12",
        "next": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=name_desc&page[offset]=12&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: sort the search results by rating</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": "rating",
                    "currentSortOrder": "desc"
                },
                "pagination": {
                    "numFound": 43,
                    "currentPage": 1,
                    "maxPage": 5,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "093",
                        "price": 24899,
                        "abstractName": "Sony SmartWatch 3",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 24899,
                                "DEFAULT": 24899
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24495843-7844.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24495843-7844.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "078",
                        "price": 25584,
                        "abstractName": "Sony Xperia Z3 Compact",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 25584,
                                "DEFAULT": 25584
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24602396-8292.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24602396-8292.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "020",
                        "price": 10580,
                        "abstractName": "Sony Cyber-shot DSC-W830",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 10580,
                                "DEFAULT": 10580
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 10599,
                                "ORIGINAL": 10599
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21081478-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21081478-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "024",
                        "price": 44500,
                        "abstractName": "Sony Cyber-shot DSC-WX350",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 44500,
                                "DEFAULT": 44500
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 45500,
                                "ORIGINAL": 45500
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21987578-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21987578-Sony.jpg"
                            }
                        ]
                    },
                ...
                "valueFacets": [
                    {
                        "name": "category",
                        "localizedName": "Categories",
                        "docCount": null,
                        "values": [
                            {
                                "value": 1,
                                "doc_count": 43
                            },
                          ...
                            {
                                "value": 14,
                                "doc_count": 1
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "category",
                            "isMultiValued": false
                        }
                    },
                 ...
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 29
                            },
                            {
                                "value": "Sony Experts",
                                "doc_count": 26
                            },
                            {
                                "value": "Video King",
                                "doc_count": 26
                            },
                            {
                                "value": "Budget Cameras",
                                "doc_count": 14
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 3000,
                        "max": 345699,
                        "activeMin": 3000,
                        "activeMax": 345699,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 4,
                        "activeMin": 4,
                        "activeMax": 4,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 1,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 1,
                                "children": []
                            }
                        ]
                    },
                  ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=rating"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=rating",
        "last": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=rating&page[offset]=36&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=rating&page[offset]=0&page[limit]=12",
        "next": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=rating&page[offset]=12&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: sort search results by price ascending</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": "price_asc",
                    "currentSortOrder": "asc"
                },
                "pagination": {
                    "numFound": 43,
                    "currentPage": 1,
                    "maxPage": 5,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "028",
                        "price": 3000,
                        "abstractName": "Sony Cyber-shot DSC-WX500",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 3000,
                                "DEFAULT": 3000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/low/7822598-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/medium/7822598-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "202",
                        "price": 3918,
                        "abstractName": "Sony NEX-VG20EH",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 3918,
                                "DEFAULT": 3918
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 5000,
                                "ORIGINAL": 5000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/5782479-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/5782479-Sony.jpg"
                            }
                        ]
                    },
             ...
                    {
                        "abstractSku": "020",
                        "price": 10580,
                        "abstractName": "Sony Cyber-shot DSC-W830",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 10580,
                                "DEFAULT": 10580
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 10599,
                                "ORIGINAL": 10599
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21081478-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21081478-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "021",
                        "price": 10680,
                        "abstractName": "Sony Cyber-shot DSC-W830",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 10680,
                                "DEFAULT": 10680
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21081475-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21081475-Sony.jpg"
                            }
                        ]
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
                                "doc_count": 43
                            },
                           ...
                            {
                                "value": 14,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [
                            {
                                "value": "SALE %",
                                "doc_count": 10
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "label",
                            "isMultiValued": true
                        }
                    },
               ...
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 29
                            },
                            {
                                "value": "Sony Experts",
                                "doc_count": 26
                            },
                            {
                                "value": "Video King",
                                "doc_count": 26
                            },
                            {
                                "value": "Budget Cameras",
                                "doc_count": 14
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 3000,
                        "max": 345699,
                        "activeMin": 3000,
                        "activeMax": 345699,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 4,
                        "activeMin": 4,
                        "activeMax": 4,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 1,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 1,
                                "children": []
                            }
                        ]
                    },
                   ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=price_asc"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=price_asc",
        "last": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=price_asc&page[offset]=36&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=price_asc&page[offset]=0&page[limit]=12",
        "next": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=price_asc&page[offset]=12&page[limit]=12"
    }
}
```
</details>

<details><summary>Response sample: sort the search results by popularity (This is valid for Master Suite only and has not been integrated into B2B/B2C Suites yet.)</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": "popularity",
                    "currentSortOrder": "desc"
                },
                "pagination": {
                    "numFound": 43,
                    "currentPage": 3,
                    "maxPage": 4,
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
                "abstractProducts": [
                    {
                        "abstractSku": "195",
                        "price": 39467,
                        "abstractName": "Sony FDR-AXP33",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "\u20ac",
                                    "name": "Euro"
                                },
                                "grossAmount": 39467,
                                "DEFAULT": 39467
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/25904159_6059.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/25904159_6059.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "196",
                        "price": 24940,
                        "abstractName": "Sony HDR-AS20",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "\u20ac",
                                    "name": "Euro"
                                },
                                "grossAmount": 24940,
                                "DEFAULT": 24940
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/23120327-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/23120327-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "197",
                        "price": 23010,
                        "abstractName": "Sony HDR-AS20",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "\u20ac",
                                    "name": "Euro"
                                },
                                "grossAmount": 23010,
                                "DEFAULT": 23010
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21421718-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21421718-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "abstractSku": "199",
                        "price": 32909,
                        "abstractName": "Sony HXR-MC2500",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "\u20ac",
                                    "name": "Euro"
                                },
                                "grossAmount": 32909,
                                "DEFAULT": 32909
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24788780-2045.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24788780-2045.jpg"
                            }
                        ]
                    },
                    ...
                ],
                "valueFacets": [
                    {
                        "name": "category",
                        "localizedName": "Categories",
                        "docCount": null,
                        "values": [
                            {
                                "value": 1,
                                "doc_count": 43
                            },
                            ...
                            {
                                "value": 14,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [
                            {
                                "value": "SALE %",
                                "doc_count": 10
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "label",
                            "isMultiValued": true
                        }
                    },
                    ...
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 3000,
                        "max": 345699,
                        "activeMin": 3000,
                        "activeMax": 345699,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 4,
                        "activeMin": 4,
                        "activeMax": 4,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 1,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc\u0027s/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 1,
                                "children": []
                            }
                        ]
                    },
                    ...
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=popularity&page=3"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=popularity&page=3",
        "last": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=popularity&page[offset]=36&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=popularity&page[offset]=0&page[limit]=12",
        "next": "https://glue.mysprykershop.com/catalog-search?q=Sony&sort=popularity&page[offset]=12&page[limit]=12"
    }
}
```
</details>

<details>
<summary>Response sample: set a page of search for results</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 43,
                    "currentPage": 3,
                    "maxPage": 5,
                    "currentItemsPerPage": 10,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "029",
                        "price": 41024,
                        "abstractName": "Sony Cyber-shot DSC-WX500",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 41024,
                                "DEFAULT": 41024
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 42000,
                                "ORIGINAL": 42000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/low/7822600-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/medium/7822600-Sony.jpg"
                            }
                        ]
                    },
                 ...
                    {
                        "abstractSku": "111",
                        "price": 19568,
                        "abstractName": "Sony SmartWatch",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 19568,
                                "DEFAULT": 19568
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_12295890_medium_1481715683_8105_13110.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/15743_12295890-6463.jpg"
                            }
                        ]
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
                                "doc_count": 43
                            },
                           ...
                            {
                                "value": 14,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [
                            {
                                "value": "SALE %",
                                "doc_count": 10
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "label",
                            "isMultiValued": true
                        }
                    },
                    ...
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 29
                            },
                            {
                                "value": "Sony Experts",
                                "doc_count": 26
                            },
                            {
                                "value": "Video King",
                                "doc_count": 26
                            },
                            {
                                "value": "Budget Cameras",
                                "doc_count": 14
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 3000,
                        "max": 345699,
                        "activeMin": 3000,
                        "activeMax": 345699,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 4,
                        "activeMin": 4,
                        "activeMax": 4,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 1,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 1,
                                "children": []
                            }
                        ]
                    },
                    ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&page=3"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&page=3",
        "last": "https://glue.mysprykershop.com/catalog-search?q=Sony&page[offset]=36&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?q=Sony&page[offset]=0&page[limit]=12",
        "next": "https://glue.mysprykershop.com/catalog-search?q=Sony&page[offset]=12&page[limit]=12"
    }
}
```
</details>


<details>
<summary>Response sample: set a number of products per page in results</summary>

```json
{
    "data": [
        {
            "type": "catalog-search",
            "id": null,
            "attributes": {
                "spellingSuggestion": null,
                "sort": {
                    "sortParamNames": [
                        "rating",
                        "name_asc",
                        "name_desc",
                        "price_asc",
                        "price_desc",
                        "popularity"
                    ],
                    "sortParamLocalizedNames": {
                        "rating": "Sort by product ratings",
                        "name_asc": "Sort by name ascending",
                        "name_desc": "Sort by name descending",
                        "price_asc": "Sort by price ascending",
                        "price_desc": "Sort by price descending",
                        "popularity": "Sort by popularity"
                    },
                    "currentSortParam": null,
                    "currentSortOrder": null
                },
                "pagination": {
                    "numFound": 43,
                    "currentPage": 1,
                    "maxPage": 2,
                    "currentItemsPerPage": 24,
                    "config": {
                        "parameterName": "page",
                        "itemsPerPageParameterName": "ipp",
                        "defaultItemsPerPage": 10,
                        "validItemsPerPageOptions": [
                            12,
                            24,
                            36
                        ]
                    }
                },
                "abstractProducts": [
                    {
                        "abstractSku": "202",
                        "price": 3918,
                        "abstractName": "Sony NEX-VG20EH",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 3918,
                                "DEFAULT": 3918
                            },
                            {
                                "priceTypeName": "ORIGINAL",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 5000,
                                "ORIGINAL": 5000
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/5782479-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/5782479-Sony.jpg"
                            }
                        ]
                    },
                   ...
                    {
                        "abstractSku": "023",
                        "price": 26723,
                        "abstractName": "Sony Cyber-shot DSC-WX220",
                        "prices": [
                            {
                                "priceTypeName": "DEFAULT",
                                "currency": {
                                    "code": "EUR",
                                    "symbol": "€",
                                    "name": "Euro"
                                },
                                "grossAmount": 26723,
                                "DEFAULT": 26723
                            }
                        ],
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21758366-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21758366-Sony.jpg"
                            }
                        ]
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
                                "doc_count": 43
                            },
                           ...
                            {
                                "value": 14,
                                "doc_count": 1
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
                        "localizedName": "Product Labels",
                        "docCount": null,
                        "values": [
                            {
                                "value": "SALE %",
                                "doc_count": 10
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
                                "doc_count": 14
                            },
                            {
                                "value": "White",
                                "doc_count": 11
                            },
                            {
                                "value": "Silver",
                                "doc_count": 5
                            },
                            {
                                "value": "Grey",
                                "doc_count": 2
                            },
                            {
                                "value": "Pink",
                                "doc_count": 2
                            },
                            {
                                "value": "Red",
                                "doc_count": 2
                            },
                            {
                                "value": "Blue",
                                "doc_count": 1
                            },
                            {
                                "value": "Gold",
                                "doc_count": 1
                            },
                            {
                                "value": "Purple",
                                "doc_count": 1
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "color",
                            "isMultiValued": true
                        }
                    },
                   ...
                    {
                        "name": "merchant_name",
                        "localizedName": "Merchant",
                        "docCount": null,
                        "values": [
                            {
                                "value": "Spryker",
                                "doc_count": 29
                            },
                            {
                                "value": "Sony Experts",
                                "doc_count": 26
                            },
                            {
                                "value": "Video King",
                                "doc_count": 26
                            },
                            {
                                "value": "Budget Cameras",
                                "doc_count": 14
                            }
                        ],
                        "activeValue": null,
                        "config": {
                            "parameterName": "merchant_name",
                            "isMultiValued": true
                        }
                    }
                ],
                "rangeFacets": [
                    {
                        "name": "price-DEFAULT-EUR-GROSS_MODE",
                        "localizedName": "Price range",
                        "min": 3000,
                        "max": 345699,
                        "activeMin": 3000,
                        "activeMax": 345699,
                        "docCount": null,
                        "config": {
                            "parameterName": "price",
                            "isMultiValued": false
                        }
                    },
                    {
                        "name": "rating",
                        "localizedName": "Product Ratings",
                        "min": 4,
                        "max": 4,
                        "activeMin": 4,
                        "activeMax": 4,
                        "docCount": null,
                        "config": {
                            "parameterName": "rating",
                            "isMultiValued": false
                        }
                    }
                ],
                "categoryTreeFilter": [
                    {
                        "nodeId": 5,
                        "name": "Computer",
                        "docCount": 1,
                        "children": [
                            {
                                "nodeId": 6,
                                "name": "Notebooks",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "name": "Pc's/Workstations",
                                "docCount": 0,
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "name": "Tablets",
                                "docCount": 1,
                                "children": []
                            }
                        ]
                    },
                  ...
                    {
                        "nodeId": 16,
                        "name": "Fish",
                        "docCount": 0,
                        "children": [
                            {
                                "nodeId": 18,
                                "name": "Vegetables",
                                "docCount": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&ipp=24"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search?q=Sony&ipp=24",
        "last": "https://glue.mysprykershop.com/catalog-search?q=Sony&ipp=24&page[offset]=36&page[limit]=12",
        "first": "https://glue.mysprykershop.com/catalog-search?q=Sony&ipp=24&page[offset]=0&page[limit]=12",
        "next": "https://glue.mysprykershop.com/catalog-search?q=Sony&ipp=24&page[offset]=12&page[limit]=12"
    }
}
```
</details>


<a name="sorting"></a>

**Sorting parameters**

| ATTRIBUTE               | TYPE   | DESCRIPTION                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|-------------------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sortParamNames          | Array  | List of the possible sorting parameters. The default Spryker Demo Shop parameters:<ul><li>`rating`—sorting by product rating</li><li>`name_asc`—sorting by name, ascending</li><li>`name_desc`—sorting by name, descending</li><li>`price_asc`—sorting by price, ascending</li><li>`price_desc`—sorting by price, descending</li><li>`popularity`—sorting by popularity (**This is valid for Master Suite only and has not been integrated into B2B/B2C Suites yet.**)</li></ul> |
| sortParamLocalizedNames | Object | Localized names of the sorting parameters.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| currentSortParam        | String | The currently applied sorting parameter.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| currentSortOrder        | String | The current sorting order.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

**Pagination**

| ATTRIBUTE                 | TYPE    | DESCRIPTION                                          |
|---------------------------|---------|------------------------------------------------------|
| numFound                  | Integer | Number of the search results found.                  |
| currentPage               | Integer | The current search results page.                     |
| maxPage                   | Integer | Total number of the search results pages.            |
| currentItemsPerPage       | Integer | Current number of the search results per page.       |
| parameterName             | String  | Parameter name for setting the page number.          |
| itemsPerPageParameterName | String  | Parameter name for setting number of items per page. |
| defaultItemsPerPage       | Integer | Default number of items per one search results page. |
| validItemsPerPageOptions  | Array   | Options for numbers per search results page.         |



{% include pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-products-response-attributes.md -->

For other abstract product attributes, see [Retrieving abstract product prices](/docs/pbc/all/price-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-prices.html)

**Value facets**

| ATTRIBUTE     | TYPE    | DESCRIPTION                                                     |
|---------------|---------|-----------------------------------------------------------------|
| name          | String  | Name of the value facet.                                        |
| localizedName | String  | Localized name of the value facet.                              |
| values        | Array   | Values of the facet for the found items.                        |
| activeValue   | Integer | Value of the facet specified in the current search request.     |
| parameterName | String  | Parameter name.                                                 |
| isMultiValued | Boolean | Indicates whether several values of the facet can be specified. |

**Range facets**

| ATTRIBUTE     | TYPE    | DESCRIPTION                                                         |
|---------------|---------|---------------------------------------------------------------------|
| name          | String  | Name of the range facet.                                            |
| localizedName | String  | Localized name of the range facet.                                  |
| min           | Integer | Minimum value of the range for the found items.                     |
| max           | Integer | Maximum value of the range for the found items.                     |
| activeMin     | Integer | Minimum value of the range specified in the current search request. |
| activeMax     | Integer | Maximum value of the range specified in the current search request. |
| parameterName | String  | Parameter name.                                                     |
| isMultiValued | Boolean | Indicates whether several values of the facet can be specified.     |

**Category tree filter**

| ATTRIBUTE   | TYPE    | DESCRIPTION                                                |
|-------------|---------|------------------------------------------------------------|
| nodeId      | Integer | Category node ID.                                          |
| name        | String  | Category name.                                             |
| docCount    | Integer | Number of the found items in the category.                 |
| children    | Array   | Array of node elements nested within the current category. |

## Possible errors

| CODE   | REASON                                                                                                                                                                             |
|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 313    | Currency is invalid.                                                                                                                                                               |
| 314    | Price mode is invalid.                                                                                                                                                             |
| 503    | Invalid type (non-integer) of one of the request parameters:<ul><li>rating</li><li>rating.min</li><li>rating.max</li><li>page.limit</li><li>page.offset</li><li>category</li></ul> |

For generic Glue Application errors that can also occur, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
