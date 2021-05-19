---
title: Marketplace Merchant Portal Core feature integration
last_updated: Mar 31, 2021
description: This document describes how to integrate the Merchant Portal Core feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Merchant Portal Core feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal Core feature core.

## Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| -------------------- | ---------- | ---------|
| Spryker Core         | dev-master | [Spryker Core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration) |
| Spryker Core BO      | dev-master | [Spryker Core Back Office feature integration](https://github.com/spryker-feature/spryker-core-back-office)
| Marketplace Merchant | dev-master | [Marketplace Merchants feature integration](/docs/marketplace/dev/feature-integration-guides/marketplace-merchants-feature-integration.html)

###  1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-merchantportal-core:"dev-master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| ------------- | --------------- |
| DashboardMerchantPortalGui   | vendor/spryker/dashboard-merchant-portal-gui  |
| DashboardMerchantPortalGuiExtension | vendor/spryker/dashboard-merchant-portal-gui-extension |
| SecurityMerchantPortalGui  | vendor/spryker/security-merchant-portal-gui |
| ZedUi  | vendor/spryker/zed-ui |
| GuiTable | vendor/spryker/gui-table |

{% endinfo_block %}

### 2) Set up behavior

Set up behavior as follows:

1. Install the following plugins with modules:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ----------- | ------------ | ------------- | --------- |
| MerchantUserSecurityPlugin | Sets security firewalls (rules, handlers) for Marketplace users. |  | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\Security |
| BooleanToStringTwigPlugin  | Adds a new Twig function for converting Boolean to String |  | Spryker\Zed\ZedUi\Communication\Plugin\Twig  |
| ZedUiNavigationTwigPlugin  | Adds a new Twig function for rendering Navigation using web components |  | Spryker\Zed\ZedUi\Communication\Plugin |
| GuiTableApplicationPlugin | Enables GuiTable infrastructure for Zed |  | Spryker\Zed\GuiTable\Communication\Plugin\Application |
| GuiTableConfigurationTwigPlugin | Add a new Twig function for rendering GuiTableConfiguration for the GuiTable web component |  | Spryker\Zed\GuiTable\Communication\Plugin\Twig<?php  |

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

Open access to the Merchant Portal login page by default:

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

Apply database changes and generate transfer changes:

```bash
console transfer:generate
console navigation:build-cache
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
| ----------- | ----- | ------- | -------------------- |
| MerchantDashboardCard | class | created | src/Generated/Shared/Transfer/MerchantDashboardCard  |
| MerchantDashboardActionButton | class | created | src/Generated/Shared/Transfer/MerchantDashboardActionButton |

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

### 1) Set up Marketplace builder configs

Add the `angular.json` file.

```bash
wget -O angular.json https://raw.githubusercontent.com/spryker-shop/suite/master/angular.json
```

Rename default tsconfig to tsconfig.yves.json. Create market place specific tsconfig files (tsconfig.json, tsconfig.mp.json)

```bash
mv tsconfig.json tsconfig.yves.json
wget -O tsconfig.json https://raw.githubusercontent.com/spryker-shop/suite/master/tsconfig.json
wget -O tsconfig.mp.json https://raw.githubusercontent.com/spryker-shop/suite/master/tsconfig.mp.json
```

Add `vendor/spryker/*/src/Spryker/Zed/*/Presentation/Components/**` and `**/node_modules/**` to exclude option in tslint.json.

Add the tslint.mp.json file.

```bash
wget -O tslint.mp.json https://raw.githubusercontent.com/spryker-shop/suite/master/tslint.mp.json
```

Install npm dependencies:

```bash
npm i rxjs@~6.6.0 zone.js@~0.10.3 @webcomponents/custom-elements@~1.3.1 @webcomponents/webcomponents-platform@~1.0.1 @webcomponents/webcomponentsjs@~2.4.0
```

Install npm dev dependencies

```bash
npm i -D @angular-builders/custom-webpack@~9.1.0 @angular-devkit/build-angular@~0.901.11 @angular/cli@~9.1.11 @angular/common@~9.1.12 @angular/compiler@~9.1.12 @angular/compiler-cli@~9.1.12 @angular/core@~9.1.12 @angular/language-service@~9.1.12 @angular/platform-browser@~9.1.12 @angular/platform-browser-dynamic@~9.1.12 @babel/plugin-proposal-class-properties@~7.10.4 @babel/plugin-transform-runtime@~7.10.5 @babel/preset-typescript@~7.10.4 @jsdevtools/file-path-filter@~3.0.2 @nrwl/jest@~9.4.4 @nrwl/workspace@~9.4.4 @spryker/oryx-for-zed@~2.8.1 @types/jest@~26.0.4 @types/node@~12.11.1 @types/webpack@~4.41.17 jest@~26.1.0 jest-preset-angular@~8.2.1 node-sass@~4.14.1 npm-run-all@~4.1.5 rimraf@~3.0.2 ts-jest@~26.1.3 ts-node@~8.3.0 tslib@~1.11.1 typescript@~3.8.3
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
        "mp:clean:dist": "rimraf public/Zed/assets/js/mp"
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

Add a .yarnrc.yml file.

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

Add the .yarn folder and download plugin-workspace-tools.js and yarn-2.0.0-rc.32.js.

```bash
mkdir .yarn && mkdir .yarn/plugins && mkdir .yarn/releases
wget -O .yarn/plugins/@yarnpkg/plugin-workspace-tools.js https://raw.githubusercontent.com/spryker-shop/suite/master/.yarn/plugins/%40yarnpkg/plugin-workspace-tools.js
wget -O .yarn/releases/yarn-2.3.3.js https://raw.githubusercontent.com/spryker-shop/suite/master/.yarn/releases/yarn-2.3.3.js
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

Check if the MarketPlace packages are located in the `node_modules/@spryker` folder (e.g., utils).

### 2) Install Marketplace builder

Add the merchant-portal folder and builder files:

**frontend/merchant-portal/entry-points.js**

```bash
mkdir frontend/merchant-portal
wget -O frontend/merchant-portal/entry-points.js https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/entry-points.js
wget -O frontend/merchant-portal/html-transform.js https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/html-transform.js
wget -O frontend/merchant-portal/jest.config.js https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/jest.config.js
wget -O frontend/merchant-portal/mp-paths.js https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/mp-paths.js
wget -O frontend/merchant-portal/test-setup.js https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/test-setup.js
wget -O frontend/merchant-portal/tsconfig.spec.json https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/tsconfig.spec.json
wget -O frontend/merchant-portal/update-config-paths.js https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/update-config-paths.js
wget -O frontend/merchant-portal/utils.js https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/utils.js
wget -O frontend/merchant-portal/webpack.config.js https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/webpack.config.js
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

### 3) Adjust deployment configs

If you want to configure deployment configuration to automatically install and build Merchant Portal, you need to change frontend dependencies and install commands in the deployment Yaml:

- Remove existing Yves and Zed dependencies install commands from deployment Yaml: yves-isntall-dependenciesand yves-isntall-dependencies

- Update project install dependencies command dependencies-install command to: vendor/bin/console frontend:mp:install-dependencies -vvv

- Add Merchant Portal build command:

  ```yaml
  mp-build-frontend:
      command: "vendor/bin/console frontend:mp:build"
      groups:
          - mp
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

Grant only default CRUD (INSERT, DELETE, UPDATE, SELECT) operations. DO NOT grant ALL PRIVILEGES, GRANT OPTION, DROP, CREATE, and other admin related grants.

The following code snippet example is for MySQL:

```mysql
CREATE USER 'merchnatportal'@'localhost' IDENTIFIED BY '{your_merchnatportal_password}'; // YOU MUST CHANGE THE PASSWORD.
GRANT SELECT, INSERT, UPDATE, DELETE ON your_app_schema.* TO 'merchnatportal'@'localhost';
FLUSH PRIVILEGES;
```

### 3) Create a new Nginx web server configuration

Example of an Nginx configuration:

**/etc/nginx/merchnat-portal.conf**

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
        fastcgi_param SPRYKER_DB_USERNAME merchnatportal;
        fastcgi_param SPRYKER_DB_PASSWORD '{your_merchnatportal_password}';


        more_clear_headers 'X-Powered-By' 'X-Store' 'X-Locale' 'X-Env' 'Server';
    }
}
```

After the Nginx config was modified, apply the new `config:f`

```bash
sudo service nginx reload
```

{% info_block warningBox "Verification" %}

Make sure to use environment variables in config-default.php:

**config/Shared/config_default.php**

```php
<?php

// other code

$config[PropelConstants::ZED_DB_USERNAME] = getenv('SPRYKER_DB_USERNAME');
$config[PropelConstants::ZED_DB_PASSWORD] = getenv('SPRYKER_DB_PASSWORD');
```

{% endinfo_block %}

The following page should now show the login page for MerchantPortal: https://you-merchant-portal.domain/security-merchant-portal-gui/login

{% info_block warningBox "Verification" %}

Make sure the following pages do not open https://you-merchant-portal.domain/security-gui/login, https://you-merchant-portal.domain/

{% endinfo_block %}
