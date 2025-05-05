---
title: Install in Development mode on MacOS and Linux
description: Learn how to install and configure Spryker in Development mode on MacOS and Linux in a local environment.
last_updated: Oct 21, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/installing-in-development-mode-on-macos-and-linux
originalArticleId: 3a4af86a-3fb7-4fb2-b47e-4f1eb703fae6
redirect_from:
  - /docs/scos/dev/set-up-spryker-locally/install-spryker/install/install-in-development-mode-on-macos-and-linux.html
  - /docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/installing-spryker-with-devvm-on-macos-and-linux.html
  - /docs/marketplace/dev/setup/spryker-marketplace-setup.html
  - /docs/marketplace/dev/setup/installation.html
  - /docs/marketplace/dev/back-end/marketplace-infrastructure-setup.html
  - /docs/marketplace/dev/setup/202212.0/spryker-marketplace-setup.html  
  - /docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-development-mode-on-macos-and-linux.html
related:
  - title: Database access credentials
    link: docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html
---

{% info_block infoBox "Info" %}

Starting with the 202204.0 release, the following guide applies to both Intel and ARM architectures. You can install the demo shops of previous versions on ARM chips by following [Switch to ARM architecture](/docs/dg/dev/integrate-and-configure/switch-to-arm-architecture-m1-chip.html).

{% endinfo_block %}

This document describes how to install Spryker in [Development Mode](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/choose-an-installation-mode.html#development-mode) on MacOS and Linux.

## Install Docker prerequisites on MacOS and Linux

* [Install Docker prerequisites on MacOS](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-macos.html)
* [Install Docker prerequisites on Linux](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-linux.html)

## Clone a Demo Shop and the Docker SDK


{% info_block warningBox %}

Product images, product data, other images or fonts displaced in a demo shop are examples, and you may need to purchase your own licenses to use any of them.

{% endinfo_block %}

1. Open a terminal.
2. Clone *one* of the following Demo Shops and navigate into its folder:

    * B2C Demo Shop:

    ```shell
    git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202410.0 --single-branch ./b2c-demo-shop && \
    cd b2c-demo-shop
    ```

    * B2B Demo Shop:

    ```shell
    git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202410.0 --single-branch ./b2b-demo-shop && \
    cd b2b-demo-shop
    ```

    * B2C Marketplace Demo Shop

    ```shell
    git clone https://github.com/spryker-shop/b2c-demo-marketplace.git -b 202410.0 --single-branch ./b2c-demo-marketplace && \
    cd b2c-demo-marketplace
    ```

    * B2B Marketplace Demo Shop

    ```shell
    git clone https://github.com/spryker-shop/b2b-demo-marketplace.git -b 202410.0 --single-branch ./b2b-demo-marketplace && \
    cd b2b-demo-marketplace
    ```

3. Clone the Docker SDK:

```bash
git clone https://github.com/spryker/docker-sdk.git --single-branch docker
```


## Configure and start the instance

1. Bootstrap the local docker setup:

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

Depending on the hardware performance, the first project launch can take up to 20 minutes.

## Endpoints

To ensure that the installation is successful, make sure you can access the endpoints configured in the deploy file. For more information about the deploy file, see [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html).

## Back-Office

The default credentials to access the back-office are located inside this file `/src/Pyz/Zed/User/UserConfig.php`

## RabbitMQ

To access RabbitMQ UI, use `spryker` as a username and `secret` as a password. You can adjust the credentials in `deploy.yml`. See [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html) to learn about the Deploy file.

## Get the list of useful commands

To get the full and up-to-date list of commands, run `docker/sdk help`.

## Next steps

* [Troubleshooting](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/troubleshooting-installation.html)
* [Configuring debugging in Docker](/docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/configure-debugging.html)
* [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html)
* [Configuring services](/docs/dg/dev/integrate-and-configure/configure-services.html)
* [Set up a self-signed SSL certificate](/docs/dg/dev/set-up-spryker-locally/configure-after-installing/set-up-a-self-signed-ssl-certificate.html)
