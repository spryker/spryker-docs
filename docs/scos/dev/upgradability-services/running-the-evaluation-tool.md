---
title: Running the evaluation tool
description: Instructions for running the evaluation tool
last_updated: Nov 25, 2021
template: concept-topic-template
---

This document describes how to check if code is compliant with Spryker’s standards using the Evaluation tool.

## Prerequisites

To start working with the Evaluation tool, connect to the Docker SDK CLI container:

```bash
docker/sdk cli
```

Get general information about the tool and see all available commands related to the evaluation process we may in *analyze* section:

```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console list
```

## Running an evaluation

To evaluate your code, run the Evaluator with the output format defined in YAML:

{% info_block infoBox "Output formats" %}

The Evaluator supports only the YAML format.

{% endinfo_block %}


```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console analyze:php:code-compliance --format=yaml
```

The Evaluator creates *analyze:php:code-compliance.violations.yaml* in the reports folder.

for reading this report we should run:
```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console analyze:php:code-compliance-report
```

## Updating the evaluation tool

To update the evaluation tool to the latest version, run the following command:

```bash
composer update spryker-sdk/evaluator
```
