---
title: MacOS and Windows - file synchronization issues in Development mode
description: Learn how to deal with file synchronization issues in Development mode on MacOS and Windows.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/macos-and-windows-file-synchronization-issues-in-development-mode.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


A project has file synchronization issues in Development mode.

## Solution

1. Follow sync logs:

```bash
docker/sdk sync logs
```

2. Hard reset:

```bash
docker/sdk trouble && rm -rf vendor && rm -rf src/Generated && docker/sdk sync && docker/sdk up
```
