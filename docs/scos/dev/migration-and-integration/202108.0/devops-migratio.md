---
title: DevOps migration guide 202001.0
originalLink: https://documentation.spryker.com/2021080/docs/devops-migration-guide
redirect_from:
  - /2021080/docs/devops-migration-guide
  - /2021080/docs/en/devops-migration-guide
---

This document covers all the maintenance related details that a DevOps engineer would want to know to keep a Spryker project up to date with the latest release changes.

The 202001.0 release introduces the following updates:

*     Elasticsearch version
*     PHP version 
*     health checks
*     Routing
*     console commands
*     Twig cache location
*     translation cache location

## Elasticsearch 6.0

The latest supported version of Elasticsearch is upgraded to version 6.0.

To enable Elasticsearch 6.0:

1. [Install](https://www.elastic.co/guide/en/elasticsearch/reference/6.8/install-elasticsearch.html) Elasticsearch 6 as described.
2. Run the commands to set up new indexes and generate corresponding index map classes:

```bash
console search:setup:sources
console search:setup:source-map
```

The first command creates empty indexes that follow the new index structure - an index per each old mapping type. The second one generates index map classes for the new indexes. 


{% info_block infoBox %}

These commands do not remove the existing indexes suffixed with `_search`. The search data contained in the existing indexes is migrated to the new ones in the next step. 

{% endinfo_block %}


The following environment configuration constants are deprecated:

Deprecated with replacement:

```php
\Spryker\Shared\Search\SearchConstants::FULL_TEXT_BOOSTED_BOOSTING_VALUE
\Spryker\Shared\Search\SearchConstants::ELASTICA_PARAMETER__HOST
\Spryker\Shared\Search\SearchConstants::ELASTICA_PARAMETER__PORT
\Spryker\Shared\Search\SearchConstants::ELASTICA_PARAMETER__TRANSPORT
\Spryker\Shared\Search\SearchConstants::ELASTICA_PARAMETER__AUTH_HEADER
\Spryker\Shared\Search\SearchConstants::ELASTICA_PARAMETER__EXTRA
\Spryker\Shared\Search\SearchConstants::ELASTICA_CLIENT_CONFIGURATION
\Spryker\Shared\Search\SearchConstants::DIRECTORY_PERMISSION
```

Deprecated without replacement:

```php
\Spryker\Shared\Search\SearchConstants::ELASTICA_PARAMETER__INDEX_NAME
\Spryker\Shared\Search\SearchConstants::ELASTICA_PARAMETER__DOCUMENT_TYPE
\Spryker\Shared\Search\SearchConstants::SEARCH_INDEX_NAME_SUFFIX
```

Find the corresponding substitutions below:
```php
\Spryker\Shared\SearchElasticsearch\SearchElasticsearchConstants::FULL_TEXT_BOOSTED_BOOSTING_VALUE
\Spryker\Shared\SearchElasticsearch\SearchElasticsearchConstants::HOST
\Spryker\Shared\SearchElasticsearch\SearchElasticsearchConstants::PORT
\Spryker\Shared\SearchElasticsearch\SearchElasticsearchConstants::TRANSPORT
\Spryker\Shared\SearchElasticsearch\SearchElasticsearchConstants::AUTH_HEADER
\Spryker\Shared\SearchElasticsearch\SearchElasticsearchConstants::EXTRA
\Spryker\Shared\SearchElasticsearch\SearchElasticsearchConstants::CLIENT_CONFIGURATION
\Spryker\Shared\SearchElasticsearch\SearchElasticsearchConstants::DIRECTORY_PERMISSION
```
{% info_block warningBox %}

We strongly recommend adding new configuration constants alongside the old ones before making any other changes in project files. You can remove the old constants from the configuration once the project code is adjusted - all the needed plugins are hooked and all modules are configured.

{% endinfo_block %}

### Data Migration

Migrate all the search data from the old indexes to the new ones. The quickest way to do this is through the Elasticsearch Reindex API.  Find an exemplary case of migrating data from the old `de_search` index to the new ones called `de_page` and `de_product-review` below:
```php
POST _reindex
{
  "source": {
    "index": "de_search",
    "type": "page"
  },
  "dest": {
    "index": "de_page",
    "type": "page"
  }
}
POST _reindex
{
  "source": {
    "index": "de_search",
    "type": "product-review"
  },
  "dest": {
    "index": "de_product-review",
    "type": "product-review"
  }
}
```

In the example, the data belonging to `page` and `product-review` mapping types of the old `de_search` index is migrated to the two new dedicated indexes - `de_page` and `de_product-review` respectively. Do the same for all the other indexes/mapping types in your project. 
{% info_block warningBox %}

Only after you make sure that all the search data is migrated, you can remove the old indexes.

{% endinfo_block %}


## PHP 7.1 

PHP 7.1 is no longer supported. Update PHP version to 7.2 or higher.

## Health Checks

Heartbeat functionality was replaced with the [Health Сhecks](/docs/scos/dev/migration-and-integration/202001.0/technical-enhancements/health-checks) functionality.

Enable heath checks by defining `\Spryker\Shared\HealthCheck\HealthCheckConstants::HEALTH_CHECK_ENABLED = true` in configuration.

The `health-check/index` path is used to check the status of each application.

## Routing

As [Silex has been replaced](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-replaceme) together with the Routing service provider, we introduced a new routing that implements router cache. To warm up the router cache, include `vendor/bin/yves router:cache:warm-up` and `vendor/bin/console router:cache:warm-up` into the deployment recipe.

## Updated Console Commands

* `console transfer:generate` was split into two commands:
    * `console transfer:generate`
    * `console transfer:entity:generate`
In the deployment recipe, replace `console transfer:generate` with console `transfer:entity:generate` that is executed after console `propel:model:build`.

* `search:setup:indexes` was split into two commands:
    * `console search:setup:sources`
    * `console search:setup:source-map`
In the deployment recipe, replace `console search:setup:indexes`with `console search:setup:sources`and `console search:setup:source-map`.

## Twig Cache Location

Find the new paths to Twig cache directories below:

* Yves - `%s/data/%s/cache/YVES/twig/`
* Zed - `%s/data/%s/cache/ZED/twig/`

## Translation Cache Location

The new path to Zed translation cache directory is `%s/data/%s/cache/Zed/translation`.

<!-- Last review date: Jan 31, 2020 by Serhii Chepela, Andrii Tserkovnyi -->

