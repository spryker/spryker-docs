---
title: Migration Guide - Quote
originalLink: https://documentation.spryker.com/v1/docs/mg-quote
redirect_from:
  - /v1/docs/mg-quote
  - /v1/docs/en/mg-quote
---

## Upgrading from Version 1.* to Version 2.*
The new version of the **Quote** module provides the ability to save customer quote into the database and get it. Version 2 of the `Quote` module introduced a new schema.

Quote storage strategy (session, database) can be changed in `Spryker\Shared\Quote\QuoteConfig::getStorageStrategy`.

If you’re migrating the `Quote` module from version 1 to version 2,  follow the steps described below.

### Perform database migration

* Run `vendor/bin/console propel:diff`, also manual review is necessary for the generated migration file;
* Run `vendor/bin/console propel:migrate`;
* Run `vendor/bin/console propel:model:build`.
 
After running the last command you’ll find some new classes in your project under `\Orm\Zed\Cms\Persistence` namespace. It’s important to make sure that they are extending the base classes from the core, i.e. `Orm\Zed\Quote\Persistence\SpyQuote` extends `\Spryker\Zed\Quote\Persistence\Propel\AbstractSpyQuote``Orm\Zed\Quote\Persistence\SpyQuoteQuery extends Spryker\Zed\Quote\Persistence\Propel\AbstractSpyQuoteQuery.`

With this version quote storage strategies (session, database) have been added. 

They implement the interface `Spryker\Client\Quote\StorageStrategy\StorageStrategyInterface`, which extends `QuoteClientInterface`.

Any of your changes from `QuoteClientInterface` should be implemented in `Spryker\Client\Quote\StorageStrategy\DatabaseStorageStrategy` and `Spryker\Client\Quote\StorageStrategy\SessionStorageStrategy`.

<!-- Last review date: Apr 10, 2018*  by  Dmitriy Krainiy-->
