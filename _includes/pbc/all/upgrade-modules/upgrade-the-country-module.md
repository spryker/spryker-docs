{% info_block warningBox %}

Please note that Dynamic Multistore is currently running under an Early Access Release. Early Access Releases are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %} 

This document describes how to upgrade the Country module.

## Upgrading from version 3.* to version 4.0.0

In this new version of the `Country` module, we have added support configuration currency for each store in database.
With the `Country` module version 4 we have added the `spy_country_store` database table to persist stores-countries in Zed.

You can find more details about the changes on the [Country module](https://github.com/spryker/country/releases) release page.

*Estimated migration time: 5 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the `Country` module to the new version:

```bash
composer require spryker/country:"^4.0.0" --update-with-dependencies
```

2. Run `vendor/bin/console transfer:generate` to update the transfer objects.

3. Run `vendor/bin/console propel:install` to apply the database changes.
