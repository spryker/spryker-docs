---
title: Understand how implement new payment methods on project level. 
description: Guide to easily implement payment methods that are not yet provided by integration, on project level.
last_updated: Jul 20, 2022
template: concept-topic-template
---

This document shows how to implement Unzer payment types that are not currently available in Unzer Eco module. In this guide we will use Unzer PayPal as an example.

## Prerequisites

[Install and configure Unzer]({% link docs/pbc/all/payment-service-providers/unzer/install-unzer/install-and-configure-unzer.md %}).
[Integrate Unzer]({% link docs/pbc/all/payment-service-providers/unzer/install-unzer/integrate-unzer.md %})


## Implementation

1. Add PayPal to OMS process list and to payment methods state-machine mappings:
**config/Shared/config_default.php**
```php
$config[OmsConstants::ACTIVE_PROCESSES] = [
    ...
    'UnzerPayPal01',
];

...

$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    ...
    UnzerConfig::PAYMENT_METHOD_KEY_PAYPAL => 'UnzerPayPal01',
];
```

2. Add your OMS schema for PayPal payment or use next example:
**config/Zed/oms/UnzerPayPal01.xml**
```xml
<?xml version="1.0" encoding="utf-8"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="UnzerPayPal01" main="true">

        <states>
            <state name="new" reserved="true"/>
            <state name="authorize pending" reserved="true"/>
            <state name="authorize succeeded" reserved="true"/>
            <state name="authorize failed"/>
            <state name="authorize canceled"/>
            <state name="charge pending" reserved="true"/>
            <state name="payment completed" reserved="true"/>
            <state name="charge failed"/>
            <state name="refunded"/>
            <state name="payment chargeback"/>
            <state name="shipped"/>
            <state name="closed"/>
        </states>

        <events>
            <event name="charge" manual="true" command="Unzer/Charge"/>
            <event name="refund" manual="true" command="Unzer/Refund"/>
            <event name="ship" manual="true"/>
            <event name="close" manual="false" timeout="14 days"/>
        </events>

        <transitions>
            <transition happy="true">
                <source>new</source>
                <target>authorize pending</target>
            </transition>

            <transition condition="Unzer/IsAuthorizeSucceeded" happy="true">
                <source>authorize pending</source>
                <target>authorize succeeded</target>
            </transition>

            <transition condition="Unzer/IsAuthorizeFailed" happy="true">
                <source>authorize pending</source>
                <target>authorize failed</target>
            </transition>

            <transition condition="Unzer/IsAuthorizeCanceled" happy="true">
                <source>authorize pending</source>
                <target>authorize canceled</target>
            </transition>

            <transition happy="true">
                <source>authorize succeeded</source>
                <target>charge pending</target>
                <event>charge</event>
            </transition>

            <transition condition="Unzer/IsPaymentCompleted" happy="true">
                <source>charge pending</source>
                <target>payment completed</target>
            </transition>

            <transition condition="Unzer/IsChargeFailed" happy="true">
                <source>charge pending</source>
                <target>charge failed</target>
            </transition>

            <transition condition="Unzer/IsPaymentChargeback" happy="true">
                <source>payment completed</source>
                <target>payment chargeback</target>
            </transition>

            <transition happy="true">
                <source>payment completed</source>
                <target>refunded</target>
                <event>refund</event>
            </transition>

            <transition happy="true">
                <source>payment completed</source>
                <target>shipped</target>
                <event>ship</event>
            </transition>

            <transition happy="true">
                <source>shipped</source>
                <target>closed</target>
                <event>close</event>
            </transition>
        </transitions>
    </process>
</statemachine>
```

3. Extend `PaymentTransfer` with new property:
**src/Pyz/Shared/Payment/Transfer/payment.transfer.xml**
```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="Payment">
        <property name="unzerPayPal" type="UnzerPayment"/>
    </transfer>

</transfers>
```

4. Edit payment template:
**src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig**
```twig
{% raw %}
{% extends template('page-layout-checkout', 'CheckoutPage') %}
{% define data = {
    backUrl: _view.previousStepUrl,
    forms: {
        payment: _view.paymentForm,
    },
    title: 'checkout.step.payment.title' | trans,
    customForms: {
        ...
        
        'Unzer/views/pay-pal': ['pay-pal', 'unzer'],
        },
} %}
{% endraw %}
```

5. Introduce `PayPalFormDataProvider`:
**src/Pyz/Yves/Unzer/Form/DataProvider/PayPalFormDataProvider.php**
```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Unzer\Form\DataProvider;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\UnzerPaymentTransfer;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerEco\Yves\Unzer\Dependency\Client\UnzerToQuoteClientInterface;
use SprykerEco\Yves\Unzer\Form\DataProvider\AbstractFormDataProvider;

class PayPalFormDataProvider extends AbstractFormDataProvider
{
    /**
     * @var \SprykerEco\Yves\Unzer\Dependency\Client\UnzerToQuoteClientInterface
     */
    protected $quoteClient;

    /**
     * @param \SprykerEco\Yves\Unzer\Dependency\Client\UnzerToQuoteClientInterface $quoteClient
     */
    public function __construct(UnzerToQuoteClientInterface $quoteClient)
    {
        $this->quoteClient = $quoteClient;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function getData(AbstractTransfer $quoteTransfer): QuoteTransfer
    {
        $quoteTransfer = $this->updateQuoteWithPaymentData($quoteTransfer);
        $quoteTransfer->getPaymentOrFail()->setUnzerPayPal(new UnzerPaymentTransfer());

        $this->quoteClient->setQuote($quoteTransfer);

        return $quoteTransfer;
    }
}
```

6. Introduce PayPalSubform:
**src/Pyz/Yves/Unzer/Form/PayPalSubform.php**
```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Unzer\Form;

use Generated\Shared\Transfer\PaymentTransfer;
use Generated\Shared\Transfer\UnzerPaymentTransfer;
use SprykerEco\Yves\Unzer\Form\AbstractUnzerSubForm;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @method \SprykerEco\Yves\Unzer\UnzerConfig getConfig()
 */
class PayPalSubform extends AbstractUnzerSubForm
{
    /**
     * @var string
     */
    protected const TEMPLATE_VIEW_PATH = 'views/pay-pal/pay-pal';

    /**
     * @return string
     */
    public function getPropertyPath(): string
    {
        return PaymentTransfer::UNZER_PAY_PAL;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return PaymentTransfer::UNZER_PAY_PAL;
    }

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        parent::configureOptions($resolver);

        $resolver->setDefaults([
            'data_class' => UnzerPaymentTransfer::class,
        ])->setRequired(static::OPTIONS_FIELD_NAME);
    }
} 
```

7. Introduce `UnzerPayPalSubFormPlugin`:
**src/Pyz/Yves/Unzer/Plugin/StepEngine/UnzerPayPalSubFormPlugin.php**
```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Unzer\Plugin\StepEngine;

use Spryker\Yves\Kernel\AbstractPlugin;
use Spryker\Yves\StepEngine\Dependency\Form\StepEngineFormDataProviderInterface;
use Spryker\Yves\StepEngine\Dependency\Form\SubFormInterface;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginInterface;

/**
 * @method \SprykerEco\Yves\Unzer\UnzerFactory getFactory()
 * @method \SprykerEco\Yves\Unzer\UnzerConfig getConfig()
 */
class UnzerPayPalSubFormPlugin extends AbstractPlugin implements SubFormPluginInterface
{
    /**
     * {@inheritDoc}
     * - Creates `PayPal` subform.
     *
     * @api
     *
     * @return \Spryker\Yves\StepEngine\Dependency\Form\SubFormInterface
     */
    public function createSubForm(): SubFormInterface
    {
        return $this->getFactory()->createPayPalSubForm();
    }

    /**
     * {@inheritDoc}
     * - Creates `PayPal` subform data provider.
     *
     * @api
     *
     * @return \Spryker\Yves\StepEngine\Dependency\Form\StepEngineFormDataProviderInterface
     */
    public function createSubFormDataProvider(): StepEngineFormDataProviderInterface
    {
        return $this->getFactory()->createPayPalFormDataProvider();
    }
}
```

8. Add `CheckoutPage` plugins to plugin stack:
   **src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php**
```php
...
use Pyz\Yves\Unzer\Plugin\StepEngine\UnzerPayPalSubFormPlugin;
...

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendPaymentMethodHandler(Container $container): Container
    {
        $container->extend(static::PAYMENT_METHOD_HANDLER, function (StepHandlerPluginCollection $paymentMethodHandler) {
            ...
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_PAYPAL);
            
            return $paymentMethodHandler;
        });
    }
    
    ...
    
    
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendSubFormPluginCollection(Container $container): Container
    {
        $container->extend(static::PAYMENT_SUB_FORMS, function (SubFormPluginCollection $paymentSubFormPluginCollection) {
            ...
            $paymentSubFormPluginCollection->add(new UnzerPayPalSubFormPlugin());
        });
    }

```

9. Override `UnzerFactory` to introduce new methods in Yves layer:
**src/Pyz/Yves/Unzer/UnzerFactory.php**
```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Unzer;

use Pyz\Yves\Unzer\Form\DataProvider\PayPalFormDataProvider;
use Pyz\Yves\Unzer\Form\PayPalSubform;
use Spryker\Yves\StepEngine\Dependency\Form\StepEngineFormDataProviderInterface;
use Spryker\Yves\StepEngine\Dependency\Form\SubFormInterface;
use SprykerEco\Yves\Unzer\UnzerFactory as EcoUnzerFactory;

class UnzerFactory extends EcoUnzerFactory
{
    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Form\SubFormInterface
     */
    public function createPayPalSubForm(): SubFormInterface
    {
        return new PayPalSubForm();
    }

    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Form\StepEngineFormDataProviderInterface
     */
    public function createPayPalFormDataProvider(): StepEngineFormDataProviderInterface
    {
        return new PayPalFormDataProvider(
            $this->getQuoteClient(),
        );
    }
} 
```

10. Introduce `PayPalPaymentProcessor`:
**src/Pyz/Zed/Unzer/Business/Payment/Processor/PayPalPaymentProcessor.php**
```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Unzer\Business\Payment\Processor;

use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\RefundTransfer;
use Generated\Shared\Transfer\SaveOrderTransfer;
use Generated\Shared\Transfer\UnzerPaymentResourceTransfer;
use Generated\Shared\Transfer\UnzerPaymentTransfer;
use SprykerEco\Zed\Unzer\Business\ApiAdapter\UnzerAuthorizeAdapterInterface;
use SprykerEco\Zed\Unzer\Business\ApiAdapter\UnzerPaymentAdapterInterface;
use SprykerEco\Zed\Unzer\Business\ApiAdapter\UnzerPaymentResourceAdapterInterface;
use SprykerEco\Zed\Unzer\Business\Checkout\Mapper\UnzerCheckoutMapperInterface;
use SprykerEco\Zed\Unzer\Business\Payment\Processor\Charge\UnzerChargeProcessorInterface;
use SprykerEco\Zed\Unzer\Business\Payment\Processor\PreparePayment\UnzerPreparePaymentProcessorInterface;
use SprykerEco\Zed\Unzer\Business\Payment\Processor\Refund\UnzerRefundProcessorInterface;
use SprykerEco\Zed\Unzer\Business\Payment\Processor\UnzerChargeablePaymentProcessorInterface;

class PayPalPaymentProcessor implements UnzerChargeablePaymentProcessorInterface
{
    /**
     * @var \SprykerEco\Zed\Unzer\Business\ApiAdapter\UnzerAuthorizeAdapterInterface
     */
    protected UnzerAuthorizeAdapterInterface $unzerAuthorizeAdapter;

    /**
     * @var \SprykerEco\Zed\Unzer\Business\ApiAdapter\UnzerPaymentAdapterInterface
     */
    protected UnzerPaymentAdapterInterface $unzerPaymentAdapter;

    /**
     * @var \SprykerEco\Zed\Unzer\Business\ApiAdapter\UnzerPaymentResourceAdapterInterface
     */
    protected UnzerPaymentResourceAdapterInterface $unzerPaymentResourceAdapter;

    /**
     * @var \SprykerEco\Zed\Unzer\Business\Payment\Processor\Charge\UnzerChargeProcessorInterface
     */
    protected UnzerChargeProcessorInterface $unzerChargeProcessor;

    /**
     * @var \SprykerEco\Zed\Unzer\Business\Payment\Processor\Refund\UnzerRefundProcessorInterface
     */
    protected UnzerRefundProcessorInterface $unzerRefundProcessor;

    /**
     * @var \SprykerEco\Zed\Unzer\Business\Payment\Processor\PreparePayment\UnzerPreparePaymentProcessorInterface
     */
    protected UnzerPreparePaymentProcessorInterface $unzerPreparePaymentProcessor;

    /**
     * @var \SprykerEco\Zed\Unzer\Business\Checkout\Mapper\UnzerCheckoutMapperInterface
     */
    protected UnzerCheckoutMapperInterface $unzerCheckoutMapper;

    /**
     * @param \SprykerEco\Zed\Unzer\Business\ApiAdapter\UnzerAuthorizeAdapterInterface $unzerAuthorizeAdapter
     * @param \SprykerEco\Zed\Unzer\Business\ApiAdapter\UnzerPaymentAdapterInterface $unzerPaymentAdapter
     * @param \SprykerEco\Zed\Unzer\Business\Payment\Processor\Charge\UnzerChargeProcessorInterface $unzerChargeProcessor
     * @param \SprykerEco\Zed\Unzer\Business\Payment\Processor\Refund\UnzerRefundProcessorInterface $unzerRefundProcessor
     * @param \SprykerEco\Zed\Unzer\Business\Payment\Processor\PreparePayment\UnzerPreparePaymentProcessorInterface $unzerPreparePaymentProcessor
     */
    public function __construct(
        UnzerAuthorizeAdapterInterface $unzerAuthorizeAdapter,
        UnzerPaymentAdapterInterface $unzerPaymentAdapter,
        UnzerPaymentResourceAdapterInterface $unzerPaymentResourceAdapter,
        UnzerChargeProcessorInterface $unzerChargeProcessor,
        UnzerRefundProcessorInterface $unzerRefundProcessor,
        UnzerPreparePaymentProcessorInterface $unzerPreparePaymentProcessor,
        UnzerCheckoutMapperInterface $unzerCheckoutMapper
    ) {
        $this->unzerAuthorizeAdapter = $unzerAuthorizeAdapter;
        $this->unzerPaymentAdapter = $unzerPaymentAdapter;
        $this->unzerPaymentResourceAdapter = $unzerPaymentResourceAdapter;
        $this->unzerChargeProcessor = $unzerChargeProcessor;
        $this->unzerRefundProcessor = $unzerRefundProcessor;
        $this->unzerPreparePaymentProcessor = $unzerPreparePaymentProcessor;
        $this->unzerCheckoutMapper = $unzerCheckoutMapper;
    }

    /**
     * @return void
     */
    public function processCharge(OrderTransfer $orderTransfer, array $salesOrderItemIds): void
    {
        $this->unzerChargeProcessor->charge($orderTransfer, $salesOrderItemIds);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\SaveOrderTransfer $saveOrderTransfer
     *
     * @return \Generated\Shared\Transfer\UnzerPaymentTransfer
     */
    public function processOrderPayment(QuoteTransfer $quoteTransfer, SaveOrderTransfer $saveOrderTransfer): UnzerPaymentTransfer
    {
        $unzerPaymentTransfer = $this->unzerPreparePaymentProcessor->prepareUnzerPaymentTransfer($quoteTransfer, $saveOrderTransfer);
        $unzerPaymentTransfer->setPaymentResource($this->createUnzerPaymentResource($quoteTransfer));
        $unzerPaymentTransfer = $this->unzerAuthorizeAdapter->authorizePayment($unzerPaymentTransfer);

        return $this->unzerPaymentAdapter->getPaymentInfo($unzerPaymentTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\RefundTransfer $refundTransfer
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     * @param array<int> $salesOrderItemIds
     *
     * @return void
     */
    public function processRefund(RefundTransfer $refundTransfer, OrderTransfer $orderTransfer, array $salesOrderItemIds): void
    {
        $this->unzerRefundProcessor->refund($refundTransfer, $orderTransfer, $salesOrderItemIds);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\UnzerPaymentResourceTransfer
     */
    protected function createUnzerPaymentResource(QuoteTransfer $quoteTransfer): UnzerPaymentResourceTransfer
    {
        $unzerPaymentResourceTransfer = $this->unzerCheckoutMapper
            ->mapQuoteTransferToUnzerPaymentResourceTransfer(
                $quoteTransfer,
                new UnzerPaymentResourceTransfer(),
            );

        return $this->unzerPaymentResourceAdapter->createPaymentResource(
            $unzerPaymentResourceTransfer,
            $quoteTransfer->getPaymentOrFail()->getUnzerPaymentOrFail()->getUnzerKeypairOrFail(),
        );
    }
}
```

11. Override `UnzerBusinessFactory` to introduce new methods on Zed layer:
**src/Pyz/Zed/Unzer/Business/UnzerBusinessFactory.php**
```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Unzer\Business;

use Pyz\Zed\Unzer\Business\Payment\Processor\PayPalPaymentProcessor;
use SprykerEco\Shared\Unzer\UnzerConfig;
use SprykerEco\Zed\Unzer\Business\Payment\Processor\UnzerPaymentProcessorInterface;
use SprykerEco\Zed\Unzer\Business\UnzerBusinessFactory as EcoUnzerBusinessFactory;

/**
 * @method \Pyz\Zed\Unzer\UnzerConfig getConfig()
 * @method \SprykerEco\Zed\Unzer\Persistence\UnzerRepositoryInterface getRepository()
 * @method \SprykerEco\Zed\Unzer\Persistence\UnzerEntityManagerInterface getEntityManager()
 */
class UnzerBusinessFactory extends EcoUnzerBusinessFactory
{
    /**
     * @return array<string, \Closure>
     */
    public function getUnzerPaymentProcessors(): array
    {
        return array_merge(parent::getUnzerPaymentProcessors(), [
            UnzerConfig::PAYMENT_METHOD_KEY_PAYPAL => function () {
                return $this->createPayPalPaymentProcessor();
            },
        ]);
    }

    public function createPayPalPaymentProcessor(): UnzerPaymentProcessorInterface
    {
        return new PayPalPaymentProcessor(
            $this->createUnzerAuthorizeAdapter(),
            $this->createUnzerPaymentAdapter(),
            $this->createUnzerPaymentResourceAdapter(),
            $this->createUnzerCreditCardChargeProcessor(),
            $this->createUnzerRefundProcessor(),
            $this->createUnzerPreparePaymentProcessor(),
            $this->createUnzerCheckoutMapper(),
        );
    }
}
```

12. Override `UnzerConfig` to add PayPal to authorizable payment methods:
**src/Pyz/Zed/Unzer/UnzerConfig.php**
```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Unzer;

use SprykerEco\Shared\Unzer\UnzerConfig as UnzerSharedConfig;
use SprykerEco\Zed\Unzer\UnzerConfig as EcoUnzerConfig;

class UnzerConfig extends EcoUnzerConfig
{
    /**
     * @var array<int, string>
     */
    protected const AUTHORIZE_PAYMENT_METHODS = [
        UnzerSharedConfig::PAYMENT_METHOD_KEY_MARKETPLACE_CREDIT_CARD,
        UnzerSharedConfig::PAYMENT_METHOD_KEY_CREDIT_CARD,
        UnzerSharedConfig::PAYMENT_METHOD_KEY_PAYPAL,
    ];
}
```
