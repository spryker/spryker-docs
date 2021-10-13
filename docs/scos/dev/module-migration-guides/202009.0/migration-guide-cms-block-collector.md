---
title: Migration Guide - CMS Block Collector
description: Use the guide to update versions to the newer ones of the CMS Block Collector module.
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/mg-cms-block-collector
originalArticleId: eb0186ff-b948-4129-9dfa-f97517f5a277
redirect_from:
  - /v6/docs/mg-cms-block-collector
  - /v6/docs/en/mg-cms-block-collector
related:
  - title: Migration Guide - CMS Block
    link: docs/scos/dev/module-migration-guides/201811.0/migration-guide-cmsblock.html
  - title: Migration Guide - CMS Block GUI
    link: docs/scos/dev/module-migration-guides/201811.0/migration-guide-cmsblockgui.html
  - title: CMS Block
    link: docs/scos/user/features/201811.0/cms-feature-overview/cms-blocks-overview.html
---

## Upgrading from Version 1.* to Version 2.*

This version provides support for multi-store CMS Block handling.

1. Update spryker/cms-block-collector module to at least Version 2.0.0.
2. Update spryker/collector module to at least Version 6.0.0. See [Migration Guide - Collector](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-collector.html).
3. Install/upgrade spryker/cms-block to at least Version 2.0.0. You can find additional guide to migration [Migration Guide - CMS Block](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-cmsblock.html).
4. Additionally these internal classes have changed. Take a look if you have customized them:
* `CmsBlockCollector`
* `CmsBlockCollectorQuery`
You can find more details for these changes on the [CMS Block Collector module release page](https://github.com/spryker/cms-block-collector/releases) and in [Migration Guide - Collector](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-collector.html).

CMS Block Collector is ready to be used in multi-store environment.
You can find further information about multi-store CMS Blocks here.

<!-- Last review date: Jan 16, 2018-- by Karoly Gerner -->
