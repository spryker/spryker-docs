

This document describes how to install the Marketplace Merchant Portal Product Offer Service Points feature.

## Prerequisites

Install the required features:

| NAME                         | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                          |
|------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core | {{page.version}}  | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html)   |
| Marketplace Merchant Portal Product Offer Management    | {{page.version}} | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-product-offer-management-feature.html)                        |
| Marketplace Product Offer + Service Points | {{page.version}} | [Install the Marketplace Product Offer + Service Points feature](/docs/pbc/all/offer-management/{{page.version}}/unified-commerce/install-features/install-the-marketplace-product-offer-service-points-feature.html)             |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-offer-service-point-merchant-portal-gui:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOfferServicePointMerchantPortalGui | spryker/product-offer-service-point-merchant-portal-gui |

{% endinfo_block %}

## 2) Set up configuration

Deny Back Office access for Back Office users to the ProductOfferServicePointMerchantPortalGui module.

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

## 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                                 | DESCRIPTION                                                                                                 | PREREQUISITES | NAMESPACE                                                                                                |
|------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------------------|
| ServiceProductOfferFormExpanderPlugin                                  | Expands `ProductOfferForm` with `Service points` and `Services` fields.                                           |               | Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui |
| ServiceProductOfferFormViewExpanderPlugin                              | Expands the `ProductOfferForm` Twig template with the `Services` form section.                                       |               | Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\ProductOfferMerchantPortalGui |
| ProductOfferServicePointMerchantPortalGuiMerchantAclRuleExpanderPlugin | Adds `product-offer-service-point-merchant-portal-gui` to the list of `AclRules`.                               |               | Spryker\Zed\ProductOfferServicePointMerchantPortalGui\Communication\Plugin\AclMerchantPortal             |
| ServiceAclEntityConfigurationExpanderPlugin                            | Expands a provided `AclEntityMetadataConfig` transfer object with service point composite data.               |               | Spryker\Zed\ServicePoint\Communication\Plugin\AclMerchantPortal                                          |
| ProductOfferServicePointAclEntityConfigurationExpanderPlugin           | Expands a provided `AclEntityMetadataConfig` transfer object with product offer service point composite data. |               | Spryker\Zed\ProductOfferServicePoint\Communication\Plugin\AclMerchantPortal             |

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

When creating and editing product offers in the Merchant Portal, make sure the following applies:

- **SERVICE POINT** and **SERVICES** fields are displayed.
- For **SERVICE POINT**, you can search by service points.
- After selecting a service point, you can select services in the **SERVICES** drop-down menu.
- After adding services, you can save the product offer.

<!-- For instructions on creating and editing product offers, see [Create and edit product offers]() |    add after merging-->

{% endinfo_block %}
