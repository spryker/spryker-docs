---
title: Migration Guide - QuoteRequestPage
originalLink: https://documentation.spryker.com/v4/docs/mg-quoterequestpage
redirect_from:
  - /v4/docs/mg-quoterequestpage
  - /v4/docs/en/mg-quoterequestpage
---

## Upgrading from Version 1.x.x to Version 2.x.x
The only major change of the `QuoteRequestPage 2.x.x` is the dependency update for `spryker/quote-request:^2.0.0`.

Also, transfer property `QuoteRequestTranser::isLatestVersionHidden` was replaced by `QuoteRequestTransfer:isLatestVersionVisible`.

**To migrate do the following:**
1. Update `spryker/quote-request` to version ^2.0.0 by following the steps from [Migration Guide - QuoteRequest](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/migration-guide-quoterequest.html).
2. Update `spryker-shop/quote-request-page:^2.0.0`

```bash
composer require spryker-shop/quote-request-page: "^2.0.0" --update-with-dependencies
```
3. Generate transfers:

```basg
vendor/bin/console transfer:generate
```
*Estimated migration time: ~1h*
