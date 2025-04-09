
This document describes how to install SSP feature.

## Prerequisites

Install the required features:

| NAME                             | VERSION | INSTALLATION GUIDE  |
|----------------------------------| ------- | ------------------ |
| Spryker Core  | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)  |


### Set up the configuration

1. Add the following configuration:

| CONFIGURATION                                                  | SPECIFICATION                                                                                          | NAMESPACE                |
|----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|--------------------------|
| KernelConstants::CORE_NAMESPACES                               | Add SprykerFeature namespace to Core namespaces.                                                       | Spryker\Shared\Kernel\KernelConstants       |

**config/Shared/config_default.php**
```php

use Spryker\Shared\Kernel\KernelConstants;

$config[KernelConstants::CORE_NAMESPACES] = [
    ...,
    'SprykerFeature',
];

```

## Install feature frontend

## Requirements

To build frontend features, install or update the following tools:
- [Node.js](https://nodejs.org/en/download/package-manager)—minimum version is v18.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)—minimum version is v9.

## Overview

SSP integrates into Yves and Zed frontend application:
- Minimum Node.js version is v18.
- Minimum npm version is v9.

The entire project is now an *npm workspace*, meaning each submodule declares its dependencies. During the installation stage, npm installs all of those dependencies and stores them into the root of the project.

## Install dependencies and build Yves and Zed applications

Adjust the `package.json` to add spryker-feature to the `workspaces` section:

```json
{
    "workspaces": [
      "vendor/spryker-feature/*",
      "vendor/spryker-feature/*/assets/Zed"
    ]
}
```

Adjust the `frontend/settings.js` to resolve typescript files in the `vendor/spryker-features` directory:

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

Build the project:

```bash
vendor/bin/console frontend:project:install-dependencies
vendor/bin/console frontend:yves:build
vendor/bin/console frontend:zed:build
```
