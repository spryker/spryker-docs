---
title: Migration Guide - CMS Block Collector
originalLink: https://documentation.spryker.com/v5/docs/mg-cms-block-collector
redirect_from:
  - /v5/docs/mg-cms-block-collector
  - /v5/docs/en/mg-cms-block-collector
---

## Upgrading from Version 1.* to Version 2.*

This version provides support for multi-store CMS Block handling.

1. Update spryker/cms-block-collector module to at least Version 2.0.0.
2. Update spryker/collector module to at least Version 6.0.0. See [Migration Guide - Collector](https://documentation.spryker.com/docs/en/mg-collector).
3. Install/upgrade spryker/cms-block to at least Version 2.0.0. You can find additional guide to migration [Migration Guide - CMS Block](https://documentation.spryker.com/docs/en/mg-cms-block).
4. Additionally these internal classes have changed. Take a look if you have customized them:
* `CmsBlockCollector`
* `CmsBlockCollectorQuery`
You can find more details for these changes on the [CMS Block Collector module release page](https://github.com/spryker/cms-block-collector/releases) and in [Migration Guide - Collector](https://documentation.spryker.com/docs/en/mg-collector).

CMS Block Collector is ready to be used in multi-store environment.
You can find further information about multi-store CMS Blocks here.

<!-- Last review date: Jan 16, 2018-- by Karoly Gerner -->
