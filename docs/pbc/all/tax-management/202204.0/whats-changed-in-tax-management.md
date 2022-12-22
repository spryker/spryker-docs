---
title: What's changed in Tax Management
last_updated: Jul 29, 2022
description: This document lists all the Tax Management releases
template: concept-topic-template
---

## April 18th, 2022

This release contains the following modules:
* [TaxProductStorage](https://github.com/spryker/tax-product-storage/releases/tag/1.2.0)
* [TaxStorage](https://github.com/spryker/tax-storage/releases/tag/1.3.0)

[Public release details](https://api.release.spryker.com/release-group/2084)

**Fixes**

* Removed deprecated usage of `DatabaseTransactionHandlerTrait::preventTransaction()`.
* Removed `PropelOrm` version BC.

## July 9th, 2020

This release contains one module, [Tax](https://github.com/spryker/tax/releases/tag/5.9.0).

[Public release details](https://api.release.spryker.com/release-group/2771)

**Improvements**

* Adjusted `DeleteRateController::confirmAction()` in order to use CSRF protection.
* Adjusted `DeleteSetController::confirmAction()` in order to use CSRF protection.

## July 6th, 2020

This release contains one module, [Tax](https://github.com/spryker/tax/releases/tag/5.8.10)

[Public release details](https://api.release.spryker.com/release-group/2715)

**Fixes**

* Adjusted translations.

## July 3rd, 2020

This release contains the following modules:
* [TaxProductStorage](https://github.com/spryker/tax-product-storage/releases/tag/1.1.0)
* [TaxStorage](https://github.com/spryker/tax-storage/releases/tag/1.2.0)

[Public release details](https://api.release.spryker.com/release-group/2714)

**Improvements**

* Introduced `Spryker\Zed\TaxProductStorage\TaxProductStorageConfig::getEventQueueName()` to define event queue name for publish.
* Introduced `Spryker\Zed\TaxStorage\TaxStorageConfig::getEventQueueName()` to define event queue name for publish.
