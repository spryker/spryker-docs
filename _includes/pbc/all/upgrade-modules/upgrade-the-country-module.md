This document describes how to upgrade the Country module.

## Prerequisites

[Upgrade to PHP 8.4](/docs/dg/dev/upgrade-and-migrate/upgrade-to-php-84.html)

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
