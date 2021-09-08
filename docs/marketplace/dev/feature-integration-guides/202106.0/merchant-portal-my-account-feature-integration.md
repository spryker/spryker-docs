---
title: Merchant Portal My Account feature integration
last_updated: Jul 26, 2021
description: This document describes the process how to integrate the Merchant Portal My Account feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Portal - Marketplace Product My Account feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Product My Account feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME  | VERSION | INTEGRATION GUIDE |
| --------------- | --------- | ------------|
| Marketplace Merchant Portal Core | dev-master  | [Merchant Portal Core feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-merchant-portal-core-feature-integration.html)

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/user-merchant-portal-gui:"dev-master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE  | EXPECTED DIRECTORY  |
| ------------- | --------------- |
| UserMerchantPortalGui | spryker/user-merchant-portal-gui |
| UserMerchantPortalGuiExtension | spryker/user-merchant-portal-gui-extension |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

### 3) Set up behavior

To set up behavior, take the following steps.

#### Set security token for MerchantUser

Activate the following plugins:

| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE |
| --------------- | ------------ | ----------- | ------------ |
| SecurityTokenUpdateMerchantUserPostChangePlugin | Rewrites Symfony security token. |  | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\UserMerchantPortalGui |

**src/Pyz/Zed/UserMerchantPortalGui/UserMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\UserMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\UserMerchantPortalGui\SecurityTokenUpdateMerchantUserPostChangePlugin;
use Spryker\Zed\UserMerchantPortalGui\UserMerchantPortalGuiDependencyProvider as SprykerUserMerchantPortalGuiDependencyProvider;

class UserMerchantPortalGuiDependencyProvider extends SprykerUserMerchantPortalGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\UserMerchantPortalGuiExtension\Dependency\Plugin\MerchantUserPostChangePluginInterface[]
     */
    public function getMerchantUserPostChangePlugins(): array
    {
        return [
            new SecurityTokenUpdateMerchantUserPostChangePlugin(),
        ];
    }
}
```

### 4) Register UserMerchantPortalGui in ACL

Add bundle `'user-merchant-portal-gui'` to installer rules:


**src/Pyz/Zed/Acl/AclConfig.php**

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Shared\Acl\AclConstants;
use Spryker\Zed\Acl\AclConfig as SprykerAclConfig;

class AclConfig extends SprykerAclConfig
{
    /**
     * @param string[][] $installerRules
     *
     * @return string[][]
     */
    protected function addMerchantPortalInstallerRules(array $installerRules): array
    {
        $bundleNames = [
            'user-merchant-portal-gui',
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

**src/Pyz/Zed/MerchantUser/MerchantUserConfig.php**

```php
<?php

namespace Pyz\Zed\MerchantUser;

use Generated\Shared\Transfer\RuleTransfer;
use Spryker\Zed\MerchantUser\MerchantUserConfig as SprykerMerchantUserConfig;

class MerchantUserConfig extends SprykerMerchantUserConfig
{
    /**
     * @return \Generated\Shared\Transfer\RuleTransfer[]
     */
    protected function getAllowedBundlesAclRules(): array
    {
        $bundleNames = [
            'user-merchant-portal-gui',
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
}
```

{% info_block warningBox "Verification" %}

Make sure that after executing `console setup:init-db`, the `'user-merchant-portal-gui'` rule is present in the `spy_acl_rule` table.

{% endinfo_block %}

### 5) Update navigation

Remove the Logout button from the `navigation.xml`

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
<!-- To be removed: -->
    <security-merchant-portal-gui>
        <label>Logout</label>
        <title>Logout</title>
        <icon>logout</icon>
        <bundle>security-merchant-portal-gui</bundle>
        <controller>logout</controller>
        <action>index</action>
    </security-merchant-portal-gui>
</config>
```

Add MyAccount and Logout section to `navigation-secondary.xml`:

**config/Zed/navigation-secondary.xml**

```xml
<?xml version="1.0"?>
<config>
    <my-account>
        <label>My Account</label>
        <title>My Account</title>
        <bundle>user-merchant-portal-gui</bundle>
        <controller>my-account</controller>
        <action>index</action>
    </my-account>
    <logout>
        <label>Logout</label>
        <title>Logout</title>
        <bundle>security-merchant-portal-gui</bundle>
        <controller>logout</controller>
        <action>index</action>
        <type>danger</type>
    </logout>
</config>
```

Execute the following command:
```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Log in to the **Merchant Portal** and make sure that the MyAccount and Logout button are visible in the overlay of the secondary navigation, when clicking on the profile picture.

{% endinfo_block %}
