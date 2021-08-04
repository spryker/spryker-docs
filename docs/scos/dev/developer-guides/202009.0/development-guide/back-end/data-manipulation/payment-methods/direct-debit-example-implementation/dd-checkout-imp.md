---
title: Integrate Direct Debit into Checkout
originalLink: https://documentation.spryker.com/v6/docs/dd-checkout-implementation
redirect_from:
  - /v6/docs/dd-checkout-implementation
  - /v6/docs/en/dd-checkout-implementation
---

This article provides instructions on how to integrate the Direct Debit payment form and handler into Checkout.

For this purpose, in Yves, add the `CheckoutDependencyInjector` to the `PaymentMethods/Dependency/Injector`. This will inject the direct debit form and handler into the `Checkout`module:

**Code sample:**
    
```php
<?php

namespace Pyz\Yves\PaymentMethods\Dependency\Injector;

use Spryker\Yves\Kernel\Container;
use Spryker\Yves\Kernel\Dependency\Injector\DependencyInjectorInterface;
use Pyz\Yves\PaymentMethods\Plugin\DirectDebitHandlerPlugin;
use Pyz\Yves\PaymentMethods\Plugin\DirectDebitSubFormPlugin;
use Spryker\Yves\Checkout\CheckoutDependencyProvider;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use Pyz\Shared\PaymentMethods\PaymentMethodsConstants;

class CheckoutPageDependencyInjector implements DependencyInjectorInterface
{
	/**
	* @param \Spryker\Shared\Kernel\ContainerInterface|\Spryker\Yves\Kernel\Container $container
	*
	* @return \Spryker\Shared\Kernel\ContainerInterface|\Spryker\Yves\Kernel\Container
	*/
	public function inject(Container $container)
	{
		$container = $this->injectPaymentSubForms($container);
		$container = $this->injectPaymentMethodHandler($container);

		return $container;
	}

	/**
	* @param \Spryker\Shared\Kernel\ContainerInterface $container
	*
	* @return \Spryker\Shared\Kernel\ContainerInterface
	*/
	protected function injectPaymentSubForms(Container $container)
	{
		$container->extend(CheckoutDependencyProvider::PAYMENT_SUB_FORMS, function (SubFormPluginCollection $paymentSubForms) {
			$paymentSubForms->add(new DirectDebitSubFormPlugin());

			return $paymentSubForms;
		});

		return $container;
	}

	/**
	* @param \Spryker\Shared\Kernel\ContainerInterface $container
	*
	* @return \Spryker\Shared\Kernel\ContainerInterface
	*/
	protected function injectPaymentMethodHandler(Container $container)
	{
		$container->extend(CheckoutDependencyProvider::PAYMENT_METHOD_HANDLER, function (StepHandlerPluginCollection $paymentMethodHandler) {
			$paymentMethodHandler->add(new DirectDebitHandlerPlugin(), PaymentMethodsConstants::PAYMENT_METHOD_DIRECTDEBIT);

			return $paymentMethodHandler;
		});

		return $container;
	}
}

```

</br>
</details>

<!--{% info_block errorBox %}
If you re-created this example in Demoshop, perform some adjustments on the `selectPayment(
{% endinfo_block %}` from `checkout.js`.)-->
***
**What's next?**

Once done, you need to [create and integrate the Direct Debit payment method in the back-end](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/payment-methods/direct-debit-example-implementation/dd-be-implement).
