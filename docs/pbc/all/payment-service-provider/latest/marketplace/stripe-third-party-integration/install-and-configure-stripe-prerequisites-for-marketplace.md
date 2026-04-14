---
title: Install and configure Stripe prerequisites for Marketplace
description: Learn how to prepare your Marketplace project for Stripe
last_updated: Apr 14, 2026
template: howto-guide-template
related:
  - title: Integrate Stripe
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html
  - title: Stripe for Marketplace
    link: docs/pbc/all/payment-service-provider/latest/marketplace/stripe-third-party-integration/stripe-for-marketplace.html
---

This document covers marketplace-specific additions to the base shop Stripe integration. Before following the steps below, complete [Integrate Stripe](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html), making sure to apply all steps marked as **marketplace only**.

{% info_block infoBox "OMS process" %}

In Step 3 of the base shop guide, use `StripeManualMarketplace01` instead of `StripeManual01`.

{% endinfo_block %}

## Add Merchant Portal navigation

Update `config/Zed/navigation.xml` to add the Payment Settings entry for merchants:

```xml
<?xml version="1.0"?>
<config>
    ...

    <merchant-portal-payment-settings>
        <label>Payment Settings</label>
        <title>Payment Settings</title>
        <icon>payment</icon>
        <bundle>merchant-app-merchant-portal-gui</bundle>
        <controller>payment-settings</controller>
        <action>index</action>
        <pages>
            <onboarding>
                <label>Onboarding</label>
                <title>Onboarding</title>
                <icon>payment</icon>
                <bundle>merchant-app-merchant-portal-gui</bundle>
                <controller>payment-settings</controller>
                <action>onboarding</action>
                <visible>0</visible>
            </onboarding>
        </pages>
    </merchant-portal-payment-settings>
</config>
```

## Register ACL plugins

Add the following plugins to the listed methods:

| PLUGIN | METHOD |
|--------|--------|
| `\Spryker\Zed\MerchantAppMerchantPortalGui\Communication\Plugin\AclMerchantPortal\MerchantAppMerchantPortalGuiMerchantAclRuleExpanderPlugin` | `\Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getMerchantAclRuleExpanderPlugins()` |
| `\Spryker\Zed\MerchantAppMerchantPortalGui\Communication\Plugin\AclMerchantPortal\MerchantAppAclEntityConfigurationExpanderPlugin` | `\Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getAclEntityConfigurationExpanderPlugins()` |
| `\Spryker\Zed\Payment\Communication\Plugin\AclMerchantPortal\PaymentAclEntityConfigurationExpanderPlugin` | `\Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getAclEntityConfigurationExpanderPlugins()` |
| `\Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\AclMerchantPortal\SalesPaymentMerchantAclEntityConfigurationExpanderPlugin` | `\Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getAclEntityConfigurationExpanderPlugins()` |

## Configure ACL installer rules

Add `merchant-app-merchant-portal-gui` to the Merchant Portal ACL deny rules:

<details>
  <summary>\Pyz\Zed\Acl\AclConfig::addMerchantPortalInstallerRules()</summary>

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Shared\Acl\AclConstants;
use Spryker\Zed\Acl\AclConfig as SprykerAclConfig;

class AclConfig extends SprykerAclConfig
{
    protected const RULE_TYPE_DENY = 'deny';

    /**
     * @return array<array<string, mixed>>
     */
    public function getInstallerRules(): array
    {
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
            'merchant-app-merchant-portal-gui',
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

</details>

## Enable redirect from third-party websites

To enable merchants to be redirected to the Merchant Portal from third-party websites, add `redirect.php` to the public folder of your Merchant Portal: [/public/MerchantPortal/redirect.php](https://github.com/spryker-shop/b2c-demo-marketplace/blob/master/public/MerchantPortal/redirect.php).

## Enable merchant commissions

To enable merchant commissions for payout calculation, [install the Marketplace Merchant Commission feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-feature.html).

## Next step

[Configure merchant transfers for Stripe](/docs/pbc/all/payment-service-provider/latest/marketplace/stripe-third-party-integration/configure-merchant-transfers-for-stripe.html)
