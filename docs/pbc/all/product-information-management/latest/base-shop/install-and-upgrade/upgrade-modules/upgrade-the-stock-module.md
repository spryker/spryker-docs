---
title: Upgrade the Stock module
description: Learn how to upgrade from an older version to a newer one of the Spryker stock module within your Spryker based project.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-stock
originalArticleId: db69c706-8e18-404e-b86c-4f45f642ea17
redirect_from:
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-stock.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-stock.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-stock.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-stock.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-stock.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-stock.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-stock.html
  - /docs/scos/dev/module-migration-guides/migration-guide-stock.html
  - /module_migration_guides/mg-stock.htm
  - /docs/pbc/all/product-information-management/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-stock-module.html
---

## Upgrading from version 7.* to version 8.0.0

In this new version of the `Stock` module, we have added support of decimal stock. You can find more details about the changes on the Stock module release page.

{% info_block errorBox %}

This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/decimal-stock-migration-concept.html).

{% endinfo_block %}

*Estimated migration time: 5 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the `Stock` module to the new version:

```bash
composer require spryker/stock: "^8.0.0" --update-with-dependencies
```

2. Update the database entity schema for each store in the system:

```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
...
```

3. Run the database migration:

```bash
console propel:install
console transfer:generate
```

4. Resolve deprecations:

| DEPRECATED CODE | REPLACEMENT |
| --- | --- |
| `Spryker\Zed\Stock\StockConfig::getStoreToWarehouseMapping()` | Removed without replacement. |


## Upgrading from version 5.* to version 7.0.0

{% info_block infoBox %}
To dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. [Contact us](https://spryker.com/en/support/) if you have any questions.
{% endinfo_block %}
