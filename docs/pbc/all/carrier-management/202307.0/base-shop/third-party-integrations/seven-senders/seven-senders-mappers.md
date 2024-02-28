---
title: Seven Senders — Mappers
template: concept-topic-template
last_updated: Jul 25, 2023
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202307.0/shipment/seven-senders/seven-senders-mappers.html

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
