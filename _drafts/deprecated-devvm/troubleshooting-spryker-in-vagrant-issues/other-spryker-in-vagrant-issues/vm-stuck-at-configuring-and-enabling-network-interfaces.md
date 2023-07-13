---
title: VM stuck at 'Configuring and enabling network interfaces'
description: Learn how to fix the issue when VM gets stuck at 'Configuring and enabling network interfaces'
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/vm-stuck-at-configuring-and-enabling-network-interfaces
originalArticleId: 54f1f2c1-aab6-4111-98fa-c354bf5a476f
redirect_from:
  - /2021080/docs/vm-stuck-at-configuring-and-enabling-network-interfaces
  - /2021080/docs/en/vm-stuck-at-configuring-and-enabling-network-interfaces
  - /docs/vm-stuck-at-configuring-and-enabling-network-interfaces
  - /docs/en/vm-stuck-at-configuring-and-enabling-network-interfaces
  - /v6/docs/vm-stuck-at-configuring-and-enabling-network-interfaces
  - /v6/docs/en/vm-stuck-at-configuring-and-enabling-network-interfaces
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
  - title: Too many open files in Dev VM
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/too-many-open-files-in-dev-vm.html
---

If Spryker Virtual Machine gets stuck at the *Configuring and enabling network interfaces* message during start up, do the following:

1. Press `Ctrl+C` twice to stop the VM start up process.

2. Execute the `vagrant halt` command to stop the VM.

3. Start the virtual machine again with *vagrant up*.

{% info_block infoBox %}

If you get a message that the machine is already running, end all processes related to *Vagrant*, *Virtualbox* and *Ruby*. Then try again.

{% endinfo_block %}

4. If the start up process halts again with the same message, delete all virtual network interfaces in **Virtualbox** and restart the VM again.

{% info_block infoBox %}

The interfaces will be re-created automatically.

{% endinfo_block %}
