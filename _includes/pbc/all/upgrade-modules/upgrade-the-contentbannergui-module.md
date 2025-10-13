

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

4. Run the following command to re-generate transfer objects:

```bash
console transfer:generate
```

5. Run the following command to re-generate Zed translations:

```bash
console translator:generate-cache
```
