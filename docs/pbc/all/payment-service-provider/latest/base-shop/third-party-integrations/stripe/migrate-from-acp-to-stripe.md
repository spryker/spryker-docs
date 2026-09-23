---
title: Migrate from the ACP Stripe app
description: Learn how to migrate from the ACP-based Stripe app to the direct spryker-eco/stripe module.
last_updated: Sep 21, 2026
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

In `src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php`, remove the ACP-specific checkout plugins from **both** `getCheckoutPostHooks()` and `getCheckoutPostHooksForOrderAmendment()` — both methods typically register the same ACP plugins:

```php
// Remove these use statements:
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentAuthorizationCheckoutPostSavePlugin;
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin;

// Remove from getCheckoutPostHooks() and getCheckoutPostHooksForOrderAmendment():
new PaymentAuthorizationCheckoutPostSavePlugin(),
new PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin(),
```

Replace with the new Stripe plugin in `getCheckoutPostHooks()` as described in [Step 6 of the integration guide](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html#step-6-register-the-stripe-checkout-post-save-plugin). `spryker-eco/stripe` doesn't ship a post-save plugin for order amendment, so leave `getCheckoutPostHooksForOrderAmendment()` without a Stripe plugin unless your project has its own order-amendment payment logic.

### 2d. Remove ACP Yves plugins

{% info_block warningBox "Keep PaymentPageRouteProviderPlugin registered" %}

Don't remove `PaymentPageRouteProviderPlugin` from `RouterDependencyProvider`. `SprykerEco\Yves\Stripe\Controller\PaymentController::paymentAction()` redirects to the `payment-success` and `payment-cancel` routes, which are only provided by `PaymentPageRouteProviderPlugin` (`SprykerShop\Yves\PaymentPage\Plugin\Router\PaymentPageRouteProviderPlugin`). `StripeRouteProviderPlugin` only adds the `stripe-notification` and `stripe-payment` routes, not `payment-success`/`payment-cancel`. Removing `PaymentPageRouteProviderPlugin` causes `Symfony\Component\Routing\Exception\RouteNotFoundException: Route 'payment-cancel' not found` when the Stripe payment page is rendered.

{% endinfo_block %}

`PaymentForeignHandlerPlugin` (in `CheckoutPageDependencyProvider::extendPaymentMethodHandler()`) and `PaymentForeignPaymentCollectionExtenderPlugin` (in `getPaymentCollectionExtenderPlugins()`) aren't ACP- or Stripe-specific. They're generic handlers for any foreign/App-based payment method (any payment method with a `paymentAuthorizationEndpoint`). Only remove them if the old ACP Stripe app was the only foreign payment method your project used. If your project has other App-based payment methods, keep both plugins registered:

```php
// Only remove if Stripe was the only foreign/App-based payment method:
use SprykerShop\Yves\CheckoutPage\Plugin\StepEngine\PaymentForeignHandlerPlugin;
use SprykerShop\Yves\PaymentPage\Plugin\PaymentPage\PaymentForeignPaymentCollectionExtenderPlugin;

// Only remove from extendPaymentMethodHandler() if Stripe was the only foreign payment method:
$paymentMethodHandler->add(new PaymentForeignHandlerPlugin(), PaymentTransfer::FOREIGN_PAYMENTS);

// Only remove from getPaymentCollectionExtenderPlugins() if Stripe was the only foreign payment method:
new PaymentForeignPaymentCollectionExtenderPlugin(),
```

Register the new Stripe plugins as described in [Steps 7 and 9 of the integration guide](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html).

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

{% info_block warningBox "Check for other App Composition Platform apps first" %}

`KernelAppConstants::TENANT_IDENTIFIER`, `OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_ACP`, `OauthClientConstants::OAUTH_GRANT_TYPE_FOR_ACP`, `OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_ACP`, and the `MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP` / `CHANNEL_TO_RECEIVER_TRANSPORT_MAP` / `CHANNEL_TO_SENDER_TRANSPORT_MAP` entries are shared App Composition Platform (ACP) infrastructure, not code specific to the old ACP Stripe app. If your project uses any other ACP app (for example asset synchronization, product reviews, or merchant app onboarding), these values and the MessageBroker connection they configure are still required. Only remove the Stripe **payment**-related rows described below, and only remove the shared ACP configuration entirely if Stripe was the only ACP app your project used.

{% endinfo_block %}

Remove the Stripe-payment-specific configuration from `config/Shared/config_default.php`:

```php
// Remove these use statements (if nothing else in the file uses them):
use Generated\Shared\Transfer\AddPaymentMethodTransfer;
use Generated\Shared\Transfer\DeletePaymentMethodTransfer;
use Generated\Shared\Transfer\CancelPaymentTransfer;
use Generated\Shared\Transfer\CapturePaymentTransfer;
use Generated\Shared\Transfer\RefundPaymentTransfer;
use Generated\Shared\Transfer\PaymentAuthorizedTransfer;
use Generated\Shared\Transfer\PaymentAuthorizationFailedTransfer;
use Generated\Shared\Transfer\PaymentCapturedTransfer;
use Generated\Shared\Transfer\PaymentCaptureFailedTransfer;
use Spryker\Shared\Payment\PaymentConstants;
use Spryker\Zed\Payment\PaymentConfig;

// Remove this configuration entry only if no other ACP app in your project relies on it:
// $config[PaymentConstants::TENANT_IDENTIFIER] = ...

// Remove the ForeignPayment OMS entries:
// APPLICATION_ROOT_DIR . '/vendor/spryker/sales-payment/config/Zed/Oms',
// 'ForeignPaymentB2CStateMachine01' or 'ForeignPaymentStateMachine01'
// PaymentConfig::PAYMENT_FOREIGN_PROVIDER => 'ForeignPaymentB2CStateMachine01'

// Remove only the payment-related rows from the shared MessageBroker maps, keep all other rows:
// $config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] entries for
//   AddPaymentMethodTransfer, UpdatePaymentMethodTransfer, DeletePaymentMethodTransfer (payment-method-commands),
//   CancelPaymentTransfer, CapturePaymentTransfer, RefundPaymentTransfer (payment-commands), and
//   PaymentAuthorizedTransfer, PaymentAuthorizationFailedTransfer, PaymentCapturedTransfer, PaymentCaptureFailedTransfer,
//   PaymentRefundedTransfer, PaymentRefundFailedTransfer, PaymentCanceledTransfer, PaymentCancellationFailedTransfer,
//   PaymentCreatedTransfer, PaymentUpdatedTransfer (payment-events)
// $config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] entries for payment-method-commands, payment-events
//   (only if no other channel still maps to them)
// $config[MessageBrokerConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] entry for payment-commands
//   (only if no other channel still maps to it)
```

If the old ACP Stripe app was the only ACP app your project used, you can also remove the now-unused shared configuration and its use statements:

```php
// Remove only if Stripe was the only ACP app your project used:
use Spryker\Shared\KernelApp\KernelAppConstants;
use Spryker\Shared\OauthClient\OauthClientConstants;

// $config[KernelAppConstants::TENANT_IDENTIFIER] = ...
// $config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_ACP] = ...
// $config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_ACP] = ...
// $config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_ACP] = ...
```

If your project added a Stripe-specific entry to `$config[Spryker\Shared\Kernel\KernelConstants::DOMAIN_WHITELIST]` (for example `connect.stripe.com`) for the old ACP-based integration, you can remove it for a **base shop**: the direct `spryker-eco/stripe` storefront flow doesn't redirect the customer's browser to a Stripe-owned domain. For a **marketplace** project, keep `connect.stripe.com` whitelisted if you use Merchant Portal's Stripe Connect onboarding or Express Dashboard access — those flows do redirect the merchant's browser to `connect.stripe.com`. See [Network access for Stripe.js and the Stripe API](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html#network-access-for-stripejs-and-the-stripe-api) in the integration guide.

## 3. Add new Stripe configuration

Add the OMS and credentials configuration as described in [Steps 3 and 13 of the integration guide](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html).

## 4. Run code generation

```bash
vendor/bin/console propel:install
vendor/bin/console transfer:generate
```

`setup:init-db` and `acl-entity:synchronize` are only needed in the same cases described in [Step 15 of the integration guide](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html#step-15-run-code-generation-and-database-migration): `setup:init-db` only on initial database setup, and `acl-entity:synchronize` only on projects that have `spryker/acl-merchant-portal` installed.

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
| Yves payment form | — | `StripeSubFormPlugin` + `StripeStepHandlerPlugin` (added; `PaymentForeignPaymentCollectionExtenderPlugin` and `PaymentForeignHandlerPlugin` stay if used by other foreign payment methods) |
| Yves route | — | `StripeRouteProviderPlugin` (added; `PaymentPageRouteProviderPlugin` stays registered, it still provides `payment-success`/`payment-cancel`) |
| MessageBroker handlers | `PaymentOperationsMessageHandlerPlugin`, `PaymentMethodMessageHandlerPlugin`, etc. | Removed (not needed) |
| OMS state machine | `ForeignPaymentStateMachine01` / `ForeignPaymentB2CStateMachine01` | `StripeManual01` / `StripeManualMarketplace01` |
| Configuration | Payment rows in `MessageBrokerConstants` channel mappings; `KernelAppConstants`/`OauthClientConstants` ACP settings if Stripe was the only ACP app | `StripeConstants` with direct API keys |
| Communication | Via MessageBroker (async) | Direct Stripe API calls (sync) |
