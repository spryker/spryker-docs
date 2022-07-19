---
title: Migration guide - Switch from Yarn to NPM v8
description: Use this guide to migrate project from Yarn to NPM v8.
template: concept-topic-template
---

## Upgrading to version 8.*

In this article, you will find instructions on how to upgrade NPM to version 8 in your Spryker project.

### Overview

We've been using Yarn v2 since the beginning of Merchant Portal project to install dependencies in a workspace.
It's been working with some issues where not all dependencies would be installed correctly in the project if some of the package versions will differ between each other.
This issue has been managed internally so far by updating all package versions simultaneously but this cannot be guaranteed when the project is developed by customers.
Yarn has not been responding to the issue reported for more then a year now so we have to switch back to NPM v8 which also supports workspaces.

*Estimated migration time: 2h*

### 1) Update modules

```bash
composer update spryker/manual-order-entry-gui spryker/chart spryker/cms-block-category-connector spryker/cms-block-gui spryker/cms-gui spryker/company-business-unit-gui spryker/company-gui spryker/company-role-gui spryker/company-user-gui spryker/content-gui spryker/content-product-gui spryker/content-product-set-gui spryker/dashboard-merchant-portal-gui spryker/discount spryker/gui spryker/gui-table spryker/merchant-profile-merchant-portal-gui spryker/merchant-relationship-sales-order-threshold-gui spryker/price-product-volume-gui spryker/product-list-gui spryker/product-merchant-portal-gui spryker/product-offer-merchant-portal-gui spryker/product-relation-gui spryker/sales-merchant-portal-gui spryker/sales-order-threshold-gui spryker/sales-reclamation-gui spryker/security-merchant-portal-gui spryker/state-machine spryker/user-merchant-portal-gui spryker/zed-ui spryker-shop/product-review-widget spryker-shop/shop-ui
```

### 2) Update configs

1. Set up a new versions of node/npm in the main `*.yml` files, like `deploy.yml`, `deploy.dev.yml` and `deploy.ci.yml`:

```yaml
image:
    ...
    node:
        version: 16
        npm: 8
```

{% info_block infoBox "Note" %}
To make sure the CI jobs will pass deploy, add same part of config to all 'deploy.*.yml' files, where frontend are using.
{% endinfo_block %}

2. Update docker hash in the `.git.docker` file to make sure the correct version of `docker-sdk` will be installed:

```text
e9ebb666feccae1754792d41e49df3b9f95ef0aa
```

Then run next command to pull latest `docker-sdk` version:

```bash
cd docker && git pull origin master
```

3. Update `package.json`:

```json
{
    ...
    "engines": {
        "node": ">=16.0.0",
        "npm": ">=8.0.0"
    },
    "dependencies": {
        ...
        "@babel/plugin-proposal-class-properties": "~7.17.12",
        "@babel/plugin-transform-runtime": "~7.17.12",
        "@babel/preset-typescript": "~7.17.12",
        "@spryker/oryx-for-zed": "~2.12.0",
        "babel-loader": "~8.2.5",
        "sass": "~1.51.0",
        ...
    },
    ...
}
```

4. Update `.travis.yml`:

```yaml
before_install:
  ...
  - nvm use 16
  ...
```

5. Create a new `.npmrc` file in the root directory with the next content: 

```text
legacy-peer-deps=true
```

6. Use single command to install dependencies `frontend:project:install-dependencies` in `*.yml` files instead of `frontend:{yves/zed/mp}:install-dependencies`.

7. Delete the following folders/files from the root directory:

- `.yarn` folder
- `.yarnrc.yml` file
- `yarn.lock` file

### 3) Build the project

1. Run the following commands to apply the docker changes:

```bash
docker/sdk boot deploy.dev.yml
docker/sdk up
```

2. Regenerate `package-lock.json`: 

```bash
rm -rf package-lock.json
docker/sdk cli npm install
```

3. Run the following commands to build the project using NPM v8:

```bash
rm -rf node_modules && docker/sdk cli rm -rf node_modules
docker/sdk boot deploy.dev.yml
docker/sdk up --build --assets --data
```

{% info_block infoBox "Note" %}
The following commands are deprecated and will work correctly only with the previous versions (using Yarn):

```bash
frontend:yves:install-dependencies
frontend:zed:install-dependencies
frontend:mp:install-dependencies
```

To pass an installation of all (yves, zed, mp) frontend dependencies use a single command: 

```bash
frontend:project:install-dependencies
```
{% endinfo_block %}

{% info_block infoBox "Note" %}
If 'node' and 'npm' are uses locally, make sure their versions are correct:

```bash
node -v
npm -v
```

To update them use the following commands:

```bash
sudo npm -g install npm@8
sudo npm cache clean -f
sudo npm install -g n
sudo n 16
```
{% endinfo_block %}
