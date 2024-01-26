---
title: Run the evaluator tool
description: Instructions for running the evaluator tool
template: howto-guide-template
last_updated: Sep 18, 2023
redirect_from:
---

This document outlines the process of using the evaluator tool to verify if your project code adheres to Spryker's standards.

## Install the evaluator tool

* Install the evaluator tool in your project by using the composer:
```bash
composer require --dev spryker-sdk/evaluator
```

* Get general information about the tool and see all the commands related to evaluation in the `evaluate` section:

```bash
vendor/bin/evaluator evaluate -h
```

## Run an evaluation

To evaluate your code, run the evaluator in one of the following ways:

* Evaluate the code of all the modules:

```bash
vendor/bin/evaluator evaluate
```

* Evaluate the code of a specific module:

```bash
vendor/bin/evaluator evaluate --path=src/path_to_module
```

## Resolve upgradability issues

If the report contains upgradability issues, see [Upgradability guidelines](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html) to resolve them.
