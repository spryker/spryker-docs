---
title: Other best practices
description: This article provides a list of some additional and potentially useful principles regarding the setup of on-site search experience.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/other-best-practices
originalArticleId: 964c3ef2-57fe-4b57-a0bb-45a5cf6527fd
redirect_from:
  - /2021080/docs/other-best-practices
  - /2021080/docs/en/other-best-practices
  - /docs/other-best-practices
  - /docs/en/other-best-practices
  - /v6/docs/other-best-practices
  - /v6/docs/en/other-best-practices  
  - /v5/docs/other-best-practices
  - /v5/docs/en/other-best-practices  
  - /v4/docs/other-best-practices
  - /v4/docs/en/other-best-practices  
  - /v3/docs/other-best-practices
  - /v3/docs/en/other-best-practices  
  - /v2/docs/other-best-practices
  - /v2/docs/en/other-best-practices  
  - /v1/docs/other-best-practices
  - /v1/docs/en/other-best-practices
  - /docs/pbc/all/search/202212.0/best-practices/other-best-practices.html
related:
  - title: Data-driven ranking
    link: docs/pbc/all/search/latest/base-shop/best-practices/data-driven-ranking.html
  - title: Full-text search
    link: docs/pbc/all/search/latest/base-shop/best-practices/full-text-search.html
  - title: Generic faceted search
    link: docs/pbc/all/search/latest/base-shop/best-practices/generic-faceted-search.html
  - title: Precise search by super attributes
    link: docs/pbc/all/search/latest/base-shop/best-practices/precise-search-by-super-attributes.html
  - title: On-site search
    link: docs/pbc/all/search/latest/base-shop/best-practices/on-site-search.html
  - title: Multi-term autocompletion
    link: docs/pbc/all/search/latest/base-shop/best-practices/multi-term-auto-completion.html
  - title: Simple spelling suggestions
    link: docs/pbc/all/search/latest/base-shop/best-practices/simple-spelling-suggestions.html
  - title: Naive product centric approach
    link: docs/pbc/all/search/latest/base-shop/best-practices/naive-product-centric-approach.html
  - title: Personalization - dynamic pricing
    link: docs/pbc/all/search/latest/base-shop/best-practices/personalization-dynamic-pricing.html
  - title: Usage-driven schema and document structure
    link: docs/pbc/all/search/latest/base-shop/best-practices/usage-driven-schema-and-document-structure.html
---

Finally, we want to provide you with a list of some additional and potentially useful principles regarding the setup of an on-site search experience.

## Index pages, not products

Each document we put in Elasticsearch corresponds to an URL.

{% info_block warningBox %}

The mapping type in our schema is called `page`, not `product` or something else.

{% endinfo_block %}

We do this because we think that different page types—for example, brand pages, category pages, or CMS pages—can be relevant for the same search. There is no reason why somebody interested in shipping prices should not be able to find corresponding information using the search bar of a website (unfortunately, this is rarely the case), so we put it in the same index as products, using the same document structure:

```php
{
  "type": "cms-page",
  "search_result_data": {
    "id": "7",
    "title": "Versandkosten | contorion.de",
    "name": "Versandinformationen",
    "url": "/versandkosten"
  },
  "search_data": {
    "full_text_boosted": [
      "Versandinformationen"
    ],
    "full_text": [
      "<p>Die Versandkosten innerhalb Deutschlands betragen 5,95€ pro Bestellung. Ab einem Warenwert von %freeShippingPrice% liefert Contorion versandkostenfrei.</p><p>Contorion.de liefert im Moment nur nach Deutschland.</p> <p>Die Versandkosten innerhalb Deutschlands betragen 5,95€ pro Bestellung. Ab einem Warenwert von %freeShippingPrice% liefert Contorion versandkostenfrei.</p><p>Contorion.de liefert im Moment nur nach Deutschland.</p>"
    ]
  }
}
```

Furthermore, our generic page-based schema allows for other search operations such as rendering a *staple page* (an overview of different variants of a product; often with their own facet navigation such as the aforementioned Senkkopf-Holzbauschraube):
![Staple page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Search+Engine/Other+Best+Practices/staple.png)

The query looks very similar to a normal faceted navigation, except that it searches only within a specific staple.

## Explicit attribute management

A usage-driven search schema and document structure puts more burden on importers because document attributes must be duplicated in multiple fields with varying formats. To handle this additional complexity and keep the import code maintainable, we recommend to explicitly decide which attributes to put in which field; ideally as data—for example, in a database table and ideally as part of an already existing attribute management system:

| ATTRIBUTE              | FULL TEXT | FULL TEXT BOOSTED | STRING FACET | NUMBER FACET | COMPLETION TERMS | SUGGESTION TERMS | SEARCH RESULT DATA |
| ---------------------- | --------- | ----------------- | ------------ | ------------ | ---------------- | ---------------- | ------------------ |
| description            | &check;   |                   |              |              |                  |                  |                    |
| manufacturer           |           | &check;           | &check;      |              | &check;          | &check;          | &check;            |
| name                   |           | &check;           |              |              | &check;          | &check;          | &check;            |
| sku                    |           | &check;           |              |              |                  |                  | &check;            |
| hammer_weight          | &check;   |                   | &check;      |              | &check;          |                  |                    |
| hammer_handle_length   | &check;   |                   |              | &check;      |                  |                  |                    |
| hammer_handle_material | &check;   |                   | &check;      |              | &check;          |                  |                    |
| preview_image          |           |                   |              |              |                  |                  | &check;            |
| url                    |           |                   |              |              |                  |                  | &check;            |

Bonus points for providing a user interface for this purpose. It allows category or product managers to make fine-grained conscious decisions on how to use certain attributes in search. For example, a numeric attribute `hammer_weight` can be used as a string facet and completion term, whereas another numeric attribute `hammer_handle_length` can only be used as a number facet.

## Product management for search

Everybody has an opinion on how search should work, and being a product owner or product manager for search is definitely not the easiest task.

What is good product management for search? Certainly, it's not of technical nature (the suggestion like " use technique X" is usually suck).

Rather helpful are concrete examples of expected and actual behavior from a user perspective ("If I search for a hammer, I want to find a hammer").

This is an excerpt of the actual input we got from various stakeholders at Contorion:

| SEARCH TERM        | ISSUE / EXPECTED RESULT                                                                                                 | DEV COMMENT                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| makita             | I expect standard power tools on top (for example, drilling machines), not a jacket and laser.                          | Enhance WHF.                                                                         |
| akkuschrauber      | I expect more search word suggestions, not just Akkuschrauber-Set.                                                      | PM: In specification.                                                                |
| schleifscheibe     | No top sellers on top.                                                                                                  | Add all categories, add popularity score to category ranking.                        |
| latt hammer        | Decompounder (I believe) not working correctly–must return *Latthammers* first.                                         | Decompunder works perfect, but we might need to recalibrate the search a little bit. |
| blindnietwerkzeug  | Only returns products called *Blindnietwerkzeug* but no Blindnietzange or Blindnietmutter-Handgerät                     | Add tokens to list.                                                                  |
| bohrmaschine bosch | Top categories must be the ones that actually have *Bohrmaschine* as their name, not *Bohrständer* and stuff like that. | Fixed                                                                                |
| tiefenmesschieber  | Customers missing an *s* don't get any results for *TiefenmesSschieber*.                                                | Very hard to fix.                                                                    |
| bügelmessschraube  | Doesn't find the right products because products are abbreviated as *Bügelmessschr*.                                    | Product data issue.                                                                  |
| klopapier          | Synonym for *Toilettenpapier*.                                                                                          | Set up synonyms yourself.                                                            |
| duebel             | Doesn't find products when *ä* is *ae*–that must work for all *Umlaute*.                                                | Fixed                                                                                |
| Fein               | Fein electronics, since they are an A brand.                                                                            | There is a ticket for manufacturer boost in the backlog.                             |
| Handwaschpaste     | Doesn't find category.                                                                                                  | bug                                                                                  |

*A final remark*: Search problems are very often data quality problems. Search cannot fix issues of missing attributes, bad product descriptions, or wrong categorizations. In general: the better the underlying document material, the better the search experience.
