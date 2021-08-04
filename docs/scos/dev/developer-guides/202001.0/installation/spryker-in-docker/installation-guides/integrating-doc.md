---
title: Integrating Docker into Existing Projects
originalLink: https://documentation.spryker.com/v4/docs/integrating-docker-into-existing-projects
redirect_from:
  - /v4/docs/integrating-docker-into-existing-projects
  - /v4/docs/en/integrating-docker-into-existing-projects
---

This page describes how you can convert a non-Docker based project into a Docker based one. If you want to install Spryker in Docker from scratch, start with [Development Mode](https://documentation.spryker.com/v4/docs/modes-overview#development-mode) or [Demo Mode](https://documentation.spryker.com/v4/docs/modes-overview#demo-mode).

## Prerequisites

To start integrating Docker into your project, fulfill the prerequisites:
1. Follow the [Docker installation prerequisites](/docs/scos/dev/developer-guides/202001.0/installation/spryker-in-docker/docker-installation-prerequisites/docker-installa).
2. Overview and install the necessary features:

| Name | Version | 
| --- | --- | 
| [Spryker Core](/docs/scos/dev/migration-and-integration/202001.0/feature-integration-guides/spryker-core-fe) | 202001.0 | 

## Set up .dockerignore

Create a new `.dockerignore` file to match the project file structure:
```yaml
.git
.idea
node_modules
/vendor
/data
!/data/import
.git*
.unison*
/.nvmrc
/.scrutinizer.yml
/.travis.yml
/newrelic.ini

/docker
!/docker/deployment/
```
See [.dockerignore file](https://docs.docker.com/engine/reference/builder/#dockerignore-file) for more details.

## Set up Configuration

Under `config/Shared`, adjust or create a configuration file that depends on the environment name.
See  [config_default-docker.php](https://github.com/spryker-shop/b2c-demo-shop/blob/master/config/Shared/config_default-docker.php) as an example. 

Make sure to adjust the configuration for each separate store.
See [config_default-docker_DE.php](https://github.com/spryker-shop/b2c-demo-shop/blob/master/config/Shared/config_default-docker_DE.php) as an example.

## Set up Deploy File

[Deploy file](/docs/scos/dev/developer-guides/202001.0/installation/spryker-in-docker/docker-sdk/deploy-file-ref) is a YAML file defining Spryker infrastructure and services for Spryker tools used to deploy Spryker applications in different environments.

It's possible to create an unlimited amount of deployment files with different configuration settings: `deploy.yml` for Demo mode, `deploy.dev.yml` for Development mode.

Find B2B/B2C deploy file examples for Development and Demo environments in the table:

| Development mode | Demo mode |
| --- | --- |
| [B2C Demo Shop deploy file](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.dev.yml) | [B2C Demo Shop deploy file](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.yml) |
| [B2B Demo Shop deploy file](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.dev.yml) | [B2B Demo Shop deploy file](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.yml) |

## Set up Installation Script

Under `config/Shared`, prepare the installation recipe that defines the way Spryker should be installed.

Find  installation recipe examples below:
* [B2B Demo Shop installation recipe](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.yml)
* [B2C Demo Shop installation recipe](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.yml)

## Install Docker SDK
Follow the steps to install Docker SDK:
1. Fetch Docker SDK tools:
```bash
git clone https://github.com/spryker/docker-sdk.git ./docker
```
{% info_block warningBox "Verification" %}

Make sure `docker 18.09.1+` and `docker-compose 1.23+` are installed:

```bash
$ docker version
$ docker-compose --version
```

{% endinfo_block %}
2. Initialize docker setup:
 ```bash
docker/sdk bootstrap
```
{% info_block warningBox "Bootstrap" %}

Once you finish the setup, you don't need to run `bootstrap` to start the instance. You only need to run it after:
* Docker SDK version update;
* Deploy file update.

{% endinfo_block %}
3. Build and run Spryker applications:
```bash
docker/sdk up
```
{% info_block warningBox %}
Make sure all the domains from `deploy.yml` are defined as `127.0.0.1` in the `hosts` file in the local environment.
{% endinfo_block %}

## Endpoints

To ensure that the installation is successful, make sure you can open the following endpoints:

* yves.de.spryker.local, yves.at.spryker.local, yves.us.spryker.local - Shop UI (*Storefront*)
* zed.de.spryker.local, zed.at.spryker.local, zed.us.spryker.local - Back-office UI (*the Back Office*)
* glue.de.spryker.local, glue.at.spryker.local, glue.us.spryker.local - API endpoints
* scheduler.spryker.local - Jenkins (*scheduler*)
* queue.spryker.local - RabbitMQ UI (*queue*).
{% info_block infoBox %}
Use "spryker" as a username and "secret" as a password. These credentials are defined and can be changed in `deploy.yml` or `deploy.dev.yml`.
{% endinfo_block %}
* mail.spryker.local - Mailhog UI (*email catcher*)

## Useful Commands

Run the `docker/sdk help` command to get the full and up-to-date list of commands.

**What's next?**
* [Troubleshooting](https://documentation.spryker.com/v4/docs/troubleshooting)
* [Debugging Setup in Docker](/docs/scos/dev/developer-guides/202001.0/installation/spryker-in-docker/debugging-setup)
* [Deploy File Reference - 1.0](/docs/scos/dev/developer-guides/202001.0/installation/spryker-in-docker/docker-sdk/deploy-file-ref) 
* [Services](/docs/scos/dev/developer-guides/202001.0/installation/spryker-in-docker/configuration/services)
* [Additional DevOPS Guidelines](/docs/scos/dev/developer-guides/202001.0/installation/spryker-in-docker/configuration/additional-devo)

