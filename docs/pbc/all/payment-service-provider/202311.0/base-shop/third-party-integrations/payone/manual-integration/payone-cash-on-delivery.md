---
title: PayOne - Cash on Delivery
description: Integrate  Cash on Delivery payment through Payone into the Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payone-cash-on-delivery
originalArticleId: e68a44fe-8cfe-4199-a3d0-537c04107688
redirect_from:
  - /docs/scos/user/technology-partners/202311.0/payment-partners/bs-payone/scos-integration/payone-cash-on-delivery.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payone/manual-integration/payone-cash-on-delivery.html
---

## Frontend Integration: Extending Checkout Page

**src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php**

 ```php
 <?php

namespace Pyz\Yves\CheckoutPage;

use Generated\Shared\Transfer\PaymentTransfer;
use Spryker\Yves\Kernel\Container;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerEco\Yves\Payone\Plugin\PayoneCashOnDeliverySubFormPlugin;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
 const CLIENT_PAYONE = 'CLIENT_PAYONE';

 public function provideDependencies($container): Container
 {
 $container = parent::provideDependencies($container);
 $container = $this->provideClients($container);

 $container[static::PAYMENT_METHOD_HANDLER] = function () {
 $paymentMethodHandler = new StepHandlerPluginCollection();
 $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_CASH_ON_DELIVERY);

 return $paymentMethodHandler;
 };

 $container[static::PAYMENT_SUB_FORMS] = function () {
 $paymentSubFormPlugin = new SubFormPluginCollection();
 $paymentSubFormPlugin->add(new PayoneCashOnDeliverySubFormPlugin());

 return $paymentSubFormPlugin;
 };

 return $container;
 }

 protected function provideClients(Container $container)
 {
 $container[static::CLIENT_PAYONE] = function (Container $container) {
 return $container->getLocator()->payone()->client();
 };
 return $container;
 }
}
```

## State Machine Integration: Extending the State Machine

**config/Shared/config_default.php**

 ```php
 <?php

$config[OmsConstants::ACTIVE_PROCESSES] = [
 'PayoneCashOnDelivery',
 ...
];

$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 PayoneConfig::PAYMENT_METHOD_CASH_ON_DELIVERY => 'PayoneCashOnDelivery',
 ...
];
```
