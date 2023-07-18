---
title: What's changed in Cart and Checkout
last_updated: Oct 2, 2022
description: This document lists all the Cart and Checkout releases
template: concept-topic-template
---

## February 2nd, 2022

[Calculation](https://github.com/spryker/calculation/releases/tag/4.12.0) module improvements:

* Adjusted `CalculationFacade::validateCheckoutGrandTotal()` facade method to set `CheckoutResponseTransfer.isSuccess` as false on failure.
* Impacted `CheckoutGrandTotalPreCondition` plugin with facade changes.
* Introduced `CheckoutResponse.isSuccess` transfer field.

[Public release details](https://api.release.spryker.com/release-group/2799).


## March 22nd, 2022

In [SalesOrderThresholdGui](https://github.com/spryker/sales-order-threshold-gui/releases/tag/1.7.0) module, adjusted `GlobalSoftThresholdType` in order to set placeholder for empty soft threshold.


[Public release details](https://api.release.spryker.com/release-group/4015).

## April 1st, 2022

[SalesOrderThreshold](https://github.com/spryker/sales-order-threshold/releases/tag/1.7.0) module:

* Fixes:
    * Fixed `SalesOrderThresholdFacade::getSalesOrderThresholds()` so it expands sales order thresholds with correct translations.
* Improvements:
    * Introduced `GlossaryKey` transfer object.
    * Added `Translation.fkGlossaryKey` transfer property.
* Adjustments:
    * Added `GlossaryFacadeInterface::getGlossaryKeyTransfersByGlossaryKeys()` to dependencies.

[Public release details](https://api.release.spryker.com/release-group/4029).

## May 16, 2022

In [DummyPayment](https://github.com/spryker/checkout/releases/tag/6.4.0) module, added strict types for return values.

[Public release details](https://api.release.spryker.com/release-group/3046).

## Jun 06, 2022

In [Checkout](https://github.com/spryker/checkout/releases/tag/6.4.0) module, deprecated `CheckoutPreSaveInterface`.

[Public release details](hhttps://api.release.spryker.com/release-group/4066).

## June 21th, 2022

[Cart](https://github.com/spryker/cart/releases/tag/7.11.0) module improvements:

* Introduced `GroupKeyWithCartIdentifierItemExpanderPlugin` plugin in order to expand group keys with quote identifier.
* Introduced `CartFacade::expandItemGroupKeysWithCartIdentifier()`.
* Added `UtilTextServiceInterface` to dependencies.
* Introduced `Quote.idQuote` transfer field.

[Public release details](https://api.release.spryker.com/release-group/4187).


* [SharedCart](https://github.com/spryker/shared-cart/releases/tag/1.19.0) module improvements:

* Introduced `SharedCartCommentValidatorPlugin` to validate comments before persisting.
* Introduced `SharedCartFacade::validateSharedCartComment()`.
* Introduced `CommentRequest` transfer.
* Introduced `Comment` transfer.
* Introduced `CommentValidationResponse` transfer.
* Added `CommentExtension` module to dependencies.

[Public release details](https://api.release.spryker.com/release-group/3564).



## Jul 19th, 2022

[MultiCart](https://github.com/spryker/multi-cart/releases/tag/1.8.0) module changes:

* Added `Transfer` module to dependencies.
* Adjusted `MultiCartFacade::addDefaultQuoteChangedMessage()` so it shows the default quote changed message only to the quote owner. `AddDefaultQuoteChangedMessageQuoteUpdateBeforePlugin` is impacted.

[Public release details](https://api.release.spryker.com/release-group/4194).


## Sep 19th, 2022


[SalesOrderThresholdGui](https://github.com/spryker/sales-order-threshold-gui/releases/tag/1.8.0) module improvements:

* Adjusted `GlobalSoftThresholdFixedFeeFormExpanderPlugin::expand()` to display formatted fixed fee based on locale.
* Adjusted `GlobalController::indexAction()` to display formatted hard threshold, hard maximum threshold, and soft threshold.
* Added `LocaleFacadeInterface::getCurrentLocaleName()` to dependencies.
* Increased `Gui` dependency version.

[Public release details](https://api.release.spryker.com/release-group/3883).
