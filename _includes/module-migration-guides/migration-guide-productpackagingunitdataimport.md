---
title: Migration guide - ProductPackagingUnitDataImport
description: Use the guide to migrate to a new version of the ProductPackagingUnitDataImport module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-packaging-unit-data-import
originalArticleId: 73392c2e-2e31-4eb2-9b72-9e464ebb5af0
redirect_from:
  - /2021080/docs/mg-product-packaging-unit-data-import
  - /2021080/docs/en/mg-product-packaging-unit-data-import
  - /docs/mg-product-packaging-unit-data-import
  - /docs/en/mg-product-packaging-unit-data-import
  - /v4/docs/mg-product-packaging-unit-data-import
  - /v4/docs/en/mg-product-packaging-unit-data-import
  - /v5/docs/mg-product-packaging-unit-data-import
  - /v5/docs/en/mg-product-packaging-unit-data-import
  - /v6/docs/mg-product-packaging-unit-data-import
  - /v6/docs/en/mg-product-packaging-unit-data-import
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productpackagingunitdataimport.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productpackagingunitdataimport.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productpackagingunitdataimport.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productpackagingunitdataimport.html
---

## Upgrading from Version 1.* to Version 2.0.0

In this new version of the **ProductPackagingUnitDataImport** module, we have added support of decimal stock. You can find more details about the changes on the [ProductPackagingUnitDataImport module](https://github.com/spryker/product-packaging-unit-data-import/releases) release page.

{% info_block errorBox %}

This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/scos/dev/migration-concepts/decimal-stock-migration-concept.html).

{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**
1. Upgrade the **ProductPackagingUnitDataImport** module to the new version:

```bash
composer require spryker/product-packaging-unit-data-import: "^2.0.0" --update-with-dependencies
```
2. Update the database entity schema for **each store** in the system:

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

*Estimated migration time: 5 min*
