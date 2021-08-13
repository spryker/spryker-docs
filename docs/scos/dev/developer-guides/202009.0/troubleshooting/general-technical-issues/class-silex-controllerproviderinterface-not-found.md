---
title: Class Silex/ControllerProviderInterface not found
description: Learn how to fix the issue when class Silex/ControllerProviderInterface is not found
originalLink: https://documentation.spryker.com/v6/docs/class-silexcontrollerproviderinterface-not-found
originalArticleId: 8d67d399-d458-42bd-b27a-b8d7d48b1d31
redirect_from:
  - /v6/docs/class-silexcontrollerproviderinterface-not-found
  - /v6/docs/en/class-silexcontrollerproviderinterface-not-found
---

## Description

When a project still uses Silex, but modules were updated to the newest versions, where Silex is moved to the require-dev dependency, class `Silex/ControllerProviderInterface` is not found.

## Cause
The current version (1.0.4) of this module uses `SprykerShop\Yves\CheckoutPage\Plaugin\Provider\CheckoutPageControllerPlugin`which is no longer functional in the latest Spryker Core.

## Solution
Until a new version of this module is provided, users can work around this issue by overriding `EasycreditController` and using `CheckoutPageRouteProviderPlugin` instead of `CheckoutPageControllerPlugin`. Also, see [Silex replacement](/docs/scos/dev/migration-and-integration/202009.0/migration-concepts/silex-replacement/silex-replacement.html).
