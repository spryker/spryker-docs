---
title: Using Algolia Search for Custom Entity Indexes
description: Learn how to enable Algolia search for custom entities, such as Docs, in your Spryker-based project.
template: howto-guide-template
---

This guide explains how to enable Algolia search for custom entities, such as Docs, in your Spryker application by mapping them to a custom Algolia index.

By following this guide, you will be able to:
- Integrate Algolia search for entities other than products and CMS pages (for example, Docs, Blog, or any custom entity).
- Configure entity mapping to a custom Algolia index for English language content.

## Prerequisites

- You have already [configured Algolia](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/configure-algolia.html) in your Spryker project.
- You have an Algolia index created for your custom entity (for example, Docs) and populated with relevant data, for example, using the Algolia Crawler.
- You have access to Spryker Back Office and the Algolia Dashboard.

## Step-by-step instructions

1. In your store's Back Office, go to **Apps** and open the Algolia app details page.
2. Click **Configure** in the top right corner.
3. In the configuration pane, locate the setting **Use Algolia instead of Elasticsearch for other entities** and enable it.
4. For each custom entity (for example, Docs), provide the following information:
    - **Entity Name**: `document` (used as `sourceIdentifier` in plugins)
    - **Store**: `US` (or `*` for all stores)
    - **Locales**: `en_US` (or `*` for all locales)
    - **Algolia Index Name**: `documents_en` (the name of your Algolia index for Docs in English)
5. Save your changes.
6. Implement a custom controller or page in your Spryker project to retrieve search results from Algolia using the Spryker `Search` module and [ACP Algolia App](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/algolia). Example:

```php
// src/Pyz/Yves/DocsPage/Controller/SearchController.php

namespace Pyz\Yves\DocsPage\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Spryker\Client\SearchHttp\Plugin\Catalog\Query\SearchHttpQueryPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\QueryExpander\BasicSearchHttpQueryExpanderPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\QueryExpander\FacetSearchHttpQueryExpanderPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\FacetSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\PaginationSearchHttpResultFormatterPlugin;

class SearchController extends AbstractController
{
    public function searchAction(Request $request): Response
    {
        $searchString = $request->query->get('q', '');
        $searchContext = (new SearchContextTransfer())
            ->setSourceIdentifier('document'); // Entity Name

        $searchQuery = new SearchHttpQueryPlugin($searchContext);
        $searchQuery->setSearchString($searchString);
        
        $searchQueryExpanders = [
            new BasicSearchHttpQueryExpanderPlugin(), // Adds pagination and sorting from the URL query
            new FacetSearchHttpQueryExpanderPlugin(), // Adds facets from the URL query, excluding reserved parameters for sorting, pagination, and query. For example: color=red, size=42
        ];
        
        // Add $container->getLocator()->search()->client() in the DocsPageDependencyProvider module to use it.
        $searchClient = $this->getFactory()->getSearchClient();        
        $searchClient->expandQuery($searchQuery, $searchQueryExpanders, $request->query->all());
        
        $resultFormatters = [
            new class extends AbstractPlugin implements \Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface {
                public function getName(): string
                {
                    return 'hits';
                }

                /**
                 * @param \Generated\Shared\Transfer\SearchHttpResponseTransfer $searchResult
                 * @param array<string, mixed> $requestParameters
                 *
                 * @return array<string, mixed>
                 */
                public function formatResult($searchResult, array $requestParameters = []): array
                {
                    return $searchResult->getItems();
                }
            },
            new PaginationSearchHttpResultFormatterPlugin(), // Extracts pagination data from the response, see PaginationSearchResultTransfer
            new FacetSearchHttpResultFormatterPlugin(), // Extracts facets list from the response
            // Add additional expanders here
        ];
        
        $searchResponse = $searchClient->search($searchRequest, $resultFormatters, $request->query->all());
        
        return $this->view(['results' => $searchResponse['hits'], $searchResponse['pagination'], $searchResults['facets']], [], 'docs/search/results.twig');
    }
}
```

7. Similar to the Yves controller, implement a Glue controller to expose the search results via API.
8. Optionally, you can also enable Docs suggestions in the search autocomplete widget. Example:

```php
use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\SearchExtension\Dependency\Plugin\GroupedResultFormatterPluginInterface;
use Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface;

class DocsSuggestionsSearchHttpResultFormatterPlugin extends AbstractPlugin  implements ResultFormatterPluginInterface, GroupedResultFormatterPluginInterface
{
    public function getGroupName(): string
    {
        return 'suggestionByType';
    }

    public function getName(): string
    {
        return 'document'; // Entity Name
    }

    /**
     * @param \Generated\Shared\Transfer\SuggestionsSearchHttpResponseTransfer $searchResult
     * @param array<string, mixed> $requestParameters
     *
     * @return array<int, mixed>
     */
    public function formatResult($searchResult, array $requestParameters = [])
    {
        return $searchResult->getMatchedItemsBySourceIdentifiers()['document'] ?? [];
    }
}
```

Enable the plugin in `CatalogDependencyProvider`:

```php
// src/Pyz/Client/Catalog/CatalogDependencyProvider.php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return array<string, array<\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface>>
     */
    protected function createSuggestionResultFormatterPluginVariants(): array
    {
        return [
            \Spryker\Shared\SearchHttp::TYPE_SUGGESTION_SEARCH_HTTP => [
                new CompletionSearchHttpResultFormatterPlugin(),
                new CurrencyAwareCatalogSearchHttpResultFormatterPlugin(
                    new ProductSuggestionSearchHttpResultFormatterPlugin(),
                ),
                new CategorySuggestionsSearchHttpResultFormatterPlugin(),
                new CmsPageSuggestionsSearchHttpResultFormatterPlugin(),
                new DocsSuggestionsSearchHttpResultFormatterPlugin(), // New plugin for Docs suggestions
            ],
        ];
    }
}
```

9. Verify that your Docs entity is searchable in Spryker Yves and Glue API applications.

## Summary

After completing these steps, Algolia search will be enabled for your custom entity (Docs) in English for the defined store.
Users will be able to search Docs content using Algolia-powered search in your Spryker application.

## Related articles

- [Additional configuration: Use Algolia for other entities](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/configure-algolia.html#additional-configuration-use-algolia-for-other-entities)
