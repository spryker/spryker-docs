---
title: CMS extension points- reference information
description: The CMS module provides an extension point for post activation and deactivation of CMS pages.
last_updated: Aug 27, 2020
template: feature-walkthrough-template
originalLink: https://documentation.spryker.com/v6/docs/reference-information-cms-extension-points
originalArticleId: 8be2a709-8929-4079-924e-4d56e2e8dda3
redirect_from:
  - /v6/docs/reference-information-cms-extension-points
  - /v6/docs/en/reference-information-cms-extension-points
related:
  - title: CMS Page
    link: docs/scos/user/features/page.version/cms-feature-overview/cms-pages-overview.html
  - title: Migration Guide - CMS
    link: docs/scos/dev/module-migration-guides/migration-guide-cms.html
  - title: Migration Guide - CmsCollector
    link: docs/scos/dev/module-migration-guides/migration-guide-cmscollector.html
---

The CMS module provides an extension point for post activation and deactivation of CMS pages. The plugin interface set for this extension point is as follows:

```php
<?php

namespace Spryker\Zed\Cms\Communication\Plugin;

use Generated\Shared\Transfer\CmsPageTransfer;

interface PostCmsPageActivatorPluginInterface
{
    /**
     * Specification:
     * - Runs after the CMS activator class functions (activate and deactivate)
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\CmsPageTransfer $cmsPageTransfer
     *
     * @return void
     */
    public function execute(CmsPageTransfer $cmsPageTransfer);
}
```

For example, Navigation is connected with activation and deactivation of CMS pages, so there is a plugin in the `CmsNavigationConnector` module that is called `PostCmsPageActivatorNavigationPlugin`.

It implements the interface as follows:

```php
<?php

namespace Spryker\Zed\CmsNavigationConnector\Communication\Plugin;

use Generated\Shared\Transfer\CmsPageTransfer;
use Spryker\Zed\Cms\Communication\Plugin\PostCmsPageActivatorPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Spryker\Zed\CmsNavigationConnector\Business\CmsNavigationConnectorFacadeInterface getFacade()
 * @method \Spryker\Zed\CmsNavigationConnector\Communication\CmsNavigationConnectorCommunicationFactory getFactory()
 */
class PostCmsPageActivatorNavigationPlugin extends AbstractPlugin implements PostCmsPageActivatorPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CmsPageTransfer $cmsPageTransfer
     *
     * @return void
     */
    public function execute(CmsPageTransfer $cmsPageTransfer)
    {
        $this->getFacade()->updateCmsPageNavigationNodesIsActive($cmsPageTransfer);
    }
}
```

And then in the `CmsDependencyProvider`, in the function `getCmsPagePostActivatorPlugins`, you can register this plugin (or any plugin implementing the above interface) for it to execute post activation or deactivation of CMS pages.
