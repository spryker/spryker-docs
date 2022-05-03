---
title: Amazon Pay - State Machine
description: This article describes the state machine for the Amazon Pay module in the Spryker Legacy Demoshop.
last_updated: Aug 27, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/amazon-pay-state-machine-demoshop
originalArticleId: 7b5b3fb4-99a0-4972-acfd-403e4522d882
redirect_from:
  - /v6/docs/amazon-pay-state-machine-demoshop
  - /v6/docs/en/amazon-pay-state-machine-demoshop
related:
  - title: Amazon Pay - Configuration for the Legacy Demoshop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-configuration-for-the-legacy-demoshop.html
  - title: Amazon Pay - Refund
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-refund.html
  - title: Handling orders with Amazon Pay API
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/legacy-demoshop-handling-orders-with-amazon-pay-api.html
  - title: Amazon Pay - Email Notifications
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-email-notifications.html
  - title: Amazon Pay - Sandbox Simulations
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-sandbox-simulations.html
  - title: Amazon Pay - Order Reference and Information about Shipping Addresses
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-order-reference-and-information-about-shipping-addresses.html
  - title: Amazon Pay - Support of Bundled Products
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-support-of-bundled-products.html
  - title: Amazon Pay - Rendering a “Pay with Amazon” Button on the Cart Page
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-rendering-a-pay-with-amazon-button-on-the-cart-page.html
---

The state machine is different for synchronous and asynchronous flow. Although from status "capture completed" it is the same and in the state machine, it's presented as a sub-process.

The state machine for the synchronous flow:
![Synchronous flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Amazon+Pay/sync.png)

The state machine for the asynchronous flow:
![Asynchronous flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Amazon+Pay/async.png)

## OMS Commands
Here is a list of commands and conditions to support processing of OMS:
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
        $container->extend(OmsDependencyProvider::CONDITION_PLUGINS, function       (ConditionCollectionInterface $conditionCollection) {
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
