---
title: Install the Back Office dropdown navigation
description: Learn how to install and upgrade the Back Office dropdown navigation in Spryker Cloud Commerce OS
template: howto-guide-template
last_updated: Jun 04, 2025
---

This document explains how to add support of settable dropdown navigation in the Back Office.

## Prerequisites

To add support of settable dropdown navigation in the Back Office, integrate the following features:

| NAME         | REQUIRED   | VERSION          | INTEGRATION  GUIDE                                                                                                                                          |
|--------------|------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | &#9989;    | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

## 1) Update the required modules

Update the required modules using Composer:

```bash
composer require spryker/gui:"^3.62.0" spryker/gui-extension:"^1.0.0" 
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE       | EXPECTED DIRECTORY           |
|--------------|------------------------------|
| Gui          | vendor/spryker/gui           |
| GuiExtension | vendor/spryker/gui-extension |

{% endinfo_block %}

## 3) Set up transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER | TYPE  | EVENT   | PATH                                       |
|----------|-------|---------|--------------------------------------------|
| Link     | class | created | src/Generated/Shared/Transfer/LinkTransfer |

{% endinfo_block %}


## 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                   | SPECIFICATION                                                                                   | PREREQUISITES | NAMESPACE                                 |
|--------------------------|-------------------------------------------------------------------------------------------------|---------------|-------------------------------------------|
| NavigationLinkTwigPlugin | Extends twig with `layout_navigation_items` function to generate navigation items from plugins. | None          | Spryker\Zed\Gui\Communication\Plugin\Twig |


**src/Pyz/Zed/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\Gui\Communication\Plugin\Twig\NavigationLinkTwigPlugin;
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new NavigationLinkTwigPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Create the plugin implementing `\Spryker\Shared\GuiExtension\Dependency\Plugin\NavigationPluginInterface`.
2. Register the plugin in the `getDropdownNavigationPlugins()` method of the `GuiDependencyProvider` class.
3. Go to https://backoffice.mysprykershop.com/ and check that the menu item is listed in the dropdown navigation.

{% endinfo_block %}

