---
title: Error on box image download
description: Learn how to to fix the error on box image download
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/error-on-box-image-download
originalArticleId: b2c494e8-3621-463b-9d8b-b175d525d1c7
redirect_from:
  - /2021080/docs/error-on-box-image-download
  - /2021080/docs/en/error-on-box-image-download
  - /docs/error-on-box-image-download
  - /docs/en/error-on-box-image-download
  - /v6/docs/error-on-box-image-download
  - /v6/docs/en/error-on-box-image-download
related:
  - title: Dev VM takes a lot of disk space (40+ GB)
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/dev-vm-takes-a-lot-of-disk-space-40-gb.html
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

When downloading Spryker VM box image file, an error occurs.

## Solution

Try running Vagrant with debug to see potential errors: `vagrant up --debug`.

Also, you can go to [Spryker VM Releases](https://github.com/spryker/devvm/releases/) page and download the box manually. After finishing the box download, you need to run the following:

```bash
vagrant box add /path/to/downloaded/image/file.box --name <boxname>
vagrant up
```
