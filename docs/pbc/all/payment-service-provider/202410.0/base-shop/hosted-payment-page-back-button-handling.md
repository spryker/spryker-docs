---
title: Configure handling of browser back button action
description: Learn how to handle browser back button usage when integrating hosted payment pages
last_updated: Mar 25, 2024
template: concept-topic-template
---

When integrating payment service providers (PSPs) that use hosted payment pages, the application needs to handle browser navigation to maintaining order consistency and stock management. This document explains how to configure applications with hosted payment pages to handle the browser back button action.

## Order persistence issue

When a customer is redirected from the Spryker checkout summary page to an external PSP's hosted payment page, using the back button creates an order persistence issue. The order is already created in the system with a unique OrderReference, preventing the customer from completing the purchase if they attempt to proceed again through checkout.

This issue is particularly critical in the following cases:
* The last item in stock was part of the order
* The customer wants to change their order after being redirected to the payment page
* The order reference is already generated and persisted

## Solution

Implement a mechanism to detect and handle cases where customers return from a hosted payment page using the back button. In such cases, the system cancels a previously created order and lets the customer to proceed with a new order.

## Implement back button handling

1. To support browser back button behavior for hosted payment pages, register the `PaymentAppCancelOrderOnSummaryPageAfterRedirectFromHostedPaymentPagePlugin` in your project's `CheckoutPageDependencyProvider`.

Add the following methods to `src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php`:

```php
<?php

namespace Pyz\Yves\CheckoutPage;

use SprykerShop\Yves\PaymentAppWidget\Plugin\CheckoutPage\PaymentAppCancelOrderOnSummaryPageAfterRedirectFromHostedPaymentPagePlugin;

class CheckoutPageDependencyProvider extends SprykerCheckoutPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\CheckoutStepPreConditionPluginInterface>
     */
    protected function getCheckoutSummaryStepPreConditionPlugins(): array
    {
        return [
            new PaymentAppCancelOrderOnSummaryPageAfterRedirectFromHostedPaymentPagePlugin(),
        ];
    }

    /**
     * @return array<\SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\CheckoutStepPostConditionPluginInterface>
     */
    protected function getCheckoutSummaryStepPostConditionPlugins(): array
    {
        return [
            new PaymentAppCancelOrderOnSummaryPageAfterRedirectFromHostedPaymentPagePlugin(),
        ];
    }
}
```

2. Update your OMS state configuration by adding the `exclude from customer` flag to the `payment cancellation pending` state:


**SalesPayment/config/Zed/Oms/Subprocess/PaymentCancel01.xml**
```xml
<state name="payment cancellation pending" display="oms.state.reservation-cancellation-pending">
    <flag>exclude from customer</flag>
</state>
```

{% info_block warningBox "" %}

The `exclude from customer` flag is used to prevent cancelled payment orders from appearing in registered customers' order history.

For more information about the `exclude from customer` flag, see [Order Process Modelling via State Machines](https://docs.spryker.com/docs/pbc/all/order-management-system/202410.0/base-shop/datapayload-conversion/state-machine/order-process-modelling-via-state-machines.html#state-machine-module).

{% endinfo_block %}

## Testing

Test the implementation by taking the steps in the following sections.

### Basic flow test
1. Add products to cart  
2. Proceed to checkout  
3. Reach the payment step and get redirected to hosted payment page  
4. Use the browser back button  

Make sure the following applies:
* The original order has been cancelled  
* You can place a new order with the same items

### Stock verification test
1. Add the last available item of a product to cart  
2. Proceed to checkout  
3. Reach the payment step and get redirected to hosted payment page  
4. Use the browser back button  

Make sure the following applies:
* The item becomes available
* You can place a new order with the same item

### Order status test
1. Log in as a customer  
2. Add products to cart  
3. Proceed to checkout  
4. Reach the payment step and get redirected to hosted payment page  
5. Use the browser back button  

Make sure the following applies:
* Order status changes to "payment cancellation pending"  
* Order is not displayed in customer account  
* In the Back Office, the order exists in the correct state


## Troubleshooting

Solutions to common issues.


### Order still visible in customer account
- Verify that the `exclude from customer` flag is properly set in the state machine configuration  
- Check if the order state transition to `payment cancellation pending` is executed successfully
- Verify that the state is properly configured in the OMS  

### Stock issues
- Verify that the order cancellation workflow works properly
- Verify stock update triggers  


## Related Developer Guides

* [Payments Feature Overview](/docs/scos/dev/feature-walkthroughs/page.version/payments-feature-walkthrough/payments-feature-walkthrough.html)
* [State Machines](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/state-machine.html)










































