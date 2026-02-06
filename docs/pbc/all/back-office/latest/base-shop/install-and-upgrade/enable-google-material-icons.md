---
title: Enable Google Material Icons in Back Office
description: Learn how to enable Google Material Icons in Spryker Cloud Commerce OS Back Office to enhance its look and usability.
last_updated: Jan 27, 2026
template: module-migration-guide-template
---

This guide explains how to enable **Google Material Icons** in the Spryker Cloud Commerce OS Back Office.  
By enabling these icons, you can modernize your admin interface and improve its overall appearance.

To display a Material Icon in your templates, use the following HTML markup:

```html
<span class="material-symbols-outlined">search</span>
```

- `material-symbols-outlined` — defines the Material Icon style.  
- `search` — defines the name of the icon to render.

You can explore all available icons on the [Google Material Icons website](https://fonts.google.com/icons).

---

## Steps to Enable Material UI Icons

### 1. Update the Required Module

Update the `spryker/gui` module to version 4.8.0 or higher:

```bash
composer update spryker/gui:"^4.8.0"
```

---

### 2. Configure the Default Icon Type

Create or update the `GuiConfig` class on the project level to set the default icon type to `google-material`:

**src/Pyz/Zed/Gui/GuiConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Gui;

use Spryker\Zed\Gui\GuiConfig as SprykerGuiConfig;

class GuiConfig extends SprykerGuiConfig
{
    protected const string NAVIGATION_ICONS_TYPE_DEFAULT = 'google-material';
}
```

**Available options:**
- `'font-awesome'` — the classic icon set (default)
- `'google-material'` — the new Material UI icons

---

### 3. Register the Twig Plugin

Register the `NavigationIconsTypeTwigPlugin` to make the icon type available in Twig templates:

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Twig;

use Spryker\Zed\Gui\Communication\Plugin\Twig\NavigationIconsTypeTwigPlugin;
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            // ...existing plugins...
            new NavigationIconsTypeTwigPlugin(),
        ];
    }
}
```

---

### 4. Configure Icons in the Navigation

To use Material Icons in the Back Office sidebar navigation, update the `config/Zed/navigation.xml` file.  
Add or modify the `<icon>` elements for each navigation item with the desired Material Icon name.

Example:

```xml
<?xml version="1.0"?>
<config>
    <dashboard>
        <label>Dashboard</label>
        <title>Dashboard</title>
        <bundle>dashboard</bundle>
        <controller>index</controller>
        <action>index</action>
        <icon>grid_view</icon>
    </dashboard>

    <sales>
        <label>Sales</label>
        <uri>/sales</uri>
        <title>Sales</title>
        <icon>local_mall</icon>
        <pages>
            <order-list>
                <label>Orders</label>
                <title>Orders</title>
                <bundle>sales</bundle>
                <controller>index</controller>
                <action>index</action>
            </order-list>
        </pages>
    </sales>
</config>
```

{% info_block infoBox "Tip" %}
You can browse available icon names at [fonts.google.com/icons](https://fonts.google.com/icons).  
For suggested icons, see the example configuration in the [Spryker B2B Demo Marketplace repository](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/config/Zed/navigation.xml).
{% endinfo_block %}

---

### 5. Rebuild the Navigation Cache

After updating your navigation configuration, rebuild the navigation cache with the following command:

```bash
docker/sdk console navigation:build-cache
```

---

## Result

After you complete these steps, the Spryker Back Office displays **Google Material Icons** throughout the sidebar navigation, resulting in a clean, modern, and professional appearance.
