---
title: Integrate invoice payment into checkout
description: This document provides information on how to integrate the invoice payment into the checkout.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-invoice-payment-checkout
originalArticleId: bd5f3fce-d72c-45f2-9609-d6894b1c082c
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/invoice/integrate-invoice-payment-into-checkout.html
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/invoice/integrating-invoice-payment-into-checkout.html
related:
  - title: Implement invoice payment
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/invoice/implement-invoice-payment.html
  - title: Implement invoice payment in frontend
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/invoice/implement-invoice-payment-in-frontend.html
  - title: Implement invoice payment in backend
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/invoice/implement-invoice-payment-in-backend.html
  - title: Implement invoice payment in shared layer
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/invoice/implement-invoice-payment-in-shared-layer.html
  - title: Test the invoice payment implementation
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/invoice/test-the-invoice-payment-implementation.html
---

This document describes how to integrate invoice payment into the checkout.

In `PaymentMethods/Dependency/Injector`, in Yves, add `CheckoutDependencyInjector` that injects the invoice form and handler into the `Checkout` module:

<details>
<summary>Code sample:</summary>

```php
<?php

namespace Pyz\Yves\PaymentMethods\Dependency\Injector;

use Spryker\Shared\Kernel\ContainerInterface;
use Spryker\Shared\Kernel\Dependency\Injector\DependencyInjectorInterface;
use Spryker\Yves\Checkout\CheckoutDependencyProvider;
use Pyz\Yves\PaymentMethods\Plugin\InvoiceHandlerPlugin;
use Pyz\Yves\PaymentMethods\Plugin\InvoiceSubFormPlugin;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use Pyz\Shared\PaymentMethods\PaymentMethodsConstants;

class CheckoutDependencyInjector implements DependencyInjectorInterface
{
    /**
     * @param \Spryker\Shared\Kernel\ContainerInterface|\Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Shared\Kernel\ContainerInterface|\Spryker\Yves\Kernel\Container
     */
    public function inject(ContainerInterface $container)
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
    protected function injectPaymentSubForms(ContainerInterface $container)
    {
        $container->extend(static::PAYMENT_SUB_FORMS, function (SubFormPluginCollection $paymentSubForms) {
            $paymentSubForms->add(new InvoiceSubFormPlugin());

            return $paymentSubForms;
        });

        return $container;
    }

    /**
     * @param \Spryker\Shared\Kernel\ContainerInterface $container
     *
     * @return \Spryker\Shared\Kernel\ContainerInterface
     */
    protected function injectPaymentMethodHandler(ContainerInterface $container)
    {
        $container->extend(static::PAYMENT_METHOD_HANDLER, function (StepHandlerPluginCollection $paymentMethodHandler) {
            $paymentMethodHandler->add(new InvoiceHandlerPlugin(), PaymentMethodsConstants::PROVIDER);

            return $paymentMethodHandler;
        });

        return $container;
    }
}
```
</details>

{% info_block errorBox %}

If you recreate this example in Demoshop, you'll need to do some adjustments on `selectPayment()` from `checkout.js`.

{% endinfo_block %}
