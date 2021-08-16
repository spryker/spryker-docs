---
title: Installing in Development mode on MacOS and Linux
description: Learn how to install Spryker in Development mode on MacOS and Linux.
originalLink: https://documentation.spryker.com/2021080/docs/installing-in-development-mode-on-macos-and-linux
originalArticleId: 3a4af86a-3fb7-4fb2-b47e-4f1eb703fae6
redirect_from:
  - /2021080/docs/installing-in-development-mode-on-macos-and-linux
  - /2021080/docs/en/installing-in-development-mode-on-macos-and-linux
  - /docs/installing-in-development-mode-on-macos-and-linux
  - /docs/en/installing-in-development-mode-on-macos-and-linux
---

This document describes how to install Spryker in [Development Mode](/docs/scos/dev/developer-guides/{{page.version}}/installation/installing-spryker-with-docker/installation-guides/choosing-an-installation-mode.html#development-mode) on MacOS and Linux.

## Installing Docker prerequisites on MacOS and Linux

To install Docker prerequisites, follow one of the guides:
* [Installing Docker prerequisites on MacOS](/docs/scos/dev/developer-guides/{{page.version}}/installation/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-macos.html)
* [Installing Docker prerequisites on Linux](/docs/scos/dev/developer-guides/{{page.version}}/installation/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-linux.html)

## Installing Spryker in Development mode on MacOS and Linux
Follow the steps to install Spryker in Development mode:


1. Open a terminal.
2. Create a new folder and navigate into it.
3. Depending on the desired [Demo Shop](/docs/scos/user/intro-to-spryker/{{page.version}}/about-spryker.html#spryker-b2b-b2c-demo-shops):

    a. Clone the B2C repository:

    ```bash
    git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202009.0-p1 --single-branch ./b2c-demo-shop
    ```

    b. Clone the B2B repository:

    ```bash
    git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202009.0-p1 --single-branch ./b2b-demo-shop
    ```

4. Depending on the repository you've cloned, navigate into the cloned folder:
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

5. In `deploy.dev.yml`, define `image:` with the PHP image compatible with the current release of the Demo Shop:

```yaml
image: spryker/php:7.3-alpine3.12
```

6. Clone the Docker SDK repository:
```bash
git clone https://github.com/spryker/docker-sdk.git --single-branch docker
```

{% info_block warningBox "Verification" %}

Make sure `docker 18.09.1+` and `docker-compose 1.23+` are installed:

```bash
$ docker version
$ docker-compose --version
```

{% endinfo_block %}

7. Bootstrap local docker setup:
```bash
docker/sdk bootstrap deploy.dev.yml
```
{% info_block warningBox "Bootstrap" %}

Once you finish the setup, you don't need to run `bootstrap` to start the instance. You only need to run it after you update the Docker SDK or the deploy file.

{% endinfo_block %}

8. Update the `hosts` file:
Follow the installation instructions in the white box from the `docker/sdk bootstrap` command execution results to prepare the environment.

{% info_block infoBox %}

 You can run `docker/sdk install` after `bootstrap` to get the list of the instructions.

{% endinfo_block %}


9. Once the job finishes, build and start the instance:
    
```bash
docker/sdk up
```

{% info_block warningBox %}

Depending on the hardware performance, the first project launch can take up to 20 minutes.

{% endinfo_block %}

## Endpoints

To ensure that the installation is successful, make sure you can access the configured endpoints from the Deploy file. See [Deploy file reference - 1.0](/docs/scos/dev/developer-guides/{{page.version}}/docker-sdk/deploy-file-reference-1.0.html) to learn about the Deploy file.

{% info_block infoBox "RabbitMQ UI credentials" %}

To access RabbitMQ UI, use `spryker` as a username and `secret` as a password. You can adjust the credentials in `deploy.yml`. 

{% endinfo_block %}

## Getting the list of useful commands

To get the full and up-to-date list of commands, run `docker/sdk help`.

## Next steps

* [Spryker in Docker troubleshooting](/docs/scos/dev/developer-guides/{{page.version}}/troubleshooting/spryker-in-docker-issues/troubleshooting-docker-installation/docker-daemon-is-not-running.html)
* [Configuring debugging in Docker](/docs/scos/dev/developer-guides/{{page.version}}/docker-sdk/configuring-debugging-in-docker.html)
* [Deploy file reference - 1.0](/docs/scos/dev/developer-guides/{{page.version}}/docker-sdk/deploy-file-reference-1.0.html) 
* [Configuring services](/docs/scos/dev/developer-guides/{{page.version}}/docker-sdk/configuring-services.html)
* [Setting up a self-signed SSL certificate](/docs/scos/dev/developer-guides/{{page.version}}/installation/installing-spryker-with-docker/configuration/setting-up-a-self-signed-ssl-certificate.html) 
* [Additional DevOPS guidelines](/docs/scos/dev/developer-guides/{{page.version}}/installation/installing-spryker-with-docker/configuration/additional-devops-guidelines.html)


