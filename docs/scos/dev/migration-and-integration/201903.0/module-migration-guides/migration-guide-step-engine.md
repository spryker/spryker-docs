---
title: Migration Guide - Step Engine
originalLink: https://documentation.spryker.com/v2/docs/mg-step-engine
originalArticleId: 78b8f369-abc4-42ae-b035-66fc07d1e86c
redirect_from:
  - /v2/docs/mg-step-engine
  - /v2/docs/en/mg-step-engine
---

## Upgrading from Version 2.* to Version 3.*

If you're migrating the StepEngine module from version 2 to version 3, you need to follow the steps described below.
In Version 3 the `StepCollectionInterface::getPreviousStep()` has a new second optional argument (`AbstractTransfer $dataTransfer`). If you use this interface for your own implementation, you need to update your derived class.
If `StepEngineInterface::getTemplateVariables()` is overridden in your project, you need to update the call to `StepCollectionInterface::getPreviousStep()` here as well.

<!--See also:
[Defining a Step - Step Engine](https://documentation.spryker.com/capabilities/order_management/step_engine/step-engine-define-step.htm)-->
