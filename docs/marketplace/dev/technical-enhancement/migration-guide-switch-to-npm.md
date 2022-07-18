---
title: Migration guide - Switch from Yarn to NPM v8
description: Use the guide to migrate project from Yarn to NPM v8.
template: concept-topic-template
---

## Upgrading to version 8.*

In this article, you will find instructions on how to upgrade NPM to version 8 in your Spryker project.

### Overview

We've been using Yarn v2 since the beginning of Merchant Portal project to install dependencies in a workspace.
It's been working with some issues where not all dependencies would be installed correctly in the project if some of the package versions will differ between each other.
This issue has been managed internally so far by updating all package versions simultaneously but this cannot be guaranteed when the project is developed by customers.
Yarn has not been responding to the issue reported for more then a year now so we have to switch back to NPM v8 which also supports workspaces.

*Estimated integration time: 1h 30m*

### 1) Update modules

```bash
composer update spryker/manual-order-entry-gui spryker/chart spryker/cms-block-category-connector spryker/cms-block-gui spryker/cms-gui spryker/company-business-unit-gui spryker/company-gui spryker/company-role-gui spryker/company-user-gui spryker/content-gui spryker/content-product-gui spryker/content-product-set-gui spryker/dashboard-merchant-portal-gui spryker/discount spryker/gui spryker/gui-table spryker/merchant-profile-merchant-portal-gui spryker/merchant-relationship-sales-order-threshold-gui spryker/price-product-volume-gui spryker/product-list-gui spryker/product-merchant-portal-gui spryker/product-offer-merchant-portal-gui spryker/product-relation-gui spryker/sales-merchant-portal-gui spryker/sales-order-threshold-gui spryker/sales-reclamation-gui spryker/security-merchant-portal-gui spryker/state-machine spryker/user-merchant-portal-gui spryker/zed-ui spryker-shop/product-review-widget spryker-shop/shop-ui
```

### 2) Update configs

1. Set up a new versions of node/npm in the main *.yml files, like `deploy.yml`, `deploy.dev.yml` and `deploy.ci.yml`:

```yaml
image:
    ...
    node:
        version: 16
        npm: 8
```

Note: To make sure the CI jobs will pass deploy, add same part of config to all `deploy.*.yml` files, where frontend are using.

2. Update docker hash in the `.git.docker` file to make sure the correct version of `docker-sdk` will be installed:

```text
e9ebb666feccae1754792d41e49df3b9f95ef0aa
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
_BEFORE_INSTALL_SCRIPT: &BEFORE_INSTALL_SCRIPT
  ...
  - nvm install 16 > /dev/null
  - nvm use 16
  ...

jobs:
  ...
  include:
    ...
    - name: PHP 7.4 / MariaDB / MarketPlace Testing
      ...
      script:
        ...
        # Install npm packages
        - vendor/bin/console frontend:project:install-dependencies -vvv
        - npm run mp:build:production
        - npm run mp:test
      ...
  
```

5. Create a new `.npmrc` file in the root folder with the next content: 

```text
legacy-peer-deps=true
```

// delete .yarn folder
// delete yarn.lock file
// clean up .* files in the root by deleting .yarn folder from the list
// use single command to install dependencies `frontend:project:install-dependencies` in *.yml files instead of `frontend:{yves/zed/mp}:install-dependencies`
