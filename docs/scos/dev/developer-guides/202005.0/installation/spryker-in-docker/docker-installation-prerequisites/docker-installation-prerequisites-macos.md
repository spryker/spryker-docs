---
title: Docker Installation Prerequisites - MacOS
description: Perform the steps described in the guide before you can start working with Spryker in Docker on MacOS.
originalLink: https://documentation.spryker.com/v5/docs/docker-installation-prerequisites-macos
originalArticleId: 11c42440-520c-4117-86c4-9ba97b02728e
redirect_from:
  - /v5/docs/docker-installation-prerequisites-macos
  - /v5/docs/en/docker-installation-prerequisites-macos
---

This article describes Docker installation prerequisites for MacOS.


## Minimum System Requirements

Review the minimum system requirements in the table:

| System Requirement | Additional Details |
| --- | --- |
| vCPU: 2 | This is a minimum requirement. The value can be higher than 2. A lower value is not sufficient for running the application. |
| RAM: 4GB | This is a minimum requirement. The value can be higher than 4GB. A lower value is not sufficient for installation purposes. |
| Swap: 2GB | This is a minimum requirement. The value can be higher than 2GB. A lower value is not sufficient for installation purposes. |


## Required Software and Configuration
Follow the steps to install and configure the required software:
1. Download and install [Docker Desktop (Mac)](https://download.docker.com/mac/stable/Docker.dmg).
2. Accept the privilege escalation request "Docker Desktop needs privileged access.".
{% info_block infoBox %}
Signup for Docker Hub is not required.
{% endinfo_block %}

3. Go to ![whale](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Docker+Install+Prerequisites+-+MacOS/whale-x.png) → **Preferences**  → **Command Line** and **Enable experimental features**.


4. Update Memory and Swap Limits:

    1. Go to![whale](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Docker+Install+Prerequisites+-+MacOS/whale-x.png) → **Preferences**  → **Resources** → **ADVANCED**.
    2. Set **CPUs:** to "4" or higher.
    3. Set **Memory:** to "4.00 GB" or higher.
    4. Set **Swap:** to "2.00 GB" or higher.
    5. Set the desired **Disk image size:**.
    6. Select the desired **Disk image location**.
    7. Click **Apply & Restart**. 

{% info_block warningBox %}
You can set lower **Memory:** and **Swap:** limit values. However, the default limits won't be sufficient to run the application, so make sure to increase them. 
{% endinfo_block %}

5. Install or update Docker-sync:
```shell
sudo gem install docker-sync
```
{% info_block infoBox %}
This step is required if you want to run Spryker in [Development mode](/docs/scos/dev/developer-guides/202005.0/installation/spryker-in-docker/installation-guides/modes-overview.html#development-mode
{% endinfo_block %}.)

**What's next?**
See [Modes Overview](/docs/scos/dev/developer-guides/202005.0/installation/spryker-in-docker/installation-guides/modes-overview.html) to learn about installation modes of Spryker in Docker.
If you've already selected an installation mode, follow one of the guides below:
* [Installation Guide - Development Mode](/docs/scos/dev/developer-guides/202005.0/installation/spryker-in-docker/installation-guides/installation-guide-development-mode.html)
* [Installation Guide- Demo Mode](/docs/scos/dev/developer-guides/202005.0/installation/spryker-in-docker/installation-guides/installation-guide-demo-mode.html)
* [Integrating Docker into Existing Projects](/docs/scos/dev/developer-guides/202005.0/installation/spryker-in-docker/installation-guides/integrating-docker-into-existing-projects.html)
* [Running Production](/docs/scos/dev/developer-guides/202005.0/development-guide/back-end/running-production.html)

<!-- Last review date: Aug 06, 2019by Mike Kalinin, Andrii Tserkovnyi -->
