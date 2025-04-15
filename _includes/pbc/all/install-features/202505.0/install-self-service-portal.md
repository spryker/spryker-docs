


{% info_block warningBox %}

Self-Service Portal is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}






This document describes how to install Self-Service Portal (SSP).

## Prerequisites

| FEATURE                             | VERSION | INSTALLATION GUIDE  |
|----------------------------------| ------- | ------------------ |
| Spryker Core  | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)  |


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
