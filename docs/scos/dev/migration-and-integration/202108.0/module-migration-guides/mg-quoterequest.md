---
title: Migration Guide - QuoteRequestAgentWidget
originalLink: https://documentation.spryker.com/2021080/docs/mg-quoterequestagentwidget
redirect_from:
  - /2021080/docs/mg-quoterequestagentwidget
  - /2021080/docs/en/mg-quoterequestagentwidget
---

## Upgrading from Version 1.x.x to Version 2.x.x
The only major change of `QuoteRequestAgentWidget` 2.x.x is the dependency update for `spryker/quote-request-agent:^2.0.0`.

**To migrate, do the following:**
1. Update `spryker/quote-request-agent` to version ^2.0.0 by following the steps from [Migration Guide - QuoteRequestAgent](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-quoterequest).
2. Update `spryker-shop/quote-request-agent-widget:^2.0.0`

```bash
composer require spryker-shop/quote-request-agent-widget: "^2.0.0" --update-with-dependencies
```
*Estimated migration time: ~1h*
