---
title: Migration Guide - Search
originalLink: https://documentation.spryker.com/v4/docs/migration-guide-search
redirect_from:
  - /v4/docs/migration-guide-search
  - /v4/docs/en/migration-guide-search
---

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/search-migration-concept.html). 

To upgrade the module, do the following:
1. Install and/or update the modules with composer:
```Bash
composer update spryker/search --with-dependencies
composer require spryker/search-elasticsearch
```
2. Regenerate transfer classes:
```Bash
console transfer:generate
```
3. Adjust all project-level implementations of `Spryker\Client\Search\Dependency\Plugin\QueryInterface`. First, change `Spryker\Client\Search\Dependency\Plugin\QueryInterface` to `Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface`. This does not require changing any implementation details. After that implement `\Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextAwareQueryInterface` as described in the [Search Migration Concept](https://documentation.spryker.com/v4/docs/search-migration-concept#searching-for-data). 
4. Remove `Pyz\Client\Search\SearchDependencyProvider::createSearchConfigBuilderPlugin()`.
5. Remove `Pyz\Client\Search\SearchDependencyProvider::createSearchConfigExpanderPlugins()`.
6. Enable `ElasticsearchSearchAdapterPlugin` and `ElasticsearchSearchContextExpanderPlugin` in `Pyz\Client\Search\SearchDependencyProvider`:

**Pyz\Client\Search**
   
```php
...
use Spryker\Client\SearchElasticsearch\Plugin\ElasticsearchSearchAdapterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ElasticsearchSearchContextExpanderPlugin;

class SearchDependencyProvider extends SprykerSearchDependencyProvider
{
    ...
    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\SearchAdapterPluginInterface[]
     */
    protected function getClientAdapterPlugins(): array
    {
        return [
            new ElasticsearchSearchAdapterPlugin(),
        ];
    }
    
    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextExpanderPluginInterface[]
     */
    protected function getSearchContextExpanderPlugins(): array
    {
        return [
            new ElasticsearchSearchContextExpanderPlugin(),
        ];
    }
    ...
}
```

7. Remove `Pyz\Zed\Search\SearchDependencyProvider::getSearchPageMapPlugins()`.

8. Enable `ElasticsearchIndexInstallerPlugin` and `ElasticsearchIndexMapInstallerPlugin` in `Pyz\Zed\Search\SearchDependencyProvider`:

**Pyz\Zed\Search**
   
```php
<?php

namespace Pyz\Zed\Search;

...
use Spryker\Zed\Search\SearchDependencyProvider as SprykerSearchDependencyProvider;
use Spryker\Zed\SearchElasticsearch\Communication\Plugin\Search\ElasticsearchIndexInstallerPlugin;
use Spryker\Zed\SearchElasticsearch\Communication\Plugin\Search\ElasticsearchIndexMapInstallerPlugin;

class SearchDependencyProvider extends SprykerSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\SearchExtension\Dependency\Plugin\InstallPluginInterface[]
     */
    protected function getSearchSourceInstallerPlugins(): array
    {
        return [
            new ElasticsearchIndexInstallerPlugin(),
        ];
    }
    /**
     * @return \Spryker\Zed\SearchExtension\Dependency\Plugin\InstallPluginInterface[]
     */
    protected function getSearchMapInstallerPlugins(): array
    {
        return [
            new ElasticsearchIndexMapInstallerPlugin(),
        ];
    }
}
```

9. Configure the list of sources, which are being handled by Elasticsearch, on the project level.

```php
<?php

namespace Pyz\Shared\SearchElasticsearch;
use Spryker\Shared\SearchElasticsearch\SearchElasticsearchConfig as SprykerSearchElasticsearchConfig;

class SearchElasticsearchConfig extends SprykerSearchElasticsearchConfig
{
    protected const SUPPORTED_SOURCE_IDENTIFIERS = [
        'page',
        'product-review',
    ];
}
```

10. Adjust all project-level Elasticsearch index definition JSON files (if any) as follows:
- Each JSON file should be renamed, so it would have one of the source identifiers (see above) as its name. The name of the definition file matters and will later be translated into index name.
- Each JSON file should provide a definition only for one mapping type, suitable for that index. By default, *index’s only* mapping type should have the same name as the JSON file it’s described by. For example, `page.json` should only contain a definition for the `page` mapping type.
- Each JSON file should be placed inside of the directory, which matches a path pattern defined by `SearchElasticsearchConfig::getJsonSchemaDefinitionDirectories()`.
