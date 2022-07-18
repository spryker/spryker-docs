

## Upgrading from version 1.x.x to version 2.x.x

`QuoteRequest` module version 2.0.0 brings one major change - column `is_latest_version_hidden` has been replaced by `is_latest_version_visible` column in the `spy_quote_request` database table.

Its main purpose is to make the parameter name more intuitive for the end user.

*Estimated migration time: ~2h*

To migrate, do the following:

1. Update the `QuoteRequest` module to version 2.0.0:

```bash
composer require spryker/quote-request: "^2.0.0" --update-with-dependencies
```

2. Run the database migration:

```sql
BEGIN;

ALTER TABLE spy_quote_request ADD COLUMN is_latest_version_visible boolean default true;

UPDATE spy_quote_request SET is_latest_version_visible = NOT is_latest_version_hidden;

ALTER TABLE spy_quote_request DROP COLUMN is_latest_version_hidden;

COMMIT;
```

{% info_block warningBox %}

Make sure that the `spy_quote_request` table now has a new column `is_latest_version_visible`.

{% endinfo_block %}

3. Rebuild Propel models:

```bash
vendor/bin/console propel:model:build
```

This command is needed to update `SpyQuoteRequest` and other database-related classes.

So, when this command finishes its execution, `QuoteRequest-related` database classes will have new `isLatestVersionVisible` and will no longer have `isLatestVersionHidden methods`.

4. Re-generate transfer objects:

```bash
vendor/bin/console transfer:generate
```

{% info_block infoBox %}

Make sure that `QuoteRequestTransfer` now has `isLatestVersionVisible`, and doesn't have `isLatestVersionHidden` property.

{% endinfo_block %}

{% info_block warningBox %}

Make sure that, if you had usage of `QuoteTransfer::setIsLatestVersionHidden`, `QuoteTransfer::getIsLatestVersionHidden`  methods on project level, they have been updated to use the newly introduced `QuoteTransfer::getIsLatestVersionVisible` and  `QuoteTransfer::getIsLatestVersionVisible` methods with business logic inversion.

{% endinfo_block %}
