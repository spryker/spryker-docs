---
title: Search Migration Concept
originalLink: https://documentation.spryker.com/v4/docs/search-migration-concept
redirect_from:
  - /v4/docs/search-migration-concept
  - /v4/docs/en/search-migration-concept
---

## Background

Previously, out of the box, Spryker provided support only for Elasticsearch 5 as the search provider.  It was impossible to use major versions of Elasticsearch later because of the breaking changes introduced in its version 6 - primarily because of the removal of mapping types. From the very beginning, Spryker’s search setup included one index per store, which was logically divided into several mapping types to support different types of resources. Besides, there was no easy way to substitute Elasticsearch with alternative search providers. 

Refactoring of the Spryker’s search sub-system has two main goals:

1. Prepare the infrastructure for replacing Elasticsearch with alternative search providers as well as for using several search providers at a time.
2. Unblock the ability to use Elasticsearch 6, by changing the way, in which the search data is stored in Elasticsearch - rather than having all the data inside of a single index with multiple mapping types, indexed documents are now stored across multiple Elasticsearch indexes each having its own single mapping type. This is compatible with Elasticsearch 6, which allows a single mapping type per index,  and is a solid foundation for the future migration to Elasticsearch 7, where the concept of mapping types is removed completely. 

This article describes the changes made to add support of Elasticsearch 6 and create the foundation for replacing Elasticsearch with other search providers.

## Preparing the Infrastructure for Replacing Elasticsearch

The central place of the Spryker’s search sub-system is the *Search* module. This module provides APIs for:

*     installing the infrastructure for search (creating/updating Elasticsearch indexes)
*     searching for data
*     storing the data for search (indexing documents in Elasticsearch)

Old versions of the Search module were highly coupled to Elasticsearch 5 as the search provider. 
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Migration+Concepts/Current+Search+state+Copy.png){height="" width=""}

From now on, all the search provider-specific tasks are performed by the dedicated modules, which implement various plugin interfaces from the new *SearchExtension* module and are hooked to the Search module. The Search module itself is all about receiving requests through its API and routing them to the corresponding search provider-specific module(s) through the delegation mechanism. All Elasticsearch specific code has been deprecated in the Search module and moved to the new *SearchElasticsearch* module.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Migration+Concepts/Desired+state+Copy.png){height="" width=""}

To achieve this in the backward-compatible way, a new concept called **search context** was introduced, which is represented by the `SearchContextTransfer` object. The search context is needed to determine the search provider, which should respond to a particular search request, as well as to store information/configuration needed to handle this request. The main and mandatory part of this search context is the source identifier. The source identifier is used in two scenarios:

* resolving a search provider to handle the search request
* resolving a source (index, in terms of Elasticsearch) to perform search/storing of data

In addition to this, `SearchContextTransfer` can be expanded by search provider-specific modules with various pieces of data needed by those modules to handle a search request.

There are several new interfaces, for which search provider-specific modules may provide implementation:

1. `Spryker\Client\SearchExtension\Dependency\Plugin\SearchAdapterPluginInterface` (mandatory).  This API is used by the *Search* module to interact with the search provider-specific module.

2. `Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextExpanderPluginInterface` (optional). This API is used to expand search context with various vendor specific information/configuration, which is needed to handle a particular search request.

3. `Spryker\Zed\SearchExtension\Dependency\Plugin\InstallPluginInterface`. This API is used to create the infrastructure for a particular search provider (e.g., create indexes and index maps for Elasticsearch).

### Creating the Infrastructure for Search
All the Elasticsearch specific commands in the *Search* module were deprecated and replaced with generic commands (e.g., `search:setup:sources` instead of `search:setup:indexes`), which utilize `Spryker\Zed\SearchExtension\Dependency\Plugin\InstallPluginInterface` to hand over the infrastructure setup tasks to search provider-specific modules.

### Searching for Data
Searching for data is done through the SearchClient. Whenever there is a need to search for some data, implementation of `\Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface`, tailored for that specific search, is defined by some satellite module.  It is then passed to `SearchClient::search()` method. Right now, all existing implementations of this interface in the core are bound to Elasticsearch. To provide future support for other search providers all these classes now implement the additional interface `Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextAwareQueryInterface`. This interface could be implemented like this:

**Code sample**
   
```php
<?php

...
use Generated\Shared\Transfer\SearchContextTransfer;
use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\Search\Dependency\Plugin\QueryInterface;
use Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextAwareQueryInterface;

class SomeProjectLevelSearchQueryPlugin extends AbstractPlugin implements QueryInterface, SearchContextAwareQueryInterface
{
    protected const SOURCE_IDENTIFIER = 'page';

    /**
     * @var \Generated\Shared\Transfer\SearchContextTransfer
     */
    protected $searchContextTransfer;
    
    ...

    /**
     * @return \Generated\Shared\Transfer\SearchContextTransfer
     */
    public function getSearchContext(): SearchContextTransfer
    {
        if (!$this->hasSearchContext()) {
            $this->setupDefaultSearchContext();
        }

        return $this->searchContextTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\SearchContextTransfer $searchContextTransfer
     *
     * @return void
     */
    public function setSearchContext(SearchContextTransfer $searchContextTransfer): void
    {
        $this->searchContextTransfer = $searchContextTransfer;
    }

    /**
     * @return void
     */
    protected function setupDefaultSearchContext(): void
    {
        $searchContextTransfer = new SearchContextTransfer();
        $searchContextTransfer->setSourceIdentifier(static::SOURCE_IDENTIFIER);

        $this->searchContextTransfer = $searchContextTransfer;
    }

    /**
     * @return bool
     */
    protected function hasSearchContext(): bool
    {
        return (bool)$this->searchContextTransfer;
    }
}
```

The main idea here is that a query plugin must be able to set up and store the search context internally, and this search context could later be changed from outside of the plugin. 
Here is how the SearchElastisearch module resolves a source (index name) from the source identifier:

* `ElasticsearchSearchContextTransfer` is introduced, which has a property for storing index name for the current search operation
* New property is added to `SearchContextTransfer`, which is of type `ElasticsearchSearchContextTransfer`
* Source identifier is extracted from the passed `SearchContextTransfer` object, transformed into an index name
* A new `ElasticsearchSearchContextTransfer` object is created, and the index name is set as its property
* This new transfer object is set as the property of the passed `SearchContextTransfer` object, which is then returned back to the *Search* module

### Storing Data for Search
Data that needs to be stored for future search is passed along with some metadata as a `SearchDocumentTransfer` object. This is done by the *Synchronization* module. `SearchDocumentTransfer` transfer is now also extended with the property to hold a search context, which is used to determine where exactly (search provider, source) this data should be stored. The mechanism for this is the same as for searching the data.

## Unblocking Elasticsearch 6

As already mentioned before, previously, there was one index per store for all searchable data, which was split into several mapping types (page, product-review, etc.). From now on, for each of the mapping types, a separate index will be created by the SearchElasticsearch module, which will only have its dedicated mapping type. All the operations related to indexing/searching for documents will then be routed to the proper index with the help of source identifiers.

The Search migration effort implies an upgrade of the following modules:

* [Search](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide)
* [Console](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide)
* [CmsPageSearch](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide)
* [Catalog](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide)
* [ProductPageSearch](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide)
* [ProductReviewSearch](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide)
* [ProductLabelSearch](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide)
* [ProductSetPageSearch](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide)
* [CategoryPageSearch](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide)
* [ProductNew](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide)

