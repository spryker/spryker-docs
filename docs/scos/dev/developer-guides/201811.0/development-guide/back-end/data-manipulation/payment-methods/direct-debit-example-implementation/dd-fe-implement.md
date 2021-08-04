---
title: HowTo - Implement the Direct Debit in Front-end
originalLink: https://documentation.spryker.com/v1/docs/dd-fe-implementation
redirect_from:
  - /v1/docs/dd-fe-implementation
  - /v1/docs/en/dd-fe-implementation
---

Usually, the first step of the Direct Debit payment method implementation is set-up on Yves. This article provides step-by-step instructions on how to do that.

## Prerequisites
Prior to proceeding with the first step, the form creation, add a new module on the project level in Yves - for example, the `PaymentMethods` module. If you haven't had any experience in creating a new module yet, see [Tutorial - Adding a New Module](/docs/scos/dev/developer-guides/201811.0/development-guide/back-end/data-manipulation/data-enrichment/extending-spryker/t-add-new-bundl). Create a *Form* folder in the module.

## Creating a Form
The starting point is to create the form in Yves.

To create the form, do the following:

<details open>
<summary>1. Add the data provider</summary>
    
In the created module, in our example `PaymentMethods`, add the data provider to the `Form/DataProvider/` folder:
    
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

</br>
</details>

<details open>
<summary>2. Implement the form</summary>

Once done, implement the form:

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

</br>
</details>

<details open>
<summary>3. Add a plugin</summary>

After the form has been implemented, plug this form into the checkout by adding a plugin to the `Plugin/` folder:

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

</br>
</details>

## Setting up a Payment Handler
The next step is setting up the payment handler. Follow the procedure below to accomplish this.

<details open>
<summary>1. Handle a new payment type</summary>

To handle the new payment type, add a `DirectDebitHandler` class to the `Handler/` folder:

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

</br>
</details>

<details open>
<summary>2. Plug the payment handler into the checkout</summary>

To plug this payment handler into the checkout, add a plugin to the following folders: 

* the `Plugin/` folder:

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

* the `Handler/` folder:

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

</br>
</details>

## Creating a Direct Debit Twig Template
This procedure learns you on how to create the Twig template that will be rendered when the direct debit payment method is selected under the configured path.

To create the Direct Debit twig template, do the following:

1. In Yves, create the `directdebit.twig` template file in the `PaymentMethods/Theme/` folder, and then `ApplicationConstants::YVES_THEME` config value directory.
2. Adjust the path according to the theme you are currently using.

<details open>
<summary>Code sample:</summary>

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

</br>
</details>

{% info_block errorBox %}
Don’t forget to add the factory and the dependency provider for this new  module in Yves.
{% endinfo_block %}
***
**What's next?**

After the form has been created and the payment handler has been set up, you need to [integrate them into the Checkout module](/docs/scos/dev/developer-guides/201811.0/development-guide/back-end/data-manipulation/payment-methods/direct-debit-example-implementation/dd-checkout-imp).
