---
title: Implementing Invoice Payment in Front End
originalLink: https://documentation.spryker.com/2021080/docs/ht-invoice-payment-fe
redirect_from:
  - /2021080/docs/ht-invoice-payment-fe
  - /2021080/docs/en/ht-invoice-payment-fe
---

## Form creation

In Yves, the starting point is to build a form.

* Add a new module in Yves
* Add a `Form` folder where we will place the implementation for building the form

### 1. Adding the data provider
    
The first step is to add the data provider, inside the `Form/DataProvider/` folder:
    
```php
<?php
namespace Pyz\Yves\PaymentMethods\Form\DataProvider;

use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Yves\Checkout\Dependency\DataProvider\DataProviderInterface;

class InvoiceDataProvider implements DataProviderInterface
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

### 2. Implementing the form

The next step is to implement the form:

```php
<?php

namespace Pyz\Yves\PaymentMethods\Form;

use Pyz\Shared\PaymentMethods\PaymentMethodsConstants;
use Pyz\Yves\Checkout\Dependency\CheckoutAbstractSubFormType;
use Pyz\Yves\Checkout\Dependency\SubFormInterface;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class InvoiceSubForm extends CheckoutAbstractSubFormType implements SubFormInterface
{

    /**
     * @const string
     */
    const PAYMENT_PROVIDER = PaymentMethodsConstants::PROVIDER;

    /**
     * @const string
     */
    const PAYMENT_METHOD = PaymentMethodsConstants::PAYMENT_METHOD_INVOICE;

    /**
     * @return string
     */
    public function getPropertyPath()
    {
        return PaymentMethodsConstants::PAYMENT_INVOICE_FORM_PROPERTY_PATH;
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

### 3. Adding a plugin

Right after the form is implemented, you will need to plug this form into checkout. In order to do that, add a plugin for it inside the `Plugin/` folder:

```php
<?php

namespace Pyz\Yves\PaymentMethods\Plugin;

use Spryker\Yves\Kernel\AbstractPlugin;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginInterface;

/**
 * @method \Pyz\Yves\PaymentMethods\PaymentMethodsFactory getFactory()
 */
class InvoiceSubFormPlugin extends AbstractPlugin implements SubFormPluginInterface
{

    /**
     * @return \Pyz\Yves\PaymentMethods\Form\InvoiceSubForm
     */
    public function createSubForm()
    {
        return $this->getFactory()->createInvoiceForm();
    }

    /**
     * @return \Pyz\Yves\Checkout\Dependency\DataProvider\DataProviderInterface
     */
    public function createSubFormDataProvider()
    {
        return $this->getFactory()->createInvoiceFormDataProvider();
    }

}
```

## Payment Handler

The next procedure to be performed is to set-up the payment handler.

### 1. Handling the new payment type

To be able to handle this new payment type, add the `InvoiceHandler` class inside the `Handler/` folder:

```php
<?php

namespace Pyz\Yves\PaymentMethods\Handler;

use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Shared\PaymentMethods\PaymentMethodsConstants;
use Symfony\Component\HttpFoundation\Request;

class InvoiceHandler
{

    /**
     * @const string
     */
    const PAYMENT_PROVIDER = PaymentMethodsConstants::PROVIDER;

    /**
     * @const string
     */
    const PAYMENT_METHOD = PaymentMethodsConstants::PAYMENT_METHOD_INVOICE;

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

### 2. Plugging the payment handler into checkout

To plug this payment handler into checkout, add a plugin for it inside the `Plugin/` folder:

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
class InvoiceHandlerPlugin extends AbstractPlugin implements StepHandlerPluginInterface
{

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function addToDataClass(Request $request, QuoteTransfer $quoteTransfer)
    {
        $this->getFactory()->createInvoiceHandler()->addPaymentToQuote($request, $quoteTransfer);
    }

}
```

## Invoice Twig Template

Add the Twig template that will be rendered when invoice payment method is selected under the configured path:

1. In Yves, create the `invoice.twig` template file in `PaymentMethods/Theme/ then ApplicationConstants::YVES_THEME` config value directory.
2. Adjust the path according to the theme you are currently using.

<details open>
<summary>Code sample:</summary>

```
<div class="payment-subform paymentmethods-invoice-form">
    {# Place the details regarding invoice here #}
    {% raw %}{{{% endraw %} form_widget(form.paymentmethods_invoice) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} form_errors(form.paymentmethods_invoice) {% raw %}}}{% endraw %}
</div>
```

</br>
</details>

{% info_block errorBox %}
Don’t forget to add the factory and the dependency provider for this new added module in Yves.
{% endinfo_block %}
