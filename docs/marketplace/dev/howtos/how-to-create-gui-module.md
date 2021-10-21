---
title: "How-To: Create a new GUI module"
description: This articles provides details how to create a new GUI module
template: howto-guide-template
---

This articles provides details how to create a new GUI module and add it to navigation

Follow the [Marketplace Merchant Portal Core feature integration guide](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-portal-core-feature-integration.html) 
to install the Marketplace Merchant Portal Core feature providing ``ZedUi``, ``Navigation`` and ACL related modules.

## 1) Create a new module

Create a new folder ``Pyz\Zed\ExampleMerchantPortalGui`` with a controller and corresponding Twig template:

**src/Pyz/Zed/ExampleMerchantPortalGui/Communication/Controller/ExampleController.php**
```php
<?php

namespace Pyz\Zed\ExampleMerchantPortalGui\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;

class ExampleController extends AbstractController
{
    /**
     * @return array
     */
    public function indexAction()
    {
        return $this->viewResponse();
    }
}
```

**src/Pyz/Zed/ExampleMerchantPortalGui/Presentation/Test/index.twig**
{% raw %}
```twig
{% extends '@ZedUi/Layout/merchant-layout-main.twig' %}
{% import _self as view %}

{% block headTitle %}
    {{ 'Test page' | trans }}
{% endblock %}

{% block content %}
    Test content
{% endblock %}

```
{% endraw %}

## 2) ACL rules

Adjust ``Spryker\Zed\AclMerchantPortal\AclMerchantPortalConfig::getMerchantAclRoleRules()`` - add a newly introduced module to allowed bundles list.

```php
    public function getMerchantAclRoleRules(): array
    {
        $bundleNames = [
            'dashboard-merchant-portal-gui',
            'merchant-profile-merchant-portal-gui',
            'product-offer-merchant-portal-gui',
            'product-merchant-portal-gui',
            'sales-merchant-portal-gui',
            'dummy-merchant-portal-gui',
            'example-merchant-portal-gui',
        ];

        $ruleTransfers = [];

        foreach ($bundleNames as $bundleName) {
            $ruleTransfers[] = (new RuleTransfer())
                ->setBundle($bundleName)
                ->setController(static::RULE_VALIDATOR_WILDCARD)
                ->setAction(static::RULE_VALIDATOR_WILDCARD)
                ->setType(static::RULE_TYPE_ALLOW);
        }

        return $ruleTransfers;
    }
```

Add a new merchant to ``merchant.csv`` data import file and run:

```bash
console data:import merchant
```

{% info_block warningBox "Verification" %}

Check ``spy_acl_rule`` DB table and make sure that ACL rules for ``example-merchant-portal-gui`` bundle are introduced for a new merchant.

{% endinfo_block %}

Adjust ``Pyz\Zed\Acl\AclConfig::getInstallerRules()`` to disallow ``example-merchant-portal-gui`` bundle in order to 
deny access for Back-office users.

```php
    public function getInstallerRules()
    {
        $installerRules = parent::getInstallerRules();
        $installerRules = $this->addMerchantPortalInstallerRules($installerRules);

        return $installerRules;
    }

    protected function addMerchantPortalInstallerRules(array $installerRules): array
    {
        $bundleNames = [
            'dashboard-merchant-portal-gui',
            'merchant-profile-merchant-portal-gui',
            'product-merchant-portal-gui',
            'product-offer-merchant-portal-gui',
            'security-merchant-portal-gui',
            'sales-merchant-portal-gui',
            'user-merchant-portal-gui',
            'dummy-merchant-portal-gui',
            'example-merchant-portal-gui',
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
```

## 3) Navigation

Adjust ``config/Zed/navigation.xml`` with a link for a new page:

**config/Zed/navigation.xml**
```xml
<config>

    <example>
        <label>Example</label>
        <title>Example</title>
        <bundle>example-merchant-portal-gui</bundle>
        <controller>example</controller>
        <action>index</action>
        <icon>fa-chart-area</icon>
    </example>
    
</config>
```

Execute a console command to add a new navigation item:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Login as a new merchant, go to any Merchant portal page, make sure a new navigation item is presented and leads to a newly introduced page.

{% endinfo_block %}

## See also

- [GUI modules concept](/docs/marketplace/dev/back-end/marketplace-merchant-portal-core-feature/gui-modules-concept.html)
