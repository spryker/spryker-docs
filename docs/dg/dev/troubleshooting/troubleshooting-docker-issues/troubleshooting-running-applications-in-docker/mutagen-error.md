---
title: Mutagen error
description: Learn how to fix the Mutagen error when running applications in docker with your Spryker projects.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-error.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


## Description

You get the error:

```bash
unable to reconcile Mutagen sessions: unable to create synchronization session (spryker-dev-codebase): unable to connect to beta: unable to connect to endpoint: unable to dial agent endpoint: unable to create agent command: unable to probe container: container probing failed under POSIX hypothesis (signal: killed) and Windows hypothesis (signal: killed)
```

## Solution

1. Restart your OS.
2. If the error persists: Check [Mutagen documentation](https://mutagen.io/documentation/introduction).
