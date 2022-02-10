---
title: BS Payone
description: Provide full-service payment service and payment transaction services by integrating BS Payone into your Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payone-v1-1
originalArticleId: ffd53037-46a0-410e-941c-eb9cd4c3ff22
redirect_from:
  - /2021080/docs/payone-v1-1
  - /2021080/docs/en/payone-v1-1
  - /docs/payone-v1-1
  - /docs/en/payone-v1-1
related:
  - title: PayOne - Integration into the SCOS Project
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/scos-integration/payone-integration-into-the-scos-project.html
  - title: PayOne - Risk Check and Address Check
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/scos-integration/payone-risk-check-and-address-check.html
  - title: PayOne - Prepayment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-prepayment.html
  - title: PayOne - Authorization and Preauthorization Capture Flows
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-authorization-and-preauthorization-capture-flows.html
  - title: PayOne - Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-invoice-payment.html
  - title: PayOne - Cash on Delivery
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/scos-integration/payone-cash-on-delivery.html
  - title: PayOne - Credit Card Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-credit-card-payment.html
  - title: PayOne - Security Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-security-invoice-payment.html
---

## Partner Information

[ABOUT BS PAYONE](https://www.payone.com/)

BS PAYONE GmbH is headquartered in Frankfurt am Main and is one of the leading omnichannel-payment providers in Europe. In addition to providing customer support to numerous Savings Banks (Sparkasse) the full-service payment service provider also provides cashless payment transaction services to more than 255,000 customers from stationary trade to the automated and holistic processing of e-commerce and mobile payments.

YOUR ADVANTAGES:
* **One solution, one partner, one contract**
<br>Simple & efficient. Technical processing and financial services from a single source.
* **International payment processing**
<br>Access to international and local payment methods.
* **Automatic debtor management**
<br>Effective accounting support through transaction allocation and reconciliation.
* **Credit entries independent of payment type**
<br>Fast returns management. With automated refunds.
* **Short time to market thanks to plug'n pay**
<br>1-click checkout and seamless integration. For an increasing conversion rate.

We integrate with a wide range of payment methods that can be configured according to your needs and convenience. Payment method flows are configured using state machines.

Payone provides the following methods of payment:
* [Credit Card](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-credit-card-payment.html)
* [Direct Debit](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-direct-debit-payment.html)
* [Online Transfer](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-online-transfer-payment.html)
* [Paypal](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/bs-payone/scos-integration/payone-integration-into-the-scos-project.html)
* [Prepayment](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-prepayment.html)
* [Invoice](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-invoice-payment.html)
* [Security Invoice](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-security-invoice-payment.html)
* [Paypal Express Checkout](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/bs-payone/scos-integration/payone-integration-into-the-scos-project.html)

We use state machines for handling and managing orders and payments. To integrate Payone payments, a state machine for Payone should be created.

A basic and fully functional state machine for each payment method is already built:
* `PayoneCreditCard.xml`
* `PayoneDirectDebit.xml`
* `PayoneEWallet.xml`
* `PayoneInvoice.xml`
* `PayoneSecurityInvoice.xml`
* `PayoneOnlineTransfer.xml`
* `PayonePrePayment.xml`
* `PayonePaypalExpressCheckout.xml`

You can use the same state machines or build new ones. The state machine commands and conditions trigger Payone facade calls in order to perform the needed requests to Payone API.

## Integration to Your Project

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-eco/payone
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE    | EXPECTED DIRECTORY        |
|-----------|---------------------------|
| Payone    | vendor/spryker-eco/payone |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                                      | TYPE  | EVENT   |
|------------------------------------------------------|-------|---------|
| spy_payment_payone                                   | table | created |
| spy_payment_payone_api_call_log                      | table | created |
| spy_payment_payone_api_log                           | table | created |
| spy_payment_payone_detail                            | table | created |
| spy_payment_payone_order_item                        | table | created |
| spy_payment_payone_transaction_status_log            | table | created |
| spy_payment_payone_transaction_status_log_order_item | table | created |

{% endinfo_block %}

### 3) Set up configuration

You can copy over configs to your config from the Payone module's `config.dist.php` file.

The configuration to integrate payments using Payone is:
* `PAYONE_CREDENTIALS_KEY`: payment portal key (required).
* `PAYONE_CREDENTIALS_MID`: merchant id (required).
* `PAYONE_CREDENTIALS_AID`: sub-account id (required).
* `PAYONE_CREDENTIALS_PORTAL_ID`: payment portal id (required).
* `PAYONE_MODE`: the mode of the transaction, either test or live (required).
* `PAYONE_BUSINESS_RELATION`: the business relation of the transaction, b2b or b2c (required).
* `PAYONE_PAYMENT_GATEWAY_URL`: server-API-URL.
* `PAYONE_REDIRECT_SUCCESS_URL`: return URL for successful result on redirect.
* `PAYONE_REDIRECT_ERROR_URL`: return URL for error on redirect.
* `PAYONE_REDIRECT_BACK_URL`: return URL that will be engaged when user cancels action on redirect.
* `PAYONE_EMPTY_SEQUENCE_NUMBER`: sequence number that will be used in API requests when ommitted (0 by default).
* `PAYONE_CREDENTIALS_ENCODING`: encoding of data sent in requests to Payone API ('UTF-8' for the
* `HOST_YVES`: yves host in order to generate urls inside payone module.
* `PAYONE_STANDARD_CHECKOUT_ENTRY_POINT_URL`: entry point url to standart checkout in project(or middleware url in project, depending on your implementation).
* `PAYONE_EXPRESS_CHECKOUT_BACK_URL`: if user presses back button(if so exists) on payone side, this urs is used to redirect user back to shop.
* `PAYONE_EXPRESS_CHECKOUT_FAILURE_URL`: if something goes wrong when the user is on payone side, redirect here is done.

| PAYMENT NAME                         | ACTIVE PROCESS              | PAYMENT METHOD STATEMACHINE MAPPING                                                                               |
|--------------------------------------|-----------------------------|-------------------------------------------------------------------------------------------------------------------|
| Credit Card                          | PayoneEWallet               | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_CREDIT_CARD => 'PayoneCreditCard'                              |
| Paypal                               | PayoneEWallet               | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_E_WALLET => 'PayoneEWallet'                                    | 
| Direct Debit                         | PayoneDirectDebit           | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_DIRECT_DEBIT => 'PayoneDirectDebit'                            | 
| Eps Online Transfer                  | PayoneOnlineTransfer        | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_EPS_ONLINE_TRANSFER => 'PayoneOnlineTransfer'                  |
| Instant Online Transfer              | PayoneOnlineTransfer        | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_INSTANT_ONLINE_TRANSFER=> 'PayoneOnlineTransfer'               |
| Giropay Online Transfer              | PayoneOnlineTransfer        | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_GIROPAY_ONLINE_TRANSFER => 'PayoneOnlineTransfer'              |
| Ideal Online Transfer                | PayoneOnlineTransfer        | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_IDEAL_ONLINE_TRANSFER => 'PayoneOnlineTransfer'                |
| Postfinance Card Online Transfer     | PayoneOnlineTransfer        | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_POSTFINANCE_CARD_ONLINE_TRANSFER => 'PayoneOnlineTransfer'     |
| Postfinance Efinance Online Transfer | PayoneOnlineTransfer        | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_POSTFINANCE_EFINANCE_ONLINE_TRANSFER => 'PayoneOnlineTransfer' |
| Przelewy24 Online Transfer           | PayoneOnlineTransfer        | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_PRZELEWY24_ONLINE_TRANSFER => 'PayoneOnlineTransfer'           |
| Bancontact Online Transfer           | PayoneOnlineTransfer        | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_BANCONTACT_ONLINE_TRANSFER => 'PayoneOnlineTransfer'           |
| Prepayment                           | PayonePrePayment            | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_PRE_PAYMENT => 'PayonePrePayment'                              |
| Invoice                              | PayoneInvoice               | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_INVOICE => 'PayoneInvoice'                                     |
| Security Invoice                     | PayoneSecurityInvoice       | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_SECURITY_INVOICE => 'PayoneSecurityInvoice'                    |
| Paypal Express Checkout              | PayonePaypalExpressCheckout | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_PAYPAL_EXPRESS_CHECKOUT => 'PayonePaypalExpressCheckout'       |
| Klarna                               | PayoneKlarna                | SprykerEco\Zed\Payone\PayoneConfig::PAYMENT_METHOD_KLARNA => 'PayoneKlarna'                                       |

{% info_block warningBox %}

Make sure that you use only necessary configuration.

{% endinfo_block %}

### 4) Integration with Checkout module

Add Payone Checkout plugins.

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

//...
use SprykerEco\Zed\Payone\Communication\Plugin\Checkout\PayoneCheckoutDoSaveOrderPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Checkout\PayoneCheckoutPostSavePlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Checkout\PayoneCheckoutPreConditionPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            //...
            new PayoneCheckoutPreConditionPlugin(),
            //...
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[]|\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDoSaveOrderInterface[]
     */
    protected function getCheckoutOrderSavers(Container $container)
    {
        return [
            //...
            new PayoneCheckoutDoSaveOrderPlugin(),
            //...
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPostSaveInterface[]
     */
    protected function getCheckoutPostHooks(Container $container)
    {
        return [
            //...
            new PayoneCheckoutPostSavePlugin(),
            //...
        ];
    }

    //...
}
```

Add Payone form plugins.

| STEP HANDLER PLUGIN                               | PAYMENT NAME                                                                           | PLUGIN                                                                                             |
|---------------------------------------------------|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_BANCONTACT_ONLINE_TRANSFER           | SprykerEco\Yves\Payone\Plugin\PayoneBancontactOnlineTransferSubFormPlugin                          |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_CREDIT_CARD                          | SprykerEco\Yves\Payone\Plugin\PayoneCreditCardSubFormPlugin                                        |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_DIRECT_DEBIT                         | SprykerEco\Yves\Payone\Plugin\PayoneDirectDebitSubFormPlugin                                       |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_EPS_ONLINE_TRANSFER                  | SprykerEco\Yves\Payone\Plugin\PayoneEpsOnlineTransferSubFormPlugin                                 |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_E_WALLET                             | SprykerEco\Yves\Payone\Plugin\PayoneEWalletSubFormPlugin                                           |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_GIROPAY_ONLINE_TRANSFER              | SprykerEco\Yves\Payone\Plugin\PayoneGiropayOnlineTransferSubFormPlugin                             |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_IDEAL_ONLINE_TRANSFER                | SprykerEco\Yves\Payone\Plugin\PayoneIdealOnlineTransferSubFormPlugin                               |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_INSTANT_ONLINE_TRANSFER              | SprykerEco\Yves\Payone\Plugin\PayoneInstantOnlineTransferSubFormPlugin                             |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_INVOICE                              | SprykerEco\Yves\Payone\Plugin\PayoneInvoiceSubFormPlugin                                           |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_KLARNA                               | SprykerEco\Yves\Payone\Plugin\PayoneKlarnaSubFormPlugin                                            |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_POSTFINANCE_CARD_ONLINE_TRANSFER     | SprykerEco\Yves\Payone\Plugin\PayonePostfinanceCardOnlineTransferSubFormPlugin                     |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_POSTFINANCE_EFINANCE_ONLINE_TRANSFER | SprykerEco\Yves\Payone\Plugin\PayonePostfinanceEfinanceOnlineTransferSubFormPlugin                 |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_PRE_PAYMENT                          | SprykerEco\Yves\Payone\Plugin\PayonePrePaymentSubFormPlugin                                        |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_PRZELEWY24_ONLINE_TRANSFER           | SprykerEco\Yves\Payone\Plugin\PayonePrzelewy24OnlineTransferSubFormPlugin                          |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_SECURITY_INVOICE                     | SprykerEco\Yves\Payone\Plugin\PayoneSecurityInvoiceSubFormPluginPayoneSecurityInvoiceSubFormPlugin |
| SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin | Generated\Shared\Transfer\PaymentTransfer::PAYONE_PAYPAL_EXPRESS_CHECKOUT              |                                                                                                    |

{% info_block warningBox %}

Make sure that you use only necessary plugins.

{% endinfo_block %}

**src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage;

//...
use Generated\Shared\Transfer\PaymentTransfer;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
use SprykerEco\Yves\Payone\Plugin\PayoneCreditCardSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayoneDirectDebitSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayoneEpsOnlineTransferSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayoneEWalletSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayoneGiropayOnlineTransferSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin;
use SprykerEco\Yves\Payone\Plugin\PayoneBancontactOnlineTransferSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayoneIdealOnlineTransferSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayoneInstantOnlineTransferSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayoneInvoiceSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayoneKlarnaSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayonePostfinanceCardOnlineTransferSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayonePostfinanceEfinanceOnlineTransferSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayonePrePaymentSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayonePrzelewy24OnlineTransferSubFormPlugin;
use SprykerEco\Yves\Payone\Plugin\PayoneSecurityInvoiceSubFormPlugin;
//...

//...
class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    public const CLIENT_PAYONE = 'CLIENT_PAYONE';
    //...
  
    /**
    * @param \Spryker\Yves\Kernel\Container $container
    *
    * @return \Spryker\Yves\Kernel\Container
    */
    public function provideDependencies(Container $container): Container
    {
        //...
        $container = $this->extendSubFormPluginCollection($container);
        $container = $this->addPayoneClient($container);
        //...
    }
  
    //...

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendPaymentMethodHandler(Container $container): Container
    {
        $container->extend(static::PAYMENT_METHOD_HANDLER, function (StepHandlerPluginCollection $paymentMethodHandler) {    
            //...
            $paymentMethodHandler->add(new NopaymentHandlerPlugin(), NopaymentConfig::PAYMENT_PROVIDER_NAME);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_CREDIT_CARD);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_E_WALLET);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_DIRECT_DEBIT);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_EPS_ONLINE_TRANSFER);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_IDEAL_ONLINE_TRANSFER);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_PRE_PAYMENT);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_BANCONTACT_ONLINE_TRANSFER);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_PRZELEWY24_ONLINE_TRANSFER);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_POSTFINANCE_EFINANCE_ONLINE_TRANSFER);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_POSTFINANCE_CARD_ONLINE_TRANSFER);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_INSTANT_ONLINE_TRANSFER);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_GIROPAY_ONLINE_TRANSFER);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_INVOICE);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_SECURITY_INVOICE);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_PAYPAL_EXPRESS_CHECKOUT);//no sub form
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_KLARNA);
            //...
      
            return $paymentMethodHandler;
        });  
    }
    //...

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendSubFormPluginCollection(Container $container): Container
    {
        //..
        $container->extend(static::PAYMENT_SUB_FORMS, function (SubFormPluginCollection $paymentSubFormPluginCollection) {
            //..
            $paymentSubFormPluginCollection->add(new PayoneCreditCardSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayoneEWalletSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayoneDirectDebitSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayoneEpsOnlineTransferSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayoneIdealOnlineTransferSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayonePrePaymentSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayoneBancontactOnlineTransferSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayonePrzelewy24OnlineTransferSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayonePostfinanceEfinanceOnlineTransferSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayonePostfinanceCardOnlineTransferSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayoneInstantOnlineTransferSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayoneGiropayOnlineTransferSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayoneInvoiceSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayoneSecurityInvoiceSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayoneKlarnaSubFormPlugin());
            //..
            
            return $paymentSubFormPluginCollection;
        });
        
        return $container;
    }
    
    //...

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addPayoneClient(Container $container): Container
    {
        $container->set(static::CLIENT_PAYONE, function (Container $container) {
            $container->getLocator()->payone()->client();
        });

        return $container;
    }
}
```

Edit ***payment.twig*** template to display custom forms.

**src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig**

```twig
{% extends view('payment', '@SprykerShop:CheckoutPage') %}

{% define data = {
    //..
    customForms: {
        'Payone/credit_card': ['credit-card', 'payone'],
        'Payone/direct_debit': ['direct-debit', 'payone'],
        'Payone/klarna': ['klarna', 'payone'],
    }
} %}

{% block content %}
    {% embed molecule('form') with {
        //...
    } only %}
        {% block fieldset %}
            {% for name, choices in data.form.paymentSelection.vars.choices %}
                //...
                {% for key, choice in choices %}
                    //...
                        {% embed molecule('form') with {
                            //...
                        } only %}
                            {% block fieldset %}
                                {{ form_row(embed.toggler, {
                                   // ...
                                }) }}
                                    //...
                                        {% if embed.customForms[data.form.vars.template_path] is not defined %}
                                            {{ parent() }}
                                        {% else %}
                                            {% set viewName = embed.customForms[data.form.vars.template_path] | first %}
                                            {% set moduleName = embed.customForms[data.form.vars.template_path] | last %}
                                            {% include view(viewName, moduleName) ignore missing with {
                                                form: data.form.parent
                                            } only %}
                                        {% endif %}
                                    //...
                            {% endblock %}
                        {% endembed %}
                    {% endfor %}
            {% endfor %}
        {% endblock %}
    {% endembed %}
{% endblock %}
```

Add custom ***SuccessStep*** to display quote and payment details.

**src/Pyz/Yves/CheckoutPage/Process/Steps/SuccessStep.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Generated\Shared\Transfer\PayoneGetPaymentDetailTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerEco\Yves\Payone\Handler\PayoneHandler;
use SprykerShop\Yves\CheckoutPage\CheckoutPageConfig;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCartClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCustomerClientInterface;
use SprykerShop\Yves\CheckoutPage\Process\Steps\SuccessStep as SprykerSuccessStep;
use Symfony\Component\HttpFoundation\Request;

class SuccessStep extends SprykerSuccessStep
{
    /**
     * @var \SprykerEco\Client\Payone\PayoneClientInterface
     */
    protected $payoneClient;

    /**
     * @var \Generated\Shared\Transfer\QuoteTransfer
     */
    protected $quoteTransfer;

    /**
     * @param \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCustomerClientInterface $customerClient
     * @param \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCartClientInterface $cartClient
     * @param \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig $checkoutPageConfig
     * @param string $stepRoute
     * @param string $escapeRoute
     */
    public function __construct(
        CheckoutPageToCustomerClientInterface $customerClient,
        CheckoutPageToCartClientInterface $cartClient,
        CheckoutPageConfig $checkoutPageConfig,
        string $stepRoute,
        string $escapeRoute
    ) {
        $this->customerClient = $customerClient;
        $this->cartClient = $cartClient;
        $this->checkoutPageConfig = $checkoutPageConfig;
        $this->stepRoute = $stepRoute;
        $this->escapeRoute = $escapeRoute;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function execute(Request $request, AbstractTransfer $quoteTransfer)
    {
        $this->customerClient->markCustomerAsDirty();

        /** @var \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer */
        if (method_exists($quoteTransfer->getPayment(), 'getPayone')) {
            $this->quoteTransfer = $quoteTransfer;
        }

        return new QuoteTransfer();
    }

    /**
     * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer $quoteTransfer
     *
     * @return array
     */
    public function getTemplateVariables(AbstractTransfer $quoteTransfer)
    {
        $getPaymentDetailTransfer = new PayoneGetPaymentDetailTransfer();

        if ($this->quoteTransfer->getPayment()->getPaymentProvider() === PayoneHandler::PAYMENT_PROVIDER) {
            $getPaymentDetailTransfer->setOrderReference($this->quoteTransfer->getOrderReference());
            $getPaymentDetailTransfer = $this->payoneClient->getPaymentDetail($getPaymentDetailTransfer);
        }

        return [
            'quoteTransfer' => $this->quoteTransfer,
            'paymentDetail' => $getPaymentDetailTransfer->getPaymentDetail(),
        ];
    }
}
```

Override ***StepFactory*** to inject custom ***SuccessStep***.

**src/Pyz/Yves/CheckoutPage/Process/StepFactory.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process;

use Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider;
use Pyz\Yves\CheckoutPage\Process\Steps\SuccessStep;
use SprykerShop\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as SprykerStepFactory;
use SprykerShop\Yves\HomePage\Plugin\Provider\HomePageControllerProvider;

class StepFactory extends SprykerStepFactory
{
    /**
     * @return \Pyz\Yves\CheckoutPage\Process\Steps\SuccessStep|\SprykerShop\Yves\CheckoutPage\Process\Steps\SuccessStep
     */
    public function createSuccessStep()
    {
        return new SuccessStep(
            $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_CUSTOMER),
            $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_PAYONE),
            $this->getConfig(),
            CheckoutPageControllerProvider::CHECKOUT_SUCCESS,
            HomePageControllerProvider::ROUTE_HOME
        );
    }
}
```

### 5) Integration with OMS module

Add OMS command and condition plugins.

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

//..

use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\AuthorizeCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\CancelCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\CaptureCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\CaptureWithSettlementCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\PartialRefundCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\PreAuthorizeCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Command\RefundCommandPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\AuthorizationIsApprovedConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\AuthorizationIsErrorConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\AuthorizationIsRedirectConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\CaptureIsApprovedConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PartialRefundIsApprovedConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PartialRefundIsErrorConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PaymentIsAppointedConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PaymentIsCaptureConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PaymentIsOverpaidConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PaymentIsPaidConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PaymentIsRefundConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PaymentIsUnderPaidConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PreAuthorizationIsApprovedConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PreAuthorizationIsErrorConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\PreAuthorizationIsRedirectConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\RefundIsApprovedConditionPlugin;
use SprykerEco\Zed\Payone\Communication\Plugin\Oms\Condition\RefundIsPossibleConditionPlugin;

//..

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    //..

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        //...
        $container->extend(static::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
            $conditionCollection->add(new PreAuthorizationIsApprovedConditionPlugin(), 'Payone/PreAuthorizationIsApproved');
            $conditionCollection->add(new AuthorizationIsApprovedConditionPlugin(), 'Payone/AuthorizationIsApproved');
            $conditionCollection->add(new CaptureIsApprovedConditionPlugin(), 'Payone/CaptureIsApproved');
            $conditionCollection->add(new RefundIsApprovedConditionPlugin(), 'Payone/RefundIsApproved');
            $conditionCollection->add(new RefundIsPossibleConditionPlugin(), 'Payone/RefundIsPossible');
            $conditionCollection->add(new PreAuthorizationIsErrorConditionPlugin(), 'Payone/PreAuthorizationIsError');
            $conditionCollection->add(new AuthorizationIsErrorConditionPlugin(), 'Payone/AuthorizationIsError');
            $conditionCollection->add(new PreAuthorizationIsRedirectConditionPlugin(), 'Payone/PreAuthorizationIsRedirect');
            $conditionCollection->add(new AuthorizationIsRedirectConditionPlugin(), 'Payone/AuthorizationIsRedirect');
            $conditionCollection->add(new PaymentIsAppointedConditionPlugin(), 'Payone/PaymentIsAppointed');
            $conditionCollection->add(new PaymentIsCaptureConditionPlugin(), 'Payone/PaymentIsCapture');
            $conditionCollection->add(new PaymentIsPaidConditionPlugin(), 'Payone/PaymentIsPaid');
            $conditionCollection->add(new PaymentIsUnderPaidConditionPlugin(), 'Payone/PaymentIsUnderPaid');
            $conditionCollection->add(new PaymentIsOverpaidConditionPlugin(), 'Payone/PaymentIsOverpaid');
            $conditionCollection->add(new PaymentIsRefundConditionPlugin(), 'Payone/PaymentIsRefund');
    
            $conditionCollection->add(new PartialRefundIsApprovedConditionPlugin(), 'Payone/PartialRefundIsApproved');
            $conditionCollection->add(new PartialRefundIsErrorConditionPlugin(), 'Payone/PartialRefundIsError');
    
            return $conditionCollection;
        });
    
        $container->extend(static::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new PreAuthorizeCommandPlugin(), 'Payone/PreAuthorize');
            $commandCollection->add(new AuthorizeCommandPlugin(), 'Payone/Authorize');
            $commandCollection->add(new CancelCommandPlugin(), 'Payone/Cancel');
            $commandCollection->add(new CaptureCommandPlugin(), 'Payone/Capture');
            $commandCollection->add(new CaptureWithSettlementCommandPlugin(), 'Payone/CaptureWithSettlement');
            $commandCollection->add(new RefundCommandPlugin(), 'Payone/Refund');
    
            $commandCollection->add(new PartialRefundCommandPlugin(), 'Payone/PartialRefund');
            return $commandCollection;
        });
     }
     
     //...
}
```

In order to use the state machines provided by the Payone module, make sure to add the location path to configuration:

**config/Shared/config_default.php**

```php
<?php
$config[OmsConstants::PROCESS_LOCATION] = [
    OmsConfig::DEFAULT_PROCESS_LOCATION,
    APPLICATION_VENDOR_DIR . '/spryker-eco/payone/config/Zed/Oms',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
    'PayoneCreditCard',
    'PayoneEWallet',
    'PayoneDirectDebit',
    'PayoneOnlineTransfer',
    'PayonePrePayment',
    'PayoneInvoice',
    'PayoneSecurityInvoice',
    'PayonePaypalExpressCheckout',
    'PayoneKlarna',
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    PayoneConfig::PAYMENT_METHOD_E_WALLET => 'PayoneEWallet',
    PayoneConfig::PAYMENT_METHOD_DIRECT_DEBIT => 'PayoneDirectDebit',
    PayoneConfig::PAYMENT_METHOD_EPS_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
    PayoneConfig::PAYMENT_METHOD_GIROPAY_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
    PayoneConfig::PAYMENT_METHOD_IDEAL_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
    PayoneConfig::PAYMENT_METHOD_POSTFINANCE_CARD_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
    PayoneConfig::PAYMENT_METHOD_POSTFINANCE_EFINANCE_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
    PayoneConfig::PAYMENT_METHOD_PRZELEWY24_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
    PayoneConfig::PAYMENT_METHOD_BANCONTACT_ONLINE_TRANSFER => 'PayoneOnlineTransfer',
    PayoneConfig::PAYMENT_METHOD_PRE_PAYMENT => 'PayonePrePayment',
    PayoneConfig::PAYMENT_METHOD_INVOICE => 'PayoneInvoice',
    PayoneConfig::PAYMENT_METHOD_SECURITY_INVOICE => 'PayoneSecurityInvoice',
    PayoneConfig::PAYMENT_METHOD_PAYPAL_EXPRESS_CHECKOUT => 'PayonePaypalExpressCheckout',
    PayoneConfig::PAYMENT_METHOD_KLARNA => 'PayoneKlarna',
    
];
```

### 6) Integration with CustomerPage module

Add ***PayoneClient*** to ***CustomerPageDependencyProvider***

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

use Spryker\Yves\Kernel\Container;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    public const CLIENT_PAYONE = 'CLIENT_PAYONE';
    
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
        $container[static::CLIENT_PAYONE] = function (Container $container) {
            return $container->getLocator()->payone()->client();
        };
        return parent::provideDependencies($container);
    }
 //...   
}
```

Override ***CustomerPageFactory*** to create  ***PayoneClient***.

**src/Pyz/Yves/CustomerPage/CustomerPageFactory.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageFactory as SprykerCustomerPageFactory;

class CustomerPageFactory extends SprykerCustomerPageFactory
{
    /**
     * @return \SprykerEco\Client\Payone\PayoneClientInterface
     */
    public function createPayoneClient()
    {
        return $this->getProvidedDependency(CustomerPageDependencyProvider::CLIENT_PAYONE);
    }
}
```

Override ***OrderController*** to add payment details to template variables.

**src/Pyz/Yves/CustomerPage/Controller/OrderController.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\PayoneGetPaymentDetailTransfer;
use SprykerShop\Yves\CustomerPage\Controller\OrderController as SprykerOrderController;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class OrderController extends SprykerOrderController
{
    /**
     * @param int $idSalesOrder
     *
     * @return array
     */
    protected function getOrderDetailsResponseData(int $idSalesOrder): array
    {
        $customerTransfer = $this->getLoggedInCustomerTransfer();

        $orderTransfer = new OrderTransfer();
        $orderTransfer
            ->setIdSalesOrder($idSalesOrder)
            ->setFkCustomer($customerTransfer->getIdCustomer());

        $orderTransfer = $this->getFactory()
            ->getSalesClient()
            ->getOrderDetails($orderTransfer);

        $items = $this->getFactory()
            ->getProductBundleClient()
            ->getGroupedBundleItems(
                $orderTransfer->getItems(),
                $orderTransfer->getBundleItems()
            );

        $getPaymentDetailTransfer = new PayoneGetPaymentDetailTransfer();
        $getPaymentDetailTransfer->setOrderId((string)$idSalesOrder);
        $getPaymentDetailTransfer = $this->getFactory()
            ->createPayoneClient()->getPaymentDetail($getPaymentDetailTransfer);

        return [
            'order' => $orderTransfer,
            'items' => $items,
            'paymentDetail' => $getPaymentDetailTransfer->getPaymentDetail(),
        ];
    }
}
```

Override form resource template

**src/Pyz/Yves/ShopUi/Theme/default/resources/form/form.twig**

```twig
{% extends 'form_div_layout.html.twig' %}

{# widgets #}

{%- block widget_attributes -%}
    {%- if id %}id="{{ id }}"{% endif -%}
    name="{{ full_name }}"
    {%- if disabled %} disabled{% endif -%}
    {%- if required %} required{% endif -%}
    {{ block('attributes') }}
{%- endblock widget_attributes -%}

{%- block form_widget_simple -%}
    {%- set label = (label | default('')) | trans -%}

    {%- set attr = attr | merge({
        class: ('input input--expand' ~ (errors is not empty ? ' input--error' : ' ') ~ (attr.class | default(''))) | trim,
        type: type | default('text'),
        placeholder: attr.placeholder | default(label)
    }) -%}

    <input {{ block('widget_attributes') }} {% if value is not empty %}value="{{ value }}" {% endif %}>
{%- endblock -%}

{%- block textarea_widget -%}
    {%- set label = (label | default('')) | trans -%}

    {%- set attr = attr | merge({
        class: ('textarea textarea--expand' ~ (errors is not empty ? ' textarea--error' : ' ') ~ (attr.class | default(''))) | trim,
        placeholder: attr.placeholder | default(label)
    }) -%}

    <textarea {{ block('widget_attributes') }}>{% if value is not empty %}{{ value }}{% endif %}</textarea>
{%- endblock textarea_widget -%}

{%- block choice_widget_collapsed -%}
    {%- if required and placeholder is none and not placeholder_in_choices and not multiple and (attr.size is not defined or attr.size <= 1) -%}
        {% set required = false %}
    {%- endif -%}

    {%- set modifiers = errors is empty ? ['expand'] : ['expand', 'error'] -%}
    {%- set attr = attr | merge({class: attr.class | default('') | trim}) -%}

    {% embed atom('select') with {
        modifiers: modifiers,
        attributes: {
            multiple: multiple,
            placeholder: placeholder,
            required: required
        },
        embed: {
            attributes: block('widget_attributes'),
            class: attr.class,
            value: value,
            translation_domain: translation_domain,
            preferred_choices: preferred_choices,
            choices: choices,
            separator: separator,
            choice_translation_domain: choice_translation_domain
        }
    } only %}
        {% block selectAttributes %}
            {{parent()}}
            {{embed.attributes | raw}}
        {% endblock %}

        {% block selectClass %}
            {{parent()}}
            {{embed.class | raw}}
        {% endblock %}

        {% block options %}
            {%- if attributes.placeholder is not none -%}
                <option value=""{% if attributes.required and embed.value is empty %} selected="selected"{% endif %}>
                    {{ attributes.placeholder != '' ? (embed.translation_domain is same as(false) ? attributes.placeholder : attributes.placeholder|trans({}, embed.translation_domain)) }}
                </option>
            {%- endif -%}

            {%- if embed.preferred_choices|length > 0 -%}
                {% set options = embed.preferred_choices %}

                {{- block('renderOptions') -}}

                {%- if attributes.choices|length > 0 and embed.separator is not none -%}
                    <option disabled="disabled">{{ embed.separator }}</option>
                {%- endif -%}
            {%- endif -%}

            {%- set options = embed.choices -%}

            {%- block renderOptions -%}
                {% import _self as component %}
                {% for group_label, choice in options %}
                    {%- if choice is iterable -%}
                        <optgroup label="{{ embed.choice_translation_domain is same as(false) ? group_label : group_label|trans({}, embed.choice_translation_domain) }}">
                            {% set options = choice %}
                            {{- block('renderOptions') -}}
                        </optgroup>
                    {%- else -%}
                        <option {{ component.renderAttributes(choice.attr) }} value="{{ choice.value }}"{% if choice is selectedchoice(embed.value) %} selected="selected"{% endif %}>
                            {{ embed.choice_translation_domain is same as(false) ? choice.label : choice.label|trans({}, embed.choice_translation_domain) }}
                        </option>
                    {%- endif -%}
                {% endfor %}
            {%- endblock -%}
        {% endblock %}
    {% endembed %}
{%- endblock -%}

{% block choice_widget_expanded -%}
    <ul class="list {{ '--inline' in label_attr.class|default('') ? 'list--inline' : '' }}" {{ block('widget_container_attributes') }}>
        {% for child in form %}
            <li class="list__item">
                {{- form_errors(child, {
                    parent_label_class: label_attr.class|default(''),
                }) -}}
                {{- form_widget(child, {
                    parent_label_class: label_attr.class|default(''),
                }) -}}
            </li>
        {% endfor %}
    </ul>
{%- endblock choice_widget_expanded %}

{%- block checkbox_widget -%}
    {%- set type = type | default('checkbox') -%}
    {%- set component = component | default(atom(type)) -%}
    {%- set label = label | default(name | humanize) | trans -%}
    {%- set modifiers = errors is empty ? ['expand'] : ['expand', 'error'] -%}
    {%- set inputClass = attr.class | default() -%}

    {% define attributes = {
        id: id,
        name: full_name,
        checked: checked | default(false),
        required: required | default(false),
        disabled: disabled | default(false),
        value: value | default(),
    } %}

    {% include component with {
        modifiers: modifiers,
        data: {
            label: label,
            inputClass: inputClass,
        },
        attributes: attributes,
    } only %}
{%- endblock -%}

{%- block radio_widget -%}
    {% set type = 'radio' %}
    {{block('checkbox_widget')}}
{%- endblock -%}

{%- block password_widget -%}
    {%- set attr = attr | merge({
        id: id | default(false),
        placeholder: attr.placeholder | default(label) | trans(attr_translation_parameters, translation_domain),
        name: full_name,
        disabled: disabled | default(false),
        required: required | default(false),
    }) -%}

    {% if attr.title | default %}
        {%- set attr = attr | merge({
            title: attr.title | trans(attr_translation_parameters, translation_domain),
        }) -%}
    {% endif %}

    {% set inputComplexityJsCLass = 'js-password-complexity-indicator__' ~ attr.name %}

    {% include molecule('password-field') with {
        data: {
            inputAttributes: attr,
            inputExtraClasses: ('input input--expand ' ~ (errors is not empty ? ' input--error ') ~ (attr.class | default) ~ inputComplexityJsCLass) | trim,
        },
    } only %}

    {% if attr.password_complexity_indicator | default %}
        {% include molecule('password-complexity-indicator') with {
            attributes: {
                'input-class-name': inputComplexityJsCLass,
            },
        } only %}
    {% endif %}
{%- endblock password_widget -%}

{# rows #}

{%- block form_row -%}
    {%- set rowClass = rowAttr.class | default('') -%}

    <div class="{{rowClass}}">
        {{- form_label(form) -}}
        {{- form_errors(form) -}}
        {{- form_widget(form) -}}
    </div>
{%- endblock -%}

{%- block form_rows -%}
    {% for child in form %}
        {% if not child.isRendered %}
            {{- form_row(child, {
                rowAttr: rowAttr | default({})
            }) -}}
        {% endif %}
    {% endfor %}
{%- endblock -%}

{%- block checkbox_row -%}
    {%- set rowClass = rowAttr.class | default('') -%}

    <div class="{{rowClass}}">
        {{- form_widget(form) -}}
        {{- form_errors(form) -}}
    </div>
{%- endblock -%}

{%- block radio_row -%}
    {{- block('checkbox_row') -}}
{%- endblock -%}

{# labels #}

{%- block form_label -%}
    {% if label is not same as(false) -%}
        {% if not compound -%}
            {% set label_attr = label_attr|merge({'for': id, 'class': (label_attr.class|default('') ~ ' label')|trim}) %}
        {%- endif -%}
        {% if required -%}
            {% set label_attr = label_attr|merge({'class': (label_attr.class|default('') ~ ' label--required')|trim}) %}
        {%- endif -%}
        {% if label is empty -%}
            {%- if label_format is not empty -%}
                {% set label = label_format|replace({
                    '%name%': name,
                    '%id%': id,
                }) %}
            {%- else -%}
                {% set label = name|humanize %}
            {%- endif -%}
        {%- endif -%}
        <label{% if label_attr %}{% with { attr: label_attr } %}{{ block('attributes') }}{% endwith %}{% endif %}>{{ translation_domain is same as(false) ? label : label|trans({}, translation_domain) }}</label>
    {%- endif -%}
{%- endblock -%}

{# errors #}

{% block form_errors %}
    {% apply spaceless %}
        {% if errors | length > 0 %}
            <ul class="list list--bullet list--alert">
                {% for error in errors %}
                    <li class="list__item">{{ error.message | trans }}</li>
                {% endfor %}
            </ul>
        {% endif %}
    {% endapply %}
{% endblock %}
```

Optionally configure security firewall for `/payone` route to accept `TransactionStatus` requests.
Excerpt from PAYONE Platform Channel Server API document:

According to the configuration of your payment portal you will receive the data and the status for each payment processed via the URL you have submitted. The data transfer is based on simple HTTP-POST request (key/value pairs). The `TransactionStatus` is sent from the following IP addresses: 185.60.20.0/24 (i.e. 185.60.20.1 to 185.60.20.254). Please configure your firewall to allow incoming packets from these IP addresses.

---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).


For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-form js-hubspot-form" data-portal-id="2770802" data-form-id="163e11fb-e833-4638-86ae-a2ca4b929a41" id="hubspot-1"></div>
