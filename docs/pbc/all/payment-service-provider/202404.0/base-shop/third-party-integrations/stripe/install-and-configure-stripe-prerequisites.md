---
title: Install and configure Stripe prerequisites
description: Learn how to prepare your project for Stripe
last_updated: Mar 20, 2024
template: howto-guide-template
redirect_from:
- /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/stripe/install-stripe.html
- /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/install-stripe.html
- /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/integrate-stripe.html
- /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/sccos-prerequisites-for-the-stripe-app.html
---

To install and configure the prerequisites for the [Stripe App](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/stripe.html), take the following steps.


## Fulfill Stripe's prerequisites

* Create a Stripe account.
* Make sure [your countries are supported by Stripe](https://stripe.com/global).
* Make sure [your business is not restricted by Stripe](https://stripe.com/legal/restricted-businesses).

## Fulfill ACP prerequisites

* Connect your Stripe account to the Spryker Platform account. Request this link by [creating a support case](https://support.spryker.com/s/).
* Enable ACP in your project. For instructions, see [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html). Make sure you are using the latest version of the Message Bus. We'll verify this during onboarding, and a migration may be necessary to enable the Stripe app.

## Install packages and add configuration

1. Install the required packages.
    To check the list of required packages, in the Back Office, go to **Apps**>**Stripe**.

2. Add or update the shared configs:

<details>
  <summary>config/Shared/config_default.php</summary>

```php
//...

use Generated\Shared\Transfer\PaymentCaptureFailedTransfer;
use Generated\Shared\Transfer\CapturePaymentTransfer;
use Generated\Shared\Transfer\PaymentCapturedTransfer;
use Generated\Shared\Transfer\AddPaymentMethodTransfer;
use Generated\Shared\Transfer\DeletePaymentMethodTransfer;
use Generated\Shared\Transfer\PaymentAuthorizationFailedTransfer;
use Generated\Shared\Transfer\PaymentAuthorizedTransfer;
use Spryker\Shared\MessageBroker\MessageBrokerConstants;
use Spryker\Shared\Oms\OmsConstants;
use Spryker\Shared\Payment\PaymentConstants;
use Spryker\Shared\Sales\SalesConstants;
use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsConfig;
use Spryker\Zed\Oms\OmsConfig;
use Spryker\Zed\Payment\PaymentConfig;

//...
$config[PaymentConstants::TENANT_IDENTIFIER] = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';

$config[OmsConstants::PROCESS_LOCATION] = [
    //...
    OmsConfig::DEFAULT_PROCESS_LOCATION,
    APPLICATION_ROOT_DIR . '/vendor/spryker/sales-payment/config/Zed/Oms', # this line must be added if your use unmodified ForeignPaymentStateMachine01.xml
];
$config[OmsConstants::ACTIVE_PROCESSES] = [
    //...
    'ForeignPaymentStateMachine01', # this line must be added or add your modified version of this OMS
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    //...
    PaymentConfig::PAYMENT_FOREIGN_PROVIDER => 'ForeignPaymentStateMachine01', # this line must be added or add your modified version of this OMS
];

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...
    AddPaymentMethodTransfer::class => 'payment-method-commands',
    DeletePaymentMethodTransfer::class => 'payment-method-commands',
    CancelPaymentTransfer::class => 'payment-commands',
    CapturePaymentTransfer::class => 'payment-commands',
    RefundPaymentTransfer::class => 'payment-commands',
    PaymentAuthorizedTransfer::class => 'payment-events',
    PaymentAuthorizationFailedTransfer::class => 'payment-events',
    PaymentCapturedTransfer::class => 'payment-events',
    PaymentCaptureFailedTransfer::class => 'payment-events',
    PaymentRefundedTransfer::class => 'payment-events',
    PaymentRefundFailedTransfer::class => 'payment-events',
    PaymentCanceledTransfer::class => 'payment-events',
    PaymentCancellationFailedTransfer::class => 'payment-events',

    # [Optional] This message can be received from your project when you want to use details of the Stripe App used payment.
    PaymentCreatedTransfer::class => 'payment-events',
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...
    'payment-method-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    'payment-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

$config[MessageBrokerConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    //...
    'payment-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

```

</details>

3. In `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`, add or update the config of the Message Broker dependency provider:

```php

namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentMethodMessageHandlerPlugin;
use Spryker\Zed\SalesPaymentDetail\Communication\Plugin\MessageBroker\PaymentCreatedMessageHandlerPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
     */
    public function getMessageHandlerPlugins(): array
    {
        return [
            //...
            # These plugins are handling messages sent from Stripe app to your project.
            new PaymentOperationsMessageHandlerPlugin(),
            new PaymentMethodMessageHandlerPlugin(),

            # [Optional] This plugin is handling the `PaymentCreated` messages sent from Stripe App.
            new PaymentCreatedMessageHandlerPlugin(),
        ];
    }
}

```

4. In `src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php`, add or updated the channels config in the message broker config:

```php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerConfig as SprykerMessageBrokerConfig;

class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    /**
     * @return array<string>
     */
    public function getDefaultWorkerChannels(): array
    {
        return [
            //...
            'payment-events',
            'payment-method-commands',
        ];
    }

    //...
}
```

5. In `src/Pyz/Zed/Oms/OmsDependencyProvider.php`, add or update the OMS config:


```php
use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendCapturePaymentMessageCommandPlugin;
use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendRefundPaymentMessageCommandPlugin;
use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendCancelPaymentMessageCommandPlugin;

//...

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
         $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
             //...
             $commandCollection->add(new SendCapturePaymentMessageCommandPlugin(), 'Payment/Capture');
             // These two commands will be also supported soon by ACP Stripe app.
             $commandCollection->add(new SendRefundPaymentMessageCommandPlugin(), 'Payment/Refund');
             $commandCollection->add(new SendCancelPaymentMessageCommandPlugin(), 'Payment/Cancel');

             return $commandCollection;
        });

        return $container;
    }

```

6. In `src/Pyz/Zed/Payment/PaymentDependencyProvider.php`, add or update the following plugins:


```php
// ...

use Spryker\Zed\OauthClient\Communication\Plugin\Payment\AccessTokenPaymentAuthorizeRequestExpanderPlugin;


    // ...

    /**
     * @return array<int, \Spryker\Zed\PaymentExtension\Dependency\Plugin\PaymentAuthorizeRequestExpanderPluginInterface>
     */
    protected function getPaymentAuthorizeRequestExpanderPlugins(): array
    {
        return [
            //...
            new AccessTokenPaymentAuthorizeRequestExpanderPlugin(),
        ];
    }

```

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

##### AclMerchantPortal 
- `\Spryker\Zed\MerchantAppMerchantPortalGui\Communication\Plugin\AclMerchantPortal\MerchantAppMerchantPortalGuiMerchantAclRuleExpanderPlugin` - Add this one to `\Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getMerchantAclRuleExpanderPlugins()`
- `\Spryker\Zed\MerchantAppMerchantPortalGui\Communication\Plugin\AclMerchantPortal\MerchantAppAclEntityConfigurationExpanderPlugin`- Add this one to `\Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getAclEntityConfigurationExpanderPlugins()`
  `
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


## Next step

[Connect and configure Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/connect-and-configure-stripe.html)
