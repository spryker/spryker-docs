---
title: Update the Docker SDK
description: Learn how you can update the Docker SDK to a newer version depending on the installation of your Spryker instance.
last_updated: Jun 1, 2024
template: howto-guide-template

related:
  - title: The Docker SDK
    link: docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html
  - title: Docker SDK quick start guide
    link: docs/dg/dev/sdks/the-docker-sdk/docker-sdk-quick-start-guide.html
  - title: Running tests with the Docker SDK
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html
---


There are several ways to manage the Docker SDK version.

For local environments, we recommend using the [Git submodule](/docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html#configuring-a-project-to-use-the-chosen-version-of-the-docker-sdk) to ensure the same version is used across the team.

In cloud environments, versions are managed only using `.git.docker`.

For more details on choosing a version, see [Choosing a Docker SDK version](/docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html#why-should-i-use-a-particular-version-of-the-docker-sdk).

To update the Docker SDK version in a cloud environment, follow the steps:

1. Duplicate the folder: `docker/deployment/default/terraform`.
2. Choose the version to upgrade to, preferably one of the [releases](https://github.com/spryker/docker-sdk/releases).
3. Install the needed version.
4. Bootstrap the Docker setup:
```shell
docker/sdk boot {your_deploy_file}
5. Compare the current `docker/deployment/default/terraform` to the copy you've created in step 1.
  If new variables have been added, [create a support ticket](https://support.spryker.com/s/) to apply these changes to your environment. If variable values have been changed, you don't need to create a ticket.
