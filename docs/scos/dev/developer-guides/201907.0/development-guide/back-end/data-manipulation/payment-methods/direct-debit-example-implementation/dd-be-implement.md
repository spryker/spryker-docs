---
title: Implementation of Direct Debit in Zed
originalLink: https://documentation.spryker.com/v3/docs/dd-be-implementation
redirect_from:
  - /v3/docs/dd-be-implementation
  - /v3/docs/en/dd-be-implementation
---

This article provides the instructions on how to implement the Direct Debit payment method and integrate it into Checkout, State Machine, and OMS on the back-end side.

## Persisting Payment Details

The payment details for the Direct Debit payment method need to be persisted in the database. 

To persist the payment details, do the following:

<details open>
<summary>1. Create a new table to store payment details data</summary>
    
Add the `spy_payment_direct_debit.schema.xml` file with the following content to the `Persistence/Propel/Schema/` folder in Zed:

```php
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
	xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
	namespace="Orm\Zed\PaymentMethods\Persistence" package="src.Orm.Zed.PaymentMethods.Persistence">

<table name="spy_payment_direct_debit">
	<column name="id_payment_directdebit" type="INTEGER" autoIncrement="true" primaryKey="true"/>
	<column name="fk_sales_order" required="true" type="INTEGER"/>

	<column name="bank_account_holder" type="VARCHAR" />
	<column name="bank_account_bic" type="VARCHAR" size="100"/>
	<column name="bank_account_iban" size="50"  type="VARCHAR"/>

	<foreign-key name="spy_payment_directdebit-fk_sales_order" foreignTable="spy_sales_order">
		<reference foreign="id_sales_order" local="fk_sales_order"/>
	</foreign-key>

	<behavior name="timestampable"/>
	<id-method-parameter value="spy_payment_directdebit_pk_seq"/>
    </table>

    </database>
```
    
</br>
</details>

<details open>
<summary>2. Perform a database migration and generate the query object:</summary>
    
Run the following command:
    
```bash
vendor/bin/console propel:install
```
    
</br>
</details>

<details open>
<summary>3. Save the Direct Debit payment details in the persistence layer:</summary>
    
To do this, perform the following steps:

1. Create the `PaymentMethodsPersistenceFactory` class on the persistence layer:

```php
<?php
namespace Pyz\Zed\PaymentMethods\Persistence;

use Orm\Zed\PaymentMethods\Persistence\SpyPaymentDirectDebitQuery;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
* @method \Pyz\Zed\PaymentMethods\Persistence\PaymentMethodsQueryContainer getQueryContainer()
*/
class PaymentMethodsPersistenceFactory extends AbstractPersistenceFactory
{
	/**
	* @return \Orm\Zed\PaymentMethods\Persistence\SpyPaymentDirectDebitQuery
	*/
	public function createPaymentDirectDebitQuery()
	{
		return SpyPaymentDirectDebitQuery::create();
	}

}
```

2. Implement the `PaymentMethodsQueryContainer`:

```php
<?php
namespace Pyz\Zed\PaymentMethods\Persistence;

use Spryker\Zed\Kernel\Persistence\AbstractQueryContainer;

/**
* @method  \Pyz\Zed\PaymentMethods\Persistence\PaymentMethodsPersistenceFactory getFactory()
*/
class PaymentMethodsQueryContainer extends AbstractQueryContainer
{
	/**
	* @param int $idSalesOrder
	*
	* @return \Orm\Zed\PaymentMethods\Persistence\SpyPaymentDirectDebitQuery
	*/
	public function queryPaymentBySalesOrderId($idSalesOrder)
	{
		return $this->getFactory()->createPaymentDirectDebitQuery()->filterByFkSalesOrder($idSalesOrder);
	}
}
```

</br>
</details>

## Saving Direct Debit Payment Details

To add the logic for saving and viewing the direct debit payment details on the business layer and expose them using the `PaymentMethodsFacade`, do the following:

1. In the `Business/Reader/ ` folder, add the `DirectDebitReader` class. This will implement the logic for **viewing** the Direct Debit payment details.

<details open>
<summary>Code sample:</summary>

```php
<?php

namespace Pyz\Zed\PaymentMethods\Business\Reader;


use Generated\Shared\Transfer\PaymentDirectDebitTransfer;
use Pyz\Zed\PaymentMethods\Persistence\PaymentMethodsQueryContainer;

class DirectDebitReader
{

	/**
	* @var \Pyz\Zed\PaymentMethods\Persistence\PaymentMethodsQueryContainer
	*/
	protected $queryContainer;

	/**
	* @param \Pyz\Zed\PaymentMethods\Persistence\PaymentMethodsQueryContainer $queryContainer
	*/
	public function __construct(PaymentMethodsQueryContainer $queryContainer)
	{
		$this->queryContainer = $queryContainer;
	}

	/**
	* @param int $salesOrderId
	*
	* @return \Generated\Shared\Transfer\PaymentDirectDebitTransfer
	*/
	public function getPaymentForOrderId($salesOrderId)
	{
		$entity = $this->queryContainer->queryPaymentBySalesOrderId($salesOrderId)->findOne();
		$directDebitTransfer = new PaymentDirectDebitTransfer();
		$directDebitTransfer->fromArray($entity->toArray(), true);

		return $directDebitTransfer;
	}

	/**
	* @param int $salesOrderId
	*
	* @return bool
	*/
	public function hasPaymentForOrderId($salesOrderId)
	{
		$entity = $this->queryContainer->queryPaymentBySalesOrderId($salesOrderId)->findOne();

		return $entity !== null;
	}

}
```

</br>
</details>

2. In the `Business/Writer/` folder, add the `DirectDebitWriter` class. This will implement the logic for **saving** the Direct Debit payment details.		    

<details open>
<summary>Code sample:</summary>

```php
<?php

namespace Pyz\Zed\PaymentMethods\Business\Writer;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Orm\Zed\PaymentMethods\Persistence\SpyPaymentDirectDebit;
use Pyz\Shared\PaymentMethods\PaymentMethodsConstants;

class DirectDebitWriter
{
	/**
	* @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
	* @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
	*
	* @return void
	*/
	public function saveOrderPayment(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponseTransfer)
	{
		if ($quoteTransfer->requirePayment()->getPayment()->requirePaymentMethodsDirectDebit()->getPaymentMethod() == PaymentMethodsConstants::PAYMENT_METHOD_DIRECTDEBIT) {
			$this->saveDirectDebit($quoteTransfer, $checkoutResponseTransfer);
		}
	}

	/**
	* @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
	* @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
	*
	* @throws \Propel\Runtime\Exception\PropelException
	*
	* @return void
	*/
	protected function saveDirectDebit(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponseTransfer)
	{
		$entity = new SpyPaymentDirectDebit();

		$directDebitTransfer = $quoteTransfer->requirePayment()->getPayment()->requirePaymentMethodsDirectDebit()->getPaymentmethodsdirectdebit();

		$entity->fromArray($directDebitTransfer->toArray());
		$entity->setFkSalesOrder($checkoutResponseTransfer->getSaveOrder()->getIdSalesOrder());

		$entity->save();
	}
}
```

</br>
</details>

3. Implement the `PaymentMethodsBusinessFactory` to get instances for these 2 classes:
				
<details open>
<summary>Code sample:</summary>

```php
<?php

namespace Pyz\Zed\PaymentMethods\Business;

use Pyz\Zed\PaymentMethods\Business\Reader\DirectDebitReader;
use Pyz\Zed\PaymentMethods\Business\Writer\DirectDebitWriter;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

class PaymentMethodsBusinessFactory extends AbstractBusinessFactory
{
	/**
	* @return \Pyz\Zed\PaymentMethods\Business\Writer\DirectDebitWriter
	*/
	public function createDirectDebitWriter()
	{
		return new DirectDebitWriter();
	}

	/**
	* @return \Pyz\Zed\PaymentMethods\Business\Reader\DirectDebitReader
	*/
	public function createDirectDebitReader()
	{
		return new DirectDebitReader($this->getQueryContainer());
	}

}
```

</br>
</details>

4. Expose the `save/retrieve` Direct Debit payment details using the `PaymentMethodsFacade`:

<details open>
<summary>Code sample:</summary>

```php
<?php

namespace Pyz\Zed\PaymentMethods\Business;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
* @method \Pyz\Zed\PaymentMethods\Business\PaymentMethodsBusinessFactory getFactory()
*/
class PaymentMethodsFacade extends AbstractFacade
{

	/**
	* @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
	* @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
	*
	* @return void
	*/
	public function saveOrderPayment(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponseTransfer)
	{
		$this->getFactory()->createDirectDebitWriter()->saveOrderPayment($quoteTransfer, $checkoutResponseTransfer);
	}

	/**
	* @param int $idSalesOrder
	*
	* @return \Generated\Shared\Transfer\PaymentDirectDebitTransfer
	*/
	public function getOrderDirectDebit($idSalesOrder)
	{
		return $this->getFactory()->createDirectDebitReader()->getPaymentForOrderId($idSalesOrder);
	}

	/**
	* @param int $idSalesOrder
	*
	* @return bool
	*/
	public function hasOrderDirectDebit($idSalesOrder)
	{
		return $this->getFactory()->createDirectDebitReader()->hasPaymentForOrderId($idSalesOrder);
	}

}
```

</br>
</details>

### Listing Direct Debit Payment Details in Zed UI

In Zed, when looking over the details on a submitted order, you need to see the payment details.

To view the payment details, do the following:

1. Extend the order details page by adding the `PaymentMethods/Presentation/Sales/list.twig` template with the following content:

<details open>
<summary>Code sample:</summary>

```xml
{% raw %}{%{% endraw %} if (idPayment) {% raw %}%}{% endraw %}
	<div class="row">
		<div class="col-sm-12">
			{% raw %}{%{% endraw %} embed '@Gui/Partials/widget.twig' with { widget_title: 'Direct Debit' | trans } {% raw %}%}{% endraw %}
				{% raw %}{%{% endraw %} block widget_content {% raw %}%}{% endraw %}
					<table class="footable table table-striped toggle-arrow-tiny">
						<tbody>
						<tr>
							<td><strong>{% raw %}{{{% endraw %} 'Account Holder' | trans {% raw %}}}{% endraw %}</strong></td>
                            <td>{% raw %}{{{% endraw %} paymentDetails.bankAccountHolder {% raw %}}}{% endraw %}</td>
                            </tr>
						    <tr>
                            <td><strong>{% raw %}{{{% endraw %} 'IBAN' | trans {% raw %}}}{% endraw %}</strong></td>
							<td>{% raw %}{{{% endraw %} paymentDetails.bankAccountIban {% raw %}}}{% endraw %}</td>
						</tr>
						<tr>
                            <td><strong>{% raw %}{{{% endraw %} 'BIC' | trans {% raw %}}}{% endraw %}</strong></td>
							<td>{% raw %}{{{% endraw %} paymentDetails.bankAccountBic {% raw %}}}{% endraw %}</td>
                        </tr>
                        </tbody>
                    </table>
				{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
			{% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
        </div>
    </div>
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

</br>
</details>

2. Add the corresponding controller action for this view in `PaymentMethods/Communication/Controller/SalesController.php`:

<details open>
<summary>Code sample:</summary>

```php
<?php

namespace Pyz\Zed\PaymentMethods\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
* @method \Pyz\Zed\PaymentMethods\Persistence\PaymentMethodsQueryContainer getQueryContainer()
* @method \Pyz\Zed\PaymentMethods\Business\PaymentMethodsFacade getFacade()
*/
class SalesController extends AbstractController
{

	/**
	* @param \Symfony\Component\HttpFoundation\Request $request
	*
	* @return array
	*/
	public function listAction(Request $request)
	{
		$idSalesOrder = $request->query->get('id-sales-order');

		if ($this->getFacade()->hasOrderDirectDebit($idSalesOrder)) {
			$directDebitTransfer = $this->getFacade()->getOrderDirectDebit($idSalesOrder);

			return [
				'idPayment' => $directDebitTransfer->getIdPaymentDirectdebit(),
				'paymentDetails' => $directDebitTransfer,
			];
		}

		return [
			'idPayment' => null,
			'paymentDetails' => null,
		];
	}
}
```

</br>
</details>

Information will be available here: `/payment-methods/sales/list?id-sales-order=1`

### Integrating the Direct Debit Method into Checkout

To integrate the Direct Debit method into the checkout, you need to implement these 3 plugins:

* `DirectDebitPostCheckPlugin`
* `DirectDebitPreCheckPlugin`
* `DirectDebitSaveOrderPlugin`

To do this, perform the following steps:

1. In Zed, add the following 3 plugins to the `Communication/Plugin/Checkout/` folder of the new module you've created (`PaymentMethods`).
	
<details open>
<summary>DirectDebitPreCheckPlugin</summary>

```php
<?php

namespace Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Payment\Dependency\Plugin\Checkout\CheckoutPreCheckPluginInterface;


class DirectDebitPreCheckPlugin extends AbstractPlugin implements CheckoutPreCheckPluginInterface
{

	/**
	* @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
	* @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
	*
	* @return bool
	*/
	public function execute(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponseTransfer)
	{
		$checkoutResponseTransfer->setIsSuccess(true);

		return true;
	}

}
```

</br>
</details>

<details open>
<summary>DirectDebitSaveOrderPlugin</summary>

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
    class DirectDebitSaveOrderPlugin extends AbstractPlugin implements                      CheckoutSaveOrderPluginInterface
    {

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
     *
     * @return void
     */
    public function execute(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponseTransfer)
    {
      $this->getFacade()->saveOrderPayment($quoteTransfer, $checkoutResponseTransfer);
    }
				}

```

</br>
</details>

<details open>
<summary>DirectDebitPostCheckPlugin</summary>

```php
<?php
namespace Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout;

use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Payment\Dependency\Plugin\Checkout\CheckoutPostCheckPluginInterface;

class DirectDebitPostCheckPlugin extends AbstractPlugin implements CheckoutPostCheckPluginInterface
{
	/**
	* @api
	*
	* @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
	* @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
	*
	* @return \Generated\Shared\Transfer\CheckoutResponseTransfer
	*/
	public function execute(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponseTransfer)
	{
		return $checkoutResponseTransfer;
	}
}
```

</br>
</details>

2. Inject these 3 plugins in the `PaymentMethods` module by creating a `PaymentDependencyInjector` under the `Dependency/Injector/` folder:

<details open>
<summary>Code sample:</summary>

```php
<?php
namespace Pyz\Zed\PaymentMethods\Dependency\Injector;

use Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout\DirectDebitPostCheckPlugin;
use Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout\DirectDebitPreCheckPlugin;
use Pyz\Zed\PaymentMethods\Communication\Plugin\Checkout\DirectDebitSaveOrderPlugin;
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
			$pluginCollection->add(new DirectDebitPreCheckPlugin(), PaymentMethodsConstants::PROVIDER, PaymentDependencyProvider::CHECKOUT_PRE_CHECK_PLUGINS);
			$pluginCollection->add(new DirectDebitSaveOrderPlugin(), PaymentMethodsConstants::PROVIDER, PaymentDependencyProvider::CHECKOUT_ORDER_SAVER_PLUGINS);
			$pluginCollection->add(new DirectDebitPostCheckPlugin(), PaymentMethodsConstants::PROVIDER, PaymentDependencyProvider::CHECKOUT_POST_SAVE_PLUGINS);

			return $pluginCollection;
		});

		return $container;
	}

}
```

</br>
</details>

## Configuring Dependency Injectors for Yves and Zed
Add injectors for Zed and Yves and `ActiveProcess` and Statemachine mapping to the `config\Shared\config_default.php` file:

```
// ---------- Dependency injector
$config[KernelConstants::DEPENDENCY_INJECTOR_YVES] = [
	'CheckoutPage' => [
		PaymentMethodsConstants::PROVIDER,
	],
];
$config[KernelConstants::DEPENDENCY_INJECTOR_ZED] = [
	'Payment' => [
		PaymentMethodsConstants::PROVIDER,
	],
	'Oms' => [
		PaymentMethodsConstants::PROVIDER,
	],
];
// ---------- State machine (OMS)
$config[OmsConstants::ACTIVE_PROCESSES] = [
	PaymentMethodsConstants::PAYMENT_METHOD_DIRECTDEBIT,
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
	PaymentMethodsConstants::PAYMENT_METHOD_DIRECTDEBIT => PaymentMethodsConstants::PAYMENT_METHOD_DIRECTDEBIT,
];
```

## Integrating the Direct Debit Payment Method into State Machine

After the preceding procedures have been completed, set up a state machine, which is dedicated for processing orders that use Direct Debit as a payment type. For this purpose, add the `paymentMethodsDirectDebit.xml ` file with the following content to the `config/Zed/oms/` folder:

<details open>
<summary>Code sample:</summary>

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="DirectDebit" main="true">
    <states>
        <state name="new" reserved="true"/>
        <state name="payment issued" />
        <state name="payment received" />
        <state name="order shipped" />
        <state name="ready for return" />
        <state name="completed" />
        <state name="cancelled" />
        <state name="refunded" />
        <state name="returned" />
        <state name="payment clarification needed" />
    </states>

    <transitions>
        <transition>
            <source>new</source>
        <target>payment issued</target>
            <event>capture direct debit</event>
        </transition>

        <transition>
            <source>payment issued</source>
            <target>payment received</target>
        <event>payment received</event>
        </transition>

        <transition>
            <source>payment issued</source>
            <target>payment clarification needed</target>
    <event>clarify payment</event>
        </transition>

        <transition>
            <source>payment clarification needed</source>
            <target>cancelled</target>
            <event>cancel</event>
        </transition>

        <transition>
            <source>payment received</source>
            <target>order shipped</target>
            <event>ship order</event>
        </transition>

        <transition>
            <source>order shipped</source>
            <target>ready for return</target>
            <event>ready for return</event>
        </transition>

        <transition>
            <source>ready for return</source>
            <target>completed</target>
            <event>item not returned</event>
        </transition>

        <transition>
            <source>new</source>
            <target>cancelled</target>
            <event>cancel</event>
        </transition>

        <transition>
            <source>payment received</source>
            <target>refunded</target>
            <event>refund</event>
        </transition>

        <transition>
            <source>refunded</source>
            <target>cancelled</target>
            <event>cancel</event>
        </transition>

        <transition>
            <source>returned</source>
            <target>refunded</target>
            <event>refund</event>
        </transition>

        <transition>
            <source>ready for return</source>
            <target>returned</target>
            <event>return received</event>
        </transition>
    </transitions>

    <events>
        <event name="capture direct debit" manual="true" />
        <event name="payment received" manual="true" />
        <event name="ship order" manual="true" />
        <event name="ready for return"  onEnter="true" />
        <event name="item not returned" timeout="30days" />
        <event name="cancel" manual="true" />
        <event name="refund" manual="true" />
        <event name="return received" manual="true" />
        <event name="clarify payment" manual="true" />
    </events>
   </process>
</statemachine>
```
			
</br>
</details>

***

**What's next?**

After the Direct Debit payment method has been created and integrated in the back-end, you need to [identify the new Direct Debit payment type in the shared layer](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/payment-methods/direct-debit-example-implementation/dd-shared-imple).

<!--*Last review date: Sep 27, 2019*

by Alexander Veselov, Yuliia Boiko-->
