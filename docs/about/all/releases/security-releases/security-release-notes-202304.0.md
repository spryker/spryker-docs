---
title: Security release notes 202304.0
description: Security release notes for the Spryker Product release 202304.0
last_updated: Apr 21, 2023
template: concept-topic-template
redirect_from:
- /docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202304.0/security-release-notes-202304.0.html
- /docs/about/all/releases/security-release-notes-202304.0.html
---

The following information pertains to security-related issues that have been recently resolved. All issues are listed by description and affected modules.

If you need any additional support with this content, [contact our support](mailto:support@spryker.com). If you found a new security vulnerability, inform us through [security@spryker.com](mailto:security@spryker.com).


## SQL injection in the Propel module

An attacker can inject malicious code in functionalities of the Spryker application that are using the PropelFilterCriteria function. The injected code is then executed in the underlying database. The SQL injection vulnerability affects the Propel module that handles the interactions of the application with the database.

### Affected modules

  `spryker/propel`: 1.0.0-3.37.0

### How to get the fix

If the version of `spryker/propel` module is 3.35.0 up to and including 3.37.0, update it to version 3.38.0:

```bash
composer require spryker/propel:"~3.38.0"
composer show spryker/propel # Verify the version
```

If the version of `spryker/propel` module is earlier than 3.35.0, update it to version 3.34.3:

```bash
composer require spryker/propel:"~3.34.3"
composer show spryker/propel # Verify the version
```

## Stored Cross-Site Scripting (XSS) in Marketplace

An attacker can inject malicious payloads into the merchant profile page in the Merchant portal that's executed in the Back Office. This vulnerability lets an attacker execute code in the context of the Back Office user.

### Affected modules

- `spryker/merchant-profile-merchant-portal-gui`: 1.0.0-2.1.0
- `spryker/product-merchant-portal-gui`: 1.0.0-3.3.1

### How to get the fix

For the module `spryker/product-merchant-portal-gui`, depending on the version you are using, follow these steps:

- If your version of `spryker/product-merchant-portal-gui` is earlier than 2.0.0, update to version 1.7.1:

```bash
composer require spryker/product-merchant-portal-gui:"~1.7.1" spryker/gui:"~3.48.0" spryker/util-sanitize-xss:"~1.1.0"
composer show spryker/product-merchant-portal-gui # Verify the version
```

- If your version of `spryker/product-merchant-portal-gui` is 2.0.0 up to and including 3.0.0, update to version 2.15.1:

```bash
composer require spryker/product-merchant-portal-gui:"~2.15.1" spryker/gui:"~3.48.0" spryker/util-sanitize-xss:"~1.1.0"
composer show spryker/product-merchant-portal-gui # Verify the version
```

- If your version of `spryker/product-merchant-portal-gui` is later than 3.0.0, update to version 3.3.2:

```bash
composer require spryker/product-merchant-portal-gui:"~3.3.2" spryker/gui:"~3.48.0" spryker/util-sanitize-xss:"~1.1.0"
composer show spryker/product-merchant-portal-gui # Verify the version
```

For module `spryker/merchant-profile-merchant-portal-gui`, depending on the version you are using, follow these steps:

- If your version of `spryker/merchant-profile-merchant-portal-gui` is earlier than 2.0.0, update to version 1.8.0:

```bash
composer require spryker/merchant-profile-merchant-portal-gui:"1.8.0" spryker/gui:"~3.48.0" spryker/util-sanitize-xss:"~1.1.0"
composer show spryker/merchant-profile-merchant-portal-gui # Verify the version
```

- If your version of `spryker/merchant-profile-merchant-portal-gui` is later than 2.0.0, update to version 2.2.0:

```bash
composer require spryker/merchant-profile-merchant-portal-gui:"~2.2.0" spryker/gui:"~3.48.0" spryker/util-sanitize-xss:"~1.1.0"
composer show spryker/merchant-profile-merchant-portal-gui # Verify the version
```

## Self Cross-Site Scripting (XSS) in CMS

Administrators can place a malicious payload in Placeholders, which can be executed while trying to save, preview, or view the new page, resulting in an XSS vulnerability.

### Affected modules

- `spryker/cms`: 1.0.0-7.11.2
- `spryker/cms-block-gui`: 1.0.0-2.9.0
- `spryker/cms-gui`: 5.6.1-5.10.1
- `spryker/merchant-profile-gui`: 1.0.0-1.0.1
- `spryker/product-merchant-portal-gui`: 1.0.0-3.1.0
- `spryker/user-merchant-portal-gui`: 1.0.0-2.2.0
- `spryker-feature/cms`: 2018.11.0-202212.0
- `spryker-feature/marketplace-merchant-custom-prices`: 202204.0-202212.0
- `spryker-feature/marketplace-merchantportal-core`: 202108.0-202212.0

### How to get the fix

For the affected modules, follow these steps:

1. Upgrade the `spryker/cms` module version to 7.12.0:

```bash
composer require spryker/cms:"~7.12.0"
composer show spryker/cms # Verify the version
```

2. Update `spryker/cms-block-gui`:
   - If your version of `spryker/cms-block-gui` is earlier than 2.0.0, update it to version 2.10.0:

    ```bash
    composer require spryker/cms-block-gui:"~2.10.0"
    composer show spryker/cms-block-gui # Verify the version
    ```

    {% info_block infoBox "Info" %}

    The latest release of version 1.0 was in February, 2018. The version is outdated and no longer supported. To update from 1.*to 2.*, see [Upgrade the CmsBlockGui module](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblockgui-module.html).

    {% endinfo_block %}

   - If your version of `spryker/cms-block-gui` is later than 2.0.0 but earlier than 2.10.0, update it to version 2.10.0:

   ```bash
   composer require spryker/cms-block-gui:"~2.10.0"
   composer show spryker/cms-block-gui # Verify the version
   ```

3. Upgrade `spryker/cms-gui` module version to 5.11.0:

```bash
composer require spryker/cms-gui:"~5.11.0"
composer show spryker/cms-gui # Verify the version
```

4. Upgrade `spryker/merchant-profile-gui` module version to 1.1.0:

```bash
composer require spryker/merchant-profile-gui:"~1.1.0"
composer show spryker/merchant-profile-gui # Verify the version
```

5. Update `spryker/product-merchant-portal-gui`:

   - If your version of `spryker/product-merchant-portal-gui` is earlier than 2.0.0, update to version 1.7.0:

   ```bash
   composer require spryker/product-merchant-portal-gui:"~1.7.0"
   composer show spryker/product-merchant-portal-gui # Verify the version
   ```

   - If your version of `spryker/product-merchant-portal-gui` is 2.0.0 up to and including 3.0.0, update to version 2.15.0:

   ```bash
   composer require spryker/product-merchant-portal-gui:"~2.15.0"
   composer show spryker/product-merchant-portal-gui # Verify the version
   ```

   - If your version of `spryker/product-merchant-portal-gui` is later than 3.0.0, update to version 3.2.0:

   ```bash
   composer require spryker/product-merchant-portal-gui:"~3.2.0"
   composer show spryker/product-merchant-portal-gui # Verify the version
   ```

6. Update `spryker/user-merchant-portal-gui`:
   - If your version of `spryker/user-merchant-portal-gui` is earlier than 2.0.0, update to version 1.11.0:

   ```bash
   composer require spryker/user-merchant-portal-gui:"~1.11.0"
   composer show spryker/user-merchant-portal-gui # Verify the version
   ```

   - If your version of `spryker/user-merchant-portal-gui` is later than 2.0.0, update to version 2.3.0:

   ```bash
   composer require spryker/user-merchant-portal-gui:"~2.3.0"
   composer show spryker/user-merchant-portal-gui # Verify the version
   ```

## Temporary Denial of Service (DoS) in Back Office

An attacker can cause a temporary denial of service in the Back Office application by inserting very large data while generating vouchers on the *Merchandising* page.

### Affected modules

- `spryker/discount`: <=9.29.0
- `spryker-feature/promotions-discounts`: <=202212.0
- `spryker-feature/marketplace-promotions-discounts`: <=202212.0

### How to get the fix

Update the affected module `spryker/discount` to version 9.30.0

```bash
composer require spryker/discount:"~9.30.0"
composer show spryker/discount # Verify the version
```

## User session remains valid after deletion in the Back Office

The user's session remains valid, even if the user is deleted in the Back Office. This results in the deleted user getting an exception page with stack trace information while trying to log in to the Storefront.

### Affected modules

- `spryker/customer`: <7.49.0
- `spryker/customer-storage`: <1.0.0
- `spryker/oauth`: <2.8.0
- `spryker/oauth-customer-validation`: <1.0.0
- `spryker/oauth-extension`: <1.8.0
- `spryker-shop/customer-validation-page`: <1.0.0
- `spryker-feature/customer-account-management`: <202212.0

### How to get the fix

To apply the fix, follow these steps:

1. Install or update the required modules:

```bash
composer require "spryker/customer":"^7.49.0" "spryker/customer-storage":"^1.0.0" "spryker/oauth":"^2.8.0" "spryker/oauth-customer-validation":"^1.0.0" "spryker/oauth-extension":"^1.8.0" "spryker-shop/customer-validation-page":"^1.0.0"
```

2. Set up database schema and transfer objects:
   1. Edit the `src/Pyz/Zed/Customer/Persistence/Propel/Schema/spy_customer.schema.xml` file

    ```xml
    <?xml version="1.0"?>
    <database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Customer\Persistence" package="src.Orm.Zed.Customer.Persistence">

        <table name="spy_customer">
            <behavior name="event">
                <parameter name="spy_customer_anonymized_at" column="anonymized_at"/>
                <parameter name="spy_customer_password" column="password"/>
            </behavior>
        </table>

    </database>
    ```

   2. Run the following commands:

    ```bash
    console transfer:generate
    console propel:install
    console transfer:generate
    ```


3. To integrate the `ValidateInvalidatedCustomerAccessTokenValidator` plugin, edit the `src/Pyz/Client/Oauth/OauthDependencyProvider.php` file:

```php
...
use Spryker\Client\OauthCustomerValidation\Plugin\Oauth\ValidateInvalidatedCustomerAccessTokenValidatorPlugin;

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    ...

    /**
     * @return array<\Spryker\Client\OauthExtension\Dependency\Plugin\AccessTokenValidatorPluginInterface>
     */
    protected function getAccessTokenValidatorPlugins(): array
    {
        return [
            new ValidateInvalidatedCustomerAccessTokenValidatorPlugin(),
        ];
    }
}
```

4. To adjust `RabbitMqConfig`, edit the `src/Pyz/Client/RabbitMq/RabbitMqConfig.php` file:

```php
...

use Spryker\Shared\CustomerStorage\CustomerStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    ...

    /**
     * @return array<mixed>
     */
    protected function getPublishQueueConfiguration(): array
    {
        return [
            ...
            CustomerStorageConfig::PUBLISH_CUSTOMER_INVALIDATED,
        ];
    }

    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            ...
            CustomerStorageConfig::CUSTOMER_INVALIDATED_SYNC_STORAGE_QUEUE,
        ];
    }

    ...
}
```

5. To integrate the `LogoutInvalidatedCustomerFilterControllerEventHandler` plugin, edit the `src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php` file:

```php
...

use SprykerShop\Yves\CustomerValidationPage\Plugin\ShopApplication\LogoutInvalidatedCustomerFilterControllerEventHandlerPlugin;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    ...

    /**
     * @return array<\SprykerShop\Yves\ShopApplicationExtension\Dependency\Plugin\FilterControllerEventHandlerPluginInterface>
     */
    protected function getFilterControllerEventSubscriberPlugins(): array
    {
        return [
            ...
            new LogoutInvalidatedCustomerFilterControllerEventHandlerPlugin(),
        ];
    }

    ...
}
```


6. To integrate the `DeleteExpiredCustomerInvalidatedRecordsConsole` command, edit the `src/Pyz/Zed/Console/ConsoleDependencyProvider.php` file:

```php
...

use Spryker\Zed\CustomerStorage\Communication\Console\DeleteExpiredCustomerInvalidatedRecordsConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    ...

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            ...
            new DeleteExpiredCustomerInvalidatedRecordsConsole(),
        ];

        ...
    }

    ...
}
```

7. To adjust Jenkins cronjobs, edit the `config/Zed/cronjobs/jenkins.php` file:

```php
/* Customer */
$jobs[] = [
    'name' => 'delete-expired-customer-invalidated',
    'command' => '$PHP_BIN vendor/bin/console customer:delete-expired-customer-invalidated',
    'schedule' => '0 0 * * 0',
    'enable' => true,
    'stores' => $allStores,
];
```

8. To integrate the `CustomerInvalidatedWritePublisher` plugin, edit the `src/Pyz/Zed/Publisher/PublisherDependencyProvider.php` file:

```php
...

use Spryker\Zed\CustomerStorage\Communication\Plugin\Publisher\Customer\CustomerInvalidatedWritePublisherPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    ...

    /**
     * @return array<int, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getCustomerStoragePlugins(): array
    {
        return [
            new CustomerInvalidatedWritePublisherPlugin(),
        ];
    }
}
```

9. To integrate the `CustomerStorageConfig` values, edit the `src/Pyz/Zed/Queue/QueueDependencyProvider.php` file:

```php
...
use Spryker\Shared\CustomerStorage\CustomerStorageConfig;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            ...
            CustomerStorageConfig::PUBLISH_CUSTOMER_INVALIDATED => new EventQueueMessageProcessorPlugin(),
            CustomerStorageConfig::CUSTOMER_INVALIDATED_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

10. To integrate the `CustomerInvalidatedStorageSynchronizationData` plugin, edit the `src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php` file:

```php
...
use Spryker\Zed\CustomerStorage\Communication\Plugin\Synchronization\CustomerInvalidatedStorageSynchronizationDataPlugin;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new CustomerInvalidatedStorageSynchronizationDataPlugin(),
            ...
        ];
    }
}
```

## Outdated jQuery in use

In this case, an outdated version of jQuery was used (3.5.1). This version was released on 4 May, 2020 and affected by publicly known vulnerabilities.

### Changes

Updated JQuery to the required version 3.6.3.

### Affected modules

- `spryker/gui`: < 3.49.0
- `spryker/util-sanitize-xss`: < 1.1.0

### How to get the fix

1. Update the affected module `spryker/gui` to version 3.49.0:

```bash
composer require spryker/gui:"~3.49.0"
composer show spryker/gui # Verify the version
```

2. Update the affected module `spryker/util-sanitize-xss` to version 1.1.0:

```bash
composer require spryker/util-sanitize-xss:"~1.1.0"
composer show spryker/util-sanitize-xss # Verify the version
```

3. In the `package.json` file, modify the version of the JQuery package to 3.6.3:
   1. Add the following line:

   ```js
   "jquery": "~3.6.3"
   ```

   2. In the same directory, run the following command:

   ```bash
   npm install
   ```

## Vulnerable version of PHP in use

In PHP versions 7.4.*x* and earlier than 7.4.28, 8.0.*x* and earlier than 8.0.16, 8.1.*x* and earlier than  8.1.3, when using filter functions with the `FILTER_VALIDATE_FLOAT` filter and minimum and maximum limits, if the filter fails, you may trigger the use of allocated memory after free memory, which can result in crashes, and potentially in overwriting of other memory chunks and RCE. This issue affects code that uses `FILTER_VALIDATE_FLOAT` with minimum and maximum limits.

### Affected modules

 `spryker/php-8.0-alpine-3.13`

### How to get the fix

Update the deploy file to use these tag and redeploy image:

```php
// PHP 8.1
image:
   tag: spryker/php:8.1 or spryker/php:8.1-alpine3.16


// PHP 8.0
image:
   tag: spryker/php:8.0 or spryker/php:8.0-alpine3.16
```
