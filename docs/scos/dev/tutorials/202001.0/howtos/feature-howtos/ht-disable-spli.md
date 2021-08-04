---
title: HowTo - Disable Split Delivery in Yves Interface
originalLink: https://documentation.spryker.com/v4/docs/ht-disable-split-delivery-in-yves-interface
redirect_from:
  - /v4/docs/ht-disable-split-delivery-in-yves-interface
  - /v4/docs/en/ht-disable-split-delivery-in-yves-interface
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
