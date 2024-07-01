---
title: MacOS and Windows - file synchronization issues in Development mode
description: Learn how to deal with file synchronization issues in Development mode on MacOS and Windows.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/macos-and-windows-file-synchronization-issues-in-development-mode
originalArticleId: 1c53083e-003e-4fda-b23e-3d926adcd08b
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/macos-and-windows-file-synchronization-issues-in-development-mode.html
---

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
