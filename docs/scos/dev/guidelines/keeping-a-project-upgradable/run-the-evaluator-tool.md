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

## Resolve upgradability issues

If the report contains upgradability issues, to resolve them, see [Upgradability guidelines](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html).
