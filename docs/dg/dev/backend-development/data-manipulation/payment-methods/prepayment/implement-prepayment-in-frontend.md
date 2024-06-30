---
title: Implement prepayment in frontend
description: This document describes how to implement the prepayment method in frontend.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-prepayment-fe
originalArticleId: 54c8c994-968d-4a53-aab8-8642ef56ac57
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-frontend.html
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implementing-prepayment-in-front-end.html
related:
  - title: Implement prepayment
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implement-prepayment.html
  - title: Implement prepayment in backend
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-backend.html
  - title: Implement prepayment in shared layer
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-shared-layer.html
  - title: Integrate Prepayment into checkout
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/integrate-prepayment-into-checkout.html
  - title: Test the Prepayment implementation
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/test-the-prepayment-implementation.html
---

## Create the form

In Yves, the starting point is to build a form.

* Add a new module in Yves.
* Add the `Form` folder to place the implementation for building the form.

1. In the `Form/DataProvider` folder, add the data provider:

```php
<?php
namespace Pyz\Yves\PaymentMethods\Form\DataProvider;

use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Yves\Checkout\Dependency\DataProvider\DataProviderInterface;

class PrepaymentDataProvider implements DataProviderInterface
{

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function getData(QuoteTransfer $quoteTransfer)
    {
        return $quoteTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return array
     */
    public function getOptions(QuoteTransfer $quoteTransfer)
    {
        return [];
    }

}
```

2. Implement the form:

```php
<?php

namespace Pyz\Yves\PaymentMethods\Form;

use Pyz\Shared\PaymentMethods\PaymentMethodsConstants;
use Pyz\Yves\Checkout\Dependency\CheckoutAbstractSubFormType;
use Pyz\Yves\Checkout\Dependency\SubFormInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class PrepaymentSubForm extends CheckoutAbstractSubFormType implements SubFormInterface
{

    /**
     * @const string
     */
    const PAYMENT_PROVIDER = PaymentMethodsConstants::PROVIDER;

    /**
     * @const string
     */
    const PAYMENT_METHOD = PaymentMethodsConstants::PAYMENT_METHOD_PREPAYMENT;

    /**
     * @return string
     */
    public function getPropertyPath()
    {
        return PaymentMethodsConstants::PAYMENT_PREPAYMENT_FORM_PROPERTY_PATH;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return static::PAYMENT_PROVIDER . '_' . static::PAYMENT_METHOD;
    }

    /**
     * @return string
     */
    public function getTemplatePath()
    {
        return static::PAYMENT_PROVIDER . '/' . static::PAYMENT_METHOD;
    }

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolverInterface $resolver
     *
     * @return void
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        parent::setDefaultOptions($resolver);
        $resolver->setDefaults([
            SubFormInterface::OPTIONS_FIELD_NAME => [],
        ]);
    }

}
```

3. After implementing the form, plug it into checkout by adding a plugin for the form in the `Plugin` folder:

```php
<?php

namespace Pyz\Yves\PaymentMethods\Plugin;

use Spryker\Yves\Kernel\AbstractPlugin;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginInterface;

/**
 * @method \Pyz\Yves\PaymentMethods\PaymentMethodsFactory getFactory()
 */
class PrepaymentSubFormPlugin extends AbstractPlugin implements SubFormPluginInterface
{

    /**
     * @return \Pyz\Yves\PaymentMethods\Form\PrepaymentSubForm
     */
    public function createSubForm()
    {
        return $this->getFactory()->createPrepaymentForm();
    }

    /**
     * @return \Pyz\Yves\Checkout\Dependency\DataProvider\DataProviderInterface
     */
    public function createSubFormDataProvider()
    {
        return $this->getFactory()->createPrepaymentFormDataProvider();
    }

}
```

## Set up the payment handler

1. To handle this new payment type, in the `Handler` folder, add the `PrepaymentHandler` class:

```php
<?php

namespace Pyz\Yves\PaymentMethods\Handler;

use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Shared\PaymentMethods\PaymentMethodsConstants;
use Symfony\Component\HttpFoundation\Request;

class PrepaymentHandler
{

    /**
     * @const string
     */
    const PAYMENT_PROVIDER = PaymentMethodsConstants::PROVIDER;

    /**
     * @const string
     */
    const PAYMENT_METHOD = PaymentMethodsConstants::PAYMENT_METHOD_PREPAYMENT;

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function addPaymentToQuote(Request $request, QuoteTransfer $quoteTransfer)
    {
        $quoteTransfer->getPayment()
            ->setPaymentProvider(static::PAYMENT_PROVIDER)
            ->setPaymentMethod(static::PAYMENT_METHOD);

        return $quoteTransfer;
    }
}
```


2. To plug this payment handler into checkout, in the `Plugin` folder, add a corresponding plugin:

```php
<?php

namespace Pyz\Yves\PaymentMethods\Plugin;

use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use Spryker\Yves\Kernel\AbstractPlugin;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Yves\PaymentMethods\PaymentMethodsFactory getFactory()
 */
class PrepaymentHandlerPlugin extends AbstractPlugin implements StepHandlerPluginInterface
{

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function addToDataClass(Request $request, QuoteTransfer $quoteTransfer)
    {
        $this->getFactory()->createPrepaymentHandler()->addPaymentToQuote($request, $quoteTransfer);
    }

}
```

## Add the prepayment twig template

Add the Twig template that is rendered when the prepayment method is selected under the configured path.

1. In Yves, create the `prepayment.twig` template file in `PaymentMethods/Theme/`, then `ApplicationConstants::YVES_THEME` config value directory.
2. Adjust the path according to the theme you are currently using.


```twig
<div class="payment-subform prepayment-form">
    <p>Please transfer the sum to the following account:</p>
<p><strong>Account Holder:</strong> [Place account holder here..]</p>
    <p><strong>IBAN:</strong> [Place IBAN here..]</p>
<p><strong>BIC:</strong> [Place BIC here..]</p>
    <p>Additional payment instructions go here...</p>

    {% raw %}{{{% endraw %} form_widget(form.paymentmethods_prepayment) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} form_errors(form.paymentmethods_prepayment) {% raw %}}}{% endraw %}

</div>
```

{% info_block errorBox %}

Add the factory and the dependency provider for this new module in Yves.

{% endinfo_block %}
