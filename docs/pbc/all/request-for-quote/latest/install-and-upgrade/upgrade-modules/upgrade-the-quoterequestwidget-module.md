---
title: Upgrade the QuoteRequestWidget module
description: Learn how to upgrade to a newer version of the Quote Request widget module in your Spryker based projects.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-quoterequestwidget
originalArticleId: ce9c0b14-5b78-455d-99a6-8b239aca416b
redirect_from:
  - /2021080/docs/mg-quoterequestwidget
  - /2021080/docs/en/mg-quoterequestwidget
  - /docs/mg-quoterequestwidget
  - /docs/en/mg-quoterequestwidget
  - /v3/docs/mg-quoterequestwidget
  - /v3/docs/en/mg-quoterequestwidget
  - /v4/docs/mg-quoterequestwidget
  - /v4/docs/en/mg-quoterequestwidget
  - /v5/docs/mg-quoterequestwidget
  - /v5/docs/en/mg-quoterequestwidget
  - /v6/docs/mg-quoterequestwidget
  - /v6/docs/en/mg-quoterequestwidget
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-quoterequestwidget.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-quoterequestwidget.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-quoterequestwidget.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-quoterequestwidget.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-quoterequestwidget.html
  - /docs/scos/dev/module-migration-guides/migration-guide-quoterequestwidget.html
  - /docs/pbc/all/request-for-quote/202204.0/install-and-upgrade/upgrade-modules/upgrade-the-quoterequestwidget-module.html
---

## Upgrading from version 1.x.x to version 2.x.x

The only major change of the `QuoteRequestWidget` 2.x.x is the dependency update for the `spryker/quote-request:^2.0.0`.

*Estimated migration time: ~1h*

To migrate do the following:

1. Update `spryker/quote-request` to version ^2.0.0 by following the steps from [Upgrade the QuoteRequest module](/docs/pbc/all/request-for-quote/{{site.version}}/install-and-upgrade/upgrade-modules/upgrade-the-quoterequest-module.html).
2. Update `spryker-shop/quote-request-widget:^2.0.0`

```bash
composer require spryker-shop/quote-request-widget: "^2.0.0" --update-with-dependencies
```
