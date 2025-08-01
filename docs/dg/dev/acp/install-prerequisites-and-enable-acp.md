---
title: Install prerequisites and enable ACP
description: Learn about the technical prerequisites required for the App Composition Platform registration.
template: concept-topic-template
last_updated: Jul 24, 2025
redirect_from:
    - /docs/aop/user/intro-to-acp/acp-installation.html
    - /docs/acp/user/app-composition-platform-installation.html
    - /docs/dg/dev/acp/app-composition-platform-installation.html
    - docs/dg/dev/acp/sccos-dependencies-required-for-the-acp.html
---

This document describes how to make your project ready and enabled for ACP.


## Platform prerequisites

Your project is running in Spryker Cloud.

## Install prerequisites for projects version 202211.0

Update modules and set up the configuration as described in the following sections.

### Update modules

Update the following modules to meet the ACP requirements:

- `spryker/app-catalog-gui:^1.4.1`
- `spryker/kernel-app:^1.4.0`
- `spryker/message-broker:^1.15.0`
- `spryker/message-broker-aws:^1.9.0`
- `spryker/session:^4.15.1`
- `spryker/oauth-client:^1.5.0`
- `spryker/oauth-auth0:^1.1.1`


{% info_block infoBox "ACP app modules" %}

When installing an ACP app, make sure to follow the provided guide to install and update the modules required by the app.

When a new version of app is released, you don't need to update it. However, you may need to update modules that are related to an app.

{% endinfo_block %}


### Add plugins and configuration

1. Define the following configuration and add plugins:

<details>
  <summary>config/Shared/config_default.php</summary>

```php
use Spryker\Shared\AppCatalogGui\AppCatalogGuiConstants;
use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\KernelApp\KernelAppConstants;
use Spryker\Shared\MessageBroker\MessageBrokerConstants;
use Spryker\Shared\MessageBrokerAws\MessageBrokerAwsConstants;
use Spryker\Shared\OauthAuth0\OauthAuth0Constants;
use Spryker\Shared\OauthClient\OauthClientConstants;
use Spryker\Shared\Store\StoreConstants;
use Spryker\Zed\OauthAuth0\OauthAuth0Config;

...

// ----------------------------------------------------------------------------
// ------------------------------ ACP -----------------------------------------
// ----------------------------------------------------------------------------
$aopApplicationConfiguration = json_decode(html_entity_decode((string)getenv('SPRYKER_AOP_APPLICATION')), true);
$config[KernelConstants::DOMAIN_WHITELIST] = array_merge(
    $config[KernelConstants::DOMAIN_WHITELIST],
    $aopApplicationConfiguration['APP_DOMAINS'] ?? [],
);
$config[AppCatalogGuiConstants::APP_CATALOG_SCRIPT_URL] = $aopApplicationConfiguration['APP_CATALOG_SCRIPT_URL'] ?? '';

$aopAuthenticationConfiguration = json_decode(html_entity_decode((string)getenv('SPRYKER_AOP_AUTHENTICATION')), true);
$config[OauthAuth0Constants::AUTH0_CUSTOM_DOMAIN] = $aopAuthenticationConfiguration['AUTH0_CUSTOM_DOMAIN'] ?? '';
$config[OauthAuth0Constants::AUTH0_CLIENT_ID] = $aopAuthenticationConfiguration['AUTH0_CLIENT_ID'] ?? '';
$config[OauthAuth0Constants::AUTH0_CLIENT_SECRET] = $aopAuthenticationConfiguration['AUTH0_CLIENT_SECRET'] ?? '';

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    AppConfigUpdatedTransfer::class => 'app-events',
    // Here we will define the correspondence of messages to channels for ACP
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    'app-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    // Here we will define the receiver transport map accordingly to APP
];

$config[MessageBrokerConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    // Here we will define the sender transport map accordingly to APP
];

// -------------------------------- ACP AWS --------------------------------------
$config[MessageBrokerAwsConstants::HTTP_CHANNEL_SENDER_BASE_URL] = getenv('SPRYKER_MESSAGE_BROKER_HTTP_CHANNEL_SENDER_BASE_URL') ?: '';
$config[MessageBrokerAwsConstants::HTTP_CHANNEL_RECEIVER_BASE_URL] = getenv('SPRYKER_MESSAGE_BROKER_HTTP_CHANNEL_RECEIVER_BASE_URL') ?: '';

$config[MessageBrokerConstants::IS_ENABLED] = (
    $config[MessageBrokerAwsConstants::HTTP_CHANNEL_SENDER_BASE_URL]
    && $config[MessageBrokerAwsConstants::HTTP_CHANNEL_RECEIVER_BASE_URL]
);

$config[KernelAppConstants::TENANT_IDENTIFIER]
    = $config[MessageBrokerConstants::TENANT_IDENTIFIER]
    = $config[MessageBrokerAwsConstants::CONSUMER_ID]
    = $config[OauthClientConstants::TENANT_IDENTIFIER]
    = $config[AppCatalogGuiConstants::TENANT_IDENTIFIER]
    = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';

// ----------------------------------------------------------------------------
// ------------------------------ OAUTH ---------------------------------------
// ----------------------------------------------------------------------------
$config[AppCatalogGuiConstants::OAUTH_PROVIDER_NAME]
    = $config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_ACP]
    = $config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_MESSAGE_BROKER]
    = $config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_PAYMENT_AUTHORIZE]
    = OauthAuth0Config::PROVIDER_NAME;

$config[AppCatalogGuiConstants::OAUTH_GRANT_TYPE]
    = $config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_ACP]
    = $config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_MESSAGE_BROKER]
    = $config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_PAYMENT_AUTHORIZE]
    = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;

$config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_ACP]
    = $config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_PAYMENT_AUTHORIZE]
    = 'aop-app';

$config[AppCatalogGuiConstants::OAUTH_OPTION_AUDIENCE] = 'aop-atrs';
$config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_MESSAGE_BROKER] = 'aop-event-platform';
```

</details>

2. In `navigation.xml`, add the following navigation items:

```xml
...
  <app-catalog-gui>
      <label>Apps</label>
      <title>Apps</title>
      <icon>fa-cubes</icon>
      <bundle>app-catalog-gui</bundle>
      <controller>index</controller>
      <action>index</action>
  </app-catalog-gui>
...
```

3. In `MessageBrokerDependencyProvider.php`, enable the following module plugins:

| PLUGIN | REQUIRED | DESCRIPTION |
| - | - | - |
| AppConfigMessageHandlerPlugin | Yes | Handles application configuration messages for ACP apps. |
| HttpChannelMessageSenderPlugin | Yes | Sends messages through HTTP channel transport. |
| HttpChannelMessageReceiverPlugin | Yes | Receives messages through HTTP channel transport. |
| CorrelationIdMessageAttributeProviderPlugin | Yes | Adds a correlation ID to message attributes for tracking. |
| TimestampMessageAttributeProviderPlugin | Yes | Adds a timestamp to message attributes. |
| AccessTokenMessageAttributeProviderPlugin | Yes | Adds an OAuth access token to message attributes. |
| TransactionIdMessageAttributeProviderPlugin | Yes | Adds a transaction ID to message attributes. |
| SessionTrackingIdMessageAttributeProviderPlugin | Yes | Adds a session tracking ID to message attributes. |
| TenantActorMessageAttributeProviderPlugin | Yes | Adds tenant actor information to message attributes. |
| ValidationMiddlewarePlugin | Yes | Validates messages before processing. |
| ActiveAppFilterMessageChannelPlugin | Yes | Filters message channels based on active apps. |

{% info_block infoBox "Disable deprecated plugins" %}

Make sure that no deprecated plugins are enabled. Ideally, the content of each of the methods listed below should exactly match the provided example.

{% endinfo_block %}

<details>
  <summary>src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php</summary>

```php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\KernelApp\Communication\Plugin\MessageBroker\ActiveAppFilterMessageChannelPlugin;
use Spryker\Zed\KernelApp\Communication\Plugin\MessageBroker\AppConfigMessageHandlerPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\CorrelationIdMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TenantActorMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TimestampMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TransactionIdMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\ValidationMiddlewarePlugin;
use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;
use Spryker\Zed\MessageBrokerAws\Communication\Plugin\MessageBroker\Sender\HttpChannelMessageSenderPlugin;
use Spryker\Zed\OauthClient\Communication\Plugin\MessageBroker\AccessTokenMessageAttributeProviderPlugin;
use Spryker\Zed\Session\Communication\Plugin\MessageBroker\SessionTrackingIdMessageAttributeProviderPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
     */
    public function getMessageHandlerPlugins(): array
    {
        return [
            new AppConfigMessageHandlerPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageSenderPluginInterface>
     */
    public function getMessageSenderPlugins(): array
    {
        return [
            new HttpChannelMessageSenderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageReceiverPluginInterface>
     */
    public function getMessageReceiverPlugins(): array
    {
        return [
            new HttpChannelMessageReceiverPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageAttributeProviderPluginInterface>
     */
    public function getMessageAttributeProviderPlugins(): array
    {
        return [
            new CorrelationIdMessageAttributeProviderPlugin(),
            new TimestampMessageAttributeProviderPlugin(),
            new AccessTokenMessageAttributeProviderPlugin(),
            new TransactionIdMessageAttributeProviderPlugin(),
            new SessionTrackingIdMessageAttributeProviderPlugin(),
            new TenantActorMessageAttributeProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MiddlewarePluginInterface>
     */
    public function getMiddlewarePlugins(): array
    {
        return [
            new ValidationMiddlewarePlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\FilterMessageChannelPluginInterface>
     */
    public function getFilterMessageChannelPlugins(): array
    {
        return [
            new ActiveAppFilterMessageChannelPlugin(),
        ];
    }
}
```

</details>

4. In `MessageBrokerAwsDependencyProvider.php`, enable the following module plugins:

| PLUGIN | REQUIRED | DESCRIPTION |
| - | - | - |
| ConsumerIdHttpChannelMessageConsumerRequestExpanderPlugin | Yes | Expands HTTP channel requests with consumer ID information. |
| AccessTokenHttpChannelMessageReceiverRequestExpanderPlugin | Yes | Expands HTTP channel receiver requests with an OAuth access token. |

<details>
  <summary>src/Pyz/Zed/MessageBrokerAws/MessageBrokerAwsDependencyProvider.php</summary>

```php
namespace Pyz\Zed\MessageBrokerAws;

use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBrokerAws\Expander\ConsumerIdHttpChannelMessageConsumerRequestExpanderPlugin;
use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsDependencyProvider as SprykerMessageBrokerAwsDependencyProvider;
use Spryker\Zed\OauthClient\Communication\Plugin\MessageBrokerAws\HttpChannelRequestExpanderPlugin;

class MessageBrokerAwsDependencyProvider extends SprykerMessageBrokerAwsDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MessageBrokerAwsExtension\Dependency\Plugin\HttpChannelMessageReceiverRequestExpanderPluginInterface>
     */
    protected function getHttpChannelMessageReceiverRequestExpanderPlugins(): array
    {
        return [
            new ConsumerIdHttpChannelMessageReceiverRequestExpanderPlugin(),
            new AccessTokenHttpChannelMessageReceiverRequestExpanderPlugin(),
        ];
    }
}
```

</details>

5. In `MessageBrokerConfig.php`, configure the default worker channels for the system events channel to be enabled:

<details>
  <summary>src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php</summary>

```php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerConfig as SprykerMessageBrokerConfig;

class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    /**
     * @return list<string>
     */
    public function getDefaultWorkerChannels(): array
    {
        return [
            'app-events',
            //...
        ];
    }
    
    /**
     * @return list<string>
     */
    public function getSystemWorkerChannels(): array
    {
        return [
            'app-events',
        ];
    }

    //...
}
```

</details>

6. In `OauthClientDependencyProvider.php`, enable the following module plugins:

| PLUGIN | REQUIRED | DESCRIPTION |
| - | - | - |
| Auth0OauthAccessTokenProviderPlugin | Yes | Adds the Auth0 OAuth access token provider. |
| CacheKeySeedAccessTokenRequestExpanderPlugin | Yes | Expands the OAuth request with a cache key seed. |
| TenantIdentifierAccessTokenRequestExpanderPlugin | Yes | Expands the OAuth request with a tenant identifier. |

<details>
  <summary>src/Pyz/Zed/OauthClient/OauthClientDependencyProvider.php</summary>

```php
namespace Pyz\Zed\OauthClient;

use Spryker\Zed\MessageBroker\Communication\Plugin\OauthClient\TenantIdentifierAccessTokenRequestExpanderPlugin;
use Spryker\Zed\OauthAuth0\Communication\Plugin\OauthClient\Auth0OauthAccessTokenProviderPlugin;
use Spryker\Zed\OauthAuth0\Communication\Plugin\OauthClient\CacheKeySeedAccessTokenRequestExpanderPlugin;
use Spryker\Zed\OauthClient\OauthClientDependencyProvider as SprykerOauthClientDependencyProvider;

class OauthClientDependencyProvider extends SprykerOauthClientDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\OauthClientExtension\Dependency\Plugin\OauthAccessTokenProviderPluginInterface>
     */
    protected function getOauthAccessTokenProviderPlugins(): array
    {
        return [
            new Auth0OauthAccessTokenProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthClientExtension\Dependency\Plugin\AccessTokenRequestExpanderPluginInterface>
     */
    protected function getAccessTokenRequestExpanderPlugins(): array
    {
        return [
            new CacheKeySeedAccessTokenRequestExpanderPlugin(),
            new TenantIdentifierAccessTokenRequestExpanderPlugin(),
        ];
    }
}
```

</details>

7. In `OauthClientConfig.php`, configure the flag to expand the access token request with message attributes:

<details>
  <summary>src/Pyz/Zed/OauthClient/OauthClientConfig.php</summary>

```php
namespace Pyz\Zed\OauthClient;

use Spryker\Zed\OauthClient\OauthClientConfig as SprykerOauthClientConfig;

class OauthClientConfig extends SprykerOauthClientConfig
{
    /**
     * @api
     *
     * @return bool
     */
    public function isAccessTokenRequestExpandedByMessageAttributes(): bool
    {
        return true;
    }
}
```

</details>


8. In `KernelAppDependencyProvider.php`, enable the following module plugins:

| PLUGIN | REQUIRED | DESCRIPTION |
| - | - | - |
| OAuthRequestExpanderPlugin | Yes | Expands requests with an OAuth token. |
| MerchantAppRequestExpanderPlugin | No | Expands requests with merchant app data. Only relevant for marketplace projects with Merchant Portal. |

<details>
  <summary>src/Pyz/Zed/KernelApp/KernelAppDependencyProvider.php</summary>

```php
namespace Pyz\Zed\KernelApp;

use Spryker\Zed\KernelApp\KernelAppDependencyProvider as SprykerKernelAppDependencyProvider;
use Spryker\Zed\MerchantApp\Communication\Plugin\KernelApp\MerchantAppRequestExpanderPlugin;
use Spryker\Zed\OauthClient\Communication\Plugin\KernelApp\OAuthRequestExpanderPlugin;

class KernelAppDependencyProvider extends SprykerKernelAppDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\KernelAppExtension\RequestExpanderPluginInterface>
     */
    public function getRequestExpanderPlugins(): array
    {
        return [
            new OAuthRequestExpanderPlugin(),
            new MerchantAppRequestExpanderPlugin(), // Optional: Only for marketplace projects with Merchant Portal
        ];
    }
}
```

</details>

9. In `ConsoleDependencyProvider.php`, register the message broker worker console command:

<details>
  <summary>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>

```php
namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\MessageBroker\Communication\Plugin\Console\MessageBrokerWorkerConsole;

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
            // ... other console commands
            new MessageBrokerWorkerConsole(),
        ];
    }
}
```

</details>

10. Configure the cron job for automatic message consuming by adding the following to your deployment configuration:

<details>
  <summary>config/Zed/cronjobs/jenkins.php</summary>

```php
/* Message broker */
if (\Spryker\Shared\Config\Config::get(\Spryker\Shared\MessageBroker\MessageBrokerConstants::IS_ENABLED)) {
    $jobs[] = [
        'name' => 'message-broker-consume-channels',
        'command' => '$PHP_BIN vendor/bin/console message-broker:consume --time-limit=15 --sleep=5',
        'schedule' => '* * * * *',
        'enable' => true,
    ];
}
```

</details>

If you want to execute it manually or customize the message consuming process, see [Receive ACP messages](/docs/dg/dev/acp/receive-acp-messages.html).


## Install prerequisites for projects with version earlier than 202211.0

We'll need to analyze your project and provide you with specific instructions, [contact us](https://support.spryker.com/).


## Register your project with ACP

Once redeployed with the added changes, your environment is ACP-ready.

To get your project ACP-enabled, [contact support](https://spryker.com/support/). In this step, we enable your project to communicate with ACP by connect your environment with ACP App-Tenant-Registry-Service and Event Platform.

Once all the steps of the ACP-enablement process are completed, the ACP catalog is displayed in the Back Office:

![acp-catalog](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/app-orchestration-platform-overview/aop-catalog.png)


## Next steps

Once you're ready to install ACP apps, make sure to check the installation guides and the requirements on the page of each app.
