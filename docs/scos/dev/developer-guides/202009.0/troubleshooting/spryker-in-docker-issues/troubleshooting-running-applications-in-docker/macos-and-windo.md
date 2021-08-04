---
title: MacOS and Windows- file synchronization issues in Development mode
originalLink: https://documentation.spryker.com/v6/docs/macos-and-windows-file-synchronization-issues-in-development-mode
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
