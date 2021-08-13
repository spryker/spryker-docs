---
title: PHP `xdebug` extension is not active in CLI
description: Learn how to fix the issue when PHP `xdebug` extension is not active in CLI
originalLink: https://documentation.spryker.com/v6/docs/php-xdebug-extension-is-not-active-in-cli
originalArticleId: 21d775fa-5721-4c3a-8c4d-e714a6655cde
redirect_from:
  - /v6/docs/php-xdebug-extension-is-not-active-in-cli
  - /v6/docs/en/php-xdebug-extension-is-not-active-in-cli
---

## Description
PHP `xdebug` extension is not active in CLI.

## Solution
Exit the CLI session and enter it with the `-x` argument:
* `docker/sdk cli -x`
* `docker/sdk testing -x
