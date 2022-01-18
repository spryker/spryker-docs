---
title: Running the evaluation tool
description: Instructions for running the evaluation tool
last_updated: Nov 25, 2021
template: concept-topic-template
---
This document describes how to check if code is compliant with Spryker’s standards using the Evaluation tool as part of Spryker-SDK.

## Prerequisites

To start working with the Evaluation tool, connect to the Docker SDK CLI container:

```bash
docker/sdk cli
```

Get general information about the tool and see all available commands related to the evaluation process we may in *analyze* section:

```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console list
```

## Running evaluation

To perform evaluation, run the evaluation tool with format parameter (at this moment evaluator supports only yaml format):

```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console analyze:php:code-compliance --format=yaml
```

as a result, evaluator will create *analyze:php:code-compliance.violations.yaml* into the reports folder

for reading this report we should run:
```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console analyze:php:code-compliance-report
```

## Updating the evaluation tool

To update the evaluation tool to the latest version, run the following command:

```bash
composer update spryker-sdk/evaluator
```
