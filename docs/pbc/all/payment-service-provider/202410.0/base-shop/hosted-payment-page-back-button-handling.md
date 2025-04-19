---
title: Hosted Payment Page Back Button Handling
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

2. Update your OMS state machine configuration by adding the `exclude from customer` flag to the `payment cancellation pending` state:


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

1. **Basic Flow Test**
   - Add products to cart.
   - Proceed to checkout.
   - Reach payment step and get redirected to hosted payment page.
   - Use browser's back button.
   - Verify that the original order is cancelled.
   - Verify that a new order can be placed.

2. **Stock Verification Test**
   - Add last available item of a product to cart.
   - Proceed to hosted payment page.
   - Use back button.
   - Verify that the item becomes available again after order cancellation.
   - Verify that a new order can be placed with the same item.

3. **Order Status Test**
   - Log in as a customer.
   - Place an order that triggers hosted payment page.
   - Use back button.
   - Verify order status changes to "payment cancellation pending".
   - Verify order is not visible in customer account.
   - Log in to Zed and verify that the order exists with the correct state.

## Troubleshooting

### Order Still Visible in Customer Account
- Verify `exclude from customer` flag is properly set in state machine configuration.
- Check if the order state transition to "payment cancellation pending" was successful.
- Verify the state is properly configured in the OMS.

### Stock Issues
- Ensure proper order cancellation workflow.
- Verify stock update triggers.

## Related Developer Guides

* [Payments Feature Overview](/docs/scos/dev/feature-walkthroughs/page.version/payments-feature-walkthrough/payments-feature-walkthrough.html)
* [State Machines](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/state-machine.html)
