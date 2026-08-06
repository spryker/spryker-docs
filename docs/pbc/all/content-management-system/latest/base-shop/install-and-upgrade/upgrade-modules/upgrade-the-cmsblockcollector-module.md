---
title: Upgrade the CmsBlockCollector module
description: Use the guide to update versions to the newer ones of the CMS Block Collector module.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-cms-block-collector
originalArticleId: 3e039058-48d7-4a5c-bae4-2afa9c5cc0d6
redirect_from:
  - /2021080/docs/mg-cms-block-collector
  - /2021080/docs/en/mg-cms-block-collector
  - /docs/mg-cms-block-collector
  - /docs/en/mg-cms-block-collector
  - /v1/docs/mg-cms-block-collector
  - /v1/docs/en/mg-cms-block-collector
  - /v2/docs/mg-cms-block-collector
  - /v2/docs/en/mg-cms-block-collector
  - /v3/docs/mg-cms-block-collector
  - /v3/docs/en/mg-cms-block-collector
  - /v4/docs/mg-cms-block-collector
  - /v4/docs/en/mg-cms-block-collector
  - /v5/docs/mg-cms-block-collector
  - /v5/docs/en/mg-cms-block-collector
  - /v6/docs/mg-cms-block-collector
  - /v6/docs/en/mg-cms-block-collector
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-cms-block-collector.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-cms-block-collector.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-cms-block-collector.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-cms-block-collector.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-cms-block-collector.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-cms-block-collector.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-cms-block-collector.html
  - /docs/pbc/all/content-management-system/202311.0/install-and-upgrade/upgrade-modules/upgrade-the-cmsblockcollector-module.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblockcollector-module.html
---
## Upgrading from version 1.* to version 2.*

This version provides support for multi-store CMS Block handling.

To upgrade to the new version of the module, do the following:

1. Update `spryker/cms-block-collector` module to at least version 2.0.0.
2. Update `spryker/collector` module to at least version 6.0.0. See [Upgrade the Collector module](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-collector-module.html).
3. Install/upgrade `spryker/cms-block` to at least version 2.0.0. You can find additional guide to migration [Upgrade the CmsBlock module](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblock-module.html).
4. Additionally these internal classes have changed. Take a look if you have customized them:
- `CmsBlockCollector`
- `CmsBlockCollectorQuery`

You can find more details for these changes on the [CMS Block Collector module release page](https://github.com/spryker/cms-block-collector/releases) and in [Upgrade the Collector module](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-collector-module.html).

CMS Block Collector is ready to be used in multi-store environment.
You can find further information about multi-store CMS Blocks here.
