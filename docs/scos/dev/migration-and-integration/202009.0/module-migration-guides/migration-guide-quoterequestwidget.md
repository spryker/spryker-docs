---
title: Migration Guide - QuoteRequestWidget
originalLink: https://documentation.spryker.com/v6/docs/mg-quoterequestwidget
originalArticleId: 9a36d091-7c0c-4481-820b-3abfbf927a43
redirect_from:
  - /v6/docs/mg-quoterequestwidget
  - /v6/docs/en/mg-quoterequestwidget
---

## Upgrading from Version 1.x.x to Version 2.x.x
The only major change of the `QuoteRequestWidget` 2.x.x is the dependency update for the `spryker/quote-request:^2.0.0`.

**To migrate do the following:**
1. Update `spryker/quote-request` to version ^2.0.0 by following the steps from [Migration Guide - QuoteRequest](/docs/scos/dev/migration-and-integration/202009.0/module-migration-guides/migration-guide-quoterequest.html).
2. Update `spryker-shop/quote-request-widget:^2.0.0`

```bash
composer require spryker-shop/quote-request-widget: "^2.0.0" --update-with-dependencies
```

*Estimated migration time: ~1h*
