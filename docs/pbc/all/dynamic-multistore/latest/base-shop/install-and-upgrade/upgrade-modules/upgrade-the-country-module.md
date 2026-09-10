---
title: Upgrade the Country module
description: Learn how to upgrade to a newer version of the Dynamic multi store Country module within your Spryker project.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-country
originalArticleId: 9f4fb3f2-3ab9-42fd-9fd0-dda4131e8555
redirect_from:
  - /2021080/docs/mg-country
  - /2021080/docs/en/mg-country
  - /docs/mg-country
  - /docs/en/mg-country
  - /v1/docs/mg-country
  - /v1/docs/en/mg-country
  - /v2/docs/mg-country
  - /v2/docs/en/mg-country
  - /v3/docs/mg-country
  - /v3/docs/en/mg-country
  - /v4/docs/mg-country
  - /v4/docs/en/mg-country
  - /v5/docs/mg-country
  - /v5/docs/en/mg-country
  - /v6/docs/mg-country
  - /v6/docs/en/mg-country
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-country.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-country.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-country.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-country.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-country.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-country.html
  - /docs/scos/dev/module-migration-guides/202212.0/migration-guide-country.html
---

This document describes how to upgrade the Country module.

## Prerequisites

[Upgrade to PHP 8.3](/docs/dg/dev/upgrade-and-migrate/upgrade-to-php-83.html)

## Upgrade from version 3.* to version 4.0.0

In this version of the `Country` module, we have enabled the configuration of currencies per store in the database. The `Country` module version 4 introduces the `spy_country_store` database table to persist stores-countries in Zed. You can find more details about the changes on the [Country module release page](https://github.com/spryker/country/releases).

*Estimated migration time: 5 min*

To upgrade to the new version of the module, follow the steps:

1. Upgrade the `Country` module to the new version:

```bash
composer require spryker/country:"^4.0.0" --update-with-dependencies
```

2. Update transfer objects:

```shell
vendor/bin/console transfer:generate
```

3. Apply database changes:

```shell
vendor/bin/console propel:install
```
