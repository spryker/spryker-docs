---
title: HowTo - Disable Split Delivery in Yves Interface
description: Use the guide to learn how to disable Split Delivery during checkout in your project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-disable-split-delivery-in-yves-interface
originalArticleId: 1e1999de-4213-4495-9ac8-da9a49eb04df
redirect_from:
  - /2021080/docs/ht-disable-split-delivery-in-yves-interface
  - /2021080/docs/en/ht-disable-split-delivery-in-yves-interface
  - /docs/ht-disable-split-delivery-in-yves-interface
  - /docs/en/ht-disable-split-delivery-in-yves-interface
  - /v6/docs/ht-disable-split-delivery-in-yves-interface
  - /v6/docs/en/ht-disable-split-delivery-in-yves-interface
  - /v5/docs/ht-disable-split-delivery-in-yves-interface
  - /v5/docs/en/ht-disable-split-delivery-in-yves-interface
  - /v4/docs/ht-disable-split-delivery-in-yves-interface
  - /v4/docs/en/ht-disable-split-delivery-in-yves-interface

related:
  - title: Split Delivery Overview
    link: docs/scos/user/features/page.version/order-management-feature-overview/split-delivery-overview.html
---

Sometimes payment service providers do not support multiple shipments for the same order, which contradicts the essence of the Split Delivery feature. In this case, you can disable the Split Delivery feature in the Сheckout process, however, it will still work in the Back Office.

**To disable the feature for the Checkout process in Yves**, do the following:

 1. Open the `\Pyz\Shared\Shipment\ShipmentConfig.php` file.

2. Change the `isMultiShipmentSelectionEnabled()` to return false:

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Shipment;

use Spryker\Shared\Shipment\ShipmentConfig as SprykerShipmentConfig;

class ShipmentConfig extends SprykerShipmentConfig
{
   /**
    * @return bool
    */
    public function isMultiShipmentSelectionEnabled(): bool
    {
        return false;
    }
}
```

3. Save the changes.
