---
title: Hydrate payment methods for an order
description: This doc describes how to use PaymentDependencyProvider::PAYMENT_HYDRATION_PLUGINS and how to add other payment methods into the order.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-hydrate-payment-methods-for-order
originalArticleId: 4e35e87f-d4a5-4a06-8cf5-d830eec89b5d
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-hydrate-payment-methods-for-an-order.html
  - /docs/pbc/all/payment-service-provider/202311.0/hydrate-payment-methods-for-an-order.html
  - /docs/pbc/all/payment-service-provider/202311.0/hydrate-payment-methods-for-an-order.html
---

{% info_block warningBox "Warning" %}

`PaymentOrderHydratePlugin` and `PaymentDependencyProvider::PAYMENT_HYDRATION_PLUGINS` are deprecated, the new plugin is `\Spryker\Zed\SalesPayment\Communication\Plugin\Sales\SalesPaymentOrderExpanderPlugin`, which automatically adds all payments from `spy_sales_payment` into `OrderTransfer`.

{% endinfo_block %}

## Multiple payments

Spryker Commerce OS lets you have multiple payments per checkout. Payments are stored in `QuoteTransfer::payments` and persisted when `CheckoutClient::placeOrder` is called in the last checkout step.

Each payment method must provide the payment amount it shares from the order's grand total. This amount is stored in the `PaymentTransfer::amount` field. When an order is placed in the last step, all payments are persisted in the `spy_sales_payment` table.

## Payment hydration for order

The [Sales](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/domain-model-and-relationships/sales-module-reference-information.html) module provides plugins to hydrate `OrderTransfer`, which is called when `SalesFacade::getOrderByIdSalesOrder` is invoked.

This plugin invokes the payment hydration plugin stack, which must be injected to  `\Spryker\Zed\Payment\PaymentDependencyProvider::PAYMENT_HYDRATION_PLUGINS`, for example:

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

The plugin receives `OrderTransfer` and `PaymentTransfer`, which are the payment you need to hydrate with additional data.

Plugins must populate the `PaymentTransfer` object and return it back. After this step, you can get payment information when calling `SalesFacade::getOrderByIdSalesOrder`. We also included a simple Zed UI twig block for payments to display more information about payment methods used on the order details page.

To enable it, follow these steps:

1. Go to `\Pyz\Zed\Sales\SalesConfig::getSalesDetailExternalBlocksUrls`.
2. Add` ‘payments’ => ‘/payment/sales/list’`, to the `$projectExternalBlocks` array.
