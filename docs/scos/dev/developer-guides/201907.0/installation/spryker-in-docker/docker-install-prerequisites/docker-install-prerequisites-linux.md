---
title: Docker Install Prerequisites - Linux
description: Learn about the steps you need to take before you can start working with Spryker in Docker on Linux.
originalLink: https://documentation.spryker.com/v3/docs/docker-install-prerequisites-linux-201907
originalArticleId: aeaabcb2-25a6-4da4-a256-6bc9da3efb59
redirect_from:
  - /v3/docs/docker-install-prerequisites-linux-201907
  - /v3/docs/en/docker-install-prerequisites-linux-201907
---

This article describes install prerequisites for Linux.

## Minimum System Requirements

Before proceeding, please review the minimum system requirements in the table:

| System Requirement | Additional Details |
| --- | --- |
| vCPU: 2 | This is a minimum requirement. The value can be higher than 2. A lower value is not sufficient for running the application. |
| RAM: 4GB | This is a minimum requirement. The value can be higher than 4GB. A lower value is not sufficient for installation purposes. |
| Swap: 2GB | This is a minimum requirement. The value can be higher than 2GB. A lower value is not sufficient for installation purposes. |

1. Download and install [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) for Linux.
Signup for Docker Hub is not required.
2. Enable BuildKit by creating or updating `/etc/docker/daemon.json` as follows:

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

<!-- Last review date: Aug 06, 2019by Mike Kalinin, Andrii Tserkovnyi -->
