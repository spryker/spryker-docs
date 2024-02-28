---
title: Upgrade Node.js to v18 and npm to v9
last_updated: May 16, 2023
description: Use this guide to upgrade Node.js to v18 and npm to v9.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/front-end-development/202304.0/migration-guide-upgrade-nodejs-to-v18-and-npm-to-v9.html
  - /docs/scos/dev/front-end-development/202311.0/migration-guide-upgrade-nodejs-to-v18-and-npm-to-v9.html

---

This document provides instructions for upgrading Node.js to v18 and npm to v9.

According to [Node.js schedule](https://github.com/nodejs/release#release-schedule), the maintenance of version 16 stops on September 11, 2023. Therefore, we recommend migrating to the 18 LTS version.

*Estimated migration time: 1h*

## 1) Update configuration files

1. In the main `*.yml` files, set up new versions of `node/npm`, like `deploy.yml`, `deploy.dev.yml`, and `deploy.ci.yml`:

```yaml
image:
    ...
    node:
        version: 18
        npm: 9
```

{% info_block infoBox "Note" %}

To ensure the CI jobs run successfully, add the same config part to all `deploy.*.yml` files used by the frontend.

{% endinfo_block %}

2. In the root directory, create or update the `.nvmrc` file with the following content:

```text
18.16.0
```

3. In `package.json`, update or add dependencies and engines:

```json
{
    ...
    "engines": {
        "node": ">=18.0.0",
        "npm": ">=9.0.0"
    },
    ...
    "devDependencies": {
        ...,
        "@babel/preset-env": "~7.20.2",
        "@spryker/oryx-for-zed": "~3.0.0",
        "autoprefixer": "~10.4.14",
        "postcss": "~8.4.24",
        "postcss-loader": "~7.3.0",
        "sass-resources-loader": "~2.2.5",
        ...
    },
    ...
}
```

4. In `package.json`, remove the dependency:

```json
    "@spryker/sass-resources-loader": "x.x.x"
```

5. In `frontend/configs/development.js`, update the webpack config:
   1. In `postcss-loader`, replace `options`.
   2. Replace `@spryker/sass-resources-loader` with `sass-resources-loader`;

```js
    ...
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        require('autoprefixer')
                    ]
                }
            }
        },
        ...,
        {
            loader: 'sass-resources-loader',
            options: {
                resources: [sharedScss, ...styles],
            },
        },
    ...
```

## 2) Build the project

1. Apply the docker changes:

```bash
docker/sdk boot deploy.dev.yml
docker/sdk up
```

2. Regenerate `package-lock.json`:

```bash
docker/sdk cli npm install
```

{% info_block infoBox "Note" %}

Ensure that the `package-lock.json` file has `"lockfileVersion": 2` or later; otherwise, remove `node_modules` and `package-lock.json` and regenerate the file again:

```bash
rm -rf node_modules && docker/sdk cli rm -rf node_modules && rm -rf package-lock.json
docker/sdk cli npm install
```

{% endinfo_block %}

3. Build the project using Node.js v18 and npm v9:

```bash
rm -rf node_modules && docker/sdk cli rm -rf node_modules
docker/sdk up --build --assets --data
```

{% info_block infoBox "Note" %}

If you use `Node.js` and `npm` locally, make sure their versions are correct:

```bash
node -v
npm -v
```

To update the versions, use official documentation:

- [Node.js](https://nodejs.org/en/download/package-manager)
- [npm](https://docs.npmjs.com/try-the-latest-stable-version-of-npm)

{% endinfo_block %}

## 3) Update GitHub Actions

If the project uses CI, adjust `.github/workflows/ci.yml`:

1. Update Node.js version:

```yaml
- uses: actions/setup-node@v3
    with:
      node-version: '18'
```

2. Remove npm cache:

```yaml
- name: NPM cache
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-node-${% raw %}{{{% endraw %} hashFiles('**/package-lock.json') {% raw %}}}{% endraw %}
    restore-keys: |
      ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-node-
```
