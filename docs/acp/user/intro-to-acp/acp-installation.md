---
title: App Composition Platform Installation
description: Learn how to install the App Orchestration Platform.
template: concept-topic-template
redirect_from:
    - /docs/aop/user/intro-to-acp/acp-installation.html
---

The App Composition Platform (ACP) lets Spryker Cloud customers connect, configure, and use the available third-party services or apps, in their application with a click of a button, without development efforts from their side.

# Installing ACP in SCOS

{% info_block warningBox "" %}

Your project must be hosted in the Spryker Cloud.

{% endinfo_block %}

The ACP catalog is embedded inside the Back Office containing the list of applications you can connect to your shop.
You can access the ACP catalog for now only if you are a SCOS customer and have been enabled for ACP, which means that your SCOS is properly set up and registered with the ACP.

The process of installing ACP on SCOS is also called **ACP Enablement**. It is a multi-step process for now, which requires steps to be taken by you as well as Spryker. In the first step it requires your SCOS to be **ACP-Ready**, meaning that the required ACP modules are up-to-date and the SCOS Cloud environment is configured correctly. The second step is registering your SCOS with the Spryker's ACP, so that SCOS is **ACP-Enabled** and the ACP Catalog in the backoffice can interact with ACP. This enables you to browse, connect, configure all ACP applications for use with SCOS.

![ACP_enablement_simple](/docs/_drafts/ACP_enablement_flow_simple_20230504.png)


The diagram above outlines the different steps and responsibilities for executing them.

Depending on the update status of your SCOS module versions, the type of actions and associated effort to update it to be ACP-Ready may vary. The 2nd step to be ACP-Enabled will always be handled by Spryker.

Once you completed all the steps, the ACP catalog will appear in the Back Office:

![acp-catalog](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/app-orchestration-platform-overview/aop-catalog.png)

## Getting SCOS ACP-Ready

As mentioned before, the first step to install ACP on SCOS is to get SCOS ACP-Ready. This itself requires different update steps depending on the template version on which your project was started.

- **SCOS Product Release [202211.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202211.0/release-notes-202211.0.html)**: All changes are included for out-of-the-box ACP-Readiness, but also need to be verified on the project level
- **Older versions**: All steps required are for ACP-Readiness

If you were onboarded with a version older than Product Release [202211.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202211.0/release-notes-202211.0.html), please [contact us](https://support.spryker.com/). 

### 1. Module updates for ACP

#### 1. ACP modules

The ACP catalog is included by default to the Spryker Cloud product starting with the Spryker Product Release [202211.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202211.0/release-notes-202211.0.html). 

However, in any case youe should make sure that your Spryker project is using the latest versions of the following modules in your Spryker project:

* `spryker/app-catalog-gui: ^1.2.0` or higher
* `spryker/message-broker:^1.4.0` or higher
* `spryker/message-broker-aws:^1.3.2` or higher
* `spryker/session:^4.15.1` or higher


#### 2. App modules

{% info_block warningBox "" %}

Depending on the specific ACP Apps or PBCs you would like to use via ACP you will have to add or update the modules for each respective App or PBC as detailed in the guide for each app.

{% endinfo_block %}

The Spryker ACP Apps are continously extended and improved with new versions. Though you do not have to update the apps themselves, it might be at times necessary to perform minor updates of the app-related SCOS modules to take full advantage of the latest app feature updates.

For each app you would like to use please ensure you have the latest app-related SCOS modules installed.

- [Algolia](/docs/pbc/all/search/{{site.version}}/third-party-integrations/algolia.html), a Search Engine
- [Payone](/docs/pbc/all/payment-service-providers/payone/payone.html), a Payment Service Provider (PSP)
- [Usercentrics](/docs/pbc/all/usercentrics/usercentrics.html), a Consent Management Platform (CMP)
- [Bazaarvoice](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/bazaarvoice.html), a platform for User-Generated Content (UGC)

### 2. Configure SCOS to activate the ACP catalog in the Back Office 

#### 1. Define the configuration and add plugins to the following files

<details open>
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
$config[StoreConstants::STORE_NAME_REFERENCE_MAP] = $aopApplicationConfiguration['STORE_NAME_REFERENCE_MAP'] ?? [];
$config[AppCatalogGuiConstants::APP_CATALOG_SCRIPT_URL] = $aopApplicationConfiguration['APP_CATALOG_SCRIPT_URL'] ?? '';

$aopAuthenticationConfiguration = json_decode(html_entity_decode((string)getenv('SPRYKER_AOP_AUTHENTICATION')), true);
$config[OauthAuth0Constants::AUTH0_CUSTOM_DOMAIN] = $aopAuthenticationConfiguration['AUTH0_CUSTOM_DOMAIN'] ?? '';
$config[OauthAuth0Constants::AUTH0_CLIENT_ID] = $aopAuthenticationConfiguration['AUTH0_CLIENT_ID'] ?? '';
$config[OauthAuth0Constants::AUTH0_CLIENT_SECRET] = $aopAuthenticationConfiguration['AUTH0_CLIENT_SECRET'] ?? '';

$config[MessageBrokerConstants::CHANNEL_TO_TRANSPORT_MAP] =
$config[MessageBrokerAwsConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    // Here we will define the receiver transport map accordinally to APP (PBC)
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    // Here we will define the sender transport map accordinally to APP (PBC)
];

$aopInfrastructureConfiguration = json_decode(html_entity_decode((string)getenv('SPRYKER_AOP_INFRASTRUCTURE')), true);

$config[MessageBrokerAwsConstants::SQS_RECEIVER_CONFIG] = json_encode($aopInfrastructureConfiguration['SPRYKER_MESSAGE_BROKER_SQS_RECEIVER_CONFIG'] ?? []);
$config[MessageBrokerAwsConstants::HTTP_SENDER_CONFIG] = $aopInfrastructureConfiguration['SPRYKER_MESSAGE_BROKER_HTTP_SENDER_CONFIG'] ?? [];

// ----------------------------------------------------------------------------
// ------------------------------ OAUTH ---------------------------------------
// ----------------------------------------------------------------------------
$config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_MESSAGE_BROKER] = OauthAuth0Config::PROVIDER_NAME;
$config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_MESSAGE_BROKER] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_MESSAGE_BROKER] = 'aop-event-platform';

$config[AppCatalogGuiConstants::OAUTH_PROVIDER_NAME] = OauthAuth0Config::PROVIDER_NAME;
$config[AppCatalogGuiConstants::OAUTH_GRANT_TYPE] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[AppCatalogGuiConstants::OAUTH_OPTION_AUDIENCE] = 'aop-atrs';

$config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_PAYMENT_AUTHORIZE] = OauthAuth0Config::PROVIDER_NAME;
$config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_PAYMENT_AUTHORIZE] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_PAYMENT_AUTHORIZE] = 'aop-app';
```
</details>

#### 2. Add one more navigation item to the navigation.xml file:

<details open>
<summary>config/Zed/navigation.xml</summary>

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
</details>

#### 3. In the MessageBrokerDependencyProvider.php, enable the following module plugins:

<details open>
<summary>src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\CorrelationIdMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TimestampMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TransactionIdMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\ValidationMiddlewarePlugin;
use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;
use Spryker\Zed\MessageBrokerAws\Communication\Plugin\MessageBroker\Receiver\AwsSqsMessageReceiverPlugin;
use Spryker\Zed\MessageBrokerAws\Communication\Plugin\MessageBroker\Sender\AwsSnsMessageSenderPlugin;
use Spryker\Zed\MessageBrokerAws\Communication\Plugin\MessageBroker\Sender\AwsSqsMessageSenderPlugin;
use Spryker\Zed\MessageBrokerAws\Communication\Plugin\MessageBroker\Sender\HttpMessageSenderPlugin;
use Spryker\Zed\OauthClient\Communication\Plugin\MessageBroker\AccessTokenMessageAttributeProviderPlugin;
use Spryker\Zed\Session\Communication\Plugin\MessageBroker\SessionTrackingIdMessageAttributeProviderPlugin;
use Spryker\Zed\Store\Communication\Plugin\MessageBroker\CurrentStoreReferenceMessageAttributeProviderPlugin;
use Spryker\Zed\Store\Communication\Plugin\MessageBroker\StoreReferenceMessageValidatorPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageSenderPluginInterface>
     */
    public function getMessageSenderPlugins(): array
    {
        return [
            new AwsSnsMessageSenderPlugin(),
            new AwsSqsMessageSenderPlugin(),
            new HttpMessageSenderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageReceiverPluginInterface>
     */
    public function getMessageReceiverPlugins(): array
    {
        return [
            new AwsSqsMessageReceiverPlugin(),
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
            new CurrentStoreReferenceMessageAttributeProviderPlugin(),
            new AccessTokenMessageAttributeProviderPlugin(),
            new TransactionIdMessageAttributeProviderPlugin(),
            new SessionTrackingIdMessageAttributeProviderPlugin(),
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
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageValidatorPluginInterface>
     */
    public function getExternalValidatorPlugins(): array
    {
        return [
            new StoreReferenceMessageValidatorPlugin(),
        ];
    }
}
```
</details>

#### 4. In the MessageBrokerConfig.php, adjust the following module config:
<details open>
<summary>src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MessageBroker;

use Generated\Shared\Transfer\MessageAttributesTransfer;
use Spryker\Zed\MessageBroker\MessageBrokerConfig as SprykerMessageBrokerConfig;

class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    /**
     * Defines attributes which should not be logged.
     *
     * @api
     *
     * @return array<string>
     */
    public function getProtectedMessageAttributes(): array
    {
        return [
            MessageAttributesTransfer::AUTHORIZATION,
        ];
    }
}
```
</details>

#### 5. In the OauthClientDependencyProvider.php, enable the following module plugins:
In the MessageBrokerConfig.php, adjust the following module config:
<details open>
<summary>src/Pyz/Zed/OauthClient/OauthClientDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OauthClient;

use Spryker\Zed\OauthAuth0\Communication\Plugin\OauthClient\Auth0OauthAccessTokenProviderPlugin;
use Spryker\Zed\OauthClient\OauthClientDependencyProvider as SprykerOauthClientDependencyProvider;
use Spryker\Zed\OauthDummy\Communication\Plugin\OauthClient\DummyOauthAccessTokenProviderPlugin;
use Spryker\Zed\Store\Communication\Plugin\OauthClient\CurrentStoreReferenceAccessTokenRequestExpanderPlugin;

class OauthClientDependencyProvider extends SprykerOauthClientDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\OauthClientExtension\Dependency\Plugin\OauthAccessTokenProviderPluginInterface>
     */
    protected function getOauthAccessTokenProviderPlugins(): array
    {
        return [
            new DummyOauthAccessTokenProviderPlugin(),
            new Auth0OauthAccessTokenProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthClientExtension\Dependency\Plugin\AccessTokenRequestExpanderPluginInterface>
     */
    protected function getAccessTokenRequestExpanderPlugins(): array
    {
        return [
            new CurrentStoreReferenceAccessTokenRequestExpanderPlugin(),
        ];
    }
}
```
</details>

### 3. Update the SCOS deploy.yml file

You need to define the environment variables in the `deploy.yml` file of **each** SCOS environment (i.e. testing, staging, production)

The following environment variables must be configured to be used within your SCOS AWS environment.

Configuration keys used to be variable names. There will be multiple general environment variables that in turn will contain several configurations. 

**NOTE**: The environment variable keys must be added by you and the infrastructure values (fifo queue names) will be provided by Spryker Ops upon request.

<details open>
<summary>General Structure</summary>

```json
ENVIRONMENT_VARIABLE_NAME_A:{
  "CONFIGURATION_KEY_A":"SOME_VALUE_A",
  "CONFIGURATION_KEY_B":"SOME_VALUE_B"
}
```
</details>

<details open>
<summary>Data Structure Example for a Demo Environment connected to Spryker ACP Production</summary>

```json
#AOP
SPRYKER_AOP_APPLICATION: '{
  "APP_CATALOG_SCRIPT_URL": "https://app-catalog.atrs.spryker.com/loader",
  "STORE_NAME_REFERENCE_MAP": {"DE": "tenant_messages_for_store_reference_AOP_Demo_Production-DE.fifo", "AT": "tenant_messages_for_store_reference_AOP_Demo_Production-AT.fifo"},
  "APP_DOMAINS": [
      "os.apps.aop.spryker.com",
      "*.bazaarvoice.com"
  ]
}'

SPRYKER_AOP_INFRASTRUCTURE: '{
  "SPRYKER_MESSAGE_BROKER_HTTP_SENDER_CONFIG": {
        "endpoint":"https:\/\/events.atrs.spryker.com\/events\/tenant"
  },
  "SPRYKER_MESSAGE_BROKER_SQS_RECEIVER_CONFIG": {
    "default": {
        "endpoint":"https:\/\/sqs.eu-central-1.amazonaws.com",
        "region":"eu-central-1",
        "auto_setup":false,
        "buffer_size":1
    },
      "DE": {
        "queue_name":"tenant_messages_for_store_reference_AOP_Demo_Production-DE.fifo"
    },
    "AT": {
        "queue_name":"tenant_messages_for_store_reference_AOP_Demo_Production-AT.fifo"
    }
  }
}'
```
</details>

#### General configurations

**Variable name**: `SPRYKER_AOP_APPLICATION`

**1. Configuration key**: `APP_CATALOG_SCRIPT_URL`

**Explanation**: URL for the App-Tenant-Registry-Service (ATRS) and path to the JS script to load the ACP catalog

<details open>
<summary>Value: Production ATRS_HOST and path</summary>

```json
https://app-catalog.atrs.spryker.com/loader
```
</details>

**2. Configuration key**: `STORE_NAME_REFERENCE_MAP`

**Explanation**: StoreReference mapping to the appropriate Spryker Store

**NOTE**: StoreReference mapping will be created by Spryker Ops and values provided by them for you to add!

<details open>
<summary>Value Example: Demo Stores for DE and AT</summary>

```json
{"DE": "tenant_messages_for_store_reference_AOP_Demo_Production-DE", "AT": "tenant_messages_for_store_reference_AOP_Demo_Production-AT"}
```
</details>

**3. Configuration key**: `APP_DOMAINS`

**Explanation**: App domains used in redirects.

**NOTE**: Value must be provided by Spryker Ops!

<details open>
<summary>Value Example</summary>

```json
[
  "os.apps.aop.spryker.com",
  "*.bazaarvoice.com"
]
```
</details>

#### Message Broker configuration

**Variable name**: `SPRYKER_AOP_INFRASTRUCTURE`

**1. Configuration key**: `SPRYKER_MESSAGE_BROKER_SQS_RECEIVER_CONFIG`

**Explanation**: Receiver configuration. The queues must be defined for each store (or default queue for all stores is used)

**NOTE**: Queues will be created by Spryker Ops and values provided by them for you to add!

<details open>
<summary>Value Example: Spryker Production Environment</summary>

```json
{
  "default": {
    "endpoint":"https://sqs.eu-central-1.amazonaws.com",
    "auto_setup":false, "buffer_size":1
  },
  "DE": {
    "queue_name":"tenant_messages_for_store_reference_AOP_Demo_Production-DE.fifo"
  },
  "<Store>": {
    "queue_name":"queue_name_for_store_reference_<Store>"
  }
}
```
</details>

**2. Configuration key**: `SPRYKER_MESSAGE_BROKER_HTTP_SENDER_CONFIG`

<details open>
<summary>Value Example: Spryker Production Environment</summary>

```json
{
    "endpoint":"https://events.atrs.spryker.com/events/tenant"
}
```
</details>

## Next Steps After ACP-Readiness
Now that the files have been configured, all modules updated, and the keys in the `deploy.yml` file were created and the completed with values provided by Spryker  Ops, the SCOS codebase is up-to-date and once re-deloyed your environment is **ACP-Ready**!

The next step is to get your newly updated and deployed **ACP-Ready SCOS** environment **ACP-Enabled**.

The next step will be fully handled by Spryker and consists of the registration of your **ACP-Ready SCOS** environment with the ACP by connecting it with the ACP App-Tenant-Registry-Service (ATRS) as well as the Event Platform (EP) so that the ACP Catalog is able to work with SCOS.

Please contact Spryker support to get **ACP-Enabled**