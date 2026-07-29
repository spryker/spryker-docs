---
title: Integrate Symfony Messenger
description: Learn how to integrate and configure Symfony Messenger module in a Spryker project.
last_updated: Jul 29, 2026
template: howto-guide-template
---

This document describes how to integrate and configure the Symfony Messenger module into your Spryker project.

## Description

Symfony Messenger is a component that lets you dispatch and handle messages using different transports. By integrating Symfony Messenger into your Spryker project, you can switch between RabbitMQ and other transports, such as SQS, Redis, and even a database, for queue handling. You can also use Symfony Messenger for other use cases that require synchronous or asynchronous message processing.

{% info_block warningBox "Check if you are using correct mode" %}

Symfony Messenger module working only with Dynamic Multistore mode, so make sure that your project is using it before proceeding with the installation and configuration.

{% endinfo_block %}

## Install

{% info_block warningBox "Check if you have it installed" %}

Check that the following modules have been installed:

| MODULE                    | EXPECTED DIRECTORY                         |
|---------------------------|--------------------------------------------|
| SymfonyMessenger          | vendor/spryker/symfony-messenger           |
| SymfonyMessengerExtension | vendor/spryker/symfony-messenger-extension |

If so, skip this section. If not, install the missing modules before proceeding.

{% endinfo_block %}

Install the required modules using Composer:

```shell
composer require spryker/symfony-messenger
```

## Usage as a Queue Adapter

You can use Symfony Messenger as a queue adapter in Spryker to replace the existing RabbitMQ adapter.

In order to use Symfony Messenger as a queue adapter, you need to configure it and enable the corresponding plugins.

### Configure

1. Provide a DSN for the Queue transport in `config/Shared/config_default.php`:

```php
<?php

use Spryker\Shared\SymfonyMessenger\SymfonyMessengerConstants;

// Symfony Messenger configuration
$config[SymfonyMessengerConstants::QUEUE_DSN] = 'amqp://guest:guest@localhost:5672/eu_host'
];
```

Or you can build it with RabbitMQ connection details:

***config/Shared/config_default.php***

```php
foreach ($rabbitConnections as $key => $connection) {
    ...
    $config[SymfonyMessengerConstants::QUEUE_DSN] = sprintf(
        'amqp://%s:%s@%s:%s/%s',
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_USERNAME],
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_PASSWORD],
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_HOST],
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_PORT],
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_VIRTUAL_HOST],
    );
}
```

The protocol in the DSN determines which transport is used. Out of the box, Spryker provides RabbitMQ as the transport for queue processing. You do not need to provide a queue name in the DSN because the application defines it when dispatching messages.

2. Provide a list of queues that can be processed.

***src/Pyz/Client/SymfonyMessenger/SymfonyMessengerConfig.php***

```php
<?php

namespace Pyz\Client\SymfonyMessenger;

class SymfonyMessengerConfig extends SprykerSymfonyMessengerConfig
{
    /**
     * @return array<mixed>
     */
    public function getQueueConfiguration(): array
    {
        return array_merge(
            [
                EventConstants::EVENT_QUEUE => [
                    EventConfig::EVENT_ROUTING_KEY_RETRY => EventConstants::EVENT_QUEUE_RETRY,
                    EventConfig::EVENT_ROUTING_KEY_ERROR => EventConstants::EVENT_QUEUE_ERROR,
                ],
                ...
            ],
        );
    }
}
```

This configuration is similar to the RabbitMQ configuration, so you can copy it from `\Pyz\Client\RabbitMq\RabbitMqConfig::getQueueConfiguration()`.

### Enable Queue Adapter

To enable the Symfony Messenger queue adapter, register the required plugins:

1. Add the Symfony Messenger transport plugin to `src/Pyz/Zed/Queue/QueueDependencyProvider.php`:

***src/Pyz/Zed/Queue/QueueDependencyProvider.php***

```php
<?php

namespace Pyz\Client\Queue;

use Spryker\Client\Kernel\Container;
use Spryker\Client\Queue\QueueDependencyProvider as BaseQueueDependencyProvider;

class QueueDependencyProvider extends BaseQueueDependencyProvider
{
    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return array<\Spryker\Client\Queue\Model\Adapter\AdapterInterface>
     */
    protected function createQueueAdapters(Container $container): array
    {
        return [
            $container->getLocator()->rabbitMq()->client()->createQueueAdapter(),
            // You can add the adapter from the Symfony Messenger module without removing the existing one so that you can switch between them when needed.
            $container->getLocator()->symfonyMessenger()->client()->createQueueAdapter(),
        ];
    }
}
```

2. Enable adapter in `config/Shared/config_default.php`:

***config/Shared/config_default.php***

```php
<?php

use Spryker\Client\SymfonyMessenger\Adapter\SymfonyMessengerQueueAdapter;

$config[QueueConstants::QUEUE_ADAPTER_CONFIGURATION] = [
    EventConstants::EVENT_QUEUE => [
        QueueConfig::CONFIG_QUEUE_ADAPTER => SymfonyMessengerQueueAdapter::class,
    ],
];

$config[QueueConstants::QUEUE_ADAPTER_CONFIGURATION_DEFAULT] = [
    QueueConfig::CONFIG_QUEUE_ADAPTER => SymfonyMessengerQueueAdapter::class,
];
```

This steps will replace the existing RabbitMQ adapter with the Symfony Messenger adapter for the queues defined in the configuration.

### Additional configuration

To provide additional configuration for the Symfony Messenger transport, use the following approach:

#### Provide queue transport configuration

You can specify transport options per queue or provide a default configuration for all queues.

The following example shows the default configuration for all queues.
Example below is a default configuration for the AMQP transport, which is used for queue processing in Symfony Messenger. You can adjust it according to your needs.

***src/Pyz/Client/SymfonyMessenger/SymfonyMessengerConfig.php***

```php
<?php

namespace Pyz\Client\SymfonyMessenger;

class SymfonyMessengerConfig extends SprykerSymfonyMessengerConfig
{
    /**
     * Specification:
     * - Returns transport configuration for queue transport.
     * - Each key is a queue name, each value is an array of transport options.
     * - `default` key is used for default transport configuration.
     *
     * @api
     *
     * @return array<string, array<string, mixed>>
     */
    public function getQueueTransportConfiguration(): array
    {
        return [
            'default' => [
                'auto_setup' => false,
                'persistent' => 'true',
                'connect_timeout' => 3,
                'read_timeout' => 130,
                'write_timeout' => 130,
                'heartbeat' => 0,
                'rpc_timeout' => 0,
            ],
        ];
    }
}

```

{% info_block warningBox "Verification" %}

To verify that the Symfony Messenger Queue Adapter integration is working correctly:

1. Save any entity in the backoffice that should be synced to the storefront or run an import.
2. Check the RabbitMQ management interface to check if queues have messages and they are being processed.
3. Check that messages are being processed successfully and there are no errors in the logs.

{% endinfo_block %}

## Usage as a Message Consumer

Symfony Messenger is not limited to queue adapter usage. You can also use it as a message consumer for messages dispatched in your application. To use Symfony Messenger as a message consumer, configure it and enable the required plugins.
In order to use Symfony Messenger as a message consumer, you need to configure it and enable the corresponding plugins.

1. Install required transport factory.

Out of the box, Symfony Messenger module provides the AMQP as a transport option. If any other transport options is required it must be added separately. To do this, implement `\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\TransportFactoryProviderPluginInterface` that provides transport factories that can create a transport instance. A single plugin can provide multiple transport factories.

Example below will provide the `SchedulerTransportFactory` that allows to use Symfony Messenger for processing scheduled tasks in the Symfony Scheduler module, but you can provide any transport factory that you need.

```php
<?php

namespace Spryker\Zed\SymfonyScheduler\Communication\Plugin\SymfonyMessenger;

class SchedulerTransportFactoryProviderPlugin extends AbstractPlugin implements TransportFactoryProviderPluginInterface
{
    /**
     * {@inheritDoc}
     * - Returns SchedulerTransportFactory instance to be used by Symfony Messenger.
     *
     * @api
     *
     * @return array<\Symfony\Component\Messenger\Transport\TransportFactoryInterface>
     */
    public function getTransportFactories(): array
    {
        return [
            $this->getFactory()->createSchedulerTransportFactory(),//Will return an instance of SchedulerTransportFactory that is used for processing scheduled tasks in the Symfony Scheduler module.
        ];
    }
}
```

Wire it in the dependency provider of Symfony Messenger module:


**src/Pyz/Client/SymfonyMessenger/SymfonyMessengerDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SymfonyMessenger;

class SymfonyMessengerDependencyProvider extends SprykerSymfonyMessengerDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\TransportFactoryProviderPluginInterface>
     */
    protected function getTransportFactoryProviderPlugins(): array
    {
        return [
            new SchedulerTransportFactoryProviderPlugin(),
        ];
    }
}
```

2. Configure transports for messages

Transport factories are used to create transport instances that handle messages. Each transport is described by a name, a DSN, and an optional priority. This configuration is provided via an implementation of `\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\AvailableTransportConfigProviderPluginInterface`, which returns a map of transport name to `MessengerTransportConfigTransfer`.

```php
<?php

namespace Pyz\Zed\FooBar\Communication\Plugin\SymfonyMessenger;

use Generated\Shared\Transfer\MessengerTransportConfigTransfer;
use Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\AvailableTransportConfigProviderPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class FooBarAsyncTransportConfigProviderPlugin extends AbstractPlugin implements AvailableTransportConfigProviderPluginInterface
{
    /**
     * @return array<string, \Generated\Shared\Transfer\MessengerTransportConfigTransfer>
     */
    public function getTransportConfigByTransportName(): array
    {
        return [
            'foo_bar_async' => (new MessengerTransportConfigTransfer())
                ->setDsn('amqp://guest:guest@localhost:5672/eu_host')
                ->setPriority(100),
        ];
    }
}
```

The `priority` defines the transport consumption order within a worker: the higher the number, the earlier the transport is polled. When omitted, priority defaults to `0`. Make sure the DSN uses a valid transport protocol (for example `amqp://` for AMQP, `redis://` for Redis, `schedule://` for the scheduler transport).

Wire it in the dependency provider of Symfony Messenger module:

**src/Pyz/Client/SymfonyMessenger/SymfonyMessengerDependencyProvider.php**

```php
<?php

class SymfonyMessengerDependencyProvider extends SprykerSymfonyMessengerDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\AvailableTransportConfigProviderPluginInterface>
     */
    protected function getAvailableTransportConfigProviderPlugins(): array
    {
        return [
            new FooBarAsyncTransportConfigProviderPlugin(),
        ];
    }
}
```

3. Map messages to transports and handlers.

Message is a data object that is dispatched via Symfony Messenger and processed by the handler. Handler is a callable that contains the logic for processing the message.
Message can be any object that can be serialized and deserialized by Symfony Messenger. It can be a transfer or any other DTO. Handler must be a callable that processes the message. It can be a class that implements the `__invoke()` method or any other callable.
Yon need to map messages to handlers and transports via `\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\MessageMappingProviderPluginInterface` plugin.

First, create a message and a handler that you want to map to each other.

```php
namespace Pyz\Zed\FooBar\Communication\Plugin\SymfonyMessenger;

class FooBarMessage
{
    protected string $data;

    public function __construct(string $data)
    {
        $this->data = $data;
    }

    public function getData(): string
    {
        return $this->data;
    }
}
```

```php
namespace Pyz\Zed\FooBar\Communication\Plugin\SymfonyMessenger;

class FooBarMessageHandler
{
    public function __invoke(FooBarMessage $message): void
    {
        //Handle the message
    }
}
```

And we need to map them to each other and to the transport that will handle them:

```php
<?php

namespace Pyz\Zed\FooBar\Communication\Plugin\SymfonyMessenger;

use Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\MessageMappingProviderPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class FooBarMappingProviderPlugin extends AbstractPlugin implements MessageMappingProviderPluginInterface
{
    public function getMessageToHandlerMap(): array
    {
        return [
            FooBarMessage::class => [
                new FooBarMessageHandler(),
            ],
        ];
    }

    public function getMessageToTransportMap(): array
    {
        return [
            FooBarMessage::class => ['foo_bar_async'], //DSN provided in FooBarAsyncTransportConfigProviderPlugin will be used to create a transport that will handle the message.
        ];
    }
}
```

Wire it in the dependency provider of Symfony Messenger module:

**src/Pyz/Client/SymfonyMessenger/SymfonyMessengerDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SymfonyMessenger;

class SymfonyMessengerDependencyProvider extends SprykerSymfonyMessengerDependencyProvider
{
    protected function getMessageMappingProviderPlugins(): array
    {
        return [
            new FooBarMessageMappingProviderPlugin(),
        ];
    }
}
```

4. Send message.

To send a message, use `SymfonyMessengerClientInterface::sendMessage()`, which the module provides. The client resolves the appropriate transport and sends the message. If the transport is synchronous, it handles the message immediately and calls the corresponding handler. Otherwise, a worker processes the message from the transport.

5. Register a consumer command.

Asynchronous messages are processed by a worker that consumes messages from the transport. To run the worker, you need to register a console command that will start it.

***src/Pyz/Zed/Console/ConsoleDependencyProvider.php***

```php
<?php

namespace Pyz\Zed\Console;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new SymfonyMessengerConsumeMessagesConsole(),
        ];
    }
}
```

6. Run the worker.

```shell
console symfonymessenger:consume foo_bar_async
```

The argument is the name of the transport that you want to consume messages from. You can provide multiple transport names if you want to consume messages from different transports in one worker:

```shell
console symfonymessenger:consume foo_bar_async another_transport
```

By default, the worker will run indefinitely, but you can provide an option to stop it after a certain time in seconds:

```shell
console symfonymessenger:consume foo_bar_async --time-limit=100
```

### Consume transports in parallel

By default a single worker process polls the given transports one after another. To process a heavy workload faster, use the `--parallel` (`-p`) option to run several competing consumers. When the value is greater than `1`, the command spawns that many child processes of itself, each consuming the same transports:

```shell
console symfonymessenger:consume foo_bar_async --parallel=4
```

Each child process is a full worker; the output of every worker is streamed back to the parent, prefixed with `[worker-N]`, and stopping the parent (SIGTERM/SIGINT) gracefully stops all children.

{% info_block warningBox "When parallel consumption is safe" %}

Parallel consumption is only safe for transports where competing consumers do not process the same message twice — for example, AMQP work queues. The scheduler transport is also safe to run in parallel: each scheduled job is guarded by the Lock facade in the cron jobs builder, so the same schedule is never executed by more than one worker at the same time.

{% endinfo_block %}

### Pause a transport at runtime

Sometimes a transport must be temporarily skipped by the worker without stopping the whole consumer — for example, when a scheduled job is disabled from the Back Office. Implement `\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\TransportConsumeGuardPluginInterface` to veto consumption of a transport on a per-iteration basis. Before consuming from a transport, the worker calls every guard plugin; if any of them returns `false`, that transport is skipped in the current loop iteration.

```php
<?php

namespace Pyz\Zed\FooBar\Communication\Plugin\SymfonyMessenger;

use Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\TransportConsumeGuardPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class FooBarTransportConsumeGuardPlugin extends AbstractPlugin implements TransportConsumeGuardPluginInterface
{
    public function canConsumeTransport(string $transportName): bool
    {
        // Return false to skip consuming this transport in the current worker iteration.
        return true;
    }
}
```

Wire it in the dependency provider of Symfony Messenger module:

**src/Pyz/Client/SymfonyMessenger/SymfonyMessengerDependencyProvider.php**

```php
<?php

class SymfonyMessengerDependencyProvider extends SprykerSymfonyMessengerDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\TransportConsumeGuardPluginInterface>
     */
    protected function getTransportConsumeGuardPlugins(): array
    {
        return [
            new FooBarTransportConsumeGuardPlugin(),
        ];
    }
}
```

The Symfony Scheduler module ships `\Spryker\Zed\SymfonyScheduler\Communication\Plugin\SymfonyMessenger\DisabledSchedulerJobTransportGuardPlugin`, which uses this extension point to pause the transport of a scheduled job that has been disabled from the Back Office. See [Integrate Symfony Scheduler](/docs/dg/dev/integrate-and-configure/integrate-symfony-scheduler.html).

## Additional information

Because this module relies on Symfony Messenger, see the [Symfony Messenger documentation](https://symfony.com/doc/current/messenger.html) for details about configuration and usage. You can also review the module source code to understand its implementation and available features.