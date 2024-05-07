

{% info_block infoBox %}

This migration guide is a part of the [Search migration effort](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/search-migration-concept.html).

{% endinfo_block %}

The [Elastica](https://github.com/spryker/elastica) module is a wrapper around third-party library for interacting with Elasticsearch. It does not contain any code and usually should not be updated alone. Its version is managed either by the [Search](https://github.com/spryker/search) module or by the [SearchElasticsearch](https://github.com/spryker/search-elasticsearch) module.

## Upgrading from version 5.0.0 to version 6.0.0

The 6th version of the Elastica module installs version 7 of the `ruflin/elastica` package required for interacting with Elasticsearch 7.

*Estimated migration time: less than 1 minute*

To upgrade the module, install or update it through composer:

```bash
composer require "spryker/elastica:6.0.0" --update-with-dependencies
```

## Upgrading from version 4.0.0 to version 5.0.0

This version of the Elastica module installs version 6 of the `ruflin/elastica` package required for interacting with Elasticsearch 6.

*Estimated migration time: less than 1 minute*

To upgrade the module, install or update it through composer::

```bash
composer require "spryker/elastica:5.0.0" --update-with-dependencies
```
