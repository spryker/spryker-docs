---
title: On-Site Search
originalLink: https://documentation.spryker.com/v5/docs/search-design-patterns
redirect_from:
  - /v5/docs/search-design-patterns
  - /v5/docs/en/search-design-patterns
---

## Search Design Patterns for E-Commerce: Schema Structure, Data Driven Ranking & More

**Source**: <http://project-a.github.io/on-site-search-design-patterns-for-e-commerce/>

By [Dr. Martin Loetzsch](http://martin-loetzsch.de/) ([Project A](https://www.project-a.com/)) and Krešimir Slugan ([Contorion](https://contorion.de/))

Providing users with a proper on-site search user experience is often one of the major technical challenges in building e-commerce websites. Although Elasticsearch is a fantastic search engine for the job, a lot of work needs to be done to adapt it to the specific business. In this article, we will introduce a few Elasticsearch design patterns around our notion of usage-driven schemas that will help you to build a search so that:

* a customer can easily find what he wants by clicking through the category tree and applying filters (faceted navigation) relevant products can be found through
* a full-text search (with more optional filters applied to narrow down the results)
* the right search results show up as suggestions when text is entered into the search box (completion)
* an alternative search result is shown when a term is misspelled (spell checking)

Furthermore, we will introduce a technique for sorting search results which ranks products higher that:

* are most relevant for the search
* exhibit better past performance (revenue, clicks, click trough rate, etc.)
* exhibit better expected customer experience (delivery speed, product quality)

And finally, we will illustrate how to personalize search experience using the example of dynamic pricing and discuss some other best practices. The examples will come from Contorion, an online industrial and trade supply store that considers on-site search a major driver for its business.

{% info_block warningBox %}
All examples are from early 2015 and have proven to work in Elasticsearch 1.x. Some queries will look different in Elasticsearch 5.x but the main concepts still hold true.
{% endinfo_block %}

Slides: <http://project-a.github.io/on-site-search-design-patterns-for-e-commerce/>


