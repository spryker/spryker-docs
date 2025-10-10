---
title: A PHP extension is missing from your system
description: Learn how to resolve missing PHP extension errors in Spryker Code Upgrader by installing necessary extensions for smooth operation.
template: concept-topic-template
last_updated: Nov 9, 2023
redirect_from:
  - /docs/paas-plus/dev/troubleshooting/install-or-enable-php-s-extension.html
---

Spryker Code Upgrader supports the most common PHP extensions. If your application requires an extension not supported by the Upgrader, contact us to enable it.

## Supported PHP extensions

By default Spryker Code Upgrader supports the following PHP extensions:

- apcu
- bcmath
- bz2
- ctype
- curl
- date
- dom
- fileinfo
- filter
- ftp
- gd
- gmp
- hash
- iconv
- intl
- json
- libxml
- mbstring
- mysqli
- mysqlnd
- newrelic
- openssl
- pcntl
- pcre
- pdo
- pdo_mysql
- pdo_pgsql
- pdo_sqlite
- pgsql
- phar
- posix
- readline
- redis
- reflection
- session
- simplexml
- soap
- sockets
- sodium
- spl
- sqlite3
- standard
- tokenizer
- xml
- xmlreader
- xmlwriter
- xsl
- zip
- zlib

## Error

```shell
Your requirements could not be resolved to an installable set of packages.

  Problem 1

    - <organisation_name>/<package_name> <package_version> requires ext-<extension_name> * -> it's missing from your system. Install or enable PHP\'s <extension_name> extension.

You can also run `php --ini` in a terminal to see which files are used by PHP in CLI mode.

Alternatively, you can run Composer with `--ignore-platform-req=ext-<extension_name>` to temporarily ignore these required extensions.

Installation failed, reverting ./composer.json and ./composer.lock to their original content.
```

## Solution

Request the missing extension to be added by [contacting us](https://support.spryker.com). Make sure to include the name of the required extension and your project's name in the request.

## Support for Spryker CI

- For help with Spryker CI, [contact support](https://support.spryker.com).
- To learn more about Buddy, see their [docs](https://buddy.works/docs).
