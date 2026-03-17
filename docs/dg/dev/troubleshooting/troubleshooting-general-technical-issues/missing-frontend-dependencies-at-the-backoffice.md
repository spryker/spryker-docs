---
title: Missing Frontend Dependencies When Building Back Office Assets
description: Learn how to resolve missing frontend dependencies when building Back Office assets.
last_updated: Mar 17, 2026
template: troubleshooting-guide-template
---

## Cause

Issues such as an incorrect folder structure, incorrect file names, or missing npm dependencies can result in incomplete assets.

## Solution

- Verify the asset folder structure: `src/Pyz/Zed/{{ ModuleName }}/assets/Zed/{js, sass, ...}`
- Check the JavaScript file names. The frontend builder looks for files that end with `.entry.js`.
- Ensure that the [`@spryker/oryx-for-zed`](https://www.npmjs.com/package/@spryker/oryx-for-zed) package is up to date. This can help identify issues during the asset build step.

## Useful links

{% info_block infoBox "Info" %}

For more information about overriding assets, see [Overriding assets for Zed on the project level](https://docs.spryker.com/docs/dg/dev/frontend-development/latest/zed/overriding-webpack-js-scss-for-zed-on-the-project-level).

{% endinfo_block %}
