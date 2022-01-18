---
title: Marketplace Merchant Portal Security feature integration
last_updated: Jan 18, 2022
description: This document describes how to integrate the Merchant Portal Security feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Merchant Portal Security feature into a Spryker project.

## Install feature core

Follow the steps below to install the {Feature Name} feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| -------------------- | ---------- | ---------|
| Spryker Core         | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Spryker Core BO      | {{page.version}} | [Spryker Core Back Office feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-back-office-feature-integration.html) |
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |
| Acl | {{page.version}} | [ACL feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/acl-feature-integration.html) |

###  1) Install the required modules using Composer

Install the required modules:

```bash
{commands to install the required modules}
```
Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| AclMerchantPortal   | vendor/spryker/acl-merchant-portal  |
| MerchantUser   | vendor/spryker/merchant-user  |
| MerchantUserExtension   | vendor/spryker/merchant-user-extension  |
| SecurityGui  | vendor/spryker/security-gui  |
| SecurityGuiExtension   | vendor/spryker/security-gui-extension  |

### 2) Set up behavior

Set up behavior as follows:


Set up behavior as follows:

#### 1. Integrate the following plugins:

| PLUGIN | SPECIFICATION                                                                                                                               | PREREQUISITES | NAMESPACE                                                      |
| ----------- |---------------------------------------------------------------------------------------------------------------------------------------------| ------------- |----------------------------------------------------------------|
| AclMerchantPortalMerchantUserRoleFilterPreConditionPlugin | Checks if the filtered role is not configured as Backoffice login authentication role and if the user has ACL group with Backoffice access. |  | Spryker\Zed\AclMerchantPortal\Communication\Plugin\MerchantUser |
| MerchantUserUserRoleFilterPlugin | Filters Backoffice Auth Role to prevent Merchant User login to Backoffice.                                                                  |  | Spryker\Zed\MerchantUser\Communication\Plugin\SecurityGui      |


**src/Pyz/Zed/MerchantUser/MerchantUserDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantUser;

use Spryker\Zed\AclMerchantPortal\Communication\Plugin\MerchantUser\AclMerchantPortalMerchantUserRoleFilterPreConditionPlugin;
use Spryker\Zed\AclMerchantPortal\Communication\Plugin\MerchantUser\MerchantAclMerchantUserPostCreatePlugin;
use Spryker\Zed\MerchantUser\MerchantUserDependencyProvider as SprykerMerchantUserDependencyProvider;

class MerchantUserDependencyProvider extends SprykerMerchantUserDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MerchantUserExtension\Dependency\Plugin\MerchantUserPostCreatePluginInterface>
     */
    protected function getMerchantUserPostCreatePlugins(): array
    {
        return [
            new MerchantAclMerchantUserPostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MerchantUserExtension\Dependency\Plugin\MerchantUserRoleFilterPreConditionPluginInterface>
     */
    protected function getMerchantUserRoleFilterPreConditionPlugins(): array
    {
        return [
            new AclMerchantPortalMerchantUserRoleFilterPreConditionPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SecurityGui/SecurityGuiDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SecurityGui;

use Spryker\Zed\MerchantUser\Communication\Plugin\SecurityGui\MerchantUserUserRoleFilterPlugin;
use Spryker\Zed\SecurityGui\SecurityGuiDependencyProvider as SprykerSecurityGuiDependencyProvider;

class SecurityGuiDependencyProvider extends SprykerSecurityGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SecurityGuiExtension\Dependency\Plugin\UserRoleFilterPluginInterface>
     */
    protected function getUserRoleFilterPlugins(): array
    {
        return [
            new MerchantUserUserRoleFilterPlugin(),
        ];
    }
}
```

## Related features

Integrate the following related features and Glue APIs:

| NAME        | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| -------------- |----------------------------------| ----------------- |
| Spryker Core         | | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Spryker Core BO      | | [Spryker Core Back Office feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-back-office-feature-integration.html) |
| Marketplace Merchant | | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |
| Acl | | [ACL feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/acl-feature-integration.html) |
