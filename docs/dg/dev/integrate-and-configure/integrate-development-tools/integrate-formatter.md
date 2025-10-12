---
title: Integrate Formatter
description: Learn how to enable and integrate Formatter and their dependencies into your Spryker based project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/formatter-integration-guide
originalArticleId: 4afd703c-3ce1-4924-901f-19c43b588cb0
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-development-tools/integrating-formatter.html
  - /docs/scos/dev/migration-and-integration/202108.0/development-tools/formatter-integration-guide.html
related:
  - title: Integrating SCSS linter
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-scss-linter.html
  - title: Integrating TS linter
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-ts-linter.html
  - title: Integrating Web Profiler for Zed
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-zed.html
  - title: Integrating Web Profiler Widget for Yves
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-widget-for-yves.html
---

Follow the steps below to integrate [Formatter](/docs/scos/dev/sdk/development-tools/formatter.html) into your project.

## 1. Install the dependencies

To install the dependencies:

1. Install Prettier:

```bash
npm install prettier@2.0.x --save-dev
```

2. Install config for Prettier:

```bash
npm install @spryker/frontend-config.prettier --save-dev
```

3. Install the CLI parser:

```bash
npm install commander@4.0.x --save-dev
```

## 2. Update the scripts

To update the scripts:

1. Add formatting file extensions to the global settings `/frontend/settings.js`:

```js
const globalSettings = {
    // ...

    formatter: [
        '**/*.{scss,css,less,js,ts,json,html}',
    ],
};

```

2. Add the formatter script to `/frontend/libs/formatter.js`:

```js
const { spawn } = require('child_process');
const { globalSettings } = require('../settings');
const commandLineParser = require('commander');
const configPath = 'node_modules/@spryker/frontend-config.prettier/.prettierrc.json';

commandLineParser
    .option('-f, --fix', 'execute stylelint in the fix mode.')
    .option('-p, --file-path <path>', 'execute stylelint only for this file.')
    .option('-i, --ignore-path <path>', 'path to prettier ignore file.')
    .parse(process.argv);

const mode = commandLineParser.fix ? '--write' : '--check';
const filePaths = commandLineParser.filePath ? [commandLineParser.filePath] : globalSettings.formatter;
const ignorePath = commandLineParser.ignorePath ? commandLineParser.ignorePath : './.prettierignore';

spawn(
    'npx',
    ['prettier', '--config', configPath, '--ignore-path', ignorePath, mode, ...filePaths],
    { stdio: 'inherit' }
);
```

See this example file [formatter.js](https://github.com/spryker-shop/suite/blob/master/frontend/libs/formatter.js).

3. Adjust the `/package.json` scripts:

```json
"scripts": {
    ....
    "formatter": "node ./frontend/libs/formatter",
    "formatter:fix": "node ./frontend/libs/formatter --fix"
}
```

4. Add the ignore file `/.prettierignore`:

```text
# Ignore paths
/.github/
/.yarn/
/docker/
/frontend/
/vendor/
/public/Yves/assets/
/public/Zed/assets/
**/dist/**

/composer.json
/package-lock.json
```
