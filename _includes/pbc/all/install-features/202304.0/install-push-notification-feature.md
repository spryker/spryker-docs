


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

1. If you want to make `push-notification-subscriptions` resource protected, adjust the protected paths configuration:

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
            '/push-notification-subscriptions' => [
                'isRegularExpression' => false,
            ],
        ];
    }
}
```

2. Add the configuration defining *Voluntary Application Server Identity (VAPID)* keys, which are used by the push notification:

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

3. Add the VAPID keys to your **deploy.*.yml**:

```yml

image:
  tag: spryker/php:8.1
  environment:
    SPRYKER_PUSH_NOTIFICATION_WEB_PUSH_PHP_VAPID_PUBLIC_KEY: 'Your public key.'
    SPRYKER_PUSH_NOTIFICATION_WEB_PUSH_PHP_VAPID_PRIVATE_KEY: 'Your private key.'
```

VAPID is a new way to send and receive website push notifications. Your VAPID keys let you send web push campaigns without sending them through a service like Firebase Cloud Messaging (FCM).

To generate VAPID keys, you can use the following tools:
- https://vapidkeys.com/—an online tool to generate keys.
- https://www.npmjs.com/package//web-push—a Node.js package that can generate VAPID keys.

The following example command generates VAPID keys by using the `web-push` Node.js library:

```bash
web-push generate-vapid-keys --json
```

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

<details>
<summary markdown='span'>src/Pyz/Zed/PushNotification/PushNotificationDependencyProvider.php</summary>

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
</details>

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

Ensure that the installer plugin works correctly:

1. Execute install plugins: 
```bash
docker/sdk console setup:init-db`
```

2. Check that the `web-push-php` push notification provider exists in the `spy_push_notification_provider` database table.

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

{% info_block warningBox "Verification" %}

Ensure that the plugins work correctly:
1. To test the functionality, create a simple single-page demo application.
2. Generate VAPID keys through the online generator https://vapidkeys.com/.
3. Create a directory for the demo application: `mkdir push_notification_spa`.
4. In the `push_notification_spa` directory, create the following files:

**.../push_notification_spa/index.html**

```html
<html>
    <body>
        <h1>Web Push sandbox</h1>
        <button id="push-button">Enable browser notifications</button>
        <button id="subscription-button">Create Push notification subscription</button>
        <script type="text/javascript" src="app.js"></script>
    </body>
</html>
```

<details open>
<summary markdown='span'>.../push_notification_spa/app.js</summary>

```js
document.addEventListener('DOMContentLoaded', () => {
  const applicationServerKey = '';
  let isPushEnabled = false;

  const pushButton = document.querySelector('#push-button');
  if (!pushButton) {
    return;
  }

  pushButton.addEventListener('click', function () {
    if (isPushEnabled) {
      disablePush();
    } else {
      enablePush();
    }
  });

  const subscriptionButton = document.querySelector('#subscription-button');
  if (!subscriptionButton) {
    return;
  }

  navigator.serviceWorker.register('serviceWorker.js').then(
      () => {
        console.log('[SW] Service worker has been registered');
      },
      e => {
        console.error('[SW] Service worker registration failed', e);
        changePushButtonState('incompatible');
      }
  );

  subscriptionButton.addEventListener('click', async function () {
    let serviceWorkerRegistration = await navigator.serviceWorker.ready;
    let subscription = await serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(applicationServerKey),
    })

    push_sendSubscriptionToServer(subscription); // pass subscription here
  });


  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported by this browser');
    changePushButtonState('incompatible');
    return;
  }

  if (!('PushManager' in window)) {
    console.warn('Push notifications are not supported by this browser');
    changePushButtonState('incompatible');
    return;
  }

  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.warn('Notifications are not supported by this browser');
    changePushButtonState('incompatible');
    return;
  }

  // Check the current Notification permission.
  // If its denied, the button should appear as such until the user changes the permission manually
  if (Notification.permission === 'denied') {
    console.warn('Notifications are denied by the user');
    changePushButtonState('incompatible');
  }

  function changePushButtonState(state) {
    switch (state) {
      case 'enabled':
        pushButton.disabled = false;
        pushButton.textContent = 'Disable Push notifications';
        isPushEnabled = true;
        break;
      case 'disabled':
        pushButton.disabled = false;
        pushButton.textContent = 'Enable Push notifications';
        isPushEnabled = false;
        break;
      case 'computing':
        pushButton.disabled = true;
        pushButton.textContent = 'Loading...';
        break;
      case 'incompatible':
        pushButton.disabled = true;
        pushButton.textContent = 'Push notifications are not compatible with this browser';
        break;
      default:
        console.error('Unhandled push button state', state);
        break;
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function checkNotificationPermission() {
    return new Promise((resolve, reject) => {
      if (Notification.permission === 'denied') {
        return reject(new Error('Push messages are blocked.'));
      }

      if (Notification.permission === 'granted') {
        return resolve();
      }

      if (Notification.permission === 'default') {
        return Notification.requestPermission().then(result => {
          if (result !== 'granted') {
            reject(new Error('Bad permission result'));
          } else {
            resolve();
          }
        });
      }

      return reject(new Error('Unknown permission'));
    });
  }

  function enablePush() {
    changePushButtonState('computing');
    checkNotificationPermission()
        .then(() => navigator.serviceWorker.ready)
        .then(serviceWorkerRegistration =>
            serviceWorkerRegistration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(applicationServerKey),
            })
        )
        .then(subscription => {
          console.info('Browser notifications are activated!');
          changePushButtonState('enabled')
        })
        .then(subscription => subscription && changePushButtonState('enabled')) // update your UI
        .catch(e => {
          if (Notification.permission === 'denied') {
            console.warn('Notifications are denied by the user.');
            changePushButtonState('incompatible');
          } else {
            console.error('Impossible to subscribe to push notifications', e);
            changePushButtonState('disabled');
          }
        });
  }

  function disablePush() {
    changePushButtonState('computing');

    // To unsubscribe from push messaging, you need to get the subscription object
    navigator.serviceWorker.ready
        .then(serviceWorkerRegistration => serviceWorkerRegistration.pushManager.getSubscription())
        .then(subscription => {
          changePushButtonState('disabled');
        })
        .then(subscription => subscription.unsubscribe())
        .then(() => changePushButtonState('disabled'))
        .catch(e => {
          // We failed to unsubscribe, this can lead to
          // an unusual state, so  it may be best to remove
          // the users data from your data store and
          // inform the user that you have done so
          console.error('Error when unsubscribing the user', e);
          changePushButtonState('disabled');
        });
  }

  async function getToken() {
    const response = await fetch('http://glue-backend.de.spryker.local/token', {
      method: "POST",
      body: JSON.stringify({
        grantType: "password",
        username: "",
        password: ""
      }),
    });

    return response.json()
  }

  async function push_sendSubscriptionToServer(subscription) {
    const tokenScos = await getToken();
    const accessToken = tokenScos[0].access_token;
    const key = subscription.getKey('p256dh');
    const token = subscription.getKey('auth');

    return fetch('http://glue-backend.de.spryker.local/push-notification-subscriptions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        data: {
          type: "push-notification-subscriptions",
          attributes: {
            providerName: "web-push-php",
            group: {
              name: "warehouse",
              identifier: 1234
            },
            'payload': {
              endpoint: subscription.endpoint,
              publicKey: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
              authToken: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null,
            }
          }
        }
      }),
    }).then(() => subscription);
  }
});
```
</details>

**.../push_notification_spa/serviceWorker.js**

```js
self.addEventListener('push', function (event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    const sendNotification = body => {
        const title = "Web Push example";

        return self.registration.showNotification(title, {
            body,
        });
    };

    if (event.data) {
        const message = event.data.text();
        event.waitUntil(sendNotification(message));
    }
});
```

5. Setup credentials:
   1. Open `.../push_notification_spa/app.js` and replace the `applicationServerKey` variable value with your VAPID public key.
   2. In `.../push_notification_spa/app.js`, find the `getToken()` method and replace the credentials with the user that works in your system. 
6. Run the local HTTP server with the demo app:
```bash
php -S localhost:8000
```

7. To enable the feature in the system, follow the steps written in the integration guide.
8. Enable the push notification by clicking the button on the page.
9. Create the push notification by adding it manually to the `spy_push_notification` database table. Use the same group and notification provider that is used by the subscription.
10. Send the push notification:
```bash
docker/sdk console send-push-notifications
```

11. Depending on the OS, the notification is displayed with content from the `spy_push_notification.payload` database field.
12. Change the subscription expiration date `spy_push_notification_subscription.expired_at` to the previous year's date.
13.  Remove the outdated subscriptions:
```bash
delete-expired-push-notification-subscriptions
```

{% endinfo_block %}


### 6) Set up a cron job

In the cron-job list, enable the `send-push-notifications` and `delete-expired-push-notification-subscriptions` console commands:

**config/Zed/cronjobs/jobs.php**

```php
<?php

/**
 * Notes:
 *
 * - jobs[]['name'] must not contain spaces or any other characters that have to be urlencode()'d
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
2. Make sure that outdated push notification subscriptionв are removed by checking the `spy_push_notification_subscription` database table. Сreate the push notification subscription record with `spy_push_notification_subscription.expired_at` with last year's date.

{% endinfo_block %}