---
title: Integrate SCSS linter
description: Learn how to enable and integrate the SCSS linter and its dependencies for your Spryker based project
last_updated: Jun 16, 2021
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

1. Add the SCSS lint script to `/frontend/libs/stylelint.js`

```js
const stylelint = require('stylelint');
const { globalSettings } = require('../settings');
const commandLineParser = require('commander');

commandLineParser
    .option('-f, --fix', 'execute stylelint in the fix mode.')
    .option('-p, --file-path <path>', 'execute stylelint only for this file.')
    .parse(process.argv);

const isFixMode = !!commandLineParser.fix;
const defaultFilePaths = [`${globalSettings.paths.project}/**/*.scss`];
const filePaths = commandLineParser.filePath ? [commandLineParser.filePath] : defaultFilePaths;

stylelint.lint({
    configFile: `${globalSettings.context}/node_modules/@spryker/frontend-config.stylelint/.stylelintrc.json`,
    files: filePaths,
    syntax: "scss",
    formatter: "string",
    fix: isFixMode,
}).then(function(data) {
    if (data.errored) {
        const messages = JSON.parse(JSON.stringify(data.output));
        process.stdout.write(messages);
        process.exit(1);
    }
}).catch(function(error) {
    console.error(error.stack);
    process.exit(1);
});
```

See this example file: [stylelint.js](https://github.com/spryker-shop/suite/blob/master/frontend/libs/stylelint.js).

2. Adjust the `/package.json` scripts:

```json
"scripts": {
    ....
    "yves:stylelint": "node ./frontend/libs/stylelint",
    "yves:stylelint:fix": "node ./frontend/libs/stylelint --fix"
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
