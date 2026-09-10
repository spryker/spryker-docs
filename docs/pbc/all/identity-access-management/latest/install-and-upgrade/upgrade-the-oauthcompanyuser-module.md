---
title: Upgrade the OauthCompanyUser module
description:  Learn how to migrate and update to a newer version of Oauth company user module from an older one in your Spryker project.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-oauthcompanyuser
originalArticleId: 6744cb78-6677-4c30-bc0f-87c2931c71ba
redirect_from:
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-oauthcompanyuser.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-oauthcompanyuser.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-oauthcompanyuser.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-oauthcompanyuser.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-oauthcompanyuser.html
  - /docs/scos/dev/module-migration-guides/migration-guide-oauthcompanyuser.html
  - /docs/pbc/all/identity-access-management/202204.0/install-and-upgrade/upgrade-the-oauthcompanyuser-module.html
---

## Upgrading from version 1.x.x to 2.x.x

`OauthCompanyUser` module version 2.0.0 brings two major changes:

- GLUE layer has been moved from Glue `OauthCompanyUser` to `CompanyUserAuthRestApi` (see [Upgrade the CompanyUserAuthRestApi module](/docs/scos/dev/module-migration-guides/glue-api/companyuserauthrestapi-migration-guide.html) for more details).
- `OauthCompanyUserConfig::OAUTH_CLIENT_IDENTIFIER`, `OauthCompanyUserConfig::OAUTH_CLIENT_SECRET` constants have been removed.

BC Breaking changes:

- Moved Glue layer to the `CompanyUserAuthRestApi` module.
- Removed `OauthCompanyUserConfig::getClientSecret()`.
- Removed `OauthCompanyUserConfig::getClientId()`.
- Removed `OauthCompanyUserConstants::OAUTH_CLIENT_IDENTIFIER`.
- Removed `OauthCompanyUserConstants::OAUTH_CLIENT_SECRET`.
- Removed `OauthCompanyUserClient::getClientSecret()`.
- Removed `OauthCompanyUserClient::getClientId()`.

*Estimated migration time: ~10m*

To upgrade to the new version of the module, do the following:

1. Update composer:

```bash
composer require spryker/oauth-company-user: "^2.0.0" --update-with-dependencies
```

2. Generate transfer:

```bash
vendor/bin/console transfer:generate
```

3. Remove constants in the `config/Shared/config_default.php`, `config/Shared/config_default-development.php`, and `config/Shared/config_default-devtest.php` files:

```yaml
$config[OauthCompanyUserConstants::OAUTH_CLIENT_IDENTIFIER] = '';
$config[OauthCompanyUserConstants::OAUTH_CLIENT_SECRET] = '';
```

Instead of this usage, use constants from the `Oauth` module:

```yaml
$config[OauthConstants::OAUTH_CLIENT_IDENTIFIER] = '';
$config[OauthConstants::OAUTH_CLIENT_SECRET] = '';
```

4. In the `\Pyz\Glue\AuthRestApi\AuthRestApiDependencyProvider::getRestUserExpanderPlugins()` replace `Spryker\Glue\OauthCompanyUser\Plugin\AuthRestApi\CompanyUserRestUserMapperPlugin` to `Spryker\Glue\CompanyUserAuthRestApi\Plugin\AuthRestApi\CompanyUserRestUserMapperPlugin`:

```php
- use Spryker\Glue\OauthCompanyUser\Plugin\AuthRestApi\CompanyUserRestUserMapperPlugin;
+ use Spryker\Glue\CompanyUserAuthRestApi\Plugin\AuthRestApi\CompanyUserRestUserMapperPlugin;
```
