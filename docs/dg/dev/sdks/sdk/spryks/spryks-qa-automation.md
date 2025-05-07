---
title: Spryks QA automation
description: Learn all about QA automation lets you run QA tools and unit tests required by Spryker
template: howto-guide-template
redirect_from:
- /docs/sdk/dev/spryks/qa-automation.html

last_updated: Nov 10, 2022
---

QA automation is a feature that lets you run QA tools such as code style checks, static analysis, and unit tests required by Spryker.

## Enable QA automation

You can enable the QA automation at the project initialization step as an additional setting. To achieve this, do the following:

1. Run this command:

```bash
spryker-sdk sdk:init:project
```

2. Pick the necessary steps from the list. If none is picked, the default list is used. You can check the default list in the [settings.yaml](https://github.com/spryker-sdk/sdk/blob/d6cac0ec997ea3ef067f8af07b8b375f96632a4f/src/Extension/Resources/config/setting/settings.yaml) file, in `settings.qa_tasks.values`.

After the project's initialization, its QA automation tasks are saved to the `.ssdk/setting` file.

An example of a result:

```yaml
qa_tasks:
    - 'validation:php:rector'
    - 'validation:php:codestyle-check'
    - 'validation:php:static'
```

## Use QA automation

To execute all of the QA automation tasks, run the following command:

```bash
spryker-sdk sdk:qa:run
```

To customize the list of the executable QA automation tasks, change the `qa_tasks` block in in the `.ssdk/setting` file accordingly.

To add a custom QA task, your task ID name should have the `validation:*` pattern.

## Tests execution

QA automation can execute unit tests, but only if it doesn't require the project environment configuration. Otherwise, the result might be unpredictable.
