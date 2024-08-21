---
title: Install in Demo mode on Windows
description: Learn how to install Spryker in Demo mode on Windows.
last_updated: Oct 21, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/installing-in-demo-mode-on-windows
originalArticleId: 57e6858b-6419-47b3-9d61-8b1d6213e4aa
redirect_from:
  - /docs/scos/dev/set-up-spryker-locally/install-spryker/install/install-in-demo-mode-on-windows.html
  - /docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-demo-mode-on-windows.html
related:
  - title: Database access credentials
    link: docs/scos/dev/set-up-spryker-locally/set-up-spryker-locally.html
---

This doc describes how to install Spryker in [Demo Mode](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/choose-an-installation-mode.html#demo-mode) on Windows.

## Install Docker prerequisites on Windows

Depending on the needed WSL version, follow one of the guides:

* [Install Docker prerequisites on Windows with WSL1](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl1.html).

* [Install Docker prerequisites on Windows with WSL2](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl2.html).

## Clone a Demo Shop and the Docker SDK

1. Open Ubuntu.
2. Open a terminal.
3. Create a new folder and navigate into it.
4. Clone *one* of the [Demo Shops](/docs/about/all/about-spryker.html#demo-shops) and navigate into its folder:

    * B2C Demo Shop:

    ```shell
    git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202404.0 --single-branch ./b2c-demo-shop && \
    cd b2c-demo-shop
    ```

    * B2B Demo Shop:

    ```shell
    git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202404.0 --single-branch ./b2b-demo-shop && \
    cd b2b-demo-shop
    ```

    * B2C Marketplace Demo Shop

    ```shell
    git clone https://github.com/spryker-shop/b2c-demo-marketplace.git -b 202404.0 --single-branch ./b2c-demo-marketplace && \
    cd b2c-demo-marketplace
    ```

    * B2B Marketplace Demo Shop

    ```shell
    git clone https://github.com/spryker-shop/b2b-demo-marketplace.git -b 202404.0 --single-branch ./b2b-demo-marketplace && \
    cd b2b-demo-marketplace
    ```

{% info_block warningBox "Verification" %}

Make sure that you are in the Demo Shop's folder by running the `pwd` command.

{% endinfo_block %}    

5. Clone the Docker SDK repository into the same folder:

```shell
git clone https://github.com/spryker/docker-sdk.git --single-branch docker
```

## Configure and start the instance

1. Add your user to the `docker` group:

```bash
sudo usermod -aG docker $USER
```

2. Bootstrap the local Docker setup for demo:

```shell
docker/sdk bootstrap
```

{% info_block infoBox "Bootstrap" %}

Once you finish the setup, you don't need to run `bootstrap` to start the instance. You only need to run it after updating the Docker SDK or changing the deploy file.

{% endinfo_block %}

3. Update the `hosts` file:
    1. Open the Start menu.
    2. In the search field, enter `Notepad`.
    3. Right-click *Notepad* and select **Run as administrator**.
    4. In the *User Account Control* window, select **Yes** to confirm the action.
    5. In the upper navigation panel, select **File** > **Open**.
    6. Put the following path into the address line: `C:\Windows\System32\drivers\etc`.
    7. In the **File name** line, enter `hosts` and select **Open**.
    The hosts file opens in the drop-down.
    8. Add the following line into the file:

    ```text
    127.0.0.1   spryker.local mail.spryker.local queue.spryker.local scheduler.spryker.local swagger.spryker.local
    127.0.0.1   backend-api.at.spryker.local backend-api.de.spryker.local backend-api.us.spryker.local backend-gateway.at.spryker.local backend-gateway.de.spryker.local backend-gateway.us.spryker.local
    127.0.0.1   backoffice.at.spryker.local backoffice.de.spryker.local backoffice.us.spryker.local
    127.0.0.1   glue.at.spryker.local glue.de.spryker.local glue.us.spryker.local yves.at.spryker.local yves.de.spryker.local yves.us.spryker.local
    ```

    {% info_block infoBox %}

    If needed, add corresponding entries for other stores. For example, if you are going to have a US store, add the following entries: `zed.us.spryker.local glue.us.spryker.local yves.us.spryker.local`

    {% endinfo_block %}

    9. Select **File > Save**.
    10. Close the file.

4. Build and start the instance:

```shell
docker/sdk up
```

Depending on the hardware performance, the first project launch can take up to 20 minutes.

## Endpoints

To ensure that the installation is successful, make sure you can access the following endpoints.

| APPLICATION | ENDPOINTS |
| --- | --- |
| The Storefront |  yves.de.spryker.local, yves.at.spryker.local, yves.us.spryker.local |
| the Back Office | backoffice.de.spryker.local, backoffice.at.spryker.local, backoffice.us.spryker.local |
| the Back Api | backend-api.at.spryker.local backend-api.de.spryker.local backend-api.us.spryker.local |
| the Back Gateway | backend-gateway.at.spryker.local backend-gateway.de.spryker.local backend-gateway.us.spryker.local |
| Glue API | glue.de.spryker.local, glue.at.spryker.local, glue.us.spryker.local |
| Jenkins (scheduler) | scheduler.spryker.local |
| RabbitMQ UI (queue manager) | queue.spryker.local |
| Mailhog UI (email catcher) | mail.spryker.local |
| Swagger | swagger.spryker.local |
| Dashboard | spryker.local |

{% info_block infoBox "RabbitMQ UI credentials" %}

To access RabbitMQ UI, use `spryker` as a username and `secret` as a password. You can adjust the credentials in `deploy.yml`. See [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html) to learn about the Deploy file.

{% endinfo_block %}

## Get the list of useful commands

To get the full and up-to-date list of commands, run `docker/sdk help`.

## Next steps

* [Troubleshooting](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/troubleshooting-installation.html)
* [Configuring debugging in Docker](/docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/configure-debugging.html)
* [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html)
* [Configuring services](/docs/dg/dev/integrate-and-configure/configure-services.html)
* [Set up a self-signed SSL certificate](/docs/dg/dev/set-up-spryker-locally/configure-after-installing/set-up-a-self-signed-ssl-certificate.html)
