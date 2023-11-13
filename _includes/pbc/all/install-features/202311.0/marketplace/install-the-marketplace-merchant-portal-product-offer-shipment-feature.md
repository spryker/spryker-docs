

This document describes how to integrate the Marketplace Merchant Portal Product Offer Shipment feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Merchant Portal Product Offer Shipment feature core.

### Prerequisites

Install the required features:

| NAME                         | VERSION          | INTEGRATION GUIDE                                                                                                                                                                                              |
|------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core | {{page.version}}  | [Merchant Portal Core feature integration](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-the-marketplace-merchant-portal-core-feature.html)                       |
| Marketplace Merchant Portal Product Offer Management    | {{page.version}} | [Marketplace Product Offer feature integration](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-the-marketplace-merchant-portal-product-offer-management-feature.html) |
| Product Offer Shipment | {{page.version}} | [Install the Product Offer Shipment feature](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/install-and-upgrade/install-the-product-offer-shipment-feature.html)                                  |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-offer-shipment-type-merchant-portal-gui:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOfferShipmentTypeMerchantPortalGui | spryker/product-offer-shipment-type-merchant-portal-gui |

{% endinfo_block %}

### 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                                 | DESCRIPTION                                                                                                 | PREREQUISITES | NAMESPACE                                                                                                |
|------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------------------|
| ShipmentTypeProductOfferFormExpanderPlugin                             | Expands `ProductOfferForm` with `shipment-type` form field.                                                 |               | Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui |
| ShipmentTypeProductOfferFormViewExpanderPlugin                         | Expands `ProductOfferForm` Twig template with `shipment-type` form section.                                 |               | Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui |
| ShipmentTypeAclEntityConfigurationExpanderPlugin                       | Expands provided `AclEntityMetadataConfig` transfer object with shipment type composite data.               |               | Spryker\Zed\ShipmentType\Communication\Plugin\AclMerchantPortal                                          |
| ProductOfferShipmentTypeAclEntityConfigurationExpanderPlugin           | Expands provided `AclEntityMetadataConfig` transfer object with product offer shipment type composite data. |               | Spryker\Zed\ProductOfferShipmentType\Communication\Plugin\AclMerchantPortal                              |

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

- Log in to the Merchant Portal.
- Navigate to the **Offers** section in the navigation menu.
- Select the specific product offer you want to edit or create a new one if needed.
- Make sure that Shipment types field is displayed in Shipment types section when creating or editing an offer.
- Make sure that all the Shipment types available in the system are displayed in Shipment types field.
- Make sure you can save the selected Shipment types.

{% endinfo_block %}
