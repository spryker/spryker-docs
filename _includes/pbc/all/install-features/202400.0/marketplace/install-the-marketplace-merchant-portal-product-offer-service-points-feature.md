

This document describes how to integrate the Marketplace Merchant Portal Product Offer Service Points feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Merchant Portal Product Offer Service Points feature core.

### Prerequisites

Install the required features:

| NAME                         | VERSION          | INTEGRATION GUIDE                                                                                                                                                                                          |
|------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core | {{page.version}}  | [Merchant Portal Core feature integration](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-the-marketplace-merchant-portal-core-feature.html)   |
| Marketplace Merchant Portal Product Offer Management    | {{page.version}} | [Marketplace Product Offer feature integration](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-the-marketplace-merchant-portal-product-offer-management-feature.html)                        |
| Marketplace Product Offer + Service Points | {{page.version}} | [Install the Marketplace Product Offer + Service Points feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-the-marketplace-product-offer-service-points-feature.html)             |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-offer-service-point-merchant-portal-gui:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOfferServicePointMerchantPortalGui | spryker/product-offer-service-point-merchant-portal-gui |

{% endinfo_block %}

### 2) Set up configuration

Deny Backoffice access for Backoffice users to ProductOfferServicePointMerchantPortalGui module.

**src/Pyz/Zed/Acl/AclConfig.php**

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Shared\Acl\AclConstants;
use Spryker\Zed\Acl\AclConfig as SprykerAclConfig;

class AclConfig extends SprykerAclConfig
{
    /**
     * @return array<array<string, mixed>>
     */
    public function getInstallerRules(): array
    {
        $installerRules = parent::getInstallerRules();
        $installerRules = $this->addMerchantPortalInstallerRules($installerRules);
        
        return $installerRules;
    }
    
    /**
     * @param array<array<string, mixed>> $installerRules
     *
     * @return array<array<string, mixed>>
     */
    protected function addMerchantPortalInstallerRules(array $installerRules): array
    {
        $bundleNames = [
            'product-offer-service-point-merchant-portal-gui',
        ];

        foreach ($bundleNames as $bundleName) {
            $installerRules[] = [
                'bundle' => $bundleName,
                'controller' => AclConstants::VALIDATOR_WILDCARD,
                'action' => AclConstants::VALIDATOR_WILDCARD,
                'type' => static::RULE_TYPE_DENY,
                'role' => AclConstants::ROOT_ROLE,
            ];
        }
        return $installerRules;
    }
}
```

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                                 | DESCRIPTION                                                                                                 | PREREQUISITES | NAMESPACE                                                                                                |
|------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------------------|
| ServiceProductOfferFormExpanderPlugin                                  | Expands `ProductOfferForm` with Service Point and Service fields.                                           |               | Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui |
| ServiceProductOfferFormViewExpanderPlugin                              | Expands `ProductOfferForm` Twig template with `service` form section.                                       |               | Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui |
| ProductOfferServicePointMerchantPortalGuiMerchantAclRuleExpanderPlugin | Adds `product-offer-service-point-merchant-portal-gui` to list of `AclRules`.                               |               | Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\AclMerchantPortal             |
| ServiceAclEntityConfigurationExpanderPlugin                            | Expands provided `AclEntityMetadataConfig` transfer object with service point composite data.               |               | Spryker\Zed\ServicePoint\Communication\Plugin\AclMerchantPortal                                          |
| ProductOfferServicePointAclEntityConfigurationExpanderPlugin           | Expands provided `AclEntityMetadataConfig` transfer object with product offer service point composite data. |               | Spryker\Zed\ProductOfferServicePoint\Communication\Plugin\AclMerchantPortal             |

**src/Pyz/Zed/ProductOfferMerchantPortalGui/ProductOfferMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOfferMerchantPortalGui;

use Spryker\Zed\ProductOfferMerchantPortalGui\ProductOfferMerchantPortalGuiDependencyProvider as SprykerProductOfferMerchantPortalGuiDependencyProvider;
use Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui\ServiceProductOfferFormExpanderPlugin;
use Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui\ServiceProductOfferFormViewExpanderPlugin;

class ProductOfferMerchantPortalGuiDependencyProvider extends SprykerProductOfferMerchantPortalGuiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ProductOfferMerchantPortalGuiExtension\Dependency\Plugin\ProductOfferFormExpanderPluginInterface>
     */
    protected function getProductOfferFormExpanderPlugins(): array
    {
        return [
            new ServiceProductOfferFormExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\ProductOfferMerchantPortalGuiExtension\Dependency\Plugin\ProductOfferFormViewExpanderPluginInterface>
     */
    protected function getProductOfferFormViewExpanderPlugins(): array
    {
        return [
            new ServiceProductOfferFormViewExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use Spryker\Zed\ProductOfferServicePoint\Communication\Plugin\AclMerchantPortal\ProductOfferServicePointAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\AclMerchantPortal\ProductOfferServicePointMerchantPortalGuiMerchantAclRuleExpanderPlugin;
use Spryker\Zed\ServicePoint\Communication\Plugin\AclMerchantPortal\ServiceAclEntityConfigurationExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\MerchantAclRuleExpanderPluginInterface>
     */
    protected function getMerchantAclRuleExpanderPlugins(): array
    {
        return [
            new ProductOfferServicePointMerchantPortalGuiMerchantAclRuleExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\AclEntityConfigurationExpanderPluginInterface>
     */
    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            new ServiceAclEntityConfigurationExpanderPlugin(),
            new ProductOfferServicePointAclEntityConfigurationExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

- Log in to the Merchant Portal.
- Navigate to the **Offers** section in the navigation menu.
- Select the specific product offer you want to edit or create a new one if needed.
- Make sure that Service Points and Services fields are displayed in their own section when creating or editing an offer.
- Make sure you can search by Service Points and the corresponding services associated with the selected Service Point are displayed in Services field.
- Make sure you can save the selected Services.

{% endinfo_block %}
