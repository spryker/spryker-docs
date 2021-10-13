---
title: Migration Guide - ProductPackagingUnitStorage
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/mg-product-packaging-unit-storage
originalArticleId: bc56180a-3072-435a-ab75-b7767f698782
redirect_from:
  - /v3/docs/mg-product-packaging-unit-storage
  - /v3/docs/en/mg-product-packaging-unit-storage
---

## Upgrading from Version 2.* to Version 4.0.0
{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.
{% endinfo_block %}

## Upgrading from Version 1.* to 2.*

The only one major change of `ProductPackagingUnitStorage` 2.x.x is adding dependency to `spryker/product-measurement-unit-storage:^1.0.0` which requires DB changes.
To perform the migration, follow the steps:
1. Install `spryker/product-measurement-unit-storage:^1.0.0`
2. Run database migration:
`vendor/bin/console propel:install`
3. Generate transfers:
`vendor/bin/console transfer:generate`

_Estimated migration time: ~1h._

<!-- Last review date: Mar 13, 2019 by Stanislav Matveyev, Oksana Karasyova -->
