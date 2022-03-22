---
title: Migration guide - Upgrade to Angular v12
description: Use the guide to update versions of the Angular and related modules.
template: module-migration-guide-template
---

## Upgrading from version 9.* to version 12.*
### Overview 
The Angular community comes up with a major release every six months and on 12th May 2021, we are here with the gift of the Angular version 12 update.
For better performance, stability, and security need, a version upgrade is required. Stability brings reusable components and tools. Stability makes medium and large applications thrive and shine.
For stability and security, Angular provides regular upgrades. Upgrades are major, minor, and small patches. An upgrade from the existing version to a newer version always requires time and change in the code.

Since the Spryker applications are very large, it will be a little difficult to migrate to the new version of Angular. 
Since it is not possible to do this using standard methods such as `nx migrate` or `ng update`, we have prepared the most detailed guide on migrating to the new version.

*Estimated migration time: 1h 30m*

### Update modules

Upgrade modules to the new version  
```bash
composer require spryker/dummy-merchant-portal-gui:"^0.4.0" spryker/dashboard-merchant-portal-gui:"^1.4.0" spryker/gui-table:"^1.4.0" spryker/merchant-profile-merchant-portal-gui:"^1.4.0" spryker/product-merchant-portal-gui:"^2.1.0" spryker/product-offer-merchant-portal-gui:"^1.7.0" spryker/sales-merchant-portal-gui:"^1.6.0" spryker/security-merchant-portal-gui:"^1.4.0" spryker/user-merchant-portal-gui:"^1.3.0" spryker/zed-ui:"^1.5.0" --update-with-dependencies
```

Regenerate the data transfer object  
```bash
console transfer:generate
```

### Update NPM dependencies

Make sure you are using [Node 12 or later](https://nodejs.org/dist/latest-v12.x/).

Update/add the following dependencies  
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

Please also add `"typescript": "4.2.4",` to `"resolutions"` section to make sure you use right version.

Run the following commands to make sure you have updated `lock` files and `node_modules` folder.

Update **package-lock.json** via commands  
```bash
rm -rf node_modules
npm install
```

Update **yarn.lock** via commands  
```bash
rm -rf node_modules
yarn install
```

### Create/Update config files

Create **.browserslistrc** file  
```
last 1 Chrome version
last 1 Firefox version
last 2 Edge major versions
last 2 Safari major versions
last 2 iOS major versions
Firefox ESR
IE 11
```

Create **nx.json** file  
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

Create **jest.preset.js** in the `frontend/merchant-portal/` folder  
```js
const nxPreset = require('@nrwl/jest/preset');

module.exports = { ...nxPreset };
```

Compare and update the following files:  

**angular.json**  
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

**jest.config.js** in the `frontend/merchant-portal/` folder  
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

**test-setup.ts** in the `frontend/merchant-portal/` folder  
```ts
import 'core-js/features/reflect';
import 'jest-preset-angular/setup-jest';
```

Rename `tsconfig.json` to `tsconfig.base.json` and fix usage in the:

**tsconfig.mp.json**  
```json
"extends": "./tsconfig.base.json",
```

**tsconfig.yves.json**  
```json
"extends": "./tsconfig.base.json",
```

**update-config-paths.js** in the `frontend/merchant-portal/` folder  
```js
const TSCONFIG_FILES = ["tsconfig.base.json", "tsconfig.mp.json"];
```

Run build command  
```bash
yarn mp:build
```
