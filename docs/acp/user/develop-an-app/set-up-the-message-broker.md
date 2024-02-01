---
title: Set up the message broker
Descriptions: Learn how to set up the message broker
template: howto-guide-template
last_updated: Dec 14, 2023
---
This document describes how to set up the message broker for your app.

## 1. Enable the message broker

To enable the message broker for your app, install the specific branch of the `spryker/message-broker` by running the following command:

```bash
docker/sdk cli composer require "spryker/message-broker:dev-beta/localstack-replacement as 1.8.0"
```

## 2. Update the code

To test the app, update or add `MessageBrokerDependencyProvider` as shown in the following example:

```php
<?php

namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\LocalSenderReceiverPlugin;
use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageSenderPluginInterface>
     */
    public function getMessageSenderPlugins(): array
    {
        return [
            new LocalSenderReceiverPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageReceiverPluginInterface>
     */
    public function getMessageReceiverPlugins(): array
    {
        return [
            new LocalSenderReceiverPlugin(),
        ];
    }
}
```

## 3. Update the configuration

In `config/Shared/config_local.php` file, add the following snippet:

```php
use Spryker\Shared\MessageBroker\MessageBrokerConstants;

$config[MessageBrokerConstants::IS_ENABLED] = true;
$config[MessageBrokerConstants::LOCAL_EXCHANGE_FILE_PATH] = APPLICATION_ROOT_DIR . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'data.json';
$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    '*' => '*',
];

$config[MessageBrokerConstants::CHANNEL_TO_TRANSPORT_MAP] = [
    '*' => 'local',
];
```

## 4. Add the worker console

Add the `\Spryker\Zed\MessageBroker\Communication\Plugin\Console\MessageBrokerWorkerConsole` console to the `\Pyz\Zed\Console\ConsoleDependencyProvider::getConsoleCommands()` method. 

Now, the message broker is set up and ready to use.