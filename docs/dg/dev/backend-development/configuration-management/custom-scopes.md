---
title: Adding Custom Scopes to Configuration Management
description: Learn how to add custom scopes to Configuration Management features
last_updated: March 05, 2026
template: concept-topic-template
related:
  - title: Configuration Management feature
    link: /docs/dg/dev/backend-development/configuration-management.html
---

## Overview

The Configuration feature ships with two built-in scopes: `global` and `store`. The scope system is extensible -- you can add custom scopes like `locale`, `merchant`, or `customer_group` at the project level.

Custom scopes integrate into the existing hierarchy. Values resolve from the most specific scope upward until a value is found, falling back to `default_value` from the YAML schema.

```
customer_group (most specific)
  -> store
    -> global (least specific)
      -> default_value (from schema)
```

## What You Need

Adding a custom scope requires changes in three areas:

| Area | What | Why |
|------|------|-----|
| Shared Config | Register scope in hierarchy | Value resolution knows the parent chain |
| Zed Plugin | Provide scope identifiers | Backoffice scope switcher lists available identifiers |
| Zed + Client Plugin (optional) | Expand read requests with scope context | `getModuleConfig()` calls automatically include scope |

## Step-by-Step Guide

This guide uses `locale` as an example custom scope that inherits from `store`.

### Step 1: Override Shared Configuration

Create a project-level Shared Config that extends the core one:

```php
// src/Pyz/Shared/Configuration/ConfigurationConfig.php
namespace Pyz\Shared\Configuration;

use Spryker\Shared\Configuration\ConfigurationConfig as SprykerConfigurationConfig;

class ConfigurationConfig extends SprykerConfigurationConfig
{
    protected const string SCOPE_LOCALE = 'locale';

    public function getAvailableScopes(): array
    {
        return array_merge(parent::getAvailableScopes(), [
            static::SCOPE_LOCALE,
        ]);
    }

    public function getScopeHierarchy(): array
    {
        return array_merge(parent::getScopeHierarchy(), [
            static::SCOPE_LOCALE => 'store',
        ]);
    }
}
```

**Important:** The hierarchy map is `[scopeKey => parentScopeKey]`. A scope with parent `null` is the root.

Built-in hierarchy:

```
global (parent: null)       -- root, no identifier needed
store  (parent: global)     -- requires identifier, e.g. "DE"
```

After adding `locale`:

```
global (parent: null)
store  (parent: global)
locale (parent: store)      -- requires identifier, e.g. "de_DE"
```

### Step 2: Create a Scope Identifier Provider Plugin

The backoffice uses this plugin to list available identifiers in the scope switcher dropdown.

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

### Step 5 (Optional): Create Request Expander Plugins

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

### Step 6 (Optional): Register Request Expander Plugins

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

## Verification Checklist

After adding a custom scope:

- [ ] `Pyz\Shared\Configuration\ConfigurationConfig::getAvailableScopes()` includes the new scope
- [ ] `Pyz\Shared\Configuration\ConfigurationConfig::getScopeHierarchy()` maps the new scope to its parent
- [ ] Scope identifier provider plugin is created and registered in `Pyz\Zed\Configuration\ConfigurationDependencyProvider`
- [ ] YAML schemas reference the new scope in `scopes` arrays where needed
- [ ] `docker/sdk cli console configuration:sync` ran successfully
- [ ] Backoffice Configuration Management page shows the new scope in the scope switcher
- [ ] Values saved at the new scope are returned by `getModuleConfig()`
- [ ] Values fall back to parent scope when not set at the new scope
- [ ] (Optional) Request expander plugins registered in both Zed and Client dependency providers
