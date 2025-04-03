---
title: Search migration concept
description: Learn about upgrading to a new Elasticsearch version or learn how to migrate to a different search provider within your Spryker based projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/search-migration-concept
originalArticleId: 9338954f-a18a-4214-8566-5100e8462ca7
redirect_from:
  - /2021080/docs/search-migration-concept
  - /2021080/docs/en/search-migration-concept
  - /docs/search-migration-concept
  - /docs/en/search-migration-concept
  - /v6/docs/search-migration-concept
  - /v6/docs/en/search-migration-concept
  - /v5/docs/search-migration-concept
  - /v5/docs/en/search-migration-concept
  - /v4/docs/search-migration-concept
  - /v4/docs/en/search-migration-concept
  - /docs/scos/dev/migration-concepts/search-migration-concept/search-migration-concept.html
---

Previously, out of the box, Spryker provided support only for Elasticsearch 5 as the search provider. It was impossible to use major versions of Elasticsearch later because of the breaking changes introduced in its version 6 - primarily because of the removal of mapping types. From the very beginning, Spryker's search setup included one index per store, which was logically divided into several mapping types to support different types of resources. Besides, there was no easy way to substitute Elasticsearch with alternative search providers.

Refactoring of the Spryker's search sub-system has two main goals:

1. Prepare the infrastructure for replacing Elasticsearch with alternative search providers as well as for using several search providers at a time.
2. Unblock the ability to use Elasticsearch 6, by changing the way, in which the search data is stored in Elasticsearch - rather than having all the data inside of a single index with multiple mapping types, indexed documents are now stored across multiple Elasticsearch indexes each having its own single mapping type. This is compatible with Elasticsearch 6, which allows a single mapping type per index,  and is a solid foundation for the future migration to Elasticsearch 7, where the concept of mapping types is removed completely.

This article describes the changes made to add support of Elasticsearch 6 and create the foundation for replacing Elasticsearch with other search providers.

## Preparing the infrastructure for replacing Elasticsearch

The central place of the Spryker's search sub-system is the *Search* module. This module provides APIs for:

* installing the infrastructure for search (creating/updating Elasticsearch indexes)
* searching for data
* storing the data for search (indexing documents in Elasticsearch)

Old versions of the Search module were highly coupled to Elasticsearch 5 as the search provider.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Migration+Concepts/Current+Search+state+Copy.png)

From now on, all the search provider-specific tasks are performed by the dedicated modules, which implement various plugin interfaces from the new *SearchExtension* module and are hooked to the Search module. The Search module itself is all about receiving requests through its API and routing them to the corresponding search provider-specific modules through the delegation mechanism. All Elasticsearch specific code has been deprecated in the Search module and moved to the new *SearchElasticsearch* module.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Migration+Concepts/Desired+state+Copy.png)

To achieve this in the backward-compatible way, a new concept called **search context** was introduced, which is represented by the `SearchContextTransfer` object. The search context is needed to determine the search provider, which should respond to a particular search request, as well as to store information/configuration needed to handle this request. The main and mandatory part of this search context is the source identifier. The source identifier is used in two scenarios:

* resolving a search provider to handle the search request
* resolving a source (index, in terms of Elasticsearch) to perform search/storing of data

In addition to this, `SearchContextTransfer` can be expanded by search provider-specific modules with various pieces of data needed by those modules to handle a search request.

There are several new interfaces, for which search provider-specific modules may provide implementation:

1. `Spryker\Client\SearchExtension\Dependency\Plugin\SearchAdapterPluginInterface` (mandatory).  This API is used by the *Search* module to interact with the search provider-specific module.

2. `Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextExpanderPluginInterface` (optional). This API is used to expand search context with various vendor specific information/configuration, which is needed to handle a particular search request.

3. `Spryker\Zed\SearchExtension\Dependency\Plugin\InstallPluginInterface`. This API is used to create the infrastructure for a particular search provider–for example, create indexes and index maps for Elasticsearch.

### Creating the infrastructure for search

All the Elasticsearch specific commands in the *Search* module were deprecated and replaced with generic commands–for example, `search:setup:sources` instead of `search:setup:indexes`, which utilize `Spryker\Zed\SearchExtension\Dependency\Plugin\InstallPluginInterface` to hand over the infrastructure setup tasks to search provider-specific modules.

### Searching for data

Searching for data is done through the SearchClient. Whenever there is a need to search for some data, implementation of `\Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface`, tailored for that specific search, is defined by some satellite module. It is then passed to `SearchClient::search()` method. Right now, all existing implementations of this interface in the core are bound to Elasticsearch. To provide future support for other search providers all these classes now implement the additional interface `Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextAwareQueryInterface`. This interface could be implemented like this:

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

### Storing data for search

Data that needs to be stored for future search is passed along with some metadata as a `SearchDocumentTransfer` object. This is done by the *Synchronization* module. `SearchDocumentTransfer` transfer is now also extended with the property to hold a search context, which is used to determine where exactly (search provider, source) this data should be stored. The mechanism for this is the same as for searching the data.

## Unblocking Elasticsearch 6

As already mentioned before, previously, there was one index per store for all searchable data, which was split into several mapping types (page, product-review, etc.). From now on, for each of the mapping types, a separate index will be created by the SearchElasticsearch module, which will only have its dedicated mapping type. All the operations related to indexing/searching for documents will then be routed to the proper index with the help of source identifiers.

## Migrating to Elasticsearch 7

In Elasticsearch 7, among other changes, the mapping types removal started in version 6, continues. While the previous major version has deprecated the concept of mapping types themselves but still required one mapping type per index, Elasticsearch 7.x by default, does not allow mapping types at all.

### General information

To communicate with Elasticsearch, Spryker uses a third-party library called `ruflin/elastica`. To be able to interact with Elaticsearch 7.x, `ruffling/elastica:7.*.*` must be used (major version of this package so far refer to major versions of Elasticsearch itself). This version has some drastic changes in its API compared to the previous major versions. Among those changes are:

- removal of several query type classes, for example, `\Elastica\Query\Type` and `\Elastica\Query\GeohashCell`
- removal of `the_parent` field in favor of the `join` field
- various changes in the existing classes APIs (`\Elastica\Document`, `\Elastica\Query\Terms` etc.)

For the full list of changes,check [Elasticsearch 7.0.0 release notes](https://elastica.io/2019/10/31/release-7-dot-0-0-beta1/). All the project code that's not compatible with these changes, must be adjusted accordingly before running Elasticsearch 7.

<a name="Elasticsearch7"></a>

### Migrating from Elasticsearch 6.x to Elasticsearch 7.x

to migrate from Elasticsearch 6 to Elasticsearch 7, update the necessary modules by running:

```bash
composer update spryker/elastica spryker/product-review spryker/search spryker/search-elasticsearch spryker/synchronization spryker/collector --with-dependencies
```

You don't need to do any extra-work related to your indexes and the data stored. That is, you don't need to adjust your indexes in any way, for example, by removing their corresponding mapping types and re-index the data, as both Elasicsearch 7.x and Spryker can work with your indexes created for version 6.x out of the box. But keep in mind that **all the new indexes created in Elasticsearch 7.x must not contain mapping types**.

### Migrating from Elasticsearch 5.x to Elasticsearch 7.x

To migrate from Elasticsearch 5.x to Elasticsearch 7.x:

1. Follow the guidelines in this Search migration concept from the very beginning, to make your project code is Elasticsearch 6 compatible.
2. After that, follow the [guidelines for migrating from Elasticsearch 6.x to Elasticsearch 7.x](#Elasticsearch7) described above.
3.
{% info_block warningBox "your title goes here" %}

To perform the upgrade without shutting down the cluster, you have to do a rolling upgrade as described in the [Elasticserach rolling upgrades documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/rolling-upgrades.html).

{% endinfo_block %}

That being done, the migration to Elasticsearch 7 from Elasticsearch 5 is complete.

## Modules to upgrade

The Search migration effort implies an upgrade of the following modules:

* [Search](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-search–module.html#upgrading-from-version-89-to-version-810)
* [Console](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade–the-console-module.html)
* [CmsPageSearch](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmspagesearch-module.html#upgrading-from-version-21-to-version-22)
* [Catalog](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-catalog-module.html#upgrading-from-version-55-to-version-56)
* [ProductPageSearch](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpagesearch-module.html#upgrading-from-version-311-to-version-312)
* [ProductReviewSearch](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productreviewsearch-module.html#upgrading-from-version-13-to-version-14)
* [ProductLabelSearch](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productlabelsearch-module.html#upgrading-from-version-12-to-version-13)
* [ProductSetPageSearch](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productsetpagesearch-module.html#upgrading-from-version-13-to-version-14)
* [CategoryPageSearch](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-categorypagesearch-module.html#upgrading-from-version-14-to-version-15)
* [ProductNew](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productnew-module.html)
