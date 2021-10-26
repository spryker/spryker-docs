---
title: Migration Guide - QuoteRequestPage
last_updated: Dec 23, 2019
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/mg-quoterequestpage
originalArticleId: 77c4ccc8-15e4-4e81-b383-ac851122a538
redirect_from:
  - /v4/docs/mg-quoterequestpage
  - /v4/docs/en/mg-quoterequestpage
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
