---
title: Is the latest version of Docker SDK installed?
description: This document allows you to assess if the latest version of Docker SDK is installed in a project.
template: howto-guide-template
---

# Is latest version of Docker SDK installed?

{% info_block infoBox %}

## Resources Backend

{% endinfo_block %}

## Description

### With project repository access

1. Find `docker` folder in the root of the project and ensure it’s sub-repository.
2. In the `docker` folder, check the remote origin of the Docker SDK:

```shell
git remote show origin
```

It should be pointed to `git@github.com:spryker/docker-sdk.git`.

3. Run `git log` from `docker` submodule. Having that information it’s easier to judge how much docker sdk is outdated comparing it with [releases](https://github.com/spryker/docker-sdk/releases)

### With project code provided as an archive

1. In the project's root, check if the `docker` folder exists.
    If it’s missing, the Docker SDK *is not used*.
2. If the `docker` folder exists, compare its content to the content of the folder in the [Docker SDK repository](https://github.com/spryker/docker-sdk). They should looks similar.
3. Check if the Docker SDK is integrated correctly based on the [integration instructions](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/integrating-the-docker-sdk-into-existing-projects.html#prerequisites).
    Based on the assessment from steps 2-3, you should be able to identify if the Docker SDK is used.
5. In order to understand the version of the installed docker SDK use prerequisites information, where a hash commit of the docker SDK repository is requested.
6. Use hash commit and [Docker SDK repo](https://github.com/spryker/docker-sdk) to understand which version is used.

## Formula

Approximately 2h.
