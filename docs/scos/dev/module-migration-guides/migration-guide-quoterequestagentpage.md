---
title: Migration guide - QuoteRequestAgentPage
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-quoterequestagentpage
originalArticleId: 479461ef-8500-4c8d-98f6-0a9288f9548f
redirect_from:
  - /2021080/docs/mg-quoterequestagentpage
  - /2021080/docs/en/mg-quoterequestagentpage
  - /docs/mg-quoterequestagentpage
  - /docs/en/mg-quoterequestagentpage
  - /v3/docs/mg-quoterequestagentpage
  - /v3/docs/en/mg-quoterequestagentpage
  - /v4/docs/mg-quoterequestagentpage
  - /v4/docs/en/mg-quoterequestagentpage
  - /v5/docs/mg-quoterequestagentpage
  - /v5/docs/en/mg-quoterequestagentpage
  - /v6/docs/mg-quoterequestagentpage
  - /v6/docs/en/mg-quoterequestagentpage
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-quoterequestagentpage.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-quoterequestagentpage.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-quoterequestagentpage.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-quoterequestagentpage.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-quoterequestagentpage.html
---

## Upgrading from Version 1.x.x to Version 2.x.x

The only major change of the `QuoteRequestAgentPage` 2.x.x is the dependency update for `spryker/quote-request-agent:^2.0.0` and `spryker/quote-request:^2.0.0`

Also, transfer property `QuoteRequestTranser::isLatestVersionHidden` was replaced by `QuoteRequestTransfer:isLatestVersionVisible`.

**To migrate do the following:**
1. Update `spryker/quote-request-agent` to version ^2.0.0 by following the steps from [Migration Guide - QuoteRequest](/docs/scos/dev/module-migration-guides/migration-guide-quoterequest.html).
2. Update `spryker/quote-request` to version ^2.0.0 by following the steps from [Migration Guide - Quote Request Agent](/docs/scos/dev/module-migration-guides/migration-guide-quoterequest.html).
3. Update `spryker-shop/quote-request-agent-page:^2.0.0`

```bash
composer require spryker-shop/quote-request-agent-page: "^2.0.0" --update-with-dependencies
```

4. If you modified anything in the following files on the project level, ensure that the new module version changes do not conflict with yours:

```php
src/SprykerShop/Yves/QuoteRequestAgentPage/Form/QuoteRequestAgentForm.php
src/SprykerShop/Yves/QuoteRequestAgentPage/Theme/default/views/quote-request-details/quote-request-details.twig   
src/SprykerShop/Yves/QuoteRequestAgentPage/Theme/default/views/quote-request-edit/quote-request-edit.twig
```

5. To generate transfers, run the following command:

```bash
vendor/bin/console transfer:generate
```

*Estimated migration time: ~1h*
