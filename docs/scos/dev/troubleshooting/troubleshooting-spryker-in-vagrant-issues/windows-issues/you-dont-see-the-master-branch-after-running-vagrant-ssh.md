---
title: You don't see the master branch after running vagrant-ssh
description: Fix the issue when there is no switch to the master branch after running vagrant-ssh
template: troubleshooting-guide-template
---

## Description

After running the `vagrant-ssh`, in the command line, you should see the `master` branch (for example, `vagrant@vm-suite /data/shop/development/current (master)`), but this does not happen.

## Cause

The project folder is not shared with VirtualBox.

## Solution
Force-enable shared folders in VirtualBox:
```bash
VBoxManage setextradata "Spryker Dev VM (suite)" VBoxInternal2/SharedFoldersEnableSymlinksCreate/data_shop_development_current
```