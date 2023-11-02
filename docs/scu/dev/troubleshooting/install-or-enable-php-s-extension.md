---
title: "Install or enable PHP's extension"
description: How to add support for the missing PHP extension to Spryker Code Upgrader
template: concept-topic-template
redirect_from:
  - /docs/paas-plus/dev/troubleshooting/install-or-enable-php-s-extension.html
---

Spryker Code Upgrader supports the most common PHP extensions. If your project necessitates an absent PHP extension, kindly seek assistance from the Spryker team to acquire the required support for the extension.

## Supported PHP extensions

By default Spryker Code Upgrader supports the following PHP extensions:

* apcu
* bcmath
* bz2
* ctype
* curl
* date
* dom
* fileinfo
* filter
* ftp
* gd
* gmp
* hash
* iconv
* intl
* json
* libxml
* mbstring
* mysqli
* mysqlnd
* newrelic
* openssl
* pcntl
* pcre
* pdo
* pdo_mysql
* pdo_pgsql
* pdo_sqlite
* pgsql
* phar
* posix
* readline
* redis
* reflection
* session
* simplexml
* soap
* sockets
* sodium
* spl
* sqlite3
* standard
* tokenizer
* xml
* xmlreader
* xmlwriter
* xsl
* zip
* zlib

## Error

```shell
Your requirements could not be resolved to an installable set of packages.

  Problem 1
  
    - <organisation_name>/<package_name> <package_version> requires ext-<extension_name> * -> it is missing from your system. Install or enable PHP\'s <extension_name> extension.

You can also run `php --ini` in a terminal to see which files are used by PHP in CLI mode.

Alternatively, you can run Composer with `--ignore-platform-req=ext-<extension_name>` to temporarily ignore these required extensions.

Installation failed, reverting ./composer.json and ./composer.lock to their original content.
```

## Solution

Kindly [reach out to our support team](https://spryker.force.com/support/s/) to request assistance in acquiring the missing PHP extension. Ensure to include the name of the required extension and your project's name in your request.

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).
