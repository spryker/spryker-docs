---
title: On-site search
description: Providing users with a proper on-site search user experience is often one of the major technical challenges in building ecommerce websites.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/search-design-patterns
originalArticleId: a6003c30-f01e-4baa-a0f1-64fb55ce5217
redirect_from:
  - /2021080/docs/search-design-patterns
  - /2021080/docs/en/search-design-patterns
  - /docs/search-design-patterns
  - /docs/en/search-design-patterns
  - /v6/docs/search-design-patterns
  - /v6/docs/en/search-design-patterns  
  - /v5/docs/search-design-patterns
  - /v5/docs/en/search-design-patterns  
  - /v4/docs/search-design-patterns
  - /v4/docs/en/search-design-patterns  
  - /v3/docs/search-design-patterns
  - /v3/docs/en/search-design-patterns  
  - /v2/docs/search-design-patterns
  - /v2/docs/en/search-design-patterns  
  - /v1/docs/search-design-patterns
  - /v1/docs/en/search-design-patterns
  - /docs/scos/dev/best-practices/search-best-practices/on-site-search.html
related:
  - title: Data-driven ranking
    link: docs/pbc/all/search/page.version/base-shop/best-practices/data-driven-ranking.html
  - title: Full-text search
    link: docs/pbc/all/search/page.version/base-shop/best-practices/full-text-search.html
  - title: Generic faceted search
    link: docs/pbc/all/search/page.version/base-shop/best-practices/generic-faceted-search.html
  - title: Precise search by super attributes
    link: docs/pbc/all/search/page.version/base-shop/best-practices/precise-search-by-super-attributes.html
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

## Search design patterns for ecommerce: schema Structure, data-driven ranking and more

*Source*: <http://project-a.github.io/on-site-search-design-patterns-for-e-commerce/>

By [Dr. Martin Loetzsch](http://martin-loetzsch.de/), ([Project A](https://www.project-a.com/)) and Krešimir Slugan ([Contorion](https://contorion.de/)).

Providing users with a proper on-site search user experience is often one of the major technical challenges in building ecommerce websites. Although Elasticsearch is a fantastic search engine for the job, a lot of work needs to be done to adapt it to the specific business. This concept document introduces a few Elasticsearch design patterns around our notion of usage-driven schemas that will help you build a search for the folliwng purposes:

- A customer can easily find what they wants by clicking through the category tree and applying filters (faceted navigation) relevant products can be found through the following.
- A full-text search with more optional filters can be applied to narrow down the results.
- The right search results show up as suggestions when text is entered into the search box (completion).
- An alternative search result is shown when a term is misspelled (spell checking).

Furthermore, we will introduce a technique for sorting search results which ranks products that meet the following criteria higher:

- Most relevant for the search.
- Exhibit better past performance—for example, revenue, clicks, or click through rate.
- Exhibit better expected customer experience—for example, delivery speed, or product quality.

And finally, we will illustrate how to personalize search experience using the example of dynamic pricing and discuss some other best practices. The examples will come from Contorion, an online industrial and trade supply store that considers on-site search a major driver for its business.

{% info_block warningBox %}

All examples are from early 2015 and have proven to work in Elasticsearch 1.*x*. Some queries look different in Elasticsearch 5.*x* but the main concepts still hold true.

{% endinfo_block %}

Slides: <http://project-a.github.io/on-site-search-design-patterns-for-e-commerce/>
