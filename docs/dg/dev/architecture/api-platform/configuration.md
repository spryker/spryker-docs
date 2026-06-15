---
title: API Platform Configuration
description: Configure API Platform in Spryker using PHP-based configuration files with environment-specific settings.
last_updated: Mar 9, 2026
template: howto-guide-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
  - title: Native API Platform Resources
    link: docs/dg/dev/architecture/api-platform/native-api-platform-resources.html
  - title: Security
    link: docs/dg/dev/architecture/api-platform/security.html
---

This page is the canonical reference for all API Platform configuration in Spryker. API Platform is configured through **two** PHP config files per application: the native `api_platform.php` (API Platform's own options, with Spryker adaptations for PHP-based configuration and environment control) and Spryker's `spryker_api_platform.php` (which drives schema generation). Both are documented below.

## Configuration file locations

Each application layer carries two configuration files:

| Application | Native API Platform config | Spryker generator config |
|---|---|---|
| Glue | `config/Glue/packages/api_platform.php` | `config/Glue/packages/spryker_api_platform.php` |
| GlueStorefront | `config/GlueStorefront/packages/api_platform.php` | `config/GlueStorefront/packages/spryker_api_platform.php` |
| GlueBackend | `config/GlueBackend/packages/api_platform.php` | `config/GlueBackend/packages/spryker_api_platform.php` |

- **`api_platform.php`** configures API Platform itself (Swagger, formats, pagination defaults, resource mapping paths). Documented under [Native API Platform configuration](#native-api-platform-configuration-api_platformphp) below.
- **`spryker_api_platform.php`** configures Spryker's schema generator (which API types an application serves, where schemas are scanned, which modules stay on Glue). Documented under [Resource generation configuration](#resource-generation-configuration-spryker_api_platformphp) below.

## Released configuration reference

The simplest starting point is a real, released configuration. The links below point to the B2B Demo Marketplace at the latest release (`release-202604.0`); check newer releases for updates.

| Application | `api_platform.php` | `spryker_api_platform.php` |
|---|---|---|
| Glue | [api_platform.php](https://github.com/spryker-shop/b2b-demo-marketplace/blob/release-202604.0/config/Glue/packages/api_platform.php) | [spryker_api_platform.php](https://github.com/spryker-shop/b2b-demo-marketplace/blob/release-202604.0/config/Glue/packages/spryker_api_platform.php) |
| GlueStorefront | [api_platform.php](https://github.com/spryker-shop/b2b-demo-marketplace/blob/release-202604.0/config/GlueStorefront/packages/api_platform.php) | [spryker_api_platform.php](https://github.com/spryker-shop/b2b-demo-marketplace/blob/release-202604.0/config/GlueStorefront/packages/spryker_api_platform.php) |
| GlueBackend | [api_platform.php](https://github.com/spryker-shop/b2b-demo-marketplace/blob/release-202604.0/config/GlueBackend/packages/api_platform.php) | [spryker_api_platform.php](https://github.com/spryker-shop/b2b-demo-marketplace/blob/release-202604.0/config/GlueBackend/packages/spryker_api_platform.php) |

## Resource generation configuration (`spryker_api_platform.php`)

`spryker_api_platform.php` controls Spryker's API Platform schema generator — it is separate from the native `api_platform.php`. Create one in each application layer where you enable API Platform. The files share the same shape; they differ only in `apiTypes()` and in the modules each application still serves via Glue.

Three settings:

- `apiTypes()` — the API types this application serves: `['storefront']` for the Glue and GlueStorefront applications, `['backend']` for the GlueBackend application.
- `sourceDirectories()` — where the generator scans for API Platform schemas. Optional; defaults to `src/Spryker`, `src/SprykerFeature`, and `src/Pyz`. Set it only if your schemas live somewhere else.
- `excludedPathFragments()` — schema paths the generator skips. Use it to keep a module's API Platform schemas hidden from the generator (for example, a module the project still serves via Glue). Each entry is matched as a substring of the full schema path.

{% info_block warningBox "excludedPathFragments does not switch routing" %}

`excludedPathFragments` controls only what the schema generator emits. It does **not** flip routing. A module stays on Glue as long as its `*ResourceRoutePlugin` is registered in the project dependency provider. See [Step 3 — Batch migration in the migration overview](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform-overview.html#step-3--batch-migration-default).

{% endinfo_block %}

`config/Glue/packages/spryker_api_platform.php` (storefront example):

```php
<?php

declare(strict_types = 1);

use Symfony\Config\SprykerApiPlatformConfig;

return static function (SprykerApiPlatformConfig $sprykerApiPlatform): void {
    $sprykerApiPlatform->apiTypes(['storefront']);

    // Keep these modules on the Glue REST stack by hiding their API Platform schemas from the generator.
    $sprykerApiPlatform->excludedPathFragments([
        'vendor/spryker/customer/src/Spryker/Customer/resources/api/',
        'vendor/spryker/store/src/Spryker/Store/resources/api/',
        'vendor/spryker/authentication/src/Spryker/Authentication/resources/api/',
    ]);
};
```

For the GlueBackend application, set `apiTypes(['backend'])` and list the modules that application still serves via Glue in `excludedPathFragments()`.

## Native API Platform configuration (`api_platform.php`)

The remainder of this page documents `api_platform.php`.

## Spryker-specific differences

### PHP configuration instead of YAML

Spryker uses PHP configuration with Symfony's type-safe configuration objects instead of YAML files:

```php
use Symfony\Config\ApiPlatformConfig;

return static function (ApiPlatformConfig $apiPlatform, string $env): void {
    // Configuration here
};
```

### Environment variable for conditional settings

The configuration function receives an `$env` parameter for environment-specific behavior:

```php
return static function (ApiPlatformConfig $apiPlatform, string $env): void {
    // Enable developer tools only in development
    if ($env === 'dockerdev') {
        $apiPlatform->enableSwagger(true);
        $apiPlatform->enableSwaggerUi(true);
        $apiPlatform->enableReDoc(true);
        $apiPlatform->enableDocs(true);
    }
};
```

Common environment values: `prod`, `dev`, `dockerdev`, `test`

## Configuration examples

### Disable SwaggerUI in production

Spryker shows the SwaggerUI only in development environments by default. This can be configured with:

```php
if ($env === 'dockerdev') {
        $apiPlatform->enableSwagger(true);
        $apiPlatform->enableSwaggerUi(true);
        $apiPlatform->enableReDoc(true);
        $apiPlatform->enableDocs(true);
    }
```

### Disable Doctrine integration

Spryker does not use Doctrine with API Platform:

```php
$apiPlatform->doctrine()->enabled(false);
$apiPlatform->doctrineMongodbOdm()->enabled(false);
```

### Configure resource mapping paths

Specify where API Platform discovers resource classes. By default, only the generated resource directory is configured:

```php
$apiPlatform->mapping()->paths([
    '%kernel.project_dir%/src/Generated/Api/Backend'
]);
```

### Add custom resource paths

To use native API Platform resources alongside generated resources, add your directories to the mapping paths:

```php
$apiPlatform->mapping()->paths([
    '%kernel.project_dir%/src/Generated/Api/Backend',
    '%kernel.project_dir%/src/Pyz/Glue/*/Api/Backend/Resource',
]);
```

API Platform scans all configured paths for PHP classes with `#[ApiResource]` attributes. Generated and manually created resources coexist without conflict.

{% info_block warningBox "Keep the generated path" %}

Always keep the `src/Generated/Api/{ApiType}` path in the list. Removing it disables all YAML-generated resources.

{% endinfo_block %}

For a complete guide on creating native resources, see [Native API Platform Resources](/docs/dg/dev/architecture/api-platform/native-api-platform-resources.html).

### Set pagination defaults

```php
$apiPlatform->defaults()->paginationItemsPerPage(10);

$apiPlatform->collection()
    ->pagination()
        ->pageParameterName('page')
        ->itemsPerPageParameterName('itemsPerPage');
```

These global defaults apply to all resources. Individual resources can override pagination behavior using per-resource options such as `paginationEnabled`, `paginationItemsPerPage`, `paginationMaximumItemsPerPage`, `paginationClientEnabled`, and `paginationClientItemsPerPage` in their YAML schema files. See [Resource Schemas — Pagination](/docs/dg/dev/architecture/api-platform/resource-schemas.html#pagination) for details.

### Configure supported formats

```php
$apiPlatform->formats('jsonapi', ['mime_types' => ['application/vnd.api+json']]);
$apiPlatform->formats('jsonld', ['mime_types' => ['application/ld+json']]);
$apiPlatform->formats('xml', ['mime_types' => ['application/xml']]);
```

### Configure security

Security is configured in a separate `security.php` file. For details, see [How to integrate API Platform Security](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html).

## Complete configuration reference

For all available configuration options and their details, refer to the [API Platform Symfony Configuration documentation](https://api-platform.com/docs/core/configuration/#symfony-configuration).

The PHP method names in `ApiPlatformConfig` correspond directly to the YAML keys in the official documentation.
