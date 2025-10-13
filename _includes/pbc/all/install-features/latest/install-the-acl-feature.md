This document describes how to install the ACL feature.

## Prerequisites

Install the required features:

| NAME                     | VERSION          | INSTALLATION GUIDE                                                                                                                                                  |
|--------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core             | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)         |
| Spryker Core Back Office | 202507.0 | [Install the Spryker Core Back Office feature](/docs/pbc/all/identity-access-management/latest/install-and-upgrade/install-the-spryker-core-back-office-feature.html) |

## 1) Install the required modules

```bash
composer require spryker-feature/acl:"202507.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE            | REQUIRED             | EXPECTED DIRECTORY                    |
|-------------------|-------------|---------------------------------------|
| Acl                |   v         | vendor/spryker/acl                    |
| AclDataImport      |   v         | vendor/spryker/acl-data-import        |
| AclEntity          |     v       | vendor/spryker/acl-entity             |
| AclEntityDataImport     |    v   | vendor/spryker/acl-entity-data-import |
| AclEntityExtension  |            | vendor/spryker/acl-entity-extension   |
| AclExtension         |    v       | vendor/spryker/acl-extension          |

{% endinfo_block %}

## 2) Set up the database schema

Apply database changes and to generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied to the database:

| DATABASE ENTITY          | TYPE  | EVENT   |
|--------------------------|-------|---------|
| spy_acl_role             | table | created |
| spy_acl_rule             | table | created |
| spy_acl_group            | table | created |
| spy_acl_user_has_group   | table | created |
| spy_acl_groups_has_roles | table | created |
| spy_acl_entity_segment   | table | created |
| spy_acl_entity_rule      | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                          | TYPE   | EVENT   | PATH                                                                    |
|-----------------------------------|--------|---------|-------------------------------------------------------------------------|
| Group                             | object | Created | src/Generated/Shared/Transfer/GroupTransfer                             |
| AclEntityRule                     | object | Created | src/Generated/Shared/Transfer/AclEntityRuleTransfer                     |
| AclEntitySegment                  | object | Created | src/Generated/Shared/Transfer/AclEntitySegmentTransfer                  |
| AclEntitySegmentRequest           | object | Created | src/Generated/Shared/Transfer/AclEntitySegmentRequestTransfer           |
| AclEntityRuleRequest              | object | Created | src/Generated/Shared/Transfer/AclEntityRuleRequestTransfer              |
| AclEntityRuleCollection           | object | Created | src/Generated/Shared/Transfer/AclEntityRuleCollectionTransfer           |
| AclEntitySegmentResponse          | object | Created | src/Generated/Shared/Transfer/AclEntitySegmentResponseTransfer          |
| AclEntitySegmentCriteria          | object | Created | src/Generated/Shared/Transfer/AclEntitySegmentCriteriaTransfer          |
| AclEntityRuleCriteria             | object | Created | src/Generated/Shared/Transfer/AclEntityRuleCriteriaTransfer             |
| AclEntityRuleResponse             | object | Created | src/Generated/Shared/Transfer/AclEntityRuleResponseTransfer             |
| AclEntityMetadata                 | object | Created | src/Generated/Shared/Transfer/AclEntityMetadataTransfer                 |
| AclEntityParentMetadata           | object | Created | src/Generated/Shared/Transfer/AclEntityParentMetadataTransfer           |
| AclEntityParentConnectionMetadata | object | Created | src/Generated/Shared/Transfer/AclEntityParentConnectionMetadataTransfer |
| AclEntityMetadataCollection       | object | Created | src/Generated/Shared/Transfer/AclEntityMetadataCollectionTransfer       |
| AclEntityMetadataConfig           | object | Created | src/Generated/Shared/Transfer/AclEntityMetadataConfigTransfer           |
| AclRoleCriteria                   | object | Created | src/Generated/Shared/Transfer/AclRoleCriteriaTransfer                   |
| GroupCriteria                     | object | Created | src/Generated/Shared/Transfer/GroupCriteriaTransfer                     |
| Groups                            | object | Created | src/Generated/Shared/Transfer/GroupsTransfer                            |
| Role                              | object | Created | src/Generated/Shared/Transfer/RoleTransfer                              |
| Roles                             | object | Created | src/Generated/Shared/Transfer/RolesTransfer                             |
| Rule                              | object | Created | src/Generated/Shared/Transfer/RuleTransfer                              |
| Rules                             | object | Created | src/Generated/Shared/Transfer/Transfer                                  |
| User                              | object | Created | src/Generated/Shared/Transfer/UserTransfer                              |
| NavigationItem                    | object | Created | src/Generated/Shared/Transfer/NavigationItemTransfer                    |
| NavigationItemCollection          | object | Created | src/Generated/Shared/Transfer/NavigationItemCollection                  |
| AclUserHasGroupCollection         | object | Created | src/Generated/Shared/Transfer/AclUserHasGroupCollection                 |
| AclUserHasGroup                   | object | Created | src/Generated/Shared/Transfer/AclUserHasGroup                           |
| AclUserHasGroupCriteria           | object | Created | src/Generated/Shared/Transfer/AclUserHasGroupCriteria                   |
| AclUserHasGroupConditions         | object | Created | src/Generated/Shared/Transfer/AclUserHasGroupConditions                 |

{% endinfo_block %}

## 4) Import the ACL groups and roles

1. Prepare your data according to your requirements using our demo data:

**data/import/common/common/acl_group.csv**

```csv
name,reference
root_group,root_group
```

| COLUMN    | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                                                     |
|-----------|----------|-----------|--------------|----------------------------------------------------------------------|
| name      | ✓        | string    | root_group   | The name of the ACL group.                                           |
| reference | x        | string    | root_group   | Key of the ACL group that is used as a reference in the data import. |

**data/import/common/common/acl_role.csv**

```csv
name,reference
root_role,root_role
```

| COLUMN    | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                                                    |
|-----------|----------|-----------|--------------|---------------------------------------------------------------------|
| name      | ✓        | string    | root_role    | The name of the ACL role.                                           |
| reference | x        | string    | root_role    | Key of the ACL role that is used as a reference in the data import. |

**data/import/common/common/acl_group_role.csv**

```csv
group_name,role_name
root_group,root_role
```

| COLUMN     | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION           |
|------------|----------|-----------|--------------|----------------------------|
| group_name | ✓        | string    | root_group   | The name of the ACL group. |
| role_name  | ✓        | string    | root_role    | The name of the ACL role.  |

2. Extend the data import configuration:

**/data/import/local/full_EU.yml**

```yaml
# ...

# Acl import
- data_entity: acl-role
  source: data/import/common/common/acl_role.csv
- data_entity: acl-group
  source: data/import/common/common/acl_group.csv
- data_entity: acl-group-role
  source: data/import/common/common/acl_group_role.csv
```

3. Register the following data import plugins:

| PLUGIN                       | SPECIFICATION                                                                  | PREREQUISITES | NAMESPACE                                       |
|------------------------------|--------------------------------------------------------------------------------|---------------|-------------------------------------------------|
| AclGroupDataImportPlugin     | Imports ACL group data from the specified file.                                |           | \Spryker\Zed\AclDataImport\Communication\Plugin |
| AclRoleDataImportPlugin      | Imports ACL role data from the specified file.                                 |           | \Spryker\Zed\AclDataImport\Communication\Plugin |
| AclGroupRoleDataImportPlugin | Imports the connections between ACL roles and ACL groups from the specified file. |           | \Spryker\Zed\AclDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\AclDataImport\Communication\Plugin\AclGroupDataImportPlugin;
use Spryker\Zed\AclDataImport\Communication\Plugin\AclGroupRoleDataImportPlugin;
use Spryker\Zed\AclDataImport\Communication\Plugin\AclRoleDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new AclGroupDataImportPlugin(),
            new AclRoleDataImportPlugin(),
            new AclGroupRoleDataImportPlugin(),
        ];
    }
}
```

4. Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\AclDataImport\AclDataImportConfig;
use Spryker\Zed\AclMerchantPortal\Communication\Console\AclEntitySynchronizeConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . AclDataImportConfig::IMPORT_TYPE_ACL_GROUP),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . AclDataImportConfig::IMPORT_TYPE_ACL_ROLE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . AclDataImportConfig::IMPORT_TYPE_ACL_GROUP_ROLE),
            new AclEntitySynchronizeConsole(),
        ];

        return $commands;
    }
}
```

4. Import the data:

```bash
console data:import:data:import:acl-role
console data:import:data:import:acl-group
console data:import:data:import:acl-group-role
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the following database tables:
- `spy_acl_group`
- `spy_acl_role`
- `spy_acl_groups_has_roles`

{% endinfo_block %}

5. Synchronize the ACL entities for the merchants and their users:

```bash
console acl:entity:synchronize
```

{% info_block warningBox "Verification" %}

Make sure the synchronized data has been added to the following database tables:
- `spy_acl_entity_rule`
- `spy_acl_entity_segment`
- `spy_acl_entity_segment_merchant`
- `spy_acl_entity_segment_merchant_user`
- `spy_acl_group`
- `spy_acl_groups_has_roles`
- `spy_acl_role`
- `spy_acl_rule`

With a multi-merchant environment, make sure the ACL entities are synchronized for each merchant.
If the ACL entities have already been synchronized, the synchronization process doesn't create duplicate entries.

{% endinfo_block %}

## 5) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                  | DESCRIPTION                                                                                                                                      | PREREQUISITES | NAMESPACE                                              |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------|
| AccessControlEventDispatcherPlugin      | Adds a listener to `\Symfony\Component\HttpKernel\KernelEvents::REQUEST`, which checks if the user is allowed to access the current resource. |               | Spryker\Zed\Acl\Communication\Plugin\EventDispatcher   |
| AclNavigationItemCollectionFilterPlugin | Checks if the navigation item can be accessed by the current user.                                                                               |               | Spryker\Zed\Acl\Communication\Plugin\Navigation        |
| AclInstallerPlugin                      | Fills the database  with required ACL data.                                                                                                            |               | Spryker\Zed\Acl\Communication\Plugin                   |
| GroupPlugin                             | Provides ACL groups for user.                                                                                                                    |               | Spryker\Zed\Acl\Communication\Plugin                   |
| AclEntityAclRolePostSavePlugin          | Saves `RoleTransfer.aclEntityRules` to the database.                                                                                                 |               | Spryker\Zed\AclEntity\Communication\Plugin\Acl         |
| AclRulesAclRolesExpanderPlugin          | Expands the `Roles` transfer object with ACL rules.                                                                                                  |               | Spryker\Zed\AclEntity\Communication\Plugin\Acl         |
| AclEntityApplicationPlugin              | Enables ACL for the whole Application.                                                                                                           |               | Spryker\Zed\AclEntity\Communication\Plugin\Application |

**src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Zed\Acl\Communication\Plugin\EventDispatcher\AccessControlEventDispatcherPlugin;
use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
    * @return array<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
    */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new AccessControlEventDispatcherPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ZedNavigation/ZedNavigationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ZedNavigation;

use Spryker\Zed\Acl\Communication\Plugin\Navigation\AclNavigationItemCollectionFilterPlugin;
use Spryker\Zed\ZedNavigation\ZedNavigationDependencyProvider as SprykerZedNavigationDependencyProvider;

class ZedNavigationDependencyProvider extends SprykerZedNavigationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ZedNavigationExtension\Dependency\Plugin\NavigationItemCollectionFilterPluginInterface>
     */
    protected function getNavigationItemCollectionFilterPlugins(): array
    {
        return [
            new AclNavigationItemCollectionFilterPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Acl\Communication\Plugin\AclInstallerPlugin;
use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface>
     */
    public function getInstallerPlugins()
    {
        return [
            new AclInstallerPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/User/UserDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\User;

use Spryker\Zed\Acl\Communication\Plugin\GroupPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\User\UserDependencyProvider as SprykerUserDependencyProvider;

class InstallerDependencyProvider extends SprykerUserDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addGroupPlugin(Container $container)
    {
        $container->set(static::PLUGIN_GROUP, function (Container $container) {
            return new GroupPlugin();
        });

        return $container;
    }
}
```

**src/Pyz/Zed/Acl/AclDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Zed\Acl\AclDependencyProvider as SprykerAclDependencyProvider;
use Spryker\Zed\AclEntity\Communication\Plugin\Acl\AclEntityAclRolePostSavePlugin;
use Spryker\Zed\AclEntity\Communication\Plugin\Acl\AclRulesAclRolesExpanderPlugin;

class AclDependencyProvider extends SprykerAclDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AclExtension\Dependency\Plugin\AclRolesExpanderPluginInterface>
     */
    protected function getAclRolesExpanderPlugins(): array
    {
        return [
            new AclRulesAclRolesExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\AclExtension\Dependency\Plugin\AclRolePostSavePluginInterface>
     */
    protected function getAclRolePostSavePlugins(): array
    {
        return [
            new AclEntityAclRolePostSavePlugin(),
        ];
    }
}
```

2. To enable the ACL Entity feature for `MerchantPortalApplication`, register the `AclEntityApplicationPlugin` plugin. The ACL Entity feature lets you manage access to the entities of different merchants separately.

**src/Pyz/Zed/MerchantPortalApplication/MerchantPortalApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantPortalApplication;

use Spryker\Zed\AclEntity\Communication\Plugin\Application\AclEntityApplicationPlugin;
use Spryker\Zed\MerchantPortalApplication\MerchantPortalApplicationDependencyProvider as SprykerMerchantPortalApplicationDependencyProvider;

class MerchantPortalApplicationDependencyProvider extends SprykerMerchantPortalApplicationDependencyProvider
{
   /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getMerchantPortalApplicationPlugins(): array
    {
        return [
            new AclEntityApplicationPlugin(),
        ];
    }
}
```

## 6) Install the database data for ACL

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

Make sure the following works correctly:

- The request to access the Merchant Portal doesn't succeed for users without permissions.
- A marketplace user can see only the allowed Merchant Portal menu links.
- `spy_acl_role`, `spy_acl_group`, and `spy_acl_user_has_group` tables contain default data.
- You can edit a user's ACL groups when [editing users in the Back Office](/docs/pbc/all/user-management/latest/base-shop/manage-in-the-back-office/manage-users/edit-users.html).
- When a `RoleTransfer` is saved and contains `AclEntityRules`, `AclEntityRule` is created in `spy_acl_entity_rule`.
- `RolesTransfer` contains the needed `AclEntityRules`.
- Users without permissions to access an entity or endpoint can't access them.

{% endinfo_block %}
