

## Upgrading from version 2.x.x to version 3.x.x

In this new version of the `QuoteRequestPage` module, we have added support of shipment costs. You can find more details about the changes on the [QuoteRequestPage module release page](https://github.com/spryker-shop/quote-request-page/releases). The major changes are:

* Added new dependency for spryker/shipment:^8.4.0.
* Added new dependency for spryker/step-engine:^3.3.0.
* Removed several twig files.


*Estimated migration time: ~2h*


To migrate, do the following:

1. Update the `QuoteRequestPage` module:

```bash
composer require spryker-shop/quote-request-page: "^3.0.0" --update-with-dependencies
```

2. Regenerate transfer objects:

```bash
console transfer:generate
```

3. Some files were re-organized,  check if you had overwritten them on project level:

   * Renamed `quote-request-cart-summary` into `quote-request-summary`.
   * Renamed `quote-request-discount-summary` into `quote-request-summary-discount`.
   * Adjusted `page-layout-quote-request` to extend `page-layout-main` template instead of `page-layout-customer`.
   * Introduced a new `quoteRequestReference` data property to `quote-request-edit` view.
   * Adjusted `quote-request-view` view to extend `page-layout-customer` template instead of `page-layout-quote-request`.
   * Removed `quote-request-cart-item` molecule.



## Upgrading from version 1.x.x to version 2.x.x

The only major change of the `QuoteRequestPage 2.x.x` is the dependency update for `spryker/quote-request:^2.0.0`.

Also, transfer property `QuoteRequestTransfer::isLatestVersionHidden` was replaced by `QuoteRequestTransfer:isLatestVersionVisible`.

*Estimated migration time: ~1h*

To migrate do the following:

1. Update `spryker/quote-request` to version ^2.0.0 by following the steps from [Upgrade the QuoteRequest module](/docs/pbc/all/request-for-quote/{{site.version}}/install-and-upgrade/upgrade-modules/upgrade-the-quoterequest-module.html).
2. Update `spryker-shop/quote-request-page:^2.0.0`

```bash
composer require spryker-shop/quote-request-page: "^2.0.0" --update-with-dependencies
```

3. Generate transfers:

```bash
vendor/bin/console transfer:generate
```
