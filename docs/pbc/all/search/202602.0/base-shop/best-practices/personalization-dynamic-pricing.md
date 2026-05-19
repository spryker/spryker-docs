---
title: "Personalization: dynamic pricing"
description: This document describes how to personalize your Spryker based shop with dynamic pricing.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/personalization-dymanic-pricing
originalArticleId: 9c018e4a-9a82-49fd-9e46-d6d02332185b
redirect_from:
  - /2021080/docs/personalization-dymanic-pricing
  - /2021080/docs/en/personalization-dymanic-pricing
  - /docs/personalization-dymanic-pricing
  - /docs/en/personalization-dymanic-pricing
  - /v6/docs/personalization-dymanic-pricing
  - /v6/docs/en/personalization-dymanic-pricing  
  - /v5/docs/personalization-dymanic-pricing
  - /v5/docs/en/personalization-dymanic-pricing  
  - /v4/docs/personalization-dymanic-pricing
  - /v4/docs/en/personalization-dymanic-pricing  
  - /v3/docs/personalization-dymanic-pricing
  - /v3/docs/en/personalization-dymanic-pricing  
  - /v2/docs/personalization-dymanic-pricing
  - /v2/docs/en/personalization-dymanic-pricing  
  - /v1/docs/personalization-dymanic-pricing
  - /v1/docs/en/personalization-dymanic-pricing
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
  - title: Simple spelling suggestions
    link: docs/pbc/all/search/page.version/base-shop/best-practices/simple-spelling-suggestions.html
  - title: Naive product centric approach
    link: docs/pbc/all/search/page.version/base-shop/best-practices/naive-product-centric-approach.html
  - title: Usage-driven schema and document structure
    link: docs/pbc/all/search/page.version/base-shop/best-practices/usage-driven-schema-and-document-structure.html
---

Especially in businesses with a B2B focus, customers expect to get discounts after they have been using the service/website for a longer period of time. The search infrastructure should be able to handle such use cases, and customers should be able to see their own discounted prices while browsing the catalog. Luckily, Elasticsearch lets you extend basic filtering, aggregation, and fetching functionalities with scripts that are executed within the document context and can be used instead of fixed document values.

In this example, we have a script with two customer-based parameters: fixed prices (one per product ID) and category discount levels. These parameters are passed to the Elasticsearch query only for logged-in customers with granted discounts.

```php
{
  "query": {
    "script_fields": {
      "final_gross_price_discount": {
        "script": "if (fixed_prices && fixed_prices[doc['sku'].value]) {return fixed_prices[doc['sku'].value]}; if(!discounts) {return}; def discount = 0; for (String i : doc['discount_categories']) {if(discounts[i] && discounts[i].value > discount) {discount = discounts[i].value{% raw %}}}{% endraw %}; if (discount > 0 && doc['prices.discount_gross_price_level_' + discount].value) {return doc['prices.discount_gross_price_level_' + discount].value}",
        "params": {
          "discounts": {
            "47": 5,
            "453": 2,
            "305": 7
          },
          "fixed_prices": {
            "210417044": 9999,
            "128553": 100
          }
        }
      }
    }
  }
}
```

As a result, customers see personalized prices. Similarly, you can build filters and price facets based on dynamically calculated prices.
