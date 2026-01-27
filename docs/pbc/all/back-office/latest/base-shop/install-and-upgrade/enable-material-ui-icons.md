---
title: Enable Material UI Icons
description: Learn how to enable Google Material Icons in Spryker Cloud Commerce OS Back Office to enhance its look and usability.
last_updated: Jan 27, 2026
template: module-migration-guide-template
---

# Enable Material UI Icons

## Overview

This guide explains how to enable **Google Material Icons** in the Spryker Cloud Commerce OS Back Office.  
By enabling these icons, you can modernize your admin interface and improve its overall appearance.

To display a Material Icon in your templates, use the following HTML snippet:

```html
<span class="material-symbols-outlined">search</span>
```

- `material-symbols-outlined` — defines the icon style.  
- `search` — specifies the icon name.

You can explore all available icons on the [Google Material Icons website](https://fonts.google.com/icons).

---

## Steps to Enable Material UI Icons

### 1. Update the Required Module

Run the following command to update the `spryker/gui` module:

```bash
composer update spryker/gui:"^4.8.0"
```

---

### 2. Configure Icons in the Navigation

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

> 💡 **Tip:** You can browse available icon names at [fonts.google.com/icons](https://fonts.google.com/icons).

> 💡 **Tip:** Suggested icons are available in the [repository](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/config/Zed/navigation.xml).

---

### 3. Rebuild the Navigation Cache

After updating your navigation configuration, rebuild the navigation cache with the following command:

```bash
docker/sdk console navigation:build-cache
```

---

### 4. Set the Default Icon Type

Finally, change the default icon type to `google-material` in your configuration to enable Material Icons globally:

```php
protected const NAVIGATION_ICONS_TYPE_DEFAULT = 'google-material';
```

**Available options:**
- `'font-awesome'` — the classic icon set (default)
- `'google-material'` — the new Material UI icons

---

## Result

Once these steps are complete, your Spryker Back Office will display **Google Material Icons** throughout the sidebar navigation — giving it a clean, modern, and professional look.

---

**Example:**  
Before → Font Awesome  
After → Google Material Icons ✨

---

*Last updated on Jan 27, 2026*
