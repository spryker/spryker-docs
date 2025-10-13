---
title: Ignore evaluation errors
description: A short guide detailing the reference information for evaluator configuration file for your Spryker based projects.
template: howto-guide-template
last_updated: Sep 20, 2023
redirect_from:
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/ignore-evaluation-errors.html
---

In some cases, the evaluator's rules may cause false positive errors. Then you can configure the evaluator to ignore some errors.

1. To configure the evaluator to ignore errors, add `tooling.yml` to the project's root directory.

```yaml

evaluator:
  # evaluator options
  ...

```

2. In the `ignoreErrors` section, add the errors to ignore using regular expressions.
    You can specify errors to ignore globally or per specific checker.

**tooling.yml**

```yaml

evaluator:
    ignoreErrors:
        # global error ignore regexp
        - '#SprykerSdkTest\\InvalidProject\\MultidimensionalArray\\Application1\\ApplicationDependencyProvider#'
        # error ignore regexp for a defined checker
        - messages:
              - '#deploy.*\.yml#'
              - '#php\.7\.4#'
          checker: PHP_VERSION_CHECKER
```

The error message matching the regular expressions should now be ignored.
