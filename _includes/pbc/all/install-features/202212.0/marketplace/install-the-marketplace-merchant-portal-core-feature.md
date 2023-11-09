

This document describes how to integrate the Marketplace Merchant Portal Core feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal Core feature core.

### Prerequisites

Install the required features:

| NAME | VERSION          | INSTALLATION GUIDE |
| -------------------- |------------------| ---------|
| Spryker Core         | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Spryker Core BO      | {{page.version}} | [Install the Spryker Core Back Office feature](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-spryker-core-back-office-feature.html) |
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |
| Acl                  | {{page.version}} | [Install the ACL feature](/docs/pbc/all/user-management/{{page.version}}/base-shop/install-and-upgrade/install-the-acl-feature.html)                                                                    |

###  1) Install the required modules using Composer

```bash
composer require spryker-feature/marketplace-merchantportal-core:"{{page.version}}" --update-with-dependencies
```

```bash
composer require spryker/security-merchant-portal-gui-extension
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                             | EXPECTED DIRECTORY                               |
|------------------------------------|--------------------------------------------------|
| ZedUi                              | vendor/spryker/zed-ui                            |
| GuiTable                           | vendor/spryker/gui-table                         |
| AclMerchantPortal                  | vendor/spryker/acl-merchant-portal               |
| MerchantPortalApplication          | vendor/spryker/merchant-portal-application       |
| MerchantUserPasswordResetMail      | vendor/spryker/merchant-user-password-reset-mail |
| Navigation                         | vendor/spryker/navigation                        |
| SecurityMerchantPortalGui          | vendor/spryker/security-merchant-portal-gui      |
| UserMerchantPortalGui              | vendor/spryker/user-merchant-portal-gui          |
| UserMerchantPortalGuiExtension     | spryker/user-merchant-portal-gui-extension       |
| SecurityMerchantPortalGuiExtension | spryker/security-merchant-portal-gui-extension   |

{% endinfo_block %}

### 2) Set up the database schema

**src/Pyz/Zed/Merchant/Persistence/Propel/Schema/spy_merchant.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Merchant\Persistence" package="src.Orm.Zed.Merchant.Persistence">

  <table name="spy_merchant">
        <behavior name="event">
            <parameter name="spy_merchant-name" column="name"/>
            <parameter name="spy_merchant-is_active" column="is_active"/>
        </behavior>
        <behavior name="\Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior"/>
    </table>

</database>
```

**src/Pyz/Zed/MerchantUser/Persistence/Propel/Schema/spy_merchant_user.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\MerchantUser\Persistence" package="src.Orm.Zed.MerchantUser.Persistence">

    <table name="spy_merchant_user">
        <behavior name="\Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior"/>
    </table>

</database>
```

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

### 3) Set up behavior

Set up behavior as follows:

#### Integrate the following plugins:

| PLUGIN                                                                                              | SPECIFICATION                                                                                                                                                                                           | PREREQUISITES                          | NAMESPACE                                                                        |
|-----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|----------------------------------------------------------------------------------|
| MerchantUserSecurityPlugin                                                                          | Sets security firewalls (rules, handlers) for Marketplace users.                                                                                                                                        |                                        | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\Security              |
| BooleanToStringTwigPlugin                                                                           | Adds a new Twig function for converting Boolean to String.                                                                                                                                              |                                        | Spryker\Zed\ZedUi\Communication\Plugin\Twig                                      |
| ZedUiNavigationTwigPlugin   Adds a new Twig function for rendering Navigation using web components. |                                                                                                                                                                                                         | Spryker\Zed\ZedUi\Communication\Plugin |
| GuiTableApplicationPlugin                                                                           | Enables the `GuiTable` infrastructure for Zed.                                                                                                                                                                |                                        | Spryker\Zed\GuiTable\Communication\Plugin\Application                            |
| GuiTableConfigurationTwigPlugin                                                                     | Adds a new Twig function for rendering `GuiTableConfiguration` for the `GuiTable` web component.                                                                                                            |                                        | Spryker\Zed\GuiTable\Communication\Plugin\Twig                                   |
| SecurityTokenUpdateMerchantUserPostChangePlugin                                                     | Rewrites Symfony security token.                                                                                                                                                                        |                                        | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\UserMerchantPortalGui |
| MerchantPortalAclEntityMetadataConfigExpanderPlugin                                                 | Expands provided Acl Entity Metadata with merchant order composite, merchant product composite, merchant composite, product offer composit data, merchant read global entities, and allow list entities. |                                        | Spryker\Zed\AclMerchantPortal\Communication\Plugin\AclEntity                     |
| MerchantAclMerchantPostCreatePlugin                                                                 | Creates an ACL group, ACL role, ACL rules, ACL entity rules and ACL entity segment for a provided merchant.                                                                                                |                                        | Spryker\Zed\AclMerchantPortal\Communication\Plugin\Merchant                      |
| MerchantAclMerchantUserPostCreatePlugin                                                             | Creates ACL group, ACL role, ACL rules, ACL entity rules, and ACL entity segment for a provided merchant user.                                                                                          |                                        | Spryker\Zed\AclMerchantPortal\Communication\Plugin\MerchantUser                  |
| AclMerchantPortalMerchantUserRoleFilterPreConditionPlugin                                           | Checks if the Symfony security authentication roles should be filtered out.                                                                                                                             |                                        | Spryker\Zed\AclMerchantPortal\Communication\Plugin\MerchantUser                  |
| MerchantUserUserRoleFilterPlugin                                                                    | Filters `ROLE_BACK_OFFICE_USER` to prevent a merchant user from logging in to the Back Office.                                                                                                           |                                        | Spryker\Zed\MerchantUser\Communication\Plugin\SecurityGui                        |
| ProductViewerForOfferCreationAclInstallerPlugin                                                     | Provide `ProductViewerForOfferCreation` roles with rules and groups to create on installation.                                                                                                          |                                        | Spryker\Zed\AclMerchantPortal\Communication\Plugin\MerchantUser                  |
| AclGroupMerchantUserLoginRestrictionPlugin                                                          | Checks if the merchant user login is restricted.                                                                                                                                                        |                                        | Spryker\Zed\AclMerchantPortal\Communication\Plugin\SecurityMerchantPortalGui     |

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\GuiTable\Communication\Plugin\Twig\GuiTableConfigurationTwigPlugin;
use Spryker\Zed\ZedUi\Communication\Plugin\Twig\BooleanToStringTwigPlugin;
use Spryker\Zed\ZedUi\Communication\Plugin\ZedUiNavigationTwigPlugin;
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new ZedUiNavigationTwigPlugin(),
            new BooleanToStringTwigPlugin(),
            new GuiTableConfigurationTwigPlugin()
        ];
    }
}
```

**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\GuiTable\Communication\Plugin\Application\GuiTableApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{

    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [  
            new GuiTableApplicationPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Security/SecurityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Security;

use Spryker\Zed\Security\SecurityDependencyProvider as SprykerSecurityDependencyProvider;
use Spryker\Zed\SecurityGui\Communication\Plugin\Security\UserSecurityPlugin;
use Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\Security\MerchantUserSecurityPlugin;
use Spryker\Zed\User\Communication\Plugin\Security\UserSessionHandlerSecurityPlugin;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityPluginInterface>
     */
    protected function getSecurityPlugins(): array
    {
        return [
            new UserSessionHandlerSecurityPlugin(),
            new MerchantUserSecurityPlugin(),
            new UserSecurityPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SecurityGui/SecurityGuiDependencyProvider.php**

```php
<?php

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

{% info_block warningBox "Verification" %}

Ensure that merchant users or users whose Acl Group does not have Back Office allowed Acl Group Reference cannot log in to the Back Office.

{% endinfo_block %}

**src/Pyz/Zed/UserMerchantPortalGui/UserMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\UserMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\UserMerchantPortalGui\SecurityTokenUpdateMerchantUserPostChangePlugin;
use Spryker\Zed\UserMerchantPortalGui\UserMerchantPortalGuiDependencyProvider as SprykerUserMerchantPortalGuiDependencyProvider;

class UserMerchantPortalGuiDependencyProvider extends SprykerUserMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\UserMerchantPortalGuiExtension\Dependency\Plugin\MerchantUserPostChangePluginInterface>
     */
    public function getMerchantUserPostChangePlugins(): array
    {
        return [
            new SecurityTokenUpdateMerchantUserPostChangePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/AclEntity/AclEntityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AclEntity;

use Spryker\Zed\AclEntity\AclEntityDependencyProvider as SprykerAclEntityDependencyProvider;
use Spryker\Zed\AclMerchantPortal\Communication\Plugin\AclEntity\MerchantPortalAclEntityMetadataConfigExpanderPlugin;

class AclEntityDependencyProvider extends SprykerAclEntityDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityMetadataConfigExpanderPluginInterface>
     */
    protected function getAclEntityMetadataCollectionExpanderPlugins(): array
    {
        return [
            new MerchantPortalAclEntityMetadataConfigExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Merchant/MerchantDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Merchant;

use Spryker\Zed\AclMerchantPortal\Communication\Plugin\Merchant\MerchantAclMerchantPostCreatePlugin;
use Spryker\Zed\Merchant\MerchantDependencyProvider as SprykerMerchantDependencyProvider;

class MerchantDependencyProvider extends SprykerMerchantDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantPostCreatePluginInterface>
     */
    protected function getMerchantPostCreatePlugins(): array
    {
        return [
            new MerchantAclMerchantPostCreatePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/MerchantUser/MerchantUserDependencyProvider.php**

```php
<?php

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

{% info_block warningBox "Verification" %}

Ensure that non-merchant users whose Acl Group has *Back Office allowed Acl Group Reference* (see `AclMerchantPortalConfig::getBackofficeAllowedAclGroupReferences()`) can log in to the Back Office.

{% endinfo_block %}

**src/Pyz/Zed/Acl/AclDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Zed\Acl\AclDependencyProvider as SprykerAclDependencyProvider;
use Spryker\Zed\AclMerchantPortal\Communication\Plugin\MerchantUser\ProductViewerForOfferCreationAclInstallerPlugin;

class AclDependencyProvider extends SprykerAclDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AclExtension\Dependency\Plugin\AclInstallerPluginInterface>
     */
    protected function getAclInstallerPlugins(): array
    {
        return [
            new ProductViewerForOfferCreationAclInstallerPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SecurityMerchantPortalGui;

use Spryker\Zed\AclMerchantPortal\Communication\Plugin\SecurityMerchantPortalGui\AclGroupMerchantUserLoginRestrictionPlugin;
use Spryker\Zed\SecurityMerchantPortalGui\SecurityMerchantPortalGuiDependencyProvider as SprykerSecurityMerchantPortalGuiDependencyProvider;

class SecurityMerchantPortalGuiDependencyProvider extends SprykerSecurityMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SecurityMerchantPortalGuiExtension\Dependency\Plugin\MerchantUserLoginRestrictionPluginInterface>
     */
    protected function getMerchantUserLoginRestrictionPlugins(): array
    {
        return [
             new AclGroupMerchantUserLoginRestrictionPlugin(),
        ];
    }
}
```

#### Enable Merchant Portal infrastructural plugins

<details><summary markdown='span'>src/Pyz/Zed/MerchantPortalApplication/MerchantPortalApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\MerchantPortalApplication;

use Spryker\Zed\AclEntity\Communication\Plugin\Application\AclEntityApplicationPlugin;
use Spryker\Zed\ErrorHandler\Communication\Plugin\Application\ErrorHandlerApplicationPlugin;
use Spryker\Zed\EventDispatcher\Communication\Plugin\Application\EventDispatcherApplicationPlugin;
use Spryker\Zed\Form\Communication\Plugin\Application\FormApplicationPlugin;
use Spryker\Zed\GuiTable\Communication\Plugin\Application\GuiTableApplicationPlugin;
use Spryker\Zed\Http\Communication\Plugin\Application\HttpApplicationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Application\LocaleApplicationPlugin;
use Spryker\Zed\MerchantPortalApplication\MerchantPortalApplicationDependencyProvider as SprykerMerchantPortalApplicationDependencyProvider;
use Spryker\Zed\Messenger\Communication\Plugin\Application\MessengerApplicationPlugin;
use Spryker\Zed\Propel\Communication\Plugin\Application\PropelApplicationPlugin;
use Spryker\Zed\Router\Communication\Plugin\Application\MerchantPortalRouterApplicationPlugin;
use Spryker\Zed\Security\Communication\Plugin\Application\SecurityApplicationPlugin;
use Spryker\Zed\Session\Communication\Plugin\Application\SessionApplicationPlugin;
use Spryker\Zed\Translator\Communication\Plugin\Application\TranslatorApplicationPlugin;
use Spryker\Zed\Twig\Communication\Plugin\Application\TwigApplicationPlugin;
use Spryker\Zed\Validator\Communication\Plugin\Application\ValidatorApplicationPlugin;
use Spryker\Zed\ZedUi\Communication\Plugin\Application\ZedUiApplicationPlugin;

class MerchantPortalApplicationDependencyProvider extends SprykerMerchantPortalApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getMerchantPortalApplicationPlugins(): array
    {
        return [
            new SessionApplicationPlugin(),
            new TwigApplicationPlugin(),
            new EventDispatcherApplicationPlugin(),
            new LocaleApplicationPlugin(),
            new TranslatorApplicationPlugin(),
            new MessengerApplicationPlugin(),
            new PropelApplicationPlugin(),
            new MerchantPortalRouterApplicationPlugin(),
            new HttpApplicationPlugin(),
            new ErrorHandlerApplicationPlugin(),
            new FormApplicationPlugin(),
            new ValidatorApplicationPlugin(),
            new GuiTableApplicationPlugin(),
            new SecurityApplicationPlugin(),
            new ZedUiApplicationPlugin(),
            new AclEntityApplicationPlugin(),
        ];
    }
}
```

</details>

**src/Pyz/Zed/MerchantPortalApplication/Communication/Bootstrap/MerchantPortalBootstrap.php**

```php
<?php

namespace Pyz\Zed\MerchantPortalApplication\Communication\Bootstrap;

use Spryker\Zed\MerchantPortalApplication\Communication\Bootstrap\MerchantPortalBootstrap as MerchantPortalApplicationBootstrap;

class MerchantPortalBootstrap extends MerchantPortalApplicationBootstrap
{
}
```

**src/Pyz/Zed/MerchantPortalApplication/Communication/MerchantPortalApplicationCommunicationFactory.php**

```php
<?php

namespace Pyz\Zed\MerchantPortalApplication\Communication;

use Spryker\Zed\MerchantPortalApplication\Communication\MerchantPortalApplicationCommunicationFactory as SprykerMerchantPortalApplicationCommunicationFactory;

class MerchantPortalApplicationCommunicationFactory extends SprykerMerchantPortalApplicationCommunicationFactory
{
}
```

**src/Pyz/Zed/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Router;

use Spryker\Zed\Router\Communication\Plugin\Router\MerchantPortalRouterPlugin;
use Spryker\Zed\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array|array<\Spryker\Zed\RouterExtension\Dependency\Plugin\RouterPluginInterface>
     */
    protected function getMerchantPortalRouterPlugins(): array
    {
        return [
            new MerchantPortalRouterPlugin()
        ];
    }
}
```

Open access to the Merchant Portal login page by default:

**config/Shared/config_default.php**

```php
<?php

$config[AclConstants::ACL_DEFAULT_RULES][] = [
    [
        'bundle' => 'security-merchant-portal-gui',
        'controller' => 'login',
        'action' => 'index',
        'type' => 'allow',
    ],
];
```

Add a console command for warming up the *Merchant Portal* router cache:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Router\Communication\Plugin\Console\MerchantPortalRouterCacheWarmUpConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            new MerchantPortalRouterCacheWarmUpConsole(),
        ];

        return $commands;
    }
}
```

**config/install/docker.yml**

```yaml
env:
    NEW_RELIC_ENABLED: 0

sections:
    build:
        router-cache-warmup-merchant-portal:
            command: 'vendor/bin/console router:cache:warm-up:merchant-portal'
```

### 4) Set up transfer objects

Generate transfer objects:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER                                | TYPE  | EVENT   | PATH                                                                          |
|-----------------------------------------|-------|---------|-------------------------------------------------------------------------------|
| GuiTableDataRequest                     | class | Created | src/Generated/Shared/Transfer/GuiTableDataRequestTransfer                     |
| GuiTableConfiguration                   | class | Created | src/Generated/Shared/Transfer/GuiTableConfigurationTransfer                   |
| GuiTableColumnConfiguration             | class | Created | src/Generated/Shared/Transfer/GuiTableColumnConfigurationTransfer             |
| GuiTableTitleConfiguration              | class | Created | src/Generated/Shared/Transfer/GuiTableTitleConfigurationTransfer              |
| GuiTableDataSourceConfiguration         | class | Created | src/Generated/Shared/Transfer/GuiTableDataSourceConfigurationTransfer         |
| GuiTableRowActionsConfiguration         | class | Created | src/Generated/Shared/Transfer/GuiTableRowActionsConfigurationTransfer         |
| GuiTableBatchActionsConfiguration       | class | Created | src/Generated/Shared/Transfer/GuiTableBatchActionsConfigurationTransfer       |
| GuiTablePaginationConfiguration         | class | Created | src/Generated/Shared/Transfer/GuiTablePaginationConfigurationTransfer         |
| GuiTableSearchConfiguration             | class | Created | src/Generated/Shared/Transfer/GuiTableSearchConfigurationTransfer             |
| GuiTableFiltersConfiguration            | class | Created | src/Generated/Shared/Transfer/GuiTableFiltersConfigurationTransfer            |
| GuiTableItemSelectionConfiguration      | class | Created | src/Generated/Shared/Transfer/GuiTableItemSelectionConfigurationTransfer      |
| GuiTableSyncStateUrlConfiguration       | class | Created | src/Generated/Shared/Transfer/GuiTableSyncStateUrlConfigurationTransfer       |
| GuiTableEditableConfiguration           | class | Created | src/Generated/Shared/Transfer/GuiTableEditableConfigurationTransfer           |
| GuiTableEditableCreateConfiguration     | class | Created | src/Generated/Shared/Transfer/GuiTableEditableCreateConfigurationTransfer     |
| GuiTableEditableUpdateConfiguration     | class | Created | src/Generated/Shared/Transfer/GuiTableEditableUpdateConfigurationTransfer     |
| GuiTableEditableButton                  | class | Created | src/Generated/Shared/Transfer/GuiTableEditableButtonTransfer                  |
| GuiTableEditableUrl                     | class | Created | src/Generated/Shared/Transfer/GuiTableEditableUrlTransfer                     |
| GuiTableEditableInitialData             | class | Created | src/Generated/Shared/Transfer/GuiTableEditableInitialDataTransfer             |
| GuiTableEditableDataError               | class | Created | src/Generated/Shared/Transfer/GuiTableEditableDataErrorTransfer               |
| GuiTableDataResponse                    | class | Created | src/Generated/Shared/Transfer/GuiTableDataResponseTransfer                    |
| GuiTableRowDataResponse                 | class | Created | src/Generated/Shared/Transfer/GuiTableRowDataResponseTransfer                 |
| GuiTableDataResponsePayload             | class | Created | src/Generated/Shared/Transfer/GuiTableDataResponsePayloadTransfer             |
| SelectGuiTableFilterTypeOptions         | class | Created | src/Generated/Shared/Transfer/SelectGuiTableFilterTypeOptionsTransfer         |
| OptionSelectGuiTableFilterTypeOptions   | class | Created | src/Generated/Shared/Transfer/OptionSelectGuiTableFilterTypeOptionsTransfer   |
| GuiTableFilter                          | class | Created | src/Generated/Shared/Transfer/GuiTableFilterTransfer                          |
| GuiTableRowAction                       | class | Created | src/Generated/Shared/Transfer/GuiTableRowActionTransfer                       |
| GuiTableRowActionOptions                | class | Created | src/Generated/Shared/Transfer/GuiTableRowActionOptionsTransfer                |
| DateRangeGuiTableFilterTypeOptions      | class | Created | src/Generated/Shared/Transfer/DateRangeGuiTableFilterTypeOptionsTransfer      |
| CriteriaRangeFilter                     | class | Created | src/Generated/Shared/Transfer/CriteriaRangeFilterTransfer                     |
| GuiTableBatchAction                     | class | Created | src/Generated/Shared/Transfer/GuiTableBatchActionTransfer                     |
| GuiTableBatchActionOptions              | class | Created | src/Generated/Shared/Transfer/GuiTableBatchActionOptionsTransfer              |
| GuiTableColumnConfiguratorConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableColumnConfiguratorConfigurationTransfer |
| ZedUiFormResponseAction                 | class | Created | src/Generated/Shared/Transfer/ZedUiFormResponseActionTransfer                 |

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Merchant Portal Core feature frontend.

### Prerequisites

Environment requirements:
- [Node.js](https://nodejs.org/en/download/): minimum version is 16.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/): minimum version is 8.

Spryker requirements:

To start builder integration, check versions of Spryker packages:

| NAME                        | VERSION   |
|-----------------------------|-----------|
| Discount (optional)         | >= 9.7.4  |
| Gui (optional)              | >= 3.30.2 |
| Product Relation (optional) | >= 2.4.3  |

### 1) Install the required modules using Composer

```bash
composer require spryker/dashboard-merchant-portal-gui:"^1.4.0" --update-with-dependencies
```

| MODULE                              | EXPECTED DIRECTORY                                     |
|-------------------------------------|--------------------------------------------------------|
| DashboardMerchantPortalGui          | vendor/spryker/dashboard-merchant-portal-gui           |
| DashboardMerchantPortalGuiExtension | vendor/spryker/dashboard-merchant-portal-gui-extension |

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER                      | TYPE   | EVENT   | PATH                                                                |
|-------------------------------|--------|---------|---------------------------------------------------------------------|
| MerchantDashboardCard         | object | Created | src/Generated/Shared/Transfer/MerchantDashboardCardTransfer         |
| MerchantDashboardActionButton | object | Created | src/Generated/Shared/Transfer/MerchantDashboardActionButtonTransfer |

{% endinfo_block %}

### 3) Build navigation cache

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure that Merchant Portal has the **Dashboard** menu.

{% endinfo_block %}

### 4) Set up Marketplace builder configs

1. Add the following files to the root folder:

```bash
wget -O angular.json https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/angular.json
wget -O nx.json https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/nx.json
wget -O .browserslistrc https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/.browserslistrc
```

2. Rename default `tsconfig.json` to `tsconfig.base.json`. Create additional `tsconfig` files (`tsconfig.yves.json`, `tsconfig.mp.json`)

```bash
mv tsconfig.json tsconfig.base.json
wget -O tsconfig.yves.json https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/tsconfig.yves.json
wget -O tsconfig.mp.json https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/tsconfig.mp.json
```

3. Add `vendor/**` and `**/node_modules/**` to exclude option in `tslint.json`.

4. Add the `tslint.mp.json` file:

```bash
wget -O tslint.mp.json https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/tslint.mp.json
```

5. Install npm dependencies:

```bash
npm i @angular/animations@~12.2.16 @angular/cdk@~12.2.16 @angular/common@~12.2.16 @angular/compiler@~12.2.16 @angular/core@~12.2.16 @angular/elements@~12.2.16 @angular/forms@~12.2.16 @angular/platform-browser@~12.2.16 @angular/platform-browser-dynamic@~12.2.16 @angular/router@~12.2.16 @webcomponents/custom-elements@~1.3.1 @webcomponents/webcomponents-platform@~1.0.1 @webcomponents/webcomponentsjs@~2.4.0 rxjs@~7.4.0 zone.js@~0.11.4
```

6. Install npm dev dependencies:

```bash
npm i -D @angular-builders/custom-webpack@~12.1.3 @angular-devkit/build-angular@~12.2.16 @angular/cli@~12.2.16 @angular/compiler-cli@~12.2.16 @angular/language-service@~12.2.16 @babel/plugin-proposal-class-properties@~7.10.4 @babel/plugin-transform-runtime@~7.10.5 @babel/preset-typescript@~7.10.4 @jsdevtools/file-path-filter@~3.0.2 @nrwl/cli@~12.10.1 @nrwl/jest@~12.10.1 @nrwl/tao@~12.10.1 @nrwl/workspace@~12.10.1 @spryker/oryx-for-zed@~2.11.3 @types/jest@~27.0.2 @types/node@~14.14.33 @types/webpack@~4.41.17 jest@~27.2.3 jest-preset-angular@~9.0.3 node-sass@~4.14.1 npm-run-all@~4.1.5 rimraf@~3.0.2 ts-jest@~27.0.5 ts-node@~9.1.1 tslib@~2.0.0 typescript@~4.2.4
```

7. Update `package.json` with the following fields:

**package.json**

```json
{
    "workspaces": [
        "vendor/spryker/*",
        "vendor/spryker/*/assets/Zed"
    ],
    "scripts": {
        "mp:build": "ng build",
        "mp:build:watch": "ng build --watch",
        "mp:build:production": "ng build --prod",
        "mp:test": "ng test",
        "mp:lint": "ng lint",
        "mp:clean": "run-s mp:clean:*",
        "mp:clean:dist": "rimraf public/MerchantPortal/assets/js",
        "mp:update:paths": "node ./frontend/merchant-portal/update-config-paths",
        "postinstall": "npm run mp:update:paths"
    },
    "engines": {
        "node": ">=16.0.0",
        "npm": ">=8.0.0"
    }
}
```

8. For Yves, in the `globalSettings.paths` object, update `frontend/settings.js` to point to an updated `tsconfig`:

**frontend/settings.js**

```js
const globalSettings = {
    ...
    paths: {
        tsConfig: './tsconfig.yves.json',
        ...
    }
};
```

9. Run commands from the root of the project:

```bash
npm i -g @angular/cli@12.2.16
```

`ng --version` should show Angular CLI: 12.2.16 version.

10. Install project dependencies:

```bash
npm install
```

{% info_block warningBox "Warning" %}

If you're getting `Missing write access to node_modules/mp-profile`, delete this *file* and make a *folder* with the same name.

{% endinfo_block %}

Check if the marketplace packages are located in the `node_modules/@spryker` folder—for example, utils.

### 5) Install Marketplace builder

Add the `merchant-portal` folder and builder files:

```bash
mkdir frontend/merchant-portal
wget -O frontend/merchant-portal/entry-points.js https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/frontend/merchant-portal/entry-points.js
wget -O frontend/merchant-portal/html-transform.js https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/frontend/merchant-portal/html-transform.js
wget -O frontend/merchant-portal/jest.config.js https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/frontend/merchant-portal/jest.config.js
wget -O frontend/merchant-portal/jest.preset.js https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/frontend/merchant-portal/jest.preset.js
wget -O frontend/merchant-portal/mp-paths.js https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/frontend/merchant-portal/mp-paths.js
wget -O frontend/merchant-portal/test-setup.ts https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/frontend/merchant-portal/test-setup.ts
wget -O frontend/merchant-portal/tsconfig.spec.json https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/frontend/merchant-portal/tsconfig.spec.json
wget -O frontend/merchant-portal/update-config-paths.js https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/frontend/merchant-portal/update-config-paths.js
wget -O frontend/merchant-portal/utils.js https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/frontend/merchant-portal/utils.js
wget -O frontend/merchant-portal/webpack.config.ts https://raw.githubusercontent.com/spryker-shop/suite/1.9.0/frontend/merchant-portal/webpack.config.ts
```

### 6) Add files for the Merchant Portal entry point:

**public/MerchantPortal/index.php**

```php
<?php

use Pyz\Zed\MerchantPortalApplication\Communication\Bootstrap\MerchantPortalBootstrap;
use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;

define('APPLICATION', 'MERCHANT_PORTAL');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

Environment::initialize();

$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();

$bootstrap = new MerchantPortalBootstrap();
$bootstrap
    ->boot()
    ->run();
```

**public/MerchantPortal/maintenance/index.html**

```html
<!DOCTYPE html>
<html lang="en-US" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Spryker Merchant Portal - Maintenance</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link href="http://fonts.googleapis.com/css?family=PT+Mono" rel="stylesheet" type="text/css" />
    </head>
    <style>
        body {
            font-family: 'PT Mono', sans-serif;
        }
        #so-doc {
            margin: 0 auto;
            width: 960px;
        }
    </style>
    <body>
        <div id="so-doc">
            <div>
                <pre>
                PAGE UNDER CONSTRUCTION!

                Come back in a few minutes...
                </pre>
            </div>
        </div>
    </body>
</html>
```

**public/MerchantPortal/maintenance/maintenance.php**

```php
<?php

/**
 * Copyright © 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See the LICENSE file.
 */

if (file_exists(__DIR__ . '/maintenance.marker')) {
    http_response_code(503);
    echo file_get_contents(__DIR__ . '/index.html');
    exit(1);
}
```

**src/Pyz/Zed/ZedUi/Presentation/Components/app/app.module.ts**

```ts
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DefaultMerchantPortalConfigModule, RootMerchantPortalModule } from '@mp/zed-ui';
import { DefaultTableConfigModule } from '@mp/gui-table';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RootMerchantPortalModule,
        DefaultMerchantPortalConfigModule,
        DefaultTableConfigModule,
    ],
})
export class AppModule extends RootMerchantPortalModule {}
```

**src/Pyz/Zed/ZedUi/Presentation/Components/environments/environment.prod.ts**

```ts
export const environment = {
    production: true,
};
```

**src/Pyz/Zed/ZedUi/Presentation/Components/environments/environment.ts**

```ts
export const environment = {
    production: false,
};
```

**src/Pyz/Zed/ZedUi/Presentation/Components/index.html**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>ZedUi</title>
        <base href="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body></body>
</html>
```

**src/Pyz/Zed/ZedUi/Presentation/Components/main.ts**

```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    /* tslint:disable-next-line: no-console */
    .catch((error) => console.error(error));
```

**src/Pyz/Zed/ZedUi/Presentation/Components/polyfills.ts**

```ts
import '@mp/polyfills';
```

{% info_block warningBox "Verification" %}

Ensure that `npm run mp:build` passes successfully. If it doesn't work, try the full rebuild:
```bash
rm -rf node_modules && npm cache clean --force && npm install && npm run mp:build`
```

{% endinfo_block %}

### 6) Adjust deployment configs

To configure deployment configuration to automatically install and build Merchant Portal, change frontend dependencies and installation commands in the deployment YAML:

1. Remove existing Yves dependencies' installation commands from deployment Yaml: `dependencies-install` and `yves-isntall-dependencies`.
2. Add required console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\SetupFrontend\Communication\Console\MerchantPortalBuildFrontendConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            new MerchantPortalBuildFrontendConsole(),
        ];

        return $commands;
    }
}
```

3. Add the Merchant Portal build command:

   1. build-static-production:
    ```yaml
    merchant-portal-build-frontend:
        command: 'vendor/bin/console frontend:mp:build -e production'
        timeout: 1600
    ```

   2. build-static-development:
    ```yaml
    merchant-portal-build-frontend:
        command: 'vendor/bin/console frontend:mp:build'
        timeout: 1600
    ```

## Adjust environment infrastructure

It's not safe to expose `MerchantPortal` next to the Back Office. `MerchantPortal` *must not have* OS, DNS name, VirtualHost settings, FileSystem, and service credentials shared with Zed.

### 1) Set up a new virtual machine/docker container dedicated to MerchantPortal

`MerchantPortal` *must be* placed into its own private subnet.

`MerchantPortal` *must have* access to the following:

- Primary Database
- Message broker

`MerchantPortal` *must not have* access to the following:

- Search and Storage
- Gateway
- Scheduler

**deploy.dev.yml**

```yaml
...
image:
    ...
    node:
        version: 16
        npm: 8
...
groups:
    EU:
        region: EU
        applications:
            merchant_portal_eu:
                application: merchant-portal
                endpoints:
                    mp.de.spryker.local:
                        entry-point: MerchantPortal
                        store: DE
                        primal: true
                        services:
                            session:
                                namespace: 7
                    mp.at.spryker.local:
                        entry-point: MerchantPortal
                        store: AT
                        services:
                            session:
                                namespace: 8
    US:
        region: US
        applications:
            merchant_portal_us:
                application: merchant-portal
                endpoints:
                    mp.us.spryker.local:
                        entry-point: MerchantPortal
                        store: US
                        services:
                            session:
                                namespace: 9
```

### 2) Create a dedicated database user

Grant only default CRUD operations: `INSERT`, `DELETE`, `UPDATE`, and `SELECT`. Do not grant `ALL PRIVILEGES`, `GRANT OPTION`, `DROP`, `CREATE`, and other admin-related grants.

The following code snippet example is for MySQL:

```mysql
CREATE USER 'merchantportal'@'localhost' IDENTIFIED BY '{your_merchantportal_password}'; // YOU MUST CHANGE THE PASSWORD.
GRANT SELECT, INSERT, UPDATE, DELETE ON your_app_schema.* TO 'merchantportal'@'localhost';
FLUSH PRIVILEGES;
```

### 3) Create a new Nginx web server configuration

The following is an example of an Nginx configuration:

**/etc/nginx/merchant-portal.conf**

```nginx
server {
    # { Your virtual host settings }

    # Allow /assets/js/mp assets to be served only
    location ~ (/assets/js/mp|/favicon.ico|/robots.txt) {
        access_log        off;
        expires           30d;
        add_header Pragma public;
        add_header Cache-Control "public, must-revalidate, proxy-revalidate";
        try_files $uri =404;
    }

   # Allow /marchant-portal-gui pages to be served only
   location ~ ^/[a-z-]+-merchant-portal-gui {
        add_header X-Server $hostname;
        fastcgi_pass { YOUR_FASTCGI_PASS };
        fastcgi_index index.php;
        include /etc/nginx/fastcgi_params;
        fastcgi_param SCRIPT_NAME /index.php;
        fastcgi_param APPLICATION_ENV $application_env;
        fastcgi_param APPLICATION_STORE $application_store;
        fastcgi_param SCRIPT_FILENAME  $document_root/index.php;

        # Credentials of the newly created DB user.
        fastcgi_param SPRYKER_DB_USERNAME merchantportal;
        fastcgi_param SPRYKER_DB_PASSWORD '{your_merchantportal_password}';


        more_clear_headers 'X-Powered-By' 'X-Store' 'X-Locale' 'X-Env' 'Server';
    }
}
```

After modifying the Nginx config, apply the new `config:f`:

```bash
sudo service nginx reload
```

{% info_block warningBox "Verification" %}

Make sure to use environment variables in `config-default.php`:

**config/Shared/config_default.php**

```php
<?php

// other code

$config[PropelConstants::ZED_DB_USERNAME] = getenv('SPRYKER_DB_USERNAME');
$config[PropelConstants::ZED_DB_PASSWORD] = getenv('SPRYKER_DB_PASSWORD');
```

{% endinfo_block %}

The following page now shows the login page for MerchantPortal: `https://your-merchant-portal.domain/security-merchant-portal-gui/login`.

{% info_block warningBox "Verification" %}

Make sure the following pages do not open: `https://your-merchant-portal.domain/security-gui/login`, `https://your-merchant-portal.domain/`.

{% endinfo_block %}

### 4) Register modules in ACL

Add new modules to installer rules:

**src/Pyz/Zed/Acl/AclConfig.php**

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Shared\Acl\AclConstants;
use Spryker\Zed\Acl\AclConfig as SprykerAclConfig;

class AclConfig extends SprykerAclConfig
{
    /**
     * @param array<array<string>> $installerRules
     *
     * @return array<array<string>>
     */
    protected function addMerchantPortalInstallerRules(array $installerRules): array
    {
        $bundleNames = [
            'user-merchant-portal-gui',
            'dashboard-merchant-portal-gui',
            'security-merchant-portal-gui',
        ];

        foreach ($bundleNames as $bundleName) {
            $array<installerRules> = [
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

{% info_block warningBox "Verification" %}

Make sure that after executing `console setup:init-db`, the `user-merchant-portal-gui` rule is present in the `spy_acl_rule` table.

{% endinfo_block %}

### 5) Update navigation

Add the `My Account` and `Logout` sections to `navigation-secondary.xml`:

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

Log in to the Merchant Portal and make sure that when clicking on the profile picture, the **My Account** and **Logout** buttons are visible in the overlay of the secondary navigation.

{% endinfo_block %}

## Install related features

Integrate the following related features:

| FEATURE         | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE                                                                                                                                  |
|-----------------|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Merchant Portal | &check;                          | [Merchant Portal feature integration ](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-the-merchant-portal.html) |
