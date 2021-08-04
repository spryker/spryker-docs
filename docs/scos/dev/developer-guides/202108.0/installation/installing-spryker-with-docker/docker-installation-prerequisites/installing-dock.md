---
title: Installing Docker prerequisites on Linux
originalLink: https://documentation.spryker.com/2021080/docs/installing-docker-prerequisites-on-linux
redirect_from:
  - /2021080/docs/installing-docker-prerequisites-on-linux
  - /2021080/docs/en/installing-docker-prerequisites-on-linux
---

This article describes Docker installation prerequisites for Linux.

## Minimum system requirements

Review the minimum system requirements in the table:

| System Requirement | Additional Details |
| --- | --- |
| vCPU: 2 | This is a minimum requirement. The value can be higher than 2. A lower value is not sufficient for running the application. |
| RAM: 4GB | This is a minimum requirement. The value can be higher than 4GB. A lower value is not sufficient for installation purposes. |
| Swap: 2GB | This is a minimum requirement. The value can be higher than 2GB. A lower value is not sufficient for installation purposes. |

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
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
6. Apply executable permissions to the binary:
```shell
sudo chmod +x /usr/local/bin/docker-compose
```

You've installed and configured the required software. 


## Next steps

See [Choosing an installation mode](https://documentation.spryker.com/docs/choosing-an-installation-mode) to choose an installation mode.
If you've already selected an installation mode, follow one of the guides below:
* [Installing in Development mode on MacOS and Linux](https://documentation.spryker.com/docs/installing-in-development-mode-on-macos-and-linux)
* [Installing in Demo mode on MacOS and Linux](https://documentation.spryker.com/docs/installing-in-demo-mode-on-macos-and-linux)
* [Integrating Docker into existing projects](https://documentation.spryker.com/docs/integrating-docker-into-existing-projects)
* [Running production](https://documentation.spryker.com/docs/running-production)

