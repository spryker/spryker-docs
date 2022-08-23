---
title: Running the evaluator tool
description: Instructions for running the evaluator tool
last_updated: Nov 25, 2021
template: concept-topic-template
related:
  - title: Keeping a project upgradable
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html
  - title: Upgradability services
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-services.html
  - title: Upgrader tool overview
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgrader-tool-overview.html
  - title: Running the upgrader tool
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/running-the-upgrader-tool.html
  - title: Define custom prefixes for core entity names
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/define-customs-prefixes-for-core-entity-names.html
---

This document describes how to check if code is compliant with Spryker’s standards using the evaluator tool.

## Prerequisites

Depending on how you want to use the tool, do one of the following:

* Recommended: Install the evaluator by [installing Spryker SDK](https://github.com/spryker-sdk/sdk#installation).

* To use the `spryker-sdk` image from project directory without installing Spryker SDK, see [Run an evaluation without Spryker SDK installed](#run-an-evaluation-without-spryker-sdk-installed).

## Run an evaluation with Spryker SDK installed

To evaluate your code, run the evaluator:

```bash
spryker-sdk analyze:php:code-compliance
```
    This creates `analyze:php:code-compliance.violations.yaml` in the `reports` folder.

To view the report, run the following command:

```bash
spryker-sdk analyze:php:code-compliance-report
```

Get general information about the tool and see all the commands related to evaluation in the `analyze` section:

```bash
spryker-sdk list
```

## Run an evaluation without Spryker SDK installed

To evaluate your code, run the evaluator:

```bash
docker run -ti -v $PWD:/data/project --entrypoint bash spryker/php-sdk:latest -c 'cd /data/project && ../bin/console spryker-sdk analyze:php:code-compliance'
```
    This creates `analyze:php:code-compliance.violations.yaml` in the `reports` folder.

To view the report, run the following command:

```bash
docker run -ti -v $PWD:/data/project --entrypoint bash spryker/php-sdk:latest -c 'cd /data/project && ../bin/console spryker-sdk analyze:php:code-compliance-report'
```

You can run all the Spryker SDK commands using the method in the prior commands. Get general information about the tool and see all the commands related to evaluation in the `analyze` section:

```bash
docker run -ti -v $PWD:/data/project --entrypoint bash spryker/php-sdk:latest -c 'cd /data/project && ../bin/console spryker-sdk list'
```
