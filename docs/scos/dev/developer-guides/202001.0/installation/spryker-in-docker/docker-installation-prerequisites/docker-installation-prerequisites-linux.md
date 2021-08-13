---
title: Docker Installation Prerequisites - Linux
description: Learn about the steps you need to take before you can start working with Spryker in Docker on Linux.
originalLink: https://documentation.spryker.com/v4/docs/docker-installation-prerequisites-linux
originalArticleId: bcc1e223-c805-4f6e-b38a-f65d409759f6
redirect_from:
  - /v4/docs/docker-installation-prerequisites-linux
  - /v4/docs/en/docker-installation-prerequisites-linux
---

This article describes Docker installation prerequisites for Linux.

## Minimum System Requirements

Review the minimum system requirements in the table:

| System Requirement | Additional Details |
| --- | --- |
| vCPU: 2 | This is a minimum requirement. The value can be higher than 2. A lower value is not sufficient for running the application. |
| RAM: 4GB | This is a minimum requirement. The value can be higher than 4GB. A lower value is not sufficient for installation purposes. |
| Swap: 2GB | This is a minimum requirement. The value can be higher than 2GB. A lower value is not sufficient for installation purposes. |

## Required Software and Configuration
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
4. Install Docker-compose:
```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
5. Apply executable permissions to the binary:
```shell
sudo chmod +x /usr/local/bin/docker-compose
```

**What's next?**
See [Modes Overview](/docs/scos/dev/developer-guides/202001.0/installation/spryker-in-docker/installation-guides/modes-overview.html) to learn about installation modes of Spryker in Docker.
If you've already selected an installation mode, follow one of the guides below:
* [Installation Guide - Development Mode](/docs/scos/dev/developer-guides/202001.0/installation/spryker-in-docker/installation-guides/installation-guide-development-mode.html)
* [Installation Guide- Demo Mode](/docs/scos/dev/developer-guides/202001.0/installation/spryker-in-docker/installation-guides/installation-guide-demo-mode.html)
* [Integrating Docker into Existing Projects](/docs/scos/dev/developer-guides/202001.0/installation/spryker-in-docker/installation-guides/integrating-docker-into-existing-projects.html)
* [Running Production](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/running-production.html)

