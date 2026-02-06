---
title: Upgrade to Angular 20
description: Learn how you can upgrade to Version 20 of Angular for your Spryker project for bug fixes, optimized performance and tooling.
template: module-migration-guide-template
---

This document explains how you can upgrade Angular to version 20 in your Spryker project.

Spryker currently uses Angular version 18. According to the [Angular Support policy and schedule](https://angular.dev/reference/releases#actively-supported-versions), Angular 18 is deprecated.
The current stable Angular version is 20.

We recommend that you upgrade to the latest major Angular version to receive the most recent bug fixes, security updates, and improvements to runtime performance and tooling.

Upgrading to Angular v20 introduces incompatibilities with earlier Angular versions. As a result, the following modules require a major release:

- `AgentDashboardMerchantPortalGui`
- `AgentSecurityMerchantPortalGui`
- `CommentMerchantPortalGui`
- `DashboardMerchantPortalGui`
- `DataImportMerchantPortalGui`
- `GuiTable`
- `MerchantAppMerchantPortalGui`
- `MerchantProfileMerchantPortalGui`
- `MerchantRelationRequestMerchantPortalGui`
- `MerchantRelationshipMerchantPortalGui`
- `MultiFactorAuthMerchantPortal`
- `PriceProductMerchantRelationshipMerchantPortalGui`
- `ProductMerchantPortalGui`
- `ProductOfferMerchantPortalGui`
- `ProductOfferServicePointMerchantPortalGui`
- `ProductOfferShipmentTypeMerchantPortalGui`
- `SalesMerchantPortalGui`
- `SecurityMerchantPortalGui`
- `UserMerchantPortalGui`
- `ZedUi`

*Estimated migration time: 2h*

To upgrade to Angular v20, follow these steps.


## 1) Update modules

1. Check if the following Marketplace modules in your project have the new versions:

| NAME                                             | VERSION   |
|--------------------------------------------------|-----------|
| AgentDashboardMerchantPortalGui                  | >= 2.0.0  |
| AgentSecurityMerchantPortalGui                   | >= 2.0.0  |
| CommentMerchantPortalGui                         | >= 2.0.0  |
| DashboardMerchantPortalGui                       | >= 4.0.0  |
| DataImportMerchantPortalGui                      | >= 2.0.0  |
| GuiTable                                         | >= 4.0.0  |
| MerchantAppMerchantPortalGui                     | >= 2.0.0  |
| MerchantProfileMerchantPortalGui                  | >= 4.0.0  |
| MerchantRelationRequestMerchantPortalGui         | >= 2.0.0  |
| MerchantRelationshipMerchantPortalGui            | >= 2.0.0  |
| MultiFactorAuthMerchantPortal                    | >= 2.0.0  |
| PriceProductMerchantRelationshipMerchantPortalGui| >= 3.0.0  |
| ProductMerchantPortalGui                         | >= 5.0.0  |
| ProductOfferMerchantPortalGui                    | >= 4.0.0  |
| ProductOfferServicePointMerchantPortalGui        | >= 3.0.0  |
| ProductOfferShipmentTypeMerchantPortalGui        | >= 3.0.0  |
| SalesMerchantPortalGui                           | >= 4.0.0  |
| SecurityMerchantPortalGui                        | >= 4.0.0  |
| UserMerchantPortalGui                            | >= 4.0.0  |
| ZedUi                                            | >= 4.0.0  |

If they don't, update the module versions manually or by using the following command:

```bash
composer require spryker-feature/marketplace-comments spryker-feature/marketplace-merchant-contract-requests spryker-feature/marketplace-merchant-contracts spryker-feature/marketplace-merchant-custom-prices spryker-feature/marketplace-merchant-portal-product-management spryker-feature/marketplace-merchant-portal-product-offer-management spryker-feature/marketplace-merchant-portal-product-offer-service-points spryker-feature/marketplace-merchantportal-core spryker-feature/merchant-portal-data-import spryker/agent-dashboard-merchant-portal-gui:"^2.0.0" spryker/agent-security-merchant-portal-gui:"^2.0.0" spryker/dashboard-merchant-portal-gui:"^4.0.0" spryker/merchant-app-merchant-portal-gui:"^2.0.0" spryker/merchant-profile-merchant-portal-gui:"^4.0.0" spryker/sales-merchant-portal-gui:"^4.0.0" --update-with-dependencies
```

2. Regenerate the data transfer object:

```bash
console transfer:generate
```

## 2) Update npm dependencies

In `package.json`, do the following:

1. Adjust the npm scripts and engines:

    ```json
    {
        "scripts": {
            "mp:build": "ng build",
            "mp:build:watch": "ng build --watch",
            "mp:build:production": "ng build --configuration production",
            "mp:stylelint": "node ./frontend/merchant-portal/stylelint.mjs",
            "mp:lint": "ng lint",
            "mp:test": "ng test",
        },

        "engines": {
            "node": ">=20.19.0",
            "npm": ">=10.0.0"
        },
    }
    ```

2. Update or add the following dependencies:

```json
{
    "dependencies": {
        "@angular/animations": "~20.3.16",
        "@angular/cdk": "~20.2.14",
        "@angular/common": "~20.3.16",
        "@angular/compiler": "~20.3.16",
        "@angular/core": "~20.3.16",
        "@angular/elements": "~20.3.16",
        "@angular/forms": "~20.3.16",
        "@angular/platform-browser": "~20.3.16",
        "@angular/platform-browser-dynamic": "~20.3.16",
        "@angular/router": "~20.3.16",
        "ng-zorro-antd": "~20.4.4",
        "rxjs": "~7.8.2",
        "zone.js": "~0.15.1"
    }
}
```

3. Update or add the following dev dependencies:

    ```json
    {
        "devDependencies": {
            "@angular-builders/custom-webpack": "~20.0.0",
            "@angular-builders/jest": "~20.0.0",
            "@angular-devkit/build-angular": "~20.3.14",
            "@angular-eslint/builder": "~20.7.0",
            "@angular-eslint/eslint-plugin": "~20.7.0",
            "@angular-eslint/eslint-plugin-template": "~20.7.0",
            "@angular-eslint/template-parser": "~20.7.0",
            "@angular/cli": "~20.3.14",
            "@angular/compiler-cli": "~20.3.16",
            "@angular/language-service": "~20.3.16",
            "@babel/plugin-transform-class-properties": "~7.25.9",
            "@babel/plugin-transform-runtime": "~7.28.5",
            "@babel/preset-env": "~7.28.6",
            "@babel/preset-typescript": "~7.28.5",
            "@eslint/js": "^9.39.2",
            "@types/jest": "~30.0.0",
            "@types/node": "~25.0.9",
            "@types/webpack": "~5.28.5",
            "@typescript-eslint/eslint-plugin": "~8.53.0",
            "@typescript-eslint/parser": "~8.53.0",
            "angular-eslint": "^21.1.0",
            "eslint": "~9.39.2",
            "eslint-plugin-deprecation": "^3.0.0",
            "fast-glob": "~3.3.3",
            "jest": "~30.2.0",
            "jest-environment-jsdom": "~30.2.0",
            "jest-preset-angular": "~16.0.0",
            "typescript": "~5.9.3",
            "typescript-eslint": "^8.53.0",
        }
    }
    ```

4. Remove the following dependencies:

    ```json
    {
        "devDependencies": {
            "@nx/angular": "~18.1.1",
            "@nx/eslint": "~18.1.2",
            "@nx/eslint-plugin": "~18.1.2",
            "@nx/jest": "~18.1.2",
        }
    }
    ```

5. Update and install the package dependencies:

```bash
rm -rf node_modules
npm install
```

{% info_block warningBox "Verification" %}

Ensure that you update both the `package-lock.json` file and the `node_modules` directory.

{% endinfo_block %}

## 3) Update the Angular configuration

1. In the `frontend/merchant-portal` folder, do the following:

   1. In `jest.config.ts`, change the paths for configuration:

        ```ts
           export default {
                displayName: 'merchant-portal',
                preset: 'jest-preset-angular',
                setupFilesAfterEnv: ['<rootDir>/frontend/merchant-portal/test-setup.ts'],
                roots: ['<rootDir>/src/Pyz'],
                testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
                moduleFileExtensions: ['ts', 'js', 'html'],
                passWithNoTests: true,
                globals: {
                    'ts-jest': {
                        tsconfig: '<rootDir>/frontend/merchant-portal/tsconfig.spec.json',
                        stringifyContentPathRegex: '\\.(html|svg)$',
                    },
                },
            } 
        ```

   2. In `test-setup.ts`, replace `jest-preset-angular/setup-jest` import to `jest-preset-angular/setup-env/zone`:

        ```ts
            import 'jest-preset-angular/setup-env/zone';
            import 'reflect-metadata/lite';
        ```

2. In the root of the project, do the following:

   1. Add `**/.angular/` to `.gitignore` and `.prettierignore`.

    ```text
        **/.angular/
    ```

   2. Delete `project.json`, `nx.json`, `eslintrc.mp.json`.
   3. Add the `eslint.config.mjs` with the following configuration:

   ```js
    import typescriptEslint from '@typescript-eslint/eslint-plugin';
    import typescriptParser from '@typescript-eslint/parser';
    import deprecationPlugin from 'eslint-plugin-deprecation';
    import angularEslint from 'angular-eslint';
    import { createRequire } from 'module';

    const require = createRequire(import.meta.url);
    const sprykerConfig = require('@spryker/frontend-config.eslint/.eslintrc.js');

    export default [
        {
            ignores: [
                'docker/',
                'public/*/assets/',
                '**/dist/',
                '**/node_modules/',
                'vendor/',
                '**/.angular/',
            ],
        },
        // Configuration for regular JS files
        {
            files: ['**/*.js'],
            languageOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                globals: {
                    ...sprykerConfig.globals,
                },
            },
            rules: {
                ...sprykerConfig.rules,
                'accessor-pairs': [
                    'error',
                    {
                        setWithoutGet: true,
                        enforceForClassMembers: false,
                    },
                ],
            },
        },
        // Configuration for Yves TypeScript files
        {
            files: ['src/{Pyz,SprykerShop,SprykerFeature}/*/src/{Pyz,SprykerShop,SprykerFeature}/Yves/**/*.ts'],
            languageOptions: {
                parser: typescriptParser,
                parserOptions: {
                    ecmaVersion: 2020,
                    sourceType: 'module',
                    project: ['./tsconfig.yves.json'],
                },
                globals: {
                    ...sprykerConfig.globals,
                },
            },
            plugins: {
                '@typescript-eslint': typescriptEslint,
                deprecation: deprecationPlugin,
            },
            rules: {
                ...sprykerConfig.rules,
                'no-undef': 'off',
                'no-unused-vars': 'off',
                'accessor-pairs': [
                    'error',
                    {
                        setWithoutGet: true,
                        enforceForClassMembers: false,
                    },
                ],
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        args: 'none',
                        ignoreRestSiblings: true,
                    },
                ],
                '@typescript-eslint/no-empty-function': [
                    'error',
                    {
                        allow: ['methods'],
                    },
                ],
                '@typescript-eslint/no-magic-numbers': [
                    'error',
                    {
                        ignore: [-1, 0, 1],
                        ignoreDefaultValues: true,
                        ignoreClassFieldInitialValues: true,
                        ignoreArrayIndexes: true,
                        ignoreEnums: true,
                        ignoreReadonlyClassProperties: true,
                    },
                ],
            },
        },
        // Configuration for Merchant Portal TypeScript files
        {
            files: ['src/Pyz/Zed/*/Presentation/Components/**/*.ts'],
            languageOptions: {
                parser: typescriptParser,
                parserOptions: {
                    ecmaVersion: 2020,
                    sourceType: 'module',
                    project: ['./tsconfig.mp.json'],
                },
            },
            plugins: {
                '@typescript-eslint': typescriptEslint,
                '@angular-eslint': angularEslint.tsPlugin,
            },
            processor: angularEslint.processInlineTemplates,
            rules: {
                ...sprykerConfig.rules,
                'no-undef': 'off',
                'no-unused-vars': 'off',
                'no-console': [
                    'warn',
                    {
                        allow: ['warn', 'error'],
                    },
                ],
                'no-empty': 'error',
                'no-use-before-define': 'off',
                'max-classes-per-file': 'off',
                'max-lines': 'off',
                'handle-callback-err': 'off',
                '@typescript-eslint/array-type': 'off',
                '@typescript-eslint/no-restricted-imports': ['error', 'rxjs/Rx'],
                '@typescript-eslint/no-unused-vars': 'error',
                '@typescript-eslint/no-inferrable-types': [
                    'error',
                    {
                        ignoreParameters: true,
                    },
                ],
                '@typescript-eslint/no-non-null-assertion': 'error',
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/no-explicit-any': 'error',
                '@typescript-eslint/member-ordering': [
                    'error',
                    {
                        default: ['instance-field', 'instance-method', 'static-field', 'static-method'],
                    },
                ],
                '@angular-eslint/directive-selector': [
                    'error',
                    {
                        type: 'attribute',
                        prefix: 'mp',
                        style: 'camelCase',
                    },
                ],
                '@angular-eslint/component-selector': [
                    'error',
                    {
                        type: 'element',
                        prefix: 'mp',
                        style: 'kebab-case',
                    },
                ],
                '@angular-eslint/no-host-metadata-property': 'off',
            },
        },
        // Configuration for Merchant Portal HTML templates
        {
            files: ['src/Pyz/Zed/*/Presentation/Components/**/*.html'],
            languageOptions: {
                parser: angularEslint.templateParser,
            },
            plugins: {
                '@angular-eslint': angularEslint.templatePlugin,
            },
            rules: {
                '@typescript-eslint/ban-types': 'off',
                '@typescript-eslint/ban-ts-comment': 'off',
                '@typescript-eslint/no-empty-interface': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
                '@angular-eslint/no-host-metadata-property': 'off',
                '@angular-eslint/directive-class-suffix': 'off',
                'no-prototype-builtins': 'off',
            },
        },
    ];
   ```

   4. Add `angular.json`, with the following configuration:

   ```json
    {
        "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
        "version": 1,
        "newProjectRoot": "src",
        "projects": {
            "merchant-portal": {
                "projectType": "application",
                "schematics": {},
                "root": "",
                "sourceRoot": ".",
                "prefix": "mp",
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
                            "baseHref": "/assets/js/",
                            "index": "src/Pyz/Zed/ZedUi/Presentation/Components/index.html",
                            "main": "src/Pyz/Zed/ZedUi/Presentation/Components/main.ts",
                            "polyfills": "src/Pyz/Zed/ZedUi/Presentation/Components/polyfills.ts",
                            "tsConfig": "tsconfig.mp.json",
                            "assets": [
                                {
                                    "glob": "*/src/Spryker/Zed/*/Presentation/Components/assets/**/*",
                                    "input": "vendor/spryker",
                                    "output": "/assets/",
                                    "ignore": ["**/.gitkeep"]
                                },
                                {
                                    "glob": "*/Presentation/Components/assets/**/*",
                                    "input": "src/Pyz/Zed",
                                    "output": "/assets/",
                                    "ignore": ["**/.gitkeep"]
                                },
                                {
                                    "glob": "*/data/files/**/*",
                                    "input": "vendor/spryker",
                                    "output": "/static/",
                                    "ignore": ["**/.gitkeep"]
                                },
                                {
                                    "glob": "*/data/files/**/*",
                                    "input": "src/Pyz/Zed",
                                    "output": "/static/",
                                    "ignore": ["**/.gitkeep"]
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
                                "optimization": {
                                    "scripts": true,
                                    "styles": {
                                        "minify": true,
                                        "inlineCritical": false
                                    }
                                },
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
                        "builder": "@angular-eslint/builder:lint",
                        "options": {
                            "lintFilePatterns": [
                                "src/Pyz/Zed/*/Presentation/Components/**/*.ts",
                                "src/Pyz/Zed/*/Presentation/Components/**/*.html"
                            ]
                        }
                    },
                    "test": {
                        "builder": "@angular-builders/jest:run",
                        "options": {
                            "tsConfig": "frontend/merchant-portal/tsconfig.spec.json",
                            "configPath": "frontend/merchant-portal/jest.config.ts"
                        }
                    }
                }
            }
        },
        "cli": {
            "analytics": false
        }
    }
   ```

   5. Update the `node` and `npm` versions in all deploy YAML files.

   ```yaml
   ...
    node:
        version: 20
        npm: 10
   ...
   ```

## 4) Component breaking changes

Below is a checklist of component-related breaking changes to review when upgrading from Angular 18 to Angular 20 in a Spryker Merchant Portal (NgModule-based architecture).

1. **Explicitly set `standalone: false` for NgModule-based components**
   - **What to do:** For all `@Component()`, `@Directive()`, and `@Pipe()` declarations that are registered via `NgModule.declarations`, explicitly add `standalone: false`.
   - **Why:** Starting with newer Angular major versions v19+, Angular shifts toward standalone-first behavior. Without an explicit flag, components may be treated as standalone, resulting in build errors.

2. **Ensure standalone components do not implicitly require `imports`**
   - **What to do:** If any component unintentionally becomes standalone, verify that it does not break template features such as `*ngIf`, `*ngFor`, or `*ngSwitch` due to missing `CommonModule`.
   - **Why:** Standalone components must explicitly declare dependencies via `imports`. In the Merchant Portal setup, it is safer to keep components NgModule-based and enforce `standalone: false`.

3. **Review `NgModule` metadata (declarations, imports, exports)**
   - **What to do:** Verify that:
     - All externally used components are listed in `exports`.
     - All required modules are included in `imports`.
     - No standalone components are incorrectly declared.
   - **Why:** Angular v20 applies stricter validation to module metadata, and previously tolerated misconfigurations may now fail at build time.

4. **Validate dynamic component creation**
   - **What to do:** For components created dynamically (for example via `createComponent`, `NgComponentOutlet`, CDK portals, or legacy `ComponentFactoryResolver` usage), ensure:
     - A valid `Injector` or `EnvironmentInjector` is provided
     - Required providers are available in the component context
   - **Why:** Angular enforces stricter DI and runtime checks, and misconfigured dynamic rendering can cause runtime errors.

5. **Enforce migration to the new template control flow syntax**
   - **What to do:** Actively migrate all templates to the new Angular control flow syntax (`@if`, `@for`, `@switch`) and avoid mixing it with legacy structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`). New or modified templates must use the new syntax only.
   - **Why:** Legacy structural directives are considered deprecated. Mixing old and new syntaxes within the same module increases cognitive load, complicates reviews, and leads to subtle and hard-to-debug template regressions. Enforcing a single, modern control flow standard improves consistency, readability, and long-term maintainability.

## Reference Pull Request

As a practical example of upgrading Angular to v20 in a real project, you can review the following Pull Request:

<https://github.com/spryker-shop/b2b-demo-marketplace/pull/857>

{% info_block warningBox "Important" %}

This Pull Request contains **additional changes that are not required for the Angular upgrade**, including:
- Stylelint configuration updates
- Prettier configuration changes
- Other formatting and linting-related adjustments

When using this Pull Request as a reference, **do not blindly apply all changes**.  
Focus only on the Angular-related modifications. The Stylelint and Prettier updates are optional and can be safely ignored for the purpose of upgrading Angular to v20.

{% endinfo_block %}
