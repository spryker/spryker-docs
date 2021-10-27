---
title: Configuring Elasticsearch
description: Elasticsearch is a NoSQL data store which allows us to predefine the structure of the data we’ll be storing in it.
last_updated: Jul 23, 2021
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
---

Elasticsearch is a NoSQL data store that allows us to predefine the structure of the data we get to store in it.

Since the data structure we use is static, we would like to define it in advance. The definitions of the indexes and mappings are written in JSON format, just as you’ll find it in the [Elasticsearch documentation](https://www.elastic.co/guide/index.html?ultron=%5BEL%5D-%5BB%5D-%5BEMEA-General%5D-Exact&blade=adwords-s&Device=c&thor=elasticsearch%20documentation&gclid=EAIaIQobChMIhqvutbfJ5QIVB6WaCh3GYA3CEAAYASAAEgL-RPD_BwE).

The content of the configuration files needs to follow the conventions of the official [Elasticsearch index creation](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-create-index.html) documentation. Note that the current search installer supports only settings and mappings but if you need more, feel free to extend it on the project level.

{% info_block infoBox "Schema Example" %}
You can find the default schema configuration file for the main index called `page` at `vendor/spryker/search-elasticsearch/src/Spryker/Shared/SearchElasticsearch/Schema/page.json`.
{% endinfo_block %}

{% info_block warningBox %}
If you want to disable the default mapping installation, you need to override the core configuration defined in `Spryker\Zed\SearchElasticsearch\SearchElasticsearchConfig::getJsonIndexDefinitionDirectories()` by implementing it on the project level (for example, `Pyz\Zed\Search\SearchConfig`).
{% endinfo_block %}

Each configured store has its index installed automatically. The name of the indexes is composed of the store name + underscore + configuration file name (for example, `de_page`).

## Defining New Indexes and Mappings
You can define new indexes and mappings by creating new configuration files under the `Shared` namespace of any module.

Example:
`src/Shared/MyModuleName/Schema/myindex.json`

You can extend or overwrite the existing configurations by creating a new file with the same name you wish to modify and provide only the differences compared to the original one.

When the search installer runs, it first reads all the available configuration files and merges them by index name per each store. This might be handy if you have modules that are not tightly coupled together, but both need to use the same index for some reason, or you just need to extend or override the default configuration provided on the Core level.

It’s also possible to extend or modify indexes and mappings for specific stores. All you need to do is to create a new configuration file along with the name of the store (for example, `de_page.json`), and it will only be used for that store. For example, you might have a different analyzing strategy for your stores, so you’ll need to define it separately.

## Installing Indexes and Mappings
Execute the following commands to run the installation process:
```php
vendor/bin/console search:setup:sources
vendor/bin/console search:setup:source-map
```
The first command will install indexes which are not yet created and [update the mappings](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-put-mapping.html) based on the JSON configurations.

Note that if an index is created with the given settings, it won’t be changed by running this process, but the mapping can be modified and will be changed.

In the development environment, if you need to create new analyzers or change the index settings, you need to delete the index first and run the install process again.

After running the second command, a helper class will be auto-generated for each and every index installed. You can find these classes under the `\Generated\Shared\Search` namespace. The name of the generated class starts with the name of the index and is suffixed with `IndexMap`.

For the default page index, the class is `\Generated\Shared\Search\PageIndexMap`.

These classes provide some information from the mapping, such as the fields and the metadata. Use these classes for references when you need to program against something related to that mapping schema.

If you change mapping and run the installer, the auto-generated classes will also change accordingly.
