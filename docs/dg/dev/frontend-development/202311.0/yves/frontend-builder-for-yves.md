---
title: Frontend builder for Yves
description: This article provides information about how to prepare assets (CSS, js, images, etc.) for different namespaces and their themes.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/front-end-builder-for-yves
originalArticleId: 53c433b1-ae5f-4887-9435-ac716c632347
redirect_from:
  - /docs/scos/dev/front-end-development/202311.0/yves/front-end-builder-for-yves.html
  - /docs/scos/dev/front-end-development/frontend-builder-for-yves.html
  - /docs/scos/dev/front-end-development/yves/front-end-builder-for-yves.html
---

This article provides information about how to prepare assets, like CSS, js or images, for different namespaces and their themes.

## Commands

The builder has several modes to build frontend:

* `npm run yves`—builds assets in the development mode with all the namespaces and themes.
* `npm run yves:watch`—builds assets in the watch mode. It will be watching for CSS and JS files and rebuilding the assets immediately after all the namespaces and themes are changed.
* `npm run yves:production`—builds assets in the production mode (minified files, remove comments, etc.) for all namespaces and themes.
* `npm run yves:help`—displays all available parameters for building.

## Parameters

* `-n <namespace name> or --namespace  <namespace name>`—generates the assets for all themes of this `<namespace name>`. To generate several namespaces, use this parameter several times. For example, `npm run yves – -n DE -n US`.
*    `-t <theme name> or --theme <theme name>`—generates assets for all the namespaces which contain `<theme name>`. To generate several themes, use this parameter several times. For example, `npm run yves – -t default -t red-theme`
* `-c <path> or --config <path>`—ability to define the path to the config JSON file that overwrites the default config JSON file.
* `-i or --info`—displays a list of namespaces with all the available themes.

## Configuring

To enable the multi-theme in Yves, add the`\SprykerShop\Shared\ShopUi\ShopUiConstants::YVES_ASSETS_URL_PATTERN` configuration.

It supports using the `%theme%` key that will be replaced with the current theme for the Twig module configuration.

Example:
`$config[\SprykerShop\Shared\ShopUi\ShopUiConstants::YVES_ASSETS_URL_PATTERN] = sprintf('/assets/%s/%s/', $CURRENT_STORE, '%theme%');`

Config for the frontend builder is placed at `/config/Yves/frontend-build-config.json`, but you can change this path using the command with `-c` or `–config` parameter, for example:

`npm run yves – -c /path/to/config.json`

The config file should contain the following data:

```json
{

    "path": "assets/%namespace%/%theme%/", // pattern of the path to the public assets

    "namespaces": [ // the array of the namespaces

        {

            "moduleSuffix": "DE", // a special suffix for the module which will be rendered for the current namespace

            "namespace": "DE", // the name of namespace

            "themes": ["red-theme", "new-year-theme"], // an array of the themes which will be rendered for this namespace, if the additional themes aren't needed - should leave an empty array

            "defaultTheme": "default" // the reqired default theme

        }

    ]

}
```

## Twig templates

To specify the theme in a multi-theme environment for twig templates, use TwigConfig. You can overwrite `getYvesThemeName` as follows:

**Shared/TwigDE/TwigConfig.php**

```php
<?php
namespace Pyz\Shared\TwigDE;

use Spryker\Shared\Twig\TwigConfig as SprykerTwigConfig;

class TwigConfig extends SprykerTwigConfig
{
    /**
     * @return string
     */
    public function getYvesThemeName(): string
    {
        return 'new-de-theme';
    }
}
```

## Public assets

All public assets are generated into `/public/Yves/` plus the path defined in the config file, which is `assets/%namespace%/%theme%/` by default.

For example, for the `DE` namespace and default theme, it is`/public/Yves/assets/DE/default/`.

All incoming files (images, fonts, etc.) are copied from `global` (for every namespace) and `DE` folders:

* `frontend/assets/global/default`
* `frontend/assets/DE/default`

 {% info_block infoBox "Info" %}

If the assets were generated earlier for this namespace and theme, these assets will be substituted by the newest ones. If namespace or theme were removed from the config file, assets for this namespace or theme won't be removed, and you should remove it manually, if necessary.

{% endinfo_block %}

## How frontend builder collects SCSS and JS files

### Levels

The builder is looking for entry points for components on several levels (from smaller to higher priority):

* Core (`/vendor/spryker-shop`)
* Eco (`/vendor/spryker-eco`)
* Project (`/src/Pyz/Yves`)

Also, modules with a specific suffix namespace have higher priority over the module without it, for instance:

`/src/Pyz/Yves/**/ShopUiDE/**` has higher priority than `/src/Pyz/Yves**/ShopUi/**` and even `/vendor/spryker-shop/**/ShopUiDE/**` has higher priority than `/src/Pyz/Yves**/ShopUi/**`.

### Javascript

Besides components, the part of the webpack build is `vendor.ts` and `app.ts` files.

`vendor.ts` (`/src/Pyz/Yves/ShopUi/Theme/default/vendor.ts`) is used to import global external libraries `app.ts` (`/src/Pyz/Yves/ShopUi/Theme/default/app.ts`) that invoke bootstrap function initializing the Spryker Shop frontend application.

{% info_block warningBox "Note" %}

You can overwrite these files in your own namespace and/or theme.

{% endinfo_block %}

### SCSS

All components in the Core level provide global mixin for every level, so you can include them into Eco and Project levels.

Besides the components, you can find SCSS files with global classes, mixins, variables like `basic.scss`, `util.scss`, `shared.scss`. The order of including these files you can find here `/frontend/configs/development.js`.
