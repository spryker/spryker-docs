---
title: Installing Docker prerequisites on MacOS
description: Perform the steps described in the guide before you can start working with Spryker in Docker on MacOS.
originalLink: https://documentation.spryker.com/v6/docs/installing-docker-prerequisites-on-macos
originalArticleId: c418b8a4-6bd8-45aa-9d97-72c14ed3b9b1
redirect_from:
  - /v6/docs/installing-docker-prerequisites-on-macos
  - /v6/docs/en/installing-docker-prerequisites-on-macos
---

This article describes Docker installation prerequisites for MacOS.


## Minimum system requirements

Review the minimum system requirements in the table:

| System Requirement | Additional Details |
| --- | --- |
| vCPU: 2 | This is a minimum requirement. The value can be higher than 2. A lower value is not sufficient for running the application. |
| RAM: 4GB | This is a minimum requirement. The value can be higher than 4GB. A lower value is not sufficient for installation purposes. |
| Swap: 2GB | This is a minimum requirement. The value can be higher than 2GB. A lower value is not sufficient for installation purposes. |


## Installing and configuring required software
Follow the steps to install and configure the required software:
1. Download and install [Docker Desktop (Mac)](https://download.docker.com/mac/stable/Docker.dmg).
2. Accept the privilege escalation request "Docker Desktop needs privileged access.".
{% info_block infoBox %}
Signup for Docker Hub is not required.
{% endinfo_block %}

3. Go to ![whale](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Docker+Install+Prerequisites+-+MacOS/whale-x.png) > **Preferences**  > **Command Line** and **Enable experimental features**.


4. Update Memory and Swap Limits:

    1. Go to![whale](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Docker+Install+Prerequisites+-+MacOS/whale-x.png) > **Preferences**  > **Resources** > **ADVANCED**.
    2. Set **CPUs:** to "4" or higher.
    3. Set **Memory:** to "4.00 GB" or higher.
    4. Set **Swap:** to "2.00 GB" or higher.
    5. Set the desired **Disk image size:**.
    6. Select the desired **Disk image location**.
    7. Click **Apply & Restart**. 

{% info_block warningBox %}
You can set lower **Memory:** and **Swap:** limit values. However, the default limits won't be sufficient to run the application, so make sure to increase them. 
{% endinfo_block %}

5. [Development mode](/docs/scos/dev/developer-guides/202009.0/installation/installing-spryker-with-docker/installation-guides/choosing-an-installation-mode.html#development-mode): Install Mutagen:
```shell
brew install mutagen-io/mutagen/mutagen-beta
```

## Next steps

See [Chossing an installation mode](/docs/scos/dev/developer-guides/202009.0/installation/installing-spryker-with-docker/installation-guides/choosing-an-installation-mode.html) to choose an installation mode.
If you've already selected an installation mode, follow one of the guides below:
* [Installing in Development mode on MacOS and Linux](/docs/scos/dev/developer-guides/202009.0/installation/installing-spryker-with-docker/installation-guides/installing-in-development-mode-on-macos-and-linux.html)
* [Installing in Demo mode on MacOS and Linux](/docs/scos/dev/developer-guides/202009.0/installation/installing-spryker-with-docker/installation-guides/installing-in-demo-mode-on-macos-and-linux.html)
* [Integrating Docker into existing projects](/docs/scos/dev/developer-guides/202009.0/installation/installing-spryker-with-docker/installation-guides/integrating-the-docker-sdk-into-existing-projects.html)
* [Running production](/docs/scos/dev/developer-guides/202009.0/development-guide/back-end/running-production.html)


