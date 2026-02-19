---
title: Using Algolia search with custom indexes
description: Learn how to enable Algolia search for custom entities, such as Docs, in your Spryker-based project.
last_updated: Feb 20, 2026
template: howto-guide-template
---

The Algolia integration supports searching custom entities that are already indexed in Algolia but are not natively supported by the Spryker eco module—like products or CMS pages.
This is useful for read-only search scenarios where data indexing is managed externally: documents, manufacturers, locations, events, or any other custom business entity.

By following this guide, you will be able to do the following:
- Integrate Algolia search for entities other than products and CMS pages, such as docs or blogs.
- Configure entity mapping to custom Algolia indexes.

{% info_block infoBox "" %}

This feature does not index data, publish events, or manage index lifecycle. You need to populate Algolia indices separately—for example, using the Algolia Crawler or the Algolia API.

{% endinfo_block %}

## Prerequisites

- You have access to the Algolia account in the Algolia Dashboard.
- You have integrated Algolia search in your Spryker project. For details, see [Integrate Algolia](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/integrate-algolia.html).
- You have an Algolia index created for your custom entity—for example, Docs—and populated with relevant data, for example, using the Algolia Crawler.

It also helps to have the following knowledge:
- How Algolia indices are structured.
- The data schema of your entity in Algolia.
- Spryker's `SearchContext` and query plugin concepts.

## How it works

When a search request comes in, the search query plugin passes a source identifier to the Algolia search adapter. The adapter uses the entity-to-index mapping configuration to resolve the correct Algolia index name for the current store and locale, then executes the search query against that index.

```text
Storefront Search Request
        ↓
Search Query Plugin (with sourceIdentifier)
        ↓
AlgoliaSearchAdapterPlugin
        ↓
QueryApplicabilityChecker
        ↓ (checks entity-to-index mapping)
Entity-to-Index Mapping Config
        ↓
IndexNameResolver
        ↓ (resolves correct index name)
Algolia Search API
        ↓
Search Results
```

**Key components:**
- **Source identifier**: a unique string identifying your entity type, for example, `document` or `manufacturer`.
- **Index name**: the actual Algolia index name, for example, `prod-documents-de_de`.
- **Mapping configuration**: an array defining source identifier to index name relationships per store and locale.
- **Query plugin**: a Spryker plugin that specifies the source identifier in `SearchContext`.

## Set up search for a custom entity

### 1. Prepare the Algolia index

Make sure your custom entity data is indexed in Algolia before configuring the integration.

**Option A: Via Algolia Dashboard**
1. Go to the Algolia dashboard.
2. Create a new index, for example, `documents_de`.
3. Upload your data via JSON import or add records manually in UI.

**Option B: Via Algolia API**

```php
$client = \Algolia\AlgoliaSearch\SearchClient::create('APP_ID', 'ADMIN_KEY');
$index = $client->initIndex('documents_de');

$documents = [
    [
        'objectID' => 'doc-1',
        'title' => 'Technical Documentation',
        'category' => 'Engineering',
        'content' => 'Detailed technical guide...',
        'url' => '/documents/technical-guide',
    ],
];

$index->saveObjects($documents);
```

**Option C: Via an external system**

Use your CMS, DAM, or other system to index data. Make sure the data includes all searchable fields.

### 2. Configure entity-to-index mapping

In `src/Pyz/Shared/Algolia/AlgoliaConfig.php`, define the mapping from source identifiers to Algolia index names:

```php
<?php

namespace Pyz\Shared\Algolia;

use SprykerEco\Shared\Algolia\AlgoliaConfig as SprykerEcoAlgoliaConfig;

class AlgoliaConfig extends SprykerEcoAlgoliaConfig
{
    /**
     * @return array<array<string, mixed>>
     */
    public function getEntityToIndexMappings(): array
    {
        return [
            // Single store, single locale
            [
                'sourceIdentifier' => 'document',
                'store' => 'DE',
                'locales' => ['de_DE'],
                'indexName' => 'documents_de',
            ],

            // Multi-locale support for the same store
            [
                'sourceIdentifier' => 'document',
                'store' => 'DE',
                'locales' => ['en_US'],
                'indexName' => 'documents_en',
            ],

            // Global entity (all stores, all locales)
            [
                'sourceIdentifier' => 'manufacturer',
                'store' => '*',
                'locales' => ['*'],
                'indexName' => 'manufacturers_global',
            ],

            // Multi-store with wildcard locale
            [
                'sourceIdentifier' => 'location',
                'store' => 'US',
                'locales' => ['*'],
                'indexName' => 'locations_us',
            ],
        ];
    }
}
```

### 3. Create a search query plugin

Create a query plugin for your custom entity. The `SOURCE_IDENTIFIER` constant must match the `sourceIdentifier` value you defined in the mapping configuration.

```php
<?php

namespace Pyz\Client\DocumentSearch\Plugin\Search;

use Generated\Shared\Transfer\SearchContextTransfer;
use Generated\Shared\Transfer\SearchQueryTransfer;
use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface;
use Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextAwareQueryInterface;
use Spryker\Client\SearchExtension\Dependency\Plugin\SearchStringSetterInterface;

/**
 * @method \Pyz\Client\DocumentSearch\DocumentSearchFactory getFactory()
 */
class DocumentSearchQueryPlugin extends AbstractPlugin implements QueryInterface, SearchContextAwareQueryInterface, SearchStringSetterInterface
{
    protected const SOURCE_IDENTIFIER = 'document';

    protected SearchQueryTransfer $searchQueryTransfer;
    
    protected ?SearchContextTransfer $searchContextTransfer = null;

    public function __construct(?SearchContextTransfer $searchContextTransfer = null)
    {
        $this->searchQueryTransfer = (new SearchQueryTransfer())
            ->setLocale($this->getFactory()->getLocaleClient()->getCurrentLocale());
     }    
    
    public function setSearchString($searchString): void
    {
        $this->searchQueryTransfer->setQueryString($searchString);
    }
    
    public function getSearchQuery(): SearchQueryTransfer
    {
        return $this->searchQueryTransfer;
    }

    public function getSearchContext(): SearchContextTransfer
    {
        if ($this->searchContextTransfer === null) {
            $this->searchContextTransfer = (new SearchContextTransfer())
                ->setSourceIdentifier(static::SOURCE_IDENTIFIER);
        }

        return $this->searchContextTransfer;
    }

    public function setSearchContext(SearchContextTransfer $searchContextTransfer): void
    {
        $this->searchContextTransfer = $searchContextTransfer;
    }
}
```

### 4. Create a client module

If you do not have a client module for your entity, create one.

**`src/Pyz/Client/DocumentSearch/DocumentSearchClient.php`**

```php
<?php

namespace Pyz\Client\DocumentSearch;

use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\DocumentSearch\DocumentSearchFactory getFactory()
 */
class DocumentSearchClient extends AbstractClient implements DocumentSearchClientInterface
{
    /**
     * @param array $requestParameters
     *
     * @return array
     */
    public function search(array $requestParameters): array
    {
        return $this->getFactory()
            ->getSearchClient()
            ->search($this->getFactory()->createDocumentSearchQuery(), $requestParameters);
    }
}
```

**`src/Pyz/Client/DocumentSearch/DocumentSearchFactory.php`**

```php
<?php

namespace Pyz\Client\DocumentSearch;

use Pyz\Client\DocumentSearch\Plugin\Search\DocumentSearchQueryPlugin;
use Spryker\Client\Kernel\AbstractFactory;
use Spryker\Client\Search\SearchClientInterface;

/**
 * @method \Pyz\Client\DocumentSearch\DocumentSearchConfig getConfig()
 */
class DocumentSearchFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface
     */
    public function createDocumentSearchQuery()
    {
        return new DocumentSearchQueryPlugin();
    }

    /**
     * @return \Spryker\Client\Search\SearchClientInterface
     */
    public function getSearchClient(): SearchClientInterface
    {
        return $this->getProvidedDependency(DocumentSearchDependencyProvider::CLIENT_SEARCH);
    }
}
```

**`src/Pyz/Client/DocumentSearch/DocumentSearchDependencyProvider.php`**

```php
<?php

namespace Pyz\Client\DocumentSearch;

use Spryker\Client\Kernel\AbstractDependencyProvider;
use Spryker\Client\Kernel\Container;

class DocumentSearchDependencyProvider extends AbstractDependencyProvider
{
    public const CLIENT_SEARCH = 'CLIENT_SEARCH';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container): Container
    {
        $container = parent::provideServiceLayerDependencies($container);
        $container = $this->addSearchClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addSearchClient(Container $container): Container
    {
        $container->set(static::CLIENT_SEARCH, function (Container $container) {
            return $container->getLocator()->search()->client();
        });

        return $container;
    }
}
```

### 5. Use the client in your application

The following example shows how to use the client in a Yves controller:

```php
<?php

namespace Pyz\Yves\DocumentSearch\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Client\DocumentSearch\DocumentSearchClientInterface getClient()
 */
class SearchController extends AbstractController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function indexAction(Request $request)
    {
        $searchTerm = $request->query->get('q', '');

        $searchResults = $this->getClient()->search([
            'q' => $searchTerm,
            'page' => $request->query->getInt('page', 1),
            'ipp' => 12,
        ]);

        return $this->view([
            'searchTerm' => $searchTerm,
            'results' => $searchResults,
        ], [], '@DocumentSearch/views/search/index.twig');
    }
}
```

## Real-world examples

### Multi-store document library

**Scenario**: A company has technical documentation indexed per store with different languages.

**Algolia indices**:
- `docs-de-de_de`: German docs for the DE store.
- `docs-de-en_us`: English docs for the DE store.
- `docs-us-en_us`: English docs for the US store.

**Configuration**:

```php
public function getEntityToIndexMappings(): array
{
    return [
        [
            'sourceIdentifier' => 'document',
            'store' => 'DE',
            'locales' => ['de_DE'],
            'indexName' => 'docs-de-de_de',
        ],
        [
            'sourceIdentifier' => 'document',
            'store' => 'DE',
            'locales' => ['en_US'],
            'indexName' => 'docs-de-en_us',
        ],
        [
            'sourceIdentifier' => 'document',
            'store' => 'US',
            'locales' => ['en_US'],
            'indexName' => 'docs-us-en_us',
        ],
    ];
}
```

When a user on the DE store searches in German, queries go to `docs-de-de_de`. When the same user switches to English, queries go to `docs-de-en_us`. US store users always query `docs-us-en_us`.

### Global manufacturer directory

**Scenario**: A B2B platform has manufacturer data that is the same across all stores and languages.

**Algolia index**: `manufacturers` (single global index).

**Configuration**:

```php
public function getEntityToIndexMappings(): array
{
    return [
        [
            'sourceIdentifier' => 'manufacturer',
            'store' => '*',
            'locales' => ['*'],
            'indexName' => 'manufacturers',
        ],
    ];
}
```

**Example Algolia record structure**:

```json
{
    "objectID": "mfg-001",
    "name": "ACME Corporation",
    "country": "USA",
    "industry": "Manufacturing",
    "certifications": ["ISO9001", "ISO14001"],
    "website": "https://acme.com"
}
```

### Store-specific locations

**Scenario**: A retail chain with different store locations per country, available in any language.

**Algolia indices**: `locations-de`, `locations-us`.

**Configuration**:

```php
public function getEntityToIndexMappings(): array
{
    return [
        [
            'sourceIdentifier' => 'store-location',
            'store' => 'DE',
            'locales' => ['*'],
            'indexName' => 'locations-de',
        ],
        [
            'sourceIdentifier' => 'store-location',
            'store' => 'US',
            'locales' => ['*'],
            'indexName' => 'locations-us',
        ],
    ];
}
```

The corresponding query plugin uses `store-location` as the source identifier:

```php
class StoreLocationSearchQueryPlugin extends AbstractPlugin implements QueryInterface, SearchContextAwareQueryInterface
{
    protected const SOURCE_IDENTIFIER = 'store-location';

    // ... same implementation as DocumentSearchQueryPlugin
}
```

### Events calendar

**Scenario**: Event management with localized event data available across all stores.

**Algolia indices**: `events-de_de`, `events-en_us`.

**Configuration**:

```php
public function getEntityToIndexMappings(): array
{
    return [
        [
            'sourceIdentifier' => 'event',
            'store' => '*',
            'locales' => ['de_DE'],
            'indexName' => 'events-de_de',
        ],
        [
            'sourceIdentifier' => 'event',
            'store' => '*',
            'locales' => ['en_US'],
            'indexName' => 'events-en_us',
        ],
    ];
}
```

**Example Algolia record structure**:

```json
{
    "objectID": "evt-2026-001",
    "title": "Tech Conference 2026",
    "description": "Annual technology conference",
    "start_date": "2026-06-15T09:00:00Z",
    "location": "Berlin Convention Center",
    "category": "Technology",
    "price": 499,
    "currency": "EUR",
    "tags": ["conference", "technology", "networking"]
}
```

## Advanced configuration

### Wildcard patterns

Use `*` as a wildcard for store or locale to match all values.

**All stores, specific locale:**

```php
[
    'sourceIdentifier' => 'global-product-catalog',
    'store' => '*',
    'locales' => ['en_US'],
    'indexName' => 'global-catalog-en',
]
```

**Specific store, all locales:**

```php
[
    'sourceIdentifier' => 'de-regulations',
    'store' => 'DE',
    'locales' => ['*'],
    'indexName' => 'regulations-de',
]
```

**All stores, all locales:**

```php
[
    'sourceIdentifier' => 'universal-icons',
    'store' => '*',
    'locales' => ['*'],
    'indexName' => 'icons-global',
]
```

### Dynamic index naming

To use environment-specific index names:

```php
public function getEntityToIndexMappings(): array
{
    $environment = APPLICATION_ENV; // for example, 'dev', 'staging', 'prod'

    return [
        [
            'sourceIdentifier' => 'document',
            'store' => 'DE',
            'locales' => ['de_DE'],
            'indexName' => sprintf('%s-documents-de_de', $environment),
        ],
    ];
}
```

### Multiple indices for the same entity

You can map the same source identifier to different indices based on store and locale:

```php
public function getEntityToIndexMappings(): array
{
    return [
        [
            'sourceIdentifier' => 'document',
            'store' => 'DE',
            'locales' => ['de_DE'],
            'indexName' => 'fashion-docs-de',
        ],
        [
            'sourceIdentifier' => 'document',
            'store' => 'US',
            'locales' => ['en_US'],
            'indexName' => 'tech-docs-us',
        ],
    ];
}
```
