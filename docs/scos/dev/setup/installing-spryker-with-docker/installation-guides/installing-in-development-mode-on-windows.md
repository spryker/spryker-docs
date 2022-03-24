---
title: Installing in Development mode on Windows
description: Learn how to install Spryker in Development mode on Windows.
last_updated: Oct 21, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/installing-in-development-mode-on-windows
originalArticleId: 14368b32-4d9e-4451-9a46-ecab32966d88
redirect_from:
  - /2021080/docs/installing-in-development-mode-on-windows
  - /2021080/docs/en/installing-in-development-mode-on-windows
  - /docs/installing-in-development-mode-on-windows
  - /docs/en/installing-in-development-mode-on-windows
  - /v6/docs/installing-in-development-mode-on-windows
  - /v6/docs/en/installing-in-development-mode-on-windows

---

This document describes how to install Spryker in [Development Mode](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/choosing-an-installation-mode.html#development-mode) on Windows.

## Installing Docker prerequisites on Windows

To install Docker prerequisites on Windows with WSL1, follow [Installing Docker prerequisites on Windows with WSL1](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-windows-with-wsl1.html).

To install Docker prerequisites on Windows with WSL2, follow [Installing Docker prerequisites on Windows with WSL2](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-windows-with-wsl2.html).




## Installing Spryker in Development mode on Windows
Follow the steps to install Spryker in Development mode:

1. Open Ubuntu.
2. Open a terminal.
3. Create a new folder and navigate into it.

    {% info_block warningBox "Important" %}

    Avoid using folders that are under a Windows filesystem, because it will slow down all operations significantly (the reason is because Ubuntu <-> Windows filesystem sync).

    Wrong: /mnt/c/Users/jdoe/Desktop/project

    Correct: /home/jdoe/workspace/project

    {% endinfo_block %}

4. Depending on the desired [Demo Shop](/docs/scos/user/intro-to-spryker/about-spryker.html#spryker-b2bb2c-demo-shops):
    * Clone the B2C repository:

    ```bash
    git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202108.0  --single-branch ./b2c-demo-shop
    ```

    * Clone the B2B repository:

    ```bash
    git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202108.0  --single-branch ./b2b-demo-shop
    ```

5. Depending on the repository you've cloned, navigate into the cloned folder:
    * B2C repository:
    ```bash
    cd b2c-demo-shop
    ```
    * B2B repository:
    ```bash
    cd b2b-demo-shop
    ```
{% info_block warningBox "Verification" %}

Make sure that you are in the correct folder by running the `pwd` command.

{% endinfo_block %}

6. In `deploy.dev.yml`, define `image:` with the PHP image compatible with the current release of the Demo Shop:

```yaml
image: spryker/php:7.3-alpine3.12
```

7. Clone the Docker SDK repository:
```bash
git clone https://github.com/spryker/docker-sdk.git --single-branch docker
```


8. In `{shop_name}/docker/context/php/debug/etc/php/debug.conf.d/69-xdebug.ini`, set `xdebug.remote_host` and `xdebug.client_host` to `host.docker.internal`:

```text
...
xdebug.remote_host=host.docker.internal
...
xdebug.client_host=host.docker.internal
```

9. Add your user to the `docker` group:

```bash
sudo usermod -aG docker $USER
```

10. Bootstrap local docker setup:
```bash
docker/sdk bootstrap deploy.dev.yml
```
{% info_block warningBox "Bootstrap" %}

Once you finish the setup, you don't need to run `bootstrap` to start the instance. You only need to run it after you update the Docker SDK or the deploy file.

{% endinfo_block %}

11. Update the `hosts` file:
    1. Open the Start menu.
    2. In the search field, enter `Notepad`.
    3. Right-click *Notepad* and select **Run as administrator**.
    4. In the *User Account Control* window, select **Yes** to confirm the action.
    5. In the upper navigation panel, select **File** > **Open**.
    6. Put the following path into the address line: `C:\Windows\System32\drivers\etc`.
    7. In the **File name** line, enter `hosts` and select **Open**.
    The hosts file opens in the drop-down.
    8. Follow the installation instructions in the white box from the `docker/sdk bootstrap` command execution results to prepare the environment.

    {% info_block infoBox %}

    You can run `docker/sdk install` after `bootstrap` to get the list of the instructions.

    {% endinfo_block %}

    {% info_block warningBox "Warning" %}

    Note that some versions of Windows have limitation of number of hostnames per line. It is recommended not to exceed 10 hostnames per line. Split long line into multiple lines if necessary.

    {% endinfo_block %}
 
    9. Select **File** > **Save**.
    10.  Close the file.

12. Once the job finishes, build and start the instance:

```bash
docker/sdk up
```

{% info_block warningBox %}

Depending on the hardware performance, the first project launch can take up to 20 minutes.

{% endinfo_block %}

## Endpoints

To ensure that the installation is successful, make sure you can access the configured endpoints from the Deploy file. See [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html) to learn about the Deploy file.

{% info_block infoBox "RabbitMQ UI credentials" %}

To access RabbitMQ UI, use `spryker` as a username and `secret` as a password. You can adjust the credentials in `deploy.yml`.

{% endinfo_block %}

## Getting the list of useful commands

To get the full and up-to-date list of commands, run `docker/sdk help`.

## Next steps

* [Spryker in Docker troubleshooting](/docs/scos/dev/troubleshooting/troubleshooting-spryker-in-docker-issues/troubleshooting-spryker-in-docker-issues.html)
* [Configuring debugging in Docker](/docs/scos/dev/the-docker-sdk/{{site.version}}/configuring-debugging-in-docker.html)
* [Deploy File Reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html)
* [Configuring services](/docs/scos/dev/the-docker-sdk/{{site.version}}/configuring-services.html)
* [Setting up a self-signed SSL certificate](/docs/scos/dev/setup/installing-spryker-with-docker/configuration/setting-up-a-self-signed-ssl-certificate.html)
* [Adjusting Jenkins for a Docker environment](/docs/scos/dev/setup/installing-spryker-with-docker/configuration/adjusting-jenkins-for-a-docker-environment.html)
