---
title: Define evaluation rules to ignore
description: Learn how to define evaluation rules to ignore
last_updated: Oct 22, 2022
template: howto-guide-template
related:
  - title: Keeping a project upgradable
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html
  - title: Upgrader tool overview
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgrader-tool-overview.html
  - title: Run the evaluator tool
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html
---

When a rule is irrelevant for your project, you can configure it to be ignored. An ignored rule is still used to evaluate the code, related messages are returned in CLI output and reports. However, failing to comply with the rule does not result in exit code 1 from the `analyze:php:code-compliance` command.

To ignore one or more rules, follow the steps:

1. Create `/tooling.yaml`
2. Add rules to the ignore list. For example, add `NotUnique:Constant`:

```yaml
evaluator:
  rules:
    ignore:
      - NotUnique:Constant
```

If code does not comply with the `NotUnique:Constant` rule, now only warnings are returned.
