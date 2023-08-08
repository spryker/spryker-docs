---
title: Docker environment infrastructure
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/docker-environment-infrastructure
originalArticleId: e94dd005-cda2-48f8-a224-dea6d6e5ea46
redirect_from:
  - /2021080/docs/docker-environment-infrastructure
  - /2021080/docs/en/docker-environment-infrastructure
  - /docs/docker-environment-infrastructure
  - /docs/en/docker-environment-infrastructure
related:
  - title: The Docker SDK
    link: docs/scos/dev/the-docker-sdk/page.version/the-docker-sdk.html
  - title: Docker SDK quick start guide
    link: docs/scos/dev/the-docker-sdk/page.version/docker-sdk-quick-start-guide.html
  - title: Configuring services
    link: docs/scos/dev/the-docker-sdk/page.version/configure-services.html
  - title: Docker SDK configuration reference
    link: docs/scos/dev/the-docker-sdk/page.version/docker-sdk-configuration-reference.html
  - title: Choosing a Docker SDK version
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-docker-sdk-version.html
  - title: Choosing a mount mode
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-mount-mode.html
  - title: Configuring a mount mode
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-a-mount-mode.html
  - title: Configuring access to private repositories
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-access-to-private-repositories.html
  - title: Configuring debugging in Docker
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-debugging-in-docker.html
  - title: Running tests with the Docker SDK
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-docker-sdk-version.html
---

This document describes the infrastructure of Spryker in Docker environment.

Spryker containers  follow the rules:

1. **Single responsibility** - each container is responsible for a single role which must be defined in specification.
2. **Immutability** - container does not create or change files in its own file system. If container requires storage, a volume should be designated for the purpose. Temporary files are not covered by the rule.
3. **A single process or a process group** - there is a single process running as an entry point of container. The name of the process must be defined in specification.
4. **Process run without root permissions.**
5. **Only single-purpose ports are exposed** - the only exposed ports are the ones supporting the single responsibility of container. The port(s) must be defined in specification. Service ports are not covered by the rule.

Below, you can find the diagram of Spryker in Docker environment:

![Local docker environment diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/docker-local-environment-diagram.png)
