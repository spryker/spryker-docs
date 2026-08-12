---
title: Security release notes 202608.0
description: Security updates released for version 202608.0
last_updated: Aug 6, 2026
template: concept-topic-template
publish_date: "2026-08-06"
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Removal of eval() function

Use of the eval() function has been removed from the codebase. Even though no security issues were identified due to its use, it was removed in order to follow security best practices.

### Affected modules

- `spryker/testify`: < 3.66.0

### Fix the vulnerability

Update the affected Spryker package:

```bash
composer update spryker/testify:"^3.66.0"
composer show spryker/testify # Verify the version
```

Add or adjust the $config[TestifyConstants::IS_DATA_BUILDER_RULE_EVAL_ENABLED] line within the `config/Shared/config_default.php` file:

```bash
use Spryker\Shared\Testify\TestifyConstants;

if (class_exists(TestifyConstants::class)) {
    $config[TestifyConstants::IS_DATA_BUILDER_RULE_EVAL_ENABLED] = false;
}
```

## Vulnerabilities in third-party dependencies

Several third-party dependencies were updated to address publicly known vulnerabilities present in earlier versions. The updated dependencies are listed below.

### Affected packages

- `symfony/twig-bridge`: < 6.4.43
- `nikic/php-parser` : < 5.8.0
- `aws/aws-sdk-php` : < 3.389.3
- `symfony/security-core` : < 6.4.43

### Fix the vulnerability

```bash
composer update symfony/twig-bridge nikic/php-parser aws/aws-sdk-php symfony/security-core
```
