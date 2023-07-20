---
title: Spryker Search
description: Build an effective search and let customers find what they are looking for.
last_updated: June 27, 2023
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/search-summary
originalArticleId: 1e96b0d0-262f-4ab0-bc56-8c75b127ee08
redirect_from:
  - /2021080/docs/search-summary
  - /2021080/docs/en/search-summary
  - /docs/search-summary
  - /docs/en/search-summary
  - /docs/scos/user/features/202200.0/search-feature-overview/search-feature-overview.html
  - /docs/scos/user/features/202212.0/search-feature-overview/search-feature-overview.html
  - /docs/pbc/all/search/202212.0/search-feature-overview/search-feature-walkthrough.html
  - /docs/pbc/all/search/202212.0/search-feature-overview/search-feature-overview.html
  - /docs/pbc/all/search/202212.0/search-feature-overview/search-types-overview.html
  - /docs/pbc/all/search/202212.0/best-practices/search-best-practices.html
  - /docs/pbc/all/search/202212.0/manage-in-the-back-office/log-into-the-back-office.html
---

Spryker is shipped with Elasticsearch as the default search solution. Elasticsearch provides all the basic search functionalities. You can extend or customize it to fit your needs.

## Indexed entities

By default, the following information is indexed:

- Products (Abstract & Concrete level information)
- Product Reviews
- CMS pages

### Products

Everything you have on the product details page is indexed. Therefore, it is important that you provide full and accurate information here, like a complete title (for example, not just *Samsung Galaxy A03*, but *Samsung Galaxy A03 Core 2/32GB Blue*), descriptions, or manufacturer information.
The indexed [Product attribute](/docs/scos/user/features/{{page.version}}/product-rating-and-reviews-feature-overview.html) values help customers refine their search. Therefore, it is important that your list of attribute is complete and precise. For information about creating the product attributes, see [Create product attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html).

### Product Reviews

The indexed content includes summary and description of [product reviews](/docs/scos/user/features/{{page.version}}/product-rating-and-reviews-feature-overview.html). If any of the text from either summary or description matches the search query, the product appears on a search result page.

### CMS pages

Information from the CMS pages is indexed just like the information from the product details page. So if user searches for something that occurs on any of the CMS pages, the CMS page appears in the search results. For information about how you can create CMS pages, see [Creating CMS pages](/docs/pbc/all/content-management-system/{{page.version}}/manage-in-the-back-office/pages/create-cms-pages.html)

## Search types supported

### Full-site search

The default full-site search has the following functionality:

* *Fuzzy search*: Suggests search results that do not exactly match the search request.
* *Auto-completion*: Helps customers by predicting the rest of a search string and offers a list of matching options.
* *Search suggestions*: Proposes on-the-fly page suggestions for products, categories, or CMS Pages.
* *Did-you-mean*: Offers typo corrections for the search string.
* *Mimic a dynamic category* by saving a search result and embedding it like a category page in your navigation.

### Multi-language search

If you set up a multi-language store, the search function automatically checks and adjusts the language your customer has selected. All search functions, such as auto-complete or auto-suggest, are then applied to the selected language.

### Textual search

By default, all content on CMS and Product Pages, such as product name, description text, or allocated attributes, is searchable. Additionally, Product attributes can be boosted in the search results. You can easily define which products or content to include in or exclude from the full-text search.
