---
title: Implement invoice payment in backend
description: This document describes how to implement invoice payment in the backend.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-invoice-payment-be
originalArticleId: 871036bd-f7d0-42bd-ad66-22673456387e
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/invoice/implement-invoice-payment-in-backend.html
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/invoice/implementing-invoice-payment-in-back-end.html
related:
  - title: Implement invoice payment
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/invoice/implement-invoice-payment.html
  - title: Implement invoice payment in frontend
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/invoice/implement-invoice-payment-in-frontend.html
  - title: Implement invoice payment in shared layer
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/invoice/implement-invoice-payment-in-shared-layer.html
  - title: Integrate invoice payment into checkout
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/invoice/integrate-invoice-payment-into-checkout.html
  - title: Test the invoice payment implementation
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/invoice/test-the-invoice-payment-implementation.html
---

## Checkout plugins

To integrate the invoice payment method into the checkout, you need to provide implementations for the following plugins:
- `CheckoutPreCondition`
- `PaymentSaveOrder`

Perform the following steps:

1. Add the following plugins to Zed, inside the `Communication/Plugin/Checkout/` folder of the newly added module.

<details>
<summary>InvoicePreCheckPlugin</summary>

```php
<?php

namespace Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Payment\Dependency\Plugin\Checkout\CheckoutPreCheckPluginInterface;


class InvoicePreCheckPlugin extends AbstractPlugin implements CheckoutPreCheckPluginInterface
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
<summary>InvoiceSaveOrderPlugin</summary>

```php
<?php

namespace Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Payment\Dependency\Plugin\Checkout\CheckoutSaveOrderPluginInterface;

/**
 * @method \Pyz\Zed\PaymentMethods\Business\PaymentMethodsFacade getFacade()
 */
class InvoiceSaveOrderPlugin extends AbstractPlugin implements CheckoutSaveOrderPluginInterface
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

2. Next, inject these two plugins into the `Payment` module by creating a `PaymentDependencyInjector` under the `Dependency/Injector/` folder:

<details>
<summary>Code sample:</summary>

```php
<?php
namespace Pyz\Zed\PaymentMethods\Dependency\Injector;

use Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout\InvoicePreCheckPlugin;
use Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout\InvoiceSaveOrderPlugin;
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
            $pluginCollection->add(new InvoicePreCheckPlugin(), PaymentMethodsConstants::PROVIDER, PaymentDependencyProvider::CHECKOUT_PRE_CHECK_PLUGINS);
            $pluginCollection->add(new InvoiceSaveOrderPlugin(), PaymentMethodsConstants::PROVIDER, PaymentDependencyProvider::CHECKOUT_ORDER_SAVER_PLUGINS);

            return $pluginCollection;
        });

        return $container;
    }

}
```

</details>

## Design a state machine

Once the preceding procedures are completed, you need to design a state machine. This state machine is meant for processing orders that use direct debit as a payment type:

1. Add the `Invoice.xml` file inside the `config/Zed/oms/` folder, with the following content:

<details>
<summary>Code sample:</summary>

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="Invoice" main="true">
        <states>
            <state name="new" reserved="true"/>
            <state name="invoice created"/>
            <state name="invoice sent" />
            <state name="order exported" />
            <state name="order shipped" />
            <state name="waiting for payment" />
            <state name="payment received" />
            <state name="reminder I sent" />
            <state name="reminder II sent" />
            <state name="dunning process started" />
            <state name="ready for return" />
            <state name="completed" />
        </states>

        <transitions>
            <transition>
                <source>new</source>
            <target>invoice created</target>
                <event>create invoice</event>
            </transition>

            <transition>
                <source>invoice created</source>
                <target>invoice sent</target>
                <event>send invoice</event>
            </transition>

            <transition>
                <source>invoice sent</source>
                <target>order exported</target>
                <event>export order</event>
            </transition>

            <transition>
                <source>order exported</source>
                <target>order shipped</target>
                <event>ship order</event>
            </transition>

            <transition>
                <source>order shipped</source>
                <target>waiting for payment</target>
                <event>waiting for payment</event>
            </transition>

            <transition>
                <source>waiting for payment</source>
                <target>reminder I sent</target>
                <event>payment not received</event>
            </transition>

            <transition>
                <source>waiting for payment</source>
                <target>payment received</target>
                <event>payment received</event>
            </transition>

            <transition>
                <source>reminder I sent</source>
                <target>reminder II sent</target>
                <event>payment not received</event>
            </transition>

            <transition>
                <source>reminder I sent</source>
                <target>payment received</target>
                <event>payment received</event>
            </transition>

            <transition>
                <source>reminder II sent</source>
                <target>dunning process started</target>
                <event>payment not received</event>
            </transition>

            <transition>
                <source>reminder II sent</source>
                <target>payment received</target>
                <event>payment received</event>
            </transition>

            <transition>
                <source>dunning process started</source>
                <target>payment received</target>
                <event>payment received</event>
            </transition>

            <transition>
                <source>payment received</source>
                <target>ready for return</target>
                <event>ready for return</event>
            </transition>

            <transition>
                <source>ready for return</source>
                <target>completed</target>
                <event>item not returned</event>
            </transition>

        </transitions>

        <events>
            <event name="create invoice" onEnter="true" />
            <event name="send invoice" onEnter="true" />
            <event name="export order" onEnter="true" />
            <event name="ship order" manual="true" />
            <event name="waiting for payment" onEnter="true" />
            <event name="payment not received" timeout="1hour" />
            <event name="payment received" manual="true" />
            <event name="ready for return"  onEnter="true" />
            <event name="item not returned" timeout="14days" />
        </events>
    </process>

</statemachine>

```

</details>

2. Add this new state machine to `OmsConfig`:

<details>
<summary>Code sample</summary>

```php
<?php

    const ORDER_PROCESS_DIRECTDEBIT = 'DirectDebit';

     /**
     * @return array
     */
    public function getActiveProcesses()
    {
        return [
            //..
            static::ORDER_PROCESS_DIRECTDEBIT,
        ];
    }
```

</details>

3. Link the invoice state machine to process the orders submitted with the payment method we're implementing.

Add this configuration in the `SalesConfig` class:

```php
/**
     * @var array
     */
    protected static $stateMachineMapper = [
        //..
        PaymentMethodsConstants::PAYMENT_INVOICE_FORM_PROPERTY_PATH => OmsConfig::ORDER_PROCESS_INVOICE,
    ];
```
