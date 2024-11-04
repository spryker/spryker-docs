---
title: 'Upgrade to PHP 8.3'
description: End of October 2024, Spryker has released a new version of its Demo Shops supporting PHP 8.3.
template: concept-topic-template
last_updated: Nov 1, 2024
---

This guide provides step-by-step instructions to upgrade your project to use PHP 8.3 in both your Docker environment and `composer.json`. 
By setting the minimum PHP version requirement to 8.3, you ensure that your project fully utilizes the latest features and improvements of PHP 8.3. 

## 1. Check project code for PHP compatibility using PHPCompatibility

To ensure your project is compatible with PHP 8.3, perform the following steps:

1. Require the `php-compatibility` package:

```bash
composer require --dev phpcompatibility/php-compatibility --ignore-platform-reqs
```

2. Configure `phpcs` to use `php-compatibility` rules:
```bash
vendor/bin/phpcs --config-set installed_paths vendor/phpcompatibility/php-compatibility
```

3. Execute the `php-compatibility` sniffer for PHP 8.3:

```bash
vendor/bin/phpcs -p src/ --standard=PHPCompatibility  --runtime-set testVersion 8.3
```

This returns the code that's not compatible with PHP 8.3.

4. Fix all discovered incompatibilities.

## 2. Check for Incompatible Dependencies

Identify any dependencies that are not compatible with PHP 8.3:

```bash
composer why-not php 8.3
```

## 3. Update composer.json

Modify your `composer.json` file to reflect the new PHP version requirements.

1. Set the minimum required PHP version to 8.3.

```bash
    "require": {
      "php": ">=8.3",
    }
``` 

2. Ensure Composer resolves dependencies compatible with PHP 8.3:

```bash
  "config": {
    "preferred-install": "dist",
    "platform": {
      "php": "8.3.12"
    },
```

3. Update dependencies:

```bash
  composer update
```

This command will update your dependencies to the latest versions that are compatible with PHP 8.3

## 4. Update Docker Configuration

1. In every `deploy.yml` file, specify the new PHP image:

```bash
image:
    tag: spryker/php:8.3
    environment:
```

2. Run the application:

```bash
docker/sdk boot && docker/sdk up --build
```

## 5. Test Your Application

Thoroughly test your application to identify any issues due to the PHP version upgrade.

 - **Automated Tests**: Run unit, integration, and functional tests.
 - **Manual Testing**: Test critical application functionality.
 - **Monitor for Deprecations**: Check for deprecation notices or warnings that may arise from running on PHP 8.3.
