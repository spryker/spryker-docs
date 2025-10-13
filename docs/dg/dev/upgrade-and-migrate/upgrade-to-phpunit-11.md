---
title: Upgrade to PHPUnit 11
description: Learn about the main changes in the new PHPUnit version 11
last_updated: Oct 31, 2024
template: howto-guide-template
---

PHPUnit 11 was released in February 2024 and Spryker applications can leverage the latest testing features and improvements provided by it.
Your development environment needs to meets the necessary prerequisites to fully use the capabilities of PHPUnit 11.

{% info_block warningBox "Ensure PHP Compatibility" %}

PHPUnit 11 requires PHP 8.2 or later.

{% endinfo_block %}

<a name="changes"></a>

## Main changes in PHPUnit 11

- **PHP 8.2 compatibility**: PHPUnit 11 requires PHP 8.2, allowing it to leverage the latest language features and improvements. This ensures better performance and compatibility with modern PHP applications.

- **Improved type declarations**: The new version includes more expressive and rigorous type declarations. This helps in catching type-related errors early in the development process, leading to more robust and reliable test suites.

- **Enhanced attributes support**: PHPUnit 11 supports PHP 8 attributes, which provide a more concise and readable way to annotate test methods and classes. This replaces older docblock annotations, making the code cleaner and easier to maintain.

- **Deprecation of legacy features**: Several legacy features and methods have been deprecated in PHPUnit 11. It's important to review your test code for any deprecated functionality and update it accordingly to ensure compatibility with future PHPUnit versions.

- **Improved test doubles**: The mocking framework in PHPUnit 11 has been enhanced to provide more powerful and flexible test doubles. This allows for more precise control over mock behavior and verification.

For a detailed list of changes, see [PHPUnit 11 CHANGELOG-11.0](https://github.com/sebastianbergmann/phpunit/blob/11.0.0/ChangeLog-11.0.md).

## Upgrade PHPUnit and Codeception packages

To ensure compatibility and take advantage of the latest features, you need to upgrade both PHPUnit and related Codeception packages. Follow these steps:

1. Update PHPUnit and Codeception packages:

```bash
composer update "phpunit/phpunit":"11.4.0" "codeception/codeception":"~5.1.2" "codeception/lib-innerbrowser":"^4.0.3" "codeception/module-webdriver":"^4.0.1" --with-dependencies
```

This updates PHPUnit to version 11.4.0 and the specified Codeception packages to their respective versions, ensuring all dependencies are resolved.

{% info_block warningBox "Resolve dependency conflicts" %}

If errors are returned during the installation, identify conflicting dependencies:

```bash
composer why-not phpunit/phpunit:11.4.0
```

This command provide a list of packages that need to be updated to support PHPUnit 11.

{% endinfo_block %}


2. Review your test suites and configurations to ensure they're compatible with the updated packages.

3. Run your test suites to verify that everything works as expected.
