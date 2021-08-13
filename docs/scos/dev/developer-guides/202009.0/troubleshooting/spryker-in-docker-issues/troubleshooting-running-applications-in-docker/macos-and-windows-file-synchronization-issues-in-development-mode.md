---
title: MacOS and Windows- file synchronization issues in Development mode
description: Learn how to deal with file synchronization issues in Development mode on MacOS and Windows.
originalLink: https://documentation.spryker.com/v6/docs/macos-and-windows-file-synchronization-issues-in-development-mode
originalArticleId: 54d0474c-7e74-4048-b46c-c7acfa6f8646
redirect_from:
  - /v6/docs/macos-and-windows-file-synchronization-issues-in-development-mode
  - /v6/docs/en/macos-and-windows-file-synchronization-issues-in-development-mode
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
