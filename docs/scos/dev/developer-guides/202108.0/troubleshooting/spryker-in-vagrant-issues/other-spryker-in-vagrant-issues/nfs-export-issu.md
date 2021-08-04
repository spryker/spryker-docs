---
title: NFS export issues
originalLink: https://documentation.spryker.com/2021080/docs/nfs-export-issues
redirect_from:
  - /2021080/docs/nfs-export-issues
  - /2021080/docs/en/nfs-export-issues
---

## Description
The following error can occur:

```
NFS is reporting that your exports file is invalid, this means that Vagrant does
this check before making any changes to the file. Please correct
the issues below and execute "vagrant reload":
exports:3: path contains non-directory or non-existent components: /devvm/pillar
exports:3: no usable directories in export entry
exports:3: using fallback (marked offline): /
exports:4: path contains non-directory or non-existent components: /devvm/saltstack
exports:4: no usable directories in export entry
exports:4: using fallback (marked offline): /
```

## Solution
Try re-creating NFS exports by running the following commands:

```bash
sudo rm /etc/exports
sudo touch /etc/exports
```

If you still get the *NFS is reporting that your export file is invalid* error, this can also happen because you previously had VMs that were not properly destroyed. Also, such an error can occur when multiple VMs are hosted o the same computer. To fix this:

```bash
sudo sed -i .bak '/VAGRANT-BEGIN/,/VAGRANT-END/d' /etc/exports
```

Then, you need to re-initialize the VM:

```bash
vagrant halt
vagrant up --provision
# - OR -
vagrant destroy
vagrant up
```

