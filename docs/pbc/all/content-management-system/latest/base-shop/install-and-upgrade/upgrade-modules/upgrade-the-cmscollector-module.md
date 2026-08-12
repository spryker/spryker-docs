---
title: Upgrade the CmsCollector module
description: Use the guide to update versions to the newer ones of the CMS Collector module.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-cms-collector
originalArticleId: 689695b4-3029-404c-b75d-bff5f6661fa0
redirect_from:
  - /2021080/docs/mg-cms-collector
  - /2021080/docs/en/mg-cms-collector
  - /docs/mg-cms-collector
  - /docs/en/mg-cms-collector
  - /v1/docs/mg-cms-collector
  - /v1/docs/en/mg-cms-collector
  - /v2/docs/mg-cms-collector
  - /v2/docs/en/mg-cms-collector
  - /v3/docs/mg-cms-collector
  - /v3/docs/en/mg-cms-collector
  - /v4/docs/mg-cms-collector
  - /v4/docs/en/mg-cms-collector
  - /v5/docs/mg-cms-collector
  - /v5/docs/en/mg-cms-collector
  - /v6/docs/mg-cms-collector
  - /v6/docs/en/mg-cms-collector
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-cmscollector.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-cmscollector.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-cmscollector.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-cmscollector.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-cmscollector.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-cmscollector.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-cmscollector.html
  - /docs/pbc/all/content-management-system/202311.0/install-and-upgrade/upgrade-modules/upgrade-the-cmscollector-module.html
   /docs/pbc/all/content-management-system/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblockcollector-module.html
related:
  - title: Upgrade the CMS Block
    link: docs/pbc/all/content-management-system/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblock-module.html
---
## Upgrading from version 1.* to version 2.*

Upgrade the `spryker/cms` module to at least 6.2 version. See [Upgrade the CMS module](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cms-module.html) for more details.
Upgrade the `spryker/cms-content-widget` module to at least 1.1 version if you use `CmsPageCollectorParameterMapExpanderPlugin` plugin.
CMS page data expander plugins are applied by the `spryker/cms` module instead of the `spryker/cms-collector` module:

- Amend your custom CMS page collector data expander plugins to use `CmsPageDataExpanderPluginInterface` plugin interface instead of the deprecated `CmsPageCollectorDataExpanderPluginInterface` plugin interface.
- If you use `CmsPageCollectorParameterMapExpanderPlugin` plugin, replace it with `CmsPageParameterMapExpanderPlugin` plugin.
- Register your CMS page data expander plugins to `spryker/cms` module in the `CmsDependencyProvider` dependency provider.

**Example of CMS data expander plugin registration**

```php
<?php
namespace Pyz\Zed\Cms;

use Spryker\Zed\Cms\CmsDependencyProvider as SprykerCmsDependencyProvider;
use Spryker\Zed\CmsContentWidget\Communication\Plugin\CmsPageDataExpander\CmsPageParameterMapExpanderPlugin;

class CmsDependencyProvider extends SprykerCmsDependencyProvider
{
    /**
     * @return \Spryker\Zed\Cms\Dependency\Plugin\CmsPageDataExpanderPluginInterface[]
     */
    protected function getCmsPageDataExpanderPlugins()
    {
        return [
            new CmsPageParameterMapExpanderPlugin(),
        ];
    }
}
```

- Remove deprecated CMS page collector data expander plugin registrations from `spryker/cms-collector` module's dependency provider in `CmsCollectorDependencyProvider`.
