---
title: Installing in Demo mode on MacOS and Linux
description: Learn how to install Spryker in Demo mode on MacOS and Linux.
last_updated: Oct 21, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/installing-in-demo-mode-on-macos-and-linux
originalArticleId: 3b78ae4c-d2a3-4dfa-87e1-7d0c4096ee22
redirect_from:
  - /2021080/docs/installing-in-demo-mode-on-macos-and-linux
  - /2021080/docs/en/installing-in-demo-mode-on-macos-and-linux
  - /docs/installing-in-demo-mode-on-macos-and-linux
  - /docs/en/installing-in-demo-mode-on-macos-and-linux
  - /v6/docs/installing-in-demo-mode-on-macos-and-linux
  - /v6/docs/en/installing-in-demo-mode-on-macos-and-linux
  - /v5/docs/installation-guide-demo-mode
  - /v5/docs/en/installation-guide-demo-mode
  - /v4/docs/installation-guide-demo-mode
  - /v4/docs/en/installation-guide-demo-mode
  - /v3/docs/spryker-in-docker-dev-mode-201907
  - /v3/docs/en/spryker-in-docker-dev-mode-201907
---

This document describes the procedure of installing Spryker in [Demo Mode](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/choosing-an-installation-mode.html#demo-mode) on MacOS and Linux.

## Installing Docker prerequisites on MacOS and Linux

To install Docker prerequisites, follow one of the guides:
* [Installing Docker prerequisites on MacOS](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-macos.html)
* [Installing Docker prerequisites on Linux](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-linux.html)

## Installing Spryker in Demo mode on MacOS and Linux

Follow the steps to install Spryker in Demo Mode:

1. Open a terminal.
2. Create a new folder and navigate into it.
3. Depending on the desired [Demo Shop](/docs/scos/user/intro-to-spryker/about-spryker.html#spryker-b2bb2c-demo-shops):
    * Clone the B2C repository:

    ```shell
    git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202108.0  --single-branch ./b2c-demo-shop
    ```

    * Clone the B2B repository:

    ```shell
    git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202108.0  --single-branch ./b2b-demo-shop
    ```
4. Depending on the cloned repository, navigate into the cloned folder:
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

5. Clone the Docker SDK repository into the same folder:
```shell
git clone https://github.com/spryker/docker-sdk.git --single-branch docker
```


6. Bootstrap the local Docker setup for demo:
```shell
docker/sdk bootstrap
```


{% info_block warningBox "Bootstrap" %}

Once you finish the setup, you don't need to run `bootstrap` to start the instance. You only need to run it after:
* Docker SDK version update;
* Deploy file update.

{% endinfo_block %}
7. Once the job finishes, build and start the instance:

```shell
docker/sdk up
```

8. Update the `hosts` file:

```bash
echo "127.0.0.1 zed.de.spryker.local yves.de.spryker.local glue.de.spryker.local zed.at.spryker.local yves.at.spryker.local glue.at.spryker.local zed.us.spryker.local yves.us.spryker.local glue.us.spryker.local mail.spryker.local scheduler.spryker.local queue.spryker.local backoffice.de.spryker.local" | sudo tee -a /etc/hosts
```

{% info_block infoBox %}

If needed, add corresponding entries for other stores. For example, if you are going to have a US store, add the following entries: `zed.us.spryker.local glue.us.spryker.local yves.us.spryker.local`

{% endinfo_block %}

{% info_block warningBox %}

Depending on the hardware performance, the first project launch can take up to 20 minutes.

{% endinfo_block %}

## Endpoints

To ensure that the installation is successful, make sure you can access the following endpoints.

| Application | Endpoints |
| --- | --- |
| The Storefront |  yves.de.spryker.local, yves.at.spryker.local, yves.us.spryker.local |
| the Back Office | zed.de.spryker.local, zed.at.spryker.local, zed.us.spryker.local |
| Glue API | glue.de.spryker.local, glue.at.spryker.local, glue.us.spryker.local |
| Jenkins (scheduler) | scheduler.spryker.local |
| RabbitMQ UI (queue manager) | queue.spryker.local |
| Mailhog UI (email catcher) | mail.spryker.local |

{% info_block infoBox "RabbitMQ UI credentials" %}

To access RabbitMQ UI, use `spryker` as a username and `secret` as a password. You can adjust the credentials in `deploy.yml`. See [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html) to learn about the Deploy file.

{% endinfo_block %}



## Getting the list of useful commands

To get the full and up-to-date list of commands, run `docker/sdk help`.

## Next steps

* [Spryker in Docker troubleshooting](/docs/scos/dev/troubleshooting/troubleshooting-spryker-in-docker-issues/troubleshooting-spryker-in-docker-issues.html)
* [Configuring debugging in Docker](/docs/scos/dev/the-docker-sdk/{{site.version}}/configuring-debugging-in-docker.html)
* [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html)
* [Configuring services](/docs/scos/dev/the-docker-sdk/{{site.version}}/configuring-services.html)
* [Setting up a self-signed SSL certificate](/docs/scos/dev/setup/installing-spryker-with-docker/configuration/setting-up-a-self-signed-ssl-certificate.html)
* [Adjusting Jenkins for a Docker environment](/docs/scos/dev/setup/installing-spryker-with-docker/configuration/adjusting-jenkins-for-a-docker-environment.html)
