This document describes how to integrate the Push notification feature into a Spryker project.

## Install feature core

Follow the steps below to install the Push Notification feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME         | VERSION          | INTEGRATION GUIDE                                                                                                                    |
|--------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{site.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/spryker-core-feature-integration.html) |  |

### 1) Install the required modules using Composer

```bash
composer require spryker-feature/push-notification: "{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                      | EXPECTED DIRECTORY                            |
|-----------------------------|-----------------------------------------------|
| PushNotification            | vendor/spryker/push-notification              |
| PushNotificationExtension   | vendor/spryker/push-notification-extension    |
| PushNotificationsBackendApi | vendor/spryker/push-notification-backend-api  |
| PushNotificationWebPushPhp  | vendor/spryker/push-notification-web-push-php |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Apply the database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                    | TYPE  | EVENT   |
|------------------------------------|-------|---------|
| spy_push_notification              | table | created |
| spy_push_notification_subscription | table | created |
| spy_push_notification_group        | table | created |
| spy_push_notification_provider     | table | created |

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER                                             | TYPE  | EVENT   | PATH                                                                               |
|------------------------------------------------------|-------|---------|------------------------------------------------------------------------------------|
| PushNotificationSubscriptionCollectionRequest        | class | created | src/Generated/Shared/Transfer/PushNotificationSubscriptionCollectionRequest        |
| PushNotificationSubscriptionCollectionResponse       | class | created | src/Generated/Shared/Transfer/PushNotificationSubscriptionCollectionResponse       |
| PushNotificationSubscriptionCollectionDeleteCriteria | class | created | src/Generated/Shared/Transfer/PushNotificationSubscriptionCollectionDeleteCriteria |
| PushNotificationSubscriptionCollection               | class | created | src/Generated/Shared/Transfer/PushNotificationSubscriptionCollection               |
| PushNotificationSubscription                         | class | created | src/Generated/Shared/Transfer/PushNotificationSubscription                         |
| PushNotificationUser                                 | class | created | src/Generated/Shared/Transfer/PushNotificationUser                                 |
| PushNotificationCollectionRequest                    | class | created | src/Generated/Shared/Transfer/PushNotificationCollectionRequest                    |
| PushNotificationCollectionResponse                   | class | created | src/Generated/Shared/Transfer/PushNotificationCollectionResponse                   |
| PushNotification                                     | class | created | src/Generated/Shared/Transfer/PushNotification                                     |
| PushNotificationGroup                                | class | created | src/Generated/Shared/Transfer/PushNotificationGroup                                |
| PushNotificationProviderCriteria                     | class | created | src/Generated/Shared/Transfer/PushNotificationProviderCriteria                     |
| PushNotificationSubscriptionCriteria                 | class | created | src/Generated/Shared/Transfer/PushNotificationSubscriptionCriteria                 |
| PushNotificationProviderCollection                   | class | created | src/Generated/Shared/Transfer/PushNotificationProviderCollection                   |
| PushNotificationProviderCollectionRequest            | class | created | src/Generated/Shared/Transfer/PushNotificationProviderCollectionRequest            |
| PushNotificationProviderCollectionResponse           | class | created | src/Generated/Shared/Transfer/PushNotificationProviderCollectionResponse           |
| PushNotificationProvider                             | class | created | src/Generated/Shared/Transfer/PushNotificationProvider                             |
| PushNotificationProviderConditions                   | class | created | src/Generated/Shared/Transfer/PushNotificationProviderConditions                   |
| PushNotificationSubscriptionConditions               | class | created | src/Generated/Shared/Transfer/PushNotificationSubscriptionConditions               |
| ErrorCollection                                      | class | created | src/Generated/Shared/Transfer/ErrorCollection                                      |
| PushNotificationCollection                           | class | created | src/Generated/Shared/Transfer/PushNotificationCollection                           |
| PushNotificationCriteria                             | class | created | src/Generated/Shared/Transfer/PushNotificationCriteria                             |
| PushNotificationConditions                           | class | created | src/Generated/Shared/Transfer/PushNotificationConditions                           |
| ApiPushNotificationSubscriptionAttributes            | class | created | src/Generated/Shared/Transfer/ApiPushNotificationSubscriptionAttributes            |
| ApiPushNotificationGroupAttributes                   | class | created | src/Generated/Shared/Transfer/ApiPushNotificationGroupAttributes                   |

{% endinfo_block %}

### 3) Set up configuration

If you want to make `push-notification-subscriptions` resource protected, adjust the protected paths configuration:

**src/Pyz/Shared/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorConfig.php**

```php
<?php

namespace Pyz\Shared\GlueBackendApiApplicationAuthorizationConnector;

use Spryker\Shared\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorConfig as SprykerGlueBackendApiApplicationAuthorizationConnectorConfig;

class GlueBackendApiApplicationAuthorizationConnectorConfig extends SprykerGlueBackendApiApplicationAuthorizationConnectorConfig
{
    /**
     * @return array<string, mixed>
     */
    public function getProtectedPaths(): array
    {
        return [
            '/push-notification-subscription' => [
                'isRegularExpression' => false,
            ],
        ];
    }
}
```

We have to add the configuration that defines the VAPID keys that are used by the push notification:

| CONFIGURATION                                          | SPECIFICATION                                                                   | NAMESPACE                                 |
|--------------------------------------------------------|---------------------------------------------------------------------------------|-------------------------------------------|
| PushNotificationWebPushPhpConstants::VAPID_PUBLIC_KEY  | Provides VAPID public key. Used for authentication to send push notifications.  | Spryker\Shared\PushNotificationWebPushPhp |
| PushNotificationWebPushPhpConstants::VAPID_PRIVATE_KEY | Provides VAPID private key. Used for authentication to send push notifications. | Spryker\Shared\PushNotificationWebPushPhp |

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\PushNotificationWebPushPhp\PushNotificationWebPushPhpConstants;

// >>> Push Notification Web Push Php
$config[PushNotificationWebPushPhpConstants::VAPID_PUBLIC_KEY] = getenv('SPRYKER_PUSH_NOTIFICATION_WEB_PUSH_PHP_VAPID_PUBLIC_KEY');
$config[PushNotificationWebPushPhpConstants::VAPID_PRIVATE_KEY] = getenv('SPRYKER_PUSH_NOTIFICATION_WEB_PUSH_PHP_VAPID_PRIVATE_KEY');
```

Then we have to add the VAPID keys to your **deploy.*.yml**.

```yml

image:
  tag: spryker/php:8.1
  environment:
    SPRYKER_PUSH_NOTIFICATION_WEB_PUSH_PHP_VAPID_PUBLIC_KEY: 'Your public key.'
    SPRYKER_PUSH_NOTIFICATION_WEB_PUSH_PHP_VAPID_PRIVATE_KEY: 'Your private key.'
```

VAPID, which stands for Voluntary Application Server Identity, is a new way to send and receive website push
notifications.
Your VAPID keys allow you to send web push campaigns without having to send them through a service like Firebase Cloud
Messaging (or FCM).

To generate VAPID keys we can use:

- https://vapidkeys.com/ - an online tool to generate a keys.
- https://www.npmjs.com/package//web-push - a Node.js package that can generate the VAPID keys.

Example of the command to generate the VAPID keys by using the `web-push` Node.js library:

Run the following console command `web-push generate-vapid-keys --json`.

### 4) Add translations

1. Append glossary according to your configuration:

```csv
push_notification.validation.error.push_notification_provider_not_found,Push notification provider name is not found.,en_US
push_notification.validation.error.push_notification_provider_not_found,Der Anbietername der Push-Benachrichtigung wurde nicht gefundenn.,de_DE
push_notification.validation.error.push_notification_not_found,Push notification not found.,en_US
push_notification.validation.error.push_notification_not_found,Push-Nachricht nicht gefunden.,de_DE
push_notification.validation.error.push_notification_provider_already_exists,Push notification provider already exists.,en_US
push_notification.validation.error.push_notification_provider_already_exists,Der Anbieter für Push-Benachrichtigungen existiert bereits.,de_DE
push_notification.validation.error.wrong_group_name,Wrong group name.,en_US
push_notification.validation.error.wrong_group_name,Falscher Gruppenname.,de_DE
push_notification_web_push_php.validation.error.invalid_payload_structure,Invalid payload structure.,en_US
push_notification_web_push_php.validation.error.invalid_payload_structure,Ungültige Nutzlaststruktur.,de_DE
push_notification_web_push_php.validation.error.payload_length_exceeded,The maximum payload length exceeded.,en_US
push_notification_web_push_php.validation.error.payload_length_exceeded,Die maximale Länge der Nutzlast wurde überschritten.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

### 5) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                                                 | SPECIFICATION                                         | PREREQUISITES | NAMESPACE                                                                    |
|------------------------------------------------------------------------|-------------------------------------------------------|---------------|------------------------------------------------------------------------------|
| PushNotificationWebPushPhpPushNotificationSubscriptionValidatorPlugin  | Validates the push notification subscription payload. |               | Spryker\Zed\PushNotificationWebPushPhp\Communication\Plugin\PushNotification |
| PushNotificationWebPushPhpPayloadLengthPushNotificationValidatorPlugin | Validates the push notification payload.              |               | Spryker\Zed\PushNotificationWebPushPhp\Communication\Plugin\PushNotification |
| PushNotificationWebPushPhpPushNotificationSenderPlugin                 | Sends push notification collection.                   |               | Spryker\Zed\PushNotificationWebPushPhp\Communication\Plugin\PushNotification |

**src/Pyz/Zed/PushNotification/PushNotificationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PushNotification;

use Spryker\Zed\PushNotification\PushNotificationDependencyProvider as SprykerPushNotificationDependencyProvider;
use Spryker\Zed\PushNotificationWebPushPhp\Communication\Plugin\PushNotification\PushNotificationWebPushPhpPayloadLengthPushNotificationValidatorPlugin;
use Spryker\Zed\PushNotificationWebPushPhp\Communication\Plugin\PushNotification\PushNotificationWebPushPhpPushNotificationSenderPlugin;
use Spryker\Zed\PushNotificationWebPushPhp\Communication\Plugin\PushNotification\PushNotificationWebPushPhpPushNotificationSubscriptionValidatorPlugin;

class PushNotificationDependencyProvider extends SprykerPushNotificationDependencyProvider
{
    /**
     * @return array<int, \Spryker\Zed\PushNotificationExtension\Dependency\Plugin\PushNotificationSubscriptionValidatorPluginInterface>
     */
    protected function getPushNotificationSubscriptionValidatorPlugins(): array
    {
        return [
            new PushNotificationWebPushPhpPushNotificationSubscriptionValidatorPlugin(),
        ];
    }

    /**
     * @return array<int, \Spryker\Zed\PushNotificationExtension\Dependency\Plugin\PushNotificationValidatorPluginInterface>
     */
    protected function getPushNotificationValidatorPlugins(): array
    {
        return [
            new PushNotificationWebPushPhpPayloadLengthPushNotificationValidatorPlugin(),
        ];
    }

    /**
     * @return array<int, \Spryker\Zed\PushNotificationExtension\Dependency\Plugin\PushNotificationSenderPluginInterface>
     */
    protected function getPushNotificationSenderPlugins(): array
    {
        return [
            new PushNotificationWebPushPhpPushNotificationSenderPlugin(),
        ];
    }
}

```

2. Enable the following installer plugins:

| PLUGIN                                            | SPECIFICATION                                                                      | PREREQUISITES | NAMESPACE                                                             |
|---------------------------------------------------|------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------|
| PushNotificationWebPushPhpProviderInstallerPlugin | Adds the `web-push` provider to the list of available push notification providers. |               | Spryker\Zed\PushNotificationWebPushPhp\Communication\Plugin\Installer |

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\PushNotificationWebPushPhp\Communication\Plugin\Installer\PushNotificationWebPushPhpProviderInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface|\Spryker\Zed\InstallerExtension\Dependency\Plugin\InstallerPluginInterface>
     */
    public function getInstallerPlugins(): array
    {   
        return [
            new PushNotificationWebPushPhpProviderInstallerPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Ensure that the installer plugin work correctly:

1. Run the following console command to execute install plugins `docker/sdk console setup:init-db`.
2. Check that the `web-push-php` push notification provider exists in the `spy_push_notification_provider` database
   table.

{% endinfo_block %}

3. Enable the following console command plugins:

| PLUGIN                                           | SPECIFICATION                                                    | PREREQUISITES | NAMESPACE                                          |
|--------------------------------------------------|------------------------------------------------------------------|---------------|----------------------------------------------------|
| SendPushNotificationConsole                      | Sends notifications in an async way.                             |               | Spryker\Zed\PushNotification\Communication\Console |
| DeleteExpiredPushNotificationSubscriptionConsole | Delete expired push notification subscriptions from Persistence. |               | Spryker\Zed\PushNotification\Communication\Console |

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\PushNotification\Communication\Console\DeleteExpiredPushNotificationSubscriptionConsole;
use Spryker\Zed\PushNotification\Communication\Console\SendPushNotificationConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
     /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    { 
        return [
            new DeleteExpiredPushNotificationSubscriptionConsole(),
            new SendPushNotificationConsole(),
        ];
    }
}

```

4. Enable the Backend API by registering the plugin:

| PLUGIN                                     | SPECIFICATION                                             | PREREQUISITES | NAMESPACE                                                       |
|--------------------------------------------|-----------------------------------------------------------|---------------|-----------------------------------------------------------------|
| PushNotificationSubscriptionResourcePlugin | Registers the `push-notification-subscriptions` resource. |               | Spryker\Glue\PushNotificationsBackendApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\PushNotificationsBackendApi\Plugin\GlueApplication\PushNotificationSubscriptionResourcePlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new PushNotificationSubscriptionResourcePlugin(),
        ];
    }
}

```
---
{% info_block warningBox "Verification" %}

Ensure that the plugins work correctly:

1. In order to test the functionality, you will need to download our demo application.
2. Clone demo application: GitHub - https://github.com/ievgen-malykhin/web-push-php-example
3. Generate the VAPID keys by using the online generator https://vapidkeys.com/.
3. Open the file located at the `/src/app.js` and replace the `applicationServerKey` variable value with your VAPID public key.
4. Find the `getToken()` method at the `/src/app.js` and replace the credentials with the user that works in your system.
4. Install the dependencies of a demo project by running the `composer install` command.
5. Run the local http server with the demo app by executing following console command `php -S localhost:8000 router.php`.
6. Follow the steps written in the integration guide to enable the feature in the system.
7. Enable the push notification by clicking the button on the page.
8. Create the push notification by adding it manually to the `spy_push_notification` database table, use the same group and notification provider that is used by the subscription.
9. Run the following console command to send the push notification `docker/sdk console send-push-notifications`.
10. Depending on the OS, the notification will be displayed to you with content that was filled into the `spy_push_notification.payload` database field.
11. Change the subscription expiration date `spy_push_notification_subscription.expired_at` to date from the previous year and run the following console command to remove the outdated subscriptions `delete-expired-push-notification-subscriptions`.
   
{% endinfo_block %}


### 6) Set up cron job

Enable the `send-push-notifications` and `delete-expired-push-notification-subscriptions` console commands in the
cron-job list:

**config/Zed/cronjobs/jobs.php**

```php
<?php

/**
 * Notes:
 *
 * - jobs[]['name'] must not contains spaces or any other characters, that have to be urlencode()'d
 * - jobs[]['role'] default value is 'admin'
 */

$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');

$allStores = array_keys($stores);

/* Push notification */
$jobs[] = [
    'name' => 'delete-expired-push-notification-subscriptions',
    'command' => '$PHP_BIN vendor/bin/console push-notification:delete-expired-push-notification-subscriptions',
    'schedule' => '0 0 * * 0',
    'enable' => true,
    'stores' => $allStores,
];

$jobs[] = [
    'name' => 'send-push-notifications',
    'command' => '$PHP_BIN vendor/bin/console push-notification:send-push-notifications',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];
```

{% info_block warningBox "Verification" %}

1. Make sure that push notifications have been correctly sent by checking the `spy_push_notification.notification_sent` database table field has to be equal to `TRUE` in case of a successful send.
2. Make sure that outdated push notification subscription are removed by checking the `spy_push_notification_subscription` database table, create the push notification subscription record with `spy_push_notification_subscription.expired_at` with last year's date.

{% endinfo_block %}