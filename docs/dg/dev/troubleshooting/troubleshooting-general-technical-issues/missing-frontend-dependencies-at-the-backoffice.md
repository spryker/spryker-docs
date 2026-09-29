---
title: Missing Frontend Dependencies When Building Back Office Assets
description: Learn how to resolve missing frontend dependencies when building Back Office assets.
last_updated: Sep 28, 2026
template: troubleshooting-guide-template
---

## Cause

Issues such as an incorrect folder structure, incorrect file names, or missing npm dependencies can result in incomplete assets.

## Solution

- Verify the asset folder structure: `src/Pyz/Zed/{ModuleName}/assets/Zed/{js, sass, ...}`
- Check the JavaScript file names. The frontend builder looks for files that end with `.entry.js` or `.entry.ts`.
- Ensure that the builder is up to date. Starting from `spryker/gui` version 5.8.0, the builder ships with the Gui module — see [Frontend builder for the Back Office v2](/docs/dg/dev/frontend-development/latest/zed/frontend-builder-for-back-office-v2.html). On the legacy `@spryker/oryx-for-zed` package, update it to the latest release; its errors are less specific than those of builder v2.

## Useful links

{% info_block infoBox "Info" %}

For more information about overriding assets, see [How the builder collects entry points](/docs/dg/dev/frontend-development/latest/zed/frontend-builder-for-back-office-v2.html#how-the-builder-collects-entry-points). For the legacy builder, see [Overriding assets for Zed on the project level](/docs/dg/dev/frontend-development/latest/zed/overriding-webpack-js-scss-for-zed-on-the-project-level.html).

{% endinfo_block %}
