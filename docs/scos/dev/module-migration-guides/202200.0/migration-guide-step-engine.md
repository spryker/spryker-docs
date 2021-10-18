---
title: Migration Guide - Step Engine
description: Use the guide to learn how to update the Step Engine module to a newer version.
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-step-engine
originalArticleId: 8c50ee23-1c7b-42ea-a4a2-e1e8ed34e68e
redirect_from:
  - /2021080/docs/mg-step-engine
  - /2021080/docs/en/mg-step-engine
  - /docs/mg-step-engine
  - /docs/en/mg-step-engine
---

## Upgrading from Version 2.* to Version 3.*

If you're migrating the StepEngine module from version 2 to version 3, you need to follow the steps described below.
In Version 3 the `StepCollectionInterface::getPreviousStep()` has a new second optional argument (`AbstractTransfer $dataTransfer`). If you use this interface for your own implementation, you need to update your derived class.
If `StepEngineInterface::getTemplateVariables()` is overridden in your project, you need to update the call to `StepCollectionInterface::getPreviousStep()` here as well.

<!--See also:
[Defining a Step - Step Engine](https://documentation.spryker.com/capabilities/order_management/step_engine/step-engine-define-step.htm)-->
