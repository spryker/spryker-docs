---
title: Marketplace Shipment feature integration
description: Integrate Marketplace Shipment feature into your project
tags:
---

## Install feature core
Follow the steps below to install the Marketplace Shipment feature core.


### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Spryker Core | 202001.0 | [Spryker Core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration) |


### 1) Install the required modules using Composer
Run the following command to install the required modules:
```bash
composer require spryker-feature/marketplace-shipment --update-with-dependencies
```

---
**Verification**

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantShipment | spryker/merchant-shipment |
| MerchantShipmentGui | spryker/merchant-shipment-gui |
---

### 2) Set up configuration
Add the following configuration to your project:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
|-|-|-|
| ShipmentConfig::getShipmentHashFields() | Used to group items by shipment using merchant reference. | \Pyz\Service\Shipment |

**src/Pyz/Service/Shipment/ShipmentConfig.php**

```php
<?php

namespace Pyz\Service\Shipment;

use Generated\Shared\Transfer\ShipmentTransfer;
use Spryker\Service\Shipment\ShipmentConfig as SprykerShipmentConfig;

class ShipmentConfig extends SprykerShipmentConfig
{
    /**
     * @return string[]
     */
    public function getShipmentHashFields(): array
    {
        return array_merge(parent::getShipmentHashFields(), [ShipmentTransfer::MERCHANT_REFERENCE]);
    }
}
```

---
**Verification**

Make sure that `ShipmentService::groupItemsByShipment()` groups items by shipment using merchant reference.

---

### 3) Set up the database schema and transfer definitions
Run the following commands to apply database changes and to generate entity and transfer changes.

```bash
console transfer:generate
console propel:install
console transfer:generate
```

---
**Verification**

Verify that the following changes have been implemented by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
|-|-|-|
| spy_sales_shipment.merchant_reference | column | created |

Make sure that the following changes were applied in transfer objects:

| Transfer | Type | Event | Path |
|-|-|-|-|
| Shipment.merchantReference | class | created | src/Generated/Shared/Transfer/ShipmentTransfer |

---

### 4) Setup behavior
Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantShipmentOrderItemTemplatePlugin | Shows merchant shipment in shipment section of the ShipmentGui::SallesController |  | Spryker\Zed\MerchantShipmentGui\Communication\ShipmentGui |

**src/Pyz/Zed/ShipmentGui/ShipmentGuiDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentGui;

use Spryker\Zed\MerchantShipmentGui\Communication\ShipmentGui\MerchantShipmentOrderItemTemplatePlugin;
use Spryker\Zed\ShipmentGui\ShipmentGuiDependencyProvider as SprykerShipmentGuiDependencyProvider;

class ShipmentGuiDependencyProvider extends SprykerShipmentGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\ShipmentGuiExtension\Dependency\Plugin\ShipmentOrderItemTemplatePluginInterface[]
     */
    protected function getShipmentOrderItemTemplatePlugins(): array
    {
        return [
            new MerchantShipmentOrderItemTemplatePlugin(),
        ];
    }
}
```

## Related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE| INTEGRATION GUIDE |
|-|-|-|
| Marketplace Shipment + Cart | | [Marketplace Shipment + Cart feature integration](docs/marketplace/dev/feature-integration-guides/marketplace-shipment-cart-feature-integration.html) |
| Marketplace Shipment + Checkout | | [Marketplace Shipment + Checkout feature integration](/docs/marketplace/dev/feature-integration-guides/marketplace-shipment-checkout-feature-integration.html) |
| Marketplace Shipment + Customer | | [Marketplace Shipment + Customer feature integration](/docs/marketplace/dev/feature-integration-guides/marketplace-shipment-customer-feature-integration.html) |
