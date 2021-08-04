---
title: Asset management
originalLink: https://documentation.spryker.com/v6/docs/asset-management
redirect_from:
  - /v6/docs/asset-management
  - /v6/docs/en/asset-management
---

There are 2 types of assets in the Spryker Commerce OS: dynamic and static. 

## Dynamic Assets

Dynamic assets are files, added during content and product creation: adding or changing CMS pages, adding product images.

## Static Assets

Static assets are images, fonts, CSS, JS, HTML and PHP files that are available and used by default. All the files are split into folders according to the application they are used for: Zed, Yves or Glue. The PHP and HTML files stored in static asset directories are used for handling errors and showing the platform maintenance messages.

{% info_block infoBox %}
Currently, except for the error handling files, there are no Glue related assets. 
{% endinfo_block %}

### Location

By default, static assets are stored locally in the following folders:

*     `public/Yves/assets/`
*     `public/Zed/assets/`

For organizational or cost and speed optimization purposes, the location of static assets can be changed to an external source.

The following environment variables are used for that:

*   `SPRYKER_ZED_ASSETS_BASE_URL`
*   `SPRYKER_YVES_ASSETS_URL_PATTERN`

Check [Custom Location for Static Assets](https://documentation.spryker.com/docs/custom-location-for-static-assets) for more details.
