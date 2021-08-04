---
title: Multiple Payment Methods Per Order
originalLink: https://documentation.spryker.com/v1/docs/multiple-payment-methods-per-order
redirect_from:
  - /v1/docs/multiple-payment-methods-per-order
  - /v1/docs/en/multiple-payment-methods-per-order
---

All orders can be paid with none, one or multiple payment methods which the customer can select during checkout. To accommodate your customer's requirements, you can offer multiple payment methods for a single order, such as gift card and an additional credit card.

{% info_block infoBox %}
Most orders are paid with a single payment method but in same cases it is useful to allow multiple payment methods, for instance the customer may want to use two credit cards or to use the gift card in addition to a traditional payment method.
{% endinfo_block %}

## Multiple Payments
Spryker Commerce OS enables to have multiple payments per checkout. Payments are stored in `QuoteTransfer::payments` and persisted when `CheckoutClient::placeOrder` is called in last checkout step.

Each payment method must provide payment amount it shares from order grand total. This amount is stored in `PaymentTransfer::amount` field. When order is placed in last step all payments are persisted to `spy_sales_payment` table.

## Payment Hydration for Order
The [Sales](/docs/scos/dev/features/201811.0/order-management/sales) module provides plugins to hydrate OrderTransfer which is called when `SalesFacade::getOrderByIdSalesOrder` invoked.

One of those plugins are `\Spryker\Zed\Payment\Communication\Plugin\Sales\PaymentOrderHydratePlugin` which must be added to `\Pyz\Zed\Sales\SalesDependencyProvider::getOrderHydrationPlugins` plugin stack.

This plugin invokes the payment hydration plugin stack which must be injected to  ` \Spryker\Zed\Payment\PaymentDependencyProvider::PAYMENT_HYDRATION_PLUGINS`, for example:

```php
<?php
namespace Spryker\Zed\PaymentProvider\Dependency\Injector;
class PaymentDependencyInjector extends AbstractDependencyInjector
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function injectBusinessLayerDependencies(Container $container)
    {
        $container = $this->injectPaymentPlugin($container);
        return $container;
    }
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function injectPaymentPlugin(Container $container)
    {
        $container->extend(PaymentDependencyProvider::PAYMENT_HYDRATION_PLUGINS, function (PaymentHydratorPluginCollectionInterface $pluginCollection) {
             $pluginCollection->add(‘PaymentProvider’,  new PaymentProviderSalesOrderPaymentHydrationPlugin()) // this plugin must implement \Spryker\Zed\Payment\Dependency\Plugin\Sales\PaymentHydratorPluginInterface
             return $pluginCollection;
        });
        return $container;
    }
}
?>
```

The plugin will receive `OrderTransfer` and `PaymentTransfer` which is the payment you need to hydrate with additional data.

Plugins have to populate the `PaymentTransfer` object and return it back. After this step you should be able to get payment information when calling `SalesFacade::getOrderByIdSalesOrder`. We also included simple Zed UI twig block for payments so it can display a little more information about payment methods used on the Order Detail page.

To enable it:

* Go to `\Pyz\Zed\Sales\SalesConfig::getSalesDetailExternalBlocksUrls`
* Add` ‘payments’ => ‘/payment/sales/list’`, to `$projectExternalBlocks` array.

## Current Constraints

{% info_block infoBox %}
Currently, the feature has the following functional constraints which are going to be resolved in the future.
{% endinfo_block %}

* payment methods cannot be managed in the Back Office

* you can define a store relation for a payment method on a project level using an availability plugin that defines if a payment method is to be shown during checkout

