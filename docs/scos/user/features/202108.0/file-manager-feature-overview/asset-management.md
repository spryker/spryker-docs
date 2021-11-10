---
title: Asset management
description: Learn about the assets in Spryker and how you can manage them.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/asset-management
originalArticleId: c1432b06-7f49-411d-9730-d4f52c4875d3
redirect_from:
  - /2021080/docs/asset-management
  - /2021080/docs/en/asset-management
  - /docs/asset-management
  - /docs/en/asset-management
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

* `public/Yves/assets/`
* `public/Zed/assets/`

For organizational or cost and speed optimization purposes, the location of static assets can be changed to an external source.

The following environment variables are used for that:

* `SPRYKER_ZED_ASSETS_BASE_URL`
* `SPRYKER_YVES_ASSETS_URL_PATTERN`

Check [Custom Location for Static Assets](/docs/scos/dev/technical-enhancement-integration-guides/integrating-custom-location-for-static-assets.html) for more details.
