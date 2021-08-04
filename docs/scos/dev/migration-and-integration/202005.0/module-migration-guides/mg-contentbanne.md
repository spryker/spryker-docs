---
title: Migration Guide - ContentBanner
originalLink: https://documentation.spryker.com/v5/docs/mg-contentbanner-201907
redirect_from:
  - /v5/docs/mg-contentbanner-201907
  - /v5/docs/en/mg-contentbanner-201907
---

## Upgrading from Version 1.* to Version 2.*
Version 2.0.0 of the ContentGui module introduces the [Content Items](https://documentation.spryker.com/docs/en/content-items-overview-201907) functionality that allows creating and managing content and later selecting where it should be inserted.

With the ContentBanner version 2.0, the following changes have been made:

* Removed the deprecated `ContentBannerTransfer` definition.
* Removed deprecated `ContentBannerClient::execute()`.
* Removed `ContentBannerClient::executeBannerTypeById()`.
* Introduced `ContentProductClient::executeBannerTypeByKey()` to find content with a type banner by content key.
* Introduced the `ContentTypeContextTransfer::$key` transfer object property.
* Removed URL validation for `clickUrl` and `imageUrl ContentBannerFacade::validateContentBannerTerm()`.
* Increased the version of `spryker/content-storage` in composer.json.

You can find more details about the changes on the [ContentBanner module release notes](https://github.com/spryker/content-banner/releases/tag/2.0.0) page.

**To upgrade to the new version of the module, do the following:**
1. Perform the steps provided in [Migration Guide - ContentStorage](https://documentation.spryker.com/docs/en/mg-contentstorage-201907).
2. Upgrade the `ContentBanner` module to version 2.0.0:

```bash
composer require spryker/content-banner:"^2.0.0" --update-with-dependencies
```

3. Run the following command to re-generate transfer objects:

```bash
console transfer:generate
```

4. Remove any usage of `\Spryker\Client\ContentBanner\Plugin\ContentStorage\BannerTermExecutorPlugin`.
5. The `ContentBannerClient::execute()` method has been removed, the replacement is `ContentBannerClient::executeBannerTypeByKey()`.

_Estimated migration time: 30minutes-1h_

<!-- Last review date: Jul 08, 2019 -by Anton Zubariev, Yuliia Boiko-->
