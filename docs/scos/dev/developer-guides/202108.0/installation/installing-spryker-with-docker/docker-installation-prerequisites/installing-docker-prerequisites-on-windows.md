---
title: Installing Docker prerequisites on Windows
description: This page describes the steps that are to be performed before you can start working with Spryker in Docker on Windows.
originalLink: https://documentation.spryker.com/2021080/docs/installing-docker-prerequisites-on-windows
redirect_from:
  - /2021080/docs/installing-docker-prerequisites-on-windows
  - /2021080/docs/en/installing-docker-prerequisites-on-windows
---


This article describes Docker installation prerequisites for Windows.
 
{% info_block warningBox %}
When running commands described in this document, use absolute paths. For example: `mkdir /d/spryker && cd $_` or `mkdir /c/Users/spryker && cd $_`.
{% endinfo_block %}

## Minimum system requirements

Review the minimum system requirements in the table:

| System Requirement | Additional Details |
| --- | --- |
| Windows 10 64bit | Pro, Enterprise, or Education (1607 Anniversary Update, Build 14393 or later). |
| BIOS Virtualization is enabled | Typically, virtualization is enabled by default. Note that having the virtualization enabled is different from having Hyper-V enabled. This setting can be checked in the **Task Manager** → **Performance** tab.  For more details, see [Virtualization must be enabled](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization-must-be-enabled). |
| CPU SLAT-capable feature | SLAT is CPU related feature. It is called Rapid Virtualization Indexing (RVI). |
| RAM: 4GB | This is a minimum requirement. The value can be higher than 4GB. A lower value is not sufficient for installation purposes. |
| vCPU: 2 | This is a minimum requirement. The value can be higher than 2. A lower value is not sufficient for running the application. |

## Installing and configuring the required software with WSL2

{% info_block infoBox "WSL1 and WSL2" %}

If you cannot use WSL2, you can [install and configure the required software with WSL1](https://documentation.spryker.com/v5/docs/docker-installation-prerequisites-windows#install-and-configure-the-required-software-with-wsl1). Since WSL1 is outdated, you may get multiple issues with its configuration. We recommend using WSL2 if possible.

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

See [Chossing an installation mode](https://documentation.spryker.com/docs/choosing-an-installation-mode) to choose an installation mode.
If you've already selected an installation mode, follow one of the guides below:
* [Installing in Development mode on Windows](https://documentation.spryker.com/docs/installing-in-development-mode-on-windows)
* [Installing in Demo mode on Windows](https://documentation.spryker.com/docs/installing-in-demo-mode-on-windows)
* [Integrating Docker into existing projects](https://documentation.spryker.com/docs/integrating-docker-into-existing-projects)
* [Running production](https://documentation.spryker.com/docs/running-production)

