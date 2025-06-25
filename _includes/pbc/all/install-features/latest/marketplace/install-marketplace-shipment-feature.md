This document describes how to install the Marketplace Shipment feature.

## Install feature core

Follow the steps below to install the Marketplace Shipment feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Merchant | {{page.version}} | [Install the Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |
| Shipment | {{page.version}} | [Install the Shipment feature](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html) |


### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/marketplace-shipment:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantShipment | vendor/spryker/merchant-shipment |
| MerchantShipmentGui | vendor/spryker/merchant-shipment-gui |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration:

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
     * @return array<string>
     */
    public function getShipmentHashFields(): array
    {
        return array_merge(parent::getShipmentHashFields(), [ShipmentTransfer::MERCHANT_REFERENCE]);
    }
}
```

{% info_block warningBox "Verification" %}

Place an order and check that items are grouped by merchant shipment in backoffice.

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
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentGui;

use Spryker\Zed\MerchantShipmentGui\Communication\ShipmentGui\MerchantShipmentOrderItemTemplatePlugin;
use Spryker\Zed\ShipmentGui\ShipmentGuiDependencyProvider as SprykerShipmentGuiDependencyProvider;

class ShipmentGuiDependencyProvider extends SprykerShipmentGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ShipmentGuiExtension\Dependency\Plugin\ShipmentOrderItemTemplatePluginInterface>
     */
    protected function getShipmentOrderItemTemplatePlugins(): array
    {
        return [
            new MerchantShipmentOrderItemTemplatePlugin(),
        ];
    }
}
```

## Install related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE| INSTALLATION GUIDE |
|-|-|-|
| Marketplace Shipment + Cart | | [Install the Marketplace Shipment + Cart feature](/docs/pbc/all/carrier-management/{{page.version}}/marketplace/install-features/install-the-marketplace-shipment-cart-feature.html) |
| Marketplace Shipment + Checkout | | [Install the Marketplace Shipment + Checkout feature](/docs/pbc/all/carrier-management/{{page.version}}/marketplace/install-features/install-the-marketplace-shipment-checkout-feature.html) |
| Marketplace Shipment + Customer | | [Install the Marketplace Shipment + Customer feature](/docs/pbc/all/carrier-management/{{page.version}}/marketplace/install-features/install-marketplace-shipment-customer-feature.html) |
