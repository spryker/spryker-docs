---
title: Search feature overview
last_updated: Jul 6, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/search-summary
originalArticleId: 1e96b0d0-262f-4ab0-bc56-8c75b127ee08
redirect_from:
  - /2021080/docs/search-summary
  - /2021080/docs/en/search-summary
  - /docs/search-summary
  - /docs/en/search-summary
---

Spryker is shipped with Elasticsearch as the default search solution. Elasticsearch provides all the basic search functionalities. You can extend or customize it to fit your needs.

By default, the following information is indexed:
- General product information (name, description, SKU, etc.)
- Product reviews
- Product attributes
- CMS pages

**General product information**
Everything you have on the product details page is indexed. Therefore, it is important that you provide full and accurate information here, like a complete title (for example, not just *Samsung Galaxy A03*, but *Samsung Galaxy A03 Core 2/32GB Blue*), descriptions, manufacturer information, etc.

**Product reviews**
The indexed content includes summary and description of [product reviews](/docs/scos/user/features/{{page.version}}/product-rating-and-reviews-feature-overview.html). If any of the text from either summary or description matches the search query, the product appears on a search result page.

**Product attributes**
The indexed [Product attribute](/docs/scos/user/features/{{page.version}}/product-rating-and-reviews-feature-overview.html) values help customers refine their search. Therefore, it is important that your list of attribute is complete and precise. See [Creating product attributes](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/creating-product-attributes.html) for information on how to create the product attributes.

**CMS pages**
Information from the CMS pages is indexed just like the information from the product details page. So if user searches for something that occurs on any of the CMS pages, the CMS page appears in the search results. See [Creating CMS pages](/docs/scos/user/back-office-user-guides/{{page.version}}/content/pages/creating-cms-pages.html) for information on how you can create CMS pages.

## Current constraints

Currently, the feature has the following functional constraints which are going to be resolved in the future.

* Search preference attributes are shared across all the stores in a project.
* You cannot define a search preference for a single store.


{% info_block warningBox "Developer guides" %}

Are you a developer? See [Search feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/search-feature-walkthrough.html) for developers.

{% endinfo_block %}
