---
title: Navigation feature overview
description: The navigation is built in a tree structure to support multiple levels of linking, e.g. to categories, external links, search results and CMS pages.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/hierarchical-navigation
originalArticleId: 17a4e454-bb06-45df-ab7a-522b5184b1f6
redirect_from:
  - /v3/docs/hierarchical-navigation
  - /v3/docs/en/hierarchical-navigation
  - /v3/docs/content-based-shop-navigation
  - /v3/docs/en/content-based-shop-navigation
  - /v3/docs/navigation
  - /v3/docs/en/navigation
  - /v3/docs/product-based-shop-navigation
  - /v3/docs/en/product-based-shop-navigation
---

The Spryker Commerce OS navigation is built in a tree structure to support multiple levels of linking to:

* categories
* external links
* search results
* CMS pages, etc.

Breadcrumbs help your customers navigate through your shop easily by highlighting the path to the page they are on. Breadcrumbs appear on product details, catalog and checkout pages.

Customize your store's navigation in the **Back Office** and add, edit or delete elements. Build relationships to pages outside the store, to support SEO capabilities through backlinks for improved ranking, or special promotions. Easily set validity dates for your navigational elements. Breadcrumbs highlight the path to the page the user is on.

* Define different types of navigation (any sort of list) that can be placed anywhere in the shop and can be administrated manually
* Validity dates
* Links to internal & external URLs
* Auto-suggest to create links to category & CMS pages

## Current Constraints
Currently, the feature has the following functional constraints which are going to be resolved in the future:

* Navigation elements are hardcoded inside templates and inherit their store relation.
* If a template is implemented in a store, its navigation elements are shown there too
