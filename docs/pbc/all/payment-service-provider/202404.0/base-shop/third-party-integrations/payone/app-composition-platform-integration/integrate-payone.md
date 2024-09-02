---
title: Integrate Payone
description: Learn how you can integrate the Payone app into your Spryker shop
template: howto-guide-template
last_updated: Jan 09, 2024
redirect_from:
  - /docs/pbc/all/payment-service-providers/payone/integrate-payone.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payone/integration-in-the-back-office/integrate-payone.html
  - /docs/pbc/all/payment-service-provider/202404.0/base-shop/third-party-integrations/payone/integration-in-the-back-office/integrate-payone.html
---

This document describes how to integrate Payone using the Payone app.

## Prerequisites

- Fulfill [App Composition Platform prerequisites](/docs/dg/dev/acp/sccos-dependencies-required-for-the-acp.html).
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
    PaymentCreatedTransfer::class => 'payment-events',
    PaymentUpdatedTransfer::class => 'payment-events',
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
