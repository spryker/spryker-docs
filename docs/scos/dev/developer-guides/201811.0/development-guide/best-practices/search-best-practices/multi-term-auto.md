---
title: Multi-Term Auto Completion
originalLink: https://documentation.spryker.com/v1/docs/multi-term-auto-completion
redirect_from:
  - /v1/docs/multi-term-auto-completion
  - /v1/docs/en/multi-term-auto-completion
---

Term completion is a feature where a user gets suggestions for search terms and matching search results as he types the query. We call a completion multi-term when it is able to combine terms from different attributes in an open-ended fashion. In the below example, a user entered “fortis” (a brand) and started typing “hammer” (a category):
![Auto-completion](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Search+Engine/Multi-Term+Auto+Completion/completion.png){height="" width=""}

After completing “hammer”, the search would suggest more terms found in documents containing both “fortis” and “hammer”.

The Elasticsearch API offers the [completion suggester](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html), which works great in many cases but has one major drawback in that it can only suggest fixed terms that are saved to Elasticsearch during index time. So in the example above, the terms “fortis” and “hammer” as well as both compound variations, i.e. “fortis hammer” and “hammer fortis”, would have to be indexed.

We therefore recommend indexing all terms for which you want to offer auto completion (category names, facet values, brands and other categorial terms) in one field called completion_terms: "completion_terms":

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

In order to have products match partial search terms (like “fortis ham”), we apply an [edge_ngram](https://www.elastic.co/guide/en/elasticsearch/guide/master/_index_time_search_as_you_type.html#_edge_n_grams_and_postcodes) filter to a field that contains the same data as completion_terms. Only documents that match the current search query are considered when building auto completion terms. Auto completion terms are fetched by aggregating on the completion_terms field and showing terms with the highest number of occurrences. All of this is happening in one query. The aggregation part of that query (the part used for autocompletion) looks as follows:

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

The main benefit of this approach is that it is possible to continuously suggest new terms as a user types. The main drawback is speed–The out-of-the-box completion suggester is much more optimized for speed.
