---
title: Static Security Checker
description: The static Security Checker allows you to detect vulnerability issues in the composer.lock file
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/static-security-checker
originalArticleId: 7568f516-91a0-4c37-b9d5-d46300035c03
redirect_from:
  - /docs/sdk/dev/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/201811.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/201903.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/201907.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/202001.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/202005.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/202009.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/202108.0/development-tools/static-security-checker.html
  - /docs/scos/dev/sdk/development-tools/static-security-checker.html
related:
  - title: Architecture sniffer
    link: docs/scos/dev/sdk/development-tools/architecture-sniffer.html
  - title: Code sniffer
    link: docs/scos/dev/sdk/development-tools/code-sniffer.html
  - title: Formatter
    link: docs/scos/dev/sdk/development-tools/formatter.html
  - title: Performance audit tool- Benchmark
    link: docs/scos/dev/sdk/development-tools/performance-audit-tool-benchmark.html
  - title: PHPStan
    link: docs/dg/dev/sdks/sdk/development-tools/phpstan.html
  - title: SCSS linter
    link: docs/scos/dev/sdk/development-tools/scss-linter.html
  - title: TS linter
    link: docs/scos/dev/sdk/development-tools/ts-linter.html
  - title: Spryk code generator
    link: docs/scos/dev/sdk/development-tools/spryk-code-generator.html
  - title: Tooling config file
    link: docs/scos/dev/sdk/development-tools/tooling-config-file.html
---

The Spryker static Security Checker allows you to detect packages with security vulnerabilities. It is based on the [Local PHP Security Checker](https://github.com/fabpot/local-php-security-checker).

## Installation

To install the Security Checker, run:

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

There is a known false-positive issue CVE-NONE-0001. This issue is not valid. We have suspended the notice about it. If you want the details of the suspended notice, run

```bash
vendor/bin/console security:check -v
```

{% endinfo_block %}
