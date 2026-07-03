---
title: Integrate SCSS linter
description: Learn how to enable and integrate the SCSS linter and its dependencies for your Spryker based project
last_updated: Jul 3, 2026
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/scss-linter-integration-guide
originalArticleId: 45333d65-56d9-4b44-855a-e26ce42a1e4a
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-development-tools/integrating-scss-linter.html
  - /docs/scos/dev/migration-and-integration/202108.0/development-tools/scss-linter-integration-guide.html
related:
  - title: Integrating Formatter
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-formatter.html
  - title: Integrating TS linter
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-ts-linter.html
  - title: Integrating Web Profiler for Zed
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-zed.html
  - title: Integrating Web Profiler Widget for Yves
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-widget-for-yves.html
---

Follow the steps below to integrate the [SCSS linter](/docs/dg/dev/sdks/sdk/development-tools/scss-linter.html) into your project.

## 1. Install the dependencies

To install the dependencies:
1. Install Stylelint:

```bash
npm install stylelint@13.7.x --save-dev
```

2. Install config for Stylelint:

```bash
npm install @spryker/frontend-config.stylelint --save-dev
```

3. Install the CLI parser:

```bash
npm install commander@4.0.x --save-dev
```

## 2. Update the scripts

To update the scripts:

1. Add the SCSS lint script to `/frontend/libs/stylelint.mjs`

See this example file: [stylelint.mjs](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/frontend/libs/stylelint.mjs).

2. Adjust the `/package.json` scripts:

```json
"scripts": {
    ....
    "yves:stylelint": "node ./frontend/libs/stylelint.mjs",
    "yves:stylelint:fix": "node ./frontend/libs/stylelint.mjs --fix"
}
```

3. Add the ignore `file /.stylelintignore`:

```text
# Ignore paths
**/node_modules/**
**/DateTimeConfiguratorPageExample/**
**/dist/**
public/*/assets/**
```
