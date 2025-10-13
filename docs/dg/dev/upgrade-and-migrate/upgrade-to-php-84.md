---
title: 'Upgrade to PHP 8.4'
description: Upgrade PHP to version 8.4 in your Docker environment and composer.json. Check code and dependencies for compatibility, update configurations, and test your application to ensure a smooth upgrade.
template: concept-topic-template
last_updated: Aug 22, 2025
---

This document describes how to upgrade PHP to version 8.4. This upgrades the version in Docker environment and `composer.json`.

## 1. Check project code for PHP compatibility using PHPCompatibility

To make sure your project is compatible with PHP 8.4, follow the steps:

1. Require the `php-compatibility` package:

```bash
composer require --dev phpcompatibility/php-compatibility --ignore-platform-reqs
```

2. Configure `phpcs` to use `php-compatibility` rules:

```bash
vendor/bin/phpcs --config-set installed_paths vendor/phpcompatibility/php-compatibility
```

3. Execute the `php-compatibility` sniffer for PHP 8.4:

```bash
vendor/bin/phpcs -p src/ --standard=PHPCompatibility  --runtime-set testVersion 8.4
```

This returns the code that's not compatible with PHP 8.4.

4. Fix all the discovered incompatibilities.

## 2. Check and resolve incompatible dependencies

1. Identify any dependencies that are not compatible with PHP 8.4:

```bash
composer why-not php 8.4
```

The command listed dependencies that are not compatible with PHP 8.4, along with the reasons why they can't be upgraded.

2. Update dependencies. Check if there are newer versions of these dependencies that support PHP 8.4. You can do this by visiting the package's repository or checking its documentation.
If updates are available, update your `composer.json` file to require these newer versions.

3. Resolve conflicts. If newer versions are not available, you may need to find alternative packages that are compatible with PHP 8.4. Search for alternative packages on Packagist or other package repositories.

## 3. Update composer.json

1. Set the minimum required PHP version to 8.4:

```bash
"require": {
  "php": ">=8.4",
}
```

2. Define PHP 8.4 as the platform version for dependency resolution:

```bash
"config": {
  "preferred-install": "dist",
  "platform": {
    "php": "8.4.0"
  },
```

3. Update dependencies:

```bash
composer update
```

This updates the dependencies to the latest versions that are compatible with PHP 8.4.

## 4. Update Docker configuration

1. In all `deploy.yml` files, update the PHP image:

```bash
image:
    tag: spryker/php:8.4
    environment:
```

2. Apply the changes by restarting the application:

```bash
docker/sdk boot && docker/sdk up --build
```

## 5. Test the upgrade

Thoroughly test your application to identify any issues because of the PHP version upgrade:

- Automated tests: Run unit, integration, and functional tests.
- Manual testing: Test critical application functionality.
- Monitor for deprecations: Check for deprecation notices or warnings that may arise from running on PHP 8.4.
