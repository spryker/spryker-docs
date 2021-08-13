---
title: Migration Guide - Step Engine
description: Use the guide to learn how to update the Step Engine module to a newer version.
originalLink: https://documentation.spryker.com/v6/docs/mg-step-engine
originalArticleId: 38f0b774-cab0-4132-a1d6-0b81ac633f23
redirect_from:
  - /v6/docs/mg-step-engine
  - /v6/docs/en/mg-step-engine
---

## Upgrading from Version 2.* to Version 3.*

If you're migrating the StepEngine module from version 2 to version 3, you need to follow the steps described below.
In Version 3 the `StepCollectionInterface::getPreviousStep()` has a new second optional argument (`AbstractTransfer $dataTransfer`). If you use this interface for your own implementation, you need to update your derived class.
If `StepEngineInterface::getTemplateVariables()` is overridden in your project, you need to update the call to `StepCollectionInterface::getPreviousStep()` here as well.

<!--See also:
[Defining a Step - Step Engine](https://documentation.spryker.com/capabilities/order_management/step_engine/step-engine-define-step.htm)-->
