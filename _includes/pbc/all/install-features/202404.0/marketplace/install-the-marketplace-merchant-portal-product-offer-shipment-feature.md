

This document describes how to install the Marketplace Merchant Portal Product Offer Shipment feature.

## Prerequisites

Install the required features:

| NAME                         | VERSION          | INTEGRATION GUIDE                                                                                                                                                                                              |
|------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core | {{page.version}}  | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html)                       |
| Marketplace Merchant Portal Product Offer Management    | {{page.version}} | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-product-offer-management-feature.html) |
| Product Offer Shipment | {{page.version}} | [Install the Product Offer Shipment feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-product-offer-shipment-feature.html)                                  |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-offer-shipment-type-merchant-portal-gui:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOfferShipmentTypeMerchantPortalGui | spryker/product-offer-shipment-type-merchant-portal-gui |

{% endinfo_block %}

## 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                                 | DESCRIPTION                                                                                                 | PREREQUISITES | NAMESPACE                                                                                                |
|------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------------------|
| ShipmentTypeProductOfferFormExpanderPlugin                             | Expands `ProductOfferForm` with a `shipment-type` form field.                                                 |               | Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui |
| ShipmentTypeProductOfferFormViewExpanderPlugin                         | Expands the `ProductOfferForm` Twig template with a `shipment-type` form section.                                 |               | Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui |
| ShipmentTypeAclEntityConfigurationExpanderPlugin                       | Expands a provided `AclEntityMetadataConfig` transfer object with shipment type composite data.               |               | Spryker\Zed\ShipmentType\Communication\Plugin\AclMerchantPortal                                          |
| ProductOfferShipmentTypeAclEntityConfigurationExpanderPlugin           | Expands a provided `AclEntityMetadataConfig` transfer object with product offer shipment type composite data. |               | Spryker\Zed\ProductOfferShipmentType\Communication\Plugin\AclMerchantPortal                              |

**src/Pyz/Zed/ProductOfferMerchantPortalGui/ProductOfferMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOfferMerchantPortalGui;

use Spryker\Zed\ProductOfferMerchantPortalGui\ProductOfferMerchantPortalGuiDependencyProvider as SprykerProductOfferMerchantPortalGuiDependencyProvider;
use Spryker\Zed\ProductOfferShipmentTypeMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui\ShipmentTypeProductOfferFormExpanderPlugin;
use Spryker\Zed\ProductOfferShipmentTypeMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui\ShipmentTypeProductOfferFormViewExpanderPlugin;

class ProductOfferMerchantPortalGuiDependencyProvider extends SprykerProductOfferMerchantPortalGuiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ProductOfferMerchantPortalGuiExtension\Dependency\Plugin\ProductOfferFormExpanderPluginInterface>
     */
    protected function getProductOfferFormExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductOfferFormExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\ProductOfferMerchantPortalGuiExtension\Dependency\Plugin\ProductOfferFormViewExpanderPluginInterface>
     */
    protected function getProductOfferFormViewExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductOfferFormViewExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use Spryker\Zed\ProductOfferShipmentType\Communication\Plugin\AclMerchantPortal\ProductOfferShipmentTypeAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\ShipmentType\Communication\Plugin\AclMerchantPortal\ShipmentTypeAclEntityConfigurationExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\AclEntityConfigurationExpanderPluginInterface>
     */
    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            new ShipmentTypeAclEntityConfigurationExpanderPlugin(),
            new ProductOfferShipmentTypeAclEntityConfigurationExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

When creating and editing product offers in the Merchant Portal, make sure the following applies:


1. The **Shipment Types** pane is displayed.
2. All the shipment types in the system are available in the drop-down menu.
3. You can save the product offer after selecting shipment types.

<!-- For instructions on creating and editing product offers, see [Create and edit product offers]() |    add after merging-->


{% endinfo_block %}
