---
title: Configuring Spryker after installing with Docker
description: Instructions for configuring Spryker after installing it with Docker
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/post-installation-steps-and-additional-info
originalArticleId: 4c5b7267-f2d3-4d94-bb26-76dcb69befe1
redirect_from:
  - /2021080/docs/post-installation-steps-and-additional-info
  - /2021080/docs/en/post-installation-steps-and-additional-info
  - /docs/post-installation-steps-and-additional-info
  - /docs/en/post-installation-steps-and-additional-info
  - /v6/docs/post-installation-steps-and-additional-info
  - /v6/docs/en/post-installation-steps-and-additional-info
  - /v5/docs/post-installation-steps-and-additional-info
  - /v5/docs/en/post-installation-steps-and-additional-info
  - /v4/docs/post-installation-steps-and-additional-info
  - /v4/docs/en/post-installation-steps-and-additional-info
  - /v3/docs/post-installation-steps-and-additional-info
  - /v3/docs/en/post-installation-steps-and-additional-info
  - /v2/docs/post-installation-steps-and-additional-info
  - /v2/docs/en/post-installation-steps-and-additional-info
  - /v1/docs/post-installation-steps-and-additional-info
  - /v1/docs/en/post-installation-steps-and-additional-info
  - /docs/scos/dev/setup/post-installation-steps-and-additional-info.html
---

This document describes how to configure Spryker after installing it with Docker.


## Configuring services

Spryker provides an easily manageable and extendable way to configure required services according to the predefined `deploy.*.yml` file that contains a `service` section which describes services used to deploy Spryker Applications for different environments.

Configuration can be defined on different levels: project-wide, region-wide, store-specific or endpoint-specific with limitations depending on the service type.

Below, you can find an example of the service declaration that represents type and configuration of the `broker` service.

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

## Configuring endpoints

Endpoint is a point of access to a Spryker Application or Service.

Individual endpoints and ports are set in `deploy.*.yml` file.

{% info_block warningBox %}

Key format: `domain[:port]`. By default, the port for HTTP endpoints is 80. A port is mandatory for TCP endpoints.

{% endinfo_block %}

## Applying the changes

1. Apply the necessary changes in `deploy.*.yml`.

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
