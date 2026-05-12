---
title: "Step engine: Workflow overview"
description: This document provides an overview of the Spryker step engine feature within the Spryker Order Management System Module.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/step-engine-workflow
originalArticleId: 5709d2f5-13f8-4c94-bbc2-a24f998cfb9f
redirect_from:
  - /2021080/docs/step-engine-workflow
  - /2021080/docs/en/step-engine-workflow
  - /docs/step-engine-workflow
  - /docs/en/step-engine-workflow
  - /v6/docs/step-engine-workflow
  - /v6/docs/en/step-engine-workflow
  - /v5/docs/step-engine-workflow
  - /v5/docs/en/step-engine-workflow
  - /v4/docs/step-engine-workflow
  - /v4/docs/en/step-engine-workflow
  - /v3/docs/step-engine-workflow
  - /v3/docs/en/step-engine-workflow
  - /v2/docs/step-engine-workflow
  - /v2/docs/en/step-engine-workflow
  - /v1/docs/step-engine-workflow
  - /v1/docs/en/step-engine-workflow
  - /v1/docs/step-engine
  - /v1/docs/en/step-engine
  - /v2/docs/step-engine
  - /v2/docs/en/step-engine
  - /v3/docs/step-engine
  - /v3/docs/en/step-engine
  - /v4/docs/step-engine
  - /v4/docs/en/step-engine
  - /v5/docs/step-engine
  - /v5/docs/en/step-engine
  - /docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/step-engine/step-engine-workflow-overview.html
related:
  - title: "Step engine: Use case scenario"
    link: docs/pbc/all/order-management-system/page.version/base-shop/datapayload-conversion/step-engine/step-engine-use-case-scenario.html
  - title: "Step engine: Use case scenario"
    link: docs/pbc/all/order-management-system/page.version/base-shop/datapayload-conversion/step-engine/step-engine-create-breadcrumb-navigation.html
---

To define a multi-step process using the StepEngine feature, you need to implement the following interfaces:

- `StepInterface`: Implements the logic that needs to get executed when the defined step takes place
- `SubFormInterface`: Defines the name of the form and `pathProperty`, which is used to fill the property of a transfer object for the current step.
- `DataContainerInterface`: Holds the transfer object you are working on.

## Defining steps

The defined steps are wired up through the parameters that are passed when creating `StepEngine`:

- `StepCollectionInterface`: Contains all the steps that are used in the`StepEngine::process()`
- `DataContainerInterface`: Holds the main transfer object and knows how to persist the data during the requests

`StepEngine` takes care of executing the steps defined in your `StepCollection`. To start the multi-step workflow, you need to call the `StepEngine::process()` operation from your controller and pass the request object to it; optionally, you can pass `FormCollectionHandlerInterface` to it.

## Processing the workflow

When `StepEngine` starts to process the multi-step workflow, it iterates through the steps contained in the step collection.

For the current step, it checks if it meets the assigned preconditions by calling `StepInterface::preCondition()`.

- The preconditions are not satisfied: `StepEngine` returns `RedirectResponse` to the defined `StepInterface::getEscapeRoute()`.
- The preconditions are satisfied: `StepEngine` asks `StepCollection` if the current step can be accessed.

If the preconditions are satisfied and the current step can be accessed, `StepEngine` needs to verify if the current step needs user input:
- The current step doesn't need user input: `StepEngine` returns `RedirectResponse` to the next step.
- The current step needs user input: `StepEngine` takes the Request object and passes it to `FormCollectionHandlerInterface`.

If you have a submitted form, `FormCollectionHandlerInterface` handles the request, and if the form validation passes `StepEngine`, the execution of the workflow continues.

If the request does not contain valid data for the given form, it redirects the user to the last URL, where the user can correct his input data and submit it again.

`StepEngine` goes like this through all the steps added to `StepCollection` until all the steps are executed.

{% info_block infoBox %}

The `StepCollection`, `FormCollectionHandler`, and `StepEngine` classes can be used without the need to extend them in your project.

{% endinfo_block %}
