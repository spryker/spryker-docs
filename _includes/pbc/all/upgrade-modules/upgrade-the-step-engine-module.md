

## Upgrading from version 2.* to version 3.*

In Version 3 `StepCollectionInterface::getPreviousStep()` has a new second optional argument: `AbstractTransfer $dataTransfer`. Depending on your usage of the interface, do the following:

- If the interface is used for your own implementation, update your derived class.
- If the interface is overridden in your project, update the call to `StepCollectionInterface::getPreviousStep()` as well.
