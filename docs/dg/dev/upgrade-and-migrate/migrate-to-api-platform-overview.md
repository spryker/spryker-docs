---
title: API Platform migration overview
description: End-to-end walk-through for migrating an existing Spryker shop from the legacy Glue REST stack to API Platform.
last_updated: 2026-05-28
template: howto-guide-template
related:
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: How to migrate to API Platform (per module)
    link: docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html
  - title: How to upgrade to Symfony Dependency Injection
    link: docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
---

This document is the single entry point for migrating an existing Spryker shop from the legacy Glue REST stack to API Platform. It covers the full path: upgrade the shop baseline, apply project configuration, batch-migrate modules, verify, then clean up. Module-by-module mechanics live in the [per-module guide](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html); project-level setup details live in the [integration guide](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html). This document tells you the order to do them in.

## What you're migrating to

API Platform replaces the internal infrastructure that Glue REST uses to serve API endpoints. Externally, contracts remain backward-compatible — clients keep working. Internally:

- **No more Controllers, Readers, or RestResourceBuilders.** Endpoint behavior is defined in YAML resource schemas plus a Provider (reads) and a Processor (writes).
- **Routing happens via API Platform**, served through `SymfonyFrameworkRouterPlugin`. The legacy `GlueRouterPlugin` continues to serve any modules that haven't been migrated yet — they coexist by router order.

{% info_block infoBox "Migrated modules no longer rely on Controllers/Readers" %}

Once a module is migrated, its endpoint wiring is the API Platform resource schema and the Provider/Processor pair — not a `*ResourceRoutePlugin` plus a `*Reader`. If you find both, you're mid-migration; finish the switch (Step 3) before considering that module done.

{% endinfo_block %}

## Prerequisites

Before starting the migration, confirm:

- **Symfony Dependency Injection is in place.** See [How to upgrade to Symfony Dependency Injection](/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html).
- **API Platform is integrated** at the project level (bundles registered, Symfony container compiled). See [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html).
- **PHP 8.1+ and Symfony 6.4+.**
- **A target shop baseline version is picked.** See the [Migration scoreboard](#migration-scoreboard) below for the recommended baseline.
- **Existing Glue API tests pass** on your current shop before you start changing anything. The cleanest signal that the migration is working is that those tests keep passing through every step.

## Step 1 — Upgrade shop baseline

Upgrade your shop to a single baseline version that ships all currently migrated endpoints. This is the default — pinning each module individually is supported but rarely worth the extra coordination.

```bash
# Recommended: shop baseline (see Migration scoreboard for current target)
composer require spryker-shop/b2b-demo-marketplace:"^X.Y.Z" --update-with-dependencies
```

Refer to the [Migration scoreboard](#migration-scoreboard) for the current recommended baseline version and the pinned-module alternative.

{% info_block warningBox "Endpoints are NOT yet routed after Step 1" %}

Upgrading the shop baseline ships the API Platform resource schemas and the new Providers/Processors, but **all traffic still goes through the legacy Glue plugins**. You will not see new behavior at this point — that's expected. Routing flips in Step 3, after the project configuration is in place and the legacy plugins are removed.

{% endinfo_block %}

## Step 2 — Project configuration checklist

Apply the following project-level configuration across all three Glue stacks (`Glue`, `GlueStorefront`, `GlueBackend`). Snippets are pulled verbatim from the demo shop suite — copy them as a starting point, then adjust the secret, included modules, and excluded paths to match your project. For per-setting explanations see the [integration guide](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html).

### Bundles — Glue + GlueStorefront

`config/Glue/bundles.php` and `config/GlueStorefront/bundles.php` (identical):

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

### Bundles — GlueBackend

`config/GlueBackend/bundles.php` registers three additional bundles for the back-office UI on top of the base set:

```php
<?php

declare(strict_types = 1);

use ApiPlatform\Symfony\Bundle\ApiPlatformBundle;
use Spryker\ApiPlatform\SprykerApiPlatformBundle;
use Spryker\ComposableBackofficeUi\SprykerComposableBackofficeUiBundle;
use Spryker\FalconUi\SprykerFalconUiBundle;
use Spryker\KernelFeature\SprykerKernelFeatureBundle;
use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\SecurityBundle\SecurityBundle;
use Symfony\Bundle\TwigBundle\TwigBundle;

return [
    FrameworkBundle::class => ['all' => true],
    SecurityBundle::class => ['all' => true],
    TwigBundle::class => ['all' => true],
    ApiPlatformBundle::class => ['all' => true],
    SprykerApiPlatformBundle::class => ['all' => true],
    SprykerFalconUiBundle::class => ['all' => true],
    SprykerComposableBackofficeUiBundle::class => ['all' => true],
    SprykerKernelFeatureBundle::class => ['all' => true],
];
```

### API Platform config — Glue

`config/Glue/packages/api_platform.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

use ApiPlatform\Metadata\UrlGeneratorInterface;
/**
 * @see config/README.md for more information about this configuration.
 */
use Symfony\Config\ApiPlatformConfig;

return static function (ApiPlatformConfig $apiPlatform, string $env): void {
    $apiPlatform->title('Spryker Glue API');

    $apiPlatform->defaults()->urlGenerationStrategy(UrlGeneratorInterface::ABS_URL);

    $apiPlatform->doctrine()->enabled(false);
    $apiPlatform->doctrineMongodbOdm()->enabled(false);

    $apiPlatform->mapping()->paths(['%kernel.project_dir%/src/Generated/Api/Storefront']);

    if ($env === 'dockerdev') {
        $apiPlatform->enableSwagger(true);
        $apiPlatform->enableSwaggerUi(true);
        $apiPlatform->enableReDoc(true);
        $apiPlatform->enableEntrypoint(true);
        $apiPlatform->enableDocs(true);
        $apiPlatform->enableProfiler(true);
    }

    $apiPlatform->swagger()
        ->swaggerUiExtraConfiguration([
            'filter' => true,
            'docExpansion' => 'none',
        ])
        ->httpAuth('JWT', ['scheme' => 'bearer', 'bearerFormat' => 'JWT']);

    $apiPlatform->defaults()->paginationItemsPerPage(10);
    $apiPlatform->defaults()->filters(['spryker.api_platform.filter.property']);
    $apiPlatform->defaults()->normalizationContext(['skip_null_values' => false]);
    $apiPlatform->defaults()->denormalizationContext(['disable_type_enforcement' => true]);
    $apiPlatform->collection()
        ->existsParameterName('exists')
        ->order('ASC')
        ->orderParameterName('order')
        ->pagination()
        ->pageParameterName('page')
        ->enabledParameterName('pagination')
        ->itemsPerPageParameterName('itemsPerPage')
        ->partialParameterName('partial');

    $apiPlatform->formats('jsonapi', ['mime_types' => ['application/vnd.api+json', 'application/json']]);
    $apiPlatform->formats('jsonld', ['mime_types' => ['application/ld+json']]);
    $apiPlatform->formats('xml', ['mime_types' => ['application/xml', 'text/xml']]);
    $apiPlatform->formats('csv', ['mime_types' => ['text/csv']]);

    $apiPlatform->patchFormats('jsonapi', ['mime_types' => ['application/vnd.api+json', 'application/json']]);

    $apiPlatform->errorFormats('jsonapi', ['mime_types' => ['application/vnd.api+json', 'application/json']]);
};
```

### API Platform config — GlueStorefront

`config/GlueStorefront/packages/api_platform.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

use ApiPlatform\Metadata\UrlGeneratorInterface;
/**
 * @see config/README.md for more information about this configuration.
 */
use Symfony\Config\ApiPlatformConfig;

return static function (ApiPlatformConfig $apiPlatform, string $env): void {
    $apiPlatform->title('Spryker Storefront API');

    $apiPlatform->defaults()->urlGenerationStrategy(UrlGeneratorInterface::ABS_URL);

    $apiPlatform->doctrine()->enabled(false);
    $apiPlatform->doctrineMongodbOdm()->enabled(false);

    $apiPlatform->mapping()->paths(['%kernel.project_dir%/src/Generated/Api/Storefront']);

    if ($env === 'dockerdev') {
        $apiPlatform->enableSwagger(true);
        $apiPlatform->enableSwaggerUi(true);
        $apiPlatform->enableReDoc(true);
        $apiPlatform->enableEntrypoint(true);
        $apiPlatform->enableDocs(true);
        $apiPlatform->enableProfiler(true);
    }

    $apiPlatform->swagger()
        ->swaggerUiExtraConfiguration([
            'filter' => true,
            'docExpansion' => 'none',
        ])
        ->httpAuth('JWT', ['scheme' => 'bearer', 'bearerFormat' => 'JWT']);

    $apiPlatform->defaults()->paginationItemsPerPage(10);
    $apiPlatform->defaults()->filters(['spryker.api_platform.filter.property']);
    $apiPlatform->defaults()->normalizationContext(['skip_null_values' => false]);
    $apiPlatform->defaults()->denormalizationContext(['disable_type_enforcement' => true]);
    $apiPlatform->collection()
        ->existsParameterName('exists')
        ->order('ASC')
        ->orderParameterName('order')
        ->pagination()
            ->pageParameterName('page')
            ->enabledParameterName('pagination')
            ->itemsPerPageParameterName('itemsPerPage')
            ->partialParameterName('partial');

    $apiPlatform->formats('jsonapi', ['mime_types' => ['application/vnd.api+json', 'application/json']]);
    $apiPlatform->formats('jsonld', ['mime_types' => ['application/ld+json']]);
    $apiPlatform->formats('xml', ['mime_types' => ['application/xml', 'text/xml']]);
    $apiPlatform->formats('csv', ['mime_types' => ['text/csv']]);

    $apiPlatform->patchFormats('jsonapi', ['mime_types' => ['application/vnd.api+json', 'application/json']]);

    $apiPlatform->errorFormats('jsonapi', ['mime_types' => ['application/vnd.api+json', 'application/json']]);
};
```

### API Platform config — GlueBackend

`config/GlueBackend/packages/api_platform.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

/**
 * @see config/README.md for more information about this configuration.
 */
use Symfony\Config\ApiPlatformConfig;

return static function (ApiPlatformConfig $apiPlatform, string $env): void {
    $apiPlatform->title('Spryker Backend API');

    $apiPlatform->doctrine()->enabled(false);
    $apiPlatform->doctrineMongodbOdm()->enabled(false);
    $apiPlatform->mapping()->paths(['%kernel.project_dir%/src/Generated/Api/Backend']);

    if ($env === 'dockerdev') {
        $apiPlatform->enableSwagger(true);
        $apiPlatform->enableSwaggerUi(true);
        $apiPlatform->enableReDoc(true);
        $apiPlatform->enableEntrypoint(true);
        $apiPlatform->enableDocs(true);
        $apiPlatform->enableProfiler(true);
    }

    $apiPlatform->swagger()
        ->swaggerUiExtraConfiguration([
            'filter' => true,
            'docExpansion' => 'none',
        ])
        ->httpAuth('JWT', ['scheme' => 'bearer', 'bearerFormat' => 'JWT']);

    $apiPlatform->defaults()->paginationItemsPerPage(10);
    $apiPlatform->defaults()->filters(['spryker.api_platform.filter.property']);
    // Allow string "true"/"false" to be coerced to bool — the old Glue backend accepted
    // stringified booleans in request bodies (e.g. "isActive": "true").
    $apiPlatform->defaults()->denormalizationContext(['disable_type_enforcement' => true]);
    $apiPlatform->collection()
        ->existsParameterName('exists')
        ->order('ASC')
        ->orderParameterName('order')
        ->pagination()
            ->pageParameterName('page')
            ->enabledParameterName('pagination')
            ->itemsPerPageParameterName('itemsPerPage')
            ->partialParameterName('partial');

    $apiPlatform->formats('jsonapi', ['mime_types' => ['application/vnd.api+json', 'application/json']]);
    $apiPlatform->formats('jsonld', ['mime_types' => ['application/ld+json']]);
    $apiPlatform->formats('xml', ['mime_types' => ['application/xml', 'text/xml']]);
    $apiPlatform->formats('csv', ['mime_types' => ['text/csv']]);

    $apiPlatform->patchFormats('jsonapi', ['mime_types' => ['application/vnd.api+json', 'application/json']]);

    $apiPlatform->errorFormats('jsonapi', ['mime_types' => ['application/vnd.api+json', 'application/json']]);
};
```

The `excludedPathFragments` list controls which modules' API Platform schemas the generator skips. Adjust this list to match the modules that your project still serves via legacy Glue. See [Step 3 — Batch migration (default)](#step-3--batch-migration-default) for how routing actually flips (this is not the routing switch).

### Spryker API Platform config — Glue

`config/Glue/packages/spryker_api_platform.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

/**
 * @see config/README.md for more information about this configuration.
 */
use Symfony\Config\SprykerApiPlatformConfig;

return static function (SprykerApiPlatformConfig $sprykerApiPlatform): void {
    $sprykerApiPlatform->apiTypes(['storefront']);

    // The following configuration is optional. By default, the source directories are set to 'src/Spryker', 'src/SprykerFeature', and 'src/Pyz'.
    $sprykerApiPlatform->sourceDirectories([
        'src/Spryker',
        'src/SprykerFeature',
        'src/Pyz',
    ]);

    // Keep these modules on the legacy Glue REST stack by hiding their API Platform schemas from the generator.
    $sprykerApiPlatform->excludedPathFragments([
        'src/Spryker/Customer/resources/api/',
        'src/Spryker/Store/resources/api/',
        'src/Spryker/Authentication/resources/api/',
    ]);
};
```

### Spryker API Platform config — GlueStorefront

`config/GlueStorefront/packages/spryker_api_platform.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

/**
 * @see config/README.md for more information about this configuration.
 */
use Symfony\Config\SprykerApiPlatformConfig;

return static function (SprykerApiPlatformConfig $sprykerApiPlatform): void {
    $sprykerApiPlatform->apiTypes(['storefront']);

    // The following configuration is optional. By default, the source directories are set to 'src/Spryker', 'src/SprykerFeature', and 'src/Pyz'.
    $sprykerApiPlatform->sourceDirectories([
        'src/Spryker',
        'src/SprykerFeature',
        'src/Pyz',
    ]);

    $sprykerApiPlatform->excludedPathFragments([
        'src/Spryker/Authentication/resources/api/',
        'src/Spryker/Customer/resources/api/',
        'src/Spryker/Store/resources/api/',
    ]);
};
```

### Spryker API Platform config — GlueBackend

`config/GlueBackend/packages/spryker_api_platform.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

/**
 * @see config/README.md for more information about this configuration.
 */
use Symfony\Config\SprykerApiPlatformConfig;

return static function (SprykerApiPlatformConfig $sprykerApiPlatform): void {
    $sprykerApiPlatform->apiTypes(['backend']);

    $sprykerApiPlatform->sourceDirectories([
        'src/Spryker',
        'src/SprykerFeature',
        'src/Pyz',
    ]);

    // Keep these modules on the legacy Glue REST stack by hiding their API Platform schemas from the generator.
    $sprykerApiPlatform->excludedPathFragments([
        'src/Spryker/Store/resources/api/',
        'src/Spryker/Currency/resources/api/',
        'src/Spryker/Locale/resources/api/',
        'src/Spryker/StoreContext/resources/api/',
    ]);
};
```

### Security config — Glue

`config/Glue/packages/security.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

use Spryker\ApiPlatform\Security\ApiUserProvider;
use Spryker\ApiPlatform\Security\GlueAuthenticationEntryPoint;
use Spryker\ApiPlatform\Security\OauthAuthenticator;
use Symfony\Config\SecurityConfig;

return static function (SecurityConfig $security): void {
    $security->provider('api_oauth_provider')
        ->id(ApiUserProvider::class);

    $security->firewall('main')
        ->lazy(true)
        ->stateless(true)
        ->provider('api_oauth_provider')
        ->customAuthenticators([OauthAuthenticator::class])
        ->entryPoint(GlueAuthenticationEntryPoint::class);

    // Public by default - individual resources use security expressions for authorization
    $security->accessControl()
        ->path('^/')
        ->roles(['PUBLIC_ACCESS']);
};
```

### Security config — GlueStorefront

`config/GlueStorefront/packages/security.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

use Spryker\ApiPlatform\Security\ApiUserProvider;
use Spryker\ApiPlatform\Security\GlueAuthenticationEntryPoint;
use Spryker\ApiPlatform\Security\OauthAuthenticator;
use Symfony\Config\SecurityConfig;

return static function (SecurityConfig $security): void {
    $security->provider('api_oauth_provider')
        ->id(ApiUserProvider::class);

    $security->firewall('main')
        ->lazy(true)
        ->stateless(true)
        ->provider('api_oauth_provider')
        ->customAuthenticators([OauthAuthenticator::class])
        ->entryPoint(GlueAuthenticationEntryPoint::class);

    // Public by default - individual resources use security expressions for authorization
    $security->accessControl()
        ->path('^/')
        ->roles(['PUBLIC_ACCESS']);
};
```

### Security config — GlueBackend

`config/GlueBackend/packages/security.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

use Spryker\ApiPlatform\Security\ApiUserProvider;
use Spryker\ApiPlatform\Security\OauthAuthenticator;
use Symfony\Config\SecurityConfig;

return static function (SecurityConfig $security): void {
    $security->provider('api_oauth_provider')
        ->id(ApiUserProvider::class);

    $security->firewall('main')
        ->lazy(true)
        ->stateless(true)
        ->provider('api_oauth_provider')
        ->customAuthenticators([OauthAuthenticator::class]);

    // Public by default - individual resources use security expressions for authorization
    $security->accessControl()
        ->path('^/')
        ->roles(['PUBLIC_ACCESS']);
};
```

### Framework config — Glue

`config/Glue/packages/framework.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

/**
 * @see config/README.md for more information about this configuration.
 */
use Symfony\Config\FrameworkConfig;

return static function (FrameworkConfig $framework, string $env): void {
    $framework->secret('spryker-glue-secret');

    $framework->assets([
            'base_path' => '/assets',
        ]);

    $framework->test(in_array($env, ['dockerdev', 'dockerci'], true));
};
```

### Framework config — GlueStorefront

`config/GlueStorefront/packages/framework.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

/**
 * @see config/README.md for more information about this configuration.
 */
use Symfony\Config\FrameworkConfig;

return static function (FrameworkConfig $framework, string $env): void {
    $framework->secret('spryker-glue-storefront-secret');

    $framework->assets([
            'base_path' => '/assets',
        ]);

    $framework->test(in_array($env, ['dockerdev', 'dockerci'], true));
};
```

### Framework config — GlueBackend

`config/GlueBackend/packages/framework.php`:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

/**
 * @see config/README.md for more information about this configuration.
 */
use Symfony\Config\FrameworkConfig;

return static function (FrameworkConfig $framework, string $env): void {
    $framework->secret('spryker-glue-backend-secret');

    $framework->assets([
            'base_path' => '/assets',
        ]);

    $framework->test(in_array($env, ['dockerdev', 'dockerci'], true));
};
```

{% info_block infoBox "Pick your own secret" %}

The `framework->secret(...)` values shown above are demo-shop defaults. Replace them with project-specific secrets in production.

{% endinfo_block %}

### Routes — all three stacks

`config/Glue/routes/api_platform.php`, `config/GlueStorefront/routes/api_platform.php`, and `config/GlueBackend/routes/api_platform.php` are identical:

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return static function (RoutingConfigurator $routingConfigurator): void {
    $routingConfigurator->import('.', 'api_platform')
        ->prefix('/');
};
```

### Application services — all three stacks

`config/Glue/ApplicationServices.php`, `config/GlueStorefront/ApplicationServices.php`, and `config/GlueBackend/ApplicationServices.php` are identical:

```php
<?php

/**
 * This is an example configuration that can be used inside a project to tell Symfony which services it has to make
 * available through the Dependency Injection Container. It automatically loads all services from all project modules,
 * except for the ones that are explicitly excluded in the $excludedModuleConfiguration array.
 *
 * You can also write your custom solution as it is explained in the Symfony documentation.
 */

declare(strict_types = 1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $configurator): void {
    $configurator->services()
        ->defaults()
        ->autowire()
        ->public()
        ->autoconfigure();
};
```

### Router dependency provider

The router dependency provider (`src/Pyz/Glue/Router/RouterDependencyProvider.php`) registers both routers in the correct order — `GlueRouterPlugin` first (legacy, checked first), `SymfonyFrameworkRouterPlugin` second (API Platform, checked second). The full snippet and the explanation of why order matters live in the [integration guide → step 4](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html#4-update-router-configuration).

## Step 3 — Batch migration (default)

The actual switch from legacy Glue REST to API Platform for a given module is **removing that module's `*ResourceRoutePlugin` from the project-level dependency provider**. This is the single edit that flips routing.

Edit the dependency provider for the stack the module belongs to:

- Storefront API: `src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider::getResourcePlugins()`
- Backend API: `src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider::getResourcePlugins()`
- Legacy combined Glue: `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider::getResourceRoutePlugins()`

Remove the line that registers the migrated module's `*ResourceRoutePlugin`. Once removed, `GlueRouterPlugin` no longer finds a match for that resource and the request falls through to `SymfonyFrameworkRouterPlugin`, which serves it via API Platform.

{% info_block warningBox "Plugin removal is the switch — not excludedPathFragments" %}

`excludedPathFragments` in `spryker_api_platform.php` controls what the schema generator emits. It does **not** flip routing. A module stays on legacy Glue as long as its `*ResourceRoutePlugin` is still registered in the project dependency provider, regardless of what `excludedPathFragments` says.

The legacy `spryker/<module>-rest-api` composer package may stay installed after you remove the plugin — it just no longer serves routes. Cleanup of the composer package is a separate step (see Step 5).

{% endinfo_block %}

### Module dependency order

Some modules cannot be migrated before their dependencies. To derive the safe order for your project:

1. List the `spryker/*-rest-api` packages currently installed:

   ```bash
   composer show "spryker/*-rest-api"
   ```

2. For each migrated `*RestApi` module, inspect its `composer.json` `require` block:

   ```bash
   jq '.require' vendor/spryker/<module>-rest-api/composer.json
   ```

3. If module A's `require` lists module B's `spryker/*-rest-api` package, migrate B first (or in the same batch). Modules with no incoming `*-rest-api` dependencies migrate first.

**Worked example:** `ProductPricesRestApi` (migrated in PR #1065) depends on `ProductsRestApi` via its `composer.json` `require` block (`"spryker/products-rest-api": "^2.0.0"`), so `ProductsRestApi`'s `*ResourceRoutePlugin` must be removed in the same batch (or earlier) for `ProductPricesRestApi` to migrate cleanly.

## Step 4 — Verify

After the plugins are removed and the project configs are in place, verify each migrated endpoint end-to-end. **Now** all migrated endpoints should work via API Platform.

1. **List API Platform resources** per stack:

   ```bash
   docker/sdk cli glue api:debug --list
   docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue api:debug --list
   docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:debug --list
   ```

   Expected: every module you removed a `*ResourceRoutePlugin` for appears here under its corresponding stack.

2. **Smoke-test the migrated endpoints** with curl. The exact URLs depend on your domain configuration — replace the host accordingly:

   ```bash
   curl -i https://glue.<your-domain>/<resource>
   curl -i https://glue-storefront.<your-domain>/<resource>
   curl -i https://glue-backend.<your-domain>/<resource>
   ```

3. **Run the existing Glue API test suite**. All tests should still pass — both the migrated endpoints (now served via API Platform) and any modules still on legacy Glue:

   ```bash
   docker/sdk testing codecept run
   ```

4. **Confirm OpenAPI is generated** at the root URL of each stack:

   - `https://glue.<your-domain>/`
   - `https://glue-storefront.<your-domain>/`
   - `https://glue-backend.<your-domain>/`

   Each should render the interactive OpenAPI documentation, including the migrated resources.

## Step 5 — Cleanup

Once **all** modules in a stack are migrated and Step 4 is green, clean up the legacy artifacts.

1. **Remove empty Pyz Glue `*RestApi` directories** for migrated modules:

   ```bash
   rm -rf src/Pyz/Glue/<Module>RestApi/
   ```

2. **Remove legacy composer packages** that are no longer used:

   ```bash
   composer remove spryker/<module>-rest-api
   ```

3. **Drop `GlueRouterPlugin`** from the router dependency provider — only when **every** module in the stack is migrated:

   `src/Pyz/Glue/Router/RouterDependencyProvider.php`

   ```php
   protected function getRouterPlugins(): array
   {
       return [
           // new GlueRouterPlugin(), // ← Remove once no modules remain on legacy Glue
           new SymfonyFrameworkRouterPlugin(),
       ];
   }
   ```

4. **Remove Glue-specific tests** that are no longer relevant. Replace with API Platform tests if coverage gaps remain:

   ```bash
   rm -rf tests/PyzTest/Glue/<Module>RestApi/
   ```

5. **Update internal API documentation and Postman collections** to point at the new endpoint URLs (the routes themselves don't change for backward compatibility, but the OpenAPI spec at `/docs.json` does — partners may want to refresh from it).
