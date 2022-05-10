---
title: Checkout Workflow Integration Guide
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/checkout-workflow-integration
originalArticleId: 6908a9df-3ef3-454a-b135-9c72a350b641
redirect_from:
  - /2021080/docs/checkout-workflow-integration
  - /2021080/docs/en/checkout-workflow-integration
  - /docs/checkout-workflow-integration
  - /docs/en/checkout-workflow-integration
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
