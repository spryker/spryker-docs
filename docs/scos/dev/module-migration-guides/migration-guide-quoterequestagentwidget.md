---
title: Migration guide - QuoteRequestAgentWidget
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-quoterequestagentwidget
originalArticleId: 0646a8b9-e816-40e8-95da-5ac1147f8ba8
redirect_from:
  - /2021080/docs/mg-quoterequestagentwidget
  - /2021080/docs/en/mg-quoterequestagentwidget
  - /docs/mg-quoterequestagentwidget
  - /docs/en/mg-quoterequestagentwidget
  - /v3/docs/mg-quoterequestagentwidget
  - /v3/docs/en/mg-quoterequestagentwidget
  - /v4/docs/mg-quoterequestagentwidget
  - /v4/docs/en/mg-quoterequestagentwidget
  - /v5/docs/mg-quoterequestagentwidget
  - /v5/docs/en/mg-quoterequestagentwidget
  - /v6/docs/mg-quoterequestagentwidget
  - /v6/docs/en/mg-quoterequestagentwidget
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-quoterequestagentwidget.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-quoterequestagentwidget.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-quoterequestagentwidget.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-quoterequestagentwidget.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-quoterequestagentwidget.html
---

## Upgrading from version 1.x.x to version 2.x.x

The only major change of `QuoteRequestAgentWidget` 2.x.x is the dependency update for `spryker/quote-request-agent:^2.0.0`.

**To migrate, do the following:**
1. Update `spryker/quote-request-agent` to version ^2.0.0 by following the steps from [Migration Guide - QuoteRequestAgent](/docs/scos/dev/module-migration-guides/migration-guide-quoterequestagent.html).
2. Update `spryker-shop/quote-request-agent-widget:^2.0.0`

```bash
composer require spryker-shop/quote-request-agent-widget: "^2.0.0" --update-with-dependencies
```
*Estimated migration time: ~1h*
