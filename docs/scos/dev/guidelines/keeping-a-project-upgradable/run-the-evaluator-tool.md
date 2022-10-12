---
title: Run the evaluator tool
description: Instructions for running the evaluator tool
last_updated: Sep 2, 2022
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/running-the-evaluator-tool.html
related:
  - title: Keeping a project upgradable
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html
  - title: Upgrader tool overview
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgrader-tool-overview.html
  - title: Define custom prefixes for core entity names
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/define-customs-prefixes-for-core-entity-names.html    
---

This document describes how to check if code is compliant with Spryker’s standards using the evaluator tool.

## Prerequisites

* Install the evaluator by [installing Spryker SDK](https://github.com/spryker-sdk/sdk#installation).

{% info_block warningBox "Running the evaluator without installing Spryker SDK" %}

Alternatively, you can use the `spryker-sdk` image from the project directory without installing it. To do that, run all the commands in this doc as follows: `docker run -ti -v $PWD:/data/project --entrypoint bash spryker/php-sdk:latest -c 'cd /data/project && ../bin/console {COMMAND}'.

{% endinfo_block %}

* Get general information about the tool and see all the commands related to evaluation in the `analyze` section:

```bash
spryker-sdk list
```

## Run an evaluation

To evaluate your code, run the evaluator in one of the following ways:

* Evaluate the code of all the modules:

```bash
spryker-sdk analyze:php:code-compliance
```

* Evaluate the code of needed modules:

```bash
spryker-sdk analyze:php:code-compliance -m '{NAMESPACE}.{MODULE_NAME} {NAMESPACE}.{MODULE_NAME} ...'
```

Example:

```bash
spryker-sdk analyze:php:code-compliance -m 'Pyz.ProductStorage'
```

    The command creates `analyze:php:code-compliance.violations.yaml` in the `reports` folder.

To view the report, run the following command:

```bash
spryker-sdk analyze:php:code-compliance-report
```

## Define custom prefixes for core entity names

When evaluator checks project-level code entities for existing and potential matches with the core ones, it skips the entities that have the `Pyz` prefix in their name. Such are considered unique and will not conflict with core entities in future because there will never be an entity with the `Pyz` prefix in the core.

When solving upgradability issues, you can use the `Pyz` prefix to make your entities unique. To use custom prefixes, do the following:

1. Create `/tooling.yaml`
2. Define `Pyz` and needed custom prefixes. For example, define `Zyp` as a custom prefix:

```yaml
evaluator:
  prefixes:
    - Pyz
    - Zyp
```

Now the evaluator will not consider entities prefixed with `Zyp` as not unique.


## Skip some rules for this project

When some rule is not mandatory for your project, please add it to the `ignore list`.

The messages for the `ignored` rules will still be in CLI output and a report, but they will not be a reason for producing exit code 1 from the `analyze:php:code-compliance` command.

1. Create `/tooling.yaml`
2. For example, add `NotUnique:Constant` check to ignore list:

```yaml
evaluator:
  rules:
    ignore:
      - NotUnique:Constant
```

## Resolve upgradability issues

If the report contains upgradability issues, to resolve them, see [Upgradability guidelines](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html).
