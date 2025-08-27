---
title: Facet filter overview and configuration
description: Learn how to configure Facet filters allowing customers to quickly locate products within your Spryker shop.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-working-filter-facets
originalArticleId: ec19f80a-9fad-4f44-8d60-8957e2665e0e
redirect_from:
  - /2021080/docs/t-working-filter-facets
  - /2021080/docs/en/t-working-filter-facets
  - /docs/t-working-filter-facets
  - /docs/en/t-working-filter-facets
  - /v6/docs/t-working-filter-facets
  - /v6/docs/en/t-working-filter-facets
  - /v5/docs/t-working-filter-facets
  - /v5/docs/en/t-working-filter-facets
  - /v4/docs/t-working-filter-facets
  - /v4/docs/en/t-working-filter-facets
  - /v3/docs/t-working-filter-facets
  - /v3/docs/en/t-working-filter-facets
  - /v2/docs/t-working-filter-facets
  - /v2/docs/en/t-working-filter-facets
  - /v1/docs/t-working-filter-facets
  - /v1/docs/en/t-working-filter-facets
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/search/facet-filter-overview-and-configuration.html
  - /docs/pbc/all/search/202311.0/tutorials-and-howtos/facet-filter-overview-and-configuration.html
related:
  - title: Configure Elasticsearch
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-elasticsearch.html
  - title: Configure search for multi-currency
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-search-for-multi-currency.html
  - title: Configure search features
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-search-features.html
  - title: Configure a search query
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-a-search-query.html
  - title: Expand search data
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/expand-search-data.html
---

A search engine facilitates better navigation, allowing customers to quickly locate desired products.

The search engine returns a small number of items that match the query.

Facets provide aggregated data based on a search query. For example, you need to query for all the shirts that are in blue. The search engine has configured a facet on a category and one on the color attribute. Therefore, the search query is executed using these two facets. The search result returns the entries that are aggregated both in the category facet with the shirt category ID and in the color facet with the value blue.

## Category facet filter

`CatalogClient` enables creating a search query when a request is submitted. `CatalogClient` exposes the operation:

- `catalogSearch($searchString, array $requestParameters = [])`

The operation can contain other facet filters (such as color or size)  in the request.

On the category detail page, `catalogSearch($searchString, $parameters)` must be used, as in the following example:

```php
<?php
 public function indexAction(array $categoryNode, Request $request)
    {
        $idCategoryNode = $categoryNode['node_id'];

        $viewData = $this->executeIndexAction($categoryNode, $idCategoryNode, $request);

        return $this->view(
            $viewData,
            $this->getFactory()->getCatalogPageWidgetPlugins(),
            $this->getCategoryNodeTemplate($idCategoryNode)
        );
    }

    protected function executeIndexAction(array $categoryNode, int $idCategoryNode, Request $request): array
    {
        $searchString = $request->query->get('q', '');
        $idCategory = $categoryNode['id_category'];
        $isEmptyCategoryFilterValueVisible = $this->getFactory()
            ->getModuleConfig()
            ->isEmptyCategoryFilterValueVisible();

        $parameters = $this->getAllowedRequestParameters($request);
        $parameters[PageIndexMap::CATEGORY] = $idCategoryNode;

        $searchResults = $this
            ->getFactory()
            ->getCatalogClient()
            ->catalogSearch($searchString, $parameters);

        $searchResults = $this->reduceRestrictedSortingOptions($searchResults);
        $searchResults = $this->updateFacetFiltersByCategory($searchResults, $idCategory);
        $searchResults = $this->filterFacetsInSearchResults($searchResults);

        $metaTitle = isset($categoryNode['meta_title']) ? $categoryNode['meta_title'] : '';
        $metaDescription = isset($categoryNode['meta_description']) ? $categoryNode['meta_description'] : '';
        $metaKeywords = isset($categoryNode['meta_keywords']) ? $categoryNode['meta_keywords'] : '';

        $metaAttributes = [
            'idCategory' => $idCategory,
            'category' => $categoryNode,
            'isEmptyCategoryFilterValueVisible' => $isEmptyCategoryFilterValueVisible,
            'pageTitle' => ($metaTitle ?: $categoryNode['name']),
            'pageDescription' => $metaDescription,
            'pageKeywords' => $metaKeywords,
            'searchString' => $searchString,
            'viewMode' => $this->getFactory()
                ->getCatalogClient()
                ->getCatalogViewMode($request),
        ];

        return array_merge($searchResults, $metaAttributes);
    }
```

**Example:**

Making a request on the URL `https://mysprykershop.com/en/computers/notebooks` in Demoshop is routed to the `CatalogController:indexAction` controller action, which is designated for a category detail page.

A facet search is executed using the category facet with the provided category node as a parameter.

## Configure facet filters

The category facet is a special case and needs to be handled this way because a call needs to be made to the key-value store (Redis or Valkey) to retrieve the category node ID when a category detail page is requested.

Other than that, the `CatalogClient` operation can handle requests that contain other facet filters.

You can integrate as many facet filters in your search query, as long as they are configured. The facet configuration is done in the `CatalogDependencyProvider` class.

{% info_block warningBox %}

The configuration you make in `CatalogDependencyProvider` must be in sync with the structure of the data exported to Elasticsearch.

However, even if you have the facets exported in Elasticsearch, without adding the necessary configuration in `CatalogDependencyProvider`, you can't submit the correct queries.

{% endinfo_block %}

The search attributes are configured in `CatalogDependencyProvider`.

**Example:**

```php
<?php
    protected function getFacetConfigTransferBuilderPlugins()
    {
        return [
            new CategoryFacetConfigTransferBuilderPlugin(),
            new PriceFacetConfigTransferBuilderPlugin(),
            new RatingFacetConfigTransferBuilderPlugin(),
            new ProductLabelFacetConfigTransferBuilderPlugin(),
        ];
    }

    protected function createCatalogSearchResultFormatterPlugins()
    {
        return [
            new FacetResultFormatterPlugin(),
            new SortedResultFormatterPlugin(),
            new PaginatedResultFormatterPlugin(),
            new CurrencyAwareCatalogSearchResultFormatterPlugin(
                new RawCatalogSearchResultFormatterPlugin()
            ),
            new SpellingSuggestionResultFormatterPlugin(),
        ];
    }
```

Adding the price attribute to the configuration as an active facet lets you filter the products on the value of this attribute.

The `https://mysprykershop.com/en/computers/notebooks?price=0-300` request performs a search using the category and price facets. It returns the products under the notebooks category with a price range between 0 and 300.

The `https://mysprykershop.com/search?q=tablet&price=0-300` request performs a full-text search with the search string tablet and with the facet filter price (price in the range 0-300).
