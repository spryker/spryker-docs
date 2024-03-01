---
title: Task
description: Task is the smallest unit for running commands in the Spryker SDK which serves as a command wrapper.
template: concept-topic-template
redirect_from:
- /docs/sdk/dev/task.html

last_updated: Nov 22, 2022
---

A *task* is the smallest unit for running commands in the SDK.
You can use the task as a single runnable console command, or you can use it in more complex structures such as [workflows](/docs/dg/dev/sdks/sdk/initialize-and-run-workflows.html) or [task sets](/docs/dg/dev/sdks/sdk/task-set.html).
In other words, a task is a commands wrapper that makes the commands extensible, configurable, versionable, and provides a CLI interface for them.

## Run a task

Use the following commands for tasks:

- To run a task: `spryker-sdk <task-id>`
- To run task commands filtered by stages: `spryker-sdk <task-id> --stages=stage_a --stages=stage_b`
- To run task commands filtered by tags: `spryker-sdk <task-id> --tags=tag_a --tags=tag_b`
- To get task help info: `spryker-sdk <task-id> --help` or `spryker-sdk <task-id> -h`.

## Create a task

Tasks can be created in a declarative way by specifying the task YAML configuration file, or by implementing `\SprykerSdk\SdkContracts\Entity\TaskInterface` as a PHP class.
The declarative way is the preferred method unless a more complex logic is needed.

### Task YAML configuration file

The task configuration file should be placed to the `extension/*/config/task/` or `src/Extension/Resources/config/task/` directory. The table below describes the configuration file's properties.

Example of a YAML configuration file:

```yaml
id: 'hello:world'
short_description: 'Sends greetings'
help: 'Will greet the one using it'
stage: hello
version: 1.0.0
deprecated: false
successor: 'hello:php'
command: '/bin/echo "hello %world% %somebody%"'
type: local_cli
tags: ['hello', 'world']
placeholders:
  - name: '%world%'
    value_resolver: SprykerSdk\Sdk\Extension\ValueResolver\StaticValueResolver
    optional: false
    configuration:
      name: 'world'
      description: 'what is the world?'
      defaultValue: 'World'
  - name: '%somebody%'
    value_resolver: STATIC
    optional: false
    configuration:
      name: 'somebody'
      description: 'Who is somebody'
lifecycle:
  INITIALIZED:
      commands:
        - command: echo "hello world"
          type: local_cli
      files: ~
      placeholders: ~
  UPDATED:
      commands:
        - command: echo "hello world"
          type: local_cli
      files: ~
      placeholders: ~
  REMOVED:
    commands:
      - command: echo "hello world"
        type: local_cli
    files: ~
    placeholders: ~
```

| Property            | Required | Description                                                                                                                   |
|---------------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| `id`                | yes      | The __Unique__ task id. It should consist only of `[\w\:]+` symbols.                                                                  |
| `short_description` | yes      | The task description that is displayed in the `Description` section in command. help.                                                    |
| `version`           | yes      | The task's version. The version format must comply with the server. specification.                                                                            |
| `type`              | yes      | The task's type. `local_cli` or `local_cli_interactive` must be used for a YAML task declaration and `php` type for a PHP task class |
| `command`           | yes      | An executable command. string                                                                                                  |
| `help`              | no       | Help description that is displayed in the *Help* section of the command. help.                                                           |
| `stage`             | no       | The task and command. stage.                                                                                                        |
| `deprecated`        | no       | Defines the task's deprecation. status.                                                                                           |
| `successor`         | no       | The task ID that should be used if the current one is deprecated.                                                          |
| `tags`              | no       | The task command. tags.                                                                                                             |
| `error_message`     | no       | The default command error message that is used in case of non-zero command code return.                                             |
| `placeholders`      | no       | Command [placeholders](#placeholders)   list.                                                                  |
| `lifecycle`         | no       | Lifecycle commands list. See [Task lifecycle management](/docs/dg/dev/sdks/sdk/task-lifecycle-management.html) for details about the lifecycle.                                                                  |

#### Placeholders

The *placeholders* attribute of the task configuration file has the following properties:

| Property         | Required | Description                                                                                                                      |
|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| `name`           | yes      | The placeholder name. The same name should be placed in the command string for substitution. |
| `value_resolver` | yes      | The value resolver class name or name. It is used for fetching and processing command values.                                             |
| `optional`       | no       | Defines if the placeholder is optional or not.                                                                                          |
| `configuration`  | no       | The value resolver configuration. Depends on the particular value resolver.                                                               |

## Update tasks

Update all of the existing tasks:

```bash
sdk:update:all
```

After you run this command, [lifecycle events](/docs/dg/dev/sdks/sdk/task-lifecycle-management.html) are triggered.

## Using tasks in the workflows

You can use tasks in workflow transitions. Such tasks must be defined in workflow configuration at `transitions.<transition>.metadata.task`.
For more information on the workflows, see [Initialize and run workflows](/docs/dg/dev/sdks/sdk/initialize-and-run-workflows.html).

```yaml
  transitions:
    CreateAppSkeleton:
        from: start
        to: app-skeleton
        metadata:
          task: generate:php:app
```
