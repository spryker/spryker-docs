---
title: Migration guide - CompanyUserAuthRestApi
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/companyuserauthrestapi-migration-guide
originalArticleId: 8ea27f48-a875-4d28-8e5c-989459640412
redirect_from:
  - /2021080/docs/companyuserauthrestapi-migration-guide
  - /2021080/docs/en/companyuserauthrestapi-migration-guide
  - /docs/companyuserauthrestapi-migration-guide
  - /docs/en/companyuserauthrestapi-migration-guide
  - /v3/docs/companyuserauthrestapi-migration-guide
  - /v3/docs/en/companyuserauthrestapi-migration-guide
  - /v4/docs/companyuserauthrestapi-migration-guide
  - /v4/docs/en/companyuserauthrestapi-migration-guide
  - /v5/docs/companyuserauthrestapi-migration-guide
  - /v5/docs/en/companyuserauthrestapi-migration-guide
  - /v6/docs/companyuserauthrestapi-migration-guide
  - /v6/docs/en/companyuserauthrestapi-migration-guide
  - /docs/scos/dev/module-migration-guides/201907.0/glue-api/companyuserauthrestapi-migration-guide.html
  - /docs/scos/dev/module-migration-guides/202001.0/glue-api/companyuserauthrestapi-migration-guide.html
  - /docs/scos/dev/module-migration-guides/202005.0/glue-api/companyuserauthrestapi-migration-guide.html
  - /docs/scos/dev/module-migration-guides/202009.0/glue-api/companyuserauthrestapi-migration-guide.html
  - /docs/scos/dev/module-migration-guides/202108.0/glue-api/companyuserauthrestapi-migration-guide.html
  - /docs/scos/dev/module-migration-guides/glue-api/companyuserauthrestapi-migration-guide.html
---

## Upgrading from version 1.* to version 2.*


CompanyUserAuthRestApi module version 2.0.0 brings the following major change:
Glue layer authentication has been moved from `OauthCompanyUser` to `CompanyUserAuthRestApi`.

To perform the upgrade:

1. Update Composer:
```php
composer require spryker/company-user-auth-rest-api: "^2.0.0" --update-with-dependencies
```

2. Generate transfer objects:
```php
vendor/bin/console transfer:generate
```
3. In `\Pyz\Glue\AuthRestApi\AuthRestApiDependencyProvider::getRestUserExpanderPlugins()` replace `Spryker\Glue\OauthCompanyUser\Plugin\AuthRestApi\CompanyUserRestUserMapperPlugin` with `Spryker\Glue\CompanyUserAuthRestApi\Plugin\AuthRestApi\CompanyUserRestUserMapperPlugin`:


```php
 - use Spryker\Glue\OauthCompanyUser\Plugin\AuthRestApi\CompanyUserRestUserMapperPlugin;
 + use Spryker\Glue\CompanyUserAuthRestApi\Plugin\AuthRestApi\CompanyUserRestUserMapperPlugin;
```
*Estimated migration time: ~5 minutes*
