---
title: Search types overview
originalLink: https://documentation.spryker.com/2021080/docs/search-types-overview
redirect_from:
  - /2021080/docs/search-types-overview
  - /2021080/docs/en/search-types-overview
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

See [Managing search preferences](https://documentation.spryker.com/docs/managing-search-preferences) for details on how you can manage the search preferences.

## Current constraints

Currently, the feature has the following functional constraints:

* Search preference attributes are shared across all the stores in a project.
* You cannot define a search preference for a single store.

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
            <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/retrieving-suggestions-for-auto-completion-and-search" class="mr-link">Retrieve suggestions for auto-completion and search via Glue API</a></li>
               </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
               <li><a href="https://documentation.spryker.com/docs/managing-search-preferences" class="mr-link">Manage serach preferences</a></li>           
            </ul>
        </div>
    </div>
</div>
