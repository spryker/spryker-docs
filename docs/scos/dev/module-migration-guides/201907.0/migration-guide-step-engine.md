---
title: Migration Guide - Step Engine
last_updated: Nov 22, 2019
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/mg-step-engine
originalArticleId: 20acdeb6-326d-485a-b9e9-dcb81922a06b
redirect_from:
  - /v3/docs/mg-step-engine
  - /v3/docs/en/mg-step-engine
---

## Upgrading from Version 2.* to Version 3.*

If you're migrating the StepEngine module from version 2 to version 3, you need to follow the steps described below.
In Version 3 the `StepCollectionInterface::getPreviousStep()` has a new second optional argument (`AbstractTransfer $dataTransfer`). If you use this interface for your own implementation, you need to update your derived class.
If `StepEngineInterface::getTemplateVariables()` is overridden in your project, you need to update the call to `StepCollectionInterface::getPreviousStep()` here as well.

<!--See also:
[Defining a Step - Step Engine](https://documentation.spryker.com/capabilities/order_management/step_engine/step-engine-define-step.htm)-->
