---
title: Mac OSX- Installation fails or project folder can not be mounted due to SIP
originalLink: https://documentation.spryker.com/v6/docs/mac-osx-installation-fails-or-project-folder-can-not-be-mounted-due-to-sip
redirect_from:
  - /v6/docs/mac-osx-installation-fails-or-project-folder-can-not-be-mounted-due-to-sip
  - /v6/docs/en/mac-osx-installation-fails-or-project-folder-can-not-be-mounted-due-to-sip
---

## Description
Sometimes, installation fails or project folder can not be mounted due to SIP on MacOS.

## Cause
SIP (System Integrity Protection) is a MacOS feature that protects the system files from modification. In some cases, it precludes the proper functioning of third-party applications and may prevent you from installing Spryker on MacOS starting from version 10.11 El Capitan. 

This may produce the effect of the VM correctly installed and started, but the `/project` folder containg the application to be run, can not be mounted inside the VM. This means that the whole application can not be started und run. If logged into the VM via `vagrant ssh`the improperly mounted project folder can be identified by running the `ls` command which returns the following error message:

```bash
ls: cannot open directory '.': Stale file handle
```

## Solution

To solve this problem, disable SIP during the installation:

1. Reboot your Mac and hold down the Command+R as it boots.
2. Wait for entering the recovery environment.
3. Click on the “Utilities” menu and select “Terminal”.
4. Type `csrutil disable` in the terminal and press Enter.
5. Type `reboot`.

After SIP is disabled, install Spryker. It is strongly recommended to enable SIP when Spryker is installed. To do that, repeat the steps above, replacing the `csrutil disable` command with `csrutil enable`.


{% info_block warningBox "Verification" %}

Make sure SIP is enabled by running the command:
```bash
csrutil status
```

{% endinfo_block %}

If enabling SIP again prevents the VM from mounting the `/project folder`, consult with DevOPS engineers to find out if there's a solution or if permanent disabling of SIP is an acceptable trade off.
