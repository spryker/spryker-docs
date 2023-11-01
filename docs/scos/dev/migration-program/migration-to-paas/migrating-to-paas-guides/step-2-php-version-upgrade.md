---
title: 'Step 2: PHP Version Upgrade'
description: 
template: howto-guide-template
---

## Check project code for the sake of PHP 8.0 compatibility using PHPCompatibility

1. Require the `php-compatibility` package:

```bash
composer require --dev phpcompatibility/php-compatibility --ignore-platform-reqs
```

2. Tune phpcs settings to allow `php-compatibility` rules:
```bash
vendor/bin/phpcs --config-set installed_paths vendor/phpcompatibility/php-compatibility
```

3. Execute the `php-compatibility` sniffer:

```bash
vendor/bin/phpcs -p src/ --standard=PHPCompatibility  --runtime-set testVersion 8.0
```
    This returns the code that's not compatible with PHP 8.0.
4. Fix all discovered incompatibilities.

## Check composer dependencies for PHP 8.0 compatibility

1. Run composer why not to discover all incompatible composer packages with required PHP version.
```bash
composer why-not php 8.0
```
2. Update packages to make composer dependencies compatible with php 8.0

3. Update platform requirements
```bash
  "config": {
    "preferred-install": "dist",
    "platform": {
      "php": "8.0"
    },
```

## Change docker image to php 8.0
In every deploy yaml file it's necessary to switch to new php version as well.
```bash
image:
    tag: spryker/php:8.0
    environment:
```
