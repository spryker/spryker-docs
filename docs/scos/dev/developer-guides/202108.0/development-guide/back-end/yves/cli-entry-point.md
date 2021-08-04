---
title: CLI Entry Point for Yves
originalLink: https://documentation.spryker.com/2021080/docs/cli-entry-point-for-yves
redirect_from:
  - /2021080/docs/cli-entry-point-for-yves
  - /2021080/docs/en/cli-entry-point-for-yves
---

Spryker provides CLI entry points to run console commands for certain use cases. We use [Symfony's Console component](https://symfony.com/doc/current/components/console.html) to provide this feature. 

Starting from [version 4.4.0](https://symfony.com/doc/4.4/components/console.html), we have added a new entry point for Yves, which significantly improves the separation of concerns and enables to execute Yves specific console commands.

## Yves CLI Entry Point
Commands that should run in the context of Yves, can be executed with the following CLI entry point:
```Bash
vendor/bin/yves
```
This gives you a list of all available console commands for Yves.

### Creating a Console Command
To create a console command for Yves, you need to create a class inside the `Plugin/Console` directory and extend the `\Spryker\Yves\Kernel\Console\Console` which already brings some handy methods. A new console command could look like this:

<details open>

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

### Adding a Console Command
A console command is added the same way as all other plugins are added to the application.  If you don't have a ConsoleDependencyProvider for Yves, you need to create one and then you can add your console commands to it:

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

### ApplicationPlugins
For some commands, it might be required to add one or more specific ApplicationPlugins. To achieve this, you need to add the required ApplictionPlugin(s) to  `ConsoleDependencyProvider`:
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

### EventSubscriber
If you want to add some event subscriber, add it to `ConsoleDependencyProvider`:
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
### Pre- and post-run Hooks
In some cases, you might want to run things before or after your command was executed. Therefore, you can add those kinds of hooks to the ConsoleDependencyProvider:
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
