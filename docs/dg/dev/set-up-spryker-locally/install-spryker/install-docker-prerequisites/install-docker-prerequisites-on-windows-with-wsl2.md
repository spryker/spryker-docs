---
title: Install Docker prerequisites on Windows with WSL2
description: This page describes the steps that are to be performed before you can start working with Spryker in Docker on Windows.
last_updated: Oct 21, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/installing-docker-prerequisites-on-windows
originalArticleId: ae6a351f-e302-4d1b-a2a7-1f4ff8b263e8
redirect_from:
  - /docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl2.html
  - /docs/scos/dev/installation/spryker-in-docker/docker-installation-prerequisites/docker-installation-prerequisites-windows.html
  - /docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-windows-with-wsl2.html  
related:
  - title: Install Docker prerequisites on Linux
    link: docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-linux.html
  - title: Install Docker prerequisites on MacOS
    link: docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-macos.html
  - title: Install Docker prerequisites on Windows with WSL1
    link: docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl1.html
---

This document describes the prerequisites for installing Spryker on Windows.


## System requirements for installing Spryker

| REQUIREMENT | VALUE OR VERSION | ADDITIONAL DETAILS |
| --- | --- | --- |
| Windows | 10 or 11 (64bit) | Pro, Enterprise, or Education (1607 Anniversary Update, Build 14393 or later). |
| BIOS Virtualization | Enabled | Typically, virtualization is enabled by default. Note that having the virtualization enabled is different from having Hyper-V enabled. You can check this setting in the **Task Manager&nbsp;<span aria-label="and then">></span> Performance** tab. For more details, see [Virtualization must be enabled](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization-must-be-enabled). |
| CPU SLAT-capable feature | Enabled |SLAT is CPU related feature. It is called Rapid Virtualization Indexing (RVI). |
| Docker | 18.09.1 or higher |
| Docker Compose | 2.0 or higher |  
| RAM  | 4GB or more |
| Swap  | 2GB or more |

## Install and configure the required software

{% info_block warningBox %}

When running commands described in this document, use absolute paths. For example: `mkdir /d/spryker && cd $_` or `mkdir /c/Users/spryker && cd $_`.

{% endinfo_block %}

Follow the steps below to install and configure the required software with WSL2:

1. [Enable WSL2 and install Docker Desktop](https://docs.docker.com/docker-for-windows/wsl/).

2. In the **General** tab of the Docker Desktop settings, select **Expose daemon on tcp://localhost:2375 without TLS**.

3. To save the settings, click **Apply & Restart**.

4. Install Ubuntu 20.04.

5. Run Ubuntu and update it:

```bash
sudo apt update && sudo apt dist-upgrade
```

6. Exit Ubuntu and restart Windows.

You've installed and configured the required software.


## Next steps

To choose an installation mode, see [Choose an installation mode](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/choose-an-installation-mode.html).
If you've already selected an installation mode, follow one of the guides below:
* [Install in Development mode on Windows](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/install-in-development-mode-on-windows.html)
* [Install in Demo mode on Windows](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/install-in-demo-mode-on-windows.html)
* [Integrating Docker into existing projects](/docs/dg/dev/upgrade-and-migrate/migrate-to-docker/migrate-to-docker.html)
