---
title: Upgrade to PHPUnit 11
description: Learn about the main changes in the new PHPUnit version 11
last_updated: Oct 31, 2024
template: howto-guide-template
---

Spryker supports PHPUnit 11, which was released in February 2024.
This support ensures that Spryker applications can leverage the latest testing features and improvements provided by PHPUnit 11.
It's important to ensure that your development environment meets the necessary prerequisites to fully utilize the capabilities of PHPUnit 11 within the Spryker ecosystem.

{% info_block warningBox "Ensure PHP Compatibility" %}

Ensure your PHP version is compatible with PHPUnit 11. PHPUnit 11 requires PHP 8.2 or later.

{% endinfo_block %}

<a name="changes"></a>

## Main changes in PHPUnit 11

PHPUnit 11 introduces several new features and improvements. Here are some of the key changes:

- **PHP 8.2 Compatibility**: PHPUnit 11 requires PHP 8.2, allowing it to leverage the latest language features and improvements. This ensures better performance and compatibility with modern PHP applications.

- **Improved Type Declarations**: The new version includes more expressive and rigorous type declarations. This helps in catching type-related errors early in the development process, leading to more robust and reliable test suites.

- **Enhanced Attributes Support**: PHPUnit 11 supports PHP 8 attributes, which provide a more concise and readable way to annotate test methods and classes. This replaces older docblock annotations, making the code cleaner and easier to maintain.

- **Deprecation of Legacy Features**: Several legacy features and methods have been deprecated in PHPUnit 11. It's important to review your test code for any deprecated functionality and update it accordingly to ensure compatibility with future PHPUnit versions.

- **Improved Test Doubles**: The mocking framework in PHPUnit 11 has been enhanced to provide more powerful and flexible test doubles. This allows for more precise control over mock behavior and verification.

For a detailed list of changes, refer to the [PHPUnit 11 CHANGELOG-11.0](https://github.com/sebastianbergmann/phpunit/blob/11.0.0/ChangeLog-11.0.md).

## Upgrade PHPUnit and Codeception Packages

To ensure compatibility and take advantage of the latest features, you need to upgrade both PHPUnit and related Codeception packages. Follow these steps:

1. Update PHPUnit and Codeception packages using a single `composer update` command:

```bash
composer update "phpunit/phpunit":"11.4.0" "codeception/codeception":"~5.1.2" "codeception/lib-innerbrowser":"^4.0.3" "codeception/module-webdriver":"^4.0.1" --with-dependencies
```

{% info_block warningBox "Resolve Dependency Conflicts" %}

If you encounter issues during the installation, use the following command to identify conflicting dependencies:

```bash
composer why-not phpunit/phpunit:11.4.0
```

This command will provide a list of packages that need to be updated to support PHPUnit 11.

{% endinfo_block %}

2. This command will update PHPUnit to version 11.4.0 and the specified Codeception packages to their respective versions, ensuring all dependencies are resolved.

3. After running the update, review your test suites and configurations to ensure they are compatible with the updated packages.

4. Run your test suites to verify that everything works as expected after the upgrade.

By combining the update commands, you simplify the upgrade process and ensure that all related packages are updated together, minimizing potential conflicts and ensuring compatibility.
