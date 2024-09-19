---
title: Upgrade to PHP 8.2
description: End of September 2024, Spryker will release a new version of its Demo Shops requiring PHP 8.2 as the minimum version.
last_updated: September 22, 2024
template: concept-topic-template
redirect_from:
- /docs/scos/user/intro-to-spryker/whats-new/php8-as-a-minimum-version-for-all-spryker-projects.html

---

PHP 8.2 is the minimum supported version for Demo Shops.

To upgrade PHP to 8.2, follow the steps:

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

`config.platform.php => 8.2.0`

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
