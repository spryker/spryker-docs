---
title: Search feature overview
description: Learn everything you need to know about the Spryker Search Feature with this helpful overview.
last_updated: Jul 6, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/search-summary
originalArticleId: 1e96b0d0-262f-4ab0-bc56-8c75b127ee08
redirect_from:
  - /docs/scos/user/features/202005.0/search-feature-overview/search-preferences.html
  - /docs/scos/user/features/202009.0/search-feature-overview/search-feature-overview.html
  - /docs/scos/user/features/202108.0/search-feature-overview/search-feature-overview.html
  - /docs/scos/user/features/202200.0/search-feature-overview/search-feature-overview.html
  - /docs/scos/user/features/202311.0/search-feature-overview/search-feature-overview.html
  - /docs/pbc/all/search/202311.0/search-feature-overview/search-feature-walkthrough.html
  - /docs/pbc/all/search/202311.0/search-feature-overview/search-feature-overview/search-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202204.0/search-feature-walkthrough.html
  - /docs/scos/user/features/202204.0/search-feature-overview/search-feature-overview.html
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
The indexed content includes summary and description of [product reviews](/docs/pbc/all/ratings-reviews/{{page.version}}/ratings-and-reviews.html).

**Product attributes**
The indexed [Product attribute](/docs/pbc/all/ratings-reviews/{{page.version}}/ratings-and-reviews.html) values help customers refine their search. Therefore, it is important that your list of attribute is complete and precise. For information about creating the product attributes, see [Create product attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html).

**CMS pages**
Information from the CMS pages is indexed just like the information from the product details page. So if user searches for something that occurs on any of the CMS pages, the CMS page appears in the search results. For information about how you can create CMS pages, see [Creating CMS pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/pages/create-cms-pages.html)

## Current constraints

The feature has the following functional constraints which are going to be resolved in the future.
* Search preference attributes are shared across all the stores in a project.
* You cannot define a search preference for a single store.


## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Best practices: Promote products with search preferences](/docs/pbc/all/search/{{page.version}}/base-shop/manage-in-the-back-office/best-practices-promote-products-with-search-preferences.html) |
| [Define search preferences](/docs/pbc/all/search/{{page.version}}/base-shop/manage-in-the-back-office/define-search-preferences.html) |
| [Edit search preferences](/docs/pbc/all/search/{{page.version}}/base-shop/manage-in-the-back-office/edit-search-preferences.html) |

## Related Developer documents

| INSTALLATION GUIDES  | UPGRADE GUIDES | DATA IMPORT | GLUE API GUIDES  | TUTORIALS AND HOWTOS | BEST PRACTICES |
|---------|---------|-|-|-|-|
| [Install the Catalog Glue API](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/install-features-and-glue-api/install-the-catalog-glue-api.html)  | [Upgrade the Catalog module](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-catalog-module.html) | [File details: product_search_attribute_map.csv](/docs/pbc/all/search/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-search-attribute-map.csv.html) | [Searching the product catalog](/docs/pbc/all/search/{{page.version}}/base-shop/manage-using-glue-api/glue-api-search-the-product-catalog.html) | [Tutorial: Content and search - attribute-cart-based catalog personalization](/docs/pbc/all/search/{{page.version}}/base-shop/tutorials-and-howtos/tutorial-content-and-search-attribute-cart-based-catalog-personalization/tutorial-content-and-search-attribute-cart-based-catalog-personalization.html) | [Data-driven ranking](/docs/pbc/all/search/{{page.version}}/base-shop/best-practices/data-driven-ranking.html) |
| [Install the Catalog + Category Management feature](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/install-features-and-glue-api/install-the-catalog-category-management-feature.html) | [Upgrade the CatalogSearchRestApi module](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-catalogsearchrestapi-module.html) | [File details: product_search_attribute.csv](/docs/pbc/all/search/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-search-attribute.csv.html) | [Retrieving autocomplete and search suggestions](/docs/pbc/all/search/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-autocomplete-and-search-suggestions.html)  | [Tutorial: Boosting cart-based search](/docs/pbc/all/search/{{page.version}}/base-shop/tutorials-and-howtos/tutorial-content-and-search-attribute-cart-based-catalog-personalization/tutorial-boost-cart-based-search.html) | [Full-text search](/docs/pbc/all/search/{{page.version}}/base-shop/best-practices/full-text-search.html) |
| [Install the Catalog + Order Management feature](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/install-features-and-glue-api/install-the-catalog-order-management-feature.html) | [Upgrade the CategoryPageSearch module](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-categorypagesearch-module.html) | | | [Configure a search query](/docs/pbc/all/search/{{page.version}}/base-shop/tutorials-and-howtos/configure-a-search-query.html) | [Generic faceted search](/docs/pbc/all/search/{{page.version}}/base-shop/best-practices/generic-faceted-search.html) |
| [Install the Search Widget for Concrete Products feature](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/install-features-and-glue-api/install-the-search-widget-for-concrete-products.html) |  [Upgrade the CmsPageSearch module](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmspagesearch-module.html) | | | [Configure Elasticsearch](/docs/pbc/all/search/{{page.version}}/base-shop/tutorials-and-howtos/configure-elasticsearch.html) | [Multi-term autocompletion](/docs/pbc/all/search/{{page.version}}/base-shop/best-practices/multi-term-auto-completion.html) |
| |  [Upgrade the ProductLabelSearch module](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productlabelsearch-module.html) | | | [Configure search features](/docs/pbc/all/search/{{page.version}}/base-shop/tutorials-and-howtos/configure-search-features.html) | [Naive product centric approach](/docs/pbc/all/search/{{page.version}}/base-shop/best-practices/naive-product-centric-approach.html) |
| |  [Upgrade the ProductListSearch module](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productlistsearch-module.html) | | | [Configure search for multi-currency](/docs/pbc/all/search/{{page.version}}/base-shop/tutorials-and-howtos/configure-search-for-multi-currency.html) | [On-site search](/docs/pbc/all/search/{{page.version}}/base-shop/best-practices/on-site-search.html) |
| |  [Upgrade the ProductPageSearch module](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpagesearch-module.html) | | | [Expand search data](/docs/pbc/all/search/{{page.version}}/base-shop/tutorials-and-howtos/expand-search-data.html) | [Other best practices](/docs/pbc/all/search/{{page.version}}/base-shop/best-practices/other-best-practices.html) |
| |  [Upgrade the ProductReviewSearch module](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productreviewsearch-module.html) | | | [Facet filter overview and configuration](/docs/pbc/all/search/{{page.version}}/base-shop/tutorials-and-howtos/facet-filter-overview-and-configuration.html) | [Personalization - dynamic pricing](/docs/pbc/all/search/{{page.version}}/base-shop/best-practices/personalization-dynamic-pricing.html) |
| |  [Upgrade the ProductSetPageSearch module](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productsetpagesearch-module.html) | | | [Tutorial: Integrate any search engine into a project](/docs/pbc/all/search/{{page.version}}/base-shop/tutorials-and-howtos/tutorial-integrate-any-search-engine-into-a-project.html) | [Precise search by super attributes](/docs/pbc/all/search/{{page.version}}/base-shop/best-practices/precise-search-by-super-attributes.html) |
| | [Upgrade the Search module](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-search–module.html) | | | | [Simple spelling suggestions](/docs/pbc/all/search/{{page.version}}/base-shop/best-practices/simple-spelling-suggestions.html) |
| | [Upgrade search initialization](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-search-initialization.html) | | | | [Usage-driven schema and document structure](/docs/pbc/all/search/{{page.version}}/base-shop/best-practices/usage-driven-schema-and-document-structure.html) |
| | [Search migration concept](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/search-migration-concept.html) | | | | |
