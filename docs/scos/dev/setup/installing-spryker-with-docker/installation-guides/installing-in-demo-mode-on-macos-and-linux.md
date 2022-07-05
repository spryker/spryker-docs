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

## Install Docker prerequisites on MacOS and Linux

To install Docker prerequisites, follow one of the guides:

* [Installing Docker prerequisites on MacOS](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-macos.html)
* [Installing Docker prerequisites on Linux](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-linux.html)

## Clone a Demo Shop and the Docker SDK

1. Open a terminal.
2. Create a new folder and navigate into it.
3. Depending on the desired [Demo Shop](/docs/scos/user/intro-to-spryker/intro-to-spryker.html#spryker-b2bb2c-demo-shops):

    * Clone the B2C repository:

    ```shell
    git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202204.0-p1 --single-branch ./b2c-demo-shop
    ```

    * Clone the B2B repository:

    ```shell
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

1. Depending on the cloned repository, navigate into the cloned folder:

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

    Master Suite repository:
    
    ```bash
    cd master-suite-demo-shop
    ```


{% info_block warningBox "Verification" %}

Make sure that you are in the correct folder by running the `pwd` command.

{% endinfo_block %}

5. Clone the Docker SDK repository into the same folder:

```shell
git clone https://github.com/spryker/docker-sdk.git --single-branch docker
```

## Optional: Switch to ARM architecture

Follow the steps in this section if you are installing on a device with an ARM chip, like Apple M1. Otherwise, [configure and start the instance](#configure-and-start-the-instance).

### Update Sass

Replace x86 based Sass with an ARM based one:

1. In `package.json`, remove `node-sass` dependencies.
2. Add `sass` and `sass-loader` dependencies:

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

8. Rebuild Zed:

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

1. Bootstrap the local Docker setup for demo:

```shell
docker/sdk bootstrap deploy.dev.yml
```

{% info_block warningBox "Bootstrap" %}

Once you finish the setup, you don't need to run `bootstrap` to start the instance. You only need to run it after the following:

* Docker SDK version update.
* Deploy file update.

{% endinfo_block %}

2. Once the job finishes, build and start the instance:

```shell
docker/sdk up
```

3. Update the `hosts` file:

```bash
echo "127.0.0.1 backoffice.de.spryker.local yves.de.spryker.local glue.de.spryker.local backoffice.at.spryker.local yves.at.spryker.local glue.at.spryker.local backoffice.us.spryker.local yves.us.spryker.local glue.us.spryker.local mail.spryker.local scheduler.spryker.local queue.spryker.local" | sudo tee -a /etc/hosts
```

{% info_block infoBox %}

If needed, add corresponding entries for other stores. For example, if you are going to have a US store, add the following entries: `zed.us.spryker.local glue.us.spryker.local yves.us.spryker.local`

{% endinfo_block %}

{% info_block warningBox %}

Depending on the hardware performance, the first project launch can take up to 20 minutes.

{% endinfo_block %}

## Check endpoints

To ensure that the installation is successful, make sure you can access the following endpoints.

| APPLICATION | ENDPOINTS |
| --- | --- |
| The Storefront |  yves.de.spryker.local, yves.at.spryker.local, yves.us.spryker.local |
| The Back Office | zed.de.spryker.local, zed.at.spryker.local, zed.us.spryker.local |
| Glue API | glue.de.spryker.local, glue.at.spryker.local, glue.us.spryker.local |
| Jenkins (scheduler) | scheduler.spryker.local |
| RabbitMQ UI (queue manager) | queue.spryker.local |
| Mailhog UI (email catcher) | mail.spryker.local |

{% info_block infoBox "RabbitMQ UI credentials" %}

To access RabbitMQ UI, use `spryker` as a username and `secret` as a password. You can adjust the credentials in `deploy.yml`. See [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file-reference-1.0.html) to learn about the Deploy file.

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
