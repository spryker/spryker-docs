---
title: Running the evaluator tool
description: Instructions for running the evaluator tool
last_updated: Nov 25, 2021
template: concept-topic-template
---

This document describes how to check if code is compliant with Spryker’s standards using the evaluator tool.

## Prerequisites

To start working with the evaluator tool, connect to the Docker SDK CLI container:

```bash
docker/sdk cli
```

Get general information about the tool and see all available commands related to the evaluation process we may in *analyze* section:

```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console list
```

## Installing the evaluator tool

To install the evaluator tool, do the following:

1. In the Docker SDK CLI, install Spryker SDK:
```bash
composer global require spryker-sdk/sdk "dev-master"
```

2. Initialize Spryker SDK:
```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console sdk:init:sdk
```

## Running an evaluation

To evaluate your code, run the Evaluator with the output format defined in YAML:

{% info_block infoBox "Output formats" %}

The Evaluator supports only the YAML format.

{% endinfo_block %}


```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console analyze:php:code-compliance --format=yaml
```

The Evaluator creates `analyze:php:code-compliance.violations.yaml` in the reports folder.

To veiw the report, run the following command:
```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console analyze:php:code-compliance-report
```

## Updating the evaluator tool

To update the evaluator tool to the latest version, run the following command:

```bash
composer update spryker-sdk/evaluator
```
