---
title: 'Upgrade to PHP 8.5'
description: Upgrade PHP to version 8.5 in your Docker environment and composer.json. Check code and dependencies for compatibility, update configurations, and test your application to ensure a smooth upgrade.
template: concept-topic-template
last_updated: Sep 2, 2026
---

This document describes how to upgrade PHP to version 8.5. This upgrades the version in Docker environment and `composer.json`.

{% info_block infoBox "Minimum supported version" %}

PHP 8.5 is the recommended version, but PHP 8.3 remains the minimum version Spryker modules support. You can upgrade your project to PHP 8.5 without waiting for the minimum version to change. Support for PHP 8.3 will be dropped in July 2027.

{% endinfo_block %}

## 1. Check project code for PHP compatibility using PHPCompatibility

To make sure your project is compatible with PHP 8.5, follow the steps:

1. Require the `php-compatibility` package:

```bash
composer require --dev phpcompatibility/php-compatibility --ignore-platform-reqs
```

2. Configure `phpcs` to use `php-compatibility` rules:

```bash
vendor/bin/phpcs --config-set installed_paths vendor/phpcompatibility/php-compatibility
```

3. Execute the `php-compatibility` sniffer for PHP 8.5:

```bash
vendor/bin/phpcs -p src/ --standard=PHPCompatibility  --runtime-set testVersion 8.5
```

This returns the code that's not compatible with PHP 8.5.

4. Fix all the discovered incompatibilities.

## 2. Check and resolve incompatible dependencies

1. Identify any dependencies that are not compatible with PHP 8.5:

```bash
composer why-not php 8.5
```

The command listed dependencies that are not compatible with PHP 8.5, along with the reasons why they can't be upgraded.

2. Update dependencies. Check if there are newer versions of these dependencies that support PHP 8.5. You can do this by visiting the package's repository or checking its documentation.
If updates are available, update your `composer.json` file to require these newer versions.

3. Resolve conflicts. If newer versions are not available, you may need to find alternative packages that are compatible with PHP 8.5. Search for alternative packages on Packagist or other package repositories.

Pay particular attention to static analysis and testing tools. Because they run on the same PHP version as your application, an outdated analyzer can fail on a new PHP minor even when your own code is fine.

## 3. Update composer.json

1. Set the minimum required PHP version to 8.5:

```bash
"require": {
  "php": ">=8.5",
}
```

2. Define PHP 8.5 as the platform version for dependency resolution:

```bash
"config": {
  "preferred-install": "dist",
  "platform": {
    "php": "8.5.0"
  },
```

3. Update dependencies:

```bash
composer update
```

This updates the dependencies to the latest versions that are compatible with PHP 8.5.

## 4. Upgrade Codeception to version 5.3.4 or later

On PHP 8.5, Codeception versions earlier than 5.3.4 fail during configuration on every run with the following error:

```text
Fatal error: Uncaught Codeception\Exception\ConfigurationException: register_argc_argv must be set to On for running Codeception
```

Codeception versions earlier than 5.3.4 rely on the `register_argc_argv` PHP setting to read command-line arguments. That mechanism no longer works on PHP 8.5, so Codeception aborts before any test executes. Codeception 5.3.4 or later reads command-line arguments without `register_argc_argv`, so it is required for running tests on PHP 8.5.

1. Check the installed Codeception version:

```bash
composer show codeception/codeception
```

2. If the installed version is earlier than 5.3.4, upgrade it:

```bash
composer update codeception/codeception --with-dependencies
```

{% info_block warningBox "Warning" %}

Setting `register_argc_argv=On` in the PHP configuration is only a workaround: it masks the error in the current environment and leaves the incompatibility in place. Upgrading Codeception is the proper fix.

{% endinfo_block %}

## 5. Update Docker configuration

1. In all `deploy.yml` files, update the PHP image:

```bash
image:
    tag: spryker/php:8.5
    environment:
```

2. Apply the changes by restarting the application:

```bash
docker/sdk boot && docker/sdk up --build
```

## 6. Resolve common PHP 8.5 deprecations

The deprecations below are the ones most likely to appear in a Spryker-based project. They are new in PHP 8.5: on PHP 8.3 and 8.4 the same calls emit nothing at all.

Several of them concern calls that stopped having any effect in an earlier release—the notice itself states both dates, for example `deprecated since 8.5, as it has no effect since PHP 8.1`. Because such a call is already a no-op, removing it changes no behavior, and the fix is valid on PHP 8.3 and 8.4 as well. You can therefore clean these up before switching versions.

Deprecations emit an `E_DEPRECATED` notice and keep working, so they do not break your application, but they flood your logs and hide real problems.

| Deprecated call | Resolution |
| --- | --- |
| `ReflectionProperty::setAccessible()`, `ReflectionMethod::setAccessible()` | Remove the call. Since PHP 8.1, Reflection accesses private and protected members without it. |
| `curl_close()`, `curl_share_close()`, `imagedestroy()`, `finfo_close()`, `xml_parser_free()` | Remove the call. These handles became objects in PHP 8.0 and are released automatically. |
| `new ArrayObject($object)`, `new ArrayIterator($object)` | Pass an array instead: `new ArrayObject([$object])` for a single item, or `new ArrayObject($arrayObject->getArrayCopy())` to copy an existing collection. |
| Non-canonical casts `(boolean)`, `(integer)`, `(double)`, `(binary)` | Use `(bool)`, `(int)`, `(float)`, `(string)`. This one is reported at compile time, so it surfaces even for code paths that never run. |

For the complete list, see [Deprecated Features PHP 8.5](https://www.php.net/manual/en/migration85.deprecated.php).

{% info_block warningBox "Passing an object to ArrayObject may hide a bug" %}

When you pass a plain object—for example, a transfer object—to `ArrayObject`, PHP builds the collection from the object's *property table*, not from the object itself. The resulting collection contains the object's properties rather than the object. This is already incorrect on PHP 8.3 and 8.4; the PHP 8.5 notice only makes it visible. Check such places for correctness instead of only silencing the notice.

{% endinfo_block %}

## 7. Test the upgrade

Thoroughly test your application to identify any issues because of the PHP version upgrade:

- Automated tests: Run unit, integration, and functional tests.
- Manual testing: Test critical application functionality.
- Monitor for deprecations: Check for deprecation notices or warnings that may arise from running on PHP 8.5.

{% info_block infoBox "Deprecations are suppressed by default" %}

By default, Spryker excludes `E_DEPRECATED` and `E_USER_DEPRECATED` from `ErrorHandlerConstants::ERROR_LEVEL`, so deprecation notices are neither logged nor thrown. A plain test run therefore reports nothing even when deprecations occur. To collect them, run with `SPRYKER_DEBUG_DEPRECATIONS_ENABLED=1`: deprecations are then written to the log, and because they are listed in `ErrorHandlerConstants::ERROR_LEVEL_LOG_ONLY`, they are still not converted into exceptions.

{% endinfo_block %}
