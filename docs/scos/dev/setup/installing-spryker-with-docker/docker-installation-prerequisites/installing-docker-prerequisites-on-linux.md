---
title: Installing Docker prerequisites on Linux
description: Learn about the steps you need to take before you can start working with Spryker in Docker on Linux.
last_updated: Oct 21, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/installing-docker-prerequisites-on-linux
originalArticleId: d6edd360-ab5b-49b6-ad6a-b206abd19dfa
redirect_from:
  - /2021080/docs/installing-docker-prerequisites-on-linux
  - /2021080/docs/en/installing-docker-prerequisites-on-linux
  - /docs/installing-docker-prerequisites-on-linux
  - /docs/en/installing-docker-prerequisites-on-linux
  - /v6/docs/installing-docker-prerequisites-on-linux
  - /v6/docs/en/installing-docker-prerequisites-on-linux
  - /v5/docs/docker-installation-prerequisites-linux
  - /v5/docs/en/docker-installation-prerequisites-linux
  - /v4/docs/docker-installation-prerequisites-linux
  - /v4/docs/en/docker-installation-prerequisites-linux
  - /v3/docs/docker-install-prerequisites-linux-201907
  - /v3/docs/en/docker-install-prerequisites-linux-201907  -
  - /2021080/docs/docker-installation-prerequisites
  - /2021080/docs/en/docker-installation-prerequisites
  - /docs/docker-installation-prerequisites
  - /docs/en/docker-installation-prerequisites
---

This document describes the prerequisites for installing Spryker in Docker on Linux.


## System requirements for installing Spryker with Docker

Review the system and software requirements in the table.

| Requirement | Value or version |
| --- | --- |
| Docker | 18.09.1 or higher |
| Docker Compose | 1.28 or 1.29 |  
| vCPU | 2 or more |
| RAM  | 4GB or more |
| Swap  | 2GB or more |

## Installing and configuring required software
Follow the steps to install and configure the required software:
1. Download and install [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) for Linux.
{% info_block infoBox %}
Signup for Docker Hub is not required.
{% endinfo_block %}
2. Enable BuildKit by creating or updating `/etc/docker/daemon.json`:

```php
{
  ...
  "features" : {
    ...
    "buildkit" : true
  }
}
```
3. Restart Docker:
```shell
/etc/init.d/docker restart
```
4. Optional: Configure the `docker` group to manage Docker as a non-root user. See [Manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) for configuration instructions.

5. Install Docker-compose:
```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
6. Apply executable permissions to the binary:
```shell
sudo chmod +x /usr/local/bin/docker-compose
```

You've installed and configured the required software.


## Next steps

See [Choosing an installation mode](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/choosing-an-installation-mode.html) to choose an installation mode.
If you've already selected an installation mode, follow one of the guides below:
* [Installing in Development mode on MacOS and Linux](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-development-mode-on-macos-and-linux.html)
* [Installing in Demo mode on MacOS and Linux](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-demo-mode-on-macos-and-linux.html)
* [Integrating Docker into existing projects](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/integrating-the-docker-sdk-into-existing-projects.html)
* [Running production](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/running-production.html)
