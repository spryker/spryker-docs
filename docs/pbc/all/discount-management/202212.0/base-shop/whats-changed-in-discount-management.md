---
title: What's changed in Discount Management
last_updated: Jul 29, 2022
description: This document lists the latest Discount Management releases
template: concept-topic-template
---


## July 22st, 2022

This release contains one module, [Discount](https://github.com/spryker/discount/releases/tag/9.27.2).

[Public release details](https://api.release.spryker.com/release-group/4173).


**Adjustments**

* Adjusted `main.js` to revert `es6` syntax.
* Removed a redundant `package-lock.json` file from assets.


## July 7th, 2022

This release contains one module, [Discount promotion](https://github.com/spryker/discount-promotion/releases/tag/4.8.0).

[Public release details](https://api.release.spryker.com/release-group/4232).

**Improvements**

* Introduced `DiscountPromotionFacade::postUpdateDiscount()` to save the promotion discount after discount is updated.
* Introduced `DiscountPromotionDiscountPostUpdatePlugin` to save the promotion discount after discount is updated.


## July 4th, 2022

This release contains one module, [Discount](https://github.com/spryker/discount/releases/tag/9.27.1).

[Public release details](https://api.release.spryker.com/release-group/4245).

**Fixes**

Fixed the data builder `DiscountGeneral::validTo` to the maximum allowed date that can be inserted in the database.
