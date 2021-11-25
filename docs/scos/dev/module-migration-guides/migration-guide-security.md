---
title: Migration guide - Security
description: Use the guide to perform the Security part of the Silex Migration Effort.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-security
originalArticleId: a698e3bd-0688-480c-a2de-d37de8314e6a
redirect_from:
  - /2021080/docs/migration-guide-security
  - /2021080/docs/en/migration-guide-security
  - /docs/migration-guide-security
  - /docs/en/migration-guide-security
  - /v5/docs/migration-guide-security
  - /v5/docs/en/migration-guide-security
  - /v6/docs/migration-guide-security
  - /v6/docs/en/migration-guide-security
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-salesmerchantconnector.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-salesmerchantconnector.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-salesmerchantconnector.html
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using composer:
```bash
composer require spryker/security
```
2. Remove the old service providers, if you have them in the project:
```php
\Silex\Provider\RememberMeServiceProvider
\Silex\Provider\SecurityServiceProvider
\SprykerShop\Yves\AgentPage\Plugin\Provider\AgentPageSecurityServiceProvider
\SprykerShop\Yves\CustomerPage\Plugin\Provider\CustomerSecurityServiceProvider
\SprykerShop\Yves\ShopApplication\Plugin\Provider\YvesSecurityServiceProvider
```
3. Enable new plugins in the corresponding files:

**Yves Integration**

```php
<?php

namespace Pyz\Yves\ShopApplication;


use Spryker\Yves\Security\Plugin\Application\SecurityApplicationPlugin;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new SecurityApplicationPlugin(),
            ...
        ];
    }
}
```

4. Wire the additional plugins:

**View Details**

```php
<?php

namespace Pyz\Yves\Security;

use Spryker\Yves\Security\Plugin\Security\RememberMeSecurityPlugin;
use Spryker\Yves\Security\SecurityDependencyProvider as SprykerSecurityDependencyProvider;
use SprykerShop\Yves\AgentPage\Plugin\Security\AgentPageSecurityPlugin;
use SprykerShop\Yves\CustomerPage\Plugin\Security\CustomerPageSecurityPlugin;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    /**
     * @return \Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityPluginInterface[]
     */
    protected function getSecurityPlugins(): array
    {
        return [
            new RememberMeSecurityPlugin(),
            new AgentPageSecurityPlugin(),
            new CustomerPageSecurityPlugin(),
        ];
    }
}
```
