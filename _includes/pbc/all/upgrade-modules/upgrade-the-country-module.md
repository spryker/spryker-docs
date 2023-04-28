This document describes how to upgrade the Country module.

## Upgrading from version 3.* to version 4.0.0

In this new 4.0.0 version of the `Country` module, we have added support configuration currency for each store in the database.
With the new 4.0.0 version of the `Country` module, we have added the `spy_country_store` database table to persist stores-countries in Zed.

You can find more details about the changes on the [Country module](https://github.com/spryker/country/releases) release page.

*Estimated migration time: 5 minutes*

To upgrade to the new version of the module, do the following:

1. Upgrade the `Country` module to the new version:

```bash
composer require spryker/country:"^4.0.0" --update-with-dependencies
```

2. Run `vendor/bin/console transfer:generate` to update the transfer objects.

3. Run `vendor/bin/console propel:install` to apply the database changes.