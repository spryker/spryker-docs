---
title: Implement Direct Debit in Yves
description: Usually, the first step of the Direct Debit payment method implementation is setting it up on Yves. This document provides step-by-step instructions on how to do that.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/dd-fe-implementation
originalArticleId: 880e1ada-7fdd-44e3-9909-32df91999cf6
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-yves.html
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implementation-of-direct-debit-in-yves.html
related:
  - title: Implement Direct Debit payment
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-payment.html
  - title: Implement Direct Debit in Zed
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-zed.html
  - title: Implement Direct Debit in the shared layer
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-the-shared-layer.html
  - title: Integrate Direct Debit into checkout
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/integrate-direct-debit-into-checkout.html
  - title: Test your Direct Debit implementation
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/test-your-direct-debit-implementation.html
---

The first step of the Direct Debit payment method implementation is setting it up on Yves. This document provides step-by-step instructions on how to do that.

## Prerequisites

Before proceeding with the first step, the form creation, add a new module on the project level in Yves—for example, the `PaymentMethods` module. If you haven't had any experience in creating a new module yet, see [Tutorial: Add a new module](/docs/dg/dev/backend-development/extend-spryker/create-modules.html).

Create a `Form` folder in the module.

## Create a form

The starting point is to create a form in Yves.

To create a form, follow these steps.

### 1. Add the data provider

In the created `PaymentMethods` module, add the data provider to the `Form/DataProvider/` folder:

```php
<?php
namespace Pyz\Yves\PaymentMethods\Form\DataProvider;

use Generated\Shared\Transfer\PaymentDirectDebitTransfer;
use Generated\Shared\Transfer\PaymentTransfer;
use Generated\Shared\Transfer\QuoteTransfer;

class DirectDebitDataProvider
{

	/**
	* @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
	*
	* @return \Generated\Shared\Transfer\QuoteTransfer
	*/
	public function getData(QuoteTransfer $quoteTransfer)
	{
		if ($quoteTransfer->getPayment() === null) {
			$paymentTransfer = new PaymentTransfer();
			$paymentTransfer->setPaymentMethodsDirectDebit(new PaymentDirectDebitTransfer());
			$paymentTransfer->setDummyPaymentCreditCard(new PaymentDirectDebitTransfer());
			$quoteTransfer->setPayment($paymentTransfer);
		}

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

### 2. Implement the form

```php
<?php
namespace Pyz\Yves\PaymentMethods\Form;

use Generated\Shared\Transfer\PaymentDirectDebitTransfer;
use Pyz\Shared\PaymentMethods\PaymentMethodsConstants;
use Spryker\Yves\StepEngine\Dependency\Form\AbstractSubFormType;
use Spryker\Yves\StepEngine\Dependency\Form\SubFormInterface;
use Spryker\Yves\StepEngine\Dependency\Form\SubFormProviderNameInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class DirectDebitForm extends AbstractSubFormType implements SubFormInterface, SubFormProviderNameInterface
{
	const FIELD_BANK_ACCOUNT_HOLDER = 'bank_account_holder';
	const FIELD_BANK_ACCOUNT_IBAN = 'bank_account_iban';
	const FIELD_BANK_ACCOUNT_BIC = 'bank_account_bic';

	/**
	* @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
	*
	* @return void
	*/
	public function configureOptions(OptionsResolver $resolver)
	{
		$resolver->setDefaults([
			'data_class' => PaymentDirectDebitTransfer::class,
		])->setRequired(self::OPTIONS_FIELD_NAME);
	}

	/**
	* @param \Symfony\Component\Form\FormBuilderInterface $builder
	* @param array $options
	*
	* @return void
	*/
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$this->addBankAccountHolderField($builder);
		$this->addBankAccountIbanField($builder);
		$this->addBankAccountBicField($builder);
	}

	/**
	* @return string
	*/
	public function getTemplatePath()
	{
		return PaymentMethodsConstants::PROVIDER . '/views/' . PaymentMethodsConstants::PAYMENT_METHOD_DIRECTDEBIT;
	}

	/**
	* @return string
	*/
	public function getName()
	{
		return PaymentMethodsConstants::PAYMENT_METHOD_DIRECTDEBIT;
	}

	/**
	* @return string
	*/
	public function getProviderName()
	{
		return PaymentMethodsConstants::PROVIDER;
	}

	/**
	* @return string
	*/
	public function getPropertyPath()
	{
		return PaymentMethodsConstants::PAYMENT_METHOD_DIRECTDEBIT;
	}

	/**
	* @param \Symfony\Component\Form\FormBuilderInterface $builder
	*
	* @return $this
	*/
	protected function addBankAccountHolderField(FormBuilderInterface $builder)
	{
		$builder->add(
			static::FIELD_BANK_ACCOUNT_HOLDER,
			TextType::class,
			[
				'label' => static::FIELD_BANK_ACCOUNT_HOLDER,
				'constraints' => [
					$this->createNotBlankConstraint(),
				],
			]
		);

		return $this;
	}

	/**
	* @param \Symfony\Component\Form\FormBuilderInterface $builder
	*
	* @return $this
	*/
	protected function addBankAccountIbanField(FormBuilderInterface $builder)
	{
		$builder->add(
			static::FIELD_BANK_ACCOUNT_IBAN,
			TextType::class,
			[
				'label' => static::FIELD_BANK_ACCOUNT_IBAN,
				'constraints' => [
					$this->createNotBlankConstraint(),
				],
			]
		);

		return $this;
	}

	/**
	* @param \Symfony\Component\Form\FormBuilderInterface $builder
	*
	* @return $this
	*/
	protected function addBankAccountBicField(FormBuilderInterface $builder)
	{
		$builder->add(
			static::FIELD_BANK_ACCOUNT_BIC,
			TextType::class,
			[
				'label' => static::FIELD_BANK_ACCOUNT_BIC,
				'constraints' => [
					$this->createNotBlankConstraint(),
				],
			]
		);

		return $this;
	}

	/**
	* @return \Symfony\Component\Validator\Constraint
	*/
	protected function createNotBlankConstraint()
	{
		return new NotBlank(['groups' => $this->getPropertyPath()]);
	}
}
```

### 3. Add a plugin

After the form has been implemented, plug this form into the checkout by adding a plugin to the `Plugin` folder:

```php
<?php
namespace Pyz\Yves\PaymentMethods\Plugin;


use Spryker\Yves\Kernel\AbstractPlugin;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginInterface;

/**
* @method \Pyz\Yves\PaymentMethods\PaymentMethodsFactory getFactory()
*/
class DirectDebitSubFormPlugin extends AbstractPlugin implements SubFormPluginInterface
{
	/**
	* @return \Pyz\Yves\PaymentMethods\Form\DirectDebitForm
	*/
	public function createSubForm()
	{
		return $this->getFactory()->createDirectDebitForm();
	}

	/**
	* @return \Pyz\Yves\PaymentMethods\Form\DataProvider\DirectDebitDataProvider
	*/
	public function createSubFormDataProvider()
	{
		return $this->getFactory()->createDirectDebitFormDataProvider();
	}
}
```

## Setup a payment handler

The next step is setting up the payment handler. Follow these steps to accomplish the procedure.

### 1. Handle a new payment type

To handle the new payment type, add the `DirectDebitHandler` class to the `Handler/` folder:

```php
<?php
namespace Pyz\Yves\PaymentMethods\Handler;

use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Shared\PaymentMethods\PaymentMethodsConstants;
use Symfony\Component\HttpFoundation\Request;

class DirectDebitHandler
{

	/**
	* @const string
	*/
	const PAYMENT_PROVIDER = PaymentMethodsConstants::PROVIDER;

	/**
	* @const string
	*/
	const PAYMENT_METHOD = PaymentMethodsConstants::PAYMENT_METHOD_DIRECTDEBIT;

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

### 2. Plug the payment handler into the checkout

To plug this payment handler into the checkout, add a plugin to the following folders:

- the `Plugin/` folder:

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
class DirectDebitHandlerPlugin extends AbstractPlugin implements StepHandlerPluginInterface
{

	/**
	* @param \Symfony\Component\HttpFoundation\Request $request
	* @param \Generated\Shared\Transfer\QuoteTransfer|\Spryker\Shared\Kernel\Transfer\AbstractTransfer $quoteTransfer
	*
	* @return \Generated\Shared\Transfer\QuoteTransfer
	*/
	public function addToDataClass(Request $request, AbstractTransfer $quoteTransfer)
	{
		$this->getFactory()->createDirectDebitHandler()->addPaymentToQuote($request, $quoteTransfer);
	}

}
```

- the `Handler/` folder:

```php
<?php

namespace Pyz\Yves\PaymentMethods\Handler;

use Generated\Shared\Transfer\PaymentTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Shared\PaymentMethods\PaymentMethodsConstants;
use Symfony\Component\HttpFoundation\Request;

class DirectDebitHandler
{

	/**
	* @const string
	*/
	const PAYMENT_PROVIDER = PaymentMethodsConstants::PROVIDER;

	/**
	* @const string
	*/
	const PAYMENT_METHOD = PaymentMethodsConstants::PAYMENT_METHOD_DIRECTDEBIT;

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

## Create a Direct Debit Twig template

This section shows how to create the Twig template that is rendered when the direct debit payment method is selected under the configured path.

To create the Direct Debit twig template, do the following:

1. In Yves, create the `directdebit.twig` template file in the `PaymentMethods/Theme/` folder and `ApplicationConstants::YVES_THEME` config value directory.
2. Adjust the path according to the theme you are currently using.

**Code sample:**

```php
<div class="payment-subform directdebit-form">
<h4>{% raw %}{{{% endraw %} 'payment.paymentMethodsDirectDebit.directdebit.bankaccount' | trans {% raw %}}}{% endraw %}</h4>
<label>{% raw %}{{{% endraw %} 'payment.paymentMethodsDirectDebit.directdebit.holder' | trans {% raw %}}}{% endraw %}</label>
	<div class="field">
		{% raw %}{{{% endraw %} form_widget(form.paymentMethodsDirectDebit.bank_account_holder, { 'attr': {'placeholder': 'payment.paymentMethodsDirectDebit.directdebit.holder' | trans } }) {% raw %}}}{% endraw %}
		{% raw %}{{{% endraw %} form_errors(form.paymentMethodsDirectDebit.bank_account_holder) {% raw %}}}{% endraw %}
</div>
	<label>{% raw %}{{{% endraw %} 'payment.paymentMethodsDirectDebit.directdebit.iban' | trans {% raw %}}}{% endraw %}</label>
	<div class="field">
		{% raw %}{{{% endraw %} form_widget(form.paymentMethodsDirectDebit.bank_account_iban, { 'attr': {'placeholder': 'payment.paymentMethodsDirectDebit.directdebit.iban' | trans } }) {% raw %}}}{% endraw %}
		{% raw %}{{{% endraw %} form_errors(form.paymentMethodsDirectDebit.bank_account_iban) {% raw %}}}{% endraw %}
</div>
	<label>{% raw %}{{{% endraw %} 'payment.paymentMethodsDirectDebit.directdebit.bic' | trans {% raw %}}}{% endraw %}</label>
	<div class="field">
		{% raw %}{{{% endraw %} form_widget(form.paymentMethodsDirectDebit.bank_account_bic, { 'attr': {'placeholder': 'payment.paymentMethodsDirectDebit.directdebit.bic' | trans } }) {% raw %}}}{% endraw %}
		{% raw %}{{{% endraw %} form_errors(form.paymentMethodsDirectDebit.bank_account_bic) {% raw %}}}{% endraw %}
</div>
		{% raw %}{{{% endraw %} form_widget(form.paymentMethodsDirectDebit) {% raw %}}}{% endraw %}
		{% raw %}{{{% endraw %} form_errors(form.paymentMethodsDirectDebit) {% raw %}}}{% endraw %}
</div>
```

{% info_block errorBox %}

Add the factory and the dependency provider for this new module in Yves.

{% endinfo_block %}

**What's next?**

After the form has been created and the payment handler has been set up, you need to [integrate them into the Checkout module](/docs/dg/dev/backend-development/data-manipulation/payment-methods/direct-debit-example-implementation/integrate-direct-debit-into-checkout.html).
