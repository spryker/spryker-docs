---
title: PHP version
description: Reference information for evaluator tools.
template: howto-guide-template
---

This guide describes how to resolve issues surrounding the allowed and consistent PHP version being used in different project parts.

## Problem description

The PHP version is declared in different configuration files and used by dependencies.
You need to be sure that all those items have a PHP versions that are consistent and supported by [Spryker SDK](https://docs.spryker.com/docs/sdk/dev/spryker-sdk.html).

PHP versions are checked in:
- `composer.json`
- Config deploy files `deploy.**.yml`
- [Spryker SDK](https://docs.spryker.com/docs/sdk/dev/spryker-sdk.html) PHP versions

## Example of correct code

PHP version in deploy files should correspond the PHP version declared in `composer.json` and supported PHP version by [Spryker SDK](https://docs.spryker.com/docs/sdk/dev/spryker-sdk.html).

`composer.json`:

```json
{
  "name": "spryker-shop/b2c-demo-shop",
  "description": "Spryker B2C Demo Shop",
  "license": "proprietary",
  "require": {
    "php": ">=8.0",
    ...
  }
}
```

`deploy.yml`:

```yaml
...
image:
    tag: spryker/php:8.2-alpine3.12
    php:
        ini:
            "opcache.revalidate_freq": 0
            "opcache.validate_timestamps": 0
...
```

## Example of evaluator error message

Example 1. Unsupported [Spryker SDK](https://docs.spryker.com/docs/sdk/dev/spryker-sdk.html) PHP version is used in `composer.json` file.

```shell
===================
PHP VERSION CHECKER
===================

+---+------------------------------------------------------------------------+---------------------------------+
| # | Message                                                                | Target                          |
+---+------------------------------------------------------------------------+---------------------------------+
| 1 | Composer json PHP constraint "7.2" does not match allowed PHP versions | <path_to_project>/composer.json |
+---+------------------------------------------------------------------------+---------------------------------+
```

`composer.json` file, that produces the error message:

```json
{
  "name": "spryker-shop/b2c-demo-shop",
  "description": "Spryker B2C Demo Shop",
  "license": "proprietary",
  "require": {
    "php": "7.2",
    ...
  }
}
```

Example 2. Unsupported [Spryker SDK](https://docs.spryker.com/docs/sdk/dev/spryker-sdk.html) PHP version is used in `deploy.yml` file.

```shell
===================
PHP VERSION CHECKER
===================

+---+-----------------------------------------------------------------------------------+------------------------------+
| # | Message                                                                           | Target                       |
+---+-----------------------------------------------------------------------------------+------------------------------+
| 1 | The deploy file uses a not allowed PHP image version "spryker/php:7.2-alpine3.12" | <path_to_project>/deploy.yml |
|   | The image tag must contain an allowed PHP version (image:abc-8.0)                 |                              |
+---+-----------------------------------------------------------------------------------+------------------------------+
```

`deploy.yml` file, that produces the error message:

```yaml
...
image:
    tag: spryker/php:7.2
    php:
        ini:
            "opcache.revalidate_freq": 0
            "opcache.validate_timestamps": 0
...
```

Example 3. Inconsistent PHP versions are used in `composer.json` and `deploy.yml` files:

```shell
===================
PHP VERSION CHECKER
===================

+---+--------------------------------------------+--------------------------------------------------------+
| # | Message                                    | Target                                                 |
+---+--------------------------------------------+--------------------------------------------------------+
| 1 | Not all the targets have same PHP versions | Current php version $phpVersion: php7.2                |
|   |                                            | tests/Acceptance/_data/InvalidProject/composer.json: - |
|   |                                            | tests/Acceptance/_data/InvalidProject/deploy**.yml: -  |
|   |                                            | SDK php versions: php7.2, php8.2                       |
+---+--------------------------------------------+--------------------------------------------------------+
```

`composer.json` file uses PHP version `7.2`:

```json
{
  "name": "spryker-shop/b2c-demo-shop",
  "description": "Spryker B2C Demo Shop",
  "license": "proprietary",
  "require": {
    "php": "7.2",
    ...
  }
}
```

`deploy.yml` file uses PHP version `8.2`:

```yaml
...
image:
    tag: spryker/php:8.2
    php:
        ini:
            "opcache.revalidate_freq": 0
            "opcache.validate_timestamps": 0
...
```

Inconsistent PHP versions produces the error message output.

### Resolving the error

To resolve the issue:
1. Use a supported [Spryker SDK](https://docs.spryker.com/docs/sdk/dev/spryker-sdk.html) PHP version.
2. Make sure that all the files contain the consistent PHP version declaration:
   - `composer.json`
   - Config deploy files `deploy.**.yml`
