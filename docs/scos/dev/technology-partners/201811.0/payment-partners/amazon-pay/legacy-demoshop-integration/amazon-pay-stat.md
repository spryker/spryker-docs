---
title: Amazon Pay - State Machine
originalLink: https://documentation.spryker.com/v1/docs/amazon-pay-state-machine-demoshop
redirect_from:
  - /v1/docs/amazon-pay-state-machine-demoshop
  - /v1/docs/en/amazon-pay-state-machine-demoshop
---

The state machine is different for synchronous and asynchronous flow. Although from status "capture completed" it is the same and in the state machine, it's presented as a sub-process.

The state machine for the synchronous flow:
![Synchronous flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Amazon+Pay/sync.png){height="" width=""}

The state machine for the asynchronous flow:
![Asynchronous flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Amazon+Pay/async.png){height="" width=""}

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
