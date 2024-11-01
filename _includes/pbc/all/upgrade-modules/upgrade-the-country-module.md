This document describes how to upgrade the Country module.

## Prerequisites

[Upgrade to PHP 8.2](/docs/dg/dev/upgrade-and-migrate/upgrade-to-php-81.html)

## Upgrade from version 3.* to version 4.0.0

{% info_block warningBox %}

Dynamic Multistore is currently running under an *Early Access Release*. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

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
