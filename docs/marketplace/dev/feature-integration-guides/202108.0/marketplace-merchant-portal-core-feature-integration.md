---
title: Marketplace Merchant Portal Core feature integration
last_updated: Oct 19, 2021
description: This document describes how to integrate the Merchant Portal Core feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Merchant Portal Core feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal Core feature core.

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
composer require spryker-feature/marketplace-merchantportal-core:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ZedUi  | vendor/spryker/zed-ui |
| GuiTable | vendor/spryker/gui-table |
| AclMerchantPortal   | vendor/spryker/acl-merchant-portal  |
| MerchantPortalApplication   | vendor/spryker/merchant-portal-application  |
| MerchantUserPasswordResetMail   | vendor/spryker/merchant-user-password-reset-mail  |
| Navigation   | vendor/spryker/navigation  |
| SecurityMerchantPortalGui  | vendor/spryker/security-merchant-portal-gui |
| UserMerchantPortalGui | vendor/spryker/user-merchant-portal-gui |
| UserMerchantPortalGuiExtension | spryker/user-merchant-portal-gui-extension |

{% endinfo_block %}

### 2) Set up behavior

Set up behavior as follows:

#### 1. Integrate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ----------- | ------------ | ------------- | --------- |
| MerchantUserSecurityPlugin | Sets security firewalls (rules, handlers) for Marketplace users. |  | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\Security |
| BooleanToStringTwigPlugin  | Adds a new Twig function for converting Boolean to String |  | Spryker\Zed\ZedUi\Communication\Plugin\Twig  |
| ZedUiNavigationTwigPlugin  | Adds a new Twig function for rendering Navigation using web components |  | Spryker\Zed\ZedUi\Communication\Plugin |
| GuiTableApplicationPlugin | Enables GuiTable infrastructure for Zed |  | Spryker\Zed\GuiTable\Communication\Plugin\Application |
| GuiTableConfigurationTwigPlugin | Adds a new Twig function for rendering GuiTableConfiguration for the GuiTable web component |  | Spryker\Zed\GuiTable\Communication\Plugin\Twig  |
| SecurityTokenUpdateMerchantUserPostChangePlugin | Rewrites Symfony security token |  | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\UserMerchantPortalGui  |
| MerchantPortalAclEntityMetadataConfigExpanderPlugin |Expands provided Acl Entity Metadata with merchant order composite, merchant product composite, merchant composite, product offer composit data, merchant read global entities and allow list entities |  | Spryker\Zed\AclMerchantPortal\Communication\Plugin\AclEntity |
| MerchantAclMerchantPostCreatePlugin | Creates ACL group, ACL role, ACL rules, ACL entity rules and ACL entity segment for provided merchant  |  | Spryker\Zed\AclMerchantPortal\Communication\Plugin\Merchant  |
| MerchantAclMerchantUserPostCreatePlugin | Creates ACL group, ACL role, ACL rules, ACL entity rules and ACL entity segment for provided merchant user |  | Spryker\Zed\AclMerchantPortal\Communication\Plugin\MerchantUser  |
| ProductViewerForOfferCreationAclInstallerPlugin | Provide ProductViewerForOfferCreation Roles with Rules and Groups to create on install |  | Spryker\Zed\AclMerchantPortal\Communication\Plugin\MerchantUser  |

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
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
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
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
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
use Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\Security\MerchantUserSecurityPlugin;
use Spryker\Zed\User\Communication\Plugin\Security\UserSessionHandlerSecurityPlugin;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    /**
     * @return \Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityPluginInterface[]
     */
    protected function getSecurityPlugins(): array
    {
        return [
            new UserSessionHandlerSecurityPlugin(),
            new MerchantUserSecurityPlugin(),
        ];
    }
}
```

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

**src/Pyz/Zed/AclEntity/AclEntityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AclEntity;

use Spryker\Zed\AclEntity\AclEntityDependencyProvider as SprykerAclEntityDependencyProvider;
use Spryker\Zed\AclMerchantPortal\Communication\Plugin\AclEntity\MerchantPortalAclEntityMetadataConfigExpanderPlugin;

class AclEntityDependencyProvider extends SprykerAclEntityDependencyProvider
{
    /**
     * @return \Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityMetadataConfigExpanderPluginInterface[]
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
     * @return \Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantPostCreatePluginInterface[]
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

use Spryker\Zed\AclMerchantPortal\Communication\Plugin\MerchantUser\MerchantAclMerchantUserPostCreatePlugin;
use Spryker\Zed\MerchantUser\MerchantUserDependencyProvider as SprykerMerchantUserDependencyProvider;

class MerchantUserDependencyProvider extends SprykerMerchantUserDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantUserExtension\Dependency\Plugin\MerchantUserPostCreatePluginInterface[]
     */
    protected function getMerchantUserPostCreatePlugins(): array
    {
        return [
            new MerchantAclMerchantUserPostCreatePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Acl/AclDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Zed\Acl\AclDependencyProvider as SprykerAclDependencyProvider;
use Spryker\Zed\AclMerchantPortal\Communication\Plugin\MerchantUser\ProductViewerForOfferCreationAclInstallerPlugin;

class AclDependencyProvider extends SprykerAclDependencyProvider
{
    /**
     * @return \Spryker\Zed\AclExtension\Dependency\Plugin\AclInstallerPluginInterface[]
     */
    protected function getAclInstallerPlugins(): array
    {
        return [
            new ProductViewerForOfferCreationAclInstallerPlugin(),
        ];
    }
}
```

#### 2. Enable Merchant Portal infrastructural plugins.

**src/Pyz/Zed/Acl/AclDependencyProvider.php**

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
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
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

Open access to the *Merchant Portal* login page by default:

**config/Shared/config_default.php**

```php
<?php

$config[AclConstants::ACL_DEFAULT_RULES] = [
  [
    'bundle' => 'security-merchant-portal-gui',
    'controller' => 'login',
    'action' => 'index',
    'type' => 'allow',
  ],

];
```

### 3) Set up transfer objects

Generate transfer objects:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
| ----------- | ----- | ------- | -------------------- |
| MerchantDashboardCard | class | created | src/Generated/Shared/Transfer/MerchantDashboardCardTransfer  |
| MerchantDashboardActionButton | class | created | src/Generated/Shared/Transfer/MerchantDashboardActionButtonTransfer |
| GuiTableDataRequest | class | Created | src/Generated/Shared/Transfer/GuiTableDataRequestTransfer |
| GuiTableConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableConfigurationTransfer |
| GuiTableColumnConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableColumnConfigurationTransfer |
| GuiTableTitleConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableTitleConfigurationTransfer |
| GuiTableDataSourceConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableDataSourceConfigurationTransfer |
| GuiTableRowActionsConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableRowActionsConfigurationTransfer |
| GuiTableBatchActionsConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableBatchActionsConfigurationTransfer |
| GuiTablePaginationConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTablePaginationConfigurationTransfer |
| GuiTableSearchConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableSearchConfigurationTransfer |
| GuiTableFiltersConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableFiltersConfigurationTransfer |
| GuiTableItemSelectionConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableItemSelectionConfigurationTransfer |
| GuiTableSyncStateUrlConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableSyncStateUrlConfigurationTransfer |
| GuiTableEditableConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableEditableConfigurationTransfer |
| GuiTableEditableCreateConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableEditableCreateConfigurationTransfer |
| GuiTableEditableUpdateConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableEditableUpdateConfigurationTransfer |
| GuiTableEditableButton | class | Created | src/Generated/Shared/Transfer/GuiTableEditableButtonTransfer |
| GuiTableEditableUrl | class | Created | src/Generated/Shared/Transfer/GuiTableEditableUrlTransfer |
| GuiTableEditableInitialData | class | Created | src/Generated/Shared/Transfer/GuiTableEditableInitialDataTransfer |
| GuiTableEditableDataError | class | Created | src/Generated/Shared/Transfer/GuiTableEditableDataErrorTransfer |
| GuiTableDataResponse | class | Created | src/Generated/Shared/Transfer/GuiTableDataResponseTransfer |
| GuiTableRowDataResponse | class | Created | src/Generated/Shared/Transfer/GuiTableRowDataResponseTransfer |
| GuiTableDataResponsePayload | class | Created | src/Generated/Shared/Transfer/GuiTableDataResponsePayloadTransfer |
| SelectGuiTableFilterTypeOptions | class | Created | src/Generated/Shared/Transfer/SelectGuiTableFilterTypeOptionsTransfer |
| OptionSelectGuiTableFilterTypeOptions | class | Created | src/Generated/Shared/Transfer/OptionSelectGuiTableFilterTypeOptionsTransfer |
| GuiTableFilter | class | Created | src/Generated/Shared/Transfer/GuiTableFilterTransfer |
| GuiTableRowAction | class | Created | src/Generated/Shared/Transfer/GuiTableRowActionTransfer |
| GuiTableRowActionOptions | class | Created | src/Generated/Shared/Transfer/GuiTableRowActionOptionsTransfer |
| DateRangeGuiTableFilterTypeOptions | class | Created | src/Generated/Shared/Transfer/DateRangeGuiTableFilterTypeOptionsTransfer |
| CriteriaRangeFilter | class | Created | src/Generated/Shared/Transfer/CriteriaRangeFilterTransfer |
| GuiTableBatchAction | class | Created | src/Generated/Shared/Transfer/GuiTableBatchActionTransfer |
| GuiTableBatchActionOptions | class | Created | src/Generated/Shared/Transfer/GuiTableBatchActionOptionsTransfer |
| GuiTableColumnConfiguratorConfiguration | class | Created | src/Generated/Shared/Transfer/GuiTableColumnConfiguratorConfigurationTransfer |
| ZedUiFormResponseAction | class | Created | src/Generated/Shared/Transfer/ZedUiFormResponseActionTransfer |

{% endinfo_block %}

## Install feature front end

Follow the steps below to install the Merchant Portal Core feature front end.

### Prerequisites

**Environment requirements:**

- NodeJs v12+
- Yarn v2 (or latest Yarn v1)

**Spryker requirements:**

To start builder integration, check the Spryker packages versions:

| NAME | VERSION |
| --------------------------- | --------- |
| Discount (optional)         | >= 9.7.4  |
| Gui (optional)              | >= 3.30.2 |
| Product Relation (optional) | >= 2.4.3  |

### 1) Install the required modules using Composer

Install the required modules:
```bash
composer require spryker/dashboard-merchant-portal-gui:"^1.0.0" --update-with-dependencies
```

| MODULE | EXPECTED DIRECTORY |
|-|-|
| DashboardMerchantPortalGui   | vendor/spryker/dashboard-merchant-portal-gui  |
| DashboardMerchantPortalGuiExtension | vendor/spryker/dashboard-merchant-portal-gui-extension |

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| MerchantDashboardCard | object | Created | src/Generated/Shared/Transfer/MerchantDashboardCardTransfer |
| MerchantDashboardActionButton | object | Created | src/Generated/Shared/Transfer/MerchantDashboardActionButtonTransfer |

{% endinfo_block %}

### 3) Build navigation cache.

Execute the following command:

```bash
console navigation:build-cache
```
{% info_block warningBox "Verification" %}

Make sure that Merchant Portal has "Dashboard" menu section.

{% endinfo_block %}


### 4) Set up Marketplace builder configs

Add the `angular.json` file.

```bash
wget -O angular.json https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/angular.json
```

Rename default `tsconfig` to `tsconfig.yves.json`. Create marketplace-specific `tsconfig` files (`tsconfig.json`, `tsconfig.mp.json`)

```bash
mv tsconfig.json tsconfig.yves.json
wget -O tsconfig.json https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/tsconfig.json
wget -O tsconfig.mp.json https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/tsconfig.mp.json
```

Add `vendor/**` and `**/node_modules/**` to exclude option in `tslint.json`.

Add the `tslint.mp.json` file.

```bash
wget -O tslint.mp.json https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/tslint.mp.json
```

Install npm dependencies:

```bash
npm i rxjs@~6.6.0 zone.js@~0.10.3 @webcomponents/custom-elements@~1.3.1 @webcomponents/webcomponents-platform@~1.0.1 @webcomponents/webcomponentsjs@~2.4.0
```

Install npm dev dependencies:

```bash
npm i -D @angular-builders/custom-webpack@~9.1.0 @angular-devkit/build-angular@~0.901.11 @angular/cli@~9.1.11 @angular/common@~9.1.12 @angular/compiler@~9.1.12 @angular/compiler-cli@~9.1.12 @angular/core@~9.1.12 @angular/language-service@~9.1.12 @angular/platform-browser@~9.1.12 @angular/platform-browser-dynamic@~9.1.12 @babel/plugin-proposal-class-properties@~7.10.4 @babel/plugin-transform-runtime@~7.10.5 @babel/preset-typescript@~7.10.4 @jsdevtools/file-path-filter@~3.0.2 @nrwl/jest@~9.4.4 @nrwl/workspace@~9.4.4 @spryker/oryx-for-zed@~2.11.3 @types/jest@~26.0.4 @types/node@~12.11.1 @types/webpack@~4.41.17 jest@~26.1.0 jest-preset-angular@~8.2.1 node-sass@~4.14.1 npm-run-all@~4.1.5 rimraf@~3.0.2 ts-jest@~26.1.3 ts-node@~8.3.0 tslib@~1.11.1 typescript@~3.8.3
```

Update `package.json` with the following fields:

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
        "node": ">=12.0.0",
        "npm": ">=6.9.0"
    },
    "resolutions": {
        "typescript": "3.8.3",
        "fsevents": "2.1.3"
    }
}
```

Update `frontend/settings.js` to point to an updated `tsconfig` for Yves in the `globalSettings.paths` object:

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

Add a `.yarnrc.yml` file.

**.yarnrc.yml**

```yaml
nodeLinker: node-modules

plugins:
    - path: .yarn/plugins/@yarnpkg/plugin-workspace-tools.js
      spec: '@yarnpkg/plugin-workspace-tools'
    - path: .yarn/plugins/@yarnpkg/plugin-interactive-tools.cjs
      spec: '@yarnpkg/plugin-interactive-tools'

yarnPath: .yarn/releases/yarn-2.3.3.js
```

Add the `.yarn` folder and download `plugin-workspace-tools.js` and `yarn-2.0.0-rc.32.js`.

```bash
mkdir .yarn && mkdir .yarn/plugins && mkdir .yarn/releases
wget -O .yarn/plugins/@yarnpkg/plugin-workspace-tools.js https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/.yarn/plugins/%40yarnpkg/plugin-workspace-tools.js
wget -O .yarn/releases/yarn-2.3.3.js https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/.yarn/releases/yarn-2.3.3.js
```

Run commands from the root of the project:

```bash
npm i -g yarn @angular/cli@9.1.11
```

Run `yarn -v` to check if the yarn was installed correctly. 1.22.x - global version (outside of the project) and 2.x.x at least in the project.

`ng --version` should show Angular CLI: 9.1.11 version.

Now it is time to install project dependencies:

```bash
yarn install
```

Check if the marketplace packages are located in the `node_modules/@spryker` folder (for example, utils).

### 5) Install Marketplace builder

Add the `merchant-portal` folder and builder files:

**frontend/merchant-portal/entry-points.js**

```bash
mkdir frontend/merchant-portal
wget -O frontend/merchant-portal/entry-points.js https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/frontend/merchant-portal/entry-points.js
wget -O frontend/merchant-portal/html-transform.js https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/frontend/merchant-portal/html-transform.js
wget -O frontend/merchant-portal/jest.config.js https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/frontend/merchant-portal/jest.config.js
wget -O frontend/merchant-portal/mp-paths.js https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/frontend/merchant-portal/mp-paths.js
wget -O frontend/merchant-portal/test-setup.js https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/frontend/merchant-portal/test-setup.js
wget -O frontend/merchant-portal/tsconfig.spec.json https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/frontend/merchant-portal/tsconfig.spec.json
wget -O frontend/merchant-portal/update-config-paths.js https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/frontend/merchant-portal/update-config-paths.js
wget -O frontend/merchant-portal/utils.js https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/frontend/merchant-portal/utils.js
wget -O frontend/merchant-portal/webpack.config.js https://raw.githubusercontent.com/spryker-shop/suite/1.8.0/frontend/merchant-portal/webpack.config.js
```

**frontend/merchant-portal/webpack.config.ts**

```ts
import {
    CustomWebpackBrowserSchema,
    TargetOptions,
} from "@angular-builders/custom-webpack";
import * as webpack from "webpack";

import { getMPEntryPointsMap } from "./entry-points";

export default async (
    config: webpack.Configuration,
    options: CustomWebpackBrowserSchema,
    targetOptions: TargetOptions
): Promise<webpack.Configuration> => {
    console.log("Resolving entry points...");

    const entryPointsMap = await getMPEntryPointsMap();

    console.log(`Found ${Object.keys(entryPointsMap).length} entry point(s)!`);

    config.entry = {
        ...(config.entry as any),
        ...entryPointsMap,
    };

    return config;
};
```
---
{% info_block warningBox "Verification" %}

`npm run mp:build` should pass successfully.

{% endinfo_block %}

### 6) Adjust deployment configs

If you want to configure deployment configuration to automatically install and build Merchant Portal, you need to change frontend dependencies and install commands in the deployment Yaml:

- Remove existing Yves dependencies install commands from deployment Yaml:

 dependencies-install and yves-isntall-dependencies

- Update project install dependencies command dependencies-install command to:
- build-static:

```bash
merchant-portal-install-dependencies:
    command: 'console frontend:mp:install-dependencies | tail -100 && echo "Output trimmed, only last 100 lines shown."'
```

- Add Merchant Portal build command:

- build-static-production: 
  ```yaml
  merchant-portal-build-frontend:
     command: 'vendor/bin/console frontend:mp:build -e production'
     timeout: 1600
  ```
  
- build-static-development: 
  ```yaml
  merchant-portal-build-frontend:
     command: 'vendor/bin/console frontend:mp:build'
     timeout: 1600
  ```

## Adjust environment infrastructure

It is not safe to expose MerchantPortal next to the Back Office - MerchantPortal **MUST NOT** have OS, DNS name, VirtualHost settings, FileSystem, and service credentials shared with Zed.

### 1) Set up a new virtual machine/docker container dedicated to MerchantPortal

MerchantPortal MUST be placed into its own private subnet.

MerchantPortal **MUST** have access to:

- Primary Database
- Message broker

MerchantPortal **MUST NOT** have access to:

- Search and Storage
- Gateway
- Scheduler

### 2) Create a dedicated database user

Grant only default CRUD (INSERT, DELETE, UPDATE, SELECT) operations. DO NOT grant ALL PRIVILEGES, GRANT OPTION, DROP, CREATE, and other admin-related grants.

The following code snippet example is for MySQL:

```mysql
CREATE USER 'merchantportal'@'localhost' IDENTIFIED BY '{your_merchantportal_password}'; // YOU MUST CHANGE THE PASSWORD.
GRANT SELECT, INSERT, UPDATE, DELETE ON your_app_schema.* TO 'merchantportal'@'localhost';
FLUSH PRIVILEGES;
```

### 3) Create a new Nginx web server configuration

Example of an Nginx configuration:

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

After the Nginx config was modified, apply the new `config:f`

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

The following page should now show the login page for MerchantPortal: `https://your-merchant-portal.domain/security-merchant-portal-gui/login`

{% info_block warningBox "Verification" %}

Make sure the following pages do not open `https://your-merchant-portal.domain/security-gui/login`, `https://your-merchant-portal.domain/`

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
     * @param string[][] $installerRules
     *
     * @return string[][]
     */
    protected function addMerchantPortalInstallerRules(array $installerRules): array
    {
        $bundleNames = [
            'user-merchant-portal-gui',
            'dashboard-merchant-portal-gui',
            'security-merchant-portal-gui',
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

{% info_block warningBox "Verification" %}

Make sure that after executing `console setup:init-db`, the `'user-merchant-portal-gui'` rule is present in the `spy_acl_rule` table.

{% endinfo_block %}

### 5) Update navigation

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
