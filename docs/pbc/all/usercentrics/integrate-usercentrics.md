---
title: Integrate Usercentrics
description: Find out how you can integrate Usercentrics in your Spryker shop
template: howto-guide-template
last_updated: Jan 09, 2024
---

To use Usercentrics, you need an account with Usercentrics. To create it, select a [Usercentrics pricing plan](https://usercentrics.com/pricing/) and create an account that lets you access the [Usercentrics Admin Interface](https://admin.usercentrics.eu/).

{% info_block infoBox "Info" %}

You can configure the data processing services and the visual representation of the cookie consent dialogs for your store in the Usercentrics Admin Interface. For details, see the [Usercentrics knowledge base](https://usercentrics.atlassian.net/servicedesk/customer/portals).

{% endinfo_block %}

## Prerequisites

Before you can integrate Usercentrics, make sure that your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

The UserCentrics app requires the following Spryker modules:

* `spryker/asset: ^1.6.0`
* `spryker/asset-storage: ^1.2.1`
* `spryker-shop/asset-widget: ^1.0.0`
* `spryker-shop/shop-ui: ^1.71.0`

## Integration

To integrate Usercentics, follow these steps:

1. In your store's Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
2. Click **Usercentrics**.
   This takes you to the Usercentrics app details page.
3. In the top right corner of the Usercentrics app details page, click **Connect app**.
   This displays a message about the successful integration of the app. The Usercentrics app's status changes to *Connection pending*.

That's it. You have integrated the Usercentrics app into your store. Now, you need to configure it. See [Configure Usercentrics](/docs/pbc/all/usercentrics/configure-usercentrics.html) for details on how to do that.

## Configuration settings

There are three ways to integrate Usecentrics: by direct integration, by the Usercentrics Smart Data Protector, and integration with Google Tag Manager. In the Spryker Back Office, you can select either Smart Data Protector or Google Tag Manager. At the same time, the Smart Data Protector is the preferred and default setting. If you are not using a third-party tracking management tool like [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager) and want a code-free integration, we recommend integrating Usercentrics via Smart Data Protector.

{% info_block infoBox "Info" %}

All of the three approaches require you to get the setting ID for your store in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/) and configure the data processing services on page **Service Settings&nbsp;<span aria-label="and then">></span> Data Processing Services**.

{% endinfo_block %}

### Direct integration

The direct integration requires quite a bit of manual work by developers.

{% info_block infoBox "Info" %}

The direct integration is the most basic and, at the same time, the most cumbersome way of integrating Usercentrics. We do not support the direct integration approach in the ACP, so if you choose it, you should not use the Spryker Usercentrics integration.

{% endinfo_block %}

The direct integration presupposes that you inject the Usercentrics JavaScrip tag into your site with the setting ID.

Example script tag for the direct integration:

```
<script id="usercentrics-cmp" data-settings-id="apXtrZ9ec" src="https://app.usercentrics.eu/browser-ui/latest/bundle.js" defer></script>
```

where `apXtrZ9ec` is the setting ID that identifies configuration of the data processing services for your store in the Usercentrics Admin Interface.

For the direct integration, you have to programmatically deactivate the JavaScript code of all the tracking tools on the shop pages and give tools the names that match those in the Usercentrics Admin Interface.

For more details about the Usercetrics direct integration, see the [Usercentrics documentation](https://docs.usercentrics.com/#/direct-implementation-guide).

### Smart Data Protector

The [Smart Data Protector](https://docs.usercentrics.com/#/smart-data-protector) blocks the data processing services you added to your store and activates them only for customers that gave their consent to do so. The Smart Data Protector is the preferred and default setting to configure Usercentrics using Spryker.

For this setting, the Usercentrics JavaScript tag has to be injected with the setting ID and Smart Data Protector JavaScript code. Once you set up data processing services and got the setting ID for your app from the [Usercentrics Admin Interface](https://admin.usercentrics.eu/), the [Smart Data Protector](https://docs.usercentrics.com/#/smart-data-protector) automatically manages all the tracking tools, and no manual work is required from your side.

{% info_block infoBox "Info" %}

Every data processing service not supported by Usercentrics by default requires a custom manual configuration in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/) and corresponding adaption as for the [Direct Integration](#direct-integration) case. For more information about the custom services, see [Usercentrics documentation on custom data processing services](https://usercentrics.atlassian.net/servicedesk/customer/portal/2/article/185794627).

{% endinfo_block %}

### Google Tag Manager

If you already have the [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager) integrated into your store, to use the technology legally, you need the cookie consent dialog to appear in your stores. You can achieve that by using the Google Tag Manager with Usercentrics.

To use Usercentrics with the Google Tag Manager, make sure the following applies:

- The Usersentrics data processing services match the tracking tools in the [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager). To do that, in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/), go to **Service Settings&nbsp;<span aria-label="and then">></span> Data Processing Services** and define the same data processing services that you have in the Google Tag Manager.

- In the Google Tag Manager UI, configure the variables and triggers to work with Usercentrics. For details about how to do that, see [Google Tag Manager Configuration](https://docs.usercentrics.com/#/browser-sdk-google-tag-manager-configuration).

## Manual Usercentics integration

Follow these steps to integrate Usercentics.

### Configure shared configs

Add the following config to `config/Shared/config_default.php`:

```php
use Spryker\Shared\MessageBroker\MessageBrokerConstants;
use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsConfig;

//...

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...
    AssetAddedTransfer::class => 'asset-commands',
    AssetUpdatedTransfer::class => 'asset-commands',
    AssetDeletedTransfer::class => 'asset-commands',
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...
    'asset-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];
```

### Configure dependencies in `MessageBroker`

Add the following code to `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`:

```php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;
use Spryker\Zed\Asset\Communication\Plugin\MessageBroker\AssetMessageHandlerPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
  /**
    * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
    */
  public function getMessageHandlerPlugins(): array
  {
      return [
          new AssetMessageHandlerPlugin(),
      ];
  }
}
```

### Configure channels in `MessageBroker` configuration

Add the following code to `src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php`:

```php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerConfig as SprykerMessageBrokerConfig;

class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    /**
     * @return array<string>
     */
    public function getDefaultWorkerChannels(): array
    {
        return [
            //...
            'asset-commands',
        ];
    }

    //...
}
```

### Configure dependencies in `Publisher`

Add the following code to `src/Pyz/Zed/Publisher/PublisherDependencyProvider.php`:

```php
namespace Pyz\Zed\Publisher;

use Spryker\Zed\AssetStorage\Communication\Plugin\Publisher\Asset\AssetDeletePublisherPlugin;
use Spryker\Zed\AssetStorage\Communication\Plugin\Publisher\Asset\AssetWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
  /**
   * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
   */
  protected function getAssetStoragePlugins(): array
  {
      return [
          new AssetWritePublisherPlugin(),
          new AssetDeletePublisherPlugin(),
      ];
  }
}
```

### Configure dependencies in `Synchronization`

Add the following code to `src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php`:

```php
namespace Pyz\Zed\Synchronization;

use Spryker\Zed\AssetStorage\Communication\Plugin\Synchronization\AssetStorageSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
  protected function getSynchronizationDataPlugins(): array
  {
      return [
          new AssetStorageSynchronizationDataPlugin(),
      ];
  }
}
```

### Configure RabbitMq in `Client`

Add the following code to `src/Pyz/Client/RabbitMq/RabbitMqConfig.php`:

```php
namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\AssetStorage\AssetStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{  
  protected function getSynchronizationQueueConfiguration(): array
  {
      return [
          AssetStorageConfig::ASSET_SYNC_STORAGE_QUEUE,
      ];
  }
}
```

### Console command for receiving messages

This document describes how to [receive messages](/docs/acp/user/receive-acp-messages.html).

## Next steps

[Configure the Usercentrics app](/docs/pbc/all/usercentrics/configure-usercentrics.html) for your store.
