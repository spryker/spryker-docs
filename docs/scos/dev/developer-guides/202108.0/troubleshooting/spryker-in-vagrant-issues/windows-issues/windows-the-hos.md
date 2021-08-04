---
title: Windows- The host path of the shared folder is missing
originalLink: https://documentation.spryker.com/2021080/docs/windows-the-host-path-of-the-shared-folder-is-missing
redirect_from:
  - /2021080/docs/windows-the-host-path-of-the-shared-folder-is-missing
  - /2021080/docs/en/windows-the-host-path-of-the-shared-folder-is-missing
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
