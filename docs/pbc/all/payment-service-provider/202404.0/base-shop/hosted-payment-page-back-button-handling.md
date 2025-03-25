---
title: Hosted Payment Page Back Button Handling
description: Learn how to handle browser back button usage when integrating hosted payment pages
last_updated: Mar 25, 2024
template: concept-topic-template
---

When integrating Payment Service Providers (PSPs) that use hosted payment pages, proper handling of browser navigation is crucial for maintaining order consistency and stock management. This guide explains how to handle scenarios where customers use their browser's back button after being redirected to a hosted payment page.

## Problem Overview

When customers are redirected from the Spryker checkout summary page to an external Payment Service Provider's hosted payment page, using the browser's back button creates an order persistence issue. The order is already created in the system with a unique OrderReference, preventing customers from completing the purchase if they attempt to proceed again through checkout.

This issue is particularly critical when:
1. The last item in stock was part of the order
2. The customer wants to modify their order after being redirected to the payment page
3. The order reference is already generated and persisted

## Solution

The solution implements a mechanism to detect and handle cases where customers return from a hosted payment page using the browser's back button. When such a scenario is detected, the system automatically cancels the previously created order and allows the customer to proceed with a new order.

## Implementation

### 1. Transfer Object Modification

Add the following property to your project's `Payment/src/Spryker/Shared/Payment/Transfer/payment.transfer.xml`:

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="Quote">
        <!-- Flag to identify if the quote is used with a hosted payment page provider -->
        <property name="usedWithHostedPaymentPagePaymentServiceProvider" type="bool"/>
    </transfer>
</transfers>
```

### 2. Checkout Process Modification

Override the following methods in your project's `CheckoutPage/Process/Steps/SummaryStep.php`:

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Generated\Shared\Transfer\QuoteTransfer;
use SprykerShop\Yves\CheckoutPage\Process\Steps\SummaryStep as SprykerSummaryStep;

class SummaryStep extends SprykerSummaryStep
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function preCondition(QuoteTransfer $quoteTransfer): bool
    {
        if ($quoteTransfer->getUsedWithHostedPaymentPagePaymentServiceProvider()) {
            $this->salesClient->cancelOrder($quoteTransfer);
        }

        return parent::preCondition($quoteTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function postCondition(QuoteTransfer $quoteTransfer): bool
    {
        $quoteTransfer->setUsedWithHostedPaymentPagePaymentServiceProvider(true);
        
        return parent::postCondition($quoteTransfer);
    }
}
```

### 3. Sales Module Updates

The core `cancelOrder` method in `Spryker/Client/Sales/SalesClient.php` requires a customer reference, which doesn't work for guest orders. You need to override this method in your project to remove this requirement:

1. Create your project-level SalesClient class:
```php
<?php

namespace Pyz\Client\Sales;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Client\Sales\SalesClient as SprykerSalesClient;

class SalesClient extends SprykerSalesClient
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    public function cancelOrder(QuoteTransfer $quoteTransfer): void
    {
        $this->getZedStub()->cancelOrder($quoteTransfer);
    }
}
```

2. Update the corresponding Zed stub and facade methods to handle the order cancellation without requiring customer reference. This ensures that both guest and logged-in customer orders can be properly cancelled when returning from a hosted payment page.

### 4. State Machine Configuration

Update your OMS state configuration in `SalesPayment/config/Zed/Oms/Subprocess/PaymentCancel01.xml`. Add the `exclude from customer` flag to the "payment cancellation pending" state:

```xml
<state name="payment cancellation pending" display="oms.state.reservation-cancellation-pending">
    <flag>exclude from customer</flag>
</state>
```

{% info_block warningBox "Important" %}

The `exclude from customer` flag is specifically needed for logged-in customers to prevent cancelled payment orders from appearing in their customer account. Without this flag, logged-in customers would see these cancelled orders in their order history.

{% endinfo_block %}

### 5. OrderReader

The OrderReader class from Spryker core already contains the necessary logic to handle the `exclude from customer` flag. No additional implementation is required for this class.

## Testing

1. **Basic Flow Test**
   - Add products to cart
   - Proceed to checkout
   - Reach payment step and get redirected to hosted payment page
   - Use browser's back button
   - Verify that the original order is cancelled
   - Verify that a new order can be placed

2. **Stock Verification Test**
   - Add last available item of a product to cart
   - Proceed to hosted payment page
   - Use back button
   - Verify that the item becomes available again after order cancellation
   - Verify that a new order can be placed with the same item

3. **Order Status Test**
   - Log in as a customer
   - Place an order that triggers hosted payment page
   - Use back button
   - Verify order status changes to "payment cancellation pending"
   - Verify order is not visible in customer account
   - Log in to Zed and verify that the order exists with the correct state

## Troubleshooting

### Order Still Visible in Customer Account
- Verify `exclude from customer` flag is properly set in state machine configuration
- Check if the order state transition to "payment cancellation pending" was successful
- Verify the state is properly configured in the OMS

### Stock Issues
- Ensure proper order cancellation workflow
- Verify stock update triggers

## Related Developer Guides

* [Payments Feature Overview](/docs/scos/dev/feature-walkthroughs/page.version/payments-feature-walkthrough/payments-feature-walkthrough.html)
* [State Machines](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/state-machine.html)
