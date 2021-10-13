---
title: Migration Guide - Step Engine
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v1/docs/mg-step-engine
originalArticleId: fa3d59b8-c732-425f-bb16-09e3b8939cb8
redirect_from:
  - /v1/docs/mg-step-engine
  - /v1/docs/en/mg-step-engine
---

## Upgrading from Version 2.* to Version 3.*

If you're migrating the StepEngine module from version 2 to version 3, you need to follow the steps described below.
In Version 3 the `StepCollectionInterface::getPreviousStep()` has a new second optional argument (`AbstractTransfer $dataTransfer`). If you use this interface for your own implementation, you need to update your derived class.
If `StepEngineInterface::getTemplateVariables()` is overridden in your project, you need to update the call to `StepCollectionInterface::getPreviousStep()` here as well.

<!--See also:
[Defining a Step - Step Engine](https://documentation.spryker.com/capabilities/order_management/step_engine/step-engine-define-step.htm)-->
