---
title: Installing in Development mode on MacOS and Linux
description: Learn how to install Spryker in Development mode on MacOS and Linux.
last_updated: Oct 21, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/installing-in-development-mode-on-macos-and-linux
originalArticleId: 3a4af86a-3fb7-4fb2-b47e-4f1eb703fae6
redirect_from:
  - /2021080/docs/installing-in-development-mode-on-macos-and-linux
  - /2021080/docs/en/installing-in-development-mode-on-macos-and-linux
  - /docs/installing-in-development-mode-on-macos-and-linux
  - /docs/en/installing-in-development-mode-on-macos-and-linux
  - /v6/docs/installing-in-development-mode-on-macos-and-linux
  - /v6/docs/en/installing-in-development-mode-on-macos-and-linux
  - /v5/docs/installation-guide-development-mode
  - /v5/docs/en/installation-guide-development-mode
  - /v4/docs/installation-guide-development-mode
  - /v4/docs/en/installation-guide-development-mode
  - /2021080/docs/installation-guide-development-mode
  - /2021080/docs/en/installation-guide-development-mode
  - /docs/installation-guide-development-mode
  - /docs/en/installation-guide-development-mode
  - /docs/scos/dev/setup/installing-spryker-with-development-virtual-machine/installing-spryker-with-devvm-on-macos-and-linux.html
related:
  - title: Database access credentials
    link: docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html
---

{% info_block infoBox "Info" %}

Starting with the 202204.0 release, the following guide applies to both Intel and ARM architectures. You can install the demo shops of previous versions on ARM chips by following the steps from the [Switch to ARM architecture](/docs/scos/dev/technical-enhancement-integration-guides/switch-to-arm-architecture-m1-chip.html) technical enhancement guide.

{% endinfo_block %}

This document describes how to install Spryker in [Development Mode](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/choosing-an-installation-mode.html#development-mode) on MacOS and Linux.

## Install Docker prerequisites on MacOS and Linux

* [Installing Docker prerequisites on MacOS](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-macos.html)
* [Installing Docker prerequisites on Linux](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-linux.html)

## Clone a Demo Shop and the Docker SDK

1. Open a terminal.
2. Create a new folder and navigate into it.
3. Clone *one* of the following [Demo Shops](/docs/scos/user/intro-to-spryker/intro-to-spryker.html#spryker-b2bb2c-demo-shops):
    * B2C Demo Shop:

    ```shell
    git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202212.0-p2 --single-branch ./b2c-demo-shop
    ```

    * B2B Demo Shop:

    ```shell
    git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202212.0-p2 --single-branch ./b2b-demo-shop
    ```
s
4. Depending on the cloned repository, navigate into the cloned folder:

    * B2C Demo Shop:

    ```bash
    cd b2c-demo-shop
    ```

    * B2B Demo Shop:

    ```bash
    cd b2b-demo-shop
    ```

{% info_block warningBox "Verification" %}

Make sure that you are in the correct folder by running the `pwd` command.

{% endinfo_block %}

5. Clone the Docker SDK repository:

```bash
git clone https://github.com/spryker/docker-sdk.git --single-branch docker
```


## Configure and start the instance

1. Bootstrap local docker setup:

```bash
docker/sdk bootstrap deploy.dev.yml
```

{% info_block warningBox "Bootstrap" %}

Once you finish the setup, you don't need to run `bootstrap` to start the instance. You only need to run it after updating the Docker SDK or changing the deploy file.

{% endinfo_block %}

2. Update the hosts file using the command provided in the output of the previous step. It should be similar to the following:

![update-hosts](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/setup/quickstart-guides-install-spryker/quickstart-guide-install-spryker-on-macos-and-linux/update-hosts.png)


3. Build and start the instance:

```bash
docker/sdk up
```

{% info_block warningBox %}

Depending on the hardware performance, the first project launch can take up to **20 minutes**.

{% endinfo_block %}

## Endpoints

To ensure that the installation is successful, make sure you can access the configured endpoints from the Deploy file. For more information about the Deploy file, see [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html).

## Back-Office

The default credentials to access the back-office are located inside this file `/src/Pyz/Zed/User/UserConfig.php`

## RabbitMQ

To access RabbitMQ UI, use `spryker` as a username and `secret` as a password. You can adjust the credentials in `deploy.yml`. See [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html) to learn about the Deploy file.

## Get the list of useful commands

To get the full and up-to-date list of commands, run `docker/sdk help`.

## Next steps

* [Spryker in Docker troubleshooting](/docs/scos/dev/troubleshooting/troubleshooting-spryker-in-docker-issues/troubleshooting-spryker-in-docker-issues.html)
* [Configuring debugging in Docker](/docs/scos/dev/the-docker-sdk/{{site.version}}/configuring-debugging-in-docker.html)
* [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html)
* [Configuring services](/docs/scos/dev/the-docker-sdk/{{site.version}}/configure-services.html)
* [Setting up a self-signed SSL certificate](/docs/scos/dev/setup/installing-spryker-with-docker/configuration/setting-up-a-self-signed-ssl-certificate.html)
* [Adjusting Jenkins for a Docker environment](/docs/scos/dev/setup/installing-spryker-with-docker/configuration/adjusting-jenkins-for-a-docker-environment.html)
