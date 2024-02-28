---
title: Connecting the Docker SDK
description: Connect Docker SDK to your Spryker Cloud project.
last_updated: Apr 03, 2022
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/connecting-docker-sdk
originalArticleId: a4fe702d-b469-4224-a329-aba9f6c2c027
redirect_from:
  - /docs/connecting-docker-sdk
  - /docs/en/connecting-docker-sdk
  - /docs/cloud/dev/spryker-cloud-commerce-os/connecting-docker-sdk
  - /docs/cloud/dev/spryker-cloud-commerce-os/connecting-the-docker-sdk.html
---

Spryker Docker SDK is a tool used to set up docker environments for Spryker projects.

This is an optional tool locally, but we highly recommend installing it to make your local environment similar to the one in Spryker Cloud Commerce OS.


## Select a Docker SDK version

Analyze your project's architecture and determine the Docker SDK version to use.

Before deploying code to the cloud, you must define the Docker SDK version in `.git.docker`. For instructions, see [Choosing a Docker SDK version](/docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html).

{% info_block infoBox "Forking the Docker SDK" %}

Spryker Cloud Commerce OS does not support forks of the Docker SDK. Your project's code must be compatible with the Docker SDK's main branch for a successful deployment.

{% endinfo_block %}


## Connect Docker SDK

To connect Docker SDK to your project, follow the instructions in [Integrating the Docker SDK into existing projects](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

{% info_block errorBox "Deploy file" %}

At the [Set up a Deploy file](/docs/dg/dev/upgrade-and-migrate/migrate-to-docker/migrate-to-docker.html) step, instead of setting up a new deploy file, use the one provided to you after the onboarding.

{% endinfo_block %}


## Start from scratch with Docker SDK and Demo Shop

If you want to start a new project from scratch, follow [Installing Spryker with Docker](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).


## Next step

[Connecting a code repository](/docs/ca/dev/connect-a-code-repository.html)
