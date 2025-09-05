---
title: Simple spelling suggestions
description: Spelling suggestions provide the users with alternative search terms when the search query does not return any results
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/simple-spelling-suggestions
originalArticleId: 336cc842-ecf5-4403-8979-21a973ce0e70
redirect_from:
  - /2021080/docs/simple-spelling-suggestions
  - /2021080/docs/en/simple-spelling-suggestions
  - /docs/simple-spelling-suggestions
  - /docs/en/simple-spelling-suggestions
  - /v6/docs/simple-spelling-suggestions
  - /v6/docs/en/simple-spelling-suggestions  
  - /v5/docs/simple-spelling-suggestions
  - /v5/docs/en/simple-spelling-suggestions  
  - /v4/docs/simple-spelling-suggestions
  - /v4/docs/en/simple-spelling-suggestions  
  - /v3/docs/simple-spelling-suggestions
  - /v3/docs/en/simple-spelling-suggestions  
  - /v2/docs/simple-spelling-suggestions
  - /v2/docs/en/simple-spelling-suggestions  
  - /v1/docs/simple-spelling-suggestions
  - /v1/docs/en/simple-spelling-suggestions
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
  - title: Multi-term autocompletion
    link: docs/pbc/all/search/page.version/base-shop/best-practices/multi-term-auto-completion.html
  - title: Naive product centric approach
    link: docs/pbc/all/search/page.version/base-shop/best-practices/naive-product-centric-approach.html
  - title: Personalization - dynamic pricing
    link: docs/pbc/all/search/page.version/base-shop/best-practices/personalization-dynamic-pricing.html
  - title: Usage-driven schema and document structure
    link: docs/pbc/all/search/page.version/base-shop/best-practices/usage-driven-schema-and-document-structure.html
---

Spelling suggestions provide the users with alternative search terms when the search query does not return any results:

![Spell checking](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Search+Engine/Simple+Spelling+Suggestions/spell-checking.png)

Translation: *Unfortunately there were 0 results for your exact search term "**hammer holk**". Did you possibly mean **hammer holz**?*

This is one of the simplest features you can build with Elasticsearch and also one that your users expect to see. Elasticsearch has a highly configurable [term suggester](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-term.html), which enables suggestions based on the edit distance between indexed terms and search terms. We recommend putting all attributes that are suitable for spelling suggestions—for example, short strings such as product and category names where you are sure that they are spelled correctly—into a single document field:

```php
"suggestion_terms": [
  "Fortis Fäustel, mit Eschen-Stiel"
]
```

Suggestion terms are then indexed by splitting them by whitespace and lowercasing. The same goes for search terms that will be compared with the indexed terms.

```php
"suggestion_terms" : {
  "type" : "string",
  "analyzer" : "term_suggestion_analyzer",
}
```

At query time, a `suggest` part is added to every query. It tries to return the closest tokens (based on edit distance) for all terms that were not matched in the query. For tokens that match at least one document, no suggestions are going to be calculated. In case you have doubts about the quality of `suggestion_terms`, you can fetch several suggestions per term from Elasticsearch and then use some heuristics in the backend to select one that exhibits a good combination of distance score and term frequency.

```php
"suggest": {
  "spelling-suggestion": {
    "text": "hammmer",
    "term": {
      "field": "suggestion_terms",
      "size": 1
    }
  }
}
```
