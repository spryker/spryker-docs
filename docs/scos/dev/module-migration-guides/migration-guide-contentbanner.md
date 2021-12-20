---
title: Migration guide - ContentBanner
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-contentbanner-201907
originalArticleId: e8134885-8e77-45c6-ab17-bc937581a4c4
redirect_from:
  - /2021080/docs/mg-contentbanner-201907
  - /2021080/docs/en/mg-contentbanner-201907
  - /docs/mg-contentbanner-201907
  - /docs/en/mg-contentbanner-201907
  - /v3/docs/mg-contentbanner-201907
  - /v3/docs/en/mg-contentbanner-201907
  - /v4/docs/mg-contentbanner-201907
  - /v4/docs/en/mg-contentbanner-201907
  - /v5/docs/mg-contentbanner-201907
  - /v5/docs/en/mg-contentbanner-201907
  - /v6/docs/mg-contentbanner-201907
  - /v6/docs/en/mg-contentbanner-201907
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-contentbanner.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-contentbanner.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-contentbanner.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-contentbanner.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-contentbanner.html
---


## Upgrading from Version 1.* to Version 2.*

Version 2.0.0 of the ContentGui module introduces the [Content Items](/docs/scos/user/features/{{site.version}}/content-items-feature-overview.html) functionality that allows creating and managing content and later selecting where it should be inserted.

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
1. Perform the steps provided in [Migration Guide - ContentStorage](/docs/scos/dev/module-migration-guides/migration-guide-contentstorage.html).
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
