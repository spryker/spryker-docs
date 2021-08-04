---
title: Implementing a new Console Command
originalLink: https://documentation.spryker.com/v2/docs/console-commands
redirect_from:
  - /v2/docs/console-commands
  - /v2/docs/en/console-commands
---

## Introduction
This article describes how you can implement a new console command. However before implementing your commands, we recommend you to:

* Getting the list of the console commands already available at Spryker. See [Getting the List of Console Commands and Available Options](/docs/scos/dev/developer-guides/201903.0/development-guide/back-end/data-manipulation/data-enrichment/console-commands/getting-the-lis) for instructions on how to do that. 
* Check out the what each command does. See [Console Commands in Spryker](/docs/scos/dev/developer-guides/201903.0/development-guide/back-end/data-manipulation/data-enrichment/console-commands/console) for details.

## Adding a New Console Command
To add a new console command, you need to create a new class in:

`[Namespace]/Zed/(module)/Communication/Console/ which extends`

`Spryker\Zed\Console\Business\Model\Console`. There are two methods that need to be implemented:

* configure()	This method is used to set the name, description etc.
* execute()	This method is executed by the console application and contains your code (e.g. call a facade).

Symfony’s console tool is quite powerful. Please read the official documentation before you implement your first console command. It is possible to use arguments, to send messages and to add options.

```php
<?php
namespace Pyz\Zed\MyBundle\Communication\Console;
 
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
 
class YourNewConsoleCommand extends Console
{
    const COMMAND_NAME = 'my-bundle:my-task'; // e.g. 'catalog:import'

     /**
      * @return void
      */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription('Lorem ipsum dolor sit amet.');
    }
 
    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     *
     * @return void
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        // your code here
    }
 
}
```

## Add new console command to configuration
To see the command listed when running `vendor/bin/console`, you to provide it to the common console module. Then you can run the new console command with: `vendor/bin/console your-module:your-task`

```php
<?php
namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
 
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    public function getConsoleCommands(Container $container)
    {
        $commands = parent::getCommands($container);
        $commands = [
            // ...
            new YourNewConsoleCommand(),
            // ...
        ];
 
        return $commands;
    }
}
```

## Event Listener
Symfony console triggers three events in a console command lifecycle.

* `ConsoleEvents::COMMAND` is triggered before the command is executed
* `ConsoleEvents::TERMINATE` is triggered after the command is executed
* `ConsoleEvents::EXCEPTION` is triggered when an uncaught exception appears

To add an event listener you need to create a class which implements `EventSubscriberInterface`. This can then be added in your `ConsoleDependencyProvider::getEventSubscriber()`.

```php
<?php
namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
 
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\EventDispatcher\EventSubscriberInterface[]
     */
    protected function getEventSubscriber(Container $container)
    {
        $eventSubscriber = parent::getEventSubscriber($container);
        $eventSubscriber = [
            // ...
            new YourEventListenerPlugin(),
            // ...
        ];
 
        return $eventSubscriber;
    }
}
```

This is useful in many situations. One case could be when you need to log information in your console command lifecycle.

## Logging
For logging we already provide a plugin which can be added into your project as described above. The `ConsoleLogPlugin` makes use of our log module to log useful information for all three possible events.

