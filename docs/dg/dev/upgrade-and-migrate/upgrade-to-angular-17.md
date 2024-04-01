---
title: Upgrade to Angular 17
description: Use the guide to update versions of the Angular and related modules.
template: module-migration-guide-template
---

## Upgrading Angular from version 15.* to version 17.*

This document provides instructions for upgrading Angular to version 17 in your Spryker project.

## Overview

Our current version of Angular is v15.
Angular v15 should be deprecated on 2024-05-18, according to the [policy](https://angular.io/guide/releases#support-policy-and-schedule).
The current stable version of Angular is v17.


Upgrade to the latest major version of Angular to get the most recent bug fixes and security updates. Additionally, this will lead to optimization in both runtime performance and tooling.

Keep in mind that updating to Angular v17 results in incompatibility with older versions of Angular. Therefore, a major release is necessary for these modules:

- `AgentSecurityMerchantPortalGui`
- `AgentDashboardMerchantPortalGui`
- `DashboardMerchantPortalGui`
- `GuiTable`
- `MerchantProfileMerchantPortalGui`
- `ProductMerchantPortalGui`
- `ProductOfferMerchantPortalGui`
- `SalesMerchantPortalGui`
- `SecurityMerchantPortalGui`
- `UserMerchantPortalGui`
- `ZedUi`

*Estimated migration time: 2h*

### 1) Update modules

1. Upgrade modules to the new version:

The marketplace modules must correspond to the following versions:

| NAME                                        | VERSION   |
| ------------------------------------------- | --------- |
| AgentSecurityMerchantPortalGui              | >= 2.0.0  |
| AgentDashboardMerchantPortalGui             | >= 2.0.0  |
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
composer update spryker/agent-dashboard-merchant-portal-gui spryker/agent-security-merchant-portal-gui spryker/dashboard-merchant-portal-gui spryker/gui-table spryker/merchant-profile-merchant-portal-gui spryker/product-merchant-portal-gui spryker/product-offer-merchant-portal-gui spryker/sales-merchant-portal-gui spryker/security-merchant-portal-gui spryker/user-merchant-portal-gui spryker/zed-ui
```

2. Regenerate the data transfer object:

```bash
console transfer:generate
```

## 2) Update Stylelint and css-loader

Before starting the migration, make sure that stylelint and css-loader were updated by this doc: [Stylelint migration guide](/docs/dg/dev/upgrade-to-stylelint-16-and-css-loader-6.html) is required.

## 3) Update npm dependencies

1. In `package.json`, do the following:

   1. Adjust npm scripts::

        ```json
        {
            "scripts": {
                "mp:build": "nx build",
                "mp:build:watch": "nx build --watch",
                "mp:build:production": "nx build --configuration production",
                "mp:lint": "nx lint --no-eslintrc",
                "mp:test": "nx test",
            }
        }
        ```

    3. Update or add the following dependencies:

    ```json
    {
        "dependencies": {
            "@angular/animations": "~17.3.0",
            "@angular/cdk": "~17.3.0",
            "@angular/common": "~17.3.0",
            "@angular/compiler": "~17.3.0",
            "@angular/core": "~17.3.0",
            "@angular/elements": "~17.3.0",
            "@angular/forms": "~17.3.0",
            "@angular/platform-browser": "~17.3.0",
            "@angular/platform-browser-dynamic": "~17.3.0",
            "@angular/router": "~17.3.0",
            "rxjs": "~7.8.1",
            "zone.js": "~0.14.4"
        }
    }
    ```

    3. Update or add the following dev dependencies:

        ```json
        {
            "devDependencies": {
                "@angular-devkit/build-angular": "~17.3.2",
                "@angular-builders/custom-webpack": "~17.0.1",
                "@angular-eslint/eslint-plugin": "~17.3.0",
                "@angular-eslint/eslint-plugin-template": "~17.3.0",
                "@angular-eslint/template-parser": "17.3.0",
                "@angular/cli": "~17.3.0",
                "@angular/compiler-cli": "~17.3.0",
                "@angular/language-service": "~17.3.0",
                "@nx/angular": "~18.1.1",
                "@nx/eslint": "~18.1.2",
                "@nx/eslint-plugin": "~18.1.2",
                "@nx/jest": "~18.1.2",
                "@types/jest": "~29.5.12",
                "@types/node": "~18.16.9",
                "@typescript-eslint/eslint-plugin": "~7.3.1",
                "@typescript-eslint/parser": "~7.3.1",
                "babel-loader": "~9.1.3",
                "eslint": "~8.57.0",
                "eslint-plugin-deprecation": "~2.0.0",
                "fast-glob": "~3.3.2",
                "jest": "~29.7.0",
                "jest-environment-jsdom": "~29.7.0",
                "jest-preset-angular": "~13.1.6",
                "nx": "~18.1.2",
                "reflect-metadata": "~0.2.1",
                "tslib": "~2.6.2",
                "typescript": "~5.4.2",
            }
        }
        ```

   4. Remove the following dependencies:

        ```json
        {
            "dependencies": {
                "core-js": "~3.29.1",
            },
            "devDependencies": {
                "@angular-devkit/build-angular": "~15.2.9",
                "@angular-eslint/builder": "~15.0.0",
                "@angular-eslint/schematics": "~15.0.0",
                "@nrwl/cli": "~15.0.7",
                "@nrwl/jest": "~15.0.7",
                "@nrwl/workspace": "~15.0.7",
            }
        }
        ```

    5. Update and install package dependencies:

    ```bash
    rm -rf node_modules
    npm install
    ```

    {% info_block warningBox "Verification" %}

    Ensure that the `package-lock.json` file and the `node_modules` folder have been updated.

    {% endinfo_block %}

## 4) Update Angular configuration

1. In `frontend/merchant-portal` folder, do the following:

   1. In `jest.config.ts` change resolver from `nrwl` to `nx`:

        ```ts
           export default {
                ...,
                resolver: '@nx/jest/plugins/resolver',
                ...
            } 
        ```

   2. In `jest.preset.js`, change nxPreset from nrwl to nx:

        ```js
            const nxPreset = require('@nx/jest/preset').default;
        ```

   3. In `test-setup.ts`, Replace `core-js/features/reflect` import to `reflect-metadata/lite`:

        ```ts
            import 'reflect-metadata/lite';
            import 'jest-preset-angular/setup-jest';
        ```

   4. In `tsconfig.spec.json`, change compileOptions to following:

        ```json
        {
            "compilerOptions": {
                ...
                "esModuleInterop": true,
                "target": "ES2015",
                "types": ["jest", "node"]
            },
        }
        ```

    5. In `utils.js`, delete import from `'@angular-devkit/core'` and replace it with custom function:

    ```js
        const glob = require('fast-glob');

        function dasherize(str) {
            return str
                .replace(/[\s_]/g, '-')
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .toLowerCase();
        }

        async function getMPEntryPoints(directory, entryPath) {
            return glob(entryPath, {
                cwd: directory,
            });
        }

        function entryPointPathToName(prefix, path) {
            return prefix + dasherize(path.split('/')[0]);
        }

        module.exports = {
            getMPEntryPoints,
            entryPointPathToName,
        };

    ```

    6. In `entry-points.js`, update `getMPEntryPointsMap` function to add possibility one entry build:

    ```js
        const { readFileSync } = require('fs');

        const MP_SINGLE_ENTRY_MARKER = 'spy/merchant-portal';

        async function getMPEntryPointsMap() {
            const singleEntryNames = new Map();

            const entryPointsMap = async (dir, entryPath) => {
                const entryPoints = await getMPEntryPoints(dir, entryPath);

                return entryPoints.reduce((acc, entryPoint) => {
                    const fullPath = path.join(dir, entryPoint);
                    const isSingleEntry = readFileSync(fullPath, { encoding: 'utf8' }).includes(MP_SINGLE_ENTRY_MARKER);
                    const name = entryPointPathToName('spy/', entryPoint);

                    if (isSingleEntry || singleEntryNames.has(name)) {
                        singleEntryNames.set(name, fullPath);

                        return acc;
                    }

                    return { ...acc, [name]: fullPath };
                }, {});
            };
            const core = await entryPointsMap(ROOT_SPRYKER_CORE_DIR, MP_CORE_ENTRY_POINT_FILE);
            const project = await entryPointsMap(ROOT_SPRYKER_PROJECT_DIR, MP_PROJECT_ENTRY_POINT_FILE);

            return { ...core, ...project, [MP_SINGLE_ENTRY_MARKER]: [...singleEntryNames.values()] };
        }
    ```

    6. In `webpack.config.ts`, add `publicPath` config value:

    ```ts
        export default async (...): Promise<webpack.Configuration> => {
            ....,

            config.output.publicPath = '/assets/js/';

            ....
        }
    ```

2. In root of project

   1. Add `.nx/cache` to `.gitignore` and `.prettierignore`.
    ```text
        .nx/cache
    ```
   2. Delete `angular.json`.
   3. Add `target` option into `tsconfig.mp.json`:

   ```json
    {
        ....,
        "compilerOptions": {
                "target": "ES2022",
                ....
        }
    }
   ```

   4. In `.eslintrc.mp.json` move `ts` configuration into overrides section and replace plugin and disable some rules.

   ```json
    {
    "root": true,
        "plugins": ["@nx"],
        "overrides": [
            {
                "files": ["*.ts"],
                ....,
                "parser": "@typescript-eslint/parser",
                "extends": [
                    "./node_modules/@spryker/frontend-config.eslint/.eslintrc.js",
                    "plugin:@nx/typescript",
                    "plugin:@nx/angular",
                    "plugin:@angular-eslint/template/process-inline-templates"
                ],
                "parserOptions": {
                    "project": "./tsconfig.mp.json"
                },
                "rules": {
                    ...,
                    "max-lines": "off",
                }
            },
            {
                "files": ["*.html"],
                ....,
                "rules": {
                    ....
                    "@typescript-eslint/ban-types": 0,
                    "@typescript-eslint/no-empty-interface": 0,
                    "@typescript-eslint/no-explicit-any": 0,
                    "@typescript-eslint/no-unused-vars": 0,
                    "@angular-eslint/no-host-metadata-property": 0,
                    "@angular-eslint/directive-class-suffix": 0,
                    "no-prototype-builtins": 0
                }
            }
        ]
    }
   ```


   5. Add `project.json` with following configuration:

   ```json
   {
        "name": "merchant-portal",
        "$schema": "node_modules/nx/schemas/project-schema.json",
        "sourceRoot": ".",
        "projectType": "application",
        "prefix": "mp",
        "generators": {},
        "targets": {
            "build": {
                "executor": "@angular-builders/custom-webpack:browser",
                "options": {
                    "customWebpackConfig": {
                        "path": "./frontend/merchant-portal/webpack.config.ts",
                        "mergeRules": {}
                    },
                    "indexTransform": "./frontend/merchant-portal/html-transform.js",
                    "outputPath": "public/MerchantPortal/assets/js",
                    "baseHref": "/assets/js/",
                    "index": "src/Pyz/Zed/ZedUi/Presentation/Components/index.html",
                    "main": "src/Pyz/Zed/ZedUi/Presentation/Components/main.ts",
                    "polyfills": "src/Pyz/Zed/ZedUi/Presentation/Components/polyfills.ts",
                    "tsConfig": "tsconfig.mp.json",
                    "assets": [
                        {
                            "glob": "*/src/Spryker/Zed/*/Presentation/Components/assets/**/*",
                            "input": "vendor/spryker/spryker/Bundles",
                            "output": "/assets/"
                        },
                        {
                            "glob": "*/Presentation/Components/assets/**/*",
                            "input": "src/Pyz/Zed",
                            "output": "/assets/"
                        }
                    ],
                    "styles": [
                        "vendor/spryker/spryker/Bundles/ZedUi/src/Spryker/Zed/ZedUi/Presentation/Components/styles.less",
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
            "lint": {
                "executor": "@nx/eslint:lint",
                "options": {
                    "eslintConfig": ".eslintrc.mp.json",
                    "lintFilePatterns": [
                        "src/Pyz/Zed/*/Presentation/Components/**/*.ts",
                        "src/Pyz/Zed/*/Presentation/Components/**/*.html"
                    ],
                    "noEslintrc": true
                }
            },
            "test": {
                "executor": "@nx/jest:jest",
                "options": {
                    "jestConfig": "frontend/merchant-portal/jest.config.ts"
                }
            }
        }
    }
   ```

   6. In `deploy.yml` update npm to `10` version.

   ```yml
    ...
        npm: 10
    ...
   ```

## 5) Manual Spryker module updating

In order that you are not able to run composer update you have to update all angular dependencies in the root of module inside `package.json` to `^17.3.0` version and all `@spryker/*` dependencies to next `major.0.0` version (e.g .` 1.1.0 => ^2.0.0`,` 0.1.4 => ^1.0.0`)

For adding single entry point support add `// spy/merchant-portal:single-entry-marker` line in the entry.ts file e.g:

```ts
// spy/merchant-portal:single-entry-marker
import { registerNgModule } from '@mp/zed-ui';
import { ComponentsModule } from './app/components.module';

registerNgModule(ComponentsModule);
```

and delete additional js injecting in module `layout_file_name twig` file.

```twig
{% block footerJs %}
    {{ view.importJsBundle('agent-dashboard-merchant-portal-gui', importConfig) }}
    {{ parent() }}
{% endblock %} <= delete whole this block
```





