---
title: Refund process management
description: The document describes the methods used to calculate the refund, as well as ways of using and extending the Refund module.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/refund-process-management
originalArticleId: d86ae613-8789-4f31-badb-b758769de71e
redirect_from:
  - /2021080/docs/refund-process-management
  - /2021080/docs/en/refund-process-management
  - /docs/refund-process-management
  - /docs/en/refund-process-management
  - /v6/docs/refund-process-management
  - /v6/docs/en/refund-process-management
  - /v5/docs/refund-process-management
  - /v5/docs/en/refund-process-management
  - /v4/docs/refund-process-management
  - /v4/docs/en/refund-process-management
  - /docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/refund-process-management.html
related:
  - title: Refunds feature overview
    link: docs/pbc/all/order-management-system/page.version/base-shop/refunds-feature-overview.html
  - title: Upgrade the Refund module
    link: docs/pbc/all/order-management-system/page.version/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-refund-module.html
---

{% info_block infoBox %}

Refund manages the retour refund process.

{% endinfo_block %}

## Overview

`RefundFacade` contains the following methods:

- `calculateRefund(array $salesOrderItems, SpySalesOrder $salesOrderEntity)`: Calculates the refundable amount for the sales order
- `saveRefund(RefundTransfer $refundTransfer)` persists the calculated refund amount. `RefundFacade::calculateRefund($salesOrderItems, $salesOrderEntity)` returns `RefundTransfer` that contains the calculated refundable amount.

## Using the `Refund` module

Usually, this functionality is integrated into the state machine processes and is called by a command.

A command plugin that calls the refund functionality can be similar to the following example:

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

The needed data to handle the refund is given inside the state machine command, and you only need to pass the data to the `Business` layer of your payment provider.

In your transaction model, you ask `RefundFacade` to calculate the refundable amount by calling `RefundFacade::calculateRefund($orderItems, $orderEntity)`, which returns a `RefundTransfer`.

The `RefundTransfer::$amount` contains the refundable amount for the given data.

After that, you can tell your payment provider the amount to refund. When the response is successful, you need to save the refund data by calling `RefundFacade::saveRefund($refundTransfer)`.

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

## Extending the `Refund` module

The manner of calculating the refundable amount is different from one project to another. One refunds the shipment for every item, while the other one refunds the shipment only when all items are refunded.

The calculation of the refundable amount is achieved through a plugin mechanism.

The default implementation refunds all expenses when the last item is refunded. To change this behavior, create a new plugin that implements `RefundCalculatorPluginInterface` and replace the default one from the plugin stack with the new one.

This interface contains one method `RefundCalculatorPluginInterface::calculateRefund()`, that asks for a `RefundTransfer` object, `OrderTransfer`, and an array of items that need to be refunded.
