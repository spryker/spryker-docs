---
title: PHP `xdebug` extension is not active in CLI
description: Learn how to fix the issue when PHP `xdebug` extension is not active in CLI
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/php-xdebug-extension-is-not-active-in-cli
originalArticleId: 5fe9a7c8-6e68-4024-952b-ae353d41bce0
redirect_from:
  - /2021080/docs/php-xdebug-extension-is-not-active-in-cli
  - /2021080/docs/en/php-xdebug-extension-is-not-active-in-cli
  - /docs/php-xdebug-extension-is-not-active-in-cli
  - /docs/en/php-xdebug-extension-is-not-active-in-cli
  - /v6/docs/php-xdebug-extension-is-not-active-in-cli
  - /v6/docs/en/php-xdebug-extension-is-not-active-in-cli
---

## Description
PHP `xdebug` extension is not active in CLI.

## Solution
Exit the CLI session and enter it with the `-x` argument:
* `docker/sdk cli -x`
* `docker/sdk testing -x
