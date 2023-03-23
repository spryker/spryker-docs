---
title: Search
description: Build an effective search and let customers find what they are looking for.
last_updated: Feb 23, 2023
template: concept-topic-template
redirect_from:
  - /docs/scos/user/features/202212.0/search-feature-overview/search-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202212.0/search-feature-walkthrough.html
---

Search is one of the most effective navigation tools in modern shops. The Search capability lets you create the right search for your shop and enables customers to quickly find what they are looking for.

The Search capability comes with a variety of functionalities to make your customer's search experience smoother and more efficient.

**Fuzzy Search**
Suggests search results that do not precisely match the search request.
**Auto-completion & Suggestions**
Helps customers by predicting the rest of a search string and offers a list of matching options, and on-the-fly page suggestions for products, categories, or CMS pages.
**Did-you-mean**
Offers typo corrections for a search string.
**Mimic a Dynamic Category**
Leverages the search URL and uses it as a link within your navigation. This makes it look like a category to a user, but enables you to create more sophisticated categories.

A successful search engine optimization is done through five steps.

1) Building a search index
2) Defining sorting criteria & formula
3) Measuring KPIs and Metrics
4) Testing your strategy
5) Going live with your search operation

Spryker's search capability will enable you to pursue each of those steps to their fullest.



## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Best practices: Promote products with search preferences](/docs/pbc/all/search/{{page.version}}/manage-in-the-back-office/best-practices-promote-products-with-search-preferences.html) |
| [Define search preferences](/docs/pbc/all/search/{{page.version}}/manage-in-the-back-office/define-search-preferences.html) |
| [Edit search preferences](/docs/pbc/all/search/{{page.version}}/manage-in-the-back-office/edit-search-preferences.html) |

## Related Developer articles

| INSTALLATION GUIDES  | UPGRADE GUIDES | DATA IMPORT | GLUE API GUIDES  | TUTORIALS AND HOWTOS | BEST PRACTICES |
|---------|---------|-|-|-|-|
| [Install the Catalog Glue API](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/install-features-and-glue-api/install-the-catalog-glue-api.html)  | [Upgrade the Catalog module](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-catalog-module.html) | [File details: product_search_attribute_map.csv](/docs/pbc/all/search/{{page.version}}/import-data/file-details-product-search-attribute-map.csv.html) | [Searching the product catalog](/docs/pbc/all/search/{{page.version}}/manage-using-glue-api/glue-api-search-the-product-catalog.html) | [Tutorial: Content and search - attribute-cart-based catalog personalization](/docs/pbc/all/search/{{page.version}}/tutorials-and-howtos/tutorial-content-and-search-attribute-cart-based-catalog-personalization/tutorial-content-and-search-attribute-cart-based-catalog-personalization.html) | [Data-driven ranking](/docs/pbc/all/search/{{page.version}}/best-practices/data-driven-ranking.html) |
| [Install the Catalog + Category Management feature](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/install-features/install-the-catalog-category-management-feature.html) | [Upgrade the CatalogSearchRestApi module](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-catalogsearchrestapi–module.html) | [File details: product_search_attribute.csv](/docs/pbc/all/search/{{page.version}}/import-data/file-details-product-search-attribute.csv.html) | [Retrieving autocomplete and search suggestions](/docs/pbc/all/search/{{page.version}}/manage-using-glue-api/glue-api-retrieve-autocomplete-and-search-suggestions.html)  | [Tutorial: Boosting cart-based search](/docs/pbc/all/search/{{page.version}}/tutorials-and-howtos/tutorial-content-and-search-attribute-cart-based-catalog-personalization/tutorial-boosting-cart-based-search.html) | [Full-text search](/docs/pbc/all/search/{{page.version}}/best-practices/full-text-search.html) |
| [Install the Catalog + Order Management feature](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/install-features/install-the-catalog-order-management-feature.html) | [Upgrade the CategoryPageSearch module](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-categorypagesearch–module.html) | | | [Configure a search query](/docs/pbc/all/search/{{page.version}}/tutorials-and-howtos/configure-a-search-query.html) | [Generic faceted search](/docs/pbc/all/search/{{page.version}}/best-practices/generic-faceted-search.html) |
| [Install the Search Widget for Concrete Products feature](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/install-features-and-glue-api/install-the-search-widget-for-concrete-products.html) |  [Upgrade the CmsPageSearch module](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-cmspagesearch–module.html) | | | [Configure Elasticsearch](/docs/pbc/all/search/{{page.version}}/tutorials-and-howtos/configure-elasticsearch.html) | [Multi-term autocompletion](/docs/pbc/all/search/{{page.version}}/best-practices/multi-term-auto-completion.html) |
| |  [Upgrade the ProductLabelSearch module](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-productlabelsearch–module.html) | | | [Configure search features](/docs/pbc/all/search/{{page.version}}/tutorials-and-howtos/configure-search-features.html) | [Naive product centric approach](/docs/pbc/all/search/{{page.version}}/best-practices/naive-product-centric-approach.html) |
| |  [Upgrade the ProductListSearch module](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-productlistsearch–module.html) | | | [Configure search for multi-currency](/docs/pbc/all/search/{{page.version}}/tutorials-and-howtos/configure-search-for-multi-currency.html) | [On-site search](/docs/pbc/all/search/{{page.version}}/best-practices/on-site-search.html) |
| |  [Upgrade the ProductPageSearch module](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-productpagesearch–module.html) | | | [Expand search data](/docs/pbc/all/search/{{page.version}}/tutorials-and-howtos/expand-search-data.html) | [Other best practices](/docs/pbc/all/search/{{page.version}}/best-practices/other-best-practices.html) |
| |  [Upgrade the ProductReviewSearch module](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-productreviewsearch–module.html) | | | [Facet filter overview and configuration](/docs/pbc/all/search/{{page.version}}/tutorials-and-howtos/facet-filter-overview-and-configuration.html) | [Personalization - dynamic pricing](/docs/pbc/all/search/{{page.version}}/best-practices/docs/pbc/all/search/{{page.version}}/best-practices/personalization-dynamic-pricing.html) |
| |  [Upgrade the ProductSetPageSearch module](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-productsetpagesearch–module.html) | | | [Tutorial: Integrate any search engine into a project](/docs/pbc/all/search/{{page.version}}/tutorials-and-howtos/tutorial-integrate-any-search-engine-into-a-project.html) | [Precise search by super attributes](/docs/pbc/all/search/{{page.version}}/best-practices/precise-search-by-super-attributes.html) |
| | [Upgrade the Search module](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-search–module.html) | | | | [Simple spelling suggestions](/docs/pbc/all/search/{{page.version}}/best-practices/simple-spelling-suggestions.html) |
| | [Upgrade search initialization](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/upgrade-search-initialization.html) | | | | [Usage-driven schema and document structure](/docs/pbc/all/search/{{page.version}}/best-practices/usage-driven-schema-and-document-structure.html) |
| | [Search migration concept](/docs/pbc/all/search/{{page.version}}/install-and-upgrade/search-migration-concept.html) | | | | |
