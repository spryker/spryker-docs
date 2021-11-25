---
title: Migration guide - ProductPackagingUnitWidget
description: Use the guide to migrate to a new version of the
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-packaging-unit-widget
originalArticleId: c8ccd097-331d-462d-bae3-aca3c8541817
redirect_from:
  - /2021080/docs/mg-product-packaging-unit-widget
  - /2021080/docs/en/mg-product-packaging-unit-widget
  - /docs/mg-product-packaging-unit-widget
  - /docs/en/mg-product-packaging-unit-widget
  - /v1/docs/mg-product-packaging-unit-widget
  - /v1/docs/en/mg-product-packaging-unit-widget
  - /v2/docs/mg-product-packaging-unit-widget
  - /v2/docs/en/mg-product-packaging-unit-widget
  - /v3/docs/mg-product-packaging-unit-widget
  - /v3/docs/en/mg-product-packaging-unit-widget
  - /v4/docs/mg-product-packaging-unit-widget
  - /v4/docs/en/mg-product-packaging-unit-widget
  - /v5/docs/mg-product-packaging-unit-widget
  - /v5/docs/en/mg-product-packaging-unit-widget
  - /v6/docs/mg-product-packaging-unit-widget
  - /v6/docs/en/mg-product-packaging-unit-widget
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-productpackagingunitwidget.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-productpackagingunitwidget.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-productpackagingunitwidget.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productpackagingunitwidget.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productpackagingunitwidget.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productpackagingunitwidget.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productpackagingunitwidget.html
---

## Upgrading from Version 0.4.* to Version 0.5.0

In this new version of the **ProductPackagingUnitWidget** module, we have added support of decimal stock. You can find more details about the changes on the [ProductPackagingUnitWidget module](https://github.com/spryker-shop/product-packaging-unit-widget/releases) release page.

{% info_block errorBox %}

This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/scos/dev/migration-concepts/decimal-stock-migration-concept.html).

{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**

1. Upgrade the **ProductPackagingUnitWidget** module to the new version:

```bash
composer require spryker-shop/product-packaging-unit-widget: "^0.5.0" --update-with-dependencies
```
2. Run the transfer object generation:

```bash
console propel:install
console transfer:generate
```

*Estimated migration time: 5 min*

## Upgrading from Version 0.2.* to Version 0.4.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}
