---
title: Evaluator configuration file
description: Reference information for evaluator configuration file.
template: howto-guide-template
---

The configuration file allows to configure evaluator tool for specific project.

## Problem description

The built-in evaluator configuration is not enough for some projects. For example some errors are not fixable and should be ignored. 
Need to provide the way to configure evaluator checkers on project level.

## Evaluator configuration

To configure the evaluator need to place `tooling.yml` in the project root directory.

```yaml
# tooling.yml

evaluator:
  # evaluator options
  ...

```

## Ignoring checkers errors

To ignore errors need to specify regular expressions in `ignoreErrors` section in configuration file. Each error message that matches them will be ignored by evaluator.
You can specify regular expressions both for some specific checkers or globally for all of them.

```yaml
# tooling.yml

evaluator:
    ignoreErrors:
        # generic error regexp
        - '#SprykerSdkTest\\InvalidProject\\MultidimensionalArray\\Application1\\ApplicationDependencyProvider#'
        # error regexp for some specific checker
        - messages:
              - '#deploy.*\.yml#'
              - '#php\.7\.4#'
          checker: PHP_VERSION_CHECKER
```