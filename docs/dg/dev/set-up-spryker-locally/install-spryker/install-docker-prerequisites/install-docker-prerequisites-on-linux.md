---
title: Install Docker prerequisites on Linux
description: Learn about the steps you need to take before you can start working with Spryker in Docker on Linux.
last_updated: Oct 21, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/installing-docker-prerequisites-on-linux
originalArticleId: d6edd360-ab5b-49b6-ad6a-b206abd19dfa
redirect_from:
  - /docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-linux.html
  - /docs/scos/dev/installation/spryker-in-docker/docker-installation-prerequisites/docker-installation-prerequisites-linux.html
  - /docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-linux.html  
related:
  - title: Install Docker prerequisites on MacOS
    link: docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-macos.html
  - title: Install Docker prerequisites on Windows with WSL1
    link: docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl1.html
  - title: Install Docker prerequisites on Windows with WSL2
    link: docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl2.html
---

This document describes the prerequisites for installing Spryker on Linux.

## System requirements for installing Spryker

Review the system and software requirements in the table and configure them using the following instructions.

| REQUIREMENT | VALUE OR VERSION |
| --- | --- |
| Docker | 18.09.1 or higher |
| Docker Compose | 2.0 or higher |  
| vCPU | 2 or more |
| RAM  | 4GB or more |
| Swap  | 2GB or more |

## Install and configure the required software

1. Download and install [Docker for Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/).

{% info_block infoBox %}

Signup for Docker Hub is not required.

{% endinfo_block %}

2. Optional: Configure the `docker` group to manage Docker as a non-root user. See [Manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) for configuration instructions.

3. Install Docker-compose:
<!-- Updating the doc? Update the docker-compose version to the latest one. See https://github.com/docker/compose/releases -->
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

4. Apply executable permissions to the binary:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

You've installed and configured the required software.


## Next steps

To choose an installation mode, see [Choose an installation mode](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/choose-an-installation-mode.html).
If you've already selected an installation mode, follow one of the guides:
* [Install in Development mode on MacOS and Linux](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/install-in-development-mode-on-macos-and-linux.html)
* [Install in Demo mode on MacOS and Linux](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/install-in-demo-mode-on-macos-and-linux.html)
* [Integrating Docker into existing projects](/docs/dg/dev/upgrade-and-migrate/migrate-to-docker/migrate-to-docker.html)
