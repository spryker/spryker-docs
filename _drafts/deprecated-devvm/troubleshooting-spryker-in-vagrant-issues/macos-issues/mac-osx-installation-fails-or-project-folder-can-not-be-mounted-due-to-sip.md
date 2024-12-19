---
title: Mac OSX - Installation fails or project folder can not be mounted because of SIP
description: Learn how to fix the issue when installation fails on MacOS or project folder can not be mounted because of SIP
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mac-osx-installation-fails-or-project-folder-can-not-be-mounted-due-to-sip
originalArticleId: 32f8d129-e292-4247-9e21-3be46d7f4a5b
redirect_from:
  - /2021080/docs/mac-osx-installation-fails-or-project-folder-can-not-be-mounted-due-to-sip
  - /2021080/docs/en/mac-osx-installation-fails-or-project-folder-can-not-be-mounted-due-to-sip
  - /docs/mac-osx-installation-fails-or-project-folder-can-not-be-mounted-due-to-sip
  - /docs/en/mac-osx-installation-fails-or-project-folder-can-not-be-mounted-due-to-sip
  - /v6/docs/mac-osx-installation-fails-or-project-folder-can-not-be-mounted-due-to-sip
  - /v6/docs/en/mac-osx-installation-fails-or-project-folder-can-not-be-mounted-due-to-sip
related:
  - title: Mac OSX - iterm2 (locale error)
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/macos-issues/mac-osx-iterm2-locale-error.html
  - title: Mac OSX - Wrong curl version error
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/macos-issues/mac-osx-wrong-curl-version-error.html
---

## Description

Sometimes, installation fails or project folder can not be mounted because of SIP on MacOS.

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
