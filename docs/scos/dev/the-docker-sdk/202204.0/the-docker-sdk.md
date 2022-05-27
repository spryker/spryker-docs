---
title: The Docker SDK
description: Spryker Docker SDK is a tool that builds a production-like Docker infrustructure for Spryker.
last_updated: May 26, 2022
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/docker-sdk
originalArticleId: f609f764-f3f8-472a-b4ad-331c115947c9
redirect_from:
  - /2021080/docs/docker-sdk
  - /2021080/docs/en/docker-sdk
  - /docs/docker-sdk
  - /docs/en/docker-sdk
related:
  - title: Deploy File Reference - 1.0
    link: docs/scos/dev/the-docker-sdk/page.version/deploy-file/deploy-file-reference-1.0.html
---

Spryker Docker SDK is a tool designed to help you set up docker environment for your Spryker project.

The tool builds a production-like Docker infrastructure for Spryker based on the provided [Deploy file](/docs/scos/dev/the-docker-sdk/{{page.version}}/deploy-file/deploy-file-reference-1.0.html).

Spryker Docker SDK is used for the following purposes:

1. Building production-like Docker images.
2. Serving as part of development environment based on Docker.
3. Simplifying the process of setting up a local demo of Spryker project.

This document provides details on the Docker SDK itself, its commands and repository structure.

## Docker SDK repository structure

The [docker-sdk repository](https://github.com/spryker/docker-sdk) contains the following folders:

* [bin](https://github.com/spryker/docker-sdk/tree/master/bin): structured sh commands that are copied and used in the containers.
* [ci](https://github.com/spryker/docker-sdk/tree/master/ci): Travis deployment pipeline, basic tests.
* [context](https://github.com/spryker/docker-sdk/tree/master/context): service configurations, such as PHP, MySCL, nginx, etc.
* [deployment](https://github.com/spryker/docker-sdk/tree/master/deployment): generated Docker images, configs, and assets to build containers.
* [docs](https://github.com/spryker/docker-sdk/tree/master/docs): documentation.
* [generator](https://github.com/spryker/docker-sdk/tree/master/generator): generator of the `deployment` folder.
* [images](https://github.com/spryker/docker-sdk/tree/master/images): Docker files for services, applications, etc.
  
## Docker/sdk boot command details

The Docker SDK `boot` command runs the [generator](https://github.com/spryker/docker-sdk/tree/master/generator) application. The generator is deployed as a Docker container. The generator
takes twig templates and project's deploy.yml file with context and generates the content of the [deployment](https://github.com/spryker/docker-sdk/tree/master/deployment) folder.

The `boot` command does the following:
1. Prepares the `env` files for `glue`,`zed`, `yves`.
2. Prepares endpoints and store-specific configs.
3. Prepares the nginx configuration for the frontend and gateway containers.
4. Prepare the PHP and debug configuration.
5. Transforms the `env` files.
6. Prepares Dashboard.
7. Prepares the Docker image files and the `docker-compose.yml` file for local development.
8. Generates bash scripts in `deploy.sh`.
9. Shows the list of commands that are necessary to complete installation.

## Docker/sdk up command details

The Docker SDK `up` command does the following:

1. Prepares data in `deployment/default/deploy.sh`:
   1. Mounts Mutagen: 
      1. Removes the sync volume
      2. Terminates Mutagen
      3. Creates the volume
   2. Builds app images in CLI with the `docker/sdk build` command.
   3. Tags application images with the `docker/sdk tag` command.
   4. Mounts codebase with the following commands:
      - `install composer`
      - `install -s build`
      - `build-{mode}`
   5. Mounts assets with the following commands:
      - `install -s build-static`
      - `build-static-{mode}`
   6. Builds frontend and gateway containers from an nginx image.
2. Runs containers:
   1. Runs before stack
   2. Runs containers
   3. Runs after stack
3. Loads data for each region:
   1. Skips if DB is not empty: if `data`, then `force`
   2. Installs and configures Rabbit on broker container with the `rabbitmqctl add_vhost …` command.
   3. Suspends Scheduler and waits for job termination.
   4. Initiates storages for each store with the `install -s init_storages_per_store` command. 
   5. If the database does not exist, creates it on MySQL or PostreSQL container.
4. Starts a scheduler for each region and store with the command `install -s scheduler-setup`.

## Docker/sdk working mode commands

In the *testing* mode, you can use the `docker/sdk testing` and the `docker/sdk (up|start) -t` commands.

The `docker/sdk testing` command does the following:
 - Sets the `SPRYKER_TESTING_ENABLE` variable in the frontend, gateway, and app containers.
 - Builds and runs the webdriver container if it does not exist.
 - Stops the scheduler to ensure isolation and control.
 - Runs the CLI container and executes the requested command.

The `docker/sdk (up|start) -t` command does the following:
 - Sets the `SPRYKER_TESTING_ENABLE` variable in the frontend, gateway, and app containers.
 - Builds and runs the webdriver container if it does not exist.
 - Stops the scheduler to ensure isolation and control.
 - Executes the `docker/sdk cli -t ...` command  to enter CLI container in the test mode or to run commands.

To leave the testing mode, run `docker/sdk up|start`. This command shuts down the web driver and starts the scheduler again. 

In the *debug* mode, you can run the `docker/sdk cli -x` command. This command sets the `SPRYKER_XDEBUG_ENABLE` varialbe to allow CLI debugging.

{% info_block infoBox "Info" %}

Debugging from your browser with adding a cookie to the HTTP request works automatically.

{% endinfo_block %}

## Other docker/sdk commands

The `docker/sdk run` or `start` command does the following:
 - Executes the `docker-compose up -d` command.
 - Executes the `docker-compose restart` command that restarts the frontend and gateway containers.
 - Waits until the services are up and running.

The `docker/sdk stop` command stops running containers with the `docker-compose stop` command.

The `docker/sdk restart` command does the following:
 - Executes the `docker/sdk stop` command.
 - Executes the `docker/sdk start` command.

The `docker/sdk install` command prints information about what needs to be done to complete the installation. For example, it shows information about how to add hosts to the `/etc/hosts` file, as well as warnings about incompatible OS or software,  etc.

The `docker/sdk down` command executes `docker-compose down`, which stops and removes containers and networks.

The `docker/sdk prune` command does the following:
- Executes the `docker-compose down -v` command.
- Executes the `docker prune` command for images, volumes, system, and builder.

The `docker/sdk reset`  command does the following:
- executes `docker-compose down -v`
- executes `docker/sdk up --build --assets --data --jobs`

The `docker/sdk clean-data` command stops and removes the following containers and volumes with  `docker-compose down -v`:
- logs
- `/data` folder for Zed, Yves, Glue
- broker data: `/var/lib/rabbitmq`
- session and key-value data: `/data`
- search data: `/usr/share/elasticsearch/data`
- scheduler data

The `docker/sdk trouble` command does the following:
* Executes `docker-compose down`.
* Cleans sync volumes for `docker-sync`.

The `docker/sdk build` command builds the following data:
- Images: executes the `docker build` command for app and nginx images; builds codebase and assets.
- Codebase: executes `composer install`, `install -s build`, `build-{mode}`.
- Assets: executes `install -s build-static`, `build-static-{mode}`.

The `docker/sdk pull` command executes `docker-compose pull`, which pulls all the external images, based on `docker-compose.yml`.

The `docker/sdk demo` command does the following:
 - Executes the `docker-compose up -d` command.
 - Runs the demo data installation process for each region.

The `docker/sdk export images {tag}` command is only for the baked mode. It does the following:
 - Builds and tags docker application images.
 - Builds assets builder docker image based on assetsBuilder and Cli image). Runs `vendor/bin-install -s build-static build-static-{mode}`.
 - Builds and tags frontend images.
 - Prints information about the built images.

## Development environment
The following schema illustrates development environment within the Docker SDK:
![development-environment](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/the-docker-sdk/the-docker-sdk/development-environment.png)

In the development environment, Gateway (nginx) does the following:

* Accepts all public HTTP requests.
* Handles SSL connections.
* Serves all non-application services.
* Proxies application calls to Frontend (nginx).

Frontend (nginx) ? HTTP -> FastCGI proxy for (glue, yves, zed) and serves assets.

## Docker/sdk debug mode

The following schema illustrates the Docker/sdk debug mode:

![docker-sdk-debug-mode](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/the-docker-sdk/the-docker-sdk/docker-sdk-debug-mode.png)

## Docker images
The following schemas illustrate the Docker images:
![docker-image-nesting](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/the-docker-sdk/the-docker-sdk/Docker-image-nesting.png)

Docker images and containers:
![docker-images-and-containers](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/the-docker-sdk/the-docker-sdk/Docker-files-inheritance.png)





