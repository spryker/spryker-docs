---
title: API Platform Configuration
description: Configure API Platform in Spryker using PHP-based configuration files with environment-specific settings.
last_updated: Feb 26, 2026
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

API Platform scans all configured paths for PHP classes with `#[ApiResource]` attributes. Generated and hand-written resources coexist without conflict.

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
