---
title: Security release notes 202302.0
description: Security release notes for the Spryker Product release 202302.0
last_updated: Mar 21, 2023
template: concept-topic-template
redirect_from:
- /docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202302.0/security-release-notes-202302.0.html
- /docs/about/all/releases/security-release-notes-202302.0.html
---

This document describes the security-related issues we have recently resolved. All issues are listed by description and affected modules.

If you need any additional support with this content, [contact our support](mailto:support@spryker.com). If you found a new security vulnerability, inform us through [security@spryker.com](mailto:security@spryker.com).

## SQL injection in OrderSearchForm (order history)

The Spryker-based application in scope offers an order history with a list of orders that have been placed in the past. During the security assessment, a server-side error was detected while testing order history with the search function. Also, SQL injection in the OrderSearchForm vulnerability in the Spryker applications was discovered. SQL injection vulnerabilities occur when attacker-controlled data is embedded unchecked in SQL queries. Such vulnerabilities let attackers bypass restrictions in the application logic and issue manipulated queries to the database server. Depending on various factors, such as the database management system used or database user permissions, it may be possible to read, modify and delete data and compromise the database or application server.

### Affected modules

spryker/sales: 11.16.0-11.36.1

spryker-feature/order-management: 202009.0-202212.0

### Introduced changes

To separate user input from the query, `OrderSearchQueryJoinQueryBuilder::addSalesOrderQueryFilters()` was adjusted. These changes impacted `SalesFacade::searchOrders()`.

### How to get the fix

To implement a fix for this vulnerability, update the sales module.

{% info_block infoBox "Recommended upgrade is 11.36.2" %}

Spryker recommends upgrading to 11.36.2 because it's the continuous latest stable version. However, because of the increased migration effort caused by 11.31.0 (Propel timestamp type fix), 11.33.0 (PHP8.0), and 11.36.0 (Symfony 6), you might need to consider upgrading to the nearest possible patch (see the following details).

{% endinfo_block %}

- If your version of `spryker/sales` is earlier than 11.16.0, follow [Upgrade module versions earlier than 11.16.0](#upgrade-sprykersales-module-versions-earlier-than-11160).
- If your version of `spryker/sales` is 1.16.0 up to and including 11.30.1, follow [Upgrade `spryker/sales` module versions including 11.16.0 up to and including 11.30.1](#upgrade-sprykersales-module-versions-including-11160-up-to-and-including-11301).
- If your version of `spryker/sales` is 11.31.0 up to and including 11.33.1, follow [Upgrade `spryker/sales` module versions including 11.31.0 up to and including 11.33.*x*](#upgrade-sprykersales-module-versions-including-11310-up-to-and-including-1133x).
- If your version of `spryker/sales` is 11.34.0 up to and including 11.35.1, follow [Upgrade `spryker/sales` module versions including 11.34.0 up to and including 11.35.*x*](#upgrade-sprykersales-module-versions-including-11340-up-to-and-including-1135x).
- If your current version of `spryker/sales` is 11.36.0 or 11.36.1 follow [Upgrade on `spryker/sales` module versions 11.36.0 or later](#upgrade-on-sprykersales-module-versions-11360-or-later).
- Optional upgrades:
  - If you considering switching from version 11.30 or earlier to 11.31 or later of the sales module, follow our guidelines in the [Optional: Propel migration: Upgrade spryker/sales modules with versions 11.30.x or earlier to 11.31.2](#optional-propel-migration-upgrade-sprykersales-modules-with-versions-1130x-or-earlier-to-11312) section.
  - If you are considering switching to PHP 8.0, follow our guidelines in the [Optional: PHP8 migration: Upgrade spryker/sales module with versions including 11.31.x up to and including 11.33.x to 11.34.1](#optional-php8-migration-upgrade-sprykersales-module-with-versions-including-1131x-up-to-and-including-1133x-to-11341) section.
  - If you are considering switching to Symfony 6, follow our guidelines in the [Optional: Symfony migration: Upgrade spryker/sales module with versions including 11.34.x up to and including 11.36.x to 11.36.2](#optional-symfony-migration-upgrade-sprykersales-module-with-versions-including-1134x-up-to-and-including-1136x-to-11362) section.

### Upgrade spryker/sales module versions earlier than 11.16.0

The security issue *is not* affecting your version.

When upgrading your `spryker/sales` module next time, consider selecting your next version according to the following guidelines.

### Upgrade spryker/sales module versions including 11.16.0 up to and including 11.30.1

Complexity level: Low

Update the `spryker/sales` module to the security fix released on 11.30.2 and verify the version:

```bash
composer require spryker/sales:"~11.30.2"
composer show spryker/sales # Verify the version
```

When upgrading your `spryker/sales` module next time, consider selecting your next version according to the following guidelines.

### Upgrade spryker/sales module versions, including 11.31.0 up to and including 11.33.x

Complexity level: Low

Update the `spryker/sales` module to the latest patch release of your minor and verify the version:

```bash
composer require spryker/sales:"~11.<your-minor>.<your-patch>"
composer show spryker/sales # Verify the version
```

When upgrading your `spryker/sales` module next time, consider selecting your next version according to the following guidelines.

### Upgrade spryker/sales module versions, including 11.34.0 up to and including 11.35.x

Complexity level: Low

Update the `spryker/sales` module to the latest patch release of your minor and verify the version:

```bash
composer require spryker/sales:"~11.<your-minor>.<your-patch>"
composer show spryker/sales # Verify the version
```

When upgrading your `spryker/sales` module next time, consider selecting your next version according to the following guidelines.

### Upgrade on spryker/sales module versions 11.36.0 or later

Complexity level: Low

Update the `spryker/sales` module to the latest patch release of your minor and verify the version:

```bash
composer require spryker/sales:"~11.36.2"
composer show spryker/sales # Verify the version
```

### Optional: Propel migration: Upgrade spryker/sales modules with versions 11.30.x or earlier to 11.31.2

Complexity level: Low to medium

{% info_block infoBox "Info" %}

This involves additional migration effort because of a required upgrade of the Propel library.

{% endinfo_block %}

1. Update the `spryker/sales` version and verify the version.

```bash
composer require spryker/sales:"~11.31.2"
composer show spryker/sales # Verify the version
```

2. Remove the `data/cache/propel/generated-conf/loadDatabase.php` file *manually* and regenerate the propel entities and query object:

```bash
rm data/cache/propel/generated-conf/loadDatabase.php
ls data/cache/propel/generated-conf # Verify it was removed.
vendor/bin/console propel:model:build
ls data/cache/propel/generated-conf # Verify the file was created.
```

{% info_block warningBox "Attention" %}

The following points are the potential BC breaking points from the Propel upgrade in 11.31.0:
- Ensure any project code extending the Propel repository is updated (especially the method signatures).
- Note that most Propel methods have parameter and return types added. In case a project extension was not updated, you might encounter errors like this: `Fatal error: Declaration of ExtendedThing::process(array $items): array must be compatible with Thing::process(stdClass $item): array in ... on line ....`
- The `TIMESTAMP` column type in schema files for the MySQL database now generates a column with the actual `TIMESTAMP` type instead of `DATETIME` as it was previously. Propel diff considers it as a table structure change and generates migration. Create a migration for the difference and apply it:

```bash
vendor/bin/console console propel:migrate
```

- Timestamps are only valid until the year 2037 (32bit). Verify with your business owners the impact on each business entity that was using the `TIMESTAMP` type (applicable also to data builders, fixtures, data importers, or middleware importers).

{% endinfo_block %}

For a full list of changes in Propel, see [Blog: Propel2 Beta 2 Release](https://propelorm.org/blog/2022/07/04/propel2-beta2-release.html) in the official release notes.

### Optional: PHP8 migration: Upgrade spryker/sales module with versions including 11.31.x up to and including 11.33.x to 11.34.1

Complexity level: Low, if PHP 8 is already installed; otherwise, medium.

{% info_block infoBox %}

This involves additional migration effort because of a required upgrade to PHP 8. You must upgrade your PHP version to at least 8, but 8.1 is highly recommended.

{% endinfo_block %}

To upgrade to PHP 8.0, see [Supported versions of PHP](/docs/dg/dev/supported-versions-of-php.html).

Ensure that you have the security fix applied to the PHP8 version.

Update the `spryker/sales` version and verify the version:

```bash
composer require spryker/sales:"~11.34.1"
composer show spryker/sales # Verify the version
```

### Optional: Symfony migration: Upgrade spryker/sales module with versions including 11.34.x up to and including 11.36.x to 11.36.2

Complexity level: Medium

{% info_block infoBox %}

This involves additional migration effort because of a required upgrade to Symfony 6.

{% endinfo_block %}

To upgrade to Symfony 6, see [Integrating Symfony 6](/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-6.html).

{% info_block warningBox "Verification" %}

Ensure that you have the security fix applied on the Symfony 6 version.

{% endinfo_block %}

Update the `spryker/sales` version and verify the version:

```bash
composer require spryker/sales:"~11.36.2"
composer show spryker/sales # Verify the version
```
