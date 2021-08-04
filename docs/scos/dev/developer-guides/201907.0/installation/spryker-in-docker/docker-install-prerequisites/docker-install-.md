---
title: Docker Install Prerequisites - MacOS
originalLink: https://documentation.spryker.com/v3/docs/docker-install-prerequisites-macos-201907
redirect_from:
  - /v3/docs/docker-install-prerequisites-macos-201907
  - /v3/docs/en/docker-install-prerequisites-macos-201907
---



This article describes install prerequisites for MacOS.

## Minimum System Requirements

Before proceeding, please review the minimum system requirements in the table:

| System Requirement | Additional Details |
| --- | --- |
| vCPU: 2 | This is a minimum requirement. The value can be higher than 2. A lower value is not sufficient for running the application. |
| RAM: 4GB | This is a minimum requirement. The value can be higher than 4GB. A lower value is not sufficient for installation purposes. |
| Swap: 2GB | This is a minimum requirement. The value can be higher than 2GB. A lower value is not sufficient for installation purposes. |

### 1. Install Docker

1. Download and install [Docker Desktop (Mac)](https://download.docker.com/mac/stable/Docker.dmg).
2. Accept the privilege escalation request "Docker Desktop needs privileged access.".
{% info_block infoBox %}
Signup for Docker Hub is not required, so you can close the **Log in with your Docker ID** window.
{% endinfo_block %}

### 2. Enable Buildkit

Go to ![whale](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Docker+Install+Prerequisites+-+MacOS/whale-x.png) → **Preferences**  → **Daemon** →  **Advanced** and add the following:
```php
{
 ...
 "features" : {
 "buildkit" : true
 },
 "experimental" : true
}
```

3. Update Memory and Swap Limits

    1. Go to![whale](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Docker+Install+Prerequisites+-+MacOS/whale-x.png) → **Preferences**  → **Advanced**.
    2. Set **Memory limit** to **> 4Gb** .
    3. Set **Swap limit** to **> 2Gb**.
    4. **Apply** the changes and **Restart**.

{% info_block warningBox %}
You can set smaller Memory and Swap limit values, however, make sure to change the default values.
{% endinfo_block %}

4. Install or Update Docker-sync
{% info_block infoBox %}
This step is required if you want to run Spryker in development mode.
{% endinfo_block %}


Install or update Docker-sync. The following command is used for both:
```shell
sudo gem install docker-sync
```

<!-- Last review date: Aug 06, 2019by Mike Kalinin, Andrii Tserkovnyi -->
