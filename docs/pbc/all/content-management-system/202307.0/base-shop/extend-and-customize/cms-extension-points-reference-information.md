---
title: "CMS extension points: reference information"
last_updated: Aug 13, 2021
description: The CMS module provides an extension point for post activation and deactivation of CMS pages.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/201903.0/cms-feature-walkthrough/cms-extension-points-reference-information.html
  - /docs/scos/dev/feature-walkthroughs/202005.0/cms-feature-walkthrough/cms-extension-points-reference-information.html
  - /docs/scos/dev/feature-walkthroughs/202307.0/cms-feature-walkthrough/cms-extension-points-reference-information.html
  - /docs/pbc/all/content-management-system/202307.0/extend-and-customize/cms-extension-points-reference-information.html
---

The `CMS` module provides an extension point for post activation and deactivation of CMS pages. The plugin interface set for this extension point is as follows:

```php
<?php

namespace Spryker/Zed/Cms/Communication/Plugin;

use Generated/Shared/Transfer/CmsPageTransfer;

interface PostCmsPageActivatorPluginInterface
{
    /**
     * Specification:
     * - Runs after the CMS activator class functions (activate and deactivate)
     *
     * @api
     *
     * @param /Generated/Shared/Transfer/CmsPageTransfer $cmsPageTransfer
     *
     * @return void
     */
    public function execute(CmsPageTransfer $cmsPageTransfer);
}
```

For example, navigation is connected with the activation and deactivation of CMS pages, so there is a plugin in the `CmsNavigationConnector` module that is called `PostCmsPageActivatorNavigationPlugin`.

It implements the interface as follows:

```php
<?php

namespace Spryker/Zed/CmsNavigationConnector/Communication/Plugin;

use Generated/Shared/Transfer/CmsPageTransfer;
use Spryker/Zed/Cms/Communication/Plugin/PostCmsPageActivatorPluginInterface;
use Spryker/Zed/Kernel/Communication/AbstractPlugin;

/**
 * @method /Spryker/Zed/CmsNavigationConnector/Business/CmsNavigationConnectorFacadeInterface getFacade()
 * @method /Spryker/Zed/CmsNavigationConnector/Communication/CmsNavigationConnectorCommunicationFactory getFactory()
 */
class PostCmsPageActivatorNavigationPlugin extends AbstractPlugin implements PostCmsPageActivatorPluginInterface
{
    /**
     * @param /Generated/Shared/Transfer/CmsPageTransfer $cmsPageTransfer
     *
     * @return void
     */
    public function execute(CmsPageTransfer $cmsPageTransfer)
    {
        $this->getFacade()->updateCmsPageNavigationNodesIsActive($cmsPageTransfer);
    }
}
```

Found within `CmsDependencyProvider`, in the function `getCmsPagePostActivatorPlugins`, you can register this plugin (or any plugin implementing the above interface) for it to execute post activation or deactivation of CMS pages.
