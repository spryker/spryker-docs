---
title: Integrate Payone
description: Learn how you can integrate the Payone app into your Spryker shop using Spryker App Composition Platform.
template: howto-guide-template
last_updated: Nov 1, 2024
redirect_from:
  - /docs/pbc/all/payment-service-providers/payone/integrate-payone.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payone/integration-in-the-back-office/integrate-payone.html
  - /docs/pbc/all/payment-service-provider/202404.0/base-shop/third-party-integrations/payone/integration-in-the-back-office/integrate-payone.html
---

This document describes how to integrate Payone using the Payone app.

## Prerequisites

- Fulfill [App Composition Platform prerequisites](/docs/dg/dev/acp/install-prerequisites-and-enable-acp.html).
- Install the modules for Payone. To check the list of required modules and their versions, in the Back Office, go to **Apps**>**Payone**. The list of modules is displayed in **Requirements** > **Spryker module list** section.


## Integrate Payone

{% info_block infoBox "" %}

Your project codebase can already have some of the changes described in this guide. Adjust the code according to your codebase.

{% endinfo_block %}

To integrate Payone, follow the steps:

1. Configure shared configs:

<details>
  <summary>config/Shared/config_default.php</summary>

```php
use Spryker\Shared\MessageBroker\MessageBrokerConstants;
use Spryker\Shared\OauthClient\OauthClientConstants;
use Spryker\Shared\Oms\OmsConstants;
use Spryker\Shared\Payment\PaymentConstants;
use Spryker\Shared\Sales\SalesConstants;
use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsConfig;
use Spryker\Zed\Payment\PaymentConfig;

//...
$trustedHosts
    = $config[HttpConstants::ZED_TRUSTED_HOSTS]
    = $config[HttpConstants::YVES_TRUSTED_HOSTS]
    = array_filter(explode(',', getenv('SPRYKER_TRUSTED_HOSTS') ?: ''));

$config[KernelConstants::DOMAIN_WHITELIST] = array_merge($trustedHosts, [
    $sprykerBackendHost,
    $sprykerFrontendHost,
    //...
    'threedssvc.pay1.de', // trusted Payone domain
    'www.sofort.com', // trusted Payone domain

]);
$config[PaymentConstants::TENANT_IDENTIFIER]
    = $config[KernelAppConstants::TENANT_IDENTIFIER]
    = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';

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
    PaymentCreatedTransfer::class => 'payment-events',
    PaymentUpdatedTransfer::class => 'payment-events',
    AppConfigUpdatedTransfer::class => 'app-events',
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...
    'payment-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    'payment-method-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

$config[MessageBrokerConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    //...
    'payment-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

// ----------------------------------------------------------------------------
// ------------------------------ OAUTH ---------------------------------------
// ----------------------------------------------------------------------------
//...
$config[AppCatalogGuiConstants::OAUTH_PROVIDER_NAME]
    = $config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_ACP]
    = $config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_MESSAGE_BROKER]
    = $config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_PAYMENT_AUTHORIZE]
    = OauthAuth0Config::PROVIDER_NAME;
$config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_PAYMENT_AUTHORIZE] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_ACP]
    = $config[TaxAppConstants::OAUTH_OPTION_AUDIENCE]
    = $config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_PAYMENT_AUTHORIZE] = 'aop-app';
```

</details>

2. Configure dependencies in `MessageBroker`:

<details>
  <summary>src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php</summary>

```php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentMethodMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin;
use Spryker\Zed\SalesPaymentDetail\Communication\Plugin\MessageBroker\PaymentCreatedMessageHandlerPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\CorrelationIdMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TenantActorMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TimestampMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TransactionIdMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\ValidationMiddlewarePlugin;
use Spryker\Zed\OauthClient\Communication\Plugin\MessageBroker\AccessTokenMessageAttributeProviderPlugin;
use Spryker\Zed\Session\Communication\Plugin\MessageBroker\SessionTrackingIdMessageAttributeProviderPlugin;
use Spryker\Zed\Store\Communication\Plugin\MessageBroker\CurrentStoreReferenceMessageAttributeProviderPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
     */
    public function getMessageHandlerPlugins(): array
    {
        return [
            //...
            new PaymentOperationsMessageHandlerPlugin();
            new PaymentMethodMessageHandlerPlugin(),
            new PaymentCreatedMessageHandlerPlugin(), // [Optional] This plugin is handling the `PaymentCreated`/`PaymentUpdated` messages sent from Payone ACP app.
        ];
    }

    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageAttributeProviderPluginInterface>
     */
    public function getMessageAttributeProviderPlugins(): array
    {
        return [
            new CorrelationIdMessageAttributeProviderPlugin(),
            new TimestampMessageAttributeProviderPlugin(),
            new AccessTokenMessageAttributeProviderPlugin(),
            new TransactionIdMessageAttributeProviderPlugin(),
            new SessionTrackingIdMessageAttributeProviderPlugin(),
            new TenantActorMessageAttributeProviderPlugin(),
            new CurrentStoreReferenceMessageAttributeProviderPlugin(),
        ];
    }


    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MiddlewarePluginInterface>
     */
    public function getMiddlewarePlugins(): array
    {
        return [
            new ValidationMiddlewarePlugin(),
        ];
    }
}
```

</details>

3. Configure channels in the `MessageBroker` configuration:

**src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php**
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

4. Configure the `Payment` module:

**src/Pyz/Zed/Payment/PaymentConfig.php**
```php
namespace Pyz\Zed\Payment;

use Generated\Shared\Transfer\ExpenseTransfer;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\TaxTotalTransfer;
use Generated\Shared\Transfer\TotalsTransfer;
use Spryker\Zed\Payment\PaymentConfig as SprykerPaymentConfig;

class PaymentConfig extends SprykerPaymentConfig
{
    public function getQuoteFieldsForForeignPayment(): array
    {
        return array_merge_recursive(parent::getQuoteFieldsForForeignPayment(), [
            QuoteTransfer::TOTALS => [
                TotalsTransfer::DISCOUNT_TOTAL => 'discountTotal',
                TotalsTransfer::TAX_TOTAL => [
                    TaxTotalTransfer::AMOUNT => 'taxTotal',
                ],
            ],
            QuoteTransfer::ITEMS => [
                ItemTransfer::TAX_RATE => 'taxRate',
            ],
            QuoteTransfer::EXPENSES => [
                ExpenseTransfer::TAX_RATE => 'taxRate',
            ],
        ]);
    }
}
```

5. Configure plugins in `Checkout`:

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**
```php
namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentAuthorizationCheckoutPostSavePlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
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
        ];
    }
}
```

6. Configure plugins in `CheckoutPage`:

**src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php**
```php
namespace Pyz\Yves\CheckoutPage;

use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
use SprykerShop\Yves\PaymentPage\Plugin\PaymentPage\PaymentForeignPaymentCollectionExtenderPlugin;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\PaymentCollectionExtenderPluginInterface>
     */
    protected function getPaymentCollectionExtenderPlugins(): array
    {
        return [
            //...
            new PaymentForeignPaymentCollectionExtenderPlugin(),
        ];
    }
}
```

7. Configure plugins in `Router`:

**src/Pyz/Yves/Router/RouterDependencyProvider.php**
```php
namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\PaymentPage\Plugin\Router\PaymentPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        $routeProviders = [
            //...
            new PaymentPageRouteProviderPlugin(),
        ];
    }
}
```

8. Configure plugins in `Oms`:

**\Pyz\Zed\Oms\OmsDependencyProvider**
```php
use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendCancelPaymentMessageCommandPlugin;
use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendCapturePaymentMessageCommandPlugin;
use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendRefundPaymentMessageCommandPlugin;
use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\RefundCommandPlugin;


protected function extendCommandPlugins(Container $container): Container
{
    $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
        //...
        // ----- Payone commands -----
        $commandCollection->add(new SendCapturePaymentMessageCommandPlugin(), 'Payment/Capture');
        $commandCollection->add(new SendRefundPaymentMessageCommandPlugin(), 'Payment/Refund');
        $commandCollection->add(new RefundCommandPlugin(), 'Payment/Refund/Confirm');
        $commandCollection->add(new SendCancelPaymentMessageCommandPlugin(), 'Payment/Cancel');
    });
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

10. [Integrate Payone into OMS](/docs/dg/dev/acp/integrate-acp-payment-apps-with-spryker-oms-configuration.html#configuring-oms-for-your-project).

### Introduce template changes in `CheckoutPage`

If you rewrote `@CheckoutPage/views/payment/payment.twig` on the project level, do the following:

1. Make sure that the form molecule uses the following code for the payment selection choices:

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

2. Payment provider names now have glossary keys instead of a name itself. To accommodate this change, configure names to be translated according to your glossary:

```twig
{% raw %}
{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    <h5>{{ name | trans }}</h5>
{% endfor %}
{% endraw %}
```

3. Optional: Add the glossary keys for all the new external payment providers and methods to your glossary data import file. Example:

```csv
...
Payone,Payone Payments,en_US
Credit Card,Credit Card (Payone),en_US
```

4. Import the glossary:

```bash
console data:import glossary
```

## Optional: Show payment details in the Back Office Order Details page


1. Install the `spryker/sales-payment-detail: ^1.2.0` module.
2. [Retrieve and use payment details from third-party PSPs](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/retrieve-and-use-payment-details-from-third-party-psps.html).


## Next steps

[Configure the Payone app](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/configure-payone.html) for your store.
