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
related:
  - title: Dev VM takes a lot of disk space (40+ GB)
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/dev-vm-takes-a-lot-of-disk-space-40-gb.html
  - title: Error on box image download
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/error-on-box-image-download.html
  - title: Failed to decode response - zlib_decode() - data error
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/failed-to-decode-response-zlib-decode-data-error.html
  - title: NFS export issues
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/nfs-export-issues.html
  - title: .NFS files crash my console commands
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/nfs-files-crash-my-console-commands.html
  - title: VM stuck at 'Configuring and enabling network interfaces'
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/vm-stuck-at-configuring-and-enabling-network-interfaces.html
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
