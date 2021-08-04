---
title: Static Security Checker
originalLink: https://documentation.spryker.com/v6/docs/static-security-checker
redirect_from:
  - /v6/docs/static-security-checker
  - /v6/docs/en/static-security-checker
---

The Spryker static Security Checker allows you to detect packages with security vulnerabilities. It is based on the [Local PHP Security Checker](https://github.com/fabpot/local-php-security-checker).

## Installation
To install the Security Checker, run

```Bash
composer require --dev spryker-sdk/security-checker
```

## Configuration
Having installed the Security Checker, enable it in `ConsoleDependencyProvider`:

```PHP
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

```Bash
vendor/bin/console security:check 
```
{% info_block warningBox "False-positive vulnerability CVE-NONE-0001" %}

There is a known false-positive issue CVE-NONE-0001. The issue is not valid, and, therefore, we suspend the notice about it. If you want the details of the suspended notice, run 

```Bash
vendor/bin/console security:check -v
```

{% endinfo_block %}
