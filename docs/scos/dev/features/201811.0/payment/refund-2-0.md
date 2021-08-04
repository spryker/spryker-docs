---
title: Refund 2.0
originalLink: https://documentation.spryker.com/v1/docs/refund-2-0
redirect_from:
  - /v1/docs/refund-2-0
  - /v1/docs/en/refund-2-0
---

The Refund module manages the refund process.

* Overview
* Using  Refund 
* Extending  Refund 

## Overview

`RefundFacade` contains the following methods:

* `calculateRefund(array $salesOrderItems, SpySalesOrder $salesOrderEntity)`
    * calculates refundable amount for the sales order

* `calculateRefundableItemAmount(RefundTransfer $refundTransfer, OrderTransfer $orderTransfer, array $salesOrderItems)`
    * calculates refundable amount for given OrderTransfer and on the OrderItems that should be refunded.

* `calculateRefundableExpenseAmount(RefundTransfer $refundTransfer, OrderTransfer $orderTransfer, array $salesOrderItems)`
    * calculates refundable amount on order expenses

* `saveRefund(RefundTransfer $refundTransfer)`
    * persists the calculated refund amount

When you need to refund one or more items of an order, you just need to create an array of order items that you have to refund and the sales order entity. The `RefundFacade::calculateRefund($salesOrderItems, $salesOrderEntity)` will return a `RefundTransfer` that contains the calculated refundable amount.

## Using the Refund Module

Usually this functionality will be integrated in the state machine processes and will be called by a command.
A command plugin that calls the refund functionality can be similar to the example below:

```php
<?php

namespace Pyz\Zed\MyBundle\Communication\Plugin\Command;

use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\CommandByOrderInterface;

class RefundCommand extends AbstractPlugin implements CommandByOrderInterface
{

	...
	
	/**
	 * @param array $orderItems
	 * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
	 * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
	 *
	 * @return array Array
	 */
	public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data)
	{
		...

		$refundTransfer = $this->refundFacade->calculateRefund($orderItems, $orderEntity);
		$isRefundSuccessful = $this->getFacade()->refundPayment($refundTransfer);

		if ($isRefundSuccessful) {
			$this->refundFacade->saveRefund($refundTransfer);
		}

		...
	}

	...
}
```

The necessary data to handle the refund is already provided to the state machine’s command and you only need to wire it up.

To summarize, the following steps need to take place in your refund command:

* ask the `RefundFacade` to calculate the refundable amount 
    * by calling `RefundFacade::calculateRefund($orderItems, $orderEntity)` you will get a `RefundTransfer` back that contains the refundable amount for the provided data.
* the `RefundTransfer` object can be passed to your payment provider facade that handles the refund
    * the payment provider should return if the refund was successful or not
* if the refund was successful, persist the data
    * pass the `RefundTransfer` to `RefundFacade::saveRefund()` to persist the refund data.

## Extending the Refund Module
The manner of calculating the refundable amount is different from one project to another. One will refund the shipment for every item, while the other one will refund the shipment only when all items are refunded etc.

The calculation of the refundable amount is achieved through a plugin mechanism.

The default implementation will refund all expenses when the last item will be refunded. If you need to change this behavior, you simply need to create a new plugin that implements `RefundCalculatorPluginInterface` and replace the default one from the plugin stack with the new one.

This interface contains one method `RefundCalculatorPluginInterface::calculateRefund()` that asks for a `RefundTransfer` object, an` OrderTransfer` and an array of items that need to be refunded.
