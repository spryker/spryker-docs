---
title: Migration Guide - QuoteRequestWidget
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-quoterequestwidget
originalArticleId: ce9c0b14-5b78-455d-99a6-8b239aca416b
redirect_from:
  - /2021080/docs/mg-quoterequestwidget
  - /2021080/docs/en/mg-quoterequestwidget
  - /docs/mg-quoterequestwidget
  - /docs/en/mg-quoterequestwidget
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
