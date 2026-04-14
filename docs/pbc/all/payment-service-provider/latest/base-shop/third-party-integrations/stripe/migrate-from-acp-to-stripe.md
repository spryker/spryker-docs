---
title: Migrate from the ACP Stripe app
description: Learn how to migrate from the ACP-based Stripe app to the direct spryker-eco/stripe module.
last_updated: Apr 14, 2026
template: howto-guide-template
related:
  - title: Integrate Stripe
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html
  - title: Stripe
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/stripe.html
---

This document describes how to migrate from the MessageBroker-based ACP Stripe integration to the direct `spryker-eco/stripe` module.

{% info_block infoBox "Info" %}

The core payment flow remains the same. Stripe Elements is still embedded in the checkout, and the same payment methods are supported. The ECO module communicates directly with the Stripe API from your application instead of going through the App Composition Platform MessageBroker.

{% endinfo_block %}

## 1. Install and integrate the module

Follow the [Integrate Stripe](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html) guide to install and set up the module.

## 2. Remove old ACP plugins and configuration

### 2a. Remove ACP MessageBroker handler plugins

In `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`, remove the following imports and their instantiations from `getMessageHandlerPlugins()`:

```php
// Remove these use statements:
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentMethodMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin;
use Spryker\Zed\PaymentApp\Communication\Plugin\MessageBroker\PaymentAppOperationsMessageHandlerPlugin;
use Spryker\Zed\SalesPaymentDetail\Communication\Plugin\MessageBroker\SalesPaymentDetailMessageHandlerPlugin;
use Spryker\Zed\MerchantApp\Communication\Plugin\MessageBroker\MerchantAppOnboardingMessageHandlerPlugin;

// Remove from getMessageHandlerPlugins():
new PaymentMethodMessageHandlerPlugin(),
new PaymentOperationsMessageHandlerPlugin(),
new PaymentAppOperationsMessageHandlerPlugin(),
new SalesPaymentDetailMessageHandlerPlugin(),
new MerchantAppOnboardingMessageHandlerPlugin(), // marketplace only
```

{% info_block infoBox "Info" %}

If Stripe was the only ACP app using the MessageBroker, you can also disable the `message-broker-consume-channels` cronjob in `config/Zed/cronjobs/jenkins.php` and set `MessageBrokerConstants::IS_ENABLED` to `false` in `config/Shared/config_default.php` to stop unnecessary background processing.

{% endinfo_block %}

### 2b. Remove ACP OMS command plugins

In `src/Pyz/Zed/Oms/OmsDependencyProvider.php`, replace the ACP message-based command plugins with the direct Stripe command plugins.

Remove:

```php
// Remove these use statements:
use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendCapturePaymentMessageCommandPlugin;
use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendRefundPaymentMessageCommandPlugin;
use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendCancelPaymentMessageCommandPlugin;

// Remove from extendCommandPlugins():
$commandCollection->add(new SendCapturePaymentMessageCommandPlugin(), 'Payment/Capture');
$commandCollection->add(new SendRefundPaymentMessageCommandPlugin(), 'Payment/Refund');
$commandCollection->add(new SendCancelPaymentMessageCommandPlugin(), 'Payment/Cancel');
```

Add the direct Stripe command plugins as described in [Step 4 of the integration guide](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html#step-4-register-stripe-oms-command-and-condition-plugins).

### 2c. Remove ACP checkout plugins

In `src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php`, remove the ACP-specific checkout plugins:

```php
// Remove these use statements:
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentAuthorizationCheckoutPostSavePlugin;
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin;

// Remove from getCheckoutPostHooks():
new PaymentAuthorizationCheckoutPostSavePlugin(),
new PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin(),
```

Replace with the new Stripe plugin as described in [Step 6 of the integration guide](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html#step-6-register-the-stripe-checkout-post-save-plugin).

### 2d. Remove ACP Yves plugins

In `src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php`, remove the ACP payment collection extender plugin:

```php
// Remove this use statement:
use SprykerShop\Yves\PaymentPage\Plugin\PaymentPage\PaymentForeignPaymentCollectionExtenderPlugin;

// Remove from getPaymentCollectionExtenderPlugins():
new PaymentForeignPaymentCollectionExtenderPlugin(),
```

In `src/Pyz/Yves/Router/RouterDependencyProvider.php`, remove the ACP payment page route provider:

```php
// Remove this use statement:
use SprykerShop\Yves\PaymentPage\Plugin\Router\PaymentPageRouteProviderPlugin;

// Remove from getRouteProvider():
new PaymentPageRouteProviderPlugin(),
```

Replace both with the new Stripe plugins as described in [Steps 7 and 9 of the integration guide](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html).

### 2e. Remove KernelApp OAuth plugin

In `src/Pyz/Zed/KernelApp/KernelAppDependencyProvider.php`, remove the ACP OAuth expander plugin:

```php
// Remove this use statement:
use Spryker\Zed\OauthClient\Communication\Plugin\KernelApp\OAuthRequestExpanderPlugin;

// Remove from getRequestExpanderPlugins():
new OAuthRequestExpanderPlugin(),
```

### 2f. Update OMS state machine XML

In your OMS process XML files, replace the ACP payment command names with the Stripe command names:

```xml
<!-- Before: -->
<event name="capture payment" onEnter="true" command="Payment/Capture"/>
<event name="refund payment" onEnter="true" command="Payment/Refund"/>
<event name="cancel payment" onEnter="true" command="Payment/Cancel"/>

<!-- After: -->
<event name="capture payment" onEnter="true" command="Stripe/Capture"/>
<event name="refund payment" onEnter="true" command="Stripe/Refund"/>
<event name="cancel payment" onEnter="true" command="Stripe/Cancel"/>
```

Also update the `<process name=` reference if you were extending `ForeignPaymentStateMachine01` or `ForeignPaymentB2CStateMachine01`:

```xml
<!-- Before: -->
<process name="YourProjectProcess" main="true">
    <subprocesses>
        <process>ForeignPaymentStateMachine01</process>
    </subprocesses>
</process>

<!-- After: use StripeManual01 as the base or reference directly -->
<process name="YourProjectProcess" main="true">
    <subprocesses>
        <process>StripeManual01</process>
    </subprocesses>
</process>
```

### 2g. Clean up config_default.php

Remove ACP-specific configuration from `config/Shared/config_default.php`:

```php
// Remove these use statements:
use Generated\Shared\Transfer\AddPaymentMethodTransfer;
use Generated\Shared\Transfer\DeletePaymentMethodTransfer;
use Generated\Shared\Transfer\CancelPaymentTransfer;
use Generated\Shared\Transfer\CapturePaymentTransfer;
use Generated\Shared\Transfer\RefundPaymentTransfer;
use Generated\Shared\Transfer\PaymentAuthorizedTransfer;
use Generated\Shared\Transfer\PaymentAuthorizationFailedTransfer;
use Generated\Shared\Transfer\PaymentCapturedTransfer;
use Generated\Shared\Transfer\PaymentCaptureFailedTransfer;
use Spryker\Shared\KernelApp\KernelAppConstants;
use Spryker\Shared\MessageBroker\MessageBrokerConstants;
use Spryker\Shared\OauthClient\OauthClientConstants;
use Spryker\Shared\Payment\PaymentConstants;
use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsConfig;
use Spryker\Zed\Payment\PaymentConfig;

// Remove these configuration entries:
// $config[PaymentConstants::TENANT_IDENTIFIER] = ...
// $config[KernelAppConstants::TENANT_IDENTIFIER] = ...
// $config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_ACP] = ...
// $config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_ACP] = ...
// $config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_ACP] = ...

// Remove the ForeignPayment OMS entries:
// APPLICATION_ROOT_DIR . '/vendor/spryker/sales-payment/config/Zed/Oms',
// 'ForeignPaymentB2CStateMachine01' or 'ForeignPaymentStateMachine01'
// PaymentConfig::PAYMENT_FOREIGN_PROVIDER => 'ForeignPaymentB2CStateMachine01'

// Remove all MessageBroker channel mappings for payment:
// $config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] entries for payment-method-commands, payment-commands, payment-events
// $config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] entries for payment-method-commands, payment-events
// $config[MessageBrokerConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] entry for payment-commands
```

## 3. Add new Stripe configuration

Add the OMS and credentials configuration as described in [Steps 3 and 13 of the integration guide](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html).

## 4. Run code generation

```bash
vendor/bin/console propel:install
vendor/bin/console transfer:generate
vendor/bin/console setup:init-db
vendor/bin/console acl-entity:synchronize
```

## 5. Verify the migration

1. Clear caches: `vendor/bin/console cache:empty-all`.
2. Place a test order and confirm the payment step renders Stripe Elements.
3. Complete payment and confirm the order transitions to the authorized state.
4. Capture the order and verify the `Stripe/Capture` OMS command triggers.
5. Process a refund and verify the `Stripe/Refund` OMS command triggers.
6. Send a test webhook from the Stripe Dashboard and confirm order status updates.

## Summary of changes

| Component | ACP (before) | ECO (after) |
|-----------|-------------|-------------|
| OMS capture command | `SendCapturePaymentMessageCommandPlugin` (`Payment/Capture`) | `StripeCaptureCommandPlugin` (`Stripe/Capture`) |
| OMS refund command | `SendRefundPaymentMessageCommandPlugin` (`Payment/Refund`) | `StripeRefundCommandPlugin` (`Stripe/Refund`) |
| OMS cancel command | `SendCancelPaymentMessageCommandPlugin` (`Payment/Cancel`) | `StripeCancelCommandPlugin` (`Stripe/Cancel`) |
| Checkout post-save | `PaymentAuthorizationCheckoutPostSavePlugin` + `PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin` | `StripeCheckoutPostSavePlugin` |
| Yves payment form | `PaymentForeignPaymentCollectionExtenderPlugin` | `StripeSubFormPlugin` + `StripeStepHandlerPlugin` |
| Yves route | `PaymentPageRouteProviderPlugin` | `StripeRouteProviderPlugin` |
| MessageBroker handlers | `PaymentOperationsMessageHandlerPlugin`, `PaymentMethodMessageHandlerPlugin`, etc. | Removed (not needed) |
| OMS state machine | `ForeignPaymentStateMachine01` / `ForeignPaymentB2CStateMachine01` | `StripeManual01` / `StripeManualMarketplace01` |
| Configuration | `KernelAppConstants`, `OauthClientConstants`, `MessageBrokerConstants` channel mappings | `StripeConstants` with direct API keys |
| Communication | Via MessageBroker (async) | Direct Stripe API calls (sync) |
