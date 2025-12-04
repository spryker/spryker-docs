---
title: How to integrate API Platform
description: This document describes how to integrate API Platform into your Spryker application.
last_updated: Nov 24, 2025
template: howto-guide-template
---

This document describes how to integrate API Platform into your Spryker application to enable schema-based API resource generation.

## Prerequisites

Before integrating API Platform, ensure you have:

- Upgraded to Symfony Dependency Injection as described in [How to upgrade to Symfony Dependency Injection](/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html)
- PHP 8.1 or higher
- Symfony 6.4 or higher components

## 1. Install the required modules

To integrate API Platform, install the following modules:

```bash
composer require \
  spryker/api-platform:"^1.0.0" \
  api-platform/core:"^3.2.0" \
  nelmio/cors-bundle:"^2.4.0" \
  --update-with-dependencies
```

{% info_block infoBox "Module placeholder" %}

The exact module versions will be provided in the final documentation. The above serves as a placeholder for the module list.

{% endinfo_block %}

## 2. Register bundles

Register the required bundles in your application's bundle configuration files for each application layer where you want to enable API Platform.

### For Glue application

`config/Glue/bundles.php`

```php
<?php

declare(strict_types = 1);

use ApiPlatform\Symfony\Bundle\ApiPlatformBundle;
use Nelmio\CorsBundle\NelmioCorsBundle;
use Spryker\ApiPlatform\SprykerApiPlatformBundle;
use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\TwigBundle\TwigBundle;

return [
    FrameworkBundle::class => ['all' => true],
    TwigBundle::class => ['all' => true],
    NelmioCorsBundle::class => ['all' => true],
    ApiPlatformBundle::class => ['all' => true],
    SprykerApiPlatformBundle::class => ['all' => true],
];
```

### For GlueStorefront application

`config/GlueStorefront/bundles.php`

```php
<?php

declare(strict_types = 1);

use ApiPlatform\Symfony\Bundle\ApiPlatformBundle;
use Nelmio\CorsBundle\NelmioCorsBundle;
use Spryker\ApiPlatform\SprykerApiPlatformBundle;
use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\TwigBundle\TwigBundle;

return [
    FrameworkBundle::class => ['all' => true],
    ApiPlatformBundle::class => ['all' => true],
    SprykerApiPlatformBundle::class => ['all' => true],
    TwigBundle::class => ['all' => true],
    NelmioCorsBundle::class => ['all' => true],
];
```

### For GlueBackend application

`config/GlueBackend/bundles.php`

```php
<?php

declare(strict_types = 1);

use ApiPlatform\Symfony\Bundle\ApiPlatformBundle;
use Nelmio\CorsBundle\NelmioCorsBundle;
use Spryker\ApiPlatform\SprykerApiPlatformBundle;
use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\TwigBundle\TwigBundle;

return [
    FrameworkBundle::class => ['all' => true],
    ApiPlatformBundle::class => ['all' => true],
    SprykerApiPlatformBundle::class => ['all' => true],
    TwigBundle::class => ['all' => true],
    NelmioCorsBundle::class => ['all' => true],
];
```

## 3. Configure API Platform

Create configuration files for the API Platform in each application layer where you want to enable the API-Platform.

### Configure for Glue

`config/Glue/packages/spryker_api_platform.php`

```php
<?php

declare(strict_types=1);

use Symfony\Config\SprykerApiPlatformConfig;

return static function (SprykerApiPlatformConfig $sprykerApiPlatform): void {
    $sprykerApiPlatform->apiTypes(['storefront']);
};
```

### Configure for GlueStorefront

`config/GlueStorefront/packages/spryker_api_platform.php`

```php
<?php

declare(strict_types=1);

use Symfony\Config\SprykerApiPlatformConfig;

return static function (SprykerApiPlatformConfig $sprykerApiPlatform): void {
    $sprykerApiPlatform->apiTypes(['storefront']);
};
```

### Configure for GlueBackend

`config/GlueBackend/packages/spryker_api_platform.php`

```php
<?php

declare(strict_types=1);

use Symfony\Config\SprykerApiPlatformConfig;

return static function (SprykerApiPlatformConfig $sprykerApiPlatform): void {
    $sprykerApiPlatform->apiTypes(['backend']);
};
```

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

## 6. Install assets

Install the necessary assets for API Platform to function correctly:

### For Glue application

```bash
docker/sdk cli glue assets:install public/Glue/assets  --symlink
```

### For GlueStorefront

```bash
docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue assets:install public/GlueStorefront/assets/  --symlink
```

### For GlueBackend

```bash
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue assets:install public/GlueBackend/assets/  --symlink
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

1. **Check generated resources:**

   ```bash
   ls -la src/Generated/Api/Storefront/
   ls -la src/Generated/Api/Backend/
   ```

2. **Debug available resources:**

   ```bash
   # List all API resources
   docker/sdk cli glue  api:debug --list

   # Inspect specific resource
   docker/sdk cli glue  api:debug access-tokens --api-type=storefront
   ```

3. **Access API documentation:**
   - Glue: `https://glue.your-domain/`
   - GlueStorefront: `https://glue-storefront.your-domain/`
   - GlueBackend: `https://glue-backend.your-domain/`

   The interactive OpenAPI documentation interface will be displayed at the root URL of each application.

   You can disable this interface in production environments by configuring the `api_platform.enable_docs` setting in your configuration files.

## Next steps

- [API Platform](/docs/dg/dev/architecture/api-platform.html) - Overview and concepts
- [Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Create your first API resource
- [Schemas and Resource Generation](/docs/dg/dev/architecture/api-platform/schemas-and-resource-generation.html) - Define resource schemas
