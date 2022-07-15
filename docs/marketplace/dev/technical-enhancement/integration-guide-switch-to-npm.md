---
title: Integration guide - Switch to NPM v8
description: Use the guide to update versions of the Angular and related modules.
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


// delete .yarn folder
// delete yarn.lock file
// clean up .* files in the root by deleting .yarn folder from the list
// use single command to install dependencies `frontend:project:install-dependencies` in *.yml files instead of `frontend:{yves/zed/mp}:install-dependencies`
