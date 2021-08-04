---
title: Implementing Prepayment in Back End
originalLink: https://documentation.spryker.com/v5/docs/ht-prepayment-be
redirect_from:
  - /v5/docs/ht-prepayment-be
  - /v5/docs/en/ht-prepayment-be
---

To integrate the prepayment method into the checkout, we need to provide implementations for these 2 plugins:

* `CheckoutPreCondition`
* `PaymentSaveOrder`

Perform the following procedure:

1. Add the following 2 plugins in Zed, inside the `Communication/Plugin/Checkout/` folder of the new added module.

<details open>
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

</br>
</details>

<details open>
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

</br>
</details>

2. Next, inject these 2 plugins in the `Payment` module by creating a `PaymentDependencyInjector` under `Dependency/Injector` folder:

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

</br>
</details>

3. Link the prepayment state machine to process the orders submitted with the payment method we’re implementing.

{% info_block warningBox %}
We’ll use the prepayment state machine that’s delivered with Demoshop.
{% endinfo_block %}

Add this configuration in the `SalesConfig` class:

```
/**
     * @var array
     */
    protected static $stateMachineMapper = [
        //..
        PaymentMethodsConstants::PAYMENT_PREPAYMENT_FORM_PROPERTY_PATH => OmsConfig::ORDER_PROCESS_PREPAYMENT_01,
    ];
```
