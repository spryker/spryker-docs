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

Spryker uses [API Platform's configuration options](https://api-platform.com/docs/core/configuration/#symfony-configuration) with Spryker-specific adaptations for PHP-based configuration and environment control.

## Configuration file locations

Configuration files are located in application-specific directories:

- **GlueBackend:** `config/GlueBackend/packages/api_platform.php`
- **GlueStorefront:** `config/GlueStorefront/packages/api_platform.php`
- **Glue:** `config/Glue/packages/api_platform.php`

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

## Spryker-specific bundle configuration

In addition to the upstream `ApiPlatformConfig`, Spryker ships its own bundle configuration under the alias `spryker_api_platform`. It controls how YAML resource schemas are discovered across the `src/Spryker`, `src/SprykerFeature`, and `src/Pyz` trees before they are handed to API Platform for code generation.

The PHP configurator lives in a separate file per application:

- **Glue:** `config/Glue/packages/spryker_api_platform.php`
- **GlueStorefront:** `config/GlueStorefront/packages/spryker_api_platform.php`
- **GlueBackend:** `config/GlueBackend/packages/spryker_api_platform.php`

```php
<?php

declare(strict_types=1);

use Symfony\Config\SprykerApiPlatformConfig;

return static function (SprykerApiPlatformConfig $sprykerApiPlatform): void {
    $sprykerApiPlatform->apiTypes(['storefront']);
};
```

### Configuration options

| Method | Matches against | Default | Purpose |
|---|---|---|---|
| `apiTypes(array $types)` | — | `[]` (all discovered) | The list of API types (e.g., `storefront`, `backend`) this application exposes. Used both for schema directory lookup (`resources/api/{apiType}`) and for filtering services annotated with `#[ApiType]`. |
| `sourceDirectories(array $directories)` | — | `['vendor/spryker', 'src/Pyz']` | Root directories scanned for `{Module}/resources/api/{apiType}/*.resource.{yaml,yml}` schema files. Paths are resolved relative to the project root. |
| `includedPathFragments(array $fragments)` | Full real file path, `str_contains` | `[]` | Allowlist. When non-empty, only schema files whose real path contains at least one of the fragments are kept. |
| `excludedPathFragments(array $fragments)` | Full real file path, `str_contains` | `[]` | Blocklist. Any schema file whose real path contains at least one fragment is dropped. |
| `includedModulePatterns(array $patterns)` | Module directory name, `fnmatch` | `[]` | Allowlist on the module name segment. When non-empty, only modules whose name matches at least one glob pattern contribute schemas. |
| `excludedModulePatterns(array $patterns)` | Module directory name, `fnmatch` | `[]` | Blocklist on the module name segment. Modules whose name matches any pattern are skipped, even if included elsewhere. |
| `debug(bool $enabled)` | — | `%kernel.debug%` | Disables caching and enables verbose output for the schema generator. |

### Evaluation order

Filters are applied in the following order during schema discovery:

1. **Module-level allowlist** (`includedModulePatterns`). If set, a module must match at least one pattern or it is skipped entirely.
2. **Module-level blocklist** (`excludedModulePatterns`). Matching modules are skipped.
3. **File-level allowlist** (`includedPathFragments`). If set, a schema file must match at least one fragment or it is skipped.
4. **File-level blocklist** (`excludedPathFragments`). Matching files are skipped.

Blocklists always win over allowlists: a module or file that matches both the `included*` and the `excluded*` list is dropped.

### Example: Split legacy Glue and API Platform storefront by module suffix

Projects that run the legacy Glue REST stack and the new API Platform storefront side by side typically want to route `*RestApi` modules to the legacy app while the rest stays on API Platform. That split can be expressed declaratively:

```php
// config/Glue/packages/spryker_api_platform.php
return static function (SprykerApiPlatformConfig $sprykerApiPlatform): void {
    $sprykerApiPlatform->apiTypes(['storefront']);

    // Legacy Glue app: only *RestApi modules.
    $sprykerApiPlatform->includedModulePatterns(['*RestApi']);
};
```

```php
// config/GlueStorefront/packages/spryker_api_platform.php
return static function (SprykerApiPlatformConfig $sprykerApiPlatform): void {
    $sprykerApiPlatform->apiTypes(['storefront']);

    // API Platform storefront: exclude every legacy *RestApi module.
    $sprykerApiPlatform->excludedModulePatterns(['*RestApi']);
};
```

### Example: Narrow discovery to explicit modules or paths

When you want to opt in module-by-module, combine `includedPathFragments` with precise path prefixes:

```php
$sprykerApiPlatform->includedPathFragments([
    'src/Pyz/',
    'src/Spryker/Cart/resources/api/',
    'src/Spryker/Customer/resources/api/',
]);
```

This allowlist keeps only schemas from project-level overrides plus two explicitly enabled core modules. Any schema file whose real path does not contain one of these fragments is skipped.

### Example: Per-resource exclusion on a module you otherwise keep

`excludedPathFragments` remains useful for carve-outs that do not map to a whole module suffix — for example, when two applications each want to own a different `/token` endpoint:

```php
// config/GlueStorefront/packages/spryker_api_platform.php
$sprykerApiPlatform->excludedPathFragments([
    'src/Spryker/AuthRestApi/resources/api/',
]);
```

This drops only the `AuthRestApi` schemas while leaving the rest of the allowlist/blocklist logic untouched.
