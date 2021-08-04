---
title: Front-end builder for Yves
originalLink: https://documentation.spryker.com/v4/docs/front-end-builder-for-yves
redirect_from:
  - /v4/docs/front-end-builder-for-yves
  - /v4/docs/en/front-end-builder-for-yves
---

This article provides information about how to prepare assets (CSS, js, images, etc.) for different namespaces and their themes.

## Commands
The builder has several modes to build frontend:

* `npm run yves` - builds assets in the development mode with all the namespaces and themes.
* `npm run yves:watch` - builds assets in the watch mode, will be watching for CSS and JS files and rebuilding the assets immediately after all the namespaces and themes are changed.
* `npm run yves:production` - builds assets in the production mode (minified files, remove comments, etc.) for all namespaces and themes.
* `npm run yves:help` - display all available parameters for building.

## Parameters

* `-n <namespace name> or --namespace  <namespace name>` - generates the assets for all themes of this `<namespace name>`, if you need to generate several namespaces  - use this parameter several time, for example: `npm run yves – -n DE -n US`
*    `-t <theme name> or --theme <theme name>` - generates the assets for all the namespaces which contain `<theme name>`, if you need to generate several themes  - use this parameter several times, for example: `npm run yves – -t default -t red-theme`
* `-c <path> or --config <path>` - ability define path to config JSON file which overwrites defauld config JSON file
* `-i or --info` - displays list of namespaces with all the available themes.

## Configuration
To enable the multi-theme in Yves, `\SprykerShop\Shared\ShopUi\ShopUiConstants::YVES_ASSETS_URL_PATTERN` configuration needs to be added.

It supports using the key `%theme%` that will be replaced with the current theme for Twig module configuration.

Example:

`$config[\SprykerShop\Shared\ShopUi\ShopUiConstants::YVES_ASSETS_URL_PATTERN] = sprintf('/assets/%s/%s/', $CURRENT_STORE, '%theme%');`

Config for the frontend builder is placed at `/config/Yves/frontend-build-config.json`. But you can change this path using the command with parameters `-c` or `–config`, for example:

`npm run yves – -c /path/to/config.json`

The config file should contain the following data:

```php
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

## Public Assets
All public assets are generated into `/public/Yves/` + path which is defined in the config file (by default - `assets/%namespace%/%theme%/`)

For example, for DE namespace and default theme it will be `/public/Yves/assets/DE/default/`

All incoming files (images, fonts, etc) will be copied from `global` (for every namespace) and `DE` folders:

* `frontend/assets/global/default`
* `frontend/assets/DE/default`

 {% info_block infoBox "Info" %}
If the assets were generated earlier for this namespace and theme, these assets will be substituted by the newest ones. If namespace or theme were removed from the config file, assets for this namespace or theme won't be removed and you should remove it manually, if necessary.
{% endinfo_block %}
 
 ## How Frontend Builder Collects SCSS and JS Files
### Levels
The builder is looking for entry points for components on several levels (from smaller to higher priority):

* Core (`/vendor/spryker-shop`)
* Eco (`/vendor/spryker-eco`)
* Project (`/src/Pyz/Yves`)

Also, modules with specific suffix namespace have higher priority over the module without it, e.g.:

`/src/Pyz/Yves/**/ShopUiDE/**` has higher priority than `/src/Pyz/Yves**/ShopUi/**` and even `/vendor/spryker-shop/**/ShopUiDE/**` has higher priority than `/src/Pyz/Yves**/ShopUi/**`

### Javascript
Besides the components, the part of the webpack build is vendor.ts and app.ts files.

`vendor.ts` (`/src/Pyz/Yves/ShopUi/Theme/default/vendor.ts`) - is used to import global external libraries `app.ts` (`/src/Pyz/Yves/ShopUi/Theme/default/app.ts`) -  invokes bootstrap function which initializes Spryker Shop frontend application.

{% info_block warningBox "Note" %}
You can overwrite these files in your own namespace and/or theme.
{% endinfo_block %}
### SCSS
All components in the Core level provide global mixin for every level, so you can include them into Eco and Project levels.

Besides the components, you can find SCSS files with global classes, mixins, variables like `basic.scss`, `util.scss`, `shared.scss`. The order of including these files you can find here `/frontend/configs/development.js`.

*Last review date: Aug, 06 2019*
