---
title: Failed to decode response - zlib_decode() - data error
description: Learn how to fix the issue Failed to decode response- zlib_decode()- data error
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/failed-to-decode-response-zlib-decode-data-error
originalArticleId: 9d1d83ed-12e8-426f-a292-f6ec31574325
redirect_from:
  - /2021080/docs/failed-to-decode-response-zlib-decode-data-error
  - /2021080/docs/en/failed-to-decode-response-zlib-decode-data-error
  - /docs/failed-to-decode-response-zlib-decode-data-error
  - /docs/en/failed-to-decode-response-zlib-decode-data-error
  - /v6/docs/failed-to-decode-response-zlib-decode-data-error
  - /v6/docs/en/failed-to-decode-response-zlib-decode-data-error
related:
  - title: Dev VM takes a lot of disk space (40+ GB)
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/dev-vm-takes-a-lot-of-disk-space-40-gb.html
  - title: Error on box image download
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/error-on-box-image-download.html
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

When running `composer install` or `composer update`, you might get the issue *Failed to decode response: zlib_decode(): data error* .

## Solution

Change the composer configuration by running `composer config -ge` in the terminal and replacing the configuration with the following one

```php
{
    "repositories": {
        "packagist": { "url": "https://packagist.org", "type": "composer" }
    }
}
```
