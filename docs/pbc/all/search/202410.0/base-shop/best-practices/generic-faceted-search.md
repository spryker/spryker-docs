---
title: Generic faceted search
description: Faceted search (sometimes also called faceted navigation) allows users to navigate through a web site by applying filters for categories, attributes, and price ranges.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/generic-faceted-search
originalArticleId: d83f0692-7e96-413a-8da3-2ddb2a59a21c
redirect_from:
  - /2021080/docs/generic-faceted-search
  - /2021080/docs/en/generic-faceted-search
  - /docs/generic-faceted-search
  - /docs/en/generic-faceted-search
  - /v6/docs/generic-faceted-search
  - /v6/docs/en/generic-faceted-search  
  - /v5/docs/generic-faceted-search
  - /v5/docs/en/generic-faceted-search  
  - /v4/docs/generic-faceted-search
  - /v4/docs/en/generic-faceted-search  
  - /v3/docs/generic-faceted-search
  - /v3/docs/en/generic-faceted-search  
  - /v2/docs/generic-faceted-search
  - /v2/docs/en/generic-faceted-search  
  - /v1/docs/generic-faceted-search
  - /v1/docs/en/generic-faceted-search
  - /docs/scos/dev/best-practices/search-best-practices/generic-faceted-search.html
  - /docs/pbc/all/search/202212.0/best-practices/generic-faceted-search.html
related:
  - title: Data-driven ranking
    link: docs/pbc/all/search/page.version/base-shop/best-practices/data-driven-ranking.html
  - title: Full-text search
    link: docs/pbc/all/search/page.version/base-shop/best-practices/full-text-search.html
  - title: Precise search by super attributes
    link: docs/pbc/all/search/page.version/base-shop/best-practices/precise-search-by-super-attributes.html
  - title: On-site search
    link: docs/pbc/all/search/page.version/base-shop/best-practices/on-site-search.html
  - title: Other best practices
    link: docs/pbc/all/search/page.version/base-shop/best-practices/other-best-practices.html
  - title: Multi-term autocompletion
    link: docs/pbc/all/search/page.version/base-shop/best-practices/multi-term-auto-completion.html
  - title: Simple spelling suggestions
    link: docs/pbc/all/search/page.version/base-shop/best-practices/simple-spelling-suggestions.html
  - title: Naive product centric approach
    link: docs/pbc/all/search/page.version/base-shop/best-practices/naive-product-centric-approach.html
  - title: Personalization - dynamic pricing
    link: docs/pbc/all/search/page.version/base-shop/best-practices/personalization-dynamic-pricing.html
  - title: Usage-driven schema and document structure
    link: docs/pbc/all/search/page.version/base-shop/best-practices/usage-driven-schema-and-document-structure.html
---

Faceted search—sometimes also called faceted navigation—lets users navigate through a website by applying filters for categories, attributes, and price ranges. Probably, it's the most basic feature of a search, and users expect this to work. Unfortunately, we observed that this is also one of the features that developers struggle with the most.

The main idea behind faceted search is to present the attributes of the documents of the previous search result as filters, which can be used by the user to narrow down search results. In the following example, a user clicked through the category tree to the "Hammer" category and then further filtered the results for documents with a hammer weight of 2000 grams and in a price range of 10€ to 50€. 19 documents were found, and the filter bar on the left lists those attributes that are contained in the search result along with a count of how many documents have the attribute (facet counts):

![Faceted search](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Search+Engine/Generic+Faceted+Search/faceted-search.png)

To support faceted search, Elasticsearch offers a simple but powerful concept of aggregations. One of the nice features of aggregations is that they can be nested. In other words, you can define top-level aggregations that create "buckets" of documents and other aggregations that are executed inside those buckets on a subset of documents. The concept of aggregations is in general similar to the SQL `GROUP_BY` command (but much more powerful). Nested aggregations are analogous to SQL grouping but with multiple column names in the GROUP BY part of the query.

## Indexing facet values

Before building aggregations, document attributes that can serve as facets need to be indexed in Elasticsearch. One way to index them is to list all attributes and their values under the same field like in the following example:

```js
"string_facets": {
    "manufacturer": "Fortis",
    "hammer_weight": "2000",
    "hammer_color": "Red"
}
```

While this approach might be okay for filtering, it doesn't work well for faceting because queries need to explicitly list all the field names for which you want to create aggregations. It can be done in two ways:

* Always send all possible field names as part of your faceted query. This is not very practical when having 1000s of different facets. The query becomes huge (and possibly slow) while the list of all possible field names needs to be maintained outside of Elasticsearch.
* Run a first query that fetches the most common field names and attributes for a specific search request and then use those results to build a second query that does the faceting (and fetching of the document). In that case, the second query looks like this:

```js
"aggregations": {
  "facet_manufacturer": {
    "terms": {
      "field": "string_facets.manufacturer"
    }
  },
  "facet_hammer_weight": {
    "terms": {
      "field": "string_facets.hammer_weight"
    }
  },
  "facet_hammer_color": {
    "terms": {
      "field": "string_facets.hammer_color"
    }
  }
}
```

This is obviously not very efficient in terms of speed (two queries) and adds additional complexity in query building and handling.

We instead suggest separating the names and values of facets in documents sent to Elasticsearch like this:

```js
"string_facets": [
  {
    "facet-name": "manufacturer",
    "facet-value": "Fortis"
  },
  {
    "facet-name": "hammer_weight",
    "facet-value": "2000"
  },
  {
    "facet-name": "hammer_color",
    "facet-value": "Red"
  }
]
```

This requires special treatment in the mapping because otherwise, Elasticsearch internally flattens and saves them as follows:

```js
"string_facets": {
   "facet-name": ["manufacturer", "hammer_weight", "hammer_color"],
   "facet-value": ["Fortis", "2000", "Red"]
 }
 ```

 In this case, aggregations provide incorrect results because the relation between the specific attribute name and its values is lost. Therefore, in the Elasticsearch mapping, facet fields need to be marked as `"type": "nested"`:

 ```js
 "string_facets": {
  "type": "nested",
  "properties": {
    "facet-name": {
      "type": "string",
      "index": "not_analyzed"
    },
    "facet-value": {
      "type": "string",
      "index": "not_analyzed"
    }
  }
}
```

## Facet queries

Filtering and aggregating a structure like this requires nested filters and nested aggregations in queries.

**Aggregation:**

```js
"aggregations": {
  "agg_string_facet": {
    "nested": {
      "path": "string_facets"
    },
    "aggregations": {
      "facet_name": {
        "terms": {
          "field": "string_facets.facet-name"
        },
        "aggregations": {
          "facet_value": {
            "terms": {
              "field": "string_facets.facet-value"
            }
          }
        }
      }
    }
  }
}
```

**Filter:**

```js
"filter": {
  "nested": {
    "path": "string_facets",
    "filter": {
      "bool": {
        "must": [
          {
            "term": {
              "string_facets.facet-name": "hammer_weight"
            }
          },
          {
            "terms": {
              "string_facets.facet-value": [
                "2000"
              ]
            }
          }
        ]
      }
    }
  }
}
```

Numeric attributes need to be handled differently in aggregations and must be stored and analyzed separately. This is because numeric facets sometimes have huge numbers of distinct values. Instead of listing all possible values, it's sufficient just to get the minimum and maximum values and show them as a range selector or slider in the frontend. This is possible only if values are stored as numbers.

The most important numeric facet on any ecommerce website is probably the price facet.

**Document:**

```js
"number_facet": [
  {
    "facet-name": "final_gross_price",
    "facet-value": 1194
  }
]
```

**Mapping:**

```js
"number_facet" : {
  "type": "nested",
  "properties": {
    "facet-name": {
      "type": "string",
      "index": "not_analyzed"
    },
    "facet-value": {
      "type": "double"
    }
  }
}
```

The aggregation of numeric facets uses the keyword "`stats`" instead of "`terms`" in queries. Unlike the "`terms`" aggregation that returns only the number of the term's occurrences, "`stats`" returns statistical values like minimum, maximum and average:

```js
"agg_number_facet": {
  "nested": {
    "path": "number_facet"
  },
  "aggs": {
    "facet_name": {
      "terms": {
        "field": "number_facet.facet-name"
      },
      "aggs": {
        "facet_value": {
          "stats": {
            "field": "number_facet.facet-value"
          }
        }
      }
    }
  }
}
```

Sometimes ecommerce websites support specific facet behavior that let users select multiple values of the same facet on the frontend—for example, using a checkbox. To see how to implement a query that supports this feature while using described facet document structure, see [Elasticsearch - generic facets structure - calculating aggregations combined with filters](http://stackoverflow.com/questions/41369749) on Stack Overflow.

With this approach to faceted navigation, you can render search result pages with a single Elasticsearch query, and you don't need to know the list of available facets at query time. The additional effort in document preparation and query building immediately pays off because the solution automatically scales to thousands of facets.
