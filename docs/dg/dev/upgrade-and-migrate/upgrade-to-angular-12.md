---
title: Upgrade to Angular 12
description: Use the guide to update versions of the Angular and related modules.
template: module-migration-guide-template
last_updated: Jul 13, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/extending-the-project/migration-guide-upgrade-to-angular-v12.html
  - /docs/marketplace/dev/technical-enhancement/202212.0/migration-guide-upgrade-to-angular-v12.html
  - /docs/scos/dev/migration-concepts/upgrade-to-angular-12.html
---

## Upgrading from version 9.* to version 12.*

This document shows how to upgrade Angular to version 12 in your Spryker project.

### Overview

Every six months, the Angular community releases a major update, and on 12th May 2021 version 12 of Angular was released.

A version upgrade is necessary for improved performance, stability, and security. Stability allows reusable components and tools and makes medium and large applications thrive and shine.

Angular provides regular updates to ensure stability and security. These are major, minor, and small patches. An upgrade from an existing version to a newer version always requires time and changes to the code.

Because Spryker applications are large and complex, migration to a new Angular version is a challenge.
Since you can't migrate using standard methods such as `nx migrate` or `ng update`, we have prepared a detailed guide on migrating to the new version.

*Estimated migration time: 1h 30m*

### 1) Update modules

1. Upgrade modules to the new version:

The marketplace modules must correspond to the following versions:

| NAME                                        | VERSION   |
| ------------------------------------------- | --------- |
| DashboardMerchantPortalGui                  | >= 1.4.0  |
| GuiTable                                    | >= 1.4.0  |
| MerchantProfileMerchantPortalGui            | >= 1.4.0  |
| ProductMerchantPortalGui                    | >= 2.1.0  |
| ProductOfferMerchantPortalGui               | >= 1.7.0  |
| SalesMerchantPortalGui                      | >= 1.6.0  |
| SecurityMerchantPortalGui                   | >= 1.4.0  |
| UserMerchantPortalGui                       | >= 1.3.0  |
| ZedUi                                       | >= 1.5.0  |

If not, update module versions manually or by using the following command:

```bash
composer update spryker/dashboard-merchant-portal-gui spryker/gui-table spryker/merchant-profile-merchant-portal-gui spryker/product-merchant-portal-gui spryker/product-offer-merchant-portal-gui spryker/sales-merchant-portal-gui spryker/security-merchant-portal-gui spryker/user-merchant-portal-gui spryker/zed-ui
```

2. Regenerate the data transfer object:

```bash
console transfer:generate
```

### 2) Update npm dependencies

{% info_block infoBox "Info" %}

Make sure you are using [Node 16 or later](https://nodejs.org/dist/latest-v16.x/).

{% endinfo_block %}

1. Update or add the following dependencies:

```json
"rxjs": "~7.4.0",
"zone.js": "~0.11.4",
"@angular-builders/custom-webpack": "~12.1.3",
"@angular-devkit/build-angular": "~12.2.16",
"@angular/cli": "~12.2.16",
"@angular/common": "~12.2.16",
"@angular/compiler": "~12.2.16",
"@angular/compiler-cli": "~12.2.16",
"@angular/core": "~12.2.16",
"@angular/language-service": "~12.2.16",
"@angular/platform-browser": "~12.2.16",
"@angular/platform-browser-dynamic": "~12.2.16",
"@nrwl/cli": "~12.10.1",
"@nrwl/jest": "~12.10.1",
"@nrwl/tao": "~12.10.1",
"@nrwl/workspace": "~12.10.1",
"@prettier/plugin-xml": "~0.13.1",
"@types/jest": "~27.0.2",
"@types/node": "~14.14.33",
"codelyzer": "~6.0.0",
"jest": "~27.2.3",
"jest-preset-angular": "~9.0.3",
"prettier": "~2.5.1",
"ts-jest": "~27.0.5",
"ts-node": "~9.1.1",
"tslib": "~2.0.0",
"tslint": "~6.1.3",
"typescript": "~4.2.4",
```

2. To ensure you're using the correct version, add `"typescript": "4.2.4",` to the `"resolutions"` section.

3. Update `mp:build:production` command:

```json
"mp:build:production": "ng build --configuration production",
```

4. Ensure that the `package-lock.json` file and the `node_modules` folder have been updated:

```bash
rm -rf node_modules
npm install
```

### 3) Create or update config files

1. Create a `.browserslistrc` file:

```txt
last 1 Chrome version
last 1 Firefox version
last 2 Edge major versions
last 2 Safari major versions
last 2 iOS major versions
Firefox ESR
IE 11
```

2. Create `nx.json` file:

```json
{
    "affected": {
        "defaultBase": "master"
    },
    "cli": {
        "analytics": false
    },
    "defaultProject": "merchant-portal",
    "targetDependencies": {
        "build": [
            {
                "target": "build",
                "projects": "dependencies"
            }
        ]
    }
}
```

3. In the `frontend/merchant-portal/` folder, create `jest.preset.js` file:

```js
const nxPreset = require('@nrwl/jest/preset');

module.exports = { ...nxPreset };
```

4. Add the following section to the `tslint.json` file:

```json
"rules": {
    "deprecation": {
        "severity": "warning"
    }
},
```

5. Compare and update the following files:  

<details>
<summary markdown='span'>angular.json</summary>

```json
{
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    "version": 1,
    "projects": {
        "merchant-portal": {
            "root": ".",
            "sourceRoot": ".",
            "projectType": "application",
            "prefix": "mp",
            "schematics": {},
            "architect": {
                "build": {
                    "builder": "@angular-builders/custom-webpack:browser",
                    "options": {
                        "customWebpackConfig": {
                            "path": "./frontend/merchant-portal/webpack.config.ts",
                            "mergeRules": {}
                        },
                        "indexTransform": "./frontend/merchant-portal/html-transform.js",
                        "outputPath": "public/MerchantPortal/assets/js",
                        "deployUrl": "/assets/js/",
                        "index": "src/Pyz/Zed/ZedUi/Presentation/Components/index.html",
                        "main": "src/Pyz/Zed/ZedUi/Presentation/Components/main.ts",
                        "polyfills": "src/Pyz/Zed/ZedUi/Presentation/Components/polyfills.ts",
                        "tsConfig": "tsconfig.mp.json",
                        "assets": [
                            {
                                "glob": "*/src/Spryker/Zed/*/Presentation/Components/assets/**/*",
                                "input": "vendor/spryker",
                                "output": "/assets/"
                            },
                            {
                                "glob": "*/Presentation/Components/assets/**/*",
                                "input": "src/Pyz/Zed",
                                "output": "/assets/"
                            }
                        ],
                        "styles": [
                            "vendor/spryker/zed-ui/src/Spryker/Zed/ZedUi/Presentation/Components/styles.less",
                            "src/Pyz/Zed/ZedUi/Presentation/Components/styles.less"
                        ],
                        "scripts": []
                    },
                    "configurations": {
                        "development": {
                            "buildOptimizer": false,
                            "optimization": false,
                            "vendorChunk": true,
                            "extractLicenses": false,
                            "sourceMap": true,
                            "namedChunks": true
                        },
                        "production": {
                            "fileReplacements": [
                                {
                                    "replace": "src/Pyz/Zed/ZedUi/Presentation/Components/environments/environment.ts",
                                    "with": "src/Pyz/Zed/ZedUi/Presentation/Components/environments/environment.prod.ts"
                                }
                            ],
                            "optimization": true,
                            "outputHashing": "none",
                            "sourceMap": false,
                            "namedChunks": false,
                            "extractLicenses": true,
                            "vendorChunk": true,
                            "buildOptimizer": true,
                            "budgets": [
                                {
                                    "type": "bundle",
                                    "maximumWarning": "2mb",
                                    "maximumError": "5mb"
                                }
                            ]
                        }
                    },
                    "defaultConfiguration": "development"
                },
                "serve": {
                    "builder": "@angular-builders/custom-webpack:dev-server",
                    "options": {
                        "browserTarget": "merchant-portal:build"
                    },
                    "configurations": {
                        "production": {
                            "browserTarget": "merchant-portal:build:production"
                        }
                    }
                },
                "lint": {
                    "builder": "@angular-devkit/build-angular:tslint",
                    "options": {
                        "tsConfig": ["tsconfig.mp.json"],
                        "tslintConfig": "tslint.mp.json",
                        "exclude": ["**/node_modules/**"]
                    }
                },
                "test": {
                    "builder": "@nrwl/jest:jest",
                    "options": {
                        "jestConfig": "frontend/merchant-portal/jest.config.js",
                        "passWithNoTests": true
                    },
                    "outputs": ["coverage/."]
                }
            }
        }
    },
    "cli": {
        "analytics": false
    },
    "defaultProject": "merchant-portal"
}
```
</details>

`jest.config.js` in the `frontend/merchant-portal/` folder:

```js
module.exports = {
    displayName: 'merchant-portal',
    preset: './jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
    globals: {
        'ts-jest': {
            stringifyContentPathRegex: '\\.(html|svg)$',
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    roots: ['<rootDir>/../../vendor/spryker'],
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    resolver: '@nrwl/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'js', 'html'],
    collectCoverageFrom: ['**/*.ts', '!**/*.stories.ts', '!**/node_modules/**'],
    coverageReporters: ['lcov', 'text'],
    coverageDirectory: '<rootDir>/../../coverage/merchant-portal',
    passWithNoTests: true,
    transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ],
};
```

`test-setup.ts` in the `frontend/merchant-portal/` folder:

```ts
import 'core-js/features/reflect';
import 'jest-preset-angular/setup-jest';
```

1. Rename `tsconfig.json` to `tsconfig.base.json` and fix usage in `tsconfig.mp.json`:

**tsconfig.mp.json**

```json
"extends": "./tsconfig.base.json",
```

**tsconfig.yves.json**

```json
"extends": "./tsconfig.base.json",
```

`update-config-paths.js` in the `frontend/merchant-portal/` folder:

```js
const TSCONFIG_FILES = ["tsconfig.base.json", "tsconfig.mp.json"];
```

7. Run build command:

```bash
npm run mp:build
```
