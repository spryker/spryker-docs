---
title: Is the latest version of Docker SDK installed?
description: This document allows you to assess if the latest version of Docker SDK is installed in a project.
template: howto-guide-template
---

# Is latest version of Docker SDK installed?

{% info_block infoBox %}

Resources: Backend

{% endinfo_block %}

## Description

### With project repository access

1. Find `docker` folder in the root of the project and ensure it’s sub-repository.
2. Run `git remote show origin` from the `docker` folder in the root of the project and ensure that the origin is pointing to `git@github.com:spryker/docker-sdk.git`.
3. Run `git log` from `docker` submodule. Having that information it’s easier to judge how much docker sdk is outdated comparing it with [releases](https://github.com/spryker/docker-sdk/releases)

### With project code provided as an archive

1. Navigate to the root of the project and search for `docker` folder.
2. In case it’s missing then it means `docker sdk` **is not used**.
3. In case it exists, check if `docker` folder has a similar structure of files to its [repository](https://github.com/spryker/docker-sdk) 
   and compare if all integration steps from [this documentation](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/integrating-the-docker-sdk-into-existing-projects.html#prerequisites) are in place.
4. If step 3 is confirmed then it means the docker SDK **is already used**.
5. In order to understand the version of the installed docker SDK use prerequisites information, where a hash commit of the docker SDK repository is requested.
6. Use hash commit and [Docker SDK repo](https://github.com/spryker/docker-sdk) to understand which version is used.

## Formula

Approximately 2h.
