---
title: Install and configure Stripe prerequisites
description: Learn how to prepare your project for Stripe
last_updated: Nov 1, 2024
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
  use Spryker\Shared\KernelApp\KernelAppConstants;
  use Spryker\Shared\OauthClient\OauthClientConstants;
  use Spryker\Shared\Oms\OmsConstants;
  use Spryker\Shared\Payment\PaymentConstants;
  use Spryker\Shared\Sales\SalesConstants;
  use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsConfig;
  use Spryker\Zed\Oms\OmsConfig;
  use Spryker\Zed\Payment\PaymentConfig;

  //...
  $config[PaymentConstants::TENANT_IDENTIFIER] = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';
  $config[KernelAppConstants::TENANT_IDENTIFIER] = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';

  $config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_ACP] = OauthAuth0Config::PROVIDER_NAME;
  $config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_ACP] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
  $config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_ACP] = 'aop-app'

  $config[OmsConstants::PROCESS_LOCATION] = [
      //...
      OmsConfig::DEFAULT_PROCESS_LOCATION,
      APPLICATION_ROOT_DIR . '/vendor/spryker/sales-payment/config/Zed/Oms', # this line must be added if you use unmodified ForeignPaymentStateMachine01.xml
  ];
  $config[OmsConstants::ACTIVE_PROCESSES] = [
      //...
      'ForeignPaymentB2CStateMachine01', # this line must be added or add your modified version of this OMS
  ];
  $config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
      //...
      PaymentConfig::PAYMENT_FOREIGN_PROVIDER => 'ForeignPaymentB2CStateMachine01', # this line must be added or add your modified version of this OMS
  ];

  $config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
      //...
      AddPaymentMethodTransfer::class => 'payment-method-commands',
      UpdatePaymentMethodTransfer::class => 'payment-method-commands'
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
      PaymentUpdatedTransfer::class => 'payment-events'
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
use Spryker\Zed\SalesPaymentDetail\Communication\Plugin\MessageBroker\SalesPaymentDetailMessageHandlerPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
     */
    public function getMessageHandlerPlugins(): array
    {
        return [
            //...
            # These plugins are handling messages sent from the Stripe app to your project.
            new PaymentOperationsMessageHandlerPlugin(),
            new PaymentMethodMessageHandlerPlugin(),

            # [Optional] This plugin handles the `PaymentCreated` and `PaymentUpdated` messages sent from the Stripe App.
            new SalesPaymentDetailMessageHandlerPlugin(),
        ];
    }
}

```

4. In `src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php`, add or update the channels config in the message broker config:

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

6. In `src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php`, add or update the following plugins:


```php
// ...

use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentAuthorizationCheckoutPostSavePlugin;
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin;

    // ...

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPostSaveInterface>
     */
    protected function getCheckoutPostHooks(Container $container): array
    {
        return [
            //...
            new PaymentAuthorizationCheckoutPostSavePlugin(),
            new PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin(),
        ];
    }

```

7. In `src/Pyz/Yves/Router/RouterDependencyProvider.php`, add or update the following plugins:


```php
// ...

use SprykerShop\Yves\PaymentPage\Plugin\Router\PaymentPageRouteProviderPlugin;

    // ...

    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        $routeProviders = [
            ...
            new PaymentPageRouteProviderPlugin(),
            ...
        ];
    }

```

8. In `src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php`, add or update the following plugins:


```php
// ...

use SprykerShop\Yves\PaymentPage\Plugin\PaymentPage\PaymentForeignPaymentCollectionExtenderPlugin;

    // ...

    /**
     * @return array<\SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\PaymentCollectionExtenderPluginInterface>
     */
    protected function getPaymentCollectionExtenderPlugins(): array
    {
        return [
            new PaymentForeignPaymentCollectionExtenderPlugin(),
        ];
    }

```

9. In `src/Pyz/Zed/KernelApp/KernelAppDependencyProvider.php`, add or update the following plugins:


```php
// ...

use Spryker\Zed\OauthClient\Communication\Plugin\KernelApp\OAuthRequestExpanderPlugin;

    // ...

    /**
     * @return array<\Spryker\Shared\KernelAppExtension\RequestExpanderPluginInterface>
     */
    public function getRequestExpanderPlugins(): array
    {
        return [
            new OAuthRequestExpanderPlugin(),
        ];
    }

```

## Configure Glue application to add new API endpoints

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, add or update the following plugins:

```php
use Spryker\Glue\PaymentsRestApi\Plugin\GlueApplication\PaymentCancellationsResourceRoutePlugin;
use Spryker\Glue\PaymentsRestApi\Plugin\GlueApplication\PaymentsResourceRoutePlugin;

    // ...

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            //...
            new PaymentsResourceRoutePlugin(),
            new PaymentCancellationsResourceRoutePlugin(),
        ];
    }

```

## Headless application: Enable CORS

If your application follows a headless design, enable CORS. For instructions, see [Configure CORS](/docs/pbc/all/miscellaneous/202404.0/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html#configure-cors).


## Next step

[Connect and configure Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/connect-and-configure-stripe.html)
