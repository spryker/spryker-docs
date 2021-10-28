---
title: Class Silex/ControllerProviderInterface not found
description: Learn how to fix the issue when class Silex/ControllerProviderInterface is not found
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/class-silexcontrollerproviderinterface-not-found
originalArticleId: 1ed7e7c7-6975-4cdc-855c-3f5e8006a555
redirect_from:
  - /2021080/docs/class-silexcontrollerproviderinterface-not-found
  - /2021080/docs/en/class-silexcontrollerproviderinterface-not-found
  - /docs/class-silexcontrollerproviderinterface-not-found
  - /docs/en/class-silexcontrollerproviderinterface-not-found
  - /v6/docs/class-silexcontrollerproviderinterface-not-found
  - /v6/docs/en/class-silexcontrollerproviderinterface-not-found
---

## Description

When a project still uses Silex, but modules were updated to the newest versions, where Silex is moved to the require-dev dependency, class `Silex/ControllerProviderInterface` is not found.

## Cause
The current version (1.0.4) of this module uses `SprykerShop\Yves\CheckoutPage\Plaugin\Provider\CheckoutPageControllerPlugin`which is no longer functional in the latest Spryker Core.

## Solution
Until a new version of this module is provided, users can work around this issue by overriding `EasycreditController` and using `CheckoutPageRouteProviderPlugin` instead of `CheckoutPageControllerPlugin`. Also, see [Silex replacement](/docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html).
