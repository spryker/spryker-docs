---
title: How to integrate API Platform
description: This document describes how to integrate API Platform into your Spryker application.
last_updated: Feb 26, 2026
template: howto-guide-template
---

This document describes how to integrate API Platform into your Spryker application to enable schema-based API resource generation.

If you're migrating an existing Spryker shop from the Glue REST stack, read the [API Platform migration overview](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform-overview.html) first. This integration guide is one step inside that larger flow.

## Prerequisites

Before integrating API Platform, ensure you have:

- Upgraded to Symfony Dependency Injection as described in [How to upgrade to Symfony Dependency Injection](/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html)
- PHP 8.1 or higher
- Symfony 6.4 or higher components

## 1. Install the required modules

To integrate API Platform, install the following modules:

```bash
composer require spryker/api-platform:"^0.5.0" --update-with-dependencies
```

{% info_block infoBox "Target versions" %}

For the list of currently migrated modules and their status, see the [Glue API to API Platform migration status page](/docs/dg/dev/architecture/api-platform/migrate-to-api-platform-status.html). Update your `spryker/*-rest-api` modules to a version that ships the endpoints you migrate.

{% endinfo_block %}

## 2. Register bundles

Register the required bundles in each application's bundle file — `config/Glue/bundles.php`, `config/GlueStorefront/bundles.php`, and `config/GlueBackend/bundles.php` are identical:

```php
<?php

declare(strict_types = 1);

use ApiPlatform\Symfony\Bundle\ApiPlatformBundle;
use Spryker\ApiPlatform\SprykerApiPlatformBundle;
use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\SecurityBundle\SecurityBundle;
use Symfony\Bundle\TwigBundle\TwigBundle;

return [
    FrameworkBundle::class => ['all' => true],
    SecurityBundle::class => ['all' => true],
    TwigBundle::class => ['all' => true],
    ApiPlatformBundle::class => ['all' => true],
    SprykerApiPlatformBundle::class => ['all' => true],
];
```

{% info_block infoBox "SecurityBundle" %}

The `SecurityBundle` enables authentication and authorization for API Platform resources using Bearer token (JWT) validation and security expressions. For detailed setup including firewall configuration, see [How to integrate API Platform Security](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html).

{% endinfo_block %}

## 3. Configure API Platform

Create a `spryker_api_platform.php` config file in each application layer where you want to enable API Platform — `config/Glue/packages/`, `config/GlueStorefront/packages/`, and `config/GlueBackend/packages/`. The files share the same shape; they differ only in `apiTypes()` (`['storefront']` for the Glue and GlueStorefront applications, `['backend']` for the GlueBackend application) and in the modules each application still serves via Glue.

Two settings deserve attention:

- `sourceDirectories()` — where the generator scans for API Platform schemas. Optional; it defaults to `src/Spryker`, `src/SprykerFeature`, and `src/Pyz`. Set it only if your schemas live somewhere else.
- `excludedPathFragments()` — schema paths the generator skips. Use it to keep a module's API Platform schemas hidden from the generator (for example, a module the project still serves via Glue). Each entry is matched as a substring of the full schema path. This does NOT switch routing — see [Step 3 — Batch migration in the overview](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform-overview.html#step-3--batch-migration-default) for how routing actually flips.

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

For the GlueBackend application, set `apiTypes(['backend'])` and list the modules that application still serves via Glue in `excludedPathFragments()` (for example `vendor/spryker/store/src/Spryker/Store/resources/api/`, `vendor/spryker/currency/src/Spryker/Currency/resources/api/`, `vendor/spryker/locale/src/Spryker/Locale/resources/api/`, `vendor/spryker/store-context/src/Spryker/StoreContext/resources/api/`).

## 4. Update Router Configuration

Update the router dependency provider for each application where you want to enable API Platform routes.

### For Glue application

`src/Pyz/Glue/Router/RouterDependencyProvider.php`

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\Router;

use Spryker\Glue\Router\Plugin\Router\SymfonyFrameworkRouterPlugin;
use Spryker\Glue\GlueApplication\Plugin\Rest\GlueRouterPlugin;
use Spryker\Glue\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\RouterExtension\Dependency\Plugin\RouterPluginInterface>
     */
    protected function getRouterPlugins(): array
    {
        return [
            new GlueRouterPlugin(), // Existing Glue API router
            new SymfonyFrameworkRouterPlugin(), // Add this for API Platform routes
        ];
    }
}
```

{% info_block infoBox "Router order matters" %}

The order of router plugins matters. The `SymfonyFrameworkRouterPlugin` must be added after existing router plugins to ensure the correct routing priority. The `GlueRouterPlugin` should remain the first in the list to handle existing and not yet migrated Glue API endpoints.

When migrating existing Glue API endpoints to API Platform, you need to remove endpoints from the `GlueRouterPlugin` so that the `SymfonyFrameworkRouterPlugin` is used to resolve the route. To remove routes from the `GlueRouterPlugin` update the corresponding `GlueApplicationDependencyProvider`, `GlueBackendApiApplicationDependencyProvider`, or `GlueStorefrontApiApplicationDependencyProvider` and remove the resource route plugin for the route you currently migrate.

{% endinfo_block %}

## 5. Generate API resources

After configuration, generate your API resources from schema files:

```bash
# Generate resources for all configured API types in Glue
docker/sdk cli glue api:generate

# Generate resources for all configured API types in GlueStorefront
docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue api:generate

# Generate resources for all configured API types in GlueBackend
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate

# Generate resources for a specific API type in Glue (others can follow the env var examples above)
docker/sdk cli glue api:generate storefront
docker/sdk cli glue api:generate backend

# Dry run (see what would be generated)
docker/sdk cli glue api:generate --dry-run

# Validate schemas only
docker/sdk cli glue api:generate --validate-only
```

The generated resources will be created in `src/Generated/Api/{ApiType}/` directory.

## 6. Install assets for the API Platform documentation interface

Install the necessary assets for API Platform to function correctly:

### For Glue application

```bash
docker/sdk cli glue assets:install public/Glue/assets --symlink
```

### For GlueStorefront

```bash
docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue assets:install public/GlueStorefront/assets/ --symlink
```

### For GlueBackend

```bash
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue assets:install public/GlueBackend/assets/ --symlink
```

{% info_block warningBox "Required step" %}

The `assets:install` command is required to copy the necessary assets (CSS, JavaScript, images) for the API Platform documentation interface. Without this step, the API documentation UI will not display correctly.

{% endinfo_block %}

## 7. Clear caches

After generation and asset installation, clear application caches:

```bash
# Clear all caches
console cache:clear

# Build Symfony container cache
console container:build
```

## Verification

To verify your integration:

1. **Debug available resources:**

   ```bash
   # List all API resources
   docker/sdk cli glue  api:debug --list

   # Inspect specific resource
   docker/sdk cli glue  api:debug access-tokens --api-type=storefront
   ```

2. **Access API documentation:**
   - Glue: `https://glue.your-domain/`
   - GlueStorefront: `https://glue-storefront.your-domain/`
   - GlueBackend: `https://glue-backend.your-domain/`

   The interactive OpenAPI documentation interface will be displayed at the root URL of each application.

   Depending on the environment of the application (development or production), the documentation interface may be enabled or disabled by default. Currently, it is only enabled in development (docker.dev) environments.
   
   You can enable/disable this interface by configuring the settings in your `api_platform.php` configuration files.

## Next steps

- [API Platform](/docs/dg/dev/architecture/api-platform.html) - Overview and concepts
- [How to integrate API Platform Security](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html) - Authentication and authorization setup
- [API Platform migration overview](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform-overview.html) - End-to-end migration walk-through
- [Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Create your first API resource
- [Resource Schemas](/docs/dg/dev/architecture/api-platform/resource-schemas.html) - Resource Schemas
- [Validation Schemas](/docs/dg/dev/architecture/api-platform/validation-schemas.html) - Validation Schemas
- [Native API Platform Resources](/docs/dg/dev/architecture/api-platform/native-api-platform-resources.html) - Using native PHP attributes
