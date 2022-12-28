---
title: Migration guide - Upgrade to Angular v15
description: Use the guide to update versions of the Angular and related modules.
template: module-migration-guide-template
---

## Upgrading from version 12.* to version 15.*

This document provides instructions for upgrading Angular to version 15 in your Spryker project.

## Overview

Our current version of Angular is v12 with v9 compatibility.
Angular v12 was deprecated on 2022-11-12 according to the [policy](https://angular.io/guide/releases#support-policy-and-schedule).
The current stable version of Angular is 15.
We need to upgrade to the latest major to get the latest bug fixes and security fixes as well as performance in runtime and tooling.
We can't maintain compatibility with older versions of Angular when updating Angular v15.
So the update will require a major release for these modules:

- ZedUi
- DashboardMerchantPortalGui
- GuiTable
- MerchantProfileMerchantPortalGui
- ProductMerchantPortalGui
- ProductOfferMerchantPortalGui
- SalesMerchantPortalGui
- SecurityMerchantPortalGui
- UserMerchantPortalGui

*Estimated migration time: 2h*

### 1) Update modules

1. Upgrade modules to the new version:

The marketplace modules must correspond to the following versions:

| NAME                                        | VERSION   |
| ------------------------------------------- | --------- |
| DashboardMerchantPortalGui                  | >= 2.0.0  |
| GuiTable                                    | >= 2.0.0  |
| MerchantProfileMerchantPortalGui            | >= 2.0.0  |
| ProductMerchantPortalGui                    | >= 3.0.0  |
| ProductOfferMerchantPortalGui               | >= 2.0.0  |
| SalesMerchantPortalGui                      | >= 2.0.0  |
| SecurityMerchantPortalGui                   | >= 2.0.0  |
| UserMerchantPortalGui                       | >= 2.0.0  |
| ZedUi                                       | >= 2.0.0  |

If not, update module versions manually or by using the following command:

```bash
composer update spryker/dashboard-merchant-portal-gui spryker/gui-table spryker/merchant-profile-merchant-portal-gui spryker/product-merchant-portal-gui spryker/product-offer-merchant-portal-gui spryker/sales-merchant-portal-gui spryker/security-merchant-portal-gui spryker/user-merchant-portal-gui spryker/zed-ui
```

2. Regenerate the data transfer object:

```bash
console transfer:generate
```

## 2) Update Webpack

Before starting migration it's required to update Webpack version with related dependencies and configurations.
Here is the link to [Webpack migration guide](/docs/scos/dev/front-end-development/migration-guide-upgrade-to-webpack-v5.html).

## 3) Update NPM dependencies

{% info_block infoBox "Info" %}

Make sure you are using [Node 16 or later](https://nodejs.org/dist/latest-v16.x/).

{% endinfo_block %}

1. In the `package.json` update or add the following dependencies:

```json
{
    "dependencies": {
        "@angular/animations": "~15.0.3",
        "@angular/cdk": "~15.0.3",
        "@angular/elements": "~15.0.3",
        "@angular/forms": "~15.0.3",
        "@angular/router": "~15.0.3",
        "@angular/common": "~15.0.3",
        "@angular/compiler": "~15.0.3",
        "@angular/core": "~15.0.3",
        "@angular/platform-browser": "~15.0.3",
        "@angular/platform-browser-dynamic": "~15.0.3",
        "rxjs": "~7.5.7",
        "zone.js": "~0.12.0"
    },
    "devDependencies": {
        "@angular-builders/custom-webpack": "~15.0.0",
        "@angular-devkit/build-angular": "~15.0.3",
        "@angular-eslint/builder": "~15.0.0",
        "@angular-eslint/eslint-plugin": "~15.0.0",
        "@angular-eslint/eslint-plugin-template": "~15.0.0",
        "@angular-eslint/schematics": "~15.0.0",
        "@angular-eslint/template-parser": "~15.0.0",
        "@angular/cli": "~15.0.3",
        "@angular/compiler-cli": "~15.0.3",
        "@angular/language-service": "~15.0.3",
        "@nrwl/cli": "~15.0.7",
        "@nrwl/jest": "~15.0.7",
        "@nrwl/workspace": "~15.0.7",
        "@types/jest": "~28.1.1",
        "@typescript-eslint/eslint-plugin": "~5.44.0",
        "@typescript-eslint/parser": "~5.44.0",
        "eslint": "~8.28.0",
        "eslint-plugin-deprecation": "~1.3.3",
        "jest": "~28.1.3",
        "jest-environment-jsdom": "~28.1.1",
        "jest-preset-angular": "~12.2.3",
        "nx": "~15.0.7",
        "ts-jest": "~28.0.8",
        "ts-node": "~10.9.1",
        "typescript": "~4.8.4"
    }
}
```

And remove the following dependencies:

```json
{
    "devDependencies": {
        "@nrwl/tao": "~12.10.1",
        "codelyzer": "~6.0.0",
        "typescript-eslint-parser": "~22.0.0"
    }
}
```

2. Run `npm install` to update and install dependencies. Ensure that the `package-lock.json` file and the `node_modules` folder have been updated:

```bash
rm -rf node_modules
npm install
```

## 4) Update Angular configuration

1. In the `frontend/merchant-portal` folder: 

1.1 Rename `jest.config.js` file to `jest.config.ts` and replace content with the following: 

```ts
export default {
    displayName: 'merchant-portal',
    preset: './jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
    globals: {
        'ts-jest': {
            stringifyContentPathRegex: '\\.(html|svg)$',
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    roots: ['<rootDir>/../../vendor/spryker/spryker/Bundles'],
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    resolver: '@nrwl/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'js', 'html'],
    collectCoverageFrom: ['**/*.ts', '!**/*.stories.ts', '!**/node_modules/**'],
    coverageReporters: ['lcov', 'text'],
    coverageDirectory: '<rootDir>/../../coverage/merchant-portal',
    passWithNoTests: true,
};
```

Make sure to change path to the `jestConfig` in the `angular.json`: 

```json
"jestConfig": "frontend/merchant-portal/jest.config.ts",
```

1.2 In the `jest.preset.js` replace content with the following: 

```js
const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
    ...nxPreset,
    transform: {
        '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ],
};
```

1.3 In the `tsconfig.spec.json` add `emitDecoratorMetadata` property to the `compilerOptions` section and `"jest.config.ts"` path to the `include` section: 

```json
{
    ...,
    "compilerOptions": {
        ...,
        "emitDecoratorMetadata": false
    },
    ...,
    "include": [
        ...,
        "jest.config.ts"
    ]
}
```

1.4 In the `webpack.config.ts` add aliases to resolve imports paths in `.less` files: 

```js
config.resolve.alias = {
    '~@spryker': path.resolve(__dirname, '../../node_modules/@spryker'),
    '~@angular': path.resolve(__dirname, '../../node_modules/@angular'),
};
```

2. Add the `.angular` folder to `.gitignore` and `.prettierignore` files:

```text
/.angular/
```

3. In the `nx.json` replace content with the following: 

```json
{
    "affected": {
        "defaultBase": "master"
    },
    "cli": {
        "analytics": false
    },
    "defaultProject": "merchant-portal",
    "$schema": "./node_modules/nx/schemas/nx-schema.json",
    "targetDefaults": {
        "build": {
            "dependsOn": ["^build"],
            "inputs": ["production", "^production"]
        },
        "test": {
            "inputs": ["default", "^production"]
        }
    },
    "namedInputs": {
        "default": ["{projectRoot}/**/*", "sharedGlobals"],
        "sharedGlobals": [],
        "production": [
            "default",
            "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
            "!{projectRoot}/tsconfig.spec.json",
            "!{projectRoot}/jest.config.[jt]s"
        ]
    }
}
```

4. In the `tsconfig.base.json` change the `target` property and add a new `useDefineForClassFields` property to the `compilerOptions` section: 

```json
{
    ...,
    "compilerOptions": {
        ...,
        "target": "es2020",
        "useDefineForClassFields": false,
        ...
    },
    ...
}
```

5. In the `tsconfig.mp.json` add the `"src/Pyz/Zed/ZedUi/Presentation/Components/environments/environment.prod.ts"` path to the `include` section: 

```json
{
    ...,
    "include": [
        ...,
        "src/Pyz/Zed/ZedUi/Presentation/Components/environments/environment.prod.ts"
    ],
}
```

6. Remove the `src/Pyz/Zed/ZedUi/Presentation/Layout/layout.twig` template. 

## 5) Add Eslint configuration

1. Remove the following files from the root folder:

- `.eslintrc.js`
- `tslint.mp-githook.json`
- `tslint.mp.json`

2. Add a new `.eslintrc.mp.json` file to the root folder with the following content: 

```json
{
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint", "@angular-eslint"],
    "env": {
        "node": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "project": "./tsconfig.mp.json"
    },
    "extends": [
        "./node_modules/@spryker/frontend-config.eslint/.eslintrc.js",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended"
    ],
    "ignorePatterns": ["!**/*"],
    "overrides": [
        {
            "files": ["*.ts"],
            "plugins": ["deprecation"],
            "extends": [
                "plugin:@angular-eslint/template/process-inline-templates"
            ],
            "rules": {
                "deprecation/deprecation": "warn",
                "no-console": ["warn", { "allow":  ["warn", "error"] }],
                "no-empty": "error",
                "no-use-before-define": "off",
                "max-classes-per-file": "off",
                "@typescript-eslint/array-type": "off",
                "@typescript-eslint/no-restricted-imports": ["error", "rxjs/Rx"],
                "@typescript-eslint/no-unused-vars": "error",
                "@typescript-eslint/no-inferrable-types": ["error", { "ignoreParameters": true }],
                "@typescript-eslint/no-non-null-assertion": "error",
                "@typescript-eslint/no-var-requires": "off",
                "@typescript-eslint/no-explicit-any": "error",
                "@typescript-eslint/member-ordering": [
                    "error",
                    {
                        "default": ["instance-field", "instance-method", "static-field", "static-method"]
                    }
                ],
                "@angular-eslint/contextual-lifecycle": "error",
                "@angular-eslint/component-class-suffix": "error",
                "@angular-eslint/component-selector": [
                    "error",
                    {
                        "type": "element",
                        "prefix": "mp",
                        "style": "kebab-case"
                    }
                ],
                "@angular-eslint/directive-class-suffix": "error",
                "@angular-eslint/directive-selector": [
                    "error",
                    {
                        "type": "attribute",
                        "prefix": "mp",
                        "style": "camelCase"
                    }
                ],
                "@angular-eslint/no-conflicting-lifecycle": "error",
                "@angular-eslint/no-host-metadata-property": "off",
                "@angular-eslint/no-input-rename": "error",
                "@angular-eslint/no-inputs-metadata-property": "error",
                "@angular-eslint/no-output-native": "error",
                "@angular-eslint/no-output-on-prefix": "error",
                "@angular-eslint/no-output-rename": "error",
                "@angular-eslint/no-outputs-metadata-property": "error",
                "@angular-eslint/use-lifecycle-interface": "error",
                "@angular-eslint/use-pipe-transform-interface": "error"
            }
        },
        {
            "files": ["*.html"],
            "parser": "@angular-eslint/template-parser",
            "extends": ["plugin:@angular-eslint/template/recommended"],
            "rules": {
                "@angular-eslint/template/banana-in-box": "error",
                "@angular-eslint/template/no-negated-async": "error"
            }
        }
    ]
}
```

3. Adjust the `angular.json` to use a new `eslint` schematic:

```json
"lint": {
    "builder": "@angular-eslint/builder:lint",
    "options": {
        "eslintConfig": ".eslintrc.mp.json",
        "lintFilePatterns": [
            "src/Pyz/Zed/*/Presentation/Components/**/*.ts",
            "src/Pyz/Zed/*/Presentation/Components/**/*.html"
        ]
    }
},
```

4. In the `package.json` rename the `mp:lint` script to the `mp:eslint`. 

5. In the `tslint.json` add `"src/Pyz/Zed/*/Presentation/Components/**"` path to the `linterOptions.exlude` section: 

```json
{
    ...,
    "linterOptions": {
        "exclude": [
            ...,
            "src/Pyz/Zed/*/Presentation/Components/**"
        ]
    }
}
```

6. Make sure to replace `tslint` disable comments with `eslint`, for example: 

```ts
/* tslint:disable:no-unnecessary-class */
// must be
/* eslint-disable @typescript-eslint/no-extraneous-class */
```

## 6) Build the project

Run the following coomands to build the project: 

```bash
// Development mode
npm run mp:build

// Production mode
npm run mp:build:production

// Watch mode
npm run mp:build:watch
```
