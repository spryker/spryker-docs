---
title: Catalog search and filtering
description: Learn how to use the catalog search API with various filtering options including multiple labels, price ranges, brands, colors, and ratings.
last_updated: September 25, 2025
template: default
---

The Storefront API provides powerful catalog search capabilities through the `/catalog-search` endpoint. This endpoint supports various filtering options, faceted search, and advanced query parameters to help users find products efficiently.

## Basic Search

The basic search endpoint accepts a query parameter and returns matching products with faceted navigation data.

Request:

```http
GET /catalog-search?q=Sony
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

Response structure includes:
- `abstractProducts`: Array of matching products
- `valueFacets`: Categorical filters (brand, color, labels, etc.)
- `rangeFacets`: Numeric range filters (price, rating)
- `categoryTreeFilter`: Category-based navigation
- `pagination`: Pagination information
- `sort`: Available sorting options

## Filtering Options

### Multiple Labels Filtering

Product labels can be filtered using the `label` parameter. Labels support multi-value filtering, allowing you to filter by multiple labels simultaneously.

Single Label:

```http
GET /catalog-search?q=&label=Standard%20Label
```

Multiple Labels:

```http
GET /catalog-search?q=&label[]=Standard%20Label&label[]=SALE%20%
```

Key characteristics:
- Parameter name: `label`
- Multi-valued: `true` (supports multiple values)
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

### Brand Filtering

Brand filtering supports both single and multiple brand selection.

Single Brand:

```http
GET /catalog-search?q=&brand=Sony
```

Multiple Brands:

```http
GET /catalog-search?q=&brand[]=Sony&brand[]=Canon
```

Key characteristics:
- Parameter name: `brand`
- Multi-valued: `false` for single brand, use array notation for multiple
- Case-sensitive values

### Color Filtering

Color filtering allows selection of multiple colors simultaneously.

Single Color:

```http
GET /catalog-search?q=&color=Black
```

Multiple Colors:

```http
GET /catalog-search?q=&color[]=Black&color[]=White&color[]=Red
```

Key characteristics:
- Parameter name: `color`
- Multi-valued: `true`
- Case-sensitive values

### Price Filtering

Price filtering uses decimal values representing the actual currency amounts (EUR, USD, etc.), not cents.

Important: Price filter values are in decimal currency format, while product prices in responses are shown in cents.

Price Range:

```http
GET /catalog-search?q=Sony&price[min]=99.99&price[max]=150
```

Key characteristics:
- Parameter name: `price`
- Supports `min` and `max` values
- Values are in decimal currency format (for example, 99.99 = €99.99)
- Products with prices between 9999 cents (€99.99) and 15000 cents (€150.00) will be returned
- Multi-valued: `false`

Price Conversion Examples:
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

### Rating Filtering

Rating filtering supports minimum and maximum rating values.

Rating Range:

```http
GET /catalog-search?q=&rating[min]=3&rating[max]=5
```

Exact Rating:

```http
GET /catalog-search?q=&rating[min]=3&rating[max]=3
```

Key characteristics:
- Parameter name: `rating`
- Supports `min` and `max` values
- Integer values (1-5 typically)
- Multi-valued: `false`

## Facet Types

### Value Facets

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
- `category`: Product categories
- `label`: Product labels
- `color`: Product colors
- `brand`: Product brands
- `merchant_name`: Merchant names
- `storage_capacity`: Storage capacity options
- `weight`: Weight values

### Range Facets

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

## Combining Filters

Multiple filters can be combined in a single request:

```http
GET /catalog-search?q=Sony&brand=Sony&color[]=Black&color[]=White&price[min]=50&price[max]=200&label[]=SALE%20%
```

This request searches for:
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

Parameters:
- `page[offset]`: Starting position (default: 0)
- `page[limit]`: Number of items per page (default: 12)

Valid items per page options: `[12, 24, 36]`

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

## Response Structure

Complete response structure:

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