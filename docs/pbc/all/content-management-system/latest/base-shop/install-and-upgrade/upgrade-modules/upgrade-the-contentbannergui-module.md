---
title: Upgrade the ContentBannerGui module
description: Learn how to upgrade to a newer version of the Spryker content banner GUI module from an older one in your Spryker Project.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-contentbannergui-201907
originalArticleId: f6c315ec-d784-4771-8039-3756cd61e078
redirect_from:
  - /2021080/docs/mg-contentbannergui-201907
  - /2021080/docs/en/mg-contentbannergui-201907
  - /docs/mg-contentbannergui-201907
  - /docs/en/mg-contentbannergui-201907
  - /v3/docs/mg-contentbannergui-201907
  - /v3/docs/en/mg-contentbannergui-201907
  - /v4/docs/mg-contentbannergui-201907
  - /v4/docs/en/mg-contentbannergui-201907
  - /v5/docs/mg-contentbannergui-201907
  - /v5/docs/en/mg-contentbannergui-201907
  - /v6/docs/mg-contentbannergui-201907
  - /v6/docs/en/mg-contentbannergui-201907
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-contentbannergui.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-contentbannergui.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-contentbannergui.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-contentbannergui.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-contentbannergui.html
  - /docs/scos/dev/module-migration-guides/migration-guide-contentbannergui.html
  - /docs/pbc/all/content-management-system/202311.0/install-and-upgrade/upgrade-modules/upgrade-the-contentbannergui-module.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-contentbannergui-module.html
---

## Upgrading from version 1.* to version 2.*

Version 2.0.0 of the `ContentBannerGui` module introduces the [Content Items](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/navigation-feature-overview.html) functionality that allows creating and managing content and later selecting where it should be inserted.

With the `ContentBannerGui` version 2.0, we have made the following changes:

- Changed twig expression template.
- Changed the parameter ID to KEY.
- Changed the issue with saving relative URL for click and image URLs.

You can find more details about the changes on the [ContentBannerGui module release notes](https://github.com/spryker/content-banner-gui/releases/tag/2.0.0) page.

*Estimated migration time: 30 minutes*

To upgrade to the new version of the module, do the following:

1. Upgrade the `Content` Module to version 2.0.0. Follow the steps described in [Upgrade the Content module](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-content-module.html).
2. Upgrade the `ContentBanner` to version 2.0.0. Follow the steps described in [Upgrade the ContentBanner module](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-contentbanner-module.html).
3. Upgrade the `ContentBannerGui` module to version 2.0.0:

```bash
composer require spryker/content-banner-gui:"^2.0.0" --update-with-dependencies
```

4. Re-generate transfer objects:

```bash
console transfer:generate
```

5. Re-generate Zed translations:

```bash
console translator:generate-cache
```
