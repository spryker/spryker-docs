---
title: Migration guide - Quote
description: Use the guide to learn how to update the Quote module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-quote
originalArticleId: 96af3e13-db91-4f99-88f9-e6bc46dd41e4
redirect_from:
  - /2021080/docs/mg-quote
  - /2021080/docs/en/mg-quote
  - /docs/mg-quote
  - /docs/en/mg-quote
  - /v1/docs/mg-quote
  - /v1/docs/en/mg-quote
  - /v2/docs/mg-quote
  - /v2/docs/en/mg-quote
  - /v3/docs/mg-quote
  - /v3/docs/en/mg-quote
  - /v4/docs/mg-quote
  - /v4/docs/en/mg-quote
  - /v5/docs/mg-quote
  - /v5/docs/en/mg-quote
  - /v6/docs/mg-quote
  - /v6/docs/en/mg-quote
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-quote.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-quote.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-quote.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-quote.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-quote.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-quote.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-quote.html
related:
  - title: Migration guide - Cart
    link: docs/scos/dev/module-migration-guides/migration-guide-cart.html
---

## Upgrading from version 1.* to version 2.*

The new version of the **Quote** module provides the ability to save customer quote into the database and get it. Version 2 of the `Quote` module introduced a new schema.

Quote storage strategy (session, database) can be changed in `Spryker\Shared\Quote\QuoteConfig::getStorageStrategy`.

If you’re migrating the `Quote` module from version 1 to version 2,  follow the steps described below.

### Perform database migration

* Run `vendor/bin/console propel:diff`, also manual review is necessary for the generated migration file;
* Run `vendor/bin/console propel:migrate`;
* Run `vendor/bin/console propel:model:build`.

After running the last command you’ll find some new classes in your project under `\Orm\Zed\Cms\Persistence` namespace. It’s important to make sure that they are extending the base classes from the core, for example, `Orm\Zed\Quote\Persistence\SpyQuote` extends `\Spryker\Zed\Quote\Persistence\Propel\AbstractSpyQuote``Orm\Zed\Quote\Persistence\SpyQuoteQuery extends Spryker\Zed\Quote\Persistence\Propel\AbstractSpyQuoteQuery.`

With this version quote storage strategies (session, database) have been added.

They implement the interface `Spryker\Client\Quote\StorageStrategy\StorageStrategyInterface`, which extends `QuoteClientInterface`.

Any of your changes from `QuoteClientInterface` should be implemented in `Spryker\Client\Quote\StorageStrategy\DatabaseStorageStrategy` and `Spryker\Client\Quote\StorageStrategy\SessionStorageStrategy`.

<!-- Last review date: Apr 10, 2018*  by  Dmitriy Krainiy-->
