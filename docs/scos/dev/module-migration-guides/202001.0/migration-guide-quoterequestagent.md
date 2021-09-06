---
title: Migration Guide - QuoteRequestAgent
originalLink: https://documentation.spryker.com/v4/docs/mg-quoterequestagent
originalArticleId: bc293272-ca1c-4926-95f4-246983b4ac62
redirect_from:
  - /v4/docs/mg-quoterequestagent
  - /v4/docs/en/mg-quoterequestagent
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
