---
title: Composer version 2 compatibility issues
description: Learn how to solve Composer version 2 compatibility issues.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/composer-version-2-compatibility-issues
originalArticleId: b110284a-a19f-4c7b-a8fd-769b3dff6ed2
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/composer-version-2-compatibility-issues.html
---

After running `composer update spryker/{module_name}`, you get an error similar to the following:

```bash
Problem 1
- ocramius/package-versions is locked to version 1.4.2 and an update of this package was not requested.
- ocramius/package-versions 1.4.2 requires composer-plugin-api ^1.0.0 -> found composer-plugin-api[2.0.0] but it does not match the constraint.
Problem 2
- sllh/composer-versions-check is locked to version v2.0.3 and an update of this package was not requested.
- sllh/composer-versions-check v2.0.3 requires composer-plugin-api ^1.0 -> found composer-plugin-api[2.0.0] but it does not match the constraint.
Problem 3
- ocramius/package-versions 1.4.2 requires composer-plugin-api ^1.0.0 -> found composer-plugin-api[2.0.0] but it does not match the constraint.
- jean85/pretty-package-versions 1.2 requires ocramius/package-versions ^1.2.0 -> satisfiable by ocramius/package-versions[1.4.2].
- jean85/pretty-package-versions is locked to version 1.2 and an update of this package was not requested.
ocramius/package-versions only provides support for Composer 2 in 1.8+, which requires PHP 7.4.
If you can not upgrade PHP you can require composer/package-versions-deprecated to resolve this with PHP 7.0+.
```

## Solution

Run the following commands:

```bash
composer self-update --2
composer remove sllh/composer-versions-check --ignore-platform-reqs
composer require spryker-sdk/phpstan-spryker:^0.3 -W --ignore-platform-reqs

git commit && git push
```
