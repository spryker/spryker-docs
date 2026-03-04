---
title: Configuration Management feature
description: Learn on how to use and Configuration Management feature in Spryker project.
last_updated: March 04, 2026
template: concept-topic-template
related:
  - title: Install the Configuration Management feature
    link: docs/dg/dev/integrate-and-configure/integrate-confguration-feature.html
  - title: Adding Custom Scopes to Configuration Management
    link: docs/dg/dev/backend-development/configuration-management/custom-scopes.html
---

## What It Does

Provides a centralized, schema-driven system for managing application settings across scopes (global, store). Settings are declared in YAML files, managed via the Backoffice UI, and consumed in any layer (Zed, Yves, Glue) through module Config classes.

## Quick Start

### 1. Declare settings in a YAML schema

```yaml
# src/Spryker/MyModule/resources/configuration/my-module.configuration.yml
features:
  - key: my_module
    name: My Module
    tabs:
      - key: general
        name: General
        groups:
          - key: display
            name: Display Settings
            scopes: [global, store]
            settings:
              - key: items_per_page
                name: Items Per Page
                type: integer
                default_value: 24
                scopes: [global, store]
                storefront: true
                constraints:
                  - type: required
                    message: Items per page is required
                  - type: min
                    message: Must be at least 1
                    options: { min: 1 }
```

### 2. Sync schemas

```bash
docker/sdk cli console configuration:sync
```

### 3. Consume in your module Config

```php
namespace Spryker\Yves\MyModule;

use Spryker\Yves\Kernel\AbstractBundleConfig;

class MyModuleConfig extends AbstractBundleConfig
{
    protected const int DEFAULT_ITEMS_PER_PAGE = 24;

    public function getItemsPerPage(): int
    {
        return $this->getModuleConfig('my_module:general:display:items_per_page', static::DEFAULT_ITEMS_PER_PAGE);
    }
}
```

The `getModuleConfig()` method is available in Zed, Yves, Glue layers `AbstractBundleConfig` and is the preferred way to read configuration values.

## Reading Configuration Values

### The `getModuleConfig()` Method

Every `AbstractBundleConfig` in Zed, Yves, and Glue provides:

```php
protected function getModuleConfig(
    string $key,
    mixed $default = null,
    array $configurationScopes = [],
): mixed
```

| Parameter              | Type                          | Description                                                   |
|------------------------|-------------------------------|---------------------------------------------------------------|
| `$key`                 | string                        | Compound setting key: `feature:tab:group:setting`             |
| `$default`             | mixed                         | Fallback when value is not found or Configuration module is not installed |
| `$configurationScopes` | `ConfigurationScopeTransfer[]` | Optional scope context transfers                             |

**Layer behavior:**
- **Yves / Glue**: Reads from key-value storage via `ConfigurationClient` (fast, cached)
- **Zed**: Reads from database via `ConfigurationFacade` (supports secrets, full scope resolution)

**Graceful degradation:** If the Configuration module is not installed, `getModuleConfig()` silently returns `$default`.

### Real-World Examples

**AvailabilityWidget (Yves)** -- boolean setting with constant fallback:

```php
class AvailabilityWidgetConfig extends AbstractBundleConfig
{
    protected const bool STOCK_DISPLAY_ENABLED = false;

    public function isStockDisplayEnabled(): bool
    {
        return $this->getModuleConfig('catalog:inventory:stock_options:display_stock_availability', static::STOCK_DISPLAY_ENABLED);
    }

    public function getStockDisplayMode(): string
    {
        return $this->getModuleConfig('catalog:inventory:stock_options:stock_info_options', static::STOCK_DISPLAY_MODE_INDICATOR_AND_QUANTITY);
    }
}
```

**BuyBox (Yves)** -- string setting with enum fallback:

```php
class BuyBoxConfig extends AbstractBundleConfig
{
    public const string SORT_BY_PRICE = 'price';

    public function getSortingStrategy(): string
    {
        return $this->getModuleConfig('marketplace:pdp:buy_box:offer_sort_rule', static::SORT_BY_PRICE);
    }
}
```

### Scope-Specific Reads

Pass `ConfigurationScopeTransfer` objects as the third argument when you need a scope-specific value:

```php
use Generated\Shared\Transfer\ConfigurationScopeTransfer;

public function getItemsPerPage(string $storeName): int
{
    return $this->getModuleConfig(
        'my_module:general:display:items_per_page',
        static::DEFAULT_ITEMS_PER_PAGE,
        [
            (new ConfigurationScopeTransfer())
                ->setKey('store')
                ->setIdentifier($storeName),
        ],
    );
}
```

### Integration Checklist

When integrating Configuration into an existing module:

1. Identify hardcoded values or constants that should be configurable
2. Declare them in a YAML schema in `resources/configuration/`
3. Replace hardcoded access in the module's Config class with `getModuleConfig()` calls
4. Keep the original constant as `$default` for backward compatibility
5. Run `configuration:sync`
6. Values are now manageable via the Backoffice Configuration Management page

## YAML Schema Declaration Reference

### Schema Validation

YAML schema files support IDE autocompletion via JSON Schema. Add this header to your file:

```yaml
# yaml-language-server: $schema=./configuration.schema.json
```

The schema file is located at `src/Spryker/Configuration/resources/configuration/configuration.schema.json`.

### Hierarchy

```
features[]
  tabs[]
    groups[]
      settings[]
```

Each setting gets a compound key: `{featureKey}:{tabKey}:{groupKey}:{settingKey}` used for all lookups.

---

### Feature Level

```yaml
features:
  - key: system                          # Required. Unique feature identifier.
    name: System Configuration           # Required. Display name in backoffice.
    description: Core system settings    # Optional. Feature description.
    order: 0                             # Optional. Sort order (lower = first).
    enabled: true                        # Optional. Default: true.
    tabs: [...]                          # Required. At least one tab.
```

| Property      | Type    | Required | Default | Constraints        | Description                                      |
|---------------|---------|----------|---------|--------------------|--------------------------------------------------|
| `key`         | string  | Yes      | --      | `^[a-z][a-z0-9_]*$` | Unique identifier. Part of compound setting key. |
| `name`        | string  | Yes      | --      | 1-255 chars        | Display name in backoffice sidebar.              |
| `description` | string  | No       | `null`  | max 1000 chars     | Feature description text.                        |
| `order`       | integer | No       | `0`     | --                 | Sort order for rendering. Lower values first.    |
| `enabled`     | boolean | No       | `true`  | --                 | When `false`, feature and all children are hidden. |
| `tabs`        | array   | Yes      | --      | min 1 item         | List of tab objects.                             |

---

### Tab Level

```yaml
tabs:
  - key: general                         # Required. Unique within feature.
    name: General                        # Required. Tab display name.
    icon: settings                       # Optional. Icon class for backoffice tab.
    description: General system settings # Optional. Tab description.
    order: 0                             # Optional. Sort order (lower = first).
    enabled: true                        # Optional. Default: true.
    groups: [...]                        # Required. At least one group.
```

| Property      | Type    | Required | Default | Constraints        | Description                                          |
|---------------|---------|----------|---------|--------------------|------------------------------------------------------|
| `key`         | string  | Yes      | --      | `^[a-z][a-z0-9_]*$` | Unique within feature. Part of compound setting key. |
| `name`        | string  | Yes      | --      | 1-255 chars        | Tab label in backoffice.                             |
| `icon`        | string  | No       | `null`  | max 100 chars      | Icon class (e.g., `settings`, `cable`, `trending_up`). |
| `description` | string  | No       | `null`  | max 1000 chars     | Tab description text.                                |
| `order`       | integer | No       | `0`     | --                 | Sort order for rendering. Lower values first.        |
| `enabled`     | boolean | No       | `true`  | --                 | When `false`, tab and all children are hidden.       |
| `groups`      | array   | Yes      | --      | min 1 item         | List of group objects.                               |

---

### Group Level

```yaml
groups:
  - key: basic                           # Required. Unique within tab.
    name: Basic Settings                 # Required. Group display name.
    description: Basic system config     # Optional. Group description.
    scopes: [global, store]              # Required. Scopes this group is visible for.
    order: 0                             # Optional. Sort order (lower = first).
    enabled: true                        # Optional. Default: true.
    settings: [...]                      # Required. At least one setting.
```

| Property      | Type     | Required | Default      | Constraints        | Description                                          |
|---------------|----------|----------|--------------|--------------------|------------------------------------------------------|
| `key`         | string   | Yes      | --           | `^[a-z][a-z0-9_]*$` | Unique within tab.                                   |
| `name`        | string   | Yes      | --           | 1-255 chars        | Group heading in backoffice.                         |
| `description` | string   | No       | `null`       | max 1000 chars     | Group description text.                              |
| `scopes`      | string[] | Yes      | `['global']` | min 1 item         | Scopes where this group is displayed in backoffice.  |
| `order`       | integer  | No       | `0`          | --                 | Sort order for rendering. Lower values first.        |
| `enabled`     | boolean  | No       | `true`       | --                 | When `false`, group and all settings are hidden.     |
| `settings`    | array    | Yes      | --           | min 1 item         | List of setting objects.                             |

---

### Setting Level

```yaml
settings:
  - key: site_name                       # Required. Unique within group.
    name: Site Name                      # Required. Setting label.
    description: The name of the site    # Optional. Displayed below the input.
    note: Changes require cache clear    # Optional. Additional note below description.
    placeholder: Enter your store name   # Optional. Input placeholder text.
    help_text: Appears in page titles    # Optional. Tooltip or help area text.
    template: '@MyModule/Configuration/custom-input.twig'  # Optional. Custom Twig template.
    type: string                         # Required. Data type.
    default_value: My Store              # Optional. Fallback value.
    options:                             # Optional. For select/multiselect/radio types.
      - value: option_a
        label: Option A
    scopes: [global, store]              # Optional. Default: ['global'].
    order: 0                             # Optional. Sort order (lower = first).
    enabled: true                        # Optional. Default: true.
    secret: false                        # Optional. Default: false.
    storefront: true                     # Optional. Default: false.
    constraints: [...]                   # Optional. Validation constraints.
    dependencies: [...]                  # Optional. Conditional visibility rules.
```

| Property        | Type      | Required | Default      | Constraints          | Description                                          |
|-----------------|-----------|----------|--------------|----------------------|------------------------------------------------------|
| `key`           | string    | Yes      | --           | `^[a-z][a-z0-9_]*$`  | Unique within group. Part of compound key.           |
| `name`          | string    | Yes      | --           | 1-255 chars          | Input label in backoffice.                           |
| `description`   | string    | No       | `null`       | max 1000 chars       | Help text displayed below the input field.           |
| `note`          | string    | No       | `null`       | max 1000 chars       | Additional note displayed below the description in italic. |
| `placeholder`   | string    | No       | `null`       | max 255 chars        | Placeholder text inside the input field.             |
| `help_text`     | string    | No       | `null`       | max 500 chars        | Extended help in tooltip or expandable area.         |
| `template`      | string    | No       | `null`       | max 255 chars        | Custom Twig template. Overrides type-based widget.   |
| `type`          | string    | Yes      | --           | See types table      | Value data type. Determines backoffice input widget. |
| `default_value` | mixed     | No       | `null`       | Must match `type`    | Fallback when no value is saved at any scope.        |
| `options`       | option[]  | No       | `[]`         | For select/multi/radio | Available choices. See [Options](#options).        |
| `scopes`        | string[]  | No       | `['global']` | min 1 item           | Scopes where this setting can be configured.         |
| `order`         | integer   | No       | `0`          | --                   | Sort order for rendering. Lower values first.        |
| `enabled`       | boolean   | No       | `true`       | --                   | When `false`, setting is excluded from schema.       |
| `secret`        | boolean   | No       | `false`      | --                   | When `true`, value is encrypted in database. Never published to storage. |
| `storefront`    | boolean   | No       | `false`      | --                   | When `true`, value is published to key-value storage for Yves/Glue. |
| `constraints`   | array     | No       | `[]`         | --                   | Validation rules. See [Constraints](#constraints).   |
| `dependencies`  | array     | No       | `[]`         | --                   | Conditional rules. See [Dependencies](#dependencies). |

#### Setting Types

| Type          | Description                          | Backoffice Input | Requires `options` |
|---------------|--------------------------------------|------------------|--------------------|
| `string`      | Single-line text                     | Text input       | No                 |
| `integer`     | Whole number                         | Number input     | No                 |
| `float`       | Decimal number                       | Number input     | No                 |
| `boolean`     | True/false toggle                    | Checkbox/switch  | No                 |
| `text`        | Multi-line text or structured data   | Textarea         | No                 |
| `color`       | Color hex value                      | Color picker     | No                 |
| `json`        | JSON structure                       | Code editor      | No                 |
| `select`      | Single choice from list              | Dropdown         | Yes                |
| `multiselect` | Multiple choices from list           | Multi-select     | Yes                |
| `radio`       | Single choice from list              | Radio buttons    | Yes                |

#### Options

Required for `select`, `multiselect`, and `radio` types. Defines available choices.

```yaml
options:
  - value: indicator_only
    label: Indicator Only
    description: Show only in-stock/out-of-stock indicator
  - value: indicator_and_quantity
    label: Indicator and Quantity
    description: Show indicator and exact stock count
```

| Property      | Type   | Required | Constraints   | Description                              |
|---------------|--------|----------|---------------|------------------------------------------|
| `value`       | string | Yes      | min 1 char    | Internal value stored when selected.     |
| `label`       | string | Yes      | 1-255 chars   | Display label shown in backoffice.       |
| `description` | string | No       | max 500 chars | Additional explanation (for radio buttons). |

#### Secret vs Storefront Behavior

| `secret` | `storefront` | Behavior |
|----------|-------------|----------|
| `false`  | `false`     | Plain text in database. Accessible only via Zed (`getModuleConfig()` in Zed Config). |
| `false`  | `true`      | Plain text. Published to key-value storage. Accessible in all layers via `getModuleConfig()`. |
| `true`   | `false`     | Encrypted in database. Decrypted on read in Zed only. Never published to storage. |
| `true`   | `true`      | Invalid combination. Secrets are always excluded from storage. |

#### Available Scopes

Built-in scopes (enabled out of the box):

| Scope    | Description                            | Requires Identifier |
|----------|----------------------------------------|---------------------|
| `global` | Application-wide default               | No                  |
| `store`  | Store-specific override (e.g., DE, AT) | Yes                 |

Default hierarchy: `store -> global -> default_value`. Values resolve from most specific to least specific.

For adding custom scopes, see [custom-scopes.md](custom-scopes.md).

---

### Constraints

Validated server-side when saving values through the backoffice.

```yaml
constraints:
  - type: required
    message: Site name is required
  - type: min
    message: Must be at least 1
    options:
      min: 1
  - type: max
    message: Cannot exceed 100
    options:
      max: 100
```

| Property  | Type   | Required | Constraints   | Description                                    |
|-----------|--------|----------|---------------|------------------------------------------------|
| `type`    | string | Yes      | See table     | Constraint type identifier.                    |
| `message` | string | Yes      | 1-500 chars   | Error message shown when validation fails.     |
| `options` | object | No       | Depends on type | Constraint-specific parameters.              |

#### Built-in Constraint Types

| Type       | Description                   | Required Options         | Example                    |
|------------|-------------------------------|--------------------------|----------------------------|
| `required` | Value must not be blank       | --                       | Mandatory fields           |
| `min`      | Minimum numeric value         | `min` (number)           | `options: { min: 1 }`     |
| `max`      | Maximum numeric value         | `max` (number)           | `options: { max: 100 }`   |
| `range`    | Value within numeric range    | `min`, `max` (number)    | `options: { min: 0, max: 100 }` |
| `length`   | String length limits          | `min` and/or `max`       | `options: { min: 6, max: 128 }` |
| `email`    | Email format validation       | --                       | Email input fields         |
| `url`      | URL format validation         | --                       | URL input fields           |
| `regex`    | Pattern matching              | `pattern` (string)       | `options: { pattern: '^G-[A-Z0-9]{10}$' }` |
| `choice`   | Value from allowed list       | `choices` (string[])     | `options: { choices: ['a', 'b'] }` |

---

### Dependencies

Control conditional visibility of settings in the backoffice UI. A setting with dependencies is only shown when at least one dependency rule matches (OR logic between rules). Each rule uses a `when` clause with `any` (OR) or `all` (AND) condition grouping.

```yaml
settings:
  - key: stock_info_options
    name: Stock Info Options
    type: radio
    dependencies:
      - when:
          any:
            - setting: catalog:inventory:stock_options:display_stock_availability
              operator: equals
              value: "true"
```

Multiple conditions with `all` (AND logic):

```yaml
    dependencies:
      - when:
          all:
            - setting: system:general:basic:feature_enabled
              operator: equals
              value: "true"
            - setting: system:general:basic:mode
              operator: not_equals
              value: maintenance
```

#### Dependency Rule

| Property | Type   | Required | Description                                              |
|----------|--------|----------|----------------------------------------------------------|
| `when`   | object | Yes      | Contains `any` or `all` array of conditions.             |

#### When Clause

| Property | Type        | Required | Description                                             |
|----------|-------------|----------|---------------------------------------------------------|
| `any`    | condition[] | No       | Setting is shown if **any** condition matches (OR).     |
| `all`    | condition[] | No       | Setting is shown if **all** conditions match (AND).     |

One of `any` or `all` must be provided.

#### Condition

| Property   | Type   | Required | Description                                  |
|------------|--------|----------|----------------------------------------------|
| `setting`  | string | Yes      | Compound key of the setting this depends on. |
| `operator` | string | Yes      | Comparison operator.                         |
| `value`    | string | Yes      | Value to compare against.                    |

#### Dependency Operators

| Operator       | Description                                   |
|----------------|-----------------------------------------------|
| `equals`       | Setting value must equal the given value.     |
| `not_equals`   | Setting value must not equal the given value. |
| `greater_than` | Numeric: value must be greater than expected. |
| `less_than`    | Numeric: value must be less than expected.    |
| `contains`     | String: value must contain the expected text. |
| `in`           | Value must be in the given list.              |

---

## Schema File Locations

| Location                     | Purpose                              | Loaded By           |
|------------------------------|--------------------------------------|---------------------|
| `resources/configuration/`   | Core module schemas                  | `configuration:sync` |
| `data/configuration/`        | Project-level schema overrides       | `configuration:sync` |

Project schemas override core schemas at the setting level. Settings with the same compound key are completely replaced.

**Merged output:** `data/configuration/merged-schema.php`

## Backoffice Management

Settings are managed at **Backoffice > Configuration Management**. The page provides:

- Feature sidebar navigation
- Tabbed layout per feature
- Scope switcher (global, store with identifier)
- Input widgets matching setting types
- Inline validation with constraint error messages
- "Revert to default" to delete scope-specific overrides
- Batch save with per-field error reporting

## Common Issues

| Symptom | Cause | Solution |
|---------|-------|---------|
| `getModuleConfig()` always returns default | Setting `storefront: false` | Yves/Glue can only read storefront-enabled settings. Set `storefront: true` or use Zed Config. |
| `getModuleConfig()` always returns default | Configuration module not installed | Expected behavior. Method gracefully falls back to `$default`. |
| Value returns `null` despite being saved | Key mismatch | Compound key format is `feature:tab:group:setting`. Verify all four segments match the YAML schema. |
| Secret value empty in Yves | Expected behavior | Secrets are never published to storage. Access only via Zed. |
| Changes not visible after YAML edit | Schema not synced | Run `configuration:sync` after YAML changes. |
| Store-specific value not applied | Missing scope context | Pass `ConfigurationScopeTransfer` in third argument or register request expander plugins. See [custom-scopes.md](custom-scopes.md). |
