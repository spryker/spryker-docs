---
title: Checking and debugging Spryks
description: Find out how you can check and debug Spryks
template: howto-guide-template
redirect_from:
- /docs/sdk/dev/spryks/checking-and-debugging-spryks.html

last_updated: Nov 8, 2022
---

To avoid dependency conflicts, `spryker-sdk/spryk-src` is compiled into a `phar` archive. The archive is then pushed to `spryker-sdk/spryk` and included as a dependency into the target project.
You have to recompile `spryker-sdk/spryk-src` every time when you need to check something. However, this approach is not ideal if you update and debug regularly.

Instead, you can install the package into the vendor folder without adding the dependency to `composer.json` and test it directly on project files for development purposes:

```shell
cd vendor/spryker-sdk
git clone git@github.com:spryker-sdk/spryk-src.git
cd spryk-src
git checkout <your branch>
composer install
```

To run Spryks, you can use a command from the CLI or testing environments:

```shell
# from the host
SPRYKER_XDEBUG_ENABLE=1 docker/sdk testing
or
SPRYKER_XDEBUG_ENABLE=1 docker/sdk cli

#inside the docker
php vendor/spryker-sdk/spryk-src/bin/spryk <Spryk name> <Spryk arguments>

#ex.
php vendor/spryker-sdk/spryk-src/bin/spryk AddCrudFacade --mode project --organization Pyz --module Ay --domainEntity Entity -n
```
