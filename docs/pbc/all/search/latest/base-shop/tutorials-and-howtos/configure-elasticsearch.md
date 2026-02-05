---
title: Configure Elasticsearch
description: Elasticsearch is a NoSQL data store that lets you predefine the structure of the data you store in it.
last_updated: Dec 17, 2024
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/search-configure-elasticsearch
originalArticleId: 6aa9f4ab-25de-46bc-b734-54bccb25cf0b
redirect_from:
  - /2021080/docs/search-configure-elasticsearch
  - /2021080/docs/en/search-configure-elasticsearch
  - /docs/search-configure-elasticsearch
  - /docs/en/search-configure-elasticsearch
  - /v6/docs/search-configure-elasticsearch
  - /v6/docs/en/search-configure-elasticsearch
  - /v5/docs/search-configure-elasticsearch
  - /v5/docs/en/search-configure-elasticsearch
  - /v4/docs/search-configure-elasticsearch
  - /v4/docs/en/search-configure-elasticsearch
  - /v3/docs/search-configure-elasticsearch
  - /v3/docs/en/search-configure-elasticsearch
  - /v2/docs/search-configure-elasticsearch
  - /v2/docs/en/search-configure-elasticsearch
  - /v1/docs/search-configure-elasticsearch
  - /v1/docs/en/search-configure-elasticsearch
  - /v5/docs/configure-elasticsearch
  - /v5/docs/en/configure-elasticsearch
  - /v4/docs/configure-elasticsearch
  - /v4/docs/en/configure-elasticsearch
  - /v6/docs/configure-elasticsearch
  - /v6/docs/en/configure-elasticsearch
  - /v3/docs/configure-elasticsearch
  - /v3/docs/en/configure-elasticsearch
  - /v2/docs/configure-elasticsearch
  - /v2/docs/en/configure-elasticsearch
  - /v6/docs/search-30
  - /v6/docs/en/search-30
  - /v6/docs/search-40
  - /v6/docs/en/search-40
  - /v5/docs/search-30
  - /v5/docs/en/search-30
  - /v5/docs/search-40
  - /v5/docs/en/search-40
  - /v4/docs/search-30
  - /v4/docs/en/search-30
  - /v4/docs/search-40
  - /v4/docs/en/search-40
  - /v3/docs/search-30
  - /v3/docs/en/search-30
  - /v3/docs/search-40
  - /v3/docs/en/search-40
  - /v2/docs/search-30
  - /v2/docs/en/search-30
  - /v2/docs/search-40
  - /v2/docs/en/search-40
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/search/configuring-elasticsearch.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/search/configure-elasticsearch.html
  - /docs/pbc/all/search/202311.0/tutorials-and-howtos/configure-elasticsearch.html
related:
  - title: Configure search for multi-currency
    link: docs/pbc/all/search/latest/base-shop/tutorials-and-howtos/configure-search-for-multi-currency.html
  - title: Configure the search features
    link: docs/pbc/all/search/latest/base-shop/tutorials-and-howtos/configure-search-features.html
  - title: Configure the search query
    link: docs/pbc/all/search/latest/base-shop/tutorials-and-howtos/configure-a-search-query.html
  - title: Expand search data
    link: docs/pbc/all/search/latest/base-shop/tutorials-and-howtos/expand-search-data.html
  - title: Facet filter overview and configuration
    link: docs/pbc/all/search/latest/base-shop/tutorials-and-howtos/facet-filter-overview-and-configuration.html
---

Elasticsearch is a NoSQL data store that lets you predefine the structure of the data you store in it.

Because the data structure is static, you need to define it in advance. The definitions of the indexes and mappings are written in JSON. For more information, see the [official Elasticsearch documentation](https://www.elastic.co/guide/index.html).

The content of the configuration files must follow the conventions listed in the [Create index API](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-create-index.html) document of the official Elasticsearch documentation.

{% info_block infoBox "Note" %}

The current search installer supports only settings and mappings. However, if you need more, you can extend it on the project level.

**Schema example**: For the main index called `page`, you can find the default schema configuration in `vendor/spryker/search-elasticsearch/src/Spryker/Shared/SearchElasticsearch/Schema/page.json`.

{% endinfo_block %}

## Index naming convention

Each configured store has its index, which is installed automatically. An index name consists of the following parts:

- An optional prefix, which is defined by the `SearchElasticsearchConstants::INDEX_PREFIX` configuration option.
- A store name.
- A configuration file name.

Index name components are delimited with an underscore—for example, `spryker_de_page`.

## Schema configuration approaches

Spryker supports two approaches for defining Elasticsearch index schemas. Understanding the difference helps you choose the right approach for your project.

### Modern approach: Schema directory (Recommended)

The modern and recommended approach uses JSON files in the `Schema` directory:

- **Location**: `*/Shared/*/Schema/`
- **File naming**: `{index-name}.json` (for example, `page.json`, `myindex.json`)
- **Configuration method**: `SearchElasticsearchConfig::getJsonSchemaDefinitionDirectories()`
- **Use case**: Creating new indexes or extending existing ones

**Examples**:

- Core schema: `vendor/spryker/search-elasticsearch/src/Spryker/Shared/SearchElasticsearch/Schema/page.json`
- Project-level customization: `src/Pyz/Shared/Search/Schema/page.json`

This approach offers flexibility through modular schema definitions. Files can contain complete index definitions or only the parts you want to extend or override.

### Legacy approach: IndexMap directory (Deprecated)

The older approach uses JSON files in the `IndexMap` directory:

- **Location**: `*/Shared/*/IndexMap/`
- **File naming**: `search.json`
- **Configuration method**: `SearchConfig::getJsonIndexDefinitionDirectories()` (deprecated)
- **Status**: Maintained for backward compatibility but not recommended for new implementations

{% info_block warningBox "Deprecation notice" %}

The IndexMap approach is deprecated. For new projects or when extending existing schemas, use the modern Schema directory approach instead.

{% endinfo_block %}

## Schema merging and customization

Spryker automatically merges all JSON files with the same name across different modules, enabling you to customize schemas without modifying core files.

### How merging works

1. The `SchemaDefinitionFinder` locates all JSON files in configured Schema directories
2. The `IndexDefinitionLoader` loads each file
3. The `IndexDefinitionMerger` merges files with matching names using `array_replace_recursive()`

**Merging order**:

1. Core vendor schemas (from `vendor/spryker/*/src/*/Shared/*/Schema/`)
2. Project-level schemas (from `src/*/Shared/*/Schema/`)

Project-level definitions override core definitions for matching keys.

### Merging example

Core schema (`vendor/spryker/search-elasticsearch/src/Spryker/Shared/SearchElasticsearch/Schema/page.json`):

```json
{
    "settings": {
        "analysis": {
            "analyzer": {
                "suggestion_analyzer": {
                    "tokenizer": "standard",
                    "filter": ["lowercase"]
                }
            }
        }
    },
    "mappings": {
        "page": {
            "properties": {
                "full-text": {
                    "type": "text"
                }
            }
        }
    }
}
```

Project-level schema (`src/Pyz/Shared/Search/Schema/page.json`):

```json
{
    "settings": {
        "analysis": {
            "analyzer": {
                "fulltext_index_analyzer": {
                    "tokenizer": "keyword",
                    "filter": ["lowercase", "fulltext_index_ngram_filter"]
                }
            }
        }
    },
    "mappings": {
        "page": {
            "properties": {
                "full-text": {
                    "analyzer": "fulltext_index_analyzer"
                }
            }
        }
    }
}
```

Resulting merged schema:

```json
{
    "settings": {
        "analysis": {
            "analyzer": {
                "suggestion_analyzer": {
                    "tokenizer": "standard",
                    "filter": ["lowercase"]
                },
                "fulltext_index_analyzer": {
                    "tokenizer": "keyword",
                    "filter": ["lowercase", "fulltext_index_ngram_filter"]
                }
            }
        }
    },
    "mappings": {
        "page": {
            "properties": {
                "full-text": {
                    "type": "text",
                    "analyzer": "fulltext_index_analyzer"
                }
            }
        }
    }
}
```

### Store-specific schemas

To create store-specific schema overrides, prefix the filename with the store code:

- `de_page.json` - Applies only to the DE store
- `us_page.json` - Applies only to the US store
- `page.json` - Applies to all stores (unless overridden by store-specific files)

This is useful when different stores require different analyzers, language-specific tokenizers, or other locale-specific configurations.

## Source identifier management

Spryker uses an allowlist mechanism to control which index schema files are processed during installation. This prevents accidental or unauthorized index creation.

### How source identifiers work

The source identifier is derived from the JSON filename:

- `page.json` → source identifier: `page`
- `product-review.json` → source identifier: `product-review`
- `myindex.json` → source identifier: `myindex`

Spryker loads and installs only files whose source identifiers are listed in `SearchElasticsearchConfig::getSupportedSourceIdentifiers()`. Files with unlisted source identifiers are skipped.

**Code reference**: The filtering happens in `IndexDefinitionLoader::load()` at `src/Spryker/SearchElasticsearch/src/Spryker/Zed/SearchElasticsearch/Business/Definition/Loader/IndexDefinitionLoader.php:60-62`:

```php
if (!$this->sourceIdentifier->isSupported($sourceIdentifier, $storeName)) {
    continue;
}
```

### Configure supported source identifiers

To add support for new indexes, override `SUPPORTED_SOURCE_IDENTIFIERS` in your project-level configuration:

**src/Pyz/Shared/SearchElasticsearch/SearchElasticsearchConfig.php**

```php
<?php

namespace Pyz\Shared\SearchElasticsearch;

use Spryker\Shared\SearchElasticsearch\SearchElasticsearchConfig as SprykerSearchElasticsearchConfig;

class SearchElasticsearchConfig extends SprykerSearchElasticsearchConfig
{
    protected const SUPPORTED_SOURCE_IDENTIFIERS = [
        'page',
        'product-review',
        'return_reason',
        'merchant',
        'myindex', // Add your custom index here
    ];
}
```

{% info_block warningBox "Security consideration" %}

The `SUPPORTED_SOURCE_IDENTIFIERS` configuration acts as a security allowlist. Always review and explicitly add source identifiers rather than allowing all indexes. This prevents unauthorized or test indexes from being created in production environments.

{% endinfo_block %}

### Example workflow

1. Create a new schema file: `src/Pyz/Shared/MyModule/Schema/myindex.json`
2. Add the source identifier to the configuration: `'myindex'` in `SUPPORTED_SOURCE_IDENTIFIERS`
3. Run the installation commands:

   ```bash
   vendor/bin/console search:setup:sources
   vendor/bin/console search:setup:source-map
   ```

4. The new index is created and a `MyindexIndexMap` helper class is generated

Without step 2, the `myindex.json` file is discovered but skipped during installation, and no index is created.

### Store-prefixed source identifiers

Store-prefixed files like `de_page.json` work with the base source identifier `page`. You do not need to add `de_page` to `SUPPORTED_SOURCE_IDENTIFIERS`. The system automatically recognizes `de_page` as a store-specific variant of the `page` source identifier.

## Working with indexes and mappings

### Create new indexes

To define new indexes and mappings, under the `Shared` namespace of any module, create new configuration files—for example, `src/Pyz/Shared/MyModuleName/Schema/myindex.json`.

The file can contain a complete index definition with settings and mappings. When the search installer runs, it reads all available configuration files and merges them by index name per store.

### Modify existing indexes

To extend or overwrite existing configurations, create a new file with the same name you want to modify and provide only the differences compared to the original one. The merging process automatically combines your changes with the core schema.

For store-specific modifications, create a configuration file with the store's name prefix—for example, `de_page.json`. This is useful when you have different analyzing strategies for different stores.

### Example: Custom tokenizer configuration

The following example shows how to modify the default schema configuration for the main index `page` to allow searching for keywords containing the special character *&* (ampersand). The configuration switches from a [`standard`](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-tokenizer.html) tokenizer to a combination of [`keyword`](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-keyword-tokenizer.html) tokenizer and token filter of the [`word_delimiter_graph`](https://www.elastic.co/guide/en/elasticsearch/reference/8.2/analysis-word-delimiter-graph-tokenfilter.html) type.

<details><summary>src/Pyz/Shared/Search/Schema/page.json</summary>

```json
{
    "settings": {
        "analysis": {
            "analyzer": {
                "fulltext_index_analyzer": {
                    "tokenizer": "keyword",
                    "filter": ["my_custom_word_delimiter_graph_filter", "lowercase", "fulltext_index_ngram_filter"]
                },
                "fulltext_search_analyzer": {
                    "tokenizer": "keyword",
                    "filter": ["custom_word_delimiter_graph_filter", "lowercase"]
                }
            },
            "filter": {
                "fulltext_index_ngram_filter": {
                    "type": "edge_ngram",
                    "min_gram": 2,
                    "max_gram": 20
                },
                "custom_word_delimiter_graph_filter": {
                    "type": "word_delimiter_graph",
                    "type_table": [ "& => ALPHA" ],
                    "split_on_case_change": false,
                    "split_on_numerics": false
                }
            }
        }
    },
    "mappings": {
        "page": {
            "properties": {
                "full-text": {
                    "analyzer": "fulltext_index_analyzer",
                    "search_analyzer": "fulltext_search_analyzer"
                },
                "full-text-boosted": {
                    "analyzer": "fulltext_index_analyzer",
                    "search_analyzer": "fulltext_search_analyzer"
                }
            }
        }
    }
}
```

</details>

After creating or modifying schema files, follow the installation steps in the [Install indexes and mappings](#install-indexes-and-mappings) section.

## Install indexes and mappings

To install or update indexes and mappings, run the following commands:

```php
vendor/bin/console search:setup:sources
vendor/bin/console search:setup:source-map
```

The first command installs indexes that do not exist and [updates the mappings](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-put-mapping.html) based on the JSON configurations.

If an index is created with the given settings, those settings cannot be changed by running this process again, but the mapping can be modified.

In the development environment, to create new analyzers or change the index settings, you must delete the index and run the installation process again.

### Populate indexes with data

After installation, populate the newly created index with data:

```php
vendor/bin/console publish:trigger-events
```

### Generated helper classes

After running the `search:setup:source-map` command, a helper class is autogenerated for every installed index. You can find these classes under the `\Generated\Shared\Search` namespace. The name of the generated class starts with the name of the index and is followed by the suffix `IndexMap`.

For the default page index, the class is `\Generated\Shared\Search\PageIndexMap`.

These classes provide information from the mapping, such as fields and metadata. Use these classes for references to program against something related to that mapping schema.

If you change the mapping and run the installer, autogenerated classes change accordingly.

## Update indexes with existing data

Elasticsearch has limitations when updating indexes that contain data. If any issues occur, the errors provided by Elasticsearch can be confusing.

To ensure an index is correct when updating schemas, follow these steps:

1. Drop and recreate the index:

```bash
APPLICATION_STORE=DE console search:index:delete
APPLICATION_STORE=DE console search:setup:sources
```

2. If the previous command introduced or may have introduced any changes to searchable data, rewrite the data:

```bash
APPLICATION_STORE=DE console publish:trigger-events
```

3. Sync the data to Elasticsearch:

```bash
APPLICATION_STORE=DE console sync:data
```

For help with more specific cases, engage with the [Spryker community](https://commercequest.space/) or [contact support](https://support.spryker.com).

## Advanced configuration

### Disable default mapping installation

To disable the default mapping installation, override the core configuration defined in `Spryker\Zed\SearchElasticsearch\SearchElasticsearchConfig::getJsonSchemaDefinitionDirectories()` by implementing it on the project level—for example, in `Pyz\Zed\SearchElasticsearch\SearchElasticsearchConfig`.

{% info_block warningBox "Warning" %}

Disabling default mappings means you must provide all necessary schema configurations at the project level. This is an advanced configuration option and should only be used when you have specific requirements that cannot be met by extending the default schemas.

{% endinfo_block %}
