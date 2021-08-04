---
title: Migration Guide - Business On Behalf Data Import
originalLink: https://documentation.spryker.com/v3/docs/mg-business-on-behalf-data-import
redirect_from:
  - /v3/docs/mg-business-on-behalf-data-import
  - /v3/docs/en/mg-business-on-behalf-data-import
---

## Upgrading from Version 2.* to Version 3.*
    
In this version, we have changed the dependency to the CompanyUser module. This enables using the `CompanyUserEvents::COMPANY_USER_PUBLISH` constant to trigger [Publish & Syncronization](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-publishing/publish-and-syn) handling for imported entities.
No additional actions required.

## Upgrading from Version 1.1.0 to Version 2.0.0
    
In this version, the import key `company-user` has been assigned to the `CompanyUserDataImport`. `BusinessOnBehalfDataImport` now uses `company-user-on-behalf`. To migrate, just use the other key because the previous was repurposed.
Therefore, if you have any custom deployment or importing script that used the console command:
`vendor/bin/console data:import company-user`
Change it to:
`vendor/bin/console data:import company-user-on-behalf`
The import key company-user is now assigned to the `CompanyUserDataImport`.

<!-- Last review date: July 18, 2019 by Oleh Hladchenko and Volodymyr Volkov -->
