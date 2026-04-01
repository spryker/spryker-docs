---
title: Install the Basic Shop Theme feature
description: Learn how to integrate the Basic Shop Theme feature to configure logos, colors, and custom CSS from the Back Office without code changes.
template: howto-guide-template
last_updated: Apr 1, 2026
related:
  - title: Basic Shop Theme feature overview
    link: /docs/pbc/all/back-office/latest/base-shop/basic-shop-theme-feature-overview.html
  - title: Configuration Management feature
    link: /docs/dg/dev/backend-development/configuration-management.html
  - title: Install the Configuration Management feature
    link: /docs/dg/dev/integrate-and-configure/integrate-confguration-feature.html
---

This document describes how to install the Basic Shop Theme feature.

The feature lets Business Admins configure logos, theme colors, and custom CSS for the Storefront, Back Office, and Merchant Portal directly from the Back Office.

## Prerequisites

Before installing this feature, install and configure the following:

| NAME | VERSION | INTEGRATION GUIDE |
|------|---------|-------------------|
| Configuration Management feature | ^0.1.0 | [Install the Configuration Management feature](/docs/dg/dev/integrate-and-configure/integrate-confguration-feature.html) |
| Spryker Core | ^3.82 | — |

## Install feature core

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/gui:"^3.0.0" spryker/zed-ui:"^2.0.0" spryker-shop/shop-ui:"^1.0.0" symfony/html-sanitizer:"^7.4" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|--------|-------------------|
| Gui | vendor/spryker/gui |
| ZedUi | vendor/spryker/zed-ui |
| ShopUi | vendor/spryker-shop/shop-ui |
| symfony/html-sanitizer | vendor/symfony/html-sanitizer |

{% endinfo_block %}

### 2) Sync the theme configuration schema

Run the configuration sync command to register the theme settings in the Back Office:

```bash
console configuration:sync
```

{% info_block warningBox "Verification" %}

1. Log in to the Back Office.
2. Navigate to **Configuration**.
3. Verify that the **Theme** feature appears in the sidebar with four tabs: **Storefront**, **Back Office**, **Merchant Portal**, and **Logos**.

{% endinfo_block %}

### 3) Set up behavior

The `configurationValue()` and `configurationValues()` Twig functions are made available by existing plugins that are already registered in a standard Spryker installation:

- **Storefront (Yves)**: `ShopUiTwigExtension`
- **Back Office and Merchant Portal (Zed)**: `\Spryker\Zed\Twig\Communication\Plugin\Application\TwigApplicationPlugin`

No additional Twig plugin registration is required.

#### 3.1) Register ACL plugins for Merchant Portal

Register the ACL entity configuration and rule expander plugins so that Merchant Portal users can read theme configuration values through the ACL layer:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| ConfigurationValueAclEntityConfigurationExpanderPlugin | Expands the ACL entity configuration with `ConfigurationValue` entity rules for Merchant Portal access. | None | Spryker\Zed\Configuration\Communication\Plugin\AclMerchantPortal |
| ConfigurationValueMerchantAclEntityRuleExpanderPlugin | Expands the Merchant ACL entity rule set to allow Merchant Portal users to read published configuration values. | None | Spryker\Zed\Configuration\Communication\Plugin\AclMerchantPortal |

**src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php**

Add the import statements:

```php
use Spryker\Zed\Configuration\Communication\Plugin\AclMerchantPortal\ConfigurationValueAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\Configuration\Communication\Plugin\AclMerchantPortal\ConfigurationValueMerchantAclEntityRuleExpanderPlugin;
```

Register the plugins in the respective methods:

```php
protected function getAclEntityConfigurationExpanderPlugins(): array
{
    return [
        // ...
        new ConfigurationValueAclEntityConfigurationExpanderPlugin(),
    ];
}

protected function getMerchantAclEntityRuleExpanderPlugins(): array
{
    return [
        // ...
        new ConfigurationValueMerchantAclEntityRuleExpanderPlugin(),
    ];
}
```

{% info_block warningBox "Verification" %}

Log in to the Merchant Portal and navigate to any page. Verify there are no ACL-related errors in the application log.

{% endinfo_block %}

### 4) Configure media filesystems

The logo upload feature requires three Flysystem filesystem services: one per application context. Configure them in your shared config and provide local overrides for development and CI environments.

#### 4.1) Add filesystem services to the shared config

Add the three media filesystem services to `config/Shared/config_default.php`. In production, they read from S3 using the `SPRYKER_S3_PUBLIC_ASSETS_*` environment variables.

**config/Shared/config_default.php**

Add the three media filesystem entries inside the existing `$config[FileSystemConstants::FILESYSTEM_SERVICE]` array:

```php
$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    // ... existing entries ...
    'backoffice-media' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'key' => getenv('SPRYKER_S3_PUBLIC_ASSETS_KEY') ?: '',
        'bucket' => getenv('SPRYKER_S3_PUBLIC_ASSETS_BUCKET') ?: '',
        'secret' => getenv('SPRYKER_S3_PUBLIC_ASSETS_SECRET') ?: '',
        'root' => '/backoffice-media',
        'path' => '/',
        'version' => 'latest',
        'region' => getenv('AWS_REGION'),
    ],
    'storefront-media' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'key' => getenv('SPRYKER_S3_PUBLIC_ASSETS_KEY') ?: '',
        'bucket' => getenv('SPRYKER_S3_PUBLIC_ASSETS_BUCKET') ?: '',
        'secret' => getenv('SPRYKER_S3_PUBLIC_ASSETS_SECRET') ?: '',
        'root' => '/storefront-media',
        'path' => '',
        'version' => 'latest',
        'region' => getenv('AWS_REGION'),
    ],
    'merchant-portal-media' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'key' => getenv('SPRYKER_S3_PUBLIC_ASSETS_KEY') ?: '',
        'bucket' => getenv('SPRYKER_S3_PUBLIC_ASSETS_BUCKET') ?: '',
        'secret' => getenv('SPRYKER_S3_PUBLIC_ASSETS_SECRET') ?: '',
        'root' => '/merchant-portal-media',
        'path' => '',
        'version' => 'latest',
        'region' => getenv('AWS_REGION'),
    ],
];
```

#### 4.2) Add local filesystem fallback for development

In the development environment, override the three filesystem services with a local adapter when the S3 bucket is not configured. This stores uploaded files under `public/Yves/assets/static/images` and serves them via the Yves assets path.

**config/Shared/config_default-docker.dev.php**

Add the import statement:

```php
use Spryker\Shared\Flysystem\FlysystemConstants;
```

Add the following block in the filesystem section:

```php
if (!getenv('SPRYKER_S3_PUBLIC_ASSETS_BUCKET')) {
    $publicUrl = sprintf(
        '%s%s',
        $config[ApplicationConstants::BASE_URL_YVES],
        '/assets/static/images',
    );

    $localMediaFilesystemConfig = [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => APPLICATION_ROOT_DIR . '/public/Yves/assets/static/images',
        'path' => '',
    ];

    $config[FileSystemConstants::FILESYSTEM_SERVICE]['backoffice-media'] = $localMediaFilesystemConfig;
    $config[FileSystemConstants::FILESYSTEM_SERVICE]['storefront-media'] = $localMediaFilesystemConfig;
    $config[FileSystemConstants::FILESYSTEM_SERVICE]['merchant-portal-media'] = $localMediaFilesystemConfig;
    $config[FlysystemConstants::FLYSYSTEM_OPTIONS] = [
        'public_url' => $publicUrl,
    ];
}
```

#### 4.3) Add local filesystem fallback for CI

**config/Shared/config_default-docker.ci.php**

Add the import statements:

```php
use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Flysystem\FlysystemConstants;
```

Add the `$localMediaFilesystemConfig` variable before the `$config[FileSystemConstants::FILESYSTEM_SERVICE]` array, and add the three services as entries inside that array. After the array, add the public URL config:

```php
$localMediaFilesystemConfig = [
    'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
    'root' => APPLICATION_ROOT_DIR . '/public/Yves/assets/static/images',
    'path' => '',
];

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    // ... existing entries ...
    'backoffice-media' => $localMediaFilesystemConfig,
    'storefront-media' => $localMediaFilesystemConfig,
    'merchant-portal-media' => $localMediaFilesystemConfig,
];

$publicUrl = sprintf(
    '%s%s',
    $config[ApplicationConstants::BASE_URL_YVES],
    '/assets/static/images',
);

$config[FlysystemConstants::FLYSYSTEM_OPTIONS] = [
    'public_url' => $publicUrl,
];
```

{% info_block warningBox "Verification" %}

1. Log in to the Back Office.
2. Navigate to **Configuration > Theme > Logos**.
3. Upload a logo image using the file upload widget.
4. Verify the uploaded file is accessible at the public URL shown after upload.

{% endinfo_block %}

### 5) Clear caches

Clear the Twig cache and application cache to apply the new Twig functions:

```bash
console twig:cache:warmer
console cache:clear
```

## Configure the feature

After installing the feature, configure branding settings in the Back Office:

1. Log in to the Back Office.
2. Go to **Configuration > Theme**.
3. Select the tab for the context you want to configure: **Storefront**, **Back Office**, **Merchant Portal**, or **Logos**.
4. Enter the desired values and click **Save**.

Changes to Storefront settings are published to key-value storage automatically. Back Office and Merchant Portal settings take effect on the next page load.

### Logo upload fields

Logo settings support direct file upload from the Back Office. Uploaded files are stored via the corresponding Flysystem media filesystem service (`storefront-media`, `backoffice-media`, `merchant-portal-media`) and served from the configured `public_url`.

| Context | Setting | Recommended size | Supported formats | Filesystem service |
|---------|---------|-----------------|-------------------|--------------------|
| Storefront | Storefront Logo | 186×50 px | GIF, PNG, JPEG, BMP, WebP, SVG | `storefront-media` |
| Back Office | Back Office Logo | 186×50 px | GIF, PNG, JPEG, BMP, WebP, SVG | `backoffice-media` |
| Merchant Portal | Merchant Portal Logo | 186×50 px | GIF, PNG, JPEG, BMP, WebP, SVG | `merchant-portal-media` |

In production, configure the `SPRYKER_S3_PUBLIC_ASSETS_BUCKET`, `SPRYKER_S3_PUBLIC_ASSETS_KEY`, `SPRYKER_S3_PUBLIC_ASSETS_SECRET`, and `AWS_REGION` environment variables to point to an S3 bucket (or compatible object storage). In development and CI, files are stored locally at `public/Yves/assets/static/images`.

### Store-level overrides

To configure a per-store override:

1. In the scope selector at the top of the Configuration page, switch from **Default** to the target store (for example, **DE**).
2. Adjust the setting value.
3. Click **Save**.

Stores without a store-level value inherit the global (Default) value.

## Theme configuration key reference

The following theme settings are registered by the feature's YAML schema. Use their compound keys in `configurationValue()` Twig calls or via `getModuleConfig()` in a module Config class.

| Compound Key | Context | Type | Default |
|-------------|---------|------|---------|
| `theme:storefront:colors:background_brand_primary` | Storefront | color | `#00bebe` |
| `theme:storefront:colors:background_brand_subtle` | Storefront | color | `#eb553c` |
| `theme:storefront:custom_css:yves_custom_css` | Storefront | text | (empty) |
| `theme:logos:logos:yves_logo_url` | Storefront | file | (empty) |
| `theme:backoffice:colors:bo_main_color` | Back Office | color | `#1ebea0` |
| `theme:backoffice:colors:bo_sidenav_color` | Back Office | color | `#23303c` |
| `theme:backoffice:colors:bo_sidenav_text_color` | Back Office | color | `#e4e4e4` |
| `theme:logos:logos:backoffice_logo_url` | Back Office | file | (empty) |
| `theme:merchant_portal:colors:spy_primary_color` | Merchant Portal | color | `#1ebea0` |
| `theme:logos:logos:merchant_portal_logo` | Merchant Portal | file | (empty) |

### Twig usage examples

Inject a theme color as a CSS custom property in a Back Office layout:

{% raw %}

```twig
<style>
    :root {
        --bo-main-color: {{ configurationValue('theme:backoffice:colors:bo_main_color', '#1ebea0') | e('css') }};
    }
</style>
```

{% endraw %}

Read multiple values at once:

{% raw %}

```twig
{% set themeValues = configurationValues([
    'theme:backoffice:colors:bo_main_color',
    'theme:logos:logos:backoffice_logo_url',
]) %}
```

{% endraw %}
