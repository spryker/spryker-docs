---
title: Migration Guide - QuoteRequestWidget
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/mg-quoterequestwidget
originalArticleId: 4bfd0a93-7f19-4ca7-b0a4-5ae05cfa91d3
redirect_from:
  - /v3/docs/mg-quoterequestwidget
  - /v3/docs/en/mg-quoterequestwidget
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
