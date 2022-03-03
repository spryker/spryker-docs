---
title: Installing Docker prerequisites on Windows with WSL2
description: This page describes the steps that are to be performed before you can start working with Spryker in Docker on Windows.
last_updated: Oct 21, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/installing-docker-prerequisites-on-windows
originalArticleId: ae6a351f-e302-4d1b-a2a7-1f4ff8b263e8
redirect_from:
  - /2021080/docs/installing-docker-prerequisites-on-windows
  - /2021080/docs/en/installing-docker-prerequisites-on-windows
  - /docs/installing-docker-prerequisites-on-windows
  - /docs/en/installing-docker-prerequisites-on-windows
  - /v6/docs/installing-docker-prerequisites-on-windows
  - /v6/docs/en/installing-docker-prerequisites-on-windows
  - /v5/docs/docker-installation-prerequisites-windows
  - /v5/docs/en/docker-installation-prerequisites-windows
  - /v4/docs/docker-installation-prerequisites-windows
  - /v4/docs/en/docker-installation-prerequisites-windows
  - /v3/docs/docker-install-prerequisites-windows-201907
  - /v3/docs/en/docker-install-prerequisites-windows-201907
---


This document describes the prerequisites for installing Spryker in Docker on Windows.


## System requirements for installing Spryker with Docker

Review the system and software requirements in the table.

| Requirement | Value or version | Additional details |
| --- | --- | --- |
| Windows | 10 64bit | Pro, Enterprise, or Education (1607 Anniversary Update, Build 14393 or later). |
| BIOS Virtualization | Enabled | Typically, virtualization is enabled by default. Note that having the virtualization enabled is different from having Hyper-V enabled. This setting can be checked in the **Task Manager** → **Performance** tab.  For more details, see [Virtualization must be enabled](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization-must-be-enabled). |
| CPU SLAT-capable feature | Enabled |SLAT is CPU related feature. It is called Rapid Virtualization Indexing (RVI). |
| Docker | 18.09.1 or higher |
| Docker Compose | 1.28 or 1.29 |  
| RAM  | 4GB or more |
| Swap  | 2GB or more |

## Installing and configuring the required software with WSL2

{% info_block infoBox "WSL1 and WSL2" %}

If you cannot use WSL2, you can [install and configure the required software with WSL1](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-windows-with-wsl1.html). Since WSL1 is outdated, you may get multiple issues with its configuration. We recommend using WSL2 if possible.

{% endinfo_block %}

{% info_block warningBox %}
When running commands described in this document, use absolute paths. For example: `mkdir /d/spryker && cd $_` or `mkdir /c/Users/spryker && cd $_`.
{% endinfo_block %}

Follow the steps below to install and configure the required software with WSL2:

1. [Enable WSL2 and install Docker Desktop](https://docs.docker.com/docker-for-windows/wsl/).

2. In the **General** tab of the Docker Desktop settings, select **Expose daemon on tcp://localhost:2375 without TLS**.

3. To save the settings, select **Apply & Restart**.

4. Install Ubuntu 20.04.

5. Run Ubuntu and update it:

```bash
sudo apt update && sudo apt dist-upgrade
```

6. Exit Ubuntu and restart Windows.


You've installed and configured the required software.


## Next steps

See [Chossing an installation mode](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/choosing-an-installation-mode.html) to choose an installation mode.
If you've already selected an installation mode, follow one of the guides below:
* [Installing in Development mode on Windows](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-development-mode-on-windows.html)
* [Installing in Demo mode on Windows](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-demo-mode-on-windows.html)
* [Integrating Docker into existing projects](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/integrating-the-docker-sdk-into-existing-projects.html)
* [Running production](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/running-production.html)
