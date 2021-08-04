---
title: Configuring Elasticsearch
originalLink: https://documentation.spryker.com/v1/docs/search-configure-elasticsearch
redirect_from:
  - /v1/docs/search-configure-elasticsearch
  - /v1/docs/en/search-configure-elasticsearch
---

Elasticsearch is a NoSQL data store which allows us to predefine the structure of the data we’ll be storing in it.

Since the data structure we use is static, we would like to define it in advance. The definitions of the indexes and mapping types are written in JSON format, just as you’ll find it in the [Elasticsearch documentation](https://www.elastic.co/guide/index.html?ultron=%5BEL%5D-%5BB%5D-%5BEMEA-General%5D-Exact&blade=adwords-s&Device=c&thor=elasticsearch%20documentation&gclid=EAIaIQobChMIhqvutbfJ5QIVB6WaCh3GYA3CEAAYASAAEgL-RPD_BwE).

The content of the configuration files needs to follow the conventions of the official [Elasticsearch index creation](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-create-index.html) documentation. Note that the current search installer support only settings and mappings but if you need more, feel free to extend it on the project level.

{% info_block infoBox "Default Schema" %}
You can find the default schema configuration file at `vendor/spryker/search/src/Spryker/Shared/Search/IndexMap/search.json`.
{% endinfo_block %}

{% info_block warningBox %}
If you want to disable the installation of the default mapping, you need to override the core configuration defined in `Spryker\Zed\Search\SearchConfig::getJsonIndexDefinitionDirectories(
{% endinfo_block %}` by implementing it on the project level (e.g. `Pyz\Zed\Search\SearchConfig`).)

Each configured store will have its own index installed automatically. The name of the indexes are composed from store name + underscore + configuration file name (e.g.: `de_search`).

## Defining New Indexes and Mapping Types
You can define new indexes and mapping types by creating new configuration files under the `Shared` namespace of any module.

Example:
`src/Shared/MyBundleName/IndexMap/myindex.json`

You are able to extend or overwrite existing configurations by creating a new file with the same name you wish to modify and provide only the differences compared to the original one.

When the search installer runs, it will first read all the available configuration files and merge them by index name per each store. This might be handy if you have bundles which are not tightly coupled together but both need to use the same index for some reason or you just need to extend or override the default configuration provided on the Core level.

It’s also possible to extend or modify indexes and mapping types for specific stores. All you need to do is to create a new configuration file along with the name of the store (e.g. `de_search.json`) and it will be only used for that store. For example, you might have a different analyzing strategy for your stores, so you’ll need to define it separately.

## Installing Indexes and Mapping Types
Execute the following command to run the installation process:
```php
vendor/bin/console setup:search
```
This will install indexes which are not yet created and [update the mapping types](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-put-mapping.html) based on the JSON configurations.

Note that if an index is created with the given settings, it won’t be changed by running this process, but the mapping can be modified and will be changed.

In development environment, if you need to create new analysers or change the index settings, you need to delete the index first and run the install process again.

When you run the search installer for every mapping type, a helper class will be auto-generated. You can find these classes under the `\Generated\Search\IndexMapnamespace`. The name of the generated class starts with the name of the mapping type and is suffixed with `IndexMap`.

For the default page mapping type, the class is `\Generated\Search\IndexMap\PageIndexMap`.

These classes provide some information from the mapping type, such as the fields and the metadata. Use these classes for references when you need to program against something related to the schema of that mapping type.

If you change a mapping type and run the installer, the auto-generated classes will also change accordingly.
