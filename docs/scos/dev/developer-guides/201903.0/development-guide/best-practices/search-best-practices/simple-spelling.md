---
title: Simple Spelling Suggestions
originalLink: https://documentation.spryker.com/v2/docs/simple-spelling-suggestions
redirect_from:
  - /v2/docs/simple-spelling-suggestions
  - /v2/docs/en/simple-spelling-suggestions
---

Spelling suggestions provide the users with alternative search terms when the search query does not return any results:
![Spell checking](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Search+Engine/Simple+Spelling+Suggestions/spell-checking.png){height="" width=""}

Translation: *Unfortunately there were 0 results for your exact search term “**hammer holk**”. Did you possibly mean **hammer holz**?*

This is one of the simplest features you can build with Elasticsearch and also one that your users expect to see. Elasticsearch has a highly configurable [term suggester](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-term.html), which enables suggestions based on the edit distance between indexed terms and search terms. We recommend putting all attributes that are suitable for spelling suggestions (i.e. short strings such as product and category names where you are sure that they are spelled correctly) into a single document field:

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

At query time, a suggest part is added to every query. It will try to return the closest tokens (based on edit distance) for all terms that were not matched in the query. For tokens that match at least one document, no suggestions are going to be calculated. In case you have doubts about the quality of the suggestion_terms, it’s possible to fetch several suggestions per term from Elasticsearch and then use some heuristics in the back end to select one that exhibits a good combination of distance score and term frequency.

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
