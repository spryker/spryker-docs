---
title: Run the evaluator tool
description: Instructions for running the evaluator tool
template: howto-guide-template
---

This document describes how to check if project code is compliant with Spryker’s standards using the evaluator tool.

## Install the evaluator tool

* Install the evaluator tool to project by composer:
```bash
composer require --dev spryker-sdk/evaluator
```

{% info_block warningBox "Specify the Evaluator tool repository" %}

Specify the repository in the `composer.json` file:

```json
    "repositories": [
        {
            "type": "vcs",
            "url":  "https://github.com/spryker-sdk/evaluator.git"
        }
],
```

{% endinfo_block %}

* Get general information about the tool and see all the commands related to evaluation in the `evaluate` section:

```bash
/vendor/bin/evaluator evaluate -h
```

## Run an evaluation

To evaluate your code, run the evaluator in one of the following ways:

* Evaluate the code of all the modules:

```bash
/vendor/bin/evaluator evaluate
```

* Evaluate the code of specific module:

```bash
/vendor/bin/evaluator evaluate --path=src/path_to_module
```

## Resolve upgradability issues

If the report contains upgradability issues, to resolve them, see [Upgradability guidelines](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html).
