---
title: Migration Guide - QuoteRequestWidget
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/mg-quoterequestwidget
originalArticleId: 39da1113-1933-4d80-8781-e9bc7f13a594
redirect_from:
  - /v5/docs/mg-quoterequestwidget
  - /v5/docs/en/mg-quoterequestwidget
---

## Upgrading from Version 1.x.x to Version 2.x.x
The only major change of the `QuoteRequestWidget` 2.x.x is the dependency update for the `spryker/quote-request:^2.0.0`.

**To migrate do the following:**
1. Update `spryker/quote-request` to version ^2.0.0 by following the steps from [Migration Guide - QuoteRequest](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-quoterequest.html).
2. Update `spryker-shop/quote-request-widget:^2.0.0`

```bash
composer require spryker-shop/quote-request-widget: "^2.0.0" --update-with-dependencies
```

*Estimated migration time: ~1h*
