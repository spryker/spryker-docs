---
title: Permissions feature integration
description: The guide provides a step-by-step procedure to install the Permissions feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/permissions-feature-integration
originalArticleId: d694ce3f-d8ca-45a6-83df-b77ba6111f60
redirect_from:
  - /2021080/docs/permissions-feature-integration
  - /2021080/docs/en/permissions-feature-integration
  - /docs/permissions-feature-integration
  - /docs/en/permissions-feature-integration
---

The Permissions feature is shipped with following modules:

| MODULE | DESCRIPTION |
| --- | --- |
| [Permission](https://github.com/spryker/spryker-core/tree/master/Bundles/Permission) | Provides permissions support that can be used as a part of ACL / RBAC. |
| [PermissionExtension](https://github.com/spryker/spryker-core/tree/master/Bundles/PermissionExtension) | Holds a set of plugin interfaces that can be used as extension points of the Permission module. |

To install the feature, follow the steps below:

1. Install necessary modules using composer:

```bash
composer update "spryker/*" "spryker-shop/*"
composer require spryker/permission-extension:"^1.0.0" spryker/permission:"^1.0.0"
```

2. Add plugins to Zed `CustomerDependencyProvider`:


| MODULE | PLUGIN | DESCRIPTION | METHOD IN DEPENDENCY ROVIDER |
| --- | --- | --- | --- |
| CompanyRole | PermissionCustomerExpanderPlugin | Adds permissions to the company user. | getCustomerTransferExpanderPlugins |
| CompanyUser | CustomerTransferCompanyUserExpanderPlugin | Adds company user information to customer transfer. | getCustomerTransferExpanderPlugins |

**src/Pyz/Zed/Customer/CustomerDependencyProvider.php**

```php
namespace Pyz\Zed\Customer;

use Spryker\Zed\CompanyUser\Communication\Plugin\Customer\CustomerTransferCompanyUserExpanderPlugin;
use Spryker\Zed\CompanyRole\Communication\Plugin\PermissionCustomerExpanderPlugin;
use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;

class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{

    /**
     * @return \Spryker\Zed\Customer\Dependency\Plugin\CustomerTransferExpanderPluginInterface[]
     */
    protected function getCustomerTransferExpanderPlugins()
    {
        return [
            new PermissionCustomerExpanderPlugin(),
            new CustomerTransferCompanyUserExpanderPlugin()
        ];
    }
}
```

3. Synchronize permission plugins with storage:

Go to the Administration interface, **Maintenance** menu and click **Sync permissions**.
 
