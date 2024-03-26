---
title: Class Silex/ControllerProviderInterface not found
description: Learn how to fix the issue when class Silex/ControllerProviderInterface is not found
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/class-silexcontrollerproviderinterface-not-found
originalArticleId: 1ed7e7c7-6975-4cdc-855c-3f5e8006a555
redirect_from:
  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/class-silex-controllerproviderinterface-not-found.html
  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/fail-whale-on-the-front-end.html
---

## Description

When a project still uses Silex, but modules were updated to the newest versions, where Silex is moved to the require-dev dependency, class `Silex/ControllerProviderInterface` is not found.

## Cause

The current version (1.0.4) of this module uses `SprykerShop\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerPlugin`which is no longer functional in the latest Spryker Core.

## Solution

Until a new version of this module is provided, users can work around this issue by overriding `EasycreditController` and using `CheckoutPageRouteProviderPlugin` instead of `CheckoutPageControllerPlugin`. Also, see [Silex replacement](/docs/dg/dev/upgrade-and-migrate/silex-replacement/silex-replacement.html).
