---
title: PHP `xdebug` extension is not active in CLI
originalLink: https://documentation.spryker.com/2021080/docs/php-xdebug-extension-is-not-active-in-cli
redirect_from:
  - /2021080/docs/php-xdebug-extension-is-not-active-in-cli
  - /2021080/docs/en/php-xdebug-extension-is-not-active-in-cli
---

## Description
PHP `xdebug` extension is not active in CLI.

## Solution
Exit the CLI session and enter it with the `-x` argument:
* `docker/sdk cli -x`
* `docker/sdk testing -x
