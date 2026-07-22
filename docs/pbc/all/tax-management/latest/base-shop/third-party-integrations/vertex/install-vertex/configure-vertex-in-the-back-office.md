---
title: Configure Vertex in the Back Office
description: Learn how to manage Vertex settings and choose the tax provider from Back Office Configuration instead of environment variables.
last_updated: Jul 22, 2026
template: howto-guide-template
related:
  - title: Integrate Vertex
    link: docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/integrate-vertex.html
  - title: Vertex
    link: docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/vertex.html
---

This document describes how to manage Vertex settings from **Back Office** > **Configuration** and how to select the tax provider per scope.

With this feature enabled, operators manage every Vertex setting from the Back Office, per **global** or **store** scope, instead of environment variables. A new **Taxes** > **Tax Provider** switch chooses between the built-in Spryker tax calculation and Vertex. Save-time validation prevents leaving the integration in a broken state.

{% info_block infoBox "Backward compatible" %}

This feature is opt-in and backward compatible. Until you enable it, Vertex keeps reading its configuration from environment variables, and nothing changes for existing integrations.

{% endinfo_block %}

## Prerequisites

- [Integrate Vertex](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/integrate-vertex.html) into your Spryker shop.

The feature depends on the `spryker/configuration` and `spryker/configuration-extension` modules. Composer resolves them when you install or update the Vertex module.

## 1. Enable the configuration source

The configuration source is gated behind the `isConfigurationModuleUsed()` flag, which defaults to `false` (environment-based behavior). To read values from the Back Office instead, override the flag in `src/Pyz/Shared/Vertex/VertexConfig.php` to return `true`:

```php
<?php

namespace Pyz\Shared\Vertex;

use SprykerEco\Shared\Vertex\VertexConfig as SprykerEcoVertexConfig;

class VertexConfig extends SprykerEcoVertexConfig
{
    public function isConfigurationModuleUsed(): bool
    {
        return true;
    }
}
```

When the flag is `true`, `SprykerEco\Zed\Vertex\VertexConfig` reads values from the `spryker/configuration` module per scope instead of from the `config/Shared/config_default.php` constants.

## 2. Register the pre-save validation plugin

Register `VertexTaxProviderPreSavePlugin` in `src/Pyz/Zed/Configuration/ConfigurationDependencyProvider.php` to enable save-time validation:

```php
<?php

namespace Pyz\Zed\Configuration;

use Spryker\Zed\Configuration\ConfigurationDependencyProvider as SprykerConfigurationDependencyProvider;
use SprykerEco\Zed\Vertex\Communication\Plugin\Configuration\VertexTaxProviderPreSavePlugin;

class ConfigurationDependencyProvider extends SprykerConfigurationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ConfigurationExtension\Dependency\Plugin\ConfigurationValuePreSavePluginInterface>
     */
    protected function getConfigurationValuePreSavePlugins(): array
    {
        return [
            // ... other plugins
            new VertexTaxProviderPreSavePlugin(),
        ];
    }
}
```

## 3. Sync the configuration schema

Sync the configuration schema so the Vertex settings appear in the Back Office:

```bash
console configuration:sync
```

## 4. Manage Vertex settings in the Back Office

After the sync, the settings are available in **Back Office** > **Configuration**. All settings are scoped to **global** and **store**. Credentials are masked in the UI.

### Integrations > Vertex

| Group | Label | Requirement |
|-------|-------|-------------|
| Configuration | Security URI | Required, URL-validated |
| Configuration | Transaction calls URI | Required, URL-validated |
| Configuration | Client ID | Required |
| Configuration | Client secret | Required, masked |
| Configuration | Default taxpayer company code | Optional |
| Configuration | Vendor code | Optional |
| Configuration | Seller country code | Optional, 2-letter ISO code |
| Configuration | Customer country code | Optional, 2-letter ISO code |
| Tax ID validation (Taxamo) | Taxamo API URL | URL-validated |
| Tax ID validation (Taxamo) | Taxamo token | Masked |
| Invoicing | Submit Tax invoices to Vertex | Toggle |
| Tax Assist | Enable Tax Assist in Vertex | Toggle |

{% info_block infoBox "Tax ID validation" %}

The Taxamo API URL and token are stored but consumed only when the tax ID validator is enabled. There is no Back Office toggle for it: to use tax ID validation, you must enable it in code by overriding `isTaxIdValidatorEnabled()` to return `true` in `src/Pyz/Zed/Vertex/VertexConfig.php`. For details, see [Integrate Vertex Validator](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/integrate-vertex-validator.html).

{% endinfo_block %}

### Taxes > Tax Provider

| Label | Values |
|-------|--------|
| Tax provider | `spryker` (default) or `vertex` |

Selecting **Vertex** requires a complete Vertex configuration for that scope. This requirement is enforced at save time.

## Configuration source and precedence

The active configuration source depends on the `isConfigurationModuleUsed()` flag:

- **Flag off (default):** getters read the legacy `VERTEX:*` environment values from `config/Shared/config_default.php`. There is no behavior change.
- **Flag on:** getters resolve values per scope from the `spryker/configuration` module and fall back to the original environment value as the default. An unset Back Office value transparently keeps the environment value, so there is no backward-compatibility break.

The `isActive()` semantics also depend on the flag. When the flag is on, "active" means Vertex is the selected tax provider for the scope (`getTaxProvider() === 'vertex'`); the legacy `VERTEX:IS_ACTIVE` environment value remains the fallback. The `getTaxProvider()` getter defaults to `spryker`.

For store-scope resolution, a store value that equals the global value is treated as inherited from global. This is relevant for the cross-scope validation described below.

## Save-time validation

When you save a configuration, the following changes are blocked to prevent leaving the integration in a broken state:

1. **Selecting Vertex while incomplete:** you cannot switch the tax provider to Vertex if Vertex is not fully configured for that scope. The error lists the missing fields.
2. **Breaking an active configuration:** you cannot clear or remove a credential that would leave Vertex incomplete while Vertex is the selected provider for that scope. This applies to both edits and deletions.
3. **Cross-scope breakage:** a change to the **global** scope that would break any **store** that has Vertex selected and inherits the global values is blocked. The error names the affected store.
4. **Invalid URLs:** the Security URI, Transaction calls URI, and Taxamo API URL must be valid URLs, even when Vertex is not the selected provider.

{% info_block infoBox "Validation messages" %}

Validation error messages currently render in English. The translated strings are staged in the glossary but are not yet applied at runtime.

{% endinfo_block %}

## Public API and extension points

For projects that extend the module, the feature adds the following public API:

- **Facade method:** `VertexFacadeInterface::validateTaxProviderConfigurationPreSave(ConfigurationValueCollectionRequestTransfer $transfer): ConfigurationValueCollectionRequestTransfer`.
- **Plugin:** `SprykerEco\Zed\Vertex\Communication\Plugin\Configuration\VertexTaxProviderPreSavePlugin`, which implements the `spryker/configuration-extension` `ConfigurationValuePreSavePluginInterface`.
- **Overridable getter:** `SprykerEco\Zed\Vertex\VertexConfig::getVertexConfigurationCredentialKeys(): array`, for projects that add credential fields.

## Next steps

[Verify Vertex connection](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/verify-vertex-connection.html)
