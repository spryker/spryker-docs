


This document describes how to integrate the [Shipment](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/shipment-feature-overview.html) + [Customer Account Management](/docs/pbc/all/customer-relationship-management/{{page.version}}/customer-account-management-feature-overview/customer-account-management-feature-overview.html) feature into a Spryker project.

## Install feature core

Follow the steps below to install the Shipment + Customer Account Management feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                        | VERSION          | INTEGRATION GUIDE                                                                                                                                                                                            |
|-----------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Shipment                    | {{page.version}} | [Shipment feature integration](/docs/pbc/all/carrier-management/{{page.version}}/install-and-upgrade/install-the-shipment-feature.html)                                                                      |
| Customer Account Management | {{page.version}} | [Customer Account Management feature integration](/docs/pbc/all/customer-relationship-management/{{page.version}}/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |

## 1) Set up behavior

Enable the following plugins:

| PLUGIN                                                       | SPECIFICATION                                                             | PREREQUISITES | NAMESPACE                                                  |
|--------------------------------------------------------------|---------------------------------------------------------------------------|---------------|------------------------------------------------------------|
| ShipmentTypeCheckoutAddressCollectionFormExpanderPlugin      | Expands checkout address form with the `ShipmentType` subform.                | None          | SprykerShop\Yves\ShipmentTypeWidget\Plugin\CustomerPage    |
| ShipmentTypeCheckoutMultiShippingAddressesFormExpanderPlugin | Expands checkout multi-shipping address form `ShipmentType`. | None          | SprykerShop\Yves\ShipmentTypeWidget\Plugin\CustomerPage    |
| ShipmentTypeAddressFormWidgetCacheKeyGeneratorStrategyPlugin | Skips caching of the `ShipmentTypeAddressFormWidget` widget.                  | None          | SprykerShop\Yves\ShipmentTypeWidget\Plugin\ShopApplication |

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerShop\Yves\ShipmentTypeWidget\Plugin\CustomerPage\ShipmentTypeCheckoutAddressCollectionFormExpanderPlugin;
use SprykerShop\Yves\ShipmentTypeWidget\Plugin\CustomerPage\ShipmentTypeCheckoutMultiShippingAddressesFormExpanderPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return list<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CheckoutAddressCollectionFormExpanderPluginInterface>
     */
    protected function getCheckoutAddressCollectionFormExpanderPlugins(): array
    {
        return [
            new ShipmentTypeCheckoutAddressCollectionFormExpanderPlugin(),
        ];
    }

    /**
     * @return list<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CheckoutMultiShippingAddressesFormExpanderPluginInterface>
     */
    protected function getCheckoutMultiShippingAddressesFormExpanderPlugins(): array
    {
        return [
            new ShipmentTypeCheckoutMultiShippingAddressesFormExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShipmentTypeWidget\Plugin\ShopApplication\ShipmentTypeAddressFormWidgetCacheKeyGeneratorStrategyPlugin;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\ShopApplicationExtension\Dependency\Plugin\WidgetCacheKeyGeneratorStrategyPluginInterface>
     */
    protected function getWidgetCacheKeyGeneratorStrategyPlugins(): array
    {
        return [
            new ShipmentTypeAddressFormWidgetCacheKeyGeneratorStrategyPlugin(),
        ];
    }
}
```

### 2) Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN                        | SPECIFICATION                                                 | PREREQUISITES | NAMESPACE                                  |
|-------------------------------|---------------------------------------------------------------|---------------|--------------------------------------------|
| ShipmentTypeAddressFormWidget | Enables shipment type selection during the checkout address step. | None          | SprykerShop\Yves\ShipmentTypeWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShipmentTypeWidget\Widget\ShipmentTypeAddressFormWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ShipmentTypeAddressFormWidget::class,
        ];
    }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the following widgets were registered:

| MODULE                         | TEST                                                                            |
|--------------------------------|---------------------------------------------------------------------------------|
| ShipmentTypeAddressFormWidget  | Go to **Address Checkout Step** and make sure that you can select shipment type. |

{% endinfo_block %}
