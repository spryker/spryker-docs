---
title: Migration Guide - SharedCartPage
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/mg-shared-cart-page
originalArticleId: 519373f2-2e0d-4136-9921-79cacc7aaf6b
redirect_from:
  - /v5/docs/mg-shared-cart-page
  - /v5/docs/en/mg-shared-cart-page
---

## Upgrading from Version 1.* to Version 2.*
From version 2 we have removed the disabled users from the shared list. The ability to enable/disable users was added to the `CompanyUser` module, version 2.0.0.

**To upgrade to the new version of the module, do the following:**
1. Upgrade the `CompanyUser` module to version 2.0.0. See [Migration Guide - CompanyUser](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-companyuser.html) for more details:

```yaml
composer require spryker/company-user: “^2.0.0”
```
2. Regenerate transfer objects:

```yaml
vendor/bin/console transfer:generate
```

*Estimated migration time: 10 minutes*
 
<!-- Last review date: Feb 4, 2019* -by Sergey Samoylov, Yuliia Boiko--> 
