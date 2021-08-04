---
title: VM stuck at 'Configuring and enabling network interfaces'
originalLink: https://documentation.spryker.com/v6/docs/vm-stuck-at-configuring-and-enabling-network-interfaces
redirect_from:
  - /v6/docs/vm-stuck-at-configuring-and-enabling-network-interfaces
  - /v6/docs/en/vm-stuck-at-configuring-and-enabling-network-interfaces
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

