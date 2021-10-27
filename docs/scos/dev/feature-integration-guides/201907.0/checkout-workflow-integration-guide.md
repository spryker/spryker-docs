---
title: Checkout Workflow Integration Guide
last_updated: Nov 22, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/checkout-workflow-integration
originalArticleId: 0cf19bc8-d961-43cb-b795-9eec732b2763
redirect_from:
  - /v3/docs/checkout-workflow-integration
  - /v3/docs/en/checkout-workflow-integration
---

For example let's create alternative checkout workflow which would only save order in database without any additional checks or calculations.

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

After this, pass workflow id as a second parameter in the `placeOrder()` call of `CheckoutFacade`.

```bash
$this->getCheckoutFacade()->placeOrder($quoteTransfer, CheckoutConstants::KEY_WORKFLOW_ALTERNATIVE_CHECKOUT);
```
