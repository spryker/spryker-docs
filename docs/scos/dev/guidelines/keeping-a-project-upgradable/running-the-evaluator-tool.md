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

Get general information about the tool and see all available commands related to the evaluation process we may in *analyze* section:

```bash
spryker-sdk list
```

## Install the evaluator tool

The evaluator tool is part of Spryker SDK.

1. Install the Spryker SDK tool https://github.com/spryker-sdk/sdk#installation

2. Also, possible to use spryker-sdk image from project directory, without any installation. Example: `docker run -ti -v $PWD:/data/project --entrypoint bash spryker/php-sdk:latest -c 'cd /data/project && ../bin/console {connamd name}'`

## Run an evaluation

To evaluate your code, run the evaluator:

```bash
spryker-sdk analyze:php:code-compliance
```

This creates `analyze:php:code-compliance.violations.yaml` in the `reports` folder.

To view the report, run the following command:

```bash
spryker-sdk analyze:php:code-compliance-report
```
