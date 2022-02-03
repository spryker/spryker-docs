---
title: Marketplace Shipment feature integration
last_updated: Jul 05, 2021
description: This document describes the process how to integrate Marketplace Shipment feature into your project
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Shipment feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Shipment feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Merchant | {{page.version}} | [Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |
| Shipment | {{page.version}} | [Shipment feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/shipment-feature-integration.html) |


### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-shipment:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantShipment | vendor/spryker/merchant-shipment |
| MerchantShipmentGui | vendor/spryker/merchant-shipment-gui |

{% endinfo_block %}

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

{% info_block warningBox "Verification" %}

Make sure that `ShipmentService::groupItemsByShipment()` groups items by shipment using the merchant reference.

{% endinfo_block %}

### 3) Set up the database schema and transfer definitions

Apply the database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Verify that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
|-|-|-|
| spy_sales_shipment.merchant_reference | column | created |

Make sure that the following changes were applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
|-|-|-|-|
| MerchantShipmentCriteria | class | created | src/Generated/Shared/Transfer/MerchantShipmentCriteria |
| Shipment.merchantReference | property | created | src/Generated/Shared/Transfer/ShipmentTransfer |

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantShipmentOrderItemTemplatePlugin | Shows merchant shipment in shipment section of the ShipmentGui::SalesController |  | Spryker\Zed\MerchantShipmentGui\Communication\ShipmentGui |

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
| Marketplace Shipment + Cart | | [Marketplace Shipment + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-shipment-cart-feature-integration.html) |
| Marketplace Shipment + Checkout | | [Marketplace Shipment + Checkout feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-shipment-checkout-feature-integration.html) |
| Marketplace Shipment + Customer | | [Marketplace Shipment + Customer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-shipment-customer-feature-integration.html) |
