---
title: Migration Guide - QuoteRequestAgent
last_updated: Nov 22, 2019
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/mg-quoterequestagent
originalArticleId: 428819e3-b6cb-4cab-b941-18719f89cc55
redirect_from:
  - /v3/docs/mg-quoterequestagent
  - /v3/docs/en/mg-quoterequestagent
---

## Upgrading from Version 1.x.x to Version 2.x.x

The one major change of `QuoteRequestAgent` 2.x.x is the dependency update for `spryker/quote-request:^2.0.0`.

**To migrate the module `QuoteRequestAgent` from version 1.0.0 to 2.0.0, do the following:**

1. Update `spryker/quote-request:^2.0.` by following the steps from the [Migration Guide - QuoteRequest](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-quoterequest.html)
2. Update `spryker/quote-request-agent:^2.0.0`:

```bash
composer require spryker/quote-request-agent: "^2.0.0" --update-with-dependencies
```

3. To generate transfers, run the following command:

```bash
vendor/bin/console transfer:generate
```

*Estimated migration time: ~1h*
