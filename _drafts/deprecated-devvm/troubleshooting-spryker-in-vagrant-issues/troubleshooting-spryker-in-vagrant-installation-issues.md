---
title: Troubleshooting Spryker in Vagrant installation issues
description: Troubleshoot issues that you might encounter issues when installing Spryker with Vagrant
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/troubleshooting-spryker-in-vagrant-installation-issues
originalArticleId: 9cc16114-a7df-4d7b-80aa-1418ec0c46c9
redirect_from:
  - /2021080/docs/troubleshooting-spryker-in-vagrant-installation-issues
  - /2021080/docs/en/troubleshooting-spryker-in-vagrant-installation-issues
  - /docs/troubleshooting-spryker-in-vagrant-installation-issues
  - /docs/en/troubleshooting-spryker-in-vagrant-installation-issues
  - /v6/docs/troubleshooting-spryker-in-vagrant-installation-issues
  - /v6/docs/en/troubleshooting-spryker-in-vagrant-installation-issues
  - /v5/docs/troubleshooting-1
  - /v5/docs/en/troubleshooting-1
  - /v4/docs/installation-troubleshooting
  - /v4/docs/en/installation-troubleshooting
  - /v3/docs/installation-troubleshooting
  - /v3/docs/en/installation-troubleshooting
  - /v2/docs/installation-troubleshooting
  - /v2/docs/en/installation-troubleshooting
  - /v1/docs/troubleshooting
  - /v1/docs/en/troubleshooting
---
{% info_block warningBox "Warning" %}

We will soon deprecate the DevVM and stop supporting it. Therefore, we highly recommend [installing Spryker with Docker](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

{% endinfo_block %}

When you [install Spryker with Vagrant](/docs/dg/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/installing-spryker-with-devvm-on-macos-and-linux.html), you might encounter issues when you build up the virtual machine, set up applications and services, or perform other installation-related actions. The following sections can help you troubleshoot these types of issues.

## Topics

MacOS issues:

  * [Mac OSX: iterm2 (locale error)](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/macos-issues/mac-osx-iterm2-locale-error.html)
  * [Mac OSX: Installation fails or project folder can not be mounted because of SIP](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/macos-issues/mac-osx-installation-fails-or-project-folder-can-not-be-mounted-due-to-sip.html)
  * [Mac OSX: Wrong curl version error](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/macos-issues/mac-osx-wrong-curl-version-error.html)

Windows issues:

  * [Windows: The host path of the shared folder is missing](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/windows-issues/windows-the-host-path-of-the-shared-folder-is-missing.html)

Databases and services issues:

  * [Peer authentication failed for user postgres](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/databases-and-services-issues/peer-authentication-failed-for-user-postgres.html)
  * [Setup MySQL Workbench to avoid port clashing with the host system](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/databases-and-services-issues/setup-mysql-workbench-to-avoid-port-clashing-with-the-host-system.html)
  * [My Elasticsearch dies](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/databases-and-services-issues/my-elasticsearch-dies.html)
  * [Exception connecting to Redis](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/databases-and-services-issues/exception-connecting-to-redis.html)

Frontend issues:

  * [NPM error during installation](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/frontend-issues/npm-error-during-installation.html)

Other Spryker in Vagrant issues:

  * [Too many open files in Dev VM](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/too-many-open-files-in-dev-vm.html)
  * [VM stuck at *Configuring and enabling network interfaces*](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/vm-stuck-at-configuring-and-enabling-network-interfaces.html)
  * [Error on box image download](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/error-on-box-image-download.html)
  * [NFS export issues](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/nfs-export-issues.html)
  * [.NFS files crash my console commands](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/nfs-files-crash-my-console-commands.html)
  * [Failed to decode response: zlib_decode(): data error](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/failed-to-decode-response-zlib-decode-data-error.html)
  * [Dev VM takes a lot of disk space (40+ GB)](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/other-spryker-in-vagrant-issues/dev-vm-takes-a-lot-of-disk-space-40-gb.html)

If you found a solution to a repetitive issue, please suggest a change to this page using "Edit and Report" button.

{% info_block infoBox %}

If you encounter a Spryker in Vagrant issue that is not addressed on this page, try searching by an error output or keywords, or visit the [Spryker Support Portal](https://spryker.force.com/support/s/) for technical support.

If you found a solution to a repetitive issue, please suggest a change to this page by clicking the **Edit or Report** button.

{% endinfo_block %}
