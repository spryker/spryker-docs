---
title: PayOne - Cash on Delivery
description: Integrate  Cash on Delivery payment through Payone into the Spryker-based shop.
last_updated: Aug 27, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/payone-cash-on-delivery
originalArticleId: 053fd092-4e7b-4cd2-a0a3-b48bb1c9fb9a
redirect_from:
  - /v6/docs/payone-cash-on-delivery
  - /v6/docs/en/payone-cash-on-delivery
related:
  - title: PayOne - Authorization and Preauthorization Capture Flows
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-authorization-and-preauthorization-capture-flows.html
  - title: PayOne - Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-invoice-payment.html
  - title: PayOne - Prepayment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-prepayment.html
  - title: PayOne - Direct Debit Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-direct-debit-payment.html
  - title: PayOne - Security Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-security-invoice-payment.html
  - title: PayOne - Online Transfer Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-online-transfer-payment.html
---

## Frontend Integration

### Extending Checkout Page
src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php

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

## State Machine Integration

### Extending the State Machine

config/Shared/config_default.php

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
