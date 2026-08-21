---
title: Security release notes 202608.0
description: Security updates released for version 202608.0
last_updated: Aug 17, 2026
template: concept-topic-template
publish_date: "2026-08-06"
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Removal of eval() function

Use of the eval() function has been removed from the codebase. Even though no security issues were identified due to its use, it was removed in order to follow security best practices.

### Affected modules

- `spryker/testify`: < 3.66.0

### Fix the vulnerability

Update the affected Spryker package:

```bash
composer update spryker/testify:"^3.66.0"
composer show spryker/testify # Verify the version
```

Add or adjust the $config[TestifyConstants::IS_DATA_BUILDER_RULE_EVAL_ENABLED] line within the `config/Shared/config_default.php` file:

```bash
use Spryker\Shared\Testify\TestifyConstants;

if (class_exists(TestifyConstants::class)) {
    $config[TestifyConstants::IS_DATA_BUILDER_RULE_EVAL_ENABLED] = false;
}
```

## Vulnerabilities in third-party dependencies

Several third-party dependencies were updated to address publicly known vulnerabilities present in earlier versions. The updated dependencies are listed below.

### Affected packages

- `symfony/twig-bridge`: < 6.4.43
- `nikic/php-parser` : < 5.8.0
- `aws/aws-sdk-php` : < 3.389.3
- `symfony/security-core` : < 6.4.43

### Fix the vulnerability

```bash
composer update symfony/twig-bridge nikic/php-parser aws/aws-sdk-php symfony/security-core
```

## Vulnerabilities in third-party npm dependencies of the Back Office

Publicly known vulnerabilities were identified in the `dompurify` and `pbf` npm packages, which the Back Office assets depend on:

- `dompurify` before 3.4.12 lets an allowed custom element bypass the `afterSanitizeElements` hook, which can result in cross-site scripting (XSS).
- `pbf` before 5.1.2 contains a known vulnerability in the protocol buffer decoder. In the Back Office, this package is reached through the chart bundle.

Both packages are declared by Spryker modules, so the fixed versions become available to your project with a module update.

### Affected modules

- `spryker/gui`: < 5.3.2 — declares `dompurify`
- `spryker/chart`: < 1.6.4 — declares `pbf`

### Fix the vulnerability

1. Update the affected packages:

```bash
composer update spryker/gui:"^5.3.2" spryker/chart:"^1.6.4"
composer show spryker/gui spryker/chart # Verify the versions
```

2. Reinstall the npm dependencies and rebuild the Back Office assets:

```bash
console frontend:project:install-dependencies
console frontend:zed:build
```

3. Verify that the fixed versions are installed:

```bash
npm ls dompurify pbf
```

### Fix the vulnerability without a module update

If you cannot update the modules yet, enforce the fixed versions from the root `package.json` file of your project:

```json
{
    "overrides": {
        "dompurify": "^3.4.12",
        "pbf": "~5.1.2"
    }
}
```

Afterwards, re-resolve the dependencies and rebuild the Back Office assets:

```bash
npm update dompurify pbf
npm ls dompurify pbf # Verify the versions
console frontend:zed:build
```

{% info_block warningBox "Working with overrides" %}

npm applies the `overrides` block only from the root `package.json` file. An `overrides` block inside a workspace package, such as a module in `vendor/spryker`, is ignored. Also, run `npm update <package>` after you add an override: a plain `npm install` keeps the version that the lock file already contains.

Generate the lock file with the same major npm version that your Docker images use. npm 10 and npm 11 resolve overrides inside workspaces differently, so a lock file generated with npm 11 can break `npm ci` in an environment that runs npm 10.

{% endinfo_block %}

## Vulnerabilities in Angular packages of the Merchant Portal

Publicly known vulnerabilities were identified in the Angular `HttpTransferCache`. Responses that carry `Set-Cookie` headers were cached and could be exposed to other users through a shared cache or a CDN, and ambiguous cache keys could lead to cross-request response reuse. Angular 20.3.26 and 20.3.27 fix both issues.

No Spryker module update is required. The Angular packages are declared in the `package.json` file of your project, and Merchant Portal modules reference Angular through peer dependencies (`>=20.3.0 <21.0.0`), which the fixed versions satisfy.

### Affected packages

- `@angular/common`: < 20.3.27

### Fix the vulnerability

1. Update the Angular packages to the latest 20.3.x patch release. Because the packages are declared with a tilde constraint, such as `~20.3.22`, `npm update` installs the patch release:

```bash
npm update @angular/animations @angular/common @angular/compiler @angular/core @angular/elements @angular/forms @angular/platform-browser @angular/platform-browser-dynamic @angular/router @angular/compiler-cli @angular/language-service
npm ls @angular/common # Verify the version
```

If your project pins an exact version, set the constraints in `package.json` to `~20.3.27` first, and then run `npm install`.

2. Rebuild the Merchant Portal assets:

```bash
console frontend:mp:build
```

## Vulnerabilities in third-party npm dependencies of the Merchant Portal build

Publicly known vulnerabilities were identified in `hono` and `@hono/node-server`, which are reached through `@angular/cli` and `@modelcontextprotocol/sdk`. These packages are development dependencies of the Merchant Portal build. They run only during the build and are never shipped to the browser, so the impact on a production environment is limited.

No Spryker module update is required. These packages are resolved from the `package.json` file of your project.

### Affected packages

- `@modelcontextprotocol/sdk`: < 1.30.0
- `hono`: < 4.12.34
- `@hono/node-server`: < 2.0.10

### Fix the vulnerability

1. Add the following override to the root `package.json` file of your project. Version 1.30.0 of `@modelcontextprotocol/sdk` widens its peer dependency range and lets npm resolve the fixed `hono` versions:

```json
{
    "overrides": {
        "@modelcontextprotocol/sdk": "1.30.0"
    }
}
```

2. Re-resolve the dependencies:

```bash
npm update @modelcontextprotocol/sdk hono @hono/node-server
npm ls @modelcontextprotocol/sdk hono @hono/node-server # Verify the versions
```

3. Rebuild the Merchant Portal assets:

```bash
console frontend:mp:build
```
