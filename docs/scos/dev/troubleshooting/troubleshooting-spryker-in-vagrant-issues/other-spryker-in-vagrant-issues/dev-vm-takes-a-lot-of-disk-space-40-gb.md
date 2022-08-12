---
title: Dev VM takes a lot of disk space (40+ GB)
description: Learn how to fix the issue when Dev VM takes a lot of disk space (40+ GB)
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/dev-vm-takes-a-lot-of-disk-space-40-gb
originalArticleId: 97f68ea2-08bc-4055-ab0d-b509864e9e28
redirect_from:
  - /2021080/docs/dev-vm-takes-a-lot-of-disk-space-40-gb
  - /2021080/docs/en/dev-vm-takes-a-lot-of-disk-space-40-gb
  - /docs/dev-vm-takes-a-lot-of-disk-space-40-gb
  - /docs/en/dev-vm-takes-a-lot-of-disk-space-40-gb
  - /v6/docs/dev-vm-takes-a-lot-of-disk-space-40-gb
  - /v6/docs/en/dev-vm-takes-a-lot-of-disk-space-40-gb
related:
  - title: Error on box image download
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/error-on-box-image-download.html
  - title: Failed to decode response - zlib_decode() - data error
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/failed-to-decode-response-zlib-decode-data-error.html
  - title: NFS export issues
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/nfs-export-issues.html
  - title: .NFS files crash my console commands
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/nfs-files-crash-my-console-commands.html
  - title: Too many open files in Dev VM
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/too-many-open-files-in-dev-vm.html
  - title: VM stuck at 'Configuring and enabling network interfaces'
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/vm-stuck-at-configuring-and-enabling-network-interfaces.html
---

## Description

Spryker Virtual Machine creates a dynamically allocated storage that grows over time as you add data. However, if you delete the data from the virtual machine later, you'll notice that the disk doesn't automatically shrink.

## Solution

To solve this issue, you can use the [dd](https://en.wikipedia.org/wiki/Dd_(Unix)) utility. To do this, run the following commands inside the folder where you placed the source code (by default, it's *devvm*):

```bash
vagrant up
vagrant ssh -c 'sudo dd if=/dev/zero of=/EMPTY bs=1M; sudo rm -f /EMPTY; sudo sync'
```
