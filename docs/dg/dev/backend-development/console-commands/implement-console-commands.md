---
title: Implement console commands
description: This document describes how you can implement a new console command.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/console-commands
originalArticleId: d43d3867-747d-4323-978a-57b61082bef8
redirect_from:
  - /docs/scos/dev/back-end-development/console-commands/implementing-a-new-console-command.html
  - /docs/scos/dev/back-end-development/console-commands/implement-a-new-console-command.html
  - /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-console-commands.html

related:
  - title: Console commands in Spryker
    link: docs/scos/dev/back-end-development/console-commands/console-commands.html
  - title: Get the list of console commands and available options
    link: docs/scos/dev/back-end-development/console-commands/get-the-list-of-console-commands-and-available-options.html
---

This document describes how you can implement a new console command. However, before implementing your commands, we recommend doing the following:

* [Get the list of available console commands](/docs/dg/dev/backend-development/console-commands/get-the-list-of-console-commands-and-available-options.html).
* [Learn what available commands do](/docs/dg/dev/backend-development/console-commands/console-commands.html).

## Add a new console command

To add a new console command, create a new class in `[Namespace]/Zed/(module)/Communication/Console/`, which extends `Spryker/Zed/Console/Business/Model/Console`. Two methods need implementation:

* `configure()`—this method is used to set the name or description.
* `execute()`—this method is executed by the console application and contains your code—for example, call a facade.

Symfony's console tool is quite powerful. Read the [official documentation](https://symfony.com/doc/current/components/console.html) before you implement your first console command.

To send messages and add options, you can use arguments.

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

To see the command listed when running `vendor/bin/console`, provide it to the common console module. Then you can run the new console command with this command: `vendor/bin/console your-module:your-task`.

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

## Event listener

Symfony console triggers three events in a console command lifecycle:
* `ConsoleEvents::COMMAND` is triggered before the command is executed.
* `ConsoleEvents::TERMINATE` is triggered after the command is executed.
* `ConsoleEvents::EXCEPTION` is triggered when an uncaught exception appears.

To add an event listener you need to create a class that implements `EventSubscriberInterface`. This can then be added in your `ConsoleDependencyProvider::getEventSubscriber()`.

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

This is useful in many situations—for example, to log information in your console command lifecycle.

## Logging

For logging, we already provide a plugin that you can add to your project as described in the preceding sections. The `ConsoleLogPlugin` plugin uses our log module to log useful information for all three possible events.
