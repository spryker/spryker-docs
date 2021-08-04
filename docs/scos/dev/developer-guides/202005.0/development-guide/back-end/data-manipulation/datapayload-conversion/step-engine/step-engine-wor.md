---
title: Step Engine Workflow Overview
originalLink: https://documentation.spryker.com/v5/docs/step-engine-workflow
redirect_from:
  - /v5/docs/step-engine-workflow
  - /v5/docs/en/step-engine-workflow
---

When you need to define a multi-step process using the StepEngine feature, you need to implement the following interfaces:

* `StepInterface`- here you implement the logic that needs to get executed when the defined step takes place
* `SubFormInterface` - defines the name of the form and the pathProperty which is used to fill the property of transfer object for the current step
* `DataContainerInterface` - holds the transfer object you are working on

## Defining the Steps
The defined steps are wired up through the parameters that are passed when creating the StepEngine:

* `StepCollectionInterface` - this contains all the steps that are used in the`StepEngine::process()`
* `DataContainerInterface` - holds the main transfer object and knows how to persist the data during the requests

The `StepEngine` takes care of executing the steps defined in your `StepCollection`. To start the multi-step workflow, you need to call the `StepEngine::process()` operation from your controller and pass the request object to it; optionally you can pass a `FormCollectionHandlerInterface` to it.

## Processing the Workflow
When the `StepEngine` starts to process the multi-step workflow, it will iterate through the steps contained in the step collection.

For the current step, it will check if it meets the assigned preconditions by calling `StepInterface::preCondition()`.

* the preconditions are not satisfied: `StepEngine` will return a `RedirectResponse` to the defined `StepInterface::getEscapeRoute()`
* the preconditions are satisfied: `StepEngine` will ask the `StepCollection` if the current step can be accessed.

If the preconditions are satisfied and the current step can be accessed, `StepEngine` needs to verify if the current step needs user input:

* current step doesn’t need user input: `StepEngine` will return a `RedirectResponse` to the next step
* current step needs user input: `StepEngine` will take the Request object and pass it to the `FormCollectionHandlerInterface`

If we have a submitted form, the `FormCollectionHandlerInterface` will handle the request and if the form validation passes the `StepEngine` the execution of the workflow will continue.

If the request does not contain valid data for the given form, it will redirect the user to the last URL, where the user can correct his input data and submit it again.

The `StepEngine` will go like this through all the steps added to the `StepCollection`, until all the steps are executed.

{% info_block infoBox %}
The `StepCollection`, `FormCollectionHandler` and `StepEngine` classes can be used without the need to extend them in your project.
{% endinfo_block %}
