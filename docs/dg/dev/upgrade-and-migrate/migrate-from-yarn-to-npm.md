---
title: Migrate from Yarn to npm
last_updated: May 15, 2023
description: Use this guide to migrate the project from Yarn to npm.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/front-end-development/migration-guide-switch-from-yarn-to-npm.html
  - /docs/scos/dev/front-end-development/202311.0/migration-guide-switch-from-yarn-to-npm.html

---

This document provides instructions for migrating from Yarn to npm.

Since the beginning of the Merchant Portal project, Yarn v2 has been used to install dependencies. If the package versions differ between some packages, it can not install all dependencies correctly. The issue has been managed internally by updating all package versions simultaneously, but when customers develop the project, this cannot be guaranteed. Since Yarn has not responded to the reported issue for more than a year, we must switch back to npm v9, which also supports workspaces.

*Estimated migration time: 2h*

## 1) Update modules

```bash
composer update spryker/chart spryker/dashboard-merchant-portal-gui spryker/discount spryker/gui spryker/gui-table spryker/merchant-profile-merchant-portal-gui spryker/product-merchant-portal-gui spryker/product-offer-merchant-portal-gui spryker/product-relation-gui spryker/sales-merchant-portal-gui spryker/security-merchant-portal-gui spryker/state-machine spryker/user-merchant-portal-gui spryker/zed-ui spryker-shop/product-review-widget spryker-shop/shop-ui
```

## 2) Update configuration files

1. Set up new versions of `node/npm` in the main `*.yml` files, like `deploy.yml`, `deploy.dev.yml`, and `deploy.ci.yml`:

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

2. The following commands are deprecated and work correctly only with the previous versions (using Yarn): `frontend:yves:install-dependencies`, `frontend:zed:install-dependencies`, `frontend:mp:install-dependencies`. Therefore, in all `*.yml` files at the project level, do the following:
   1. Remove the deprecated `frontend:yves:install-dependencies` and `frontend:zed:install-dependencies` commands.
   2. Replace the `frontend:mp:install-dependencies` command with `frontend:project:install-dependencies`.

3. Pass all (yves, zed, and mp) frontend dependencies:

```bash
frontend:project:install-dependencies
```

4. Pull the latest `docker-sdk` version:

```bash
cd docker && git pull origin master
git log
```

5. The `git log` command prints the table with the last three commits. Copy the hash of the first commit and replace the content in the `.git.docker` file:

```text
// paste `hash` text here
```

{% info_block infoBox "Note" %}

The minimum `hash` text should be `e9ebb666feccae1754792d41e49df3b9f95ef0aa` or higher.

{% endinfo_block %}

6. Update the `package.json`:

```json
{
    ...
    "workspaces": [
        "vendor/spryker/*",
        "vendor/spryker/*/assets/Zed"
    ],
    ...
    "engines": {
        "node": ">=18.0.0",
        "npm": ">=9.0.0"
    },
    ...
    "devDependencies": {
        ...
        "@babel/plugin-proposal-class-properties": "~7.17.12",
        "@babel/plugin-transform-runtime": "~7.17.12",
        "@babel/preset-typescript": "~7.17.12",
        "@spryker/oryx-for-zed": "~3.0.0",
        "babel-loader": "~8.2.5",
        "sass": "~1.51.0",
        ...
    },
    ...
}
```

7. Update the `.travis.yml`:

```yaml
before_install:
  ...
  - nvm install 18 > /dev/null
  - nvm use 18
  ...
```

8. In the root directory, create a new `.npmrc` file with the following content:

```text
legacy-peer-deps=true
```

9. Delete the following folders and files from the root directory:

- `.yarn` folder
- `.yarnrc.yml` file
- `yarn.lock` file

## 3) Build the project

1. Apply the docker changes:

```bash
docker/sdk boot deploy.dev.yml
docker/sdk up
```

2. Regenerate `package-lock.json`:

```bash
rm -rf package-lock.json
docker/sdk cli npm install
```

3. Build the project using npm v9:

```bash
rm -rf node_modules && docker/sdk cli rm -rf node_modules
docker/sdk boot deploy.dev.yml
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
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

{% endinfo_block %}
