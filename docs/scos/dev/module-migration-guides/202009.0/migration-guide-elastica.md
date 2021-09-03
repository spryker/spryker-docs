---
title: Migration guide- Elastica
description: Learn how to upgrade the Elastica module to a newer version
originalLink: https://documentation.spryker.com/v6/docs/migration-guide-elastica
originalArticleId: 895cf3e4-06b6-4f2d-8b91-1322b6bee4ce
redirect_from:
  - /v6/docs/migration-guide-elastica
  - /v6/docs/en/migration-guide-elastica
---

{% info_block infoBox %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-concepts/search-migration-concept/search-migration-concept.html).

{% endinfo_block %}

The [Elastica](https://github.com/spryker/elastica) module is a wrapper around 3rd-party library for interacting with Elasticsearch. It does not contain any code and usually should not be updated alone. Its version is managed either by the [Search](https://github.com/spryker/search) module or by the [SearchElasticsearch](https://github.com/spryker/search-elasticsearch) module.

*Estimated migration time: less than 1 minute*

## Upgrading from version 5.0.0 to version 6.0.0

The 6th version of the Elastica module installs version 7 of the `ruflin/elastica` package required for interacting with Elasticsearch 7.

To upgrade the module, install or update it through composer:

```Bash
composer require "spryker/elastica:6.0.0" --update-with-dependencies
```

## Upgrading from version 4.0.0 to version 5.0.0

This version of the Elastica module installs version 6 of the `ruflin/elastica` package required for interacting with Elasticsearch 6.

To upgrade the module, install or update it through composer::

```Bash
composer require "spryker/elastica:5.0.0" --update-with-dependencies
```

*Estimated migration time: less than 1 minute*
