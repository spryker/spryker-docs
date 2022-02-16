---
title: Migration guide - DiscountPromotion
description: Use the guide to migrate to a new version of the DiscountPromotion module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-discount-promotion
originalArticleId: f2b67c9c-08ac-44d6-a070-542221eec789
redirect_from:
  - /2021080/docs/mg-discount-promotion
  - /2021080/docs/en/mg-discount-promotion
  - /docs/mg-discount-promotion
  - /docs/en/mg-discount-promotion
  - /v1/docs/mg-discount-promotion
  - /v1/docs/en/mg-discount-promotion
  - /v2/docs/mg-discount-promotion
  - /v2/docs/en/mg-discount-promotion
  - /v3/docs/mg-discount-promotion
  - /v3/docs/en/mg-discount-promotion
  - /v4/docs/mg-discount-promotion
  - /v4/docs/en/mg-discount-promotion
  - /v5/docs/mg-discount-promotion
  - /v5/docs/en/mg-discount-promotion
  - /v6/docs/mg-discount-promotion
  - /v6/docs/en/mg-discount-promotion
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-discountpromotion.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-discountpromotion.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-discountpromotion.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-discountpromotion.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-discountpromotion.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-discountpromotion.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-discountpromotion.html
---

## Upgrading from Version 3.* to Version 4.0.0

In this new version of the **DiscountPromotion** module, we have added support of decimal stock. You can find more details about the changes on the [DiscountPromotion module](https://github.com/spryker/discount-promotion/releases) release page.

{% info_block errorBox %}

This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/scos/dev/migration-concepts/decimal-stock-migration-concept.html).

{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**

1. Upgrade the **DiscountPromotion** module to the new version:

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

*Estimated migration time: 5 min*

## Upgrading from Version 1.* to Version 3.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}
