---
title: Migration Guide - QuoteRequestAgentWidget
originalLink: https://documentation.spryker.com/v5/docs/mg-quoterequestagentwidget
redirect_from:
  - /v5/docs/mg-quoterequestagentwidget
  - /v5/docs/en/mg-quoterequestagentwidget
---

## Upgrading from Version 1.x.x to Version 2.x.x
The only major change of `QuoteRequestAgentWidget` 2.x.x is the dependency update for `spryker/quote-request-agent:^2.0.0`.

**To migrate, do the following:**
1. Update `spryker/quote-request-agent` to version ^2.0.0 by following the steps from [Migration Guide - QuoteRequestAgent](https://documentation.spryker.com/docs/en/mg-quoterequestagent).
2. Update `spryker-shop/quote-request-agent-widget:^2.0.0`

```bash
composer require spryker-shop/quote-request-agent-widget: "^2.0.0" --update-with-dependencies
```
*Estimated migration time: ~1h*
