---
title: API Platform Configuration
description: Configure API Platform in Spryker using PHP-based configuration files with environment-specific settings.
last_updated: Jan 27, 2026
template: howto-guide-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
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

Specify where generated API resources are located:

```php
$apiPlatform->mapping()->paths([
    '%kernel.project_dir%/src/Generated/Api/Backend'
]);
```

### Set pagination defaults

```php
$apiPlatform->defaults()->paginationItemsPerPage(10);

$apiPlatform->collection()
    ->pagination()
        ->pageParameterName('page')
        ->itemsPerPageParameterName('itemsPerPage');
```

### Configure supported formats

```php
$apiPlatform->formats('jsonapi', ['mime_types' => ['application/vnd.api+json']]);
$apiPlatform->formats('jsonld', ['mime_types' => ['application/ld+json']]);
$apiPlatform->formats('xml', ['mime_types' => ['application/xml']]);
```

## Complete configuration reference

For all available configuration options and their details, refer to the [API Platform Symfony Configuration documentation](https://api-platform.com/docs/core/configuration/#symfony-configuration).

The PHP method names in `ApiPlatformConfig` correspond directly to the YAML keys in the official documentation.
