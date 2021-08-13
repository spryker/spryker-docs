---
title: Windows- The host path of the shared folder is missing
description: Learn how to resolve an issue on Windows when Windows the host path of the shared folder is missing
originalLink: https://documentation.spryker.com/v6/docs/windows-the-host-path-of-the-shared-folder-is-missing
originalArticleId: 158b3a28-b173-450c-a748-b8847411b04a
redirect_from:
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
