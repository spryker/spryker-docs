---
title: Spryker in Docker
originalLink: https://documentation.spryker.com/v3/docs/spryker-in-docker-201907
redirect_from:
  - /v3/docs/spryker-in-docker-201907
  - /v3/docs/en/spryker-in-docker-201907
---

## General Information

This section is a complete stack for running Spryker in Docker containers using the [Spryker Docker SDK tool](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/docker-sdk/docker-sdk).

Spryker provides a standardized and customizable way to bootstrap applications and prepare development and production environments.

Spryker containers  follow the rules:

1. **Single responsibility** - each container is responsible for a single role which must be defined in specification.
2. **Immutability** - container does not create or change files in its own file system. If container requires storage, a volume should be designated for the purpose. Temporary files are not covered by the rule.
3. **A single process or a process group** - there is a single process running as an entry point of container. The name of the process must be defined in specification.
4. **Process run without root permissions.**
5. **Only single-purpose ports are exposed** - the only exposed ports are the ones supporting the single responsibility of container. The port(s) must be defined in specification. Service ports are not covered by the rule.

**The local docker environment diagram**

 ![Local docker environment diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/docker-local-environment-diagram.png){height="" width=""}

## Where to go from here?

* [Overview and install the prerequisites](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/docker-install-prerequisites/docker-install-)
* [Getting Started with Docker](/docs/scos/dev/developer-guides/202001.0/installation/spryker-in-docker/getting-started)
* [Integrate Docker into an existing Spryker project](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/integrating-doc)
* [Spryker in Docker HowTos](https://documentation.spryker.com/v3/docs/about-spryker-in-docker-howtos.htm)

