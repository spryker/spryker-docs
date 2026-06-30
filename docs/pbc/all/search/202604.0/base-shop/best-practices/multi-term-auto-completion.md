---
title: Multi-term autocompletion
description: Term completion is a feature where a user gets suggestions for search terms and matching search results as he types the query.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/multi-term-auto-completion
originalArticleId: 3856974a-ffa5-411d-ae2d-328dcfe5b405
redirect_from:
  - /2021080/docs/multi-term-auto-completion
  - /2021080/docs/en/multi-term-auto-completion
  - /docs/multi-term-auto-completion
  - /docs/en/multi-term-auto-completion
  - /v6/docs/multi-term-auto-completion
  - /v6/docs/en/multi-term-auto-completion  
  - /v5/docs/multi-term-auto-completion
  - /v5/docs/en/multi-term-auto-completion  
  - /v4/docs/multi-term-auto-completion
  - /v4/docs/en/multi-term-auto-completion  
  - /v3/docs/multi-term-auto-completion
  - /v3/docs/en/multi-term-auto-completion  
  - /v2/docs/multi-term-auto-completion
  - /v2/docs/en/multi-term-auto-completion  
  - /v1/docs/multi-term-auto-completion
  - /v1/docs/en/multi-term-auto-completion
  - /docs/scos/dev/best-practices/search-best-practices/multi-term-auto-completion.html
related:
  - title: Data-driven ranking
    link: docs/pbc/all/search/page.version/base-shop/best-practices/data-driven-ranking.html
  - title: Full-text search
    link: docs/pbc/all/search/page.version/base-shop/best-practices/full-text-search.html
  - title: Generic faceted search
    link: docs/pbc/all/search/page.version/base-shop/best-practices/generic-faceted-search.html
  - title: Precise search by super attributes
    link: docs/pbc/all/search/page.version/base-shop/best-practices/precise-search-by-super-attributes.html
  - title: On-site search
    link: docs/pbc/all/search/page.version/base-shop/best-practices/on-site-search.html
  - title: Other best practices
    link: docs/pbc/all/search/page.version/base-shop/best-practices/other-best-practices.html
  - title: Simple spelling suggestions
    link: docs/pbc/all/search/page.version/base-shop/best-practices/simple-spelling-suggestions.html
  - title: Naive product centric approach
    link: docs/pbc/all/search/page.version/base-shop/best-practices/naive-product-centric-approach.html
  - title: Personalization - dynamic pricing
    link: docs/pbc/all/search/page.version/base-shop/best-practices/personalization-dynamic-pricing.html
  - title: Usage-driven schema and document structure
    link: docs/pbc/all/search/page.version/base-shop/best-practices/usage-driven-schema-and-document-structure.html
---

*Term completion* is a feature where a user gets suggestions for search terms and matching search results as they type the query. We call a completion multi-term when it can combine terms from different attributes in an open-ended fashion. In the following example, a user entered "fortis" (a brand) and started typing "hammer" (a category):
![Auto-completion](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Search+Engine/Multi-Term+Auto+Completion/completion.png)

After completing "hammer", the search suggests that more terms are found in documents containing both "fortis" and "hammer."

The Elasticsearch API offers the [completion suggester](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html), which works great in many cases but has one major drawback. It can only suggest fixed terms that are saved to Elasticsearch during index time. So in the preceding example, the terms "fortis" and "hammer" as well as both compound variations—for example, "fortis hammer" and "hammer fortis"—must be indexed.

Therefore, we recommend indexing all terms you want to offer autocompletion for (category names, facet values, brands, and other categorial terms) in one field called `completion_terms: "completion_terms"`:

```js
[
  "Fortis",
  "1000",
  "1250",
  "1500",
  "2000",
  "Fäustel",
  "Handwerkzeug",
  "Hammer"
]
```

The field is analyzed with a very simple analyzer, which is based on the Elasticsearch keyword tokenizer (the analyzer is only used to remove some stop words).

```js
"completion_terms": {
  "type": "string",
  "analyzer": "completion_analyzer"
}
```

To have products match partial search terms (like "fortis ham"), we apply an [edge_ngram](https://www.elastic.co/guide/en/elasticsearch/guide/master/_index_time_search_as_you_type.html#_edge_n_grams_and_postcodes) filter to a field that contains the same data as `completion_terms`. Only documents that match the current search query are considered when building autocompletion terms. Autocompletion terms are fetched by aggregating on the c`ompletion_terms` field and showing terms with the highest number of occurrences. All of this is happening in one query. The aggregation part of that query (the part used for the autocompletion) looks as follows:

```php
"aggs": {
  "autocomplete": {
    "terms": {
      "field": "completion_terms",
      "size": 100
    }
  }
}
```

The main benefit of this approach is that you can continuously suggest new terms as user types. The main drawback is speed. The out-of-the-box completion suggester is much more optimized for speed.
