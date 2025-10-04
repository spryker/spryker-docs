---
title: Catalog search and filtering
description: Learn how to use the catalog search API with various filtering options including multiple labels, price ranges, brands, colors, and ratings.
last_updated: September 25, 2025
template: default
---

The Storefront API provides powerful catalog search capabilities through the `/catalog-search` endpoint. This endpoint supports various filtering options, faceted search, and advanced query parameters to help users find products efficiently.

## Basic search

The basic search endpoint accepts a query parameter and returns matching products with faceted navigation data.

Request:

```http
GET /catalog-search?q=Sony
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

Response structure includes:
- `abstractProducts`: Array of matching products
- `valueFacets`: Categorical filters, such as brand, color, or labels
- `rangeFacets`: Numeric range filters: price, rating
- `categoryTreeFilter`: Category-based navigation
- `pagination`: Pagination information
- `sort`: Available sorting options

## Filtering options


### Multiple labels filtering

Product labels can be filtered using the `label` parameter. Labels support multi-value filtering, enabling you to filter by multiple labels simultaneously.

Single label:

```http
GET /catalog-search?q=&label=Standard%20Label
```

Multiple labels:

```http
GET /catalog-search?q=&label[]=Standard%20Label&label[]=SALE%20%
```

Key characteristics:
- Parameter name: `label`
- Multi-valued: `true`
- Values are case-sensitive
- URL encoding required for special characters

Response includes active labels in the `valueFacets` section:

```json
{
  "name": "label",
  "localizedName": "Product Labels",
  "values": [
    {
      "value": "Standard Label",
      "doc_count": 11
    },
    {
      "value": "SALE %",
      "doc_count": 10
    }
  ],
  "activeValue": ["Standard Label", "SALE %"],
  "config": {
    "parameterName": "label",
    "isMultiValued": true
  }
}
```

### Brand filtering

Brand filtering supports both single and multiple brand selection.

Single brand:

```http
GET /catalog-search?q=&brand=Sony
```

Multiple brands:

```http
GET /catalog-search?q=&brand[]=Sony&brand[]=Canon
```

Key characteristics:
- Parameter name: `brand`
- Multi-valued: `false` for single brand, use array notation for multiple
- Case-sensitive values

### Color filtering

Color filtering allows selection of multiple colors simultaneously.

Single color:

```http
GET /catalog-search?q=&color=Black
```

Multiple colors:

```http
GET /catalog-search?q=&color[]=Black&color[]=White&color[]=Red
```

Key characteristics:
- Parameter name: `color`
- Multi-valued: `true`
- Case-sensitive values

### Price filtering

Price filtering uses decimal values representing the actual currency amounts, such as EUR, USD, not cents.


{% info_block infobox %}

If the process finishes early, and events are not processed during runtime, they're handled automatically by the command in Jenkins:

Price filter values are in decimal currency format, while product prices in responses are in cents.

{% endinfo_block %}


Price range:

```http
GET /catalog-search?q=Sony&price[min]=99.99&price[max]=150
```

Key characteristics:
- Parameter name: `price`
- Supports `min` and `max` values
- Values are in decimal currency format–for example, 99.99 = €99.99
- Products with prices between 9999 cents (€99.99) and 15000 cents (€150.00) will be returned
- Multi-valued: `false`

Price conversion examples:
- Filter: `price[min]=1&price[max]=9.99`
- Matches products: 100 cents to 999 cents
- Filter: `price[min]=99.99&price[max]=150`
- Matches products: 9999 cents to 15000 cents

Response includes price range information:

```json
{
  "name": "price-DEFAULT-EUR-GROSS_MODE",
  "localizedName": "Price range",
  "min": 3000,
  "max": 345699,
  "activeMin": 9999,
  "activeMax": 15000,
  "config": {
    "parameterName": "price",
    "isMultiValued": false
  }
}
```

### Rating filtering

Rating filtering supports minimum and maximum rating values.

Rating range:

```http
GET /catalog-search?q=&rating[min]=3&rating[max]=5
```

Exact rating:

```http
GET /catalog-search?q=&rating[min]=3&rating[max]=3
```

Key characteristics:
- Parameter name: `rating`
- Supports `min` and `max` values
- Integer values, 1-5 typically
- Multi-valued: `false`

## Facet types

Facets are aggregated data that provide filtering options and statistics about search results. They enable users to refine their search by showing available filter values and the number of products matching each filter.

The two main types of facets are described in the following sections.

### Value facets

Value facets represent categorical filters with discrete values:

```json
{
  "name": "brand",
  "localizedName": "Brand",
  "docCount": null,
  "values": [
    {
      "value": "Sony",
      "doc_count": 42
    },
    {
      "value": "Canon",
      "doc_count": 15
    }
  ],
  "activeValue": null,
  "config": {
    "parameterName": "brand",
    "isMultiValued": false
  }
}
```

Common value facets:
- `category`: Product category IDs
- `label`: Product labels
- `color`: Product colors
- `brand`: Product brands
- `merchant_name`: Merchant names
- `storage_capacity`: Storage capacity options
- `weight`: Weight values

{% info_block infobox %}

Category filtering is different from other filters because it uses category IDs rather than human-readable names. Other filters, like brand, color, and label, use their respective names as filter values.

{% endinfo_block %}



### Range facets

Range facets represent numeric filters with minimum and maximum values:

```json
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
}
```

Common range facets:
- `price`: Price ranges (in cents in response, decimal in filter)
- `rating`: Product ratings

## Combining filters

Multiple filters can be combined in a single request:

```http
GET /catalog-search?q=Sony&brand=Sony&color[]=Black&color[]=White&price[min]=50&price[max]=200&label[]=SALE%20%
```

This request searches for the following:
- Products matching "Sony" in search
- Brand: Sony
- Colors: Black OR White
- Price range: €50 to €200
- Labels: SALE %

## Pagination

Search results support pagination:

```http
GET /catalog-search?q=Sony&page[offset]=12&page[limit]=24
```

| Parameter     | Description                          | Default value |
|---------------|--------------------------------------|---------|
| `page[offset]` | Starting position                   | 0       |
| `page[limit]`  | Number of items per page            | 12      |


Valid items per page options can be found in the response under `pagination.config.validItemsPerPageOptions`. These values may vary depending on your configuration. Example: `[12, 24, 36]`

## Sorting

Search results can be sorted using various criteria:

```http
GET /catalog-search?q=Sony&sort=price_asc
```

Available sort options:
- `rating`: Sort by product ratings
- `name_asc`: Sort by name ascending
- `name_desc`: Sort by name descending
- `price_asc`: Sort by price ascending
- `price_desc`: Sort by price descending
- `popularity`: Sort by popularity

## Response structure

<details>
  <summary>Complete response structure</summary>

```json
{
  "data": [
    {
      "type": "catalog-search",
      "id": null,
      "attributes": {
        "spellingSuggestion": null,
        "sort": {
          "sortParamNames": ["rating", "name_asc", "name_desc", "price_asc", "price_desc", "popularity"],
          "sortParamLocalizedNames": {
            "rating": "Sort by product ratings",
            "name_asc": "Sort by name ascending"
          },
          "currentSortParam": null,
          "currentSortOrder": null
        },
        "pagination": {
          "numFound": 42,
          "currentPage": 1,
          "maxPage": 4,
          "currentItemsPerPage": 12,
          "config": {
            "parameterName": "page",
            "itemsPerPageParameterName": "ipp",
            "defaultItemsPerPage": 12,
            "validItemsPerPageOptions": [12, 24, 36]
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
              }
            ],
            "images": [
              {
                "externalUrlSmall": "https://example.com/small.jpg",
                "externalUrlLarge": "https://example.com/large.jpg",
                "altTextLarge": "",
                "altTextSmall": ""
              }
            ]
          }
        ],
        "valueFacets": [],
        "rangeFacets": [],
        "categoryTreeFilter": []
      },
      "links": {
        "self": "http://glue.example.com/catalog-search?q=Sony"
      }
    }
  ],
  "links": {
    "self": "http://glue.example.com/catalog-search?q=Sony",
    "first": "http://glue.example.com/catalog-search?q=Sony&page[offset]=0&page[limit]=12",
    "last": "http://glue.example.com/catalog-search?q=Sony&page[offset]=36&page[limit]=12",
    "next": "http://glue.example.com/catalog-search?q=Sony&page[offset]=12&page[limit]=12"
  }
}
```

</details>