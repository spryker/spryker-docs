---
title: Integrate Direct Debit into checkout
description: This document provides instructions on how to integrate the Direct Debit payment form and handler into Checkout.
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/integrate-direct-debit-into-checkout.html
related:
  - title: Implement Direct Debit payment
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-payment.html
  - title: Implement Direct Debit in Yves
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-yves.html
  - title: Implement Direct Debit in Zed
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implementation-of-direct-debit-in-zed.html
  - title: Implement Direct Debit in the shared layer
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-the-shared-layer.html
  - title: Test your Direct Debit implementation
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/testing-your-direct-debit-implementation.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


This document shows how to integrate the Direct Debit payment form and handler into Checkout.

For this purpose, in Yves, add the `CheckoutDependencyInjector` to the `PaymentMethods/Dependency/Injector`. This injects the direct debit form and handler into the `Checkout`module:

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

<br>


**What's next?**

[Create and integrate the Direct Debit payment method in the backend](/docs/dg/dev/backend-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-zed.html).
