---
title: Setting Up the Message Broker
Descriptions: Learn how to develop an app
template: howto-guide-template
redirect_from:
- /docs/acp/user/developing-an-app.html
---

To enable the message broker functionality, you must install a special branch of the `spryker/message-broker` by running the following command:
```bash
docker/sdk cli composer require "spryker/message-broker:dev-beta/localstack-replacement as 1.8.0"
```

## Update the Code

For testing the application, update or add the `MessageBrokerDependencyProvider` as shown in the code snippet below.

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

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

## Update the configuration

Open your `config/Shared/config_local.php` file and add the following snippet:

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

## Add the Worker Console

The final step is to add the `\Spryker\Zed\MessageBroker\Communication\Plugin\Console\MessageBrokerWorkerConsole` console to the `\Pyz\Zed\Console\ConsoleDependencyProvider::getConsoleCommands()` method. With these changes, your Message Broker is now set up and ready to use.
