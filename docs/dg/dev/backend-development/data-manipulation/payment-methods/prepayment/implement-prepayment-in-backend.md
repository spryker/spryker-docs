---
title: Implement prepayment in backend
description: Set up prepayment methods in Spryker with backend integration guidance. Learn to implement secure payment processes and enhance your ecommerce platform.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-prepayment-be
originalArticleId: 2ee681bb-c2b1-4a78-93c7-2c6914fc6c64
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-backend.html
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implementing-prepayment-in-back-end.html
related:
  - title: Implement prepayment
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment.html
  - title: Implement prepayment in frontend
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-frontend.html
  - title: Implement prepayment in shared layer
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-shared-layer.html
  - title: Integrate Prepayment into checkout
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/integrate-prepayment-into-checkout.html
  - title: Test the Prepayment implementation
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/test-the-prepayment-implementation.html
---

To integrate the prepayment method into the checkout, you need to provide implementations for these two plugins:

- `CheckoutPreCondition`
- `PaymentSaveOrder`

Perform the following steps:

1. Add the following plugins in Zed, in the `Communication/Plugin/Checkout/` folder of the newly added module.

<details>
<summary>PrepaymentPreCheckPlugin</summary>

```php
<?php

namespace Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Payment\Dependency\Plugin\Checkout\CheckoutPreCheckPluginInterface;


class PrepaymentPreCheckPlugin extends AbstractPlugin implements CheckoutPreCheckPluginInterface
{

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
     *
     * @return \Generated\Shared\Transfer\CheckoutResponseTransfer
     */
    public function checkCondition(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponseTransfer)
    {
        return $checkoutResponseTransfer;
    }

}
```

</details>

<details>
<summary>PrepaymentSaveOrderPlugin</summary>

```php
<?php

namespace Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Payment\Dependency\Plugin\Checkout\CheckoutSaveOrderPluginInterface;

class PrepaymentSaveOrderPlugin extends AbstractPlugin implements CheckoutSaveOrderPluginInterface
{

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
     *
     * @return void
     */
    public function saveOrder(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponseTransfer)
    {

    }
}
```

</details>

2. Inject these plugins into the `Payment` module by creating the `PaymentDependencyInjector` in the `Dependency/Injector` folder:

```php
<?php
namespace Pyz\Zed\PaymentMethods\Dependency\Injector;

use Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout\PrepaymentPreCheckPlugin;
use Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout\PrepaymentSaveOrderPlugin;
use Spryker\Zed\Kernel\Container;
use Pyz\Shared\PaymentMethods\PaymentMethodsConstants;
use Spryker\Zed\Kernel\Dependency\Injector\AbstractDependencyInjector;
use Spryker\Zed\Payment\Dependency\Plugin\Checkout\CheckoutPluginCollection;
use Spryker\Zed\Payment\PaymentDependencyProvider;

class PaymentDependencyInjector extends AbstractDependencyInjector
{

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function injectBusinessLayerDependencies(Container $container)
    {
        $container = $this->injectPaymentPlugins($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function injectPaymentPlugins(Container $container)
    {
        $container->extend(PaymentDependencyProvider::CHECKOUT_PLUGINS, function (CheckoutPluginCollection $pluginCollection) {
            $pluginCollection->add(new PrepaymentPreCheckPlugin(), PaymentMethodsConstants::PROVIDER, PaymentDependencyProvider::CHECKOUT_PRE_CHECK_PLUGINS);
            $pluginCollection->add(new PrepaymentSaveOrderPlugin(), PaymentMethodsConstants::PROVIDER, PaymentDependencyProvider::CHECKOUT_ORDER_SAVER_PLUGINS);

            return $pluginCollection;
        });

        return $container;
    }

}
```


3. Link the prepayment state machine to process the orders submitted with the payment method we're implementing.

{% info_block warningBox %}

Use the prepayment state machine that's delivered with Demoshop.

{% endinfo_block %}

In the `SalesConfig` class, add this configuration:

```php
/**
     * @var array
     */
    protected static $stateMachineMapper = [
        //..
        PaymentMethodsConstants::PAYMENT_PREPAYMENT_FORM_PROPERTY_PATH => OmsConfig::ORDER_PROCESS_PREPAYMENT_01,
    ];
```
