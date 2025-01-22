---
title: CLI entry point for Yves
description: Set up a CLI entry point for Yves. Learn to configure commands and streamline Yves processes for improved backend performance and development efficiency.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/cli-entry-point-for-yves
originalArticleId: ee61cd14-4336-4e09-b880-c3475f44f3b9
redirect_from:
  - /docs/scos/dev/back-end-development/yves/cli-entry-point-for-yves.html
related:
  - title: Yves overview
    link: docs/dg/dev/backend-development/yves/yves.html
  - title: Add translations for Yves
    link: docs/dg/dev/backend-development/yves/adding-translations-for-yves.html
  - title: Controllers and actions
    link: docs/dg/dev/backend-development/yves/controllers-and-actions.html
  - title: Implement URL routing in Yves
    link: docs/dg/dev/backend-development/yves/implement-url-routing-in-yves.html
  - title: Modular Frontend
    link: docs/dg/dev/backend-development/yves/modular-frontend.html
  - title: Yves bootstrapping
    link: docs/dg/dev/backend-development/yves/yves-bootstrapping.html
  - title: Yves routes
    link: docs/dg/dev/backend-development/yves/yves-routes.html
---

Spryker provides CLI entry points to run console commands for certain use cases. To provide this feature, we use [Symfony's Console component](https://symfony.com/doc/current/components/console.html)

Starting from [version 4.4.0](https://symfony.com/doc/4.4/components/console.html), we have added a new entry point for Yves, which significantly improves the separation of concerns and enables the execution of Yves-specific console commands.

## Yves CLI entry point

Commands that are run in the context of Yves can be executed with the following CLI entry point:

```bash
vendor/bin/yves
```

This gives you a list of all available console commands for Yves.

### Create a console command

To create a console command for Yves, you need to create a class inside the `Plugin/Console` directory and extend `\Spryker\Yves\Kernel\Console\Console`, which already brings some handy methods.

A new console command looks as follows:

<details>

<summary>Pyz\Yves\YourModule\Plugin\Console</summary>

```php
<?php

namespace Pyz\Yves\YourModule\Plugin\Console;

use Spryker\Yves\Kernel\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Yves\YourModule\YourModuleFactory getFactory()
 */
class YourConsole extends Console
{
    protected const NAME = 'your:command:name';

    /**
     * @return void
     */
    protected function configure(): void
    {
        $this
            ->setName(static::NAME)
            ->setDescription('Add a description for what this command is used.');
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        if ($this->getFactory()->createFoo()->doSomething()) {
            return static::CODE_SUCCESS;
        }


        return static::CODE_ERROR;
    }
}
```
</details>

### Add a console command

A console command is added the same way as all other plugins are added to the application. If you don't have `ConsoleDependencyProvider` for Yves, you need to create one, and then you can add your console commands to it:

```php
<?php

namespace Pyz\Yves\Console;

use Spryker\Yves\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Yves\Kernel\Container;
use Spryker\Yves\YourModule\Plugin\Console\YourConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new YourConsole(),
        ];
    }
}
```

### Add application plugins

For some commands, it might be required to add one or more specific application plugins. To achieve this, add the required application plugins to  `ConsoleDependencyProvider`:

```php
<?php

namespace Pyz\Yves\Console;

use Spryker\Yves\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Yves\Kernel\Container;
use Spryker\Yves\Router\Plugin\Application\RouterApplicationPlugin;
...

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    ...

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(Container $container): array
    {
        return [
            new RouterApplicationPlugin(),
        ];
    }
}
```

### Add an event subscriber

To add an event subscriber, add it to `ConsoleDependencyProvider`:

```php
<?php

namespace Pyz\Yves\Console;

use Spryker\Yves\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Yves\Kernel\Container;
use Spryker\Yves\Router\Plugin\Application\RouterApplicationPlugin;
...

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    ...

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Symfony\Component\EventDispatcher\EventSubscriberInterface[]
     */
    protected function getEventSubscriber(Container $container): array
    {
        return [
            // Add your event subscriber here
        ];
    }
}
```

### Pre- and post-run hooks

In some cases, you might want to run things before or after your command was executed. Therefore, you can add those kinds of hooks to the `ConsoleDependencyProvider`:

```php
<?php

namespace Pyz\Yves\Console;

use Spryker\Yves\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Yves\Kernel\Container;
use Spryker\Yves\Router\Plugin\Application\RouterApplicationPlugin;
...

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    ...

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Shared\Console\Dependency\Plugin\ConsolePreRunHookPluginInterface[]
     */
    protected function getConsolePreRunHookPlugins(Container $container): array
    {
        return [
            // Add your pre-run hook here
        ];
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Shared\Console\Dependency\Plugin\ConsolePostRunHookPluginInterface[]
     */
    protected function getConsolePostRunHookPlugins(Container $container): array
    {
        return [
            // Add your post-run hook here
        ];
    }
}
```
