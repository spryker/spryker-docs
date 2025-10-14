---
title: Seven Senders — Mappers
description: Learn how to configure Seven Senders mappers in Spryker Cloud Commerce OS to efficiently map shipping data for integration with your Spryker project.
template: concept-topic-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202311.0/shipment/seven-senders/seven-senders-mappers.html
  - /docs/pbc/all/carrier-management/202204.0/base-shop/third-party-integrations/seven-senders/seven-senders-mappers.html
  - /docs/pbc/all/carrier-management/latest/base-shop/third-party-integrations/seven-senders/seven-senders-mappers.html

---

For mapping data from Spryker to Seven Senders, `\SprykerEco\Zed\Sevensenders\Business\Mapper\OrderMapper` and `\SprykerEco\Zed\Sevensenders\Business\Mapper\ShipmentMapper` are used by default.

```php
<?php

namespace SprykerEco\Zed\Sevensenders\Business\Mapper;

use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\SevensendersRequestTransfer;

class OrderMapper implements MapperInterface
{
 /**
 * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
 *
 * @return \Generated\Shared\Transfer\SevensendersRequestTransfer
 */
 public function map(OrderTransfer $orderTransfer): SevensendersRequestTransfer
 {
 $payload = [
 'order_id' => (string)$orderTransfer->getIdSalesOrder(),
 'order_url' => '',
 'order_date' => $orderTransfer->getCreatedAt(),
 'delivered_with_seven_senders' => true,
 'boarding_complete' => true,
 'language' => $orderTransfer->getLocale() ? $orderTransfer->getLocale()->getLocaleName() : '',
 'promised_delivery_date' => $orderTransfer->getShipmentDeliveryTime(),
 ];

 $transfer = new SevensendersRequestTransfer();
 $transfer->setPayload($payload);

 return $transfer;
 }
}

```

You can extend `OrderMapper` on the project level and map fields as you need. If you want to create a new mapper you should implement `SprykerEco\Zed\Sevensenders\Business\Mapper\MapperInterface`.
