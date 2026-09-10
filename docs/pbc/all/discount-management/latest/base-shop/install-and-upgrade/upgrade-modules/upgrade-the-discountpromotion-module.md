---
title: Upgrade the DiscountPromotion module
description: Use the guide to migrate to a new version of the DiscountPromotion module.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-discount-promotion
originalArticleId: f2b67c9c-08ac-44d6-a070-542221eec789
redirect_from:
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-discountpromotion.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-discountpromotion.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-discountpromotion.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-discountpromotion.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-discountpromotion.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-discountpromotion.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-discountpromotion.html
  - /module_migration_guides/mg-discount-promotion.htm
  - /docs/scos/dev/module-migration-guides/202311.0/migration-guide-discountpromotion.html  
  - /docs/pbc/all/discount-management/202311.0/install-and-upgrade/upgrade-the-discountpromotion-module.html  
  - /docs/pbc/all/discount-management/202311.0/base-shop/install-and-upgrade/upgrade-the-discountpromotion-module.html
  - /docs/pbc/all/discount-management/202204.0/base-shop/install-and-upgrade/upgrade-the-discountpromotion-module.html
---


## Upgrading from version 3.* to version 4.0.0

In this new version of the `DiscountPromotion` module, we have added support of decimal stock. You can find more details about the changes on the [DiscountPromotion module](https://github.com/spryker/discount-promotion/releases) release page.

{% info_block errorBox %}

This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/decimal-stock-migration-concept.html).

{% endinfo_block %}

*Estimated migration time: 5 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the `DiscountPromotion` module to the new version:

```bash
composer require spryker/discount-promotion: "^4.0.0" --update-with-dependencies
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

## Upgrading from version 1.* to version 3.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. [Contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}
