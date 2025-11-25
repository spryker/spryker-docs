---
title: How to integrate API Platform
description: This document describes how to integrate API Platform into your Spryker application.
last_updated: Nov 24, 2025
template: howto-guide-template
---

This document describes how to integrate API Platform into your Spryker application to enable schema-based REST API resource generation.

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

### For Glue application (Storefront APIs)

`config/Symfony/GLUE/bundles.php`

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

### For Zed application (Backoffice APIs)

`config/Symfony/ZED/bundles.php`

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

Create configuration files for API Platform in each application layer.

### Configure for Glue (Storefront)

`config/Symfony/GLUE/packages/spryker_api_platform.php`

```php
<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $containerConfigurator): void {
    $containerConfigurator->extension('spryker_api_platform', [
        // Configure which API types to generate and cache warm
        // Common values: 'backoffice', 'storefront', 'merchant-portal'
        'api_types' => [
            'storefront',
        ],

        // Optional: Configure source directories to search for schema files
        // 'source_directories' => [
        //     'src/Spryker',
        //     'src/SprykerFeature',
        //     'src/Pyz',
        // ],

        // Optional: Override generated directory
        // 'generated_dir' => 'src/Generated/Api',

        // Optional: Override cache directory
        // 'cache_dir' => '%kernel.cache_dir%/api-generator',
    ]);
};
```

### Configure for Zed (Backoffice)

`config/Symfony/ZED/packages/spryker_api_platform.php`

```php
<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $containerConfigurator): void {
    $containerConfigurator->extension('spryker_api_platform', [
        'api_types' => [
            'backoffice',
        ],
    ]);
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

use Spryker\Glue\Router\Plugin\Router\SymfonyRouterPlugin;
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
            new GlueRouterPlugin(), // Existing Glue REST API router
            new SymfonyRouterPlugin(), // Add this for API Platform routes
        ];
    }
}
```

{% info_block infoBox "Router order matters" %}

The order of router plugins matters. The `SymfonyRouterPlugin` should be added after existing router plugins to ensure proper routing priority.

{% endinfo_block %}

### For Zed application

`src/Pyz/Zed/Router/RouterDependencyProvider.php`

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Router;

use Spryker\Zed\Router\Plugin\Router\SymfonyRouterPlugin;
use Spryker\Zed\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\RouterExtension\Dependency\Plugin\RouterPluginInterface>
     */
    protected function getBackofficeRouterPlugins(): array
    {
        return [
            // ... existing router plugins
            new SymfonyRouterPlugin(), // Add this for API Platform routes
        ];
    }
}
```

## 5. Generate API resources

After configuration, generate your API resources from schema files:

```bash
# Generate resources for all configured API types
console api:generate

# Generate resources for a specific API type
console api:generate storefront
console api:generate backoffice

# Force regeneration (bypass cache)
console api:generate --force

# Dry run (see what would be generated)
console api:generate --dry-run

# Validate schemas only
console api:generate --validate-only
```

The generated resources will be created in `src/Generated/Api/{ApiType}/` directory.

## 6. Clear caches

After generation, clear application caches:

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
   ls -la src/Generated/Api/Backoffice/
   ```

2. **Debug available resources:**

   ```bash
   # List all API resources
   console api:debug --list

   # Inspect specific resource
   console api:debug access-tokens --api-type=storefront
   ```

3. **Access API documentation:**
   - Glue (Storefront): `https://your-domain/docs`
   - Zed (Backoffice): `https://your-backoffice-domain/docs`

## Next steps

- [API Platform](/docs/dg/dev/architecture/api-platform.html) - Overview and concepts
- [Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Create your first API resource
- [Schemas and Resource Generation](/docs/dg/dev/architecture/api-platform/schemas-and-resource-generation.html) - Define resource schemas
