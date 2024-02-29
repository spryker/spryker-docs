  - /docs/sdk/dev/manifest-validation.html
---
title: Manifest validation
description: The manifest validation validates the YAML structure for a task.
template: howto-guide-template
redirect_from:
last_updated: Nov 22, 2022
---

The manifest validation feature lets you validate the YAML structure definition of a [task](/docs/sdk/dev/task.html).
It checks its structure, types, and related entities.

### How to use the manifest validation

To validate the YAML definition of a task, run the following command:

```bash
spryker-sdk sdk:validate:task
```

### Fixing the errors

Task validation displays all the errors in the output. See the following documents for details about the structure of tasks and task sets:
 - [Task structure](/docs/sdk/dev/task.html)
 - [Task set structure](/docs/sdk/dev/task-set.html)
