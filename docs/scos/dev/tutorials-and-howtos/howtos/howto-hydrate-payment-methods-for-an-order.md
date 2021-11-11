---
title: HowTo - Hydrate Payment Methods for an Order
description: This doc describes how to use PaymentDependencyProvider::PAYMENT_HYDRATION_PLUGINS and how to add other payment methods into the order.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-hydrate-payment-methods-for-order
originalArticleId: 4e35e87f-d4a5-4a06-8cf5-d830eec89b5d
redirect_from:
  - /2021080/docs/ht-hydrate-payment-methods-for-order
  - /2021080/docs/en/ht-hydrate-payment-methods-for-order
  - /docs/ht-hydrate-payment-methods-for-order
  - /docs/en/ht-hydrate-payment-methods-for-order
  - /v6/docs/ht-hydrate-payment-methods-for-order
  - /v6/docs/en/ht-hydrate-payment-methods-for-order
  - /v5/docs/ht-hydrate-payment-methods-for-order
  - /v5/docs/en/ht-hydrate-payment-methods-for-order
  - /v4/docs/ht-hydrate-payment-methods-for-order
  - /v4/docs/en/ht-hydrate-payment-methods-for-order
---

{% info_block warningBox "Warning" %}

`PaymentOrderHydratePlugin`  and `PaymentDependencyProvider::PAYMENT_HYDRATION_PLUGINS` are deprecated, the new plugin is `\Spryker\Zed\SalesPayment\Communication\Plugin\Sales\SalesPaymentOrderExpanderPlugin`, which automatically adds all payments from `spy_sales_payment` into `OrderTransfer`.

{% endinfo_block %}

## Multiple payments

Spryker Commerce OS enables to have multiple payments per checkout. Payments are stored in `QuoteTransfer::payments` and persisted when `CheckoutClient::placeOrder` is called in last checkout step.

Each payment method must provide payment amount it shares from order grand total. This amount is stored in `PaymentTransfer::amount` field. When order is placed in last step all payments are persisted to `spy_sales_payment` table.

## Payment hydration for order

The [Sales](/docs/scos/dev/feature-walkthroughs/{{site.version}}/order-management-feature-walkthrough/sales-module-reference-information.html) module provides plugins to hydrate `OrderTransfer`, which is called when `SalesFacade::getOrderByIdSalesOrder` invoked.

This plugin invokes the payment hydration plugin stack which must be injected to  `\Spryker\Zed\Payment\PaymentDependencyProvider::PAYMENT_HYDRATION_PLUGINS`, for example:

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

Plugins have to populate the `PaymentTransfer` object and return it back. After this step you should be able to get payment information when calling `SalesFacade::getOrderByIdSalesOrder`. We also included simple Zed UI twig block for payments, so it can display more information about payment methods used on the order details page.

To enable it:
* Go to `\Pyz\Zed\Sales\SalesConfig::getSalesDetailExternalBlocksUrls`.
* Add` ‘payments’ => ‘/payment/sales/list’`, to `$projectExternalBlocks` array.
