---
title: Usage-Driven Schema & Document Structure
originalLink: https://documentation.spryker.com/v5/docs/usage-driven-schema-structure
redirect_from:
  - /v5/docs/usage-driven-schema-structure
  - /v5/docs/en/usage-driven-schema-structure
---

Both the schema and the query generator should not need to know that there is such a thing as as the weight of a hammer. We will argue for a document structure and schema design that is not built around the original data but around the usage of attributes in search operations.

At Contorion, this is how we send the same product as in the above example to Elasticsearch (don’t worry, we will explain the details later):

```js
{
  "type": "staple",
  "search_result_data": {
    "sku": "SP11968",
    "name": "Fortis Fäustel, mit Eschen-Stiel",
    "preview_image": "faeustel-din6475-2000g-eschenstiel-fortis-21049292-0-JlHR5nOi-l.jpg",
    "number_of_products": "4",
    "final_gross_price": "822",
    "final_net_price": "691",
    "base_gross_price": null,
    "base_price_unit": null,
    "url": "/handwerkzeug/fortis-faeustel-mit-eschen-stiel-SP11968"
  },
  "search_data": [
    {
      "full_text": " 21049289  4317784792714 04317784792714 Fäustel DIN 6475<br><br>Stahlgeschmiedet, Kopf schwarz lackiert, Bahnen poliert, doppelt geschweifter Eschenstiel mit ozeanblau lackiertem Handende. SP11968 SP11968",
      "full_text_boosted": " Fortis Fäustel DIN6475 1000g Eschenstiel FORTIS 1000 Fäustel Handwerkzeug Hammer Fäustel Fortis Fäustel, mit Eschen-Stiel Fortis Fäustel, mit Eschen-Stiel",
      "string_facet": [
        {
          "facet-name": "manufacturer",
          "facet-value": "Fortis"
        },
        {
          "facet-name": "hammer_weight",
          "facet-value": "1000"
        }
      ],
      "number_facet": [
        {
          "facet-name": "final_gross_price",
          "facet-value": 822
        }
      ]
    },
    {
      "full_text": " 21049290  4317784792721 04317784792721 Fäustel DIN 6475<br><br>Stahlgeschmiedet, Kopf schwarz lackiert, Bahnen poliert, doppelt geschweifter Eschenstiel mit ozeanblau lackiertem Handende. SP11968 SP11968",
      "full_text_boosted": " Fortis Fäustel DIN6475 1250g Eschenstiel FORTIS 1250 Fäustel Handwerkzeug Hammer Fäustel Fortis Fäustel, mit Eschen-Stiel Fortis Fäustel, mit Eschen-Stiel",
      "string_facet": [
        {
          "facet-name": "manufacturer",
          "facet-value": "Fortis"
        },
        {
          "facet-name": "hammer_weight",
          "facet-value": "1250"
        }
      ],
      "number_facet": [
        {
          "facet-name": "final_gross_price",
          "facet-value": 1020
        }
      ]
    },
    {
      "full_text": " 21049291  4317784792738 04317784792738 Fäustel DIN 6475<br><br>Stahlgeschmiedet, Kopf schwarz lackiert, Bahnen poliert, doppelt geschweifter Eschenstiel mit ozeanblau lackiertem Handende. SP11968 SP11968",
      "full_text_boosted": " Fortis Fäustel DIN6475 1500g Eschenstiel FORTIS 1500 Fäustel Handwerkzeug Hammer Fäustel Fortis Fäustel, mit Eschen-Stiel Fortis Fäustel, mit Eschen-Stiel",
      "string_facet": [
        {
          "facet-name": "manufacturer",
          "facet-value": "Fortis"
        },
        {
          "facet-name": "hammer_weight",
          "facet-value": "1500"
        }
      ],
      "number_facet": [
        {
          "facet-name": "final_gross_price",
          "facet-value": 1039
        }
      ]
    },
    {
      "full_text": " 21049292  4317784792745 04317784792745 Fäustel DIN 6475<br><br>Stahlgeschmiedet, Kopf schwarz lackiert, Bahnen poliert, doppelt geschweifter Eschenstiel mit ozeanblau lackiertem Handende. SP11968 SP11968",
      "full_text_boosted": " Fortis Fäustel DIN6475 2000g Eschenstiel FORTIS 2000 Fäustel Handwerkzeug Hammer Fäustel Fortis Fäustel, mit Eschen-Stiel Fortis Fäustel, mit Eschen-Stiel",
      "string_facet": [
        {
          "facet-name": "manufacturer",
          "facet-value": "Fortis"
        },
        {
          "facet-name": "hammer_weight",
          "facet-value": "2000"
        }
      ],
      "number_facet": [
        {
          "facet-name": "final_gross_price",
          "facet-value": 1194
        }
      ]
    }
  ],
  "completion_terms": [
    "Fortis",
    "1000",
    "1250",
    "1500",
    "2000",
    "Fäustel",
    "Handwerkzeug",
    "Hammer",
    "Fäustel"
  ],
  "suggestion_terms": [
    "Fortis Fäustel, mit Eschen-Stiel"
  ],
  "number_sort": {
    "final_gross_price": 822
  },
  "string_sort": {
    "name": "Fortis Fäustel, mit Eschen-Stiel"
  },
  "scores": {
    "top_seller": 0.91,
    "pdp_impressions": 0.38,
    "sale_impressions_rate": 0.8,
    "data_quality": 0.87,
    "delivery_speed": 0.85,
    "random": 0.75,
    "stock": 1
  },
  "category": {
    "direct_parents": [
      "bpka"
    ],
    "all_parents": [
      "bost",
      "boum",
      "boun",
      "bpka"
    ],
    "paths": [
      "boum-boun-bpka"
    ]
  },
  "category_scores": {
    "number_of_impressions": 265,
    "number_of_orders": 23
  }
}
```

That’s a lot of redundant information! For example the manufacturer, hammer_weight and nameattributes are repeated in five top-level fields. But these attributes are used very differently in various search operations which require different analyzers and query strategies:

* Search result rendering: The field search_result_data contains all the information that is returned as a result of a query for rendering a search result page or completion popup
* Full-text search: The fields search_data/full_text and search_data/full_text_boosted contain all text content for which the product should be found in a full-text search
* Faceted navigation: search_data/string_facet and search_data/number_facet contain all attributes for which search results should be grouped and filtered
* Completion: completion_terms contains terms that should be shown as a completion as the user types a query
* Spell checking: suggestion_terms contains terms that might be suggested as an alternative spelling when a user makes a typo
* Static sorting: number_sort and string_sort are used for sorting by name or price
* Dynamic result ranking: scores contains numeric indicators of user relevancy, past performance and product quality
* Category navigation: category contains information about the position of a product in a category tree/graph

## Complete Schema
For reference, this is the complete schema (mapping) that we currently use to index pages at contorion (again, we will explain most of the details later):

```js
{
  "page": {
    "dynamic_templates": [
      {
        "search_result_data": {
          "mapping": {
            "type": "string",
            "index": "no"
          },
          "path_match": "search_result_data.*"
        }
      },
      {
        "scores": {
          "mapping": {
            "type": "double"
          },
          "path_match": "scores.*"
        }
      },
      {
        "category_scores": {
          "mapping": {
            "type": "integer"
          },
          "path_match": "category_scores.*"
        }
      },
      {
        "category": {
          "mapping": {
            "type": "string",
            "index": "not_analyzed"
          },
          "path_match": "category.*"
        }
      },
      {
        "string_sort": {
          "mapping": {
            "analyzer": "lowercase_keyword_analyzer",
            "type": "string"
          },
          "path_match": "string_sort.*"
        }
      },
      {
        "number_sort": {
          "mapping": {
            "index": "not_analyzed",
            "type": "double"
          },
          "path_match": "number_sort.*"
        }
      }
    ],
    "properties": {
      "search_data": {
        "type": "nested",
        "include_in_parent": false,
        "properties": {
          "full_text": {
            "type": "string",
            "index_analyzer": "full_text_index_analyzer",
            "search_analyzer": "full_text_search_analyzer",
            "fields": {
              "no-decompound": {
                "type": "string",
                "index_analyzer": "full_text_index_analyzer_no_decompound",
                "search_analyzer": "full_text_search_analyzer_no_decompound"
              },
              "no-stem": {
                "type": "string",
                "index_analyzer": "full_text_index_analyzer_no_stem",
                "search_analyzer": "full_text_search_analyzer_no_stem"
              }
            }
          },
          "full_text_boosted": {
            "type": "string",
            "index_analyzer": "full_text_index_analyzer",
            "search_analyzer": "full_text_search_analyzer",
            "fields": {
              "edge": {
                "type": "string",
                "index_analyzer": "full_text_edge_index_analyzer",
                "search_analyzer": "full_text_search_analyzer"
              },
              "no-decompound": {
                "type": "string",
                "index_analyzer": "full_text_index_analyzer_no_decompound",
                "search_analyzer": "full_text_search_analyzer_no_decompound"
              },
              "no-stem": {
                "type": "string",
                "index_analyzer": "full_text_index_analyzer_no_stem",
                "search_analyzer": "full_text_search_analyzer_no_stem"
              }
            }
          },
          "string_facet": {
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
          },
          "number_facet": {
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
        }
      },
      "completion_terms": {
        "type": "string",
        "analyzer": "completion_analyzer"
      },
      "suggestion_terms": {
        "type": "string",
        "index_analyzer": "term_suggestion_analyzer",
        "search_analyzer": "lowercase_analyzer"
      },
      "type": {
        "type": "string",
        "index": "not_analyzed"
      }
    }
  }
}
```
