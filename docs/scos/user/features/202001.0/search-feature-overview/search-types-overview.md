---
title: Search types overview
redirect_from:
  - /v4/docs/full-site-search
  - /v4/docs/en/full-site-search
  - /v4/docs/textual-search
  - /v4/docs/en/textual-search
  - /v4/docs/multi-language-search
  - /v4/docs/en/multi-language-search
template: concept-topic-template
---

This document describes the default search types shipped with the *Search* feature.


## Full-site search
The default full-site search has the following functionality:

* *Fuzzy search*: Suggests search results that do not exactly match the search request.
* *Auto-completion*: Helps customers by predicting the rest of a search string and offers a list of matching options.
* *Search suggestions*: Proposes on-the-fly page suggestions for products, categories, or CMS Pages.
* *Did-you-mean*: Offers typo corrections for the search string.
* *Mimic a dynamic category* by saving a search result and embedding it like a category page in your navigation.

## Multi-language search
If you set up a multi-language store, the search function automatically checks and adjusts the language your customer has selected. All search functions, such as auto-complete or auto-suggest, are then applied to the selected language.

## Textual search
By default, all content on CMS and Product Pages, such as product name, description text, or allocated attributes, is searchable. Additionally, Product Attributes and can be boosted in the search results. You can easily define which products or content should be included into or excluded from the full-text search.

See [Managing search preferences](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/search-and-filters/managing-search-preferences.html) for details on how you can manage the search preferences.

## Current constraints

Currently, the feature has the following functional constraints:

* Search preference attributes are shared across all the stores in a project.
* You cannot define a search preference for a single store.

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Manage search preferences](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/search-and-filters/managing-search-preferences.html)  |