---
title: Static Security Checker
description: The static Security Checker allows you to detect vulnerability issues in the composer.lock file
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/static-security-checker
originalArticleId: 7568f516-91a0-4c37-b9d5-d46300035c03
redirect_from:
  - /2021080/docs/static-security-checker
  - /2021080/docs/en/static-security-checker
  - /docs/static-security-checker
  - /docs/en/static-security-checker
  - /v6/docs/static-security-checker
  - /v6/docs/en/static-security-checker
  - /docs/scos/dev/sdk/201811.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/201903.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/201907.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/202001.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/202005.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/202009.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/202108.0/development-tools/static-security-checker.html
---

The Spryker static Security Checker allows you to detect packages with security vulnerabilities. It is based on the [Local PHP Security Checker](https://github.com/fabpot/local-php-security-checker).

## Installation
To install the Security Checker, run

```bash
composer require --dev spryker-sdk/security-checker
```

## Configuration
Having installed the Security Checker, enable it in `ConsoleDependencyProvider`:

```php
class ConsoleDependencyProvider
{
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [];
        ...
        if (class_exists(SecurityCheckerCommand::class)) {
            $commands[] = new SecurityCheckerCommand();
        }
        ...
        return $commands;
    }
}
```

## Usage

Run the following command to check for security issues in the `composer.lock` file:

```bash
vendor/bin/console security:check
```
{% info_block warningBox "False-positive vulnerability CVE-NONE-0001" %}

There is a known false-positive issue CVE-NONE-0001. The issue is not valid, and, therefore, we suspend the notice about it. If you want the details of the suspended notice, run

```bash
vendor/bin/console security:check -v
```

{% endinfo_block %}
