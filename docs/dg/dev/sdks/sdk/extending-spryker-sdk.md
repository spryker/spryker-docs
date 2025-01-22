---
title: Extending Spryker SDK
description: Find out how you can extend the Spryker SDK allowing third parties to contribute to the SDK without modifying it.
template: howto-guide-template
last_updated: Jan 13, 2023
redirect_from:
    - /docs/sdk/dev/extending-the-sdk.html
    - /docs/sdk/dev/extend-the-sdk.html

---


The SDK offers different extension points to enable third parties to contribute to the SDK without modifying it.

From simple to complex, the SDK can be extended as follows:

- Provide additional [tasks](/docs/dg/dev/sdks/sdk/task.html) or [settings](/docs/dg/dev/sdks/sdk/spryker-sdk-settings.html) via a YAML definition placed inside `<path/to/spryker/sdk>/extension/<YourBundleName>/Task/<taskname>.yaml`. Those tasks can't introduce additional dependencies and are best suited to integrating existing tools that come with a standalone executable.
- Provide additional tasks, [value resolvers](/docs/dg/dev/sdks/sdk/value-resolvers.html), or settings via a PHP implementation placed inside `<path/to/spryker/sdk>/extension/<YourBundleName>/Task/<taskname>.php`. Those tasks need to implement the [TaskInterface](https://github.com/spryker-sdk/sdk-contracts/blob/master/src/Entity/TaskInterface.php) and need to be exposed by providing a Symfony bundle to the Spryker SDK, such as `<path/to/spryker/sdk>/extension/<YourBundleName>/<YourBundleName>Bundle.php`, following the conventions of a [Symfony bundle](https://symfony.com/doc/current/bundles.html#creating-a-bundle). This approach is best suited for more complex tasks that don't require additional dependencies, for example validating the content of a YAML file by using Symfony validators.
- Provide additional tasks, value resolvers, or settings that come with additional dependencies. This approach follows the same guideline as the previous approach with the PHP implementation but requires building  your own [SDK docker image](/docs/dg/dev/sdks/sdk/build-flavored-spryker-sdks.html) that includes those dependencies.

To extend the SDK, follow these steps.

## 1. Implementing a task

A *task* is the execution of a very specific function. For example, executing an external tool through a CLI call is a task.

There are two possibilities when it comes to defining a new task: having it be based on YAML for simple task definitions, or
an implementation via PHP and Symfony services for specialized purposes.

### Implementing a task via YAML definition

YAML based tasks need to fulfill a defined structure so you can execute them from the SDK.
The command defined in the YAML definition can have placeholders that you need to define in the placeholder section. Each placeholder needs to map to one value resolver.

Add the definition for your task in `<path>/Task/<name>.yaml`:

```yaml
---
id: string #e.g.: validation:code
short_description: string #e.g.: Fix code style violations
help: string|null #e.g: Fix codestyle violations, lorem ipsum, etc.
stage: string #e.g.: build
command: string #e.g.: php %project_dir%/vendor/bin/phpcs -f --standard=%project_dir%/vendor/spryker/code-sniffer/Spryker/ruleset.xml %module_dir%
type: string #e.g.: local_cli
version: string #e.g.: 1.0.0
placeholders:
- name: string #e.g.: %project_dir%
  value_resolver: string #e.g.: PROJECT_DIR, mapping to a value resolver with id PROJECT_DIR or a FQCN
  optional: bool
```

{% info_block infoBox "Adding tasks to the SDK" %}

You can add the tasks located in `extension/<your extension name>/Task` to the SDK by executing `spryker-sdk sdk:update:all`

{% endinfo_block %}

### Implementing a task via a PHP class

If a task is more than just a call to an existing tool, you can implement the task as a PHP class and register it using the Symfony service tagging feature.
This requires you to make the task a part of the Symfony bundle. To achieve this, follow these steps:

1. Create a Symfony bundle.<br>
Refer to the [official Symfony documentation](https://symfony.com/doc/current/bundles.html) for details on how to do that.

{% info_block infoBox Info %}

The bundle has to use the [Spryker SDK Contracts](https://github.com/spryker-sdk/sdk-contracts) via Composer.

{% endinfo_block %}


2. Implement the task:

```php
namespace <YourNamespace>\Task;

use SprykerSdk\Sdk\Contracts\Entity\TaskInterface;
use <YourNamespace>\Task\Command\YourCommand;

class YourTask implements TaskInterface
{
    /**
     * @return string
     */
    public function getShortDescription(): string {}

    /**
     * @return array<\SprykerSdk\Sdk\Contracts\Entity\PlaceholderInterface>
     */
    public function getPlaceholders(): array {}

    /**
     * @return string|null
     */
    public function getHelp(): ?string {}


    public function getId(): string {}

    /**
     * @return array<\SprykerSdk\Sdk\Contracts\Entity\CommandInterface>
     */
    public function getCommands(): array
    {
        return [
            new YourCommand(),
        ];
    }

}
```

3. Implement the command.<br>
While a task definition serves as a general description of the task and maps placeholders to value resolvers, a *command* serves as a function that is executed along with the resolved placeholders.

Implement the command as shown in the example:

```php
namespace <YourNamespace>\Task\Command;

use SprykerSdk\Sdk\Contracts\Entity\ExecutableCommandInterface;

class YourCommand implements ExecutableCommandInterface
{
    /**
     * @return string
     */
    public function getCommand(): string
    {
        return static::class;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        //use 'php' to execute command inside the SDK
        return 'php';
    }

    /**
     * @return bool
     */
    public function hasStopOnError(): bool
    {
        return true;
    }

    /**
     * @param array<string, mixed> $resolvedValues
     *
     * @return int
     */
    public function execute(array $resolvedValues): int
    {
        //your implementation of the command
        //$resolvedValues will be array<placeholder.name, value>
        //return 0 for success and any non 0 integer up to 255 for failed
        return 0;
    }
}
```
<a name="implement-placeholders"></a>

4. Implement placeholders.<br>
Placeholders are resolved at runtime by using a specified value resolver.
A placeholder needs a specific name that is not used anywhere else in the command the placeholder is used for.

{% info_block infoBox Info %}

You can append `%` and suffix the placeholder, which makes the placeholder easier to recognize in a command.

You can reference the used value resolver by its ID or the fully qualified class name (FQCN). The FQCN is the preferred option.

{% endinfo_block %}

Implement the placeholder as shown in the example:

```php
namespace <YourNamespace>\Task;

use SprykerSdk\Sdk\Core\Domain\Entity\Placeholder;
use SprykerSdk\Sdk\Contracts\Entity\TaskInterface;
use <YourNamespace>\ValueResolver\YourValueResolver;

class YourTask implements TaskInterface
{
    /**
     * @return array<\SprykerSdk\Sdk\Contracts\Entity\PlaceholderInterface>
     */
    public function getPlaceholders(): array
    {
        return [
            new Placeholder('%some_placeholder%', YourValueResolver::class, [], false),
        ];
    }
}
```

5. Implement a Symfony service.<br>
Once you have implemented the task, register it as a [Symfony service](https://symfony.com/doc/current/service_container.html#creating-configuring-services-in-the-container).

Implement the service as shown in the example:

```yaml
services:
  your_task:
    class: <YourNamespace>\Task\YourTask
    tags: ['sdk.task']
```

6. Register your bundle.

If your bundle does not have dependencies that differ from the Spryker SDK, you don't need to register the bundle. Instead, place it into the `extension` directory that is a part of your SDK installation.

For more complex bundles that require additional dependencies, follow the guidelines in [Building a flavored Spryker SDK](/docs/dg/dev/sdks/sdk/build-flavored-spryker-sdks.html).

## 2. Adding a value resolver

Most placeholders need a solution to resolve their values during runtime. This can be reading some settings and assembling a value based on the settings content, or any solution that turns a placeholder into a resolved value.

{% info_block warningBox %}

Make sure to unify value resolvers and always use the same name for a value.

{% endinfo_block %}

Implement the value resolver as shown in the example:

```php
namespace <YourNamespace>\ValueResolver;

use SprykerSdk\Sdk\Contracts\ValueResolver\ValueResolverInterface;

class YourValueResolver implements ValueResolverInterface
{
    /**
     * @return string
     */
    public function getId(): string
    {
        //ValueResolver can be referenced by YOUR_ID instead of the FQCN
        return 'YOUR_ID';
    }

    public function getDescription(): string
    {
        //will be shown when `spryker-sdk <task> -h` is called for each parameter
        return 'description';
    }

    public function getSettingPaths(): array
    {
        //ensures some_setting_path is read from settings and the respective value is passed
        //into getValue(['some_setting_path' => <value>])
        return [
            'some_setting_path',
        ];
    }

    public function getType(): string
    {
        //any php type
        return 'string';
    }

    public function getAlias(): ?string
    {
        //used to give an alias for overwriting the value via CLI `spryker-sdk <task> --some-alias=<value>`
        return 'some-alias';
    }

    /**
     * @param array<string, mixed> $settingValues
     * @return mixed
     */
    public function getValue(array $settingValues): mixed
    {
        //implementation to resolve the corresponding value
        //when null is returned the user of the SDK is asked to give his input
        return '<resolved value>'
    }

    /**
     * @return mixed
     */
    public function getDefaultValue(): mixed
    {
        //Used to set the default value for the CLI option
        return null;
    }
}
```

You can define a value resolver as a Symfony service, for example to be able to inject services into it. If the value resolver is not defined as a service, it's instantiated by its FQCN.

Example of defining a value resolver as a Symfony service:

```yaml
services:
  your_value_resolver:
    class: <YourNamespace>\ValueResolver\YourValueResolver
    tags: ['sdk.value_resolver']
```

## 3. Adding a setting

A bundle can add more settings that value resolvers can then use to create a persistent behavior.
You can define settings in the `settings.yaml` file and add them to the SDK by calling
`spryker-sdk setting:set setting_dirs <path to your settings>`:

```yaml
settings:
  - path: string #e.g.: some_setting
    initialization_description: string #Will be used when a user is asked to provide the setting value
    strategy: string #merge or overwrite, where merge will add the value to the list and overwrite will replace it
    init: bool #if true, the user should be asked for the setting value when `spryker-sdk sdk:init:sdk` or `spryker-sdk sdk:init:project` is called.
    type: string #Use array for lists of values or any scalar type (string|integer|float|boolean)
    is_project: boolean #If true, the setting is persisted across projects and initialized during `spryker-sdk sdk:init:sdk` or per project and initialized with `spryker-sdk sdk:init:project`
    values: array|string|integer|float|boolean #serve as default values for initialization
```

## 4. Adding a new command runner

Commands are executed via *command runners*. Each command has a `type` that determines what command runner can execute the command.
To implement new task types, there must be a new command runner and you need to register it as a Symfony service.

Add a new command runner as shown in the example:

```php
namespace <YourNamespace>\CommandRunners;

use SprykerSdk\Sdk\Contracts\CommandRunner\CommandRunnerInterface;

class YourTypeCommandRunner implements CommandRunnerInterface
{
    /**
     * @param CommandInterface $command
     *
     * @return bool
     */
    public function canHandle(CommandInterface $command): bool
    {
        return $command->getType() === 'your_command_type';
    }

    /**
     * @param CommandInterface $command
     * @param array<string, mixed> $resolvedValues
     *
     * @return int
     */
    public function execute(CommandInterface $command, array $resolvedValues): int
    {
        //own implementation on how to execute a command

        //MUST return 0 for success and 1-255 for failure
        return 0;
    }
}
```

```yaml
  your_type_command_runner:
    class: <YourNamespace>\CommandRunners\YourTypeCommandRunner
    tags: ['command.runner']
```

Optionally, you can overwrite the existing command runners with a more suitable implementation:

```yaml
  local_cli_command_runner:
    class: <YourNamespace>\CommandRunners\BetterLocalCliRunner
```

## 5. Generating a task using a CLI command

It might be useful to generate a task by using a CLI command as follows:

```shell
# generate yaml task
spryker-sdk sdk:generate:task
spryker-sdk sdk:generate:task task-format=yaml

# generate php task
spryker-sdk sdk:generate:task task-format=php
```

After execution of the command task will be created in such directories:
- `extension/Custom/src/Resources/config/task` - for yaml tasks
- `extension/Custom/src/Task` - for php tasks

You can manually update it if it's needed. Don't forget to increase the task version and run the following to make new updates available.:

  ```shell
    `spryker-sdk sdk:update:all`
    ```
