---
title: Migration guide - BusinessOnBehalfDataImport
description: Use the guide to update versions to the newer ones of the Business on Behalf Data Import module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-business-on-behalf-data-import
originalArticleId: 0013bcfa-469e-40c9-9beb-87838ad1519d
redirect_from:
  - /2021080/docs/mg-business-on-behalf-data-import
  - /2021080/docs/en/mg-business-on-behalf-data-import
  - /docs/mg-business-on-behalf-data-import
  - /docs/en/mg-business-on-behalf-data-import
  - /v1/docs/mg-business-on-behalf-data-import
  - /v1/docs/en/mg-business-on-behalf-data-import
  - /v2/docs/mg-business-on-behalf-data-import
  - /v2/docs/en/mg-business-on-behalf-data-import
  - /v3/docs/mg-business-on-behalf-data-import
  - /v3/docs/en/mg-business-on-behalf-data-import
  - /v4/docs/mg-business-on-behalf-data-import
  - /v4/docs/en/mg-business-on-behalf-data-import
  - /v5/docs/mg-business-on-behalf-data-import
  - /v5/docs/en/mg-business-on-behalf-data-import
  - /v6/docs/mg-business-on-behalf-data-import
  - /v6/docs/en/mg-business-on-behalf-data-import
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-business-on-behalf-data-import.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-business-on-behalf-data-import.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-business-on-behalf-data-import.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-business-on-behalf-data-import.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-business-on-behalf-data-import.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-business-on-behalf-data-import.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-business-on-behalf-data-import.html
  - /docs/scos/dev/module-migration-guides/migration-guide-business-on-behalf-data-import.html

---

## Upgrading from version 2.* to version 3.*

In this version, we have changed the dependency to the CompanyUser module. This enables using the `CompanyUserEvents::COMPANY_USER_PUBLISH` constant to trigger [Publish & Syncronization](/docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronization.html) handling for imported entities.
No additional actions required.

## Upgrading from version 1.1.0 to version 2.0.0

In this version, the import key `company-user` has been assigned to the `CompanyUserDataImport`. `BusinessOnBehalfDataImport` now uses `company-user-on-behalf`. To migrate, just use the other key because the previous was repurposed.
Therefore, if you have any custom deployment or importing script that used the console command:
`vendor/bin/console data:import company-user`
Change it to:
`vendor/bin/console data:import company-user-on-behalf`
The import key company-user is now assigned to the `CompanyUserDataImport`.

<!-- Last review date: July 18, 2019 by Oleh Hladchenko and Volodymyr Volkov -->
