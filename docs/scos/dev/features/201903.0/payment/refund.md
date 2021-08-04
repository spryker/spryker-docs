---
title: Refund
originalLink: https://documentation.spryker.com/v2/docs/refund
redirect_from:
  - /v2/docs/refund
  - /v2/docs/en/refund
---

{% info_block infoBox %}
Refund manages the retour refund process.
{% endinfo_block %}

## Overview
`RefundFacade` contains the following methods:

* `calculateRefund(array $salesOrderItems, SpySalesOrder $salesOrderEntity)`
    * calculates refundable amount for the sales order
* `saveRefund(RefundTransfer $refundTransfer)`
    * persists the calculated refund amount
The `RefundFacade::calculateRefund($salesOrderItems, $salesOrderEntity)` will return a RefundTransfer that contains the calculated refundable amount.

## Using the Refund Module
Usually this functionality will be integrated in the state machine processes and will be called by a command.

A command plugin that calls the refund functionality can be similar to the example below:

```php
<?php

namespace MyNamespace\Zed\MyBundle\Communication\Plugin\Command;

use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\CommandByOrderInterface;

class RefundCommand extends AbstractPlugin implements CommandByOrderInterface
{

    /**
     * @param array $orderItems
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
     *
     * @return array
     */
    public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data)
    {
        ...

        $result = $this->getFacade()->refundPayment($orderItems, $orderEntity);

        ...

        return [];
    }

}
```

The needed data to handle the refund is given inside the state machine command and you only need to pass the data to the Business Layer of your payment provider.

In your transaction model, you ask the RefundFacade to calculate the refundable amount by calling `RefundFacade::calculateRefund($orderItems, $orderEntity)` which will return a `RefundTransfer`.

The `RefundTransfer::$amount` contains the refundable amount for the given data.

After that, you can tell your payment provider the amount that should be refunded. When the response is successful, you need to save the refund data by calling `RefundFacade::saveRefund($refundTransfer)`.

```php
<?php

namespace MyNamespace\Zed\MyBundle\Business\Model\Transaction;

use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Spryker\Zed\Refund\Business\RefundFacadeInterface;

class RefundTransaction
{

    /**
     * @var \Spryker\Zed\Refund\Business\RefundFacadeInterface
     */
    protected $refundFacade;

    /**
     * @param \Spryker\Zed\Refund\Business\RefundFacadeInterface
     */
    public function __construct(RefundFacadeInterface $refundFacade)
    {
        $this->refundFacade = $refundFacade;
    }

    ...

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     *
     * ...
     */
    public function refundTransaction(array $orderItems, SpySalesOrder $orderEntity)
    {
        ...

        $refundTransfer = $this->refundFacade()->calculateRefund($orderItems, $orderEntity);
        $result = $this->doRefund($refundTransfer);

        if ($result) {
            $this->refundFacade()->saveRefund($refundTransfer);
        }

        ...
    }

    ...

}
```

## Extending the Refund Module
The manner of calculating the refundable amount is different from one project to another. One will refund the shipment for every item, while the other one will refund the shipment only when all items are refunded etc.

The calculation of the refundable amount is achieved through a plugin mechanism.

The default implementation will refund all expenses when the last item will be refunded. If you need to change this behaviour, you simply need to create a new plugin that implements `RefundCalculatorPluginInterface` and replace the default one from the plugin stack with the new one.

This interface contains one method `RefundCalculatorPluginInterface::calculateRefund()` that asks for a `RefundTransfer` object, an `OrderTransfer` and an array of items that need to be refunded.
