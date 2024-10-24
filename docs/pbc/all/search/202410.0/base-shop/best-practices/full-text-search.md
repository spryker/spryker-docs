---
title: Full-text search
description: Full-text search is a feature where a user enters arbitrary text into a search field and then gets documents that are relevant for that query.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/full-text-search
originalArticleId: 3ce85307-d667-4326-817e-6caf21925d53
redirect_from:
  - /2021080/docs/full-text-search
  - /2021080/docs/en/full-text-search
  - /docs/full-text-search
  - /docs/en/full-text-search
  - /v6/docs/full-text-search
  - /v6/docs/en/full-text-search  
  - /v5/docs/full-text-search
  - /v5/docs/en/full-text-search  
  - /v4/docs/full-text-search
  - /v4/docs/en/full-text-search  
  - /v3/docs/full-text-search
  - /v3/docs/en/full-text-search  
  - /v2/docs/full-text-search
  - /v2/docs/en/full-text-search  
  - /v1/docs/full-text-search
  - /v1/docs/en/full-text-search
  - /docs/scos/dev/best-practices/search-best-practices/full-text-search.html#text-analysis
related:
  - title: Data-driven ranking
    link: docs/pbc/all/search/page.version/base-shop/best-practices/data-driven-ranking.html
  - title: Generic faceted search
    link: docs/pbc/all/search/page.version/base-shop/best-practices/generic-faceted-search.html
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

_Full-text search_ is a feature where a user enters arbitrary text into a search field and then gets documents relevant to that query. It is normally combined with faceted navigation. In the following example, a user searches for "hammer" and then further filters for hammer weights of 2000 grams and prices between 10€ and 50€:

![Full-text search](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Search+Engine/Full-Text+Search/fulltext-search.png)

Although some tweaking is necessary, Elasticsearch does a great job in running full-text queries fast (it's one of the most important features of the underlying Lucene engine). On the other hand, more work is required to get text relevance right and to make sure that the first returned query results are the ones that are most relevant for the user.

## Text analysis

The defaults of Elasticsearch work fine for basic full-text search use cases, but language- and business-dependent text processing needs to be performed for a great search experience. This is called text analysis and refers to the process of splitting source text into a stream of tokens. The [Elasticsearch analysis module](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/analysis.html) offers a set of pre-built default analyzers but it's also possible to build custom ones.

Analyzers are composed of a single tokenizer and zero or more token filters. A tokenizer splits source text into a stream of tokens—for example, splitting by whitespace characters—which are then passed to token filters. Filters are applied one by one, each modifying its input stream by deleting/splitting/changing tokens and passing the stream to the next filter. The resulting list of tokens is saved to [Elasticsearch inverted index](https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html) and made searchable in a very performant way.

The following picture shows a text analysis process that works well for tool-related text in German:

![Text analysis](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Search+Engine/Full-Text+Search/text-analysis.png)

The exact steps and their order differ for different business models and applications (there is no "free lunch" here) so this requires some experimentation before getting it right.

Text analysis is executed both for documents that are indexed to Elasticsearch and for search terms entered by users. Index time and search time analyzers are often very similar but not necessarily the same. The preceding analyzer is an example of an index time analyzer, the corresponding search time analyzer has the same tokenizer and filters except for the synonym and decompounder filter.

### Indexing text

With [a naive product-centric approach](http://project-a.github.io/on-site-search-design-patterns-for-e-commerce/#a-naive-product-centric-approach) text analyzers would have to be added to all fields that contain text material—for example, `name`, `description`, `category-names`, or `manufacturer`. Moreover, all those attributes need to be addressed separately in queries. This leads to unnecessarily complicated queries and, more importantly, requires additional effort when new data needs to be added to the documents. More text material per document usually means better search results and thus the process of adding new data to the index should be straightforward.

We recommend putting all searchable text data for a document in one of the only two full-text document fields full-text and full-text-boosted, with more important attributes such as product names, brands, and selected facets into the latter:

```php
"full_text": "21049291 4317784792738 Fäustel DIN 6475<br><br>Stahlgeschmiedet, Kopf schwarz lackiert, Bahnen poliert, doppelt geschweifter Eschenstiel mit ozeanblau lackiertem Handende SP11968",
"full_text_boosted": "Fortis Fäustel DIN6475 2000g Eschenstiel FORTIS 2000 Fäustel Handwerkzeug Hammer Fäustel Fortis Fäustel, mit Eschen-Stiel Fortis Fäustel, mit Eschen-Stiel"
```

The boosting of the second field happens at query time—for example, by multiplying base relevance with 7 for `full_text_boosted` and with 2 for `full_text`:

```php
"multi_match": {
  "fields": [
    "search_data.full_text_boosted^7",
    "search_data.full_text^2"
  ],
  "type": "cross_fields",
  "analyzer": "full_text_search_analyzer",
  "query": "hammer"
}
```

### Improving text relevance

Text relevance can be further improved by adding different analyzers for full-text fields. This is straightforward in Elasticsearch and requires small changes in the document mapping:

```js
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
  }
}
```

{% info_block warningBox %}

`full_text_index_analyzer` and `full_text_search_analyzer` are all examples of custom analyzers and need to be configured separately from the mapping.

{% endinfo_block %}

Elasticsearch is now going to take a textual field (in this case `full_text`) and analyze it with three different analyzers: once with the normal `full_text_search_analyzer` but also with two other analyzers that are skipping the decompounding and stemming analysis steps. The reason for this is that the text loses some information during the analysis process—for example, lower casing the word removes the case information of the original word. By indexing the same text with different analyzers we have a chance to distinguish good matches from bad ones by giving higher scores to those search terms that match a higher number of analyzers.

The following is an example of a query that does the following:

1. Matches a broad number of products using an analyzer that strips most information from the text (_must_ part of the bool query)

2. Scores products higher that are also matching other analyzers (those that match the search term but without stemming and decompounding) (_should_ part of the bool query)

```js
{
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "fields": [
              "search_data.full_text_boosted^7",
              "search_data.full_text^2"
            ],
            "operator": "AND",
            "type": "cross_fields",
            "analyzer": "full_text_search_analyzer",
            "query": "hammer"
          }
        }
      ],
      "should": [
        {
          "multi_match": {
            "fields": [
              "search_data.full_text_boosted.no-stem^7",
              "search_data.full_text.no-stem^2"
            ],
            "operator": "OR",
            "type": "cross_fields",
            "analyzer": "full_text_search_analyzer_no_stem",
            "query": "hammer"
          }
        },
        {
          "multi_match": {
            "fields": [
              "search_data.full_text_boosted.no-decompound^7",
              "search_data.full_text.no-decompound^2"
            ],
            "operator": "OR",
            "type": "cross_fields",
            "analyzer": "full_text_search_analyzer_no_decompound",
            "query": "hammer"
          }
        }
      ]
    }
  }
}
```
