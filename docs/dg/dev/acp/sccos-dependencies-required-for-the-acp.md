---
title: SCCOS dependencies required for the App Composition Platform
description: Learn about the technical prerequisites required for the App Composition Platform registration.
template: concept-topic-template
last_updated: Jan 09, 2024
redirect_from:
    - /docs/aop/user/intro-to-acp/acp-installation.html
    - /docs/acp/user/app-composition-platform-installation.html
    - /docs/dg/dev/acp/app-composition-platform-installation.html

---

As described in the [App Composition Platform](/docs/dg/dev/acp/acp-overview.html), the App Composition Platform (ACP) registration process includes two steps:
1. Project update to include SCCOS dependencies
2. Infrastructure configuration, which is handled by Spryker.

This document describes how to update your Spryker project with required SCCOS dependencies needed for the ACP.

## Getting your SCCOS project ready for ACP

{% info_block warningBox "Prerequisite" %}

For you to be registered on the App Composition Platform, your project must be hosted in the Spryker Cloud.

{% endinfo_block %}


## SCCOS dependencies for projects on SCCOS product release 202311.0 or later

If your project version corresponds to the SCCOS product release [202311.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202311.0/release-notes-202311.0.html) or later, you can proceed to [Next steps after updating your project with required SCCOS dependencies](#next-steps-after-updating-your-project-with-required-sccos-dependencies).

## SCCOS dependencies for projects on earlier versions
SCCOS product release 202211.0 includes a basic ACP setup. All ACP modules (apps and platform) require updates.

{% info_block infoBox "Product version earlier than 202311.0" %}

If you were onboarded with a version older than product release 202211.0, our team may need to examine your project and provide more support during the upgrade process. Do [contact us](https://support.spryker.com/). 

{% endinfo_block %}

### Dependency 1: Module updates for ACP

To get your project ACP-ready, make sure that your project modules are updated to the required versions.

#### ACP modules

Starting with the Spryker product release [202311.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202311.0/release-notes-202311.0.html), the ACP catalog is included by default in the Spryker Cloud Commerce OS product. If you project's version is earlier than 202311.0, make sure that your Spryker project uses the latest versions of the following modules:

* `spryker/app-catalog-gui: ^1.4.1` or later
* `spryker/message-broker: ^1.11.0` or later
* `spryker/message-broker-aws: ^1.6.0` or later
* `spryker/session: ^4.15.1` or later
* `spryker/oauth-client: ^1.4.0` or later

#### ACP app modules

{% info_block warningBox "Apps- and PBC-specific modules" %}

Depending on the specific ACP apps you intend to use through ACP, you need to add or update the modules for each respective app as explained in the corresponding app guide.

{% endinfo_block %}

The Spryker ACP apps are continuously enhanced with new versions. Though you don't have to update the apps themselves, it might be at times necessary to perform minor updates of the app-related SCCOS modules to take full advantage of the latest app feature updates.

For each app you wish to use, make sure that you have the latest app-related SCCOS modules installed. You can find this information in each app integration guide.

### Dependency 2: Code changes in SCCOS

{% info_block infoBox "This step can be omitted for Product version later than 202311.0" %}

If your version is based on product release [202311.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202311.0/release-notes-202311.0.html) or later, you can skip this section.

{% endinfo_block %}

Once you have made sure that your project modules are up-to-date, configure your SCCOS project to activate the ACP catalog in the Back Office. Do the following:

1. Define the configuration and add plugins to the following files:

<details>
<summary>config/Shared/config_default.php</summary>

```php
use Spryker\Shared\AppCatalogGui\AppCatalogGuiConstants;
use Spryker\Shared\Kernel\KernelConstants;
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
    // Here we will define the transport map accordingly to APP (PBC)
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    // Here we will define the receiver transport map accordingly to APP (PBC)
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    // Here we will define the sender transport map accordingly to APP (PBC)
];

// -------------------------------- ACP AWS --------------------------------------
$config[MessageBrokerAwsConstants::HTTP_CHANNEL_SENDER_BASE_URL] = getenv('SPRYKER_MESSAGE_BROKER_HTTP_CHANNEL_SENDER_BASE_URL') ?: '';
$config[MessageBrokerAwsConstants::HTTP_CHANNEL_RECEIVER_BASE_URL] = getenv('SPRYKER_MESSAGE_BROKER_HTTP_CHANNEL_RECEIVER_BASE_URL') ?: '';

$config[MessageBrokerConstants::IS_ENABLED] = (
    $config[MessageBrokerAwsConstants::HTTP_CHANNEL_SENDER_BASE_URL]
    && $config[MessageBrokerAwsConstants::HTTP_CHANNEL_RECEIVER_BASE_URL]
);

$config[OauthClientConstants::TENANT_IDENTIFIER]
    = $config[MessageBrokerConstants::TENANT_IDENTIFIER]
    = $config[MessageBrokerAwsConstants::CONSUMER_ID]
    = $config[AppCatalogGuiConstants::TENANT_IDENTIFIER]
    = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';

// ----------------------------------------------------------------------------
// ------------------------------ OAUTH ---------------------------------------
// ----------------------------------------------------------------------------
$config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_MESSAGE_BROKER] = OauthAuth0Config::PROVIDER_NAME;
$config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_MESSAGE_BROKER] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_MESSAGE_BROKER] = 'aop-event-platform';

$config[AppCatalogGuiConstants::OAUTH_PROVIDER_NAME] = OauthAuth0Config::PROVIDER_NAME;
$config[AppCatalogGuiConstants::OAUTH_GRANT_TYPE] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[AppCatalogGuiConstants::OAUTH_OPTION_AUDIENCE] = 'aop-atrs';
```
</details>

2. In the `navigation.xml` file, add one more navigation item:

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

3. In the `MessageBrokerDependencyProvider.php` file, enable the following module plugins:

{% info_block infoBox "Deprecated plugins" %}

Make sure that you have no deprecated plugins enabled. Ideally, the content of each of the methods listed below should exactly match the provided example.

{% endinfo_block %}

<details>
<summary>src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MessageBroker;

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
}
```
</details>

4. In the `MessageBrokerAwsDependencyProvider.php` file, enable the following module plugins:

<details>
<summary>src/Pyz/Zed/MessageBrokerAws/MessageBrokerAwsDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

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

5. In the `OauthClientDependencyProvider.php` file, enable the following module plugins:

{% info_block infoBox "Deprecated plugins" %}

Make sure that you have no deprecated plugins enabled. Ideally, the content of each of the methods listed below should exactly match the provided example.

{% endinfo_block %}

<details>
<summary>src/Pyz/Zed/OauthClient/OauthClientDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

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

## Next steps after updating your project with required SCCOS dependencies

After configuring the files and updating all modules, the SCCOS codebase is now up-to-date. Once redeployed, your environment will be ACP-ready.

The next step is to get your newly updated and deployed ACP-ready SCCOS environment ACP-enabled. In this step, Spryker registers SCCOS environment with ACP by connecting it with the ACP App-Tenant-Registry-Service (ATRS) as well as the Event Platform (EP) so that the ACP catalog is able to work with SCCOS.

To get your project ACP-enabled, contact the [Spryker support](https://spryker.com/support/).

Once all the steps of the ACP-enablement process are completed, the ACP catalog appears in the Back Office:

![acp-catalog](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/app-orchestration-platform-overview/aop-catalog.png)


{% info_block infoBox "Using ACP Apps" %}

After getting your project enabled and registered for ACP, there may be specific requirements needed for different ACP apps. Check the App page more for information.

{% endinfo_block %}
