---
title: Migration Guide - ProductMeasurementUnit
description: Use the guide to migrate to a new version of the ProductMeasurementUnit module.
originalLink: https://documentation.spryker.com/v5/docs/mg-product-measurement-unit
originalArticleId: 2904218a-98e5-42f4-aa51-c5fc9098a013
redirect_from:
  - /v5/docs/mg-product-measurement-unit
  - /v5/docs/en/mg-product-measurement-unit
---

## Upgrading from Version 4.* to Version 5.0.0

In this new version of the **ProductMeasurementUnit** module, we have added support of decimal stock. You can find more details about the changes on the [ProductMeasurementUnit module](https://github.com/spryker/product-measurement-unit/releases) release page.

{% info_block errorBox %}
This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/scos/dev/migration-concepts/decimal-stock-migration-concept.html
{% endinfo_block %}.)

**To upgrade to the new version of the module, do the following:**
1. Upgrade the **ProductMeasurementUnit** module to the new version:

```bash
composer require spryker/product-measurement-unit: "^5.0.0" --update-with-dependencies
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

## Upgrading from Version 2.* to Version 4.0.0
{% info_block infoBox %}
To dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions.)
