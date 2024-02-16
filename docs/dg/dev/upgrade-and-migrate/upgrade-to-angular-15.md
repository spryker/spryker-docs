---
title: Upgrade to Angular 15
description: Use the guide to update versions of the Angular and related modules.
last_updated: Mar 24, 2023
template: module-migration-guide-template
redirect_from:
- /docs/scos/dev/migration-concepts/upgrade-to-angular-15.html
---

## Upgrading Angular from version 12.* to version 15.*

This document provides instructions for upgrading Angular to version 15 in your Spryker project.

## Overview

Our current version of Angular is v12 with v9 compatibility.
Angular v12 was deprecated on 2022-11-12, according to the [policy](https://angular.io/guide/releases#support-policy-and-schedule).
The current stable version of Angular is v15.


Upgrade to the latest major version of Angular to get the most recent bug fixes and security updates. Additionally, this will lead to optimization in both runtime performance and tooling.

Keep in mind that updating to Angular v15 results in incompatibility with older versions of Angular. Therefore, a major release is necessary for these modules:

- `ZedUi`
- `DashboardMerchantPortalGui`
- `GuiTable`
- `MerchantProfileMerchantPortalGui`
- `ProductMerchantPortalGui`
- `ProductOfferMerchantPortalGui`
- `SalesMerchantPortalGui`
- `SecurityMerchantPortalGui`
- `UserMerchantPortalGui`

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

Before starting the migration, make sure that Webpack is v5; if it's v4, the [Webpack migration guide](/docs/dg/dev/upgrade-and-migrate/upgrade-to-webpack-v5.html) is required.

## 3) Update npm dependencies

{% info_block infoBox "Info" %}

Make sure you are using [Node.js 18 or later](https://nodejs.org/en/download).

{% endinfo_block %}

1. In `package.json`, do the following:

   1. Update or add the following dependencies:

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

   2. Remove the following dependencies:

        ```json
        {
            "devDependencies": {
                "@nrwl/tao": "~12.10.1",
                "codelyzer": "~6.0.0",
                "typescript-eslint-parser": "~22.0.0"
            }
        }
        ```

3. Update and install package dependencies:

```bash
rm -rf node_modules
npm install
```

{% info_block warningBox "Verification" %}

Ensure that the `package-lock.json` file and the `node_modules` folder have been updated.

{% endinfo_block %}

## 4) Update Angular configuration

1. In `frontend/merchant-portal` folder, do the following:

   1. Rename the `jest.config.js` file to `jest.config.ts` and replace its content with the following:

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

   2. In `jest.preset.js`, replace its content with the following:

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

   3. In `tsconfig.spec.json`, add the `emitDecoratorMetadata` property to the `compilerOptions` section and add the `"jest.config.ts"` path to the `include` section:

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

   4. In `webpack.config.ts`, add aliases to resolve imports paths in `.less` files:

        ```js
        config.resolve.alias = {
            '~@spryker': path.resolve(__dirname, '../../node_modules/@spryker'),
            '~@angular': path.resolve(__dirname, '../../node_modules/@angular'),
        };
        ```

2. In `angular.json`, add the following changes:

   1. Update the `test` section:

        ```json
        "jestConfig": "frontend/merchant-portal/jest.config.js",
        // must be
        "jestConfig": "frontend/merchant-portal/jest.config.ts",
        ```

        ```json
        "outputs": ["coverage/."]
        // must be
        "outputs": ["{projectRoot}/coverage"]
        ```

   2. Remove the `defaultProject` section.

3. Add the `.angular` folder to `.gitignore` and `.prettierignore` files:

```text
/.angular/
```

4. In `nx.json`, replace its content with the following:

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

5. In `tsconfig.base.json`, add the following changes:
   1. In `compilerOptions` section, change the `target` property and add the new `useDefineForClassFields` property.
   2. In `exclude` section, add the `"**/*.test.ts"` file extension.

```json
{
    ...,
    "compilerOptions": {
        ...,
        "target": "es2020",
        "useDefineForClassFields": false,
        ...
    },
    ...,
    "exclude": [..., "**/*.test.ts"]
}
```

6. In `tsconfig.mp.json`, add the `"src/Pyz/Zed/ZedUi/Presentation/Components/environments/environment.prod.ts"` path to the `include` section:

```json
{
    ...,
    "include": [
        ...,
        "src/Pyz/Zed/ZedUi/Presentation/Components/environments/environment.prod.ts"
    ],
}
```

7. In `src/Pyz/Zed/ZedUi/Presentation/Layout/layout.twig` template, remove the `importConfig` override, or remove the whole template if it only contains this change.

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
            "extends": ["plugin:@angular-eslint/template/process-inline-templates"],
            "rules": {
                "deprecation/deprecation": "warn",
                "no-console": ["warn", {"allow": ["warn", "error"]}],
                "no-empty": "error",
                "no-use-before-define": "off",
                "max-classes-per-file": "off",
                "@typescript-eslint/array-type": "off",
                "@typescript-eslint/no-restricted-imports": ["error", "rxjs/Rx"],
                "@typescript-eslint/no-unused-vars": "error",
                "@typescript-eslint/no-inferrable-types": ["error", {"ignoreParameters": true}],
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

3. Adjust `angular.json` to use a new `eslint` schematic:

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

4. In `tslint.json`, add the `"src/Pyz/Zed/*/Presentation/Components/**"` path to the `linterOptions.exlude` section:

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

5. Make sure to replace `tslint` disable comments with `eslint`—for example:

```ts
/* tslint:disable:no-unnecessary-class */
// must be
/* eslint-disable @typescript-eslint/no-extraneous-class */
```

## 6) Build the project

```bash
// Development mode
npm run mp:build

// Production mode
npm run mp:build:production

// Watch mode
npm run mp:build:watch
```
