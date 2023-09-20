---
title: Ignore evaluation rules
description: Reference information for evaluator configuration file.
template: howto-guide-template
---

In some cases, the evaluator's rules may cause false positive errors. Then you can configure the evaluator to ignore some errors.

1. To configure the evaluator, add `tooling.yml` to the project's root directory.

```yaml
# tooling.yml

evaluator:
  # evaluator options
  ...

```

2. In `ignoreErrors` section, add the errors to ignore using regular expressions.
    You can configure specific or multiple errors to be ignored.

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

The error message matching the regular expressions should now be ignored.
