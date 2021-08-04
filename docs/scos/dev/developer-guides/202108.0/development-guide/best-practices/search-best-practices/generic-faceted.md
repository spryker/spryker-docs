---
title: Generic Faceted Search
originalLink: https://documentation.spryker.com/2021080/docs/generic-faceted-search
redirect_from:
  - /2021080/docs/generic-faceted-search
  - /2021080/docs/en/generic-faceted-search
---

Faceted search (sometimes also called faceted navigation) allows users to navigate through a web site by applying filters for categories, attributes, price ranges and so on. It’s probably the most basic feature of a search and users expect this to work. Unfortunately, we observed that this is also one of the features that developers struggle with the most.

The main idea behind faceted search is to present the attributes of the documents of the previous search result as filters, which can be used by the user to narrow down search results. In the example below, a user clicked through the category tree to the “Hammer” category and then further filtered the results for documents with a hammer weight of 2000 grams and in a price range of 10€ to 50€. 19 documents were found, and the filter bar on the left lists those attributes that are contained in the search result along with a count of how many documents have the attribute (facet counts):
![Faceted search](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Search+Engine/Generic+Faceted+Search/faceted-search.png){height="" width=""}

To support faceted search, Elasticsearch offers the simple but powerful concept of aggregations. One of the nice features of aggregations is that they can be nested – in other words, it’s possible to define top-level aggregations that create “buckets” of documents and other aggregations that are executed inside those buckets on a subset of documents. The concept of aggregations is in general similar to the SQL GROUP_BY command (but much more powerful). Nested aggregations are analogous to SQL grouping but with multiple column names in the GROUP BY part of the query.

### Indexing Facet Values
Before building aggregations, document attributes that can serve as facets need to be indexed in Elasticsearch. One way to index them would be to list all attributes and their values under the same field like in the following example:

```js
"string_facets": {
    "manufacturer": "Fortis",
    "hammer_weight": "2000",
    "hammer_color": "Red"
}
```

While this approach might be ok for filtering, it will not work well for faceting because queries would need to explicitly list all the field names for which we want to create aggregations. It can be done in two ways:

* Always send all possible field names as part of your faceted query. This is not very practical when having 1000s of different facets. The query would become really big (and possibly slow) while the list of all possible field names would need to be maintained outside of Elasticsearch.
* Run a first query that fetches the most common field names / attributes for a specific search request and then use those results to build a second query that does the faceting (and fetching of document). The second query would in that case look like this:

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

This will obviously not be very efficient in terms of speed (two queries) and will add additional complexity in query building and handling.

We instead suggest to separate the names and values of facets in documents sent to Elasticsearch like this:

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

This requires a special treatment in the mapping, because otherwise Elasticsearch will internally flatten and save them as follows:

```js
"string_facets": {
   "facet-name": ["manufacturer", "hammer_weight", "hammer_color"],
   "facet-value": ["Fortis", "2000", "Red"]
 }
 ```
 
 Aggregations would in this case provide incorrect results because the relation between the specific attribute name and it’s values is lost. Therefore, facet fields need to be marked as “`type`”: “`nested`” in the Elasticsearch mapping:
 
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

### Facet Queries
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

Numeric attributes need to be handled differently in aggregations and they have to be stored and analyzed separately. This is because numeric facets sometimes have huge numbers of distinct values. Instead of listing all possible values, it is sufficient to just get the minimum and maximum values and show them as a range selector or slider in the front end. This is possible only if values are stored as numbers.

The most important numeric facet on any e-commerce website is probably the price facet.

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

The aggregation of numeric facets uses the keyword "`stats`" instead of "`terms`" in queries. Unlike the "`terms`" aggregation that returns only the number of the term’s occurrences, "`stats`" returns statistical values like minimum, maximum and average:

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

Sometimes e-commerce websites support specific facet behavior that let users select multiple values of the same facet on the front-end (e.g using checkbox). Check [stackoverflow discussion](http://stackoverflow.com/questions/41369749) to see how to implement query that supports this feature while using described facet document structure.

With this approach to faceted navigation, it is possible to render search result pages with a single Elasticsearch query and without having to know the list of available facets at query time. The additional effort in document preparation and query building immediately pays off because the solution automatically scales to thousands of facets.
