---
title: Demoshop Guide
description: This article provides information on the demoshop frontend installation.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/demoshop-guide
originalArticleId: a22c9287-1f00-4c75-affc-99f524458258
redirect_from:
  - /2021080/docs/demoshop-guide
  - /2021080/docs/en/demoshop-guide
  - /docs/demoshop-guide
  - /docs/en/demoshop-guide
  - /v6/docs/demoshop-guide
  - /v6/docs/en/demoshop-guide
  - /v5/docs/demoshop-guide
  - /v5/docs/en/demoshop-guide
  - /v4/docs/demoshop-guide
  - /v4/docs/en/demoshop-guide
  - /v3/docs/demoshop-guide
  - /v3/docs/en/demoshop-guide
  - /v2/docs/demoshop-guide
  - /v2/docs/en/demoshop-guide
  - /v1/docs/demoshop-guide
  - /v1/docs/en/demoshop-guide
---

## Bootstrap the project
To install all frontend the external dependecies for Yves and Zed, run in the VM console:
`cd /path/to/project/root`
`./setup -i`

### Yves
To build assets for Yves, run in the console:

```bash
cd /path/to/project/root
npm run yves # build assets in development mode
npm run yves:watch # build assets in development mode with watchers over the code
npm run yves:production # build assets in production mode
npm run yves:stylelint # helps you avoid errors and enforce conventions in your SCSS
npm run yves:tslint # helps you avoid errors and enforce conventions in your Typescript
```

{% info_block infoBox "Inside and outside the VM" %}
You can run these scripts inside and outside the VM. Run them outside the VM if you want to improve the build performance and the watchers speed. To use NPM commands outside the VM, you need to download and install [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Minimum versions for node is 8.x and for npm - 5.x. Maximum version for Node.js is the one [Recommended for Most Users](https://nodejs.org/en/).
{% endinfo_block %}

### Zed
To build assets for Zed, run in the console:

```bash
cd /path/to/project/root
npm run zed # build assets in development mode
npm run zed:watch # build assets in development mode with watchers over the code
npm run zed:production # build assets in production mode
```

{% info_block infoBox "Inside and outside the VM" %}
You can run these scripts inside and outside the VM. Run them outside the VM if you want to improve the build performance and the watchers speed. To use NPM commands outside of the VM, you need to download and install [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Minimum versions for Node.js is 8.x and for npm - 5.x. Maximum version for Node.js is the one [Recommended for Most Users](https://nodejs.org/en/).
{% endinfo_block %}

### Custom scripts
If you need to add or change the scripts, open the `@project/package.json` manifest file and change the related section:

```bash
"scripts": {
	"yves": "node ./frontend/build development",
	"yves:watch": "node ./frontend/build development-watch",
	"yves:production": "node ./frontend/build production",
	"yves:help": "node ./frontend/libs/command-line-parser --help",
	"yves:stylelint": "NODE_ENV=development node ./frontend/libs/stylelint development",
	"yves:tslint": "node ./frontend/libs/tslint",
	"zed": "node ./node_modules/@spryker/oryx-for-zed/build",
	"zed:watch": "node ./node_modules/@spryker/oryx-for-zed/build --dev",
	"zed:production": "node ./node_modules/@spryker/oryx-for-zed/build --prod"
}
```
