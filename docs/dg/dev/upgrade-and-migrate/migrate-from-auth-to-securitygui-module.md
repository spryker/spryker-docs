---
title: Migrate from Auth to SecurityGui module
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-auth-module-to-securitygui-module
originalArticleId: 3c77ca14-9017-4a29-8576-aea8a0bd3294
redirect_from:
  - /docs/scos/dev/migration-concepts/migrate-from-auth-to-securitygui-module.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-auth-module-to-securitygui-module.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-auth-module-to-securitygui-module.html
  - /docs/scos/dev/module-migration-guides/migration-guide-auth-module-to-securitygui-module.html

---


We gave up the `Auth` module in favor of using `Symfony Security`. `Symfony Security` allows more flexible customization of the authorization system. More detailed information can be found in the [official documentation](https://symfony.com/doc/current/security.html).

More details are listed below:

* All public API for modules `Auth`, `AuthMailConnector`, `AuthMailConnectorExtension` is deprecated.
* `AuthFacade::login()` and `AuthFacade::logout()` were replaced with the implementation of `Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityPluginInterface`. The Back Office authentication was implemented at `SecurityGui` module with `ZedUserSecurityPlugin`.
* `AuthFacade::isAuthenticated()`is replaced with `SecurityFacade::isUserLoggedIn()`.
* `AuthFacade::requestPasswordReset()` is replaced with `UserPasswordResetFacade::requestPasswordReset()`.
* `AuthFacade::isValidPasswordResetToken()` is replaced with `UserPasswordResetFacade::isValidPasswordResetToken()`.
* `AuthFacade::resetPassword()` is replaced with `UserPasswordResetFacade::setNewPassword()`.
* `UserFacade::expandMailWithUserData()` was deprecated. Handling of user password reset mail is implemented in `UserPasswordReset` module.
* Zed Back Office login URL was changed to `/security-gui/login`.

*Estimated migration time: 2 hours.*

To migrate from the `Auth` module to `Symfony Security`, do the following:

## Update the spryker-feature/spryker-core

{% info_block infoBox "Info" %}

The steps in this section show you how to re-configure the YVES system user and update the configuration file to avoid using the `Auth` module constants, which will be removed.

{% endinfo_block %}

1. Run:

    ```bash
    composer require spryker-feature/spryker-core:dev-master
    ```

2. Adjust `config/Shared/common/config_oauth-development.php`.

    * Remove:

    ```php
    use Spryker\Shared\Auth\AuthConstants;
    ```

    * Add:

    ```php
    use Spryker\Shared\SecuritySystemUser\SecuritySystemUserConstants;
    ```

    * Change:

    ```php
    $config[AuthConstants::AUTH_DEFAULT_CREDENTIALS]['yves_system']['token'] = 'JDJ5JDEwJFE0cXBwYnVVTTV6YVZXSnVmM2l1UWVhRE94WkQ4UjBUeHBEWTNHZlFRTEd4U2F6QVBqejQ2';
    ```

    to:

    ```php
    $config[SecuritySystemUserConstants::AUTH_DEFAULT_CREDENTIALS]['yves_system']['token'] = 'JDJ5JDEwJFE0cXBwYnVVTTV6YVZXSnVmM2l1UWVhRE94WkQ4UjBUeHBEWTNHZlFRTEd4U2F6QVBqejQ2';
    ```

3. Adjust `config/Shared/config_default.php`.

    *  Remove:

    ```php
    use Spryker\Shared\Auth\AuthConstants;
    ```

    *  Add:

    ```php
    use Spryker\Shared\SecuritySystemUser\SecuritySystemUserConstants;
    ```

    *  Change:

    ```php
    $config[AuthConstants::AUTH_DEFAULT_CREDENTIALS] = [
    'yves_system' => [
        'rules' => [
            [
                'bundle' => '*',
                'controller' => 'gateway',
                'action' => '*',
            ],
        ],
        'token' => getenv('SPRYKER_ZED_REQUEST_TOKEN') ?: '',
    ],
    ];
    ```

    to:

    ```php
    $config[SecuritySystemUserConstants::AUTH_DEFAULT_CREDENTIALS] = [
    'yves_system' => [
        'token' => getenv('SPRYKER_ZED_REQUEST_TOKEN') ?: '',
    ],
    ];
    ```

    * Change:

    ```php
    $config[AuthConstants::SYSTEM_USER_SESSION_REDIS_LIFE_TIME] = 20;
    ```

    to:  

    ```php
    $config[SecuritySystemUserConstants::SYSTEM_USER_SESSION_REDIS_LIFE_TIME] = 20;
    ```

4. Adjust `tests/PyzTest/Zed/Console/_data/cli_sandbox/config/Shared/config_default.php`.

    *  Remove:

    ```php
    use Spryker\Shared\Auth\AuthConstants;
    ```

    *  Add:

    ```php
    use Spryker\Shared\SecuritySystemUser\SecuritySystemUserConstants;
    ```

    *  Change:

    ```php
    $config[AuthConstants::AUTH_ZED_ENABLED]
    ```
    to:

    ```php
    $config[ZedRequestConstants::AUTH_ZED_ENABLED]
    ```

    * Change:

    ```php
    $config[AuthConstants::AUTH_DEFAULT_CREDENTIALS] = [
    'yves_system' => [
        'rules' => [
            [
                'bundle' => '*',
                'controller' => 'gateway',
                'action' => '*',
            ],
        ],
        'token' => 'JDJ5JDEwJFE0cXBwYnVVTTV6YVZXSnVmM2l1UWVhRE94WkQ4UjBUeHBEWTNHZlFRTEd4U2F6QVBqejQ2', // Please replace this token for your project
    ],
    ];
    ```

    to:

    ```php
    $config[SecuritySystemUserConstants::AUTH_DEFAULT_CREDENTIALS] = [
    'yves_system' => [
        'token' => 'JDJ5JDEwJFE0cXBwYnVVTTV6YVZXSnVmM2l1UWVhRE94WkQ4UjBUeHBEWTNHZlFRTEd4U2F6QVBqejQ2', // Please replace this token for your project
    ],
    ];
    ```

    * If you are using the plugin `Spryker/Zed/Auth/Communication/Plugin/SessionRedis/SystemUserSessionRedisLifeTimeCalculatorPlugin` in `src/Pyz/Zed/SessionRedis/SessionRedisDependencyProvider::getSessionRedisLifeTimeCalculatorPlugins()`, please replace it with `Spryker/Zed/SecuritySystemUser/Communication/Plugin/SessionRedis/SystemUserSessionRedisLifeTimeCalculatorPlugin`.

## Update the Security module  

{% info_block infoBox "Info" %}

Updating the Security module is necessary to use the `SecurityGui` module, which replaces part of the `Auth` module's functionality.

{% endinfo_block %}

Run:

```bash
composer update spryker/security --with-dependencies
```

## Update the spryker-feature/spryker-core-back-office

{% info_block infoBox "Info" %}

This section contains the basic steps for migrating from the `Auth` module to the `SecurityGui` module.

{% endinfo_block %}

1. Run:

```bash
composer require spryker-feature/spryker-core-back-office:dev-master
```

2. Adjust `config/Shared/config_default.php`.

    * Change:

    ```php
    $config[AclConstants::ACL_DEFAULT_RULES] = [
    [
        'bundle' => 'auth',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ```

    to:

    ```php
    $config[AclConstants::ACL_DEFAULT_RULES] = [
    [
        'bundle' => 'security-gui',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ```

1. Adjust `src/Pyz/Zed/Application/ApplicationDependencyProvider.php`.

Add `Spryker\Zed\Security\Communication\Plugin\Application\ZedSecurityApplicationPlugin` to `getApplicationPlugins()`.

```php
 /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        $plugins = [
            ...,
            new ZedSecurityApplicationPlugin(),
        ];

        ...
    }

```
4. Adjust `src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php`.

Remove `AuthorizationEventDispatcherPlugin()` and `RedirectAfterLoginEventDispatcherPlugin()` from `getEventDispatcherPlugins()`.

5. Adjust `src/Pyz/Zed/Mail/MailDependencyProvider.php`.

Remove `RestorePasswordMailTypePlugin()` and add `UserPasswordResetMailTypePlugin()` instead in `provideBusinessLayerDependencies(Container $container)`.

```php
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);

        $container->extend(static::MAIL_TYPE_COLLECTION, function (MailTypeCollectionAddInterface $mailCollection) {
            $mailCollection
                ...
                ->add(new UserPasswordResetMailTypePlugin())
                ...
                ;

            return $mailCollection;
        });

        ...
    }
```

6. Update `src/Pyz/Zed/Security/SecurityDependencyProvider.php` with the following code:

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Security;

use Spryker\Zed\Security\SecurityDependencyProvider as SprykerSecurityDependencyProvider;
use Spryker\Zed\SecurityGui\Communication\Plugin\Security\ZedUserSecurityPlugin;
use Spryker\Zed\SecuritySystemUser\Communication\Plugin\Security\ZedSystemUserSecurityPlugin;
use Spryker\Zed\User\Communication\Plugin\Security\ZedUserSessionHandlerSecurityPlugin;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    /**
     * @return \Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityPluginInterface[]
     */
    protected function getSecurityPlugins(): array
    {
        return [
            new ZedUserSessionHandlerSecurityPlugin(),
            new ZedSystemUserSecurityPlugin(),
            new ZedUserSecurityPlugin(),
        ];
    }
}
```

7. Update `src/Pyz/Zed/SecurityGui/SecurityGuiConfig.php` with the following code:

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SecurityGui;

use Spryker\Zed\SecurityGui\SecurityGuiConfig as SprykerSecurityGuiConfig;

class SecurityGuiConfig extends SprykerSecurityGuiConfig
{
    protected const IGNORABLE_ROUTE_PATTERN = '^/(security-gui|health-check|_profiler/wdt)';
}
```

8. Update `src/Pyz/Zed/UserPasswordReset/UserPasswordResetDependencyProvider.php` with the following code:   

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\UserPasswordReset;

use Spryker\Zed\UserPasswordReset\UserPasswordResetDependencyProvider as SprykerUserPasswordResetDependencyProvider;
use Spryker\Zed\UserPasswordResetMail\Communication\Plugin\UserPasswordReset\MailUserPasswordResetRequestHandlerPlugin;

class UserPasswordResetDependencyProvider extends SprykerUserPasswordResetDependencyProvider
{
    /**
     * @return \Spryker\Zed\UserPasswordResetExtension\Dependency\Plugin\UserPasswordResetRequestHandlerPluginInterface[]
     */
    public function getUserPasswordResetRequestHandlerPlugins(): array
    {
        return [
            new MailUserPasswordResetRequestHandlerPlugin(),
        ];
    }
}
```

## Remove the old modules

{% info_block infoBox "Info" %}

This section guides you how to remove the old module files.

{% endinfo_block %}

1. If the `Auth` module has not been uninstalled, run:

```bash
composer remove spryker/auth
```

2. Run:

```bash
composer remove spryker/auth-mail-connector spryker/auth-mail-connector-extension
```

3. Remove `src/Orm/Zed/Auth folder`, including all the files.
4. Remove `src/Pyz/Zed/Auth` folder, including all the files.
5. Remove `src/Pyz/Zed/AuthMailConnector` folder, including all the files.

## Update SprykerTests

{% info_block infoBox "Info" %}

This action is required for the SprykerTests to be up-to-date.

{% endinfo_block %}

1. Run:

```bash
composer update spryker/application --with-dependencies
```

2. Adjust `tests/PyzTest/Zed/Console/_data/cli_sandbox/config/Shared/config_default.php`.

    * Change:

    ```php
    $config[AclConstants::ACL_DEFAULT_CREDENTIALS] = [
    'yves_system' => [
        'rules' => [
            [
                'bundle' => '*',
                'controller' => 'gateway',
                'action' => '*',
                'type' => 'allow',
            ],
        ],
    ],
    ];
    ```

    to:

    ```php
    $config[AclConstants::ACL_DEFAULT_CREDENTIALS] = [
    'yves_system' => [
        'rules' => [],
    ],
    ];
    ```
    * Change:

    ```php
    $config[AclConstants::ACL_DEFAULT_RULES] = [
    [
        'bundle' => 'auth',
        'controller' => 'login',
        'action' => 'index',
        'type' => 'allow',
    ],
    [
        'bundle' => 'auth',
        'controller' => 'login',
        'action' => 'check',
        'type' => 'allow',
    ],
    [
        'bundle' => 'auth',
        'controller' => 'password',
        'action' => 'reset',
        'type' => 'allow',
    ],
    [
        'bundle' => 'auth',
        'controller' => 'password',
        'action' => 'reset-request',
        'type' => 'allow',
    ],
    ```

    to:

    ```php
    $config[AclConstants::ACL_DEFAULT_RULES] = [
    [
        'bundle' => 'security-gui',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
    ```

    * Change:

    ```php
        [
        'bundle' => 'heartbeat',
        'controller' => 'index',
        'action' => 'index',
        'type' => 'allow',
    ],
    ];
    ```

    to:

    ```php
        [
        'bundle' => 'health-check',
        'controller' => 'index',
        'action' => 'index',
        'type' => 'allow',
    ],
    ];
    ```

    * Change:

    ```php
    $config[AclConstants::ACL_USER_RULE_WHITELIST] = [
    [
        'bundle' => 'application',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
    [
        'bundle' => 'auth',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
    [
        'bundle' => 'heartbeat',
        'controller' => 'heartbeat',
        'action' => 'index',
        'type' => 'allow',
    ],
    ];
    ```

    to:

    ```php
    $config[AclConstants::ACL_USER_RULE_WHITELIST] = [
    [
        'bundle' => 'application',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
    ];
    ```

## Generate transfers

{% info_block infoBox "Info" %}

This section helps you to generate transfer objects.

{% endinfo_block %}

Run:

```bash
console transfer:generate
```

## Update the database

{% info_block infoBox "Info" %}

This section helps you to generate the new Propel classes.

{% endinfo_block %}

Run:

```bash
console propel:install
```
