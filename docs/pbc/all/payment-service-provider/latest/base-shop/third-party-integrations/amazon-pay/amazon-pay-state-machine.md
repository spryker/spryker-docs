---
title: Amazon Pay - State Machine
description: This article describes the state machine for the Amazon Pay module in Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/amazon-pay-state-machine
originalArticleId: 95d68099-5bb5-4423-8945-b0cdbcc01384
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/amazon-pay/amazon-pay-state-machine.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/amazon-pay/amazon-pay-state-machine.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/amazon-pay/amazon-pay-state-machine.html
related:
  - title: Handling orders with Amazon Pay API
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/amazon-pay/handling-orders-with-amazon-pay-api.html
  - title: Configuring Amazon Pay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/amazon-pay/configure-amazon-pay.html
  - title: Amazon Pay - Sandbox Simulations
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/amazon-pay/amazon-pay-sandbox-simulations.html
  - title: Obtaining an Amazon Order Reference and information about shipping addresses
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/amazon-pay/obtain-an-amazon-order-reference-and-information-about-shipping-addresses.html
---

The state machine is different for synchronous and asynchronous flow. Although from status "capture completed" it's the same and in the state machine, it's presented as a sub-process.

The state machine for the synchronous flow:

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Amazon+Pay/sync.png)

The state machine for the asynchronous flow:

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Amazon+Pay/async.png)

## OMS Commands

Here is a list of commands and conditions to support processing of OMS:

<details>
<summary>Click here for example of injection</summary>

 ```php
 <script>
 /**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return void
 */
 protected function injectAmazonPayCommands(Container $container)
 {
 $container->extend(
 OmsDependencyProvider::COMMAND_PLUGINS,
 function (CommandCollectionInterface $commandCollection) {
 $commandCollection
 ->add(new CancelOrderCommandPlugin(), 'AmazonPay/CancelOrder')
 ->add(new CloseOrderCommandPlugin(), 'AmazonPay/CloseOrder')
 ->add(new RefundOrderCommandPlugin(), 'AmazonPay/RefundOrder')
 ->add(new ReauthorizeExpiredOrderCommandPlugin(), 'AmazonPay/ReauthorizeExpiredOrder')
 ->add(new CaptureCommandPlugin(), 'AmazonPay/Capture')
 ->add(new UpdateSuspendedOrderCommandPlugin(), 'AmazonPay/UpdateSuspendedOrder')
 ->add(new UpdateAuthorizationStatusCommandPlugin(), 'AmazonPay/UpdateAuthorizationStatus')
 ->add(new UpdateCaptureStatusCommandPlugin(), 'AmazonPay/UpdateCaptureStatus')
 ->add(new UpdateRefundStatusCommandPlugin(), 'AmazonPay/UpdateRefundStatus');

 return $commandCollection;
 }
 );
 }

 /**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return void
 */
 protected function injectAmazonPayConditions(Container $container)
 {
 $container->extend(OmsDependencyProvider::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
 $conditionCollection
 ->add(new IsClosedConditionPlugin(), 'AmazonPay/IsClosed')
 ->add(new IsCloseAllowedConditionPlugin(), 'AmazonPay/IsCloseAllowed')

 ->add(new IsCancelledConditionPlugin(), 'AmazonPay/IsCancelled')
 ->add(new IsCancelNotAllowedConditionPlugin(), 'AmazonPay/IsCancelNotAllowed')
 ->add(new IsCancelledOrderConditionPlugin(), 'AmazonPay/IsOrderCancelled')

 ->add(new IsOpenConditionPlugin(), 'AmazonPay/IsAuthOpen')
 ->add(new IsDeclinedConditionPlugin(), 'AmazonPay/IsAuthDeclined')
 ->add(new IsPendingConditionPlugin(), 'AmazonPay/IsAuthPending')
 ->add(new IsSuspendedConditionPlugin(), 'AmazonPay/IsAuthSuspended')
 ->add(new IsAuthExpiredConditionPlugin(), 'AmazonPay/IsAuthExpired')
 ->add(new IsClosedConditionPlugin(), 'AmazonPay/IsAuthClosed')
 ->add(new IsAuthTransactionTimedOutConditionPlugin(), 'AmazonPay/IsAuthTransactionTimedOut')
 ->add(new IsSuspendedConditionPlugin(), 'AmazonPay/IsPaymentMethodChanged')

 ->add(new IsCompletedConditionPlugin(), 'AmazonPay/IsCaptureCompleted')
 ->add(new IsDeclinedConditionPlugin(), 'AmazonPay/IsCaptureDeclined')
 ->add(new IsPendingConditionPlugin(), 'AmazonPay/IsCapturePending')

 ->add(new IsCompletedConditionPlugin(), 'AmazonPay/IsRefundCompleted')
 ->add(new IsDeclinedConditionPlugin(), 'AmazonPay/IsRefundDeclined')
 ->add(new IsPendingConditionPlugin(), 'AmazonPay/IsRefundPending');

 return $conditionCollection;
 });
 }
 </script>
 ```

</details>
