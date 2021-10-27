---
title: Public Folder
description: To publish means to place the built assets in a place where they can be accessed and loaded by the browser. In the whole project, the only place with such access rights is the @project/public folder.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/public-folder
originalArticleId: 8ade5d89-f24e-4be9-857b-57be90344e48
redirect_from:
  - /2021080/docs/public-folder
  - /2021080/docs/en/public-folder
  - /docs/public-folder
  - /docs/en/public-folder
  - /v6/docs/public-folder
  - /v6/docs/en/public-folder
  - /v5/docs/public-folder
  - /v5/docs/en/public-folder
  - /v4/docs/public-folder
  - /v4/docs/en/public-folder
  - /v3/docs/public-folder
  - /v3/docs/en/public-folder
  - /v2/docs/public-folder
  - /v2/docs/en/public-folder
  - /v1/docs/public-folder
  - /v1/docs/en/public-folder
---

To publish means to place the built assets in a place where they can be accessed and loaded by the browser.

In the whole project, the only place with such access rights is the `@project/public` folder.

## Application Folders

* `@project/public/Yves`
* `@project/public/Zed`

These folders contain only application-related public files.

Each file is directly accessible from the browser by using the `/<filename>.<ext> path`.

{% info_block errorBox %}
Do not add any files here as they will not be accessible.
{% endinfo_block %}

Due to strict nginx configuration, only the content that already exists is public.

## Assets Dedicated Folders

* `@project/public/Yves/assets`
* `@project/public/Zed/assets`

These folders can contain any file that needs to be accessed and loaded by the browser. Contents can be addressed by using the `/assets/<path>/<filename>.<ext>` path. Assets must be placed here.

{% info_block infoBox "Yves Themes Folders" %}

To avoid conflicts and incorrect behaviour in Yves UI, create a subfolder (`@project/public/Yves/assets/<theme>`) for each theme you have in your project, and place the related files there.

{% endinfo_block %}
