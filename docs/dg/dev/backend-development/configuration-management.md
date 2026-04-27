---
title: Configuration Management feature
description: Learn how to use the Configuration Management feature in a Spryker project.
last_updated: Apr 22, 2026
template: concept-topic-template
related:
  - title: Install the Configuration Management feature
    link: docs/dg/dev/integrate-and-configure/integrate-confguration-feature.html
  - title: Adding Custom Scopes to Configuration Management
    link: docs/dg/dev/backend-development/configuration-management/custom-scopes.html
  - title: Basic Shop Theme feature overview
    link: docs/pbc/all/back-office/latest/base-shop/basic-shop-theme-feature-overview.html
---

## What It Does

Provides a centralized, schema-driven system for managing application settings across scopes (for example global, store, custom-scope). Settings are declared in YAML files, managed via the Back Office UI, to be consumed in different layers (Zed, Yves, Glue) through module Config classes.

## Quick Start

### 1. Declare settings in a YAML schema

```yaml
# /data/configuration/my-module.configuration.yml
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

    protected const string CONFIGURATION_KEY_MY_MODULE_GENERAL_DISPLAY_ITEMS_PER_PAGE = 'my_module:general:display:items_per_page';

    public function getItemsPerPage(): int
    {
        return $this->getModuleConfig(static::CONFIGURATION_KEY_MY_MODULE_GENERAL_DISPLAY_ITEMS_PER_PAGE, static::DEFAULT_ITEMS_PER_PAGE);
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

**Backward Compatible:** If the Configuration module is not installed, `getModuleConfig()` silently returns `$default`.

### Real-World Examples

**AvailabilityWidget (Yves)** -- boolean setting with constant fallback:

```php
class AvailabilityWidgetConfig extends AbstractBundleConfig
{
    protected const bool STOCK_DISPLAY_ENABLED = false;

    public const string STOCK_DISPLAY_MODE_INDICATOR_AND_QUANTITY = 'indicator_and_quantity';

    protected const string CONFIGURATION_KEY_CATALOG_INVENTORY_STOCK_OPTIONS_DISPLAY_STOCK_AVAILABILITY = 'catalog:inventory:stock_options:display_stock_availability';

    protected const string CONFIGURATION_KEY_CATALOG_INVENTORY_STOCK_OPTIONS_STOCK_INFO_OPTIONS = 'catalog:inventory:stock_options:stock_info_options';

    public function isStockDisplayEnabled(): bool
    {
        return $this->getModuleConfig(static::CONFIGURATION_KEY_CATALOG_INVENTORY_STOCK_OPTIONS_DISPLAY_STOCK_AVAILABILITY, static::STOCK_DISPLAY_ENABLED);
    }

    public function getStockDisplayMode(): string
    {
        return $this->getModuleConfig(static::CONFIGURATION_KEY_CATALOG_INVENTORY_STOCK_OPTIONS_STOCK_INFO_OPTIONS, static::STOCK_DISPLAY_MODE_INDICATOR_AND_QUANTITY);
    }
}
```

**BuyBox (Yves)** -- string setting with enum fallback:

```php
class BuyBoxConfig extends AbstractBundleConfig
{
    public const string SORT_BY_PRICE = 'price';

    protected const string CONFIGURATION_KEY_MARKETPLACE_PDP_BUY_BOX_OFFER_SORT_RULE = 'marketplace:pdp:buy_box:offer_sort_rule';

    public function getSortingStrategy(): string
    {
        return $this->getModuleConfig(static::CONFIGURATION_KEY_MARKETPLACE_PDP_BUY_BOX_OFFER_SORT_RULE, static::SORT_BY_PRICE);
    }
}
```

### Scope-Specific Reads

Pass `ConfigurationScopeTransfer` objects as the third argument when you need a scope-specific value:

```php
use Generated\Shared\Transfer\ConfigurationScopeTransfer;

public function getItemsPerPage(string $storeName): int
{
    protected const string CONFIGURATION_KEY_MY_MODULE_GENERAL_DISPLAY_ITEMS_PER_PAGE = 'my_module:general:display:items_per_page';

    return $this->getModuleConfig(
        static::CONFIGURATION_KEY_MY_MODULE_GENERAL_DISPLAY_ITEMS_PER_PAGE,
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
2. Declare them in a YAML schema in `data/configuration/`
3. Replace hardcoded access in the module's Config class with `getModuleConfig()` calls
4. Keep the original constant as `$default` for backward compatibility
5. Run `configuration:sync`
6. Values are now manageable via the Back Office Configuration Management page

## YAML Schema Declaration Reference

### Schema Validation

YAML schema files support IDE autocompletion via JSON Schema. Add this header to your file:

```yaml
# yaml-language-server: $schema=../../vendor/spryker/configuration/resources/configuration/configuration-schema-v1.json
```

The schema file is located at `vendor/spryker/configuration/resources/configuration/configuration-schema-v1.json`.

### Hierarchy

```text
features[]
  tabs[]
    groups[]
      settings[]
```

Each setting gets a compound key: `{featureKey}:{tabKey}:{groupKey}:{settingKey}` used for persistence and lookups.

---

### Feature Level

```yaml
features:
  - key: system                          # Required. Unique feature identifier.
    name: System Configuration           # Required. Display name in backoffice.
    description: Core system settings    # Optional. Feature description (shown as tooltip).
    order: 0                             # Optional. Sort order (lower = first).
    enabled: true                        # Optional. Default: true.
    status: beta                         # Optional. Status badge (beta, early_access).
    tabs: [...]                          # Required. At least one tab.
```

| Property      | Type    | Required | Default | Constraints        | Description                                      |
|---------------|---------|----------|---------|--------------------|--------------------------------------------------|
| `key`         | string  | Yes      | --      | `^[a-z][a-z0-9_]*$` | Unique identifier. Part of compound setting key. |
| `name`        | string  | Yes      | --      | 1-255 chars        | Display name in backoffice sidebar.              |
| `description` | string  | No       | `null`  | max 1000 chars     | Feature description text. Shown as tooltip in sidebar. |
| `order`       | integer | No       | `0`     | --                 | Sort order for rendering. Lower values first.    |
| `enabled`     | boolean | No       | `true`  | --                 | When `false`, feature and all children are hidden from the backoffice, search results, and settings map. |
| `status`      | string  | No       | `null`  | `beta`, `early_access` | Status badge displayed next to the feature name. Invalid values are silently ignored. |
| `tabs`        | array   | Yes      | --      | min 1 item         | List of tab objects.                             |

---

### Tab Level

```yaml
tabs:
  - key: general                         # Required. Unique within feature.
    name: General                        # Required. Tab display name.
    icon: settings                       # Optional. Icon class for backoffice tab.
    description: General system settings # Optional. Tab description (shown as tooltip).
    order: 0                             # Optional. Sort order (lower = first).
    enabled: true                        # Optional. Default: true.
    status: early_access                 # Optional. Status badge.
    groups: [...]                        # Required. At least one group.
```

| Property      | Type    | Required | Default | Constraints          | Description                                          |
|---------------|---------|----------|---------|----------------------|------------------------------------------------------|
| `key`         | string  | Yes      | --      | `^[a-z][a-z0-9_]*$` | Unique within feature. Part of compound setting key. |
| `name`        | string  | Yes      | --      | 1-255 chars          | Tab label in backoffice.                             |
| `icon`        | string  | No       | `null`  | max 100 chars        | Material Symbols icon name (for example `settings`, `cable`, `trending_up`). |
| `description` | string  | No       | `null`  | max 1000 chars       | Tab description text. Shown as tooltip in sidebar.   |
| `order`       | integer | No       | `0`     | --                   | Sort order for rendering. Lower values first.        |
| `enabled`     | boolean | No       | `true`  | --                   | When `false`, tab and all children are hidden from the backoffice, search results, and settings map. |
| `status`      | string  | No       | `null`  | `beta`, `early_access` | Status badge displayed next to the tab name.       |
| `groups`      | array   | Yes      | --      | min 1 item           | List of group objects.                               |

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
    status: beta                         # Optional. Status badge.
    settings: [...]                      # Required. At least one setting.
```

| Property      | Type     | Required | Default      | Constraints          | Description                                          |
|---------------|----------|----------|--------------|----------------------|------------------------------------------------------|
| `key`         | string   | Yes      | --           | `^[a-z][a-z0-9_]*$` | Unique within tab.                                   |
| `name`        | string   | Yes      | --           | 1-255 chars          | Group heading in backoffice.                         |
| `description` | string   | No       | `null`       | max 1000 chars       | Group description text.                              |
| `scopes`      | string[] | Yes      | `['global']` | min 1 item           | Scopes where this group is displayed in backoffice. Setting scopes are constrained to their parent group scopes. |
| `order`       | integer  | No       | `0`          | --                   | Sort order for rendering. Lower values first.        |
| `enabled`     | boolean  | No       | `true`       | --                   | When `false`, group and all settings are hidden from the backoffice, search results, and settings map. |
| `status`      | string   | No       | `null`       | `beta`, `early_access` | Status badge displayed next to the group heading.  |
| `settings`    | array    | Yes      | --           | min 1 item           | List of setting objects.                             |

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
    status: early_access                 # Optional. Status badge.
    secret: false                        # Optional. Default: false.
    storefront: true                     # Optional. Default: false.
    constraints: [...]                   # Optional. Validation constraints.
    dependencies: [...]                  # Optional. Conditional visibility rules.
    sanitize_xss: {...}                  # Optional. XSS sanitization rules.
    data_object: \My\DataProvider        # Optional. Data provider plugin class.
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
| `scopes`        | string[]  | No       | `['global']` | min 1 item           | Scopes where this setting can be configured. Constrained to parent group scopes. |
| `order`         | integer   | No       | `0`          | --                   | Sort order for rendering. Lower values first.        |
| `enabled`       | boolean   | No       | `true`       | --                   | When `false`, setting is hidden from the backoffice, search results, and settings map. |
| `status`        | string    | No       | `null`       | `beta`, `early_access` | Status badge displayed next to the setting label.  |
| `secret`        | boolean   | No       | `false`      | --                   | When `true`, value is encrypted in database. Never published to storage. |
| `storefront`    | boolean   | No       | `false`      | --                   | When `true`, value is published to key-value storage for Yves/Glue. |
| `constraints`   | array     | No       | `[]`         | --                   | Validation rules. See [Constraints](#constraints).   |
| `dependencies`  | array     | No       | `[]`         | --                   | Conditional rules. See [Dependencies](#dependencies). |
| `file_upload`   | object    | No       | `null`       | Required when `type: file` | File upload configuration. See [File upload fields](#file-upload-fields). |
| `sanitize_xss`  | object    | No       | `{}`         | --                   | XSS sanitization configuration. See [XSS Sanitization](#xss-sanitization). |
| `data_object`   | string    | No       | `null`       | Fully qualified class name | Plugin class implementing `ConfigurationSettingDataProviderPluginInterface`. Provides dynamic data to the setting at render time. |

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
| `file`        | File upload (stored as public URL)   | File upload widget | No, but requires `file_upload` block |

#### File upload fields

Use `type: file` for settings that accept a file upload (for example, logo images). The Back Office renders a file upload widget. After a successful upload, the public URL of the uploaded file is stored as the setting value. All file validation and storage are handled server-side using a configured Flysystem filesystem service.

When `type: file` is used, a `file_upload` block must be present on the setting. It configures the Flysystem service, allowed file types, size limit, and recommended display dimensions.

```yaml
- key: bo_logo_url
  name: Back Office Logo
  type: file
  file_upload:
    storage_name: 'backoffice-media'
    allowed_mime_types:
      - 'image/png'
      - 'image/jpeg'
      - 'image/gif'
      - 'image/webp'
      - 'image/svg+xml'
    allowed_extensions:
      - '.png'
      - '.jpg'
      - '.jpeg'
      - '.gif'
      - '.webp'
      - '.svg'
    max_file_size: '10M'
    recommended_width_px: 290
    recommended_height_px: 77
  default_value: ''
  scopes: [global, store]
  enabled: true
  secret: false
  storefront: false
```

##### `file_upload` properties

| Property                | Type     | Required | Description                                                                 |
|-------------------------|----------|----------|-----------------------------------------------------------------------------|
| `storage_name`          | string   | Yes      | Flysystem filesystem service name. Must be configured in `FileSystemConstants::FILESYSTEM_SERVICE`. |
| `allowed_mime_types`    | string[] | No       | List of permitted MIME types. Upload is rejected if the file MIME type is not in the list. |
| `allowed_extensions`    | string[] | No       | List of permitted file extensions including the leading dot (for example `.png`). |
| `max_file_size`         | string   | No       | Maximum allowed file size (for example `10M`, `2048K`). Rejected if exceeded.   |
| `recommended_width_px`  | integer  | No       | Recommended display width in pixels. Shown as a hint in the Back Office UI. |
| `recommended_height_px` | integer  | No       | Recommended display height in pixels. Shown as a hint in the Back Office UI. |

The stored value is always a public URL returned by the Flysystem service after upload. To render the image in a Twig template, read it with `configurationValue()` and use it as an `src` attribute:

{% raw %}

```twig
{% set logoUrl = configurationValue('theme:logos:logos:yves_logo_url', '') %}
{% if logoUrl is not empty %}
    <img src="{{ logoUrl | e('html_attr') }}" alt="Logo" />
{% endif %}
```

{% endraw %}

For Flysystem service setup (S3 in production, local fallback in development and CI), see [Install the Basic Shop Theme feature](/docs/dg/dev/integrate-and-configure/integrate-basic-shop-theme.html).

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
| `store`  | Store-specific override (for example DE, AT) | Yes                 |

Default hierarchy: `store -> global -> default_value`. Values resolve from most specific to least specific.

For adding custom scopes, see [Adding Custom Scopes](/docs/dg/dev/backend-development/configuration-management/custom-scopes.html).

---

### Constraints

Validated server-side when saving values through the Back Office.

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

Control conditional visibility of settings in the Back Office UI. A setting with dependencies is only shown when at least one dependency rule matches (OR logic between rules). Each rule uses a `when` clause with `any` (OR) or `all` (AND) condition grouping.

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

### XSS Sanitization

Settings with `type: text` or `type: string` can have XSS sanitization applied on save. The `sanitize_xss` block configures how HTML content is cleaned using the W3C HTML Sanitizer API via `spryker/util-sanitize-xss`.

```yaml
settings:
  - key: custom_html_block
    name: Custom HTML Block
    type: text
    sanitize_xss:
      allow_safe_elements: true
      allow_static_elements: false
      force_https_urls: true
      allow_relative_links: false
      allowed_link_schemes:
        - https
        - mailto
      allowed_link_hosts:
        - example.com
      allow_elements:
        a: [href, class]
        strong: []
      allow_attributes:
        data-custom: ['*']
```

| Property                 | Type     | Default | Description                                          |
|--------------------------|----------|---------|------------------------------------------------------|
| `allow_safe_elements`    | boolean  | `false` | Allow W3C safe baseline elements.                    |
| `allow_static_elements`  | boolean  | `false` | Allow W3C static baseline elements.                  |
| `force_https_urls`       | boolean  | `false` | Rewrite `http://` URLs to `https://`.                |
| `allow_relative_links`   | boolean  | `false` | Allow relative link URLs.                            |
| `allowed_link_schemes`   | string[] | `[]`    | Allowed URL schemes (for example `https`, `mailto`). |
| `allowed_link_hosts`     | string[] | `[]`    | Allowed link hostnames.                              |
| `allow_elements`         | object   | `{}`    | Map of element name to allowed attribute names.      |
| `allow_attributes`       | object   | `{}`    | Map of attribute name to allowed element names (`*` for all). |

---

### Status Badges

Features, tabs, groups, and settings can display a status badge in the Back Office UI to indicate lifecycle stage. Badges are informational only and do not affect behavior.

Valid values: `beta`, `early_access`. Invalid values are silently ignored during schema normalization.

```yaml
features:
  - key: ai_recommendations
    status: beta
    tabs:
      - key: model
        status: early_access
```

Badges render as colored pills next to item names in both the sidebar navigation and content area.

---

## Schema File Locations

| Location                                   | Purpose                              | Loaded By           |
|--------------------------------------------|--------------------------------------|---------------------|
| `{Module Folder}/resources/configuration/` | Core module schemas                  | `configuration:sync` |
| `data/configuration/`                      | Project-level schema overrides       | `configuration:sync` |

Project schemas override core schemas at the setting level. Settings with the same compound key are completely replaced.

**Merged output:** `data/configuration/merged-schema.php`

## Backoffice Management

Settings are managed at **The Back office > Configuration**. The page provides:

- Feature sidebar navigation with collapsible feature groups
- Tabbed layout per feature
- Scope switcher (global, store with identifier)
- Input widgets matching setting types (including JSON editor with syntax highlighting)
- Status badges on features, tabs, groups, and settings
- Inline validation with constraint error messages
- "Revert to default" to delete scope-specific overrides
- Batch save with per-field error reporting
- Global search across all settings (debounced AJAX, filters sidebar navigation)
- Override detection: settings overridden by project-level Config classes are shown as read-only with an explanation notice
- Dependent settings: conditional visibility with automatic change tracking
- Audit logging: all save operations (successful and failed) are logged to the security audit channel

### Search

The search input in the top bar filters the sidebar navigation as you type. Search matches against translated names and descriptions at all schema levels (feature, tab, group, setting), as well as setting compound keys. Results are scoped to the currently selected scope.

The search uses a debounced AJAX call to `GET /configuration/manage/search?term={term}&scope={scope}` which returns matching feature-to-tab mappings. Non-matching features and tabs are hidden in the sidebar.

### Override Detection

During `configuration:sync`, the system scans core Config classes across Yves, Zed, Glue, and Client layers for methods that use `getModuleConfig()`. If a project-level Config class overrides such a method without calling `getModuleConfig()`, the setting is flagged as overridden.

Overridden settings in the Back Office:

- Input is disabled (read-only)
- "Use Default" link is hidden
- A notice displays the project class and method responsible for the override

Override warnings are also printed to the console during `configuration:sync`:

```text
[WARNING] Configuration bypass: catalog:inventory:stock_options:display_stock_availability
  Core:    SprykerShop\Yves\AvailabilityWidget\AvailabilityWidgetConfig::isStockDisplayEnabled
  Project: Pyz\Yves\AvailabilityWidget\AvailabilityWidgetConfig::isStockDisplayEnabled
```

## Twig Integration

The Configuration module exposes three Twig functions that let templates read configuration values directly without going through a PHP Config class. They are available through the following existing plugins — no additional registration is required:

| Context | Plugin |
|---------|--------|
| Storefront (Yves) | `ShopUiTwigExtension` |
| Back Office and Merchant Portal (Zed) | `\Spryker\Zed\Twig\Communication\Plugin\Application\TwigApplicationPlugin` |

| Function | Description |
|----------|-------------|
| `configurationValue(key, default)` | Returns a single configuration value by compound key. |
| `configurationValues(keys)` | Returns an associative array of values for a list of compound keys. |

### `configurationValue`

Returns a single value for the given compound key. Falls back to `default` if the key has no saved value.

{% raw %}

```twig
{{ configurationValue('theme:backoffice:colors:bo_main_color', '#1ebea0') }}
```

{% endraw %}

{% raw %}

```twig
<style>
    :root {
        --bo-main-color: {{ configurationValue('theme:backoffice:colors:bo_main_color', '#1ebea0') | e('css') }};
    }
</style>
```

{% endraw %}

### `configurationValues`

Returns an associative array keyed by compound key. Useful when a template needs several values at once.

{% raw %}

```twig
{% set colors = configurationValues([
    'theme:backoffice:colors:bo_main_color',
    'theme:logos:logos:backoffice_logo_url',
]) %}
<style>:root { --bo-main-color: {{ colors['theme:backoffice:colors:bo_main_color'] | e('css') }}; }</style>
```

{% endraw %}

{% info_block infoBox "Scope context" %}

Twig functions read values in the current request's scope context. Store-specific values are resolved automatically when a store scope is active.

{% endinfo_block %}

## Data Import

Configuration values can be bulk-imported from CSV files using the Spryker DataImport framework.

### CSV format

```csv
setting_key,scope,scope_identifier,value
catalog:general:display:items_per_page,global,,24
catalog:general:display:items_per_page,store,DE,48
```

| Column             | Required    | Description                                          |
|--------------------|-------------|------------------------------------------------------|
| `setting_key`      | Yes         | Compound key. Must exist in merged YAML schema.      |
| `scope`            | Yes         | Must be in `ConfigurationConfig::getAvailableScopes()`. |
| `scope_identifier` | Conditional | Empty for `global`, required for other scopes.       |
| `value`            | Yes         | Validated against schema constraints.                |

### Running the import

```bash
docker/sdk cli console data:import configuration-value
docker/sdk cli console data:import configuration-value -f path/to/custom.csv
```

The default CSV file is located at `data/import/configuration_value.csv` at the project level. A module-level template is also provided.

### Behavior

- Values are validated with the same constraints as Back Office saves.
- Secret settings are skipped with a warning — secrets should only be set via the UI.
- Duplicate rows overwrite (upsert behavior).
- Audit logging and Publish & Synchronize are triggered per value.
- Import runs inside the existing `ConfigurationValueWriter` transaction, so all validation passes before any persistence.

For setup instructions, see [Install the Configuration Management feature](/docs/dg/dev/integrate-and-configure/integrate-confguration-feature.html).

## Console Commands

| Command | Description |
|---------|-------------|
| `configuration:sync` | Merges YAML schemas, generates the settings map, and detects project-level overrides. Run after any schema change. |
| `data:import configuration-value` | Bulk-imports configuration values from CSV. |

## Common Issues

| Symptom | Cause | Solution |
|---------|-------|---------|
| `getModuleConfig()` always returns default | Setting `storefront: false` | Yves/Glue can only read storefront-enabled settings. Set `storefront: true` or use Zed Config. |
| `getModuleConfig()` always returns default | Configuration module not installed | Expected behavior. Method gracefully falls back to `$default`. |
| Value returns `null` despite being saved | Key mismatch | Compound key format is `feature:tab:group:setting`. Verify all four segments match the YAML schema. |
| Secret value empty in Yves | Expected behavior | Secrets are never published to storage. Access only via Zed. |
| Changes not visible after YAML edit | Schema not synced | Run `configuration:sync` after YAML changes. |
| Store-specific value not applied | Missing scope context | Pass `ConfigurationScopeTransfer` in third argument or register request expander plugins. See [Adding Custom Scopes](/docs/dg/dev/backend-development/configuration-management/custom-scopes.html). |
| Setting visible despite `enabled: false` | Schema not synced | Run `configuration:sync`. The `enabled` flag is evaluated during sync and filtering. |
| Override notice on a setting | Project Config class bypasses `getModuleConfig()` | The project-level Config method overrides the core method without calling `getModuleConfig()`. Refactor the method to use `getModuleConfig()` or accept the override. |
