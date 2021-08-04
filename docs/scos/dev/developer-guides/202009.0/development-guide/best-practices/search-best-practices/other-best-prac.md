---
title: Other Best Practices
originalLink: https://documentation.spryker.com/v6/docs/other-best-practices
redirect_from:
  - /v6/docs/other-best-practices
  - /v6/docs/en/other-best-practices
---

Finally, we want to provide you with a list of some additional and potentially useful principles regarding the setup of an on-site search experience.

## Index Pages, Not Products
Each document we put in Elasticsearch corresponds to an URL.

{% info_block warningBox %}
The mapping type in our schema is called `page`, not `product` or something else
{% endinfo_block %}.)

We do this because we think that different page types (for example brand pages, category pages, CMS pages) can be relevant for the same search. There is no reason why somebody interested in [shipping prices](https://www.contorion.de/versandkosten) should not be able to find corresponding information using the search bar of a website (unfortunately this is rarely the case)–so we put it in the same index as products, using the same document structure:

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

Furthermore, our generic page-based schema allows for other search operations such as rendering a “staple page” (an overview of different variants of a product; often with their own facet navigation such as the aforementioned [Senkkopf-Holzbauschraube](https://www.contorion.de/befestigungstechnik/spax-universal-senkkopf-holzbauschraube-vg-SP84167377)):
![Staple page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Search+Engine/Other+Best+Practices/staple.png){height="" width=""}

The query looks very similar to a normal faceted navigation, except that it searches only within a specific staple.

## Explicit Attribute Management
An usage-driven search schema and document structure puts more burden on importers because document attributes have to be duplicated in multiple fields with varying formats. To handle this additional complexity (and to keep the import code maintainable), we recommend to explicitly decide which attributes to put in which field; ideally as data (for example in a database table and ideally as part of an already existing attribute management system):

| attribute              | full text | full text boosted | string facet | number facet | completion terms | suggestion terms | search result data |
| ---------------------- | --------- | ----------------- | ------------ | ------------ | ---------------- | ---------------- | ------------------ |
| description            | ✓         |                   |              |              |                  |                  |                    |
| manufacturer           |           | ✓                 | ✓            |              | ✓                | ✓                | ✓                  |
| name                   |           | ✓                 |              |              | ✓                | ✓                | ✓                  |
| sku                    |           | ✓                 |              |              |                  |                  | ✓                  |
| hammer_weight          | ✓         |                   | ✓            |              | ✓                |                  |                    |
| hammer_handle_length   | ✓         |                   |              | ✓            |                  |                  |                    |
| hammer_handle_material | ✓         |                   | ✓            |              | ✓                |                  |                    |
| preview_image          |           |                   |              |              |                  |                  | ✓                  |
| url                    |           |                   |              |              |                  |                  | ✓                  |

Bonus points for providing a user interface for this purpose. It would allow category or product managers to make fine-grained conscious decisions on how to use certain attributes in search. For example, a numeric attribute `hammer_weight` could be used as a string facet and completion term, whereas another numeric attribute `hammer_handle_length` would only be used as a number facet.

## Product Management for Search
Everybody has an opinion on how search should work, and being a product owner / product manager for search is definitely not the easiest task.

What is good product management for search? Certainly it is not of technical nature (“*please use technique X*”, these suggestions usually suck).

Rather helpful are concrete examples of expected and actual behaviour from a user perspective (“*If I search for a hammer, I want to find a hammer*”).

This is an excerpt of the actual input we got from various stakeholders at Contorion:

| search term        | issue / expected result                                      | dev comment                                                  |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| makita             | I would expect standard power tools on top (e.g., drilling machines), not a jacket and a laser | Enhance WHF                                                  |
| akkuschrauber      | I would expect more search word suggestions, not just Akkuschrauber-Set | PM: In specification                                         |
| schleifscheibe     | No top sellers on top                                        | Add all categories, add popularity score to category ranking |
| latt hammer        | Decompounder (I believe) not working correctly–should return Latthammers first | Decompunder works perfect, but we might need to recalibrate the search a little bit |
| blindnietwerkzeug  | Only returns products called “Blindnietwerkzeug” but no Blindnietzange or Blindnietmutter-Handgerät and so on | Please add tokens to list                                    |
| bohrmaschine bosch | Top categories should be the ones that actually have “Bohrmaschine” as their name, not Bohrständer and stuff like that | Fixed                                                        |
|                    |                                                              |                                                              |
| tiefenmesschieber  | Customers missing an “s” don’t get any results for TiefenmesSschieber | Very hard to fix                                             |
| bügelmessschraube  | Doesn’t find the right products because products are abbreviated as “Bügelmessschr.” | Product data issue                                           |
| klopapier          | Synonym for “Toilettenpapier”                                | Please set up synonyms yourself                              |
| duebel             | Doesn’t find products when “ä” is “ae”–that should work for all Umlaute | Fixed                                                        |
| Fein               | Fein electronics, since they are an A brand                  | There is a ticket for manufacturer boost in the backlog      |
| Handwaschpaste     | Doesn’t find category                                        | bug                                                          |

**A final remark**: Search problems are very often data quality problems. Search cannot fix issues of missing attributes, bad product descriptions or wrong categorizations. In general: the better the underlying document material, the better the search experience.
