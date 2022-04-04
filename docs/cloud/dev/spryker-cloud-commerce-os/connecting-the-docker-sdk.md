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
---

Spryker Docker SDK is a tool used to set up docker environments for Spryker projects.

This is an optional tool locally, but we highly recommend installing it to make your local environment similar to the one in Spryker Cloud Commerce OS.


## Select a Docker SDK Version
Before integrating the Docker SDK, analyze your project's architecture needs and determine which version of it you will be using.
Refer to [Choosing a Docker SDK version](/docs/choosing-a-docker-sdk-version) for more information.

You must create a version reference file (.git.docker) for your project before deploying your code to the cloud.

{% info_block errorBox "Using Docker SDK forks" %}

Spryker Cloud Commerce OS does not currently support forks of spryker/docker-sdk.
Your project's code must be compatible with the main branch for successful deployment.

{% endinfo_block %}


## Connect Docker SDK
To connect Docker SDK to your project, follow the instructions in [Integrating the Docker SDK into existing projects](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html).

{% info_block errorBox "Deploy file" %}

At the [Set up a Deploy file](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/integrating-the-docker-sdk-into-existing-projects.html) step, instead of setting up a new deploy file, use the one provided to you after the onboarding.

{% endinfo_block %}


## Start from scratch with Docker SDK and Demo Shop

If you want to start a new project from scratch, follow [Installing Spryker with Docker](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html).


## Next step

[Connecting a code repository](/docs/cloud/dev/spryker-cloud-commerce-os/connecting-a-code-repository.html)
