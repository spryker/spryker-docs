








This document describes how to install Self-Service Portal (SSP).

## Prerequisites

| FEATURE                             | VERSION | INSTALLATION GUIDE  |
|----------------------------------| ------- | ------------------ |
| Spryker Core  | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)  |


## Set up the configuration

| CONFIGURATION                                                  | SPECIFICATION                                                                                          | NAMESPACE                |
|----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|--------------------------|
| KernelConstants::CORE_NAMESPACES                               | Adds the SprykerFeature namespace to the Core namespaces.                                                       | Spryker\Shared\Kernel\KernelConstants       |

**config/Shared/config_default.php**

```php

use Spryker\Shared\Kernel\KernelConstants;

$config[KernelConstants::CORE_NAMESPACES] = [
    ...,
    'SprykerFeature',
];

```

## Install feature frontend

The entire project is now an *npm workspace*, meaning each submodule declares its dependencies. During the installation stage, npm installs all of those dependencies and stores them into the root of the project.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/package-manager) 18 or higher
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) 9 or higher


### Install dependencies and build Yves and Zed applications

1. In `package.json`, add `spryker-feature` to the `workspaces` section:

```json
{
    "workspaces": [
      "vendor/spryker-feature/*",
      "vendor/spryker-feature/*/assets/Zed"
    ],
    "devDependencies": {
        "@spryker/oryx-for-zed": "~3.4.5",
    }
}
```

2. Adjust `frontend/settings.js` to resolve typescript files in the `vendor/spryker-features` directory:

```javascript
const globalSettings = {
    paths: {

        features: './vendor/spryker-feature',
    }
}

const getAppSettingsByTheme = (namespaceConfig, theme, pathToConfig) => {
    const paths = {

        features: globalSettings.paths.features,
    };

    return {
        find: {
            componentEntryPoints: {
                dirs: [
                    join(globalSettings.context, paths.features),
                ],
            },
            componentStyles: {
                dirs: [join(globalSettings.context, paths.features)],
            },
        },
    };
}
```

3. Build the project:

```bash
vendor/bin/console frontend:project:install-dependencies
vendor/bin/console frontend:yves:build
vendor/bin/console frontend:zed:build
```

## Install the features

Integrate the following related features:

| FEATURE                                          | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE                                                                                                                              |
|--------------------------------------------------|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Self-Service Portal (SSP) Asset Management       |                                  | [Self-Service Portal (SSP) Asset Management](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-asset-management-feature)         |
| Self-Service Portal (SSP) Dashboard Management   |                                  | [Self-Service Portal (SSP) Dashboard Management](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-dashboard-management-feature) |
| Self-Service Portal (SSP) File Management        |                                  | [Self-Service Portal (SSP) File Management](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-file-management-feature)           |
| Self-Service Portal (SSP) Inquiry Management     |                                  | [Self-Service Portal (SSP) Inquiry Management](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-inquiry-management-feature)     |
| Self-Service Portal (SSP) SSP Inquiry Management |                                  | [Self-Service Portal (SSP) SSP Inquiry Management](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-service-management-feature) |
