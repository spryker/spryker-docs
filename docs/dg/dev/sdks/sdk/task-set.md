---
title: Task set
description: Task set is a group of related tasks that you can run with one command.
template: concept-topic-template
redirect_from:
- /docs/sdk/dev/task-set.html

last_updated: Nov 22, 2022
---
Sometimes, you might need to run multiple related [tasks](/docs/dg/dev/sdks/sdk/task.html) at a time. In this case, you can create a task set. A *task set* is a group of related tasks that you can run with one command. To create a task set, you can either create the task set [YAML configuration file](/docs/dg/dev/sdks/sdk/task.html#task-yaml-configuration-file), or implement `\SprykerSdk\SdkContracts\Entity\TaskSetInterface`.

{% info_block infoBox "" %}

In task sets, you can redeclare sub-tasks `stop_on_error`, `tags`, and override the `placeholders` behavior.

{% endinfo_block %}

## Configuring sub-task placeholders

After grouping tasks into a task set, you might see that a placeholder from one task is used in another task or is duplicated several times.
Such behavior is caused by the placeholder's naming collision in a task set. To resolve this issue, you can redefine the placeholder (fully or partially) in the `placeholder_overrides` task section.
To share the same placeholder between tasks, declare the placeholder in the `shared_placeholders` section. You can also amend the description in this section.

{% info_block infoBox "" %}

This mapping is also available for the PHP tasks sets in `TaskSetInterface`.

{% endinfo_block %}

Example of a YAML task set configuration file:

```yaml
id: "sdk:task:set"
short_description: "Create ACP AsyncAPI file with message"
help: ~
stage: build
version: 1.0.0
command: ~
type: task_set
tasks:
  - id: "task:one"
    stop_on_error: true
    tags: ['tag_one', 'tag_two']
    placeholder_overrides:
        '%config%':
            name: "%config_one%"
            value_resolver: STATIC_TEXT
            optional: true
            configuration:
                name: "report_dir"
                description: "Reports directory"
                type: string
                settingPaths: ["report_dir"]


  - id: "task:two"
    stop_on_error: false
placeholders: []
shared_placeholders:
    '%sdk_dir%': ~
    '%config%':
      description: 'Some description'
```
