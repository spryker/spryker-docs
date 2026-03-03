---
title: How to integrate Composable UI
description: Integrate Composable UI to enable YAML-driven Back Office interface with auto-generated CRUD operations.
template: howto-guide-template
last_updated: Feb 20, 2026
related:
  - title: Composable UI overview
    link: docs/dg/dev/backend-development/composable-ui/composable-ui.html
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: Create a Composable UI module
    link: docs/dg/dev/backend-development/composable-ui/create-a-composable-ui-module.html
---

{% info_block warningBox "Beta" %}

Composable UI is currently in beta and intended for internal use. This functionality is under active development, and there is no backward compatibility guarantee at this time. We do not recommend using it in production projects until it reaches a stable release.

{% endinfo_block %}

This document describes how to integrate Composable UI into your Spryker project to enable configuration-driven Back Office UI with auto-generated CRUD operations.

## Prerequisites

Ensure that your project meets the following prerequisites:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| API Platform | {{site.version}} | [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html) |

{% info_block warningBox "Required" %}

API Platform integration is required before installing Composable UI. Complete the [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html) guide first.

{% endinfo_block %}

## Install feature core

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/kernel-feature spryker/falcon-ui spryker/composable-backoffice-ui --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| KernelFeature | vendor/spryker/kernel-feature |
| FalconUi | vendor/spryker/falcon-ui |
| ComposableBackofficeUi | vendor/spryker/composable-backoffice-ui |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following transfers have been created:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| AccessTokenError | class | created | src/Generated/Shared/Transfer/AccessTokenErrorTransfer |
| AccessTokenResponse | class | created | src/Generated/Shared/Transfer/AccessTokenResponseTransfer |
| GlueAuthenticationRequestContext | class | created | src/Generated/Shared/Transfer/GlueAuthenticationRequestContextTransfer |
| OauthAccessTokenValidationRequest | class | created | src/Generated/Shared/Transfer/OauthAccessTokenValidationRequestTransfer |
| OauthRequest | class | created | src/Generated/Shared/Transfer/OauthRequestTransfer |
| SprykerFeature | class | created | src/Generated/Shared/Transfer/SprykerFeatureTransfer |
| SprykerFeatureCollection | class | created | src/Generated/Shared/Transfer/SprykerFeatureCollectionTransfer |
| SprykerFeatureCriteria | class | created | src/Generated/Shared/Transfer/SprykerFeatureCriteriaTransfer |
| SprykerFeaturesBackendApiAttributes | class | created | src/Generated/Shared/Transfer/SprykerFeaturesBackendApiAttributesTransfer |
| SprykerFeatureValidationResult | class | created | src/Generated/Shared/Transfer/SprykerFeatureValidationResultTransfer |
| User | class | created | src/Generated/Shared/Transfer/UserTransfer |

{% endinfo_block %}

### 3) Set up configuration

#### Configure Falcon UI backend API domain

Configure the Glue Backend API domain for Falcon UI communication.

**config/Shared/config_default.php**:

```php
<?php

use Spryker\Shared\KernelFeature\KernelFeatureConstants;
use SprykerFeature\Shared\FalconUi\FalconUiConstants;

// Falcon UI
$config[FalconUiConstants::GLUE_BACKEND_API_DOMAIN] = 'http://' . $sprykerGlueBackendHost;

// KernelFeature
$config[KernelFeatureConstants::SPRYKER_FEATURE_CACHE_ENABLED] = true;
```

Configuration details:
- `GLUE_BACKEND_API_DOMAIN` - Tells Falcon UI where to send API requests. The `$sprykerGlueBackendHost` variable should be defined earlier in your config file.
- `SPRYKER_FEATURE_CACHE_ENABLED` - Enables caching for Spryker Feature configurations to improve performance. Set to `false` if you need to disable caching during development.

#### Enable access token generation on login

Enable automatic OAuth token generation when users log in to Back Office.

**src/Pyz/Zed/SecurityGui/SecurityGuiConfig.php**:

```php
<?php

namespace Pyz\Zed\SecurityGui;

use Spryker\Zed\SecurityGui\SecurityGuiConfig as SprykerSecurityGuiConfig;

class SecurityGuiConfig extends SprykerSecurityGuiConfig
{
    /**
     * @var bool
     */
    protected const IS_ACCESS_TOKEN_GENERATION_ON_LOGIN_ENABLED = true;
}
```

This enables automatic generation of OAuth access tokens for Falcon UI API authentication.

### 4) Set up behavior

#### Configure CORS for Glue Backend API

Enable CORS to allow Falcon UI frontend to communicate with Glue Backend API.

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**:

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\CorsResponseFormatterPlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResponseFormatterPluginInterface>
     */
    protected function getResponseFormatterPlugins(): array
    {
        return [
            new CorsResponseFormatterPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/EventDispatcher/EventDispatcherDependencyProvider.php**:

```php
<?php

namespace Pyz\Glue\EventDispatcher;

use Spryker\Glue\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Glue\GlueBackendApiApplication\Plugin\EventDispatcher\CorsEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
     */
    protected function getBackendEventDispatcherPlugins(): array
    {
        return [
            new CorsEventDispatcherPlugin(),
        ];
    }
}
```

#### Configure Twig for Falcon UI

Add the Falcon UI Twig plugin to provide configuration variables to templates.

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**:

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use Spryker\Zed\FalconUi\Communication\Plugin\Twig\FalconUiConfigTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new FalconUiConfigTwigPlugin(),
        ];
    }
}
```

{% info_block warningBox "Project-level template override" %}

If your project has overridden the `src/Pyz/Zed/Gui/Presentation/Layout/layout.twig` template, ensure it includes the `{% raw %}{% block layout %}{% endraw %}` block required for Composable UI:

```twig
{% raw %}
{% block layout %}
    {# Composable UI content renders here #}
{% endblock %}
{% endraw %}
```

Without this block, Composable UI pages will not render correctly. Check the core `src/Spryker/Gui/src/Spryker/Zed/Gui/Presentation/Layout/layout.twig` template for the exact implementation.

{% endinfo_block %}

#### Configure Zed Router

Add the Falcon UI route provider to enable Composable UI pages in Back Office.

**src/Pyz/Zed/Router/RouterDependencyProvider.php**:

```php
<?php

namespace Pyz\Zed\Router;

use Spryker\Zed\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use Spryker\Zed\KernelFeature\Communication\Plugin\Router\SprykerFeatureRouterPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getBackofficeRouterPlugins(): array
    {
        return [
            new SprykerFeatureRouterPlugin(),
        ];
    }
}
```

#### Register console commands

Add KernelFeature console commands for feature validation and debugging.

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**:

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\KernelFeature\Communication\Console\FeatureDumpConsole;
use Spryker\Zed\KernelFeature\Communication\Console\FeatureValidateConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            // KernelFeature commands
            new FeatureDumpConsole(),
            new FeatureValidateConsole(),
        ];
    }
}
```

Available commands:
- `feature:dump` - Display all registered features and their configurations
- `feature:validate` - Validate feature configurations for errors

### 5) Build frontend

#### Install frontend dependencies

Add the Falcon UI npm scripts to your root `package.json`:

```json
{
    "scripts": {
        "falcon:install": "cd src/Spryker/FalconUi/src/Spryker/Zed/FalconUi/Presentation/Application && npm install",
        "falcon:build": "cd src/Spryker/FalconUi/src/Spryker/Zed/FalconUi/Presentation/Application && npm run build",
        "falcon:build:production": "cd src/Spryker/FalconUi/src/Spryker/Zed/FalconUi/Presentation/Application && npm run build:prod",
        "falcon:build:watch": "cd src/Spryker/FalconUi/src/Spryker/Zed/FalconUi/Presentation/Application && npm run build:watch",
        "falcon:serve": "cd src/Spryker/FalconUi/src/Spryker/Zed/FalconUi/Presentation/Application && npm run serve"
    }
}
```

#### Build the frontend application

Build the Falcon UI application:

```bash
npm run falcon:build
```

For production builds:

```bash
npm run falcon:build:production
```

{% info_block warningBox "Verification" %}

Make sure the Falcon UI assets are built:

```bash
ls -la public/Backoffice/assets/js/ | grep falcon
```

You should see compiled JavaScript and CSS files.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

1. Log in to the Back Office.
2. Verify that Composable UI feature modules appear in the navigation menu.
3. Click on a Composable UI page and verify it loads without errors.

{% endinfo_block %}


## Next steps

After integrating Composable UI, you can:

- [Create a Composable UI module](/docs/dg/dev/backend-development/composable-ui/create-a-composable-ui-module.html) - Build your first feature module with navigation and ACL
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Create API resources for your entities
- [Entity configuration reference](/docs/dg/dev/backend-development/composable-ui/entity-configuration-reference.html) - Configure UI components
- [Composable UI best practices](/docs/dg/dev/backend-development/composable-ui/composable-ui-best-practices.html) - Implementation patterns
