---
title: Implement Prepayment in Front End
originalLink: https://documentation.spryker.com/v4/docs/ht-prepayment-fe
redirect_from:
  - /v4/docs/ht-prepayment-fe
  - /v4/docs/en/ht-prepayment-fe
---

## Form creation

In Yves, the starting point is to build a form.

* Add a new module in Yves
* Add a `Form` folder where we will place the implementation for building the form

<details open>
<summary>1. Adding the data provider</summary>
    
The first step is to add the data provider, inside the `Form/DataProvider/` folder:
    
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

</br>
</details>

<details open>
<summary>2. Implementing the form</summary>

The next step is to implement the form:

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

</br>
</details>

<details open>
<summary>3. Adding a plugin</summary>

Right after the form is implemented, you will need to plug this form into checkout. In order to do that, add a plugin for it inside the `Plugin/` folder:

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

</br>
</details>

## Payment Handler
The next procedure to be performed is to set-up the payment handler.

<details open>
<summary>1. Handling the new payment type</summary>

To be able to handle this new payment type, add a `PrepaymentHandler` class inside the `Handler/` folder:

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

</br>
</details>

<details open>
<summary>2. Plugging the payment handler into checkout</summary>

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

</br>
</details>

## Prepayment Twig Template

Add the Twig template that will be rendered when prepayment method is selected under the configured path.

1. In Yves, create the `prepayment.twig` template file in `PaymentMethods/Theme/` , then `ApplicationConstants::YVES_THEME` config value directory.
2. Adjust the path according to the theme you are currently using.

<details open>
<summary>Code sample:</summary>

```
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

</br>
</details>

{% info_block errorBox %}
Don’t forget to add the factory and the dependency provider for this new added module in Yves.
{% endinfo_block %}
