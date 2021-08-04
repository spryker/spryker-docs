---
title: Dev VM takes a lot of disk space (40+ GB)
originalLink: https://documentation.spryker.com/2021080/docs/dev-vm-takes-a-lot-of-disk-space-40-gb
redirect_from:
  - /2021080/docs/dev-vm-takes-a-lot-of-disk-space-40-gb
  - /2021080/docs/en/dev-vm-takes-a-lot-of-disk-space-40-gb
---

## Description

Spryker Virtual Machine creates a dynamically allocated storage that grows over time as you add data. However, if you delete the data from the virtual machine later, you'll notice that the disk doesn't automatically shrink.

## Solution
To solve this issue, you can use the [dd](https://en.wikipedia.org/wiki/Dd_(Unix)) utility. To do this, run the following commands inside the folder where you placed the source code (by default, it's *devvm*):

```bash
vagrant up
vagrant ssh -c 'sudo dd if=/dev/zero of=/EMPTY bs=1M; sudo rm -f /EMPTY; sudo sync'
```

