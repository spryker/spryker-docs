---
title: Manifest validation
description: The manifest validation validates the YAML structure for a task.
template: howto-guide-template
redirect_from:
- /docs/sdk/dev/manifest-validation.html

last_updated: Nov 22, 2022
---

The manifest validation feature lets you validate the YAML structure definition of a [task](/docs/dg/dev/sdks/sdk/task.html). It checks its structure, types, and related entities.

Validate the YAML definition of a task:

```bash
spryker-sdk sdk:validate:task
```

Task validation displays all the errors in the output. For details about the structure of tasks and task sets, see the following documents:
 - [Task structure](/docs/dg/dev/sdks/sdk/task.html)
 - [Task set structure](/docs/dg/dev/sdks/sdk/task-set.html)
