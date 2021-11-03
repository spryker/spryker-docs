---
title: Integrating Invoice Payment into Checkout
description: This article provides information on how to integrate the invoice payment into the checkout.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-invoice-payment-checkout
originalArticleId: bd5f3fce-d72c-45f2-9609-d6894b1c082c
redirect_from:
  - /2021080/docs/ht-invoice-payment-checkout
  - /2021080/docs/en/ht-invoice-payment-checkout
  - /docs/ht-invoice-payment-checkout
  - /docs/en/ht-invoice-payment-checkout
  - /v6/docs/ht-invoice-payment-checkout
  - /v6/docs/en/ht-invoice-payment-checkout
  - /v5/docs/ht-invoice-payment-checkout
  - /v5/docs/en/ht-invoice-payment-checkout
  - /v4/docs/ht-invoice-payment-checkout
  - /v4/docs/en/ht-invoice-payment-checkout
  - /v3/docs/ht-invoice-payment-checkout
  - /v3/docs/en/ht-invoice-payment-checkout
  - /v2/docs/ht-invoice-payment-checkout
  - /v2/docs/en/ht-invoice-payment-checkout
  - /v1/docs/ht-invoice-payment-checkout
  - /v1/docs/en/ht-invoice-payment-checkout
---

The next step is to integrate the invoice payment into Checkout. In the `PaymentMethods/Dependency/Injector` from in Yves add the `CheckoutDependencyInjector` that will inject the invoice form and handler into the `Checkout` module:

<details open>
<summary markdown='span'>Code sample:</summary>

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

<br>
</details>

{% info_block errorBox %}
If you recreated this example in Demoshop, you’ll need to do some adjustments on the `selectPayment()` from `checkout.js`.
{% endinfo_block %}
