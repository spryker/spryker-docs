---
title: Class Silex/ControllerProviderInterface not found
originalLink: https://documentation.spryker.com/2021080/docs/class-silexcontrollerproviderinterface-not-found
redirect_from:
  - /2021080/docs/class-silexcontrollerproviderinterface-not-found
  - /2021080/docs/en/class-silexcontrollerproviderinterface-not-found
---

## Description

When a project still uses Silex, but modules were updated to the newest versions, where Silex is moved to the require-dev dependency, class `Silex/ControllerProviderInterface` is not found.

## Cause
The current version (1.0.4) of this module uses `SprykerShop\Yves\CheckoutPage\Plaugin\Provider\CheckoutPageControllerPlugin`which is no longer functional in the latest Spryker Core.

## Solution
Until a new version of this module is provided, users can work around this issue by overriding `EasycreditController` and using `CheckoutPageRouteProviderPlugin` instead of `CheckoutPageControllerPlugin`. Also, see [Silex replacement](https://documentation.spryker.com/docs/silex-replacement).
