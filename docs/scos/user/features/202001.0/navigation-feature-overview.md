---
title: Navigation feature overview
description: The navigation is built in a tree structure to support multiple levels of linking, e.g. to categories, external links, search results and CMS pages.
last_updated: Mar 17, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v4/docs/hierarchical-navigation
originalArticleId: 775fa773-2f07-4b99-978e-8e742ce24c8f
redirect_from:
  - /v4/docs/hierarchical-navigation
  - /v4/docs/en/hierarchical-navigation
  - /v4/docs/content-based-shop-navigation
  - /v4/docs/en/content-based-shop-navigation
  - /v4/docs/navigation
  - /v4/docs/en/navigation
  - /v4/docs/product-based-shop-navigation
  - /v4/docs/en/product-based-shop-navigation
---

The Spryker Commerce OS navigation is built in a tree structure to support multiple levels of linking to:

* categories
* external links
* search results
* CMS pages, etc.

Breadcrumbs help your customers navigate through your shop easily by highlighting the path to the page they are on. They appear on product details, catalog and checkout pages.

Customize your store's navigation in the **Back Office** and add, edit or delete elements. Build relationships to pages outside the store, to support SEO capabilities through backlinks for improved ranking, or special promotions. Easily set validity dates for your navigational elements. Breadcrumbs highlight the path to the page the user is on.

* Define different types of navigation (any sort of list) that can be placed anywhere in the shop and can be administrated manually
* Validity dates
* Links to internal & external URLs
* Auto-suggest to create links to category & CMS pages

## Current Constraints
Currently, the feature has the following functional constraints which are going to be resolved in the future:

* Navigation elements are hardcoded inside templates and inherit their store relation.
* If a template is implemented in a store, its navigation elements are shown there too
