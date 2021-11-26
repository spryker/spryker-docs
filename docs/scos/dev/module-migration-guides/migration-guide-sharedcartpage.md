---
title: Migration guide - SharedCartPage
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-shared-cart-page
originalArticleId: 6ca4c748-ee67-474b-a2fb-dc41722c85b7
redirect_from:
  - /2021080/docs/mg-shared-cart-page
  - /2021080/docs/en/mg-shared-cart-page
  - /docs/mg-shared-cart-page
  - /docs/en/mg-shared-cart-page
  - /v2/docs/mg-shared-cart-page
  - /v2/docs/en/mg-shared-cart-page
  - /v3/docs/mg-shared-cart-page
  - /v3/docs/en/mg-shared-cart-page
  - /v4/docs/mg-shared-cart-page
  - /v4/docs/en/mg-shared-cart-page
  - /v5/docs/mg-shared-cart-page
  - /v5/docs/en/mg-shared-cart-page
  - /v6/docs/mg-shared-cart-page
  - /v6/docs/en/mg-shared-cart-page
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-sharedcartpage.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-sharedcartpage.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-sharedcartpage.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-sharedcartpage.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-sharedcartpage.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-sharedcartpage.html
---

## Upgrading from version 1.* to version 2.*

From version 2 we have removed the disabled users from the shared list. The ability to enable/disable users was added to the `CompanyUser` module, version 2.0.0.

**To upgrade to the new version of the module, do the following:**
1. Upgrade the `CompanyUser` module to version 2.0.0. See [Migration Guide - CompanyUser](/docs/scos/dev/module-migration-guides/migration-guide-companyuser.html) for more details:

```yaml
composer require spryker/company-user: “^2.0.0”
```
2. Regenerate transfer objects:

```yaml
vendor/bin/console transfer:generate
```

*Estimated migration time: 10 minutes*
 
<!-- Last review date: Feb 4, 2019* -by Sergey Samoylov, Yuliia Boiko-->
