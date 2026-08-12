---
title: Upgrade the StepEngine module
description: Use the guide to learn how to update the Step Engine module to a newer version.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-step-engine
originalArticleId: 8c50ee23-1c7b-42ea-a4a2-e1e8ed34e68e
redirect_from:
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/migration-guide-step-engine.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-stepengine-module.html
---

## Upgrading from version 2.* to version 3.*

In Version 3 `StepCollectionInterface::getPreviousStep()` has a new second optional argument: `AbstractTransfer $dataTransfer`. Depending on your usage of the interface, do the following:

- If the interface is used for your own implementation, update your derived class.
- If the interface is overridden in your project, update the call to `StepCollectionInterface::getPreviousStep()` as well.
