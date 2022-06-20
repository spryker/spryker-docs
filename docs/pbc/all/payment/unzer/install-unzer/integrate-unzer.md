---
title: Integrate Unzer
description: Integrate Unzer into the Spryker Commerce OS.
last_updated: Jun 17, 2022
template: feature-integration-guide-template
related:
- title: Install and configure Unzer
  link: docs/pbc/all/payment/unzer/install-unzer/install-and-configure-unzer.html
---

This document shows how to integrate Unzer into your project.

## Prerequisites

Before integrating Unzer into your project, make sure you have [installed and configured Unzer](/docs/pbc/all/payment/unzer/install-unzer/install-and-configure-unzer.html).

To integrate Unzer, follow the steps below.

## OMS

{% info_block infoBox "Exemplary content" %}

The following state machines provided are examples of the payment service provider flow.

{% endinfo_block %}

Create the OMS:

1. Add the Unzer OMS processes to the project on the project level or provide your own:

```php
$config[OmsConstants::PROCESS_LOCATION] = [
    ...
    APPLICATION_ROOT_DIR . '/vendor/spryker-eco/unzer/config/Zed/Oms',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
    ...
    'UnzerMarketplaceBankTransfer01',
    'UnzerMarketplaceSofort01',
    'UnzerMarketplaceCreditCard01',
    'UnzerCreditCard01',
    'UnzerBankTransfer01',
    'UnzerSofort01',
];

$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    ...
    UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_BANK_TRANSFER => 'UnzerMarketplaceBankTransfer01',
    UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_CREDIT_CARD => 'UnzerMarketplaceCreditCard01',
    UnzerConfig::PAYMENT_METHOD_KEY_CREDIT_CARD => 'UnzerCreditCard01',
    UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_SOFORT => 'UnzerMarketplaceSofort01',
    UnzerConfig::PAYMENT_METHOD_KEY_BANK_TRANSFER => 'UnzerBankTransfer01',
    UnzerConfig::PAYMENT_METHOD_KEY_SOFORT => 'UnzerSofort01',
];
```
2. Add the Unzer Zed navigation part:

**config/Zed/navigation.xml**

```xml
<config>
    ...
    <unzer-gui>
        <label>Unzer</label>
        <title>Unzer</title>
        <icon>offers</icon>
        <bundle>unzer-gui</bundle>
        <controller>list-unzer-credentials</controller>
        <action>index</action>
    </unzer-gui>
</config>
```


3. Add the Unzer plugin for `CartDepenencyProvider`:

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cart;

...
use SprykerEco\Zed\Unzer\Communication\Plugin\Cart\UnzerCredentialsCartOperationPostSavePlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    ...
     /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationPostSavePluginInterface>
     */
    protected function getPostSavePlugins(Container $container): array
    {
        return [
            ...
            new UnzerCredentialsCartOperationPostSavePlugin(),
        ];
    }
    ...
}
```

4. Add checkout Unzer plugins for integrating into the checkout flow:

<details>
<summary markdown='span'>src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Zed\Checkout;

...
use SprykerEco\Zed\Unzer\Communication\Plugin\Checkout\UnzerCheckoutDoSaveOrderPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Checkout\UnzerCheckoutPostSavePlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Checkout\UnzerCheckoutPreSaveOrderPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    ...
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface>|array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDoSaveOrderInterface>
     */
    protected function getCheckoutOrderSavers(Container $container): array
    {
        return [
            ...
            new UnzerCheckoutDoSaveOrderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPostSaveInterface>
     */
    protected function getCheckoutPostHooks(Container $container): array
    {
        return [
            ...
            new UnzerCheckoutPostSavePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveHookInterface>|array<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreSaveInterface>|array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreSavePluginInterface>
     */
    protected function getCheckoutPreSaveHooks(Container $container): array
    {
        return [
            ...
            new UnzerCheckoutPreSaveOrderPlugin(),
        ];
    }

    ...
}
```
</details>

5. In `OmsDependencyProvider`, add the OMS command and condition plugins:

<details>
<summary markdown='span'>src/Pyz/Zed/Oms/OmsDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms;

...
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Command\UnzerChargeCommandByOrderPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Command\UnzerRefundCommandByOrderPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsAuthorizeCanceledConditionPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsAuthorizeFailedConditionPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsAuthorizePendingConditionPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsAuthorizeSucceededConditionPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsChargeFailedConditionPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsPaymentChargebackConditionPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Oms\Condition\UnzerIsPaymentCompletedConditionPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    ...
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            ...
            // ----- Unzer
            $commandCollection->add(new UnzerChargeCommandByOrderPlugin(), 'Unzer/Charge');
            $commandCollection->add(new UnzerRefundCommandByOrderPlugin(), 'Unzer/Refund');
            ...

            return $commandCollection;
        });
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendConditionPlugins(Container $container): Container
    {
        $container->extend(self::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
            ...
            // ----- Unzer
            $conditionCollection->add(new UnzerIsAuthorizePendingConditionPlugin(), 'Unzer/IsAuthorizePending');
            $conditionCollection->add(new UnzerIsAuthorizeSucceededConditionPlugin(), 'Unzer/IsAuthorizeSucceeded');
            $conditionCollection->add(new UnzerIsAuthorizeFailedConditionPlugin(), 'Unzer/IsAuthorizeFailed');
            $conditionCollection->add(new UnzerIsAuthorizeCanceledConditionPlugin(), 'Unzer/IsAuthorizeCanceled');
            $conditionCollection->add(new UnzerIsPaymentCompletedConditionPlugin(), 'Unzer/IsPaymentCompleted');
            $conditionCollection->add(new UnzerIsChargeFailedConditionPlugin(), 'Unzer/IsChargeFailed');
            $conditionCollection->add(new UnzerIsPaymentChargebackConditionPlugin(), 'Unzer/IsPaymentChargeback');

            return $conditionCollection;
        });
    }
}
```
</details>

6. Add Unzer payment filter plugins:

<details>
<summary markdown='span'>src/Pyz/Zed/Payment/PaymentDependencyProvider.php</summary>

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Zed\Payment;

...
use SprykerEco\Zed\Unzer\Communication\Plugin\Payment\UnzerEnabledPaymentMethodFilterPlugin;
use SprykerEco\Zed\Unzer\Communication\Plugin\Payment\UnzerMarketplacePaymentMethodFilterPlugin;

class PaymentDependencyProvider extends SprykerPaymentDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PaymentExtension\Dependency\Plugin\PaymentMethodFilterPluginInterface>
     */
    protected function getPaymentMethodFilterPlugins(): array
    {
        return [
            ...
            new UnzerMarketplacePaymentMethodFilterPlugin(),
            new UnzerEnabledPaymentMethodFilterPlugin(),
        ];
    }
}

```

</details>

7. To use Unzer expense refund strategies, disable the default refund flow by overriding `RefundBusinessFactory`:

<details>
<summary markdown='span'>src/Pyz/Zed/Refund/Business/RefundBusinessFactory.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Refund\Business;

use Spryker\Zed\Refund\Business\RefundBusinessFactory as SprykerRefundBusinessFactory;
use Spryker\Zed\Refund\RefundDependencyProvider;

/**
 * @method \Spryker\Zed\Refund\Persistence\RefundQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Refund\RefundConfig getConfig()
 */
class RefundBusinessFactory extends SprykerRefundBusinessFactory
{
    /**
     * @return array<\Spryker\Zed\Refund\Dependency\Plugin\RefundCalculatorPluginInterface>
     */
    protected function getRefundCalculatorPlugins(): array
    {
        return [
            $this->getProvidedDependency(RefundDependencyProvider::PLUGIN_ITEM_REFUND_CALCULATOR),
        ];
    }
}

```

</details>

8. To use Unzer Gui, override `UnzerGuiDependencyProvider`:

<details>
<summary markdown='span'>src/Pyz/Zed/UnzerGui/UnzerGuiDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\UnzerGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;
use SprykerEco\Zed\UnzerGui\UnzerGuiDependencyProvider as SprykerUnzerGuiDependencyProvider;

class UnzerGuiDependencyProvider extends SprykerUnzerGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getStoreRelationFormTypePlugin(): FormTypeInterface
    {
        return new StoreRelationToggleFormTypePlugin();
    }
}

```

</details>

9. Add `StepHandler` plugins to `CheckoutPageDependencyProvider`:

<details>
<summary markdown='span'>src/Pyz/Zed/UnzerGui/UnzerGuiDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage;

...
use SprykerEco\Shared\Unzer\UnzerConfig;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerBankTransferSubFormPlugin;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerCreditCardSubFormPlugin;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerMarketplaceBankTransferSubFormPlugin;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerMarketplaceCreditCardSubFormPlugin;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerMarketplaceSofortSubFormPlugin;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerSofortSubFormPlugin;
use SprykerEco\Yves\Unzer\Plugin\StepEngine\UnzerStepHandlerPlugin;

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendPaymentMethodHandler(Container $container): Container
    {
        $container->extend(static::PAYMENT_METHOD_HANDLER, function (StepHandlerPluginCollection $paymentMethodHandler) {
            ...
            // --- Unzer
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_BANK_TRANSFER);
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_CREDIT_CARD);
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_SOFORT);
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_CREDIT_CARD);
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_SOFORT);
            $paymentMethodHandler->add(new UnzerStepHandlerPlugin(), UnzerConfig::PAYMENT_METHOD_KEY_BANK_TRANSFER);

            return $paymentMethodHandler;
        });
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendSubFormPluginCollection(Container $container): Container
    {
        $container->extend(static::PAYMENT_SUB_FORMS, function (SubFormPluginCollection $paymentSubFormPluginCollection) {
            ...
            // --- Unzer
            $paymentSubFormPluginCollection->add(new UnzerMarketplaceBankTransferSubFormPlugin());
            $paymentSubFormPluginCollection->add(new UnzerMarketplaceCreditCardSubFormPlugin());
            $paymentSubFormPluginCollection->add(new UnzerCreditCardSubFormPlugin());
            $paymentSubFormPluginCollection->add(new UnzerMarketplaceSofortSubFormPlugin());
            $paymentSubFormPluginCollection->add(new UnzerBankTransferSubFormPlugin());
            $paymentSubFormPluginCollection->add(new UnzerSofortSubFormPlugin());

            return $paymentSubFormPluginCollection;
        });
    }
}

```

</details>

10. Add Unzer payment templates:

<details>
<summary markdown='span'>src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig</summary>

```twig
    customForms: {
        'Payone/credit_card': ['credit-card', 'payone'],
        'Payone/instant_online_transfer': ['instant-online-transfer', 'payone'],
        'Unzer/views/marketplace-credit-card/marketplace-credit-card': ['marketplace-credit-card', 'unzer'],
        'Unzer/views/credit-card/credit-card': ['credit-card', 'unzer'],
        'Unzer/views/marketplace-sofort': ['marketplace-sofort', 'unzer'],
        'Unzer/views/sofort': ['sofort', 'unzer'],
        'Unzer/views/marketplace-bank-transfer': ['marketplace-bank-transfer', 'unzer'],
        'Unzer/views/bank-transfer': ['bank-transfer', 'unzer'],
    },
} %}
```

</details>

11. Add Unzer routes for Yves:

<details>
<summary markdown='span'>src/Pyz/Yves/Router/RouterDependencyProvider.php</summary>

```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Yves\Router;

...
use SprykerEco\Yves\Unzer\Plugin\Router\UnzerRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        $routeProviders = [
            ...
            new UnzerRouteProviderPlugin(),
        ];
        ...

        return $routeProviders;
    }
}

```

</details>
