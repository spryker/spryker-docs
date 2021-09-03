---
title: Migration Guide - QuoteRequestPage
originalLink: https://documentation.spryker.com/v3/docs/mg-quoterequestpage
originalArticleId: e2f846cb-ad5b-40e5-8bca-908d5d30f941
redirect_from:
  - /v3/docs/mg-quoterequestpage
  - /v3/docs/en/mg-quoterequestpage
---

## Upgrading from Version 1.x.x to Version 2.x.x
The only major change of the `QuoteRequestPage 2.x.x` is the dependency update for `spryker/quote-request:^2.0.0`.

Also, transfer property `QuoteRequestTranser::isLatestVersionHidden` was replaced by `QuoteRequestTransfer:isLatestVersionVisible`.

**To migrate do the following:**
1. Update `spryker/quote-request` to version ^2.0.0 by following the steps from [Migration Guide - QuoteRequest](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-quoterequest.html).
2. Update `spryker-shop/quote-request-page:^2.0.0`

```bash
composer require spryker-shop/quote-request-page: "^2.0.0" --update-with-dependencies
```
3. Generate transfers:

```basg
vendor/bin/console transfer:generate
```
*Estimated migration time: ~1h*
