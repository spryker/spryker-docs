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
  - /docs/scos/user/features/202200.0/search-feature-overview/search-feature-overview.html
---

Spryker is shipped with Elasticsearch as the default search solution. Elasticsearch provides all the basic search functionalities. You can extend or customize it to fit your needs.

By default, the following information is indexed:

- General product information (name, description, SKU)
- Product reviews
- Product attributes
- CMS pages

**General product information**
Everything you have on the product details page is indexed. Therefore, it is important that you provide full and accurate information here, like a complete title (for example, not just *Samsung Galaxy A03*, but *Samsung Galaxy A03 Core 2/32GB Blue*), descriptions, or manufacturer information.

**Product reviews**
The indexed content includes summary and description of [product reviews](/docs/scos/user/features/{{page.version}}/product-rating-and-reviews-feature-overview.html). If any of the text from either summary or description matches the search query, the product appears on a search result page.

**Product attributes**
The indexed [Product attribute](/docs/scos/user/features/{{page.version}}/product-rating-and-reviews-feature-overview.html) values help customers refine their search. Therefore, it is important that your list of attribute is complete and precise. For information about creating the product attributes, see [Create product attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html).

**CMS pages**
Information from the CMS pages is indexed just like the information from the product details page. So if user searches for something that occurs on any of the CMS pages, the CMS page appears in the search results. For information about how you can create CMS pages, see [Creating CMS pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/pages/create-cms-pages.html)

## Current constraints

The feature has the following functional constraints which are going to be resolved in the future.
* Search preference attributes are shared across all the stores in a project.
* You cannot define a search preference for a single store.

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Search feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/search-feature-walkthrough.html) for developers.

{% endinfo_block %}
