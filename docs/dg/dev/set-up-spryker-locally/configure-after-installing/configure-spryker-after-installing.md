---
title: Configure Spryker after installing
description: Learn with these instructions to Configure Spryker Local environments after installing it with Docker
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/post-installation-steps-and-additional-info
originalArticleId: 4c5b7267-f2d3-4d94-bb26-76dcb69befe1
redirect_from:
  - /docs/scos/dev/set-up-spryker-locally/configure-after-installing/configure-spryker-after-installing.html
  - /docs/scos/dev/set-up-spryker-locally/post-installation-steps-and-additional-info.html
  - /docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-debugging-in-devvm/configuring-debugging-in-a-devvm-below-version-91.html
  - /docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-debugging-in-devvm/configuring-debugging-in-devvm.html
  - /docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-spryker-with-devvm/configuring-database-servers.html
  - /docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-spryker-with-devvm/configuring-spryker-after-installing-with-devvm.html
  - /docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-spryker-with-devvm/updating-node.js-in-devvm-to-the-latest-version.html
related:
  - title: Set up a self-signed SSL certificate
    link: /docs/dg/dev/set-up-spryker-locally/configure-after-installing/set-up-a-self-signed-ssl-certificate.html
---

This document describes how to configure Spryker after installing it.


## Configuration of services

Spryker provides an easily manageable and extendable way to configure required services according to the predefined `deploy.*.yml` file that contains a `services` section which describes services used to deploy Spryker applications for different environments.

Configuration can be defined on different levels: project-wide, region-wide, store-specific or endpoint-specific with limitations depending on the service type.

Below, you can find an example of the service declaration that represents the type and configuration of the `broker` service.

```php
...
services:
    // Defines the service name
    broker:
        engine: rabbitmq
        // Defines the list of the environment variables
        api:
            username: "spryker"
            password: "secret"
        // Defined the list of Endpoints that points to the Service web interface or service's port
        endpoints:
            queue.demo-spryker.com:
...
```

## Configuration of endpoints

Endpoint is a point of access to a Spryker application or service.

Individual endpoints and ports are set in `deploy.*.yml` file.

Key format: `domain[:port]`. By default, the port for HTTP endpoints is 80. A port is mandatory for TCP endpoints.

## Configure by editing deploy files

1. To configure an application per your requirements, edit `deploy.*.yml`.

```php
...
groups:
    EU:
        region: EU
        applications:
            yves_eu:
                application: yves
                endpoints:
                    {endpointName}:
                        store: DE
                        services:
                            session:
                                namespace: 1
...
```

2. Bootstrap the local docker setup:

```shell
docker/sdk boot
```

3. Once the job finishes, build and start the instance:

```shell
docker/sdk up
```

4. Update the hosts file:

```shell
echo "127.0.0.1 {endpointName}" | sudo tee -a /etc/hosts
```
