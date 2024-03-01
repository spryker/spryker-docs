  - /docs/scos/user/intro-to-spryker/whats-new/php8-as-a-minimum-version-for-all-spryker-projects.html
---
title: PHP 8.1 as the minimum version for all Spryker projects
description: End of November 2022, Spryker will release a new version of its Demo Shops requiring PHP 8.1 as the minimum version.
last_updated: November 22, 2022
template: concept-topic-template
redirect_from:
---


End of November 2022, Spryker will release a new version of its Demo Shops, which will require PHP 8.1 as their minimum PHP version. PHP 8.0 will no longer be supported. Spryker's new module releases will only be compatible with PHP version 8.1 or later. See [Supported versions of PHP](/docs/scos/user/intro-to-spryker/whats-new/supported-versions-of-php.html) for details about the supported PHP versions.

## Impacts

Backwards compatibility remains unaffected. If your project followed our recommendations and requirements in the past twelve months, you will not experience any upgradability issues.

## Migration steps

To migrate your project to the 8.1 version of PHP, follow these steps:

1. Update your modules manually in `composer.json`.
Use the major lock `^` or the minor lock `~` if you have changes on the project level for respective module constraints.

```php
spryker/cms-block-gui => 2.8.0
codeception/codeception => 4.1.24
codeception/lib-innerbrowser => 1.3.4
codeception/module-phpbrowser => 1.0.2
psalm/phar => 4.3.1
roave/better-reflection => 5.0.0
spryker-sdk/benchmark => 0.2.2
spryker-sdk/spryk => 0.3.4
spryker-sdk/spryk-gui => 0.2.2
```

2. Change the PHP version in `composer.json`:

`config.platform.php => 8.1.0`

3. Make sure there are no project-specific changes in the following repositories, and remove them from your `composer.json`:

```json
"repositories": [
  {
    "type": "vcs",
    "url": "https://github.com/spryker-sdk/lib-innerbrowser.git"
  }
],
```

{% info_block infoBox "Project-specific changes" %}

If you have project-specific changes in these repositories, consider either giving up the changes or copying them into the project code.

{% endinfo_block %}

4. Execute the following command:

```bash
composer update roave/better-reflection spryker-sdk/spryk
spryker-sdk/spryk-gui spryker/cms-block-gui spryker-sdk/benchmark
codeception/lib-innerbrowser codeception/module-phpbrowser psalm/phar
spryker-sdk/benchmark phpbench/phpbench jetbrains/phpstorm-stubs psalm/phar
phpbench/dom
```

5. Run your end-to-end tests and make sure that the changes have not impacted your business functionalities.
