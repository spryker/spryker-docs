---
title: Install Spryker
description: Spryker provides an easy way to bootstrap applications and prepare development and production environments for running Spryker OS in Docker.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/installing-spryker-with-docker
originalArticleId: 41fb5887-0351-4678-8e21-9c37ce898925
redirect_from:
  - /2021080/docs/installing-spryker-with-docker
  - /2021080/docs/en/installing-spryker-with-docker
  - /docs/installing-spryker-with-docker
  - /docs/en/installing-spryker-with-docker
  - /v6/docs/installing-spryker-with-docker
  - /v6/docs/en/installing-spryker-with-docker
  - /v5/docs/getting-started-with-docker
  - /v5/docs/en/getting-started-with-docker
  - /v3/docs/spryker-in-docker-201907
  - /v3/docs/en/spryker-in-docker-201907
  - /2021080/docs/getting-started-with-docker
  - /2021080/docs/en/getting-started-with-docker
  - /docs/getting-started-with-docker
  - /docs/en/getting-started-with-docker
  - /docs/scos/dev/set-up/installing-spryker-with-development-virtual-machine/installing-spryker-with-development-virtual-machine.html
  - /docs/scos/dev/set-up/installing-spryker-without-docker.html
  - /docs/scos/dev/set-up/installing-spryker-without-development-virtual-machine-or-docker.html
  - /docs/docker-installation-prerequisites-windows
related:
  - title: Install Docker prerequisites on Linux
    link: docs/scos/dev/set-up/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-linux.html
  - title: Install Docker prerequisites on MacOS
    link: docs/scos/dev/set-up/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-macos.html
  - title: Install Docker prerequisites on Windows with WSL1
    link: docs/scos/dev/set-up/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl1.html
  - title: Install Docker prerequisites on Windows with WSL2
    link: docs/scos/dev/set-up/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl2.html
---

This section is a comprehensive introduction to running Spryker in Docker containers locally.

Spryker provides a standardized and customizable way to bootstrap applications and prepare development environments using the [Docker SDK tool](/docs/scos/dev/the-docker-sdk/{{site.version}}/the-docker-sdk.html).

To install Spryker with Docker locally, follow the steps.

## Prerequisites

Review the installation prerequisites for your operating system:

* [Install Docker prerequisites on MacOS](/docs/scos/dev/set-up/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-macos.html)
* [Install Docker prerequisites on Linux](/docs/scos/dev/set-up/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-linux.html)
* [Install Docker prerequisites on Windows with WSL1](/docs/scos/dev/set-up/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl1.html).
* [Install Docker prerequisites on Windows with WSL2](/docs/scos/dev/set-up/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl2.html).

## Installation

There are several ways to install a Docker-based instance of Spryker. For more details about them, see [Choose an installation mode](/docs/scos/dev/set-up/install-spryker/install/choose-an-installation-mode.html).

If you've already selected an installation mode, follow one of the guides below:

* [Install in Development mode on MacOS and Linux](/docs/scos/dev/set-up/install-spryker/install/install-in-development-mode-on-macos-and-linux.html)
* [Install in Development mode on Windows](/docs/scos/dev/set-up/install-spryker/install/install-in-development-mode-on-windows.html)
* [Install in Demo mode on MacOS and Linux](/docs/scos/dev/set-up/install-spryker/install/install-in-demo-mode-on-macos-and-linux.html)
* [Install in Demo mode on Windows](/docs/scos/dev/set-up/install-spryker/install/install-in-demo-mode-on-windows.html)
* [Integrating Docker into existing projects](/docs/scos/dev/set-up/install-spryker/install/integrating-the-docker-sdk-into-existing-projects.html)

## Configuration

After installation, the instance can be customized further to meet your project requirements.
The following documents detail these customizations:

* [Configuring services](/docs/scos/dev/the-docker-sdk/{{site.version}}/configure-services.html)
* [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html)
* [Adjust Jenkins for a Docker environment](/docs/scos/dev/set-up/configure-after-installing/adjust-jenkins-for-a-docker-environment.html)
