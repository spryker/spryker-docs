---
title: Search feature overview
last_updated: Apr 30, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/search
originalArticleId: ac2bd955-b455-4a52-81d6-a1987f0f4e8b
redirect_from:
  - /v6/docs/search
  - /v6/docs/en/search
  - /v6/docs/search-filter
  - /v6/docs/en/search-filter
---

Spryker provides a fully functional solution to integrate Elasticsearch as a search engine. You can extend this solution or customize it to fit your needs. 

This article describes the default Spryker search.

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

