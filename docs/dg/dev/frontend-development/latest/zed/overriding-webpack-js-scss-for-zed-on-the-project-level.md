---
title: Overriding Webpack, JS, SCSS for ZED on the project level
description: Learn how to override Webpack, JS, SCSS for ZED on a project level
last_updated: Sep 28, 2026
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/overriding-webpack-js-scss-for-zed-on-project-level
originalArticleId: 3b57ce80-48b2-47b1-afd0-cd14bf6e07fb
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/zed/overriding-webpack-js-scss-for-zed-on-project-level.html
  - /docs/scos/dev/front-end-development/zed/overriding-webpack-js-scss-for-zed-on-project-level.html
---

{% info_block warningBox "Deprecation notice" %}

This document describes extending the legacy `@spryker/oryx-for-zed` builder with a project build script. Starting from `spryker/gui` version 5.8.0, the Back Office builder ships as part of the Gui module: it scans `src/Pyz/Zed` by default, generates the module aliases, and takes project overrides from a single settings file, so the build script described here is no longer needed.

- For the current builder, see [Frontend builder for the Back Office v2](/docs/dg/dev/frontend-development/latest/zed/frontend-builder-for-back-office-v2.html).
- For upgrade instructions, including what replaces each part of the build script, see [Upgrade to frontend builder v2 for the Back Office](/docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-back-office.html).

{% endinfo_block %}

{% include dg/overriding-webpack-js-scss-for-zed-on-project-level.md %} <!-- To edit, see /_includes/dg/overriding-webpack-js-scss-for-zed-on-project-level.md -->
