

## Upgrading from version 1.* to version 2.*

This version provides support for multi-store CMS Block handling.

To upgrade to the new version of the module, do the following:

1. Update `spryker/cms-block-collector` module to at least version 2.0.0.
2. Update `spryker/collector` module to at least version 6.0.0. See [Upgrade the Collector module](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-collector-module.html).
3. Install/upgrade `spryker/cms-block` to at least version 2.0.0. You can find additional guide to migration [Migration Guide - CMS Block](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblock-module.html).
4. Additionally these internal classes have changed. Take a look if you have customized them:
* `CmsBlockCollector`
* `CmsBlockCollectorQuery`

You can find more details for these changes on the [CMS Block Collector module release page](https://github.com/spryker/cms-block-collector/releases) and in [Upgrade the Collector module](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-collector-module.html).

CMS Block Collector is ready to be used in multi-store environment.
You can find further information about multi-store CMS Blocks here.
