---

## Upgrading from version 1.* to version 2.*

`ContentBannersRestApi`, version 2.0.0 introduces the [Banner content item](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/domain-model-and-relationships/content-item-types-module-relations.html) functionality that allows retrieving its data by the content item key via REST API endpoint for all or a specific locale.

In `ContentBannersRestApi` version 2.0.0, we have:
* Adjusted models to support parameter KEY of a content item, so now endpoint expects the content key instead of ID in the URL.
* Removed `ContentBannersRestApiConfig::RESPONSE_CODE_CONTENT_ID_IS_MISSING` and `ContentBannersRestApiConfig::RESPONSE_DETAILS_CONTENT_ID_IS_MISSING`.
* Introduced `ContentBannersRestApiConfig::RESPONSE_CODE_CONTENT_KEY_IS_MISSING` and `ContentBannersRestApiConfig::RESPONSE_DETAILS_CONTENT_KEY_IS_MISSING`.
* Increased the version of `spryker/content-banner` in composer.json.

You can find more details about the changes on the [ContentBannersRestApi module release notes](https://github.com/spryker/content-banners-rest-api/releases/tag/2.0.0) page.

To upgrade to the new version of the module, do the following:

1. Upgrade the **ContentBanner** module to version 2.0.0. See [Upgrade the ContentBanner module](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-contentbanner-module.html) for  details on how to upgrade.

2. Upgrade the **ContentBannerRestApi** module to version 2.0.0:

```php
composer require spryker/content-banners-rest-api:"^2.0.0" --update-with-dependencies
```

3. Run the following command to re-generate transfer objects:

```php
console transfer:generate
```
*Estimated migration time: 30 minutes*

<!-- Last review date: Jul 04, 2019 by Sergey Samoylov, Yuliia Boiko-->
