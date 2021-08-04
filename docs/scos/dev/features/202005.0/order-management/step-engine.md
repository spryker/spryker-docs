---
title: Step Engine
originalLink: https://documentation.spryker.com/v5/docs/step-engine
redirect_from:
  - /v5/docs/step-engine
  - /v5/docs/en/step-engine
---

The StepEngine module provides an easy way to define multi-step pages with forms.

Using this module you can define `Steps` and additionally you can link forms to interact with the user.

This is useful in handling the checkout process where you can define multiple steps, such as:

* select payment method;
* select shipment method;
* enter voucher code;
* view order summary.

Every form can have its own. The transfer object of a particular step is injected into the main transfer object by the StepEngine, after it is filled with the user data from its corresponding form.

 <!-- these files are not displayed in the Flare TOC
**See also:**

* Step Engine Workflow
* Defining a Step - Step Engine
* Use Case Scenario - Step Engine
* Breadcrumb Navigation - Step Engine
-->
