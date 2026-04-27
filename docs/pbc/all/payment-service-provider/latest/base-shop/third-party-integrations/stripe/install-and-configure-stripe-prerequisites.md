---
title: Integrate Stripe
description: Learn how to install and configure the spryker-eco/stripe module in your Spryker project.
last_updated: Apr 14, 2026
template: howto-guide-template
redirect_from:
- docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/embed-the-stripe-payment-page-as-an-iframe
related:
  - title: Stripe
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/stripe.html
  - title: OMS configuration for Stripe
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/oms-configuration-for-stripe.html
  - title: Migrate from the ACP Stripe app
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/migrate-from-acp-to-stripe.html
---

This document describes how to integrate the `spryker-eco/stripe` module into your Spryker project. The module communicates directly with the Stripe API from your application and embeds Stripe Elements into the checkout payment step.

## Prerequisites

- Create a Stripe account at [stripe.com](https://stripe.com).
- Make sure [your country is supported by Stripe](https://stripe.com/global).
- Make sure [your business is not restricted by Stripe](https://stripe.com/legal/restricted-businesses).

## Step 1: Install the package

```bash
composer require spryker-eco/stripe
```

## Step 2: Remove old ACP MessageBroker plugins (if upgrading from ACP)

If you are upgrading from the ACP-based Stripe integration, remove the following plugins from `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`.

Remove these imports and their instantiations from `getMessageHandlerPlugins()`:

```php
// Remove these use statements:
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentMethodMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin;
use Spryker\Zed\PaymentApp\Communication\Plugin\MessageBroker\PaymentAppOperationsMessageHandlerPlugin;
use Spryker\Zed\SalesPaymentDetail\Communication\Plugin\MessageBroker\SalesPaymentDetailMessageHandlerPlugin;
use Spryker\Zed\MerchantApp\Communication\Plugin\MessageBroker\MerchantAppOnboardingMessageHandlerPlugin;
```

For a full migration guide, see [Migrate from the ACP Stripe app](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/migrate-from-acp-to-stripe.html).

## Step 3: Update OMS configuration

In `config/Shared/config_default.php`, configure OMS to use the Stripe state machines:

```php
use Spryker\Shared\Oms\OmsConstants;
use Spryker\Shared\Sales\SalesConstants;
use Spryker\Zed\Oms\OmsConfig;
use SprykerEco\Shared\Stripe\StripeConfig;

$config[OmsConstants::PROCESS_LOCATION] = [
    OmsConfig::DEFAULT_PROCESS_LOCATION,
    APPLICATION_ROOT_DIR . '/vendor/spryker-eco/stripe/config/Zed/oms',
];
$config[OmsConstants::ACTIVE_PROCESSES] = [
    'StripeManual01', // Use StripeManualMarketplace01 for marketplace
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    StripeConfig::PAYMENT_PROVIDER_NAME => 'StripeManual01', // Use StripeManualMarketplace01 for marketplace
];
```

## Step 4: Register Stripe OMS command and condition plugins

In `src/Pyz/Zed/Oms/OmsDependencyProvider.php`, register the Stripe command and condition plugins.

### Command plugins

```php
use SprykerEco\Zed\Stripe\Communication\Plugin\Oms\Command\StripeCancelCommandPlugin;
use SprykerEco\Zed\Stripe\Communication\Plugin\Oms\Command\StripeCaptureCommandPlugin;
use SprykerEco\Zed\Stripe\Communication\Plugin\Oms\Command\StripeRefundCommandPlugin;
```

In `extendCommandPlugins()`:

```php
$commandCollection->add(new StripeCaptureCommandPlugin(), 'Stripe/Capture');
$commandCollection->add(new StripeRefundCommandPlugin(), 'Stripe/Refund');
$commandCollection->add(new StripeCancelCommandPlugin(), 'Stripe/Cancel');
```

{% info_block infoBox "Capture behavior" %}

`StripeCaptureCommandPlugin` always captures the full authorized amount. Stripe allows only one capture per PaymentIntent. Items canceled after capture are handled via refunds.

{% endinfo_block %}

For **marketplace only**, also register the merchant payout commands:

```php
$commandCollection->add(new MerchantPayoutCommandByOrderPlugin(), 'SalesPaymentMerchant/Payout');
$commandCollection->add(new MerchantPayoutReverseCommandByOrderPlugin(), 'SalesPaymentMerchant/ReversePayout');
```

### Condition plugins

In `extendConditionPlugins()`:

```php
use Spryker\Zed\PaymentApp\Communication\Plugin\Oms\Condition\IsPaymentAppPaymentStatusAuthorizationFailedConditionPlugin;
use Spryker\Zed\PaymentApp\Communication\Plugin\Oms\Condition\IsPaymentAppPaymentStatusAuthorizedConditionPlugin;
use Spryker\Zed\PaymentApp\Communication\Plugin\Oms\Condition\IsPaymentAppPaymentStatusCanceledConditionPlugin;
use Spryker\Zed\PaymentApp\Communication\Plugin\Oms\Condition\IsPaymentAppPaymentStatusCancellationFailedConditionPlugin;
use Spryker\Zed\PaymentApp\Communication\Plugin\Oms\Condition\IsPaymentAppPaymentStatusCapturedConditionPlugin;
use Spryker\Zed\PaymentApp\Communication\Plugin\Oms\Condition\IsPaymentAppPaymentStatusCaptureFailedConditionPlugin;
use Spryker\Zed\PaymentApp\Communication\Plugin\Oms\Condition\IsPaymentAppPaymentStatusCaptureRequestedConditionPlugin;
use Spryker\Zed\PaymentApp\Communication\Plugin\Oms\Condition\IsPaymentAppPaymentStatusOverpaidConditionPlugin;
use Spryker\Zed\PaymentApp\Communication\Plugin\Oms\Condition\IsPaymentAppPaymentStatusUnderpaidConditionPlugin;
use Spryker\Zed\PaymentApp\Communication\Plugin\Oms\Condition\IsPaymentAppPaymentStatusRefundedConditionPlugin;
use Spryker\Zed\PaymentApp\Communication\Plugin\Oms\Condition\IsPaymentAppPaymentStatusRefundFailedConditionPlugin;

$conditionCollection->add(new IsPaymentAppPaymentStatusAuthorizationFailedConditionPlugin(), 'Payment/IsAuthorizationFailed');
$conditionCollection->add(new IsPaymentAppPaymentStatusAuthorizedConditionPlugin(), 'Payment/IsAuthorized');
$conditionCollection->add(new IsPaymentAppPaymentStatusCanceledConditionPlugin(), 'Payment/IsCanceled');
$conditionCollection->add(new IsPaymentAppPaymentStatusCancellationFailedConditionPlugin(), 'Payment/IsCancellationFailed');
$conditionCollection->add(new IsPaymentAppPaymentStatusCapturedConditionPlugin(), 'Payment/IsCaptured');
$conditionCollection->add(new IsPaymentAppPaymentStatusCaptureFailedConditionPlugin(), 'Payment/IsCaptureFailed');
$conditionCollection->add(new IsPaymentAppPaymentStatusCaptureRequestedConditionPlugin(), 'Payment/IsCaptureRequested');
$conditionCollection->add(new IsPaymentAppPaymentStatusOverpaidConditionPlugin(), 'Payment/IsOverpaid');
$conditionCollection->add(new IsPaymentAppPaymentStatusUnderpaidConditionPlugin(), 'Payment/IsUnderpaid');
$conditionCollection->add(new IsPaymentAppPaymentStatusRefundedConditionPlugin(), 'Payment/IsRefunded');
$conditionCollection->add(new IsPaymentAppPaymentStatusRefundFailedConditionPlugin(), 'Payment/IsRefundFailed');
```

For **marketplace only**, also register:

```php
$conditionCollection->add(new IsMerchantPaidOutConditionPlugin(), 'SalesPaymentMerchant/IsMerchantPaidOut');
$conditionCollection->add(new IsMerchantPayoutReversedConditionPlugin(), 'SalesPaymentMerchant/IsMerchantPayoutReversed');
```

## Step 5: Register the Stripe payout transmission plugin (marketplace only)

In `src/Pyz/Zed/SalesPaymentMerchant/SalesPaymentMerchantDependencyProvider.php`:

```php
use SprykerEco\Zed\Stripe\Communication\Plugin\SalesPaymentMerchant\StripePayoutTransmissionPlugin;
```

In `getMerchantPayoutTransmissionPlugins()`:

```php
return [new StripePayoutTransmissionPlugin()];
```

## Step 6: Register the Stripe checkout post-save plugin

In `src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php`:

```php
use SprykerEco\Zed\Stripe\Communication\Plugin\Checkout\StripeCheckoutPostSavePlugin;
```

In `getCheckoutPostHooks()`:

```php
new StripeCheckoutPostSavePlugin(),
```

## Step 7: Register Stripe Yves checkout plugins

In `src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php`:

```php
use SprykerEco\Shared\Stripe\StripeConfig as SharedStripeConfig;
use SprykerEco\Yves\Stripe\Plugin\StepEngine\StripeStepHandlerPlugin;
use SprykerEco\Yves\Stripe\Plugin\StepEngine\StripeSubFormPlugin;
```

In `extendPaymentMethodHandler()`:

```php
$paymentMethodHandler->add(new StripeStepHandlerPlugin(), SharedStripeConfig::PAYMENT_METHOD_NAME);
```

In `extendSubFormPluginCollection()`:

```php
$paymentSubFormPluginCollection->add(new StripeSubFormPlugin());
```

## Step 8: Register the payment method filter plugin

To filter out the Stripe payment method when it's not available (for example, when Stripe is not configured), register the filter plugin in `src/Pyz/Zed/Payment/PaymentDependencyProvider.php`:

```php
use SprykerEco\Zed\Stripe\Communication\Plugin\Payment\StripePaymentMethodFilterPlugin;
```

In `getPaymentMethodFilterPlugins()`:

```php
new StripePaymentMethodFilterPlugin(),
```

## Step 9: Register Stripe routes

In `src/Pyz/Yves/Router/RouterDependencyProvider.php`:

```php
use SprykerEco\Yves\Stripe\Plugin\Router\StripeRouteProviderPlugin;
```

In `getRouteProvider()`:

```php
new StripeRouteProviderPlugin(),
```

## Step 10: Add the Stripe payment form to the checkout payment template

In `src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig`, add the Stripe form to the `customForms` definition:

```twig
{% raw %}
{% define data = {
    customForms: {
        'Stripe/stripe': ['stripe'],
    },
} %}
{% endraw %}
```

## Step 11: Register the marketplace installer plugin (marketplace only)

In `src/Pyz/Zed/Installer/InstallerDependencyProvider.php`:

```php
use SprykerEco\Zed\Stripe\Communication\Plugin\Installer\StripeMarketplaceInstallerPlugin;
```

In `getInstallerPlugins()`:

```php
new StripeMarketplaceInstallerPlugin(),
```

## Step 12: Allow Stripe controllers in Merchant Portal security config (marketplace only)

In `src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiConfig.php`, extend the route patterns to include Stripe:

```php
<?php

namespace Pyz\Zed\SecurityMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\SecurityMerchantPortalGuiConfig as SprykerSecurityMerchantPortalGuiConfig;

class SecurityMerchantPortalGuiConfig extends SprykerSecurityMerchantPortalGuiConfig
{
    protected const MERCHANT_PORTAL_ROUTE_PATTERN = '^/((.+)-merchant-portal-gui|multi-factor-auth-merchant-portal/(merchant-user|user-management)|stripe)/';
    protected const IGNORABLE_PATH_PATTERN = '^/(security-merchant-portal-gui|multi-factor-auth-merchant-portal|stripe)';
}
```

## Step 13: Configure Stripe credentials

### Option A: Environment variable-based credentials

In `config/Shared/config_local.php`:

```php
use SprykerEco\Shared\Stripe\StripeConstants;

$config[StripeConstants::STRIPE_SECRET_KEY] = 'sk_live_***';
$config[StripeConstants::STRIPE_PUBLISHABLE_KEY] = 'pk_live_***';
$config[StripeConstants::STRIPE_WEBHOOK_SECRET] = 'whsec_***';
// Marketplace only:
$config[StripeConstants::STRIPE_WEBHOOK_SECRET_CONNECT] = 'whsec_***';
```

### Option B: Back Office configuration

This option requires the Spryker Configuration feature.

1. Create `src/Pyz/Shared/Stripe/StripeConfig.php`:

```php
<?php

namespace Pyz\Shared\Stripe;

use SprykerEco\Shared\Stripe\StripeConfig as SprykerEcoStripeConfig;

class StripeConfig extends SprykerEcoStripeConfig
{
    public function isConfigurationModuleUsed(): bool
    {
        return true;
    }
}
```

2. Run the configuration sync:

```bash
vendor/bin/console configuration:sync
```

3. Configure credentials in the Back Office under **Configuration > Integrations > Stripe**.

To enable credential validation on save, register `StripeCredentialsPreSavePlugin` in `ConfigurationDependencyProvider::getConfigurationValuePreSavePlugins()`.

## Step 14: Import payment methods

**Option 1:** Import using the module's configuration file:

```bash
vendor/bin/console data:import --config=vendor/spryker-eco/stripe/data/import/stripe.yml
```

**Option 2:** Copy CSV files and import individually:

Copy the CSV files from `vendor/spryker-eco/stripe/data/import/` to `data/import/`, then run:

```bash
vendor/bin/console data:import payment-method
vendor/bin/console data:import payment-method-store
vendor/bin/console data:import glossary
```

## Step 15: Run code generation and database migration

```bash
vendor/bin/console propel:install
vendor/bin/console transfer:generate
vendor/bin/console setup:init-db
vendor/bin/console acl-entity:synchronize
```

## Step 16: Register the Stripe webhook in the Stripe Dashboard

In your [Stripe Dashboard](https://dashboard.stripe.com/), register a webhook endpoint pointing to:

```text
https://your-domain.com/stripe/notification
```

Configure it to listen to the following events:

| Event | Meaning |
| - | - |
| `payment_intent.amount_capturable_updated` | Authorized |
| `payment_intent.succeeded` | Captured or partially captured |
| `payment_intent.payment_failed` | Capture failed |
| `payment_intent.canceled` | Canceled |
| `charge.failed` | Capture failed (post-capture) |
| `charge.refunded` | Refunded or partially refunded |
| `charge.refund.updated` | Refund failed |

For **marketplace only**, register a second **Connect endpoint** pointing to the same URL and enable **Listen to events on connected accounts**. Configure it to listen to:

| Event |
| - |
| `account.updated` |
| `account.application.authorized` |
| `capability.updated` |
| `person.created` |
| `person.updated` |
| `account.external_account.created` |

{% info_block infoBox "Webhook secret fallback" %}

The webhook handler tries the standard secret first, then falls back to the Connect secret. Each processed webhook event stores raw Stripe details as JSON in `spy_payment_app_payment_status_history.context`.

{% endinfo_block %}

## Step 17: Register your domain in the Stripe Dashboard

Google Pay and Apple Pay require domain registration. In your Stripe Dashboard, go to **Settings > Payments > Payment method domains** and add your domain.

## Step 18: Verify the installation

1. Place a test order and confirm the payment step renders Stripe Elements.
2. Complete payment and confirm the order transitions to the authorized state.
3. Capture the order and verify the `Stripe/Capture` OMS command triggers (full amount captured).
4. Send a test webhook and confirm order status updates.
5. (Marketplace only) Log in to Merchant Portal and verify Payment Settings.
6. (Marketplace only) Complete merchant onboarding to Stripe Connect.
7. (Marketplace only) Trigger a payout and verify the Stripe Connect transfer appears.

## Migrating from the ACP Stripe app

If you are migrating from the previous ACP-based Stripe integration, see [Migrate from the ACP Stripe app](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/migrate-from-acp-to-stripe.html).
