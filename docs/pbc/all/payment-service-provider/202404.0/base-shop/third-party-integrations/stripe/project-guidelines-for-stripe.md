---
title: Project guidelines for the Stripe app
description: Find out about the SCCOS modules needed for the Stripe App to function and their configuration
draft: true
last_updated: Jan 31, 2024
template: howto-guide-template
related:
  - title: Stripe
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html
redirect_from:
- /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/stripe/install-stripe.html
- /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/install-stripe.html
- /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/integrate-stripe.html

---

This document provides guidelines for projects using the Stripe app.

## OMS configuration for the project

The complete default payment OMS configuration is available at `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`.

The payment flow of the default OMS involves authorizing the initial payment, which means that the amount is temporarily blocked when the payment method permits. Then, the OMS sends requests to capture, that is, transfer of the previously blocked amount from the customer's account to the store account.

The `Payment/Capture` command initiates the capture action. By default, this command is initiated when a Back office user clicks **Ship** on the *Order Overview* page.

Optionally, you can change and configure your own payment OMS based on `ForeignPaymentStateMachine01.xml` from the core package and change this behavior according to your business flow. See [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) for more information about the OMS feature and its configuration.

To configure your payment OMS based on `ForeignPaymentStateMachine01.xml`, copy `ForeignPaymentStateMachine01.xml` with `Subprocess` folder to the project root `config/Zed/oms`. Then, change the file's name and the value of `<process name=` in the file.

This example demonstrates how to configure the order state machine transition from `ready for dispatch` to `payment capture pending`:

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="SomeProjectProcess" main="true">

        <!-- other configurations -->

        <states>

            <!-- other states -->

          <state name="payment capture pending" display="oms.state.in-progress"/>

            <!-- other states -->

        </states>

        <transitions>

            <!-- other transitions -->

            <transition happy="true">
              <source>ready for dispatch</source>
              <target>payment capture pending</target>
              <event>capture payment</event>
            </transition>

            <!-- other transitions -->

        </transitions>

        <events>

            <!-- other events -->

            <event name="capture payment" onEnter="true" command="Payment/Capture"/>

            <!-- other events -->

        </events>

    </process>

</statemachine>
```

By default, the timeout for the payment authorization action is set to 7 days. This means that if the order is in the `payment authorization pending` state, the OMS will wait for a day and then change the order state to `payment authorization failed`. Another day later, the order is automatically transitioned to the `payment authorization canceled` state. Therefore,
if you need to decrease or increase timeouts or change the states, modify the `config/Zed/oms/Subprocess/PaymentAuthorization01.xml` file according to your requirements.

For more information about ACP payment methods integration with your project OMS configuration, see [Integrate ACP payment apps with Spryker OMS configuration](/docs/dg/dev/acp/integrate-acp-payment-apps-with-spryker-oms-configuration.html).

## Checkout payment step

If you have rewritten `@CheckoutPage/views/payment/payment.twig` on the project level, do the following:

1. Make sure that a form molecule uses the following code for the payment selection choices:

```twig
{% raw %}

{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    {% embed molecule('form') with {
        data: {
            form: data.form[data.form.paymentSelection[key].vars.name],
            ...
        }
    {% endembed %}
{% endfor %}
{% endraw %}       
```

2. If you want to change the default payment provider or method names, do the following:
    1. Make sure the names are translated in your payment step template:

```twig
{% raw %}
{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    <h5>{{ name | trans }}</h5>
{% endfor %}
{% endraw %}
```

    2. Add translations to your glossary data import file:

```csv
...
Stripe,Pay Online with Stripe,en_US
```
    3. Run the data import command for the glossary:

```bash
console data:import glossary
```

## Retrieving and using payment details from Stripe

For instructions on using payment details, like the payment reference, from Stripe, see [Retrieve and use payment details from third-party PSPs](https://docs.spryker.com/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/retrieve-and-use-payment-details-from-third-party-psps.html)

## Using Stripe in Marketplace context

Install the required modules:

```bash
composer require spryker/merchant-app spryker/merchant-app-merchant-portal-gui
```

### Configuration

To enable your application to work with Stripe in a Marketplace context, you need to configure your application by adding some plugins, update some configurations, and update your state-machine configuration.

#### Plugins

##### KernelApp
- `\Spryker\Zed\MerchantApp\Communication\Plugin\KernelApp\MerchantAppRequestExpanderPlugin` - Add this one to `\Pyz\Zed\KernelApp\KernelAppDependencyProvider::getRequestExpanderPlugins()`
- `\Spryker\Zed\OauthClient\Communication\Plugin\KernelApp\OAuthRequestExpanderPlugin` - Add this one to `\Pyz\Zed\KernelApp\KernelAppDependencyProvider::getRequestExpanderPlugins()`

##### MessageBroker
- `\Spryker\Zed\MerchantApp\Communication\Plugin\MessageBroker\MerchantAppOnboardingMessageHandlerPlugin` - Add this one to `\Pyz\Zed\MessageBroker\MessageBrokerDependencyProvider::getMessageHandlerPlugins()`
- `\Spryker\Zed\KernelApp\Communication\Plugin\MessageBroker\AppConfigMessageHandlerPlugin` - Add this one to `\Pyz\Zed\MessageBroker\MessageBrokerDependencyProvider::getMessageHandlerPlugins()` (if not already present)

##### Oms

Add the required commands to your `\Pyz\Zed\Oms\OmsDependencyProvider::extendCommandPlugins()`:
```php
$commandCollection->add(new MerchantPayoutCommandByOrderPlugin(), 'SalesPaymentMerchant/Payout');
$commandCollection->add(new MerchantPayoutReverseCommandByOrderPlugin(), 'SalesPaymentMerchant/ReversePayout');
```

Add the required conditions to your `\Pyz\Zed\Oms\OmsDependencyProvider::extendConditionPlugins()`:
```php
$conditionCollection->add(new IsMerchantPaidOutConditionPlugin(), 'SalesPaymentMerchant/IsMerchantPaidOut');
$conditionCollection->add(new IsMerchantPayoutReversedConditionPlugin(), 'SalesPaymentMerchant/IsMerchantPayoutReversed');
```
#### Configuration

##### AclConfig
- Add `'merchant-app-merchant-portal-gui'` to your `\Pyz\Zed\Acl\AclConfig::addMerchantPortalInstallerRules()`.

##### MessageBrokerConfig
- `'merchant-commands'`, `'merchant-app-events'`, and `'app-events'` to your `\Pyz\Zed\MessageBroker\MessageBrokerConfig::getDefaultWorkerChannels()`.

### State-Machine configuration

Checkout the ForeignPaymentProviderStateMachine01.xml file in the `vendor/spryker/sales-payment/config/Zed/Oms/StateMachine/` directory. This file contains the state-machine configuration for the payment provider. You can copy this file to your project and adjust it according to your needs.

#### Configuring Transfers

In Spryker we used the terms "Payout" and "Reverse Payout" for transferring money from the Marketplace to the Merchant and reverse the transfer respectively.

In the context of Stripe in a Marketplace, you need to configure the transfers. The transfers are handled by the `MerchantPayoutCommandByOrderPlugin` and `MerchantPayoutReverseCommandByOrderPlugin` commands. These commands are responsible for transferring money from the Marketplace to the Merchant and reverse the transfer respectively when needed.

You also need to define when this should happen. You have several options here which are default options provided by the OMS. The simplest solution is to set a state-machine-timeout for the `MerchantPayoutCommandByOrderPlugin` command. This will trigger the command after the timeout is reached. You can also define your own conditions and triggers for the command.

You can also set up a cronjob that triggers the event for the transition when you have more sophisticated requirements e.g. transfer money to merchants every last friday of the month.


### App Configuration

The Stripe App is capable of handling payments in a Marketplace context. This can be configured in the AppStore Catalog by selecting the business model "Marketplace". When selecting the Marketplace business model, you need to pass the required configuration values for:
- Stripe Account ID 
- Stripe Publishable Key
- Stripe Secret Key

When you save the configuration an asynchronous message will be sent to your application to get details for Merchants on how to onboard to the Stripe App. The onboarding is required to let Stripe know which Merchants are part of the Marketplace and to handle the payments, transfer money, and reverse transfers accordingly.

From this moment your customers can use Stripe to pay for their orders.

### Merchant Onboarding Process

To be able to transfer money from the Marketplace Account to the Merchants, Merchants need to be onboarded to the Stripe App. When you configured the Stripe App in Marketplace mode, the Merchant onboarding process is initiated. The process is as follows:

- Merchants need login to the Merchant Portal.
- Merchants need to open the "Payment Settings" section.
- On the "Payment Settings" the Merchant will see a new section "Stripe Onboarding".
- The Merchant needs to click on the "Connect with Stripe" button.
- An onboarding page of Stripe will be opened and the Merchant needs to fill in his data.
- After the onboarding is completed, the Merchant will be redirected back to the Merchant Portal.

There are several states the onboarding process can be in:
- **Pending**: The Merchant started the onboarding process but did not complete it.
- **Enabled**: The Merchant completed the onboarding process and is ready to receive payments.
- **Restricted**: Additional data from the Merchant are required. When not updated the payouts will be paused after some period of time.
- **Restricted Soon**: Additional data from the Merchant are required. When not updated the payouts will be paused in the near future.
- **Pending**: The Merchant onboarding is not completed and must be finalized.
- **Rejected**: The Merchant onboarding was rejected and need to contact you to clarify the issue.

**Note**: You need to inform your Merchants about the required onboarding so they know about the process. Spryker doesn't support this as this is different for each project.
**Note**: The onboarding process is handled by Stripe. You can see the status of the onboarding in the Stripe Dashboard.

 