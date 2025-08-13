---
title: Integrate Usercentrics
description: Learn how you can integrate Spryker Third Party Usercentrics in to your Spryker based shop
template: howto-guide-template
redirect_from:
last_updated: Jan 09, 2024
---

To use Usercentrics, you need an account with Usercentrics. To create it, select a [Usercentrics pricing plan](https://usercentrics.com/pricing/) and create an account that lets you access the [Usercentrics Admin Interface](https://admin.usercentrics.eu/).

{% info_block infoBox "Info" %}

You can configure the data processing services and the visual representation of the cookie consent dialogs for your store in the Usercentrics Admin Interface. For details, see the [Usercentrics knowledge base](https://usercentrics.atlassian.net/servicedesk/customer/portals).

{% endinfo_block %}

## Prerequisites

- Before you can integrate Usercentrics, make sure that your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

- The UserCentrics app requires the following Spryker modules:

* `spryker/asset: ^1.6.0`
* `spryker/asset-storage: ^1.2.1`
* `spryker-shop/asset-widget: ^1.0.0`
* `spryker-shop/shop-ui: ^1.71.0`

Make sure your installation meets these requirements.

## Integrate Usercentrics

To integrate Usercentics, follow these steps.

### 1. Configure shared configs

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

### 2. Configure dependencies in `MessageBroker`

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

### 3. Configure channels in `MessageBroker` configuration

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

### 4. Configure dependencies in `Publisher`

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

### 5. Configure dependencies in `Synchronization`

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

### 6. Configure RabbitMq in `Client`

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

### Receive ACP messages

Now, you can start receiving ACP messages in SCOS. See [Receive messages](/docs/acp/user/receive-acp-messages.html) for details on how to do that.

## Next step

[Configure the Usercentrics app](/docs/pbc/all/usercentrics/configure-usercentrics.html) for your store.
