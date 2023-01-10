

For example, let's create an alternative checkout workflow that only saves an order in a database without any additional checks or calculations.

To define an alternative checkout workflow, add a constant to `\Pyz\Shared\Checkout\CheckoutConstants`:

```bash
const KEY_WORKFLOW_ALTERNATIVE_CHECKOUT = 'alternative-checkout';
```

Modify the `getCheckoutWorkflows()` method in `\Pyz\Zed\Checkout\CheckoutDependencyProvider` to define plugins for new workflow:

```php
protected function getCheckoutWorkflows(Container $container)
{
	return [
		CheckoutConstants::KEY_WORKFLOW_MULTISTEP_CHECKOUT => (new CheckoutWorkflowPluginContainer(
			$this->getCheckoutPreConditions($container),
			$this->getCheckoutOrderSavers($container),
			$this->getCheckoutPostHooks($container),
			$this->getCheckoutPreSaveHooks($container)
		)),
		CheckoutConstants::KEY_WORKFLOW_ALTERNATIVE_CHECKOUT => (new CheckoutWorkflowPluginContainer(
		[],
			[
				new SalesOrderSaverPlugin(),
			],
		[],
		[]
		)),
	];
}
```

After this, in the `placeOrder()` call of `CheckoutFacade`, pass the workflow ID as a second parameter 

```bash
$this->getCheckoutFacade()->placeOrder($quoteTransfer, CheckoutConstants::KEY_WORKFLOW_ALTERNATIVE_CHECKOUT);
```
