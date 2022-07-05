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
---

This document describes how to install Spryker in [Development Mode](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/choosing-an-installation-mode.html#development-mode) on MacOS and Linux.

## Install Docker prerequisites on MacOS and Linux

To install Docker prerequisites, follow one of the guides:

* [Installing Docker prerequisites on MacOS](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-macos.html)
* [Installing Docker prerequisites on Linux](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-linux.html)

## Clone a Demo Shop and the Docker SDK

1. Open a terminal.
2. Create a new folder and navigate into it.
3. Depending on the desired [Demo Shop](/docs/scos/user/intro-to-spryker/intro-to-spryker.html#spryker-b2bb2c-demo-shops):

    * Clone the B2C repository:

    ```bash
    git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202204.0-p1 --single-branch ./b2c-demo-shop
    ```

    * Clone the B2B repository:

    ```bash
    git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202204.0-p1 --single-branch ./b2b-demo-shop
    ```

    * Clone the B2C Marketplace repository:
  
    ```shell
    git clone https://github.com/spryker-shop/b2c-demo-marketplace.git -b 202204.0-p1 --single-branch ./b2c-marketplace-demo-shop
    ```

   * Clone the B2B Marketplace repository:
  
    ```shell
    git clone https://github.com/spryker-shop/b2b-demo-marketplace.git -b 202204.0-p1 --single-branch ./b2b-marketplace-demo-shop
    ```
     
   * Clone the Master Suite repository:
  
    ```shell
    git clone https://github.com/spryker-shop/suite.git -b 202204.0-p1 --single-branch ./master-suite-demo-shop
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
    
    * B2C Marketplace repository:

    ```bash
    cd b2c-marketplace-demo-shop
    ```

    * B2B Marketplace repository:

    ```bash
    cd b2b-marketplace-demo-shop
    ```

    * Master Suite repository:
    
    ```bash
    cd master-suite-demo-shop
    ```

{% info_block warningBox "Verification" %}

Make sure that you are in the correct folder by running the `pwd` command.

{% endinfo_block %}

5. Clone the Docker SDK repository:

```bash
git clone https://github.com/spryker/docker-sdk.git --single-branch docker
```

## Optional: Switch to ARM architecture

Follow the steps in this section if you are installing on a device with an ARM chip, like Apple M1. Otherwise, [configure and start the instance](#configure-and-start-the-instance).

### Update Sass

Replace x86 based Sass with an ARM based one:

1. In `package.json`, remove `node-sass` dependencies.
2. Add `sass` and `sass-loader` dependencies.

```json
...
"sass": "~1.32.13",
"sass-loader": "~10.2.0",
...
```

3. Update `@spryker/oryx-for-zed`:

```json
...
"@spryker/oryx-for-zed": "~2.11.5",
...
```

4. In `frontend/configs/development.js`, add configuration for `saas-loader`:
```js
loader: 'sass-loader',
options: {
   implementation: require('sass'),
}
```

5. Enter the Docker SDK CLI:

```bash
docker/sdk cli
```

6. Update `package-lock.json` and install dependencies based on your package manager:
    * npm:
    ```bash
    npm install
    ```
    * yarn:
    ```bash
    yarn install
    ```
7. Rebuild Yves:

```bash
npm run yves
```

8. Rebuild Zed

```bash
npm run zed
```


### Update RabbitMQ and Jenkins services

In the deploy file, update RabbitMQ and Jenkins to [ARM supporting versions](https://github.com/spryker/docker-sdk#supported-services). Example:

```yaml
services:
...
    broker:
        engine: rabbitmq
        version: '3.9'
        api:
            username: 'spryker'
            password: 'secret'
        endpoints:
            queue.spryker.local:
            localhost:5672:
                protocol: tcp
...
        scheduler:
        engine: jenkins
        version: '2.324'
        endpoints:
            scheduler.spryker.local:
...
```


### Enable Jenkins CSRF protection


1. In the deploy file, enable the usage of the CSRF variable:

```yaml
...
services:
  scheduler:
    csrf-protection-enabled: true
...
```    

2. In the config file, enable Jenkins CSRF protection by defining the CSRF variable:

```php
...
$config[SchedulerJenkinsConstants::JENKINS_CONFIGURATION] = [
    SchedulerConfig::SCHEDULER_JENKINS => [
        SchedulerJenkinsConfig::SCHEDULER_JENKINS_CSRF_ENABLED => (bool)getenv('SPRYKER_JENKINS_CSRF_PROTECTION_ENABLED'),
    ],
];
...
```

## Configure and start the instance

1. Bootstrap local docker setup:

```bash
docker/sdk bootstrap deploy.dev.yml
```

{% info_block warningBox "Bootstrap" %}

Once you finish the setup, you don't need to run `bootstrap` to start the instance. You only need to run it after you update the Docker SDK or the deploy file.

{% endinfo_block %}

2. Update the `hosts` file:
   
```bash
echo "127.0.0.1 backoffice.de.spryker.local yves.de.spryker.local glue.de.spryker.local backoffice.at.spryker.local yves.at.spryker.local glue.at.spryker.local backoffice.us.spryker.local yves.us.spryker.local glue.us.spryker.local mail.spryker.local scheduler.spryker.local queue.spryker.local" | sudo tee -a /etc/hosts
```

<!--Follow the installation instructions in the white box from the `docker/sdk bootstrap` command execution results to prepare the environment -->

{% info_block infoBox %}

 You can run `docker/sdk install` after `bootstrap` to get the list of the instructions.

{% endinfo_block %}

1. Once the job finishes, build and start the instance:

```bash
docker/sdk up
```

{% info_block warningBox %}

Depending on the hardware performance, the first project launch can take up to 20 minutes.

{% endinfo_block %}

## Check endpoints

To ensure that the installation is successful, make sure you can access the configured endpoints from the Deploy file. For more information about the Deploy file, see [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html).

{% info_block infoBox "RabbitMQ UI credentials" %}

To access RabbitMQ UI, use `spryker` as a username and `secret` as a password. You can adjust the credentials in `deploy.yml`.

{% endinfo_block %}

## Get the list of useful commands

To get the full and up-to-date list of commands, run `docker/sdk help`.

## Next steps

* [Spryker in Docker troubleshooting](/docs/scos/dev/troubleshooting/troubleshooting-spryker-in-docker-issues/troubleshooting-spryker-in-docker-issues.html)
* [Configuring debugging in Docker](/docs/scos/dev/the-docker-sdk/{{site.version}}/configuring-debugging-in-docker.html)
* [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html)
* [Configuring services](/docs/scos/dev/the-docker-sdk/{{site.version}}/configuring-services.html)
* [Setting up a self-signed SSL certificate](/docs/scos/dev/setup/installing-spryker-with-docker/configuration/setting-up-a-self-signed-ssl-certificate.html)
* [Adjusting Jenkins for a Docker environment](/docs/scos/dev/setup/installing-spryker-with-docker/configuration/adjusting-jenkins-for-a-docker-environment.html)
