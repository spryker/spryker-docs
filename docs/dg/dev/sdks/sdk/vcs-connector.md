---
title: VCS connector
description: A quick guide to learn everyting you need to know about the VCS connector feature for the Spryker SDK.
template: concept-topic-template
redirect_from:
- /docs/sdk/dev/vcs.html
last_updated: Jan 18, 2023
---

VCS connector lets you use a different VCS system with a single command interface.

To run a VCS, do the following:

1. Run a task:

```shell
spryker-sdk vcs:clone
```

2. Fill in the repository and select a specific VCS as prompted.

All projects are cloned to the temporary `var/tmp` directory.
