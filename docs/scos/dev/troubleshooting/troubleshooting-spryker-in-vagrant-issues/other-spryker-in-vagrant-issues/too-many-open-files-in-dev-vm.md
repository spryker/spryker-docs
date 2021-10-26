---
title: Too many open files in Dev VM
description: Learn how to fix the issue with too many open files in Dev VM
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/too-many-open-files-in-dev-vm
originalArticleId: 2a0c315f-bb24-4c40-a28d-b98531652677
redirect_from:
  - /2021080/docs/too-many-open-files-in-dev-vm
  - /2021080/docs/en/too-many-open-files-in-dev-vm
  - /docs/too-many-open-files-in-dev-vm
  - /docs/en/too-many-open-files-in-dev-vm
  - /v6/docs/too-many-open-files-in-dev-vm
  - /v6/docs/en/too-many-open-files-in-dev-vm
---

## Description
When running `./vendor/bin/install`, the *Too many open files* error occurs.

## Cause
Maximum number of open files is too high.

## Solution
Adjust the maximum number of open files as follows:
```bash
ulimit -n 65535
```
