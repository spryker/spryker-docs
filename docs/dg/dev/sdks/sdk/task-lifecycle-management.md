---
title: Managing task lifecycles
description: Each task can subscribe to lifecycle events so that whenever the SDK is updated, the tasks is initialized or removed.
template: concept-topic-template
redirect_from:
- /docs/sdk/dev/task-lifecycle-management.html

last_updated: Nov 22, 2022
---

An SDK [task](/docs/dg/dev/sdks/sdk/task.html) can change over time. It may need to update the tool it wraps, or get replaced by a successor task.
Each task can subscribe to certain lifecycle events to react, so that whenever the SDK is updated, the task is initialized or removed.

To be able to emit those lifecycle events to a specific task, the task needs to subscribe to the event, and needs to be versioned.

## Subscribing to lifecycle events

A task can define a list of commands and files for each of the lifecycle events that are executed and created when the event is emitted.
*Commands* follow the same structure as the command of a task itself and can have *placeholders* for the dynamic parts of the command.
*Files* only define a path and the *content* that should be put into the defined file. It is possible to use *placeholders* for dynamic parts of `files.path` or `files.content`.

## Event types

There are the following event types:

- *Initialized*: Emitted when a task is initialized inside a project for the first time. This is the right event to create a task-specific configuration and initialize the tool.  
- *Updated*: Emitted when the SDK was updated and a task version has changed, so the task can update configurations and tools it needs to run.
- *Removed*: Emitted after a task was removed from the SDK. You can use this event to perform cleanups of the task, like removing configuration files.

## Adding events to the tasks created in YAML files

The following examples illustrates how you can add the lifecycle events to [tasks created via a YAML file](/docs/dg/dev/sdks/sdk/extending-spryker-sdk.html#implementing-a-task-via-yaml-definition):

```yaml
---
id: string #e.g.: validation:php:codestile-fix
version: 1.0.0
deprecated: false #if false it can be omitted
successor: string|null # if null it can be omitted, e.g.: validation:php:codestyle-fix
# ... other task properties
lifecycle:
  INITIALIZED:
    commands:
      - '%vendor_dir%/bin/composer require --dev "spryker/code-sniffer: dev-master"'
    files:
      - path: path # e.g.: '%project_dir%/.cs_config' # does not really exist, only for the example
        content: string # e.g.: "severity: 3"
    placeholders:
      - name: string # e.g.: '%project_dir%'
        valueResolver: string #e.g.: PROJECT_DIR mapping to a ValueResolver
  UPDATED: ~ # if event does not define anything it can be omitted
  REMOVED: #same format as INITIALIZED
```

## Adding events to the tasks created in PHP classes

A [task implemented in a PHP class](/docs/dg/dev/sdks/sdk/extending-spryker-sdk.html#implementing-a-task-via-a-php-class) only needs to implement the [TaskLifecycleInterface](https://github.com/spryker-sdk/sdk/blob/master/src/Core/Domain/Entity/Lifecycle/TaskLifecycleInterface.php) to subscribe to the lifecycle events.
