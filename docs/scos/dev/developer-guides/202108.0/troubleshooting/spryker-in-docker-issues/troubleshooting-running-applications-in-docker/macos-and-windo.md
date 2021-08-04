---
title: MacOS and Windows- file synchronization issues in Development mode
originalLink: https://documentation.spryker.com/2021080/docs/macos-and-windows-file-synchronization-issues-in-development-mode
redirect_from:
  - /2021080/docs/macos-and-windows-file-synchronization-issues-in-development-mode
  - /2021080/docs/en/macos-and-windows-file-synchronization-issues-in-development-mode
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
