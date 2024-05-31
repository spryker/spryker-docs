---
title: Docker SDK version update
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

This document describes how to perform update of the DOckerSDK version on your project.

In general, version of the DockerSDK on the project can be managed by a project's owner in any way.

Our recomendation is to (use GIT Submodule)[https://docs.spryker.com/docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html#configuring-a-project-to-use-the-chosen-version-of-the-docker-sdk], which will ensure the same version of the DockerSDK across the team.

In PaaS on contrary, we have a strict rule - version is taken from *.git.docker*.

Please refer to (this document)[https://docs.spryker.com/docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html#why-should-i-use-a-particular-version-of-the-docker-sdk], if you are not sure which version to take.

If you are planning Docker SDK version update, please follow the next steps:

1. With the current version installed, please create a copy of the folder `docker/deployment/default/terraform`
2. Pick a new version, preferably (one of the releases)[https://github.com/spryker/docker-sdk/releases].
3. Install new version and run `docker/sdk boot <your deploy file>`
4. Compare `docker/deployment/default/terraform` with the preserved copy in step 1.
5. If you see new variables added any of the files, you have to create a support ticket in order to apply these changes to you PaaS environment. Variable values could be ignored.
