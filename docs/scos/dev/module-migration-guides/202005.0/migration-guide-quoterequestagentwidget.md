---
title: Migration Guide - QuoteRequestAgentWidget
originalLink: https://documentation.spryker.com/v5/docs/mg-quoterequestagentwidget
originalArticleId: 0fea2942-0dae-46b6-867d-e3394eacffc7
redirect_from:
  - /v5/docs/mg-quoterequestagentwidget
  - /v5/docs/en/mg-quoterequestagentwidget
---

## Upgrading from Version 1.x.x to Version 2.x.x
The only major change of `QuoteRequestAgentWidget` 2.x.x is the dependency update for `spryker/quote-request-agent:^2.0.0`.

**To migrate, do the following:**
1. Update `spryker/quote-request-agent` to version ^2.0.0 by following the steps from [Migration Guide - QuoteRequestAgent](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-quoterequestagent.html).
2. Update `spryker-shop/quote-request-agent-widget:^2.0.0`

```bash
composer require spryker-shop/quote-request-agent-widget: "^2.0.0" --update-with-dependencies
```
*Estimated migration time: ~1h*
