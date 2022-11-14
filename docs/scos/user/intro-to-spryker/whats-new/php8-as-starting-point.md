---
title: Spryker now requires PHP 8.0 as the minimum version for all projects
description: In the coming weeks, Spryker will release a new version of its demo shops requiring PHP 8.0 as the minimum version - support for the PHP 7.4 version will be stopped. Spryker's new module releases will only be compatible with PHP 8.0 version or superior.
last_updated: November 14, 2022
template: concept-topic-template
---

In the coming weeks, Spryker will release a new version of its demo shops requiring PHP 8.0 as the minimum version - support for the PHP 7.4 version will be stopped. Spryker's new module releases will only be compatible with PHP 8.0 version or superior.

## Impacts

We broke no backward compatibility. If your project followed our advice and requirements in the past twelve months, you will experience no upgradeability issues.

## Migration steps

### Step 1

Update your modules manually in `composer.json`.
Please use major lock `^` or minor lock `~` if you have changes on the project level or not.

```php
spryker/cms-block-gui => 2.8.0
codeception/codeception => 4.1.24
codeception/lib-innerbrowser => 1.3.3
codeception/module-phpbrowser => 1.0.1
psalm/phar => 4.3.1
roave/better-reflection => 5.0.0
spryker-sdk/benchmark => 0.2.2
spryker-sdk/spryk => 0.3.4
spryker-sdk/spryk-gui => 0.2.2
```

### Step 2

Change the PHP version in the `composer.json`

`config.platform.php => 8.0`

### Step 3

Remove the following repositories from your `composer.json`
Please make sure that there are no project-specific changes there.

```json
"repositories": [
  {
    "type": "vcs",
    "url": "https://github.com/spryker-sdk/lib-innerbrowser.git"
  }
],
```

### Step 4

Execute the following command.

`composer update roave/better-reflection spryker-sdk/spryk
spryker-sdk/spryk-gui spryker/cms-block-gui spryker-sdk/benchmark
codeception/lib-innerbrowser codeception/module-phpbrowser psalm/phar
spryker-sdk/benchmark phpbench/phpbench jetbrains/phpstorm-stubs psalm/phar
phpbench/dom`

### Step 5

Run your E2E (End To End) tests and make sure that the changes have not impacted your business functionalities.
