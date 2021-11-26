---
title: Migration Guide - CmsBlockCollector
description: Use the guide to update versions to the newer ones of the CMS Block Collector module.
last_updated: Jun 16, 2021
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
related:
  - title: Migration Guide - CMS Block
    link: docs/scos/dev/module-migration-guides/migration-guide-cmsblock.html
  - title: Migration Guide - CMS Block GUI
    link: docs/scos/dev/module-migration-guides/migration-guide-cmsblockgui.html
  - title: CMS Block
    link: docs/scos/user/features/page.version/cms-feature-overview/cms-blocks-overview.html
---

## Upgrading from Version 1.* to Version 2.*

This version provides support for multi-store CMS Block handling.

1. Update spryker/cms-block-collector module to at least Version 2.0.0.
2. Update spryker/collector module to at least Version 6.0.0. See [Migration Guide - Collector](/docs/scos/dev/module-migration-guides/migration-guide-collector.html).
3. Install/upgrade spryker/cms-block to at least Version 2.0.0. You can find additional guide to migration [Migration Guide - CMS Block](/docs/scos/dev/module-migration-guides/migration-guide-cmsblock.html).
4. Additionally these internal classes have changed. Take a look if you have customized them:
* `CmsBlockCollector`
* `CmsBlockCollectorQuery`
You can find more details for these changes on the [CMS Block Collector module release page](https://github.com/spryker/cms-block-collector/releases) and in [Migration Guide - Collector](/docs/scos/dev/module-migration-guides/migration-guide-collector.html).

CMS Block Collector is ready to be used in multi-store environment.
You can find further information about multi-store CMS Blocks here.

<!-- Last review date: Jan 16, 2018-- by Karoly Gerner -->
