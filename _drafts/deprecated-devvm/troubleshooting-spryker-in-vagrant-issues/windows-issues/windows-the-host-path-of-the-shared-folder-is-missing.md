---
title: Windows- The host path of the shared folder is missing
description: Learn how to resolve an issue on Windows when Windows the host path of the shared folder is missing
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/windows-the-host-path-of-the-shared-folder-is-missing
originalArticleId: 92633686-f92a-4642-bcf8-6e97e00debfc
redirect_from:
  - /2021080/docs/windows-the-host-path-of-the-shared-folder-is-missing
  - /2021080/docs/en/windows-the-host-path-of-the-shared-folder-is-missing
  - /docs/windows-the-host-path-of-the-shared-folder-is-missing
  - /docs/en/windows-the-host-path-of-the-shared-folder-is-missing
  - /v6/docs/windows-the-host-path-of-the-shared-folder-is-missing
  - /v6/docs/en/windows-the-host-path-of-the-shared-folder-is-missing
---

## Description

When building the virtual machine in Windows, you get *The host path of the shared folder is missing* error.

## Solution

Clone the Spryker repository manually and start the machine again. To do this, execute the following commands:

```php
mkdir project
cd project
git clone https://github.com/spryker-shop/suite.git .
cd ..
vagrant up
```
