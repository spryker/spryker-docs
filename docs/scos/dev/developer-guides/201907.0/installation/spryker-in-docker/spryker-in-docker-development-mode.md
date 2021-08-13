---
title: Spryker in Docker - Development Mode
description: Find all the details about development mode of Spryker in Docker in this article.
originalLink: https://documentation.spryker.com/v3/docs/spryker-in-docker-dev-mode-201907
originalArticleId: 28aa3f6b-6644-45f3-89b5-b9a7a3bbc823
redirect_from:
  - /v3/docs/spryker-in-docker-dev-mode-201907
  - /v3/docs/en/spryker-in-docker-dev-mode-201907
---


## General Information

Docker images/containers are used in the DEV environment. Find more information in [Docker documentation](https://docs.docker.com/v17.09/engine/userguide/storagedriver/imagesandcontainers/).

File synchronization is enabled when the `dev` mode is active.

In development mode, file changes on host machine are synced into containers and vice-versa.

When containers are killed, all files remain on the host machine.

## Source code synchronization

The following table describes the approaches and solutions used for each supported operating system:

| OS | Description |
| --- | --- |
| Linux | bind mount |
| MacOS | http://docker-sync.io/ |
| Windows | http://docker-sync.io/ |

Find more information about docker-sync, see the [docker-sync documentation](https://docker-sync.readthedocs.io/en/latest/).

## Multi-store Setup Support

* Multi-store setup is supported.
* Default stores are AT, DE, US.
* AT and DE are handled by a separate group of containers and have a common database.
* US is handled by a separate group of containers and has a separate database.

Find more information about the multi-store setup, see [Multiple Stores](/docs/scos/dev/features/201907.0/internationalization/multiple-stores.html).

## Database Access

In development mode, you can access your postgres database using the following credentials:

* host - `localhost`
* port - `5432`
* user - `spryker`
* pw - `secret`

All of the credentials can be changed in the [Deploy file](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/docker-sdk/deploy-file-reference-1.0.html).

## Xdebug Support

Use the `-x` argument with the `sdk run|start|up` command to enable Xdebug.

{% info_block infoBox %}
The full list of possible arguments can be found in [Getting Started with Docker](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/getting-started-with-docker.html
{% endinfo_block %}. More information about Xdebug can be found in [Debugging Setup in Docker](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/debugging-setup-in-docker.html).)


## Mail Catcher: MailHog

MailHog is a mail catcher service that is used with Spryker in Docker for the Demo and Dev environments. This email testing tool is used by developers to catch and show emails locally without an SMTP (Simple Mail Transfer Protocol) server.

With the MailHog service, developers can:

* configure an application to use MailHog for SMTP delivery;
* view messages in the web UI or retrieve them with JSON API.

http://mail.demo-spryker.com/ is used to see incoming emails.

{% info_block infoBox %}
Login is not required.
{% endinfo_block %}

<!-- Last review date: Aug 06, 2019by Mike Kalinin, Andrii Tserkovnyi -->
