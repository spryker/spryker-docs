---
title: Migration guide - Step Engine
description: Use the guide to learn how to update the Step Engine module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-step-engine
originalArticleId: 8c50ee23-1c7b-42ea-a4a2-e1e8ed34e68e
redirect_from:
  - /2021080/docs/mg-step-engine
  - /2021080/docs/en/mg-step-engine
  - /docs/mg-step-engine
  - /docs/en/mg-step-engine
  - /v1/docs/mg-step-engine
  - /v1/docs/en/mg-step-engine
  - /v2/docs/mg-step-engine
  - /v2/docs/en/mg-step-engine
  - /v3/docs/mg-step-engine
  - /v3/docs/en/mg-step-engine
  - /v4/docs/mg-step-engine
  - /v4/docs/en/mg-step-engine
  - /v5/docs/mg-step-engine
  - /v5/docs/en/mg-step-engine
  - /v6/docs/mg-step-engine
  - /v6/docs/en/mg-step-engine
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-step-engine.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-step-engine.html
---

## Upgrading from version 2.* to version 3.*

If you're migrating the StepEngine module from version 2 to version 3, you need to follow the steps described below.
In Version 3 the `StepCollectionInterface::getPreviousStep()` has a new second optional argument (`AbstractTransfer $dataTransfer`). If you use this interface for your own implementation, you need to update your derived class.
If `StepEngineInterface::getTemplateVariables()` is overridden in your project, you need to update the call to `StepCollectionInterface::getPreviousStep()` here as well.

<!--See also:
[Defining a Step - Step Engine](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/step-engine/step-engine-workflow-overview.html#defining-the-steps)-->
