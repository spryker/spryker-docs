---
title: Adding Custom Scopes to Configuration Management
description: Learn how to add custom scopes to Configuration Management features
last_updated: Mar 22, 2026
template: concept-topic-template
related:
  - title: Configuration Management feature
    link: docs/dg/dev/backend-development/configuration-management.html
---

## Overview

The Configuration feature ships with two built-in scopes: `global` and `store`. The scope system is extensible -- you can add custom scopes like `locale`, `merchant`, or `customer_group` at the project level.

Custom scopes integrate into the existing hierarchy. Values resolve from the most specific scope upward until a value is found, falling back to `default_value` from the YAML schema.

```text
customer_group (most specific)
  -> store
    -> global (least specific)
      -> default_value (from schema)
```

## What You Need

Adding a custom scope requires changes in three areas:

| Area                                     | What | Why |
|------------------------------------------|------|-----|
| Shared Config                            | Register scope in hierarchy | Value resolution knows the parent chain |
| Zed Plugin                               | Provide scope identifiers | Backoffice scope switcher lists available identifiers |
| Optional: Zed + Client Plugin | Expand read requests with scope context | `getModuleConfig()` calls automatically include scope |

## Step-by-Step Guide

This guide uses `locale` as an example custom scope that inherits from `store`.

### Step 1: Override Shared Configuration

Create a project-level Shared Config that extends the core one:

```php
// src/Pyz/Shared/Configuration/ConfigurationConfig.php
namespace Pyz\Shared\Configuration;

use Spryker\Shared\Configuration\ConfigurationConfig as SprykerConfigurationConfig;
use Spryker\Shared\Store\StoreConstants;

class ConfigurationConfig extends SprykerConfigurationConfig
{
    public const string SCOPE_LOCALE = 'locale';

    public function getAvailableScopes(): array
    {
        return array_merge(parent::getAvailableScopes(), [
            static::SCOPE_LOCALE,
        ]);
    }

    public function getScopeHierarchy(): array
    {
        return array_merge(parent::getScopeHierarchy(), [
            static::SCOPE_LOCALE => StoreConstants::SCOPE_STORE,
        ]);
    }
}
```

**Important:** The hierarchy map is `[scopeKey => parentScopeKey]`. A scope with parent `null` is the root.

Built-in hierarchy:

```text
global (parent: null)       -- root, no identifier needed
store  (parent: global)     -- requires identifier, e.g. "DE"
```

After adding `locale`:

```text
global (parent: null)
store  (parent: global)
locale (parent: store)      -- requires identifier, e.g. "de_DE"
```

### Step 2: Create a Scope Identifier Provider Plugin

The Back Office uses this plugin to list available identifiers in the scope switcher dropdown.

```php
// src/Pyz/Zed/Locale/Communication/Plugin/Configuration/LocaleConfigurationScopeIdentifierProviderPlugin.php
namespace Pyz\Zed\Locale\Communication\Plugin\Configuration;

use Spryker\Zed\ConfigurationExtension\Dependency\Plugin\ConfigurationScopeIdentifierProviderPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Spryker\Zed\Locale\Business\LocaleFacadeInterface getFacade()
 */
class LocaleConfigurationScopeIdentifierProviderPlugin extends AbstractPlugin implements ConfigurationScopeIdentifierProviderPluginInterface
{
    public function getScope(): string
    {
        return 'locale';
    }

    /**
     * @return array<string>
     */
    public function getIdentifiers(): array
    {
        $localeTransfers = $this->getFacade()->getLocaleCollection();

        return array_map(
            fn ($localeTransfer) => $localeTransfer->getLocaleNameOrFail(),
            $localeTransfers,
        );
    }
}
```

### Step 3: Register the Identifier Provider Plugin

```php
// src/Pyz/Zed/Configuration/ConfigurationDependencyProvider.php
namespace Pyz\Zed\Configuration;

use Pyz\Zed\Locale\Communication\Plugin\Configuration\LocaleConfigurationScopeIdentifierProviderPlugin;
use Spryker\Zed\Configuration\ConfigurationDependencyProvider as SprykerConfigurationDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Configuration\StoreConfigurationScopeIdentifierProviderPlugin;

class ConfigurationDependencyProvider extends SprykerConfigurationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ConfigurationExtension\Dependency\Plugin\ConfigurationScopeIdentifierProviderPluginInterface>
     */
    protected function getScopeIdentifierProviderPlugins(): array
    {
        return [
            new StoreConfigurationScopeIdentifierProviderPlugin(),
            new LocaleConfigurationScopeIdentifierProviderPlugin(),
        ];
    }
}
```

### Step 4: Use the New Scope in YAML Schemas

Add the scope to your setting and group declarations:

```yaml
features:
  - key: catalog
    name: Catalog
    tabs:
      - key: display
        name: Display
        groups:
          - key: labels
            name: Labels
            scopes: [global, store, locale]    # Group visible at all three scopes
            settings:
              - key: currency_symbol
                name: Currency Symbol
                type: string
                default_value: "$"
                scopes: [global, store, locale] # Setting configurable at all three scopes
                storefront: true
```

Run `docker/sdk cli console configuration:sync` after changes.

### Optional Step 5: Create Request Expander Plugins

Without an expander, callers must explicitly pass scope context as `ConfigurationScopeTransfer` objects:

```php
use Generated\Shared\Transfer\ConfigurationScopeTransfer;

$this->getModuleConfig('catalog:display:labels:currency_symbol', '$', [
    (new ConfigurationScopeTransfer())->setKey('locale')->setIdentifier('de_DE'),
]);
```

With an expander, the current locale is injected automatically into every `getModuleConfig()` call:

**Zed expander:**

```php
// src/Pyz/Zed/Locale/Communication/Plugin/Configuration/LocaleConfigurationValueRequestExpanderPlugin.php
namespace Pyz\Zed\Locale\Communication\Plugin\Configuration;

use Generated\Shared\Transfer\ConfigurationScopeTransfer;
use Generated\Shared\Transfer\ConfigurationValueRequestTransfer;
use Spryker\Zed\ConfigurationExtension\Dependency\Plugin\ConfigurationValueRequestExpanderPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Spryker\Zed\Locale\Business\LocaleFacadeInterface getFacade()
 */
class LocaleConfigurationValueRequestExpanderPlugin extends AbstractPlugin implements ConfigurationValueRequestExpanderPluginInterface
{
    public function expand(
        ConfigurationValueRequestTransfer $configurationValueRequestTransfer,
    ): ConfigurationValueRequestTransfer {
        foreach ($configurationValueRequestTransfer->getScopes() as $scope) {
            if ($scope->getKey() === 'locale') {
                return $configurationValueRequestTransfer;
            }
        }

        $configurationValueRequestTransfer->addScope(
            (new ConfigurationScopeTransfer())
                ->setKey('locale')
                ->setIdentifier($this->getFacade()->getCurrentLocale()->getLocaleNameOrFail()),
        );

        return $configurationValueRequestTransfer;
    }
}
```

**Client expander** (same logic, different layer namespace and plugin interface):

```php
// src/Pyz/Client/Locale/Plugin/Configuration/LocaleConfigurationValueRequestExpanderPlugin.php
namespace Pyz\Client\Locale\Plugin\Configuration;

use Generated\Shared\Transfer\ConfigurationScopeTransfer;
use Generated\Shared\Transfer\ConfigurationValueRequestTransfer;
use Spryker\Client\ConfigurationExtension\Dependency\Plugin\ConfigurationValueRequestExpanderPluginInterface;
use Spryker\Client\Kernel\AbstractPlugin;

/**
 * @method \Spryker\Client\Locale\LocaleClientInterface getClient()
 */
class LocaleConfigurationValueRequestExpanderPlugin extends AbstractPlugin implements ConfigurationValueRequestExpanderPluginInterface
{
    public function expand(
        ConfigurationValueRequestTransfer $configurationValueRequestTransfer,
    ): ConfigurationValueRequestTransfer {
        foreach ($configurationValueRequestTransfer->getScopes() as $scope) {
            if ($scope->getKey() === 'locale') {
                return $configurationValueRequestTransfer;
            }
        }

        $configurationValueRequestTransfer->addScope(
            (new ConfigurationScopeTransfer())
                ->setKey('locale')
                ->setIdentifier($this->getClient()->getCurrentLocale()),
        );

        return $configurationValueRequestTransfer;
    }
}
```

### Optional Step 5.1: Register Request Expander Plugins

**Zed:**

```php
// src/Pyz/Zed/Configuration/ConfigurationDependencyProvider.php
protected function getConfigurationValueRequestExpanderPlugins(): array
{
    return [
        new StoreConfigurationValueRequestExpanderPlugin(),
        new LocaleConfigurationValueRequestExpanderPlugin(),
    ];
}
```

**Client:**

```php
// src/Pyz/Client/Configuration/ConfigurationDependencyProvider.php
namespace Pyz\Client\Configuration;

use Pyz\Client\Locale\Plugin\Configuration\LocaleConfigurationValueRequestExpanderPlugin;
use Spryker\Client\Configuration\ConfigurationDependencyProvider as SprykerConfigurationDependencyProvider;

class ConfigurationDependencyProvider extends SprykerConfigurationDependencyProvider
{
    protected function getConfigurationValueRequestExpanderPlugins(): array
    {
        return [
            new StoreConfigurationValueRequestExpanderPlugin(),
            new LocaleConfigurationValueRequestExpanderPlugin(),
        ];
    }
}
```

## How Value Resolution Works

When `getModuleConfig('catalog:display:labels:currency_symbol', '$')` is called with expander plugins providing `locale=de_DE` and `store=DE`:

1. Check `locale:de_DE` -- value saved specifically for German locale?
2. Not found -> check parent `store:DE` -- value saved for DE store?
3. Not found -> check parent `global` -- value saved globally?
4. Not found -> return `default_value` from YAML schema (`"$"`)
5. Schema has no such key -> return `$default` argument (`'$'`)

The first non-null value wins.

## Advanced Use Cases

Custom scopes enable dynamic configuration scenarios beyond static identifiers like `store` or `locale`. This section covers two common advanced patterns: calculated scopes and A/B testing.

### Calculated Scopes

Calculated scopes determine their identifier at runtime based on request context. Unlike static scopes where identifiers are predefined (such as store codes), calculated scopes derive their value from dynamic data like user attributes, request headers, or external services.

#### Example: Region-Based Configuration by IP Address

You can create a `region` scope that determines the user's geographic region from their IP address. This enables region-specific configurations without requiring users to explicitly select their region.

**Step 1: Define the region scope in Shared Configuration:**

```php
// src/Pyz/Shared/Configuration/ConfigurationConfig.php
namespace Pyz\Shared\Configuration;

use Spryker\Shared\Configuration\ConfigurationConfig as SprykerConfigurationConfig;

class ConfigurationConfig extends SprykerConfigurationConfig
{
    public const string SCOPE_REGION = 'region';

    public function getAvailableScopes(): array
    {
        return array_merge(parent::getAvailableScopes(), [
            static::SCOPE_REGION,
        ]);
    }

    public function getScopeHierarchy(): array
    {
        return array_merge(parent::getScopeHierarchy(), [
            static::SCOPE_REGION => static::SCOPE_STORE, // Region inherits from global
        ]);
    }
}
```

**Step 2: Create an identifier provider with region definitions:**

```php
// src/Pyz/Zed/Region/Communication/Plugin/Configuration/RegionConfigurationScopeIdentifierProviderPlugin.php
namespace Pyz\Zed\Region\Communication\Plugin\Configuration;

use Spryker\Zed\ConfigurationExtension\Dependency\Plugin\ConfigurationScopeIdentifierProviderPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class RegionConfigurationScopeIdentifierProviderPlugin extends AbstractPlugin implements ConfigurationScopeIdentifierProviderPluginInterface
{
    public function getScope(): string
    {
        return 'region';
    }

    /**
     * @return array<string>
     */
    public function getIdentifiers(): array
    {
        // Define available regions for the backoffice scope switcher
        return [
            'eu-west',
            'eu-east',
            'us-west',
            'us-east',
            'apac',
        ];
    }
}
```

**Step 3: Create a request expander that calculates the region from IP:**

```php
// src/Pyz/Client/Region/Plugin/Configuration/RegionConfigurationValueRequestExpanderPlugin.php
namespace Pyz\Client\Region\Plugin\Configuration;

use Generated\Shared\Transfer\ConfigurationScopeTransfer;
use Generated\Shared\Transfer\ConfigurationValueRequestTransfer;
use Spryker\Client\ConfigurationExtension\Dependency\Plugin\ConfigurationValueRequestExpanderPluginInterface;
use Spryker\Client\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Client\Region\RegionClientInterface getClient()
 */
class RegionConfigurationValueRequestExpanderPlugin extends AbstractPlugin implements ConfigurationValueRequestExpanderPluginInterface
{
    public function expand(
        ConfigurationValueRequestTransfer $configurationValueRequestTransfer,
    ): ConfigurationValueRequestTransfer {
        foreach ($configurationValueRequestTransfer->getScopes() as $scope) {
            if ($scope->getKey() === 'region') {
                return $configurationValueRequestTransfer;
            }
        }

        // Calculate region from the current request's IP address
        $regionIdentifier = $this->getClient()->getRegionByCurrentIp();

        $configurationValueRequestTransfer->addScope(
            (new ConfigurationScopeTransfer())
                ->setKey('region')
                ->setIdentifier($regionIdentifier),
        );

        return $configurationValueRequestTransfer;
    }
}
```

**Step 4: Implement the region detection logic in the client:**

```php
// src/Pyz/Client/Region/RegionClient.php
namespace Pyz\Client\Region;

use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\Region\RegionFactory getFactory()
 */
class RegionClient extends AbstractClient implements RegionClientInterface
{
    public function getRegionByCurrentIp(): string
    {
        return $this->getFactory()
            ->createRegionResolver()
            ->resolveRegionByIp($this->getFactory()->getRequestStack()->getCurrentRequest()?->getClientIp());
    }
}
```

With this setup, configuration values automatically resolve based on the user's geographic region. For example, you can configure different shipping options, payment methods, or promotional content for users in different regions.

### A/B Testing with Custom Scopes

Custom scopes provide a mechanism for A/B testing by assigning users to experiment variants. This approach enables you to test different configuration values and measure their impact on user behavior.

#### Example: Experiment Scope for A/B Testing

**Step 1: Define the experiment scope:**

```php
// src/Pyz/Shared/Configuration/ConfigurationConfig.php
namespace Pyz\Shared\Configuration;

use Spryker\Shared\Configuration\ConfigurationConfig as SprykerConfigurationConfig;

class ConfigurationConfig extends SprykerConfigurationConfig
{
    public const string SCOPE_EXPERIMENT = 'experiment';

    public function getAvailableScopes(): array
    {
        return array_merge(parent::getAvailableScopes(), [
            static::SCOPE_EXPERIMENT,
        ]);
    }

    public function getScopeHierarchy(): array
    {
        return array_merge(parent::getScopeHierarchy(), [
            // Experiment is the most specific scope, inheriting from store
            static::SCOPE_EXPERIMENT => static::SCOPE_STORE,
        ]);
    }
}
```

**Step 2: Create an identifier provider for experiment variants:**

```php
// src/Pyz/Zed/Experiment/Communication/Plugin/Configuration/ExperimentConfigurationScopeIdentifierProviderPlugin.php
namespace Pyz\Zed\Experiment\Communication\Plugin\Configuration;

use Spryker\Zed\ConfigurationExtension\Dependency\Plugin\ConfigurationScopeIdentifierProviderPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\Experiment\Business\ExperimentFacadeInterface getFacade()
 */
class ExperimentConfigurationScopeIdentifierProviderPlugin extends AbstractPlugin implements ConfigurationScopeIdentifierProviderPluginInterface
{
    public function getScope(): string
    {
        return 'experiment';
    }

    /**
     * @return array<string>
     */
    public function getIdentifiers(): array
    {
        // Return all active experiment variants from the database
        // This allows configuring values for each variant in the backoffice
        return $this->getFacade()->getActiveExperimentVariantIdentifiers();
    }
}
```

**Step 3: Create a request expander that assigns users to variants:**

```php
// src/Pyz/Client/Experiment/Plugin/Configuration/ExperimentConfigurationValueRequestExpanderPlugin.php
namespace Pyz\Client\Experiment\Plugin\Configuration;

use Generated\Shared\Transfer\ConfigurationScopeTransfer;
use Generated\Shared\Transfer\ConfigurationValueRequestTransfer;
use Spryker\Client\ConfigurationExtension\Dependency\Plugin\ConfigurationValueRequestExpanderPluginInterface;
use Spryker\Client\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Client\Experiment\ExperimentClientInterface getClient()
 */
class ExperimentConfigurationValueRequestExpanderPlugin extends AbstractPlugin implements ConfigurationValueRequestExpanderPluginInterface
{
    public function expand(
        ConfigurationValueRequestTransfer $configurationValueRequestTransfer,
    ): ConfigurationValueRequestTransfer {
        foreach ($configurationValueRequestTransfer->getScopes() as $scope) {
            if ($scope->getKey() === 'experiment') {
                return $configurationValueRequestTransfer;
            }
        }

        // Get the experiment variant for the current user
        // This can be based on session, customer ID, or random assignment
        $experimentVariant = $this->getClient()->getCurrentUserExperimentVariant(
            $configurationValueRequestTransfer->getKey(),
        );

        if ($experimentVariant === null) {
            // User is not part of any experiment, skip adding the scope
            // Value resolution falls back to the parent scope (store)
            return $configurationValueRequestTransfer;
        }

        $configurationValueRequestTransfer->addScope(
            (new ConfigurationScopeTransfer())
                ->setKey('experiment')
                ->setIdentifier($experimentVariant),
        );

        return $configurationValueRequestTransfer;
    }
}
```

**Step 4: Implement the experiment assignment logic:**

```php
// src/Pyz/Client/Experiment/ExperimentClient.php
namespace Pyz\Client\Experiment;

use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\Experiment\ExperimentFactory getFactory()
 */
class ExperimentClient extends AbstractClient implements ExperimentClientInterface
{
    /**
     * Returns the experiment variant identifier for the current user.
     * Returns null if the user is not enrolled in any experiment.
     */
    public function getCurrentUserExperimentVariant(string $settingKey): ?string
    {
        return $this->getFactory()
            ->createExperimentAssigner()
            ->getVariantForUser(
                $this->getFactory()->getSessionClient()->getId(),
                $settingKey,
            );
    }
}
```

#### Using A/B Testing in YAML Schemas

Define settings that support experiment variants:

```yaml
features:
  - key: checkout
    name: Checkout
    tabs:
      - key: layout
        name: Layout
        groups:
          - key: buttons
            name: Buttons
            scopes: [global, store, experiment]
            settings:
              - key: checkout_button_color
                name: Checkout Button Color
                type: string
                default_value: "blue"
                scopes: [global, store, experiment]
                storefront: true
              - key: checkout_button_text
                name: Checkout Button Text
                type: string
                default_value: "Complete Purchase"
                scopes: [global, store, experiment]
                storefront: true
```

In the Back Office, you can then configure different values for each experiment variant:
- `experiment:control` — `checkout_button_color: blue`, `checkout_button_text: Complete Purchase`
- `experiment:variant_a` — `checkout_button_color: green`, `checkout_button_text: Buy Now`
- `experiment:variant_b` — `checkout_button_color: orange`, `checkout_button_text: Place Order`

#### Best Practices for A/B Testing Scopes

| Practice                   | Description                                                                                                       |
|----------------------------|-------------------------------------------------------------------------------------------------------------------|
| Consistent assignment      | Ensure users see the same variant throughout their session by persisting the assignment in session or database.   |
| Graceful fallback          | When a user is not part of an experiment, the value resolution automatically falls back to the parent scope.      |
| Setting-level experiments  | Pass the setting key to the assigner to run different experiments on different settings.                          |
| Analytics integration      | Track which variant each user sees to measure the impact of configuration changes.                                |

### Combining Multiple Custom Scopes

You can combine calculated scopes with static scopes to create sophisticated targeting. For example:

```text
experiment (most specific)
  -> region
    -> store
      -> global (least specific)
```

This hierarchy enables scenarios like:
- Default value for all users (global)
- Store-specific override (store)
- Region-specific customization based on IP (region)
- A/B test variant for users in the experiment (experiment)

When a user in the `us-west` region is assigned to `variant_a` of an experiment in the `US` store, the resolution order is:
1. `experiment:variant_a` — check experiment-specific value
2. `region:us-west` — check region-specific value
3. `store:US` — check store-specific value
4. `global` — check global value
5. `default_value` — use schema default
